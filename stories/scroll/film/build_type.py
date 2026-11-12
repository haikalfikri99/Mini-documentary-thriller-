# Builds the HyperFrames type layers of #002 from the VO word timings:
#   hf/compositions/captions.html — word-synced captions (≤ 3 words per group, split at punctuation; pop-in per word)
#   hf/compositions/type.html     — hook title, stamps, name cards and the quote typography
# Run after any change to audio/vo_words.json. Captions are hidden while the quote typography carries the words.
import json, html
from pathlib import Path
HERE = Path(__file__).parent; HF = HERE.parent / 'hf'; W = json.load(open(HERE.parent / 'audio' / 'vo_words.json'))
DUR = 44.83
QUOTE = (30.34, 35.64)
SCREEN, AMBER, PAPER, INK = '#7fe3ff', '#ffb43a', '#f4efe6', '#1b1422'
HOT_SCREEN = {'menyesal', 'scroll', 'ujung', 'hilang', 'iklan', 'terjual', 'feed', 'lanjut', 'pernah', '2006', 'raskin'}
HOT_AMBER = {'tombol', 'penting', 'berhenti', 'udahan', 'pasang', 'berhentinya'}
key = lambda s: ''.join(c for c in s.lower() if c.isalnum())

# —— caption groups ——
groups, cur = [], []
for t0, t1, s in W:
    if QUOTE[0] - .05 <= t0 < QUOTE[1] - .05: continue
    cur.append((t0, t1, s))
    if len(cur) >= 3 or s[-1] in '.,?!…:"':
        groups.append(cur); cur = []
if cur: groups.append(cur)
items, tl = [], []
for i, gr in enumerate(groups):
    a = max(.12, gr[0][0] - .06)
    nxt = groups[i + 1][0][0] - .06 if i + 1 < len(groups) else DUR
    b = min(nxt, gr[-1][1] + .7, DUR)
    if QUOTE[0] - .2 < b and a < QUOTE[0]: b = min(b, QUOTE[0] - .02)
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
(HF / 'compositions').mkdir(exist_ok=True)
(HF / 'compositions' / 'captions.html').write_text(cap)

# —— type layer: hook title, stamps, quote typography ——
qw = [(t0, s) for t0, t1, s in W if QUOTE[0] - .05 <= t0 < QUOTE[1] - .05]
part1 = [(t, s) for t, s in qw if t < 32.1]; part2 = [(t, s) for t, s in qw if t >= 32.1]
def quote_block(bid, words, a, b, top):
    sp, tw = [], []
    for j, (t, s) in enumerate(words):
        k = key(s); col = SCREEN if k in {'mau', 'saya'} and j >= len(words) - 2 else PAPER
        wid = f'{bid}w{j}'
        sp.append(f'<span id="{wid}" class="qw" style="color:{col}">{html.escape(s.upper().replace(chr(34), ""))}</span>')
        tw.append(f'tl.fromTo("#{wid}", {{opacity: 0, filter: "blur(6px)"}}, {{opacity: 1, filter: "blur(0px)", duration: 0.13, ease: "power3.out"}}, {t - .03:.3f});')
    tw.append(f'tl.to("#{bid} .qw, #{bid} .qm", {{opacity: 0, filter: "blur(6px)", duration: 0.18, ease: "power2.in"}}, {b - .18:.3f});')
    return (f'<div id="{bid}" class="clip quote" data-start="{a:.3f}" data-duration="{b - a:.3f}" style="top:{top}px"><span class="qm">“</span>{" ".join(sp)}</div>', tw)
q1, t1 = quote_block('q1', part1, QUOTE[0] - .05, 32.12, 240)
q2, t2 = quote_block('q2', part2, 32.12, QUOTE[1] + .02, 240)
typ = f'''<template>
  <style>
    #root {{ position: absolute; inset: 0; }}
    .hook {{ position: absolute; left: 0; width: 100%; top: 250px; text-align: center; font-family: Oswald; font-weight: 600; font-size: 104px; line-height: 1.02;
      color: {PAPER}; -webkit-text-stroke: 18px {INK}; paint-order: stroke fill; }}
    .hook .hot {{ color: {SCREEN}; }}
    .stamp {{ position: absolute; left: 64px; top: 210px; font-family: "Courier Prime"; font-weight: 700; font-size: 46px; color: {PAPER};
      background: #b3261e; padding: 8px 22px; transform: rotate(-3deg); }}
    .quote {{ position: absolute; left: 70px; width: 940px; font-family: Oswald; font-weight: 600; font-size: 82px; line-height: 1.08; text-align: left;
      -webkit-text-stroke: 16px {INK}; paint-order: stroke fill; overflow: visible; }}
    .quote .qw {{ display: inline-block; }}
    .quote .qm {{ color: {AMBER}; font-size: 150px; line-height: .5; vertical-align: -.25em; margin-right: 8px; }}
    .attrib {{ position: absolute; left: 74px; top: 178px; font-family: "Courier Prime"; font-weight: 700; font-size: 34px; color: {AMBER};
      -webkit-text-stroke: 8px {INK}; paint-order: stroke fill; }}
  </style>
  <div id="root" data-composition-id="type" data-width="1080" data-height="1920">
    <div id="hook" class="clip hook" data-start="0" data-duration="2.95">PEMBUAT FITUR INI<br><span class="hot">MENYESAL</span></div>
    <div id="st2019" class="clip stamp" data-start="28.3" data-duration="2.0">2019</div>
    {q1}
    {q2}
    <div id="attrib" class="clip attrib" data-start="30.3" data-duration="{QUOTE[1] - 30.3:.2f}">AZA RASKIN, 2019:</div>
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
    tl.to("#hook", {{ opacity: 0, filter: "blur(8px)", duration: 0.18, ease: "power2.in" }}, 2.75);
    tl.fromTo("#st2019", {{ opacity: 0, scale: 1.5 }}, {{ opacity: 1, scale: 1, duration: 0.12, ease: "power4.out" }}, 28.3);
    tl.fromTo("#attrib", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.25, ease: "power2.out" }}, 30.3);
    {chr(10).join('    ' + x for x in t1 + t2)}
    window.__timelines["type"] = tl;
  </script>
</template>
'''
(HF / 'compositions' / 'type.html').write_text(typ)
print(f'{len(groups)} caption groups, quote {len(part1)}+{len(part2)} words')
