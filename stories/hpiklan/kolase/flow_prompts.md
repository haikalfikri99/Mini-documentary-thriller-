# Prompt Google Flow — #007 Alasan Asli Iklan di HP Xiaomi, Ditulis Xiaomi Sendiri

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **2 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris (3:4 orang/benda tegak, 4:3 kendaraan/benda melebar, 1:1 tempat/close-up).
Urutan: **Batch A dulu** (memuat tokoh jangkar ★). Pilih hasil terbaik tiap tokoh ★, pasang sebagai **ingredient/gambar referensi**, baru jalankan **Batch B**.
Bila agen Flow hanya membuat satu gambar per perintah, kirim ulang per baris (bagian *Style* tetap disalin di depan).

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| HP Xiaomi kayak gini sering muncul iklan… (frame 0) | hp_tangan besar, kartu IKLAN muncul di layar (kode), cap IKLAN? | AI + kode |
| Xiaomi janji, untung bersih dari semua barang jualannya maks. 5% setahun | pihak_x_janji (tangan sumpah) + produk_jejer + cap JANJI ≤ 5% | AI + kode |
| Kalau lebih, kelebihannya dikembalikan ke pengguna | tangan_koin: koin dituang balik ke telapak tangan | AI |
| Jarang… untungnya dibatasi | batang untung menabrak garis atap MAKS 5% | kode |
| janji itu ditepati. Terus untung besarnya dari mana? | dokumen laporan (kode) + cap DITEPATI → tanda ? di samping HP | kode |
| Dokumen resmi Xiaomi… perusahaan internet | pihak_x_tunjuk + slip ketik kutipan prospektus 2018 + bola dunia (pustaka gravir) | AI + kode |
| HP dijual untung tipis, buat dapetin pengguna | hp_kail: HP jadi umpan di kail pancing | AI |
| Kamu merasa untung… layar HP-mu ikut jadi papan iklan | pembeli_hp tersenyum → layar HP berubah jadi papan_iklan | AI |
| per Rp100: HP Rp11, layanan internet Rp76 | koin_tumpuk diskalakan 11 vs 76 (data gravir) | AI + kode |
| Sumber uang terbesarnya? Iklan. | hp_koin: koin mengalir keluar dari layar | AI |
| iklannya nggak mengganggu dan bisa dikurangi di pengaturan | tangan_saklar menggeser sakelar ke OFF; pihak_x_janji tenang | AI |
| iklan kecil kayak gini… bagian penting dari bisnisnya | loop ke frame 0: hp_tangan + kartu iklan kecil | AI + kode |

## Tokoh berulang (ciri sama persis di semua prompt)
- **PIHAK_X (= pihak Xiaomi, tag ketik)**: pria Asia Timur ±50 th, rambut hitam pendek rapi, jas gelap, kemeja putih kerah terbuka tanpa dasi
- **PEMBELI (= kamu)**: perempuan Indonesia ±23 th, jilbab polos, blus lengan panjang

## Batch A
```
Create 10 separate images, each as its own generation (not one combined image), 2 variations each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- COMPANY_MAN_X: East Asian man about 50, short neat black hair, clean-shaven, dark suit with an open-collar white shirt and no tie
- BUYER: Indonesian woman about 23, warm brown skin, simple plain hijab, long-sleeved blouse

1. "hp_tangan" — aspect 3:4. FRAME 0 HERO. A right hand holding a generic modern smartphone upright, tilted about 15 degrees, screen facing the viewer and completely blank white, slim bezels, no logo; phone and hand fill about 85% of the image width.
2. "pihak_x_janji" — aspect 3:4. COMPANY_MAN_X, waist-up, right hand raised as if taking an oath, left hand on his chest, sincere face.
3. "produk_jejer" — aspect 4:3. A row of generic consumer electronics standing side by side: smartphone, smartwatch, small flat TV, rice cooker, air purifier, power bank, electric kick scooter; no logos, no text.
4. "tangan_koin" — aspect 1:1. One hand pouring a few coins down into another open palm below (money being given back); plain coins with no inscriptions.
5. "hp_kail" — aspect 3:4. A generic smartphone hanging from a large fishing hook on a fishing line, like bait, screen blank.
6. "pembeli_hp" — aspect 3:4. BUYER, waist-up, smiling happily, holding a new generic smartphone in one hand and its open plain box in the other; screen blank.
7. "papan_iklan" — aspect 4:3. A large roadside billboard on two steel posts with a small catwalk, the panel completely blank white.
8. "koin_tumpuk" — aspect 3:4. A single tall, slightly uneven stack of plain coins with no inscriptions.
9. "hp_koin" — aspect 1:1. A generic smartphone lying flat at an angle, a stream of plain coins pouring out of its blank screen into a pile.
10. "tangan_saklar" — aspect 1:1. Close-up of a thumb sliding a simple toggle switch on a blank smartphone screen to the off side; no text.
Name each result with its label above.
```

## Batch B (ingredient: pihak_x_janji)
```
Create 1 separate images, each as its own generation (not one combined image), 2 variations each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- COMPANY_MAN_X: East Asian man about 50, short neat black hair, clean-shaven, dark suit with an open-collar white shirt and no tie

1. "pihak_x_tunjuk" — aspect 3:4. The SAME COMPANY_MAN_X as in the reference image (same face, same suit), waist-up, pointing up and to the side with his index finger as if explaining, calm confident face.
Name each result with its label above.
```

## Tidak perlu generate
- Bola dunia: `kit/collage/engr_objects.py globe()`
- Dibuat kode: kartu iklan di layar, cap IKLAN?/JANJI ≤ 5%/DITEPATI, garis MAKS 5%, dokumen laporan, kutipan prospektus 2018, angka Rp11 vs Rp76, SUMBER UANG TERBESAR LAYANAN INTERNET: IKLAN, tag XIAOMI

## Saat memilih hasil
Buang variasi dengan huruf/logo palsu, tangan janggal, latar tidak putih. Objek frame 0 harus memenuhi ±85% lebar gambar (siap tampil ≥ 486 px di layar). Simpan 1 terbaik per nama (`<nama>.jpg`) → zip di chat atau taruh di folder Drive episode → Claude menyalin ke `kolase/ai/`.
