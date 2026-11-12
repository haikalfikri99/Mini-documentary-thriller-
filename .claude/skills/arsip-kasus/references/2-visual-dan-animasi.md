# 2. Visual dan Animasi — gaya terkunci (sejak ARSIP #002)
Semua video dibuat dengan **kit** (`kit/README.md`): ARSIP RIG, pustaka set, kartu arsip, film engine. Tanpa AI image/video, tanpa stock. Gaya ini **tidak didesain ulang per episode**. Dasar keputusannya: `research/referensi/ANALISA_IFVERSE.md` dan `ANALISA_VISUAL_2D.md` (dua video referensi 2D dianalisis dan diukur), studi warna kulit, review user #002.
#001 (Molase) dibuat dengan engine lama `toon/` (garis boil); dibiarkan untuk rebuild, bukan acuan baru.

## A. Signature tetap
1. **Karakter ARSIP RIG:** kepala bentuk tetap, kulit sawo matang (default), ekspresi stiker, aset modular (rambut, penutup kepala, aksesori, wardrobe). Tangan bulat di shot lebar, tangan berjari (`handPhoneCU`) di close-up.
2. **Cahaya:** satu sumber per shot yang terlihat atau bisa ditebak; rim light warna sumber pada tokoh; pool cahaya + vignette + grain; DOF 3 lapis (latar blur, subjek tajam, latar depan blur).
3. **Warna makna:** cahaya layar/ancaman `#7fe3ff` · rem/aksen cerita amber `#ffb43a`; latar desaturasi; warna jenuh hanya untuk tokoh utama dan satu aksen.
4. **Kartu ARSIP KASUS** (`kit/src/arsip-card.js`) setelah hook sebagai **overlay** di atas aksi yang tetap bergerak (sejak #003, data #002: 37,2% stayed); ≤ 1,3 dtk, stempel di waktu/tempat. Kartu layar penuh yang menghentikan cerita tidak dipakai lagi.
5. **Caption per kata** (`kit/tools/build_captions.py`): Oswald 600 kapital bergaris tinta, ≤ 3 kata, pop-in, y 1290, kata kunci cyan/amber; disembunyikan saat tipografi besar (kutipan).
6. **Loop:** detik terakhir menyambung ke frame 0.

## B. Aturan menggambar (dari referensi)
- Bentuk bersih tanpa outline di lingkungan; **gradien di setiap permukaan besar**; bayangan kontak di bawah benda; 1–3 detail yang bercerita per area (papan tulis berisi sketsa, kalender 2006, jam 01.47).
- Satu set dipakai ulang dengan pencahayaan berbeda untuk mood berbeda.
- Cahaya harus **masuk akal secara fisik**: arah sinar dari jendela, bayangan jatuh ke arah berlawanan (review #002: sinar jendela S5 yang "nembak" ditolak).
- Ruang berbeda untuk orang berbeda (review #002: orang biasa tidak boleh di kantor Raskin).
- Benda yang dipakai tokoh harus lengkap dan logis: orang di komputer = monitor + keyboard + mouse, tangan benar-benar di atasnya, monitor duduk di meja (review #002 S8/S12).
- Kursor = ikon tangan penunjuk sungguhan, tombol = benda yang bisa ditekan; jangan kotak putih generik.
- Latar tidak boleh kosong: isi dengan lingkungan yang bercerita (aula arsip, kota layar, lorong kartu feed, plaza malam).

## C. Kamera, potongan, transisi (`kit/src/film-engine.js`)
- Satu kalimat = satu shot 1,5–2 dtk, potong di awal kata; kamera selalu bergerak pelan (push 2–8%, pan); `slam` untuk kartu arsip; `cuts` (zoom per klik); `shake` di benturan.
- Flash/dip hanya pada makna: flash krem saat arsip, dip hitam sebelum "Tapi"/lompatan waktu, flash hangat saat sesuatu pecah.
- Variasi ukuran shot: wide → medium → close-up → insert benda (top-down untuk tangan & HP) → split screen bergaris retak untuk pilihan.
- **Frame 0 tanpa fade**: itu thumbnail di feed.

## D. Akting yang mendukung cerita (bukan hiasan)
- Idle otomatis (kedip, napas) dari `LIFE`; tambah gerak **hanya** bila kalimat membutuhkannya: menoleh ke kamera di hook, kepala tertunduk dan mata terpejam di penyesalan, tangan menyeret mouse, mata berpindah saat berpikir, meregangkan badan saat "udahan".
- Antisipasi → aksi → settle; mata bergerak sebelum kepala; kaki menapak saat jalan (`walk`); pegas untuk benda ikut (`spring`).
- Animasi peristiwa mengikuti kata: utuh → retak (di kata sebelumnya) → pecah (di kata kunci) → serpihan pelan (review #002: pecah terlalu cepat ditolak).

## E. Komposisi & keterbacaan
- Fokus di 900×1400 tengah; atas 0–168 px kosong (UI), teks layar 168–1250, caption 1250–1410, di bawah 1410 hanya tekstur/latar depan.
- Satu fokus per frame; nilai gelap-terang memisahkan subjek; frame vertikal untuk orang rebahan = shot top-down.
- Teks layar tidak boleh dobel dengan caption (kalimat yang sama).

## F. Storyboard (gerbang wajib sebelum animasi)
Render keyframe tiap shot dari kode (`film/board/`) → artifact storyboard (format `stories/scroll/storyboard_artifact/`): kartu per shot berisi keyframe, timecode, VO, aksi, kamera, suara, teks layar, catatan jujur. User memberi komentar di artifact → revisi → setuju → baru animasi penuh.

## G. Visual per wilayah (pakai pustaka set dulu)
| Wilayah | Set/prop kit | Tambahkan bila perlu |
|---|---|---|
| Sistem & psikologi | setA, setC, feed, tunnel, bigButton, crt/page06, setD | denah top-down dengan panah jalur, "sinar-X" mekanisme |
| Misteri | setD (aula arsip), stamp | papan investigasi, label FAKTA/TEORI/SPEKULASI |
| Keputusan katastrofik | setB (kantor), monitor | ruang rapat, dokumen, grafik jatuh |
| Sains & eksperimen | preset ilmuwan | lab kalem, diagram prosedur (tanpa sensasi) |
| Sejarah & tempat | kartu arsip, sepia | peta lama, then-vs-now |
Set baru yang dibuat untuk satu episode dipindah ke `kit/src/sets-lib.js` agar dipakai ulang.

## H. Dunia 3D dan kamera kontinu (standar sejak #003)
Keputusan pemilik channel: **semua scene** memakai dunia 3D (diorama cutaway + karakter ARSIP RIG sebagai billboard) dengan **satu kamera kontinu**; panduan pakai di `kit/HYBRID3D.md`. Aturan tambahan yang tetap berlaku dari A–G: tanpa outline, satu cahaya kunci (cyan layar) + satu praktikal hangat, rim light pada tokoh, kamera selalu bergerak.
- **Transisi antar-ruang = kamera menembus objek** (layar HP → terowongan, jendela, pintu, kartu ARSIP), bukan cut. Cut hanya dengan alasan cerita.
- **Beat kamera dari kata VO** (`vo-sync.js`: `T('menyesal')`), bukan detik buta. Gerak tercepat (whip) pada kata kejutan, `hold` (tahan) pada kata kunci.
- **Bahasa kamera yang sudah terbukti**: close-up rendah dengan getar tangan → crane naik-mundur → isometrik lensa panjang (efek miniatur) + orbit → whip + motion blur → jatuh lewat layar. Jangan orbit lebih dari ±50° di dekat tokoh (billboard terlihat seperti kertas).
- **Lapisan bukti ARSIP** (`evidence.js`): dokumen dengan bar sensor yang menyapu, stempel yang membanting, papan gabus + benang merah. Pakai saat cerita menyentuh arsip/dokumen.
- **Akting** (`acting.js`): `perform()` dengan antisipasi dan overshoot, `idle()`, `addDarts()` (lirikan). Ekspresi berganti pada kata kunci.
- QA: `qa_3d.mjs` (deterministik, tanpa error) adalah gerbang sebelum render; waktu render ≈ 28 dtk per dtk film.
- **Kamera harus bermotivasi**: tiap key kamera ditulis dengan `why` (alasan cerita); tabel tujuan→gerakan di `kit/HYBRID3D.md`. Tanpa alasan = hapus.
