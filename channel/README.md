# Mini Thriller IDN — identitas channel
Seri utama: **ARSIP KASUS** (`#arsipkasus`). Aset dirender dari kode (`index.html` + `art.js`, bahasa gambar sama dengan film) — render ulang dari `toon/`:
```
node core/render/still.mjs ../channel 0 --q "w=800&h=800"   --size 800x800   --out ../channel   # foto profil
node core/render/still.mjs ../channel 1 --q "w=2560&h=1440" --size 2560x1440 --out ../channel   # banner
```
`assets/` = frame bersih film #001 (`?film&nocap`) untuk foto-foto arsip di banner; ganti/ tambah dengan frame film baru seiring channel tumbuh.

| File | Spesifikasi YouTube | Catatan |
|---|---|---|
| `profile_800x800.jpg` | 800×800, tampil bulat, ≤ 4 MB | map ARSIP KASUS + stempel "MT" + tetes amber; terbaca di 98 px |
| `banner_2560x1440.jpg` | 2560×1440, area aman semua perangkat 1546×423 di tengah, ≤ 6 MB | judul + tagline di area aman; foto arsip di luar area aman (hanya terlihat di TV/desktop lebar) |

## Nama & handle
- Nama: **Mini Thriller IDN** · handle yang disarankan: **@MiniThrillerIDN** (cek ketersediaan saat mendaftar).

## Bio (deskripsi channel — siap tempel, 457 karakter)
```
Kisah nyata. Bencana paling aneh. Dalam 60 detik.

Mini Thriller IDN membuka ARSIP KASUS: bencana, kesalahan manusia, dan misteri nyata yang terdengar mustahil, dari banjir molase yang menenggelamkan kota sampai tanda bahaya yang terlalu lama diabaikan.

Semua cerita berdasarkan sumber yang bisa dicek, digambar ulang sebagai komik bergerak bergaya thriller.

📁 ARSIP KASUS baru setiap minggu.
💬 Punya kasus yang ingin dibuka? Tulis di kolom komentar.
```
Ubah baris "setiap minggu" sesuai jadwal upload yang benar-benar bisa dipegang (konsistensi lebih penting daripada frekuensi).

## Kata kunci channel (Settings → Channel → Keywords)
`kisah nyata, sejarah, fakta unik, bencana, misteri, thriller, dokumenter singkat, shorts indonesia, arsip kasus, komik animasi`
