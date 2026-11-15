# Prompt Google Flow — #006 Macet Sudirman Hampir 2x Lipat Gara-Gara 3-in-1 Dihapus

Setelan: model **Nano Banana Pro** (cadangan Nano Banana 2) · **2 variasi** per gambar · resolusi tertinggi · rasio sesuai tiap baris (3:4 orang/benda tegak, 4:3 kendaraan/benda melebar, 1:1 tempat/close-up).
Urutan: **Batch A dulu** (memuat tokoh jangkar ★). Pilih hasil terbaik tiap tokoh ★, pasang sebagai **ingredient/gambar referensi**, baru jalankan **Batch B**.
Bila agen Flow hanya membuat satu gambar per perintah, kirim ulang per baris (bagian *Style* tetap disalin di depan).

## Logika visual (kalimat VO → gambar)
| Kalimat VO | Gambar | Sumber |
|---|---|---|
| Aturan three in one Jakarta dihapus (frame 0) | rambu besar, tulisan 3 IN 1 dicetak kode, cap merah DIHAPUS menghantam | AI + kode |
| Sore hari… Sudirman hampir dua kali lebih lambat. Kok bisa? | sudirman (avenue macet di antara gedung) + jam SORE + label 2,8 → 5,3 | AI + kode |
| mobil… wajib isi minimal tiga orang | mobil_tiga: tiga orang terlihat di jendela, tag WAJIB 3 ORANG | AI |
| Yang nyetir sendirian, tinggal sewa joki di pinggir jalan | pengemudi_sendirian → joki mengacungkan satu jari di pinggir jalan (dewasa saja) | AI |
| Joki malah jadi masalah, jadi pemerintah menghapusnya | petugas_cabut menurunkan rambu; cap 2016: DIHAPUS | AI |
| Ekonom Harvard dan MIT memantau… lewat Google Maps | ekonom: dua peneliti di depan laptop berpeta (tanpa logo) | AI |
| 1 km: 2,8 menit… jadi 5,3 menit | batang data gravir + stopwatch arsip | kode + arsip |
| jalanan di luar jalur… ikut macet | jalan_samping macet (visual beda dari Sudirman) | AI |
| nyetir sendirian gratis lagi… bawa mobil sendiri | mobil_sendiri: deretan mobil, tiap mobil cuma 1 orang | AI |
| Joki bikin aturan ini percuma? Nggak. | joki + tanda ? → cap NGGAK | AI (sama) + kode |
| ongkos sewa joki udah cukup buat nahan orang bawa mobil | bayar_joki: pengemudi menyerahkan uang lewat jendela | AI |
| macet parah di Sudirman kayak gini… ditahan aturan yang kita anggap percuma | loop ke frame 0: Sudirman + rambu 3 IN 1 kembali berdiri | AI + kode |

## Tokoh berulang (ciri sama persis di semua prompt)
- **JOKI**: pria Indonesia ±35 th, kaus polos gelap, jeans lusuh, sandal; selalu dewasa, tanpa anak/bayi (sensitif)
- **PENGEMUDI**: pria Indonesia ±40 th, kemeja kantor putih lengan panjang, tanpa dasi

## Batch A
```
Create 9 separate images, each as its own generation (not one combined image), 2 variations each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- JOCKEY: Indonesian man about 35, warm brown skin, short black hair, plain dark T-shirt, worn jeans, sandals (adult only, never with a child)
- DRIVER: Indonesian man about 40, warm brown skin, neat short black hair, white long-sleeved office shirt, no tie

1. "rambu" — aspect 3:4. FRAME 0 HERO. A large horizontal rectangular road sign with a thick dark border mounted on one metal pole, front view, the sign face completely blank white; the sign panel fills about 85% of the image width.
2. "sudirman" — aspect 3:4. A wide multi-lane city avenue seen from slightly above, receding into the distance between modern glass skyscrapers, packed bumper to bumper with cars, late-afternoon long shadows; no signs, no billboards, no lettering.
3. "mobil_tiga" — aspect 4:3. A generic modern sedan in side view with windows down, three adults clearly visible inside (driver and two passengers); no logo, no license plate characters.
4. "pengemudi_sendirian" — aspect 4:3. DRIVER alone at the wheel of a sedan, seen through the open side window, both hands on the steering wheel, the passenger seats clearly empty.
5. "joki" — aspect 3:4. JOCKEY standing on a curb at the roadside, full body, raising one index finger high toward passing cars, plain neutral face.
6. "petugas_cabut" — aspect 3:4. An Indonesian road worker in a plain work shirt and cap, standing on a short ladder, unscrewing and lifting a blank rectangular road sign off its pole.
7. "ekonom" — aspect 4:3. Two economists (a man and a woman, generic faces, plain business-casual clothes) sitting at a desk and leaning toward one laptop whose screen shows a simple street map with route lines; one points at the screen; no text, no logos.
8. "jalan_samping" — aspect 1:1. A narrow side street of an Indonesian city neighbourhood lined with two-storey shophouses, jammed with cars and motorcycles; no signs or lettering.
9. "mobil_sendiri" — aspect 4:3. A long line of cars in traffic seen from the side at a slight angle, each car with only ONE person inside (the driver), the passenger seats clearly empty.
Name each result with its label above.
```

## Batch B (ingredient: joki, pengemudi_sendirian)
```
Create 1 separate images, each as its own generation (not one combined image), 2 variations each.
All images must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out (no floor line, no cast shadow, no border or frame, white margin all around; a place or scene is drawn as a vignette whose edges fade into the white background), no text, no letters, no numbers, no logos, no brand names, no emblems, no watermark, no color. People: generic faces (not real or famous people), anatomically correct hands with five fingers, a grip that looks physically real.
Recurring characters, always drawn exactly like this:
- JOCKEY: Indonesian man about 35, warm brown skin, short black hair, plain dark T-shirt, worn jeans, sandals (adult only, never with a child)
- DRIVER: Indonesian man about 40, warm brown skin, neat short black hair, white long-sleeved office shirt, no tie

1. "bayar_joki" — aspect 4:3. The SAME JOCKEY and the SAME DRIVER as in the reference images: the jockey leans toward the open window of a sedan while the driver inside hands him a few folded plain banknotes (no numbers); both faces visible, heads a similar size.
Name each result with its label above.
```

## Tidak perlu generate
- Stopwatch / jam: cari arsip dulu (Openverse → Wikimedia), jam SORE bisa digambar kode
- Dibuat kode: tulisan 3 IN 1 di rambu, cap DIHAPUS/NGGAK, jam SORE, batang data 2,8 → 5,3 menit/km, tag WAJIB 3 ORANG, Ekonom Harvard & MIT, jurnal Science 2017, teks kecil 'belum tentu berlaku di kota lain'

## Saat memilih hasil
Buang variasi dengan huruf/logo palsu, tangan janggal, latar tidak putih. Objek frame 0 harus memenuhi ±85% lebar gambar (siap tampil ≥ 486 px di layar). Simpan 1 terbaik per nama (`<nama>.jpg`) → zip di chat atau taruh di folder Drive episode → Claude menyalin ke `kolase/ai/`.
