"""Append SOURCES.jsonl rows for the AI images in stories/<slug>/kolase/ai/ (skip rows already there).
    python3 kit/tools/ai_sources.py stories/<slug>/kolase [--reused name,name (from #004)]"""
import json, os, sys, glob
ep = sys.argv[1]; reused = set(sys.argv[3].split(',')) if len(sys.argv) > 3 and sys.argv[2] == '--reused' else set()
p = os.path.join(ep, 'SOURCES.jsonl'); have = {json.loads(l)['file'] for l in open(p) if l.strip()} if os.path.exists(p) else set()
with open(p, 'a') as f:
    for img in sorted(glob.glob(os.path.join(ep, 'ai', '*.jpg'))):
        n = os.path.basename(img)[:-4]; row = f'raw/ai_{n}.jpg'
        if row in have: continue
        f.write(json.dumps({'file': row, 'key': n, 'url': None, 'page': None,
                            'license': 'AI-generated image (Google Flow, Nano Banana), made by the channel owner; no logos',
                            'credit': 'Mini Thriller IDN' + (' (made for #004, reused)' if n in reused else '')}) + '\n')
print(open(p).read().count('\n'), 'rows')
