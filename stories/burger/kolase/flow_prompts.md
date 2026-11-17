# Prompt Google Flow — #009 Burger Lebih Besar dan Lebih Enak Ini Gagal Gara-Gara Angka

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **1 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris.
Folder Drive: `Mini Thriller IDN/009 Burger Sepertiga Pound` · hasil disalin Claude ke `kolase/ai/<label>.jpg`.
Aturan: tokoh = pria dewasa / close-up tangan, tanpa gestur OK, semua teks/angka/cap dari kode; prompt kena blokir → chat/proyek baru di Flow.

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| H1: Burger ini lebih tebal, harganya sama—tapi justru nggak laku. | burger_tebal + dua label harga identik + cap GAK LAKU | AI + kode |
| Tahun 80-an A&W merilis burger sepertiga pound… seperempat pound McDonald's | burger_dua + strip 1/3 POUND · A&W | 1/4 POUND · McDONALD'S | AI + kode |
| Harganya dipatok sama. | dua label harga identik meluncur dari samping | kode |
| Dalam tes rasa tertutup, mayoritas… lebih enak | pencicip (mata ditutup kain) + centang | AI + kode |
| Begitu dijual, angkanya malah ambruk | kasir_sepi + grafik merah menukik | AI + kode |
| Perusahaan menyewa peneliti untuk mewawancarai pembeli | peneliti_80an | AI |
| Lebih dari separuh orang mengira sepertiga lebih kecil dari seperempat | pembeli_bingung + slip 1/3 < 1/4 ? (stabilo) | AI + kode |
| [hening] Bukan karena mereka bodoh. Otak kita malas menghitung pecahan | tangan_pensil di atas kertas kosong | AI |
| …angka tiga melawan empat… tiga pasti lebih sedikit | angka 3 vs 4 besar, sorotan merah | kode |
| Lain kali, kalo kamu bandingin… label harga | rak_label + sorotan kuning pada pecahan | AI + kode |

## Batch A
```
Create 8 separate images, each as its own generation (not one combined image), 1 variation each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.

1. "burger_tebal" — aspect 4:3. FRAME 0 HERO. A generic thick hamburger seen from the side at eye level: a tall sesame-seed bun, a very thick beef patty, lettuce, tomato and cheese, slightly tilted; the burger fills about 85% of the image width.
2. "burger_dua" — aspect 4:3. Two generic hamburgers side by side on a plain counter, each half-wrapped in plain paper: the left one has a noticeably thicker patty than the right one; otherwise identical buns; no text on the wrappers.
3. "pencicip" — aspect 3:4. A man about 30 with short hair and a plain t-shirt, waist-up, a cloth blindfold over his eyes, taking a bite of a hamburger held in both hands, pleased expression (a blind taste test).
4. "kasir_sepi" — aspect 1:1. An empty 1980s fast-food restaurant counter seen from the customer side: a cash register, a stack of paper trays and a menu board above that is completely blank; nobody in line.
5. "peneliti_80an" — aspect 3:4. A man about 45, short side-parted hair, thick-framed 1980s glasses, wide-lapel suit and wide tie, waist-up, holding a pen over a blank notepad as if interviewing someone, attentive face.
6. "pembeli_bingung" — aspect 3:4. A man about 35 with short curly hair, a mustache and a 1980s windbreaker jacket, waist-up, scratching his head with one hand and holding a small blank card in the other, puzzled face.
7. "tangan_pensil" — aspect 1:1. Close-up of a right hand holding a pencil just above a blank sheet of paper, as if about to write a calculation; the paper is completely empty.
8. "rak_label" — aspect 4:3. A supermarket shelf section with rows of plain boxes and jars without labels, each row with a small blank price tag strip on the shelf edge; slight perspective.
Name each result with its label above.
```

## Tidak perlu generate
- Dibuat kode: cap GAK LAKU; dua label harga identik; strip 1/3 POUND · A&W dan 1/4 POUND · McDONALD'S (ketik, tanpa logo); centang tes rasa; grafik penjualan merah menukik; slip 1/3 < 1/4 ? (stabilo); angka 3 vs 4; sorotan kuning pecahan di label rak; strip sumber di akhir (Culinary Lore / A&W, 2021).

## Saat memilih hasil
Buang hasil dengan huruf/logo palsu, tangan janggal, latar tidak putih. Hero frame 0 harus ±85% lebar gambar (≥ 486 px di layar). Gambar cacat → regenerate gambar itu saja.
