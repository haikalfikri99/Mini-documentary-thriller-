# Riset gaya visual Shorts storytelling ANIMASI (13 Nov 2026)
Pertanyaan: gaya animasi mana yang berkinerja baik untuk Shorts penjelasan/cerita, apakah tokoh/maskot berulang membantu, apa kata penonton soal animasi, seberapa sering channel animasi sukses mengunggah, dan bagaimana lanskap Indonesia. **Dokumen ini hanya menyajikan bukti dan opsi; keputusan gaya tidak dibuat di sini.**
Label: **[terukur]** = angka dari data; **[penilaian]** = tafsir saya.

## 0. Ringkasan
1. **[terukur] Tidak ada family animasi yang menang jelas.** Family 2D kartun (6 channel ≥40 Short): median-dari-median 138 rb views, rata-rata 15% Short ≥3× median channel. Motion graphic datar (4 channel): 195 rb, 20%. 3D realistis (hanya Zack): 10 jt, 6,5%. Selisih antar family lebih kecil daripada selisih antar channel di dalam satu family (mis. 2D kartun: ExtraHistory 2,6 jt vs guepunyacerita 30 rb). Konsisten dengan temuan sebelumnya (`RISET_VISUAL_THUMBNAIL.md`).
2. **[terukur] Maskot/host animasi berulang tidak berkorelasi jelas dengan performa maupun komentar per view.** n sangat kecil (3 channel "ya" yang ketat), semua confound (bagian 3).
3. **[terukur] Di komentar teratas, penonton jarang membahas animasi.** 25 dari 390 komentar (6,4%) menyebut visual/karakter; hanya 4 (1%) memuji kualitas animasi/seni itu sendiri; 1 negatif (soal orisinalitas). Yang dibahas: isi/kejadian, kutipan naskah, lelucon, cerita pribadi, koreksi fakta.
4. **[terukur] Frekuensi harian animasi jarang.** Dari 12 channel animasi yang bisa diukur (60 hari terakhir), hanya 2 yang ≥1 Short/hari: ZackDFilms (±34/minggu, 3D) dan Gue Punya Cerita (±7,8/minggu, 2D, kisah pribadi). Channel animasi kualitas tertinggi (ExtraHistory, Kurzgesagt) ±1/minggu atau kurang. 8 channel animasi (termasuk The Infographics Show, RealLifeLore, TED-Ed) **tidak mengunggah satu Short pun dalam 60 hari**.
5. **[terukur] Lanskap Indonesia tipis.** Channel animasi Indonesia dengan median ≥100 rb: Kok Bisa (219 rb, 0,9 Short/minggu, presenter nyata + insert 2D), HistofactsGeo (113 rb, 5/minggu, peta Google Earth bukan karakter). Sisanya <65 rb atau dorman.

## 1. Metode dan data
| Langkah | Detail |
|---|---|
| Daftar Short | `yt-dlp --flat-playlist` (maks 200 terbaru, views = snapshot 13 Nov 2026) untuk 20 handle; digabung dengan `data_shorts_per_channel.jsonl` dan `data_selingan_channels.jsonl`. Handle gagal/kosong: historicallyshorts, Sciencephile, BrightSide, OverSimplified, Bedtime_Stories, AnimatedWorld, TheFactsTV (0 hasil); Historically (2), AlternateHistoryHub (2) terlalu sedikit. |
| Tanggal unggah | Daftar flat yt-dlp **tidak** memuat tanggal. Dipakai Apify `johnvc/youtube-shorts-api` (filter 60 hari, maks 30 Short per channel; laju dihitung dari rentang tanggal 30 Short terbaru bila batas tercapai, selain itu jumlah÷60 hari). Sekaligus memberi jumlah komentar per Short. Zack tidak dijalankan penuh (5/hari terlihat dari 31 Short pertama, 6–12 Nov). |
| Label gaya | Contact sheet 4 lembar (`visual_sheets/story_1..4.jpg`, 6 thumbnail teratas × 16 channel), dilihat dengan mata; digabung dengan label yang sudah ada di `data_visual_thumbs.csv`. Urutan baris: story_1 = guepunyacerita, GromoreStudio, TED-Ed, RealLifeLore; story_2 = Mashed, a2animasi, historichan, HistofactsGeo; story_3 = infaktamedia, ExtraHistory, SimpleHistory, Kurzgesagt; story_4 = TheInfographicsShow, Psych2go, KokBisa, ZackDFilms. |
| Komentar | Apify `streamers/youtube-comments-scraper`, 13 Short terpopuler dari 13 channel animasi, 30 komentar TOP per Short (390 komentar, termasuk balasan). Saya hitung dan klasifikasi manual. |
| Biaya Apify | Perkiraan total di bawah US$1 (batas yang disetel: 0,6 + 0,3×3 + 0,8; satu run awal dibatalkan setelah 2 menit). |
Metrik per channel: median views, **share ≥10× median**, **share ≥3× median** (ditambahkan karena ≥10× tak berarti untuk channel raksasa yang stabil), persentil 25, Short/minggu. Data mentah: `data_storytelling_channels.jsonl`.

## 2. Q1: performa per family
Hanya channel dengan ≥40 Short dimasukkan ke baris family (kolom median-dari-median).
| Family | Channel (n Short) | n channel | Median-dari-median (views) | Rata-rata share ≥10× | Rata-rata share ≥3× | Short/minggu (60 hr) |
|---|---|---|---|---|---|---|
| 3D realistis | ZackDFilms (200) | 1 | 10.000.000 | 0% (batas: median sudah 10 jt, maks 7,4×) | 6,5% | ±34 |
| 2D kartun berkarakter | TheInfographicsShow (200), SimpleHistory (250), ExtraHistory (200), Mashed (200), guepunyacerita (200), Psych2go (250) | 6 | 138.250 | 4,0% | 15,0% | 0 / 5,0 / 1,1 / 3,4 / 7,8 / 0,1 |
| Motion graphic datar / infografik / peta | Kurzgesagt (143), HistofactsGeo (98), RealLifeLore (62), infaktamedia (200, campur footage) | 4 | 195.250 | 2,8% | 20,4% | 0,7 / 5,0 / 0 / 0 |
| Presenter + insert 2D | KokBisa (200) | 1 | 219.000 | 2,5% | 21,5% | 0,9 |
| Doodle/pictogram | PantesanLaku (76) | 1 | 1.100 | 0% | 0% | tidak diukur |
| Arsip foto + teks (kolase) | historichan (41) | 1 | 580 | 4,9% | 14,6% | 0 |
| Gambar AI (ID) | AnimasiFaktaseru (53) | 1 | 1.000 | 0% | 0% | 0 |
| 3D/semi-3D folklor ID | GromoreStudio (22) | 1 | 64.000 | 4,5% | 13,6% | 0 |
| Low-poly/diorama | tidak ada channel ditemukan | 0 | - | - | - | - |
| Stick figure | tidak ada channel besar; PantesanLaku (doodle) hanya 1,1 rb | - | - | - | - | - |
| Paper-cutout/claymation | tidak ada channel terukur (pencarian menemukan satu Short claymation Ken Arok tanpa channel yang bisa dilacak) | 0 | - | - | - | - |

Channel per family, angka lengkap (views median; share ≥10×; share ≥3×; rasio maks÷median):
ZackDFilms 10 jt; 0%; 6,5%; 7,4× | ExtraHistory 2,6 jt; 0%; 14,5%; 8,1× | Kurzgesagt 2,7 jt; 0%; 15,4%; 7,4× | TheInfographicsShow 218,5 rb; 2,5%; 16%; 30× | Mashed 224,5 rb; 8,0%; 26,5%; 38× | SimpleHistory 45,5 rb; 9,2%; 20,8%; 99× | RealLifeLore 277,5 rb; 6,5%; 30,6%; 19× | HistofactsGeo 113 rb; 2,0%; 15,3%; 11,5× | KokBisa 219 rb; 2,5%; 21,5%; 20× | Psych2go 58 rb; 3,6%; 10%; 34,5× | guepunyacerita 30 rb; 0,5%; 2%; 22,7× | infaktamedia 5,2 rb; 2,5%; 20,5%; 16×.

**Yang bisa dan tidak bisa dibaca:**
- **[terukur]** Pola "outlier" berbeda menurut ukuran: channel raksasa stabil (Zack, ExtraHistory, Kurzgesagt) hampir tidak punya Short ≥10× median (rasio maks 7–8×); channel menengah (SimpleHistory 9,2%, Mashed 8,0%) punya ekor panjang. Konsistensi tertinggi: Zack (persentil 25 = 66% dari median) dan Kurzgesagt/ExtraHistory (persentil 25 ≈ 46–50% dari median).
- **[terukur]** Variasi dalam family jauh lebih besar daripada antar family; median family sebagian besar mencerminkan umur/ukuran channel dan jumlah channel per family (1–6).
- **[penilaian]** Bukti mendukung "gaya apa pun bisa menang"; yang membedakan lebih mungkin topik, judul, dan hook. Tidak ada dasar angka untuk mengatakan 3D lebih baik dari 2D atau sebaliknya: Zack adalah satu channel dengan tim dan 5 unggahan/hari.

## 3. Q2: host/maskot berulang vs tidak
Definisi saya: "host" = tokoh animasi berulang yang tampil sebagai narator/pemeran utama atau bereaksi (bukan sekadar gaya gambar yang sama). Label manual dari contact sheet.
| Kelompok | Channel | Median-dari-median | Rata-rata share ≥3× | Komentar per 1.000 views (median Short 60 hari) |
|---|---|---|---|---|
| Host/tokoh berulang (ketat) | Mashed, guepunyacerita, Psych2go | 58.000 (224,5 rb; 30 rb; 58 rb) | 12,8% | 0,55 / 0,25 / 3,18 (Psych2go n=1, abaikan) |
| Host/tokoh sebagian | + Kurzgesagt (burung/maskot di sebagian video), KokBisa (presenter nyata + avatar 2D), infaktamedia (avatar) | 224.500 (6 channel) | 16,0% | Kurzgesagt 0,90; KokBisa 0,91 |
| Tanpa host | ZackDFilms, TheInfographicsShow, SimpleHistory, ExtraHistory, HistofactsGeo, RealLifeLore | 248.000 | 17,3% | Zack 0,37; SimpleHistory 0,87; ExtraHistory 0,61; HistofactsGeo 0,28 |
**[terukur]** Tidak ada pola konsisten: kelompok host ketat lebih rendah di median, kelompok sebagian setara, komentar/view bercampur (0,25–0,91 di kedua sisi).
**Confound (jujur):**
1. n sangat kecil (3 channel ketat). Satu channel (mis. Mashed vs guepunyacerita) menggeser rata-rata.
2. Genre berbeda: Mashed = parodi fiksi dengan IP Nintendo/Sega (bukan penjelasan); guepunyacerita = curhat pribadi; Psych2go = psikologi populer. Host tidak terpisah dari genre.
3. Umur/skala channel berbeda ratusan kali (Zack 10 jt vs guepunyacerita 30 rb).
4. Komentar/view dipengaruhi pemicu perdebatan topik (SmartNonsense: satu Short 491 komentar), kebiasaan bahasa, dan ajakan komentar; bukan hanya karakter.
5. Maskot Kurzgesagt tidak dipakai di semua Short dan tidak memandu narasi; Kok Bisa memakai presenter nyata. Jadi tidak ada contoh bersih "narator animasi yang menunjuk/bereaksi" di data. **[penilaian]** Hipotesis host-animasi tetap belum teruji, bukan terbantah.

## 4. Q3: apa kata penonton soal animasi
13 Short (1 per channel), 30 komentar TOP tiap Short, total 390.
| Short (family) | Komentar menyebut visual/seni/karakter | Catatan |
|---|---|---|
| TED-Ed "road less traveled" (2D ilustrasi) | 0 | isi puisi, sekolah; 1 pujian suara narator |
| HistofactsGeo "Islamic Golden Age" (peta) | 0 | doa, sejarah, politik |
| Mashed "Donkey Kong deals with grandma" (2D parodi) | 3 | tokoh DK tenang, "felt like a gumball scene"; sisanya mengutip dialog |
| SimpleHistory "Maverick 41" (2D datar) | 1 | "Love these new Saturday morning cartoons." |
| guepunyacerita "My hot nerd" (2D ID) | 5 | daya tarik tokoh cowok berkacamata; bukan teknik animasi |
| Psych2go "Never in love" (2D doodle) | 0 | cerita pribadi dan debat topik |
| Kurzgesagt "coin-sized black hole" (flat MG) | 8 | Kirby sebagai lubang hitam, lelucon teks di layar |
| ExtraHistory "Worst Dads" (2D) | 2 | "Bro the soldier looked scared", ekspresi ayah; mayoritas mengutip naskah/lelucon |
| KokBisa "Perang 40 menit" (presenter+2D) | 1 | "Kyk spongebob" |
| RealLifeLore "B2 bomber" (peta) | 0 | |
| TheInfographicsShow "Russian draft" (2D datar) | 0 | politik, pengalaman pribadi |
| GromoreStudio "Timun Mas" (3D folklor ID) | 3 (+5 soal suara) | satu-satunya video dengan pujian animasi eksplisit |
| ZackDFilms "Electrical outlets" (3D) | 2 | adegan hamster; satu komentar negatif ("ini dicuri dari bread guy") |
**Total [terukur]:** 25/390 = **6,4%** menyebut visual/karakter; **4/390 = 1%** memuji kualitas animasi/seni (Gromore 3, SimpleHistory 1); **1** negatif (orisinalitas); sisanya positif/netral. Komentar tentang suara narasi: 6 (semuanya Gromore + TED-Ed). **[penilaian]** Mayoritas komentar teratas mengutip naskah, melucu, bercerita pengalaman, atau mengoreksi fakta; kualitas gambar dinikmati tapi tidak diucapkan. Sampel kecil, urutan TOP bias ke komentar paling banyak disukai (lelucon).
Kutipan representatif:
- Gromore: "Sangat bagus, animasinya seru grafiknya bagus, apalagi suara lagu nya..."; "Semoga suatu saat nanti cerita Perburuan Raksasa bisa dapat animasi bagus seperti buatan Tim Gromore" (22 suka).
- Kurzgesagt: "Earth sucked by Kirby the Black Hole" (58 rb suka); "Did anyone else notice the 'number of people who asked' next to the smallest black hole?" (1,9 rb).
- Mashed: "The fact that Donkey Kong looks so calm and being dissed by his own grandma is crazy" (18 rb).
- ExtraHistory: "Bro the soldier looked scared" (16 rb).
- SimpleHistory: "Love these new Saturday morning cartoons." (3).
- Zack (negatif): "ermmm this is stolen from the bread guy" (3).
- guepunyacerita: "cowo kacamata emang semenarik itu..." (170); "Terlalu di wattpad2 kan.. COBA NONTON YG FULL" (88, soal cerita).

## 5. Q4: kadens produksi (60 hari terakhir, Short/minggu)
| Channel | Family | Short/minggu | Median views Short terbaru (60 hr)* |
|---|---|---|---|
| ZackDFilms | 3D | ±34 (±5/hari, 5 slot tetap) | 6,3 jt |
| Gue Punya Cerita | 2D ID | 7,8 | 30,7 rb |
| SimpleHistory | 2D | 5,0 | 19,4 rb |
| HistofactsGeo | peta ID | 5,0 | 74 rb |
| Mashed | 2D parodi | 3,4 | 74 rb |
| ExtraHistory | 2D | 1,1 (mingguan, Kamis) | 992 rb |
| Kok Bisa | presenter+2D ID | 0,9 | 59 rb |
| Kurzgesagt | flat MG | 0,7 | 966 rb |
| Psych2go | 2D | 0,1 | 19 rb |
| a2animasi | 2D ID | 0,2 | 1,9 rb |
| TheInfographicsShow, RealLifeLore, TED-Ed, GromoreStudio, AnimasiFaktaseru, infaktamedia, historichan | - | 0 | - |
Pembanding non-animasi: SmartNonsense 5,4/minggu (59 rb); KamusUnik 2,1/minggu.
*Short baru belum punya waktu mengumpulkan views; tidak sebanding dengan median historis (mis. SimpleHistory median historis 45,5 rb vs 19 rb).
**[terukur]** Unggahan ≥1/hari berkelanjutan hanya pada Zack dan Gue Punya Cerita. Channel animasi 2D berkualitas tinggi (ExtraHistory, Kurzgesagt) mengunggah ≤1/minggu. Cadence 5/minggu (SimpleHistory, HistofactsGeo) dicapai dengan gaya sederhana (flat berlatar blur; peta + teks). **[penilaian]** Menunjuk ke trade-off biaya gambar per Short vs frekuensi; tidak ada data biaya produksi di sini, dan tidak ada bukti bahwa frekuensi tinggi menaikkan views per Short (channel dengan kadens tinggi di sampel median-nya menengah-rendah, kecuali Zack).

## 6. Q5: Short animasi Indonesia
| Channel | Gaya | Median views | Short/minggu | Catatan |
|---|---|---|---|---|
| Kok Bisa (@KokBisa) | presenter nyata + insert/avatar 2D | 219 rb (0% ≥10×, 21,5% ≥3×) | 0,9 | terbaik di daftar; Short terbaik 4,3 jt ("Perang 40 menit") |
| HistofactsGeo | peta Google Earth + teks, tanpa karakter | 113 rb (puncak 1,3 jt) | 5,0 | kadens tinggi, produksi ringan, topik "kenapa negara X" |
| GromoreStudio | 3D/semi-3D cerita rakyat (Timun Mas dst.) | 64 rb; 22 Short | 0 (dorman) | satu-satunya komentar yang memuji animasi; watermark "PROPERTY" (kemungkinan cuplikan film panjang) |
| Gue Punya Cerita | 2D kartun, curhat berseri | 30 rb (hanya 2% ≥3×) | 7,8 | konsisten tapi datar; 1 Short 682 rb |
| infaktamedia | campur footage + infografik | 5,2 rb | 0 | |
| a2animasi | 2D campur klip stok | 1,8 rb | 0,2 | |
| PantesanLaku | doodle/pictogram | 1,1 rb | - | |
| AnimasiFaktaseru | gambar AI | 1 rb | 0 | |
| historichan | arsip foto + teks | 580 | 0 | |
Ditemukan lewat pencarian tapi tidak diukur (handle tidak terverifikasi atau tanpa tab Shorts): Goresan Santri (animasi sejarah Malang), cerita opowaehe, COCO MEONG (parodi), Animasi Cerita Indonesia - ACI, DONGENG ANIMASI. **[terukur]** Tidak ditemukan channel animasi Indonesia "penjelasan alasan di balik benda/merek/harga" yang berkinerja >100 rb median selain Kok Bisa (tanpa animasi penuh) dan HistofactsGeo (peta). **[penilaian]** Ceruk "penjelasan animasi buatan sendiri" tampak longgar; sekaligus berarti tidak ada bukti permintaan yang sudah terbukti untuk gaya animasi spesifik di pasar Indonesia.

## 7. Keterbatasan
- Views snapshot; 200 Short terbaru per channel mencakup rentang waktu berbeda (Zack ±40 hari, ExtraHistory berbulan-bulan). Median historis dan 60-hari tidak sebanding.
- ≥10× tidak bermakna untuk channel raksasa; karena itu ≥3× dilaporkan juga.
- Label gaya dari mata saya pada 6 thumbnail teratas; "host" subjektif. Tidak ada channel diorama/low-poly/paper-cutout/stick figure bermakna dalam data; family itu **tidak terjawab**.
- Daftar kandidat: 7 handle gagal/kosong; jumlah channel per family 1–6, sehingga "median family" lemah.
- Sampel komentar: 13 Short pemenang, 30 komentar TOP (bias lelucon), campur bahasa, sebagian balasan; klasifikasi manual satu orang.
- Apify dibatasi 30 Short per channel; laju dihitung dari rentang tanggal.
- Survivorship: hanya channel yang masih ada dan ditemukan; channel animasi yang mati tidak terlihat. Korelasi, bukan kausalitas.
- Tidak ada data retensi/tayang-selesai, jadi "performa" = views dan komentar.

## 8. Opsi untuk pemilik channel (bukan keputusan)
1. **Tetap di gaya yang ada** (ARSIP RIG), investasi ke frame 0, topik, judul. Didukung: gaya tidak memisahkan pemenang; komentar jarang membahas animasi.
2. **Tambah tokoh berulang ringan** (mis. satu karakter reaktif di pojok). Belum ada bukti manfaat atau mudarat; hanya uji A/B kecil di channel sendiri yang bisa menjawab.
3. **Kadens**: target harian setara Zack tanpa tim tidak ada preseden di sampel; preseden ringan = 5/minggu (peta+teks, flat sederhana). Opsi: 5/minggu animasi penuh + 2 Short berformat lebih ringan.
4. **Uji terbatas**: 10 Short, sama topik, dua gaya frame 0 (benda besar vs tokoh + benda), ukur views 48 jam.
