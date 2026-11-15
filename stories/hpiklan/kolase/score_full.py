# Score for ARSIP #007 HP Xiaomi (ARSIP Kolase v5.0): small period ensemble, one musical idea per segment, cues from audio/vo_words.json.
# F major "honest pledge" for the 5% promise (it was kept), D minor "sneaky" once the money trail turns to the ads, timpani on the
# stamps (after the spoken word), xylophone on the numbers. 120 bpm grid: one beat = 0.5 s.
import sys; sys.path.insert(0, '../../../kit/audio')
from score_lib import *
E3, Bb2, D6, F2 = 52, 46, 86, 41
PIZZ, BSN, TUBA, CLAR, GLOCK, XYL, TIMP, WOOD, TREM = 0, 1, 2, 3, 4, 5, 6, 7, 8
for ch, p in [(PIZZ, 45), (BSN, 70), (TUBA, 58), (CLAR, 71), (GLOCK, 9), (XYL, 13), (TIMP, 47), (WOOD, 115), (TREM, 44)]: prog(ch, p)
reverb(range(10), 55)
END = 53.46
walk = [D3, F3, A3, F3, D3, F3, A3, C4]
fwalk = [F3, A3, C4, A3, F3, A3, C4, E3 + 12]
def pizz(t0, t1, seq, v0=62, v1=50):
    k, t = 0, t0
    while t < t1 - .05: note(PIZZ, seq[k % len(seq)], t, .28, v0 if k % 2 == 0 else v1); k += 1; t += .5
# 1 · HOOK (0–3.40): IKLAN? on frame 0, a glockenspiel blip when the ad pops on "iklan", the sneaky walk
note(TIMP, D2, 0.14, .5, 92); note(TUBA, D2, 0.6, .8, 84)
pizz(0.6, 3.4, walk, 58, 46); note(GLOCK, A5, 2.12, .3, 56); note(GLOCK, D6, 2.22, .3, 50)
# 2A · THE PLEDGE (3.40–17.10): F major, honest; timpani on JANJI MAKS 5%, the "?" sting, coins back to the user
pizz(3.4, 8.7, fwalk, 58, 46); note(CLAR, F4, 4.3, .8, 50)
note(TIMP, F2, 7.85, .9, 92)                                                         # JANJI MAKS 5%
note(WOOD, 76, 8.9, .1, 70); note(TIMP, A2 - 12, 9.35, .5, 72)                        # "Kok bisa?"
pizz(10.46, 17.0, fwalk, 56, 44)
for i, n in enumerate([C5, A4 + 12 - 12, F5]): note(GLOCK, n, 11.0 + i * .12, .2, 46)  # coins poured back
note(BSN, F3 - 12, 14.4, .5, 62)                                                    # "dibatasi"
# MICRO-REHOOK 1 (17.10–20.38): "janji itu ditepati." DITEPATI (warm), then "Terus untung besarnya dari mana?" — the music turns
note(TIMP, F2, 17.7, .9, 96); for_ = [note(CLAR, n, 17.9 + i * .3, .4, 50) for i, n in enumerate([F4, A4, C5])]
note(WOOD, 76, 18.7, .1, 70); note(BSN, A2, 19.9, .5, 72)
# 2B · THE MONEY TRAIL (20.38–42.06): D minor, thin clock, tremolo; bait sting, billboard, the two numbers
note(TREM, D3, 20.38, 21.6, 40); note(TREM, A3, 20.38, 21.6, 34)
for k in range(int((42.06 - 20.38) / .5)):
    t = 20.38 + k * .5; note(WOOD, 76, t, .08, 40 if k % 2 else 54)
    if k % 2 == 0: note(TUBA, [D2, A2, D2, Bb2][(k // 2) % 4], t, .35, 60)
note(GLOCK, D6, 24.6, .4, 48)                                                        # "perusahaan internet"
note(TIMP, A2 - 12, 27.25, .7, 86)                                                   # UMPAN
note(GLOCK, A5, 33.1, .3, 50)                                                        # the billboard
for i, n in enumerate([D5, F5]): note(XYL, n, 37.75 + i * .1, .1, 58)                # Rp11
for i, n in enumerate([D5, F5, A5, D6]): note(XYL, n, 40.9 + i * .1, .1, 68)         # Rp76
# MICRO-REHOOK 2 (42.06–43.34): "Sumber uang terbesarnya?" near-silence → "Iklan." the hit right after the word
note(GLOCK, F5, 42.1, .3, 38)
note(TIMP, D2, 43.45, 1.2, 116); note(TUBA, D2, 43.45, 1.0, 98); note(TREM, D3, 43.45, 1.0, 48)
# 3 · XIAOMI'S ANSWER (45.46–49.02): calm F major (their side, told fairly), the switch clicks
pizz(45.46, 49.0, fwalk, 56, 46); note(WOOD, 80, 47.75, .08, 60)
# 4 · CIRCULAR REFRAME LOOP (49.02–END): the walk returns so the replay lands back on bar 1
pizz(49.02, END, walk, 60, 48)
note(GLOCK, A5, 49.35, .3, 50); note(BSN, A2, END - 1.0, .7, 58)
render()
