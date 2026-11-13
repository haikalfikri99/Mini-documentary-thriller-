# Score for ARSIP 3: one musical idea per act, written against the VO words (see references/3-audio.md §B).
import sys; sys.path.insert(0, '../../../kit/audio')
from score_lib import *
for ch, p in [(4, GM['slow_strings']), (5, GM['warm_pad']), (8, GM['orch_hit']), (10, GM['taiko']), (1, GM['celesta'])]: prog(ch, p)
reverb(range(15))
note(5, D3, 0, 2.0, 50); note(5, A3, 0, 2.0, 44)                     # hook bed
note(8, D3, 2.0, .6, 120); note(10, 45, 2.0, 1.0, 120)              # ARSIP slam
render()
