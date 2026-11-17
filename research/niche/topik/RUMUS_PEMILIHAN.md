# Rumus pemilihan topik/judul ARSIP KASUS (14 Nov 2026)
Dipakai sebelum shortlist dikirim ke user. Alat: `kit/tools/riset_topik.py` (autocomplete YouTube ID + yt-dlp; gratis, tanpa API key; `pip install yt-dlp requests`).
Latar: shortlist #004 pertama hanya dari bank ide → bohlam (fakta kuat, tidak relate orang Indonesia) ditolak user. Dan Indomaret–Alfamart (kandidat awal) ternyata jenuh: 4 video ≥100 rb views, 2 ≥1 jt.

## Lima sumbu (0–5 tiap sumbu, total 25)
| Sumbu | Pertanyaan | Cara mengukur (gratis) |
|---|---|---|
| **Permintaan** | Adakah orang yang mencari/mengetik ini? | Jumlah saran autocomplete YouTube ID untuk benda + awalan (kenapa/kok/alasan/rahasia/sejarah): ≥25 → 5; 15–24 → 4; 10–14 → 3; <10 → 2 |
| **Celah** | Adakah video Indonesia dengan **sudut yang sama** yang sudah ≥100 rb views? | Hitung video sesudut (bukan semua hasil) di 10–20 hasil yt-dlp: 0 → 5 (tapi harus ada bukti permintaan, mis. satu video ≥ 20 rb); 1 → 4; 2 → 3; 3–4 → 2; ≥5 → 1. Hasil "cara menghilangkan…" bukan sudut cerita: abaikan |
| **Lokal** | Benda/merek/peristiwa yang dikenal penonton Indonesia, ada sudut Indonesia? | Penilaian; **gerbang: harus ≥ 4** |
| **Cerita** | Ada dalang/tokoh, taruhan nyata (uang/kesehatan/nyawa/kehilangan), twist yang tidak tertebak? | Penilaian; gerbang ≥ 3 |
| **Bahan** | ≥ 2 sumber (idealnya dokumen primer) dan arsip gambar domain publik/CC? | Penilaian; benda modern bermerek = gambar kita sendiri, kemasan generik |

**Uji hook = uji KEMASAN (diganti 14 Nov, atas koreksi user): fakta harus benar, kemasan sebebas-bebasnya.** Sebelum finalis dikirim: (1) kumpulkan fakta yang benar; (2) tulis ≥ 8 varian hook/judul dengan alat kemasan: angka mencolok, urutan dibalik (hasil dulu), pola "kalah-menang-kalah", kutipan dokumen, kontras, pertanyaan lokal yang dekat dengan penonton, personifikasi benda; (3) pilih yang paling kuat menahan jempol dan pastikan **setiap pernyataan faktualnya benar** (cek satu per satu terhadap fact sheet). Dibolehkan: dramatisasi urutan, pilihan kata, ritme, sudut pandang, judul provokatif. Dilarang: pernyataan yang salah, bukti karangan, alasan/hasil yang tidak diketahui (aturan kebenaran lama, keputusan user). Satu pertimbangan praktis, bukan moral: tuduhan polos terhadap merek bernama bisa mengundang gugatan/klaim; beri atribusi singkat ("kata KPPU") **di kalimat sesudah hook**, bukan di hook. Gugur bila: setelah dikemas pun tidak ada hook yang kuat, atau hook terkuat bersandar pada klaim yang salah/tak diketahui.
**Rumus hook (14 Nov, koreksi user): [Benda/merek dikenal di kata 1–3] + [akibat berangka yang besar] + [sebab yang kecil/tak sebanding → "kok bisa?"].** Contoh: "Aqua didenda Rp13,8 miliar. Gara-gara warung jual air mineral merek lain." Uji **satu kali baca**: orang asing bisa merangkum "siapa, kena apa, kenapa aneh" tanpa konteks tambahan. Ringkasan alur (mis. "kalah, menang, kalah lagi") **bukan hook**, melainkan struktur tengah video. Kalimat 2 wajib menutup salah-paham dalam ≤ 3 detik (siapa sebenarnya yang bertindak).
**Gerbang (gugur bila gagal):** Lokal < 4 · Celah < 3 · Cerita < 3 · fakta inti tidak bisa diverifikasi ≥ 2 sumber.
**Ranking:** total sumbu; seri dipecah dengan Celah, lalu Bahan.

## Cara menjalankan
1. Kandidat → `kandidat.json` (id, judul, `demand` = benda untuk autocomplete, `supply` = 2 kueri YouTube).
2. `python3 kit/tools/riset_topik.py kandidat.json hasil.json` (±1 menit untuk 18 kandidat).
3. **Baca judul teratas, jangan hanya angka**: views maksimum sering dari video tak sesudut (contoh "sachet" = iklan sampo 201 jt; "bohlam" = Veritasium 25 jt berbahasa Inggris).
4. Verifikasi fakta hanya untuk judul yang dipilih user (aturan lama tetap).

## Keterbatasan (jujur)
- yt-dlp flat search tidak memberi tanggal unggah; video lama dan baru tercampur. Kurasi sebaiknya mengecek tanggal untuk finalis.
- Hasil pencarian diurutkan relevansi YouTube, bukan views; kandidat di luar 10–20 teratas tak terhitung.
- Tidak ada data kita sendiri yang membuktikan topik "belum dibahas" mengalahkan "sudah dibahas"; Celah adalah hipotesis (uji lewat data Studio #004 dst).
- Shorts vs video panjang tidak dipisah (flat search); jangan menyimpulkan "tidak ada Shorts".

**Tambahan 14 Nov:** hook dan judul mengikuti `.claude/skills/arsip-kasus/references/8-hook-dan-judul.md` (5 arketipe; judul wajib memuat angka/uang/merek; hindari "padahal/tapi/ternyata"). Uji judul: `topik/analisis_judul_v2.py`.

## v5.0 (14 Nov 2026): mesin ide tak terbatas, 5 lensa seed, rubrik 20 poin
Menyambung ke rumus di atas (lima sumbu + gerbang), bukan menggantikannya. Rumus views/celah tetap dipakai; bagian ini menambah **sumber ide yang tidak habis** dan **satu pemeriksaan validasi sebelum fact sheet**.

### Infinite 4-Pillar Topic Engine (rotasi produksi) — [DIGANTIKAN v6.0 untuk #009+: lihat "3 Mesin Psikologi Perilaku" di bagian v6.0 bawah; tabel ini tinggal log]
| Pilar | Porsi | Isi |
|---|---|---|
| 1 Merek, harga & bisnis sehari-hari | 50% | sengketa usaha (putusan KPPU), trik harga, shrinkflation, aturan ritel, kemasan, perang dagang produk warung/minimarket |
| 2 Desain ruang, aturan & sistem publik | 25% | tata letak toko/mal, rekayasa lalu lintas/ruang, kebijakan yang memicu efek kebalikan (cobra effect) |
| 3 Psikologi perilaku & bias kognitif | 15% | celah keputusan uang/waktu/risiko (Pain of Paying, Decoy Effect, Default Bias, Goal-Gradient, Bystander) **dalam wujud lokal di Indonesia** |
| 4 Misteri rasional & sejarah terlupakan | 10% | insiden/eksperimen/fakta Indonesia atau dunia yang terdengar fiksi tetapi punya arsip resmi |
**Pemetaan ke keputusan komposisi resmi** (`KEPUTUSAN_RISET.md`: pilar ±70% benda/tempat/harga/merek dikenal + selingan ±30% keputusan fatal/sejarah): pilar 1+2 (75%) ≈ pilar ±70%; pilar 3+4 (25%) ≈ selingan ±30%. Rotasi ini **hipotesis operasional**, bukan keputusan baru: bila bertentangan, `KEPUTUSAN_RISET.md` menang. Dua catatan dari data: psikologi sebagai pintu masuk lemah di riset kita (2,8% breakout vs 17,9% untuk benda/merek dikenal), jadi pilar 3 hanya lolos bila **benda/situasi Indonesia yang dikenal** menjadi subjek dan bias disebut belakangan; pilar 4 tetap menolak misteri/klenik dan kasus pidana yang masih berjalan (aturan lama).

### 5 Lensa Pembangkit Seed (isi `seeds.txt` untuk `gali_topik.py`)
Setiap kali bank ide menipis, pasangkan **benda/situasi familiar di Indonesia** dengan lima lensa:
1. **Kenapa dilarang / didenda?** → putusan resmi KPPU, BPKN, BPOM, atau MA tentang barang/merek sehari-hari.
2. **Kenapa desainnya begini?** → benda yang dilihat tiap hari (struk, kemasan, tombol lift, jalur antrean, rak minimarket, aplikasi ojol).
3. **Jebakan harga & ukuran** → varian S/M/L, bundling, biaya admin, perubahan gramasi produk warung.
4. **Efek kebalikan (backfire)** → fitur/aturan yang dibuat untuk menertibkan tetapi memperburuk perilaku.
5. **Eksperimen → kebiasaan lokal** → satu bias dari jurnal psikologi/ekonomi perilaku, cari wujud paling konkretnya di Indonesia.
Alur: `python3 kit/tools/gali_topik.py autocomplete seeds.txt out_ac.json`, `python3 kit/tools/gali_topik.py outlier queries.txt out_out.json`, lalu saring kandidat dengan `python3 kit/tools/riset_topik.py kandidat.json hasil.json`. **Prioritas lolos:** `n_saran` tinggi (permintaan nyata) dengan `n_1m == 0` atau pesaing Shorts yang dangkal/tanpa dokumen. Filter relevansi `riset_topik.py` kini mencocokkan frasa penuh atau semua kata bermakna (≥ 4 huruf) dari `demand`, jadi kandidat dua kata ("lampu merah", "kental manis") tidak terbuang (sebelumnya hanya kata pertama).

### Rubrik validasi topik 20 poin (sebelum fact sheet)
Empat kriteria, 1–5 tiap kriteria: **Kedekatan sehari-hari** · **Kontras intuisi / twist** · **Ketersediaan bukti visual kolase** · **Keamanan hukum & monetisasi**. **Lolos bila total ≥ 16/20 dan tidak ada nilai ≤ 2.** Ditulis di bagian "Validasi topik" README episode (`new_episode.sh`).
**Hubungan dengan gerbang lama (keduanya berlaku, tidak saling menggantikan):** Kedekatan sehari-hari ≈ sumbu Lokal (gerbang ≥ 4 tetap); Kontras intuisi ≈ Cerita (≥ 3); Bukti visual ≈ Bahan; Keamanan hukum adalah kriteria baru. Sumbu **Celah** (video Indonesia ≥ 100 rb views sesudut; gerbang ≥ 3) dan **Permintaan** tidak ada di rubrik 20 poin dan tetap dihitung dari `riset_topik.py`.

## v6.0 (17 Nov 2026, berlaku #009+): 3 Mesin, filter replikasi, stress-test
Menyambung (bukan menghapus) lima sumbu + rubrik 20 poin di atas. Bila bentrok, bagian ini menang untuk #009+. Komposisi dan alasan: `research/niche/KEPUTUSAN_RISET.md` v6.0-B.

### 3 Mesin Psikologi Perilaku (pengganti 4-Pillar Engine)
**Mesin 1 Behavioral Backfires ~35%** · **Mesin 2 Hidden Choice Design ~40%** · **Mesin 3 Human Anomalies ~25%**. Tiap kandidat ditulis dengan label mesin. **Aturan Jembatan Audiens:** #009–#010 = Mesin 1/2 yang berangkat dari produk, harga, atau kebiasaan belanja sehari-hari; Mesin 3 mulai #011–#012. Pintu masuk (judul/frame 0/H1) tetap benda/harga/aturan konkret, bukan nama bias (`8-hook…` §H).

### Filter Anti-Krisis Replikasi (gerbang Go/No-Go mutlak, sebelum fact sheet)
Tiap topik yang bersandar pada studi psikologi wajib punya baris "Status replikasi" di README (replikasi besar / meta-analisis / kritik utama + sumber). Tanpa baris itu = No-Go.
- **Daftar Hitam (tolak mutlak):** *Power Posing* (gagal replikasi, Ranehill 2015) · *Ego Depletion* versi cadangan-tenaga standar (Hagger 2016) · *Social/Behavioral Priming* mentah (mis. kata penuaan memperlambat jalan) · *Pen-in-Mouth Facial Feedback* · prekognisi Daryl Bem · narasi lugas *Stanford Prison Experiment* (boleh hanya bila kritik intervensi peneliti jadi inti ceritanya) · klaim kausal sederhana *Marshmallow Test* (Watts 2018).
- **5 kategori taksonomi kokoh (prioritas produksi):** (1) Arsitektur harga, risiko & ekonomi persepsi (*Prospect Theory/Loss Aversion*, *Framing*, *Anchoring*) · (2) Kalibrasi dopamin & jebakan antarmuka digital (*Reward Prediction Error*, *Default Effect* dengan nuansa framing) · (3) Otonomi, pembangkangan & resistensi persuasi (*Psychological Reactance*: tidak memakai kata pengendali ke penonton) · (4) Ilusi pengetahuan & miskonsepsi kognitif (*Information-Gap*, *Cognitive Dissonance*; pendekatan *Legitbait*: bongkar miskonsepsi dulu) · (5) Forensik sains: eksperimen populer yang runtuh (*Open Science*, *Many Labs 2*).
- Catatan jujur: daftar hitam dan taksonomi ini dari blueprint; Claude **mengecek status replikasi tiap studi terpilih ke sumber primer** (PubMed/Consensus) sebelum fact sheet, bukan memercayai daftar ini mentah.

### Topic Stress-Test (4 uji; semua lulus sebelum fact sheet)
1. **Celah informasi 33–67% + berguna** tanpa menyerang ego penonton (celah terlalu kecil = tak penasaran; terlalu besar = tak terasa bisa ditutup).
2. **Retention Anchor:** ada perubahan cara pandang (bukan rangkuman/nasihat).
3. **Vox Handle Visual Test:** menyentuh ≥ 2 dari 3 pilar (geografi · angka · waktu) + ada artefak fisik yang bisa dijadikan frame 0.
4. **Satu ide tunggal + titik balik:** bisa diringkas satu kalimat tanpa kata "dan"; ada ≥ 1 *The Turn*. Tolak topik 1-babak yang terjawab tuntas di detik ke-15.

### Aturan baru `riset_topik.py` (Feed Curiosity, bukan Search Intent)
Shorts didistribusikan lewat *feed*, bukan pencarian: #004 Aqua `n_saran` kecil tetapi 79,18% stayed. Maka: **`n_saran` kecil tidak boleh menggugurkan** mekanisme perilaku yang tajam (sumbu Permintaan hanya penanda, bukan gerbang). Pakai alat untuk **kejenuhan sesudut (`n_1m`)**: prioritas lolos = `n_1m == 0` atau pesaing sesudut dangkal/tanpa dokumen. Gerbang Lokal ≥ 4, Cerita ≥ 3, Celah ≥ 3 dan verifikasi ≥ 2 sumber tetap berlaku.
