# Prompt Google Flow — #010 Kantong Plastik Ini Mendadak Ditolak Gara-Gara Rp200

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **1 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris.
Folder Drive: `Mini Thriller IDN/010 Kantong Plastik Rp200` · hasil disalin Claude ke `kolase/ai/<label>.jpg`.
Aturan: tokoh = pria dewasa / close-up tangan, tanpa gestur OK, semua teks/angka/cap dari kode; prompt kena blokir → chat/proyek baru di Flow.

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| H1: Kantong plastik ini cuma dua ratus perak—tapi banyak pembeli menolaknya. | kantong_hero + label Rp200 + cap DITOLAK | AI + kode |
| Tahun 2016, di puluhan kota, kantong plastik minimarket nggak lagi gratis | kasir_kantong + kata GRATIS dicoret merah + strip 2016 | AI + kode |
| Harganya dua ratus rupiah—recehan yang biasanya diganti permen | koin_permen (nada lucu) | AI |
| Sejak itu, cuma dalam tiga bulan… turun sampai 30% | grafik turun + strip SUMBER: KLHK, 2016 | kode |
| Anehnya, 200 perak bukan rugi besar. Lalu kenapa orang menolak? | tolak_kantong | AI |
| Petunjuknya datang dari Amerika. Di satu daerah, tiap kantong dibayar 5 sen | toko_as + strip MARYLAND, AS · Homonoff 2018 + label BAYAR 5 SEN | AI + kode |
| Di toko lain, yang bawa tas sendiri justru dapat bonus 5 sen | tas_kain + label BONUS 5 SEN | AI + kode |
| Yang harus bayar, banyak yang berhenti pakai kantong | pembeli_peluk (belanjaan dipeluk, lucu) | AI |
| Yang dapat bonus? Tetap pakai kantong seperti biasa | pembeli_kantong (Batch B, tokoh sama) | AI |
| [hening] Nilainya sama-sama lima sen… bonus terasa untung kecil | timbangan arsip: koin bonus vs koin_jatuh | arsip + AI |
| …bayar kantong terasa kehilangan barang yang tadinya gratis | koin_jatuh + cap RUGI | AI + kode |
| Lain kali, kalo yang biasanya gratis tiba-tiba berbayar… | kembali ke kantong_hero (loop) | AI |

## Batch A
```
Create 8 separate images, each as its own generation (not one combined image), 1 variation each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- SHOPPER_US: American man about 40, short beard, plain flannel shirt, plain baseball cap with no logo

1. "kantong_hero" — aspect 3:4. FRAME 0 HERO. A thin, slightly crumpled plastic shopping bag with two loop handles, standing upright and empty, front view, completely plain; the bag fills about 85% of the image width.
2. "kasir_kantong" — aspect 1:1. A small Indonesian minimarket checkout counter: a cash register, a roll of thin plastic shopping bags hanging on a hook, a few snacks on the counter; no signs, no text.
3. "koin_permen" — aspect 1:1. Two small plain coins with no inscriptions lying next to three wrapped hard candies with twisted wrapper ends, on a counter top, close-up.
4. "tolak_kantong" — aspect 4:3. Two hands only: a hand from the left offering a folded thin plastic shopping bag, and a hand from the right raised palm-forward in a polite 'no thanks' gesture.
5. "toko_as" — aspect 1:1. A generic American supermarket checkout lane with a conveyor belt, a bagging area and a rack of plastic grocery bags; no signs, no text.
6. "tas_kain" — aspect 3:4. A hand holding up a sturdy reusable cloth tote bag by its handles, the bag plain with no print.
7. "pembeli_peluk" — aspect 3:4. SHOPPER_US, waist-up, walking out of a store carrying groceries in both arms without any bag: a loaf of bread, a plain cereal box and a few apples about to slip, slightly comic strained face.
8. "koin_jatuh" — aspect 1:1. An open hand, palm up, with one plain coin with no inscription falling away from the fingers into empty space, close-up.
Name each result with its label above.
```

## Batch B — chat/proyek baru, ingredient: `pembeli_peluk`
```
Create 1 image, 1 variation.
Style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- SHOPPER_US: American man about 40, short beard, plain flannel shirt, plain baseball cap with no logo

1. "pembeli_kantong" — aspect 3:4. The SAME SHOPPER_US as in the reference image (same face, same beard, same flannel shirt and cap), full body, walking calmly with several full plastic grocery bags hanging from each hand, relaxed face. COMPLETELY CHANGE HIS POSE AND BODY ANGLE (do NOT copy the old posture or hand gesture from the reference).
Name the result with its label above.
```

## Tidak perlu generate
- Dibuat kode: label Rp200; cap DITOLAK; kata GRATIS dicoret; strip Uji coba kantong berbayar 2016; grafik turun sampai 30% + SUMBER: KLHK, 2016; strip MARYLAND, AS · Homonoff 2018; label BAYAR 5 SEN / BONUS 5 SEN; cap RUGI.
- Arsip: timbangan dua piring (pakai ulang dari #008 bila ada, atau Openverse → Wikimedia).

## Saat memilih hasil
Buang hasil dengan huruf/logo palsu, tangan janggal, latar tidak putih. Hero frame 0 harus ±85% lebar gambar (≥ 486 px di layar). Gambar cacat → regenerate gambar itu saja.
