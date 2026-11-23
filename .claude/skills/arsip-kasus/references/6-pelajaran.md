# 6. Pelajaran & continuous improvement
Setiap episode menambah baris di sini. Formula, gaya, dan kit hanya berubah bila ada **bukti**: review user, data Studio setelah tayang, atau pengukuran (audio/frame). Satu variabel besar diubah per video agar efeknya terbaca.

## Cara memakai
1. Sebelum menulis script episode baru: baca bagian "Aturan yang lahir dari review" dan "Hipotesis yang sedang diuji".
2. Setelah review user: tambahkan setiap keberatan sebagai aturan umum (bukan hanya perbaikan shot), lalu masukkan ke referensi terkait (1–5) atau ke kit.
3. 7 hari setelah tayang: isi tabel data dari Studio (Viewed vs Swiped Away, APV, engaged views, like/komentar/share/sub); bandingkan dengan episode sebelumnya, bukan dengan angka umum. Catat juga **share rate kanal sendiri** (share ÷ views dari Studio): dokumen riset Strategi (zero-CTA WhatsApp, Berger–Milkman) menyarankan merancang pemicu share, sedangkan `ANALISIS_PASAR` (Dynamoi ⚠) menulis "share 95% lebih rendah, tidak bisa diandalkan"; putusan = ukur sendiri.
4. Saat retensi per detik tersedia: audit setiap penurunan kurva ≥ 4% ke kalimat/shot penyebabnya (SOP/Strategi D5; aturan rinci di `1-cerita…` §L) dan tulis temuannya di kolom Catatan.

## Ringkasan log #001–#005 (5 baris; tabel per-episode lama diarsipkan, metrik terkini di tabel "Data Studio" dan "Ekspor Studio 19 Nov" di bawah)
- **#001 Molase** (engine toon lama): stayed tinggi (70,56%) tetapi APV 72,77%: 61 dtk, kendur setelah klimaks.
- **#002 Fitur Scroll:** hook pengakuan/abstrak gagal (37,2% pada 12 jam, 43,71% setelah matang) → lahir gerbang F7 (`1-cerita…` §F7).
- **#003 Micin:** ARSIP Kolase pertama; 47,0% (11 jam) → 46,13% (matang); tiga variabel berubah sekaligus, penyebab tak bisa diatribusikan.
- **#004 Aqua:** 72,5% (11 jam) → 79,18% hari 1 → 78,48% / APV 102,05% (ekspor 19 Nov); hook angka+merek+sebab kecil, tokoh metafora, penutup pertanyaan.
- **#005 Skutik:** Circular Reframe Loop uji pertama; stayed 64,6% (15 hari, versi 17 Nov) vs 72,97% / APV 92,78% (ekspor 19 Nov); satu video tidak cukup menilai penutup.
**[DIARSIPKAN → arsip-riwayat/6-pelajaran_baris9-100.md]** (tabel "Data per episode" #001–#002 + log mentah di bawah).

## Aturan yang lahir dari review user
### Cerita & script
- Taruhan harus dirasakan penonton; ironi intelektual saja dangkal (#002, Gruen ditolak).
- Shortlist judul + cerita singkat + penilaian dulu, riset hanya untuk judul terpilih.
- Bahasa lisan natural; hindari bahasa berita/tulis dan istilah kaku ("kontrol orang tua").
- Wilayah 2 harus menjawab "kenapa" dengan mekanisme (psikologi, desain, uang), bukan kumpulan pernyataan.
- Pakai framework yang terbukti, jangan berputar-putar menulis ulang: Formula ARSIP v5.0 + scorecard.

### Visual
*(Butir tokoh/wajah/tangan/cahaya di bawah berasal dari engine animasi 2D/toon lama #001–#002, kini digantikan gaya ARSIP Kolase; prinsip logika gambar tetap hidup di `2-visual…` §E/§G.)*
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
Hipotesis #002–#003 (hook pengakuan, 45 vs 60 dtk, loop, gerbang F7) sudah terjawab dan **[DIARSIPKAN → arsip-riwayat/6-pelajaran_baris9-100.md]**. Hipotesis aktif: bagian "Evolusi ke Formula ARSIP v7.0" di bawah (Mesin A ≥ B; klaster 4–5 episode) dan share rate kanal sendiri (lihat "Cara memakai" butir 3).

## #003 Micin (13 Nov 2026) — ARSIP Kolase pertama
Tiga variabel berubah sekaligus (pilar baru + gaya kolase + hero object frame 0 + caption 84 px + tanpa CTA); data awal 47,0% stayed (114 menit; +9,8 poin vs #002), 266 engaged views. **[DIARSIPKAN → arsip-riwayat/6-pelajaran_baris9-100.md]** (tabel variabel dan paragraf data mentah).

**Pelajaran produksi #003**
- Storyboard yang benar = frame di **85% shot** (komposisi lengkap); frame tengah menyesatkan karena benda yang disebut belakangan belum muncul.
- Review user menemukan masalah logika gambar (lihat `2-visual…` §E): manusia di eksperimen manusia, jarum mengarah ke tikus, visual berbeda untuk kalimat mirip, dot botol bulat, gambar tak berhubungan ditolak. **Cek daftar §E sebelum mengirim storyboard.**
- Momen layar hampir kosong di awal shot (menunggu kata) terlihat di contact sheet render → subjek shot harus ada sejak awal.
- Wikimedia API membatasi kecepatan (429) bila subagen mencari banyak sekaligus → pakai Openverse dulu, satu permintaan per detik; subagen yang macet dihentikan, sisa benda digambar sendiri (`engr_objects.py`).
- Gerbang Whisper: syaratnya mix ≥ VO (bukan sama persis); variasi ±2–3 kata pada kata gaul adalah noise ASR.
- File final > 30 MB bisa gagal terkirim (503) → kirim preview CRF 27 dulu, kirim ulang final kemudian.
- Waktu produksi #003 (setelah script/VO): mesin kolase + storyboard v1 ±2 jam (sekali saja), revisi storyboard ±20 menit, audio + render ±30 menit. Episode berikutnya memakai template: target storyboard ≤ 1 jam.

## #004 Aqua Didenda Rp13,8 Miliar Gara-Gara Warung (14 Nov 2026)
Pilar kedua: benda/merek dikenal + putusan KPPU; gambar AI (Google Flow) pertama; 22 shot, 53,6 dtk, VO 2,66 kata/dtk, −14,2 LUFS. Urutan kerja yang berhasil: riset topik berbasis data → script v1→v5 → VO + atempo → daftar benda + prompt AI → storyboard (Artifact) → audio → render. **[DIARSIPKAN → arsip-riwayat/6-pelajaran_baris9-100.md]** (log proses lengkap).
**Pelajaran:**
- Metafora tokoh menang: perusahaan = pabrik + orang berjas, lembaga = wasit, distributor = truk (user menolak "hanya botol" tiga kali).
- Cap harus terbaca di HP tetapi transparan (kartu krem ditolak).
- Proporsi dan arah gestur harus diukur di render; dua revisi terbuang karena perkiraan.
- Review lewat halaman Artifact yang bisa dikomentari jauh lebih ringan bagi user daripada gambar grid; baca semua komentar sekaligus.
- Gerbang Whisper mix ≥ VO gagal 1–2 kata walau musik/foley dibisukan → diagnosis dulu (`3-audio.md` §H); margin per kata tetap 20 dB.
- Tool baru ke kit: `storyboard_page/make_page.py`, `Baker.stamp(legible=True)`, `Baker.mirror`, `cut(tint_poly)`, `align_vo.py`, `riset_topik.py`.
- Waktu: script + riset topik + VO paling lama; storyboard 2 putaran revisi; audio + render ±15 menit.
**[DIARSIPKAN → arsip-riwayat/6-pelajaran_baris9-100.md]** "Tambahan #004": 13 koreksi user berurutan (bohlam → riset topik wajib; fakta hambar ditolak; hook angka + merek; jargon dijelaskan; tokoh metafora; cap transparan; proporsi diukur; review lewat Artifact) sudah menjadi aturan di `7-selera…` dan `2-visual…` §G.
**Riset topik #004 (hasil yang dipakai ulang):** shortlist lama dari bank ide saja ditolak user; alat gratis `riset_topik.py` (autocomplete YouTube + yt-dlp) mengukur permintaan dan celah; gerbang gugur: Lokal < 4, Celah < 3, Cerita < 3 (`research/niche/topik/RUMUS_PEMILIHAN.md`). Jenuh (gugur): Indomaret–Alfamart, token listrik, Gacoan, atap asbes, warung Madura, tiket pesawat. Angka views maksimum menipu → baca judulnya ("sachet 201 juta" = iklan sampo); autocomplete mentah banyak sampah. Pola Indonesia yang laku: "Dilarang di dunia, kenapa Indonesia masih…", "Rahasia di balik merek", "Kenapa tidak ada…", penjelasan kebijakan ekonomi. Kandidat gugur karena fakta tidak kuat: kedelai impor, gula Jawa, gas melon, sedot pulsa, kental manis (kerangka salah). Hook: judul angka +6,4 poin, uang +8,6, KAPITAL +5,0; kata negatif tidak terbukti; "padahal/tapi" di judul −5,2; hook tidak perlu selesai 2 dtk (median 3,7).

**[DIARSIPKAN → arsip-riwayat/6-pelajaran_baris9-100.md]** "Data #004 ±11 jam" (72,5% stayed, AVD 0:49, 2 komentar, hipotesis hook angka+merek+sebab kecil); angka matang #004 ada di tabel "Data Studio" dan "Ekspor Studio 19 Nov".

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
**[DIBATALKAN 17 Nov 2026 siang; [DIARSIPKAN → arsip-riwayat/6-pelajaran_baris9-100.md]]** Protokol Transisi Hibrida #009–#012 (riset/skrip oleh user + Gemini): batch #009–#012 dikerjakan Claude penuh (`AGENTS.md` §3). Yang tetap hidup dari catatan lama: setelah #009–#012 tayang dan datanya tercatat, naskah terbaik batch disimpan sebagai *gold standard reference* di `research/gold_standard/` (acuan ritme/visual, bukan bahasa; `AGENTS.md` §3).

## Batch #009–#012 (17 Nov 2026): verifikasi sebelum produksi
- **#009 (terkunci user): pemeriksaan sumber menemukan 5 klaim yang bertentangan atau tidak didukung** (terutama "lebih murah": tiga sumber menyatakan harga A&W 1/3 pound SAMA dengan Quarter Pounder). VO ditahan sampai user memutuskan; rincian di `stories/burger/README.md`. Pelajaran: kasus populer yang dikutip blog sering membawa detail turunan yang keliru ("lebih murah", "tes tertutup", "mayoritas"); selalu cek harga, metode, dan persentase ke ≥ 2 sumber sebelum VO.
- **#010 (kantong plastik Rp200):** angka KLHK berbeda antar-sumber (25–30% menurut Antara; angka kota berbeda); ringkasan pencarian menyebut 30% rata-rata dan Balikpapan 65%, yang **tidak terkonfirmasi** saat artikel dibaca. Pelajaran: ringkasan hasil pencarian bukan fakta; baca artikelnya.
- **#012 (biaya tambahan):** bukti ilmiah ada, tetapi sisi Indonesia tidak terverifikasi (Bisnis/Kontan 403); belum boleh direkam.

## Evolusi ke Formula ARSIP v7.0 (20 Nov 2026, keputusan user)
- **Evaluasi #001–#016 (angka dari user/Studio):** abstrak/mitos/tips ringan kalah (#002 44,79%, #003 46,60% stayed; #010 plastik Rp200: stayed 70,32% tetapi APV 46,41%); investigasi sistem/uang/harga/kebijakan unggul (#004 78,48% / 102,05%; #005 72,97% / 92,78%; #006 72,05% / 96,35%; #009 80,90% / 91,49%; ekspor 19 Nov). #011 belum ada, #012 baru 2 penayangan.
- **Keputusan:** v7.0 mengakhiri batasan "psikologi perilaku murni" (v6.0/v6.1); 2 Mesin A (sistem/bisnis/uang/kebijakan ~60%) + B (desain/harga/perilaku ~40%); riset per batch (6 → 4); "tapi/padahal" dilarang hanya di judul + pembuka, boleh di body; bahasa lisan luwes 8–13 kata/kalimat; rotasi latar visual; log `stories/episode_log.json` + linter lintas-batch. Sumber: `AGENTS.md` §2, `KEPUTUSAN_RISET.md` v7.0.
- **Pelajaran produksi #013–#016:** riset borongan menurunkan kualitas slot akhir (#014 Password NIST ditolak user, diganti); gambar AI berwajah realistis di sebelah kutipan lembaga/pejabat berisiko dikira orang asli; nominal ilustrasi (Rp50.000 → Rp60.000) tidak diucapkan VO dan wajib berlabel ILUSTRASI; gerbang Whisper bisa gagal karena kata tertentu (ongkir) meski margin suara 19 dB.
- **Hipotesis v7.0 (uji, jangan ubah dari satu video):** Mesin A ≥ B pada stayed-to-watch dan APV; klaster 4–5 episode senada layak dijadikan long-form.

## Ekspor Studio 19 Nov 2026 (11 video; menggantikan ekspor 16 Nov yang hanya memuat 7 video)
Total: 131.409 penayangan, 68.535 penayangan tak dilewati, stayed 73,46%, APV 93,72%, rata-rata tonton 0:51, 74 subscriber. Usia data berbeda per baris (video terbaru baru hitungan jam).
| # | Video | Tayang | Durasi | Stayed | APV | Penayangan | Sub | Suka |
|---|---|---|---|---|---|---|---|---|
| 005 | Yamaha-Honda Didenda Rp47,5 M (skutik) | 15 Nov | 57 | 72,97% | 92,78% | 52.660 | 25 | 371 |
| 004 | Aqua Didenda Rp13,8 Miliar | 14 Nov | 54 | **78,48%** | **102,05%** | 25.982 | 15 | 276 |
| 006 | Macet Sudirman 2x Lipat (3-in-1) | 16 Nov | 55 | 72,05% | 96,35% | 24.140 | 8 | 186 |
| 009 | Burger Lebih Besar dan Lebih Enak Gagal | 18 Nov | 44 | **80,90%** | 91,49% | 13.298 | 2 | 144 |
| 007 | Alasan Asli Iklan di HP Xiaomi | 16 Nov | 54 | 65,71% | 93,82% | 8.868 | 1 | 57 |
| 001 | Banjir Ini Bukan Air (molase) | 12 Nov | 61 | 70,79% | 72,78% | 1.512 | 2 | 43 |
| 010 | Kantong Plastik Ditolak Rp200 | 19 Nov | 56 | 70,32% | 46,41% | 1.369 | 2 | 11 |
| 008 | Indomie Ditolak Taiwan 3 Kali | 17 Nov | 55 | 70,80% | 74,15% | 1.438 | 0 | 23 |
| 003 | Micin Dituduh Bikin Bodoh | 13 Nov | 57 | 46,60% | 54,44% | 1.379 | 2 | 21 |
| 002 | Pembuat Fitur Ini Menyesal | 12 Nov | 45 | 44,79% | 67,78% | 789 | 1 | 22 |
| 012 | Cara Halus Kartu Member Bikin Kamu Balik Lagi | 19 Nov | 51 | (belum bisa dinilai: 2 penayangan) | | 2 | 0 | 0 |
Pemetaan nomor: #008 = indomie, #006 = tigainsatu (3-in-1), #007 = hpiklan (Xiaomi); #011 (paylater) belum ada di ekspor.
**Temuan (hati-hati, usia data tidak sama):** (1) #004/#005/#006 (denda/kebijakan + angka uang di judul) = 102.782 dari 131.409 penayangan (78%) dan 48 dari 74 subscriber; (2) #009 burger (desain angka/harga) punya stayed tertinggi (80,90%) tetapi APV 91,49% (lebih rendah dari #004); (3) **#010 plastik Rp200: stayed 70,32% bagus, APV 46,41%** (rata-rata tonton 0:25 dari 56 dtk) → hook menahan, tengah/akhir bocor, bukan hook yang lemah; (4) #008 Indomie APV 74,15%; (5) #002/#003 (abstrak/mitos) tertinggal di kedua metrik; (6) #012 belum terbaca, jangan dijadikan bukti. Penayangan tak dilewati harian puncak 20.087 (17 Nov); #004 melandai 6.659 → 624 per hari (18 Nov), #005 puncak 12.711 (17 Nov).

## Data tambahan dari dokumen Konteks v7.0 (23 Nov 2026; sumber: `research/deep_research/Konteks_Lengkap_Evaluasi_Upgrade_Formula_ARSIP_v7.0.txt` §1 Fase 2, ⚠ dari dokumen riset, bukan ekspor Studio)
- **#004 Aqua: 12.948 engaged views** (dari 23.423 views versi Konteks). Anatomi kemenangan menurut dokumen: merek harian + denda Rp13,8 miliar + **4 pembalikan babak sampai detik ke-42** (putusan MA membatalkan PN) + penutup Curtain-Pull Reveal ("isi warung nggak selalu pilihan pemiliknya"). Dipakai sebagai pola baku untuk Mesin A: tangga bukti naik tiap 12–15 dtk (`1-cerita…` §M8.2), bukan hanya satu pembalikan.
- **Penyebab #007 Xiaomi tertahan** (stayed 65,71%, APV 93,82%): **judul tanpa nominal uang** + bagian tengah sempat melandai (hipotesis dokumen Konteks; belum diuji terpisah). Pelajaran: judul Mesin A memuat nominal uang konkret; segmen tengah perlu micro-rehook 12–15 dtk.
- #004–#006 = 78% dari seluruh penayangan kanal (Konteks) — sejalan dengan Temuan (1) ekspor 19 Nov.

## ⚠ Dua versi angka penayangan #001–#007 (PERTANYAAN USER: ekspor mana yang final?)
| # | Versi dokumen Konteks (tanggal tak dicantumkan) | Ekspor Studio 19 Nov 2026 (tabel di atas) | Catatan |
|---|---|---|---|
| 001 | 1.546 views; stayed 70,56%, APV 72,77% | 1.512; 70,79%; 72,78% | persentase Konteks = angka 17 Nov (`6-pelajaran` tabel lama) |
| 002 | 786 | 789 | stayed/APV sama-sama 44,79%/67,78% |
| 003 | 1.367 | 1.379 | 46,60% / 54,44% sama |
| 004 | 23.423 (12.948 engaged) | 25.982 | persentase sama (78,48% / 102,05%) |
| 005 | 17.277 | 52.660 | selisih terbesar |
| 006 | 16.605 | 24.140 | |
| 007 | 1.485 | 8.868 | halaman kanal 20 Nov: 9,1K |
Persentase stayed/APV #002–#008 identik di kedua sumber; hanya jumlah views yang berbeda. Pola selisih (Konteks lebih rendah, mendekati data lebih muda; halaman kanal 20 Nov mencatat #005 60K, #004 26K, #006 24K, #007 9,1K) condong ke ekspor 19 Nov sebagai data lebih baru, tetapi **belum diputuskan**: kedua versi dipertahankan berlabel; tabel di atas tidak ditimpa sampai user mengonfirmasi.

## Bacaan awal Studio seluler 20 Nov 2026 (tangkapan layar user; usia data jam, bukan hari)
- **#012 Cara Halus Kartu Member Bikin Kamu Balik Lagi:** 1.581 views dalam ±14 jam, 712 engaged views, **stayed 51,5% / swiped 48,5%**, +2 subscriber; 1,5K dari Shorts feed. Stayed terendah di antara episode baru (#009 80,90%, #010 70,4%); retensi belum diproses. Hipotesis (belum teruji): judul berbunyi tips/"cara" + "kamu" (mendekati Garis Merah self-help) dan hook kurang kuat. Tunggu data 48 jam sebelum menyimpulkan.
- **#010 Kantong Plastik:** 1.446 views ±20 jam, 924 engaged, unique viewers 857, **stayed 70,4%**, +2 sub; sejalan dengan ekspor (hook menahan, APV rendah).
- **Halaman kanal (20 Nov, 15.27):** #011 paylater terjadwal (belum tayang); views: #012 1,6K · #010 1,4K · #009 20K · #008 1,5K · #007 9,1K · #006 24K · #005 60K · #004 26K · #003 1,3K · #002 789 · #001 1,5K.
