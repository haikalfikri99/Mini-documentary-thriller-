# Commentable storyboard page (Artifact) for an ARSIP Kolase film: one card per shot = real keyframe + VO + action + camera +
# on-screen text + image source + a green "Revisi vN" box answering the user's last comments. The user comments on the page
# (no "Send to Claude" needed), then says "cek komentar"; Claude reads all threads with ArtifactComments and answers in chat.
# usage: python3 kit/tools/storyboard_page/make_page.py stories/<slug>/kolase [outdir]
#   input : <kolase>/storyboard.json  (example: stories/aqua/kolase/storyboard.json)
#           {no, slug, version, title (may hold <em>), sub, rules: [..], shots: [{beat?, vo, aksi, kamera, teks, gambar, note?, alt?}]}
#           alt = {"t": "first" | seconds, "caption": ".."} adds a second frame (e.g. the start of a big camera move)
#   output: <outdir>/storyboard_<no>.html + kf/Sxx.jpg (540×960); publish with the Artifact tool: file_path = the html,
#           root = outdir, files = {"kf/S01.jpg": "kf/S01.jpg", ...}. Republish to the same file_path to keep the URL.
import sys, os, re, json, html, subprocess, glob, shutil
from PIL import Image
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
film = os.path.abspath(sys.argv[1]); out = os.path.abspath(sys.argv[2] if len(sys.argv) > 2 else os.path.join(film, 'board', 'page'))
J = json.load(open(os.path.join(film, 'storyboard.json')))
S = [float(x) for x in re.search(r'START\s*=\s*\[([^\]]*)\]', open(os.path.join(film, 'film.js')).read()).group(1).split(',') if x.strip()]
assert len(S) == len(J['shots']) + 1, f"film.js START has {len(S) - 1} shots, storyboard.json has {len(J['shots'])}"
os.makedirs(os.path.join(out, 'kf'), exist_ok=True)
kf = os.path.join(out, '_kf'); os.makedirs(kf, exist_ok=True)
subprocess.run(['node', os.path.join(ROOT, 'kit/tools/keyframes_2d.mjs'), film, 'board', kf], check=True, capture_output=True)
small = lambda src, dst: Image.open(src).convert('RGB').resize((540, 960), Image.LANCZOS).save(dst, quality=86)
for i in range(len(J['shots'])): small(os.path.join(kf, 'kf_%02d.png' % (i + 1)), os.path.join(out, 'kf', 'S%02d.jpg' % (i + 1)))
alts = {i: s['alt'] for i, s in enumerate(J['shots']) if s.get('alt')}
if alts:
    ts = [S[i] + 0.02 if a['t'] == 'first' else float(a['t']) for i, a in alts.items()]
    ak = os.path.join(out, '_alt'); os.makedirs(ak, exist_ok=True)
    subprocess.run(['node', os.path.join(ROOT, 'kit/tools/keyframes_2d.mjs'), film, ','.join('%.2f' % t for t in ts), ak], check=True, capture_output=True)
    for (i, _), f in zip(alts.items(), sorted(glob.glob(os.path.join(ak, 'kf_*.png')))): small(f, os.path.join(out, 'kf', 'S%02da.jpg' % (i + 1)))
fmt = lambda t: ('%d:%05.2f' % (t // 60, t % 60)).replace('.', ',')
e = html.escape; V = J.get('version', 'v1'); rows = []; bi = 0
for i, s in enumerate(J['shots']):
    if s.get('beat'): bi += 1; rows.append(f'<h2 class="beat"><span>{bi}</span>{e(s["beat"])}</h2>')
    n = '%02d' % (i + 1)
    note = f'<p class="note"><b>Revisi {V} (komentarmu):</b> {e(s["note"])}</p>' if s.get('note') else ''
    alt = (f'<figure class="alt"><img src="kf/S{n}a.jpg" alt="Frame tambahan shot {n}" loading="lazy" width="540" height="960">'
           f'<figcaption>{e(s["alt"].get("caption", ""))}</figcaption></figure>') if s.get('alt') else ''
    rows.append(f'''<article class="shot" id="S{n}"><div class="figs"><figure><img src="kf/S{n}.jpg" alt="Keyframe shot {n}" loading="lazy" width="540" height="960"></figure>{alt}</div>
<div class="meta"><header><span class="id">S{n}</span><span class="tc">{fmt(S[i])} – {fmt(S[i + 1])}</span><span class="dur">{S[i + 1] - S[i]:.2f} dtk</span></header>
<p class="vo">“{e(s["vo"])}”</p><dl><dt>Aksi</dt><dd>{e(s["aksi"])}</dd><dt>Kamera</dt><dd>{e(s["kamera"])}</dd><dt>Teks layar</dt><dd>{e(s["teks"])}</dd><dt>Gambar</dt><dd>{e(s["gambar"])}</dd></dl>{note}</div></article>''')
n_sh, dur = len(J['shots']), S[-1]
facts = (f'<span><b>{n_sh}</b> shot</span><span><b>{bi}</b> beat</span><span><b>1080×1920</b> · 30 fps</span>'
         f'<span>VO <b>{dur:.2f}</b> dtk</span><span>rata-rata <b>{dur / n_sh:.1f}</b> dtk/shot</span>').replace('.', ',')
no = '%03d' % J['no']
page = open(os.path.join(os.path.dirname(__file__), 'tpl.html')).read()
for k, v in dict(NO=no, VERSION=V, TITLE=J['title'], SUB=e(J['sub']), FACTS=facts, SLUG=J['slug'],
                 RULES='\n'.join(f'<li>{e(r)}</li>' for r in J.get('rules', [])), SHOTS='\n'.join(rows)).items():
    page = page.replace('{{' + k + '}}', v)
dst = os.path.join(out, f'storyboard_{no}.html'); open(dst, 'w').write(page)
for d in ('_kf', '_alt'): shutil.rmtree(os.path.join(out, d), ignore_errors=True)
print(f'{dst} · {n_sh} shots · kf/ ready')
