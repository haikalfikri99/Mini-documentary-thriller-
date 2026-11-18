#!/usr/bin/env python3
"""Labelled storyboard sheets for an ARSIP Kolase film: the plain-file alternative to the commentable Artifact page
(user, 18 Nov 2026: "storyboard biasa, kasih label di luar frame biar bisa dioper ke Gemini").
Every shot = the real keyframe (render of film.js at 85% of the shot) with ALL labels OUTSIDE the frame: shot id, timecode,
duration, beat, VO line, action, camera/layout, on-screen text, image sources, revision note. Nothing is drawn on the frame.
  python3 kit/tools/storyboard_sheet.py stories/<slug>/kolase [outdir]          (default outdir: <kolase>/board/sheet)
input : <kolase>/storyboard.json (same schema as storyboard_page/make_page.py) + START in film.js
output: storyboard_<no>_hNN.png (pages, 1500 px wide, 3–4 shots each), storyboard_<no>_grid.jpg (overview, label under
        each thumbnail), storyboard_<no>.pdf (all pages + grid; < 10 MB, fits Google Drive and Gemini uploads)."""
import sys, os, re, json, subprocess, glob, shutil, textwrap
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
film = os.path.abspath(sys.argv[1]); out = os.path.abspath(sys.argv[2] if len(sys.argv) > 2 else os.path.join(film, 'board', 'sheet'))
J = json.load(open(os.path.join(film, 'storyboard.json')))
S = [float(x) for x in re.search(r'START\s*=\s*\[([^\]]*)\]', open(os.path.join(film, 'film.js')).read()).group(1).split(',') if x.strip()]
assert len(S) == len(J['shots']) + 1, f"film.js START has {len(S) - 1} shots, storyboard.json has {len(J['shots'])}"
os.makedirs(out, exist_ok=True)
for f in glob.glob(os.path.join(out, 'storyboard_*')): os.remove(f)
kf = os.path.join(out, '_kf'); shutil.rmtree(kf, ignore_errors=True); os.makedirs(kf)
subprocess.run(['node', os.path.join(ROOT, 'kit/tools/keyframes_2d.mjs'), film, 'board', kf], check=True, capture_output=True)
alts = {i: s['alt'] for i, s in enumerate(J['shots']) if s.get('alt')}
altf = {}
if alts:
    ak = os.path.join(out, '_alt'); shutil.rmtree(ak, ignore_errors=True); os.makedirs(ak)
    ts = [S[i] + 0.02 if a['t'] == 'first' else float(a['t']) for i, a in alts.items()]
    subprocess.run(['node', os.path.join(ROOT, 'kit/tools/keyframes_2d.mjs'), film, ','.join('%.2f' % t for t in ts), ak], check=True, capture_output=True)
    for (i, a), f, t in zip(alts.items(), sorted(glob.glob(os.path.join(ak, 'kf_*.png'))), ts): altf[i] = (f, a.get('caption', ''), t)

FD = '/usr/share/fonts/truetype/dejavu/'
F = lambda n, s: ImageFont.truetype(FD + n, s)
fH, fID, fTC, fLab, fTx, fVO, fSm = F('DejaVuSans-Bold.ttf', 40), F('DejaVuSans-Bold.ttf', 46), F('DejaVuSansMono-Bold.ttf', 26), \
    F('DejaVuSans-Bold.ttf', 22), F('DejaVuSans.ttf', 24), F('DejaVuSerif-Italic.ttf', 27) if os.path.exists(FD + 'DejaVuSerif-Italic.ttf') else F('DejaVuSerif.ttf', 27), F('DejaVuSans.ttf', 20)
BG, CARD, INK, MUTE, RED, LINE = (238, 233, 222), (255, 253, 248), (28, 24, 20), (110, 100, 88), (179, 38, 30), (200, 190, 172)
fmt = lambda t: ('%d:%05.2f' % (t // 60, t % 60)).replace('.', ',')
no = '%03d' % J['no']; V = J.get('version', 'v1')
PW, M_, FW, FH = 1500, 36, 360, 640           # page width, margin, frame size on the sheet (9:16)
TX = M_ + FW + 40; TW = PW - TX - M_          # text column
wrap = lambda s, f, w: sum((textwrap.wrap(p, width=max(10, int(w / (f.getlength('n') * 1.0)))) or [''] for p in str(s).split('\n')), [])


def fit_lines(text, f, w):
    """greedy wrap by pixel width"""
    out = []
    for para in str(text).split('\n'):
        cur = ''
        for word in para.split(' '):
            t = (cur + ' ' + word).strip()
            if f.getlength(t) <= w or not cur: cur = t
            else: out.append(cur); cur = word
        out.append(cur)
    return out


def block(i):
    """one shot card (RGB) with the frame left and every label outside it"""
    s = J['shots'][i]; n = '%02d' % (i + 1)
    rows = [('VO', '“%s”' % s['vo'], fVO, INK)]
    for k, lab in [('aksi', 'AKSI'), ('kamera', 'KAMERA / TATA LETAK'), ('teks', 'TEKS LAYAR'), ('gambar', 'GAMBAR / SUMBER')]:
        if s.get(k): rows.append((lab, s[k], fTx, INK))
    if s.get('note'): rows.append(('REVISI ' + V, s['note'], fTx, RED))
    lines = []
    for lab, tx, f, col in rows:
        lines.append(('lab', lab)); lines += [('tx', l, f, col) for l in fit_lines(tx, f, TW - 20)]; lines.append(('gap',))
    th = 80 + sum(30 if l[0] == 'lab' else (12 if l[0] == 'gap' else 34) for l in lines)
    extra = altf.get(i)
    h = max(FH + 70 + (FH // 2 + 60 if extra else 0), th) + 30
    im = Image.new('RGB', (PW, h), CARD); d = ImageDraw.Draw(im)
    fr = Image.open(os.path.join(kf, 'kf_%02d.png' % (i + 1))).convert('RGB').resize((FW, FH), Image.LANCZOS)
    d.text((M_, 14), 'S' + n, font=fID, fill=RED)
    tc = '%s – %s  (%s dtk)' % (fmt(S[i]), fmt(S[i + 1]), ('%.2f' % (S[i + 1] - S[i])).replace('.', ','))
    d.text((M_ + 110, 26), tc, font=fTC, fill=INK)
    if s.get('beat'): d.text((M_ + 130 + fTC.getlength(tc), 28), ('BEAT: ' + s['beat']).upper(), font=fLab, fill=RED)
    im.paste(fr, (M_, 70)); d.rectangle([M_ - 2, 68, M_ + FW + 1, 70 + FH + 1], outline=INK, width=2)
    y = 70 + FH + 8
    d.text((M_, y), 'keyframe @ %s (85%% shot)' % fmt(S[i] + 0.85 * (S[i + 1] - S[i])), font=fSm, fill=MUTE)
    if extra:
        f2, cap, t = extra; y += 34
        a = Image.open(f2).convert('RGB').resize((FW // 2, FH // 2), Image.LANCZOS); im.paste(a, (M_, y))
        d.rectangle([M_ - 2, y - 2, M_ + FW // 2 + 1, y + FH // 2 + 1], outline=INK, width=2)
        for k, l in enumerate(fit_lines('frame tambahan @ %s: %s' % (fmt(t), cap), fSm, FW // 2 - 12)):
            d.text((M_ + FW // 2 + 12, y + k * 24), l, font=fSm, fill=MUTE)
    y = 70
    for l in lines:
        if l[0] == 'lab': d.text((TX, y + 4), l[1], font=fLab, fill=MUTE); y += 30
        elif l[0] == 'gap': y += 12
        else: d.text((TX + 10, y), l[1], font=l[2], fill=l[3]); y += 34
    d.line([0, h - 1, PW, h - 1], fill=LINE, width=2)
    return im


def header(page, total):
    im = Image.new('RGB', (PW, 120), BG); d = ImageDraw.Draw(im)
    title = re.sub('<[^>]+>', '', J['title'])
    d.text((M_, 18), 'ARSIP KASUS #%s · STORYBOARD %s' % (no, V), font=fH, fill=INK)
    d.text((M_, 72), '%s  ·  %d shot · VO %.2f dtk  ·  hal %d/%d' % (title, len(J['shots']), S[-1], page, total), font=fTx, fill=MUTE)
    return im


blocks = [block(i) for i in range(len(J['shots']))]
PAGE_H = 2420
pages, cur, ch = [], [], 120
for b in blocks:
    if cur and ch + b.height > PAGE_H: pages.append(cur); cur, ch = [], 120
    cur.append(b); ch += b.height
if cur: pages.append(cur)
imgs = []
for p, bl in enumerate(pages, 1):
    H_ = 120 + sum(b.height for b in bl)
    im = Image.new('RGB', (PW, H_), BG); im.paste(header(p, len(pages) + 1), (0, 0)); y = 120
    for b in bl: im.paste(b, (0, y)); y += b.height
    f = os.path.join(out, 'storyboard_%s_h%02d.png' % (no, p)); im.save(f, optimize=True); imgs.append(im)

# overview grid: thumbnails with their label UNDER the frame
C, TWg, THg = 6, 220, 391
R = (len(blocks) + C - 1) // C
G = Image.new('RGB', (M_ * 2 + C * TWg + (C - 1) * 18, 120 + R * (THg + 96) + 20), BG); d = ImageDraw.Draw(G)
G.paste(header(len(pages) + 1, len(pages) + 1), (0, 0))
for i in range(len(blocks)):
    x = M_ + (i % C) * (TWg + 18); y = 130 + (i // C) * (THg + 96)
    G.paste(Image.open(os.path.join(kf, 'kf_%02d.png' % (i + 1))).convert('RGB').resize((TWg, THg), Image.LANCZOS), (x, y))
    d.rectangle([x - 1, y - 1, x + TWg, y + THg], outline=INK, width=2)
    d.text((x, y + THg + 6), 'S%02d' % (i + 1), font=fLab, fill=RED)
    d.text((x + 52, y + THg + 8), '%s–%s' % (fmt(S[i]), fmt(S[i + 1])), font=fSm, fill=INK)
    vo = fit_lines(J['shots'][i]['vo'], fSm, TWg)[:2]
    for k, l in enumerate(vo): d.text((x, y + THg + 34 + k * 24), l, font=fSm, fill=MUTE)
gf = os.path.join(out, 'storyboard_%s_grid.jpg' % no); G.save(gf, quality=88)
pdf = os.path.join(out, 'storyboard_%s.pdf' % no)
allp = [G] + imgs
allp[0].save(pdf, save_all=True, append_images=allp[1:], resolution=110, quality=82)
for dd in ('_kf', '_alt'): shutil.rmtree(os.path.join(out, dd), ignore_errors=True)
print('%s · %d halaman + grid · %s (%.1f MB)' % (out, len(pages), os.path.basename(pdf), os.path.getsize(pdf) / 1e6))
