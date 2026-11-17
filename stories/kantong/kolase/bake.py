"""ARSIP #010 Kantong Plastik Rp200 · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/kantong/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner in Google Flow
(kolase/ai/, copied into raw/ here, with the hand-tint map koin_permen.tint.png, §L). This file draws what is special to the episode:
the Rp200 price tag and coin, the 5-cent coin and the BAYAR / BONUS tags, the minimarket receipt, the trial map with pins, the
calendar pages, the usage chart (end point = KLHK's "up to 30%", no invented steps), the journal page, the shopper silhouettes and
the bag icon, stamps and slips. The AI balance (ai/timbangan.jpg) is split into post, beam and two pans on one registered grid so
film.js can tip the beam while the pans keep hanging straight. No real logos; brand-free generic receipt."""
import os, sys, json, shutil, glob, math
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', '..', 'kit', 'collage'))
from parts import *
from parts import font
import collage_lib as cl
from signature import bake_signature, bake_prints
HERE = os.path.dirname(os.path.abspath(__file__))
EP = json.load(open(os.path.join(HERE, 'episode.json')))
bk = Baker(os.path.join(HERE, 'parts'), os.path.join(HERE, 'raw'))
C = lambda a: tuple(int(v) for v in a)
ONLY = set(sys.argv[1:]); want = lambda g: not ONLY or g in ONLY
SILVER = NEWS * 0.93
TAGP = AMBER * 0.55 + CARD * 0.45


def ai_to_raw():
    """AI prints + their hand-tint maps → raw/ai_<name>.(jpg|tint.png); always refreshed (redone images keep the same name)"""
    os.makedirs(bk.raw, exist_ok=True)
    for f in glob.glob(os.path.join(HERE, 'ai', '*.jpg')) + glob.glob(os.path.join(HERE, 'ai', '*.tint.png')):
        shutil.copy(f, os.path.join(bk.raw, 'ai_' + os.path.basename(f)))


# ---------------- tags and coins ----------------
def tag(name, lines, paper, inks, seed, w=300, h=180, sizes=(64, 40)):
    """shop price tag on a string (hole + string), cut along its own outline"""
    def shape(dm, k, P):
        X = lambda v: P + v * k
        dm.polygon([(X(0), X(h * 0.32)), (X(54), X(0)), (X(w), X(0)), (X(w), X(h)), (X(54), X(h)), (X(0), X(h * 0.68))], fill=255)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.ellipse([X(22), X(h / 2 - 14), X(50), X(h / 2 + 14)], fill=C(INK * 1.2))
        d.line([X(36), X(h / 2), X(-10), X(h / 2 - 50)], fill=C(INK), width=max(2, int(3 * k)))
        y = (h - sizes[0] * 1.25 - sizes[1] * 1.15) / 2 if len(lines) > 1 else h / 2 - sizes[0] * 0.62
        for i, (t, ik) in enumerate(zip(lines, inks)):
            f = font(F_SLAB if i == 0 else F_CPB, sizes[min(i, 1)] * k)
            tw = f.getlength(t); d.text((X(60 + (w - 60) / 2) - tw / 2, X(y)), t, font=f, fill=C(ik))
            y += sizes[min(i, 1)] * 1.25
    bk.doc(name, w, h, paper, draw, seed=seed, rough=0.3, shape=shape)


def coin(name, big, small, D, seed):
    """engraved coin cut to its circle: rim, inner ring, value, hatched shadow crescent (generic: no state emblem)"""
    def shape(dm, k, P):
        X = lambda v: P + v * k
        dm.ellipse([X(0), X(0), X(D), X(D)], fill=255)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(2, int(3 * k))
        d.ellipse([X(0), X(0), X(D), X(D)], fill=C(SILVER), outline=C(INK), width=max(3, int(5 * k)))
        d.ellipse([X(D * 0.09), X(D * 0.09), X(D * 0.91), X(D * 0.91)], outline=C(INK), width=w)
        for i in range(0, 60):            # milled rim
            a = i / 60 * 2 * math.pi
            d.line([X(D / 2 + math.cos(a) * D * 0.455), X(D / 2 + math.sin(a) * D * 0.455), X(D / 2 + math.cos(a) * D * 0.49), X(D / 2 + math.sin(a) * D * 0.49)],
                   fill=C(INK * 1.6), width=max(1, int(1.5 * k)))
        cx = cy = D / 2
        for j in range(14):
            yy = D * 0.55 + j * D * 0.025
            half = math.sqrt(max(0, (D * 0.41) ** 2 - (yy - cy) ** 2))
            d.line([X(cx + half * 0.25), X(yy), X(cx + half), X(yy)], fill=C(INK * 2.2), width=max(1, int(1.3 * k)))
        f = font(F_SLAB, D * 0.36 * k); tw = f.getlength(big); d.text((X(cx) - tw / 2, X(D * 0.22)), big, font=f, fill=C(INK))
        fs = font(F_CPB, D * 0.13 * k); sw = fs.getlength(small); d.text((X(cx) - sw / 2, X(D * 0.66)), small, font=fs, fill=C(INK))
    bk.doc(name, D, D, SILVER, draw, seed=seed, rough=0.15, shape=shape)


def receipt(name='struk', hl=None):
    """a generic minimarket receipt (illustrative prices, 2016): the KANTONG PLASTIK 200 line is the evidence.
    hl = 'kantong' | 'total': an amber highlighter band baked UNDER that row's type (a band drawn on top would hide the text)"""
    W_, H_ = 380, 700
    rows = [('ROTI TAWAR', '12.000'), ('SUSU UHT', '5.500'), ('MI INSTAN', '2.500'), ('SABUN MANDI', '4.000'), ('KANTONG PLASTIK', '200')]
    def shape(dm, k, P):
        X = lambda v: P + v * k
        pts = [(X(x), X(10 if (x // 19) % 2 else 0)) for x in range(0, W_ + 1, 19)]
        pts += [(X(x), X(H_ - (10 if (x // 19) % 2 else 0))) for x in range(W_, -1, -19)]
        dm.polygon(pts, fill=255)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        fh = font(F_SLAB, 36 * k); t = 'MINIMARKET'; d.text((X(W_ / 2) - fh.getlength(t) / 2, X(30)), t, font=fh, fill=C(INK))
        f = font(F_CPB, 26 * k); fr = font(F_CP, 22 * k)
        t = '21-02-2016   10:12'; d.text((X(W_ / 2) - fr.getlength(t) / 2, X(84)), t, font=fr, fill=C(INK))
        dash = lambda y: [d.line([X(x), X(y), X(x + 9), X(y)], fill=C(INK), width=max(1, int(2 * k))) for x in range(24, W_ - 24, 16)]
        dash(124)
        y = 146
        if hl == 'kantong': d.polygon([(X(14), X(y + 4 * 46 - 6)), (X(W_ - 12), X(y + 4 * 46 - 9)), (X(W_ - 14), X(y + 4 * 46 + 34)), (X(16), X(y + 4 * 46 + 36))], fill=C(AMBER * 0.9 + CARD * 0.1))
        if hl == 'total': d.polygon([(X(14), X(y + 5 * 46 + 18)), (X(W_ - 12), X(y + 5 * 46 + 15)), (X(W_ - 14), X(y + 5 * 46 + 60)), (X(16), X(y + 5 * 46 + 62))], fill=C(AMBER * 0.9 + CARD * 0.1))
        for a, b in rows:
            d.text((X(26), X(y)), a, font=f, fill=C(INK)); d.text((X(W_ - 26) - f.getlength(b), X(y)), b, font=f, fill=C(INK)); y += 46
        dash(y + 6); y += 26
        for a, b in [('TOTAL', '24.200'), ('TUNAI', '25.000'), ('KEMBALI', '800')]:
            ff = font(F_SLAB, 30 * k) if a == 'TOTAL' else f
            d.text((X(26), X(y)), a, font=ff, fill=C(INK)); d.text((X(W_ - 26) - ff.getlength(b), X(y)), b, font=ff, fill=C(INK)); y += 48
        dash(y + 10)
        t = 'TERIMA KASIH'; d.text((X(W_ / 2) - fr.getlength(t) / 2, X(y + 30)), t, font=fr, fill=C(INK))
    m = bk.doc(name, W_, H_, NEWS * 1.02, draw, seed=1001, rough=0.25, shape=shape)
    # world offsets (from the receipt centre) of the rows film.js highlights
    m['row_kantong'] = 146 + 4 * 46 + 15 - H_ / 2
    m['row_total'] = 146 + 5 * 46 + 26 + 18 - H_ / 2


# ---------------- map of the 2016 trial (pins are separate pieces, dropped in film.js) ----------------
ISL = {
    'sumatra': [(95.3, 5.6), (97.5, 5.2), (98.8, 3.7), (100.4, 2.2), (101.6, 1.6), (103.6, 0.4), (104.5, -1.0), (106.0, -3.2), (105.8, -5.8),
                (104.5, -5.9), (102.3, -4.0), (100.3, -1.0), (98.6, 1.7), (97.0, 3.0), (95.2, 4.8)],
    'jawa': [(105.2, -6.8), (106.1, -5.9), (108.3, -6.3), (110.4, -6.9), (111.2, -6.6), (112.6, -6.9), (114.4, -7.7), (114.6, -8.7), (112.0, -8.3),
             (110.0, -8.1), (108.0, -7.8), (106.4, -7.4)],
    'kalimantan': [(109.0, 1.5), (109.6, 2.0), (111.0, 1.6), (113.0, 3.0), (115.5, 4.9), (117.0, 7.0), (119.2, 5.2), (118.0, 4.3), (117.7, 1.0),
                   (116.6, -1.5), (116.0, -3.9), (114.5, -3.5), (111.8, -3.4), (110.2, -2.9), (109.0, -0.5)],
    'sulawesi': [(119.5, -5.5), (120.4, -5.6), (120.5, -3.0), (121.2, -2.8), (122.0, -4.6), (122.8, -4.5), (122.0, -3.0), (121.3, -1.9), (123.2, -1.0),
                 (122.5, -0.6), (121.0, -0.8), (120.6, 0.5), (122.0, 0.9), (124.5, 0.4), (125.0, 1.6), (124.2, 1.0), (120.9, 1.3), (120.0, 0.7),
                 (119.8, -0.5), (119.4, -3.4)],
    'papua': [(131.0, -1.3), (132.5, -0.4), (134.0, -0.9), (135.5, -3.3), (137.5, -1.6), (141.0, -2.6), (141.0, -9.1), (139.0, -8.1), (137.8, -8.4),
              (138.5, -6.5), (136.0, -4.6), (134.3, -3.9), (133.0, -4.0), (132.0, -2.9), (133.5, -2.2), (132.0, -1.9)],
    'bali': [(114.5, -8.2), (115.7, -8.3), (115.5, -8.8), (114.6, -8.5)], 'lombok': [(116.0, -8.3), (116.7, -8.3), (116.6, -8.9), (116.0, -8.8)],
    'sumbawa': [(116.9, -8.4), (119.0, -8.1), (119.1, -8.7), (117.0, -9.0)], 'flores': [(119.8, -8.4), (123.0, -8.2), (122.9, -8.7), (119.9, -8.8)],
    'timor': [(123.5, -10.2), (125.2, -9.2), (127.2, -8.4), (125.0, -9.6), (124.0, -10.4)], 'halmahera': [(127.6, 1.8), (128.2, 1.2), (128.6, 0.4), (127.9, -0.6), (127.5, 0.6)],
    'seram': [(128.0, -2.9), (130.8, -3.0), (130.6, -3.6), (128.2, -3.5)], 'bangka': [(105.2, -1.6), (106.4, -2.1), (106.7, -3.0), (105.8, -2.6)],
}
# a pin per trial area shown (unnamed: the screen says "puluhan kota", the exact list is not on screen)
PINS = [(98.7, 3.6), (101.4, 0.5), (104.7, -3.0), (106.8, -6.2), (107.6, -6.9), (110.4, -7.0), (112.7, -7.3), (115.2, -8.6), (116.8, -1.3),
        (114.6, -3.3), (119.4, -5.1), (122.5, -4.0), (128.2, -3.7), (140.7, -2.5), (95.3, 5.5), (106.6, -6.6), (110.4, -7.8)]


def peta():
    W_, H_ = 820, 360
    LON0, LON1, LAT0, LAT1 = 93.5, 142.0, 7.5, -11.0
    px = lambda lon, lat: (30 + (lon - LON0) / (LON1 - LON0) * (W_ - 60), 50 + (LAT0 - lat) / (LAT0 - LAT1) * (H_ - 70))
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        Wp, Hp = img.size
        land = Image.new('L', (Wp, Hp), 0); dl = ImageDraw.Draw(land)
        for pts in ISL.values():
            dl.polygon([(X(px(*p)[0]), X(px(*p)[1])) for p in pts], fill=255)
        lm = np.asarray(land, float) / 255
        yy, xx = np.mgrid[:Hp, :Wp]
        hatch = ((xx + yy) % int(7 * k) < max(1, int(1.4 * k))).astype(float)
        base = np.asarray(img, float)
        landcol = MANILA * 0.92
        base = base * (1 - lm[..., None]) + landcol * lm[..., None]
        base = base * (1 - 0.55 * (lm * hatch)[..., None]) + INK * 0.55 * (lm * hatch)[..., None]
        img.paste(Image.fromarray(np.clip(base, 0, 255).astype(np.uint8)))
        d2 = ImageDraw.Draw(img)
        for pts in ISL.values():
            q = [(X(px(*p)[0]), X(px(*p)[1])) for p in pts]; d2.line(q + [q[0]], fill=C(INK), width=max(2, int(2.5 * k)), joint='curve')
        for x in range(30, W_ - 20, 60): d2.line([X(x), X(46), X(x), X(H_ - 18)], fill=C(INK * 3.4), width=1)
        for y in range(70, H_ - 18, 60): d2.line([X(30), X(y), X(W_ - 30), X(y)], fill=C(INK * 3.4), width=1)
        f = font(F_CPB, 26 * k); d2.text((X(30), X(12)), 'UJI COBA KANTONG BERBAYAR', font=f, fill=C(INK))
        d2.rectangle([X(4), X(4), X(W_ - 4), X(H_ - 4)], outline=C(INK), width=max(2, int(3 * k)))
    m = bk.doc('peta', W_, H_, CARD, draw, seed=1101, rough=0.4)
    m['pins'] = [[round(px(lo, la)[0] - W_ / 2, 1), round(px(lo, la)[1] - H_ / 2, 1)] for lo, la in PINS]
    # map pin: red teardrop with a cream dot, cut to its shape; anchor = the tip (bottom)
    def pshape(dm, k, P):
        X = lambda v: P + v * k
        dm.ellipse([X(0), X(0), X(36), X(36)], fill=255); dm.polygon([(X(3), X(24)), (X(33), X(24)), (X(18), X(54))], fill=255)
    def pdraw(img, d, k, P):
        X = lambda v: P + v * k
        d.ellipse([X(0), X(0), X(36), X(36)], fill=C(RED), outline=C(INK), width=max(1, int(2 * k)))
        d.polygon([(X(3), X(24)), (X(33), X(24)), (X(18), X(54))], fill=C(RED), outline=C(INK))
        d.ellipse([X(11), X(11), X(25), X(25)], fill=C(CARD))
    bk.doc('pin', 36, 54, RED, pdraw, seed=1102, rough=0.05, shape=pshape)


def calendar():
    for i, mo in enumerate(['FEB', 'MAR', 'APR', 'MEI']):
        def draw(img, d, k, P, mo=mo):
            X = lambda v: P + v * k
            d.rectangle([X(0), X(0), X(280), X(70)], fill=C(INK))
            f = font(F_CPB, 34 * k); t = '2016'; d.text((X(140) - f.getlength(t) / 2, X(16)), t, font=f, fill=C(CARD))
            for x in (70, 210): d.ellipse([X(x - 12), X(-8), X(x + 12), X(16)], fill=C(CARD * 0.8), outline=C(INK), width=max(2, int(3 * k)))
            fm = font(F_SLAB, 104 * k); d.text((X(140) - fm.getlength(mo) / 2, X(92)), mo, font=fm, fill=C(INK))
            for r in range(3):
                for c in range(7): d.rectangle([X(24 + c * 34), X(236 + r * 22), X(46 + c * 34), X(252 + r * 22)], outline=C(INK * 2.5), width=1)
        bk.doc('kal_' + mo.lower(), 280, 310, CARD, draw, seed=1201 + i, rough=0.35)


def chart():
    """usage chart frame: Feb–May 2016, 0–100 scale, dashed 70 line; the red line (100 → 70) is drawn live in film.js"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(3, int(5 * k))
        d.line([X(90), X(80), X(90), X(440), X(660), X(440)], fill=C(INK), width=w)
        for y in (110, 275): d.line([X(90), X(y), X(660), X(y)], fill=C(INK * 3.2), width=max(1, int(1.5 * k)))
        y70 = 110 + 0.3 * 330
        for x in range(96, 660, 26): d.line([X(x), X(y70), X(x + 14), X(y70)], fill=C(RED), width=max(2, int(3 * k)))
        f = font(F_CPB, 26 * k)
        for t, y in [('100', 110), ('70', y70), ('50', 275), ('0', 440)]: d.text((X(80) - f.getlength(t), X(y - 14)), t, font=f, fill=C(INK))
        for i, mo in enumerate(['FEB', 'MAR', 'APR', 'MEI']):
            x = 130 + i * 160; d.text((X(x) - f.getlength(mo) / 2, X(452)), mo, font=f, fill=C(INK))
            d.line([X(x), X(440), X(x), X(452)], fill=C(INK), width=max(1, int(2 * k)))
        fh = font(F_SLAB, 34 * k); d.text((X(30), X(22)), 'PEMAKAIAN KANTONG', font=fh, fill=C(INK))
        fs = font(F_CP, 18 * k); t = 'sumber: KLHK, 2016'; d.text((X(670) - fs.getlength(t), X(492)), t, font=fs, fill=C(INK * 1.6))
    bk.doc('grafik', 700, 520, CARD, draw, seed=1301, rough=0.4)


def journal():
    """the clue: a journal page (Homonoff 2018) in Indonesian, qualitative table only"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        f = font(F_CPB, 22 * k); d.text((X(30), X(24)), 'JURNAL EKONOMI · 2018', font=f, fill=C(INK))
        d.line([X(26), X(60), X(414), X(60)], fill=C(INK), width=max(2, int(3 * k))); d.line([X(26), X(66), X(414), X(66)], fill=C(INK), width=1)
        ft = font(F_SLAB, 34 * k)
        for i, t in enumerate(['Pajak 5 sen', 'vs bonus 5 sen']): d.text((X(30), X(84 + i * 44)), t, font=ft, fill=C(INK))
        fi = font(F_FELLI, 26 * k); d.text((X(30), X(178)), 'kantong belanja, Amerika Serikat', font=fi, fill=C(INK))
        r = np.random.default_rng(7)
        for j in range(6):
            y = 226 + j * 22; d.line([X(30), X(y), X(30 + r.uniform(300, 384)), X(y)], fill=C(INK * 3.0), width=max(1, int(5 * k)))
        y0 = 372
        d.rectangle([X(30), X(y0), X(410), X(y0 + 138)], outline=C(INK), width=max(2, int(3 * k)))
        d.line([X(30), X(y0 + 44), X(410), X(y0 + 44)], fill=C(INK), width=max(1, int(2 * k))); d.line([X(200), X(y0), X(200), X(y0 + 138)], fill=C(INK), width=max(1, int(2 * k)))
        fc = font(F_CPB, 22 * k)
        for (a, b), y in zip([('kebijakan', 'pemakai kantong'), ('pajak 5 sen', 'turun jauh'), ('bonus 5 sen', 'nyaris sama')], (y0 + 10, y0 + 56, y0 + 98)):
            d.text((X(40), X(y)), a, font=fc, fill=C(INK)); d.text((X(210), X(y)), b, font=fc, fill=C(RED if b == 'turun jauh' else INK))
    bk.doc('jurnal', 440, 540, NEWS, draw, seed=1401, rough=0.5)


def people():
    """shopper silhouettes (black paper, generic): a man and a woman in a headscarf; a small bag icon cut to its shape"""
    hd = lambda a0, a1, n=18: [(35 + 17 * math.cos(math.radians(a)), 22 + 17 * math.sin(math.radians(a))) for a in np.linspace(a0, a1, n)]
    man = hd(112, 428) + [(41, 40), (58, 50), (64, 120), (60, 128), (54, 124), (52, 72), (51, 118), (49, 188), (38, 188), (35, 126), (32, 188), (21, 188),
                          (19, 118), (18, 72), (16, 124), (10, 128), (6, 120), (12, 50), (29, 40)]
    woman = hd(150, 390) + [(52, 40), (58, 56), (64, 120), (59, 128), (54, 124), (53, 74), (57, 188), (13, 188), (17, 74), (16, 124), (11, 128), (6, 120),
                            (12, 56), (18, 40)]
    bk.silhouette('sil_org', man, seed=1501)
    bk.silhouette('sil_org2', woman, seed=1502)
    def shape(dm, k, P):
        X = lambda v: P + v * k
        dm.polygon([(X(4), X(20)), (X(42), X(20)), (X(46), X(60)), (X(0), X(60))], fill=255)
        for x0 in (6, 26): dm.arc([X(x0), X(0), X(x0 + 14), X(30)], 180, 360, fill=255, width=max(3, int(7 * k)))
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.polygon([(X(4), X(20)), (X(42), X(20)), (X(46), X(60)), (X(0), X(60))], fill=C(CARD), outline=C(INK))
        for x0 in (6, 26): d.arc([X(x0 + 2), X(3), X(x0 + 12), X(28)], 180, 360, fill=C(INK), width=max(2, int(3 * k)))
        for x in (14, 24, 34): d.line([X(x), X(26), X(x - 3), X(54)], fill=C(INK * 2.4), width=1)
    bk.doc('ic_kantong', 46, 60, CARD, draw, seed=1503, rough=0.1, shape=shape)


# ---------------- the AI balance split into registered pieces ----------------
TB_SRC = 'ai_timbangan.jpg'
TB_U = 2048 / 800        # source px per 800-grid unit (measured on an 800 px view)
TB = dict(pivot=(400, 258), hookL=(185, 266), hookR=(615, 266))
TB_SCALE = 0.40 * 1.5    # png px (at B) per source px → 0.40 world px per source px (whole balance ≈ 655 world wide)


def reg_cut(name, g, box, scale, seed, max_hole=1.0):
    """cut one region of a grey source with the same mask recipe as Baker.cut, keeping its source registration in the manifest:
    org = source px of the saved png's top-left; wps = world px per source px."""
    x0, y0, x1, y1 = [int(v * TB_U) for v in box]
    sub = g[y0:y1, x0:x1]
    h, w = sub.shape
    ink = sub < 205
    it = max(1, int(0.012 * max(h, w)))
    m = ndi.binary_closing(np.pad(ink, it + 2), iterations=it)[it + 2:-it - 2, it + 2:-it - 2]
    holes, nh = ndi.label(ndi.binary_fill_holes(m) & ~m)   # fill small holes only: the big gap between the pan strings stays open
    if nh:
        hs = np.bincount(holes.ravel()); hs[0] = 0
        m = m | np.isin(holes, np.nonzero((hs > 0) & (hs < max_hole * h * w))[0])
    lab, n = ndi.label(m)
    if n > 1:
        sizes = np.bincount(lab.ravel()); sizes[0] = 0
        m = np.isin(lab, np.nonzero(sizes >= 0.04 * sizes.max())[0])
    m = ndi.binary_dilation(m, iterations=max(1, it // 3))
    mask = (ndi.gaussian_filter(m.astype(float), max(1.0, it / 3)) > 0.5).astype(float)
    margin = 4 * bk.B
    ys, xs = np.nonzero(mask > 0.5)
    pad = int(margin / scale) + 12
    cx0, cy0 = max(0, xs.min() - pad), max(0, ys.min() - pad)
    rgba = cl.cutout(sub, mask, scale, margin=margin, seed=seed, paper=CARD)
    mm = bk.save(name, rgba[..., :3], rgba[..., 3])
    mm['org'] = [x0 + cx0 + mm['crop'][0] / scale, y0 + cy0 + mm['crop'][1] / scale]
    mm['wps'] = scale / bk.B
    return mm


def balance():
    g = np.asarray(bk.load(TB_SRC).convert('L'), float).copy()
    S = lambda v: int(v * TB_U)
    gp = g.copy()                                        # post: beam ends and pan rims whitened
    gp[S(232):S(286), :S(364)] = 255; gp[S(232):S(286), S(436):] = 255
    gp[S(286):S(650), :S(300)] = 255; gp[S(286):S(650), S(500):] = 255
    reg_cut('tb_post', gp, (276, 52, 524, 742), TB_SCALE, 1601)
    reg_cut('tb_beam', g, (148, 236, 652, 286), TB_SCALE, 1602)
    reg_cut('tb_panL', g, (74, 272, 298, 642), TB_SCALE, 1603, max_hole=0.06)
    reg_cut('tb_panR', g, (502, 272, 726, 642), TB_SCALE, 1604, max_hole=0.06)
    bk.M['_tb'] = dict(pivot=[v * TB_U for v in TB['pivot']], hookL=[v * TB_U for v in TB['hookL']], hookR=[v * TB_U for v in TB['hookR']],
                       panTop=272 * TB_U, panBottom=632 * TB_U)


def stamps():
    for name, text, size, color, seed, sub in [
            ('st_ditolak', 'DITOLAK', 120, RED, 81, None), ('st_berbayar', 'BERBAYAR', 104, RED, 82, None),
            ('st_rugi', 'RUGI', 130, RED, 83, None), ('st_rasarugi', 'RASA RUGI', 112, RED, 84, None),
            ('st_gratis', 'GRATIS', 96, GREEN * 0.85, 85, 'SEBELUM 2016')]:
        bk.stamp(name, text, size, color, seed=seed, sub=sub, legible=True)
    bk.flat('hl_amber', AMBER, poly=[(-200, -26), (200, -30), (204, 26), (-198, 30)], seed=951, rough=2, mottle=0.03)


def slips():
    T = [('s_gratis', 'GRATIS', F_SLAB, 70, CARD, INK), ('s_kota', 'puluhan kota', F_FELLI, 52, AMBER, INK),
         ('s_minimarket', 'kasir minimarket', F_CPB, 40, CARD, INK), ('s_kembalian', 'kembalian Rp200 = permen', F_CPB, 38, AMBER, INK),
         ('s_3bulan', '3 BULAN', F_SLAB, 70, AMBER, INK), ('s_30', 'TURUN S.D. 30%', F_SLAB, 56, AMBER, INK),
         ('s_rugibesar', 'RUGI BESAR?', F_SLAB, 72, CARD, INK), ('s_as', 'AMERIKA SERIKAT', F_CPB, 46, CARD, INK),
         ('s_md', 'Montgomery County, Maryland · 2012', F_CPB, 23, NEWS, INK), ('s_daerah', 'DAERAH INI', F_CPB, 44, CARD, RED),
         ('s_tokolain', 'TOKO LAIN', F_CPB, 44, CARD, INK), ('s_bawatas', 'bawa tas sendiri', F_FELLI, 46, CARD, INK),
         ('s_berhenti', 'berhenti pakai kantong', F_CPB, 36, CARD, RED), ('s_biasa', 'tetap pakai kantong', F_CPB, 36, CARD, INK),
         ('s_sama', 'SAMA-SAMA 5 SEN', F_SLAB, 52, AMBER, INK), ('s_untung', 'untung kecil', F_FELLI, 54, AMBER, INK),
         ('s_hilang', 'kehilangan', F_FELLI, 56, CARD, RED), ('s_tadinya', 'tadinya gratis', F_CPB, 42, CARD, INK),
         ('lbl_rugi', 'RUGI', F_SLAB, 60, CARD, RED), ('lbl_untung', 'UNTUNG', F_SLAB, 52, AMBER, INK),
         ('s_berat', 'rasa beratnya', F_FELLI, 56, AMBER, INK), ('s_uang', 'uangnya', F_CPB, 48, CARD, INK),
         ('s_benci', 'benci rugi > senang untung', F_CPB, 38, CARD, INK)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3, pa, ik, 410 + i, mono=f.startswith('Courier'))
    bk.ransom('ry16', '2016', 120, 3)
    bk.ransom('rq', '?', 190, 4)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('docs', lambda: (tag('tag_rp200', ['Rp200'], TAGP, [INK], 1701, w=330, h=150, sizes=(66, 40)),
                                    tag('tag_bayar5', ['BAYAR', '5 SEN'], CARD, [RED, INK], 1702, w=300, h=180, sizes=(54, 44)),
                                    tag('tag_bonus5', ['BONUS', '5 SEN'], TAGP, [INK, INK], 1703, w=300, h=180, sizes=(54, 44)),
                                    coin('koin200', '200', 'RUPIAH', 170, 1711), coin('koin5', '5¢', 'SEN', 150, 1712),
                                    receipt(), receipt('struk_hl', 'kantong'), receipt('struk_tot', 'total'), peta(), calendar(), chart(), journal(), people())),
                  ('balance', balance), ('stamps', stamps), ('slips', slips), ('prints', lambda: bake_prints(bk, HERE))]:
        if want(g): fn(); print('baked', g)
    bk.done()
