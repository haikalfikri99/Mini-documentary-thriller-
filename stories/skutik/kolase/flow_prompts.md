# Prompt Google Flow — #005 Yamaha-Honda Didenda Rp47,5 M Gara-Gara Harga Skutik

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **2 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris (3:4 orang/benda tegak, 4:3 kendaraan/benda melebar, 1:1 tempat/close-up).
Urutan: **Batch A dulu** (memuat tokoh jangkar ★). Pilih hasil terbaik tiap tokoh ★, pasang sebagai **ingredient/gambar referensi**, baru jalankan **Batch B**.
Bila agen Flow hanya membuat satu gambar per perintah, kirim ulang per baris (bagian *Style* tetap disalin di depan).

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| Yamaha dan Honda didenda 47,5 miliar (frame 0) | skutik_a + skutik_b meluncur dari kiri-kanan, tabrakan, cap DENDA Rp47,5 M menghantam keduanya; tag ketik YAMAHA / HONDA | AI + kode |
| Gara-gara harga motor matik kayak gini | zoom ke label harga yang tergantung di setang (label dicetak kode) | AI + kode |
| Di dealer, kamu kira mereka bersaing ketat… adu murah | pembeli_banding: kamu memegang dua label harga; panah harga turun | AI |
| KPPU, wasitnya persaingan bisnis, menuduh… janjian harga | wasit KPPU #004 meniup peluit sambil menunjuk → duo_bisik (dua pihak berbisik) | pakai ulang #004 + AI |
| pembeli kehilangan pilihan yang lebih murah | pembeli_kecewa: dua label kini berangka sama (kode) | AI + kode |
| Buktinya? Lapangan golf. | golf_lapangan kosong + bendera, cap BUKTI? | AI |
| bos-bos kedua perusahaan pernah ketemu di sana | duo_golf: dua pihak berjas di green, berjabat tangan, pegang stik golf (kontras lucu) | AI |
| lewat email, Yamaha disuruh ngikutin harga Honda | amplop terbang dari pihak B ke pihak_a_baca; tag EMAIL | AI + kode |
| harganya… beneran disesuaikan | tangan_label membalik label harga di setang | AI |
| denda 25 M / 22,5 M | pabrik_motor dua kali (cermin + tag), batang data gravir 25 vs 22,5, cap DENDA di tiap pihak | AI + kode |
| Dua-duanya membantah… | pihak_a_bantah (telapak menolak), pihak_b_bantah (geleng, tangan di dada) + cap DIBANTAH | AI |
| ke pengadilan. Lolos? Nggak. …MA tetap memihak KPPU | gedung pengadilan #004 → (opsional) skutik_sidang → wasit #004 angkat kartu; tangga PN → MA dari kode | pakai ulang #004 + AI |
| Di jalanan kelihatan musuhan | skutik_balap: dua matik adu cepat | AI |
| Di lapangan golf… ternyata sepakat | duo_golf diperbesar ke jabat tangannya (visual beda dari shot golf pertama) | AI (sama) |
| tiap kamu bandingin harga… diatur dari lapangan golf | loop ke frame 0: skutik + label harga, bendera golf ditancapkan di label | AI + kode |

## Tokoh berulang (ciri sama persis di semua prompt)
- **PIHAK_A (= pihak Yamaha, tag ketik)**: pria Indonesia ±55 th, rambut abu-abu pendek disisir ke belakang, kacamata persegi tipis, jas biru dongker
- **PIHAK_B (= pihak Honda, tag ketik)**: pria Indonesia ±45 th, rambut hitam belah samping, kumis tipis, tanpa kacamata, jas abu arang, dasi garis
- **PEMBELI (= kamu)**: pria Indonesia ±25 th, kemeja polos lengan pendek, jeans

## Batch A
```
Create 9 separate images, each as its own generation (not one combined image), 2 variations each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- COMPANY_MAN_A: Indonesian man about 55, warm brown skin, short grey hair combed back, thin rectangular metal-rimmed glasses, clean-shaven, dark navy two-piece suit, white shirt, plain dark tie
- COMPANY_MAN_B: Indonesian man about 45, warm brown skin, short black hair with a side part, thin moustache, no glasses, charcoal-grey two-piece suit, light shirt, diagonal-striped tie
- BUYER: Indonesian man about 25, warm brown skin, short black hair, plain light short-sleeved shirt, dark jeans

1. "skutik_a" — aspect 4:3. FRAME 0 HERO. A generic modern automatic step-through scooter (Indonesian commuter style), three-quarter front view facing left, smooth rounded body panels, round headlight, flat floorboard, blank panels with no badges or emblems; the scooter fills about 85% of the image width.
2. "skutik_b" — aspect 4:3. A different generic automatic scooter with a sportier angular body and a sharp V-shaped headlight, three-quarter front view facing right, blank panels with no badges or emblems; the scooter fills about 85% of the image width.
3. "pihak_a_bantah" — aspect 3:4. COMPANY_MAN_A, waist-up, facing the viewer, one palm pushed forward in a firm 'no' gesture, other arm across his chest, stern face.
4. "pihak_b_bantah" — aspect 3:4. COMPANY_MAN_B, waist-up, shaking his head with one hand flat on his chest, eyebrows raised as if saying 'impossible'.
5. "pembeli_banding" — aspect 3:4. BUYER, full body, holding a blank cardboard price tag in each hand at chest height, looking from one tag to the other, thoughtful face.
6. "golf_lapangan" — aspect 1:1. An empty golf course: a putting green with a flag pin in the hole in the foreground, gentle hills and a few tropical trees behind, no people.
7. "amplop" — aspect 1:1. A closed paper envelope tilted as if flying through the air, a few short speed lines behind it, completely blank (no address, no stamp).
8. "tangan_label" — aspect 1:1. Close-up of a right hand flipping over a blank cardboard price tag that hangs on a string from a scooter handlebar; the tag is blank.
9. "pabrik_motor" — aspect 1:1. A generic modern motorcycle factory building with a sawtooth roof and a loading yard with rows of new scooters, no signs or lettering.
Name each result with its label above.
```

## Batch B (ingredient: pihak_a_bantah, pihak_b_bantah, pembeli_banding, skutik_a, skutik_b)
```
Create 6 separate images, each as its own generation (not one combined image), 2 variations each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- COMPANY_MAN_A: Indonesian man about 55, warm brown skin, short grey hair combed back, thin rectangular metal-rimmed glasses, clean-shaven, dark navy two-piece suit, white shirt, plain dark tie
- COMPANY_MAN_B: Indonesian man about 45, warm brown skin, short black hair with a side part, thin moustache, no glasses, charcoal-grey two-piece suit, light shirt, diagonal-striped tie
- BUYER: Indonesian man about 25, warm brown skin, short black hair, plain light short-sleeved shirt, dark jeans

1. "duo_bisik" — aspect 4:3. The SAME COMPANY_MAN_A and COMPANY_MAN_B as in the reference images (same faces, same suits), standing close side by side from the knees up, COMPANY_MAN_B whispering into COMPANY_MAN_A's ear behind a raised hand, COMPANY_MAN_A glancing sideways; both heads the same size.
2. "duo_golf" — aspect 4:3. The SAME COMPANY_MAN_A and COMPANY_MAN_B (reference images), still in their same suits, standing on a golf putting green shaking hands and smiling, COMPANY_MAN_A holding a golf club in his other hand, a flag pin behind them; heads the same size, a little space between their bodies.
3. "pihak_a_baca" — aspect 3:4. The SAME COMPANY_MAN_A (reference image), waist-up, reading a blank sheet of paper held in both hands, eyebrows slightly raised, as if following an instruction.
4. "pembeli_kecewa" — aspect 3:4. The SAME BUYER (reference image), full body, shrugging with both empty palms up, disappointed face.
5. "skutik_balap" — aspect 4:3. Two riders in plain full-face helmets on the two scooters from the reference images, racing side by side on an asphalt road, leaning forward, motion lines; no numbers, no logos.
6. "skutik_sidang" — aspect 1:1. OPTIONAL. A grand old courtroom seen from the public gallery, the two scooters from the reference images parked side by side on the defendants' bench, empty judges' chairs (running joke from episode #004).
Name each result with its label above.
```

## Tidak perlu generate
- Wasit KPPU dari #004: `stories/aqua/kolase/ai/wasit_tiup.jpg` (menuduh), `wasit_map.jpg` (bukti), `wasit_kartu.jpg` (MA memihak KPPU): tokoh yang sama di seri ARSIP, jangan generate ulang
- Gedung pengadilan `stories/aqua/kolase/ai/court.jpg` + palu arsip #004
- Dibuat kode: label harga + angka, cap DENDA/DIBANTAH/BUKTI?, tag YAMAHA/HONDA/EMAIL/KPPU, batang data 25 vs 22,5, tangga PN 2017 → MA 2019 → PK 2021

## Saat memilih hasil
Buang variasi dengan huruf/logo palsu, tangan janggal, latar tidak putih. Objek frame 0 harus memenuhi ±85% lebar gambar (siap tampil ≥ 486 px di layar). Simpan 1 terbaik per nama (`<nama>.jpg`) → zip di chat atau taruh di folder Drive episode → Claude menyalin ke `kolase/ai/`.
