# Word-synced captions (channel standard): ≤ 3 words per group, split at punctuation, pop-in per word, Oswald 600 caps with ink
# stroke at y = 1290 (above the Shorts UI); key words in SCREEN cyan or AMBER; hidden in windows where big typography carries the words.
# usage: python3 kit/tools/build_captions.py stories/<slug>/film   (reads episode.json → writes compositions/captions.html)
import json, html, sys
from pathlib import Path
FILM = Path(sys.argv[1]); EP = json.load(open(FILM / 'episode.json'))
W = json.load(open(FILM / EP['words'])); DUR = EP['dur']; C = EP.get('captions', {})
HIDE = [tuple(h) for h in C.get('hide', [])]
SCREEN, AMBER, PAPER, INK = '#7fe3ff', '#ffb43a', '#f4efe6', '#1b1422'
HOT_SCREEN, HOT_AMBER = set(C.get('hot_screen', [])), set(C.get('hot_amber', []))
key = lambda s: ''.join(c for c in s.lower() if c.isalnum())
hidden = lambda t0: any(h0 - .05 <= t0 < h1 - .05 for h0, h1 in HIDE)
# —— caption groups ——
groups, cur = [], []
for t0, t1, s in W:
    if hidden(t0): continue
    cur.append((t0, t1, s))
    if len(cur) >= 3 or s[-1] in '.,?!…:"':
        groups.append(cur); cur = []
if cur: groups.append(cur)
items, tl = [], []
for i, gr in enumerate(groups):
    a = max(.12, gr[0][0] - .06)
    nxt = groups[i + 1][0][0] - .06 if i + 1 < len(groups) else DUR
    b = min(nxt, gr[-1][1] + .7, DUR)
    for h0, h1 in HIDE:
        if h0 - .2 < b and a < h0: b = min(b, h0 - .02)
    gid = f'cap{i}'
    spans = []
    for j, (t0, t1, s) in enumerate(gr):
        k = key(s); col = SCREEN if k in HOT_SCREEN else AMBER if k in HOT_AMBER else PAPER
        wid = f'{gid}w{j}'
        spans.append(f'<span id="{wid}" class="w" style="color:{col}">{html.escape(s.upper())}</span>')
        tl.append(f'tl.fromTo("#{wid}", {{opacity: 0, scale: 1.3}}, {{opacity: 1, scale: 1, duration: 0.12, ease: "back.out(2.2)"}}, {max(a, t0 - .04):.3f});')
    tl.append(f'tl.to("#{gid} .w", {{opacity: 0, duration: 0.1, ease: "power2.in"}}, {b - .1:.3f});')
    items.append(f'<div id="{gid}" class="clip cap" data-start="{a:.3f}" data-duration="{b - a:.3f}">{" ".join(spans)}</div>')

cap = f'''<template>
  <style>
    #root {{ position: absolute; inset: 0; }}
    .cap {{ position: absolute; left: 0; width: 100%; top: 1290px; text-align: center; overflow: visible; }}
    .cap .w {{ display: inline-block; margin: 0 10px; font-family: Oswald; font-weight: 600; font-size: 78px; line-height: 1;
      letter-spacing: .01em; -webkit-text-stroke: 16px {INK}; paint-order: stroke fill; transform-origin: 50% 60%; }}
  </style>
  <div id="root" data-composition-id="captions" data-width="1080" data-height="1920">
    {chr(10).join('    ' + x for x in items)}
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
    {chr(10).join('    ' + x for x in tl)}
    window.__timelines["captions"] = tl;
  </script>
</template>
'''
cap = f'''<template>
  <style>
    #root {{ position: absolute; inset: 0; }}
    .cap {{ position: absolute; left: 0; width: 100%; top: 1290px; text-align: center; overflow: visible; }}
    .cap .w {{ display: inline-block; margin: 0 10px; font-family: Oswald; font-weight: 600; font-size: 78px; line-height: 1;
      letter-spacing: .01em; -webkit-text-stroke: 16px {INK}; paint-order: stroke fill; transform-origin: 50% 60%; }}
  </style>
  <div id="root" data-composition-id="captions" data-width="1080" data-height="1920">
    {chr(10).join('    ' + x for x in items)}
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
    {chr(10).join('    ' + x for x in tl)}
    window.__timelines["captions"] = tl;
  </script>
</template>
'''
(FILM / 'compositions').mkdir(exist_ok=True)
(FILM / 'compositions' / 'captions.html').write_text(cap)
print('captions:', len(groups), 'groups →', FILM / 'compositions' / 'captions.html')
