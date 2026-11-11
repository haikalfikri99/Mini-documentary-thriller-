# 2. Visual dan Animasi
Bahasa visual channel = **motion comic 2D** (hasil ATM dari "Beer Tsunami" Historically, 4,3 jt views): ilustrasi detail per panel setiap 1,5–2 dtk, kamera selalu bergerak, caption per kata, stempel angka, seri "ARSIP KASUS". Semua digambar dengan kode di `toon/` — tanpa AI image/video, tanpa stock.

## A. Signature yang tetap di setiap film
1. **Satu bahasa gambar:** garis tinta "boil", isian datar, cahaya crescent, Cast Kit (`toon/engine/cast.js`), paintover cat air p5.brush pada bidang latar.
2. **Warna Ancaman:** inti kasus (penyebab bencana, sistem tersembunyi, benda misterius, keputusan fatal) = satu-satunya warna jenuh yang menyala; warnanya dipilih per cerita (film #001: amber molase `#ffb43a`; mis. hijau mesin slot untuk kasino, merah sinyal untuk misteri radio). Dunia lain kalem; kata kunci caption memakai warna ini. Amber tetap aksen identitas channel (logo, banner).
3. **ARSIP KASUS:** map arsip dibanting di detik ~3 (frame terakhir hook membeku → sepia → menjadi foto di map), dibuka saat kilas balik (halaman dibalik), dicap di akhir ("DIABAIKAN?").
4. **Stempel waktu & tempat** saat establishing (`stamp()` di `brand.js`), **stempel karet merah** untuk angka/fakta (`rubber()`), panah tinta (`arrow()`), angka besar (`bigText()`).
5. **Caption per kata** (`timedCaption()`): kapital Oswald 600, garis tinta, frasa ≤ 3 kata dipotong di tanda baca, setiap kata muncul pop tepat di timestamp VO, y = 1330.
6. **Loop:** detik terakhir memotong kembali ke frame pertama.

## B. Toolkit `toon/`
| Modul | Isi |
|---|---|
| `engine/toon.js` | menggambar: `shape/form/fillOnly/stroke`, `spline`, `noodle`, `ell`, `rr`, transform `push/pop/translate/rotate/scale` |
| `engine/cast.js` | `person({...})`: tubuh man/woman/child, pakaian, `view` ('front'/3q/'side'), `face` ±1, `headView`, `lookBack`, `expr` (preset `EXPR` atau objek), `look`, `mouth`, `pose` (lean, bob, armF/armB `{h,bend,fist,hand}`, legF/legB), `prop(hp, ang)` |
| `engine/motion.js` | `run`, `runFront`, `sprintAt` (lari menuju kamera), `walk`, `blink`, `breathe`, `flutter`, `mixPose`, **`keys(t, [[t, nilai, ease], …])`** untuk akting |
| `engine/brand.js` | `stamp`, `caption`, `wordCaption`, `timedCaption`, `glow`, `wash` |
| `engine/look.js` | finishing: `paint`, `grade2`, `dof`, `shafts`, `grain`, `vignette` |
| `engine/fx.js` | cairan & puing: `MOL` palet, `drop`, `hangingDrop`, `splash`, `barrel`, `plank`, `wheel` |
| `core/render/` | `still.mjs`, `video.mjs` (render paralel), `frames.mjs` |

## C. Jenis panel (contoh di `stories/molase/film/`)
| Jenis | Kapan | Contoh |
|---|---|---|
| **Set jalan perspektif** (`P(x,y,z)`, `boston()`, `street()`, `scenePaint()`) | establishing, kejadian di jalan/kota | P1, P4, P8, P10, P34 |
| **Panel berlapis multiplane** (`L(0/1/2)` = latar/tengah/depan, depth .55/.85/1.25) | shot kunci yang butuh parallax | P1, P8 |
| **Tampak samping** (`sideStreet()` + `mass()`), banjir selalu kiri → kanan | akibat beruntun | P14, P16, P17 |
| **Close-up karakter** | hook, twist emosional | P2, P25 |
| **Makro** | benda/cairan, tetes, retakan | P5, P23, P28 |
| **Kartu arsip di meja** (`desk`, `paper`, `rubber`, `lamp`, `finishCard`) | angka, peta, diagram, penyebab | P6, P7, P12, P13, P15, P27, P29–P31, P36 |
| **Sunyi** (latar gelap, satu simbol) | korban, momen hormat | P32 lilin, P33 bangsal |

## D. Logika gerak & akting (paling penting)
- **Arah hadap = arah gerak.** Orang lari menjauhi ancaman: ombak dari belakang → lari *ke kamera* (`view:'front'`, `sprintAt`). Pada tampak samping, satu arah layar untuk seluruh babak (aturan 180°).
- **Sebab-akibat fisik:** benda terlempar menjauhi sumber; topi tertiup ke belakang, ke arah ombak, dan mengecil; tetes jatuh dengan percepatan; gelombang menekuk dan bibirnya maju.
- **Setiap karakter utama punya ketukan emosi** dengan `keys()`: antisipasi (dip kecil) → aksi dengan overshoot → settle; mata bergerak sebelum kepala; napas/bob halus saat diam; kedip di momen kaget. Contoh: P8 (santai → tangki berderit → menyentak ke atas → menyipit → meremas syal, setengah langkah mundur), P25 (melihat ke atas → tetes masuk cangkir → mata tertutup senang), P18 (dua orang saling menggapai).
- **Gestur tidak boleh menutupi wajah** (gestur "melindungi mata" dicoba dua kali, selalu menutupi wajah → diganti).
- **Ekspresi teror** (front head): rahang turun, alis dalam naik, kerutan cemas, pupil kecil, keringat terlempar.

## E. Kamera & transisi (`film.js`)
- `cam(s0, s1, [cx,cy]0, [cx,cy]1, easing, shake)`; `slam()` untuk map dibanting; `hit(t0, amp)` untuk guncangan pada benturan.
- Setiap gerak kamera punya motif: reveal (P1 tarik mundur dari wajah ke ombak), establishing (P8 buka di tangki → mundur ke jalan), push-in ke detail, crash zoom pada benturan, tilt-up ke benda raksasa (P4).
- Transisi: kebanyakan potong keras di awal kata; `freezeIn` (frame beku → foto arsip), `flash` (kilat putih saat pecah), halaman dibalik untuk kilas balik, sepia untuk masa lalu (P21).
- **Motion blur** (`blur: 3–5` sub-frame, shutter ~90°) hanya pada shot cepat, dan pose harus *on ones*.

## F. Komposisi & keterbacaan
- Satu fokus per shot; nilai gelap-terang memisahkan subjek; garis perspektif mengarah ke subjek; skala ancaman > manusia.
- Elemen penting di 900×1400 tengah; atas ±120 px dan bawah ±320 px dibiarkan untuk UI platform; pita caption y 1250–1410 bebas teks lain.
- Karakter tidak tumpang tindih; beri jarak dan arah pandang yang jelas.
- Detail kecil (paku keling, tekstur) secukupnya: di ponsel yang menentukan adalah siluet, ekspresi, gerak, dan kejelasan.

## G. Cara membangun panel baru
1. Tulis fungsi `export function Pn()` yang membaca `U` (detik di dalam panel), gambar dari belakang ke depan, akhiri dengan finishing (`finish()` / `finishCard()`).
2. Daftarkan di `SEG` (`film.js`): `{ id, a: <awal kata VO>, fn, cam, blur?, flash?, freezeIn?, layers?, fin? }`.
3. Render still di 2–3 titik waktu panel, lihat, perbaiki (logika, akting, komposisi, tabrakan teks), baru lanjut batch berikutnya.

## H. Visual untuk wilayah selain bencana
| Wilayah | Panel kunci yang cocok |
|---|---|
| Sistem & psikologi | denah dari atas (supermarket, kasino) dengan panah jalur mata/kaki; close-up tangan + produk; "sinar-X" yang menyingkap mekanisme tersembunyi |
| Misteri | papan investigasi (foto, benang merah, peta) di meja ARSIP; label FAKTA / TEORI / SPEKULASI dengan stempel berbeda |
| Keputusan katastrofik | ruang rapat, dokumen dengan tanda tangan, garis waktu "andai" vs kenyataan, grafik jatuh |
| Sains & eksperimen | laboratorium kalem, catatan percobaan, diagram prosedur; hormat pada korban, tanpa sensasi |
| Sejarah & tempat | peta lama, then-vs-now (kota ramai → kosong), angka populasi yang menyusut |
