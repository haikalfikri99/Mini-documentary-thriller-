# Prompt Google Flow — #012 Cara Halus Kartu Member Bikin Kamu Balik Lagi

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **1 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris.
Folder Drive: `Mini Thriller IDN/012 Kartu Member` · hasil disalin Claude ke `kolase/ai/<label>.jpg`.
Aturan: tokoh = pria dewasa / close-up tangan, tanpa gestur OK, semua teks/angka/cap dari kode; prompt kena blokir → chat/proyek baru di Flow.

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| H1: Dua kartu member ini sama-sama butuh delapan cap—tapi hasilnya beda jauh. | kartu_tangan + 2 kartu (8 kotak kosong | 10 kotak, 2 dicap) digambar kode | AI + kode |
| Kartu begini pasti kamu kenal di kedai kopi atau cuci motor | kedai_kopi → cuci_motor | AI |
| Dua peneliti mencobanya di sebuah tempat cuci mobil | cuci_mobil + strip Nunes & Drèze, JCR 2006 | AI + kode |
| …kartu delapan kotak… / …kartu sepuluh kotak, dua sudah dicap | stempel_tangan + 2 kartu (kode) | AI + kode |
| Jarak ke hadiahnya sama persis: delapan kali cuci lagi | dua kartu sejajar, sisa 8 kotak disorot | kode |
| …hampir dua kali lebih banyak yang dapat cuci gratis | batang 34% vs 19% (dari samping, y ≤ 1180) | kode |
| Dan kartunya penuh lebih cepat | garis waktu pendek vs panjang | kode |
| [hening] Kartu kosong terasa seperti pekerjaan yang belum dimulai | pelari_start | AI |
| Kartu bercap terasa sudah berjalan… nanggung kalo berhenti | pelari_tengah (Batch B, tokoh sama) | AI |
| Lain kali, kalo kasir ngasih kartu yang sudah ada dua capnya… | kasir_kartu + 2 cap (kode) + slip CUMA TERASA LEBIH DEKAT | AI + kode |

## Batch A
```
Create 7 separate images, each as its own generation (not one combined image), 1 variation each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- RUNNER: Indonesian man about 30, warm brown skin, short hair, plain sleeveless running singlet with a blank race bib, running shorts

1. "kartu_tangan" — aspect 4:3. FRAME 0 HERO. Close-up of a hand holding a blank rectangular paper loyalty card flat and facing the viewer, the card completely empty with no boxes, no marks and no text; card and hand fill about 85% of the image width.
2. "kedai_kopi" — aspect 1:1. A small Indonesian coffee shop counter: a glass of iced coffee and a hot coffee cup, a simple espresso machine behind, a small stack of blank paper cards near the register; no signs, no text.
3. "cuci_motor" — aspect 4:3. A scooter-style motorcycle covered in soap foam at a simple roadside wash spot, a water hose lying beside it with water spraying; no person, no text.
4. "cuci_mobil" — aspect 4:3. A generic sedan inside an automatic car wash with large spinning brushes and soap foam, seen from a front three-quarter angle; no signs, no text.
5. "stempel_tangan" — aspect 1:1. Close-up of a hand pressing a small rubber stamp down onto a blank paper card on a counter, an ink pad beside it.
6. "pelari_start" — aspect 4:3. RUNNER, full body, crouched at a starting line on a running track in a set position, hands on the ground behind the line, looking ahead, not yet started; the track ahead is empty.
7. "kasir_kartu" — aspect 1:1. Close-up across a shop counter: a hand holding out a small blank paper loyalty card toward the viewer, as if a cashier is handing it over.
Name each result with its label above.
```

## Batch B — chat/proyek baru, ingredient: `pelari_start`
```
Create 1 image, 1 variation.
Style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- RUNNER: Indonesian man about 30, warm brown skin, short hair, plain sleeveless running singlet with a blank race bib, running shorts

1. "pelari_tengah" — aspect 4:3. The SAME RUNNER as in the reference image (same face, same singlet and race bib), full body, running mid-stride well down the track, side view, one foot off the ground, determined face. COMPLETELY CHANGE HIS POSE AND BODY ANGLE (do NOT copy the old posture or hand gesture from the reference).
Name the result with its label above.
```

## Tidak perlu generate
- Dibuat kode: dua kartu member (8 kotak kosong; 10 kotak dengan 2 cap GRATIS) ditempel di kartu_tangan/stempel_tangan; strip Nunes & Drèze, Journal of Consumer Research 2006; sorotan sisa 8 kotak; batang 34% vs 19% (hanya visual); garis waktu; slip penutup HADIAHNYA NGGAK MAKIN DEKAT — CUMA TERASA LEBIH DEKAT.

## Saat memilih hasil
Buang hasil dengan huruf/logo palsu, tangan janggal, latar tidak putih. Hero frame 0 harus ±85% lebar gambar (≥ 486 px di layar). Gambar cacat → regenerate gambar itu saja.
