"""ARSIP #005 Skutik · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/skutik/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner
(kolase/ai/, copied into raw/ here; the KPPU referee + court are reused from #004) + a public-domain gavel (raw/, fetch_raw.py).
This file draws what is special to the episode: price tags, the golf flag, the fine bars, stamps, labels and years. No real logos."""
import os, sys, json, shutil, glob
from PIL import ImageDraw
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


def ai_to_raw():
    os.makedirs(bk.raw, exist_ok=True)
    for f in glob.glob(os.path.join(HERE, 'ai', '*.jpg')):
        dst = os.path.join(bk.raw, 'ai_' + os.path.basename(f))
        if not os.path.exists(dst): shutil.copy(f, dst)


def tags():
    """dealer price tags on a string (no real prices: the case is about prices being aligned, not a number)"""
    w, h = 520, 230
    def shape(dm, k, P):
        dm.polygon([(P + 70 * k, P), (P + w * k, P), (P + w * k, P + h * k), (P + 70 * k, P + h * k), (P, P + h / 2 * k)], fill=255)
        dm.ellipse([P + 40 * k, P + (h / 2 - 16) * k, P + 72 * k, P + (h / 2 + 16) * k], fill=0)
    def mk(name, head, word, col, arrow):
        def draw(img, d, k, P):
            X = lambda v: P + v * k
            d.text((X(100), X(22)), head, font=font(F_CPB, 34 * k), fill=C(INK))
            d.line([X(100), X(66), X(500), X(66)], fill=C(INK), width=max(1, int(1.5 * k)))
            d.text((X(100), X(84)), word, font=font(F_SLAB, 74 * k), fill=C(col))
            if arrow:
                ax = X(465); y0, y1 = X(96), X(196)
                d.line([ax, y0, ax, y1], fill=C(col), width=int(12 * k))
                d.polygon([(ax - 26 * k, y1 - 30 * k), (ax + 26 * k, y1 - 30 * k), (ax, y1 + 6 * k)], fill=C(col))
            d.ellipse([X(40), X(h / 2 - 16), X(72), X(h / 2 + 16)], outline=C(INK * 2), width=max(2, int(3 * k)))
        bk.doc(name, w, h, CARD, draw, seed=sum(map(ord, name)) % 900, rough=0.5, shape=shape)
    mk('tag_murah', 'HARGA', 'MURAH', GREEN, True)
    mk('tag_a', 'HARGA', 'Rp ...', INK, False)
    mk('tag_sama', 'HARGA', 'SAMA', RED, False)


def flag():
    """the golf flag that ends up planted in the price tag (loop shot)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rectangle([X(20), X(10), X(30), X(420)], fill=C(INK))
        d.polygon([(X(30), X(14)), (X(210), X(70)), (X(30), X(130))], fill=C(RED), outline=C(INK), width=max(2, int(3 * k)))
        d.ellipse([X(12), X(2), X(38), X(24)], fill=C(INK))
    bk.doc('flag', 230, 430, CARD, draw, seed=505, rough=0.3)


def bars():
    """the two fines as engraved data bars (KPPU decision 2017: Yamaha Rp25 M, Honda Rp22,5 M)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        fb = font(F_CPB, 40 * k); fn = font(F_SLAB, 58 * k)
        for i, (lab, val, mm) in enumerate([('YAMAHA', 'Rp25 M', 25), ('HONDA', 'Rp22,5 M', 22.5)]):
            y = 40 + i * 170
            d.text((X(30), X(y)), lab, font=fb, fill=C(INK))
            L = 600 * mm / 25
            d.rectangle([X(30), X(y + 56), X(30 + L), X(y + 126)], fill=C(RED if i == 0 else RED * 0.8), outline=C(INK), width=max(2, int(3 * k)))
            for xx in range(40, int(L), 14):
                d.line([X(30 + xx), X(y + 60), X(30 + xx - 20), X(y + 122)], fill=C(INK * 1.6), width=max(1, int(1.2 * k)))
            d.text((X(30 + L + 18), X(y + 58)), val, font=fn, fill=C(INK))
        d.line([X(30), X(20), X(30), X(372)], fill=C(INK), width=max(2, int(3 * k)))
    bk.doc('bars', 960, 390, CARD, draw, seed=515, rough=0.4)


def stamps():
    for name, text, size, color, seed, sub in [
            ('st_denda', 'DIDENDA', 120, RED, 81, None), ('st_dibantah', 'DIBANTAH', 104, RED, 82, None),
            ('st_bukti', 'BUKTI?', 104, RED, 83, None), ('st_nggak', 'NGGAK', 124, RED, 84, None),
            ('st_menang', 'KPPU MENANG', 96, RED, 86, 'MAHKAMAH AGUNG'), ('st_sepakat', 'SEPAKAT', 112, RED, 87, None),
            ('st_janjian', 'JANJIAN HARGA?', 92, RED, 88, 'MENURUT KPPU')]:
        bk.stamp(name, text, size, color, seed=seed, sub=sub, legible=True)


def slips():
    bk.strip('s_475', 'Rp47,5 M', F_SLAB, 150, AMBER, INK, 401, padx=22)
    T = [('s_yamaha', 'YAMAHA', F_CPB, 46, CARD, INK), ('s_honda', 'HONDA', F_CPB, 46, CARD, INK),
         ('s_25', 'Rp25 M', F_SLAB, 70, AMBER, INK), ('s_225', 'Rp22,5 M', F_SLAB, 70, AMBER, INK),
         ('s_matik', 'MOTOR MATIK', F_CPB, 48, CARD, INK), ('s_dealer', 'DI DEALER', F_CPB, 44, CARD, INK),
         ('s_kamu', 'kamu', F_FELLI, 56, CARD, INK), ('s_ketat', '"bersaing ketat"', F_FELLI, 44, CARD, INK),
         ('s_kppu', 'KPPU', F_SLAB, 92, CARD, INK), ('s_kppu2', 'Komisi Pengawas Persaingan Usaha', F_CP, 27, NEWS, INK),
         ('s_wasit', 'wasit persaingan bisnis', F_CPB, 34, CARD, INK), ('s_pembeli', 'PEMBELI', F_CPB, 44, CARD, INK),
         ('s_golf', 'LAPANGAN GOLF', F_CPB, 46, AMBER, INK), ('s_bos', 'bos YAMAHA + bos HONDA', F_CPB, 34, CARD, INK),
         ('s_email', 'EMAIL', F_CPB, 50, CARD, INK), ('s_ikut', '"ikuti harga Honda"', F_FELLI, 44, CARD, INK),
         ('s_pihak_y', 'pihak YAMAHA', F_CPB, 40, CARD, INK), ('s_pihak_h', 'pihak HONDA', F_CPB, 40, CARD, INK),
         ('s_bukan', '"bukan bukti"', F_FELLI, 46, CARD, INK), ('s_mustahil', '"nggak mungkin atur harga"', F_FELLI, 40, CARD, INK),
         ('s_pn', 'PENGADILAN NEGERI', F_CPB, 40, CARD, INK), ('s_ma', 'MAHKAMAH AGUNG', F_CPB, 44, CARD, INK),
         ('s_pk', 'PK DITOLAK', F_CPB, 40, CARD, RED), ('s_jalan', 'DI JALANAN', F_CPB, 44, CARD, INK),
         ('s_diatur', 'diatur dari lapangan golf?', F_CPB, 34, AMBER, INK), ('s_menurut', 'menurut KPPU', F_CP, 32, NEWS, INK),
         ('s_terdakwa', 'terdakwa: motor matik', F_CPB, 38, CARD, RED)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3, pa, ik, 410 + i, mono=f.startswith('Courier'))
    for n, y, sd in [('ry15', '2015', 3), ('ry17', '2017', 5), ('ry19', '2019', 7), ('ry21', '2021', 9)]:
        bk.ransom(n, y, 120, sd)
    bk.ransom('rq', '?', 190, 4)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('tags', tags), ('flag', flag), ('bars', bars), ('stamps', stamps), ('slips', slips),
                  ('prints', lambda: (bake_prints(bk, HERE), bk.mirror('wasit_kartu'), bk.mirror('skutik_b'), bk.mirror('pabrik_motor')))]:
        if want(g): fn(); print('baked', g)
    bk.done()
