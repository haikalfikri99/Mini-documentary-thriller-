# Arsip riwayat: 6-pelajaran.md baris 9-100
Asal: `.claude/skills/arsip-kasus/references/6-pelajaran.md` (rentang di bawah memakai nomor baris SEBELUM edit W3). Tanggal pemindahan: 23 Nov 2026. Alasan: log mentah #001–#005 (tabel lama, hipotesis terjawab, data jam-jam awal, proses #004, protokol Hibrida dibatalkan); aturan dan pelajaran produksi tetap di tempat asal, metrik terkini di tabel yang tersisa
Teks asli dipindah apa adanya (tanpa perubahan); aturan aktif yang tersisa ada di berkas asal.

---
## Asal baris 9-14

## Data per episode
| # | Judul | Wilayah | Durasi | Kata | Viewed vs swiped | APV | Engaged views (7 hari) | Catatan |
|---|---|---|---|---|---|---|---|---|
| 001 | Banjir Ini Bukan Air (Molase) | 1 | 61 dtk | 101 | — | — | — | engine toon lama |
| 002 | Pembuat Fitur Ini Menyesal… Kamu Sedang Memakainya | 2 | 44,8 dtk | 102 | **37,2% stayed** (12 jam) | — (belum diproses) | 185 (12 jam) | hook lemah → formula v3.1 (F7) |


---
## Asal baris 47-54

## Hipotesis yang sedang diuji (ubah satu per video)
| Hipotesis | Diuji di | Cara ukur | Hasil |
|---|---|---|---|
| Hook pengakuan pembuat + "kamu" menaikkan viewed vs swiped | #002 | Viewed vs swiped vs #001 | menunggu data |
| 45 dtk lebih baik dari 60 dtk untuk wilayah 2 | #002 | APV dan engaged views | menunggu data |
| Loop (kalimat akhir → frame 0) menaikkan replay | #002 | views / engaged views | menunggu data |
| Hook #002 (pengakuan, objek kabur, jeda 0,54 dtk) | #002 | stayed to watch | **gagal: 37,2%** |
| Gerbang F7 (benda konkret kata 1–3, kontradiksi ≤ 2 dtk, tanpa jeda, frame 0 terang & bergerak) menaikkan stayed to watch ke ≥ 50% | #003 | stayed to watch vs #002 | menunggu |

---
## Asal baris 56-62

## #003 Micin (13 Nov 2026) — ARSIP Kolase pertama
| Episode | Variabel yang diuji | Catat setelah 48 jam |
|---|---|---|
| 003 Micin Dituduh Bikin Bodoh… | pilar baru + gaya kolase + hero object di frame 0 + caption 84 px + tanpa CTA | stayed-to-watch, views, engaged views, subs |
Catatan: tiga variabel berubah sekaligus (peluncuran gaya), jadi hasilnya belum bisa diatribusikan ke satu penyebab.

**Data #003 (114 menit setelah tayang jam 18.00 WIB):** **47,0% stayed to watch** (vs #002 37,2% → +9,8 poin), 266 engaged views, ±434 views, 12 like (≈2,8%). Grafik engaged views naik dalam dua gelombang (datar ±30 menit lalu naik lagi) = distribusi tes kedua. Retensi belum diproses (≤ 2 hari). Masih di bawah ambang 60% → hook/frame 0 tetap prioritas perbaikan.

---
## Asal baris 73-75

## #004 Aqua Didenda Rp13,8 Miliar Gara-Gara Warung (14 Nov 2026)
Pilar baru kedua: benda/merek yang dikenal + kasus putusan KPPU. Bahan tidak punya arsip foto → gambar AI (Google Flow) untuk pertama kali, dibuat user dari prompt Claude. Film: 22 shot, 53,6 dtk, VO 2,66 kata/dtk, −14,2 LUFS. **Belum tayang; data 48 jam dicatat setelah tayang.**
**Proses (urutan yang berhasil):** riset topik berbasis data (`riset_topik.py` + gerbang hook/sudut Indonesia) → script v1→v5 (jargon dibuang, janji pilar dibayar, jembatan eksplisit, POV penonton) → VO 2 take + atempo → riset tempo VO (Apify, 28 Shorts, tempo tidak membedakan) → daftar benda + prompt AI → storyboard v1 → v2 lewat halaman Artifact berkomentar → audio → render.

---
## Asal baris 84-84

**Tambahan #004 (dari percakapan lengkap, supaya tidak hilang saat compact):** urutan koreksi user yang membentuk alur: (1) bohlam ditolak (tidak relate Indonesia) → riset topik wajib; (2) VidIQ habis → alat gratis; (3) fact sheet yang jujur tapi hambar ditolak → kemasan maksimal; (4) hook "kalah-menang-kalah" tidak jelas → angka + kata tunjuk; (5) KPPU/surel/menghukum/naik/menang harus jelas bagi penonton awam; (6) pilar harus terjawab; (7) pertanyaan penonton ditulis, jawaban bertahap; (8) tempo VO dari riset bukan dari video sendiri → 2,66; (9) gambar AI satu prompt blok; (10) review lewat Artifact; (11) tokoh metafora; (12) cap transparan; (13) proporsi diukur.

---
## Asal baris 87-87

**Data #004 (±11 jam setelah tayang, tangkapan layar Studio 15 Nov 2026 05:21 WIB):** **72,5% stayed to watch** / 27,5% swiped away (#003 47,0%, #002 37,2%; ambang Galloway 70–90% unggul), **average view duration 0:49** dari 53,6 dtk (grafik per jam naik sampai ±1:12–1:48, artinya ada replay/loop), Hype 0, 2 komentar (satu bertanya "13,5 miliar kemana?", sudah dijawab dengan fakta: denda disetor ke kas negara, status pembayaran tidak diketahui). Retensi per detik belum tersedia (diproses sampai 2 hari). **Kuat atau lemah:** satu video, 11 jam, jumlah penayangan belum dicatat; naik 25 poin dari #003 tetapi tiga variabel berubah sekaligus (topik merek + gambar AI + hook angka/kata tunjuk + tempo 2,66), jadi tidak bisa dipastikan penyebabnya. Hipotesis yang konsisten dengan data: hook "angka + merek + sebab kecil" dan tokoh metafora menahan penonton. **Catat lagi di 48 jam dan 7 hari:** views, engaged views, retensi per detik (titik drop), penonton baru vs kembali.

---
## Asal baris 100-100

**[DIBATALKAN 17 Nov 2026 siang: user memutuskan batch #009–#012 dikerjakan Claude penuh; lihat `AGENTS.md` §3 dan #76 `7-selera`.]** Protokol Transisi Hibrida: **#009–#012** = Mode Hibrida: riset topik, filter replikasi, fact sheet 2 lapis, dan **skrip AV 2 kolom final** dikerjakan user + Gemini (NotebookLM) lalu diserahkan ke Claude; Claude **tidak meriset topik #009–#012 sendiri**. Claude langsung ke tahap produksi teknis (`new_episode.sh` → `vo_prompt_elevenlabs.md` → …) dan **tetap memeriksa** paket skrip terhadap scorecard v6.0 + fakta (aturan #44: uji ke sumber primer sebelum menerima). **Tahap Produksi Teknis (setelah paket skrip diserahkan):** `new_episode.sh` → `vo_prompt_elevenlabs.md` → VO dibuat user manual di web ElevenLabs → proses & align VO (`vo_chain.py`, `align_vo.py`, `line_starts.py`) → prompt Google Flow Batch A/B (`flow_prompts.md`) → rakit kolase (`bake.py`, `film.js`) → storyboard HTML lokal → musik & foley (`score_full.py`, `fullmix.py`) → render & QA (`make_kolase.sh`) → paket upload (`make_cover.py`, `UPLOAD.md`, `upload_pack/`). **#013+:** Setelah #009–#012 tayang dan data 48 jam/7 hari tiap episode tercatat di `6-pelajaran.md`, **simpan naskah terbaik batch itu sebagai *gold standard reference*** di `research/gold_standard/` (skrip AV 2 kolom + metrik Studio + alasan terpilih), lalu **aktifkan kembali otomasi penuh**: riset topik v6.0 → seleksi → fact sheet → skrip AV 2 kolom → produksi akhir. Agen memakai gold standard sebagai acuan gaya/struktur, bukan menyalin isinya.
