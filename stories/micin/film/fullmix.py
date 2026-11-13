# Mix for ARSIP 3: cue list only (sound library + mix rules: kit/audio/arsip_audio.py). One cue per on-screen event,
# timed from film.js; loud hits go below 260 Hz or into the gap after a word (the per-word report flags any masked word).
import sys, json; sys.path.insert(0, '../../../kit/audio')
from arsip_audio import *
EP = json.load(open('episode.json')); mx = Mixer(EP['dur']); add = mx.add
add(air(2.0, 300), 0, .06)                                                   # room tone under the hook
add(whoosh(.3, 400, 5000), 1.74, .14); add(thud(), 2.0, .85); add(stampS(), 2.7, .6, .2)   # ARSIP slam + stamp
mx.finish('vo_level.wav', 'score_full.wav', report=EP['report'], words=EP['words'])
