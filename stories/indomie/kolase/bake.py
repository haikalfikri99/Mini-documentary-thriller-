"""ARSIP #008 Indomie Taiwan · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/skutik/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; prints from prints.json: AI engravings made by the channel owner
(kolase/ai/, copied into raw/ here). This file draws what is special to the episode: the two limit meters (Taiwan: none allowed,
Indonesia: a limit), the balance, lab slips, stamps, labels and years. No real logos; the brand name appears only on our own typed tags."""
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


def meters():
    """two limit gauges: Taiwan = no trace allowed, Indonesia = a limit line with the level far below it"""
    def mk(name, head, limit_y, level_y, limit_txt, col):
        def draw(img, d, k, P):
            X = lambda v: P + v * k
            f = font(F_CPB, 34 * k); d.text((X(160) - f.getlength(head) / 2, X(16)), head, font=f, fill=C(INK))
            d.rectangle([X(100), X(70), X(220), X(560)], fill=C(NEWS), outline=C(INK), width=max(3, int(5 * k)))
            for y in range(90, 560, 30): d.line([X(220), X(y), X(240), X(y)], fill=C(INK), width=max(1, int(2 * k)))
            if level_y is not None:
                d.rectangle([X(104), X(level_y), X(216), X(556)], fill=C(col))
                for y in range(int(level_y) + 8, 556, 14): d.line([X(108), X(y), X(212), X(y - 10)], fill=C(INK * 1.7), width=max(1, int(1.2 * k)))
            for x in range(60, 270, 26): d.line([X(x), X(limit_y), X(x + 14), X(limit_y)], fill=C(RED), width=max(3, int(7 * k)))
            ft = font(F_CPB, 26 * k); d.text((X(160) - ft.getlength(limit_txt) / 2, X(limit_y - 40)), limit_txt, font=ft, fill=C(RED))
        bk.doc(name, 320, 590, CARD, draw, seed=sum(map(ord, name)) % 900, rough=0.3)
    mk('meter_tw', 'TAIWAN', 548, None, 'BATAS: NOL', RED)
    mk('meter_id', 'INDONESIA', 200, 470, 'BATAS', GREEN)


def balance():
    """a two-pan balance drawn as an engraved cut-out (the archive prints we found carried lettering)"""
    def draw(img, d, k, P):
        X = lambda v: P + v * k
        w = max(2, int(5 * k))
        d.rectangle([X(286), X(60), X(314), X(560)], fill=C(INK))
        d.polygon([(X(200), X(600)), (X(400), X(600)), (X(330), X(560)), (X(270), X(560))], fill=C(INK))
        d.line([X(60), X(110), X(540), X(90)], fill=C(INK), width=max(3, int(10 * k)))
        d.ellipse([X(282), X(80), X(318), X(116)], fill=C(AMBER), outline=C(INK), width=w)
        for cx, top in [(60, 110), (540, 90)]:
            d.line([X(cx), X(top), X(cx - 70), X(top + 250)], fill=C(INK), width=max(1, int(2.5 * k)))
            d.line([X(cx), X(top), X(cx + 70), X(top + 250)], fill=C(INK), width=max(1, int(2.5 * k)))
            d.chord([X(cx - 90), X(top + 220), X(cx + 90), X(top + 300)], 0, 180, fill=C(NEWS), outline=C(INK), width=w)
    bk.doc('timbangan', 600, 620, CARD, draw, seed=801, rough=0.3)


def stamps():
    for name, text, size, color, seed, sub in [
            ('st_ditolak', 'DITOLAK TAIWAN', 96, RED, 81, None), ('st_ditolak_s', 'DITOLAK', 120, RED, 82, None),
            ('st_aman', 'AMAN', 124, GREEN * 0.85, 83, 'MENURUT BPOM'), ('st_dilarang', 'NGGAK BOLEH', 104, RED, 84, 'DI TAIWAN'),
            ('st_boleh', 'BOLEH', 120, GREEN * 0.85, 85, 'DI BAWAH BATAS'), ('st_belum', 'BELUM', 124, RED, 86, None),
            ('st_nol', 'NOL', 140, RED, 87, 'SEDIKIT PUN NGGAK BOLEH'), ('st_tidak', 'NGGAK TERDETEKSI', 90, GREEN * 0.85, 88, 'KATA INDOFOOD'),
            ('st_bukan', 'BUKAN EKSPOR RESMI', 84, RED, 89, 'KATA BPOM')]:
        bk.stamp(name, text, size, color, seed=seed, sub=sub, legible=True)


def slips():
    T = [('s_indomie', 'INDOMIE', F_SLAB, 72, CARD, INK), ('s_sachet', 'isi sachet bumbu', F_CPB, 42, CARD, INK),
         ('s_indonesia', 'INDONESIA', F_CPB, 46, CARD, INK), ('s_taiwan', 'TAIWAN', F_CPB, 50, CARD, INK),
         ('s_bpom', 'BPOM', F_SLAB, 80, CARD, INK), ('s_pertama', 'kasus pertama', F_FELLI, 46, NEWS, INK),
         ('s_nipagin', 'NIPAGIN', F_SLAB, 80, CARD, RED), ('s_pengawet', '= zat pengawet', F_CPB, 44, AMBER, INK),
         ('s_kecap', 'kecap', F_FELLI, 48, CARD, INK), ('s_masing', '"aman menurut aturan masing-masing"', F_FELLI, 38, CARD, INK),
         ('s_eto', 'ETILEN OKSIDA', F_SLAB, 64, CARD, RED), ('s_sisa', 'sisa zat pembasmi hama', F_CPB, 36, AMBER, INK),
         ('s_ayam', 'bumbu Ayam Spesial', F_CPB, 40, CARD, INK), ('s_batas', 'ada batasnya', F_CPB, 42, AMBER, INK),
         ('s_jauh', 'jauh di bawah batas', F_CPB, 40, CARD, GREEN), ('s_soto', 'Soto Banjar', F_CPB, 46, CARD, INK),
         ('s_kiriman', '1 kiriman', F_CPB, 44, AMBER, INK), ('s_indofood', 'pihak INDOFOOD', F_CPB, 40, CARD, INK),
         ('s_batch', 'sampel batch yang sama', F_CPB, 38, NEWS, INK), ('s_merek', 'satu merek', F_FELLI, 50, CARD, INK),
         ('s_jawaban', 'dua jawaban', F_FELLI, 50, AMBER, INK), ('s_dapur', 'dapur rumah kita', F_FELLI, 48, CARD, INK),
         ('s_standar', 'standar keamanan beda tiap negara', F_CPB, 34, AMBER, INK), ('s_pabrik', 'pabrik', F_CP, 34, NEWS, INK)]
    for i, (n, tx, f, s, pa, ik) in enumerate(T):
        bk.strip(n, tx, f, s * 1.3, pa, ik, 410 + i, mono=f.startswith('Courier'))
    for n, y, sd in [('ry10', '2010', 3), ('ry23', '2023', 5), ('ry25', '2025', 7)]:
        bk.ransom(n, y, 120, sd)
    bk.ransom('rq', '?', 190, 4)
    bk.ransom('rx3', '3x', 170, 6)


if __name__ == '__main__':
    ai_to_raw()
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('meters', meters), ('balance', balance), ('stamps', stamps), ('slips', slips),
                  ('prints', lambda: (bake_prints(bk, HERE), bk.mirror('petugas_id_aman')))]:
        if want(g): fn(); print('baked', g)
    bk.done()
