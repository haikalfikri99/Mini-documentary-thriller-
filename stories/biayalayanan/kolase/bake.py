"""ARSIP #013 Biaya Layanan · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/biayalayanan/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner in Google Flow
(kolase/ai/, copied into raw/ here). This file draws what is special to the episode: the checkout screens that sit on the blank
phone screen of ai/hp_checkout.jpg (measured on the baked cut-out, rotation and size stored in the manifest so film.js pastes the
screen exactly on the phone), the ink-only screen rows that appear live (biaya layanan, rolling total), price tags, the press
clipping (YLKI quote verbatim, recreated without any media logo), ticket stubs, the two-bar chart frame (no invented numbers:
only "+ seperlima"), data-origin labels DATA INDONESIA / EKSPERIMEN AS, stamps and slips. Rupiah figures are ILUSTRASI
(Rp50.000 → Rp58.000 ≈ the study's ±15% fee); the US screens carry no currency figures. No logos, no app names."""
import os, sys, json, shutil, glob, math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
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
WHITE = np.array([250, 248, 242], float)
GREY = INK * 2.6
TAGP = AMBER * 0.55 + CARD * 0.45


def ai_to_raw():
    """AI prints → raw/ai_<name>.jpg; stadion_kursi: the AI's fake lettering on the balcony box (±370,390) is painted out"""
    os.makedirs(bk.raw, exist_ok=True)
    for f in glob.glob(os.path.join(HERE, 'ai', '*.jpg')):
        shutil.copy(f, os.path.join(bk.raw, 'ai_' + os.path.basename(f)))
    p = os.path.join(bk.raw, 'ai_stadion_kursi.jpg')
    im = Image.open(p).convert('RGB'); box = (338, 380, 404, 408)
    patch = im.crop((box[0], box[1] - 30, box[2], box[1] - 2)).resize((box[2] - box[0], box[3] - box[1]))
    im.paste(patch.filter(ImageFilter.GaussianBlur(1.2)), box[:2]); im.save(p, quality=95)


def region(name, seed_xy=None):
    """bright closed region inside a baked cut-out (the phone screen, the lens): world offset of its centre from the piece
    centre, its size along its own axes and its rotation (deg), from the corners of the component"""
    im = np.asarray(Image.open(os.path.join(bk.out, name + '.png')).convert('RGBA'), float)
    lum, a = im[..., :3].mean(2), im[..., 3]
    m = (lum > 200) & (a > 250)
    lab, n = ndi.label(m)
    h, w = m.shape
    sx, sy = seed_xy if seed_xy else (w // 2, h // 2)
    c = lab[int(sy * h), int(sx * w)] if seed_xy else lab[h // 2, w // 2]
    ys, xs = np.nonzero(lab == c)
    s, d = xs + ys, xs - ys
    TL, BR, TR, BL = [np.array([xs[i], ys[i]], float) for i in (s.argmin(), s.argmax(), d.argmax(), d.argmin())]
    rot = math.degrees(math.atan2(TR[1] - TL[1], TR[0] - TL[0]) * 0.5 + math.atan2(BR[1] - BL[1], BR[0] - BL[0]) * 0.5)
    ww = (np.linalg.norm(TR - TL) + np.linalg.norm(BR - BL)) / 2 / bk.B
    hh = (np.linalg.norm(BL - TL) + np.linalg.norm(BR - TR)) / 2 / bk.B
    cx, cy = (TL + BR + TR + BL) / 4
    return [round((cx - w / 2) / bk.B, 1), round((cy - h / 2) / bk.B, 1), round(ww, 1), round(hh, 1), round(rot, 2)]


def inktext(name, text, fnt, size, color, **meta):
    """ink-only type (printed on the phone screen: multiply, no paper, no shadow)"""
    B = bk.B; f = font(fnt, size * B); asc, desc = f.getmetrics()
    W_, H_ = int(f.getlength(text) + 8 * B), int(asc + desc + 8 * B)
    img = Image.new('L', (W_, H_), 0); ImageDraw.Draw(img).text((4 * B, 4 * B), text, font=f, fill=255)
    return bk.save(name, color[None, None, :], np.asarray(img, float) / 255 * 0.96, ink=1, **meta)


def marker(name, w, h, color, seed, alpha=0.55):
    """highlighter band (ink, multiply): rough ends, slight wobble"""
    B = bk.B; W_, H_ = int(w * B), int(h * B)
    r = np.random.default_rng(seed)
    img = Image.new('L', (W_ + 20, H_ + 20), 0); d = ImageDraw.Draw(img)
    d.polygon([(10 + r.uniform(0, 8), 10 + r.uniform(0, 6)), (W_ + 10 - r.uniform(0, 8), 10 + r.uniform(0, 6)),
               (W_ + 10 - r.uniform(0, 10), H_ + 10 - r.uniform(0, 6)), (10 + r.uniform(0, 10), H_ + 10 - r.uniform(0, 6))], fill=255)
    a = ndi.gaussian_filter(np.asarray(img, float) / 255, 1.5) * alpha
    return bk.save(name, color[None, None, :], a, ink=1)


# ---------------- the checkout screens (pasted on the blank phone screen) ----------------
def screens():
    sw, sh = bk.M['hp']['screen'][2:4]
    sw, sh = sw - 6, sh - 6                      # stay inside the bezel
    rr = sw * 0.09
    shape = lambda dm, k, P: dm.rounded_rectangle([P, P, P + sw * k, P + sh * k], radius=rr * k, fill=255)
    U = sw / 100                                 # screen unit: 1 % of the width
    rows = {}

    def frame(d, X, title):
        d.rounded_rectangle([X(0), X(0), X(sw), X(sh)], radius=rr * bk.B, fill=C(WHITE))
        d.rectangle([X(0), X(sh * 0.05), X(sw), X(sh * 0.115)], fill=C(CARD * 0.96))
        f = font(F_OSW, 7.5 * U * bk.B); d.text((X(6 * U), X(sh * 0.056)), '<  ' + title, font=f, fill=C(INK))
        d.line([X(0), X(sh * 0.115), X(sw), X(sh * 0.115)], fill=C(GREY), width=2)

    def product(d, X, y0, label):
        d.rounded_rectangle([X(6 * U), X(y0), X(94 * U), X(y0 + sh * 0.20)], radius=3 * U * bk.B, outline=C(GREY), width=2)
        bx, by, bs = 11 * U, y0 + sh * 0.035, 24 * U        # a plain cardboard box icon
        d.polygon([(X(bx), X(by + bs * 0.3)), (X(bx + bs * 0.5), X(by)), (X(bx + bs), X(by + bs * 0.3)), (X(bx + bs), X(by + bs)),
                   (X(bx + bs * 0.5), X(by + bs * 1.25)), (X(bx), X(by + bs))], fill=C(MANILA), outline=C(INK))
        d.line([X(bx), X(by + bs * 0.3), X(bx + bs * 0.5), X(by + bs * 0.58), X(bx + bs), X(by + bs * 0.3)], fill=C(INK), width=2)
        d.line([X(bx + bs * 0.5), X(by + bs * 0.58), X(bx + bs * 0.5), X(by + bs * 1.25)], fill=C(INK), width=2)
        fs = font(F_OSW, 6 * U * bk.B); d.text((X(42 * U), X(y0 + sh * 0.03)), label, font=fs, fill=C(GREY))

    def button(d, X, text, col=GREEN):
        y = sh * 0.84
        d.rounded_rectangle([X(8 * U), X(y), X(92 * U), X(y + sh * 0.085)], radius=4 * U * bk.B, fill=C(col))
        f = font(F_OSW, 8 * U * bk.B); tw = f.getlength(text)
        d.text((X(50 * U) - tw / 2, X(y + sh * 0.012)), text, font=f, fill=C(CARD))
        return [0, y + sh * 0.0425 - sh / 2]

    big = lambda: font(F_OSW, 15 * U * bk.B)
    lab = lambda: font(F_OSW, 6.2 * U * bk.B)

    # cart: one item Rp50.000, total Rp50.000, CHECKOUT
    def keranjang(img, d, k, P):
        X = lambda v: P + v * k
        frame(d, X, 'Keranjang'); product(d, X, sh * 0.15, '1 barang')
        d.text((X(42 * U), X(sh * 0.15 + sh * 0.075)), 'Rp50.000', font=big(), fill=C(INK))
        d.line([X(6 * U), X(sh * 0.62), X(94 * U), X(sh * 0.62)], fill=C(GREY), width=2)
        d.text((X(6 * U), X(sh * 0.655)), 'Total', font=lab(), fill=C(GREY))
        f = font(F_OSW, 11 * U * k); t = 'Rp50.000'; d.text((X(94 * U) - f.getlength(t), X(sh * 0.645)), t, font=f, fill=C(INK))
        rows['k_btn'] = button(d, X, 'CHECKOUT')
    bk.doc('scr_keranjang', sw, sh, WHITE, keranjang, seed=1801, rough=0.02, amp=0.02, shape=shape, ink=1, over=1)
    rows['k_price'] = [42 * U + 28 * U - sw / 2, sh * 0.15 + sh * 0.075 + 15 * U - sh / 2]

    # checkout page base: the item Rp50.000 on top; the biaya row and the total value are separate ink (they appear live)
    def bayar(img, d, k, P):
        X = lambda v: P + v * k
        frame(d, X, 'Checkout'); product(d, X, sh * 0.15, 'Harga barang')
        d.text((X(42 * U), X(sh * 0.15 + sh * 0.075)), 'Rp50.000', font=big(), fill=C(INK))
        d.line([X(6 * U), X(sh * 0.40), X(94 * U), X(sh * 0.40)], fill=C(GREY), width=2)
        d.text((X(6 * U), X(sh * 0.43)), 'Subtotal', font=lab(), fill=C(GREY))
        t = 'Rp50.000'; d.text((X(94 * U) - lab().getlength(t), X(sh * 0.43)), t, font=lab(), fill=C(GREY))
        d.line([X(6 * U), X(sh * 0.58), X(94 * U), X(sh * 0.58)], fill=C(INK), width=3)
        d.text((X(6 * U), X(sh * 0.61)), 'Total bayar', font=font(F_OSW, 7.5 * U * k), fill=C(INK))
        rows['b_btn'] = button(d, X, 'BAYAR')
    bk.doc('scr_bayar', sw, sh, WHITE, bayar, seed=1802, rough=0.02, amp=0.02, shape=shape, ink=1, over=1)
    rows['b_price'] = [42 * U + 28 * U - sw / 2, sh * 0.15 + sh * 0.075 + 15 * U - sh / 2]
    rows['b_biaya'] = [0, sh * 0.505 - sh / 2]
    rows['b_total'] = [94 * U - 30 * U - sw / 2, sh * 0.71 - sh / 2]
    # the small row (the loop detail) and the total values
    f = font(F_OSW, 6.2 * U * bk.B)
    def brow(img, d, k, P):
        d.text((P, P), 'Biaya layanan', font=f, fill=C(GREY)); t = 'Rp8.000'; d.text((P + 88 * U * k - f.getlength(t), P), t, font=f, fill=C(GREY))
    W0 = 88 * U; H0 = 8 * U
    def inkdoc(name, draw, col=INK):
        img = Image.new('L', (int(W0 * bk.B) + 20, int(H0 * bk.B) + 20), 0); dd = ImageDraw.Draw(img)
        dd.text((10, 6), 'Biaya layanan', font=f, fill=255); t = 'Rp8.000'; dd.text((10 + W0 * bk.B - f.getlength(t), 6), t, font=f, fill=255)
        return bk.save(name, col[None, None, :], np.asarray(img, float) / 255 * 0.95, ink=1)
    inkdoc('sx_biaya', None, GREY * 0.8)
    for v in ['50.000', '52.000', '55.000', '58.000']:
        inktext('sx_t' + v[:2], 'Rp' + v, F_OSW, 16 * U, INK)
    inktext('sx_t58r', 'Rp58.000', F_OSW, 16 * U, RED)

    # US ticket screens: no currency figures, bars stand for amounts
    def us(title, rows_):
        def draw(img, d, k, P):
            X = lambda v: P + v * k
            frame(d, X, title)
            d.rounded_rectangle([X(6 * U), X(sh * 0.15), X(94 * U), X(sh * 0.33)], radius=3 * U * k, outline=C(GREY), width=2)
            d.rectangle([X(12 * U), X(sh * 0.18), X(34 * U), X(sh * 0.30)], fill=C(MANILA), outline=C(INK), width=2)   # ticket icon
            for yy in np.linspace(sh * 0.19, sh * 0.29, 5): d.ellipse([X(32 * U), X(yy), X(36 * U), X(yy + 2 * U)], fill=C(WHITE))
            d.text((X(42 * U), X(sh * 0.19)), 'Tiket konser', font=font(F_OSW, 7 * U * k), fill=C(INK))
            y = sh * 0.42
            for lab_, ln, col in rows_:
                d.text((X(6 * U), X(y)), lab_, font=font(F_OSW, 7 * U * k), fill=C(INK if col is None else col))
                if ln: d.rectangle([X(94 * U - ln * U), X(y + 2 * U), X(94 * U), X(y + 7 * U)], fill=C(INK if col is None else col))
                y += sh * 0.10
            button(d, X, 'BELI')
        return draw
    bk.doc('scr_depan', sw, sh, WHITE, us('Tiket', [('Harga', 34, None), ('+ Biaya', 10, AMBER * 0.85), ('Total', 44, None)]),
           seed=1803, rough=0.02, amp=0.02, shape=shape, ink=1, over=1)
    bk.doc('scr_akhir', sw, sh, WHITE, us('Tiket', [('Harga', 34, None), ('', 0, None), ('Total', 34, None)]),
           seed=1804, rough=0.02, amp=0.02, shape=shape, ink=1, over=1)
    fb = font(F_OSW, 7 * U * bk.B)
    img = Image.new('L', (int(88 * U * bk.B) + 20, int(9 * U * bk.B) + 20), 0); dd = ImageDraw.Draw(img)
    dd.text((10, 6), '+ Biaya', font=fb, fill=255); dd.rectangle([10 + 78 * U * bk.B, 6 + 2 * U * bk.B, 10 + 88 * U * bk.B, 6 + 7 * U * bk.B], fill=255)
    bk.save('sx_biaya_us', (AMBER * 0.8)[None, None, :], np.asarray(img, float) / 255 * 0.95, ink=1)
    rows['us_biaya'] = [0, sh * 0.52 + 4 * U - sh / 2]
    bk.M['_rows'] = {k: [round(v[0], 1), round(v[1], 1)] for k, v in rows.items()}
    marker('hl_amber', 300, 34, AMBER, 1901)
    marker('hl_price', 190, 56, AMBER, 1903)
    marker('hl_amber_l', 520, 70, AMBER, 1902, 0.5)


# ---------------- tags, clipping, tickets, chart ----------------
def tag(name, lines, paper, inks, seed, w=300, h=150, sizes=(60, 36)):
    def shape(dm, k, P):
        X = lambda v: P + v * k
        dm.polygon([(X(0), X(h * 0.32)), (X(54), X(0)), (X(w), X(0)), (X(w), X(h)), (X(54), X(h)), (X(0), X(h * 0.68))], fill=255)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.ellipse([X(22), X(h / 2 - 13), X(48), X(h / 2 + 13)], fill=C(INK * 1.2))
        d.line([X(35), X(h / 2), X(-10), X(h / 2 - 50)], fill=C(INK), width=max(2, int(3 * k)))
        y = (h - sizes[0] * 1.25 - sizes[1] * 1.15) / 2 if len(lines) > 1 else h / 2 - sizes[0] * 0.62
        for i, (t, ik) in enumerate(zip(lines, inks)):
            f = font(F_SLAB if i == 0 else F_CPB, sizes[min(i, 1)] * k)
            d.text((X(58 + (w - 58) / 2) - f.getlength(t) / 2, X(y)), t, font=f, fill=C(ik)); y += sizes[min(i, 1)] * 1.25
    bk.doc(name, w, h, paper, draw, seed=seed, rough=0.3, shape=shape)


def clipping():
    """press clipping recreated (no media name/logo); the quote is YLKI's, verbatim (kabarbursa, 13 Okt 2026)"""
    W_, H_ = 700, 800
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        f = font(F_CPB, 24 * k); d.text((X(34), X(26)), 'KLIPING · 13 OKT 2026', font=f, fill=C(INK))
        d.line([X(30), X(66), X(670), X(66)], fill=C(INK), width=max(2, int(4 * k))); d.line([X(30), X(74), X(670), X(74)], fill=C(INK), width=1)
        fh = font(F_SLAB, 50 * k)
        for i, t in enumerate(['Lembaga konsumen', 'ingatkan soal', 'biaya aplikasi']): d.text((X(34), X(96 + i * 62)), t, font=fh, fill=C(INK))
        r = np.random.default_rng(3)
        for j in range(5):
            y = 304 + j * 26; d.line([X(34), X(y), X(34 + r.uniform(520, 630)), X(y)], fill=C(INK * 3.0), width=max(1, int(6 * k)))
        y0 = 450
        d.rectangle([X(30), X(y0), X(670), X(y0 + 300)], outline=C(INK), width=max(2, int(3 * k)))
        fq = font(F_FELLI, 38 * k)
        for i, t in enumerate(['“…aplikator mencari celah,', 'dan konsumen kembali', 'menjadi pihak yang', 'menanggung bebannya.”']):
            d.text((X(52), X(y0 + 22 + i * 52)), t, font=fq, fill=C(INK))
        fs = font(F_CPB, 24 * k); d.text((X(52), X(y0 + 240)), '— YLKI', font=fs, fill=C(INK))
    m = bk.doc('kliping', W_, H_, NEWS, draw, seed=2001, rough=0.6)
    m['q_celah'] = [52 + 230 - W_ / 2, 450 + 22 + 26 - H_ / 2]      # "mencari celah" line
    m['q_beban'] = [52 + 250 - W_ / 2, 450 + 22 + 3 * 52 + 24 - H_ / 2]


def tickets():
    for name, top, mid, paper in [('tiket', 'TIKET', 'ONLINE', MANILA), ('tiket_depan', 'KURSI', 'DEPAN', AMBER * 0.6 + CARD * 0.4),
                                  ('tiket_blk', 'KURSI', 'BELAKANG', CARD)]:
        W_, H_ = 360, 170
        def shape(dm, k, P, W_=W_, H_=H_):
            X = lambda v: P + v * k
            dm.rectangle([X(0), X(0), X(W_), X(H_)], fill=255)
            for x in (0, W_): dm.ellipse([X(x - 18), X(H_ / 2 - 18), X(x + 18), X(H_ / 2 + 18)], fill=0)
        def draw(img, d, k, P, top=top, mid=mid, W_=W_, H_=H_):
            X = lambda v: P + v * k
            for yy in range(10, H_, 16): d.line([X(262), X(yy), X(262), X(yy + 8)], fill=C(INK), width=max(1, int(2 * k)))
            f1 = font(F_CPB, 32 * k); f2 = font(F_SLAB, 46 * k if len(mid) < 7 else 36 * k)
            d.text((X(30), X(30)), top, font=f1, fill=C(INK)); d.text((X(30), X(78)), mid, font=f2, fill=C(INK))
            fn = font(F_CPB, 22 * k); d.text((X(278), X(70)), 'No.', font=fn, fill=C(INK))
        bk.doc(name, W_, H_, paper, draw, seed=2100 + len(name), rough=0.3, shape=shape)


def chart():
    """wide two-bar frame: biaya di depan vs biaya di akhir; the bars are separate pieces (grown live in film.js)"""
    W_, H_ = 960, 640
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(3, int(5 * k))
        d.line([X(80), X(70), X(80), X(540), X(920), X(540)], fill=C(INK), width=w)
        fh = font(F_SLAB, 40 * k); d.text((X(80), X(10)), 'TOTAL BELANJA', font=fh, fill=C(INK))
        for y in (190, 330): d.line([X(80), X(y), X(920), X(y)], fill=C(INK * 3.2), width=max(1, int(1.5 * k)))
        f = font(F_CPB, 30 * k)
        for t, x in [('biaya di depan', 300), ('biaya di akhir', 700)]: d.text((X(x) - f.getlength(t) / 2, X(556)), t, font=f, fill=C(INK))
    m = bk.doc('grafik', W_, H_, CARD, draw, seed=2201, rough=0.4)
    m['base'] = [0, 540 - H_ / 2]; m['xL'] = 300 - W_ / 2; m['xR'] = 700 - W_ / 2
    bk.bar('bar_depan', 230, 300, seed=2202, wash=GREEN * 0.9 + CARD * 0.1)
    bk.bar('bar_akhir', 230, 360, seed=2203, wash=AMBER)


def stamps():
    for name, text, size, color, seed in [('st_duaharga', 'DUA HARGA', 104, RED, 81), ('st_jomplang', 'JOMPLANG', 110, RED, 82),
                                          ('st_cocok', 'COCOK', 110, GREEN * 0.85, 83), ('st_terkunci', 'TERKUNCI', 100, RED, 84),
                                          ('st_naik', 'NAIK', 96, RED, 85)]:
        bk.stamp(name, text, size, color, seed=seed, legible=True)


def slips():
    T = [('s_hook', 'SATU BARANG, DUA HARGA', F_SLAB, 50, CARD, INK), ('s_ilustrasi', 'ILUSTRASI', F_CPB, 26, NEWS, INK),
         ('lbl_id', 'DATA INDONESIA · 2026', F_CPB, 34, GREEN, CARD), ('lbl_as', 'EKSPERIMEN AS · 2015', F_CPB, 34, NEWS, INK),
         ('s_halbayar', 'halaman bayar', F_CPB, 40, CARD, INK), ('s_keranjang', 'masuk keranjang', F_CPB, 40, AMBER, INK),
         ('s_lembaga', 'lembaga konsumen', F_FELLI, 50, CARD, INK), ('s_pembeli', 'dibebankan ke pembeli', F_CPB, 36, AMBER, INK),
         ('s_jutaan', 'jutaan pembeli tiket', F_CPB, 38, CARD, INK), ('s_awal', 'biaya sejak awal', F_CPB, 36, CARD, INK),
         ('s_akhir', 'biaya pas mau bayar', F_CPB, 36, AMBER, INK), ('s_seperlima', '+ SEPERLIMA', F_SLAB, 52, AMBER, INK),
         ('s_mahal', 'tiket lebih mahal', F_FELLI, 50, AMBER, INK), ('s_selisih', 'selisih kecil', F_FELLI, 54, CARD, INK),
         ('s_murah', 'harga awal', F_CPB, 40, CARD, INK), ('s_efek', 'efeknya?', F_FELLI, 56, CARD, INK),
         ('s_kel1', 'KELOMPOK 1', F_CPB, 34, CARD, INK), ('s_kel2', 'KELOMPOK 2', F_CPB, 34, AMBER, INK),
         ('s_asli', 'harga asli', F_FELLI, 52, CARD, RED)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3, pa, ik, 410 + i, mono=f.startswith('Courier'))
    bk.ransom('r50', '50%', 120, 3)
    bk.ransom('r50b', '50%', 120, 5)
    bk.ransom('ry26', '2026', 110, 2)
    bk.ransom('rq', '?', 180, 4)
    bk.ransom('rx', '!', 180, 6)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    def prints_and_measure():
        bake_prints(bk, HERE)
        bk.M['hp']['screen'] = region('hp')
        bk.M['kaca']['lens'] = region('kaca', (0.33, 0.30))
        print('screen', bk.M['hp']['screen'], 'lens', bk.M['kaca']['lens'])
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], 'BIAYA LAYANAN · 2026')),
                  ('prints', prints_and_measure), ('screens', screens),
                  ('docs', lambda: (tag('tag_50', ['Rp50.000'], TAGP, [INK], 1701, w=330, h=140, sizes=(54, 36)),
                                    tag('tag_8', ['+Rp8.000'], CARD, [RED], 1702, w=330, h=140, sizes=(54, 36)),
                                    tag('tag_58', ['Rp58.000'], CARD, [RED], 1703, w=330, h=140, sizes=(54, 36)),
                                    clipping(), tickets(), chart())),
                  ('stamps', stamps), ('slips', slips)]:
        if want(g): fn(); print('baked', g)
    bk.done()
