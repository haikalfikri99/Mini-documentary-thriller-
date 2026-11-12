# HYBRID 2.5D/3D — handoff untuk ARSIP #003 dan seterusnya
Status: **spike lolos, keputusan pemilik channel: 3D dipakai di SEMUA scene** (bukan hanya momen tertentu), dengan kamera kontinu.
Sesi baru tidak punya riwayat percakapan; semua keputusan dan fakta yang dibutuhkan ada di berkas ini.

## 1. Keputusan (terkunci; ubah hanya dengan alasan baru)
| Keputusan | Alasan |
|---|---|
| Karakter tetap ARSIP RIG 2D (drawChar, ekspresi stiker, rim light) sebagai **billboard** di dunia 3D | identitas channel; aset 26/15/16/24 terpakai penuh |
| **Tanpa outline** | gaya terkunci (flat bersih + rim light berwarna sumber cahaya). Bila satu shot tenggelam: tepi tipis warna gelap versi fill (bukan hitam), hanya di shot itu |
| three.js, bukan Blender | satu pipeline kode (HyperFrames HTML→video), saya bisa menulisnya di cloud, laptop pemilik tidak terlibat |
| **OneTake (feitangyuan/onetake) tidak dipakai** | lisensi PolyForm Noncommercial; versi komersial berbayar; targetnya film produk. Idenya (kamera kontinu) sudah kita tiru sendiri di `kit/src/cam3d.js` |
| Dunia = **diorama cutaway** (kamar tanpa dua sisi, 1 unit = 1 cm), kamera = satu jalur kontinu | disukai pemilik channel ("sudah bagus dan sesuai") |
| Cahaya: satu kunci (cyan layar `#7fe3ff`) + satu praktikal hangat; aksen amber `#ffb43a` | kunci gaya kit |

## 2. Fakta terverifikasi (sesi ini)
- WebGL jalan di mesin render HyperFrames (software GPU). `npx hyperframes@0.9.39 check` lolos; `render` 8 dtk 1080×1920 = **3 m 46 s** (≈ 28 dtk render per 1 dtk film → film 45 dtk ≈ 21 menit). Keluaran identik dengan driver Playwright sendiri.
- Render deterministik: terbukti di spike 1 (frame yang sama dirender dua kali = hash identik). Di spike 2 belum diuji ulang → jadikan gerbang QA.
- Spike 1 (S22, planes berlapis) : 2,2 dtk/frame; spike 2 (diorama penuh) : 1,1 dtk/frame di 1080×1920.
- Pola komposisi HyperFrames untuk 3D (lihat `kit/lab/hybrid-spike/hf/index.html`): canvas `#world` 2D, WebGL di canvas tersembunyi, `hf-seek` → `D.frame(t, canvas)`, `window.__hf.buildReady.world`.
- Setiap film punya salinan `rig/` (bukan import lintas folder). `hf/` berisi contoh salinannya + `cam3d.js` + `diorama.js` + three.module.min.js (v0.170.0, vendored).

## 3. Arsitektur (kode ada di `kit/lab/hybrid-spike/diorama.js`, `kit/src/cam3d.js`)
- `cam3d.js`: jalur kamera = daftar key `{t, tx,ty,tz, az, el, dist, fov, roll, hold?}` pada rig orbit; Hermite + tangen Catmull-Rom (tidak berhenti di key), `dist` diinterpolasi di ruang log, `hold` 0..1 untuk menahan beat, `handheld()` getar halus, `camSpeed()` → jumlah sub-frame motion blur.
- `diorama.js`: ruangan (lantai-slab, dinding belakang+kiri bertebal), perabot dari `BoxGeometry` (Lambert), layar HP bertekstur, halo aditif, kipas berputar, **aktor = billboard** (kanvas 1024² dari `drawChar`, auto-fit tinggi 168 cm, yaw mengikuti kamera dibatasi ±0,85 rad), terowongan feed (cincin melebar, kartu menggulung), tilt-shift (kekuatan = fungsi jarak & elevasi), vignette + grain 2D di akhir, motion blur = rata-rata sub-frame.
- Transisi antar-ruang **bukan cut**: kamera menembus objek (layar HP → terowongan). Pola ini harus dipakai antar-scene: jendela, pintu, layar, lubang kunci, kartu ARSIP.

## 4. Yang harus dikerjakan di sesi #003 (urutan)
1. **Modul kit**: pecah `diorama.js` jadi `kit/src/diorama-kit.js` (pembangun ruangan: `room()`, `box()`, `wall(tex)`, `actor(spec)`, `tunnel()`, rig cahaya) + `world.js` per episode (daftar scene = ruangan/aktor/jalur kamera). Tambahkan di `kit/template/` dan `new_episode.sh`.
2. **Sinkron ke VO**: key kamera dari `episode.json` / `vo_words.json` (kata kunci = beat kamera), bukan detik buta. Slam kartu ARSIP & flash tetap sebagai lapisan 2D.
3. **Teks**: caption tetap lapisan HTML (`compositions/captions.html`). Teks di dalam dunia (layar, dokumen, kartu ARSIP) = tekstur kanvas di bidang 3D; uji keterbacaan di 1080×1920.
4. **Multi-tokoh & akting**: spike baru satu tokoh duduk. Uji dua tokoh dalam satu diorama, tokoh berjalan (`walk`), pose gestur; tambah gerak mata/antisipasi. Billboard lebih dari ±50° terlihat seperti kertas → batasi orbit di dekat tokoh.
5. **Perbaiki kelemahan spike**: shot isometrik masih gelap (naikkan cahaya / eksposur), tekstur kartu terowongan jadi garis warna (perbesar kartu, kurangi moiré, mipmap), beat layar HP terlalu kabur (kurangi sub-frame di `hold`), akhir terowongan = persegi cyan datar (ganti portal lembut).
6. **Set 3D per cerita**: tiap ruangan = fungsi `roomX()` + perabot; pakai ulang palet `sets-lib` (kamar, kantor, aula, lorong). Jaga satu horizon/skala (1 unit = 1 cm).
7. **Gerbang QA** (tambah ke `make_film.sh`): render dua kali frame uji → hash sama; `hyperframes check`; kontak sheet 12 frame; waktu render dilaporkan; audio QA yang sudah ada tetap gerbang sebelum render.
8. Kriteria lolos film: look tetap ARSIP (tanpa outline), tokoh tak tampak kertas pada sudut yang dipakai, teks terbaca di layar HP, render film penuh < 30 menit.

## 5. Konteks channel (perlu untuk prioritas, bukan untuk 3D)
- Channel: Mini Thriller IDN (@minithrilleridn) — 7 subscriber, 2 Shorts. #001 (Banjir, 61 dtk): 1.412 views, 40 like, +1 subscriber, **70,4 % stayed to watch / 29,6 % swiped away**, hampir semua dari Shorts feed; views naik satu gelombang lalu mendatar. #002 (45 dtk) diunggah 18.00 WIB 12 Nov 2026: 338 views setelah ±2,5 jam.
- Retensi per detik **belum tersedia** (YouTube ±48 jam). Ulangi pembacaan setelah ±14 Nov: `vidiq_channel_analytics report=audience_retention filters=video==rMbTwlWe0B4` dan `video==xtP3p8X_t0M`. Laporan `shorts_stayed_to_watch` butuh ekstensi vidIQ terhubung di browser pemilik.
- Risiko yang tidak diselesaikan 3D: konversi subscriber sangat rendah (1 dari 1,4K views) → perhatikan hook, CTA, dan loop akhir di naskah (Formula ARSIP v3), jangan hanya visual.
- Ide lain yang disepakati menyusul setelah 3D: lapisan bukti ARSIP (dokumen, stempel, bar redaksi, papan bukti), akting karakter, tekstur "flat premium" (grain kertas, halation tipis).

## 6. Berkas
`kit/src/cam3d.js` · `kit/lab/hybrid-spike/` (spike.js = S22 planes berlapis, diorama.js = take kamera kontinu, `run.mjs`/`render_diorama.mjs` = driver Playwright, `hf/` = komposisi HyperFrames kerja). Output video tidak disimpan di git (aturan repo); take 8 dtk dirender ulang dengan `node render_diorama.mjs video 1080`.
