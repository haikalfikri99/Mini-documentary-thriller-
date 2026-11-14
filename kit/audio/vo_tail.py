# Tight audio tail for the auto-replay loop: the film should end at most TAIL seconds after the last audible syllable, so the replay
# hits frame 0 at once. "Audible" = short-time level above -45 dBFS (the VO is peak/RMS-normalised first, so -45 dB is room noise).
import subprocess, numpy as np
TAIL, THRESH_DB, SR = 0.15, -45.0, 48000
def decode(path):
    return np.frombuffer(subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', str(path), '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout, np.float32).astype(np.float64)
def voiced_end(y, thresh_db=THRESH_DB, win=0.010):
    """time (s) of the end of the last 10 ms window whose RMS is above thresh_db (relative to the loudest window - 0 dB = full scale of the normalised file)."""
    n = int(win * SR); m = len(y) // n
    if m == 0: return 0.0
    rms = np.sqrt(np.mean(y[:m * n].reshape(m, n) ** 2, axis=1)) + 1e-12
    db = 20 * np.log10(rms / (np.max(rms) + 1e-12)) - 17.0     # ≈ dBFS once the chain has normalised to -17 dBFS RMS
    idx = np.nonzero(db > thresh_db)[0]
    return float((idx[-1] + 1) * n / SR) if len(idx) else 0.0
def trim_tail(y, tail=TAIL, fade=0.012):
    """cut y to voiced end + tail, with a tiny (12 ms) cosine fade so there is no click and no audible fade-out."""
    cut = min(len(y), int((voiced_end(y) + tail) * SR))
    out = y[:cut].copy(); f = min(int(fade * SR), len(out))
    if f > 1: out[-f:] *= 0.5 * (1 + np.cos(np.linspace(0, np.pi, f)))
    return out, cut / SR
