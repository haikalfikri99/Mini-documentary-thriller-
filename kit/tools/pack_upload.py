"""Build stories/<slug>/upload_pack/ : everything the owner uploads by hand (YouTube Studio / Google Drive), no cloud connector needed.
  python3 kit/tools/pack_upload.py <slug> [<slug> ...]      (works on macOS, Linux, Windows; standard library only)
Collects: newest renders/ARSIP_<no>_<slug>_v<N>.mp4, thumbnail_<slug>_1080x1920.jpg (kit/tools/make_cover.py), cover_frame_<t>s.jpg,
and UPLOAD_<no>_<slug>.txt = raw UTF-8 copy of UPLOAD.md (do NOT convert to a Google Doc: 4-byte emoji break). Files are hard-linked when
the disk allows it (no extra space), copied otherwise. upload_pack/ is git-ignored."""
import os, re, sys, glob, shutil, json

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))


def put(src, dst):
    if os.path.exists(dst): os.remove(dst)
    if src.endswith('.md'): return shutil.copy2(src, dst)   # text is always a real copy (editors may replace UPLOAD.md in place)
    try: os.link(src, dst)
    except OSError: shutil.copy2(src, dst)


def pack(slug):
    S = os.path.join(ROOT, 'stories', slug); R = os.path.join(S, 'renders'); out = os.path.join(S, 'upload_pack')
    if not os.path.isdir(S): return print('✗ stories/%s tidak ada' % slug) or 1
    ep = os.path.join(S, 'kolase', 'episode.json'); no = json.load(open(ep, encoding='utf-8'))['no'] if os.path.exists(ep) else None
    vids = sorted(glob.glob(os.path.join(R, 'ARSIP_*_%s_v*.mp4' % slug)), key=lambda p: int(re.search(r'_v(\d+)', os.path.basename(p)).group(1)))
    vids = [v for v in vids if 'preview' not in v]
    if not vids: return print('✗ %s: belum ada render di renders/' % slug) or 1
    os.makedirs(out, exist_ok=True); n = 0; missing = []
    items = [(vids[-1], os.path.basename(vids[-1]))]
    th = os.path.join(R, 'thumbnail_%s_1080x1920.jpg' % slug)
    items += [(th, os.path.basename(th))] if os.path.exists(th) else []
    if not os.path.exists(th): missing.append('thumbnail (jalankan: python3 kit/tools/make_cover.py stories/%s/kolase)' % slug)
    items += [(p, os.path.basename(p)) for p in sorted(glob.glob(os.path.join(R, 'cover_frame_*s.jpg')))]
    up = os.path.join(S, 'UPLOAD.md')
    if os.path.exists(up): items.append((up, 'UPLOAD_%03d_%s.txt' % (no if no is not None else 0, slug)))
    else: missing.append('UPLOAD.md')
    for src, name in items: put(src, os.path.join(out, name)); n += 1
    print('✓ %s → %s (%d file)' % (slug, os.path.relpath(out, ROOT), n) + ('' if not missing else '  PERINGATAN: kurang ' + '; '.join(missing)))
    return 0


if __name__ == '__main__':
    if len(sys.argv) < 2: sys.exit(__doc__)
    sys.exit(max(pack(s) or 0 for s in sys.argv[1:]))
