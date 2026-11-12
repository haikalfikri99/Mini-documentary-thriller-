# Full mix for ARSIP 002 (44.83 s) → mix_full.wav. Voice first (Murch): the levelled VO (vo_chain.py → vo_level.wav) on top,
# score_full.wav ducked under it with the 1–4 kHz band carved out while she speaks, SFX synced to what happens on screen
# (times = film seconds, from storyboard v2 / film2/film.js). All SFX are synthesised here (numpy/scipy), no samples.
import subprocess, numpy as np, wave
from scipy.signal import butter, sosfilt
SR = 48000; DUR = 44.83; N = int(DUR * SR); rng = np.random.default_rng(2)
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
def thud(d=.7, f=62): t = T(d); return np.sin(2 * np.pi * (f * t - 25 * t * t)) * np.exp(-t * 7) + norm(bp(nz(d), 200, 3000)) * np.exp(-t * 35) * .8
def stampS(): t = T(.4); return np.sin(2 * np.pi * 120 * t) * np.exp(-t * 20) + norm(bp(nz(.4), 300, 2500)) * np.exp(-t * 45) * .6
def whoosh(d=.45, lo=300, hi=6000): t = T(d); return norm(bp(nz(d), lo, hi)) * np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
def swipe(): t = T(.22); return norm(bp(nz(.22), 1800, 7000)) * np.sin(np.pi * t / .22) ** 3 * .7 + np.sin(2 * np.pi * 2600 * t) * np.exp(-t * 60) * .05
def click(f=3200): t = T(.05); return norm(bp(nz(.05), 1500, 9000)) * np.exp(-t * 180) + np.sin(2 * np.pi * f * t) * np.exp(-t * 120) * .4
def key(): t = T(.06); return norm(bp(nz(.06), 900, 6000)) * np.exp(-t * 110) + np.sin(2 * np.pi * 180 * t) * np.exp(-t * 90) * .3
def tick(f=4200): t = T(.03); return np.sin(2 * np.pi * f * t) * np.exp(-t * 220) + norm(bp(nz(.03), 3000, 9000)) * np.exp(-t * 300) * .4
def coin(f=2600): t = T(.45); return (np.sin(2 * np.pi * f * t) + .6 * np.sin(2 * np.pi * f * 1.51 * t) + .3 * np.sin(2 * np.pi * f * 2.33 * t)) * np.exp(-t * 9)
def shatter(d=1.0):
    t = T(d); b = norm(bp(nz(d), 2500, 10000)) * np.exp(-t * 6)
    for k in range(14):
        c = coin(3000 + 400 * k) * .25; i = int(rng.uniform(.02, .7) * SR); n = min(len(c), len(b) - i); b[i:i + n] += c[:n]
    return b + np.sin(2 * np.pi * 70 * t) * np.exp(-t * 12) * .8
def pixels(d=.9):
    out = np.zeros(int(d * SR))
    for k in range(18):
        s = np.sin(2 * np.pi * (3200 + 150 * (k % 7)) * T(.07)) * np.exp(-T(.07) * 45); i = int(k / 18 * d * .85 * SR); out[i:i + len(s)] += s[:len(out) - i]
    return out
def unroll(d=1.3): t = T(d); return norm(bp(nz(d), 1200, 8000)) * (.5 + .5 * np.sin(t * 60) ** 2) * np.sin(np.pi * t / d)
def step(): t = T(.12); return np.sin(2 * np.pi * 90 * t) * np.exp(-t * 40) + norm(bp(nz(.12), 400, 2500)) * np.exp(-t * 60) * .4
def hum(d, f=60): t = T(d); return (np.sin(2 * np.pi * f * t) * .5 + np.sin(2 * np.pi * 2 * f * t) * .3 + norm(bp(nz(d), 6000, 9000)) * .05) * np.minimum(1, t / .3) * np.minimum(1, (d - t) / .3)
def air(d, hi=500): return norm(lpf(nz(d), hi)) * np.minimum(1, T(d) / .4) * np.minimum(1, (d - T(d)) / .4)
def fan(d): t = T(d); return norm(bp(nz(d), 150, 1200)) * (.75 + .25 * np.sin(2 * np.pi * 4.3 * t)) * np.minimum(1, t / .4) * np.minimum(1, (d - t) / .4)
def creak(d=1.0): t = T(d); f = 300 + 80 * np.sin(2 * np.pi * 3 * t); ph = 2 * np.pi * np.cumsum(f) / SR; return np.sign(np.sin(ph)) * norm(lpf(np.abs(nz(d)), 40)) * np.sin(np.pi * t / d) * .4
def lid(): t = T(.5); return np.sin(2 * np.pi * (110 * t - 30 * t * t)) * np.exp(-t * 14) + norm(bp(nz(.5), 300, 3000)) * np.exp(-t * 40) * .6
def tapestop(d=.35): t = T(d); return np.sin(2 * np.pi * np.cumsum(220 * (1 - t / d) ** 2) / SR) * (1 - t / d) * .6
def crackle(): t = T(.08); return norm(bp(nz(.08), 1200, 7000)) * np.exp(-t * 70) + np.sin(2 * np.pi * 900 * t) * np.exp(-t * 80) * .3
def glassChime():
    out = np.zeros(int(1.6 * SR))
    for k, f in enumerate((2637, 2093, 1760, 1397, 1175)):
        s = coin(f) * np.exp(-T(.45) * 2); i = int(k * .07 * SR); out[i:i + len(s)] += s[:len(out) - i] * (1 - k * .12)
    return out
def powerdown(d=.7): t = T(d); return np.sin(2 * np.pi * np.cumsum(180 * (1 - t / d) ** 1.5 + 40) / SR) * (1 - t / d) * .5
def chime(f=880): t = T(1.2); return (np.sin(2 * np.pi * f * t) + .4 * np.sin(2 * np.pi * f * 2 * t)) * np.exp(-t * 3)

# —— SFX timeline (film seconds) ——
add(air(4.5, 400), 0, .12); add(hum(4.5, 50), 0, .05)                                          # S01 Raskin's dark room
[add(swipe(), t, .22, .2) for t in (1.62, 2.3)]                                                 # S02 thumb swipes the feed
add(whoosh(.3, 400, 5000), 4.24, .14); add(thud(), 4.50, .85); add(air(1.3, 300), 4.55, .08); add(stampS(), 5.24, .6, .2); add(thud(.35, 90), 5.25, .35, .2)     # S04 freeze → archive slam + stamp
add(air(6.0, 900), 5.84, .07)                                                                    # 2006 office daytime air
[add(key(), 5.9 + k * .13 + rng.uniform(0, .04), .16, .3) for k in range(7)]                  # S05 typing
add(unroll(1.3), 6.95, .2)                                                                      # S06 the page pours down
add(click(), 8.55, .3); add(whoosh(.35, 1500, 7000), 8.7, .1); add(pixels(.4), 9.2, .05)       # S07 drag the button away
add(click(2600), 9.9, .3, .2)                                                                   # S08 mouse
[add(click(), t + .05, .35) for t in (10.4, 10.66, 11.0)]                                       # S09 three page clicks
add(tapestop(), 11.66, .25); add(thud(.5, 45), 11.8, .4)                                        # "Tapi": everything stops
add(hum(2.3, 100), 12.68, .08); add(thud(.4, 80), 12.7, .35)                                    # S11 spotlight on the button
[add(tick(), 15.02 + k * 1.0, .22, -.3) for k in range(3)]                                      # S12 the wall clock
add(swipe(), 17.4, .2, -.5); add(chime(587), 18.62, .12, .5)                                    # S13 lanjut (left) / udahan (right)
add(hum(1.08, 110), 19.06, .07); [add(crackle(), t, .3, .1) for t in (19.74, 19.86, 19.97, 20.06)]; add(shatter(1.3), 20.14, .6); add(glassChime(), 20.14, .35); add(powerdown(), 20.18, .22); add(thud(.6, 55), 20.14, .6)                                     # S14 the button breaks
[add(step(), 20.85 + k * .5, .3, .1) for k in range(4)]; [add(whoosh(.25, 1500, 6000), 20.9 + k * .3, .05) for k in range(6)]   # S15 walking on cards
add(whoosh(1.8, 200, 4000), 22.95, .22)                                                         # S16 into the tunnel
add(fan(3.2), 24.94, .1); [add(swipe(), 25.1 + k * .48, .15, .15) for k in range(3)]           # S17 fan at 01:47, swipes
[add(coin(2400 + 200 * (k % 3)), 26.72 + k * .22, .12, (-1) ** k * .3) for k in range(6)]     # S18 coins rise to the tower
add(hum(2.2, 60), 28.1, .08); add(air(2.2, 300), 28.1, .08)                                     # S19 2019 room of screens
[add(key(), 30.5 + k * .12, .16) for k in range(5)]; add(click(), 31.15, .3); add(pixels(.8), 31.4, .12)   # S20 select, delete, pixels
add(creak(1.3), 32.4, .12); add(creak(1.2), 33.9, .1, .3)                                       # S21 strings tighten
add(lid(), 36.55, .5); add(thud(.4, 50), 36.6, .3)                                              # S22 laptop closes, light out
[add(tick(3600), 37.7 + k * .5, .12) for k in range(4)]                                         # S23 the bar ticks
[add(swipe(), 39.7 + k * .45, .12, .1) for k in range(4)]                                       # S24 the feed keeps going
[add(swipe(), t, .16, .1) for t in (41.6, 41.82, 42.02)]; add(whoosh(.4, 600, 3000), 42.22, .12); add(click(2200), 44.18, .55); add(thud(.4, 70), 44.2, .3); add(chime(440), 44.2, .1)             # S25 the thumb places UDAHAN

SFX_STEM = (L + R) / 2   # kept for the timing check (check_audio.py)
np.save('stem_sfx.npy', SFX_STEM.astype(np.float32))
# —— VO (already levelled by vo_chain.py) ——
VO = load('vo_level.wav'); VO *= 10 ** (-17 / 20) / rms(VO)
e = np.zeros(N); s = 0.; a, r = np.exp(-1 / (.04 * SR)), np.exp(-1 / (.25 * SR)); env = np.abs(VO)
for k in range(0, N, 48): v = env[k:k + 48].max(); c = a if v > s else r; s = c * s + (1 - c) * v; e[k:k + 48] = s
act = np.clip(e / (np.percentile(e, 95) + 1e-9) * 2, 0, 1)
L -= .7 * bp(L, 700, 4500) * act; R -= .7 * bp(R, 700, 4500) * act   # SFX step out of the voice band while it speaks
mus = load('score_full.wav', 2); mus *= 10 ** (-30 / 20) / rms(mus[:, 0])
for c in (0, 1): m = mus[:, c]; m = (m - .6 * bp(m, 1000, 4000) * act) * (1 - .5 * act); (L if c == 0 else R)[:] += m
for a0, b0 in [(0, 4.5), (4.5, 11.8), (19.0, 24.9), (24.9, 28.1), (30.3, 35.6), (41.5, 44.8)]:
    i, j = int(a0 * SR), int(b0 * SR); print(f'{a0:5.1f}–{b0:5.1f}  voice {20*np.log10(rms(bp(VO,300,4000)[i:j])):6.1f}  bed {20*np.log10(rms(bp(L,300,4000)[i:j])):6.1f} dB (300 Hz–4 kHz)')
L += VO; R += VO
fade = np.minimum(1, np.minimum(T(DUR)[:N] / .02, (DUR - T(DUR)[:N]) / .05)); L *= fade; R *= fade
mx = np.stack([L, R], 1); mx /= max(1, np.abs(mx).max() / .95)
with wave.open('mix_full.wav', 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mx * 32767).astype('<i2').tobytes())
print('mix_full.wav ok')
