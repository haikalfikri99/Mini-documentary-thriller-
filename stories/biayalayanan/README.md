# ARSIP KASUS #013: Biaya layanan yang baru muncul di halaman bayar akhir (drip pricing)
**Formula ARSIP v6.1** · **Status:** FACT SHEET SELESAI (18 Nov 2026), **DISETUJUI LANJUT user 18 Nov 2026**, SKRIP v1 DITULIS 18 Nov 2026 (menunggu review user sebelum rekam VO) · **Model skrip:** Opus + effort high · Fact sheet: 4 subagen Sonnet + sesi utama
[HOOK: Bukti Visual Mendahului Konteks] [ENDING: Pemicu Dunia Nyata] [SEGAR: 2026] [MODE: Investigasi] [ARTEFAK: struk checkout dengan dua total harga (generik, tanpa logo)] [LOOP: baris kecil "biaya layanan" di sudut struk Frame 0 → ternyata komponen yang baru dihitung di akhir @46] [LABEL: DATA INDONESIA + EKSPERIMEN AS]

## Klasifikasi (v6.1)
| Kolom | Isi |
|---|---|
| Mesin cerita | 2 Hidden Choice Design |
| Mode durasi | Investigasi (48–55 dtk, 115–135 kata) |
| Arketipe hook / penutup | K3 Bukti Visual Mendahului Konteks / 5 Pemicu Dunia Nyata |
| Pola judul | Pola 1 (benda + harga konkret; tanpa psikologi/bias/kenapa/tapi/padahal/ternyata/?) |
| Aturan #86–#88 | #86 lulus (halaman bayar) · #87 lulus (belum ada aturan harga total di checkout; bukti = eksperimen StubHub terukur) · #88 lulus (mekanisme: urutan tampilan biaya mengubah apa yang dihitung pembeli) |
| **Status replikasi** | Eksperimen lapangan acak (StubHub 2015, 2 eksperimen konsisten 2012+2015). **Replikasi independen persis: tidak ditemukan.** Bukan Daftar Hitam. Efek dari platform tiket AS; belum diuji di Indonesia |

## Kompas & Channel-Fit Gate
- [x] Bukan kuliah / bukan nasihat / bukan bantahan mitos datar (cerita: eksperimen acak + keluhan konsumen 2026)
- [x] Artefak Frame 0: struk checkout generik dengan dua total (harga di awal vs total akhir); detail loop = baris "biaya layanan" kecil
- [x] Antagonis tak kasatmata: urutan tampilan biaya (kapan angka muncul) · taruhan: uang penonton (±seperlima lebih banyak belanja)
- [x] The Turn: yang melihat total sejak awal membeli lebih sedikit dan lebih murah; yang melihat belakangan belanja lebih banyak
- [x] Penutup Pemicu Dunia Nyata (benda yang pasti ditemui hari itu: halaman bayar) tanpa nasihat

## Validasi topik (rubrik 20 poin)
| Kriteria | Skor | Alasan |
|---|---|---|
| Kedekatan sehari-hari | 5 | halaman bayar dipakai tiap belanja online/pesan-antar |
| Kontras intuisi | 4 | biaya yang lebih terlihat justru membuat orang membeli lebih sedikit |
| Bukti visual kolase | 4 | struk/halaman bayar generik buatan sendiri; dokumen Perpres/NBER |
| Keamanan hukum | 3 | aman bila tanpa nama aplikasi dan tanpa tuduhan "menyembunyikan"; Perpres belum terbaca primer |
| **Total** | **16/20** | lulus (batas 16, tidak ada ≤ 2) |
`riset_topik.py`: saran 1 · video 20 · ≥100k 3 · ≥1M 0 (sudut konsumen drip pricing tidak ditemukan; pesaing ke sisi pengemudi/potongan aplikator). **Sudut ini dibawa ke sisi konsumen.**

## Anatomi konflik non-kriminal
1. Antagonis tak kasatmata: urutan tampilan biaya (kapan angka total muncul di alur belanja).
2. Taruhan: uang (±15% biaya; kelompok yang baru melihat biaya di akhir belanja hampir 21% lebih banyak).
3. Pledge: halaman bayar biasa → Turn: eksperimen acak 50:50 → Prestige: bukan soal berapa biayanya, tapi kapan kamu melihatnya.

## Tangga bukti (rencana)
Asumsi awal: "yang penting harga akhirnya" → Jangkar lokal: biaya layanan di halaman bayar + aturan 2026 (batas 8%, kekhawatiran YLKI) → Eksperimen kontrol: StubHub acak 50:50 → Pembalikan otak: yang melihat harga akhir sejak awal membeli lebih sedikit.
**Final (skrip v1):** Asumsi awal 0–13 dtk ("yang penting angka terakhirnya") → Jangkar lokal 13–20 dtk (YLKI Okt 2026, engsel MASALAHNYA @18) → Eksperimen kontrol 20–31 dtk (StubHub acak 50:50) → Pembalikan otak 31–44 dtk (hening `//` + ANEHNYA @31: belanja ±seperlima lebih banyak, tiket lebih mahal; mekanisme patokan) → Curtain-pull @44–54.

## Uji POV penonton
1. Siapa melawan siapa? Pembeli melawan urutan tampilan harga (platform tidak dituduh).
2. Objek: struk/halaman bayar dengan dua total.
3. Taruhan: uang.
4. Alasan ASLI: bukan besarnya biaya yang menggoda belanja lebih banyak, tapi kapan biaya itu muncul.

## Fact sheet (2 lapis)
**Lapis LOKAL (Indonesia)**
| # | Klaim | Status | Sumber |
|---|---|---|---|
| L1 | Perpres 27/2026 "Pelindungan Ekosistem Transportasi Berbasis Platform Digital": batas biaya layanan aplikasi **8%** dari biaya jasa transportasi (Pasal 12), cakupan penumpang dan/atau barang/makanan; Pasal 11: transparansi biaya kepada pengemudi dan konsumen | DIBACA PENUH (liputan media; **teks resmi tidak ditemukan**) | hukumonline.com/berita/a/biaya-layanan-perpres-ojol-lt6ad8bad98b9be/ |
| L2 | InfoPublik: Perpres terbit, diumumkan 8 Okt 2026; 8% awalnya dari Kepmenhub berlaku 1 Jul 2026; perusahaan diberi 6 bulan menyesuaikan; **artikel tidak menyebut apakah 8% berlaku untuk antar makanan** | DIBACA PENUH | infopublik.id/kategori/nasional-ekonomi-bisnis/992925/perpres-272026-terbit-pengemudi-ojek-online-dapat-kepastian-hukum-dan-batas-biaya-platform-8-persen |
| L3 | **Konflik tanggal penetapan:** 30 Apr 2026 (Hukumonline), 1 Mei 2026 (cuplikan), diumumkan 8 Okt 2026 (InfoPublik) → **tanggal tidak diucapkan** | teks resmi TIDAK TERVERIFIKASI | (L1, L2) |
| L4 | YLKI, 13 Okt 2026, Rio Priambodo (Sekretaris Eksekutif): batas 8% jangan jadi dalih membebankan biaya ke konsumen; kutipan langsung: "aplikator mencari celah, dan konsumen kembali menjadi pihak yang menanggung bebannya". **Artikel tidak memuat kata "hidden fees"** (koreksi atas brief) | DIBACA PENUH (1 sumber; sumber kedua Bisnis.com 10 Okt = 403, hanya judul) | kabarbursa.com/otomotif/ylki-peringatkan-aplikator-tak-bebankan-batas-biaya-platform-delapan-persen-ke-konsumen.md |
| L5 | Komdigi (siaran pers 9 Okt 2026, ucapan Wamen Nezar Patria 8 Okt di DPR): menyiapkan permen tarif antar barang/makanan berdasar Perpres Pasal 11 ayat 4, termasuk "transparansi pembentukan harga yang dilakukan platform"; target turunan akhir Des 2026; **tidak menyebut kewajiban rincian biaya ke konsumen**. Status 14 Okt: permen belum terbit (cuplikan) | DIBACA PENUH (L5); status 14 Okt CUPLIKAN | infopublik.id/kategori/siaran-pers/993217/siaran-pers-kemkomdigi-siapkan-aturan-transparansi-harga-layanan-antar-barang-dan-makanan |
| L6 | Aplikasi belanja/pesan-antar memungut "biaya layanan/jasa aplikasi" di checkout; **besaran Rp tidak dipakai** (hanya media tanpa tanggal; dokumen bantuan resmi aplikasi tidak ditemukan) | CUPLIKAN SAJA → tidak diucapkan | mojok.co/terminal/perbandingan-biaya-transaksi-di-tokopedia-dan-shopee-pilih-mana/amp/ |
**Lapis PRIMER (mekanisme)**
| # | Klaim | Status | Sumber |
|---|---|---|---|
| P1 | Blake, Moshary, Sweeney & Tadelis, "Price Salience and Product Choice", NBER w25186 (Okt 2018) → *Marketing Science* 40(4):619–636 (2021). StubHub, mulai Agustus 2015, **beberapa juta pengguna, 10 hari**, peluang masuk kelompok perlakuan 50,11% (acak) | DIBACA PENUH (PDF NBER, pdftotext) | nber.org/system/files/working_papers/w25186/w25186.pdf |
| P2 | Kelompok "biaya di belakang" (biaya baru terlihat di checkout) **membelanjakan hampir 21% lebih banyak**; biaya rata-rata ±15% dari harga tiket; peluang transaksi **+14,1%**; efek kualitas ≥ 28% dari selisih pendapatan | DIBACA PENUH (versi kerja). **Ketidakkonsistenan internal:** teks juga memuat 19,52% (dekomposisi) dan 21,52%/21,80% → ucapkan "sekitar seperlima" bukan angka presisi; angka versi jurnal tidak diperiksa | (P1) |
| P3 | Eksperimen kedua StubHub 2012 (acak tingkat acara): hasil "broadly consistent" | DIBACA PENUH | (P1) |
| P4 | Versi jurnal: abstrak Marketing Science 40(4), doi:10.1287/mksc.2020.1261 (kuantitas dan kualitas turun saat biaya di depan; kualitas ≥ 28%); angka 21/15/14,1 tidak ada di abstrak | ABSTRAK DIBACA | econpapers.repec.org/RePEc:inm:ormksc:v:40:y:2021:i:4:p:619-636 |
| P5 | Pendukung: Santana, Dallas & Morwitz 2020 *Marketing Science* 39(1):188–210 (enam studi, biaya opsional dicicil); Brown, Hossain & Morgan 2010 *QJE* 125(2) (eBay) | ABSTRAK / CUPLIKAN; ukuran efek tidak terverifikasi | econpapers.repec.org (…v:39:y:2020:i:1:p:188-210; …v:125:y:2010:i:2:p:859-876) |
**Mekanisme perilaku (#88):** kelompok yang melihat total sejak awal membeli lebih sedikit dan memilih tiket lebih murah (kuantitas dan kualitas turun), sedangkan kelompok yang baru melihat biaya di akhir punya peluang transaksi +14,1% dan membelanjakan hampir seperlima lebih banyak (Blake dkk.; versi kerja NBER DIBACA PENUH). Tafsiran: biaya yang muncul belakangan tidak ikut dihitung saat membandingkan.
**Tidak diketahui (tidak boleh diucapkan):** besaran biaya layanan aplikasi mana pun; apakah aplikasi Indonesia melakukan drip pricing; apakah batas 8% berlaku untuk antar makanan atau menaikkan biaya konsumen; tanggal tanda tangan Perpres; isi/terbit-tidaknya permen Komdigi; angka persis versi jurnal.
**Yang TIDAK BOLEH DIUCAPKAN:** menyamakan **komisi platform ke pengemudi (batas 8%)** dengan **biaya layanan yang dibayar konsumen** (dua hal berbeda; kekhawatiran YLKI = pengalihan beban); "Perpres melarang biaya tersembunyi / mewajibkan harga total di checkout"; "YLKI menyebut hidden fees"; "21% lebih banyak" tanpa konteks "StubHub 2015, tiket, AS"; nama aplikasi mana pun sebagai pelaku.
**Frame 0 / gambar:** tidak ada arsip berlisensi yang dicek; struk checkout generik buatan sendiri (angka ilustrasi, tanpa logo); `[LABEL]` memisahkan DATA INDONESIA (Perpres/YLKI) dari EKSPERIMEN AS (StubHub).

## Celah & batas hukum
Atribusi pendek sekali di klaim sensitif (YLKI/Perpres); tahun 2026 di layar; "tidak disponsori"; tanpa logo; frasa "desain tampilan harga" (bukan "jebakan"/"menyembunyikan").

## Judul & penguncian 3-titik (0,0–4,0 dtk) — Aturan Kuda Troya (tanpa psikologi/bias/kenapa/padahal/tapi/ternyata/? di judul dan frame 0, kecuali slot uji)
**Judul (final usul):** `Dua Total Harga untuk Belanjaan yang Sama` · 41 karakter (≤ 55)
Frame 0 (hero ≥ 45% lebar ≈ ≥ 486 px di y 150–1150 + hantaman stempel/label ≤ 0,25 dtk; barang bukti fisik, bukan kartun orang berpikir): Struk checkout generik buatan sendiri (angka ilustrasi, tanpa logo) selebar ≥ 486 px di y 150–1150, dua baris TOTAL dilingkari merah; stempel merah "DUA TOTAL" menghantam ≤ 0,25 dtk; teks layar ≤ 5 kata: **DUA TOTAL, SATU BELANJAAN**. Detail loop: baris kecil "biaya layanan" di sudut bawah struk, tidak disorot.
Kalimat H1 (selesai ≤ 4,0 dtk, ≤ 14 kata, kata tunjuk visual bila merujuk objek di layar): "Struk ini mencetak dua total untuk belanjaan yang sama." (9 kata, ±3,7 dtk; kata tunjuk "ini" → struk di layar; tanpa "tapi")

## Skrip AV 2 kolom (final v1, 18 Nov 2026; `1-cerita…` §M4)
Tempo VO 2,50–2,66 kata/dtk, atempo ≤ 1,10. Notasi: `/` jeda ≈ 0,25 dtk · `//` hening ≈ 0,6 dtk · `KAPITAL` penekanan (satu per video) · `[perlambat: teks]` · `(intonasi)`. Waktu = estimasi 2,58 kata/dtk; dikunci ulang dari `vo_words.json` setelah VO.
| # | Waktu (estimasi) | Visual kolase (arsip / dokumen / gerak) | Audio: VO word-for-word + notasi + SFX |
|---|---|---|---|
| 1 | 0,0–3,7 | FRAME 0 (lihat atas). Struk bergetar halus saat stempel jatuh; lingkaran merah menggambar diri di dua TOTAL. | (yakin, datar) Struk ini mencetak DUA total / untuk belanjaan yang sama. · SFX: dengung printer struk + hantaman stempel tepat 0,00 |
| 2 | 3,7–13,0 | Ponsel generik: halaman produk (total 1 menyala) → geser ke halaman bayar (total 2 menyala). Strip "ASUMSI AWAL". | Total pertama muncul saat kamu memilih barang. / Total kedua baru muncul di halaman bayar. / Wajar kalo kamu mikir: yang penting angka terakhirnya. · SFX: ketuk layar ×2 |
| 3 | 13,0–20,5 | Kliping berita YLKI (judul dibuat ulang, tanpa logo media) + strip `DATA INDONESIA · YLKI, 13 Okt 2026`. Micro-rehook: kliping tersibak, timbangan kosong muncul. | Tahun ini, lembaga konsumen memperingatkan biaya aplikasi yang dibebankan ke pembeli. / (merendah) Masalahnya, besar biaya cuma separuh cerita. · SFX: kertas disobek |
| 4 | 20,5–30,9 | Stempel `EKSPERIMEN AS · situs tiket · 2015` (sumber kecil: Blake dkk., Marketing Science 2021). Layar terbelah 50:50: kiri harga+biaya sejak awal, kanan harga polos lalu biaya muncul di halaman bayar. | Di Amerika, sebuah situs tiket membagi jutaan pembelinya secara acak. / Separuh melihat harga plus biaya sejak awal. / Separuh lagi baru melihat biayanya di halaman bayar. · SFX: kartu dibelah |
| 5 | 30,9–36,9 | Hening 0,6 dtk (layar diam). Grafik batang dua kolom: kanan naik "≈ +⅕ belanja"; tiket kursi lebih depan tergeser ke kolom kanan. | // [perlambat: Anehnya, kelompok kedua belanja sekitar seperlima lebih banyak.] / Tiket pilihan mereka pun lebih mahal. · SFX: satu denting piano rendah |
| 6 | 36,9–43,6 | Harga pertama dicap "PATOKAN"; biaya yang datang belakangan jatuh di luar piring timbangan. | Harga pertama yang kamu lihat jadi patokan. / Biaya yang datang belakangan nggak ikut masuk hitungan itu. · SFX: timbangan berdenting |
| 7 | 43,6–54,0 | CURTAIN-PULL: kembali ke struk Frame 0, zoom ke baris kecil "biaya layanan" (stempel merah melingkarinya) → halaman bayar ponsel generik dengan baris sama → jam pasir kecil di samping baris. | Nama baris kecil di struk tadi: biaya layanan. / Baris itu juga ada di halaman bayar yang kamu buka hari ini. / (pelan, tegas) Pengaruhnya ada pada kapan dia muncul. · SFX: detak jam berhenti; ekor ≤ 0,15 dtk |

VO bersih (tanpa notasi) → `audio/script_vo.txt` (129 kata); bertag ElevenLabs → `audio/vo_prompt_elevenlabs.md`.
Penutup: 5 Pemicu Dunia Nyata: baris "biaya layanan" di halaman bayar yang penonton buka hari ini, diucapkan sebagai fakta, tanpa nasihat. Loop @44: detail Frame 0 (baris kecil) diberi nama dan makna (waktu kemunculan). Ekor audio ≤ 0,15 dtk.

## Scorecard v6.0 (16 cek §F6 + cek 17–22 `1-cerita…` §M6 + gerbang H1–H7/R1–R6)
| Cek | Hasil |
|---|---|
| 1 Konfirmasi judul | ✓ judul "Dua Total Harga…" = H1 "dua total" |
| 2 Celah | ✓ dua total untuk belanja yang sama: kenapa beda? (≤ 3 dtk, tanpa diucapkan sebagai tanya) |
| 3 Jawaban | ✓ @37–44: patokan harga pertama; @50 kapan biaya muncul |
| 4 Mekanisme | ✓ desain (urutan tampilan) + psikologi (patokan) + uang (±⅕) |
| 5 Tapi/maka | ✓ MASALAHNYA, ANEHNYA |
| 6 Uji hapus | ✓ tiap beat membawa satu anak tangga |
| 7 Satu tokoh | ✓ struk/halaman bayar |
| 8 Twist | ✓ @31 (±58%) sedikit lebih awal dari 65–75%; dipertahankan karena tangga Investigasi butuh 4 anak tangga |
| 9 Akhir | ✓ Pemicu Dunia Nyata + Curtain-pull, zero-CTA |
| 10 Faktual | ✓ "sekitar seperlima" (versi kerja NBER 19,5–21,8%), "jutaan", "separuh", tiket lebih mahal (efek kualitas); YLKI = kekhawatiran beban ke konsumen; 8%/Perpres TIDAK diucapkan |
| 11 Bahasa | ✓ "nggak", "kalo"; tanpa "bukan X tapi Y" |
| 12 Durasi | ✓ 129 kata (Investigasi 115–135); estimasi 52–54 dtk |
| 13 Bisu / 15 POV | ✓ tiap kalimat punya objek; "hitungan itu" merujuk patokan di kalimat sebelumnya |
| 14 Visual | ✓ semua benda buatan sendiri |
| 16 Kemasan aman | ✓ tanpa nama aplikasi Indonesia; situs tiket AS tanpa nama di VO; tahun di layar |
| 17 Replikasi | ✓ baris status replikasi ada; bukan Daftar Hitam |
| 18 Kuda Troya | ✓ judul + frame 0 + H1 bersih |
| 19 ABT | ✓ tanpa transisi daftar |
| 20 Zero-Citation | ✓ "lembaga konsumen" (peran), sitasi hanya di layar |
| 21 Anti-Exit | ✓ kalimat akhir "Pengaruhnya…", paragraf akhir "Nama…"; 1 kontras angka (±⅕) |
| 22 AV 2 kolom | ✓ 7 ketukan; `line_starts.py` dijalankan setelah VO |
| H1–H7 | H1 ±3,7 dtk (cek ulang di `vo_words.json`) · H2 "Struk" kata 1 · H3 tanpa jeda · H4 stempel ≤ 0,25 dtk · H5 4 kata layar · H6 printer+stempel 0,00 · H7 tanpa tanggal/nama |
| R1–R6 | R1 loop terbuka berantai (dua total → separuh cerita → hasil → nama baris) · R3 rehook @18 dan @31 · R4 Curtain-pull · R5 ±53 dtk |
Linter: `python3 kit/tools/lint_episode.py --batch biayalayanan ongkir terlaris zonasi` → lihat Catatan lanjut.

## Catatan lanjut
- Skrip v1 ditulis 18 Nov 2026 (sesi Opus); menunggu review user sebelum rekam ElevenLabs.
- Konteks Perpres 27/2026 (batas 8%) sengaja tidak diucapkan agar komisi pengemudi tidak tertukar dengan biaya layanan konsumen (`7-selera` #85b); jangkar lokal cukup peringatan YLKI.
- Langkah berikut setelah user setuju: VO manual (2 take) → `vo_words.json` → cek H1 ≤ 4,0 dtk → storyboard/kolase → UPLOAD.md.
- Linter 18 Nov 2026 (`lint_episode.py --batch biayalayanan ongkir terlaris zonasi`): **0 error**, batch ok (hook/penutup/mode selang-seling, kesegaran, nol pola "—tapi"); 1 peringatan = `UPLOAD.md` masih kerangka (hanya judul yang diisi). Audit manual: nol pembuka terlarang di semua klausa, nol "tapi", nol kata Kuda Troya di VO, nol "bukan X tapi Y".
