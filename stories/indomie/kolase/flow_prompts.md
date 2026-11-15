# Prompt Google Flow — #008 Indomie Ditolak Taiwan 3 Kali Gara-Gara Bumbunya

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **2 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris (3:4 orang/benda tegak, 4:3 kendaraan/benda melebar, 1:1 tempat/close-up).
Urutan: **Batch A dulu** (memuat tokoh jangkar ★). Pilih hasil terbaik tiap tokoh ★, pasang sebagai **ingredient/gambar referensi**, baru jalankan **Batch B**.
Bila agen Flow hanya membuat satu gambar per perintah, kirim ulang per baris (bagian *Style* tetap disalin di depan).

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| Indomie kayak gini ditolak Taiwan tiga kali (frame 0) | mi_bungkus besar, cap DITOLAK TAIWAN ×3 menempel di bungkus | AI + kode |
| Gara-gara isi sachet bumbunya. Kok bisa? | sachet_tiga keluar dari bungkus | AI |
| di sini, BPOM bilang aman | petugas_id_aman (BPOM) + cap AMAN | AI + kode |
| kata Taiwan, kecap… mengandung nipagin, zat pengawet | petugas_tw_tabung memeriksa tetes kecap; slip NIPAGIN = zat pengawet | AI + kode |
| Di Taiwan nggak boleh. Di Indonesia boleh, asal di bawah batas | dua buku aturan (arsip) + garis batas | arsip + kode |
| BPOM bilang, dua-duanya aman menurut aturan masing-masing | petugas_id_jelaskan (dua telapak terbuka) | AI |
| Selesai? Belum. 13 tahun kemudian… sisa pestisida etilen oksida | rempah_fumigasi (karung rempah ditutup terpal + tabung gas) → kaca_pembesar di atas bubuk bumbu | AI |
| Taiwan: tidak boleh terdeteksi. Indonesia: ada batas, jauh di bawahnya | petugas_tw_tolak + meteran dua skala (kode) | AI + kode |
| Satu kiriman Soto Banjar ditolak Taiwan | kardus_kiriman di gudang pelabuhan + cap DITOLAK | AI + kode |
| bukan ekspor resmi dari pabriknya | pabrik_mi, panah kiriman tidak berasal dari pabrik (kode) | AI + kode |
| Indofood bilang… nggak terdeteksi | pihak_indofood mengangkat laporan lab | AI |
| Satu merek, dua jawaban | layar terbelah: petugas_tw_tolak | petugas_id_aman | AI (sama) |
| mi instan di dapur rumah kita… standar yang beda di tiap negara | dapur → timbangan arsip dua piring → loop ke frame 0 mi_bungkus | AI + arsip |

## Tokoh berulang (ciri sama persis di semua prompt)
- **PETUGAS TAIWAN**: perempuan Asia Timur ±40 th, rambut sanggul rendah, kacamata persegi tipis, jas lab putih, kartu ID kosong
- **PETUGAS BPOM**: perempuan Indonesia ±35 th, jilbab polos, jas lab putih, kartu ID kosong
- **PIHAK INDOFOOD (tag ketik)**: pria Indonesia ±50 th, dahi agak botak, kacamata bulat, jas gelap

## Batch A
```
Create 10 separate images, each as its own generation (not one combined image), 2 variations each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- INSPECTOR_TW: East Asian woman about 40, black hair in a low bun, thin rectangular glasses, white lab coat over a dark blouse, blank ID card on a lanyard
- INSPECTOR_ID: Indonesian woman about 35, warm brown skin, simple plain hijab, white lab coat, blank ID card on a lanyard
- COMPANY_MAN_F: Indonesian man about 50, warm brown skin, receding hairline, round glasses, dark suit, white shirt, plain tie

1. "mi_bungkus" — aspect 4:3. FRAME 0 HERO. A generic instant-noodle pillow pack lying slightly tilted, front view, crimped sealed ends, a simple drawing of a steaming bowl of noodles on an otherwise blank wrapper, no text, no logo; the pack fills about 85% of the image width.
2. "sachet_tiga" — aspect 4:3. Three small sealed seasoning sachets fanned out: a powder sachet, a chili-oil sachet, and a soy-sauce sachet with a torn corner and one drop of dark sauce; all blank.
3. "petugas_tw_tolak" — aspect 3:4. INSPECTOR_TW, waist-up, holding a clipboard against her chest with one arm and raising the other palm forward in a firm 'rejected' gesture, serious face.
4. "petugas_id_aman" — aspect 3:4. INSPECTOR_ID, waist-up, calm smile, making an OK hand sign (thumb and index finger in a circle), other hand holding a blank document.
5. "pihak_indofood" — aspect 3:4. COMPANY_MAN_F, waist-up, holding up a blank lab-report sheet toward the viewer, calm composed face.
6. "rempah_fumigasi" — aspect 4:3. Burlap sacks of dried spices stacked on a pallet, partly covered by a large tarp, a metal gas cylinder beside them connected to the tarp by a hose (fumigation); no text.
7. "kaca_pembesar" — aspect 1:1. A hand holding a magnifying glass over a small pile of seasoning powder spilling from a torn blank sachet.
8. "kardus_kiriman" — aspect 4:3. A sealed cardboard shipping carton on a wooden pallet in a port warehouse, one flap open showing blank instant-noodle packs inside; no text, no labels.
9. "pabrik_mi" — aspect 1:1. A generic food factory with a large warehouse, silos and delivery trucks, no signs or lettering.
10. "dapur" — aspect 1:1. A simple Indonesian home kitchen corner: a two-burner gas stove with a small pot of instant noodles steaming, a bowl and a fork on the counter, a blank noodle pack beside it.
Name each result with its label above.
```

## Batch B (ingredient: petugas_tw_tolak, petugas_id_aman)
```
Create 2 separate images, each as its own generation (not one combined image), 2 variations each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- INSPECTOR_TW: East Asian woman about 40, black hair in a low bun, thin rectangular glasses, white lab coat over a dark blouse, blank ID card on a lanyard
- INSPECTOR_ID: Indonesian woman about 35, warm brown skin, simple plain hijab, white lab coat, blank ID card on a lanyard

1. "petugas_tw_tabung" — aspect 3:4. The SAME INSPECTOR_TW as in the reference image (same face, same glasses, same coat), waist-up, holding up a test tube with a little dark liquid to the light and examining it closely.
2. "petugas_id_jelaskan" — aspect 3:4. The SAME INSPECTOR_ID as in the reference image (same face, same hijab, same coat), waist-up, both palms open at her sides as if explaining that both answers are right, neutral face.
Name each result with its label above.
```

## Tidak perlu generate
- Arsip dulu (Openverse → Wikimedia): timbangan dua piring, buku hukum tebal, tabung reaksi
- Dibuat kode: cap DITOLAK TAIWAN ×3/AMAN/DITOLAK, slip NIPAGIN = zat pengawet, ETILEN OKSIDA = sisa pestisida, 0,187 mg/kg, TIDAK BOLEH TERDETEKSI, tahun 2010 · 2023 · 2025, tag TAIWAN/BPOM/INDOFOOD, meteran dua skala

## Saat memilih hasil
Buang variasi dengan huruf/logo palsu, tangan janggal, latar tidak putih. Objek frame 0 harus memenuhi ±85% lebar gambar (siap tampil ≥ 486 px di layar). Simpan 1 terbaik per nama (`<nama>.jpg`) → zip di chat atau taruh di folder Drive episode → Claude menyalin ke `kolase/ai/`.
