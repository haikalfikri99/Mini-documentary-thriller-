# Score for ARSIP #008 Indomie Taiwan (ARSIP Kolase v5.0): small period ensemble, one musical idea per segment, cues from vo_words.json.
# Two keys for two answers: D minor "inspection" for Taiwan's rejections, F major for BPOM's "aman"; timpani on every verdict stamp
# (after the spoken word), xylophone on the lab findings. 120 bpm grid: one beat = 0.5 s.
import sys; sys.path.insert(0, '../../../kit/audio')
from score_lib import *
E3, Bb2, D6, F2 = 52, 46, 86, 41
PIZZ, BSN, TUBA, CLAR, GLOCK, XYL, TIMP, WOOD, TREM = 0, 1, 2, 3, 4, 5, 6, 7, 8
for ch, p in [(PIZZ, 45), (BSN, 70), (TUBA, 58), (CLAR, 71), (GLOCK, 9), (XYL, 13), (TIMP, 47), (WOOD, 115), (TREM, 44)]: prog(ch, p)
reverb(range(10), 55)
END = 54.42
walk = [D3, F3, A3, F3, D3, F3, A3, C4]
fwalk = [F3, A3, C4, A3, F3, A3, C4, E3 + 12]
def pizz(t0, t1, seq, v0=62, v1=50):
    k, t = 0, t0
    while t < t1 - .05: note(PIZZ, seq[k % len(seq)], t, .28, v0 if k % 2 == 0 else v1); k += 1; t += .5
# 1 · HOOK (0–2.62): DITOLAK TAIWAN on frame 0, three knocks on "tiga kali"
note(TIMP, D2, 0.14, .5, 94); note(TUBA, D2, 0.6, .8, 84)
for i in range(3): note(WOOD, 76, 1.66 + i * .16, .08, 66)
pizz(2.1, 2.62, walk, 56, 46)
# 2A · TWO ANSWERS (2.62–20.04): Taiwan = D minor, BPOM = F major; stamps after the words
pizz(2.62, 6.0, walk, 58, 46)
note(WOOD, 76, 4.3, .1, 70); note(TIMP, A2 - 12, 4.75, .5, 70)                    # "Kok bisa?"
pizz(6.06, 7.3, fwalk, 58, 48); note(TIMP, F2, 6.72, .8, 88); note(CLAR, F4, 6.9, .5, 50)   # AMAN
pizz(7.32, 14.4, walk, 56, 44)
for i, n in enumerate([D5, F5, A5]): note(XYL, n, 10.48 + i * .1, .1, 62)          # NIPAGIN
note(TIMP, D2, 13.2, .8, 92)                                                       # NGGAK BOLEH (Taiwan)
pizz(14.42, 20.0, fwalk, 56, 46); note(TIMP, F2, 14.75, .7, 84)                    # BOLEH (Indonesia)
note(GLOCK, A5, 16.22, .3, 48); note(CLAR, A4, 18.0, .8, 46)
# MICRO-REHOOK 1 (20.04–21.42): "Selesai? Belum." — near-silence, the hit after "Belum"
note(GLOCK, F5, 20.1, .3, 38); note(TIMP, D2, 20.78, 1.0, 112); note(TUBA, D2, 20.78, .9, 94)
# 2B · THIRTEEN YEARS LATER (21.42–35.42): thin clock, tremolo; ETILEN OKSIDA, NOL, then BPOM's "far below"
note(TREM, D3, 21.42, 14.0, 40); note(TREM, A3, 21.42, 14.0, 34)
for k in range(int((35.42 - 21.42) / .5)):
    t = 21.42 + k * .5; note(WOOD, 76, t, .08, 40 if k % 2 else 54)
    if k % 2 == 0: note(TUBA, [D2, A2, D2, Bb2][(k // 2) % 4], t, .35, 60)
for i, n in enumerate([D5, F5, A5, D6]): note(XYL, n, 25.42 + i * .1, .1, 64)       # ETILEN OKSIDA
note(TIMP, D2, 30.02, .9, 96)                                                       # NOL
for t, n, d in [(33.0, F4, .5), (33.8, A4, .5), (34.4, C5, .6)]: note(CLAR, n, t, d, 48)   # "jauh di bawah itu"
# "Lalu terulang lagi." (35.42–36.88) + the shipment (36.88–46.80)
note(WOOD, 76, 35.5, .1, 70); note(TIMP, D2, 36.32, .8, 92)
pizz(36.88, 46.7, walk, 56, 44)
note(TIMP, D2, 38.35, .8, 94)                                                       # DITOLAK TAIWAN (Soto Banjar)
note(BSN, A2, 41.25, .5, 70); note(TIMP, A2 - 12, 42.0, .7, 80)                    # BUKAN EKSPOR RESMI
note(TIMP, F2, 45.95, .7, 84)                                                       # NGGAK TERDETEKSI (Indofood)
# MICRO-REHOOK 2 (46.80–48.36): "Satu merek, dua jawaban." — both keys at once, the hit after "jawaban"
note(GLOCK, D5, 47.0, .3, 44); note(GLOCK, F5, 47.48, .3, 44)
note(TIMP, D2, 47.75, 1.2, 112); note(TUBA, D2, 47.75, 1.0, 96); note(TREM, D3, 47.75, 1.0, 46)
# 3–4 · CIRCULAR REFRAME LOOP (48.36–END): warm kitchen, then the walk returns so the replay lands back on bar 1
pizz(48.36, 51.2, fwalk, 54, 44); note(CLAR, F4, 49.4, .8, 46); note(CLAR, A4, 50.3, .7, 44)
pizz(51.24, END, walk, 60, 48)
note(GLOCK, A5, 53.2, .3, 50); note(BSN, A2, END - 1.0, .7, 58)
render()
