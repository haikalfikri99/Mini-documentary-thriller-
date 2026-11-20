# Laporan Audit Formula ARSIP v7.0 untuk pemeriksa independen (Gemini)
Repo: haikalfikri99/mini-documentary-thriller- · cabang `main` · commit v7.0 `bd75b38`, data Studio `8457dc9` + `d5c09ce`, catatan Studio seluler `abaaf24`, pembeda monetisasi = commit terbaru. Tanggal 20 Nov 2026. Pelaksana: Claude. Pemeriksa diminta mencocokkan **setiap butir di bawah dengan isi file yang disebut**, lalu menandai ✓ / ✗ / catatan.

## A. Aturan v7.0 yang harus ada (SSOT: `AGENTS.md` §2 + §2A)
| # | Butir | Lokasi bukti |
|---|---|---|
| 1 | Alasan upgrade: topik abstrak/mitos tertinggal, investigasi sistem/uang/harga/kebijakan unggul; mengakhiri batasan "psikologi perilaku murni" | `AGENTS.md` §2 (awal), `KEPUTUSAN_RISET.md` v7.0, `6-pelajaran.md` "Evolusi ke v7.0" |
| 2 | 2 Mesin: A ~60% (A1 skandal/kartel/celah aturan, A2 backfire) · B ~40% (B3 jebakan harga/desain, B4 anomali perilaku teruji); batch 4 episode = A 2–3 | `AGENTS.md` §2, `RUMUS_PEMILIHAN.md` v7.0 |
| 3 | Garis Merah 4 butir (self-help; mitos datar/pasal kaku; topik basi + Daftar Hitam replikasi; meta-YouTube) | idem |
| 4 | Topic Stress-Test 4 uji (anti-basi 2 tahun; dekat dompet/hidup 20–45; 3 Pilar Konflik; Vox Handle) | idem |
| 5 | Riset per batch: 6 kandidat → verifikasi → 4 terkunci; riset ≠ skrip; Fact Sheet 2 Lapis; label asal data; tanpa nomor pasal | `AGENTS.md` §2, §3 |
| 6 | Judul ≤ 55 (ideal 38–48); judul DAN kalimat pembuka 0–4 dtk dilarang: psikologi, bias, kenapa, padahal, tapi, ternyata, "?"; body BOLEH tapi/padahal (ABT) | `AGENTS.md` §2; `8-hook…` §J; `1-cerita…` §M9; `7-selera` #91 |
| 7 | Bahasa lisan luwes, 8–13 kata/kalimat (pecah > 15–16), tanpa staccato 3+, penanda `/` dan `//`, 2 mode durasi, zero-citation, penutup 5 arketipe + Anti-Exit Words + tail ≤ 0,15 dtk | `AGENTS.md` §2; `1-cerita…` §M9 |
| 8 | Rotasi latar visual `[LATAR]` (tidak 3 berturut), Flow 1 variasi + #FFFFFF, kode warna | `2-visual…` §O; flow template |
| 9 | VO jalur utama = konektor ElevenLabs | `AGENTS.md` §5; `3-audio.md` §K |
| 10 | **Pembeda monetisasi (bukan gerbang)** — keputusan user 20 Nov | `AGENTS.md` §2; `RUMUS_PEMILIHAN.md`; `7-selera` #94 |
| 11 | `gold_standard` #009 = acuan ritme/visual, bukan gaya bahasa | `research/gold_standard/README.md` |

## B. Tooling (verifikasi dijalankan Claude; pemeriksa boleh mengulang)
- `python3 -m py_compile kit/tools/lint_episode.py` → OK; `bash -n kit/tools/new_episode.sh` → OK.
- `python3 kit/tools/test_lint_episode.py` → 19 tes OK (14 lama + 5 baru v7.0: tapi di pembuka vs body, penanda MESIN/LATAR, kutipan kaku/kalimat panjang/staccato, rotasi latar + porsi Mesin A, log lintas-batch).
- `python3 kit/tools/lint_episode.py stories/aqua` → 0 error (episode lama: hanya peringatan). `--batch biayalayanan ongkir terlaris zonasi` → 0 error, 1 peringatan riwayat (#012 dan #013 sama-sama Investigasi).
- v7.0 = **error mulai #017**; #013–#016 (skrip terkunci user) dan #001–#012 = peringatan. `stories/episode_log.json` mencatat #009–#016 (mesin/latar #009–#012 kosong karena penandanya belum ada).
- Yang TIDAK diuji: `check_visual.mjs` dan `make_kolase.sh` tidak diubah.

## C. Data empiris yang dipakai (sumber: ekspor Studio user, 19 Nov, 11 video; `6-pelajaran.md` "Ekspor Studio 19 Nov")
#004 78,48% stayed / 102,05% APV · #005 72,97 / 92,78 · #006 72,05 / 96,35 · #009 80,90 / 91,49 · #007 65,71 / 93,82 · #010 70,32 / **46,41** · #008 70,80 / 74,15 · #002 44,79 / 67,78 · #003 46,60 / 54,44. #004–#006 = 78% penayangan. #012 (14 jam): stayed 51,5%, belum terbaca.
**Koreksi yang dibuat Claude selama sesi (bukti kehati-hatian, mohon dicek ulang):** (a) angka #005 sempat 66,2% (dari chat) → 75,8% (ekspor 7 video) → 72,97% (ekspor 11 video, final); (b) #012 dan #010 awalnya disebut "tertinggal"; data: #012 belum bisa dinilai, #010 hook menahan (70%) tetapi APV 46%.

## D. Penyimpangan dan keputusan yang perlu dinilai Gemini
1. **Gemini (percakapan lain) menulis burstiness "kalimat hantam 2–5 kata selang-seling"** vs instruksi user "hindari staccato 2–4 kata beruntun, 8–13 kata". Claude mengikuti instruksi user; linter memperingatkan hanya 3+ kalimat ≤ 4 kata beruntun.
2. **Usul "gerbang ke-4 Kesiapan Monetisasi" dijadikan pembeda, bukan gerbang** (alasan: akan menyingkirkan topik denda/kebijakan yang paling banyak ditonton). Mohon nilai apakah ini wajar.
3. **Ambang monetisasi ±500 subscriber, RPM Shorts US$0,012, YPP 20 juta views per 1 Feb 2027 = klaim sumber sekunder (⚠)**, belum diverifikasi ke YouTube Help/Shopee. Mohon cek bila bisa.
4. **Bank 25 topik di PDF analisis pasar tidak dipakai mentah:** 5 topik meta-YouTube (dilarang Garis Merah 4), banyak topik geopolitik/true-crime tidak lolos Tes Grup WA; hanya 5 arah dicatat (`research/niche/ANALISIS_PASAR_2026-11.md`). Mohon periksa apakah ada yang keliru dibuang.
5. Contoh judul Gemini ("…Sengaja Dijual Rugi", "isinya berkurang seperlima") memuat klaim niat dan angka tanpa fact sheet; tidak dipakai.
6. Tidak semua file referensi dibaca penuh (±250 KB); `1-cerita`, `8-hook`, `KEPUTUSAN_RISET`, `RUMUS`, `6-pelajaran` dibaca per bagian + pencarian kata kunci. Mohon cari aturan lama yang masih bentrok dengan v7.0 (kata kunci: "tapi" di H1, "3 Mesin", "default", "maks 1 Ringkas", "Jembatan Audiens").
7. `raw_take1.mp3`/`raw_words.json` (14+ episode) dihapus dari repo atas perintah user; `vo_tighten.py` butuh take mentah baru bila VO dirapatkan ulang.

## E. Belum dilakukan (sengaja, atas perintah user)
Tidak ada episode baru, skrip baru, atau riset topik baru. Riset batch #017–#020 menunggu perintah user (Minggu).
