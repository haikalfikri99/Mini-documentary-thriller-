"""Sound design untuk BANJIR INI BUKAN AIR.

Semua efek disintesis secara deterministik dengan numpy (tanpa sampel pihak ketiga),
lalu dicampur dengan VO oleh ffmpeg (sidechain ducking agar narasi selalu jelas).

Jalankan dari folder ini:  python3 sound.py
Hasil: assets/sfx_bed.wav (efek saja) dan assets/soundtrack.wav (VO + efek).
"""
import subprocess
import wave

import numpy as np

SR = 48000
DUR = 63.0  # VO 61.0 s + ekor 2.0 s
N = int(SR * DUR)
rng = np.random.default_rng(1919)
t_all = np.arange(N) / SR
bed = np.zeros(N)


def env_at(points):
    """Envelope linier dari daftar (detik, gain)."""
    xs, ys = zip(*points)
    return np.interp(t_all, xs, ys)


def lowpass(x, cutoff):
    # one-pole low-pass, cukup untuk rumble
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a) * x[i] + a * acc
        y[i] = acc
    return y


def lowpass_fast(x, cutoff):
    # low-pass lewat FFT (brickwall halus) untuk sinyal panjang
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / (1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, len(x))


def bandpass_fast(x, lo, hi):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= (1 / (1 + (f / hi) ** 4)) * (1 - 1 / (1 + (f / lo) ** 4))
    return np.fft.irfft(X, len(x))


def place(sig, at, gain=1.0):
    i = int(at * SR)
    j = min(N, i + len(sig))
    bed[i:j] += sig[: j - i] * gain


def boom(dur=3.0, f0=90, f1=32, decay=1.6):
    t = np.arange(int(SR * dur)) / SR
    freq = f1 + (f0 - f1) * np.exp(-t * 7)
    phase = 2 * np.pi * np.cumsum(freq) / SR
    body = np.sin(phase) * np.exp(-t * decay)
    thump = lowpass_fast(rng.standard_normal(len(t)), 180) * np.exp(-t * 9) * 3
    s = body + thump
    return s / np.max(np.abs(s))


def crash(dur=2.5):
    t = np.arange(int(SR * dur)) / SR
    debris = bandpass_fast(rng.standard_normal(len(t)), 600, 6000) * np.exp(-t * 3.2)
    # serpihan acak (deterministik)
    for k in range(40):
        at = rng.uniform(0.02, 1.4) ** 1.6
        i = int(at * SR)
        ln = int(SR * rng.uniform(0.01, 0.04))
        if i + ln < len(t):
            debris[i : i + ln] += rng.standard_normal(ln) * np.exp(-np.arange(ln) / (ln / 4)) * rng.uniform(0.5, 1.5)
    debris /= np.max(np.abs(debris))
    return 0.55 * debris + 0.9 * boom(dur, 110, 38, 2.2)


def creak(dur=1.6):
    t = np.arange(int(SR * dur)) / SR
    # gesekan logam: noise band sempit yang dimodulasi + nada naik
    f = 180 + 260 * (t / dur) ** 2
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * (0.5 + 0.5 * np.sin(2 * np.pi * 23 * t))
    grit = bandpass_fast(rng.standard_normal(len(t)), 300, 1400) * (0.5 + 0.5 * np.sin(2 * np.pi * 31 * t)) ** 2
    s = (0.5 * tone + grit) * np.minimum(1, t / (dur * 0.7))
    return s / np.max(np.abs(s))


def ping(dur=0.18, f=2600):
    # letupan paku keling
    t = np.arange(int(SR * dur)) / SR
    s = np.sin(2 * np.pi * f * t) * np.exp(-t * 40) + rng.standard_normal(len(t)) * np.exp(-t * 120) * 0.6
    return s / np.max(np.abs(s))


def drip(f=1100):
    t = np.arange(int(SR * 0.45)) / SR
    freq = f * (1 + 0.6 * np.exp(-t * 30))
    s = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-t * 14)
    return s / np.max(np.abs(s))


def heartbeat():
    t = np.arange(int(SR * 0.5)) / SR
    one = np.sin(2 * np.pi * (48 + 30 * np.exp(-t * 20)) * t) * np.exp(-t * 14)
    s = np.zeros(int(SR * 0.8))
    s[: len(one)] += one
    i = int(SR * 0.24)
    s[i : i + len(one)] += 0.7 * one
    return s / np.max(np.abs(s))


def riser(dur):
    t = np.arange(int(SR * dur)) / SR
    p = t / dur
    noise = bandpass_fast(rng.standard_normal(len(t)), 200, 4000) * p ** 2.2
    tone = np.sin(2 * np.pi * np.cumsum(55 + 90 * p ** 2) / SR) * p ** 1.5
    s = 0.6 * noise / np.max(np.abs(noise)) + 0.5 * tone
    return s / np.max(np.abs(s))


# ---------- Drone dasar (ketegangan) ----------
drone = (
    0.55 * np.sin(2 * np.pi * 41.2 * t_all)
    + 0.35 * np.sin(2 * np.pi * 61.7 * t_all + 1.3)
    + 0.18 * np.sin(2 * np.pi * 82.4 * t_all * (1 + 0.002 * np.sin(2 * np.pi * 0.07 * t_all)))
)
drone *= 0.75 + 0.25 * np.sin(2 * np.pi * 0.18 * t_all)
air = lowpass_fast(rng.standard_normal(N), 260)
air /= np.max(np.abs(air))
drone = drone + 0.6 * air
drone_env = env_at([
    (0, 0.0), (0.05, 0.9), (2.5, 0.6), (12.6, 0.7), (14.2, 1.0), (27.5, 1.0),
    (27.75, 0.0), (30.9, 0.0), (31.5, 0.45), (44.8, 0.55), (50.5, 0.7),
    (54.2, 0.5), (60.6, 1.0), (60.7, 0.0), (DUR, 0.0),
])
bed += 0.16 * drone * drone_env

# ---------- Gemuruh gelombang (15 s – 27.6 s) ----------
rumble = lowpass_fast(rng.standard_normal(N), 140)
rumble /= np.max(np.abs(rumble))
rumble_env = env_at([(0, 0), (14.2, 0), (15.2, 1.0), (21.3, 1.0), (24.5, 0.8), (27.4, 0.7), (27.7, 0), (DUR, 0)])
bed += 0.45 * rumble * rumble_env
whoosh = bandpass_fast(rng.standard_normal(N), 250, 2200)
whoosh /= np.max(np.abs(whoosh))
whoosh_env = env_at([(0, 0), (18.4, 0), (19.0, 0.6), (21.3, 0.35), (21.5, 0), (DUR, 0)])
bed += 0.22 * whoosh * whoosh_env

# ---------- Aksen yang dikunci ke narasi ----------
place(boom(3.0), 0.0, 0.55)               # hook
place(boom(2.2, 70, 34, 2.4), 9.0, 0.3)    # "Boston, 15 Januari 1919"
place(creak(1.5), 12.7, 0.3)               # tangki menegang
for k, at in enumerate([13.75, 13.92, 14.05]):
    place(ping(f=2400 + 300 * k), at, 0.18)  # paku keling lepas
place(crash(3.0), 14.22, 0.8)              # "pecah"
place(crash(2.5), 21.6, 0.6)               # kereta layang
place(crash(2.5), 23.4, 0.5)               # bangunan hancur
place(riser(1.2), 26.5, 0.25)              # menuju 'turn'
place(boom(2.5, 60, 30, 1.8), 27.72, 0.45) # "Tapi" — semua senyap
for at in [31.6, 32.9, 34.0, 35.2, 36.3, 37.4]:
    place(drip(1050 + 70 * int(at) % 3 * 60), at, 0.12)  # tetesan molase
place(boom(2.0, 55, 30, 2.6), 38.4, 0.25)  # "Setelah bencana"
hb = heartbeat()
for k in range(6):
    place(hb, 44.9 + k * 0.95, 0.35)       # penyebab berantai
place(boom(3.5, 50, 28, 0.9), 50.7, 0.35)  # korban
place(riser(6.3), 54.3, 0.3)               # pertanyaan akhir
place(boom(1.8, 80, 30, 1.2), 60.72, 0.65) # potong hitam

peak = np.max(np.abs(bed))
bed = bed / peak * 0.89


def write_wav(path, x):
    st = np.stack([x, x], axis=1)
    pcm = (np.clip(st, -1, 1) * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


write_wav("assets/sfx_bed.wav", bed)

# VO + bed: bed di-duck oleh VO lewat sidechain, lalu loudness ~ -14 LUFS (standar YouTube)
subprocess.run([
    "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
    "-i", "audio/vo_molase.mp3", "-i", "assets/sfx_bed.wav",
    "-filter_complex",
    "[0:a]aresample=48000,aformat=channel_layouts=stereo,apad=whole_dur=63,asplit=2[vo][sc];"
    "[1:a]volume=0.9[bed];"
    "[bed][sc]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350[ducked];"
    "[vo][ducked]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[out]",
    "-map", "[out]", "-t", "63", "-ac", "2", "-ar", "48000", "assets/soundtrack.wav",
], check=True)
print("ok")
