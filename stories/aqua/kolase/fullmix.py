# Mix for ARSIP 4 (kolase, Aqua): every paper event on screen gets its foley, from events.json (kit/tools/render_2d.mjs events).
# Loud hits sit below 260 Hz or between words; the per-word report flags any masked word.
import sys, json; sys.path.insert(0, '../../../kit/audio')
from arsip_audio import *
EP = json.load(open('episode.json')); mx = Mixer(EP['dur']); add = mx.add
EV = json.load(open('events.json'))
WD = json.load(open(EP['words']))
speaking = lambda t: any(a - .2 <= t <= b for a, b, _ in WD)      # a hit up to 0.2 s before a word still rings into it
_add = add
def add(buf, t, g, p=0., hit=False):    # rule: a loud hit inside a spoken word keeps only its body below 260 Hz
    _add(lpf(buf, 200) * .8 if hit and speaking(t) else buf, t, g * FOLEY, p)
FOLEY = .75                                                         # overall foley trim (keeps the ASR gate stable)
add(air(EP['dur'], 400), 0, .05)                                   # quiet room under everything
for e in EV:
    t, p, s = e['t'], e.get('pan', 0) * .5, e.get('size', .6)
    if e['type'] == 'slap':  add(paperSlap(s), t - .01, .22 + .12 * min(1, s), p, hit=True)
    elif e['type'] == 'lift': add(paperSlide(.25), t - .3, .1, p)          # a piece leaving: a soft slide, no thump
    elif e['type'] == 'slide': add(paperSlide(e.get('d', .3)), t, .16 + .08 * min(1, s), p)
    elif e['type'] == 'pat':  add(paperPat(s), t - .01, .18, p)
    elif e['type'] == 'stamp': add(stampThump(), t - .01, .55, p, hit=True)
    elif e['type'] == 'mark': add(penScratch(.18), t - .08, .28, p)
    elif e['type'] == 'pen':  add(penScratch(max(.15, e.get('d', .25))), t, .22, p)
    elif e['type'] == 'key':  add(hpf(typeKey(), 2500), t, .12, p)
add(boom(1.6), 43.24, .35, hit=True)                                          # KPPU MENANG di Mahkamah Agung: low boom under the stamp
mx.finish('vo_level.wav', 'score_full.wav', report=EP['report'], words=EP['words'], score_db=-32)
