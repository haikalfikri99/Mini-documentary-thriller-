# Mini Thriller IDN — identitas channel
**Real Stories. Unexpected Truths.** Cerita nyata yang lebih mengejutkan daripada yang terlihat — 6 wilayah cerita (lihat skill `arsip-kasus`, rujukan 1). Perangkat seri visual: **ARSIP KASUS** (`#arsipkasus`). Terpisah dari channel Ruang Cermat. Aset dirender dari kode (`index.html` + `art.js`, bahasa gambar sama dengan film) — render ulang dari `toon/`:
```
node core/render/still.mjs ../channel 0 --q "w=800&h=800"   --size 800x800   --out ../channel   # foto profil
node core/render/still.mjs ../channel 1 --q "w=2560&h=1440" --size 2560x1440 --out ../channel   # banner
```
`assets/` = frame bersih film #001 (`?film&nocap`) untuk foto-foto arsip di banner; ganti/ tambah dengan frame film baru seiring channel tumbuh.

| File | Spesifikasi YouTube | Catatan |
|---|---|---|
| `profile_800x800.jpg` | 800×800, tampil bulat, ≤ 4 MB | map ARSIP KASUS + stempel "MT" + klip kertas (netral untuk semua wilayah); terbaca di 98 px |
| `banner_2560x1440.jpg` | 2560×1440, area aman semua perangkat 1546×423 di tengah, ≤ 6 MB | judul + "REAL STORIES. UNEXPECTED TRUTHS." + versi Indonesia di area aman; foto arsip di luar area aman (hanya terlihat di TV/desktop lebar) |

## Nama & handle
- Nama: **Mini Thriller IDN** · handle yang disarankan: **@MiniThrillerIDN** (cek ketersediaan saat mendaftar).

## Bio (deskripsi channel — siap tempel)
```
Real Stories. Unexpected Truths.
Cerita nyata yang lebih mengejutkan daripada yang terlihat.

Setiap video membuka satu ARSIP KASUS: kejadian nyata yang terdengar seperti fiksi, sistem tersembunyi yang diam-diam memengaruhi keputusanmu, misteri yang belum terpecahkan, keputusan yang berujung bencana, eksperimen sains paling gelap, dan tempat-tempat yang dilupakan sejarah.

Semua cerita berdasarkan sumber yang bisa dicek. Kami mendramatisasi cara bercerita, bukan buktinya.

📁 ARSIP KASUS baru setiap minggu.
💬 Punya kasus yang ingin dibuka? Tulis di kolom komentar.
```
Ubah baris "setiap minggu" sesuai jadwal upload yang benar-benar bisa dipegang, atau hapus bila belum pasti.

## Kata kunci channel (Settings → Channel → Keywords)
`kisah nyata, fakta unik, misteri, psikologi, sejarah, sains, bisnis, thriller, dokumenter singkat, shorts indonesia, arsip kasus, real stories`
