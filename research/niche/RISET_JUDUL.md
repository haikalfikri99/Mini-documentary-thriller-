# RISET JUDUL — aturan judul berbasis data (13 Nov 2026)
Status: usulan riset, belum dikunci ke skill. Tidak ada scraping baru; hanya data di disk.

## 1. Data dan metode
- Sumber: `data_shorts_per_channel.jsonl` (5.608) + `data_selingan_channels.jsonl` (3.736), digabung dan didedup per video id (baris tanpa views dibuang). `data_storytelling_channels.jsonl` hanya ringkasan per channel (tanpa judul), jadi tidak dipakai.
- Dikeluarkan: channel <40 Shorts (20 channel) dan berita (Kompas, Narasi, Tirto, WSJ, CNBC, CNBCMakeIt, businessinsider, Vox; dilaporkan terpisah di bagian 6). **OtakKanan juga dikeluarkan** (median views 345, judul motivasi bertagar, rasio ~0,00x; kemungkinan artefak data). Hasil akhir: **7421 Shorts, 42 channel** (ID: 1903 Shorts / 12 channel; EN: 5518 / 30).
- Rasio = views / median channel. Breakout = rasio >= 3. Baseline breakout = **17.1%** (ID 16.6%, EN 17.3%). CI 95% bootstrap (1000x, resample judul; mengabaikan klaster per channel, jadi CI **terlalu sempit**). "Channel median>1" = jumlah channel (dengan >=5 judul berfitur itu) yang median rasionya >1; harapan kebetulan ~50%.
- Fitur dideteksi dengan regex/heuristik. Kebisingan: "nama diri" = kata berhuruf kapital (judul EN Title Case hampir selalu "ya", tidak informatif); superlatif, uang, negasi memakai daftar kata terbatas; emoji dan hashtag sangat khas channel (confound gaya channel; hashtag banyak di KamusUnik, KTJ, MEDIA_ID). 23 fitur diuji, sehingga ~1 efek "signifikan" muncul kebetulan; hanya efek yang konsisten lintas channel yang disorot. Topik, thumbnail, dan usia video tidak dikontrol.

## 2. Hasil gabungan (semua bahasa)
| Fitur | n | median rasio (ya) | median rasio (tidak) | breakout ya [CI95] | breakout tidak | channel median>1 |
|---|---|---|---|---|---|---|
| len<=30 | 2250 | 0.98 | 1.00 | 16.4% [14.9–18.0] | 17.5% | 13/36 |
| len31-45 | 2883 | 1.01 | 0.99 | 18.4% [17.0–19.8] | 16.4% | 22/39 |
| len46-60 | 1379 | 1.00 | 1.00 | 17.5% [15.5–19.7] | 17.0% | 20/41 |
| len61+ | 909 | 0.96 | 1.00 | 14.4% [12.1–16.8] | 17.5% | 7/21 |
| kata<=5 | 2563 | 0.98 | 1.00 | 15.8% [14.4–17.1] | 17.8% | 15/37 |
| kata6-8 | 3165 | 1.03 | 0.97 | 19.1% [17.9–20.5] | 15.7% | 24/41 |
| kata9+ | 1693 | 0.96 | 1.00 | 15.5% [13.8–17.2] | 17.6% | 12/36 |
| tanda_tanya | 1580 | 1.00 | 1.00 | 15.5% [13.8–17.5] | 17.6% | 18/38 |
| mulai_why/how/kenapa/kok | 1169 | 1.00 | 1.00 | 18.1% [15.7–20.3] | 17.0% | 13/32 |
| kata_real/truth/ternyata | 334 | 0.92 | 1.00 | 13.8% [10.2–17.7] | 17.3% | 7/21 |
| angka/digit | 1059 | 1.16 | 0.98 | 22.4% [19.9–24.8] | 16.3% | 20/36 |
| uang/harga | 190 | 1.19 | 1.00 | 24.2% [18.4–31.1] | 17.0% | 8/12 |
| tahun | 67 | 1.00 | 1.00 | 9.0% [3.0–16.4] | 17.2% | 2/4 |
| CAPS_kata | 2509 | 1.01 | 1.00 | 20.4% [18.9–22.1] | 15.5% | 18/36 |
| emoji | 1064 | 1.02 | 1.00 | 18.5% [16.3–20.9] | 16.9% | 10/14 |
| elipsis/.. | 384 | 1.09 | 1.00 | 21.6% [17.7–25.8] | 16.9% | 5/13 |
| hashtag | 1584 | 1.00 | 1.00 | 15.8% [14.1–17.7] | 17.5% | 8/22 |
| orang_kedua | 692 | 1.02 | 1.00 | 15.8% [13.3–18.5] | 17.3% | 18/30 |
| superlatif | 397 | 1.13 | 1.00 | 18.9% [15.4–22.9] | 17.0% | 19/27 |
| negasi/kontradiksi | 443 | 1.03 | 1.00 | 21.0% [17.4–25.3] | 16.9% | 17/30 |
| nama_diri (heuristik, tidak informatif) | 5406 | 1.00 | 0.99 | 16.8% [15.9–17.9] | 18.0% | 18/42 |
| format_list | 282 | 1.40 | 1.00 | 28.4% [23.0–34.0] | 16.7% | 5/6 |
| seru! | 1402 | 1.00 | 1.00 | 19.5% [17.4–21.6] | 16.6% | 11/25 |

Uji konsistensi tambahan (median rasio ya > tidak, dalam tiap channel dengan >=5 data di kedua kelompok): angka/digit 22/36; 6–8 kata 26/41; format list 5/6 (didominasi KamusUnik, Psych2go, JerryRig); kata "real/truth/ternyata" 7/21; tanda tanya 19/38; Why/How/Kenapa 15/32; >60 karakter 7/21; elipsis 5/13; negasi 17/30; CAPS 18/35.

## 3. Hasil Indonesia saja (12 channel: KokBisa, KamusUnik, NgomonginUang, TauGakSih.Official, NihongoMantappu, PantesanLaku, DetektifAstral, TaksakaSeta, KTJ, MEDIA_ID, AlamSemenit, TakTerdugaID)
| Fitur | n | median rasio (ya) | median rasio (tidak) | breakout ya [CI95] | breakout tidak | channel median>1 |
|---|---|---|---|---|---|---|
| len<=30 | 382 | 0.98 | 1.00 | 14.9% [11.5–18.3] | 17.0% | 3/9 |
| len31-45 | 622 | 1.07 | 0.98 | 17.8% [15.0–20.9] | 16.0% | 8/11 |
| len46-60 | 447 | 1.00 | 1.00 | 17.9% [14.1–21.3] | 16.2% | 6/12 |
| len61+ | 452 | 0.91 | 1.00 | 15.0% [11.7–18.4] | 17.1% | 2/7 |
| kata<=5 | 566 | 0.97 | 1.00 | 13.4% [10.6–16.1] | 18.0% | 3/10 |
| kata6-8 | 745 | 1.09 | 0.95 | 19.3% [16.2–22.3] | 14.9% | 9/11 |
| kata9+ | 592 | 0.94 | 1.01 | 16.2% [13.3–19.3] | 16.8% | 3/9 |
| tanda_tanya | 474 | 0.97 | 1.01 | 13.7% [10.8–16.9] | 17.6% | 3/10 |
| mulai_why/how/kenapa/kok | 154 | 0.92 | 1.00 | 8.4% [4.5–13.0] | 17.3% | 0/3 |
| kata_real/truth/ternyata | 172 | 0.89 | 1.00 | 9.3% [5.8–14.0] | 17.3% | 1/7 |
| angka/digit | 292 | 1.09 | 1.00 | 21.9% [17.1–26.7] | 15.6% | 3/9 |
| uang/harga | 49 | 1.11 | 1.00 | 22.4% [12.2–34.7] | 16.5% | 2/4 |
| tahun | 22 | 1.06 | 1.00 | 4.5% [0.0–13.6] | 16.7% | 2/2 |
| CAPS_kata | 580 | 1.05 | 0.98 | 20.5% [17.2–23.8] | 14.9% | 4/10 |
| emoji | 309 | 1.09 | 1.00 | 16.2% [12.0–20.7] | 16.7% | 5/6 |
| elipsis/.. | 56 | 1.09 | 1.00 | 14.3% [5.4–23.2] | 16.7% | 1/3 |
| hashtag | 1046 | 1.00 | 1.00 | 14.5% [12.4–16.7] | 19.1% | 3/10 |
| orang_kedua | 96 | 0.86 | 1.00 | 9.4% [4.2–15.6] | 17.0% | 3/8 |
| superlatif | 89 | 1.12 | 1.00 | 29.2% [20.2–38.2] | 16.0% | 4/4 |
| negasi/kontradiksi | 129 | 1.00 | 1.00 | 16.3% [10.1–22.5] | 16.6% | 5/9 |
| nama_diri (heuristik, tidak informatif) | 1183 | 0.99 | 1.00 | 15.9% [13.7–17.8] | 17.8% | 5/12 |
| format_list | 99 | 1.16 | 1.00 | 27.3% [19.2–36.4] | 16.0% | 1/2 |
| seru! | 461 | 1.00 | 1.00 | 20.4% [16.5–24.1] | 15.4% | 5/9 |

Catatan ID: sampel kecil per fitur; banyak fitur ditopang 1–2 channel (NihongoMantappu = vlog personal; KamusUnik = daftar "3 ..." + hashtag). Why/Kenapa hanya muncul di 3 channel dan cenderung negatif.

## 4. Hasil EN saja
| Fitur | n | median rasio (ya) | median rasio (tidak) | breakout ya [CI95] | breakout tidak | channel median>1 |
|---|---|---|---|---|---|---|
| len<=30 | 1868 | 0.98 | 1.00 | 16.7% [15.0–18.3] | 17.6% | 10/27 |
| len31-45 | 2261 | 1.00 | 1.00 | 18.5% [16.9–20.2] | 16.5% | 14/28 |
| len46-60 | 932 | 1.00 | 1.00 | 17.4% [15.0–20.0] | 17.3% | 14/29 |
| len61+ | 457 | 1.00 | 1.00 | 13.8% [10.9–16.8] | 17.6% | 5/14 |
| kata<=5 | 1997 | 0.99 | 1.00 | 16.5% [14.9–18.0] | 17.8% | 12/27 |
| kata6-8 | 2420 | 1.02 | 0.97 | 19.0% [17.4–20.6] | 16.0% | 15/30 |
| kata9+ | 1101 | 0.96 | 1.00 | 15.1% [13.1–17.1] | 17.9% | 9/27 |
| tanda_tanya | 1106 | 1.04 | 1.00 | 16.3% [14.1–18.6] | 17.6% | 15/28 |
| mulai_why/how/kenapa/kok | 1015 | 1.06 | 0.99 | 19.6% [17.3–22.3] | 16.8% | 13/29 |
| kata_real/truth/ternyata | 162 | 0.98 | 1.00 | 18.5% [13.0–24.1] | 17.3% | 6/14 |
| angka/digit | 767 | 1.18 | 0.97 | 22.6% [19.6–25.4] | 16.5% | 17/27 |
| uang/harga | 141 | 1.20 | 1.00 | 24.8% [17.7–31.9] | 17.1% | 6/8 |
| tahun | 45 | 0.98 | 1.00 | 11.1% [2.2–22.2] | 17.4% | 0/2 |
| CAPS_kata | 1929 | 1.00 | 1.00 | 20.4% [18.7–22.2] | 15.7% | 14/26 |
| emoji | 755 | 1.00 | 1.00 | 19.5% [17.0–22.3] | 17.0% | 5/8 |
| elipsis/.. | 328 | 1.10 | 1.00 | 22.9% [18.6–27.4] | 17.0% | 4/10 |
| hashtag | 538 | 1.07 | 1.00 | 18.2% [14.9–21.7] | 17.2% | 5/12 |
| orang_kedua | 596 | 1.05 | 1.00 | 16.8% [13.8–19.8] | 17.4% | 15/22 |
| superlatif | 308 | 1.15 | 1.00 | 15.9% [12.0–20.1] | 17.4% | 15/23 |
| negasi/kontradiksi | 314 | 1.07 | 1.00 | 22.9% [18.5–27.4] | 17.0% | 12/21 |
| nama_diri (heuristik, tidak informatif) | 4223 | 1.00 | 0.95 | 17.1% [16.1–18.3] | 18.1% | 13/30 |
| format_list | 183 | 1.50 | 0.99 | 29.0% [22.4–36.1] | 16.9% | 4/4 |
| seru! | 941 | 1.00 | 1.00 | 19.1% [16.7–21.7] | 17.0% | 6/16 |


## 5. Contoh judul teratas dan terbawah (rasio terhadap median channel)
**Teratas (semua):** 727x "GoPro Is Going Bankrupt?" (LogicallyAnswered); 336x "Was Toyota Right About EVs All Along?"; 102x "Japan Is Hollowing Out a MOUNTAIN" (TheB1M); 79x "Tesla Glue is stronger than you think..." (JerryRig); 74x "Tanpa Sadar, Ternyata Ada Warisan Kolonialisme Belanda di Budaya Kemerdekaan Kita" (NgomonginUang); 60x "The Hidden Code in the Mars Landing"; 52x "Russia Tried to STOP This Canal"; 26x "The REAL reason prices end in 99 cents.." (SmartNonsense); 23x "The TRUTH about Dyson's bladeless fan.."; 37x "Negara ini sudah ada MBG dari Dulu.!" (KamusUnik).
**Teratas ID:** 119x "3 Artists Who Created Balinese Ogoh-Ogoh"; 104x "3 Danau Penuh Misteri Di Indonesia"; 74x NgomonginUang (di atas); 40x "Saat Om Hao Jadi Incaran" (KTJ); 34x "3 Most Dangerous Rivers in Indonesia"; 29x "3 Indonesian Tribes Most Feared by Dutch Colonizers".
**Terbawah (rasio ~0):** judul motivasi/kutipan generik ("Belajar dari Diam | Senin", "TANGGUNG JAWAB SUAMI BUKAN SEKEDAR CARI UANG"), judul tanpa objek konkret, atau CTA ("Check out our NEW VIDEO...").
**Pengamatan kualitatif:** judul teratas menyebut **objek/merek/tempat konkret** (GoPro, Toyota, Dyson, 99 sen, Mars, kanal, Ogoh-ogoh) dan menyiratkan perubahan/ancaman/kontradiksi; kata pemicu seperti "real reason" bukan faktor pembeda umum.

## 6. Channel berita (dikeluarkan dari analisis utama)
Pola berbeda: judul >60 karakter breakout 18,4% (justru lebih baik), tanda tanya 10,5% vs 17,2%, orang kedua 8,5%. Harga/uang median 1,32x (5/6 channel). Elipsis 44% tapi n=27. Tidak dipakai untuk aturan kita (konteks headline berita).

## 7. Aturan judul untuk channel kita
| # | Aturan | Bukti | Label |
|---|---|---|---|
| 1 | Sebut **objek/merek/tempat konkret yang dikenal** di judul (mis. "micin", "99 sen", "Dyson"); hindari judul abstrak/kutipan motivasi | Terbawah didominasi judul abstrak; teratas didominasi benda/merek konkret; selaras temuan frame-0 "benda pahlawan". Bukan fitur regex yang terukur langsung | **kuat (arah), tak terukur persis** |
| 2 | Panjang **31–60 karakter / 6–8 kata**; hindari >60 karakter | 6–8 kata: breakout 19,1% vs 15,7%, 24/41 channel; >60 karakter 14,4%, hanya 7/21 channel | **kuat (efek kecil, ~+3 poin)** |
| 3 | Pakai **angka konkret** (jumlah, harga, tahun dalam kalimat) | 22,4% vs 16,3%; 20/36 channel (22/36 bila dibanding sesama channel); konsisten EN (22,6%) dan ID (21,9%), tapi sebagian dari list "3 ..." dan channel sejarah | **kuat–sedang** |
| 4 | **Harga/uang** di judul (pilar harga) | 24,2% vs 17,0%, 8/12 channel; n=190, CI lebar (17,9–30,5) | **sedang, cenderung kuat** |
| 5 | Format list "3 hal ..." | 28% breakout, median 1,40x, 5/6 channel, tapi dominan KamusUnik/Psych2go dan tidak cocok pilar "alasan asli" | **lemah** (uji sesekali) |
| 6 | Kata "alasan sebenarnya / ternyata / rahasia / the truth" | Gabungan 13,8% vs 17,3% (7/21 channel); ID 9,3%; Smart Nonsense & NgomonginUang berhasil, tapi tidak umum | **tidak terbukti** — jangan wajibkan |
| 7 | Mulai Why/How/Kenapa/Kok atau tanda tanya | Why/How 18,1% vs 17,0% (13/32); "?" 15,5% vs 17,6%; ID Kenapa/Kok 8,4% (n=154) | **tidak terbukti** |
| 8 | Negasi/kontradiksi ("bukan", "mitos", "ternyata bukan") | 21,0% vs 16,9%, 17/30 channel; EN 22,9%, ID 16,3% | **lemah** (arah positif, ID tidak) |
| 9 | Superlatif ("terbesar/paling") | 18,9% vs 17,0% gabungan; ID 29,2% (n=89, 4/4 channel); EN median 1,15 | **lemah** (n kecil per bahasa) |
| 10 | Satu kata KAPITAL, emoji, "!", hashtag di judul, elipsis "..", orang kedua "kamu" | CAPS 20,4% vs 15,5% tapi 18/35 channel; emoji/!/elipsis tidak konsisten (elipsis 5/13); hashtag 15,8% vs 17,5%; "kamu" 15,8% | **tidak terbukti** |

Tahun: n=67, breakout 9% (tidak signifikan, jarang dipakai); jangan jadikan aturan.

Pesan utama: efek judul **kecil** (maks. +5–7 poin dari baseline ~17%) dan hanya angka dan panjang yang konsisten. Pilihan topik (objek konkret + twist) kemungkinan lebih penting daripada frasa. Jangan menukar akurasi judul demi fitur.

## 8. Lima format judul (topik: ketakutan micin/MSG berawal dari satu surat 1968)
1. **"Ketakutan micin berawal dari satu surat tahun 1968"** (49 karakter, 7 kata; angka + objek dikenal)
2. **"1 surat tahun 1968 bikin orang takut micin"** (40 karakter, 8 kata; angka di awal)
3. **"Micin ditakuti gara-gara 1 surat, bukan sains"** (kontradiksi + angka)
4. **"Kenapa micin dituduh bikin bodoh? Gara-gara 1 surat"** (format Kenapa; kontrol, tak terbukti)
5. **"Surat 1968 ini bikin micin dicap berbahaya.."** (elipsis ala Smart Nonsense; kontrol, tak terbukti)
Rencana: kandidat utama 1–3; 4–5 hanya sebagai A/B bila tersedia. Jangan menyimpulkan dari satu video.

## 9. Keterbatasan
Korelasi bukan sebab; topik, frame 0, usia video, dan channel tidak dikontrol; bootstrap abaikan klaster; regex salah klasifikasi sebagian (mis. "Maverick 41" terhitung angka); ID hanya 12 channel. "Kuat" = konsisten lintas channel dengan CI di atas baseline, bukan terbukti kausal.
