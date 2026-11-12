# VO chain for #002 (the source file is never edited): high-pass, phrase leveller that keeps 35% of the
# performed dynamics (soft/whisper lines stay softer, but within ~5 dB instead of 16 dB), presence lift,
# then normalisation. Writes vo_level.wav next to this file and prints per-sentence speech-band levels.
import json, subprocess, numpy as np
from pathlib import Path
from scipy.signal import butter, sosfilt, sosfiltfilt
from scipy.io import wavfile
HERE = Path(__file__).parent; AUD = HERE.parent / 'audio'
SR = 48000
a = np.frombuffer(subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', str(AUD / 'vo_scroll.mp3'), '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout, np.float32).astype(np.float64)
a = sosfilt(butter(2, 90, 'highpass', fs=SR, output='sos'), a)
band = sosfilt(butter(4, [300, 4000], 'bandpass', fs=SR, output='sos'), a)
W = json.load(open(AUD / 'vo_words.json'))
# phrases = runs of words split at punctuation; each gets one gain (no pumping inside a phrase)
ph, cur = [], []
for w in W:
    cur.append(w)
    if w[2][-1] in '.?…:,"': ph.append(cur); cur = []
if cur: ph.append(cur)
lv = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-9)
L = [lv(band[int(p[0][0] * SR):int(p[-1][1] * SR)]) for p in ph]
target = float(np.median(L)); keep = .35
gain = np.zeros(len(a))
for p, l in zip(ph, L):
    g = np.clip((target - l) * (1 - keep), -10, 12)
    i0, i1 = int(max(0, p[0][0] - .12) * SR), int(min(len(a) / SR, p[-1][1] + .18) * SR)
    gain[i0:i1] = g
# hold gain across gaps (no breath pumping), then smooth 250 ms
nz = np.nonzero(gain)[0]
if len(nz):
    idx = np.maximum.accumulate(np.where(gain != 0, np.arange(len(gain)), 0)); gain = gain[idx]
k = int(.25 * SR); gain = np.convolve(gain, np.ones(k) / k, mode='same')
y = a * 10 ** (gain / 20)
# presence lift 2–5 kHz (+3 dB-ish) for phone speakers
pres = sosfiltfilt(butter(2, [2000, 5000], 'bandpass', fs=SR, output='sos'), y); y = y + .4 * pres
y = y / (np.sqrt(np.mean(y[np.abs(y) > 1e-3] ** 2)) + 1e-9) * 10 ** (-17 / 20)
pk = np.max(np.abs(y)); y = y / max(1, pk / .89)
wavfile.write(HERE / 'vo_level.wav', SR, (y * 32767).astype(np.int16))
bd = sosfilt(butter(4, [300, 4000], 'bandpass', fs=SR, output='sos'), y)
print('phrase levels after chain (speech band):')
for p, l in zip(ph, L):
    print(f"{p[0][0]:5.2f} before {l:6.1f}  after {lv(bd[int(p[0][0]*SR):int(p[-1][1]*SR)]):6.1f}  {' '.join(w[2] for w in p)[:40]}")
