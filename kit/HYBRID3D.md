# DUNIA 3D (hybrid 2.5D/3D) — sistem produksi channel, standar sejak ARSIP #003
Karakter ARSIP RIG tetap 2D (billboard, ekspresi stiker, rim light, tanpa outline) di dalam dunia 3D berbentuk **diorama cutaway**, difilmkan oleh **satu kamera kontinu**. Berlaku untuk **semua scene** (keputusan pemilik channel). Ini sistem yang dipakai ulang tiap episode, bukan hanya catatan.

## Mulai episode baru
```bash
kit/tools/new_episode.sh <slug> <no> <durasi_vo>        # default = dunia 3D (--2d = flat lama)
# taruh VO + vo_words.json di stories/<slug>/audio/, lalu edit stories/<slug>/film/world.js
node kit/tools/preview_3d.mjs stories/<slug>/film 540    # pratinjau cepat (tanpa audio/HyperFrames) → renders/preview.mp4
node kit/tools/qa_3d.mjs stories/<slug>/film             # gerbang QA: deterministik + 0 error + kontak sheet
kit/tools/make_film.sh stories/<slug>/film 1             # VO → caption → skor → mix → audio QA → QA 3D → render → mux
```
`make_film.sh` menulis `film/words.js` dari `vo_words.json` dan menjalankan `qa_3d.mjs` sebagai gerbang sebelum render.

## Isi `world.js` (template `kit/template/film3d/world.js` = contoh kerja satu take penuh)
| Mau | Pakai | Berkas |
|---|---|---|
| ruang | `roomKamar`, `roomKantor06` (siap pakai) atau `world.room({floor, back, left})` + `R.box/cyl/plane/light/glow`; ruang baru → tambahkan ke `rooms3d.js` | `rooms3d.js`, `diorama-kit.js` |
| tokoh | `world.actor({ spec, at:[x,z], y, sit:<cm>, pose: t => …, opts: t => ({rim…}) })` — billboard auto-fit 168 cm, menghadap kamera (dibatasi ±0,85 rad) | `diorama-kit.js` |
| akting | `perform(t, keys)` (antisipasi + overshoot), `idle(t)`, `addDarts(gaze, t)`, `GESTURE.*` (lembar acuan `renders/10_gestur.png`) | `acting.js` |
| dokumen/bukti | `paper(world,{title, lines, redact:[…], stamp})`, `board(world,{items, strings})` | `evidence.js` |
| terowongan feed | `world.tunnel({at, rings})` | `diorama-kit.js` |
| kamera | `world.camera(keys, {handheld})`; key = `{t, tx,ty,tz, az, el, dist, fov, roll, hold?}` (az 0 = kamera di +z, el 90 = ke bawah, dist cm, fov vertikal) | `cam3d.js` |
| beat dari kata | `T = voSync(WORDS); T('menyesal', 0, fallbackDetik)` | `vo-sync.js` |
| tampilan | `world.visible(obj, (t,P,cam)=>bool)`, `world.fog = (t,P,cam)=>({color,density})`, `world.finish = {halation, paper, vignette, grain, tilt}` | `diorama-kit.js` |

Dunia memakai satuan 1 unit = 1 cm, Y ke atas. Pusat ruang = pusat lantai; ruang terbuka ke +x dan +z (dinding belakang di z = −d/2, kiri di x = −w/2). Taruh ruang berbeda **berjauhan** (mis. kantor 21 m di bawah kamar) dan sambungkan dengan gerak kamera yang menembus objek.

## Kamera kontinu — yang sudah terbukti dan aturannya
- Hermite + tangen Catmull-Rom: kamera tidak berhenti di tiap key; `hold` 0..1 menahan beat (0 = berhenti). `dist` diinterpolasi di ruang log.
- Urutan yang disukai: close-up rendah + getar tangan → crane naik-mundur → isometrik lensa panjang (fov 14, dist ≈ 3700–3900 cm, efek miniatur otomatis dari jarak dan elevasi) + orbit → whip dengan motion blur (sub-frame otomatis dari kecepatan kamera) → jatuh lewat objek ke ruang berikutnya → dorong ke bukti.
- **Pelajaran skala**: fov vertikal 14° pada jarak 640 cm hanya melihat 157 cm. Ruang 420 cm butuh dist ≈ 3900. Hitung: tinggi pandang = 2·dist·tan(fov/2).
- Orbit di dekat tokoh ≤ ±50° (billboard terlihat seperti kertas bila lebih).
- Sembunyikan yang tak terlihat (`world.visible`) dan beri kabut hanya di dalam terowongan.

## Fakta terverifikasi
- Render HyperFrames (software GPU): 8 dtk 1080×1920 = 3 m 46 s → **≈ 28 dtk render per dtk film** (film 45 dtk ≈ 21 menit). `hyperframes check` lolos untuk komposisi 3D.
- Probe QA ≈ 1,1 dtk/frame di 1080×1920; pratinjau 540 px ≈ 0,5 dtk/frame.
- Deterministik: frame yang sama dirender dua kali = hash identik (`qa_3d.mjs` memeriksa 3 titik; gagal → render dibatalkan).
- Lapisan yang dipakai: `cam3d.js` (kamera), three.js r170 di `vendor/`, finishing 2D (tilt-shift, halation, paper grain, vignette, grain) di `diorama-kit.js`.

## Keputusan terkunci
- **Tanpa outline**: gaya = flat bersih + rim light berwarna sumber cahaya. Bila satu shot tenggelam: tepi tipis warna gelap versi fill (bukan hitam), hanya di shot itu.
- three.js, **bukan Blender** (satu pipeline kode, jalan di cloud, laptop pemilik ringan). **OneTake tidak dipakai**: lisensi PolyForm Noncommercial; idenya sudah kita punya di `cam3d.js`.
- Satu cahaya kunci (cyan `#7fe3ff`) + satu praktikal hangat; aksen amber `#ffb43a`. Cutaway: dua dinding + lantai.
- Output video tidak disimpan di git (aturan repo; ada di Google Drive).

## Batas yang diketahui (kerjakan saat butuh, jangan tebak)
- Satu tokoh duduk/berdiri sudah teruji; **dua tokoh berinteraksi** dan **tokoh berjalan** belum diuji di 3D (rig punya `walk`; pakai `world.actor` dengan `pose` yang menggeser `at` lewat `A.set({at})`).
- Gestur: tujuh titik awal (`GESTURE`), beberapa mirip (faceHand/mouth). Tambah/atur per shot dan masukkan ke lembar acuan.
- Kartu terowongan terlihat sebagai garis warna dari jauh (moiré); perbesar `card` bila perlu terbaca.
- Teks di dalam dunia = tekstur kanvas (lihat `paper`); caption tetap lapisan HTML di atas.
- Lapisan bukti: papan gabus (`board`) dibuat tapi belum dipakai di episode; periksa dulu tampilannya di shot nyata.

## Retensi dan data channel (untuk prioritas, bukan untuk 3D)
Channel Mini Thriller IDN (@minithrilleridn, id `UCRV6nTJ6oJqIXmZUXq8t9gA`): 7 subscriber, 2 Shorts. #001 (rMbTwlWe0B4) 1.412 views, 40 like, +1 subscriber, 70,4 % stayed to watch / 29,6 % swiped away; #002 (xtP3p8X_t0M) 338 views setelah ±2,5 jam. Retensi per detik belum tersedia (±48 jam): baca ulang dengan `vidiq_channel_analytics report=audience_retention filters=video==<id>`; `shorts_stayed_to_watch` butuh ekstensi vidIQ terhubung di browser pemilik. Konversi subscriber sangat rendah (1 dari 1,4K views) → perbaiki hook, CTA, dan loop di naskah, jangan hanya visual.
