"""ARSIP #016 Satu Baris Kosong di Kartu Keluarga Ini Jadi Rebutan · bake every paper part into parts/ (ARSIP Kolase).
   python3 stories/zonasi/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner in Google
Flow (kolase/ai/, copied into raw/ here; gedung_sekolah gets two tiny AI pseudo-letter patches whitened). This file draws what is
special to the episode: a generic, fictional Kartu Keluarga (no emblem, no NIK, names as blurred ink bars, one EMPTY member row = the
Conceptual Loop detail, alamat line highlighted), the hand-written new name for that row, two 10-row KK of the Ombudsman DIY 2023
finding (6 + 5 rows highlighted), a generic distance map (school, houses, the far 'real' house), the 1-year timeline card, three
report folders, split-screen panels, stamps and slips. No real logos, names, addresses or document numbers."""
import os, sys, json, shutil, glob, math
import numpy as np
from PIL import Image, ImageDraw
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
KKP = CARD * 0.97 + GREEN * 0.03          # KK paper: cream with a faint green cast
HL = AMBER * 0.85 + CARD * 0.15


def ai_to_raw():
    """AI prints → raw/ai_<name>.jpg; always refreshed. gedung_sekolah: whiten two tiny AI pseudo-letter patches (step + grass)."""
    os.makedirs(bk.raw, exist_ok=True)
    for f in glob.glob(os.path.join(HERE, 'ai', '*.jpg')):
        dst = os.path.join(bk.raw, 'ai_' + os.path.basename(f))
        if os.path.basename(f) == 'tangan_tulis.jpg':      # the hand alone: whiten its own paper form, keep the pen tip
            im = Image.open(f).convert('RGB'); W0, H0 = im.size; a = np.asarray(im).copy()
            yy, xx = np.mgrid[:H0, :W0]
            a[(yy > 0.635 * H0) & ~((xx > 0.76 * W0) & (xx < 0.87 * W0) & (yy < 0.69 * H0))] = 250
            Image.fromarray(a).save(dst, quality=95); continue
        if os.path.basename(f) == 'gedung_sekolah.jpg':
            im = Image.open(f).convert('RGB'); d = ImageDraw.Draw(im)
            for box in [(422, 588, 464, 607), (216, 682, 338, 705)]: d.rectangle(box, fill=(250, 250, 248))
            im.save(dst, quality=95)
        else:
            shutil.copy(f, dst)


def bars(d, X, x0, y, w, k, seed, col=INK * 2.4, h=12):
    """blurred data: an ink bar instead of a name/number (no real or fake personal data)"""
    r = np.random.default_rng(seed)
    x = x0
    while x < x0 + w - 20:
        ww = r.uniform(40, 110); ww = min(ww, x0 + w - x)
        d.rounded_rectangle([X(x), X(y), X(x + ww), X(y + h)], radius=max(1, int(4 * k)), fill=C(col))
        x += ww + r.uniform(10, 18)


# ---------------- the hero Kartu Keluarga (frame 0) ----------------
# Legibility (user, 18 Nov 2026): every readable word is >= 30 px on screen at the smallest scale it is shown (frame 0: s 0.96).
KW, KH = 760, 630
TOP, ROW0, ROWH = 306, 354, 50            # table top, first data row y, row height (world units in the doc)
CN, CR = 74, 440                          # column lines: No | Nama Lengkap | Hubungan


def kk(name):
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rectangle([X(0), X(0), X(KW), X(14)], fill=C(GREEN * 1.05))
        fh = font(F_SLAB, 46 * k); t = 'KARTU KELUARGA'; d.text((X(KW / 2) - fh.getlength(t) / 2, X(22)), t, font=fh, fill=C(INK))
        f = font(F_CPB, 31 * k)
        d.text((X(230), X(80)), 'No.', font=f, fill=C(INK)); bars(d, X, 300, 90, 230, k, 3, h=14)
        d.polygon([(X(16), X(166)), (X(660), X(163)), (X(662), X(207)), (X(18), X(209))], fill=C(HL))   # alamat highlight UNDER the type
        y = 128
        for a_, b_ in [('Kepala Keluarga', None), ('Alamat', 'Jl. Melati No. 7'), ('RT/RW', '003/005'), ('Tgl. terbit', '12-06-2025')]:
            d.text((X(26), X(y)), a_, font=f, fill=C(INK)); d.text((X(314), X(y)), ':', font=f, fill=C(INK))
            if b_: d.text((X(340), X(y)), b_, font=f, fill=C(INK))
            else: bars(d, X, 340, y + 10, 260, k, int(y), h=14)
            y += 42
        x0, x1 = 18, KW - 18
        d.rectangle([X(x0), X(TOP), X(x1), X(ROW0 + 5 * ROWH)], outline=C(INK), width=max(2, int(2.5 * k)))
        d.rectangle([X(x0), X(TOP), X(x1), X(ROW0)], fill=C(GREEN * 1.05))
        fc = font(F_CPB, 30 * k)
        for t, x in [('No', x0 + 8), ('Nama Lengkap', CN + 12), ('Hubungan', CR + 12)]: d.text((X(x), X(TOP + 8)), t, font=fc, fill=C(CARD))
        for xx in (CN, CR): d.line([X(xx), X(TOP), X(xx), X(ROW0 + 5 * ROWH)], fill=C(INK), width=max(1, int(2 * k)))
        rel = ['KEPALA KELUARGA', 'ISTRI', 'ANAK', 'ANAK', '']
        for i in range(5):
            yy = ROW0 + i * ROWH
            if i: d.line([X(x0), X(yy), X(x1), X(yy)], fill=C(INK * 1.6), width=max(1, int(1.5 * k)))
            d.text((X(x0 + 18), X(yy + 9)), str(i + 1), font=f, fill=C(INK))
            if rel[i]:
                bars(d, X, CN + 14, yy + 18, 330, k, 40 + i, h=14)
                d.text((X(CR + 10), X(yy + 10)), rel[i], font=fc, fill=C(INK))
        d.rectangle([X(4), X(4), X(KW - 4), X(KH - 4)], outline=C(INK * 2.2), width=max(1, int(2 * k)))
    m = bk.doc(name, KW, KH, KKP, draw, seed=1601, rough=0.35)
    # world offsets from the doc centre (film.js): the empty row 5 (name cell start, relation cell start), alamat line, issue date
    yr5 = ROW0 + 4 * ROWH + ROWH / 2 - KH / 2
    m['row5'] = [CN + 14 - KW / 2, yr5]; m['row5_rel'] = [CR + 10 - KW / 2, yr5]
    m['alamat'] = [340 - KW / 2, 186 - KH / 2]
    m['tanggal'] = [433 - KW / 2, 270 - KH / 2]


def kk_icon():
    """small KK for corners/props: only the big title + an amber alamat bar (readable at s >= 0.5)"""
    W_, H_ = 420, 300
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rectangle([X(0), X(0), X(W_), X(14)], fill=C(GREEN * 1.05))
        fh = font(F_SLAB, 62 * k)
        for t, y in [('KARTU', 22), ('KELUARGA', 92)]: d.text((X(W_ / 2) - fh.getlength(t) / 2, X(y)), t, font=fh, fill=C(INK))
        d.polygon([(X(24), X(184)), (X(W_ - 24), X(181)), (X(W_ - 22), X(210)), (X(26), X(212))], fill=C(HL))
        bars(d, X, 40, 190, 330, k, 7, h=14)
        for j in range(2): bars(d, X, 40, 236 + j * 28, 330, k, 9 + j, h=12)
        d.rectangle([X(4), X(4), X(W_ - 4), X(H_ - 4)], outline=C(INK * 2.2), width=max(1, int(2 * k)))
    m = bk.doc('kk_ikon', W_, H_, KKP, draw, seed=1611, rough=0.35)
    m['alamat'] = [0, 197 - H_ / 2]


def kk_frag():
    """the closing piece: a torn strip of the KK with title, alamat and the filled row 5 (two identical copies in film.js)"""
    W_, H_ = 560, 270
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rectangle([X(0), X(0), X(W_), X(12)], fill=C(GREEN * 1.05))
        fh = font(F_SLAB, 38 * k); t = 'KARTU KELUARGA'; d.text((X(W_ / 2) - fh.getlength(t) / 2, X(20)), t, font=fh, fill=C(INK))
        d.polygon([(X(14), X(80)), (X(W_ - 14), X(77)), (X(W_ - 12), X(126)), (X(16), X(128))], fill=C(HL))
        f = font(F_CPB, 36 * k)
        d.text((X(22), X(86)), 'Alamat', font=f, fill=C(INK)); d.text((X(178), X(84)), 'Jl. Melati No. 7', font=font(F_CPB, 36 * k), fill=C(INK))
        y0, y1 = 150, 240
        d.rectangle([X(14), X(y0), X(W_ - 14), X(y1)], outline=C(INK), width=max(2, int(2.5 * k)))
        for xx in (74, 350): d.line([X(xx), X(y0), X(xx), X(y1)], fill=C(INK), width=max(1, int(2 * k)))
        d.text((X(32), X(y0 + 22)), '5', font=f, fill=C(INK))
        d.text((X(92), X(y0 + 12)), 'Raka', font=font(F_FELLI, 58 * k), fill=C(INK * 0.9 + GREEN * 0.1))
        d.text((X(368), X(y0 + 24)), 'CUCU', font=font(F_CPB, 38 * k), fill=C(INK * 0.9 + GREEN * 0.1))
    m = bk.doc('kk_frag', W_, H_, KKP, draw, seed=1621, rough=0.6, amp=0.35)
    m['nama'] = [150 - W_ / 2, 195 - H_ / 2]


def handwriting():
    """ink-only hand-written entries for the empty row (revealed letter by letter with typed() in film.js)"""
    for name, text, fnt, size in [('nm_baru', 'Raka', F_FELLI, 52), ('nm_cucu', 'CUCU', F_CPB, 32)]:
        B = bk.B; f = font(fnt, size * B)
        w = int(f.getlength(text) + 8 * B); asc, desc = f.getmetrics(); h = asc + desc + int(6 * B)
        img = Image.new('L', (w, h), 0); ImageDraw.Draw(img).text((4 * B, 3 * B), text, font=f, fill=255)
        a = np.asarray(img, float) / 255 * 0.95
        a[0, 0] = 0.01; a[-1, -1] = 0.01                      # keep the full box (typed() clips by width)
        mm = bk.save(name, (INK * 0.9 + GREEN * 0.1)[None, None, :], a, ink=1)
        mm['n'] = len(text); mm['tx'] = 4


# ---------------- two 10-row KK of the DIY 2023 finding ----------------
def kk10(name, hl_from=None):
    W_, rows, rh, top = 470, 10, 44, 104
    H_ = top + rows * rh + 28
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rectangle([X(0), X(0), X(W_), X(12)], fill=C(GREEN * 1.05))
        fh = font(F_SLAB, 36 * k); t = 'KARTU KELUARGA'; d.text((X(W_ / 2) - fh.getlength(t) / 2, X(18)), t, font=fh, fill=C(INK))
        bars(d, X, 120, 70, 230, k, sum(map(ord, name)))
        x0, x1 = 18, W_ - 18
        if hl_from is not None:
            for i in range(hl_from, rows):
                yy = top + i * rh
                d.polygon([(X(x0 + 2), X(yy + 4)), (X(x1 - 2), X(yy + 2)), (X(x1 - 3), X(yy + rh - 3)), (X(x0 + 3), X(yy + rh - 2))], fill=C(HL))
        d.rectangle([X(x0), X(top), X(x1), X(top + rows * rh)], outline=C(INK), width=max(2, int(2.5 * k)))
        f = font(F_CPB, 20 * k)
        for i in range(rows):
            yy = top + i * rh
            if i: d.line([X(x0), X(yy), X(x1), X(yy)], fill=C(INK * 1.6), width=max(1, int(1.5 * k)))
            d.text((X(x0 + 10), X(yy + 10)), str(i + 1), font=f, fill=C(INK))
            bars(d, X, 70, yy + 16, 220, k, 300 + i + len(name))
            bars(d, X, 320, yy + 16, 110, k, 400 + i + len(name))
        d.line([X(58), X(top), X(58), X(top + rows * rh)], fill=C(INK), width=max(1, int(2 * k)))
        d.line([X(305), X(top), X(305), X(top + rows * rh)], fill=C(INK), width=max(1, int(2 * k)))
        d.rectangle([X(4), X(4), X(W_ - 4), X(H_ - 4)], outline=C(INK * 2.2), width=max(1, int(2 * k)))
    bk.doc(name, W_, H_, KKP, draw, seed=1700 + len(name), rough=0.35)


# ---------------- distance map (school, houses; ring and routes drawn live in film.js) ----------------
MW, MH = 900, 620
SCHOOL = (560, 300)
HOUSES = [(470, 220), (650, 230), (500, 400), (640, 390), (420, 320), (700, 320), (580, 170), (560, 440)]
FAR = (150, 540)


def house_icon(d, X, x, y, s, col, k):
    d.polygon([(X(x - 16 * s), X(y)), (X(x), X(y - 16 * s)), (X(x + 16 * s), X(y))], fill=C(col))
    d.rectangle([X(x - 12 * s), X(y), X(x + 12 * s), X(y + 16 * s)], fill=C(col))
    d.rectangle([X(x - 3 * s), X(y + 6 * s), X(x + 3 * s), X(y + 16 * s)], fill=C(CARD))


def peta():
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        # blocks (hatched) between streets
        streets_x, streets_y = [90, 250, 400, 520, 610, 760], [110, 260, 350, 480]
        for i in range(len(streets_x) - 1):
            for j in range(len(streets_y) - 1):
                xa, xb, ya, yb = streets_x[i] + 14, streets_x[i + 1] - 14, streets_y[j] + 14, streets_y[j + 1] - 14
                d.rectangle([X(xa), X(ya), X(xb), X(yb)], fill=C(MANILA * 0.93))
                for t in range(int(xa), int(xb), 9): d.line([X(t), X(ya), X(min(xb, t + (yb - ya))), X(min(yb, ya + (xb - t)))], fill=C(MANILA * 0.78), width=1)
        for x in streets_x: d.line([X(x), X(60), X(x), X(MH - 30)], fill=C(INK * 3.0), width=max(2, int(3 * k)))
        for y in streets_y: d.line([X(30), X(y), X(MW - 30), X(y)], fill=C(INK * 3.0), width=max(2, int(3 * k)))
        d.line([X(30), X(560), X(MW - 30), X(520)], fill=C(INK * 2.2), width=max(3, int(5 * k)))     # main road
        for (x, y) in HOUSES: house_icon(d, X, x, y, 1.0, INK * 1.4, k)
        # the school: a bigger building with a flag
        sx, sy = SCHOOL
        d.rectangle([X(sx - 48), X(sy - 14), X(sx + 48), X(sy + 24)], fill=C(GREEN), outline=C(INK), width=max(1, int(2 * k)))
        d.polygon([(X(sx - 56), X(sy - 14)), (X(sx), X(sy - 42)), (X(sx + 56), X(sy - 14))], fill=C(INK * 1.3))
        d.line([X(sx + 62), X(sy + 24), X(sx + 62), X(sy - 50)], fill=C(INK), width=max(1, int(2 * k)))
        d.polygon([(X(sx + 62), X(sy - 50)), (X(sx + 86), X(sy - 44)), (X(sx + 62), X(sy - 38))], fill=C(RED))
        fs = font(F_CPB, 28 * k); t = 'SEKOLAH'; d.text((X(sx) - fs.getlength(t) / 2, X(sy + 30)), t, font=fs, fill=C(INK))
        f = font(F_CPB, 30 * k); d.text((X(30), X(12)), 'PETA JARAK RUMAH KE SEKOLAH', font=f, fill=C(INK))
        d.rectangle([X(4), X(4), X(MW - 4), X(MH - 4)], outline=C(INK), width=max(2, int(3 * k)))
    m = bk.doc('peta', MW, MH, CARD, draw, seed=1801, rough=0.4)
    m['school'] = [SCHOOL[0] - MW / 2, SCHOOL[1] - MH / 2]
    m['far'] = [FAR[0] - MW / 2, FAR[1] - MH / 2]
    m['near'] = [HOUSES[2][0] - MW / 2, HOUSES[2][1] - MH / 2]
    # the far 'real' house: a separate piece so it can fade
    def hdraw(img, d, k, P):
        X = lambda v: P + v * k
        house_icon(d, X, 30, 26, 1.6, INK * 1.2, k)
    def hshape(dm, k, P):
        X = lambda v: P + v * k
        dm.polygon([(X(0), X(26)), (X(30), X(-2)), (X(60), X(26))], fill=255); dm.rectangle([X(8), X(24), X(52), X(56)], fill=255)
    bk.doc('ic_rumah', 60, 58, CARD, hdraw, seed=1802, rough=0.1, shape=hshape)
    # map pin (anchor = tip)
    def pshape(dm, k, P):
        X = lambda v: P + v * k
        dm.ellipse([X(0), X(0), X(36), X(36)], fill=255); dm.polygon([(X(3), X(24)), (X(33), X(24)), (X(18), X(54))], fill=255)
    def pdraw(img, d, k, P):
        X = lambda v: P + v * k
        d.ellipse([X(0), X(0), X(36), X(36)], fill=C(RED), outline=C(INK), width=max(1, int(2 * k)))
        d.polygon([(X(3), X(24)), (X(33), X(24)), (X(18), X(54))], fill=C(RED), outline=C(INK))
        d.ellipse([X(11), X(11), X(25), X(25)], fill=C(CARD))
    bk.doc('pin', 36, 54, RED, pdraw, seed=1803, rough=0.05, shape=pshape)


def timeline():
    """issue date → registration: 12 month ticks; the red arrow is drawn live (labels >= 30 px at s 0.95)"""
    W_, H_ = 760, 260
    A_, B_ = 130, 630
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(3, int(4 * k)); y = 140
        d.line([X(A_), X(y), X(B_), X(y)], fill=C(INK), width=w)
        for i in range(13):
            x = A_ + i * ((B_ - A_) / 12); d.line([X(x), X(y - (18 if i % 12 == 0 else 9)), X(x), X(y + (18 if i % 12 == 0 else 9))], fill=C(INK), width=max(1, int(2 * k)))
        f = font(F_CPB, 34 * k); fb = font(F_SLAB, 38 * k)
        for t, x, tt in [('TERBIT KK', A_, 'Jun 2025'), ('PENDAFTARAN', B_, 'Jun 2026')]:
            d.text((X(x) - f.getlength(t) / 2, X(34)), t, font=f, fill=C(INK)); d.text((X(x) - fb.getlength(tt) / 2, X(172)), tt, font=fb, fill=C(INK))
    m = bk.doc('garis', W_, H_, CARD, draw, seed=1901, rough=0.4)
    m['a'] = [A_ - W_ / 2, 140 - H_ / 2]; m['b'] = [B_ - W_ / 2, 140 - H_ / 2]


def folders():
    """three report folders (manila, tab, blurred lines) for 'tiga laporan'"""
    for i in range(3):
        def shape(dm, k, P):
            X = lambda v: P + v * k
            dm.polygon([(X(0), X(40)), (X(20), X(40)), (X(40), X(0)), (X(150), X(0)), (X(170), X(40)), (X(300), X(40)), (X(300), X(250)), (X(0), X(250))], fill=255)
        def draw(img, d, k, P, i=i):
            X = lambda v: P + v * k
            f = font(F_CPB, 34 * k); d.text((X(26), X(58)), 'LAPORAN', font=f, fill=C(INK))
            d.text((X(222), X(58)), '0%d' % (i + 1), font=f, fill=C(INK))
            for j in range(4): bars(d, X, 26, 112 + j * 30, 240 - 40 * (j % 2), k, 500 + i * 10 + j, col=INK * 2.8, h=9)
        bk.doc('lap%d' % (i + 1), 300, 250, MANILA * (1 - 0.03 * i), draw, seed=1950 + i, shape=shape, rough=0.35)


def panels():
    """split-screen panels: tall torn colour fields (left green = tinggal bersama, right manila = alamat pinjaman)"""
    bk.flat('p_kiri', GREEN, poly=[(-300, -1050), (270, -1060), (250, -600), (285, -100), (255, 400), (280, 1060), (-300, 1050)], seed=2001, rough=5)
    bk.flat('p_kanan', MANILA * 0.95, poly=[(-270, -1060), (300, -1050), (300, 1050), (-280, 1060), (-255, 500), (-285, 0), (-250, -500)], seed=2002, rough=5)


def stamps():
    for name, text, size, color, seed, sub in [
            ('st_domisili', 'DOMISILI', 104, RED, 81, None), ('st_1tahun', 'MIN. 1 TAHUN', 84, RED, 82, None),
            ('st_terbukti', 'TERBUKTI', 70, RED, 83, None), ('st_sesuai', 'SESUAI', 80, GREEN * 0.9, 84, None),
            ('st_temuan', 'TEMUAN', 74, RED, 85, None), ('st_direbut', 'DIREBUT', 96, RED, 86, None)]:
        bk.stamp(name, text, size, color, seed=seed, sub=sub, legible=True)
    bk.mark('m_eq_b', 'eq', 160, INK, seed=96, width=0.2)


def slips():
    T = [('s_baris', 'SATU BARIS KOSONG', F_SLAB, 50, AMBER, INK), ('s_kursi', 'KURSI SEKOLAH ANAK', F_SLAB, 50, CARD, INK),
         ('s_zona', 'zona dekat sekolah', F_FELLI, 52, AMBER, INK), ('s_sdn', 'SD NEGERI', F_CPB, 44, CARD, INK),
         ('s_kemarin', 'baru pindah kemarin', F_FELLI, 54, CARD, RED),
         ('s_alamat', 'Alamat : Jl. Melati No. 7', F_CPB, 34, KKP, INK),
         ('s_jogja', 'KOTA YOGYAKARTA', F_SLAB, 56, CARD, INK), ('s_ombud', 'OMBUDSMAN DIY', F_CPB, 44, CARD, INK),
         ('s_6', '6 ANAK', F_SLAB, 52, AMBER, INK), ('s_5', '5 ANAK', F_SLAB, 52, AMBER, INK),
         ('s_laporan', '3 LAPORAN · SMA', F_SLAB, 58, AMBER, INK),
         ('s_kolom', 'yang dicek: kolom alamat', F_CPB, 36, CARD, INK), ('s_rumah', 'rumah asli: tidak dicek', F_CPB, 34, CARD, RED),
         ('s_asli', 'JARAK ASLI', F_SLAB, 52, CARD, RED), ('s_dikk', 'JARAK DI KK', F_SLAB, 52, AMBER, INK),
         ('s_nenek', 'diasuh nenek', F_FELLI, 52, CARD, INK), ('s_kunci', 'rumah kosong', F_FELLI, 52, CARD, INK),
         ]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3 if s < 50 else s * 1.15, pa, ik, 410 + i, mono=f.startswith('Courier'))
    bk.ransom('ry23', '2023', 110, 3)
    bk.ransom('ry26', '2026', 120, 5)
    bk.ransom('r11', '11 ANAK', 110, 2)
    bk.ransom('rq', '?', 190, 4)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('docs', lambda: (kk('kk'), kk_icon(), kk_frag(), handwriting(), kk10('kk10a'), kk10('kk10a_hl', 4), kk10('kk10b'), kk10('kk10b_hl', 5),
                                    peta(), timeline(), folders(), panels())),
                  ('stamps', stamps), ('slips', slips), ('prints', lambda: (bake_prints(bk, HERE), bk.mirror('tangan_tulis')))]:
        if want(g): fn(); print('baked', g)
    bk.done()
