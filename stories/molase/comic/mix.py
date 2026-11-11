# Audio for the key-scene preview: VO 0–5.4 + 9.0–12.65 and sound design (rumble, slam, stamp, clock, street air). → mix.wav
import subprocess, numpy as np, wave
SR = 48000; DUR = 9.05; N = int(DUR * SR); L = np.zeros(N); R = np.zeros(N); rng = np.random.default_rng(3)
def vo(a, b):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(a), '-t', str(b - a), '-i', '../audio/vo_molase.mp3', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).astype(float)
def add(buf, at, gain=1., pan=0.):
    i = int(at * SR); j = min(N, i + len(buf)); L[i:j] += buf[:j - i] * gain * (1 - max(0, pan)); R[i:j] += buf[:j - i] * gain * (1 + min(0, pan))
def lp(x, a):   # one-pole low-pass (vectorised via lfilter-like cumulative approach)
    y = np.empty_like(x); s = 0.
    for k in range(len(x)): s += a * (x[k] - s); y[k] = s
    return y
env = lambda n, a, r: np.minimum(1, np.arange(n) / (a * SR + 1)) * np.exp(-np.arange(n) / (r * SR))
# P1: deep rumble + crashing roar, swelling
n = int(2.4 * SR); t = np.arange(n) / SR
roar = lp(np.cumsum(rng.standard_normal(n)) - np.convolve(np.cumsum(rng.standard_normal(n)), np.ones(2000) / 2000, 'same'), .04); roar /= np.abs(roar).max()
sub = np.sin(2 * np.pi * (38 * t + 6 * t * t)); add((roar * .8 + sub * .5) * np.minimum(1, t / .15) * (.6 + .4 * t / 2.4) * np.minimum(1, (2.4 - t) / .1), 0, .5)
# P1→P3: slam (low thud + paper slap)
m = int(.6 * SR); tt = np.arange(m) / SR
add(np.sin(2 * np.pi * (70 * tt - 30 * tt * tt)) * np.exp(-tt * 9) + lp(rng.standard_normal(m), .5) * np.exp(-tt * 40) * .7, 2.3, .9)
# stamp lands at 2.3 + .55
add(np.sin(2 * np.pi * 110 * tt) * np.exp(-tt * 18) + lp(rng.standard_normal(m), .3) * np.exp(-tt * 30) * .5, 2.3 + .55, .55, .2)
# P8: clock ticks + quiet street air
air = lp(rng.standard_normal(int(3.7 * SR)), .015); air /= np.abs(air).max(); add(air * np.minimum(1, np.arange(len(air)) / (.3 * SR)), 5.4, .12)
for k in range(4):
    c = int(.05 * SR); tc = np.arange(c) / SR; add((np.sin(2 * np.pi * 2400 * tc) * .6 + rng.standard_normal(c) * .3) * np.exp(-tc * 120), 5.75 + k, .35, -.3)
# voice on top
add(vo(0, 5.4), 0, 1.0); add(vo(9.0, 12.65), 5.4, 1.0)
mx = np.stack([L, R], 1); mx /= max(1, np.abs(mx).max() / .95)
with wave.open('mix.wav', 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mx * 32767).astype('<i2').tobytes())
print('mix.wav ok')
