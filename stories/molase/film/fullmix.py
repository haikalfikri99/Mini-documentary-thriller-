# Full film mix (61 s) → mix_full.wav: cleaned VO (high-pass, phrase leveller, presence) on top; score_full.wav ducked under it
# with the 1–4 kHz band carved out while the voice speaks; SFX synced to what happens on screen (times = film seconds).
import subprocess, numpy as np, wave
from scipy.signal import butter, sosfilt
SR = 48000; DUR = 60.75; N = int(DUR * SR); rng = np.random.default_rng(7)
L = np.zeros(N); R = np.zeros(N)
def load(path, ch=1):
    x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', str(ch), '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout, np.float32).astype(float)
    x = x.reshape(-1, ch) if ch > 1 else x; pad = N - len(x)
    return (np.pad(x, ((0, max(0, pad)), (0, 0))) if ch > 1 else np.pad(x, (0, max(0, pad))))[:N]
bp = lambda x, lo, hi: sosfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), x)
lpf = lambda x, f: sosfilt(butter(4, f, 'low', fs=SR, output='sos'), x)
hpf = lambda x, f: sosfilt(butter(2, f, 'high', fs=SR, output='sos'), x)
T = lambda d: np.arange(int(d * SR)) / SR
nz = lambda d: rng.standard_normal(int(d * SR))
norm = lambda x: x / (np.abs(x).max() + 1e-9)
rms = lambda x: np.sqrt((x[np.abs(x) > 1e-4] ** 2).mean())
def add(buf, at, gain=1., pan=0.):
    i = int(at * SR); j = min(N, i + len(buf)); b = buf[:j - i] * gain; L[i:j] += b * (1 - max(0, pan)); R[i:j] += b * (1 + min(0, pan))
# —— sound library (synthesised)
def roar(d): t = T(d); return (norm(lpf(nz(d), 220)) * .8 + np.sin(2 * np.pi * (34 * t + 4 * t * t)) * .6 + norm(bp(nz(d), 4000, 9000)) * .1) * np.minimum(1, t / .05) * np.minimum(1, (d - t) / .08)
def thud(d=.7, f=62): t = T(d); return np.sin(2 * np.pi * (f * t - 25 * t * t)) * np.exp(-t * 7) + norm(bp(nz(d), 200, 3000)) * np.exp(-t * 35) * .8
def stampS(): t = T(.4); return np.sin(2 * np.pi * 120 * t) * np.exp(-t * 20) + norm(bp(nz(.4), 300, 2500)) * np.exp(-t * 45) * .6
def ping(f=2400): t = T(.35); return (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 2.7 * t)) * np.exp(-t * 14) + norm(bp(nz(.35), 2000, 8000)) * np.exp(-t * 60) * .5
def crack(d=.3): t = T(d); return norm(bp(nz(d), 900, 5000)) * np.exp(-t * 30) + np.sin(2 * np.pi * 140 * t) * np.exp(-t * 25) * .4
def whoosh(d=.45, lo=300, hi=6000): t = T(d); return norm(bp(nz(d), lo, hi)) * np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
def boom(d=2.0): t = T(d); return np.sin(2 * np.pi * (45 * t - 8 * t * t)) * np.exp(-t * 2.2) + norm(lpf(nz(d), 400)) * np.exp(-t * 2.5) * .8 + norm(bp(nz(d), 800, 6000)) * np.exp(-t * 10) * .5
def screech(d=1.2): t = T(d); f = 900 + 500 * np.sin(2 * np.pi * 1.3 * t); ph = 2 * np.pi * np.cumsum(f) / SR; return (np.sin(ph) + .4 * np.sin(2.31 * ph)) * np.sin(np.pi * t / d) * (.6 + .4 * np.sin(t * 40))
def groan(d=1.6): t = T(d); f = 48 + 6 * np.sin(2 * np.pi * .7 * t); ph = 2 * np.pi * np.cumsum(f) / SR; return (np.sin(ph) + .5 * np.sin(2.01 * ph) + .3 * np.sin(3.98 * ph)) * norm(lpf(np.abs(nz(d)), 30)) * np.sin(np.pi * t / d)
def gloop(): t = T(.25); f = 140 + 260 * t; return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14)
def plink(f=1500): t = T(.5); return np.sin(2 * np.pi * (f * t + 400 * t * t)) * np.exp(-t * 12)
def flip(): t = T(.3); return norm(bp(nz(.3), 1500, 7000)) * np.sin(np.pi * t / .3) ** 3
def air(d, lo=60, hi=500): return norm(lpf(nz(d), hi)) * np.minimum(1, T(d) / .4) * np.minimum(1, (d - T(d)) / .4)
def horn(d=1.2): t = T(d); return (np.sin(2 * np.pi * 98 * t) + .6 * np.sin(2 * np.pi * 147 * t) + .3 * np.sin(2 * np.pi * 196 * t)) * np.minimum(1, t / .15) * np.minimum(1, (d - t) / .3)
# —— the SFX timeline (film seconds)
add(roar(2.9), 0, .22); [add(crack(.25), t, .09, (-1) ** i * .5) for i, t in enumerate([.35, .9, 1.45, 1.95, 2.4])]
add(whoosh(.4), 2.5, .12); add(thud(), 2.9, .9); add(stampS(), 3.45, .55, .25)
add(air(1.2, hi=300), 4.2, .1); add(gloop(), 6.0, .15); add(gloop(), 6.8, .12)
add(stampS(), 7.92, .55, -.2); add(ping(1800) * .5, 9.16, .3)
add(air(2.9), 9.7, .08); [add(crack(.06) * .4, 9.9 + k * .36, .05, .5) for k in range(8)]; add(groan(), 10.6, .25)
[add(ping(2600 + 300 * k), 12.6 + t, .3, (-1) ** k * .4) for k, t in enumerate([.22, .42, .6, .76, .9, 1.02, 1.12])]
add(lpf(boom(), 260), 14.05, 1.3); add(crack(.5), 14.55, .3)   # the boom stays under the word "pecah"; the crack lands after it
add(roar(1.6), 15.0, .22); add(stampS(), 16.65, .5); add(whoosh(.5, 200, 3000), 17.5, .15)
add(roar(1.2), 18.5, .2); add(crack(.3), 18.9, .15); add(whoosh(.3, 2000, 7000) * .6, 19.7, .12)
add(screech(1.4), 21.75, .08); add(roar(1.85), 21.55, .16); add(boom(1.2) * .5, 22.12, .4)
add(crack(.4), 23.5, .22); add(crack(.3), 23.75, .18, .4); add(crack(.3), 24.0, .16, -.4)
[add(gloop(), 24.7 + k * .37, .14, (-1) ** k * .3) for k in range(7)]
add(flip(), 27.35, .25); add(flip(), 27.8, .22)
[add(whoosh(.18, 800, 4000), 29.1 + k * 1.14 / 1, .06) for k in range(2)]; [add(whoosh(.16, 900, 4000), 29.0 + k * .57, .05, .3) for k in range(3)]
add(gloop() * .7, 32.0, .1); add(plink(900), 34.8, .2); add(plink(1400), 37.3, .3)
add(air(2.1, hi=900), 38.3, .1)
add(stampS(), 41.4, .5); add(crack(.6) * .5, 42.3, .2); add(crack(.4) * .4, 42.9, .18); add(stampS(), 43.75, .55)
add(horn(), 46.0, .14); [add(stampS(), t, .45, p) for t, p in ((47.2, -.3), (47.55, .3), (47.9, -.2))]; add(thud(.6, 50), 48.35, .6)
add(air(4.2, hi=200), 49.6, .05); add(air(1.8, hi=300), 52.0, .06)
add(air(2.2), 53.8, .07); add(whoosh(.8, 200, 4000), 55.5, .12); add(thud(), 59.93, .9); add(roar(.3), 60.45, .2)
# —— VO chain (the recording itself is untouched)
VO = load('../audio/vo_molase.mp3'); VO = hpf(VO, 100); sb = bp(VO, 300, 4000); win = int(.3 * SR)
lev = np.sqrt(np.convolve(sb ** 2, np.ones(win) / win, 'same')) + 1e-6; ref = np.percentile(lev[lev > 1e-3], 75)
gg = np.clip(ref / lev, 10 ** (-12 / 20), 10 ** (12 / 20)); gg[lev < ref * .08] = 1; gg = np.convolve(gg, np.ones(int(.25 * SR)) / int(.25 * SR), 'same')
VO = VO * gg; VO = VO + .5 * bp(VO, 2000, 5000); VO *= 10 ** (-17 / 20) / rms(VO)
e = np.zeros(N); s = 0.; a, r = np.exp(-1 / (.04 * SR)), np.exp(-1 / (.25 * SR)); env = np.abs(VO)
for k in range(0, N, 48): v = env[k:k + 48].max(); c = a if v > s else r; s = c * s + (1 - c) * v; e[k:k + 48] = s
act = np.clip(e / (np.percentile(e, 95) + 1e-9) * 2, 0, 1)
L -= .7 * bp(L, 700, 4500) * act; R -= .7 * bp(R, 700, 4500) * act   # SFX step out of the voice band while it speaks
mus = load('score_full.wav', 2); mus *= 10 ** (-32 / 20) / rms(mus[:, 0])
for c in (0, 1): m = mus[:, c]; m = (m - .6 * bp(m, 1000, 4000) * act) * (1 - .5 * act); (L if c == 0 else R)[:] += m
for a0, b0 in [(0, 2.9), (14.0, 15.0), (21.5, 24.5), (59.9, 60.75)]:   # report: speech-band margin of voice over everything else
    i, j = int(a0 * SR), int(b0 * SR); print(f'{a0:5.1f}–{b0:5.1f}  voice {20*np.log10(rms(bp(VO,300,4000)[i:j])):6.1f}  bed {20*np.log10(rms(bp(L,300,4000)[i:j])):6.1f} dB (300 Hz–4 kHz)')
L += VO; R += VO
mx = np.stack([L, R], 1); mx /= max(1, np.abs(mx).max() / .95)
with wave.open('mix_full.wav', 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mx * 32767).astype('<i2').tobytes())
print('mix_full.wav ok')
