"""ARSIP #NNN <Judul> · bake every paper part into parts/ (ARSIP Kolase).   python3 stories/<slug>/kolase/bake.py [group ...]
Fixed series parts come from kit/collage/signature.py; archive prints from prints.json (+ raw/ via kit/collage/fetch_raw.py);
this file only draws what is special to the episode (its hero object, documents, slips, stamps, numbers)."""
import os, sys, json
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


def hero():
    """The hero object at frame 0: a found print (prints.json) or our own printed cut-out drawn here with bk.doc()
    (see stories/micin/kolase/bake.py sachet() for a printed packet). No real brand logos."""
    pass


def slips():
    # labels, years, verdict stamps of this episode (≥ 40 px world; red only for verdicts and the key number)
    bk.stamp('st_hook', 'KATA?', 120, RED, seed=81)                 # the stamp that hits at frame 0
    bk.strip('s_label', 'label', F_CPB, 58, CARD, INK, 400, mono=True)
    bk.ransom('ryear', '1999', 130, 3)


if __name__ == '__main__':
    prev = os.path.join(bk.out, 'manifest.json')
    if ONLY and os.path.exists(prev):
        bk.M = json.load(open(prev)); bk.M.pop('_', None)
    for g, fn in [('signature', lambda: bake_signature(bk, '#%03d' % EP['no'], EP.get('case_line', EP['slug'].upper()))),
                  ('hero', hero), ('slips', slips), ('prints', lambda: bake_prints(bk, HERE))]:
        if want(g): fn(); print('baked', g)
    bk.done()
