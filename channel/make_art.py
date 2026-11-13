"""Channel art in the ARSIP Kolase style: profile picture (800×800) and banner (2560×1440).
    python3 channel/make_art.py        → channel/profile_800x800.jpg, channel/banner_2560x1440.jpg (git-ignored; keep them in Drive)
Uses kit/collage (baker) and the cut-outs of #003 (stories/micin/kolase/parts; run that episode's bake first if missing)."""
import os, sys, math
import numpy as np
from PIL import Image, ImageFilter
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'kit', 'collage'))
from parts import *
import collage_lib as cl
OUT = os.path.join(ROOT, 'channel'); TMP = os.path.join(OUT, 'parts'); EP = os.path.join(ROOT, 'stories', 'micin', 'kolase', 'parts')
bk = Baker(TMP, None, B=1.0)

def paper_bg(w, h, seed=3):
    t = cl.paper_texture(h, w, seed=seed, fibers=int(w * h / 900)); t = 1 + (t - 1) * 0.8
    return Image.fromarray(np.clip(PAPER[None, None, :] * t[..., None], 0, 255).astype(np.uint8)).convert('RGBA')

def load(name, d=TMP):
    return Image.open(os.path.join(d, name + '.png')).convert('RGBA')

def place(canvas, im, cx, cy, scale=1.0, rot=0.0, shadow=True, ink=False):
    if scale != 1: im = im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale))), Image.LANCZOS)
    if rot: im = im.rotate(rot, Image.BICUBIC, expand=True)
    x, y = int(cx - im.width / 2), int(cy - im.height / 2)
    if shadow and not ink:
        a = im.split()[3].filter(ImageFilter.GaussianBlur(max(3, im.width / 90)))
        sh = Image.new('RGBA', im.size, (58, 38, 20, 0)); sh.putalpha(a.point(lambda v: int(v * 0.38)))
        canvas.alpha_composite(sh, (x + max(4, im.width // 70), y + max(5, im.width // 55)))
    if ink:   # multiply ink onto the paper below
        base = canvas.crop((x, y, x + im.width, y + im.height)).convert('RGB'); rgb = im.convert('RGB')
        mul = Image.fromarray((np.asarray(base, float) * np.asarray(rgb, float) / 255).astype(np.uint8))
        base.paste(mul, (0, 0), im.split()[3]); canvas.paste(base, (x, y))
    else:
        canvas.alpha_composite(im, (max(0, x), max(0, y)) if x >= 0 and y >= 0 else (0, 0)) if (x >= 0 and y >= 0) else _paste_clip(canvas, im, x, y)

def _paste_clip(canvas, im, x, y):
    cx0, cy0 = max(0, -x), max(0, -y)
    canvas.alpha_composite(im.crop((cx0, cy0, im.width, im.height)), (max(0, x), max(0, y)))

def ransom_row(canvas, prefix, cx, cy, scale=1.0, gap=-6, rots=(-6, 4, -3, 5, -4, 3, -2, 6)):
    names = bk.M['_ransom'][prefix]; ims = [load(n) if n else None for n in names]
    widths = [(im.width * scale if im else 70 * scale) for im in ims]; total = sum(widths) + gap * (len(ims) - 1)
    x = cx - total / 2
    for i, (im, w) in enumerate(zip(ims, widths)):
        if im is not None: place(canvas, im, x + w / 2, cy + (8 if i % 2 else -6) * scale, scale, rots[i % len(rots)])
        x += w + gap

# ---------- bake the channel's own pieces ----------
bk.flat('c_green', GREEN, ell=(380, 380), seed=11, rough=3)
bk.flat('c_amber', AMBER, ell=(420, 420), seed=13, rough=3)
bk.flat('c_red', RED, poly=[(-1400, -120), (1400, -170), (1390, 130), (-1390, 160)], seed=15, rough=4)
bk.flat('c_greenL', GREEN, poly=[(-700, -500), (680, -540), (700, 480), (-690, 520)], seed=16, rough=4)
bk.flat('c_manila', MANILA, poly=[(-330, -250), (330, -240), (320, 250), (-340, 260)], seed=17, rough=3, mottle=0.05)
bk.ransom('rmt', 'MT', 300, 4)
bk.ransom('rtitle', 'MINI THRILLER IDN', 150, 2)
bk.strip('s_line', 'ALASAN ASLI DI BALIK BENDA YANG KAMU KENAL', F_CPB, 50, CARD, INK, 31, padx=22, pady=10)
bk.strip('s_line2', 'Real Stories. Unexpected Truths.', F_FELLI, 46, INK * 1.05, CARD, 32, padx=22, pady=8)
bk.stamp('st_arsip', 'ARSIP KASUS', 70, RED, seed=33)
bk.stamp('st_terungkap', 'TERUNGKAP', 80, RED, seed=34)
bk.done()

# ---------- profile 800×800 (shown as a circle; must read at 98 px) ----------
P = paper_bg(800, 800)
place(P, load('c_green'), 400, 400, 1.0, 0, shadow=True)
place(P, load('c_manila'), 400, 410, 0.95, -5)
ransom_row(P, 'rmt', 400, 380, 1.0, gap=-14, rots=(-7, 6))
place(P, load('st_arsip'), 405, 585, 0.95, -7, ink=True)
P.convert('RGB').save(os.path.join(OUT, 'profile_800x800.jpg'), quality=94)

# ---------- banner 2560×1440 (safe area for every device: 1546×423 in the centre) ----------
Bn = paper_bg(2560, 1440, seed=5)
place(Bn, load('c_greenL'), 560, 300, 1.2, -6)
place(Bn, load('c_amber'), 2240, 1120, 1.1, 0)
place(Bn, load('c_red'), 1280, 1330, 1.0, 3)
place(Bn, load('c_manila'), 1280, 730, 2.45, -1.5)            # the case card behind the title
props = [('sachet', 260, 980, 0.62, -9), ('cow', 2300, 330, 0.75, 4), ('mouse', 420, 560, 0.7, 8), ('lantern', 2050, 230, 0.8, -3),
         ('syringe', 2290, 760, 0.6, -28), ('letter', 160, 330, 0.45, 7), ('globe', 830, 1180, 0.45, -6), ('molecule', 1850, 1180, 0.55, 10)]
for n, x, y, s, r in props:
    if os.path.exists(os.path.join(EP, n + '.png')): place(Bn, load(n, EP), x, y, s, r)
ransom_row(Bn, 'rtitle', 1280, 640, 0.78, gap=-4)
place(Bn, load('s_line'), 1280, 790, 1.0, -1)
place(Bn, load('s_line2'), 1280, 870, 0.9, 1)
place(Bn, load('st_terungkap'), 1940, 1000, 0.8, -10, ink=True)
Bn.convert('RGB').save(os.path.join(OUT, 'banner_2560x1440.jpg'), quality=92)
print('ok')
