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
- Pakai framework yang terbukti, jangan berputar-putar menulis ulang: Formula ARSIP v4.1 + scorecard.

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
