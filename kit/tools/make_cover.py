"""Custom Shorts thumbnail (1080x1920) for an ARSIP Kolase film, in the film's own paper look.
  python3 kit/tools/make_cover.py stories/<slug>/kolase            -> stories/<slug>/renders/thumbnail_<slug>_1080x1920.jpg
Reads kolase/cover.json:
  {"t": 0.9,                                   film second used as the base frame (rendered from film.js without captions)
   "lines": [["DIATUR DARI", "ink"], ["LAPANGAN GOLF?", "red"]],   big torn slips (paper colour: ink|red|green|amber)
   "tag": "ARSIP KASUS #005", "foot": "menurut KPPU · 2017",
   "y": 1330,                                   top of the slip block (keep it under the hero stamp and end it by y ~1620: the Shorts shelf
                                                 draws the video title over the bottom of the card)
   "props": [{"part": "flag", "x": 960, "y": 960, "r": 8, "s": 0.6}]}   paper parts from kolase/parts, world px
Also writes cover_frame_<t>s.jpg straight from the newest render (fallback when custom thumbnails are not available)."""
import os, sys, json, glob, subprocess, tempfile
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'collage'))
from parts import Baker, F_SLAB, F_CPB, INK, RED, GREEN, AMBER, CARD

KOL = os.path.abspath(sys.argv[1]); STORY = os.path.dirname(KOL); SLUG = os.path.basename(STORY)
C = json.load(open(os.path.join(KOL, 'cover.json')))
TMP = tempfile.mkdtemp(prefix='cover_')
PAPERS = dict(ink=(INK * 1.05, CARD), red=(RED, CARD), green=(GREEN, CARD), amber=(AMBER, INK))
B = 1.5

# 1. clean base frame from film.js (same renderer as the film; captions are covered by the slip block)
subprocess.run(['node', os.path.join(os.path.dirname(__file__), 'keyframes_2d.mjs'), KOL, str(C['t']), TMP], check=True, capture_output=True,
               env=dict(os.environ, NOCAP='1'))
base = Image.open(os.path.join(TMP, 'kf_01.png')).convert('RGBA')


def piece(png, x, y, r=0, s=1.0, z=1.0, k=B):
    """paste one paper piece centred at world (x, y), scale s, rotation r (deg, clockwise like the engine), soft shadow by height z"""
    im = Image.open(png).convert('RGBA')
    w, h = int(im.width / k * s), int(im.height / k * s)
    im = im.resize((max(1, w), max(1, h)), Image.LANCZOS).rotate(-r, resample=Image.BICUBIC, expand=True)
    a = im.split()[3]
    sh = Image.new('RGBA', im.size, (20, 14, 8, 0)); sh.putalpha(a.point(lambda v: int(v * 0.34)))
    sh = sh.filter(ImageFilter.GaussianBlur(3 + 3 * z))
    ox, oy = int(x - im.width / 2), int(y - im.height / 2)
    base.alpha_composite(sh, (ox + int(3 + 4.2 * z), oy + int(4 + 5.4 * z)))
    base.alpha_composite(im, (ox, oy))
    return im.size


bk = Baker(TMP, None, B)
for i, p in enumerate(C.get('props', [])):
    piece(os.path.join(KOL, 'parts', p['part'] + '.png'), p['x'], p['y'], p.get('r', 0), p.get('s', 1), p.get('z', 1.2))

# 2. the hook: 2 big torn slips, fitted to <= 980 px wide, alternating tilt
y = C.get('y', 1330); tilt = [-2.2, 1.6, -1.2]
for i, (txt, pap) in enumerate(C['lines']):
    paper, ink = PAPERS[pap]
    m = bk.strip('L%d' % i, txt, F_SLAB, 84, paper, ink, 900 + i * 7, padx=24, pady=12)
    s = min(1.0, 980 / m['w'] * B); hh = m['h'] / B * s
    piece(os.path.join(TMP, 'L%d.png' % i), 540 + (-14 if i % 2 == 0 else 14), y + hh / 2, tilt[i], s, 2.0)
    y += hh - 6
# 3. series tag above the block, small source line under it
if C.get('tag'):
    m = bk.strip('TAG', C['tag'], F_CPB, 40, RED, CARD, 931, padx=14, pady=6, mono=True)
    piece(os.path.join(TMP, 'TAG.png'), 300, C.get('y', 1330) - m['h'] / B / 2 + 8, -3, 1.0, 2.4)
if C.get('foot'):
    bk.strip('FOOT', C['foot'], F_CPB, 30, CARD, INK, 941, padx=12, pady=5, mono=True)
    piece(os.path.join(TMP, 'FOOT.png'), 540, y + 34, 1.0, 1.0, 1.6)

out = os.path.join(STORY, 'renders', 'thumbnail_%s_1080x1920.jpg' % SLUG)
os.makedirs(os.path.dirname(out), exist_ok=True)
base.convert('RGB').save(out, quality=90, optimize=True)
print('thumbnail', out, '%.0f KB' % (os.path.getsize(out) / 1024))

# 4. fallback: the plain frame from the newest render at the same second
vids = sorted(glob.glob(os.path.join(STORY, 'renders', 'ARSIP_*_v*.mp4')), key=os.path.getmtime)
if vids:
    fr = os.path.join(STORY, 'renders', 'cover_frame_%.1fs.jpg' % C['t'])
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', str(C['t']), '-i', vids[-1], '-frames:v', '1', '-q:v', '2', fr], check=True)
    print('frame', fr, 'from', os.path.basename(vids[-1]))
