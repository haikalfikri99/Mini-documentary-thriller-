# Prompt Google Flow — #011 Belanja Jadi Lebih Banyak Gara-Gara Tombol Paylater

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **1 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris.
Folder Drive: `Mini Thriller IDN/011 Paylater` · hasil disalin Claude ke `kolase/ai/<label>.jpg`.
Aturan: tokoh = pria dewasa / close-up tangan, tanpa gestur OK, semua teks/angka/cap dari kode; prompt kena blokir → chat/proyek baru di Flow.

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| H1: Tombol ini nggak memotong harga—tapi orang malah belanja lebih banyak. | jempol_hp + tombol PAYLATER di layar (kode) + cap HARGA SAMA | AI + kode |
| Namanya paylater. Sampai pertengahan tahun ini… 32 juta rekening | angka 32,8 JUTA REKENING + strip SUMBER: OJK, data Juni 2026 | kode |
| Belanja sekarang, bayarnya belakangan. | paket_tumpuk | AI |
| Kedengarannya cuma soal kapan bayar. | kalender_sobek (tanggal dari kode) | AI + kode |
| Tapi di Amerika, peneliti membedah data sebuah peritel besar | peneliti_data + strip Maesen & Ang, J. Marketing | AI + kode |
| Barangnya sama. Harganya sama. | keranjang_isi + dua label harga sama | AI + kode |
| Anehnya, isi belanjaan mereka naik lebih banyak sepuluh persen | keranjang_luber + label +10% | AI + kode |
| Kebiasaan itu bertahan sampai setengah tahun | kalender_sobek berganti 26 minggu | AI + kode |
| [hening] Bukan karena boros. Paylater bikin dompet terasa lebih longgar | dompet_longgar | AI |
| Uang yang belum keluar hari ini, rasanya belum kepake | dompet_longgar + label BELUM KELUAR | AI + kode |
| Coba ingat belanjaan terakhir… masih jadi beli? | pembeli_ragu + layar HP struk (kode) | AI + kode |

## Batch A
```
Create 8 separate images, each as its own generation (not one combined image), 1 variation each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- BUYER_ID: Indonesian man about 30, warm brown skin, short neat hair, plain collared shirt

1. "jempol_hp" — aspect 3:4. FRAME 0 HERO. Close-up of a right hand holding a generic modern smartphone upright, the thumb hovering just above the lower part of the screen as if about to press a button; the screen is completely blank white, no logo; phone and hand fill about 85% of the image width.
2. "paket_tumpuk" — aspect 1:1. A small pile of online-shopping delivery parcels: plain cardboard boxes and plastic mailer pouches stacked unevenly, sealed with tape, no labels or text.
3. "kalender_sobek" — aspect 3:4. A wall tear-off day calendar hanging on a nail, the top page half torn off, all pages completely blank with no numbers.
4. "peneliti_data" — aspect 4:3. A man about 45 with rolled-up shirt sleeves and reading glasses, waist-up, sitting at a desk covered with blank printouts, running a finger down a long blank printout as if checking numbers, a laptop beside him with a blank screen.
5. "keranjang_isi" — aspect 1:1. A plastic supermarket hand basket, half full with a few plain grocery items: a box, a bottle and some fruit; no labels or text.
6. "keranjang_luber" — aspect 1:1. The same kind of plastic supermarket hand basket, now overflowing: piled high with plain boxes, bottles, fruit and snacks spilling over the rim; no labels or text.
7. "dompet_longgar" — aspect 4:3. An open leather wallet lying at an angle, a thick stack of plain banknotes with no numbers or portraits sticking loosely out of it.
8. "pembeli_ragu" — aspect 3:4. BUYER_ID, waist-up, holding a smartphone with a blank screen in one hand, the other hand rubbing his chin, hesitant thoughtful face, looking at the phone.
Name each result with its label above.
```

## Tidak perlu generate
- Dibuat kode: tombol PAYLATER di layar HP; cap HARGA SAMA; angka 32,8 JUTA REKENING + SUMBER: OJK, data Juni 2026; strip Maesen & Ang, Journal of Marketing; label +10%; 26 MINGGU; label BELUM KELUAR; struk di layar HP.

## Saat memilih hasil
Buang hasil dengan huruf/logo palsu, tangan janggal, latar tidak putih. Hero frame 0 harus ±85% lebar gambar (≥ 486 px di layar). Gambar cacat → regenerate gambar itu saja.
