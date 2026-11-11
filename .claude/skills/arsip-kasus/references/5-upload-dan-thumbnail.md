# 5. Upload dan Thumbnail

## A. Judul (≤ ~50 karakter agar tidak terpotong di ponsel)
Rumus: **kalimat hook VO** + **taruhan nyata** (angka korban/skala) + emoji secukupnya + `#shorts`.
Judul harus jujur dan terbayar oleh isi (lihat standar kebenaran).
Contoh #001: **Banjir Ini Bukan Air… 21 Orang Tewas 😨 #shorts**
Alternatif untuk diuji: "Tsunami Molase Setinggi 15 Meter Menghantam Boston", "Mereka Tenggelam di Gula… Kisah Nyata 1919".

## B. Deskripsi (templat)
```
<kalimat hook>

<tanggal, tempat. 2–3 kalimat fakta inti dengan angka terverifikasi>

<twist: tanda bahaya / ironi, 1–2 kalimat>

<pertanyaan penutup VO> Tulis di kolom komentar 👇

📁 ARSIP KASUS #<nomor>: kisah nyata bencana paling aneh dalam sejarah.

Sumber:
• <sumber 1>
• <sumber 2>

#shorts #sejarah #faktaunik #kisahnyata #bencana #<tempat> #misteri #arsipkasus
```
Cantumkan hanya sumber yang benar-benar dibuka/dicek. Pertanyaan penutup = kalimat terakhir VO (memancing komentar).

## C. Hashtag
Tiga pertama tampil di atas judul: `#shorts #sejarah #faktaunik`; lalu `#kisahnyata #bencana #<tempat> #misteri #arsipkasus`. `#arsipkasus` dipakai konsisten di setiap video sebagai tag seri.

## D. Thumbnail Shorts
**Status fitur (dicek November 2026, sumber blog/vendor, verifikasi ke Help Center YouTube):** upload thumbnail kustom untuk Shorts dibuka mulai untuk kreator **YouTube Partner Program** lewat YouTube Studio desktop (Konten → ✏️ → Thumbnail → Upload), ukuran 1080×1920 (9:16); akun harus terverifikasi; Test & Compare (A/B) belum mendukung Shorts. Dukungan di aplikasi ponsel dilaporkan masih bertahap. **Kalau belum eligible:** pilih frame dari video saat upload di aplikasi — pilih frame yang paling mirip thumbnail (film #001: detik ±1,3 saat pekerja lari di depan ombak).

**Desain** (render dengan `?thumb` di halaman film, lihat `film.js`):
- Dasar: frame paling dramatis yang memperlihatkan **manusia + ancaman sekaligus** (bukan wajah saja: ancamannya harus terlihat).
- Teks hook 2 baris besar di sepertiga atas (baris kedua = kata kunci dalam Warna Ancaman), tag merah "ARSIP KASUS #nnn" di atasnya, tempat + tahun di bawah.
- Semua elemen penting di tengah (Shorts sering dipotong di rak/feed); kontras tinggi, terbaca di ukuran kecil.
- Hasil: `stories/<slug>/thumbnail/thumbnail_shorts_1080x1920.jpg` (< 2 MB).
