"""ARSIP #006 3-in-1 · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/skutik/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner
(kolase/ai/, copied into raw/ here). This file draws what is special to the episode: the "3 IN 1" sign face, the afternoon
clock, the delay bars (Hanna, Kreindler & Olken, Science 2017), stamps, labels and years. No real logos."""
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


import math


def sign():
    """the face of the 3-in-1 sign (pasted onto the blank AI sign panel)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        d.rectangle([X(14), X(14), X(586), X(306)], outline=C(INK), width=max(3, int(6 * k)))
        f = font(F_SLAB, 150 * k); s = '3 IN 1'
        d.text((X(300) - f.getlength(s) / 2, X(42)), s, font=f, fill=C(INK))
        f2 = font(F_CPB, 34 * k); s = 'MIN. 3 ORANG · JAM SIBUK'
        d.text((X(300) - f2.getlength(s) / 2, X(236)), s, font=f2, fill=C(INK))
    bk.doc('sign_3in1', 600, 320, AMBER * 1.08, draw, seed=601, rough=0.3)


def clock():
    """an afternoon wall clock (17.00): no archive needed"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        c = 170
        d.ellipse([X(10), X(10), X(330), X(330)], fill=C(CARD), outline=C(INK), width=max(3, int(8 * k)))
        d.ellipse([X(30), X(30), X(310), X(310)], outline=C(INK), width=max(1, int(2 * k)))
        for i in range(12):
            a = math.radians(i * 30 - 90); r0, r1 = (112, 138) if i % 3 == 0 else (124, 138)
            d.line([X(c + r0 * math.cos(a)), X(c + r0 * math.sin(a)), X(c + r1 * math.cos(a)), X(c + r1 * math.sin(a))], fill=C(INK), width=max(2, int((7 if i % 3 == 0 else 3) * k)))
        for ang, L, w in [(5 * 30 - 90, 78, 11), (-90, 116, 6)]:
            a = math.radians(ang); d.line([X(c), X(c), X(c + L * math.cos(a)), X(c + L * math.sin(a))], fill=C(INK), width=max(2, int(w * k)))
        d.ellipse([X(c - 12), X(c - 12), X(c + 12), X(c + 12)], fill=C(RED))
    bk.doc('jam', 340, 340, CARD, draw, seed=611, rough=0.2, shape=lambda dm, k, P: dm.ellipse([P, P, P + 340 * k, P + 340 * k], fill=255))


def bars():
    """afternoon delay on Sudirman per km, before vs after the policy ended (Science 2017)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        fb = font(F_CPB, 38 * k); fn = font(F_SLAB, 60 * k)
        for i, (lab, val, mm, col) in enumerate([('DENGAN 3-IN-1', '2,8 mnt', 2.8, GREEN), ('SETELAH DIHAPUS', '5,3 mnt', 5.3, RED)]):
            y = 30 + i * 170
            d.text((X(30), X(y)), lab, font=fb, fill=C(INK))
            L = 640 * mm / 5.3
            d.rectangle([X(30), X(y + 52), X(30 + L), X(y + 122)], fill=C(col), outline=C(INK), width=max(2, int(3 * k)))
            for xx in range(40, int(L), 14):
                d.line([X(30 + xx), X(y + 56), X(30 + xx - 20), X(y + 118)], fill=C(INK * 1.6), width=max(1, int(1.2 * k)))
            d.text((X(30 + L + 16), X(y + 54)), val, font=fn, fill=C(INK))
        d.text((X(30), X(372)), 'per 1 km · sore hari · Sudirman', font=font(F_CP, 30 * k), fill=C(INK * 2.2))
    bk.doc('bars', 980, 420, CARD, draw, seed=621, rough=0.4)


def stamps():
    for name, text, size, color, seed, sub in [
            ('st_dihapus', 'DIHAPUS', 120, RED, 81, None), ('st_nggak', 'NGGAK', 124, RED, 84, None),
            ('st_macet', 'IKUT MACET', 104, RED, 85, None), ('st_percuma', 'PERCUMA?', 110, RED, 86, None),
            ('st_tahan', 'DITAHAN 3-IN-1', 92, GREEN * 0.85, 87, 'MENURUT STUDI')]:
        bk.stamp(name, text, size, color, seed=seed, sub=sub, legible=True)


def slips():
    bk.strip('s_2x', 'hampir 2× lebih lambat', F_SLAB, 64, AMBER, INK, 401, padx=22)
    T = [('s_jakarta', 'JAKARTA', F_CPB, 50, CARD, INK), ('s_sudirman', 'JL. SUDIRMAN', F_CPB, 46, CARD, INK),
         ('s_sore', 'SORE HARI', F_CPB, 46, AMBER, INK), ('s_wajib', 'WAJIB MIN. 3 ORANG', F_CPB, 42, CARD, RED),
         ('s_sendiri', 'nyetir sendirian', F_FELLI, 48, CARD, INK), ('s_joki', 'JOKI', F_SLAB, 80, CARD, INK),
         ('s_masalah', 'jadi masalah', F_FELLI, 46, CARD, INK), ('s_pemerintah', 'PEMERINTAH', F_CPB, 44, CARD, INK),
         ('s_ekonom', 'Ekonom Harvard & MIT', F_CPB, 40, CARD, INK), ('s_maps', 'data peta online, tiap 20 menit', F_CP, 32, NEWS, INK),
         ('s_science', 'jurnal Science, 2017', F_CP, 32, NEWS, INK), ('s_1km', '1 KM', F_SLAB, 80, AMBER, INK),
         ('s_28', '2,8 menit', F_SLAB, 66, CARD, GREEN), ('s_53', '5,3 menit', F_SLAB, 66, CARD, RED),
         ('s_luar', 'di luar jalur 3-in-1', F_CPB, 40, CARD, INK), ('s_luarjam', 'di luar jam sibuk', F_CPB, 40, CARD, INK),
         ('s_dugaan', 'dugaan peneliti', F_FELLI, 44, NEWS, INK), ('s_gratis', 'GRATIS LAGI', F_CPB, 50, AMBER, INK),
         ('s_ongkos', 'ongkos sewa joki', F_CPB, 42, AMBER, INK), ('s_nahan', '= cukup buat nahan orang bawa mobil', F_CPB, 32, CARD, INK),
         ('s_kita', 'yang kita anggap percuma', F_FELLI, 44, CARD, INK), ('s_1orang', '1 mobil = 1 orang', F_CPB, 44, CARD, RED)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3, pa, ik, 410 + i, mono=f.startswith('Courier'))
    bk.ransom('ry16', '2016', 120, 3)
    bk.ransom('rq', '?', 190, 4)
    bk.ransom('r3', '3', 190, 6)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('sign', sign), ('clock', clock), ('bars', bars), ('stamps', stamps), ('slips', slips),
                  ('prints', lambda: (bake_prints(bk, HERE), bk.mirror('joki'), bk.mirror('rambu')))]:
        if want(g): fn(); print('baked', g)
    bk.done()
