# Score for ARSIP 4 (kolase, Aqua): small period ensemble, one musical idea per act, written against the VO word times
# and the stamp events in events.json. D minor "sneaky" for the scheme and the court fight, a short F major warmth for the
# star outlet and for "pengadilan membatalkan" (false relief), timpani on every verdict stamp. 120 bpm grid: 1 beat = 0.5 s.
import sys; sys.path.insert(0, '../../../kit/audio')
from score_lib import *
E3, G3, Bb3, C3, G2, Bb2, Cs4, Eb4 = 52, 55, 58, 48, 43, 46, 61, 63
PIZZ, BSN, TUBA, CLAR, GLOCK, XYL, TIMP, WOOD, TREM = 0, 1, 2, 3, 4, 5, 6, 7, 8
for ch, p in [(PIZZ, 45), (BSN, 70), (TUBA, 58), (CLAR, 71), (GLOCK, 9), (XYL, 13), (TIMP, 47), (WOOD, 115), (TREM, 44)]: prog(ch, p)
reverb(range(10), 55)
walk = [D3, F3, A3, F3, D3, F3, A3, C4]
def pizz(t0, t1, seq, v0=62, v1=50):
    k = 0; t = t0
    while t < t1 - .05: note(PIZZ, seq[k % len(seq)], t, .28, v0 if k % 2 == 0 else v1); k += 1; t += .5
# Act 1 · hook (0–4.58): DIDENDA slam on frame 1, then the sneaky walk under "gara-gara warung"
note(TIMP, D2, 0.14, .5, 96); note(TUBA, D2, 0.6, .9, 92); note(GLOCK, D5, 0.6, .6, 50)   # the tuba waits for the end of "didenda"
pizz(0.6, 4.58, walk)
for t, n in [(2.14, A2), (2.64, D3), (3.6, F3), (4.1, E3)]: note(BSN, n, t, .42, 66)       # warung slides in, rival drops
# Act 2 · star outlet (4.58–9.96): F major, glockenspiel sparkle on the star, warm clarinet on "lebih murah"
pizz(4.58, 9.96, [F3, C4 - 12 + 12, A3, C4])
note(GLOCK, A5, 5.26, .6, 60); note(GLOCK, F5 + 12, 5.36, .5, 50)                           # STAR OUTLET slapped
for i, n in enumerate([C5, F5, A5]): note(GLOCK, n, 6.62 + i * .1, .4, 56)                 # "bintang"
for t, n, d in [(7.9, F4, 1.0), (8.9, A4, 1.0)]: note(CLAR, n, t, d, 50)                    # tag MURAH
# Act 3 · the one condition (9.96–17.36): back to D minor bassoon; sweet-but-wrong music box on "manis"; star yanked
for t, n in [(10.0, D3), (10.5, F3), (11.0, Eb4 - 12), (11.5, D3), (12.0, A2), (12.5, Cs4 - 12), (13.0, D3)]: note(BSN, n, t, .4, 68)
note(TIMP, D2, 10.96, .6, 82)                                                                # "syarat"
pizz(10.0, 13.6, [D3, A2])
for t, n in [(13.7, F5), (13.95, A5), (14.2, Eb4 + 24)]: note(GLOCK, n, t, .35, 52)         # "ada manis-manisnya…" (last note sour)
for i, n in enumerate([A5, F5, D5, A4, F4, D4]): note(XYL, n, 14.6 + i * .07, .1, 76)      # bintangnya dicopot: falls off
note(TUBA, D2, 15.74, .6, 80)
for t, n in [(16.2, F3), (16.7, E3)]: note(BSN, n, t, .4, 62)
note(TUBA, A2 - 12, 16.92, .9, 92); note(TIMP, A2 - 12, 16.92, .7, 70)                     # "mahal"
# Act 4 · the referee + the first verdict (17.36–27.38): woodblock clock, tuba steps, timpani on DIDENDA / DIBANTAH
for k in range(int((25.0 - 17.36) / .5)):
    t = 17.36 + k * .5; note(WOOD, 76, t, .08, 46 if k % 2 else 60)
    if k % 2 == 0: note(TUBA, [D2, A2, D2, Bb2][(k // 2) % 4], t, .35, 66)
note(TIMP, D2, 21.41, .5, 92); note(TUBA, D2, 22.0, .7, 86)                                # DIDENDA (tuba after the word)
for t, n in [(22.78, A2), (23.0, Bb2 + 12), (23.25, A2)]: note(BSN, n, t, .22, 74)          # DIBANTAH: the cheeky bassoon reply
note(TIMP, A2 - 12, 22.78, .6, 88)
# "pengadilan membatalkan": a short, too-easy F major relief
for t, n, d in [(25.0, F4, 1.0), (26.0, A4, .8), (26.8, C5, .6)]: note(CLAR, n, t, d, 54)
note(TIMP, F3 - 12, 26.14, .8, 90); note(GLOCK, C5 + 12, 26.14, .5, 50)
pizz(25.0, 27.4, [F3, C4 - 12 + 12])
# "Aqua bebas? … Belum.": near-silence, then the hit
note(GLOCK, F5, 27.4, .3, 40)
note(TIMP, D2, 28.18, 1.2, 120); note(TUBA, D2, 28.18, 1.0, 100); note(TREM, D3, 28.18, 1.0, 50)
# Act 5 · the evidence (28.92–38.2): tremolo strings, timpani on BUKTI, the email subject, DICOPOT
note(TREM, D3, 28.92, 9.3, 44); note(TREM, A3, 28.92, 9.3, 38); note(TREM, Bb3, 33.0, 5.2, 36)
for t, v in [(30.88, 100), (33.32, 84), (37.54, 112)]: note(TIMP, D2, t, .9, v)
pizz(29.0, 37.4, [D3, D3, A2, D3], 54, 44)
for i, n in enumerate([D5, F5, A5]): note(XYL, n, 31.74 + i * .1, .1, 66)                 # email lands
# Act 6 · Mahkamah Agung (38.2–45.74): the referee walks (pizz climbs), roll into KPPU MENANG, DIDENDA again
climb = [D3, F3, A3, D4, F3, A3, D4, F4]
pizz(38.2, 43.0, climb, 66, 56)
for t, n in [(38.4, D3), (39.4, F3), (40.4, A3), (41.4, C4)]: note(BSN, n, t, .45, 64)
cc(TIMP, 7, 42.2, 43.2, 70, 120)
for k in range(10): note(TIMP, D2, 42.2 + k * .1, .1, 50 + k * 6)                           # roll
note(TIMP, D2, 43.24, 1.4, 124); note(TUBA, D2, 43.24, 1.2, 104); note(GLOCK, D5, 43.24, .9, 70)
note(TIMP, A2 - 12, 44.38, 1.0, 104); note(TUBA, A2 - 12, 44.38, .8, 88)                   # denda berlaku lagi
# Out (45.74–53.64): "air putih doang, sampai Mahkamah Agung" bassoon joke, then the quiet question and the walk
for t, n, d in [(45.9, D3, .3), (46.25, A3, .3), (46.6, D3 + 12, .5), (47.4, Cs4 - 12, .25), (47.7, D3, .6)]: note(BSN, n, t, d, 70)
note(XYL, D5, 46.6, .1, 60)
pizz(48.28, 51.5, [D3, A2], 52, 42)
for t, n in [(48.4, A4), (49.4, F4), (50.4, E4), (51.0, D4)]: note(GLOCK, n + 12, t, .6, 44)
pizz(51.56, 53.64, walk, 60, 48)                                                            # the walk returns so the loop lands on bar 1
note(BSN, A2, 52.9, .7, 58)
render()
