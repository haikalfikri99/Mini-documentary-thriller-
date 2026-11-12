# Mix for ARSIP 002 (44.83 s): cue list only; sound library + mix rules live in kit/audio/arsip_audio.py.
import sys; sys.path.insert(0, '../../../kit/audio')
from arsip_audio import *
mx = Mixer(44.83); add = mx.add
# —— SFX timeline (film seconds) ——
add(air(4.5, 250), 0, .06); add(hum(4.5, 50), 0, .04)                                          # S01 Raskin's dark room
[add(swipe(), t, .1, .2) for t in (1.62, 2.62)]                                                 # S02 thumb swipes the feed
add(whoosh(.3, 400, 5000), 4.24, .14); add(thud(), 4.50, .85); add(air(1.3, 300), 4.55, .08); add(stampS(), 5.24, .6, .2); add(thud(.35, 90), 5.25, .35, .2)     # S04 freeze → archive slam + stamp
add(air(6.0, 900), 5.84, .07)                                                                    # 2006 office daytime air
[add(key(), 5.9 + k * .13 + rng.uniform(0, .04), .16, .3) for k in range(7)]                  # S05 typing
add(unroll(1.3), 6.95, .12)                                                                      # S06 the page pours down
add(click(), 8.55, .3); add(whoosh(.35, 1500, 7000), 8.7, .1); add(pixels(.4), 9.2, .05)       # S07 drag the button away
add(click(2600), 9.9, .3, .2)                                                                   # S08 mouse
[add(click(), t + .05, .35) for t in (10.4, 10.66, 11.0)]                                       # S09 three page clicks
add(tapestop(), 11.66, .25); add(thud(.5, 45), 11.8, .4)                                        # "Tapi": everything stops
add(hum(2.3, 100), 12.68, .08); add(thud(.4, 80), 12.7, .35)                                    # S11 spotlight on the button
[add(tick(), 15.4 + k * 1.0, .12, -.3) for k in range(3)]                                      # S12 the wall clock
add(swipe(), 17.4, .2, -.5); add(chime(587), 18.62, .05, .5)                                    # S13 lanjut (left) / udahan (right)
add(hum(1.08, 110), 19.06, .07); [add(crackle(), t, .3, .1) for t in (19.74, 19.86, 19.97, 20.06)]; add(shatter(1.3), 20.14, .12); add(thud(.6, 55), 20.14, .6); add(glassChime() * np.exp(-np.arange(int(1.6 * SR)) / SR * 6), 20.63, .2); add(powerdown(.16), 20.63, .12)                                     # S14 the button breaks
[add(step(), 20.85 + k * .5, .3, .1) for k in range(4)]; [add(whoosh(.25, 1500, 6000), 20.9 + k * .3, .05) for k in range(6)]   # S15 walking on cards
add(whoosh(1.8, 200, 4000), 22.95, .22)                                                         # S16 into the tunnel
add(fan(3.2), 24.94, .1); [add(swipe(), 25.1 + k * .48, .15, .15) for k in range(3)]           # S17 fan at 01:47, swipes
[add(coin(2400 + 200 * (k % 3)), 26.72 + k * .22, .045, (-1) ** k * .3) for k in range(6)]     # S18 coins rise to the tower
add(hum(2.2, 60), 28.1, .08); add(air(2.2, 300), 28.1, .08)                                     # S19 2019 room of screens
[add(key(), 30.5 + k * .12, .16) for k in range(5)]; add(click(), 31.15, .15); add(pixels(.8), 31.4, .05)   # S20 select, delete, pixels
add(creak(1.3), 32.4, .12); add(creak(1.2), 33.9, .1, .3)                                       # S21 strings tighten
add(lid(), 36.55, .5); add(thud(.4, 50), 36.6, .3)                                              # S22 laptop closes, light out
[add(tick(3600), 37.7 + k * .5, .12) for k in range(4)]                                         # S23 the bar ticks
[add(swipe(), 39.7 + k * .45, .12, .1) for k in range(4)]                                       # S24 the feed keeps going
[add(swipe(), t, .16, .1) for t in (41.6, 41.82, 42.02)]; add(whoosh(.4, 600, 3000), 42.22, .12); add(click(2200), 44.1, .3); add(thud(.4, 70), 44.12, .3)             # S25 the thumb places UDAHAN

import json; EP = json.load(open('episode.json'))
mx.finish('vo_level.wav', 'score_full.wav', report=EP['report'], words=EP['words'])
