"""Engraving-style line drawings for objects with no free print (syringe, glass, baby bottle, salt shaker, globe).
Drawn as ink on white into raw/gen_*.png, then cut out by bake.py like any found print. python3 draw_engr.py"""
import os, sys, math
import numpy as np
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', '..', 'kit', 'collage'))
from collage_lib import engrave, fbm
RAW = os.path.join(HERE, 'raw'); os.makedirs(RAW, exist_ok=True)
N = 1200

def canvas():
    return Image.new('L', (N, N), 0)

def shade(mask, axis_x0, axis_x1, spacing=9, base=0.08, k=0.75, angle=0.25, seed=0):
    """engraved hatch inside mask: lighter at the left (light from top-left), darker at the right edge."""
    yy, xx = np.mgrid[:N, :N].astype(float)
    u = np.clip((xx - axis_x0) / max(1, axis_x1 - axis_x0), 0, 1)
    tone = np.clip(base + k * u ** 1.6, 0, 1)
    return engrave(tone, yy + angle * xx, spacing, wobble=0.04 * fbm(N, N, scales=(30,), weights=(1,), seed=seed)) * mask

def finish(name, outline_img, hatch):
    o = np.asarray(outline_img, float) / 255
    ink = np.clip(np.maximum(o, hatch), 0, 1)
    Image.fromarray((255 * (1 - ink)).astype(np.uint8)).save(os.path.join(RAW, f'gen_{name}.png'))

def poly_mask(pts):
    im = canvas(); ImageDraw.Draw(im).polygon(pts, fill=255); return np.asarray(im, float) / 255 > 0.5

def syringe():
    o = canvas(); d = ImageDraw.Draw(o); L = 9
    bx0, bx1, by0, by1 = 260, 820, 520, 680
    d.rectangle([bx0, by0, bx1, by1], outline=255, width=L)
    m = np.zeros((N, N), bool); m[by0 + 8:by1 - 8, bx0 + 8:bx0 + 380] = True       # liquid
    h = shade(m, bx0, bx1, spacing=10, base=0.25, k=0.5, angle=0.0)
    for i in range(1, 12):
        x = bx0 + i * 45; d.line([x, by0, x, by0 + (40 if i % 2 else 70)], fill=255, width=5)
    d.rectangle([bx1, 560, bx1 + 90, 640], outline=255, width=L)                    # hub
    d.line([bx1 + 90, 600, 1180, 600], fill=255, width=7)                             # needle
    d.rectangle([150, 590 - 12, bx0, 612], outline=255, width=L)                       # plunger rod
    d.rectangle([90, 470, 150, 730], outline=255, width=L)                             # thumb plate
    d.rectangle([bx0 - 30, 450, bx0, 750], outline=255, width=L)                       # finger flange
    d.rectangle([bx0 + 380, by0 + 8, bx0 + 395, by1 - 8], fill=255)                   # plunger rubber
    hb = shade(poly_mask([(bx0 - 30, 450), (bx0, 450), (bx0, 750), (bx0 - 30, 750)]), bx0 - 30, bx0, 8, 0.4, 0.5)
    finish('syringe', o, np.maximum(h, hb))

def glass():
    o = canvas(); d = ImageDraw.Draw(o); L = 9
    top, bot = (330, 870, 220), (400, 800, 1040)
    body = [(top[0], top[2]), (top[1], top[2]), (bot[1], bot[2]), (bot[0], bot[2])]
    d.line(body + [body[0]], fill=255, width=L)
    d.ellipse([top[0], top[2] - 50, top[1], top[2] + 50], outline=255, width=L)
    d.ellipse([bot[0], bot[2] - 40, bot[1], bot[2] + 40], outline=255, width=L)
    lv = 520; lx0 = top[0] + (bot[0] - top[0]) * (lv - top[2]) / (bot[2] - top[2]); lx1 = top[1] - (top[1] - bot[1]) * (lv - top[2]) / (bot[2] - top[2])
    d.ellipse([lx0, lv - 44, lx1, lv + 44], outline=255, width=6)
    liquid = poly_mask([(lx0, lv), (lx1, lv), (bot[1], bot[2]), (bot[0], bot[2])])
    h = shade(liquid, bot[0], bot[1], 11, 0.15, 0.55, 0.0)
    glint = poly_mask([(top[0] + 40, top[2] + 60), (top[0] + 75, top[2] + 60), (bot[0] + 60, bot[2] - 60), (bot[0] + 30, bot[2] - 60)])
    side = poly_mask([(top[1] - 90, top[2] + 40), (top[1] - 10, top[2] + 40), (bot[1] - 10, bot[2] - 30), (bot[1] - 70, bot[2] - 30)])
    h = np.maximum(h, shade(side, top[1] - 90, top[1], 8, 0.3, 0.6, 0.0)) * (1 - glint)
    finish('glass', o, h)

def babybottle():
    o = canvas(); d = ImageDraw.Draw(o); L = 9
    pts = [(470, 330), (730, 330), (760, 380), (800, 470), (800, 1040), (760, 1080), (440, 1080), (400, 1040), (400, 470), (440, 380)]
    d.line(pts + [pts[0]], fill=255, width=L, joint='curve')
    d.rectangle([450, 270, 750, 335], outline=255, width=L)                              # collar
    for i in range(6): d.line([455, 280 + i * 10, 745, 280 + i * 10], fill=255, width=3)
    d.polygon([(520, 270), (680, 270), (640, 140), (600, 70), (560, 140)], outline=255, width=L)   # teat
    for i in range(7):
        y = 560 + i * 65; d.line([420, y, 470 + (40 if i % 2 == 0 else 0), y], fill=255, width=6)
    milk = poly_mask([(404, 640), (796, 640), (796, 1040), (760, 1076), (440, 1076), (404, 1040)])
    h = shade(milk, 400, 800, 12, 0.05, 0.45, 0.1)
    rim = poly_mask([(720, 470), (796, 470), (796, 1040), (740, 1070)])
    finish('babybottle', o, np.maximum(h, shade(rim, 700, 800, 8, 0.35, 0.6, 0.0)))

def salt():
    o = canvas(); d = ImageDraw.Draw(o); L = 9
    d.rectangle([420, 420, 780, 1050], outline=255, width=L)
    d.chord([420, 230, 780, 610], 180, 360, outline=255, width=L)
    d.rectangle([410, 400, 790, 440], outline=255, width=L)
    for (x, y) in [(560, 300), (600, 290), (640, 300), (580, 340), (620, 340), (540, 345), (660, 345)]:
        d.ellipse([x - 9, y - 9, x + 9, y + 9], fill=255)
    body = np.zeros((N, N), bool); body[445:1045, 425:776] = True
    grains = np.random.default_rng(3).random((N, N)) > 0.985
    h = np.maximum(shade(body, 420, 780, 10, 0.05, 0.7, 0.0), (np.arange(N)[:, None] > 700) * body * grains)
    finish('salt', o, h)
    
def globe():
    o = canvas(); d = ImageDraw.Draw(o); L = 9
    cx, cy, r = 600, 520, 380
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=255, width=L)
    for k in (0.33, 0.66, 1.0):
        d.ellipse([cx - r * k * 0.98, cy - r, cx + r * k * 0.98, cy + r], outline=255, width=4)
    for lat in (-0.6, -0.3, 0, 0.3, 0.6):
        y = cy + lat * r; w = r * math.sqrt(1 - lat * lat)
        d.arc([cx - w, y - w * 0.18, cx + w, y + w * 0.18], 0, 180, fill=255, width=4)
    rng = np.random.default_rng(9)   # loose continents
    for (ax, ay, s) in [(-0.35, -0.3, 0.38), (0.2, 0.15, 0.32), (0.35, -0.4, 0.22), (-0.2, 0.45, 0.2)]:
        pts = [(cx + (ax + s * math.cos(t) * (0.7 + 0.3 * rng.random())) * r, cy + (ay + s * 0.8 * math.sin(t) * (0.7 + 0.3 * rng.random())) * r) for t in np.linspace(0, 2 * math.pi, 18, endpoint=False)]
        d.polygon(pts, outline=255, width=5)
        m = poly_mask(pts)
        yy, xx = np.mgrid[:N, :N]
        o2 = np.asarray(o, float)
    sphere = np.zeros((N, N)); yy, xx = np.mgrid[:N, :N].astype(float)
    inside = (xx - cx) ** 2 + (yy - cy) ** 2 < (r - 8) ** 2
    h = shade(inside & ((xx - cx) > r * 0.25), cx, cx + r, 9, 0.05, 0.55, 0.4)
    d.arc([cx - r - 50, cy - r - 50, cx + r + 50, cy + r + 50], 120, 300, fill=255, width=14)  # meridian ring
    d.line([cx, cy + r + 40, cx, 1010], fill=255, width=22)
    d.polygon([(cx - 200, 1100), (cx + 200, 1100), (cx + 120, 1010), (cx - 120, 1010)], outline=255, width=L)
    base = poly_mask([(cx - 200, 1100), (cx + 200, 1100), (cx + 120, 1010), (cx - 120, 1010)])
    finish('globe', o, np.maximum(h, shade(base, cx - 200, cx + 200, 8, 0.2, 0.6, 0)))

for f in (syringe, glass, babybottle, salt, globe):
    f(); print('drawn', f.__name__)
