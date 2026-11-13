# Score for ARSIP 3 (kolase): small period ensemble (pizzicato, bassoon, tuba, clarinet, glockenspiel, xylophone, timpani),
# D minor with an F major turn for the breast-milk act. 120 bpm grid: one beat = 0.5 s. Written against the VO acts.
import sys; sys.path.insert(0, '../../../kit/audio')
from score_lib import *
PIZZ, BSN, TUBA, CLAR, GLOCK, XYL, TIMP, WOOD, TREM = 0, 1, 2, 3, 4, 5, 6, 7, 8
for ch, p in [(PIZZ, 45), (BSN, 70), (TUBA, 58), (CLAR, 71), (GLOCK, 9), (XYL, 13), (TIMP, 47), (WOOD, 115), (TREM, 44)]: prog(ch, p)
reverb(range(10), 55)
b = lambda i: i * 0.5
# Act 1 · hook + the letter (0–11.1): sneaky pizzicato walk, bassoon answers
walk = [D3, F3, A3, F3, D3, F3, A3, C4]
for bar in range(0, 22):
    t = b(bar)
    if t > 11.0: break
    note(PIZZ, walk[bar % 8], t, .3, 70 if bar % 2 == 0 else 52)
note(TIMP, D2, 0.12, .8, 100)                                     # BODOH? stamp
for t, n in [(1.7, A2), (2.2, D3), (4.0, F3), (4.5, E4 - 12), (5.0, D3), (7.0, A2), (8.0, D3), (9.3, F3), (10.2, A2)]: note(BSN, n, t, .45, 70)
note(GLOCK, A5, 4.7, .8, 60)                                      # ARSIP file opens
# Act 2 · doubt + newspaper + spread (11.1–22.3): woodblock clock, xylophone headlines
for k in range(int((22.3 - 11.1) / .5)):
    t = 11.1 + k * .5; note(WOOD, 76, t, .1, 50 if k % 2 else 64)
    if k % 2 == 0: note(TUBA, [D2, A2, D2, A2][(k // 2) % 4], t, .35, 72)
for i, n in enumerate([D5, F5, A5, F5, D5]): note(XYL, n, 16.4 + i * .08, .1, 80)   # MICIN! ransom letters
for i, n in enumerate([A4, C5, D5, F5, A5]): note(XYL, n, 20.7 + i * .22, .12, 70)  # the news spreads
# Act 3 · 1969 lab (22.3–33.1): tremolo strings, timpani on the needle and the brain
note(TREM, D3, 22.3, 10.8, 46); note(TREM, A3, 22.3, 10.8, 40); note(TREM, F3, 27.4, 5.7, 40)
for t, v in [(23.9, 80), (26.0, 110), (27.4, 95), (31.96, 110)]: note(TIMP, D2, t, .9, v)
for k in range(8): note(PIZZ, [D3, C4 - 12 + 12, A2, D3][k % 4], 28.0 + k * .5, .25, 48)
# Act 4 · the blind test + TERUNGKAP (33.1–39.0): thin clock, near-silence before the verdict, then the hit
for k in range(5): note(WOOD, 77, 33.2 + k * .5, .08, 44)
note(TIMP, D2, 38.31, 1.6, 120); note(TUBA, D2, 38.31, 1.2, 100); note(GLOCK, D5, 38.31, 1.0, 70)
# Act 5 · glutamate in breast milk (39.0–48.5): F major music box, warm clarinet
melody = [(39.2, F4), (39.7, A4), (40.2, C5), (40.7, A4), (41.2, G4), (42.2, F4), (43.1, A4), (43.6, C5), (44.1, F5), (45.0, E5), (46.0, F5), (46.9, C5), (47.5, A4)]
for t, n in melody: note(GLOCK, n + 12, t, .5, 58)
for t, n, d in [(39.0, F3, 2.0), (41.0, C4, 2.0), (43.0, F3, 2.0), (45.0, A3, 1.5), (46.5, C4, 2.0)]: note(CLAR, n + 12, t, d, 52)
for k in range(19): note(PIZZ, [F3, C4 - 12, A2 + 3, C4 - 12][k % 4], 39.0 + k * .5, .25, 46)
# Act 6 · 2018 + the denial (48.5–54.3): sneaky bassoon in D minor again, xylophone on "taruhan"
for t, n in [(48.6, D3), (49.1, F3), (49.6, E4 - 12), (50.1, D3), (51.0, A2), (51.5, C4 - 12), (52.0, D3)]: note(BSN, n, t, .4, 68)
for k in range(11): note(PIZZ, [D3, A2][k % 2], 48.5 + k * .5, .25, 50)
note(TIMP, D2, 53.4, .9, 105)                                     # DIBANTAH
# Out (54.3–56.6): the walk returns so the loop lands back on bar 1
for k in range(5): note(PIZZ, walk[k], 54.3 + k * .5, .3, 62)
note(BSN, A2, 55.8, .7, 60)
render()
