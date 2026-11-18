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
    """legibility pass (18 Nov 2026): every row ≥ 8.5 % of the screen width (≈ 30 px on screen at phone scale ≥ 1.15);
    small phones get MINI screens (one big price + button, ruled lines instead of fine print); the US ticket screens carry
    illustrative dollar values (fee ≈ 15 % of the ticket, as in the study) instead of bars"""
    sw, sh = bk.M['hp']['screen'][2:4]
    sw, sh = sw - 6, sh - 6                      # stay inside the bezel
    rr = sw * 0.09
    shape = lambda dm, k, P: dm.rounded_rectangle([P, P, P + sw * k, P + sh * k], radius=rr * k, fill=255)
    U = sw / 100                                 # screen unit: 1 % of the width
    B = bk.B
    rows = {}
    F = lambda sz: font(F_OSW, sz * U * B)
    right = lambda d, X, t, f, y, col=INK: d.text((X(94 * U) - f.getlength(t), X(y)), t, font=f, fill=C(col))

    def frame(d, X, title, size=9):
        d.rounded_rectangle([X(0), X(0), X(sw), X(sh)], radius=rr * B, fill=C(WHITE))
        d.rectangle([X(0), X(sh * 0.045), X(sw), X(sh * 0.125)], fill=C(CARD * 0.96))
        d.text((X(6 * U), X(sh * 0.05)), '<  ' + title, font=F(size), fill=C(INK))
        d.line([X(0), X(sh * 0.125), X(sw), X(sh * 0.125)], fill=C(GREY), width=2)

    def button(d, X, text, size=10, y=None):
        y = sh * 0.83 if y is None else y
        d.rounded_rectangle([X(8 * U), X(y), X(92 * U), X(y + sh * 0.095)], radius=4 * U * B, fill=C(GREEN))
        f = F(size); d.text((X(50 * U) - f.getlength(text) / 2, X(y + sh * 0.012)), text, font=f, fill=C(CARD))
        return [0, y + sh * 0.0475 - sh / 2]

    def boxicon(d, X, bx, by, bs):
        d.polygon([(X(bx), X(by + bs * 0.3)), (X(bx + bs * 0.5), X(by)), (X(bx + bs), X(by + bs * 0.3)), (X(bx + bs), X(by + bs)),
                   (X(bx + bs * 0.5), X(by + bs * 1.25)), (X(bx), X(by + bs))], fill=C(MANILA), outline=C(INK))
        d.line([X(bx), X(by + bs * 0.3), X(bx + bs * 0.5), X(by + bs * 0.58), X(bx + bs), X(by + bs * 0.3)], fill=C(INK), width=2)
        d.line([X(bx + bs * 0.5), X(by + bs * 0.58), X(bx + bs * 0.5), X(by + bs * 1.25)], fill=C(INK), width=2)

    def ruled(d, X, y0, n, gap):
        r = np.random.default_rng(int(y0))
        for j in range(n): d.line([X(6 * U), X(y0 + j * gap), X(6 * U + r.uniform(40, 80) * U), X(y0 + j * gap)], fill=C(GREY * 1.15), width=max(2, int(2.2 * U * B)))

    PY = sh * 0.16                               # price block top
    def price_block(d, X, label):
        d.rounded_rectangle([X(5 * U), X(PY), X(95 * U), X(PY + sh * 0.20)], radius=3 * U * B, outline=C(GREY), width=2)
        boxicon(d, X, 10 * U, PY + sh * 0.045, 20 * U)
        d.text((X(36 * U), X(PY + sh * 0.02)), label, font=F(8.5), fill=C(GREY))
        right(d, X, 'Rp50.000', F(17), PY + sh * 0.075)
    price_y = PY + sh * 0.075 + 17 * U * 0.72 - sh / 2      # glyph centre of the big price
    price_x = 94 * U - F(17).getlength('Rp50.000') / B / 2 - sw / 2

    def keranjang(img, d, k, P):
        X = lambda v: P + v * k
        frame(d, X, 'Keranjang'); price_block(d, X, '1 barang')
        d.line([X(6 * U), X(sh * 0.62), X(94 * U), X(sh * 0.62)], fill=C(GREY), width=2)
        d.text((X(6 * U), X(sh * 0.655)), 'Total', font=F(8.5), fill=C(INK)); right(d, X, 'Rp50.000', F(12), sh * 0.645)
        rows['k_btn'] = button(d, X, 'CHECKOUT')
    bk.doc('scr_keranjang', sw, sh, WHITE, keranjang, seed=1801, rough=0.02, amp=0.02, shape=shape, ink=1, over=1)

    def bayar(img, d, k, P):
        X = lambda v: P + v * k
        frame(d, X, 'Checkout'); price_block(d, X, 'Harga barang')
        d.line([X(6 * U), X(sh * 0.40), X(94 * U), X(sh * 0.40)], fill=C(GREY), width=2)
        d.line([X(6 * U), X(sh * 0.58), X(94 * U), X(sh * 0.58)], fill=C(INK), width=3)
        d.text((X(6 * U), X(sh * 0.61)), 'Total bayar', font=F(9), fill=C(INK))
        rows['b_btn'] = button(d, X, 'BAYAR')
    bk.doc('scr_bayar', sw, sh, WHITE, bayar, seed=1802, rough=0.02, amp=0.02, shape=shape, ink=1, over=1)
    rows['k_price'] = rows['b_price'] = [round(price_x, 1), round(price_y, 1)]

    # the small grey row (loop detail; still ≥ 8.5 % width) and the total values: separate ink, they appear live
    fr = F(8.5)
    img = Image.new('L', (int(88 * U * B) + 20, int(13 * U * B) + 20), 0); dd = ImageDraw.Draw(img)
    dd.text((10, 6), 'Biaya layanan', font=fr, fill=255); t = 'Rp8.000'; dd.text((10 + 88 * U * B - fr.getlength(t), 6), t, font=fr, fill=255)
    bk.save('sx_biaya', (GREY * 0.8)[None, None, :], np.asarray(img, float) / 255 * 0.95, ink=1)
    rows['b_biaya'] = [0, round(sh * 0.49 - sh / 2, 1)]
    for v in ['50.000', '52.000', '55.000', '58.000']:
        inktext('sx_t' + v[:2], 'Rp' + v, F_OSW, 17 * U, INK)
    inktext('sx_t58r', 'Rp58.000', F_OSW, 17 * U, RED)
    tw = F(17).getlength('Rp58.000') / B
    rows['b_total'] = [round(94 * U - tw / 2 - sw / 2, 1), round(sh * 0.715 - sh / 2, 1)]

    # MINI screens for phones drawn small (scale 0.55–0.7): title, one big price, ruled lines, button
    def mini(title, price, btn):
        def draw(img, d, k, P):
            X = lambda v: P + v * k
            frame(d, X, title, size=13)
            boxicon(d, X, 8 * U, sh * 0.19, 26 * U)
            f = F(24); d.text((X(50 * U) - f.getlength(price) / 2, X(sh * 0.37)), price, font=f, fill=C(INK))
            ruled(d, X, sh * 0.56, 3, sh * 0.055)
            button(d, X, btn, size=15, y=sh * 0.80)
        return draw
    bk.doc('scr_k_mini', sw, sh, WHITE, mini('Keranjang', 'Rp50.000', 'CHECKOUT'), seed=1805, rough=0.02, amp=0.02, shape=shape, ink=1, over=1)
    bk.doc('scr_b_mini', sw, sh, WHITE, mini('Checkout', 'Rp50.000', 'BAYAR'), seed=1806, rough=0.02, amp=0.02, shape=shape, ink=1, over=1)

    # US ticket screens (phone scale ≈ 0.72): rows 13 % of width; $ values = ILUSTRASI (fee ≈ 15 %)
    RY = [sh * 0.30, sh * 0.42, sh * 0.56]
    def us(vals):
        def draw(img, d, k, P):
            X = lambda v: P + v * k
            frame(d, X, 'Tiket konser', size=12)
            for (lab_, v, col), y in zip(vals, RY):
                d.text((X(6 * U), X(y)), lab_, font=F(13), fill=C(col))
                if v: right(d, X, v, F(13), y, col)
            d.line([X(6 * U), X(RY[2] - sh * 0.015), X(94 * U), X(RY[2] - sh * 0.015)], fill=C(INK), width=3)
            button(d, X, 'BELI', size=14)
        return draw
    bk.doc('scr_depan', sw, sh, WHITE, us([('Harga', '$100', INK), ('Biaya', '$15', RED * 0.9), ('Total', '$115', INK)]),
           seed=1803, rough=0.02, amp=0.02, shape=shape, ink=1, over=1)
    bk.doc('scr_akhir', sw, sh, WHITE, us([('Harga', '$100', INK), ('Biaya', '', RED * 0.9), ('Total', '', INK)]),
           seed=1804, rough=0.02, amp=0.02, shape=shape, ink=1, over=1)
    f13 = F(13)
    for n, t, col in [('sx_us_dash', '—', GREY), ('sx_us_15', '$15', RED * 0.9), ('sx_us_100', '$100', INK), ('sx_us_115', '$115', INK)]:
        inktext(n, t, F_OSW, 13 * U, col)
    for n, y, t in [('us_biaya', RY[1], '$15'), ('us_total', RY[2], '$115')]:
        rows[n] = [round(94 * U - f13.getlength(t) / B / 2 - sw / 2, 1), round(y + 13 * U * 0.62 - sh / 2, 1)]
    bk.M['_rows'] = {k: [round(v[0], 1), round(v[1], 1)] for k, v in rows.items()}
    marker('hl_amber', 300, 40, AMBER, 1901)
    marker('hl_amber_l', 520, 70, AMBER, 1902, 0.5)
    marker('hl_price', 200, 66, AMBER, 1903)
    bk.mark('m_tick_b', 'tick', 200, GREEN * 0.9, seed=1904, width=0.17)


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
        f = font(F_CPB, 30 * k); d.text((X(34), X(22)), 'KLIPING · 13 OKT 2026', font=f, fill=C(INK))
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
        fs = font(F_CPB, 32 * k); d.text((X(52), X(y0 + 236)), '— YLKI', font=fs, fill=C(INK))
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
            f1 = font(F_CPB, 38 * k); f2 = font(F_SLAB, 46 * k if len(mid) < 7 else 36 * k)
            d.text((X(30), X(30)), top, font=f1, fill=C(INK)); d.text((X(30), X(78)), mid, font=f2, fill=C(INK))
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
    T = [('s_hook', 'SATU BARANG, DUA HARGA', F_SLAB, 50, CARD, INK), ('s_ilustrasi', 'ILUSTRASI', F_CPB, 30, NEWS, INK),
         ('lbl_id', 'DATA INDONESIA · 2026', F_CPB, 34, GREEN, CARD), ('lbl_as', 'EKSPERIMEN AS · 2015', F_CPB, 34, NEWS, INK),
         ('s_halbayar', 'halaman bayar', F_CPB, 40, CARD, INK), ('s_keranjang', 'masuk keranjang', F_CPB, 40, AMBER, INK),
         ('s_ylki', 'YLKI · 13 OKT', F_SLAB, 44, CARD, INK), ('s_pembeli', 'dibebankan ke pembeli', F_CPB, 36, AMBER, INK),
         ('s_jutaan', 'jutaan pembeli tiket', F_CPB, 38, CARD, INK), ('s_awal', 'biaya sejak awal', F_CPB, 36, CARD, INK),
         ('s_akhir', 'biaya pas mau bayar', F_CPB, 36, AMBER, INK), ('s_seperlima', '+ SEPERLIMA', F_SLAB, 52, AMBER, INK),
         ('s_panggung', 'dekat panggung', F_FELLI, 50, AMBER, INK), ('s_usd', '$100 jadi $115', F_SLAB, 44, AMBER, INK), ('s_ilus_us', 'ILUSTRASI', F_CPB, 30, NEWS, INK), ('s_selisih', 'selisih kecil', F_FELLI, 54, CARD, INK),
         ('s_murah', 'harga awal', F_CPB, 40, CARD, INK), ('s_efek', 'efeknya?', F_FELLI, 56, CARD, INK),
         ('s_kel1', 'KELOMPOK 1', F_CPB, 34, CARD, INK), ('s_half1', 'KELOMPOK 1 · 50%', F_CPB, 34, CARD, INK), ('s_half2', 'KELOMPOK 2 · 50%', F_CPB, 34, AMBER, INK), ('s_kel2', 'KELOMPOK 2', F_CPB, 34, AMBER, INK),
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
