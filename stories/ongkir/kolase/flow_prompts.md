# Prompt Google Flow — #014 Voucher Ongkir Rp0 Bikin Paket Retur Ikut Naik

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **1 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris.
Folder Drive: `Mini Thriller IDN/014 Voucher Ongkir Rp0` · hasil disalin Claude ke `kolase/ai/<label>.jpg`.
Aturan: tokoh = pria dewasa / close-up tangan, tanpa gestur OK, semua teks/angka/cap dari kode; prompt kena blokir → chat/proyek baru di Flow.

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| H1: Voucher ongkir nol rupiah ini matiin rem belanja di otakmu. | hp_keranjang (FRAME 0) + stiker ONGKIR Rp0 (kode) + rem_tangan dilepas | AI + kode |
| Pas checkout, potongan ongkir kerasa kayak untung bersih. | kurir_motor + label HEMAT (kode) | AI + kode |
| Paling cuma bikin orang lebih sering belanja. | paket_tumpuk | AI |
| Masalahnya, efek aslinya beda. Toko online besar di Eropa… 760 ribu pelanggannya. | gudang + kerumunan_pelanggan + label EKSPERIMEN EROPA · 2014 | AI + kode |
| Separuh dapat gratis ongkir, separuh lagi bayar normal. | kerumunan_pelanggan dibelah dua + kode GRATIS ONGKIR vs ONGKIR NORMAL (kode) | AI + kode |
| Anehnya, yang naik cuma barang berisiko… baju dan kosmetik | baju_gantung + kosmetik membesar; barang_aman tetap (kode: panah naik/datar) | AI + kode |
| —dan paket retur ikut naik. | paket_retur + cap RETUR | AI + kode |
| Ongkir itu sebenarnya rem alami… | rem_tangan ditarik kembali | AI |
| …keranjang belanja berubah jadi ruang coba gratis. | kamar_pas + stiker Rp0 di tirai (kode) | AI + kode |

## Batch A
```
Create 11 separate images, each as its own generation (not one combined image), 1 variation each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- COURIER_ID: Indonesian man about 35, warm brown skin, short hair, plain jacket and a plain open-face helmet with no logo

1. "hp_keranjang" — aspect 3:4. FRAME 0 HERO. Close-up of a hand holding a generic modern smartphone upright and facing the viewer, the index finger about to tap the lower half of the screen; the screen is completely blank white, no logo; phone and hand fill about 85% of the image width.
2. "rem_tangan" — aspect 1:1. Close-up of a car handbrake lever between two front seats, a hand gripping it and releasing it downward.
3. "kurir_motor" — aspect 4:3. COURIER_ID riding a scooter-style motorcycle with a plain cardboard parcel box strapped on the back seat, side view, on a simple street; no logos, no text.
4. "paket_tumpuk" — aspect 1:1. A small pile of online-shopping delivery parcels: plain cardboard boxes and plastic mailer pouches stacked unevenly, sealed with tape, no labels or text.
5. "gudang" — aspect 4:3. A large warehouse interior with tall shelving racks full of plain cardboard boxes and a long conveyor belt carrying parcels in the foreground; no people, no signs, no text.
6. "kerumunan_pelanggan" — aspect 4:3. A wide crowd of many small figures of adult men in plain everyday clothes, seen from the front at a slight distance, standing shoulder to shoulder and filling the whole width; generic faces.
7. "baju_gantung" — aspect 3:4. A plain button-up shirt and a simple dress hanging on two wooden hangers from a clothes rail, fabric gently draped; no labels.
8. "kosmetik" — aspect 1:1. A small group of cosmetics standing together: a lipstick, a round compact powder case, a small bottle and a jar of cream, all completely plain with no labels.
9. "barang_aman" — aspect 1:1. A plain plastic storage box with a lid and a small round hand mirror leaning against it; no labels.
10. "paket_retur" — aspect 1:1. Close-up of two hands folding a plain shirt back into an open cardboard parcel box, a roll of packing tape beside it.
11. "kamar_pas" — aspect 3:4. A clothing store fitting room seen from the front: a curtain pulled open on its rail, a stool and a few shirts on hangers on a wall hook inside; nobody inside, no text.
Name each result with its label above.
```

## Tidak perlu generate
- Dibuat kode: layar keranjang + stiker ONGKIR Rp0; label HEMAT; label EKSPERIMEN EROPA · 2014 dan 760.395 PELANGGAN; kode GRATIS ONGKIR vs ONGKIR NORMAL; panah naik pada baju/kosmetik, datar pada barang_aman; cap RETUR; label DATA INDONESIA hanya untuk voucher generik; tanpa strip sumber.

## Saat memilih hasil
Buang hasil dengan huruf/logo palsu, tangan janggal, latar tidak putih. Hero frame 0 harus ±85% lebar gambar (≥ 486 px di layar). Gambar cacat → regenerate gambar itu saja.
