# Prompt Google Flow — #015 Satu Tanda Best Seller Ini Mengubah Isi Pesananmu

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **1 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris.
Folder Drive: `Mini Thriller IDN/015 Best Seller Menu` · hasil disalin Claude ke `kolase/ai/<label>.jpg`.
Aturan: tokoh = pria dewasa / close-up tangan, tanpa gestur OK, semua teks/angka/cap dari kode; prompt kena blokir → chat/proyek baru di Flow.

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| H1: Satu tanda kecil di buku menu ini diam-diam ngarahin pesananmu. | buku_menu (FRAME 0) + lencana BEST SELLER menyala (kode, diwarnai) | AI + kode |
| Pas bingung milih makanan di restoran atau kafe… | pengunjung_bingung | AI |
| …mata kita otomatis ngelirik label Best Seller. Rasanya kayak jalan pintas… | buku_menu + panah jalan pintas ke lencana (kode) | AI + kode |
| …peneliti menguji daftar best seller di jaringan restoran Beijing. | restoran_beijing + label EKSPERIMEN BEIJING · 2006 | AI + kode |
| Sebagian pengunjung… lima menu best seller… / Pengunjung lain… lima menu contoh | plakat_meja ×2: kiri 1–5 bernomor, kanan tanpa nomor (kode) | AI + kode |
| Hasilnya timpang. …naik 13 sampai 20 persen… nyaris nggak ngaruh. | pelayan_catat + batang +13–20% vs ≈0 (kode) | AI + kode |
| Anehnya lagi, tamu… ngaku lebih puas. | tamu_puas | AI |
| Otak kita memang malas menilai rasa dari nol… nebeng pilihan orang banyak | tangan_menunjuk + stempel JAMINAN ENAK (kode) | AI + kode |
| Menu best seller terakhir yang kamu pesan…? | pengunjung_tunjuk (Batch B, tokoh sama) + buku_menu | AI + kode |

## Batch A
```
Create 7 separate images, each as its own generation (not one combined image), 1 variation each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- DINER_ID: Indonesian man about 28, warm brown skin, short wavy hair, plain round-neck t-shirt

1. "buku_menu" — aspect 4:3. FRAME 0 HERO. An open restaurant menu book lying flat and facing the viewer, two facing pages each with neat empty rows for dishes and small empty frames for food pictures, a ribbon bookmark; all pages completely blank with no text; the menu fills about 85% of the image width.
2. "pengunjung_bingung" — aspect 3:4. DINER_ID sitting at a small cafe table, waist-up, holding an open menu with both hands, frowning slightly and undecided, a glass of iced tea on the table.
3. "restoran_beijing" — aspect 4:3. A traditional Chinese restaurant dining room: round tables with lazy susans and chopsticks, paper lanterns hanging from the ceiling, a few diners eating in the background; no signs, no text.
4. "plakat_meja" — aspect 1:1. A small blank tent card standing on a round restaurant table next to a teapot and a pair of chopsticks; the card is completely empty with no text.
5. "pelayan_catat" — aspect 3:4. A Chinese restaurant waiter, a man about 40 in a plain white shirt and dark vest, waist-up, writing an order on a small blank notepad with a pen.
6. "tamu_puas" — aspect 3:4. A Chinese man about 45 in a plain shirt sitting at a round restaurant table, waist-up, holding chopsticks over a bowl of noodles and giving a thumbs-up with the other hand, satisfied smile.
7. "tangan_menunjuk" — aspect 4:3. Many hands from different sides reaching in and pointing at the same single plate of food in the middle of a table; generic hands with five fingers.
Name each result with its label above.
```

## Batch B — chat/proyek baru, ingredient: `pengunjung_bingung`
```
Create 1 image, 1 variation.
Style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- DINER_ID: Indonesian man about 28, warm brown skin, short wavy hair, plain round-neck t-shirt

1. "pengunjung_tunjuk" — aspect 3:4. The SAME DINER_ID man as in the reference image (same face, same t-shirt), waist-up, at a cafe table, his index finger resting on one item of an open menu, pausing with a thoughtful half-smile as if second-guessing his choice. COMPLETELY CHANGE HIS POSE AND BODY ANGLE (do NOT copy the old posture or hand gesture from the reference).
Name the result with its label above.
```

## Tidak perlu generate
- Dibuat kode: lencana BEST SELLER (diwarnai merah-emas di kode) + baris menu di buku_menu; panah jalan pintas; label EKSPERIMEN BEIJING · 2006; dua plakat: lima menu bernomor 1–5 vs lima menu contoh tanpa nomor (teks Bahasa Indonesia); batang +13–20% vs ≈0; stempel JAMINAN ENAK; tanpa strip sumber.

## Saat memilih hasil
Buang hasil dengan huruf/logo palsu, tangan janggal, latar tidak putih. Hero frame 0 harus ±85% lebar gambar (≥ 486 px di layar). Gambar cacat → regenerate gambar itu saja.
