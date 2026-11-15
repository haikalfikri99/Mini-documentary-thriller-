# Score for ARSIP #006 3-in-1 (ARSIP Kolase v5.0): small period ensemble, one musical idea per segment, cues from audio/vo_words.json.
# D minor "traffic" walk for the jam, a lighter F major for the jockeys (the rule we laughed at), a ticking clock under the study,
# timpani on every verdict stamp (after the spoken word). 120 bpm grid: one beat = 0.5 s.
import sys; sys.path.insert(0, '../../../kit/audio')
from score_lib import *
E3, Bb2, D6, F2 = 52, 46, 86, 41
PIZZ, BSN, TUBA, CLAR, GLOCK, XYL, TIMP, WOOD, TREM = 0, 1, 2, 3, 4, 5, 6, 7, 8
for ch, p in [(PIZZ, 45), (BSN, 70), (TUBA, 58), (CLAR, 71), (GLOCK, 9), (XYL, 13), (TIMP, 47), (WOOD, 115), (TREM, 44)]: prog(ch, p)
reverb(range(10), 55)
END = 54.7
walk = [D3, F3, A3, F3, D3, F3, A3, C4]
def pizz(t0, t1, seq, v0=62, v1=50):
    k, t = 0, t0
    while t < t1 - .05: note(PIZZ, seq[k % len(seq)], t, .28, v0 if k % 2 == 0 else v1); k += 1; t += .5
# 1 · HOOK (0–2.24): DIHAPUS on frame 0; the tuba waits for the end of "dihapus" (≈1.9)
note(TIMP, D2, 0.14, .5, 96); note(TUBA, D2, 1.95, .9, 88); note(GLOCK, D5, 1.95, .6, 48)
# 2A · THE RULE (2.24–18.02): slow traffic walk, a clock tick on "sore", the "?" sting, jockeys in F major, the sign comes down
pizz(2.24, 6.3, [D3, A2, F3, A2], 58, 46)
note(GLOCK, A5, 2.3, .4, 52); note(BSN, A2, 5.85, .5, 66)                      # "lebih lambat"
note(WOOD, 76, 6.5, .1, 70); note(TIMP, A2 - 12, 7.0, .5, 70)                    # "Kok bisa?"
pizz(7.94, 13.0, walk, 58, 46)
note(GLOCK, F5, 11.0, .5, 52)                                                     # the "3" lands
pizz(13.02, 16.2, [F3, A3, C4, A3], 60, 50); note(CLAR, F4, 13.5, .6, 50); note(CLAR, A4, 14.2, .5, 48)
note(BSN, D3, 15.5, .5, 66)                                                       # "masalah"
pizz(16.24, 18.0, [D3, A2, D3, A2], 56, 44); note(TIMP, D2, 17.55, .8, 96)       # DIHAPUS (2016)
# MICRO-REHOOK 1 (18.02–20.32): "Tapi ada yang keburu mengukur." — dry woodblock, the pulse stops, a pen line
note(WOOD, 76, 18.1, .1, 72); note(BSN, A2, 18.6, .5, 70); note(GLOCK, D6, 19.5, .3, 46)
# 2B · THE STUDY (20.32–36.22): ticking clock, tremolo, xylophone on the numbers, timpani on IKUT MACET
note(TREM, D3, 20.32, 15.9, 40); note(TREM, A3, 20.32, 15.9, 34)
for k in range(int((36.22 - 20.32) / .5)):
    t = 20.32 + k * .5; note(WOOD, 76, t, .08, 42 if k % 2 else 56)
    if k % 2 == 0: note(TUBA, [D2, A2, D2, Bb2][(k // 2) % 4], t, .35, 62)
for i, n in enumerate([D5, F5, A5]): note(XYL, n, 27.0 + i * .1, .1, 62)          # 2,8 menit
for i, n in enumerate([A5, F5, D5]): note(XYL, n, 29.45 + i * .1, .1, 66)         # 5,3 menit
note(TIMP, D2, 34.32, .9, 96)                                                     # IKUT MACET
# reasons (36.22–41.68): the walk thins out
pizz(36.22, 41.6, [D3, F3, A2, F3], 54, 44)
# MICRO-REHOOK 2 (41.68–43.56): "Joki bikin aturan ini percuma?" → "Nggak." — PERCUMA? stamp, near-silence, the hit
note(TIMP, A2 - 12, 42.8, .6, 82); note(GLOCK, F5, 43.0, .3, 40)
note(TIMP, D2, 43.95, 1.2, 116); note(TUBA, D2, 43.95, 1.0, 98); note(TREM, D3, 43.95, 1.0, 48)
# 3 · PAYOFF (45.78–49.0): warm clarinet on the paid jockey (the rule worked)
pizz(45.78, 49.0, [F3, A3, C4, A3], 58, 48)
for t, n, d in [(46.6, F4, .8), (47.6, A4, .6), (48.3, C5, .5)]: note(CLAR, n, t, d, 52)
# 4 · CIRCULAR REFRAME LOOP (49.0–END): the traffic walk returns, DITAHAN lands, replay hits bar 1
pizz(49.0, END, walk, 60, 48)
note(TIMP, D2, 52.35, 1.0, 104); note(GLOCK, D5, 52.35, .7, 60); note(BSN, A2, END - 1.0, .7, 58)
render()
