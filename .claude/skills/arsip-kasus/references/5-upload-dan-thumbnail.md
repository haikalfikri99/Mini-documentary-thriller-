# 5. Upload dan Thumbnail

## A. Judul (≤ ~50 karakter agar tidak terpotong di ponsel) **[sebagian SUPERSEDED by v7.0: standar judul kini §F — ≤ 55 karakter (ideal 38–48), tanpa psikologi/bias/kenapa/padahal/tapi/ternyata/"?" kecuali slot uji; rumus "hook VO + taruhan" tetap sebagai ide]**
Rumus: **kalimat hook VO** + **taruhan nyata** (angka korban/skala) + emoji secukupnya + `#shorts`.
Judul harus jujur dan terbayar oleh isi (lihat standar kebenaran).
Contoh #001: **Banjir Ini Bukan Air… 21 Orang Tewas 😨 #shorts**
Alternatif untuk diuji: "Tsunami Molase Setinggi 15 Meter Menghantam Boston", "Mereka Tenggelam di Gula… Kisah Nyata 1919".

## B. Deskripsi (templat)
```
<kalimat hook>

<tanggal, tempat. 2–3 kalimat fakta inti dengan angka terverifikasi>

<twist: tanda bahaya / ironi, 1–2 kalimat>

<pertanyaan penutup VO> Tulis di kolom komentar 👇   [legacy #001–#004; deskripsi #013+ mengikuti §F: 2–3 kalimat kaya kata kunci, sumber, kredit, "tidak disponsori"]

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
| Sistem & psikologi (legacy v4.1; v7.0: hashtag mengikuti topik Mesin A/B, "psikologi" bukan pintu masuk) | `#psikologi #faktapsikologi #bisnis` |
| Misteri | `#misteri #misteribelumterpecahkan` |
| Keputusan katastrofik | `#bisnis #kesalahanfatal #sejarah` |
| Sains & eksperimen | `#sains #eksperimen` |
| Sejarah & tempat | `#sejarah #tempatmisterius #kotahantu` |

## D. Thumbnail Shorts
**Status fitur (dicek November 2026, sumber blog/vendor, verifikasi ke Help Center YouTube):** upload thumbnail kustom untuk Shorts dibuka mulai untuk kreator **YouTube Partner Program** lewat YouTube Studio desktop (Konten → ✏️ → Thumbnail → Upload), ukuran 1080×1920 (9:16); akun harus terverifikasi; Test & Compare (A/B) belum mendukung Shorts. Dukungan di aplikasi ponsel dilaporkan masih bertahap. **Kalau belum eligible:** pilih frame dari video saat upload di aplikasi — pilih frame yang paling mirip thumbnail (film #001: detik ±1,3 saat pekerja lari di depan ombak).

**Desain (ARSIP Kolase, sejak #005):** `python3 kit/tools/make_cover.py stories/<slug>/kolase` membaca `kolase/cover.json` (detik frame, 2 baris hook, tag, baris sumber, benda pemicu) → `renders/thumbnail_<slug>_1080x1920.jpg` (±450 KB) + `renders/cover_frame_<t>s.jpg` (frame cadangan dari render terbaru).
- Dasar: frame awal film (benda pahlawan + angka/stempel hook), dirender dari `film.js` **tanpa caption** (`NOCAP=1`).
- Hook 2 slip sobek besar di bawah stempel (y 1330–1600): baris 1 slip hitam, baris 2 slip merah/hijau = kata kunci/rasa penasaran (v7.0: tanpa "?", "kenapa", "tapi/padahal" di teks thumbnail, `8-hook…` §H/§J); tag merah "ARSIP KASUS #nnn" di atasnya; baris sumber kecil ("menurut putusan KPPU · 2017") di bawahnya. Teks hook **tidak boleh** mengulang judul kata per kata; ia menambah rasa penasaran, tetap benar dan beratribusi.
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
`UPLOAD.md` wajib memuat: judul (Pola sesuai kuota 3:1) · deskripsi + sumber + kredit gambar · 3 hashtag · thumbnail + frame cadangan · **komentar pin** (catatan yang meluruskan salah baca + **satu** pertanyaan; sejak v6.1 §F pertanyaannya pengalaman pribadi penonton, bukan debat benar-salah) · pengaturan (bukan untuk anak-anak, Pendidikan, Indonesia, konten sintetis **Ya**) · jadwal · catatan hukum. Komentar pin dikirim user dari akun channel setelah tayang (⋮ → Sematkan).

## F. Standar `UPLOAD_<no>_<slug>.txt` (v6.1, 18 Nov 2026, keputusan user; wajib #013+, dicek `lint_episode.py`, dirakit `pack_upload.py`)
`kit/tools/new_episode.sh` membuat kerangka `stories/<slug>/UPLOAD.md`; `pack_upload.py` menyalinnya mentah ke `upload_pack/UPLOAD_<no>_<slug>.txt` dan mencetak peringatan linter. Isi wajib:
1. **Judul Kuda Troya:** ≤ 55 karakter, tanpa kata `psikologi`, `bias`, `kenapa`, `tapi`, `padahal`, `ternyata` dan tanpa `?` (kecuali satu slot uji batch bertanda `[SLOT-UJI]`); pintu masuk = benda/harga/aturan konkret.
2. **Deskripsi:** paragraf pembuka **2–3 kalimat** kaya kata kunci alami (benda + situasi yang dicari penonton di pencarian Shorts 2026), tanpa menjual bias/psikologi, tanpa klaim yang tidak ada di fact sheet; lalu daftar **Sumber:** (primer + lokal), kredit gambar, dan "tidak disponsori".
3. **Pinned Comment:** 1 draf berupa **pertanyaan pengalaman pribadi penonton** (memakai "kamu"; berakhir "?"), untuk memicu diskusi dan memperpanjang durasi tonton latar; bukan debat benar-salah, bukan CTA subscribe. Catatan penjelas klaim boleh didahulukan satu kalimat.
4. Tag, thumbnail (+ frame cadangan), pengaturan (konten sintetis **Ya**), jadwal, dan catatan hukum seperti §"Paket upload wajib".

**v7.0 (20 Nov 2026):** judul ≤ 55 karakter, ideal 38–48, tanpa psikologi/bias/kenapa/padahal/tapi/ternyata/? (kecuali slot uji); angka ilustrasi di judul/layar diberi catatan ILUSTRASI di deskripsi dan komentar pin.

## G. Rencana lanjutan terkait upload, YPP, dan monetisasi (23 Nov 2026; riset: Strategi Kanal bab 6 G19/G18, Analisis Pasar; **semua ⚠ belum diverifikasi ke YouTube Help**)
- **Test & Compare thumbnail (rencana Fase 4, Q3 2027+, hanya long-form):** uji hingga **3 variasi** thumbnail dengan fitur Test & Compare YouTube Studio (pemenang menurut pangsa waktu tonton). **Shorts belum didukung** (§D); sampai itu tidak ada A/B thumbnail Shorts. ⚠
- **Takarir `.srt` Inggris (rencana Fase 4, long-form):** berkas takarir Inggris yang disunting rapi + adaptasi metadata agar rekomendasi menjangkau AS/Australia (RPM tinggi). Belum berlaku untuk Shorts 35–55 dtk. ⚠
- **Ambang YPP (dua versi, jangan jadi dasar uang sebelum diverifikasi):** (a) **berlaku s.d. 31 Jan 2027:** tier awal 500 subscriber + 3.000 jam atau 3 juta views Shorts/90 hari (membuka fitur seperti Shopping/fan funding); YPP penuh 1.000 subscriber + 4.000 jam atau 10 juta views/engaged views Shorts/90 hari. (b) **mulai 1 Feb 2027:** YPP penuh 8.000 jam atau 20 juta views Shorts/90 hari (tier awal tidak berubah; yang sudah YPP tidak terdampak, menurut `KEPUTUSAN_RISET.md`). ⚠ keduanya; angka "8.000 jam" dan "20 juta" bertanda tidak konsisten antar-dokumen repo. Upload thumbnail kustom Shorts (§D) juga hanya untuk kanal YPP.
- **RPM Shorts Indonesia (dua sumber, ⚠, bukan dasar uang):** ±US$0,012/1.000 views (AIR Media-Tech, via `ANALISIS_PASAR`) **dan** ±US$0,14 (Dynamoi, tidak merinci kanal, via `KEPUTUSAN_RISET.md`); selisih ±12×. Shorts = mesin akuisisi; uang ada di long-form dan Shopping Affiliate (`AGENTS.md` §2).
- **Kebijakan konten:** Inauthentic Content = 15 Jul 2025 (⚠ sumber lain: penegakan Jan 2026/Des 2025); label konten sintetis **Ya** tetap dicentang (§"Paket upload wajib").
- ⚠ **KEPUTUSAN USER TERTUNDA:** frekuensi unggah (riset: 3–4 Shorts/minggu lalu 1–5/bulan setelah long-form; repo: 1 video/hari) tidak diubah di berkas ini.
