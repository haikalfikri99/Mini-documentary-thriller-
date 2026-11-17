"""ARSIP #011 Paylater · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/paylater/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner in Google Flow
(kolase/ai/, copied into raw/ here). Episode-only work in this file:
- the blank phone screen of jempol_hp gets three printed app screens (checkout with the PAYLATER button, bank app, history list),
  drawn in ink straight into the white screen area so the thumb stays on top, plus a hand-tint map (amber button, archive-blue header);
- the blank tear-off calendar gets printed pages (JUNI 2026, HARI INI, JATUH TEMPO 30, MINGGU KE-26);
- price tags, a long receipt, a debit card, the OJK number card, the bill, the US retailer's data sheet, the before/after timeline,
  the two engraved bars (100 vs 110), the 26-week chart frame, the spending note, slips, stamps and coloured shopper silhouettes.
Prices on tags/screens (Rp250.000, $25) are illustrative and identical on purpose (the point is "same price"); the only fact
numbers are 32,8 juta rekening (OJK, data Juni 2026), +10% and 26 minggu (Maesen & Ang, Journal of Marketing). No real logos,
no provider names."""
import os, sys, json, shutil, glob
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
DK = 34   # ink grey for printed screen/calendar text (reads as full ink after the cut)


def ai_to_raw():
    """AI prints → raw/ai_<name>.jpg; always refreshed (redone images keep the same name)"""
    os.makedirs(bk.raw, exist_ok=True)
    for f in glob.glob(os.path.join(HERE, 'ai', '*.jpg')) + glob.glob(os.path.join(HERE, 'ai', '*.tint.png')):
        shutil.copy(f, os.path.join(bk.raw, 'ai_' + os.path.basename(f)))


# ---------------- printed phone screens (source pixel grid of ai/jempol_hp.jpg: screen ≈ x 216–586, y 187–854) ----------------
def _screen_mask(g):
    lab, _ = ndi.label(g > 232)
    m = lab == lab[400, 300]
    return ndi.binary_erosion(m, iterations=2)


def _ctext(d, cx, y, t, f, fill=DK):
    d.text((cx - f.getlength(t) / 2, y), t, font=f, fill=fill)


def phone_screens():
    src = Image.open(os.path.join(HERE, 'ai', 'jempol_hp.jpg')).convert('L')
    g = np.asarray(src, float); H_, W_ = g.shape
    scr = _screen_mask(g)
    X0, X1, CX = 222, 580, 401
    def make(name, ui):
        im = Image.new('L', (W_, H_), 255); d = ImageDraw.Draw(im)
        tm = Image.new('RGBA', (W_, H_), (0, 0, 0, 0)); dt = ImageDraw.Draw(tm)
        ui(d, dt)
        a = np.asarray(im, float)
        out = np.where(scr, a, g).astype(np.uint8)
        Image.fromarray(out).save(os.path.join(bk.raw, f'ai_{name}.png'))
        t = np.asarray(tm).copy(); t[~scr] = 0
        Image.fromarray(t, 'RGBA').save(os.path.join(bk.raw, f'ai_{name}.tint.png'))
    GR, AM, MA = (47, 79, 74, 255), (213, 142, 42, 255), (228, 198, 140, 200)
    def header(d, dt, text):
        dt.rectangle([X0, 187, X1, 262], fill=GR)          # archive blue-green = the system / the app
        _ctext(d, CX, 204, text, font(F_SLAB, 40), fill=255)
        # the header text stays paper colour: cut the tint out under the letters
        m = Image.new('L', (W_, 80), 0); ImageDraw.Draw(m).text((CX - font(F_SLAB, 40).getlength(text) / 2, 17), text, font=font(F_SLAB, 40), fill=255)
        dt.bitmap((0, 187), m.filter(ImageFilter.MaxFilter(3)), fill=(0, 0, 0, 0))

    def checkout(d, dt):
        header(d, dt, 'KERANJANG')
        # item row: a parcel icon + name + qty
        d.rectangle([240, 290, 330, 370], outline=DK, width=4)
        d.line([240, 318, 330, 318], fill=DK, width=3); d.line([285, 290, 285, 318], fill=DK, width=3)
        d.text((348, 292), 'Sepatu lari', font=font(F_CPB, 34), fill=DK)
        d.text((348, 334), '1 barang', font=font(F_CP, 28), fill=DK)
        d.line([236, 392, 568, 392], fill=DK, width=2)
        d.text((240, 412), 'TOTAL', font=font(F_CPB, 26), fill=DK)
        t = 'Rp250.000'; f = font(F_SLAB, 36); d.text((566 - f.getlength(t), 404), t, font=f, fill=DK)
        d.rounded_rectangle([238, 470, 564, 532], radius=12, outline=DK, width=4)
        _ctext(d, CX, 484, 'BAYAR SEKARANG', font(F_CPB, 32))
        dt.rounded_rectangle([238, 548, 564, 622], radius=14, fill=AM)
        d.rounded_rectangle([238, 548, 564, 622], radius=14, outline=DK, width=5)
        _ctext(d, CX, 560, 'PAYLATER', font(F_SLAB, 46))
        d.text((236, 660), 'bayar', font=font(F_CP, 28), fill=DK)
        d.text((236, 692), 'bulan depan', font=font(F_CP, 28), fill=DK)

    def bank(d, dt):
        header(d, dt, 'BANK')
        d.text((240, 282), 'Halo,', font=font(F_CP, 30), fill=DK)
        d.text((240, 318), 'mau ngapain?', font=font(F_CPB, 32), fill=DK)
        tiles = [('Transfer', 240, 372), ('Tagihan', 406, 372), ('Top up', 240, 470), ('PAYLATER', 406, 470)]
        for t, x, y in tiles:
            hot = t == 'PAYLATER'
            if hot: dt.rounded_rectangle([x, y, x + 158, y + 84], radius=10, fill=AM)
            d.rounded_rectangle([x, y, x + 158, y + 84], radius=10, outline=DK, width=5 if hot else 3)
            f = font(F_SLAB if hot else F_CPB, 27 if hot else 28)
            _ctext(d, x + 79, y + 26, t, f)
        d.text((240, 584), 'Limit siap', font=font(F_CP, 28), fill=DK)
        d.text((240, 616), 'dipakai', font=font(F_CP, 28), fill=DK)

    def history(d, dt):
        header(d, dt, 'RIWAYAT')
        rows = [('Paylater', 'Rp250.000'), ('Paylater', 'Rp89.000'), ('Paylater', 'Rp340.000'), ('Paylater', 'Rp125.000'),
                ('Paylater', 'Rp64.000'), ('Paylater', 'Rp199.000')]
        for i, (a, b) in enumerate(rows):
            y = 282 + i * 92
            if i == 0: dt.rectangle([X0, y - 8, X1, y + 76], fill=MA)
            d.text((240, y), a, font=font(F_CPB, 27), fill=DK)
            d.text((240, y + 38), 'belanja online', font=font(F_CP, 24), fill=DK)
            f = font(F_CPB, 27); d.text((566 - f.getlength(b), y + 2), b, font=f, fill=DK)
            d.line([236, y + 76, 568, y + 76], fill=DK, width=2)
    make('jempol_checkout', checkout); make('jempol_bank', bank); make('jempol_riwayat', history)


# ---------------- printed calendar pages (ai/kalender_sobek.jpg: torn top page x 250–640 y 330–570, page x 230–620 y 640–900) -----
def calendars():
    for name, top, big, bs in [('kal_juni', 'JUNI', '2026', 150), ('kal_hariini', 'HARI INI', '1', 260),
                               ('kal_tempo', 'JATUH TEMPO', '30', 240), ('kal_26', 'MINGGU KE-', '26', 250)]:
        im = Image.open(os.path.join(HERE, 'ai', 'kalender_sobek.jpg')).convert('L'); d = ImageDraw.Draw(im)
        f = font(F_SLAB, 64 if len(top) < 9 else 50); _ctext(d, 445, 400, top, f)
        d.line([300, 490, 600, 490], fill=DK, width=4)
        fb = font(F_SLAB, bs); _ctext(d, 420, 770 - bs * 0.62, big, fb)
        im.save(os.path.join(bk.raw, f'ai_{name}.png'))


# ---------------- documents drawn with code (world units; torn paper edge or own silhouette, never a plain white box) ----------------
def tags():
    def tag(name, price, paper, seed):
        def shape(dm, k, P):
            X = lambda v: P + v * k
            dm.polygon([(X(0), X(60)), (X(60), X(0)), (X(400), X(0)), (X(400), X(190)), (X(60), X(190)), (X(0), X(130))], fill=255)
        def draw(img, d, k, P):
            X = lambda v: P + v * k
            d.ellipse([X(26), X(80), X(56), X(110)], fill=C(INK * 1.2))
            f = font(F_CPB, 30 * k); d.text((X(84), X(22)), 'HARGA', font=f, fill=C(INK))
            f = font(F_SLAB, (72 if len(price) < 8 else 54) * k); d.text((X(80), X(70)), price, font=f, fill=C(INK))
        bk.doc(name, 400, 190, paper, draw, seed=seed, rough=0.3, shape=shape)
    tag('tag_rp', 'Rp250.000', CARD, 901)
    tag('tag_usd', '$25', CARD, 902)


def receipt():
    """a long shop receipt: many lines, the total circled later in film.js (illustrative amounts)"""
    items = [('Kaos', '89.000'), ('Sepatu lari', '250.000'), ('Headset', '199.000'), ('Botol minum', '64.000'), ('Tas', '340.000'),
             ('Charger', '125.000'), ('Kaos kaki', '35.000'), ('Lampu meja', '149.000')]
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        f = font(F_CPB, 34 * k); d.text((X(30), X(20)), 'STRUK BELANJA', font=f, fill=C(INK))
        for x in range(20, 340, 16): d.line([X(x), X(70), X(x + 8), X(70)], fill=C(INK), width=max(1, int(2 * k)))
        fr = font(F_CP, 28 * k)
        for i, (a, b) in enumerate(items):
            y = 90 + i * 52
            d.text((X(26), X(y)), a, font=fr, fill=C(INK)); d.text((X(334) - fr.getlength(b), X(y)), b, font=fr, fill=C(INK))
        y = 90 + len(items) * 52 + 10
        d.line([X(20), X(y), X(340), X(y)], fill=C(INK), width=max(2, int(3 * k)))
        fb = font(F_CPB, 36 * k); d.text((X(26), X(y + 14)), 'TOTAL', font=fb, fill=C(INK))
        t = '1.251.000'; d.text((X(334) - fb.getlength(t), X(y + 14)), t, font=fb, fill=C(RED))
    def shape(dm, k, P):
        X = lambda v: P + v * k
        pts = [(X(0), X(0)), (X(360), X(0))] + [(X(360 - i * 20), X(600 + (12 if i % 2 else 0))) for i in range(19)] + [(X(0), X(600))]
        dm.polygon(pts, fill=255)
    bk.doc('struk', 360, 615, NEWS, draw, seed=911, rough=0.4, shape=shape)


def bank_card():
    def shape(dm, k, P):
        X = lambda v: P + v * k
        dm.rounded_rectangle([X(0), X(0), X(430), X(270)], radius=int(26 * k), fill=255)
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rounded_rectangle([X(0), X(0), X(430), X(270)], radius=int(26 * k), fill=C(GREEN))
        for i in range(0, 430, 14): d.line([X(i), X(0), X(i - 120), X(270)], fill=C(GREEN * 0.86), width=max(1, int(1.4 * k)))
        f = font(F_SLAB, 44 * k); d.text((X(30), X(22)), 'BANK', font=f, fill=C(CARD))
        d.rounded_rectangle([X(36), X(104), X(106), X(158)], radius=int(8 * k), fill=C(AMBER), outline=C(INK), width=max(1, int(2 * k)))
        for y in (118, 131, 144): d.line([X(36), X(y), X(106), X(y)], fill=C(INK), width=max(1, int(1.5 * k)))
        fm = font(F_CPB, 34 * k); d.text((X(30), X(186)), '**** **** 2026', font=fm, fill=C(CARD))
        fs = font(F_CPB, 24 * k); d.text((X(250), X(110)), 'PAYLATER', font=fs, fill=C(AMBER))
    bk.doc('kartu_bank', 430, 270, CARD, draw, seed=921, rough=0.25, shape=shape)


def number_card():
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        f = font(F_SLAB, 150 * k); t = '32,8'; d.text((X(310) - f.getlength(t) / 2, X(10)), t, font=f, fill=C(INK))
        f2 = font(F_SLAB, 70 * k); t = 'JUTA'; d.text((X(310) - f2.getlength(t) / 2, X(190)), t, font=f2, fill=C(RED))
    bk.doc('kartu_angka', 620, 290, CARD, draw, seed=931, rough=0.4)


def bill():
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        f = font(F_SLAB, 44 * k); d.text((X(30), X(24)), 'TAGIHAN', font=f, fill=C(RED))
        d.line([X(24), X(92), X(456), X(92)], fill=C(INK), width=max(2, int(3 * k)))
        fr = font(F_CPB, 32 * k)
        d.text((X(30), X(112)), 'Paylater', font=fr, fill=C(INK))
        fb = font(F_SLAB, 58 * k); d.text((X(30), X(160)), 'Rp250.000', font=fb, fill=C(INK))
        d.text((X(30), X(250)), 'jatuh tempo: 30 hari', font=font(F_CP, 30 * k), fill=C(INK))
    bk.doc('tagihan', 480, 310, NEWS, draw, seed=941, rough=0.45)


def us_docs():
    def env(img, d, k, P):
        X = lambda v: P + v * k
        w, h = 520, 320   # airmail border in the archive palette
        for j, x in enumerate(range(0, w, 30)):
            col = C(RED) if j % 2 == 0 else C(GREEN)
            d.polygon([(X(x), X(0)), (X(x + 15), X(0)), (X(x + 3), X(16)), (X(x - 12), X(16))], fill=col)
            d.polygon([(X(x), X(h - 16)), (X(x + 15), X(h - 16)), (X(x + 3), X(h)), (X(x - 12), X(h))], fill=col)
        f = font(F_CPB, 30 * k); d.text((X(40), X(48)), 'DATA TRANSAKSI', font=f, fill=C(INK))
        d.text((X(40), X(88)), 'peritel besar', font=font(F_CP, 30 * k), fill=C(INK))
        d.rectangle([X(392), X(40), X(482), X(140)], outline=C(INK), width=max(2, int(3 * k)))
        for y in range(52, 132, 12): d.line([X(402), X(y), X(472), X(y)], fill=C(INK * 2.6), width=max(1, int(1.2 * k)))
        for y in (196, 236): d.line([X(160), X(y), X(470), X(y)], fill=C(INK * 2), width=max(1, int(2 * k)))
    bk.doc('amplop', 520, 320, CARD, env, seed=951, rough=0.35)

    rows = [('03/02', 'Belanjaan', '$41,20'), ('03/02', 'Belanjaan', '$18,75'), ('04/02', 'Belanjaan', '$66,10'), ('05/02', 'Belanjaan', '$25,00'),
            ('06/02', 'Belanjaan', '$52,40'), ('07/02', 'Belanjaan', '$33,90'), ('08/02', 'Belanjaan', '$47,30')]
    def sheet(img, d, k, P):
        X = lambda v: P + v * k
        f = font(F_SLAB, 40 * k); d.text((X(30), X(22)), 'DATA PEMBELI', font=f, fill=C(INK))
        fh = font(F_CPB, 28 * k)
        for x, t in [(30, 'TGL'), (180, 'ISI'), (440, 'TOTAL')]: d.text((X(x), X(90)), t, font=fh, fill=C(INK))
        d.line([X(24), X(128), X(596), X(128)], fill=C(INK), width=max(2, int(3 * k)))
        fr = font(F_CP, 28 * k)
        for i, r in enumerate(rows):
            y = 142 + i * 50
            for x, t in zip((30, 180, 440), r): d.text((X(x), X(y)), t, font=fr, fill=C(INK))
            d.line([X(24), X(y + 44), X(596), X(y + 44)], fill=C(INK * 3), width=max(1, int(1.2 * k)))
    bk.doc('lembar_data', 620, 520, NEWS, sheet, seed=961, rough=0.5)


def timeline():
    """before/after strip: a time axis, the day the retailer switched paylater on (amber line)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(3, int(5 * k))
        d.line([X(30), X(160), X(870), X(160)], fill=C(INK), width=w)
        for x in range(30, 880, 60): d.line([X(x), X(148), X(x), X(172)], fill=C(INK), width=max(2, int(3 * k)))
        d.rectangle([X(442), X(20), X(458), X(200)], fill=C(AMBER))
        f = font(F_SLAB, 52 * k)
        d.text((X(230) - f.getlength('SEBELUM') / 2, X(40)), 'SEBELUM', font=f, fill=C(INK))
        d.text((X(670) - f.getlength('SESUDAH') / 2, X(40)), 'SESUDAH', font=f, fill=C(INK))
        fs = font(F_CPB, 30 * k); t = 'paylater tersedia'; d.text((X(450) - fs.getlength(t) / 2, X(206)), t, font=fs, fill=C(INK))
    bk.doc('garis_waktu', 900, 260, CARD, draw, seed=971, rough=0.4)


def bars():
    bk.bar('bar_100', 500, 70, seed=981, wash=NEWS)
    bk.bar('bar_110', 550, 70, seed=982, wash=AMBER)


def chart():
    """26-week chart frame: axes, week ticks, the day paylater arrives (amber); the line itself is drawn live in film.js"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(3, int(5 * k))
        d.line([X(70), X(30), X(70), X(420), X(860), X(420)], fill=C(INK), width=w)
        for y in range(80, 420, 68): d.line([X(70), X(y), X(860), X(y)], fill=C(INK * 3.2), width=max(1, int(1.5 * k)))
        f = font(F_CPB, 30 * k)
        for i, wk in enumerate([0, 13, 26]):
            x = 200 + i * 300
            d.line([X(x), X(410), X(x), X(436)], fill=C(INK), width=max(2, int(3 * k)))
            t = str(wk); d.text((X(x) - f.getlength(t) / 2, X(440)), t, font=f, fill=C(INK))
        fs = font(F_SLAB, 40 * k); d.text((X(500), X(480)), 'MINGGU', font=fs, fill=C(INK))
        d.text((X(14), X(14)), 'BELANJA', font=font(F_CPB, 28 * k), fill=C(INK))
        d.rectangle([X(194), X(40), X(206), X(420)], fill=C(AMBER))
    bk.doc('grafik', 900, 540, CARD, draw, seed=991, rough=0.4)


def spend_note():
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        for y in range(110, 440, 52): d.line([X(20), X(y), X(480), X(y)], fill=C(GREEN * 1.6), width=max(1, int(1.5 * k)))
        d.line([X(70), X(0), X(70), X(460)], fill=C(RED * 1.1), width=max(1, int(2 * k)))
        f = font(F_CPB, 34 * k); d.text((X(86), X(40)), 'UANG KELUAR', font=f, fill=C(INK))
        fh = font(F_FELLI, 40 * k); d.text((X(86), X(120)), 'hari ini:', font=fh, fill=C(INK))
        fb = font(F_SLAB, 96 * k); d.text((X(110), X(190)), 'Rp0', font=fb, fill=C(INK))
        d.text((X(86), X(350)), 'aman...', font=fh, fill=C(INK))
    bk.doc('catatan', 500, 460, CARD, draw, seed=1001, rough=0.5)


def silhouettes():
    """coloured copies of the series silhouette (shoppers): archive blue-green and amber"""
    base = Image.open(os.path.join(bk.out, 'sil_man.png')).convert('RGBA')
    a = np.asarray(base, float)
    for suf, col in [('g', GREEN), ('a', AMBER * 0.92)]:
        tex = a[..., :3].mean(2, keepdims=True) / max(1, a[..., :3].mean())
        rgb = np.clip(col[None, None, :] * (0.9 + 0.1 * tex), 0, 255)
        Image.fromarray(np.dstack([rgb, a[..., 3:]]).astype(np.uint8), 'RGBA').save(os.path.join(bk.out, f'sil_man_{suf}.png'))
        bk.M[f'sil_man_{suf}'] = dict(bk.M['sil_man'])


def stamps():
    for name, text, size, color, seed, sub in [
            ('st_harga', 'HARGA SAMA', 110, RED, 81, None), ('st_bayar', 'BAYAR HARI INI', 92, RED, 82, None),
            ('st_tagihan', 'MENUNGGU', 96, RED, 83, None), ('st_bertahan', 'BERTAHAN', 104, GREEN * 0.85, 84, None),
            ('st_sama', 'SAMA', 120, GREEN * 0.85, 85, None)]:
        bk.stamp(name, text, size, color, seed=seed, sub=sub, legible=True)
    bk.flat('hl_amber', AMBER, poly=[(-200, -36), (200, -40), (204, 36), (-198, 40)], seed=1051, rough=2, mottle=0.03)
    bk.mark('m_circle_a', 'circle', 300, AMBER * 0.85, seed=1052, width=0.05)


def slips():
    T = [('s_paylater_bank', 'PAYLATER BANK', F_SLAB, 52, GREEN, CARD), ('s_rekening', 'REKENING', F_SLAB, 60, CARD, INK),
         ('s_ojk', 'data OJK, Juni 2026', F_CP, 30, NEWS, INK),
         ('s_sekarang', 'BELANJA SEKARANG', F_CPB, 46, CARD, INK), ('s_nanti', 'BAYAR NANTI', F_CPB, 46, AMBER, INK),
         ('s_as', 'AMERIKA SERIKAT', F_SLAB, 54, CARD, INK), ('s_peneliti', 'peneliti', F_CPB, 44, CARD, INK),
         ('s_peritel', 'PERITEL BESAR', F_CPB, 44, CARD, INK),
         ('s_barang', 'BARANG', F_CPB, 48, CARD, INK), ('s_plus10', '+10%', F_SLAB, 110, AMBER, INK),
         ('s_sesaat', 'lonjakan sesaat', F_FELLI, 46, NEWS, INK), ('s_26', '26 MINGGU', F_SLAB, 64, AMBER, INK),
         ('s_6bln', '= setengah tahun', F_FELLI, 44, CARD, INK),
         ('s_boros', 'BOROS?', F_SLAB, 96, CARD, INK), ('s_longgar', 'TERASA LONGGAR', F_SLAB, 56, AMBER, INK),
         ('s_belum', 'BELUM KELUAR', F_SLAB, 56, GREEN, CARD), ('s_tebal', 'masih tebal', F_FELLI, 44, CARD, INK),
         ('s_kamu', 'belanjaan terakhirmu', F_FELLI, 46, CARD, INK), ('s_sebelum_s', 'SEBELUM', F_CPB, 44, CARD, INK),
         ('s_sesudah_s', 'SESUDAH', F_CPB, 44, AMBER, INK), ('s_hariini', 'HARI INI', F_CPB, 48, CARD, INK),
         ('s_eq', 'Rp250.000 = Rp250.000', F_CPB, 46, CARD, INK)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.0, pa, ik, 410 + i, mono=f.startswith('Courier'))
    for i, m in enumerate(['JAN', 'FEB', 'MAR', 'APR', 'MEI']):   # loose calendar sheets torn off before June
        bk.strip('s_' + m.lower(), m, F_SLAB, 58, CARD, INK, 470 + i, padx=26, pady=14)
    bk.ransom('rpl', 'PAYLATER', 120, 3)
    bk.ransom('rq', '?', 190, 4)


if __name__ == '__main__':
    ai_to_raw(); phone_screens(); calendars()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('docs', lambda: (tags(), receipt(), bank_card(), number_card(), bill(), us_docs(), timeline(), bars(), chart(), spend_note())),
                  ('sil', silhouettes), ('stamps', stamps), ('slips', slips), ('prints', lambda: bake_prints(bk, HERE))]:
        if want(g): fn(); print('baked', g)
    bk.done()
