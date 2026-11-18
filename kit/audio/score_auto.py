"""Data-driven score for an ARSIP Kolase episode (batch #009+): the same small period ensemble as the hand-written scores
(pizzicato walk, bassoon, tuba, clarinet, glockenspiel, xylophone, timpani, woodblock, string tremolo), placed from the episode's own data:
  vo_words.json  → the reveal pause (largest gap between words in the middle of the film), the payoff start, every word span
  events.json    → stamp times (kit/tools/render_2d.mjs events): timpani on each stamp, moved to the END of a spoken word when it would
                   land inside one (rule: a loud hit goes on the stamp or right after a word, never on top of it; references/3-audio.md)
usage (stories/<slug>/kolase/score_full.py):
    import sys; sys.path.insert(0, '../../../kit/audio'); from score_auto import auto_score
    auto_score(key=0, payoff_word='lain')      # key = semitone shift of the D-minor material; payoff_word = first word of the closer
"""
import json, os
from score_lib import *

PIZZ, BSN, TUBA, CLAR, GLOCK, XYL, TIMP, WOOD, TREM = 0, 1, 2, 3, 4, 5, 6, 7, 8


def auto_score(key=0, payoff_word='lain', pause=None, walk_vel=(58, 46), clock=True, name='score_full'):
    EP = json.load(open('episode.json')); END = float(EP['dur'])
    W = [(float(a), float(b), w) for a, b, w in json.load(open(EP['words']))]
    EV = json.load(open('events.json')) if os.path.exists('events.json') else []
    k = lambda n: n + key
    for ch, p in [(PIZZ, 45), (BSN, 70), (TUBA, 58), (CLAR, 71), (GLOCK, 9), (XYL, 13), (TIMP, 47), (WOOD, 115), (TREM, 44)]: prog(ch, p)
    reverb(range(10), 55)
    inside = lambda t: next((b for a, b, _ in W if a - 0.03 <= t <= b), None)
    # reveal pause: the largest gap between words between 45 % and 85 % of the film (or given)
    if pause is None:
        gaps = [(W[i + 1][0] - W[i][1], W[i][1], W[i + 1][0]) for i in range(len(W) - 1) if 0.45 * END < W[i][1] < 0.85 * END]
        g = max(gaps) if gaps else (0, 0.7 * END, 0.7 * END)
        pause = (g[1], g[2]) if g[0] >= 0.4 else None
    norm = lambda s: ''.join(c for c in s.lower() if c.isalnum())
    pw = [a for a, b, w in W if norm(w) == norm(payoff_word) and a > 0.6 * END]
    PAY = pw[-1] if pw else 0.8 * END
    walk = [k(D3), k(F3), k(A3), k(F3), k(D3), k(F3), k(A3), k(C4)]
    fwalk = [k(F3), k(A3), k(C4), k(A3), k(F3), k(A3), k(C4), k(64 - 12)]

    def pizz(t0, t1, seq, v0=walk_vel[0], v1=walk_vel[1]):
        i, t = 0, t0
        while t < t1 - .05: note(PIZZ, seq[i % len(seq)], t, .28, v0 if i % 2 == 0 else v1); i += 1; t += .5

    first_end = W[0][1] if W else 0.6
    # 1 · HOOK: the frame-0 stamp, the tuba waits for the end of the first word
    note(TIMP, k(D2), 0.14, .5, 94); note(TUBA, k(D2), first_end + 0.05, .8, 86); note(GLOCK, k(D5), first_end + 0.05, .5, 46)
    body_end = pause[0] if pause else PAY
    pizz(first_end + 0.4, min(body_end, PAY), walk)
    # the investigation: a thin clock + tremolo in the second third, bassoon answers every ~4 s
    mid0 = 0.35 * END
    if clock and body_end > mid0 + 2:
        note(TREM, k(D3), mid0, body_end - mid0, 38); note(TREM, k(A3), mid0, body_end - mid0, 32)
        t = mid0
        while t < body_end - .3:
            note(WOOD, 76, t, .08, 40 if int(t * 2) % 2 else 52); t += .5
    t = 4.0
    while t < body_end - 1: note(BSN, [k(F3), k(A2), k(D3), k(A2)][int(t / 4) % 4], t, .45, 60); t += 4.0
    # stamps → timpani (moved after the word), at least 1.2 s apart
    last = -9
    for e in sorted((e for e in EV if e.get('type') == 'stamp'), key=lambda e: e['t']):
        t = e['t'] if e['t'] < 0.3 else (inside(e['t']) or e['t']) + 0.04
        if t - last < 1.2 or t < 0.3 or (pause and pause[0] - 0.2 < t < pause[1]): continue
        note(TIMP, k(D2) if t < PAY else k(F3 - 12), t, .7, 92 if t < PAY else 80); last = t
    for e in [e for e in EV if e.get('type') == 'key'][::12]:     # a xylophone glint on some typed slips
        if not inside(e['t']): note(XYL, k(D5), e['t'], .1, 54)
    # REVEAL PAUSE: the hit after the last word before it, then near-silence until the next word
    if pause:
        note(TIMP, k(D2), pause[0] + 0.04, 1.2, 112); note(TUBA, k(D2), pause[0] + 0.04, 1.0, 94); note(TREM, k(D3), pause[0] + 0.04, 0.9, 44)
        note(GLOCK, k(F5), pause[1] - 0.12, .3, 34)
        pizz(pause[1] + 0.5, PAY, [k(D3), k(A2), k(F3), k(A2)], 52, 42)
    # PAYOFF + LOOP: warm major clarinet on the closer, the walk returns for the replay
    pizz(PAY, END - 2.5, fwalk, 54, 44)
    for i, n in enumerate([k(F4), k(A4), k(C5)]): note(CLAR, n, PAY + 0.6 + i * 0.9, .8, 48)
    pizz(max(PAY, END - 2.5), END, walk, 58, 46)
    note(BSN, k(A2), END - 1.0, .7, 56)
    render(name)
    print('score: pause', pause, 'payoff', round(PAY, 2), 'end', END)
