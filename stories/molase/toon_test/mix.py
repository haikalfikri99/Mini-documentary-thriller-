# Test clip audio: the original VO (two segments) + procedural SFX. Output mix.wav (48 kHz stereo).
import subprocess, numpy as np, wave, sys
SR = 48000
def vo(a, b):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(a), '-t', str(b - a), '-i', '../audio/vo_molase.mp3', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).copy()
DUR = 6.3; N = int(DUR * SR); L = np.zeros(N); R = np.zeros(N)
def add(buf, at, gain=1.0, pan=0.0):
    i = int(at * SR); j = min(N, i + len(buf)); L[i:j] += buf[:j - i] * gain * (1 - max(0, pan)); R[i:j] += buf[:j - i] * gain * (1 + min(0, pan))
rng = np.random.default_rng(7)
def lowpass(x, a):
    y = np.zeros_like(x); s = 0.0
    for i in range(len(x)): s += a * (x[i] - s); y[i] = s
    return y
# S07: the roar of the wave (filtered brown noise, swelling), a deep thud at the cut, faint screams
n = int(3.5 * SR); t = np.arange(n) / SR
brown = np.cumsum(rng.standard_normal(n)); brown -= np.convolve(brown, np.ones(4800) / 4800, 'same'); brown /= np.abs(brown).max()
roar = lowpass(brown, .05) * (0.35 + 0.65 * (t / 3.5) ** 1.2); roar /= np.abs(roar).max()
add(roar * np.minimum(1, (3.5 - t) / .08), 0, .55)
thud = np.sin(2 * np.pi * (55 * t[:SR] - 20 * t[:SR] ** 2)) * np.exp(-t[:SR] * 6); add(thud, 0, .7)
crack = rng.standard_normal(int(.25 * SR)) * np.exp(-np.arange(int(.25 * SR)) / SR * 20); add(lowpass(crack, .3), 1.9, .35, -.4)
# S14: drips into a tin cup at the VO times, quiet harbour air
for d in [35.6, 36.17, 37.25, 38.05]:
    tt = np.arange(int(.35 * SR)) / SR; f = 1500 * np.exp(-tt * 9) + 700
    plink = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 18) + .5 * np.sin(2 * np.pi * 2900 * tt) * np.exp(-tt * 30)
    add(plink, 3.5 + d - 35.55, .32, .2)
air = lowpass(rng.standard_normal(int(2.8 * SR)), .02); air /= np.abs(air).max(); add(air, 3.5, .08)
# VO on top
add(vo(14.95, 18.45), 0, 1.0); add(vo(35.55, 38.35), 3.5, 1.0)
m = np.stack([L, R], 1); m /= max(1, np.abs(m).max() / .95)
with wave.open('mix.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((m * 32767).astype('<i2').tobytes())
print('mix.wav', m.shape[0] / SR, 's')
