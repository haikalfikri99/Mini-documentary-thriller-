# Perubahan W5 (23 Nov 2026): linter, scaffold, check_visual
Berkas disunting: `kit/tools/lint_episode.py`, `kit/tools/test_lint_episode.py`, `kit/tools/new_episode.sh`, `kit/tools/check_visual.mjs`. Tidak ada commit/push dari W5.

## Tabel tindakan
| Item (brief / matriks) | Tindakan | Berkas |
|---|---|---|
| Keputusan 7: kesegaran bukan gerbang | `[SEGAR]` opsional (tidak ERROR bila hilang); cek "min 2 dari 4 segar" dihapus; field `fresh` dibuang; `[SEGAR]` tetap dicetak/dicatat di log sebagai catatan | lint_episode.py (load, lint_episode, lint_batch) |
| Pola H1 "X—tapi Y" berulang | Fungsi `h1_pattern` + cek batch dihapus; `write_log` tidak lagi menulis `h1_tapi` | lint_episode.py (write_log, lint_batch) |
| Keputusan 3: tapi/padahal | `tapi` dan `padahal` masuk daftar `ABT` (perekat sah di body). Tetap ERROR (#017+; WARN sebelumnya): "tapi" di kalimat pembuka; Kuda Troya (psikologi/bias/kenapa/padahal/tapi/ternyata/?) di judul; H1 memuat psikologi/bias/kenapa/padahal/ternyata/? (ERROR #013+, perilaku lama dipertahankan). WARN bila tapi/padahal > 3 di body (lama, dipertahankan) | lint_episode.py (ABT, TROJAN*) |
| Keputusan 2: maks 1 dari 4 pembuka "[benda] ini / kayak gini" | Cek batch BARU `opens_with_itu`: kata `ini` atau `kayak gini/begini/gini` dalam 8 kata pertama kalimat pertama; > 1 dari batch = ERROR bila ada episode #017+, WARN bila lebih awal; pesan menyebut episode + menu bentuk lain | lint_episode.py (lint_batch) |
| Sapu nominalisasi/pasif | WARN baru per skrip: nominal pe-/ke-/per-…-an dan -isasi ≥ 4, atau nominal + pasif di-/ter- ≥ 9 (dengan daftar kecuali kata benda konkret/bukan pasif) | lint_episode.py (`sapu_nominalisasi`) |
| Docstring | Ditulis ulang untuk v7.0 (v6.1 tidak lagi disebut aktif) | lint_episode.py:1–18 |
| Tes | Diperbarui (segar, "—tapi", batch bersih tanpa pembuka "ini") + tes baru: tapi/padahal = ABT, batch pembuka "ini" (2 gagal, 1 lolos, 0 lolos, `kayak gini`, WARN pra-#017), sapu nominalisasi. 22 tes lulus | test_lint_episode.py |
| new_episode.sh | Baris kata tunjuk visual → "benda Frame 0 ditunjuk lewat visual; bentuk dari menu (8-hook §K), maks 1 dari 4 …"; Topic Stress-Test v6.0 → v7.0 (4 uji); monetisasi = pembeda bukan gerbang (baris rubrik + kalimat rubrik); `[SEGAR]` dipindah ke baris "catatan saja" (tidak dicek); baris notasi AV selaras §M4 (tag emosi v4 vs notasi `/`). Anchor `§F`, `§M`, nama judul bagian README tidak diubah. `bash -n` ok; scaffold dicoba (slug uji dihapus) | new_episode.sh |
| check_visual.mjs (S5 §2.1, H1 matriks spek) | Ditambah peringatan (bukan serius): bagian non-backdrop dengan tepi atas y < 100 selama ≥ 0.5 dtk (tidak tumpang tindih dengan cek potong tepi ≥ 20 px). `node --check` ok; TIDAK diuji jalan (Playwright tidak terpasang di sesi ini) | check_visual.mjs |

## Hasil verifikasi
- Runner repo = `unittest` (pytest tidak terpasang): `python3 kit/tools/test_lint_episode.py` → 22 tes OK.
- Sapu nominalisasi pada 17 `stories/*/audio/script_vo.txt`: 1 kena (migor: 3 nominal + 6 pasif). Ambang dituning dari data nyata (versi naif mengenai hampir semua skrip karena pasif di-/ter- wajar dalam lisan).
- `lint_episode.py --batch migor bankkeliling beras kuota`: 1 ERROR, 3 dari 4 episode dibuka dengan "[benda] ini": #018 bankkeliling ("Amplop pinjaman dua ratus ribu ini …"), #019 beras ("Label premium di karung beras ini …"), #020 kuota ("Dua puluh giga di layar ini …"). Skrip terkunci/tidak diubah W5; keputusan pengguna diperlukan (lihat bawah). Peringatan lain: sapu pada migor; UPLOAD.md masih kerangka.

## PERTANYAAN USER
1. Batch #017–#020 sekarang gagal aturan baru "maks 1 dari 4 pembuka berpola 'ini'" (3 episode). Skrip dikunci; ubah pembuka #018–#020 (maks 1 dipertahankan), atau terima pengecualian batch ini?
2. `8-hook §K` ("menu bentuk kalimat pembuka") dirujuk brief, tetapi belum ada di 8-hook-dan-judul.md saat W5 bekerja (hanya §J). Teks new_episode.sh merujuk §K; pastikan agen pemilik 8-hook membuatnya (atau ubah rujukan menjadi §J).
3. Cek ERROR H1 untuk "kenapa/ternyata/padahal/?" di kalimat pembuka berlaku sejak #013 (lama); brief hanya menyebut #017+. Dipertahankan; ubah ke #017+ bila diinginkan.

## Sengaja tidak diubah
Kuda Troya, Anti-Exit Words, selang-seling mode, rotasi latar/hook/penutup, Mesin A 2–3 dari 4, kuota 3:1, paket upload, cek vs `episode_log.json`. Kolom `segar` di `stories/episode_log.json` dibiarkan (data historis). Referensi (`1-cerita` §M7.4/§M7.5, 9-playbook, RUMUS_PEMILIHAN, AGENTS.md §19) masih menyebut "min 2 dari 4 segar" dan cek "—tapi" dan perlu disamakan oleh pemilik berkasnya (bukan W5): `1-cerita-dan-script.md:243,252`, `9-playbook-riset-batch.md:6`, `RUMUS_PEMILIHAN.md:87`, `AGENTS.md:19`.
