"""ARSIP #014 Voucher Ongkir Rp0 · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/ongkir/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner in Google
Flow (kolase/ai/, copied into raw/ here). This file draws what is special to the episode: the generic cart screen printed into
the blank phone of ai/hp_keranjang.jpg (screen area found by flood fill, so the tapping finger stays on top), the red ONGKIR Rp0
sticker, the ongkir / HEMAT tags, the experiment card (Shehu, Papies & Neslin 2020, field experiment: 760.395 customers,
380.551 vs 379.844, Aug–Oct 2014; only these numbers), the split-screen panels, the wide result chart (risky goods up,
low-risk goods about the same: qualitative, no invented values), the origin labels DATA INDONESIA vs EKSPERIMEN EROPA, stamps
and slips. Loop detail: the cart icon in the screen header is a tiny fitting-room curtain (not mentioned, revealed in shot 17).
No logos, no marketplace or courier names; illustrative prices only on the cart."""
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
TAGP = AMBER * 0.55 + CARD * 0.45


def ai_to_raw():
    os.makedirs(bk.raw, exist_ok=True)
    for f in glob.glob(os.path.join(HERE, 'ai', '*.jpg')) + glob.glob(os.path.join(HERE, 'ai', '*.tint.png')):
        shutil.copy(f, os.path.join(bk.raw, 'ai_' + os.path.basename(f)))


# ---------------- the cart screen printed into the AI phone ----------------
HP_W = 700           # world width of the phone + hands cut-out
SC = 2               # composite drawn at 2x the source (crisp type after the cut's resize)


def phone():
    src = Image.open(os.path.join(bk.raw, 'ai_hp_keranjang.jpg')).convert('L')
    src = src.resize((src.width * SC, src.height * SC), Image.LANCZOS)
    g = np.asarray(src, float)
    # screen = bright region connected to the screen centre (bezel and the finger outline bound it)
    bright = g > 215
    box = np.zeros_like(bright); box[110 * SC:770 * SC, 296 * SC:606 * SC] = True
    lab, _ = ndi.label(bright & box)
    scr = lab == lab[300 * SC, 450 * SC]
    scr = ndi.binary_erosion(scr, iterations=3)
    img = Image.new('L', src.size, 255); d = ImageDraw.Draw(img)
    X = lambda v: v * SC
    x0, x1 = 312, 592
    fb, fr, fs, fh = font(F_CPB, 30 * SC), font(F_CP, 24 * SC), font(F_CPB, 22 * SC), font(F_SLAB, 30 * SC)
    # header: title + the cart icon, which is a tiny fitting-room curtain (loop detail)
    d.text((X(x0 + 4), X(132)), 'KERANJANG', font=fh, fill=40)
    cx, cy = 566, 150
    d.line([X(cx - 18), X(cy - 16), X(cx + 18), X(cy - 16)], fill=40, width=3 * SC)
    for k in range(5):
        xx = cx - 15 + k * 6
        d.line([X(xx), X(cy - 14), X(xx + (2 if k % 2 else -2)), X(cy + 16)], fill=40, width=2 * SC)
    d.line([X(x0), X(184), X(x1), X(184)], fill=60, width=2 * SC)
    # two items: a shirt and a compact (line icons), illustrative prices
    def shirt(x, y):
        pts = [(x + 10, y + 6), (x + 26, y), (x + 34, y + 8), (x + 42, y), (x + 58, y + 6), (x + 66, y + 24), (x + 54, y + 30),
               (x + 54, y + 70), (x + 14, y + 70), (x + 14, y + 30), (x + 2, y + 24)]
        d.polygon([(X(a), X(b)) for a, b in pts], outline=40, width=3 * SC)
    def compact(x, y):
        d.ellipse([X(x + 4), X(y + 8), X(x + 62), X(y + 66)], outline=40, width=3 * SC)
        d.ellipse([X(x + 16), X(y + 20), X(x + 50), X(y + 54)], outline=90, width=2 * SC)
    for i, (ic, a, p) in enumerate([(shirt, 'Kemeja', 'Rp89.000'), (compact, 'Bedak', 'Rp45.000')]):
        y = 200 + i * 104
        d.rectangle([X(x0), X(y), X(x0 + 80), X(y + 84)], outline=120, width=2 * SC)
        ic(x0 + 7, y + 7)
        d.text((X(x0 + 96), X(y + 8)), a, font=fb, fill=40); d.text((X(x0 + 96), X(y + 46)), p, font=fr, fill=40)
    d.line([X(x0), X(410), X(x1), X(410)], fill=60, width=2 * SC)
    # ongkir row: Rp15.000 struck, Rp0
    fo = font(F_CP, 20 * SC)
    d.text((X(x0 + 4), X(428)), 'Ongkir', font=fr, fill=40)
    t = 'Rp15.000'; tw = fo.getlength(t) / SC
    d.text((X(x0 + 96), X(432)), t, font=fo, fill=90)
    d.line([X(x0 + 92), X(445), X(x0 + 100 + tw), X(443)], fill=30, width=3 * SC)
    d.text((X(x0 + 206), X(424)), 'Rp0', font=fb, fill=30)
    # checkout button under the fingertip (the finger is drawn over it by the mask)
    d.rounded_rectangle([X(x0 + 6), X(600), X(x1 - 6), X(676)], radius=X(12), fill=45)
    t = 'CHECKOUT'; d.text((X((x0 + x1) / 2) - fh.getlength(t) / 2, X(618)), t, font=fh, fill=235)
    ui = np.asarray(img, float)
    out = np.where(scr, np.minimum(g, ui), g)
    Image.fromarray(out.astype(np.uint8)).save(os.path.join(bk.raw, 'ai_hp_cart.png'))
    m = bk.cut('hp_cart', 'ai_hp_cart.png', HP_W, seed=1801)
    # feature offsets (world, from the piece centre) for film.js, measured on the mask bbox
    ink = g < 205
    ys, xs = np.nonzero(ink)
    bx0, bx1, by0, by1 = xs.min(), xs.max(), ys.min(), ys.max()
    k = HP_W / (bx1 - bx0 + 1)
    ccx, ccy = (bx0 + bx1) / 2, (by0 + by1) / 2
    W_ = lambda x, y: [round((x * SC - ccx) * k, 1), round((y * SC - ccy) * k, 1)]
    m['feat'] = dict(screen=W_(452, 430), header=W_(452, 150), curtain=W_(cx, cy), items=W_(452, 300), ongkir=W_(450, 440),
                     rp0=W_(x0 + 233, 442), button=W_(452, 638), finger=W_(498, 560))


# ---------------- tags, sticker, cards ----------------
def tag(name, lines, paper, inks, seed, w=300, h=180, sizes=(64, 40)):
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


def sticker():
    """red round-cornered sticker ONGKIR Rp0, cut to its outline"""
    w, h = 430, 210
    def shape(dm, k, P):
        dm.rounded_rectangle([P, P, P + w * k, P + h * k], radius=int(46 * k), fill=255)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rounded_rectangle([X(10), X(10), X(w - 10), X(h - 10)], radius=int(38 * k), outline=C(CARD), width=max(3, int(4 * k)))
        f = font(F_CPB, 50 * k); t = 'ONGKIR'; d.text((X(w / 2) - f.getlength(t) / 2, X(26)), t, font=f, fill=C(CARD))
        f = font(F_SLAB, 96 * k); t = 'Rp0'; d.text((X(w / 2) - f.getlength(t) / 2, X(70)), t, font=f, fill=C(CARD))
    bk.doc('stk_rp0', w, h, RED, draw, seed=1901, rough=0.25, shape=shape)


def card_uji():
    """experiment card (only the paper's numbers); the AI crowd is laid over its blank window in film.js"""
    W_, H_ = 920, 860
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        f = font(F_CPB, 34 * k); d.text((X(40), X(34)), 'UJI ACAK · TOKO ONLINE BESAR', font=f, fill=C(INK))
        f2 = font(F_CP, 30 * k); d.text((X(40), X(84)), 'Eropa · Agustus–Oktober 2014', font=f2, fill=C(INK))
        d.line([X(36), X(134), X(W_ - 36), X(134)], fill=C(INK), width=max(2, int(3 * k)))
        d.rectangle([X(40), X(160), X(W_ - 40), X(560)], outline=C(INK * 2.6), width=max(1, int(2 * k)))
        fb = font(F_SLAB, 120 * k); t = '760.395'; d.text((X(W_ / 2) - fb.getlength(t) / 2, X(590)), t, font=fb, fill=C(INK))
        f3 = font(F_CPB, 44 * k); t = 'PELANGGAN DIUJI'; d.text((X(W_ / 2) - f3.getlength(t) / 2, X(752)), t, font=f3, fill=C(INK))
    bk.doc('kartu_uji', W_, H_, CARD, draw, seed=1902, rough=0.45)


def chart():
    """wide result chart: two zones (risky / safe goods); arrows are drawn live in film.js; qualitative only"""
    W_, H_ = 980, 760
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        f = font(F_CPB, 30 * k); d.text((X(36), X(26)), 'BELANJA: GRATIS ONGKIR vs NORMAL', font=f, fill=C(INK))
        d.line([X(30), X(74), X(W_ - 30), X(74)], fill=C(INK), width=max(2, int(3 * k)))
        d.line([X(W_ * 0.6), X(96), X(W_ * 0.6), X(690)], fill=C(INK * 2.4), width=max(2, int(2 * k)))
        for x in range(40, W_ - 30, 24): d.line([X(x), X(690), X(x + 12), X(690)], fill=C(INK), width=max(2, int(3 * k)))
        fz = font(F_SLAB, 40 * k); fs = font(F_CPB, 28 * k)
        d.text((X(46), X(94)), 'BARANG BERISIKO', font=fz, fill=C(RED))
        d.text((X(46), X(144)), 'susah dinilai tanpa dicoba', font=fs, fill=C(INK))
        xr = W_ * 0.6 + 22; fz2 = fz
        while xr + fz2.getlength('BARANG AMAN') / k > W_ - 24: fz2 = font(F_SLAB, fz2.size / k * 0.95 * k)   # ≥ 20 px right margin
        d.text((X(xr), X(94)), 'BARANG AMAN', font=fz2, fill=C(GREEN))
        d.text((X(xr), X(144)), 'mudah ditebak', font=fs, fill=C(INK))
    bk.doc('grafik', W_, H_, CARD, draw, seed=1903, rough=0.4)


def stamps():
    for name, text, size, color, seed in [('st_remlepas', 'REM LEPAS', 104, RED, 81), ('st_beda', 'BEDA', 140, RED, 82),
                                          ('st_retur', 'RETUR', 130, RED, 83), ('st_naik', 'NAIK', 96, RED, 84),
                                          ('st_coba', 'RUANG COBA GRATIS', 74, RED, 85), ('st_rem', 'REM', 120, GREEN * 0.85, 86)]:
        bk.stamp(name, text, size, color, seed=seed, legible=True)
    bk.mark('m_eq_r', 'eq', 120, GREEN * 0.9, seed=96)


def slips():
    T = [('lbl_id', 'DATA INDONESIA', F_CPB, 30, GREEN, CARD), ('lbl_eu', 'EKSPERIMEN EROPA · 2014', F_CPB, 30, NEWS, INK),
         ('s_untung', 'UNTUNG BERSIH', F_SLAB, 50, AMBER, INK), ('s_pesan', '+1 PESANAN', F_CPB, 34, CARD, INK),
         ('s_toko', 'toko online besar', F_FELLI, 44, CARD, INK), ('s_kode', 'kode gratis ongkir', F_CPB, 34, AMBER, INK),
         ('s_dicoba', 'tanpa dicoba', F_FELLI, 46, CARD, RED), ('s_sama', 'nyaris sama', F_FELLI, 44, CARD, INK),
         ('s_alami', 'REM ALAMI', F_SLAB, 56, AMBER, INK), ('s_mikir', 'mikir ulang...', F_CPB, 40, CARD, INK),
         ('s_risiko', 'ambil risiko', F_FELLI, 46, CARD, RED), ('s_dikirim', 'dikirim', F_CPB, 32, CARD, INK),
         ('s_balik', 'dikembalikan', F_CPB, 32, CARD, RED), ('s_baju', 'baju', F_FELLI, 44, CARD, INK),
         ('s_kosmetik', 'kosmetik', F_FELLI, 44, CARD, INK)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3, pa, ik, 410 + i, mono=f.startswith('Courier'))
    bk.ransom('rq', '?', 190, 4)
    bk.ransom('ry14', '2014', 110, 3)


def docs():
    tag('tag_ongkir', ['ONGKIR', 'Rp15.000'], TAGP, [INK, INK], 1701, w=320, h=180, sizes=(50, 44))
    tag('tag_hemat', ['HEMAT', 'Rp15.000'], CARD, [GREEN * 0.9, INK], 1702, w=320, h=180, sizes=(50, 44))
    tag('tag_gratis', ['GRATIS ONGKIR', '380.551 orang'], TAGP, [INK, INK], 1703, w=500, h=160, sizes=(40, 32))
    tag('tag_normal', ['ONGKIR NORMAL', '379.844 orang'], CARD, [INK, INK], 1704, w=500, h=160, sizes=(40, 32))
    sticker(); card_uji(); chart()
    # split-screen panels (torn colour paper, full height of the stage)
    bk.flat('pan_l', AMBER, poly=[(-275, -540), (270, -548), (262, 552), (-270, 545)], seed=1910, rough=3)
    bk.flat('pan_r', GREEN, poly=[(-270, -546), (272, -540), (268, 548), (-262, 552)], seed=1911, rough=3)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], 'ONGKIR · 2014')),
                  ('phone', phone), ('docs', docs), ('stamps', stamps), ('slips', slips), ('prints', lambda: bake_prints(bk, HERE))]:
        if want(g): fn(); print('baked', g)
    bk.done()
