"""ARSIP #012 Cara Halus Kartu Member Bikin Kamu Balik Lagi · bake every paper part into parts/ (ARSIP Kolase).
    python3 stories/kartumember/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner in Google Flow
(kolase/ai/, copied into raw/ here). The blank cards in the AI prints are printed here (grid + numbers in ink, the two GRATIS caps as
a red hand-tint map, §L), so the stamp card reads as part of the engraving: kartu_tangan (card B, right hand), its mirror (card A,
left hand), kasir_kartu (card B). stempel_tangan loses its own paper and ink pad (hand + stamp only) so it can press on our cards.
This file also draws: the flat stamp cards (8 empty / 10 empty / 10 with 2 caps, a coffee and a scooter-wash card), the caps,
the amber highlighter over the boxes still to fill, the free-wash voucher, the researchers' visit log, the customer pictograms
(a row of 10 split in two groups; two crowds of 20 with 4 vs 7 who reached the free wash = 19% vs 34%, visual only, 7-selera #80e),
the bar chart 19% vs 34%, the time line, the race track, stamps and slips. No real logos; no source strip (only a tiny corner credit).
Geometry the film needs (box centres, card rectangle inside the AI prints, the stamp's contact point) is written into the manifest."""
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
RAW = os.path.join(HERE, 'raw')

# ---------- the stamp card (one layout for every card: flat docs and the blank cards inside the AI prints) ----------
CW, CH = 620, 420                       # flat card, world units


def card_layout(n, w, h, x0=0.0, x1=1.0):
    """box rectangles of an n-box card (2 rows), in card-local units (0..w, 0..h); x0..x1 = usable width fraction"""
    cols = n // 2
    L, R = w * (x0 + 0.05), w * (x1 - 0.05)
    gap = 0.022 * w
    bw = (R - L - gap * (cols - 1)) / cols
    top, bot = h * 0.30, h * 0.80
    bh = (bot - top - gap) / 2
    return [(L + c * (bw + gap), top + r * (bh + gap), L + c * (bw + gap) + bw, top + r * (bh + gap) + bh) for r in range(2) for c in range(cols)]


def cap_mark(d, box, col, k=1.0, text='GRATIS', seed=0):
    """a round rubber cap inside one box: double ring + word"""
    x0, y0, x1, y1 = box; cx, cy = (x0 + x1) / 2, (y0 + y1) / 2; r = min(x1 - x0, y1 - y0) * 0.43
    rr = np.random.default_rng(seed); jx, jy = rr.normal(0, r * 0.05, 2)
    cx, cy = cx + jx, cy + jy
    lw = max(2, int(r * 0.11))
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=col, width=lw)
    d.ellipse([cx - r * 0.78, cy - r * 0.78, cx + r * 0.78, cy + r * 0.78], outline=col, width=max(1, lw // 2))
    f = font(F_SLAB, r * 0.42); tw = f.getlength(text)
    d.text((cx - tw / 2, cy - r * 0.28), text, font=f, fill=col)


def card_print(d_ink, d_red, ox, oy, w, h, n, caps=0, header='KARTU MEMBER', rule=None, x0=0.0, x1=1.0, ink=(30, 25, 21), soft=(110, 100, 90), red=(179, 38, 30), k=1.0):
    """draws the card's print in a w x h box at (ox, oy): header, n boxes with small numbers, the rule line, `caps` GRATIS caps"""
    boxes = card_layout(n, w, h, x0, x1)
    lw = max(2, int(0.0065 * w))
    fh = font(F_SLAB, h * 0.105); d_ink.text((ox + w * (x0 + 0.05), oy + h * 0.075), header, font=fh, fill=ink)
    d_ink.line([ox + w * (x0 + 0.05), oy + h * 0.235, ox + w * (x1 - 0.05), oy + h * 0.235], fill=ink, width=max(1, lw // 2))
    fn = font(F_CPB, h * 0.062)
    for i, (a, b, c, e) in enumerate(boxes):
        d_ink.rectangle([ox + a, oy + b, ox + c, oy + e], outline=ink, width=lw)
        d_ink.text((ox + a + 0.012 * w, oy + b + 0.008 * h), str(i + 1), font=fn, fill=soft)
    fr = font(F_CPB, h * 0.068)
    d_ink.text((ox + w * (x0 + 0.05), oy + h * 0.845), rule or f'{n} cap = 1x GRATIS', font=fr, fill=ink)
    for i in range(caps):
        a, b, c, e = boxes[i]; cap_mark(d_red, (ox + a, oy + b, ox + c, oy + e), red, text='GRATIS', seed=20 + i)
    return boxes


def flat_card(name, n, caps=0, header='KARTU MEMBER', rule=None, seed=0, stamps=0, stamp_col=None):
    """a loose stamp card on the table (torn card paper); manifest gets its box centres (world, relative to the card centre)"""
    def draw(img, d, k, P):
        boxes = card_print(d, d, P, P, CW * k, CH * k, n, caps, header, rule, ink=C(INK), soft=C(INK * 3.2), red=C(RED))
        for i in range(caps, caps + stamps):
            cap_mark(d, tuple(P + v for v in boxes[i]), C(stamp_col if stamp_col is not None else GREEN), text='CAP', seed=40 + i)
    bk.doc(name, CW, CH, CARD, draw, seed=seed, rough=0.35)
    bk.M[name]['boxes'] = [[round((a + c) / 2 - CW / 2, 1), round((b + e) / 2 - CH / 2, 1)] for a, b, c, e in card_layout(n, CW, CH)]
    bk.M[name]['box'] = round(card_layout(n, CW, CH)[0][2] - card_layout(n, CW, CH)[0][0], 1)


def ink_part(name, w, h, paint, color, alpha=1.0, frame=True):
    """an ink-only overlay (multiply) of exactly w x h world units: a near-invisible frame keeps the crop = the card, so the part
    sits on the card's centre. paint(d, k) draws white (=ink) on an 'L' mask in card-local pixels."""
    B = bk.B; P = int(4 * B)
    im = Image.new('L', (int(w * B) + 2 * P, int(h * B) + 2 * P), 0); d = ImageDraw.Draw(im)
    paint(d, B, P)
    a = np.asarray(im, float) / 255 * alpha
    if frame:
        a[P, P:-P] = np.maximum(a[P, P:-P], 0.006); a[-P - 1, P:-P] = np.maximum(a[-P - 1, P:-P], 0.006)
        a[P:-P, P] = np.maximum(a[P:-P, P], 0.006); a[P:-P, -P - 1] = np.maximum(a[P:-P, -P - 1], 0.006)
    return bk.save(name, color[None, None, :], a, ink=1)


def caps_and_highlights():
    """single caps (pressed live in film.js) and the amber highlighter over the boxes still to fill"""
    for name, col, txt, sd in [('cap_gratis', RED, 'GRATIS', 501), ('cap_cuci', GREEN, 'CAP', 502)]:
        B = bk.B; S = 110
        im = Image.new('L', (int(S * B) + 20, int(S * B) + 20), 0); d = ImageDraw.Draw(im)
        cap_mark(d, (10, 10, 10 + S * B, 10 + S * B), 255, text=txt, seed=sd)
        a = np.asarray(im, float) / 255
        n = np.random.default_rng(sd).random(a.shape)
        a = ndi.gaussian_filter(a * (0.75 + 0.25 * (n > 0.15)), 0.6)
        bk.save(name, col[None, None, :], a, ink=1)
    for name, n, first in [('hl_a', 8, 0), ('hl_b', 10, 2)]:
        boxes = card_layout(n, CW, CH)
        def paint(d, k, P, boxes=boxes, first=first):
            for a, b, c, e in boxes[first:]:
                d.rectangle([P + (a - 4) * k, P + (b - 4) * k, P + (c + 4) * k, P + (e + 4) * k], fill=255)
        ink_part(name, CW, CH, paint, AMBER * 1.08, alpha=0.62)


# ---------- the blank cards inside the AI prints ----------
def ink_bbox(g):
    """bbox of the drawing (as Baker.cut finds it, roughly): dark pixels, small specks dropped"""
    m = ndi.binary_closing(g < 205, iterations=3)
    lab, n = ndi.label(m)
    if n > 1:
        sz = np.bincount(lab.ravel()); sz[0] = 0
        m = np.isin(lab, np.nonzero(sz >= 0.04 * sz.max())[0])
    ys, xs = np.nonzero(m)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def printed_card(src, dst, rect, n, caps, x0=0.0, x1=1.0, flip=False, erase=None):
    """copy an AI print to raw/<dst>.jpg with the card printed into its blank card (rect = fractions of the image), the caps
    in raw/<dst>.tint.png. Returns geometry relative to the drawing's bbox centre, in source pixels (scaled to world later)."""
    im = Image.open(os.path.join(HERE, 'ai', src)).convert('L')
    if flip: im = im.transpose(Image.FLIP_LEFT_RIGHT)
    W0, H0 = im.size
    if erase:
        de = ImageDraw.Draw(im)
        for poly in erase: de.polygon([(x * W0, y * H0) for x, y in poly], fill=255)
    tint = Image.new('RGBA', im.size, (0, 0, 0, 0))
    out = {}
    if rect:
        x_0, y_0, x_1, y_1 = rect[0] * W0, rect[1] * H0, rect[2] * W0, rect[3] * H0
        w, h = x_1 - x_0, y_1 - y_0
        boxes = card_print(ImageDraw.Draw(im), ImageDraw.Draw(tint), x_0, y_0, w, h, n, caps, x0=x0, x1=x1,
                           ink=0, soft=95, red=(179, 38, 30, 255))
        out = dict(card=[x_0 + w / 2, y_0 + h / 2, w, h], boxes=[[x_0 + (a + c) / 2, y_0 + (b + e) / 2] for a, b, c, e in boxes],
                   box=boxes[0][2] - boxes[0][0])
    im.convert('RGB').save(os.path.join(RAW, dst + '.jpg'), quality=95)
    if caps: tint.save(os.path.join(RAW, dst + '.tint.png'))
    g = np.asarray(im, float)
    bx = ink_bbox(g)
    out['_bbox'] = bx
    return out


def to_world(geo, width):
    """source-pixel geometry → world units relative to the cut's centre (cut width = world width of the drawing's bbox)"""
    x0, y0, x1, y1 = geo.pop('_bbox'); s = width / (x1 - x0); cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    W = lambda p: [round((p[0] - cx) * s, 1), round((p[1] - cy) * s, 1)]
    o = {}
    if 'card' in geo:
        c = geo['card']; o['card'] = W(c[:2]) + [round(c[2] * s, 1), round(c[3] * s, 1)]
        o['boxes'] = [W(b) for b in geo['boxes']]; o['box'] = round(geo['box'] * s, 1)
    for k_, v in geo.items():
        if k_ not in ('card', 'boxes', 'box'): o[k_] = W(v)
    return o


PR = json.load(open(os.path.join(HERE, 'prints.json')))
GEO = {}


def ai_to_raw():
    """AI prints → raw/ai_<name>.jpg (always refreshed), then the printed / cleaned variants used by prints.json"""
    os.makedirs(RAW, exist_ok=True)
    for f in glob.glob(os.path.join(HERE, 'ai', '*.jpg')) + glob.glob(os.path.join(HERE, 'ai', '*.tint.png')):
        shutil.copy(f, os.path.join(RAW, 'ai_' + os.path.basename(f)))
    KT = (0.068, 0.205, 0.633, 0.755)                                      # the blank card in kartu_tangan.jpg
    KTm = (1 - KT[2], KT[1], 1 - KT[0], KT[3])                             # … in its mirror
    GEO['tangan_b'] = printed_card('kartu_tangan.jpg', 'ai_tangan_b', KT, 10, 2, x1=0.84)
    GEO['tangan_b0'] = printed_card('kartu_tangan.jpg', 'ai_tangan_b0', KT, 10, 0, x1=0.84)
    GEO['tangan_a'] = printed_card('kartu_tangan.jpg', 'ai_tangan_a', KTm, 8, 0, x0=0.16, flip=True)
    GEO['kasir_b'] = printed_card('kasir_kartu.jpg', 'ai_kasir_b', (0.372, 0.248, 0.835, 0.655), 10, 2, x0=0.02, x1=0.98)
    # stamp hand: its own paper card and the ink pad are painted out (the stamp then presses on our cards)
    g = printed_card('stempel_tangan.jpg', 'ai_stempel_hand', None, 0, 0,
                     erase=[[(0, 0.6), (0.33, 0.6), (0.33, 0.735), (0.55, 0.735), (0.55, 0.58), (1, 0.58), (1, 1), (0, 1)],
                            [(0, 0.54), (0.292, 0.54), (0.292, 0.61), (0, 0.61)]])
    g['tip'] = [0.428 * 1024, 0.712 * 1024]                                # bottom centre of the rubber stamp (source px)
    GEO['stempel_hand'] = g


def geometry():
    for name, g in GEO.items():
        if name in bk.M: bk.M[name].update(to_world(dict(g), PR[name]['width']))


# ---------- documents ----------
def voucher():
    def shape(dm, k, P):
        X = lambda v: P + v * k; r = 22
        dm.rectangle([X(0), X(0), X(330), X(170)], fill=255)
        for y in (0, 170): dm.ellipse([X(230 - r), X(y - r), X(230 + r), X(y + r)], fill=0)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        for y in range(18, 160, 18): d.line([X(230), X(y), X(230), X(y + 9)], fill=C(INK), width=max(2, int(3 * k)))
        d.text((X(22), X(16)), 'VOUCHER', font=font(F_CPB, 30 * k), fill=C(INK))
        d.text((X(22), X(54)), '1x CUCI', font=font(F_SLAB, 44 * k), fill=C(INK))
        d.text((X(22), X(108)), 'GRATIS', font=font(F_SLAB, 44 * k), fill=C(RED))
        f = font(F_SLAB, 70 * k); d.text((X(252), X(42)), '1x', font=f, fill=C(INK))
    bk.doc('tiket', 330, 170, CARD, draw, seed=601, rough=0.3, shape=shape)


def visit_log():
    """the researchers' visit log: plate, card type, caps (illustration: no study numbers)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(2, int(3 * k))
        d.text((X(30), X(24)), 'CATATAN KUNJUNGAN', font=font(F_SLAB, 40 * k), fill=C(INK))
        d.line([X(24), X(86), X(556), X(86)], fill=C(INK), width=w)
        fh = font(F_CPB, 30 * k)
        for x, t in [(30, 'pelanggan'), (250, 'kartu'), (400, 'cap')]: d.text((X(x), X(100)), t, font=fh, fill=C(INK))
        d.line([X(24), X(142), X(556), X(142)], fill=C(INK), width=max(1, int(2 * k)))
        fr = font(F_CPB, 32 * k)
        rows = [('B 1427', '8', 2), ('B 3390', '10', 4), ('D 5512', '8', 1), ('B 8021', '10', 5), ('F 2264', '8', 3), ('B 6610', '10', 3)]
        for i, (pl, kt, c) in enumerate(rows):
            y = 160 + i * 62
            d.text((X(30), X(y)), pl, font=fr, fill=C(INK * 1.6)); d.text((X(260), X(y)), kt, font=fr, fill=C(INK * 1.6))
            for j in range(c):
                xx = 400 + j * 18; d.line([X(xx), X(y + 4), X(xx + 4), X(y + 36)], fill=C(INK), width=max(2, int(3 * k)))
            d.line([X(24), X(y + 52), X(556), X(y + 52)], fill=C(INK * 3.4), width=max(1, int(1.5 * k)))
    bk.doc('catatan', 580, 560, NEWS, draw, seed=611, rough=0.5)


def person(d, cx, cy, s, k, mode):
    """customer pictogram drawn like an engraved token: head + shoulders. mode 'ink' = hatched, 'amber' = reached the free wash"""
    X = lambda v: v * k
    hr = 15 * s
    head = [cx - X(hr), cy - X(62 * s), cx + X(hr), cy - X(62 * s) + X(2 * hr)]
    body = [(cx - X(30 * s), cy + X(30 * s)), (cx - X(27 * s), cy - X(14 * s)), (cx - X(14 * s), cy - X(26 * s)),
            (cx + X(14 * s), cy - X(26 * s)), (cx + X(27 * s), cy - X(14 * s)), (cx + X(30 * s), cy + X(30 * s))]
    fill = C(AMBER) if mode == 'amber' else C(CARD * 0.93)
    d.ellipse(head, fill=fill, outline=C(INK), width=max(2, int(3 * k)))
    d.polygon(body, fill=fill, outline=C(INK))
    d.line(body + [body[0]], fill=C(INK), width=max(2, int(3 * k)))
    if mode != 'amber':     # hatching
        for t in range(-40, 40, 7):
            x = cx + X(t * s); d.line([x - X(8 * s), cy + X(28 * s), x + X(6 * s), cy - X(10 * s)], fill=C(INK * 2.4), width=max(1, int(1.4 * k)))


def crowds():
    def row(img, d, k, P, n, amber, per_row, gap, s, y0=110):
        X = lambda v: P + v * k
        for i in range(n):
            r, c = divmod(i, per_row)
            person(d, X(50 + c * gap + (r % 2) * gap * 0.5), X(y0 + r * 120), s, k, 'amber' if i in amber else 'ink')
    bk.doc('barisan', 880, 160, CARD, lambda img, d, k, P: row(img, d, k, P, 10, (), 10, 86, 1.0, 92), seed=621, rough=0.4)
    AM_A = {2, 9, 13, 17}                  # 4 of 20 ≈ 19 %
    AM_B = {1, 4, 7, 9, 12, 15, 18}        # 7 of 20 ≈ 34 %
    bk.doc('kerumunan_a', 900, 260, CARD, lambda img, d, k, P: row(img, d, k, P, 20, AM_A, 10, 82, 0.95, 92), seed=622, rough=0.4)
    bk.doc('kerumunan_b', 900, 260, CARD, lambda img, d, k, P: row(img, d, k, P, 20, AM_B, 10, 82, 0.95, 92), seed=623, rough=0.4)
    bk.doc('kerumunan_a0', 900, 260, CARD, lambda img, d, k, P: row(img, d, k, P, 20, (), 10, 82, 0.95, 92), seed=622, rough=0.4)
    bk.doc('kerumunan_b0', 900, 260, CARD, lambda img, d, k, P: row(img, d, k, P, 20, (), 10, 82, 0.95, 92), seed=623, rough=0.4)
    # the amber tokens alone (lit live in film.js over the grey crowd); positions in manifest
    for nm, am in [('kerumunan_a', AM_A), ('kerumunan_b', AM_B)]:
        pts = []
        for i in sorted(am):
            r, c = divmod(i, 10); pts.append([round(50 + c * 82 + (r % 2) * 41 - 450, 1), round(92 + r * 120 - 130 - 18, 1)])
        bk.M[nm]['lit'] = pts


def chart():
    """bar chart frame: share of customers who reached the free wash (visual only: 19 % vs 34 %, secondary sources)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(3, int(4 * k))
        d.text((X(34), X(20)), 'DAPAT CUCI GRATIS', font=font(F_SLAB, 46 * k), fill=C(INK))
        d.line([X(60), X(100), X(60), X(470), X(860), X(470)], fill=C(INK), width=w)
        fx = font(F_CPB, 30 * k)
        for i, v in enumerate((0, 10, 20, 30, 40)):
            x = 60 + v / 40 * 760
            d.line([X(x), X(470), X(x), X(486)], fill=C(INK), width=w)
            if v: d.line([X(x), X(110), X(x), X(466)], fill=C(INK * 3.6), width=max(1, int(1.5 * k)))
            t = f'{v}%'; d.text((X(x) - fx.getlength(t) / 2, X(492)), t, font=fx, fill=C(INK))
        fl = font(F_CPB, 34 * k)
        d.text((X(76), X(126)), 'kartu kosong (8 kotak)', font=fl, fill=C(INK))
        d.text((X(76), X(306)), 'kartu bercap (10 kotak, 2 cap)', font=fl, fill=C(INK))
        d.text((X(34), X(540)), 'pelanggan cuci mobil · ± 9 bulan', font=font(F_CP, 28 * k), fill=C(INK * 1.8))
    bk.doc('grafik', 900, 590, CARD, draw, seed=631, rough=0.4)
    bk.bar('bar_19', 19 / 40 * 760, 70, seed=632, wash=INK * 2.2 + 40)
    bk.bar('bar_34', 34 / 40 * 760, 70, seed=633, wash=AMBER)


def timeline():
    """time line: both cards start together; the stamped card is full first (no day counts: unknown)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(3, int(4 * k))
        d.text((X(30), X(18)), 'SAMPAI KARTU PENUH', font=font(F_SLAB, 42 * k), fill=C(INK))
        d.line([X(150), X(90), X(150), X(390)], fill=C(INK), width=w)
        d.text((X(100), X(392)), 'MULAI', font=font(F_CPB, 30 * k), fill=C(INK))
        for y in (175, 315):
            for x in range(160, 860, 26): d.line([X(x), X(y), X(x + 13), X(y)], fill=C(INK * 3), width=max(2, int(3 * k)))
        for x in range(220, 860, 90): d.line([X(x), X(380), X(x), X(396)], fill=C(INK), width=max(2, int(3 * k)))
        d.line([X(150), X(388), X(860), X(388)], fill=C(INK), width=w)
        fw = font(F_CPB, 30 * k); d.text((X(650), X(398)), 'waktu', font=fw, fill=C(INK))
        d.polygon([(X(858), X(380)), (X(878), X(388)), (X(858), X(396))], fill=C(INK))
    bk.doc('garis_waktu', 900, 440, CARD, draw, seed=641, rough=0.4)


def track(name, n, seed):
    """running track for an n-box card: START line, one mark per box (numbered), the finish (= the free wash) after the last box.
    Marks are 90 world units apart on every track, so 8 boxes to go look the same length on both cards."""
    Wd = 150 + n * 90 + 120
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(3, int(5 * k))
        for y in (40, 150): d.line([X(0), X(y), X(Wd), X(y)], fill=C(INK), width=w)
        for x in range(0, Wd, 30): d.line([X(x), X(95), X(x + 15), X(95)], fill=C(INK * 3), width=max(2, int(3 * k)))
        d.rectangle([X(52), X(36), X(66), X(154)], fill=C(INK))
        d.text((X(14), X(160)), 'START', font=font(F_CPB, 28 * k), fill=C(INK))
        for i in range(n):
            x = 150 + i * 90; d.line([X(x), X(128), X(x), X(172)], fill=C(INK), width=w)
            d.text((X(x + 6), X(158)), str(i + 1), font=font(F_CPB, 28 * k), fill=C(INK * 2))
        fx = 150 + n * 90
        for dx in (0, 12): d.line([X(fx + dx), X(30), X(fx + dx), X(160)], fill=C(RED), width=w)
        d.text((X(fx - 40), X(0)), 'GRATIS', font=font(F_SLAB, 28 * k), fill=C(RED))
    bk.doc(name, Wd, 200, CARD, draw, seed=seed, rough=0.3)
    bk.M[name]['marks'] = [round(150 + i * 90 - Wd / 2, 1) for i in range(n)]
    bk.M[name]['finish'] = round(150 + n * 90 - Wd / 2 + 6, 1)
    bk.M[name]['lane'] = -5


def stamps():
    for name, text, size, color, seed in [('st_8cap', '8 CAP', 104, RED, 81), ('st_beda', 'BEDA JAUH', 110, RED, 82),
                                           ('st_kosong', '0 CAP', 96, GREEN * 0.85, 83), ('st_sama', 'SAMA PERSIS', 92, GREEN * 0.85, 84),
                                           ('st_nanggung', 'NANGGUNG', 110, RED, 85), ('st_terasa', 'CUMA TERASA', 104, RED, 86),
                                           ('st_cepat', 'LEBIH CEPAT', 92, GREEN * 0.85, 87)]:
        bk.stamp(name, text, size, color, seed=seed, legible=True)
    bk.mirror('sil_man')


def slips():
    T = [('s_8kotak', '8 KOTAK', F_SLAB, 50, AMBER, INK), ('s_10kotak', '10 KOTAK', F_SLAB, 50, AMBER, INK),
         ('s_08', '0 / 8', F_CPB, 56, CARD, INK), ('s_210', '2 / 10', F_CPB, 56, CARD, RED),
         ('s_sisa8', 'SISA 8', F_SLAB, 52, AMBER, INK),
         ('s_kopi', 'kedai kopi', F_FELLI, 54, CARD, INK), ('s_motor', 'cuci motor', F_FELLI, 54, CARD, INK),
         ('s_mobil', 'cuci mobil', F_FELLI, 54, CARD, INK), ('s_peneliti', '2 peneliti', F_CPB, 46, CARD, INK),
         ('s_pelanggan', 'pelanggan', F_CPB, 44, CARD, INK), ('s_sebagian', 'sebagian', F_FELLI, 48, AMBER, INK),
         ('s_sebagian2', 'sebagian lagi', F_FELLI, 48, AMBER, INK),
         ('s_kosong', 'kartu kosong', F_CPB, 44, CARD, INK), ('s_bercap', 'kartu bercap', F_CPB, 44, CARD, INK),
         ('s_19', '19%', F_SLAB, 64, CARD, INK), ('s_34', '34%', F_SLAB, 64, AMBER, INK), ('s_2x', 'HAMPIR 2×', F_SLAB, 56, AMBER, INK),
         ('s_4dari20', '4 dari 20', F_CPB, 46, CARD, INK), ('s_7dari20', '7 dari 20', F_CPB, 46, AMBER, INK),
         ('s_penuh', 'PENUH', F_SLAB, 46, CARD, INK), ('s_penuh_b', 'PENUH', F_SLAB, 46, AMBER, INK),
         ('s_hadiah', 'HADIAH LEBIH BESAR', F_SLAB, 38, CARD, INK),
         ('s_belum', 'BELUM MULAI', F_SLAB, 42, CARD, INK), ('s_jalan', 'SUDAH JALAN', F_SLAB, 42, AMBER, INK),
         ('s_berhenti', 'BERHENTI', F_SLAB, 44, CARD, INK), ('s_kasir', 'kasir', F_CPB, 44, CARD, INK),
         ('s_src', 'studi: Nunes & Drèze, 2006', F_CP, 26, NEWS, INK)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3, pa, ik, 410 + i, mono=f.startswith('Courier'))
    for n, tx, f, s, pa, ik, sd in [('n8', '8', F_SLAB, 300, AMBER, INK, 471), ('n8b', '8', F_SLAB, 300, AMBER, INK, 472),
                                    ('n_eq', '=', F_SLAB, 200, CARD, INK, 473), ('n_sama', 'SAMA', F_SLAB, 70, CARD, INK, 474)]:
        bk.strip(n, tx, f, s, pa, ik, sd, padx=26, pady=4)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('cards', lambda: (flat_card('kartu_a', 8, seed=701), flat_card('kartu_b0', 10, seed=702), flat_card('kartu_b', 10, 2, seed=703),
                                     flat_card('kartu_kopi', 10, header='KARTU KOPI', rule='10 cap = 1 kopi GRATIS', seed=704, stamps=6, stamp_col=INK * 1.4),
                                     flat_card('kartu_motor', 8, header='CUCI MOTOR', rule='8 cap = 1x cuci GRATIS', seed=705, stamps=5),
                                     caps_and_highlights())),
                  ('docs', lambda: (voucher(), visit_log(), crowds(), chart(), timeline(), track('lintasan_a', 8, 651), track('lintasan_b', 10, 652))),
                  ('stamps', stamps), ('slips', slips), ('prints', lambda: (bake_prints(bk, HERE), geometry()))]:
        if want(g): fn(); print('baked', g)
    bk.done()
