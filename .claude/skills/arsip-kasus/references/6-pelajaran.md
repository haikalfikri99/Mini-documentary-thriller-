# 6. Pelajaran & continuous improvement
Setiap episode menambah baris di sini. Formula, gaya, dan kit hanya berubah bila ada **bukti**: review user, data Studio setelah tayang, atau pengukuran (audio/frame). Satu variabel besar diubah per video agar efeknya terbaca.

## Cara memakai
1. Sebelum menulis script episode baru: baca bagian "Aturan yang lahir dari review" dan "Hipotesis yang sedang diuji".
2. Setelah review user: tambahkan setiap keberatan sebagai aturan umum (bukan hanya perbaikan shot), lalu masukkan ke referensi terkait (1–5) atau ke kit.
3. 7 hari setelah tayang: isi tabel data dari Studio (Viewed vs Swiped Away, APV, engaged views, like/komentar/share/sub); bandingkan dengan episode sebelumnya, bukan dengan angka umum.

## Data per episode
| # | Judul | Wilayah | Durasi | Kata | Viewed vs swiped | APV | Engaged views (7 hari) | Catatan |
|---|---|---|---|---|---|---|---|---|
| 001 | Banjir Ini Bukan Air (Molase) | 1 | 61 dtk | 101 | — | — | — | engine toon lama |
| 002 | Pembuat Fitur Ini Menyesal… Kamu Sedang Memakainya | 2 | 44,8 dtk | 102 | **37,2% stayed** (12 jam) | — (belum diproses) | 185 (12 jam) | hook lemah → formula v3.1 (F7) |

## Aturan yang lahir dari review user
### Cerita & script
- Taruhan harus dirasakan penonton; ironi intelektual saja dangkal (#002, Gruen ditolak).
- Shortlist judul + cerita singkat + penilaian dulu, riset hanya untuk judul terpilih.
- Bahasa lisan natural; hindari bahasa berita/tulis dan istilah kaku ("kontrol orang tua").
- Wilayah 2 harus menjawab "kenapa" dengan mekanisme (psikologi, desain, uang), bukan kumpulan pernyataan.
- Pakai framework yang terbukti, jangan berputar-putar menulis ulang: Formula ARSIP v5.0 + scorecard.

### Visual
- Hitam/putih polos untuk kepala ditolak; sawo matang dipilih lewat studi warna.
- Wajah/tangan yang "aneh" lebih buruk daripada sederhana: tangan harus seperti tangan memegang HP sungguhan.
- Cahaya harus logis (arah jendela), latar dan latar depan harus kaya, ruang beda untuk orang beda, perangkat lengkap (monitor + keyboard + mouse).
- Kartu ARSIP KASUS = templat channel, sama di setiap episode, cukup lama untuk dibaca (≥ 1,3 dtk).
- Animasi peristiwa tidak boleh terlalu cepat; SFX harus nyambung dengan gerak di layar.
- Akhir video tidak boleh hanya zoom: harus ada aksi yang menutup cerita.
- Gerak tokoh boleh sederhana asal mendukung cerita.

### Audio
- Claude tidak bisa mendengar → wajib QA terukur (`check_audio.py`, laporan margin per kata). #002: dentuman pecah tepat di kata "hilang" menutupi kata (3 dB) → dipindah ke celah sesudah kata.

### Data Studio
- #002 (12 jam): 37,2% stayed to watch / 62,9% swiped, 185 engaged views. Di bawah ambang 60% (Galloway 2023). Diagnosis & aturan baru: `1-cerita…` §F7 (gerbang 3 detik + rantai retensi). Rubrik internal (hook 9/10) terbukti terlalu murah hati.

### Riset niche (13 Nov 2026)
- Pilar dibingkai ulang: pintu masuk = benda/tempat/merek dikenal + anggapan dibalik; psikologi jadi isi jawaban (2,8% vs 17,9% breakout). Selingan: W4 + W6; W3/klenik keluar.
- Gaya tidak menentukan performa menurut data; yang diatur = isi frame 0 (benda besar, gerak 0,0 dtk, shot 2–3 dtk). **Diperbarui 13 Nov 2026:** user tidak puas dengan 2D vektor buatan kode (terlalu sederhana) → gaya diganti satu kali ke **ARSIP Kolase** dan dikunci; jangan ganti lagi tanpa data video kita sendiri.
- Target 1 video/hari → pustaka tipe adegan, VO via konektor, paket review harian.

### Proses
- Storyboard sebagai artifact dengan keyframe asli, komentar user di artifact, baru animasi.
- Analisa referensi dengan mengukur (shot length, luma, LUFS, kata/menit), bukan kesan.

## Hipotesis yang sedang diuji (ubah satu per video)
| Hipotesis | Diuji di | Cara ukur | Hasil |
|---|---|---|---|
| Hook pengakuan pembuat + "kamu" menaikkan viewed vs swiped | #002 | Viewed vs swiped vs #001 | menunggu data |
| 45 dtk lebih baik dari 60 dtk untuk wilayah 2 | #002 | APV dan engaged views | menunggu data |
| Loop (kalimat akhir → frame 0) menaikkan replay | #002 | views / engaged views | menunggu data |
| Hook #002 (pengakuan, objek kabur, jeda 0,54 dtk) | #002 | stayed to watch | **gagal: 37,2%** |
| Gerbang F7 (benda konkret kata 1–3, kontradiksi ≤ 2 dtk, tanpa jeda, frame 0 terang & bergerak) menaikkan stayed to watch ke ≥ 50% | #003 | stayed to watch vs #002 | menunggu |

## #003 Micin (13 Nov 2026) — ARSIP Kolase pertama
| Episode | Variabel yang diuji | Catat setelah 48 jam |
|---|---|---|
| 003 Micin Dituduh Bikin Bodoh… | pilar baru + gaya kolase + hero object di frame 0 + caption 84 px + tanpa CTA | stayed-to-watch, views, engaged views, subs |
Catatan: tiga variabel berubah sekaligus (peluncuran gaya), jadi hasilnya belum bisa diatribusikan ke satu penyebab.

**Data #003 (114 menit setelah tayang jam 18.00 WIB):** **47,0% stayed to watch** (vs #002 37,2% → +9,8 poin), 266 engaged views, ±434 views, 12 like (≈2,8%). Grafik engaged views naik dalam dua gelombang (datar ±30 menit lalu naik lagi) = distribusi tes kedua. Retensi belum diproses (≤ 2 hari). Masih di bawah ambang 60% → hook/frame 0 tetap prioritas perbaikan.

**Pelajaran produksi #003**
- Storyboard yang benar = frame di **85% shot** (komposisi lengkap); frame tengah menyesatkan karena benda yang disebut belakangan belum muncul.
- Review user menemukan masalah logika gambar (lihat `2-visual…` §E): manusia di eksperimen manusia, jarum mengarah ke tikus, visual berbeda untuk kalimat mirip, dot botol bulat, gambar tak berhubungan ditolak. **Cek daftar §E sebelum mengirim storyboard.**
- Momen layar hampir kosong di awal shot (menunggu kata) terlihat di contact sheet render → subjek shot harus ada sejak awal.
- Wikimedia API membatasi kecepatan (429) bila subagen mencari banyak sekaligus → pakai Openverse dulu, satu permintaan per detik; subagen yang macet dihentikan, sisa benda digambar sendiri (`engr_objects.py`).
- Gerbang Whisper: syaratnya mix ≥ VO (bukan sama persis); variasi ±2–3 kata pada kata gaul adalah noise ASR.
- File final > 30 MB bisa gagal terkirim (503) → kirim preview CRF 27 dulu, kirim ulang final kemudian.
- Waktu produksi #003 (setelah script/VO): mesin kolase + storyboard v1 ±2 jam (sekali saja), revisi storyboard ±20 menit, audio + render ±30 menit. Episode berikutnya memakai template: target storyboard ≤ 1 jam.

## #004 Aqua Didenda Rp13,8 Miliar Gara-Gara Warung (14 Nov 2026)
Pilar baru kedua: benda/merek yang dikenal + kasus putusan KPPU. Bahan tidak punya arsip foto → gambar AI (Google Flow) untuk pertama kali, dibuat user dari prompt Claude. Film: 22 shot, 53,6 dtk, VO 2,66 kata/dtk, −14,2 LUFS. **Belum tayang; data 48 jam dicatat setelah tayang.**
**Proses (urutan yang berhasil):** riset topik berbasis data (`riset_topik.py` + gerbang hook/sudut Indonesia) → script v1→v5 (jargon dibuang, janji pilar dibayar, jembatan eksplisit, POV penonton) → VO 2 take + atempo → riset tempo VO (Apify, 28 Shorts, tempo tidak membedakan) → daftar benda + prompt AI → storyboard v1 → v2 lewat halaman Artifact berkomentar → audio → render.
**Pelajaran:**
- Metafora tokoh menang: perusahaan = pabrik + orang berjas, lembaga = wasit, distributor = truk (user menolak "hanya botol" tiga kali).
- Cap harus terbaca di HP tetapi transparan (kartu krem ditolak).
- Proporsi dan arah gestur harus diukur di render; dua revisi terbuang karena perkiraan.
- Review lewat halaman Artifact yang bisa dikomentari jauh lebih ringan bagi user daripada gambar grid; baca semua komentar sekaligus.
- Gerbang Whisper mix ≥ VO gagal 1–2 kata walau musik/foley dibisukan → diagnosis dulu (`3-audio.md` §H); margin per kata tetap 20 dB.
- Tool baru ke kit: `storyboard_page/make_page.py`, `Baker.stamp(legible=True)`, `Baker.mirror`, `cut(tint_poly)`, `align_vo.py`, `riset_topik.py`.
- Waktu: script + riset topik + VO paling lama; storyboard 2 putaran revisi; audio + render ±15 menit.
**Tambahan #004 (dari percakapan lengkap, supaya tidak hilang saat compact):** urutan koreksi user yang membentuk alur: (1) bohlam ditolak (tidak relate Indonesia) → riset topik wajib; (2) VidIQ habis → alat gratis; (3) fact sheet yang jujur tapi hambar ditolak → kemasan maksimal; (4) hook "kalah-menang-kalah" tidak jelas → angka + kata tunjuk; (5) KPPU/surel/menghukum/naik/menang harus jelas bagi penonton awam; (6) pilar harus terjawab; (7) pertanyaan penonton ditulis, jawaban bertahap; (8) tempo VO dari riset bukan dari video sendiri → 2,66; (9) gambar AI satu prompt blok; (10) review lewat Artifact; (11) tokoh metafora; (12) cap transparan; (13) proporsi diukur.
**Riset topik #004 (hasil yang dipakai ulang):** shortlist lama dari bank ide saja ditolak user; alat gratis `riset_topik.py` (autocomplete YouTube + yt-dlp) mengukur permintaan dan celah; gerbang gugur: Lokal < 4, Celah < 3, Cerita < 3 (`research/niche/topik/RUMUS_PEMILIHAN.md`). Jenuh (gugur): Indomaret–Alfamart, token listrik, Gacoan, atap asbes, warung Madura, tiket pesawat. Angka views maksimum menipu → baca judulnya ("sachet 201 juta" = iklan sampo); autocomplete mentah banyak sampah. Pola Indonesia yang laku: "Dilarang di dunia, kenapa Indonesia masih…", "Rahasia di balik merek", "Kenapa tidak ada…", penjelasan kebijakan ekonomi. Kandidat gugur karena fakta tidak kuat: kedelai impor, gula Jawa, gas melon, sedot pulsa, kental manis (kerangka salah). Hook: judul angka +6,4 poin, uang +8,6, KAPITAL +5,0; kata negatif tidak terbukti; "padahal/tapi" di judul −5,2; hook tidak perlu selesai 2 dtk (median 3,7).

**Data #004 (±11 jam setelah tayang, tangkapan layar Studio 15 Nov 2026 05:21 WIB):** **72,5% stayed to watch** / 27,5% swiped away (#003 47,0%, #002 37,2%; ambang Galloway 70–90% unggul), **average view duration 0:49** dari 53,6 dtk (grafik per jam naik sampai ±1:12–1:48, artinya ada replay/loop), Hype 0, 2 komentar (satu bertanya "13,5 miliar kemana?", sudah dijawab dengan fakta: denda disetor ke kas negara, status pembayaran tidak diketahui). Retensi per detik belum tersedia (diproses sampai 2 hari). **Kuat atau lemah:** satu video, 11 jam, jumlah penayangan belum dicatat; naik 25 poin dari #003 tetapi tiga variabel berubah sekaligus (topik merek + gambar AI + hook angka/kata tunjuk + tempo 2,66), jadi tidak bisa dipastikan penyebabnya. Hipotesis yang konsisten dengan data: hook "angka + merek + sebab kecil" dan tokoh metafora menahan penonton. **Catat lagi di 48 jam dan 7 hari:** views, engaged views, retensi per detik (titik drop), penonton baru vs kembali.

## Data Studio #001–#005 + keputusan migrasi v6.0 (17 Nov 2026)
**Metrik aktual (angka dari user, YouTube Studio; usia data berbeda per baris):**
| # | Views | Stayed to watch | APV | Catatan |
|---|---|---|---|---|
| 001 | 1.525 | 70,56% | 72,77% | engine toon lama; 61 dtk (kendur setelah klimaks) |
| 002 | 759 | 43,71% | 67,16% | angka lama saat 12 jam: 37,2% stayed (naik setelah data matang) |
| 003 | 1.325 | 46,13% | 52,76% | angka lama (11 jam): 47,0%; ARSIP Kolase pertama |
| 004 | 7.346 (hari 1) | **79,18%** | **104,12%** | angka lama (±11 jam): 72,5% stayed, AVD 0:49; terbaik; hook angka+merek+sebab kecil, penutup pertanyaan |
| 005 | ±1.500 (15 hari) | 64,6% | **belum diambil dari Studio**; dicatat nanti saat ekspor CSV mingguan (keputusan user 17 Nov) | Circular Reframe Loop (uji pertama); **stayed 64,6% < ambang 65%**, belum bisa dinilai gagal/berhasil tanpa APV dan usia sebanding dengan #004 |
Catatan jujur: angka #001–#003 di tabel ini adalah pembaruan dari user dan sebagian berbeda dari angka awal di bagian #003/#004 di atas (yang tetap dipertahankan sebagai log pada usia datanya). #004 dan #005 beda usia (hari 1 vs 15 hari); jangan dibandingkan langsung. #001 punya stayed tinggi (70,56%) tetapi APV 72,77%: format panjang yang kendur, bukan kegagalan hook.
**Keputusan migrasi v6.0 (17 Nov 2026):** Formula ARSIP v6.0 menjadi standar #009+ (`KEPUTUSAN_RISET.md` v6.0; `1-cerita…` §M; `8-hook…` §H; `RUMUS_PEMILIHAN.md` v6.0; `2-visual…` §K; `7-selera…` #69–#75). Aturan lama yang bentrok ditandai "digantikan" tetapi tidak dihapus. Beberapa elemen v6.0 adalah **hipotesis blueprint, belum teruji di data kanal** (Mode Ringkas 35–42 dtk, mesin 40/35/25, ambang monetisasi ⚠); hasil #009+ dicatat di sini per batch.
**[DIBATALKAN 17 Nov 2026 siang: user memutuskan batch #009–#012 dikerjakan Claude penuh; lihat `AGENTS.md` §3 dan #76 `7-selera`.]** Protokol Transisi Hibrida: **#009–#012** = Mode Hibrida: riset topik, filter replikasi, fact sheet 2 lapis, dan **skrip AV 2 kolom final** dikerjakan user + Gemini (NotebookLM) lalu diserahkan ke Claude; Claude **tidak meriset topik #009–#012 sendiri**. Claude langsung ke tahap produksi teknis (`new_episode.sh` → `vo_prompt_elevenlabs.md` → …) dan **tetap memeriksa** paket skrip terhadap scorecard v6.0 + fakta (aturan #44: uji ke sumber primer sebelum menerima). **Tahap Produksi Teknis (setelah paket skrip diserahkan):** `new_episode.sh` → `vo_prompt_elevenlabs.md` → VO dibuat user manual di web ElevenLabs → proses & align VO (`vo_chain.py`, `align_vo.py`, `line_starts.py`) → prompt Google Flow Batch A/B (`flow_prompts.md`) → rakit kolase (`bake.py`, `film.js`) → storyboard HTML lokal → musik & foley (`score_full.py`, `fullmix.py`) → render & QA (`make_kolase.sh`) → paket upload (`make_cover.py`, `UPLOAD.md`, `upload_pack/`). **#013+:** Setelah #009–#012 tayang dan data 48 jam/7 hari tiap episode tercatat di `6-pelajaran.md`, **simpan naskah terbaik batch itu sebagai *gold standard reference*** di `research/gold_standard/` (skrip AV 2 kolom + metrik Studio + alasan terpilih), lalu **aktifkan kembali otomasi penuh**: riset topik v6.0 → seleksi → fact sheet → skrip AV 2 kolom → produksi akhir. Agen memakai gold standard sebagai acuan gaya/struktur, bukan menyalin isinya.

## Batch #009–#012 (17 Nov 2026): verifikasi sebelum produksi
- **#009 (terkunci user): pemeriksaan sumber menemukan 5 klaim yang bertentangan atau tidak didukung** (terutama "lebih murah": tiga sumber menyatakan harga A&W 1/3 pound SAMA dengan Quarter Pounder). VO ditahan sampai user memutuskan; rincian di `stories/burger/README.md`. Pelajaran: kasus populer yang dikutip blog sering membawa detail turunan yang keliru ("lebih murah", "tes tertutup", "mayoritas"); selalu cek harga, metode, dan persentase ke ≥ 2 sumber sebelum VO.
- **#010 (kantong plastik Rp200):** angka KLHK berbeda antar-sumber (25–30% menurut Antara; angka kota berbeda); ringkasan pencarian menyebut 30% rata-rata dan Balikpapan 65%, yang **tidak terkonfirmasi** saat artikel dibaca. Pelajaran: ringkasan hasil pencarian bukan fakta; baca artikelnya.
- **#012 (biaya tambahan):** bukti ilmiah ada, tetapi sisi Indonesia tidak terverifikasi (Bisnis/Kontan 403); belum boleh direkam.

## Evolusi ke Formula ARSIP v7.0 (20 Nov 2026, keputusan user)
- **Evaluasi #001–#016 (angka dari user/Studio):** abstrak/mitos/tips ringan kalah (#002 43,71%, #003 46,13% stayed; #010 plastik Rp200 dan #012 kartu cap tertinggal); investigasi sistem/uang/harga/kebijakan unggul (#004 79,18% stayed / 104,12% APV; #005 66,2% stayed [tabel lama 64,6% pada 15 hari]; #006; #009 80,90% stayed). Angka #006/#010/#012 belum dicatat di sini; isi saat ekspor Studio.
- **Keputusan:** v7.0 mengakhiri batasan "psikologi perilaku murni" (v6.0/v6.1); 2 Mesin A (sistem/bisnis/uang/kebijakan ~60%) + B (desain/harga/perilaku ~40%); riset per batch (6 → 4); "tapi/padahal" dilarang hanya di judul + pembuka, boleh di body; bahasa lisan luwes 8–13 kata/kalimat; rotasi latar visual; log `stories/episode_log.json` + linter lintas-batch. Sumber: `AGENTS.md` §2, `KEPUTUSAN_RISET.md` v7.0.
- **Pelajaran produksi #013–#016:** riset borongan menurunkan kualitas slot akhir (#014 Password NIST ditolak user, diganti); gambar AI berwajah realistis di sebelah kutipan lembaga/pejabat berisiko dikira orang asli; nominal ilustrasi (Rp50.000 → Rp60.000) tidak diucapkan VO dan wajib berlabel ILUSTRASI; gerbang Whisper bisa gagal karena kata tertentu (ongkir) meski margin suara 19 dB.
- **Hipotesis v7.0 (uji, jangan ubah dari satu video):** Mesin A ≥ B pada stayed-to-watch dan APV; klaster 4–5 episode senada layak dijadikan long-form.
