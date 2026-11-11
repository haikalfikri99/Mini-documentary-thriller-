# Audio for the key-scene preview v3 → mix.wav. VO 0–5.4 + 8.98–12.65 (shifted to 5.4), orchestral score (score.py → score.wav)
# ducked under the voice, and layered sound design: wave roar + debris cracks, whoosh into the freeze, slam, stamp,
# whoosh into the photo, street air with distant hooves, and the tank's metal groan as the worker looks up.
import subprocess, numpy as np, wave
from scipy.signal import butter, sosfilt
SR = 48000; DUR = 9.05; N = int(DUR * SR); rng = np.random.default_rng(3)
L = np.zeros(N); R = np.zeros(N); VO = np.zeros(N)
def load(path, a=0, b=None, ch=1):
    cmd = ['ffmpeg', '-v', 'error', '-ss', str(a)] + (['-t', str(b - a)] if b else []) + ['-i', path, '-ac', str(ch), '-ar', str(SR), '-f', 'f32le', '-']
    x = np.frombuffer(subprocess.run(cmd, capture_output=True).stdout, np.float32).astype(float); return x.reshape(-1, ch) if ch > 1 else x
def add(buf, at, gain=1., pan=0., dst=None):
    i = int(at * SR); j = min(N, i + len(buf)); b = buf[:j - i] * gain
    if dst is not None: dst[i:j] += b; return
    L[i:j] += b * (1 - max(0, pan)); R[i:j] += b * (1 + min(0, pan))
bp = lambda x, lo, hi: sosfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), x)
lpf = lambda x, f: sosfilt(butter(2, f, 'low', fs=SR, output='sos'), x)
hpf = lambda x, f: sosfilt(butter(2, f, 'high', fs=SR, output='sos'), x)
T = lambda d: np.arange(int(d * SR)) / SR
nz = lambda d: rng.standard_normal(int(d * SR))
norm = lambda x: x / (np.abs(x).max() + 1e-9)
# —— voice
add(load('../audio/vo_molase.mp3', 0, 5.4), 0, 1.0, dst=VO); add(load('../audio/vo_molase.mp3', 8.98, 12.65), 5.4, 1.0, dst=VO)
rms = lambda x: np.sqrt((x[np.abs(x) > 1e-4] ** 2).mean())
# VO chain (the recording itself is untouched): the cold open was recorded ~10 dB softer in the speech band and sits on
# low rumble, so: high-pass 100 Hz → phrase leveller on the 300 Hz–4 kHz band (±12 dB, 250 ms smoothing) → presence lift 2–5 kHz
VO = hpf(VO, 100); sb = bp(VO, 300, 4000); win = int(.3 * SR); g_ = np.ones(N)
lev = np.sqrt(np.convolve(sb ** 2, np.ones(win) / win, 'same')) + 1e-6; ref = np.percentile(lev[lev > 1e-3], 75)
g_ = np.clip(ref / lev, 10 ** (-12 / 20), 10 ** (12 / 20)); g_[lev < ref * .08] = 1   # gaps stay as they are (no pumped noise)
g_ = np.convolve(g_, np.ones(int(.25 * SR)) / int(.25 * SR), 'same'); VO = VO * g_
VO = VO + .5 * bp(VO, 2000, 5000)
VO *= 10 ** (-17 / 20) / rms(VO)   # speech at about −17 dBFS RMS: the reference every other layer is set against
# —— sound design (SFX that fight speech live below 300 Hz or between words)
t = T(2.35); roar = norm(lpf(lpf(nz(2.35), 220), 220)) * .8 + norm(bp(nz(2.35), 4000, 9000)) * .12 * (.5 + .5 * np.sin(t * 9))   # body under 220 Hz + air above the voice band
sub = np.sin(2 * np.pi * (34 * t + 5 * t * t)) * .6
add((roar + sub) * np.minimum(1, t / .05) * (.65 + .35 * t / 2.35) * np.minimum(1, (2.35 - t) / .05), 0, .22)
for k, at in enumerate([.35, .9, 1.45, 1.95]):   # debris: wood cracks and splats thrown ahead of the wave
    d = T(.25); add(norm(bp(nz(.25), 900, 5000)) * np.exp(-d * 40) * .7 + np.sin(2 * np.pi * 140 * d) * np.exp(-d * 25) * .4, at, .09, (-1) ** k * .5)
d = T(.4); add(norm(bp(nz(.4), 400, 6000)) * np.sin(np.pi * np.clip(d / .4, 0, 1)) ** 2, 1.95, .15)   # whoosh into the freeze
d = T(.7); add(np.sin(2 * np.pi * (62 * d - 25 * d * d)) * np.exp(-d * 7) + norm(bp(nz(.7), 200, 3000)) * np.exp(-d * 35) * .8, 2.3, .95)   # slam: thud + paper slap
d = T(.4); add(np.sin(2 * np.pi * 120 * d) * np.exp(-d * 20) + norm(bp(nz(.4), 300, 2500)) * np.exp(-d * 45) * .6, 2.85, .6, .25)   # stamp
d = T(.55); add(norm(bp(nz(.55), 300, 7000)) * (d / .55) ** 2 * np.exp(-np.maximum(0, d - .5) * 60), 4.9, .32)   # whoosh into the photo
air = norm(lpf(nz(3.65), 500)) * .5 + norm(bp(nz(3.65), 1500, 4000)) * .08; add(air * np.minimum(1, T(3.65) / .4), 5.4, .09)
for k in range(10):   # distant hooves on cobbles (horse walk: pairs)
    d = T(.06); c = norm(bp(nz(.06), 1200, 3500)) * np.exp(-d * 90); add(c, 5.6 + k * .36, .07, .5); add(c, 5.6 + k * .36 + .11, .05, .5)
d = T(1.6); f = 48 + 6 * np.sin(2 * np.pi * .7 * d); ph = 2 * np.pi * np.cumsum(f) / SR   # the tank groans: low metal resonance
groan = (np.sin(ph) + .5 * np.sin(2.01 * ph) + .3 * np.sin(3.98 * ph)) * norm(lpf(np.abs(nz(1.6)), 30)) + norm(bp(nz(1.6), 600, 900)) * .15
add(groan * np.sin(np.pi * d / 1.6), 6.35, .25)
# —— music, ducked under the voice (sidechain from the VO envelope, 40 ms attack, 250 ms release)
mus = load('score.wav', 0, DUR, ch=2); mus = np.pad(mus, ((0, max(0, N - len(mus))), (0, 0)))[:N]
envv = np.abs(VO); a, r = np.exp(-1 / (.04 * SR)), np.exp(-1 / (.25 * SR)); e = np.zeros(N); s = 0.
for k in range(0, N, 48):   # block-wise envelope follower (1 ms blocks)
    v = envv[k:k + 48].max(); s = (a if v > s else r) * s + (1 - (a if v > s else r)) * v; e[k:k + 48] = s
act = np.clip(e / (e.max() + 1e-9) * 3, 0, 1)   # 1 while the voice is speaking
L -= .7 * bp(L, 700, 4500) * act; R -= .7 * bp(R, 700, 4500) * act   # SFX also step out of the voice band while it speaks
mus *= 10 ** (-33 / 20) / rms(mus[:, 0])   # score bed about 14 dB under the voice, before ducking
for c in (0, 1):   # under speech: duck 6 dB more and carve the 1–4 kHz presence band out of the music
    m = mus[:, c]; mid = bp(m, 1000, 4000); m = (m - .6 * mid * act) * (1 - .5 * act); (L if c == 0 else R)[:] += m
L += VO; R += VO
mx = np.stack([L, R], 1); mx /= max(1, np.abs(mx).max() / .95)
with wave.open('mix.wav', 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mx * 32767).astype('<i2').tobytes())
print('mix.wav ok')
