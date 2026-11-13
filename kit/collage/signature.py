"""ARSIP Kolase · the channel's fixed paper parts, baked the same way in every episode:
table paper + torn colour fields, the ARSIP KASUS folder and its labels, the signature stamps and ink marks, a black-paper
silhouette, and every archive print listed in the episode's prints.json.  Used by stories/<slug>/kolase/bake.py:
    from signature import bake_signature, bake_prints;  bake_signature(bk, '#004', 'INDOMIE · 1972');  bake_prints(bk, here)
"""
import os, json
import numpy as np
from parts import *

C = lambda a: tuple(int(v) for v in a)


def _flats(bk):
    bk.paper()
    bk.flat('f_green', GREEN, poly=[(-460, -380), (420, -430), (470, 300), (300, 380), (60, 330), (-200, 420), (-470, 300)], seed=11, rough=4)
    bk.flat('f_amber', AMBER, ell=(300, 300), seed=13, rough=3)
    bk.flat('f_amber_s', AMBER, ell=(170, 170), seed=14, rough=3)
    bk.flat('f_red', RED, poly=[(-700, -120), (700, -160), (690, 120), (-690, 150)], seed=15, rough=4)
    bk.flat('f_manila', MANILA, poly=[(-400, -300), (400, -290), (390, 300), (-410, 310)], seed=17, rough=3, mottle=0.05)
    bk.flat('f_cream', CARD * 0.99, poly=[(-650, -95), (650, -120), (640, 110), (-660, 95)], seed=19, rough=4, mottle=0.03)
    bk.flat('f_green_s', GREEN, ell=(230, 230), seed=21, rough=3)
    bk.flat('f_news', NEWS, poly=[(-480, -620), (470, -600), (480, 610), (-470, 630)], seed=23, rough=3, mottle=0.04)



def _folder(bk, case_no, case_line):
    # ARSIP case-file folder with its tab
    def folder_shape(dm, k, P):
        dm.polygon([(P, P + 70 * k), (P + 40 * k, P + 70 * k), (P + 70 * k, P), (P + 400 * k, P), (P + 430 * k, P + 70 * k),
                    (P + 860 * k, P + 70 * k), (P + 860 * k, P + 640 * k), (P, P + 640 * k)], fill=255)
    def folder(img, d, k, P):
        X = lambda v: P + v * k
        d.line([X(0), X(120), X(860), X(120)], fill=C(MANILA * 0.85), width=max(2, int(2 * k)))
        f = font(F_CPB, 40 * k); d.text((X(90), X(14)), 'ARSIP KASUS', font=f, fill=C(INK))
    bk.doc('folder', 860, 640, MANILA, folder, seed=71, shape=folder_shape)
    bk.strip('lbl_case', case_no, F_CPB, 64, CARD, INK, 73, mono=True)
    bk.strip('lbl_case2', case_line, F_CPB, 40, CARD, INK, 74, mono=True)



def _stamps(bk):
    bk.stamp('st_terungkap', 'TERUNGKAP', 100, RED, seed=84)
    bk.stamp('st_dibuka', 'DIBUKA', 60, RED, seed=86)
    bk.mark('m_cross', 'cross', 220, RED, seed=91)
    bk.mark('m_cross_s', 'cross', 120, RED, seed=92)
    bk.mark('m_tick_s', 'tick', 120, GREEN * 0.9, seed=93)
    bk.mark('m_circle', 'circle', 300, RED, seed=94, width=0.05)
    bk.mark('m_eq', 'eq', 130, INK, seed=95)


def _silhouettes(bk):
    P = [(250, 120), (250, 120), (420, 112), (420, 112), (425, 140), (428, 175), (430, 205), (470, 206), (510, 210), (528, 222),
         (515, 236), (470, 236), (418, 234), (424, 262), (432, 288), (440, 300), (446, 318), (452, 330), (470, 352), (476, 362), (462, 370), (452, 374),
         (456, 392), (458, 404), (452, 412), (458, 424), (456, 444), (440, 460), (420, 474), (398, 480), (392, 500), (392, 520), (400, 540), (430, 556),
         (470, 572), (500, 640), (512, 800), (300, 800), (100, 800), (10, 800), (14, 700), (40, 600), (120, 560), (190, 536), (220, 520), (226, 470),
         (214, 420), (204, 360), (212, 300), (218, 260), (222, 240), (226, 236), (190, 236), (120, 230), (104, 222), (120, 210), (180, 206), (238, 204),
         (244, 170), (248, 140), (250, 120)]
    bk.silhouette('sil_man', bezier_pts(P), seed=341)



def bake_signature(bk, case_no, case_line):
    _flats(bk); _folder(bk, case_no, case_line); _stamps(bk); _silhouettes(bk)


def bake_prints(bk, here):
    for name, p in _load(here).items():
        kw = {k: v for k, v in p.items() if k not in ('file', 'width', 'tint', 'plate', 'halftone', 'caption')}
        if p.get('halftone'):
            bk.halftone(name, p['file'], p['width'], crop=p.get('crop'), caption=p.get('caption'), seed=sum(map(ord, name)) % 1000)
            continue
        tint = hexc(p['tint']) if p.get('tint') else None
        plate = hexc(p['plate']) if p.get('plate') else None
        try:
            bk.cut(name, p['file'], p['width'], tint=tint, plate=plate, **kw)
            print('cut', name)
        except Exception as e:
            print('FAILED', name, e)



def _load(here):
    p = os.path.join(here, 'prints.json')
    return json.load(open(p)) if os.path.exists(p) else {}
