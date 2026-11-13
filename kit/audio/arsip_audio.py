# ARSIP audio kit — the channel's synthesised sound library + the standard mix (no samples, no paid APIs).
# Usage in an episode (stories/<slug>/film/fullmix.py):
#   import sys; sys.path.insert(0, '../../../kit/audio'); from arsip_audio import *
#   mx = Mixer(dur); mx.add(thud(), 4.5, .85); ...; mx.finish('vo_level.wav', 'score_full.wav', report=[(0, 4.5), ...])
# Mix rules (references/3-audio.md): voice first; SFX step out of 700 Hz–4.5 kHz while the voice speaks; score at −30 dBFS RMS,
# −6 dB and 1–4 kHz carved under the voice; VO at −17 dBFS RMS; final loudnorm −14 LUFS / −1 dBTP at mux.
import subprocess, numpy as np, wave
from scipy.signal import butter, sosfilt
SR = 48000; rng = np.random.default_rng(2)
def load(path, n, ch=1):
    x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', str(ch), '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout, np.float32).astype(float)
    x = x.reshape(-1, ch) if ch > 1 else x; pad = n - len(x)
    return (np.pad(x, ((0, max(0, pad)), (0, 0))) if ch > 1 else np.pad(x, (0, max(0, pad))))[:n]
bp = lambda x, lo, hi: sosfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), x)
lpf = lambda x, f: sosfilt(butter(4, f, 'low', fs=SR, output='sos'), x)
hpf = lambda x, f: sosfilt(butter(2, f, 'high', fs=SR, output='sos'), x)
T = lambda d: np.arange(int(d * SR)) / SR
nz = lambda d: rng.standard_normal(int(d * SR))
norm = lambda x: x / (np.abs(x).max() + 1e-9)
rms = lambda x: np.sqrt((x[np.abs(x) > 1e-4] ** 2).mean())

# —— sound library ——————————————————————————————————————————————————————————
# impacts: thud stampS boom crack crackle lid · air/rooms: air hum fan roar groan · motion: whoosh swipe unroll step creak screech
# UI/objects: click key tick coin chime glassChime pixels shatter powerdown tapestop ping plink flip gloop horn
def thud(d=.7, f=62): t = T(d); return np.sin(2 * np.pi * (f * t - 25 * t * t)) * np.exp(-t * 7) + norm(bp(nz(d), 200, 3000)) * np.exp(-t * 35) * .8
def stampS(): t = T(.4); return np.sin(2 * np.pi * 120 * t) * np.exp(-t * 20) + norm(bp(nz(.4), 300, 2500)) * np.exp(-t * 45) * .6
def whoosh(d=.45, lo=300, hi=6000): t = T(d); return norm(bp(nz(d), lo, hi)) * np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
def swipe(): t = T(.22); return norm(bp(nz(.22), 4200, 9500)) * np.sin(np.pi * t / .22) ** 3 * .7 + np.sin(2 * np.pi * 2600 * t) * np.exp(-t * 60) * .05
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

def roar(d): t = T(d); return (norm(lpf(nz(d), 220)) * .8 + np.sin(2 * np.pi * (34 * t + 4 * t * t)) * .6 + norm(bp(nz(d), 4000, 9000)) * .1) * np.minimum(1, t / .05) * np.minimum(1, (d - t) / .08)
def ping(f=2400): t = T(.35); return (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 2.7 * t)) * np.exp(-t * 14) + norm(bp(nz(.35), 2000, 8000)) * np.exp(-t * 60) * .5
def crack(d=.3): t = T(d); return norm(bp(nz(d), 900, 5000)) * np.exp(-t * 30) + np.sin(2 * np.pi * 140 * t) * np.exp(-t * 25) * .4
def boom(d=2.0): t = T(d); return np.sin(2 * np.pi * (45 * t - 8 * t * t)) * np.exp(-t * 2.2) + norm(lpf(nz(d), 400)) * np.exp(-t * 2.5) * .8 + norm(bp(nz(d), 800, 6000)) * np.exp(-t * 10) * .5
def screech(d=1.2): t = T(d); f = 900 + 500 * np.sin(2 * np.pi * 1.3 * t); ph = 2 * np.pi * np.cumsum(f) / SR; return (np.sin(ph) + .4 * np.sin(2.31 * ph)) * np.sin(np.pi * t / d) * (.6 + .4 * np.sin(t * 40))
def groan(d=1.6): t = T(d); f = 48 + 6 * np.sin(2 * np.pi * .7 * t); ph = 2 * np.pi * np.cumsum(f) / SR; return (np.sin(ph) + .5 * np.sin(2.01 * ph) + .3 * np.sin(3.98 * ph)) * norm(lpf(np.abs(nz(d)), 30)) * np.sin(np.pi * t / d)
def gloop(): t = T(.25); f = 140 + 260 * t; return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14)
def plink(f=1500): t = T(.5); return np.sin(2 * np.pi * (f * t + 400 * t * t)) * np.exp(-t * 12)
def flip(): t = T(.3); return norm(bp(nz(.3), 1500, 7000)) * np.sin(np.pi * t / .3) ** 3
def horn(d=1.2): t = T(d); return (np.sin(2 * np.pi * 98 * t) + .6 * np.sin(2 * np.pi * 147 * t) + .3 * np.sin(2 * np.pi * 196 * t)) * np.minimum(1, t / .15) * np.minimum(1, (d - t) / .3)

# —— the standard mix ————————————————————————————————————————————————————————
class Mixer:
    def __init__(self, dur):
        self.dur = dur; self.N = int(dur * SR); self.L = np.zeros(self.N); self.R = np.zeros(self.N)
    def add(self, buf, at, gain=1., pan=0.):
        i = int(at * SR); j = min(self.N, i + len(buf))
        if j <= i: return
        b = buf[:j - i] * gain; self.L[i:j] += b * (1 - max(0, pan)); self.R[i:j] += b * (1 + min(0, pan))
    def finish(self, vo, score, report=(), out='mix_full.wav', vo_db=-17, score_db=-30, words=None):
        N, L, R = self.N, self.L, self.R
        np.save('stem_sfx.npy', ((L + R) / 2).astype(np.float32))   # for check_audio.py (git-ignored)
        VO = load(vo, N); VO *= 10 ** (vo_db / 20) / rms(VO)
        e = np.zeros(N); s = 0.; a, r = np.exp(-1 / (.04 * SR)), np.exp(-1 / (.25 * SR)); env = np.abs(VO)
        for k in range(0, N, 48): v = env[k:k + 48].max(); c = a if v > s else r; s = c * s + (1 - c) * v; e[k:k + 48] = s
        act = np.clip(e / (np.percentile(e, 95) + 1e-9) * 2, 0, 1)
        L -= .7 * bp(L, 700, 4500) * act; R -= .7 * bp(R, 700, 4500) * act
        mus = load(score, N, 2); mus *= 10 ** (score_db / 20) / rms(mus[:, 0])
        for c in (0, 1): m = mus[:, c]; m = (m - .6 * bp(m, 1000, 4000) * act) * (1 - .5 * act); (L if c == 0 else R)[:] += m
        worst = 99
        for a0, b0 in report:
            i, j = int(a0 * SR), int(b0 * SR); v = 20 * np.log10(rms(bp(VO, 300, 4000)[i:j])); bd = 20 * np.log10(rms(bp(L, 300, 4000)[i:j])); worst = min(worst, v - bd)
            print(f'{a0:5.1f}–{b0:5.1f}  voice {v:6.1f}  bed {bd:6.1f}  margin {v - bd:5.1f} dB (300 Hz–4 kHz)')
        if report: print(f'worst voice margin {worst:.1f} dB (target ≥ 10)')
        if words:   # per-word check: catches a hit landing on one word, which section averages hide
            import json; bad = []
            for t0, t1, wd in json.load(open(words)):
                i, j = int(t0 * SR), int(max(t1, t0 + .12) * SR); v = rms(bp(VO, 300, 4000)[i:j]); bd = rms(bp(L, 300, 4000)[i:j]) + 1e-9
                m = 20 * np.log10(v / bd)
                if 20 * np.log10(v + 1e-9) < -50: bad.append(f'{wd}@{t0:.2f} (no voice here: check alignment)')
                elif m < 8: bad.append(f'{wd}@{t0:.2f} {m:.1f} dB')
            print('words under 8 dB:', ', '.join(bad) if bad else 'none')
            self.failed = bool(bad)
        self.failed = getattr(self, 'failed', False) or (bool(report) and worst < 10)
        L += VO; R += VO
        tt = np.arange(N) / SR; fade = np.minimum(1, np.minimum(tt / .02, (self.dur - tt) / .05)); L *= fade; R *= fade
        mx = np.stack([L, R], 1); mx /= max(1, np.abs(mx).max() / .95)
        with wave.open(out, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mx * 32767).astype('<i2').tobytes())
        print(out, 'ok')
        if self.failed:
            print('AUDIO QA GAGAL: perbaiki cue/level sebelum render (margin bagian < 10 dB atau ada kata < 8 dB)')
            raise SystemExit(2)

# —— paper foley (ARSIP Kolase): one sound per on-screen paper event (kit/collage/engine.js EV) ———————————
def paperSlap(size=1.):   # high crack + paper body + low thump; bigger sheets thump lower
    t = T(.35); f = 70 + 40 / max(.3, size)
    return (norm(bp(nz(.35), 2500, 8000)) * np.exp(-t * 90) * .5 + norm(bp(nz(.35), 400, 2500)) * np.exp(-t * 30) * .6
            + np.sin(2 * np.pi * f * t) * np.exp(-t * 18) * min(1.2, .5 + .6 * size))
def paperSlide(d=.3):     # band-passed fibre noise with grain, swelling over the move
    t = T(d + .05); g = 1 + .5 * np.sign(np.sin(2 * np.pi * 37 * t)) * .3
    return norm(bp(nz(d + .05), 900, 6000)) * g * np.sin(np.pi * np.clip(t / (d + .05), 0, 1)) ** 1.5 * .6
def paperPat(size=1.): t = T(.18); return norm(bp(nz(.18), 300, 2200)) * np.exp(-t * 40) * .6 + np.sin(2 * np.pi * 95 * t) * np.exp(-t * 30) * .35 * size
def stampThump(): t = T(.5); return np.sin(2 * np.pi * (85 * t - 20 * t * t)) * np.exp(-t * 16) + norm(bp(nz(.5), 250, 1800)) * np.exp(-t * 50) * .5
def penScratch(d=.3): t = T(d); return norm(bp(nz(d), 2500, 9000)) * (.6 + .4 * np.abs(np.sin(2 * np.pi * 11 * t))) * np.minimum(1, t / .03) * np.minimum(1, (d - t) / .05) * .5
def typeKey(): t = T(.07); return norm(bp(nz(.07), 1200, 7000)) * np.exp(-t * 120) + np.sin(2 * np.pi * 160 * t) * np.exp(-t * 80) * .35
