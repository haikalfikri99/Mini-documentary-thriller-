# ARSIP KASUS #013: Biaya layanan yang baru muncul di halaman bayar akhir (drip pricing)
**Formula ARSIP v6.1** · **Status:** FACT SHEET SELESAI (18 Nov 2026), **DISETUJUI LANJUT user 18 Nov 2026**, **NASKAH FINAL TERKUNCI USER 18 Nov 2026** (menggantikan skrip v1 Claude; tidak boleh diubah) · **Model skrip:** Opus + effort high · Fact sheet: 4 subagen Sonnet + sesi utama
[HOOK: Bukti Visual Mendahului Konteks] [ENDING: Pemicu Dunia Nyata] [SEGAR: 2026] [MODE: Investigasi] [ARTEFAK: layar checkout aplikasi generik dengan dua harga untuk barang yang sama (angka ILUSTRASI Rp50 ribu → Rp58 ribu ≈ selisih rata-rata ±15% di studi, tanpa logo)] [LOOP: dua total di layar checkout Frame 0 → dipasang untuk mengunci pilihan sebelum harga asli keluar @48] [LABEL: DATA INDONESIA + EKSPERIMEN AS]

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
- [x] Artefak Frame 0: layar checkout generik dengan dua harga (Rp50 ribu di keranjang vs Rp58 ribu di halaman bayar, ILUSTRASI); detail loop = baris "biaya layanan" kecil
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
**Judul (final, TERKUNCI user):** `Harga Awal Rp50 Ribu, Pas Checkout Jadi Rp58 Ribu` · 49 karakter (≤ 55)
Frame 0 (hero ≥ 45% lebar ≈ ≥ 486 px di y 150–1150 + hantaman stempel/label ≤ 0,25 dtk; barang bukti fisik): Layar checkout ponsel generik (tanpa logo) ≥ 486 px di y 150–1150: harga di keranjang **Rp50.000** di atas, total bayar **Rp58.000** di bawah, dilingkari merah; strip kecil **ILUSTRASI**; stempel merah "DUA HARGA" ≤ 0,25 dtk; teks layar ≤ 5 kata: **SATU BARANG, DUA HARGA**. Detail loop: baris kecil "biaya layanan" di antara dua angka, tidak disorot.
Kalimat H1 (TERKUNCI): "Layar checkout aplikasi ini ngasih dua harga buat barang yang sama." (11 kata, ±4,5 dtk estimasi; cek ulang ≤ 4,0 dtk di `vo_words.json`)

## Skrip AV 2 kolom (NASKAH FINAL TERKUNCI user, 18 Nov 2026; `1-cerita…` §M4)
Kolom audio memuat VO persis seperti `audio/script_vo.txt` (127 kata); notasi studio tidak disisipkan ke dalam kalimat agar teks terkunci tidak berubah: arahan (intonasi, `//` hening) dan SFX ditulis terpisah sebelum "VO:". Waktu = estimasi 2,58 kata/dtk; dikunci ulang dari `vo_words.json` setelah VO.
| # | Waktu (estimasi) | Visual kolase (arsip / dokumen / gerak) | Audio: VO word-for-word (TERKUNCI) + arahan + SFX |
|---|---|---|---|
| 1 | 0,0–4,5 | FRAME 0 (lihat atas). Lingkaran merah menggambar diri di dua total. | (yakin) · SFX: ketuk layar + hantaman stempel tepat 0,00 · VO: Layar checkout aplikasi ini ngasih dua harga buat barang yang sama. |
| 2 | 4,5–13,2 | Jari memasukkan barang ke keranjang (Rp50.000) → geser ke halaman bayar; baris "biaya layanan" muncul, total naik ke Rp58.000 (ILUSTRASI; ±15% = rata-rata biaya di studi). | SFX: klik "tambah ke keranjang", lalu angka berputar · VO: Pas masukin ke keranjang, harganya kelihatan murah. / Eh, pas mau bayar, muncul baris kecil bernama biaya layanan yang naikin total belanja. |
| 3 | 13,2–18,8 | Kliping YLKI (judul dibuat ulang, tanpa logo media) + strip `DATA INDONESIA · YLKI, 13 Okt 2026`. | SFX: kertas disobek · VO: Tahun ini, lembaga konsumen sampai ngingetin soal celah biaya aplikasi yang dibebanin ke pembeli. |
| 4 | 18,8–22,2 | Micro-rehook: baris "biaya layanan" diperkecil, di belakangnya pintu terbuka ke peta AS. | (merendah di "Masalahnya") · SFX: bass pendek · VO: Masalahnya, efeknya bukan cuma di biaya tambahan itu. |
| 5 | 22,2–32,6 | Stempel `EKSPERIMEN AS · situs tiket · 2015` (sumber kecil: Blake dkk., Marketing Science 2021). Layar terbelah 50:50: kiri harga+biaya sejak awal, kanan biaya baru muncul di halaman bayar. | SFX: kartu dibelah · VO: Peneliti di Amerika menguji jutaan pembeli tiket online. / Separuh dikasih lihat harga plus biaya sejak awal. / Separuh lagi baru dikasih lihat biayanya pas mau bayar. |
| 6 | 32,6–38,5 | Hening 0,6 dtk. Grafik dua batang: kanan naik "≈ +⅕ belanja"; ikon tiket kursi depan bergeser ke kanan. | `//` sebelum "Hasilnya jomplang." · SFX: satu denting piano rendah · VO: Hasilnya jomplang. / Kelompok kedua justru belanja seperlima lebih banyak dan beli tiket lebih mahal. |
| 7 | 38,5–46,2 | Harga murah awal dicap "COCOK"; biaya akhir mengecil jadi "selisih kecil" yang tergelincir dari timbangan. | SFX: timbangan berdenting · VO: Pas lihat harga murah di awal, otak kita udah terlanjur ngerasa cocok—biaya di akhir cuma dianggap selisih kecil. |
| 8 | 46,2–52,2 | CURTAIN-PULL: kembali ke layar checkout Frame 0; gembok merah mengunci tombol pilihan sebelum angka Rp58.000 menyala penuh. | (pelan, tegas) · SFX: gembok terkunci; ekor ≤ 0,15 dtk · VO: Dua total di layar checkout tadi bekerja persis begitu—ngunci pilihanmu sebelum harga aslinya keluar. |

VO bersih → `audio/script_vo.txt`; bertag ElevenLabs → `audio/vo_prompt_elevenlabs.md`.
Penutup: 5 Pemicu Dunia Nyata (layar checkout yang ditemui penonton) dengan Curtain-pull atas dua total Frame 0 @48. Ekor audio ≤ 0,15 dtk.

## Catatan lanjut
- **18 Nov 2026: naskah FINAL v2 TERKUNCI user** (koreksi user atas catatan risiko fakta: kata "sengaja/Jebakannya/melonjak" dihapus, Rp58 ribu ≈ ±15% studi, engsel ABT #013, #015 → buku menu + best seller + "ngaku lebih puas", #016 "ikut nentuin kursi"). Menggantikan skrip v1 (c17b583) dan naskah terkunci v1 (a2ff1b5).
- Konteks Perpres 27/2026 (batas 8%) sengaja tidak diucapkan agar komisi pengemudi tidak tertukar dengan biaya layanan konsumen (`7-selera` #85b); jangkar lokal cukup peringatan YLKI.
- Langkah berikut setelah user setuju: VO manual (2 take) → `vo_words.json` → cek H1 ≤ 4,0 dtk → storyboard/kolase → UPLOAD.md.
- **VO 18 Nov 2026:** `audio/raw_take1.mp3` (konektor ElevenLabs, Saos Cocol, eleven_v4, 1 take, 928 kredit, flow vsGKbn6D8HzeHFPGqz2u) → `vo_tighten.py --hold 78:0.6` → `audio/vo_biayalayanan.mp3`: akhir kata 48,0 dtk, 2,61 kata/dtk, atempo 1,062, jeda pengungkapan 0,6 dtk (disisipkan). H1 selesai 3,36 dtk (≤ 4,0 ✓), suara mulai 0,00. `vo_words.json` = align_vo pada file final. QA Whisper: "ngunci" diucap lunak: Whisper small/medium mendengar "munci", large-v3 dengan konteks ±1,8 dtk mendengar "Ngunci" → lulus, minta dengar user.
- **Gambar (fase 3, 18 Nov 2026):** `kolase/flow_prompts.md` (generator `research/batch_013_016/flow_prompts_gen.py`; instruksi sesi lokal flow-mcp `research/batch_013_016/flow_local_session_instructions.txt`). Hasil → folder Drive episode → `kolase/ai/<label>.jpg`. START shot awal dari `line_starts.py` sudah tercatat di `kolase/episode.json` (dur).
- **Gambar AI masuk (18 Nov 2026, sesi cloud):** 10/10 di `kolase/ai/` (3:4 896×1200, 1:1 1024², 4:3 1200×896). Tiga file 4:3 dari `_belum_dinamai` dicocokkan visual: scene-01 = peneliti_laptop, scene-02 = kerumunan_hp, scene-03 = stadion_kursi (Drive sudah diganti nama + dipindah ke folder episode). QA: `hp_checkout` (HERO Frame 0) cacat anatomi di versi 1 (6 jari) → **diganti v2** (dibuat user manual di Flow, dikirim lewat chat 18 Nov 2026): jempol kiri + 4 ujung jari kanan, layar kosong ✓. File `kolase/ai/hp_checkout.jpg` = v2 (v1 ada di riwayat git b15cd80). `stadion_kursi` = gedung teater bertingkat (bukan stadion); ada huruf palsu kecil di papan balkon (±370,390) → tutup/blur di bake. Lainnya bersih (tanpa teks, latar putih).
- **Lanjut setelah /compact:** fase 4 storyboard (bake.py, prints.json, film.js, storyboard.json, halaman Artifact berkomentar). Aturan #82: tanpa pita sumber di layar; frame 1 subjek + 2–4 pendukung.
- **Storyboard v1 (18 Nov 2026):** 21 shot di atas VO 48,28 dtk (kalimat panjang dipecah di batas kata: 13,58 · 27,48 · 34,70 · 39,48 · 44,98; semua shot 1,1–3,6 dtk). `kolase/bake.py` (layar checkout/keranjang/tiket buatan kode ditempel tepat di kaca HP `hp_checkout` v2: ukuran + rotasi −4,5° diukur dari cut-out dan disimpan di manifest; baris biaya + total berputar = tinta terpisah; kliping YLKI dibuat ulang tanpa nama media, kutipan persis; grafik 2 batang tanpa angka selain "+ seperlima"), `prints.json`, `SOURCES.jsonl`, `film.js`, `storyboard.json`. Lembar berlabel: `kolase/board/sheet/storyboard_013.pdf` (+ PNG per halaman + grid). **Tata letak:** panggung, close-up makro (S03, S08, S19, S21), kartu penuh (S05, S07), split-screen (S11–S13), grafik layar lebar (S14–S15); maks 3 berurutan. **[LOOP]** baris kecil "Biaya layanan Rp8.000" di Frame 0 tanpa sorotan → stabilo di kata "tadi" 43,64 dtk; gembok di tombol BAYAR 45,6 dtk. **[LABEL]** DATA INDONESIA · 2026 (S06–S07) → EKSPERIMEN AS · 2015 tepat di kata "Amerika" 20,78 dtk (S10–S16). `stadion_kursi`: huruf palsu balkon dihapus di `ai_to_raw()`. Visual QA: 0 serius, 8 peringatan (gambar besar menimpa pita caption). Review sesi utama: label 50% S11–S13 dinaikkan keluar pita caption; `juru_bicara` di-crop tanpa wajah (bahu ke bawah) agar tidak dikira pejabat YLKI asli. **Kelemahan diketahui:** layar tiket AS di HP kecil (S11–S13) terbaca sebagai batang, teksnya kecil di HP; centang hijau S03 tipis; S09 komposisi agak padat (keranjang + HP + label).
- **Uji keterbacaan storyboard v1 (18 Nov 2026, permintaan user):** teks layar HP diperbesar (baris ≥ 8,5% lebar layar, harga 17%); HP kecil memakai layar ringkas `scr_k_mini`/`scr_b_mini` (harga besar + tombol, garis polos); layar tiket AS S11–S13 kini HP besar (skala 0,72) dengan Harga $100 · Biaya $15/— · Total $115/$100 (ILUSTRASI, biaya ≈ 15% seperti studi); slip yang mengulang caption diganti (YLKI · 13 OKT, KELOMPOK 1/2 · 50%, $100 jadi $115, dekat panggung, masuk keranjang) atau dibuang (selisih kecil, harga asli); S09 tanpa HP (1 subjek + 3); centang hijau tebal `m_tick_b`; label asal dibesarkan (skala 0,72–0,78) dan tidak terpotong tepi. Visual QA: 0 serius, 10 peringatan.
