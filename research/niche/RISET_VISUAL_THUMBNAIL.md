# Riset Visual: gaya dan frame 0 di Shorts niche "penjelasan benda sehari-hari" (13 Nov 2026)
Tujuan: berhenti merevisi gaya visual berdasarkan selera; lihat apa yang terukur. Jawaban singkat ada di bagian 0, detail di bagian 1-7.

## 0. Ringkasan (baca ini dulu)
1. **Di dalam channel yang sama, gambar thumbnail Short teratas dan terbawah TIDAK berbeda secara terukur** pada kecerahan, kontras, saturasi, warna, kepadatan tepi, luas objek menonjol, ada-tidaknya wajah, maupun teks (42 channel, 630 Short teratas vs 630 terbawah). Selisih median ±0,0-0,1 simpangan baku, tanda positif/negatif terbelah ±50:50 (mis. kecerahan: 19 channel lebih terang di atas, 23 di bawah). Dengan 42 channel, efek sebesar ≥0,2 simpangan baku seharusnya terlihat; yang tidak terlihat berarti kalaupun ada, kecil.
2. **Gaya (family) hampir konstan per channel dan tidak menjelaskan menang/kalah di dalam channel.** Yang membedakan top vs bottom di contact sheet adalah **topik/benda yang dibahas** dan, di beberapa channel, **aksi/benda besar di frame**, bukan teknik gambar.
3. **Lintas channel, tidak ada family yang jelas menang.** Family dengan channel terbesar (3D realistis, 2D kartun, presenter) semuanya punya raksasa dan channel kecil. Perbandingan ini sangat bias oleh umur/ukuran channel dan jumlah channel per family kecil (1-18). Tidak ada channel diorama/low-poly di data.
4. **Akibat untuk kita:** jangan menghabiskan putaran revisi pada kecerahan/saturasi/outline/dll. untuk "mengejar performa"; data tidak mendukung. Anggaran revisi sebaiknya pindah ke **benda yang dikenal di frame 0 + topik/judul** (bagian 6). Gaya ARSIP RIG/diorama dikunci; hal yang perlu diuji adalah kemasan (benda besar, aksi), bukan gaya.

## 1. Metode
| Langkah | Detail |
|---|---|
| Data views | `research/niche/data_shorts_per_channel.jsonl` (5.540 Short, 31 channel) + 11 channel animasi/fakta baru via `yt-dlp --flat-playlist` (SimpleHistory, Kurzgesagt, ExtraHistory, FactsVerse, TheParanormalScholar, DailyDoseOfInternet, HistofactsGeo, historichan, a2animasi, infaktamedia, AnimasiFaktaseru; nadifacts/duniafaktacilik/tanyaalamid/RS_KONTENER terlalu kecil <40 Short; historicallyshorts, BrightSide, TED-Ed dll. gagal/kosong). Total 42 channel dengan ≥40 Short (±7.000 Short). Views = snapshot hari ini dari daftar flat. |
| Sampel | per channel: 15 teratas + 15 terbawah menurut rasio (views ÷ median channel) + 15 acak dari sisanya. **1.886 thumbnail** (semua terunduh). |
| Gambar | `i.ytimg.com/vi/ID/oardefault.jpg` (vertikal, 1080x1920 atau 720x1280). **1.384 oar**; **502 jatuh ke `hqdefault` (4:3, dipotong tengah 9:16)**, terutama EconomicsExplained, ZackDFilms, businessinsider, FactTechz, kompascom, historichan, AnimasiFaktaseru. Semua metrik diulang hanya dengan oar sebagai uji ketahanan. |
| Metrik (270x480) | luma rata-rata; kontras = simpangan baku luma; saturasi HSV rata-rata; colorfulness Hasler-Süsstrunk; kepadatan tepi (Canny); luas objek menonjol = fraksi piksel saliency spectral-residual >0,5; selisih luma pusat vs tepi (proksi "satu objek di tengah"); wajah = OpenCV Haar (2 kaskade); teks = komponen tepi horizontal tertutup (proksi kasar, **tidak divalidasi**). |
| Label gaya | saya melabeli per channel dari contact sheet 6 thumbnail acak (kepercayaan di CSV). Kolom `style_confidence`. |
| Uji dalam channel | per channel: rata-rata metrik top-15 dikurangi bottom-15; lalu median lintas channel, konsistensi tanda, Wilcoxon, CI bootstrap 95%. Skrip: `research/niche/visual_scripts/`. |
Kode dan data: `data_visual_thumbs.csv` (1.886 baris), `visual_sheets/` (4 contact sheet top vs bottom, angka kuning = rasio terhadap median channel).

## 2. Batas yang harus diingat
- **oardefault/hqdefault bukan frame 0 yang dilihat penonton di feed.** Itu thumbnail otomatis/pilihan kreator, biasanya frame awal-tengah. Kesimpulan tentang "frame 0" adalah pendekatan, bukan pengukuran langsung. Ekstraksi frame per video diblokir (bot check) dan tidak dicoba ditembus.
- Views sekarang, tidak dikoreksi umur video; video lama mengumpulkan lebih banyak. Itu menambah derau pada top/bottom, bukan bias arah.
- Haar buruk pada wajah kartun/3D; angka wajah hanya valid untuk footage nyata. Proksi teks kasar.
- Top-15 dan bottom-15 per channel mudah dipengaruhi regresi ke rata-rata dan topik (judul, bukan gambar, sering penentu; lihat RISET_NICHE_V2 bagian 2).
- Banyak uji (11 metrik x beberapa subset). Satu-satunya p<0,05 (jumlah kotak teks, hanya oar: lebih sedikit di top, 10 vs 20 channel, p=0,048) tidak selamat dari koreksi Bonferroni (ambang ±0,005) dan tidak muncul di sampel penuh (p=0,35). Dianggap derau.
- Tidak ada durasi per Short (daftar flat tidak memuatnya). Kolom durasi dari tugas tidak bisa diisi; untuk durasi tiga channel lihat RISET_NICHE_V2 (Zack 28-38 dtk).

## 3. Pertanyaan 1: family gaya mana yang menang?
Deskriptif saja. n channel kecil; ukuran channel, umur, bahasa, dan topik tidak dikendalikan. "Breakout 10x" = persen Short yang ≥10x median channelnya sendiri (rata-rata antar channel).
| Family | Channel (n) | Short | Median dari median-views channel | Rentang median channel | Breakout ≥10x | ≥3x | Catatan |
|---|---|---|---|---|---|---|---|
| 3D realistis | 1 (ZackDFilms) | 200 | 10.000.000 | - | 0,0% | 6,5% | satu channel; hits 74 jt tapi median sangat tinggi sehingga 10x jarang |
| 2D kartun/ilustrasi | 6 (ExtraHistory, Kurzgesagt, Mashed, TheInfographicsShow, SimpleHistory, Psych2go) | 1.193 | 221.500 | 44.500 - 2.700.000 | 3,8% | 17,4% | median tinggi, hit besar jarang (kisah seragam, stabil) |
| Presenter + B-roll/skit | 18 | 3.267 | 149.500 | 6.300 - 10.000.000 | 3,8% | 16,4% | family terbesar; termasuk SmartNonsense (286 rb), KokBisa (219 rb), NgomonginUang (28,5 rb), WSJ |
| Motion graphic/infografik | 4 (HistofactsGeo, LogicallyAnswered, infaktamedia, FoodTheory) | 503 | 62.000 | 5.200 - 589.000 | 2,8% | 19,1% | HistofactsGeo (peta Google Earth, ID) median 113 rb |
| Footage nyata/berita/stok + teks | 11 | 1.727 | 7.500 | 580 - 12.000.000 | 7,1% | 19,1% | KamusUnik (stok + teks besar, ID): median 64.500, 14,6% breakout; kisaran sangat lebar |
| Doodle/pictogram minimal | 1 (PantesanLaku, ID) | 76 | 1.100 | - | 0,0% | 0,0% | channel kecil |
| Gambar AI | 1 (AnimasiFaktaseru, ID) | 53 | 1.000 | - | 0,0% | 0,0% | channel kecil (maks 2.900 views) |
| Diorama/low-poly 3D | 0 | - | - | - | - | - | tidak ada channel di sampel; tidak bisa dinilai |
Pembacaan jujur:
- Median tertinggi ada di 3D (satu channel) dan 2D kartun (Kurzgesagt, ExtraHistory ±2,6 jt). Ini channel besar bertahun-tahun; **bukan bukti gaya penyebab views**.
- Family yang punya hit ≥10x paling sering (7,1%) adalah footage + teks, tetapi itu karena median channelnya kecil (mudah dilampaui), bukan efek gaya.
- Channel animasi/AI Indonesia kecil (a2animasi median 1,8 rb; AnimasiFaktaseru 1,0 rb; PantesanLaku 1,1 rb; historichan 580). Channel Indonesia animasi yang besar di sampel hanya Kok Bisa (campuran presenter + 2D, 219 rb) dan HistofactsGeo (113 rb, motion graphic peta). Ini sesuai catatan awal: tidak ada contoh channel Indonesia fakta-benda yang besar dengan 3D buatan kode.

## 4. Pertanyaan 2: apa persamaan frame/thumbnail pemenang?
Pemenang = rasio ≥5x median channel (446 gambar) atau ≥10x (255 gambar), dibanding sisanya.
| Metrik | Median top-15 | Median bottom-15 | Selisih median dalam channel (CI 95%, satuan simpangan baku) | Konsistensi tanda |
|---|---|---|---|---|
| Luma rata-rata | 107,8 | 108,5 | -1,8 (-0,15 s/d +0,06) | 19 lebih terang di atas / 23 di bawah |
| Kontras (std luma) | 56,5 | 57,0 | -1,2 (-0,21 s/d +0,07) | 17 / 25 |
| Saturasi | 0,327 | 0,330 | +0,004 (-0,10 s/d +0,11) | 22 / 20 |
| Colorfulness | 47,7 | 47,5 | +1,3 (-0,15 s/d +0,17) | 22 / 20 |
| Kepadatan tepi (ramai) | 0,071 | 0,070 | 0,000 | 21 / 21 |
| Luas objek menonjol | 0,088 | 0,089 | -0,003 | 19 / 23 |
| Selisih luma pusat-tepi | 18,9 | 18,8 | +1,4 (0,00 s/d +0,17) | **27 / 15** |
| Wajah terdeteksi (persen frame) | 40,8% | 45,1% | -4,3 poin | 18 / 20 |
| Luas teks (proksi) | 0,000 | 0,000 | -0,001 | 18 / 23 |
Frame gelap (<50) 6,8% vs 7,1%; sangat terang (>180) 7,0% vs 7,0%; jenuh >0,5 14,8% vs 16,3%; ada teks besar 20,3% vs 22,5%.
Rentang 90% semua thumbnail: luma 55-157 (rata-rata 108); kontras 57; saturasi 0,33. Gambar ≥10x memiliki rata-rata luma -0,3 dan kontras -0,3 dari rata-rata channelnya (nol).
**Kesimpulan terukur:** tidak ada sifat piksel sederhana yang membedakan pemenang. Satu-satunya tanda yang condong (belum signifikan, CI menyentuh 0): **objek lebih terang/berbeda di tengah dibanding tepi** (27 vs 15 channel; di presenter 13 vs 5). Wajah tidak membantu (sedikit lebih jarang di top, 18 vs 20); luas teks tidak membantu.
Sub-family (n channel kecil, indikatif): presenter+B-roll (n=18): saliency dan kepadatan tepi sedikit lebih rendah di top (5 vs 13 channel, p=0,07), artinya frame yang lebih sederhana cenderung di atas; 2D kartun (n=6): wajah dan teks lebih jarang di top (2 dan 1 dari 6); motion graphic (n=4): kepadatan tepi dan pusat-tepi lebih tinggi di top (4 dari 4). Semua di bawah ambang signifikansi; jadikan hipotesis, bukan aturan.

## 5. Pertanyaan 3 dan contact sheet: top vs bottom dalam channel yang sama (kualitatif)
Sheet: `visual_sheets/top_vs_bottom_*.jpg` (baris atas = top, bawah = bottom; angka kuning = rasio). Pengamatan saya (penilaian, bukan pengukuran):
| Channel | Top | Bottom | Pembeda |
|---|---|---|---|
| **SmartNonsense** | benda yang dikenal besar di frame: bola baseball di tangan (33x), kipas Dyson, pisang, HP 911, label harga 5,99; judul merah besar "REAL reason/TRUTH" | fenomena abstrak/jauh: pantai bercahaya, satelit, teleskop es, gempa, Twitter, kalajengking | **benda sehari-hari yang bisa disentuh vs fenomena/fakta jauh**; gaya (green screen + judul merah) sama di keduanya |
| **ZackDFilms** (3D) | aksi tengah terjadi: menuang, paruh/daging hiu menganga, anjing digenggam, orang memegang kamera, mesin tembus pandang | karakter menghadap kamera berpose/tersenyum, close wajah statis ("what she was", "Now this makes") | **aksi/benda vs karakter diam menatap**; gaya 3D sama |
| **KokBisa** | wajah besar + benda/teks ("3000 Prajurit Zanzibar", "KULIT KENA AIR") dan stiker 2D | wajah + teks juga, tapi topik gender/maskulinitas/"14 suara binatang"/kampus | hampir tidak ada beda visual; beda di topik |
| **KamusUnik** (ID) | foto/video lokasi/budaya Indonesia dramatis + teks besar kuning, "3 ... paling ..." (ogoh-ogoh 119x, danau, desa adat) | format sama persis: makanan ekstrem, ritual, sekolah, kapal | gaya identik; beda topik (kebanggaan/mistis lokal vs makanan ekstrem) |
| **WSJ** | benda tunggal/angka: Twinkie "65 days", blueberry, mobil, wajah presenter besar | politikus/peta/wawancara/logo | **satu benda dengan angka vs orang politik**; presenter besar muncul di kedua kelompok |
| **LogicallyAnswered** | logo/benda besar tunggal di latar gelap: GoPro, Toyota, Newegg, wajah CEO (727x, 336x) | frame lebih ramai, footage + banyak teks ("How Coinbase...", "J&J cancer?") | **satu logo/benda besar mengisi frame di latar polos** vs footage ramai; konsisten dengan pusat-tepi +1,4 |
| **NgomonginUang** (ID) | teks tebal + benda/gambar (iPhone merah muda, "Rupiah sentuh 17.300", kartun Ngomo, grafik inflasi) | podcast gelap/talking head, kartu promosi produk sendiri | **benda/angka konkret + teks vs talking head/promosi** (sama dengan transkrip di RISET_NICHE_V2) |
| **TheInfographicsShow** (2D) | sama gayanya: tentara, penjara, balon peta | sama gayanya | tidak ada beda visual; beda topik/cerita |
Pola yang berulang di 6 dari 8 channel: top = **satu benda/angka/aksi konkret dikenal, besar, di tengah**; bottom = orang berbicara, fenomena jauh, layout ramai, atau promosi. Pola ini mirip hasil transkrip (RISET_NICHE_V2 bagian 2: benda yang dikenal + anggapan dibalik). Metrik piksel gagal menangkapnya karena "benda konkret" tidak sama dengan luma, saliency, atau kehadiran wajah. Ini hipotesis dari tampilan, perlu diuji (bagian 6).

## 6. Aturan visual yang bisa diuji untuk frame 0 / tampilan
Tag: **terukur** = didukung angka di atas (bisa berupa angka nol/"tidak berpengaruh"); **penilaian** = dari contact sheet/bacaan saya, belum terbukti.
| # | Aturan | Tag | Dasar | Cara uji |
|---|---|---|---|---|
| 1 | **Jangan lagi merevisi luma, kontras, saturasi atau palet demi performa.** Tidak ada efek terdeteksi dalam channel (|selisih| ≤0,15 s; tanda terbelah ±50:50). Tetapkan koridor aman di dalam p10-p90 sampel (luma 55-157, kontras ≈35-80, saturasi ≈0,1-0,6) dan berhenti. Look ARSIP yang gelap (luma 58-77) ada di dalam koridor. | terukur | bagian 4 | Tidak perlu uji; hanya cek QA otomatis frame 0 ada di koridor |
| 2 | **Kunci satu gaya per channel; tidak ada bukti gaya menyebabkan menang/kalah dalam channel.** 42/42 channel punya gaya konstan, 8 sheet top vs bottom memperlihatkan gaya sama. | terukur (konstansi) / penilaian (sebab) | bagian 3, 5 | A/B lintas bulan tidak praktis; abaikan sampai ≥30 Short |
| 3 | **Frame 0 menampilkan satu benda/angka yang dikenal, mengisi ±40-70% tinggi frame, di tengah, latar sederhana** (Dyson, Twinkie, logo GoPro, iPhone). | penilaian (kecenderungan terukur lemah: pusat-tepi +1,4, 27/42 channel, CI menyentuh 0) | SmartNonsense, WSJ, Logically, Ngomongin | Buat 2 versi frame 0 untuk topik yang sama (benda besar vs adegan lebar), tukar thumbnail setelah 48 jam, bandingkan views per jam |
| 4 | **Frame 0 = momen aksi yang sedang terjadi, bukan karakter diam menatap kamera.** | penilaian | Zack top vs bottom | A/B pose rig netral vs aksi (tangan memegang benda) |
| 5 | **Jangan paksakan wajah.** Wajah ada di 41% top vs 45% bottom (18 vs 20 channel). Boleh ada, tidak wajib. | terukur | bagian 4 | - |
| 6 | **Teks pendek di frame 0 opsional, bukan pendorong.** Jumlah/luas teks tidak beda (top 20% vs bottom 23% punya teks besar). Bila dipakai: ≤6 kata, satu pertanyaan/klaim ("The REAL reason prices end in .99"). | terukur (nol) / penilaian (≤6 kata) | bagian 4, SmartNonsense | A/B dengan/tanpa teks |
| 7 | **Hindari frame 0 yang ramai dan banyak elemen** (podcast gelap, footage + banyak caption, layout tiga panel); di presenter dan motion graphic frame sederhana cenderung di atas (5 vs 13 channel lebih padat di bottom, p=0,07). | penilaian (lemah) | bagian 4, 5 | Tandai di CSV: edge_density >p75 pada frame 0 |
| 8 | **Benda konkret > fenomena abstrak/jauh dalam pilihan topik+frame** (pisang, harga .99, Dyson, rupiah vs satelit, pantai menyala). | penilaian, searah dengan bukti judul RISET_NICHE_V2 | bagian 5 | Hitung di 20 Short pertama kita |
| 9 | **Satu aksen warna + latar bersih**; tidak ada bukti bahwa lebih jenuh/colorful menang (colorfulness +1,3; 22 vs 20 channel). Jangan menambah warna demi performa. | terukur (nol) | bagian 4 | - |
| 10 | **Frame 0 vertikal dirender dari adegan yang sama dengan Short (tanpa kartu judul layar penuh)**; thumbnail unggahan dipilih dari frame aksi terbaik, bukan frame pertama. | penilaian | batas oar/hq, keputusan kartu ARSIP sebagai overlay (data #002) | Bandingkan CTR/views thumbnail default vs pilihan |
| 11 | **Dunia 3D (diorama + karakter billboard) belum bisa dinilai**: tidak ada channel diorama di data; family 3D hanya Zack (karakter realistis, bukan diorama). Perlakukan sebagai eksperimen kita sendiri: ukur retensi 3 detik dan views relatif median channel sendiri. | penilaian | bagian 3 | Tag semua Short 3D di CSV channel sendiri; bandingkan rasio dengan Short 2D lama setelah ≥15 Short |
| 12 | **Ukur dengan rasio terhadap median channel sendiri, bukan views mentah**, dan simpan thumbnail setiap Short di `data_visual_thumbs.csv` agar uji dalam-channel ini bisa diulang pada channel kita setelah ≥30 Short. | terukur (metode) | bagian 1 | - |

## 7. Biaya produksi per family untuk solo kreator dengan kit gambar-kode (PENILAIAN saya)
Skala 1 (murah) - 5 (mahal) per Short 30-45 detik, dengan kit ARSIP (kode, tanpa AI image, tanpa stok).
| Family | Usaha | Alasan |
|---|---|---|
| Doodle/pictogram minimal (PantesanLaku) | 1-2 | bentuk dasar, tanpa karakter; mudah dikodekan, tapi sulit membedakan dari ribuan channel serupa |
| Motion graphic/infografik peta/grafik | 2 | grafik, peta, teks, mudah diprogram; tidak butuh karakter; datanya perlu akurat |
| 2D kartun/ilustrasi flat | 3 | butuh library aset dan rig karakter (sudah punya ARSIP RIG); animasi per adegan memakan waktu, tetapi dapat dipakai ulang |
| Diorama/low-poly 3D + billboard (pendekatan kita) | 3-4 | set pakai ulang dengan kamera tunggal murah per Short; investasi awal besar, bug dan render lambat |
| 3D realistis (Zack) | 5 | model, rig, lighting, animasi manusia; tidak realistis tanpa tim atau alat 3D khusus |
| Presenter/talking head + B-roll/skit | 1 untuk kreator berwajah, 5 untuk kita | tidak ada presenter di channel kita; tidak relevan untuk "kode-saja" |
| Footage nyata/berita/stok | di luar kit | melanggar aturan "tanpa stok" dan risiko inauthentic content |
| Gambar AI | di luar kit | melanggar aturan channel; dan channel AI di sampel adalah yang terkecil (maks 2,9 rb) |
Karena data tidak menunjukkan keunggulan family, **keputusan gaya sebaiknya diambil dari biaya dan konsistensi**: family termurah yang tetap memberi satu benda besar + aksi per frame (diorama/billboard atau 2D flat) cocok.

## 8. Yang tidak dijawab
- Frame 0 asli (bukan thumbnail), durasi per Short, retensi: tidak tersedia tanpa melewati bot check.
- Efek topik/judul vs gambar tidak dipisahkan (dalam contact sheet keduanya kebetulan sering sejalan).
- Channel diorama/low-poly 3D: tidak ditemukan di sampel; Ricks Clips tidak masuk karena tidak ada di data views.
- Label gaya dari satu orang (saya), 6 gambar per channel.
