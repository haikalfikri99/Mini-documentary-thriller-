# Prompt Google Flow sekaligus (satu perintah, banyak gambar) — pola #004
Kirim ke user **satu blok** yang bisa disalin ke agen Flow, bukan satu per satu (user: "kasih 1 prompt aja untuk generate sekaligus").
Flow membuat gambar dengan Nano Banana Pro / Nano Banana 2 / Imagen 4; rasio 16:9, 4:3, 1:1, 3:4, 9:16; 1–4 variasi per permintaan.
Belum pasti agen Flow mau membuat banyak gambar dalam satu perintah → bilang jujur; bila hanya satu yang jadi, user mengirim ulang daftar per baris.

## Pengaturan (tabel untuk user)
Model Nano Banana Pro (cadangan Nano Banana 2) · variasi 2–4 per gambar · resolusi setinggi tersedia · rasio per gambar tertulis di prompt.

## Prompt (salin semua)
```
Create N separate images, each as its own generation (not one combined image), 1 variation each.
All N must share exactly the same style: vintage 19th-century steel engraving illustration, black ink cross-hatching and fine line shading, plain pure-white background, a single isolated subject with clean edges so it can be cut out, no text, no letters, no numbers, no logos, no brand names, no watermark, no color.

1. "<nama_file>" — aspect 3:4. <satu subjek, sudut pandang, ekspresi/aksi, detail yang dibutuhkan shot>.
2. ...
Name each result with its label above.
```
Tokoh berulang (pihak perusahaan, wasit, pemilik warung): tulis ciri yang sama persis di tiap prompt (pakaian, usia, warna kulit sawo matang untuk orang Indonesia) supaya konsisten; wajah generik.
Tangan/orang: tulis "anatomically correct hand, five fingers, the grip looks physically real".

## Tokoh konsisten antar-batch (#004)
Setelan Flow yang dipakai: Model Nano Banana (Pro bila ada), 1 hasil per prompt (sejak 15 Nov 2026; #004 masih 2), rasio Portrait 3:4 untuk orang, Square 1:1 untuk gedung/pabrik/ruangan, 4:3 untuk kendaraan.
Untuk tokoh yang sama di banyak gambar (wasit, pihak perusahaan): generate gambar pertama dulu, lalu pakai hasilnya sebagai **gambar referensi (ingredient)** di prompt berikutnya dan tulis "the SAME man/referee, same face and same clothing". Beda baju antar shot terbaca sebagai orang lain (wasit garis-garis vs polo gelap ditolak).
Aksi yang dibutuhkan: satu pose per gambar (menunjuk, angkat kartu, berjalan membawa map, lega, lemas, menolak). Hasil berwarna dicetak ulang hitam-putih di `bake.py`, tidak perlu generate ulang.
Gedung lembaga nyata: tulis gedung generik tanpa papan/teks; label dipasang di tokoh.

## Saat memilih hasil (checklist user)
Buang variasi dengan huruf/logo palsu · tangan wajar · latar putih polos · simpan 1 terbaik per nama (`<nama>.jpg`) dan kirim sebagai .zip di chat atau taruh di Drive → Claude menyalin ke `kolase/ai/`.
Revisi: bila ada gambar kurang pas, kirim **prompt revisi spesifik untuk gambar itu saja** (bukan seluruh daftar).

## Batch A/B + logika visual (batch #005–#008, 15 Nov 2026)
- Tiap episode: `stories/<slug>/kolase/flow_prompts.md` berisi tabel **kalimat VO → gambar → sumber (AI/kode/arsip/pakai ulang)** lalu prompt. Gambar hanya dibuat bila punya tempat di shot; teks, angka, cap, tag, dan grafik selalu dari kode.
- **Batch A** = objek + tokoh jangkar (★, satu pose pertama tiap tokoh). **Batch B** = pose lanjutan tokoh yang sama, dijalankan dengan hasil Batch A sebagai ingredient.
- Objek frame 0 ditulis "fills about 85% of the image width" supaya potongan tetap ≥ 486 px (45% lebar layar) setelah dipotong.
- Tempat/latar ditulis sebagai vignette yang memudar ke putih (mudah dipotong, tetap gaya cetakan).
- Lembaga yang sudah punya tokoh di seri (wasit KPPU #004) **dipakai ulang dari `stories/aqua/kolase/ai/`**, tidak di-generate ulang: penonton seri mengenali tokoh yang sama.
- Generator: daftar per episode ditulis sebagai data (nama, rasio, prompt, tokoh) lalu dicetak ke md, supaya kalimat gaya identik di keempat episode.

## Aturan wajib Google Flow sejak 15 Nov 2026 (pelajaran batch #005–#008, keputusan user)
**Rekap prompt yang gagal:**
| Episode / label | Pemicu blokir | Perbaikan yang lolos |
|---|---|---|
| #006 `ekonom`, #007 `pembeli_hp` | *false positive* filter: perempuan muda + detail pakaian/tubuh (`Indonesian woman about 23, hijab, blouse, waist-up`) | ganti tokoh pembeli/ekonom **pria dewasa** |
| #008 `petugas_tw_tolak` | tokoh perempuan + `holding a clipboard against her chest` | inspektur lab **pria Asia Timur** berjas lab putih |
| #008 `petugas_id_aman` | gestur `OK hand sign (thumb and index finger in a circle)` | `thumbs-up gesture` |
| #008 Batch B | kata ganti perempuan tertinggal setelah tokoh Batch A diganti pria; 2 tokoh dalam satu prompt; tanpa perintah ganti pose → Flow menyalin pose Batch A | 1 tokoh per chat + kata ganti sinkron + kalimat anti-jiplak pose |

**Aturan untuk semua prompt ke depan:**
1. **1 variasi saja:** tulis `Create N separate images, each as its own generation (not one combined image), 1 variation each.` Jangan pernah minta 2 variasi (kredit Flow hemat 50%, Drive tidak penuh file kembar, user tidak perlu memilih). Gambar cacat → user klik *regenerate* pada gambar itu saja.
2. **Hindari pemicu *false positive*:**
   - Tokoh metafora/inspektur/pembeli = **pria dewasa** atau *close-up* tangan. Perempuan muda dengan detail pakaian/anatomi (`woman/girl`, `hijab/blouse`, `chest`) hanya bila mutlak secara faktual.
   - Dilarang gestur `OK hand sign (thumb and index finger in a circle)`; pakai `thumbs-up`, `open palm stop`, atau `pointing finger`.
   - Dilarang kata toksik/medis berbahaya di prompt gambar (`toxic, poison, carcinogen, cancer, pesticide, contaminated, hazardous chemical`); tulis properti fisiknya netral (`glass beaker, dropper bottle, torn seasoning sachet`).
   - Setiap kali ada prompt kena blokir, **ingatkan user membuka chat baru (`+`) di Flow**: chat yang sudah kena *policy block* mengunci percobaan berikutnya.
3. **Batch B (konsistensi tokoh lewat ingredient):**
   - **1 tokoh = 1 chat baru + 1 file ingredient.** Jangan gabungkan 2 tokoh berbeda dalam satu prompt; adegan dua tokoh (duo, serah-terima) dirakit di `bake.py`/`film.js` dari dua potongan terpisah.
   - Wajib kalimat anti-jiplak: `COMPLETELY CHANGE HIS POSE AND BODY ANGLE (do NOT copy the old posture or hand gesture from the reference)`.
   - Bila tokoh Batch A diganti saat revisi, perbarui deskripsi + kata ganti tokoh itu di semua prompt Batch B pada saat yang sama.
