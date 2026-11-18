"""Tests for lint_episode.py (v6.1 anti-monotony rules).   python3 kit/tools/test_lint_episode.py"""
import os, sys, json, tempfile, unittest
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lint_episode as L


FULL = object()                                   # sentinel: default value for optional markers


def make(root, slug, no, script, hook='Bom di Bawah Meja', ending='Reframing Sistemik', segar='2024', dur=None,
         mode=FULL, artefak=FULL, loop=FULL, label=FULL, title=None, extra='', upload=None):
    d = os.path.join(root, 'stories', slug); os.makedirs(os.path.join(d, 'audio')); os.makedirs(os.path.join(d, 'kolase'))
    dflt = lambda v, x: x if v is FULL else v
    md = '# ep\n' + (f'[HOOK: {hook}] ' if hook else '') + (f'[ENDING: {ending}] ' if ending else '') + (f'[SEGAR: {segar}] ' if segar else '')
    for k, v, x in (('MODE', mode, 'Ringkas'), ('ARTEFAK', artefak, 'struk'), ('LOOP', loop, 'angka kecil → harga akhir @46'), ('LABEL', label, 'satu asal')):
        v = dflt(v, x)
        if v: md += f'[{k}: {v}] '
    if title: md += f'\n**Judul:** {title}\n'
    open(os.path.join(d, 'README.md'), 'w').write(md + extra)
    if upload: open(os.path.join(d, 'UPLOAD.md'), 'w').write(upload)
    open(os.path.join(d, 'audio', 'script_vo.txt'), 'w').write(script)
    json.dump({'no': no, 'dur': dur or 0}, open(os.path.join(d, 'kolase', 'episode.json'), 'w'))
    return L.load(slug, root)


W = lambda n: ' '.join(['Anehnya'] + ['kata'] * (n - 1))   # includes an ABT connector


class T(unittest.TestCase):
    def setUp(self): self.tmp = tempfile.mkdtemp()

    def test_markers_and_canonical_names(self):
        e = make(self.tmp, 'a', 13, 'Struk ini aneh. ' + W(90) + '.\nItu yang terjadi di kasir.', hook='5. Titik Balik Hasil Ekstrem (K5)', title='Struk Ini Mencetak Dua Harga')
        self.assertEqual(e['hook'], 'Titik Balik Hasil Ekstrem'); self.assertEqual(e['ending'], 'Reframing Sistemik')
        self.assertEqual(e['mode'], 'Ringkas'); self.assertEqual(L.lint_episode(e), [])

    def test_missing_markers_error_from_13_warning_before(self):
        e13 = make(self.tmp, 'b', 13, W(120) + '.', hook=None, ending=None, segar=None, mode='Investigasi', artefak=None, loop=None, label=None)
        e09 = make(self.tmp, 'c', 9, W(120) + '.', hook=None, ending=None, segar=None, mode='Investigasi', artefak=None, loop=None, label=None)
        r13, r09 = L.lint_episode(e13), L.lint_episode(e09)
        self.assertTrue(sum(l == 'E' for l, _ in r13) >= 6)
        self.assertTrue(len(r09) >= 6 and all(l == 'W' for l, _ in r09))

    def test_exit_openers(self):
        for opener in ['Lain kali', 'Kalo kamu', 'Kalau kamu', 'Ingat ya', 'Intinya', 'Jadi', 'Kesimpulannya', 'Pada akhirnya', 'Nah itulah']:
            e = make(self.tmp, 'x' + L.norm(opener).replace(' ', ''), 13, W(120) + '.\n' + opener + ', cek label harganya.', mode='Investigasi')
            self.assertTrue(any('kata terlarang' in m for _, m in L.lint_episode(e)), opener)
        ok = make(self.tmp, 'ok', 13, W(120) + '.\nStruk itu tetap di dompetmu.', mode='Investigasi')
        self.assertFalse(any('kata terlarang' in m for _, m in L.lint_episode(ok)))

    def test_old_exit_words_always_error(self):
        e = make(self.tmp, 'old', 10, W(120) + '.\nJadi, itulah alasannya.', mode='Investigasi')
        self.assertIn('E', [l for l, m in L.lint_episode(e) if 'kata terlarang' in m])

    def test_seamless_loop_only_ringkas(self):
        e = make(self.tmp, 'loop', 13, W(125) + '.', ending='Lingkar Naratif Mulus', mode='Investigasi')
        self.assertTrue(any('khusus Mode Ringkas' in m for _, m in L.lint_episode(e)))

    def test_batch_rules(self):
        a = make(self.tmp, 'b1', 13, 'Harga ini sama—tapi nggak laku. ' + W(90) + '.', hook='Celah Ujung Lidah', ending='Cermin Personal', segar='2022', mode='Ringkas')
        b = make(self.tmp, 'b2', 14, 'Tombol ini kecil, tapi mahal. ' + W(90) + '.', hook='Celah Ujung Lidah', ending='Cermin Personal', segar='klasik', mode='Ringkas')
        c = make(self.tmp, 'b3', 15, 'Kartu ini kosong. ' + W(120) + '.', hook='Bom di Bawah Meja', ending='Dilema Abu-Abu', segar='1998', mode='Investigasi')
        d = make(self.tmp, 'b4', 16, 'Kantong ini Rp200. ' + W(90) + '.', hook='Titik Balik Hasil Ekstrem', ending='Pemicu Dunia Nyata', segar='klasik', mode='Ringkas')
        msgs = [m for _, m in L.lint_batch([a, b, c, d])]
        self.assertTrue(any('hook sama berurutan' in m for m in msgs))
        self.assertTrue(any('penutup sama berurutan' in m for m in msgs))
        self.assertTrue(any('tidak selang-seling' in m for m in msgs))     # b1, b2 both Ringkas
        self.assertTrue(any('—tapi' in m for m in msgs))
        self.assertTrue(any('kesegaran' in m for m in msgs))               # only 1 fresh of 4

    def test_batch_clean(self):
        eps = [make(self.tmp, 'c%d' % i, 13 + i, s, hook=h, ending=en, segar=y, mode=m, title='Struk Ini Aneh') for i, (s, h, en, y, m) in enumerate([
            ('Struk ini aneh. ' + W(92) + '.', 'Bukti Visual Mendahului Konteks', 'Reframing Sistemik', '2023', 'Ringkas'),
            ('Tombol abu-abu ini mahal. ' + W(120) + '.', 'Bom di Bawah Meja', 'Dilema Abu-Abu', '2021', 'Investigasi'),
            ('Dua kartu sama, hasil beda. ' + W(90) + '.', 'Celah Ujung Lidah', 'Lingkar Naratif Mulus', 'klasik', 'Ringkas'),
            ('Toko ini rugi 3 miliar. ' + W(118) + '.', 'Titik Balik Hasil Ekstrem', 'Pemicu Dunia Nyata', 'klasik', 'Investigasi')])]
        self.assertEqual(L.lint_batch(eps), [])
        self.assertEqual([L.lint_episode(e) for e in eps], [[], [], [], []])

    def test_declared_mode_word_range(self):
        e = make(self.tmp, 'm1', 13, W(120) + '.', mode='Ringkas')                    # 120 words but declared Ringkas (85-105)
        self.assertTrue(any('[MODE: Ringkas] butuh 85–105' in m for _, m in L.lint_episode(e)))
        e2 = make(self.tmp, 'm2', 13, W(95) + '.', mode='Ringkas')
        self.assertFalse(any('[MODE' in m for _, m in L.lint_episode(e2)))
        e3 = make(self.tmp, 'm3', 13, W(95) + '.', mode=None)
        self.assertTrue(any('[MODE: Ringkas|Investigasi] tidak ada' in m for _, m in L.lint_episode(e3)))

    def test_kuda_troya_title_and_h1(self):
        bad = make(self.tmp, 't1', 13, 'Kenapa struk ini aneh? ' + W(90) + '.', title='Kenapa Psikologi Struk Ini Bikin Boros Padahal Murah?')
        msgs = [m for _, m in L.lint_episode(bad)]
        self.assertTrue(any('judul memuat' in m for m in msgs)); self.assertTrue(any('H1 memuat' in m for m in msgs))
        long = make(self.tmp, 't2', 13, 'Struk ini aneh. ' + W(90) + '.', title='Biaya Layanan Yang Baru Muncul Di Halaman Bayar Akhir Itu Mahal Sekali')
        self.assertTrue(any('karakter (maks 55)' in m for _, m in L.lint_episode(long)))
        slot = make(self.tmp, 't3', 13, 'Struk ini aneh. ' + W(90) + '.', title='Kenapa Struk Ini Bikin Boros?', extra='[SLOT-UJI]')
        self.assertFalse(any('Kuda Troya' in m for _, m in L.lint_episode(slot)))
        tapi = make(self.tmp, 't4', 13, 'Struk ini murah, tapi mahal. ' + W(90) + '.')     # spoken "tapi" in H1: only the batch rule applies
        self.assertFalse(any('H1 memuat' in m for _, m in L.lint_episode(tapi)))

    def test_abt_list_transitions_and_citation(self):
        noabt = make(self.tmp, 'a1', 13, ' '.join(['kata'] * 90) + '.')
        self.assertTrue(any('ABT' in m for _, m in L.lint_episode(noabt)))
        lst = make(self.tmp, 'a2', 13, W(90) + '. Selain itu, harga naik. Dan kemudian turun.')
        self.assertTrue(sum('transisi daftar' in m for _, m in L.lint_episode(lst)) == 2)
        cit = make(self.tmp, 'a3', 13, W(90) + '. Menurut sebuah studi di jurnal ternama pada 2021, belanja naik. Prof. Lee, et al.')
        self.assertTrue(sum('sitasi akademik' in m for _, m in L.lint_episode(cit)) >= 3)
        ok = make(self.tmp, 'a4', 13, W(90) + '. Tahun 2015, StubHub mengacak sebagian penggunanya.')
        self.assertFalse(any('sitasi' in m for _, m in L.lint_episode(ok)))

    def test_markers_artefak_loop_label(self):
        e = make(self.tmp, 'k1', 13, W(95) + '.', artefak=None, loop='tanpa panah', label='DATA INDONESIA + opini')
        msgs = [m for _, m in L.lint_episode(e)]
        self.assertTrue(any('[ARTEFAK' in m for m in msgs)); self.assertTrue(any('[LOOP' in m for m in msgs)); self.assertTrue(any('[LABEL] campuran' in m for m in msgs))
        ok = make(self.tmp, 'k2', 13, W(95) + '.', label='DATA INDONESIA + EKSPERIMEN BEIJING', title='Struk Ini Mencetak Dua Harga')
        self.assertEqual(L.lint_episode(ok), [])

    def test_upload_package(self):
        good = '''## 1. Judul\n```\nStruk Ini Mencetak Dua Harga\n```\n## 2. Deskripsi\n```\nStruk ini punya dua harga. Satu terlihat di awal. Satu baru muncul di akhir.\n\nSumber:\n• Blake dkk. 2021\n```\n## 5. Komentar pin\n```\nPernah kamu kaget lihat total bayar di akhir?\n```\n'''
        e = make(self.tmp, 'u1', 13, W(95) + '.', upload=good)
        self.assertEqual(L.lint_episode(e), [])
        badup = good.replace('Struk Ini Mencetak Dua Harga', 'Kenapa Struk Ini Mahal?').replace('Pernah kamu kaget lihat total bayar di akhir?', 'Bagikan ya.').replace('Sumber:', 'Referensi:').replace('Struk ini punya dua harga. Satu terlihat di awal. Satu baru muncul di akhir.', 'Struk ini punya dua harga.')
        e2 = make(self.tmp, 'u2', 13, W(95) + '.', upload=badup)
        msgs = [m for _, m in L.lint_episode(e2)]
        self.assertTrue(any('judul memuat' in m for m in msgs)); self.assertTrue(any('2–3 kalimat' in m for m in msgs))
        self.assertTrue(any('"Sumber:"' in m for m in msgs)); self.assertTrue(any('komentar pin' in m for m in msgs))

    def test_batch_slot_uji_quota(self):
        a = make(self.tmp, 'q1', 13, W(95) + '.', extra='[SLOT-UJI]'); b = make(self.tmp, 'q2', 14, W(95) + '.', extra='[SLOT-UJI]')
        self.assertTrue(any('3:1' in m for _, m in L.lint_batch([a, b])))

    def test_scaffold_placeholders_count_as_missing(self):
        e = make(self.tmp, 'ph', 13, W(95) + '.', hook='<arketipe>', segar='<tahun>|klasik', artefak='<benda>')
        msgs = [m for _, m in L.lint_episode(e)]
        self.assertTrue(any('[HOOK' in m for m in msgs)); self.assertTrue(any('[SEGAR' in m for m in msgs)); self.assertTrue(any('[ARTEFAK' in m for m in msgs))


if __name__ == '__main__':
    unittest.main(verbosity=1)
