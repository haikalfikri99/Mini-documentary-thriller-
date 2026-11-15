"""ARSIP #007 HP Xiaomi · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/skutik/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner
(kolase/ai/, copied into raw/ here) + the engraved globe (engr_objects.py). This file draws what is special to the episode: the
ad card on the screen, the 5% ceiling, the annual-report sheet (Xiaomi's own numbers), stamps, labels and years. No real logos."""
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




def adcard():
    """a generic in-app ad card that pops up on the phone screen"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rectangle([X(0), X(0), X(420), X(50)], fill=C(AMBER))
        d.text((X(16), X(8)), 'IKLAN', font=font(F_CPB, 32 * k), fill=C(INK))
        d.text((X(380), X(4)), 'x', font=font(F_CPB, 34 * k), fill=C(INK))
        d.rectangle([X(20), X(70), X(400), X(250)], fill=C(NEWS * 0.9), outline=C(INK), width=max(2, int(3 * k)))
        for i in range(5):
            d.line([X(20 + i * 76), X(250), X(100 + i * 76), X(70)], fill=C(INK * 3), width=max(1, int(2 * k)))
        d.rectangle([X(20), X(272), X(280), X(292)], fill=C(INK * 2.5)); d.rectangle([X(20), X(304), X(220), X(320)], fill=C(INK * 3))
        d.rounded_rectangle([X(250), X(340), X(400), X(390)], radius=X(10) - X(0), fill=C(GREEN))
        d.text((X(268), X(348)), 'PASANG', font=font(F_CPB, 28 * k), fill=C(CARD))
    bk.doc('adcard', 420, 410, CARD, draw, seed=701, rough=0.25)


def ceiling():
    """profit bar hitting the 5% ceiling (the pledge: hardware net margin never above 5%)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        for x in range(30, 760, 40): d.line([X(x), X(90), X(x + 22), X(90)], fill=C(RED), width=max(3, int(7 * k)))
        d.text((X(560), X(30)), 'MAKS 5%', font=font(F_SLAB, 46 * k), fill=C(RED))
        d.rectangle([X(250), X(98), X(450), X(520)], fill=C(AMBER), outline=C(INK), width=max(2, int(4 * k)))
        for y in range(110, 520, 16): d.line([X(254), X(y), X(446), X(y - 30)], fill=C(INK * 1.7), width=max(1, int(1.3 * k)))
        d.line([X(20), X(520), X(760), X(520)], fill=C(INK), width=max(2, int(4 * k)))
        d.text((X(200), X(540)), 'untung bersih HP & barang', font=font(F_CP, 30 * k), fill=C(INK))
    bk.doc('ceiling', 780, 600, CARD, draw, seed=711, rough=0.35)


def report():
    """Xiaomi's own annual reports: hardware net margin (pledge ≤ 5%)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        f = font(F_FELLSC, 44 * k); s = 'Laporan Tahunan'
        d.text((X(320) - f.getlength(s) / 2, X(30)), s, font=f, fill=C(INK))
        fs = font(F_CP, 24 * k); s = 'untung bersih hardware (janji: maks 5%)'
        d.text((X(320) - fs.getlength(s) / 2, X(92)), s, font=fs, fill=C(INK))
        d.line([X(40), X(134), X(600), X(134)], fill=C(INK), width=max(1, int(1.5 * k)))
        fb = font(F_CPB, 40 * k)
        for i, (y, v) in enumerate([('2019', '< 1%'), ('2020', '< 1%'), ('2025', '2,3%')]):
            yy = 160 + i * 74
            d.text((X(60), X(yy)), y, font=fb, fill=C(INK)); d.text((X(420), X(yy)), v, font=fb, fill=C(GREEN))
            d.line([X(40), X(yy + 60), X(600), X(yy + 60)], fill=C(INK * 3), width=max(1, int(1 * k)))
        d.text((X(40), X(394)), '(menurut laporan resmi Xiaomi)', font=font(F_CP, 22 * k), fill=C(INK * 2.4))
    bk.doc('laporan', 640, 440, CARD, draw, seed=721)


def stamps():
    for name, text, size, color, seed, sub in [
            ('st_iklan', 'IKLAN?', 120, RED, 81, None), ('st_janji', 'JANJI MAKS 5%', 96, RED, 82, 'MULAI 2018'),
            ('st_ditepati', 'DITEPATI', 110, GREEN * 0.85, 83, 'MENURUT LAPORAN XIAOMI'), ('st_umpan', 'UMPAN', 120, RED, 84, None),
            ('st_iklan2', 'IKLAN', 130, RED, 85, None)]:
        bk.stamp(name, text, size, color, seed=seed, sub=sub, legible=True)


def slips():
    T = [('s_xiaomi', 'XIAOMI', F_SLAB, 70, CARD, INK), ('s_pihak', 'pihak XIAOMI', F_CPB, 40, CARD, INK),
         ('s_semua', 'semua barang jualannya', F_CPB, 38, CARD, INK), ('s_kembali', 'lebihnya = balik ke pengguna', F_CPB, 36, AMBER, INK),
         ('s_jarang', 'jarang ada yang mau', F_FELLI, 46, CARD, INK), ('s_dari', 'untung besar dari mana?', F_FELLI, 46, CARD, INK),
         ('s_dok', 'prospektus Xiaomi, 2018', F_CP, 32, NEWS, INK), ('s_quote', '"We are primarily an internet company."', F_CPB, 30, CARD, INK),
         ('s_tipis', 'HP: untung tipis', F_CPB, 44, CARD, INK), ('s_dapat', 'buat dapetin pengguna', F_CPB, 40, AMBER, INK),
         ('s_kamu', 'kamu', F_FELLI, 56, CARD, INK), ('s_miring', 'HP bagus, harga miring', F_CPB, 40, CARD, INK),
         ('s_papan', 'layar = papan iklan', F_CPB, 44, AMBER, INK), ('s_per100', 'tiap Rp100 penjualan', F_CPB, 40, CARD, INK),
         ('s_kotor', 'laba kotor · laporan 2025', F_CP, 30, NEWS, INK), ('s_hp', 'JUALAN HP', F_CPB, 38, CARD, INK),
         ('s_net', 'LAYANAN INTERNET', F_CPB, 38, CARD, INK), ('s_11', 'Rp11', F_SLAB, 80, AMBER, INK), ('s_76', 'Rp76', F_SLAB, 96, AMBER, RED),
         ('s_sumber', 'sumber uang terbesar layanan internet:', F_CPB, 30, CARD, INK),
         ('s_ganggu', '"nggak mengganggu"', F_FELLI, 46, CARD, INK), ('s_atur', 'bisa dikurangi di pengaturan', F_CPB, 36, CARD, INK),
         ('s_kecil', 'iklan kecil', F_FELLI, 48, CARD, INK), ('s_penting', '"bagian penting bisnisnya"', F_FELLI, 44, AMBER, INK),
         ('s_kata', 'kata Xiaomi', F_CP, 32, NEWS, INK)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3, pa, ik, 410 + i, mono=f.startswith('Courier'))
    bk.ransom('ry18', '2018', 120, 3)
    bk.ransom('rq', '?', 190, 4)
    bk.ransom('r5', '5%', 170, 6)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('ad', adcard), ('ceiling', ceiling), ('report', report), ('stamps', stamps), ('slips', slips),
                  ('prints', lambda: (bake_prints(bk, HERE), bk.mirror('hp_kail')))]:
        if want(g): fn(); print('baked', g)
    bk.done()
