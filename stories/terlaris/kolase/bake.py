"""ARSIP #015 Label Best Seller di Buku Menu · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/terlaris/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner in Google Flow
(kolase/ai/, copied into raw/ here). Three AI sources are edited before cutting (registered, same pixel grid):
  buku_menu      → dish names typed on the blank rows (Indonesian cafe menu, illustrative, no prices, no restaurant name);
  pengunjung_*   → the pseudo-text on the menu he holds is whited out and replaced by plain ruled rows (QA 18 Nov 2026).
Code-drawn pieces: the BEST SELLER badge (red rosette), the faint shadow of many pointing hands (Conceptual Loop: planted behind the
badge at frame 0, revealed in the last 6 s), a readable menu card, the eye icon, the influence dial, the Beijing test sheet, two tent
cards (5 MENU TERLARIS with ranks 1–5 vs 5 MENU CONTOH without ranks; dish names illustrative, the study's list is unknown), the
order-increase chart frame (bars drawn live in film.js: +13–20% vs ≈0, Cai, Chen & Fang 2009), the guest questionnaire
(self-reported satisfaction), the taste score sheet, order tickets, diner silhouettes, stamps and slips. No logos, no Chinese
characters, all screen text Indonesian."""
import os, sys, json, shutil, glob, math
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', '..', 'kit', 'collage'))
from parts import *
from parts import font
from signature import bake_signature, bake_prints
HERE = os.path.dirname(os.path.abspath(__file__))
EP = json.load(open(os.path.join(HERE, 'episode.json')))
bk = Baker(os.path.join(HERE, 'parts'), os.path.join(HERE, 'raw'))
C = lambda a: tuple(int(v) for v in a)
ONLY = set(sys.argv[1:]); want = lambda g: not ONLY or g in ONLY
GOLD = np.array([214, 168, 74], float)
WHITE = (250, 250, 248)


def ai_to_raw():
    """AI prints → raw/ai_<name>.jpg; always refreshed (redone images keep the same name)"""
    os.makedirs(bk.raw, exist_ok=True)
    for f in glob.glob(os.path.join(HERE, 'ai', '*.jpg')) + glob.glob(os.path.join(HERE, 'ai', '*.tint.png')):
        shutil.copy(f, os.path.join(bk.raw, 'ai_' + os.path.basename(f)))


# ---------- registration: world offset (from the cut-out's centre) of a point given in 0..1 of the source ----------
def mask_box(file, crop=None, thresh=205, close=0.012, keep=0.04):
    """bbox (source px of the cropped image) of the mask Baker.cut builds; the cut-out's centre ≈ the bbox centre"""
    im = bk.load(file, crop); g = np.asarray(im.convert('L'), float); h, w = g.shape
    it = max(1, int(close * max(h, w)))
    m = ndi.binary_closing(np.pad(g < thresh, it + 2), iterations=it)[it + 2:-it - 2, it + 2:-it - 2]
    m = ndi.binary_fill_holes(m); lab, n = ndi.label(m)
    if n > 1:
        s = np.bincount(lab.ravel()); s[0] = 0; m = np.isin(lab, np.nonzero(s >= keep * s.max())[0])
    ys, xs = np.nonzero(m)
    return xs.min(), ys.min(), xs.max(), ys.max(), w, h


def reg(file, width, pts, crop=None):
    x0, y0, x1, y1, w, h = mask_box(file, crop)
    k = width / (x1 - x0 + 1); cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    return {n: [round((u * w - cx) * k, 1), round((v * h - cy) * k, 1)] for n, (u, v) in pts.items()}


# ---------- source edits (same grid as the AI print) ----------
MENU_G = {   # the one typed line group of the blank menu (fractions of the image); the other groups stay the AI's ruled lines
    'g1': (0.118, 0.285, 0.36, 0.47, ['Nasi Goreng', 'Ayam Geprek', 'Mie Ayam']),
}


def menu_source():
    """buku_menu with three big typed dish rows (≥ 38 px on screen at the hero scale) + MAKANAN / MINUMAN on the banners
    (2× the AI pixels so the type stays sharp) → raw/ai_buku_menu_isi.jpg; row ends in 0..1"""
    im = Image.open(os.path.join(bk.raw, 'ai_buku_menu.jpg')).convert('RGB'); im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
    W_, H_ = im.size; d = ImageDraw.Draw(im); rows = {}
    fh = font(F_SLAB, 84)
    for key, (x0, y0, x1, y1, names) in MENU_G.items():
        d.rectangle([x0 * W_ - 6, y0 * H_, x1 * W_ + 6, y1 * H_], fill=WHITE)
        sz = 100
        while max(font(F_OSW, sz).getlength(t) for t in names) > (x1 - x0) * W_ - 20: sz -= 2
        f = font(F_OSW, sz)
        n = len(names); step = (y1 - y0) * H_ / n
        for i, t in enumerate(names):
            yy = y0 * H_ + step * (i + 0.5)
            d.text((x0 * W_ + 8, yy - sz * 0.72), t, font=f, fill=(34, 28, 24))
            d.line([x0 * W_ + 8, yy + sz * 0.5, x1 * W_, yy + sz * 0.5], fill=(60, 52, 46), width=3)
            rows[t] = (x1, yy / H_)
        print('menu rows font', sz)
    for t, cx in [('MAKANAN', 0.272), ('MINUMAN', 0.718)]:
        tw = fh.getlength(t); d.text((cx * W_ - tw / 2, 0.152 * H_ - 50), t, font=fh, fill=(34, 28, 24))
    im.save(os.path.join(bk.raw, 'ai_buku_menu_isi.jpg'), quality=94)
    return rows


def whiteout_menu(src, dst, pages, keep, lines):
    """white out the pseudo-text inside the held menu's page polygons (minus the hands/glass in `keep`), then draw plain rows"""
    im = Image.open(os.path.join(bk.raw, src)).convert('RGB'); W_, H_ = im.size
    P = lambda pts: [(x * W_, y * H_) for x, y in pts]
    m = Image.new('L', im.size, 0); dm = ImageDraw.Draw(m)
    for p in pages: dm.polygon(P(p), fill=255)
    for p in keep: dm.polygon(P(p), fill=0)
    m = m.filter(__import__('PIL.ImageFilter', fromlist=['x']).MinFilter(5))
    a = np.asarray(im, float); mm = np.asarray(m, float)[..., None] / 255
    a = a * (1 - mm) + np.array(WHITE, float) * mm
    im = Image.fromarray(a.astype(np.uint8)); d = ImageDraw.Draw(im)
    for (p0, p1) in lines: d.line(P([p0, p1]), fill=(70, 62, 56), width=3)
    im.save(os.path.join(bk.raw, dst), quality=94)


def held_menus():
    # pengunjung_bingung: open menu held in both hands (left page facing us, right page turned away)
    L = [(0.541, 0.444), (0.757, 0.49), (0.672, 0.693), (0.441, 0.647)]
    R = [(0.757, 0.49), (0.905, 0.431), (0.809, 0.596), (0.703, 0.683)]
    keep = [[(0.40, 0.56), (0.555, 0.56), (0.555, 0.66), (0.40, 0.66)],            # left hand
            [(0.79, 0.55), (0.95, 0.55), (0.95, 0.68), (0.79, 0.68)],               # right hand
            [(0.62, 0.68), (0.73, 0.62), (0.75, 0.72), (0.62, 0.72)]]              # straw top / glass
    rows = []
    for i in range(7):
        t = 0.12 + i * 0.11
        a = (0.541 + (0.441 - 0.541) * t, 0.444 + (0.647 - 0.444) * t); b = (0.757 + (0.672 - 0.757) * t, 0.49 + (0.693 - 0.49) * t)
        rows.append(((a[0] + (b[0] - a[0]) * 0.1, a[1] + (b[1] - a[1]) * 0.1), (a[0] + (b[0] - a[0]) * 0.88, a[1] + (b[1] - a[1]) * 0.88)))
    whiteout_menu('ai_pengunjung_bingung.jpg', 'ai_pengunjung_bingung_c.jpg', [L, R], keep, [r for k, r in enumerate(rows) if k not in (3,)])
    # pengunjung_tunjuk: menu lying open on the table, finger on one row
    L2 = [(0.41, 0.741), (0.6425, 0.704), (0.83, 0.775), (0.62, 0.817)]
    R2 = [(0.6425, 0.704), (0.796, 0.686), (0.92, 0.74), (0.83, 0.775)]
    keep2 = [[(0.38, 0.62), (0.635, 0.62), (0.645, 0.735), (0.52, 0.745), (0.38, 0.72)]]
    rows2 = []
    for i in range(6):
        t = 0.2 + i * 0.13
        a = (0.41 + (0.62 - 0.41) * t, 0.741 + (0.817 - 0.741) * t); b = (0.6425 + (0.83 - 0.6425) * t, 0.704 + (0.775 - 0.704) * t)
        rows2.append(((a[0] + (b[0] - a[0]) * 0.12, a[1] + (b[1] - a[1]) * 0.12), (a[0] + (b[0] - a[0]) * 0.9, a[1] + (b[1] - a[1]) * 0.9)))
        a = (0.6425 + (0.83 - 0.6425) * t, 0.704 + (0.775 - 0.704) * t); b = (0.796 + (0.92 - 0.796) * t, 0.686 + (0.74 - 0.686) * t)
        rows2.append(((a[0] + (b[0] - a[0]) * 0.1, a[1] + (b[1] - a[1]) * 0.1), (a[0] + (b[0] - a[0]) * 0.9, a[1] + (b[1] - a[1]) * 0.9)))
    whiteout_menu('ai_pengunjung_tunjuk.jpg', 'ai_pengunjung_tunjuk_c.jpg', [L2, R2], keep2, rows2)


# ---------- the badge and the loop shadow ----------
def badge(name='lencana', D=230, seed=1701):
    """BEST SELLER rosette: scalloped red disc, gold ring, two ribbon tails; cut to its own outline"""
    def outline(dm, k, P, fill=255):
        X = lambda v: P + v * k
        cx, cy, r = D / 2, D / 2, D / 2
        for tx in (-1, 1):
            dm.polygon([(X(cx + tx * 22), X(cy + 40)), (X(cx + tx * 74), X(cy + 40)), (X(cx + tx * 96), X(D + 70)), (X(cx + tx * 64), X(D + 50)),
                        (X(cx + tx * 40), X(D + 76))], fill=fill)
        pts = []
        for i in range(48):
            a = i / 48 * 2 * math.pi; rr = r * (0.94 if i % 2 else 1.0)
            pts.append((X(cx + math.cos(a) * rr), X(cy + math.sin(a) * rr)))
        dm.polygon(pts, fill=fill)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        cx, cy = D / 2, D / 2
        for tx in (-1, 1):
            d.polygon([(X(cx + tx * 22), X(cy + 40)), (X(cx + tx * 74), X(cy + 40)), (X(cx + tx * 96), X(D + 70)), (X(cx + tx * 64), X(D + 50)),
                       (X(cx + tx * 40), X(D + 76))], fill=C(RED * 0.85), outline=C(INK))
        pts = []
        for i in range(48):
            a = i / 48 * 2 * math.pi; rr = D / 2 * (0.94 if i % 2 else 1.0)
            pts.append((X(cx + math.cos(a) * rr), X(cy + math.sin(a) * rr)))
        d.polygon(pts, fill=C(RED), outline=C(INK))
        d.ellipse([X(cx - 88), X(cy - 88), X(cx + 88), X(cy + 88)], fill=C(GOLD), outline=C(INK), width=max(2, int(3 * k)))
        d.ellipse([X(cx - 76), X(cy - 76), X(cx + 76), X(cy + 76)], fill=C(RED), outline=C(INK), width=max(1, int(2 * k)))
        for j in range(5):   # small stars on the ring
            a = -math.pi / 2 + (j - 2) * 0.42
            sx, sy = cx + math.cos(a) * 82, cy + math.sin(a) * 82 + 0
            d.ellipse([X(sx - 4), X(sy - 4), X(sx + 4), X(sy + 4)], fill=C(INK))
        f = font(F_SLAB, 44 * k)
        for t, yy in [('BEST', cy - 46), ('SELLER', cy + 2)]:
            tw = f.getlength(t); d.text((X(cx) - tw / 2, X(yy)), t, font=f, fill=C(CARD))
    bk.doc(name, D, D + 80, RED, draw, seed=seed, rough=0.12, shape=outline)


def hand_shadow():
    """the Conceptual Loop: many hands pointing at one plate, as a soft ink shadow (shape of the AI print tangan_menunjuk)"""
    im = bk.load('ai_tangan_menunjuk.jpg', crop=[0.06, 0.08, 0.94, 0.92]); g = np.asarray(im.convert('L'), float)
    m = ndi.binary_dilation(g < 170, iterations=2)
    holes, nh = ndi.label(~m)
    if nh:
        hs = np.bincount(holes.ravel()); small = np.nonzero(hs < 0.002 * m.size)[0]; m = m | np.isin(holes, small[small > 0])
    m = ndi.binary_opening(m, iterations=1)
    s = 900 * bk.B / g.shape[1]
    a = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).resize((int(g.shape[1] * s), int(g.shape[0] * s)), Image.LANCZOS), float) / 255
    a = ndi.gaussian_filter(a, 1.6 * bk.B)
    # the plate in the middle stays open (the badge sits there)
    hh, ww = a.shape; yy, xx = np.mgrid[:hh, :ww]
    a *= np.clip(((xx - ww * 0.5) / (ww * 0.1)) ** 2 + ((yy - hh * 0.5) / (hh * 0.08)) ** 2 - 0.6, 0, 1).clip(0, 1)
    bk.save('bayang_tangan', INK[None, None, :] * 1.05, a * 0.9, ink=1)


# ---------- documents ----------
MENU_ROWS = [('Nasi Goreng', '25rb'), ('Ayam Geprek', '24rb'), ('Mie Ayam', '22rb'), ('Soto Ayam', '20rb'), ('Sate Ayam', '30rb'),
             ('Gado-gado', '18rb'), ('Nasi Uduk', '15rb'), ('Bakmi Goreng', '23rb')]


def menu_card():
    """a readable menu page (illustrative dishes and prices); the badge row (Ayam Geprek) is stored for film.js"""
    W_, H_ = 600, 860
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rectangle([X(14), X(14), X(W_ - 14), X(H_ - 14)], outline=C(INK), width=max(2, int(3 * k)))
        d.rectangle([X(24), X(24), X(W_ - 24), X(H_ - 24)], outline=C(INK), width=1)
        fh = font(F_SLAB, 64 * k); t = 'MENU'; d.text((X(W_ / 2) - fh.getlength(t) / 2, X(50)), t, font=fh, fill=C(INK))
        fs = font(F_FELLI, 34 * k); t = 'makanan'; d.text((X(W_ / 2) - fs.getlength(t) / 2, X(130)), t, font=fs, fill=C(INK))
        d.line([X(70), X(186), X(W_ - 70), X(186)], fill=C(INK), width=max(2, int(2 * k)))
        f = font(F_CPB, 40 * k); y = 222
        for a, b in MENU_ROWS:
            d.text((X(52), X(y)), a, font=f, fill=C(INK)); bw = f.getlength(b); d.text((X(W_ - 52) - bw, X(y)), b, font=f, fill=C(INK))
            x0 = 52 + f.getlength(a) / k + 14; x1 = W_ - 52 - bw / k - 14
            for xx in np.arange(x0, x1, 16): d.ellipse([X(xx), X(y + 26), X(xx + 4), X(y + 30)], fill=C(INK * 1.6))
            y += 76
    m = bk.doc('kartu_menu', W_, H_, CARD, draw, seed=1801, rough=0.4)
    m['rows'] = [round(222 + 20 + i * 76 - H_ / 2, 1) for i in range(len(MENU_ROWS))]


def eye():
    def shape(dm, k, P):
        X = lambda v: P + v * k
        dm.polygon([(X(0), X(60))] + [(X(10 + i * 10), X(60 - 56 * math.sin(math.pi * i / 20))) for i in range(21)] + [(X(220), X(60))] +
                   [(X(10 + i * 10), X(60 + 56 * math.sin(math.pi * i / 20))) for i in range(20, -1, -1)], fill=255)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        top = [(X(10 + i * 10), X(60 - 50 * math.sin(math.pi * i / 20))) for i in range(21)]
        bot = [(X(10 + i * 10), X(60 + 50 * math.sin(math.pi * i / 20))) for i in range(21)]
        d.polygon(top + bot[::-1], fill=C(CARD), outline=C(INK))
        d.line(top, fill=C(INK), width=max(3, int(5 * k))); d.line(bot, fill=C(INK), width=max(2, int(3 * k)))
        d.ellipse([X(80), X(20), X(160), X(100)], fill=C(GREEN * 1.1), outline=C(INK), width=max(2, int(3 * k)))
        for j in range(24):
            a = j / 24 * 2 * math.pi; d.line([X(120 + math.cos(a) * 18), X(60 + math.sin(a) * 18), X(120 + math.cos(a) * 38), X(60 + math.sin(a) * 38)], fill=C(INK), width=1)
        d.ellipse([X(104), X(44), X(136), X(76)], fill=C(INK)); d.ellipse([X(124), X(46), X(132), X(54)], fill=C(CARD))
        for i in range(2, 19, 2):
            x = 10 + i * 10; y = 60 - 50 * math.sin(math.pi * i / 20)
            d.line([X(x), X(y), X(x + (i - 10) * 1.2), X(y - 14)], fill=C(INK), width=max(1, int(2 * k)))
    bk.doc('mata', 230, 120, CARD, draw, seed=1802, rough=0.1, shape=shape)


def dial():
    """influence gauge (no numbers): LEMAH … KUAT; the needle is a separate piece rotated in film.js around its base"""
    W_, H_ = 520, 330
    def shape(dm, k, P):
        X = lambda v: P + v * k
        dm.pieslice([X(10), X(20), X(W_ - 10), X(W_ - 20 + 10)], 180, 360, fill=255); dm.rectangle([X(10), X(W_ / 2 - 10), X(W_ - 10), X(H_)], fill=255)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        cx, cy, r = W_ / 2, W_ / 2 + 0, W_ / 2 - 40
        d.pieslice([X(cx - r), X(cy - r), X(cx + r), X(cy + r)], 180, 240, fill=C(CARD * 0.95))
        d.pieslice([X(cx - r), X(cy - r), X(cx + r), X(cy + r)], 300, 360, fill=C(AMBER * 0.75 + CARD * 0.25))
        d.arc([X(cx - r), X(cy - r), X(cx + r), X(cy + r)], 180, 360, fill=C(INK), width=max(3, int(5 * k)))
        for i in range(13):
            a = math.pi + i / 12 * math.pi; L = 34 if i % 3 == 0 else 18
            d.line([X(cx + math.cos(a) * r), X(cy + math.sin(a) * r), X(cx + math.cos(a) * (r - L)), X(cy + math.sin(a) * (r - L))], fill=C(INK), width=max(2, int(3 * k)))
        f = font(F_CPB, 30 * k)
        d.text((X(30), X(cy + 8)), 'LEMAH', font=f, fill=C(INK)); t = 'KUAT'; d.text((X(W_ - 30) - f.getlength(t), X(cy + 8)), t, font=f, fill=C(RED))
        fh = font(F_SLAB, 36 * k); t = 'PENGARUH'; d.text((X(cx) - fh.getlength(t) / 2, X(cy - 120)), t, font=fh, fill=C(INK))
        d.ellipse([X(cx - 18), X(cy - 18), X(cx + 18), X(cy + 18)], fill=C(INK))
    m = bk.doc('dial', W_, H_, CARD, draw, seed=1803, rough=0.3, shape=shape)
    m['pivot'] = [0, round(W_ / 2 - H_ / 2 - ((m['crop'][1] + m['h'] / 2) / bk.B - (H_ + 20) / 2), 1)]   # world offset from the saved png centre
    def nshape(dm, k, P):
        X = lambda v: P + v * k
        dm.polygon([(X(0), X(14)), (X(190), X(4)), (X(200), X(14)), (X(190), X(24))], fill=255)
    def ndraw(img, d, k, P):
        X = lambda v: P + v * k
        d.polygon([(X(0), X(14)), (X(190), X(4)), (X(200), X(14)), (X(190), X(24))], fill=C(RED), outline=C(INK))
    bk.doc('jarum', 200, 28, RED, ndraw, seed=1804, rough=0.05, shape=nshape)


def test_sheet():
    """the Beijing field test as a clipboard sheet: big title + KELOMPOK A / B; the body is plain ruled lines (not meant to be read)"""
    W_, H_ = 500, 600
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rectangle([X(165), X(0), X(335), X(46)], fill=C(INK * 2.2), outline=C(INK))
        fb = font(F_SLAB, 56 * k); f = font(F_CPB, 50 * k)
        d.text((X(34), X(64)), 'LEMBAR UJI', font=fb, fill=C(INK))
        d.text((X(34), X(130)), '2006', font=fb, fill=C(RED))
        d.line([X(30), X(206), X(W_ - 30), X(206)], fill=C(INK), width=max(2, int(3 * k)))
        y = 228
        for head, col in [('KELOMPOK A', RED), ('KELOMPOK B', INK)]:
            d.rectangle([X(34), X(y + 10), X(70), X(y + 46)], outline=C(INK), width=max(2, int(3 * k)))
            d.text((X(86), X(y)), head, font=f, fill=C(col))
            for j in range(2): d.line([X(86), X(y + 86 + j * 34), X(W_ - 40 - j * 60), X(y + 86 + j * 34)], fill=C(INK * 2.6), width=max(2, int(3 * k)))
            y += 168
    bk.doc('lembar_uji', W_, H_, NEWS, draw, seed=1805, rough=0.5)


DISHES = ['Bebek Panggang', 'Ayam Kungpao', 'Tahu Pedas', 'Pangsit Kukus', 'Mi Tarik']


def tent_cards():
    """the two table cards of the study design: 5 dishes ranked 1–5 (by sales) vs 5 sample dishes without ranks (names illustrative)"""
    W_, H_ = 480, 410
    for name, title, ranked, paper in [('plakat_top5', '5 MENU TERLARIS', True, CARD), ('plakat_contoh', '5 MENU CONTOH', False, CARD)]:
        def draw(img, d, k, P, title=title, ranked=ranked):
            X = lambda v: P + v * k
            d.rectangle([X(10), X(10), X(W_ - 10), X(H_ - 10)], outline=C(INK), width=max(2, int(3 * k)))
            d.rectangle([X(10), X(10), X(W_ - 10), X(78)], fill=C(RED if ranked else GREEN))
            fh = font(F_SLAB, 42 * k); d.text((X(W_ / 2) - fh.getlength(title) / 2, X(20)), title, font=fh, fill=C(CARD))
            f = font(F_CPB, 40 * k); fn = font(F_SLAB, 46 * k)
            for i, t in enumerate(DISHES):
                y = 96 + i * 60
                if ranked: d.text((X(26), X(y - 6)), str(i + 1), font=fn, fill=C(RED))
                else: d.ellipse([X(32), X(y + 14), X(48), X(y + 30)], fill=C(INK))
                d.text((X(76), X(y)), t, font=f, fill=C(INK))
        m = bk.doc(name, W_, H_, paper, draw, seed=1806 + int(ranked), rough=0.25)
        m['rank_x'] = 40 - W_ / 2; m['rank_y'] = [round(96 + i * 60 + 22 - H_ / 2, 1) for i in range(5)]


def chart():
    """chart frame: increase in orders (%) for the dishes on each card; bars are drawn live in film.js. Only 0 / 10 / 20 gridlines."""
    W_, H_ = 900, 640
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(3, int(5 * k))
        fh = font(F_SLAB, 40 * k); d.text((X(40), X(26)), 'KENAIKAN PESANAN', font=fh, fill=C(INK))
        d.line([X(130), X(110), X(130), X(500), X(850), X(500)], fill=C(INK), width=w)
        f = font(F_CPB, 30 * k)
        for v in (0, 10, 20):
            y = 500 - v * 18
            if v: d.line([X(130), X(y), X(850), X(y)], fill=C(INK * 3.2), width=max(1, int(1.5 * k)))
            t = '%d%%' % v; d.text((X(118) - f.getlength(t), X(y - 16)), t, font=f, fill=C(INK))
        for t, cx in [('daftar terlaris', 340), ('daftar contoh', 680)]:
            d.text((X(cx) - f.getlength(t) / 2, X(518)), t, font=f, fill=C(INK))
        d.rectangle([X(4), X(4), X(W_ - 4), X(H_ - 4)], outline=C(INK), width=max(2, int(3 * k)))
    m = bk.doc('grafik', W_, H_, CARD, draw, seed=1808, rough=0.4)
    m['base'] = 500 - H_ / 2; m['per'] = 18; m['xA'] = 340 - W_ / 2; m['xB'] = 680 - W_ / 2


def questionnaire():
    """guest questionnaire: satisfaction is what guests SAY (self-reported); the tick lands on 'lebih puas' in film.js"""
    W_, H_ = 540, 600
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        fb = font(F_SLAB, 46 * k); f = font(F_CPB, 46 * k); fi = font(F_FELLI, 38 * k)
        d.text((X(30), X(26)), 'KUESIONER TAMU', font=fb, fill=C(INK))
        d.line([X(28), X(92), X(W_ - 28), X(92)], fill=C(INK), width=max(2, int(3 * k)))
        d.text((X(30), X(112)), 'Seberapa puas makan', font=fi, fill=C(INK)); d.text((X(30), X(156)), 'di sini?', font=fi, fill=C(INK))
        for i, t in enumerate(['kurang puas', 'biasa saja', 'lebih puas']):
            y = 230 + i * 92
            d.rectangle([X(40), X(y), X(92), X(y + 52)], outline=C(INK), width=max(2, int(3 * k)))
            d.text((X(116), X(y)), t, font=f, fill=C(INK))
        d.text((X(30), X(H_ - 76)), 'diisi sendiri oleh tamu', font=font(F_CPB, 34 * k), fill=C(INK * 1.4))
    m = bk.doc('kuesioner', W_, H_, NEWS, draw, seed=1809, rough=0.45)
    m['box'] = [66 - W_ / 2, 230 + 2 * 92 + 26 - H_ / 2]


def score_sheet():
    """taste score sheet with empty 0–10 scales: the judging the brain skips"""
    W_, H_ = 820, 620
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        fb = font(F_SLAB, 48 * k); f = font(F_CPB, 36 * k); fs = font(F_CPB, 28 * k)
        d.text((X(40), X(30)), 'LEMBAR NILAI RASA', font=fb, fill=C(INK))
        d.line([X(36), X(96), X(W_ - 36), X(96)], fill=C(INK), width=max(2, int(3 * k)))
        for i, t in enumerate(['gurih', 'manis', 'asin', 'pedas', 'aroma']):
            y = 136 + i * 92
            d.text((X(40), X(y + 10)), t, font=f, fill=C(INK))
            for j in range(11):
                x = 220 + j * 52
                d.rectangle([X(x), X(y + 6), X(x + 40), X(y + 46)], outline=C(INK), width=max(1, int(2 * k)))
                if i == 0: tt = str(j); d.text((X(x + 20) - fs.getlength(tt) / 2, X(y - 26)), tt, font=fs, fill=C(INK))
    m = bk.doc('nilai_rasa', W_, H_, CARD, draw, seed=1810, rough=0.4)
    m['row0'] = [220 + 20 - W_ / 2, 136 + 26 - H_ / 2]


def tickets():
    """order tickets from a waiter's pad: fine print not meant to be read → plain ruled lines + a red tally mark"""
    for i in range(4):
        def draw(img, d, k, P, i=i):
            X = lambda v: P + v * k
            d.line([X(16), X(40), X(244), X(40)], fill=C(INK), width=max(2, int(2 * k)))
            for j in range(3): d.line([X(18), X(64 + j * 24), X(200 - (j * 37 + i * 23) % 70), X(64 + j * 24)], fill=C(INK * 2.4), width=max(2, int(3 * k)))
            d.line([X(214), X(70), X(240), X(112)], fill=C(RED), width=max(3, int(4 * k))); d.line([X(240), X(70), X(214), X(112)], fill=C(RED), width=max(3, int(4 * k)))
        bk.doc('nota%d' % i, 260, 140, NEWS * 1.03, draw, seed=1820 + i, rough=0.4)


def people():
    """diner silhouettes (black paper, generic): a man and a woman"""
    hd = lambda a0, a1, n=18: [(35 + 17 * math.cos(math.radians(a)), 22 + 17 * math.sin(math.radians(a))) for a in np.linspace(a0, a1, n)]
    man = hd(112, 428) + [(41, 40), (58, 50), (64, 120), (60, 128), (54, 124), (52, 72), (51, 118), (49, 188), (38, 188), (35, 126), (32, 188), (21, 188),
                          (19, 118), (18, 72), (16, 124), (10, 128), (6, 120), (12, 50), (29, 40)]
    woman = hd(150, 390) + [(52, 40), (58, 56), (64, 120), (59, 128), (54, 124), (53, 74), (57, 188), (13, 188), (17, 74), (16, 124), (11, 128), (6, 120),
                            (12, 56), (18, 40)]
    bk.silhouette('sil_a', man, seed=1501)
    bk.silhouette('sil_b', woman, seed=1502)


def stamps():
    for name, text, size, color, seed in [('st_timpang', 'BEDA JAUH', 116, RED, 81), ('st_jaminan', 'PASTI ENAK?', 104, RED, 82),
                                          ('st_dilewati', 'DILEWATI', 104, RED, 83), ('st_best', 'BEST SELLER', 80, RED, 84)]:
        bk.stamp(name, text, size, color, seed=seed, legible=True)
    bk.flat('p_left', MANILA, poly=[(-292, -720), (290, -705), (282, 712), (-288, 700)], seed=961, rough=4, mottle=0.05)
    bk.flat('p_right', GREEN * 0.55 + NEWS * 0.45, poly=[(-288, -712), (292, -700), (286, 706), (-280, 718)], seed=962, rough=4, mottle=0.05)
    bk.flat('hl_amber', AMBER, poly=[(-200, -26), (200, -30), (204, 26), (-198, 30)], seed=951, rough=2, mottle=0.03)


def slips():
    T = [('s_kecil', 'SATU TANDA KECIL', F_SLAB, 54, CARD, INK), ('s_pintas', 'tanpa baca semua', F_FELLI, 50, AMBER, INK),
         ('s_satusatu', 'baca satu-satu', F_CPB, 36, CARD, INK), ('s_beijing', 'EKSPERIMEN BEIJING · 2006', F_CPB, 36, NEWS, INK),
         ('s_jaringan', 'jaringan restoran', F_FELLI, 44, CARD, INK), ('s_kelA', 'KELOMPOK A', F_CPB, 40, AMBER, INK),
         ('s_kelB', 'KELOMPOK B', F_CPB, 40, CARD, INK), ('s_range', '+13–20%', F_SLAB, 70, AMBER, INK),
         ('s_nol', '≈ 0', F_SLAB, 70, CARD, INK), ('s_ngaku', 'menurut pengakuan tamu', F_FELLI, 40, CARD, INK),
         ('s_seleramu', 'pilihan sendiri', F_FELLI, 50, CARD, INK), ('s_oranglain', 'ikut orang banyak', F_FELLI, 48, AMBER, INK),
         ('s_pesanan', 'pesanan masuk', F_CPB, 38, CARD, INK), ('s_paling', 'pasti enak?', F_FELLI, 50, CARD, INK),
         ('s_dari0', 'mulai dari nol', F_FELLI, 48, CARD, INK)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3, pa, ik, 410 + i, mono=f.startswith('Courier'))
    bk.ransom('rq', '?', 190, 4)
    bk.ransom('r15', '1–5', 110, 3)


def torn_copy(src, dst, seed):
    """copy of a baked print with a torn paper edge (fibre fringe) instead of the straight crop edge"""
    import collage_lib as cl
    im = np.asarray(Image.open(os.path.join(bk.out, src + '.png')).convert('RGBA'), float)
    rgb, a = im[..., :3], im[..., 3] / 255
    P = int(30 * bk.B)
    a = np.pad(a, P); inside = ndi.gaussian_filter((a > 0.5).astype(float), 1.0)
    rgb = np.pad(rgb, ((P, P), (P, P), (0, 0)), mode='edge')
    rgb = rgb * inside[..., None] + CARD[None, None, :] * 0.98 * (1 - inside[..., None])   # a cream paper border around the print
    m = ndi.binary_dilation(a > 0.5, iterations=int(9 * bk.B))
    body, fr = cl.torn(m, rough=7 * bk.B, seed=seed, amp=0.9)
    alpha = np.maximum(body, fr * 0.92)
    w_ = np.clip(fr * 0.92 - body, 0, 1) / np.maximum(alpha, 1e-6)
    col = rgb * (1 - w_[..., None]) + CARD * 1.01 * w_[..., None]
    bk.save(dst, col, alpha)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    rows = menu_source(); held_menus()
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('docs', lambda: (badge(), menu_card(), eye(), dial(), test_sheet(), tent_cards(), chart(), questionnaire(),
                                    score_sheet(), tickets(), people())),
                  ('stamps', stamps), ('slips', slips), ('prints', lambda: bake_prints(bk, HERE))]:
        if want(g): fn(); print('baked', g)
    if want('prints'): torn_copy('tangan', 'tangan_sobek', 1901)   # the hands print over the menu (S01 ghost, S17 reveal): torn paper edge
    # registration of the hero menu (badge row, the plate under the hand shadow)
    P = json.load(open(os.path.join(HERE, 'prints.json')))
    hp = P['menu_hero']
    bk.M['_menu'] = reg(hp['file'], hp['width'], {'geprek': (rows['Ayam Geprek'][0], rows['Ayam Geprek'][1])}, hp.get('crop'))
    pt = P['tunjuk']
    bk.M['_tunjuk'] = reg(pt['file'], pt['width'], {'jari': (0.627, 0.728), 'menu': (0.66, 0.75)}, pt.get('crop'))
    pg = P['tangan']; c = pg['crop']
    bk.M['_tangan'] = reg(pg['file'], pg['width'], {'plate': ((0.5 - c[0]) / (c[2] - c[0]), (0.53 - c[1]) / (c[3] - c[1]))}, c)
    pp = P['plakat_meja']
    bk.M['_plakat'] = reg(pp['file'], pp['width'], {'card': (0.37, 0.49)}, pp.get('crop'))
    bk.done()
