"""Tests for lint_episode.py (v6.1 anti-monotony rules).   python3 kit/tools/test_lint_episode.py"""
import os, sys, json, tempfile, unittest
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lint_episode as L


def make(root, slug, no, script, hook='Bom di Bawah Meja', ending='Reframing Sistemik', segar='2024', dur=None):
    d = os.path.join(root, 'stories', slug); os.makedirs(os.path.join(d, 'audio')); os.makedirs(os.path.join(d, 'kolase'))
    md = '# ep\n' + (f'[HOOK: {hook}] ' if hook else '') + (f'[ENDING: {ending}] ' if ending else '') + (f'[SEGAR: {segar}]' if segar else '')
    open(os.path.join(d, 'README.md'), 'w').write(md)
    open(os.path.join(d, 'audio', 'script_vo.txt'), 'w').write(script)
    json.dump({'no': no, 'dur': dur or 0}, open(os.path.join(d, 'kolase', 'episode.json'), 'w'))
    return L.load(slug, root)


W = lambda n: ' '.join(['kata'] * n)


class T(unittest.TestCase):
    def setUp(self): self.tmp = tempfile.mkdtemp()

    def test_markers_and_canonical_names(self):
        e = make(self.tmp, 'a', 13, 'Struk ini aneh. ' + W(90) + '.\nItu yang terjadi di kasir.', hook='5. Titik Balik Hasil Ekstrem (K5)')
        self.assertEqual(e['hook'], 'Titik Balik Hasil Ekstrem'); self.assertEqual(e['ending'], 'Reframing Sistemik')
        self.assertEqual(e['mode'], 'Ringkas'); self.assertEqual(L.lint_episode(e), [])

    def test_missing_markers_error_from_13_warning_before(self):
        e13 = make(self.tmp, 'b', 13, W(120) + '.', hook=None, ending=None, segar=None)
        e09 = make(self.tmp, 'c', 9, W(120) + '.', hook=None, ending=None, segar=None)
        self.assertTrue(all(l == 'E' for l, _ in L.lint_episode(e13)))
        self.assertTrue(all(l == 'W' for l, _ in L.lint_episode(e09)))

    def test_exit_openers(self):
        for opener in ['Lain kali', 'Kalo kamu', 'Kalau kamu', 'Ingat ya', 'Jadi', 'Kesimpulannya', 'Pada akhirnya', 'Nah itulah']:
            e = make(self.tmp, 'x' + L.norm(opener).replace(' ', ''), 13, W(120) + '.\n' + opener + ', cek label harganya.')
            self.assertTrue(any('kata terlarang' in m for _, m in L.lint_episode(e)), opener)
        ok = make(self.tmp, 'ok', 13, W(120) + '.\nStruk itu tetap di dompetmu.')
        self.assertFalse(any('kata terlarang' in m for _, m in L.lint_episode(ok)))

    def test_old_exit_words_always_error(self):
        e = make(self.tmp, 'old', 10, W(120) + '.\nJadi, itulah alasannya.')
        self.assertIn('E', [l for l, m in L.lint_episode(e) if 'kata terlarang' in m])

    def test_seamless_loop_only_ringkas(self):
        e = make(self.tmp, 'loop', 13, W(125) + '.', ending='Lingkar Naratif Mulus')
        self.assertTrue(any('khusus Mode Ringkas' in m for _, m in L.lint_episode(e)))

    def test_batch_rules(self):
        a = make(self.tmp, 'b1', 13, 'Harga ini sama—tapi nggak laku. ' + W(90) + '.', hook='Celah Ujung Lidah', ending='Cermin Personal', segar='2022')
        b = make(self.tmp, 'b2', 14, 'Tombol ini kecil, tapi mahal. ' + W(90) + '.', hook='Celah Ujung Lidah', ending='Cermin Personal', segar='klasik')
        c = make(self.tmp, 'b3', 15, 'Kartu ini kosong. ' + W(120) + '.', hook='Bom di Bawah Meja', ending='Dilema Abu-Abu', segar='1998')
        d = make(self.tmp, 'b4', 16, 'Kantong ini Rp200. ' + W(90) + '.', hook='Titik Balik Hasil Ekstrem', ending='Pemicu Dunia Nyata', segar='klasik')
        msgs = [m for _, m in L.lint_batch([a, b, c, d])]
        self.assertTrue(any('hook sama berurutan' in m for m in msgs))
        self.assertTrue(any('penutup sama berurutan' in m for m in msgs))
        self.assertTrue(any('tidak selang-seling' in m for m in msgs))     # b1, b2 both Ringkas
        self.assertTrue(any('—tapi' in m for m in msgs))
        self.assertTrue(any('kesegaran' in m for m in msgs))               # only 1 fresh of 4

    def test_batch_clean(self):
        eps = [make(self.tmp, 'c%d' % i, 13 + i, s, hook=h, ending=en, segar=y) for i, (s, h, en, y) in enumerate([
            ('Struk ini aneh. ' + W(92) + '.', 'Bukti Visual Mendahului Konteks', 'Reframing Sistemik', '2023'),
            ('Tombol abu-abu ini mahal. ' + W(120) + '.', 'Bom di Bawah Meja', 'Dilema Abu-Abu', '2021'),
            ('Dua kartu sama, hasil beda. ' + W(90) + '.', 'Celah Ujung Lidah', 'Lingkar Naratif Mulus', 'klasik'),
            ('Toko ini rugi 3 miliar. ' + W(118) + '.', 'Titik Balik Hasil Ekstrem', 'Pemicu Dunia Nyata', 'klasik')])]
        self.assertEqual(L.lint_batch(eps), [])
        self.assertEqual([L.lint_episode(e) for e in eps], [[], [], [], []])


if __name__ == '__main__':
    unittest.main(verbosity=1)
