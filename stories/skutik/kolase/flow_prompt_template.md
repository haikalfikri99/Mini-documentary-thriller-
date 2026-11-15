# Prompt Google Flow sekaligus (satu perintah, banyak gambar) — pola #004
Kirim ke user **satu blok** yang bisa disalin ke agen Flow, bukan satu per satu (user: "kasih 1 prompt aja untuk generate sekaligus").
Flow membuat gambar dengan Nano Banana Pro / Nano Banana 2 / Imagen 4; rasio 16:9, 4:3, 1:1, 3:4, 9:16; 1–4 variasi per permintaan.
Belum pasti agen Flow mau membuat banyak gambar dalam satu perintah → bilang jujur; bila hanya satu yang jadi, user mengirim ulang daftar per baris.

## Pengaturan (tabel untuk user)
Model Nano Banana Pro (cadangan Nano Banana 2) · variasi 2–4 per gambar · resolusi setinggi tersedia · rasio per gambar tertulis di prompt.

## Prompt (salin semua)
```
Create N separate images, each as its own generation (not one combined image), 2 variations each.
All N must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out, no text, no letters, no numbers, no logos, no brand names, no watermark, no color.

1. "<nama_file>" — aspect 3:4. <satu subjek, sudut pandang, ekspresi/aksi, detail yang dibutuhkan shot>.
2. ...
Name each result with its label above.
```
Tokoh berulang (pihak perusahaan, wasit, pemilik warung): tulis ciri yang sama persis di tiap prompt (pakaian, usia, warna kulit sawo matang untuk orang Indonesia) supaya konsisten; wajah generik.
Tangan/orang: tulis "anatomically correct hand, five fingers, the grip looks physically real".

## Tokoh konsisten antar-batch (#004)
Setelan Flow yang dipakai: Model Nano Banana (Pro bila ada), 2 hasil per prompt, rasio Portrait 3:4 untuk orang, Square 1:1 untuk gedung/pabrik/ruangan, 4:3 untuk kendaraan.
Untuk tokoh yang sama di banyak gambar (wasit, pihak perusahaan): generate gambar pertama dulu, lalu pakai hasilnya sebagai **gambar referensi (ingredient)** di prompt berikutnya dan tulis "the SAME man/referee, same face and same clothing". Beda baju antar shot terbaca sebagai orang lain (wasit garis-garis vs polo gelap ditolak).
Aksi yang dibutuhkan: satu pose per gambar (menunjuk, angkat kartu, berjalan membawa map, lega, lemas, menolak). Hasil berwarna dicetak ulang hitam-putih di `bake.py`, tidak perlu generate ulang.
Gedung lembaga nyata: tulis gedung generik tanpa papan/teks; label dipasang di tokoh.

## Saat memilih hasil (checklist user)
Buang variasi dengan huruf/logo palsu · tangan wajar · latar putih polos · simpan 1 terbaik per nama (`<nama>.jpg`) dan kirim sebagai .zip di chat atau taruh di Drive → Claude menyalin ke `kolase/ai/`.
Revisi: bila ada gambar kurang pas, kirim **prompt revisi spesifik untuk gambar itu saja** (bukan seluruh daftar).
