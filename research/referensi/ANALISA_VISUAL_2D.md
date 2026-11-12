# Bahasa visual kartun 2D yang bagus: sinematografi, cahaya, cara menggambar
Gabungan analisa 2 referensi (studio yang sama):
- **"What If Your Reaction Time Was 10x Faster"** (7:13; luma rata-rata 58; median shot 1,7 dtk)
- **"What If You Had 500 IQ"** (8:56; luma rata-rata 77, p10 41, p90 120; 123 shot, median 2,0 dtk)

Gambar acuan: `iq500_detail_aset_karakter.jpg`, `iq500_detail_tangan_objek.jpg`, `iq500_detail_cahaya.jpg`, `ifverse_detail_*.jpg`.
Detail karakter dan naskah ada di `ANALISA_IFVERSE.md`. Dokumen ini berisi **aturan menggambar** yang kita pakai.

## A. Bukti sistem karakter modular (dari video 500 IQ)
Satu kepala yang sama dipakai semua orang. Pembedanya hanya aset:

| Tokoh | Aset pembeda |
|---|---|
| tokoh utama | hoodie biru |
| adik | kuncir kecil dan jepit toska |
| kakek | kacamata bulat dan syal krem |
| penipu call-center | rambut keriting (garis lengkung krem di atas kepala hitam), headset, kartu nama |
| ibu | kerudung/rambut panjang |
| figuran | tubuh polos abu-tua tanpa wajah |

- **Ekspresi = stiker krem** (mata, alis, mulut) di atas kepala hitam. Kepala tidak pernah berubah bentuk.
- **Kepala menoleh** cukup dengan menggeser stiker wajah ke kiri/kanan di permukaan lingkaran.
- **Figuran** dibuat lebih gelap dan tanpa wajah. Fokus otomatis jatuh ke tokoh yang punya wajah dan warna.

## B. Cahaya (yang membuat "cantik")
1. **Satu set, banyak suasana:** dapur yang sama tampil siang (krem terang) dan malam (biru gelap + satu lampu meja kuning). Suasana diubah lewat cahaya, bukan menggambar ulang. Hemat produksi dan konsisten.
2. **Sumber cahaya selalu terlihat atau bisa ditebak:** jendela, lampu gantung, lampu meja, layar HP, lampu stadion. Cahaya punya arah.
3. **Rim light pada tokoh:** garis tepi berwarna sumber cahaya (oranye dari lampu, biru dari layar/TV, krem dari jendela) di sisi yang menghadap cahaya. Inilah satu-satunya "outline" tokoh.
4. **Pool dan falloff:** area di sekitar sumber cahaya lebih terang (gradien radial lembut), tepi frame lebih gelap (vignette). Mata digiring ke pool cahaya.
5. **Light shaft:** sorot jendela berupa trapesium transparan diagonal di atas meja/lantai (lihat meja kayu top-down).
6. **Bloom/glow:** sumber cahaya diberi glow radial aditif, kadang bintang kilau kecil.
7. **Kontras nilai, bukan kecerahan:** rata-rata frame gelap (58–77), tapi subjek dan sumber cahaya adalah area paling terang/kontras. Ini aturan yang menggantikan target luma LOOK.md kita.

## C. Kedalaman dan "lensa" (fotografi)
- **DOF 3 lapis:** latar belakang blur (radius makin besar makin jauh), subjek tajam, kadang latar depan besar sangat blur (jaring gawang, pundak, gelas).
- **Rack focus:** fokus pindah dari latar depan ke subjek dalam satu shot.
- **Lensa:** lens flare dan bloom di lampu stadion, chromatic/blur saat gerak cepat.
- **Letterbox** di momen sinematik; full frame untuk informasi.
- **Grain halus dan vignette** di semua frame, perekat agar semua elemen terasa satu "film".

## D. Kamera dan komposisi (sinematografi)
- **Ukuran shot bergantian terus:** wide establishing → medium → close-up → insert benda.
- **Insert benda top-down** (meja kayu, HP, tangan, cangkir) untuk aksi penting yang melibatkan tangan atau benda. Kita bisa pakai ini untuk "kamu" dan HP.
- **Kamera bergerak pelan hampir di setiap shot** (push-in 3–8%, slide horizontal, parallax antar lapis). Shot diam terasa mati.
- **Komposisi:**
  - tokoh di sepertiga
  - garis meja/jendela sebagai garis pengarah
  - **frame dalam frame** (jendela, pintu, layar TV)
  - ruang kosong ke arah pandangan tokoh
- **Split screen** dengan garis retak untuk membandingkan dua kemungkinan (cocok untuk "lanjut atau udahan?").
- **Close-up wajah** dipakai untuk reaksi. Karena wajahnya stiker sederhana, close-up tetap bersih.

## E. Cara mereka menggambar benda dan latar
- **Bentuk geometris bersih** (persegi, kotak bersudut bulat, lingkaran) dengan perspektif konsisten dan satu horizon. Tidak ada garis sketsa atau boil.
- **Tanpa outline di lingkungan.** Bentuk dibedakan oleh nilai/warna. Garis tipis hanya untuk detail (sambungan ubin, serat kayu, bingkai).
- **Setiap permukaan besar punya gradien halus** (atas lebih terang atau dekat cahaya lebih terang), bukan warna rata. Inilah beda "flat murahan" dengan "flat premium".
- **Bayangan kontak (AO) lembut** di bawah benda (piring, HP, kaki tokoh), jadi benda menempel pada permukaan, tidak melayang.
- **Detail secukupnya yang bercerita:** dapur punya ketel, magnet kulkas, foto keluarga, bendera ulang tahun. Satu–tiga detail per area, bukan penuh.
- **Palet latar desaturasi** (krem, hijau keabuan, coklat kayu, biru malam). Warna jenuh hanya pada baju tokoh utama dan aksen informasi (emas/oranye, hijau tombol).
- **Tangan close-up:** hitam-arang dengan **gradien per jari** (pangkal lebih gelap, buku jari ada highlight), jari tebal seperti kapsul, mirip sarung tangan yang rapi. Ada jam tangan/manset sebagai pemisah lengan.
- **UI dalam dunia:** layar HP dibuat rapi seperti UI asli (header, saldo, tombol hijau), badge info sudut bulat dengan border emas tipis, font sans tebal.

## F. Animasi dan fisika wajar
- Tween halus 24 fps dengan ease, tanpa boil.
- Langkah berjalan: kaki menapak (tidak meluncur), pinggul naik-turun, lengan berayun berlawanan.
- Kepala dan aksesori (kuncir, tali hoodie, syal) **telat sedikit** dari badan lalu menyusul (gerak sekunder pegas).
- Pose terbaca dari siluet saja. Antisipasi kecil sebelum aksi besar.

## G. Aturan baru untuk channel (menggantikan LOOK.md bagian cahaya dan karakter)
1. Karakter dari **rig ARSIP** (`rig/`): kepala hitam fix, ekspresi stiker, aset modular.
2. Setiap shot: **1 sumber cahaya utama yang jelas**, rim light pada tokoh dengan warna sumber itu, pool + vignette. Latar boleh gelap.
3. Latar: bentuk bersih tanpa outline, gradien per permukaan, bayangan kontak, 1–3 detail bercerita, blur sesuai kedalaman.
4. Satu set dipakai ulang dengan pencahayaan berbeda untuk mood berbeda.
5. Warna jenuh hanya untuk tokoh utama dan satu aksen cerita (#002: cahaya layar `#7fe3ff` dan amber `#ffb43a`).
6. Kamera selalu bergerak pelan; insert top-down untuk tangan dan HP.
