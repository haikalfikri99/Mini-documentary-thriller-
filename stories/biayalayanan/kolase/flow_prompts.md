# Prompt Google Flow — #013 Harga Awal Rp50 Ribu, Pas Checkout Jadi Rp58 Ribu

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **1 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris.
Folder Drive: `Mini Thriller IDN/013 Biaya Layanan Checkout` · hasil disalin Claude ke `kolase/ai/<label>.jpg`.
Aturan: tokoh = pria dewasa / close-up tangan, tanpa gestur OK, semua teks/angka/cap dari kode; prompt kena blokir → chat/proyek baru di Flow.

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| H1: Layar checkout aplikasi ini ngasih dua harga buat barang yang sama. | hp_checkout (FRAME 0) + layar checkout Rp50.000 → Rp58.000 + cap DUA HARGA (kode) | AI + kode |
| Pas masukin ke keranjang, harganya kelihatan murah. | tangan_keranjang + label Rp50.000 | AI + kode |
| Eh, pas mau bayar, muncul baris kecil bernama biaya layanan… | pembeli_kaget + baris BIAYA LAYANAN di layar (kode) | AI + kode |
| Tahun ini, lembaga konsumen sampai ngingetin… | juru_bicara + kliping koran (kode) + label DATA INDONESIA · 2026 | AI + kode |
| Masalahnya, efeknya bukan cuma di biaya tambahan itu. | kaca_pembesar di atas baris biaya layanan | AI + kode |
| Peneliti di Amerika menguji jutaan pembeli tiket online. | peneliti_laptop + kerumunan_hp + label EKSPERIMEN AS · 2015 | AI + kode |
| Separuh… sejak awal. / Separuh lagi… pas mau bayar. | kerumunan_hp dibelah dua + dua layar HP (kode) | AI + kode |
| Hasilnya jomplang. …seperlima lebih banyak dan beli tiket lebih mahal. | stadion_kursi (baris depan disorot) + batang +⅕ (kode) | AI + kode |
| …otak kita udah terlanjur ngerasa cocok—biaya di akhir cuma dianggap selisih kecil. | pembeli_senyum (Batch B, tokoh sama) + koin kecil tergelincir (kode) | AI + kode |
| Dua total di layar checkout tadi… ngunci pilihanmu… | hp_checkout kembali + gembok | AI + kode |

## Batch A
```
Create 9 separate images, each as its own generation (not one combined image), 1 variation each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- BUYER_ID: Indonesian man about 30, warm brown skin, short neat hair, plain collared shirt

1. "hp_checkout" — aspect 3:4. FRAME 0 HERO. Close-up of a right hand holding a generic modern smartphone upright and facing the viewer, the thumb resting at the bottom edge of the screen; the screen is completely blank white, no logo; phone and hand fill about 85% of the image width.
2. "tangan_keranjang" — aspect 1:1. Close-up of a hand dropping a small plain cardboard product box into a plastic shopping basket that already holds two plain boxes; no labels or text.
3. "pembeli_kaget" — aspect 3:4. BUYER_ID, waist-up, holding a smartphone with a blank screen close to his face, eyebrows raised and mouth slightly open in surprise, looking at the screen.
4. "juru_bicara" — aspect 3:4. An Indonesian man about 50, short grey hair, glasses, wearing a long-sleeved batik shirt, waist-up, speaking at a press conference behind a small table with three plain microphones, one hand raised in an open-palm explaining gesture; no logos, no banners, no text.
5. "kaca_pembesar" — aspect 1:1. A classic round magnifying glass with a wooden handle, lying at a slight angle, the lens empty and clear.
6. "peneliti_laptop" — aspect 4:3. An American man about 40 with short hair and a short beard, rolled-up shirt sleeves, waist-up, sitting at a desk and studying a laptop with a blank screen, a coffee mug and blank printouts beside him.
7. "kerumunan_hp" — aspect 4:3. A wide crowd of many small figures of adult men seen from slightly above, each one looking down at a smartphone in his hand, filling the whole width like a sea of people; generic faces.
8. "stadion_kursi" — aspect 4:3. Rows of empty stadium seats in a concert arena seen from the side, the front rows close to an empty stage at the left, the rows rising toward the back at the right; no people, no text.
9. "gembok" — aspect 1:1. A heavy old-fashioned closed padlock with its shackle locked, front view, with a small key lying beside it.
Name each result with its label above.
```

## Batch B — chat/proyek baru, ingredient: `pembeli_kaget`
```
Create 1 image, 1 variation.
Style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- BUYER_ID: Indonesian man about 30, warm brown skin, short neat hair, plain collared shirt

1. "pembeli_senyum" — aspect 3:4. The SAME BUYER_ID man as in the reference image (same face, same shirt), waist-up, smiling with relief and giving a thumbs-up with one hand while holding a smartphone with a blank screen in the other. COMPLETELY CHANGE HIS POSE AND BODY ANGLE (do NOT copy the old posture or hand gesture from the reference).
Name the result with its label above.
```

## Tidak perlu generate
- Dibuat kode: layar checkout di HP (harga keranjang Rp50.000, baris BIAYA LAYANAN, total Rp58.000; label ILUSTRASI kecil); cap DUA HARGA; kliping koran YLKI dibuat ulang tanpa logo media; label asal DATA INDONESIA · 2026 dan EKSPERIMEN AS · 2015; dua layar HP split (biaya di depan vs di akhir); batang +⅕ belanja; koin kecil 'selisih kecil'; tanpa strip sumber (sumber di deskripsi).

## Saat memilih hasil
Buang hasil dengan huruf/logo palsu, tangan janggal, latar tidak putih. Hero frame 0 harus ±85% lebar gambar (≥ 486 px di layar). Gambar cacat → regenerate gambar itu saja.
