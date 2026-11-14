# Score template (ARSIP Kolase v5.0): small period ensemble, one musical idea per segment, written against the VO word times.
# EDIT: replace every time below with the real cue times from audio/vo_words.json (hook end, micro-rehooks, stamps, last word).
# D minor "sneaky" for the scheme, F major for a warm/relieved moment; 120 bpm grid: one beat = 0.5 s. Timpani on verdict stamps; rule:
# a loud hit goes on the stamp or right AFTER a spoken word, never on top of a key word (see references/3-audio.md §F/§H).
# Segments (references/1-cerita-dan-script.md §F3): 1 hook 0–4 · 2A 4–16 · micro-rehook 1 16–18 · 2B 18–36 · micro-rehook 2 36–39 · 3–4 payoff 39–end
import sys; sys.path.insert(0, '../../../kit/audio')
from score_lib import *
E3, Eb4, Cs4, Bb2 = 52, 63, 61, 46
PIZZ, BSN, TUBA, CLAR, GLOCK, XYL, TIMP, WOOD, TREM = 0, 1, 2, 3, 4, 5, 6, 7, 8
for ch, p in [(PIZZ, 45), (BSN, 70), (TUBA, 58), (CLAR, 71), (GLOCK, 9), (XYL, 13), (TIMP, 47), (WOOD, 115), (TREM, 44)]: prog(ch, p)
reverb(range(10), 55)
END = 52.0                                                          # EDIT: = episode.json dur (last word + 0.15 s)
walk = [D3, F3, A3, F3, D3, F3, A3, C4]
def pizz(t0, t1, seq, v0=62, v1=50):                                # steady pizzicato pulse on the 0.5 s grid
    k, t = 0, t0
    while t < t1 - .05: note(PIZZ, seq[k % len(seq)], t, .28, v0 if k % 2 == 0 else v1); k += 1; t += .5
# 1 · HOOK (0–4): stamp slam on frame 0, tuba waits for the end of the first spoken word, then the sneaky walk
note(TIMP, D2, 0.14, .5, 96); note(TUBA, D2, 0.6, .9, 92); note(GLOCK, D5, 0.6, .6, 50)
pizz(0.6, 4.0, walk)
# 2A · RULES OF THE GAME (4–16): the mechanism in plain words; glockenspiel sparkle on the first object/label that lands
pizz(4.0, 16.0, [D3, A2, F3, A2], 58, 46)
note(GLOCK, A5, 5.0, .6, 58)                                        # EDIT: object / label lands
for t, n in [(8.0, F3), (10.0, A2), (12.5, D3)]: note(BSN, n, t, .45, 64)
# MICRO-REHOOK 1 (16–18): expectation-breaker of 3–6 words — one dry woodblock + low bassoon sting, then drop the pulse
note(WOOD, 76, 16.0, .1, 70); note(BSN, A2, 16.2, .5, 74); note(TIMP, A2 - 12, 16.9, .6, 80)
# 2B · THE INTRIGUE / MECHANISM (18–36): thin clock, tremolo under the evidence, timpani on each verdict stamp
note(TREM, D3, 18.0, 17.5, 44); note(TREM, A3, 18.0, 17.5, 38)
for k in range(int((36.0 - 18.0) / .5)):
    t = 18.0 + k * .5; note(WOOD, 76, t, .08, 46 if k % 2 else 60)
    if k % 2 == 0: note(TUBA, [D2, A2, D2, Bb2][(k // 2) % 4], t, .35, 66)
for t, v in [(24.0, 100), (30.0, 84)]: note(TIMP, D2, t, .9, v)    # EDIT: stamp times (after the spoken word)
for i, n in enumerate([D5, F5, A5]): note(XYL, n, 28.0 + i * .1, .1, 66)   # EDIT: document / email lands
# MICRO-REHOOK 2 (36–39): near-silence, then the final reversal (2–3 words) and the hit
note(GLOCK, F5, 36.0, .3, 40)
note(TIMP, D2, 37.5, 1.2, 120); note(TUBA, D2, 37.5, 1.0, 100); note(TREM, D3, 37.5, 1.0, 50)
# 3–4 · PAYOFF + CIRCULAR REFRAME LOOP (39–END): roll into the biggest stamp, warm clarinet on the pillar answer, the walk returns
cc(TIMP, 7, 41.0, 42.0, 70, 120)
for k in range(10): note(TIMP, D2, 41.0 + k * .1, .1, 50 + k * 6)   # roll — EDIT to land on the final stamp
note(TIMP, D2, 42.0, 1.4, 124); note(TUBA, D2, 42.0, 1.2, 104); note(GLOCK, D5, 42.0, .9, 70)
pizz(43.0, 47.0, [D3, F3, A3, D4, F3, A3, D4, F4], 66, 56)
for t, n, d in [(47.0, F4, 1.0), (48.0, A4, .8), (48.8, C5, .6)]: note(CLAR, n, t, d, 54)   # the pillar answer: warm, major
pizz(49.0, END, walk, 60, 48)                                       # the walk returns so the replay lands back on bar 1
note(BSN, A2, END - 1.0, .7, 58)
render()
