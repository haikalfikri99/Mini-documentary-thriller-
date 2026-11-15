# Score for ARSIP #005 Skutik (ARSIP Kolase v5.0): small period ensemble, one musical idea per segment, cues from audio/vo_words.json.
# D minor "sneaky" for the cartel, a short F major warmth for "adu murah" (the false belief) and for "sepakat" (the reveal),
# timpani on every verdict stamp, placed on the stamp or right after the spoken word. 120 bpm grid: one beat = 0.5 s.
import sys; sys.path.insert(0, '../../../kit/audio')
from score_lib import *
E3, Bb2, C4_ = 52, 46, 60
PIZZ, BSN, TUBA, CLAR, GLOCK, XYL, TIMP, WOOD, TREM = 0, 1, 2, 3, 4, 5, 6, 7, 8
for ch, p in [(PIZZ, 45), (BSN, 70), (TUBA, 58), (CLAR, 71), (GLOCK, 9), (XYL, 13), (TIMP, 47), (WOOD, 115), (TREM, 44)]: prog(ch, p)
reverb(range(10), 55)
END = 56.35
walk = [D3, F3, A3, F3, D3, F3, A3, C4]
def pizz(t0, t1, seq, v0=62, v1=50):
    k, t = 0, t0
    while t < t1 - .05: note(PIZZ, seq[k % len(seq)], t, .28, v0 if k % 2 == 0 else v1); k += 1; t += .5
# 1 · HOOK (0–3.52): DIDENDA on frame 0, the tuba waits for the end of "didenda" (0.88–1.30), then the walk
note(TIMP, D2, 0.14, .5, 96); note(TUBA, D2, 1.32, .9, 90); note(GLOCK, D5, 1.32, .6, 50)
pizz(1.32, 3.52, walk)
# 2A · RULES (3.52–17.9): the tag, the dealer (false belief in F major on "adu murah"), the referee, the whisper
pizz(3.52, 7.94, [D3, A2, F3, A2], 58, 46)
note(GLOCK, A5, 4.0, .6, 56)                                          # the price tag flips
pizz(7.94, 9.46, [F3, A3, C4, A3], 60, 50); note(CLAR, F4, 8.9, .5, 52)  # "adu murah"
note(WOOD, 76, 9.5, .1, 70); note(TIMP, A2 - 12, 9.9, .6, 78)            # "Tapi KPPU" — the whistle
pizz(10.88, 15.98, [D3, A2, F3, A2], 58, 46)
for t, n in [(12.4, F3), (13.9, A2), (14.7, D3)]: note(BSN, n, t, .45, 64)   # the whisper
note(TIMP, D2, 13.62, .7, 84)                                             # JANJIAN HARGA? stamp (after "janjian")
pizz(15.98, 17.9, [D3, F3, A2, F3], 54, 44)
# MICRO-REHOOK 1 (17.9–19.36): "Buktinya? Lapangan golf." — dry woodblock + bassoon sting, pulse drops
note(WOOD, 76, 18.0, .1, 72); note(BSN, A2, 18.62, .5, 74); note(TIMP, A2 - 12, 18.85, .6, 80)
# 2B · EVIDENCE + FINES (19.36–39.56): thin clock, tremolo under the evidence, timpani on each DIDENDA, xylophone on the email
note(TREM, D3, 19.36, 20.0, 42); note(TREM, A3, 19.36, 20.0, 36)
for k in range(int((39.56 - 19.36) / .5)):
    t = 19.36 + k * .5; note(WOOD, 76, t, .08, 44 if k % 2 else 58)
    if k % 2 == 0: note(TUBA, [D2, A2, D2, Bb2][(k // 2) % 4], t, .35, 64)
for i, n in enumerate([D5, F5, A5]): note(XYL, n, 24.1 + i * .1, .1, 64)   # the envelope lands ("email")
note(GLOCK, F5, 28.1, .5, 56)                                              # the tag turns SAMA ("disesuaikan")
for t, v in [(29.55, 100), (32.95, 92), (34.0, 84)]: note(TIMP, D2, t, .9, v)   # DIDENDA Yamaha · DIDENDA Honda · DIBANTAH
# court (39.56–41.34), MICRO-REHOOK 2 (41.34–42.68): "Lolos? Nggak." — near-silence, then the hit after "Nggak"
pizz(39.56, 41.3, [D3, A2, D3, A2], 52, 42)
note(GLOCK, F5, 41.4, .3, 40)
note(TIMP, D2, 42.05, 1.2, 116); note(TUBA, D2, 42.05, 1.0, 98); note(TREM, D3, 42.05, 1.0, 48)
# 3 · PAYOFF (42.68–50.54): roll into KPPU MENANG, racing pulse "di jalanan", warm major on "sepakat"
cc(TIMP, 7, 44.4, 45.4, 70, 120)
for k in range(10): note(TIMP, D2, 44.4 + k * .1, .1, 50 + k * 6)
note(TIMP, D2, 45.45, 1.4, 124); note(TUBA, D2, 45.45, 1.2, 104); note(GLOCK, D5, 45.45, .9, 68)
pizz(46.58, 48.44, [D3, F3, A3, D4, F3, A3, D4, F4], 68, 58)
note(GLOCK, A5, 48.5, .4, 44)
for t, n, d in [(49.85, F4, .7), (50.3, A4, .6)]: note(CLAR, n, t, d, 56)
# 4 · CIRCULAR REFRAME LOOP (50.54–END): the walk returns so the replay lands back on bar 1
pizz(50.54, END, walk, 60, 48)
note(TIMP, D2, 55.95, .5, 70); note(BSN, A2, END - 1.0, .7, 58)
render()
