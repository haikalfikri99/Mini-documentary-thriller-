# Audio QA without ears (usage: python3 kit/audio/check_audio.py stories/<slug>/film [file]): (1) is the voice still intelligible in the final mix? whisper on the mix vs the script;
# (2) do SFX land where planned? onset detection on the SFX stem vs the cue list; (3) a spectrogram to look at.
import numpy as np, json, re, subprocess, wave
from faster_whisper import WhisperModel
SR = 48000
def load(path, sr=16000):
    return np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(sr), '-f', 'f32le', '-'], capture_output=True).stdout, np.float32)
import sys, os
FILM = sys.argv[1]; EP = json.load(open(os.path.join(FILM, 'episode.json'))); os.chdir(FILM)
words = [w[2] for w in json.load(open(EP['words']))]
norm = lambda w: re.sub(r'[^a-z0-9]', '', w.lower())
m = WhisperModel('small', compute_type='int8')
segs, _ = m.transcribe(load(sys.argv[2] if len(sys.argv) > 2 else 'mix_full.wav'), language='id', word_timestamps=True)
heard = [norm(w.word) for s in segs for w in s.words]
ref = [norm(w) for w in words]
hit = sum(1 for w in ref if w in heard)
print(f'intelligibility: {hit}/{len(ref)} script words recognised in the final mix ({100 * hit / len(ref):.0f}%)')
print('missed:', [w for w in ref if w not in heard])
# onsets on the SFX stem
x = np.load('stem_sfx.npy'); hop = 480; e = np.sqrt(np.convolve(x ** 2, np.ones(hop) / hop, 'same'))[::hop]
d = np.diff(np.log(e + 1e-5)); on = [i * hop / SR for i in range(1, len(d)) if d[i] > 1.2 and e[i + 1] > 2e-3 and (i < 2 or d[i - 1] <= 1.2)]
print('SFX onsets (s):', ' '.join(f'{t:.2f}' for t in on))
