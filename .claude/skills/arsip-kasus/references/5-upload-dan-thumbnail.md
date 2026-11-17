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

📁 ARSIP KASUS #<nomor> · Mini Thriller IDN: Real Stories. Unexpected Truths.

Sumber:
• <sumber 1>
• <sumber 2>

#shorts #faktaunik #kisahnyata #<wilayah> #<topik> #<tempat> #arsipkasus
```
Cantumkan hanya sumber yang benar-benar dibuka/dicek. Pertanyaan penutup = kalimat terakhir VO (memancing komentar).

## C. Hashtag
Tiga pertama tampil di atas judul: `#shorts #faktaunik #kisahnyata`, lalu hashtag wilayah + topik + tempat, dan `#arsipkasus` (tag seri, selalu).
| Wilayah | Hashtag wilayah yang disarankan |
|---|---|
| True events | `#kejadiananeh #sejarah` |
| Sistem & psikologi | `#psikologi #faktapsikologi #bisnis` |
| Misteri | `#misteri #misteribelumterpecahkan` |
| Keputusan katastrofik | `#bisnis #kesalahanfatal #sejarah` |
| Sains & eksperimen | `#sains #eksperimen` |
| Sejarah & tempat | `#sejarah #tempatmisterius #kotahantu` |

## D. Thumbnail Shorts
**Status fitur (dicek November 2026, sumber blog/vendor, verifikasi ke Help Center YouTube):** upload thumbnail kustom untuk Shorts dibuka mulai untuk kreator **YouTube Partner Program** lewat YouTube Studio desktop (Konten → ✏️ → Thumbnail → Upload), ukuran 1080×1920 (9:16); akun harus terverifikasi; Test & Compare (A/B) belum mendukung Shorts. Dukungan di aplikasi ponsel dilaporkan masih bertahap. **Kalau belum eligible:** pilih frame dari video saat upload di aplikasi — pilih frame yang paling mirip thumbnail (film #001: detik ±1,3 saat pekerja lari di depan ombak).

**Desain (ARSIP Kolase, sejak #005):** `python3 kit/tools/make_cover.py stories/<slug>/kolase` membaca `kolase/cover.json` (detik frame, 2 baris hook, tag, baris sumber, benda pemicu) → `renders/thumbnail_<slug>_1080x1920.jpg` (±450 KB) + `renders/cover_frame_<t>s.jpg` (frame cadangan dari render terbaru).
- Dasar: frame awal film (benda pahlawan + angka/stempel hook), dirender dari `film.js` **tanpa caption** (`NOCAP=1`).
- Hook 2 slip sobek besar di bawah stempel (y 1330–1600): baris 1 slip hitam, baris 2 slip merah/hijau = kata kunci/pertanyaan "kok bisa"; tag merah "ARSIP KASUS #nnn" di atasnya; baris sumber kecil ("menurut putusan KPPU · 2017") di bawahnya. Teks hook **tidak boleh** mengulang judul kata per kata; ia menambah rasa penasaran, tetap benar dan beratribusi.
- Satu benda pemicu kecil di lingkaran oranye (bendera golf, jam, koin, kaca pembesar), tidak menutup stempel.
- Jangan taruh teks penting di bawah y ±1620: rak Shorts bisa menimpa bagian bawah kartu dengan judul.
- Hasil lama #001–#002: `stories/<slug>/thumbnail/thumbnail_shorts_1080x1920.jpg` (< 2 MB).

## E. Identitas channel
Nama, bio, kata kunci, foto profil, banner: `channel/README.md` (aset dirender dari `channel/art.js`). Tambahkan frame film baru ke `channel/assets/` dan render ulang banner bila perlu.

## Sejak #003 (ARSIP Kolase)
- **Kredit gambar wajib** untuk setiap gambar CC BY (Wellcome dll.) di deskripsi: nama/ID karya + lisensi; domain publik/CC0 cukup disebut sumbernya. Ambil dari `kolase/SOURCES.jsonl`. Tambahkan satu baris kredit gaya: "Gaya visual diadaptasi dari Vintage Engraving Collage, Lemo-Opuscar oleh LemoLab".
- **3 hashtag** (`#shorts` + topik + satu umum); deskripsi/tag tidak membedakan performa, jadi jangan habiskan waktu.
- **Cover:** frame detik ±0,5 (benda pahlawan + stempel hook); `ffmpeg -ss 0.5 -i film.mp4 -frames:v 1 cover.jpg`.
- Klaim yang diperdebatkan ditulis apa adanya ("mengaku… dibantah… masih diperdebatkan").
- Contoh: `stories/micin/UPLOAD.md`.

## Paket upload wajib (v6.0, 17 Nov 2026; tersedia lokal tanpa konektor cloud)
Tiap episode menghasilkan **`stories/<slug>/upload_pack/`** (`python3 kit/tools/pack_upload.py <slug>`; di-ignore git karena berisi mp4):
1. `ARSIP_<no>_<slug>_v<N>.mp4` (versi terbaru di `renders/`).
2. `thumbnail_<slug>_1080x1920.jpg` — dari `kit/tools/make_cover.py` + `kolase/cover.json` (frame tanpa caption + 2 slip hook + tag ARSIP + baris sumber; §D di atas). Teks thumbnail tunduk Aturan Kuda Troya (`8-hook…` §H).
3. `cover_frame_<t>s.jpg` — frame cadangan bila upload thumbnail Shorts belum tersedia (non-YPP).
4. `UPLOAD_<no>_<slug>.txt` — salinan **mentah UTF-8** dari `UPLOAD.md` (judul, deskripsi + sumber + kredit, komentar pin, pengaturan). **Jangan dikonversi ke Google Doc**: emoji 4-byte (📁 👇) rusak. Di Drive unggah sebagai .txt tanpa konversi.
`UPLOAD.md` wajib memuat: judul (Pola sesuai kuota 3:1) · deskripsi + sumber + kredit gambar · 3 hashtag · thumbnail + frame cadangan · **komentar pin** (catatan yang meluruskan salah baca + **satu** pertanyaan debat) · pengaturan (bukan untuk anak-anak, Pendidikan, Indonesia, konten sintetis **Ya**) · jadwal · catatan hukum. Komentar pin dikirim user dari akun channel setelah tayang (⋮ → Sematkan).
