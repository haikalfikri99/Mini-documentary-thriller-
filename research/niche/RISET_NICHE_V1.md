# Riset Niche v1: kenapa orang menonton "Hidden Systems & Psychology" (13 Nov 2026)
**Pertanyaan:** video seperti apa yang disukai di niche ini, kenapa orang menonton, dan bagaimana penyampaiannya, sebelum memilih judul dan menulis script.
**Metode:** (1) daftar Shorts + views dari 15 channel (±2.400 video; `data_shorts_per_channel.jsonl`), outlier dihitung sendiri = views ÷ median channel; (2) transkrip 16 video (pemenang vs gagal, topik sama) via Apify; (3) ±235 komentar teratas dari 10 video pemenang, dikodekan per motivasi.
**Batas:** sampel kecil dan dipilih lewat pencarian; ini **inferensi**, bukan hukum. Frame 0 dan tempo visual belum dianalisis (YouTube memblokir unduhan video dari server ini).

## 1. Temuan paling penting: topik sama, hasil 5.000× berbeda
| Topik | Pemenang | Gagal |
|---|---|---|
| Harga berakhiran 99 | Smart Nonsense "The REAL reason prices end in 99 cents" **7,5 jt** (26× median) | Duitech "Rahasia trik harga 99 ribu" **1,5 rb**; Pantesan Laku "harga coret" 1,4 rb |
| Kenapa orang tetap berjudi | (belum ada pemenang ID di sampel) | Nalar Aldi "Kenapa orang tetap judi online…" **1,3 rb**; banyak video serupa |
| Perusahaan memanipulasimu | — | Zack D. Films "How Food Companies Make You Eat More" **0,09×** median channel-nya sendiri (terendah ke-2 dari 200) |

**Topik bukan masalahnya; cara membingkai dan menyampaikan yang menentukan.**

## 2. Pola pemenang (dari transkrip)
| Unsur | Pemenang | Gagal |
|---|---|---|
| **Kalimat 1** | menunjuk **benda/merek/tempat yang sudah dikenal** + kontradiksi atau gambar absurd: "This is ChatGPT. Every time you ask it something, it wastes water." · "This is the Dyson bladeless fan, but it isn't actually bladeless." · "Remember GoPro… they're getting annihilated." · "Perang ini cuma 40 menit, lebih pendek dari film bioskop." · "Warga Venezuela buang uang ke tong sampah." | konsep/istilah: "Pernah lihat harga dicoret…", "Fenomena ini disebut efek angka kiri", "Seorang penjudi, semakin banyak kalah…"; #002 kita: "Pria ini merancang fitur…" |
| **Jawaban** | **tidak terduga / membantah anggapan umum** ("the REAL reason", "the TRUTH": 99 sen = anti-maling kasir, bukan psikologi; kipas "tanpa baling-baling" ternyata punya 9 baling-baling) | jawaban yang sudah ditebak penonton (efek angka kiri, chasing losses) |
| **Bentuk** | **cerita dengan adegan** (bar 1870-an, kapal uap; ilmuwan dengan 45 saus pasta) atau cara kerja langkah demi langkah dengan rantai "so… so…" | kuliah: definisi → contoh → nasihat |
| **Nada** | santai, jahil, ada humor ("fancy pants Dyson"), tokoh berulang (Derd) | serius, menggurui |
| **Penutup** | punchline/twist singkat ("they're not bladeless", "the drawer always has to open"), atau pertanyaan ringan yang mengundang cerita penonton ("40 menit bisa ngapain?") | nasihat + "tulis di kolom komentar dan subscribe" |
| **Durasi** | 46–68 dtk | 45–83 dtk (durasi bukan pembeda) |

## 3. Kenapa orang menonton (kode komentar, ±235 komentar)
| Motivasi | Bukti di komentar | Bobot |
|---|---|---|
| **C. Aha / cara kerja yang memuaskan** | "that COANDA EFFECT went straight into my soul" (6,8 rb like); penonton melengkapi penjelasan (dispatcher 911, air pusat data 12 rb like) | tinggi |
| **A. Membantah anggapan / merasa tahu rahasia** | 99 sen: komentar teratas 35 rb like justru membantah ("it's a psychological thing"); "I always thought 911 came from 9/11" (2,6 rb) | tinggi, dan **perdebatan = komentar** |
| **D. Musuh / marah** | GoPro: "greed killed it" 31 rb, "who pays themselves $280M" 32 rb; Zanzibar: "begitulah perang, rajanya kabur" 1,2 rb | tinggi bila ada tokoh jahat |
| **E. Relevan dengan hidupku** | "parkir jadi 2000" 655; pengalaman membeli Dyson; "40 menit bisa ngapain" ribuan balasan | sedang–tinggi |
| Humor / komunitas | lelucon tokoh berulang "Derd" 23 rb; "speedrun naklukin kerajaan" 3,5 rb | tinggi untuk komentar |
| **B. Melindungi diri ("aku dimanipulasi, aku harus waspada")** | hampir tidak ada; di video "food companies" komentarnya justru "great excuse to eat more cheetos" | **rendah** |

**Kesimpulan:** orang menonton niche ini karena **penasaran dan puas memahami** (C) serta **senang anggapannya dibalik** (A), dan berkomentar karena **musuh, perdebatan, dan pengalaman pribadi**. Hampir tidak ada yang menonton untuk "melindungi diri". Formula kita sejauh ini dibangun di atas B ("kamu sedang jadi korban, berhati-hatilah"), yang justru paling lemah.

## 4. Implikasi
1. **Pilar dibingkai ulang:** dari "psikologi manipulasi" ke **"alasan ASLI di balik benda, tempat, dan harga yang kamu kenal"** (tetap wilayah 2: sistem tersembunyi, tapi masuk lewat benda yang dikenal). Psikologi tetap ada, sebagai bagian dari jawaban, bukan pintu masuk.
2. **Hook = benda yang dikenal + kontradiksi** di kalimat pertama (melengkapi gerbang F7).
3. **Jawaban harus mengejutkan:** bila jawabannya bisa ditebak penonton (shock score < 80), topik dibuang.
4. **Cerita dengan adegan dan satu tokoh** (penemu, pemilik toko, CEO), bukan "peneliti menemukan…".
5. **Musuh yang jelas** bila ada (perusahaan, kartel, CEO), selalu dengan bukti.
6. **Penutup = punchline/twist**, bukan nasihat. Boleh satu pertanyaan ringan yang mengundang pengalaman penonton.
7. **Hormozi Proof–Promise–Plan tidak dipakai:** kerangka itu untuk penonton yang mencari hasil ("cara mendapat X"); data komentar menunjukkan penonton niche ini mencari pemahaman dan kejutan, dan video ID yang berakhir dengan nasihat gagal. Unsur "proof" tetap hidup sebagai bukti di dalam cerita.
8. **Nada:** santai dan sedikit jahil; gaya ARSIP KASUS (misterius, serius) perlu diberi ruang humor.

## 5. Yang belum diketahui (riset v2)
- Frame 0 dan tempo visual pemenang (perlu screenshot/unduh manual).
- Pemenang berbahasa Indonesia khusus di wilayah 2 (sampel ID kita: Kok Bisa, Kamus Unik, Ngomongin Uang di luar wilayah 2; channel wilayah 2 ID yang kami temukan semuanya kecil). Bisa berarti peluang kosong, atau topik yang memang sulit; data #003 akan memberi jawaban pertama.
