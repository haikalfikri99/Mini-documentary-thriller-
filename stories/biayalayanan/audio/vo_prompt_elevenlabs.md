# VO ARSIP KASUS #013 biayalayanan — ElevenLabs (Saos Cocol R86jddkroI9bJwXFfjsr, eleven_v4; dibuat MANUAL oleh user di web, 2 take)
Teks bersih (untuk alignment/QA Whisper dan caption): `script_vo.txt` — jangan diubah untuk perbaikan lafal; perbaikan lafal hanya di prompt.
Tag hanya di titik perubahan nada; `[pause]` = hening ±0,5–0,6 dtk sebelum pengungkapan (dipertahankan di `vo_tighten.py`). Ekor akhir ≤ 0,15 dtk (`vo_chain.py`). Target durasi take mentah: Mode Investigasi 48–55 dtk (estimasi 52–54 dtk); bila lebih, `atempo` ≤ 1,10.
Pelafalan: "Rp" tidak ada; "seperlima" diucap utuh; cek "ojol" tidak ada; tanpa ejaan fonetik di take 1.

## Prompt (salin apa adanya ke ElevenLabs)
[curious] Struk ini mencetak dua total untuk belanjaan yang sama.
[warmly] Total pertama muncul saat kamu memilih barang. Total kedua baru muncul di halaman bayar. Wajar kalo kamu mikir: yang penting angka terakhirnya.
[serious] Tahun ini, lembaga konsumen memperingatkan biaya aplikasi yang dibebankan ke pembeli. [mysteriously] Masalahnya, besar biaya cuma separuh cerita.
[curious] Di Amerika, sebuah situs tiket membagi jutaan pembelinya secara acak. Separuh melihat harga plus biaya sejak awal. Separuh lagi baru melihat biayanya di halaman bayar.
[pause] [slowly] Anehnya, kelompok kedua belanja sekitar seperlima lebih banyak. Tiket pilihan mereka pun lebih mahal.
[serious] Harga pertama yang kamu lihat jadi patokan. Biaya yang datang belakangan nggak ikut masuk hitungan itu.
[warmly] Nama baris kecil di struk tadi: biaya layanan. Baris itu juga ada di halaman bayar yang kamu buka hari ini. Pengaruhnya ada pada kapan dia muncul.
