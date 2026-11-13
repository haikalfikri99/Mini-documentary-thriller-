"""Fetch an episode's archive prints (raw/ is git-ignored) from its SOURCES.jsonl and draw the engraved stand-ins it needs.
    python3 kit/collage/fetch_raw.py stories/<slug>/kolase
SOURCES.jsonl rows: {"file": "raw/<name>", "url": ..., "page": ..., "license": ..., "credit": ...}. Polite to the archives:
one request at a time, a generic User-Agent, backoff on HTTP 429 (Wikimedia rate-limits bursts; upload.wikimedia.org direct
file URLs are lighter than the API). Engraved stand-ins: every prints.json file named gen_<object>.png is drawn by engr_objects.py."""
import json, os, sys, time, subprocess, urllib.request, urllib.error
ep = os.path.abspath(sys.argv[1]); raw = os.path.join(ep, 'raw'); os.makedirs(raw, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(ep, 'SOURCES.jsonl')
for line in (open(src) if os.path.exists(src) else []):
    if not line.strip(): continue
    s = json.loads(line); p = os.path.join(ep, s['file'])
    if os.path.exists(p) or not s.get('url'): continue
    for k in range(5):
        try:
            req = urllib.request.Request(s['url'], headers={'User-Agent': 'arsip-collage/1.0 (educational film; one file at a time)'})
            data = urllib.request.urlopen(req, timeout=120).read(); open(p, 'wb').write(data); print('fetched', s['file']); break
        except urllib.error.HTTPError as e:
            if e.code != 429 or k == 4: print('FAILED', s['file'], e); break
            time.sleep(10 * (k + 1))
    time.sleep(1.0)
pj = os.path.join(ep, 'prints.json')
gen = sorted({p['file'][4:-4] for p in json.load(open(pj)).values() if p['file'].startswith('gen_')}) if os.path.exists(pj) else []
need = [g for g in gen if not os.path.exists(os.path.join(raw, f'gen_{g}.png'))]
if need: subprocess.run([sys.executable, os.path.join(HERE, 'engr_objects.py'), raw, *need], check=True)
print('raw ready:', len(os.listdir(raw)), 'files')
