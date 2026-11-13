# Riset Selingan (±30%) — wilayah mana yang layak, dan bingkai apa (13 Nov 2026)
Melanjutkan `RISET_NICHE_V2.md`. Pilar (±70%) = "alasan ASLI di balik benda/tempat/harga/merek yang kamu kenal". Dokumen ini menjawab: dari 5 wilayah lain (1 Peristiwa luar biasa, 3 Misteri/investigasi, 4 Keputusan fatal/bencana, 5 Sains gelap/eksperimen, 6 Sejarah terlupakan/tempat aneh), mana yang layak mengisi 30%, dan apakah bingkai pilar ikut menolong selingan.

Label: **[UKUR]** = angka dari data. **[INFERENSI]** = tafsiran saya. **[BELUM DICEK]** = belum diverifikasi.

## 0. Ringkasan keputusan (baca ini dulu)
1. **Tidak ada wilayah yang menang telak.** Semua wilayah ada di kisaran baseline (17,4% breakout); selisih terbesar (Wilayah 4: 22,1%) nyaris tidak signifikan [UKUR]. Memilih wilayah lewat "genre" saja tidak cukup; yang menentukan adalah **bingkai & eksekusi** (bagian 3).
2. **Rekomendasi: 30% = Wilayah 4 (Keputusan fatal/bencana, ±20%) + Wilayah 6 (Sejarah terlupakan/tempat aneh, ±10%)**, keduanya hanya dalam bingkai pilar ("kenapa X? alasan aslinya…") dan terutama versi Indonesia. Alasan: konsisten di banyak channel (W4: 16 dari 23 channel di atas baseline-nya sendiri; W6: 13 dari 21), permintaan pencarian Indonesia nyata, dan paling cocok dengan diorama 3D (jembatan, bandara, bendungan, kapal, gedung, proyek). [UKUR + INFERENSI]
3. **Hindari sebagai kategori: Wilayah 3 (misteri/kasus)** — satu-satunya yang di bawah baseline (14,2%, hanya 5 dari 12 channel di atas baseline) dan paling berisiko (kematian, klenik tak terverifikasi, kasus orang nyata). Wilayah 1 dan 5: sampel kecil/tidak konsisten → tidak diprioritaskan, boleh sesekali.
4. **Hipotesis bingkai-pilar-untuk-selingan: didukung secara lemah.** Judul selingan berbingkai "kenapa/ternyata/alasan/sebenarnya" breakout 24,8% vs 17,5% tanpa bingkai (selisih ≈ +7 poin; selang selisih kasar ≈ +1 s.d. +14, mengabaikan pengelompokan per channel). Tetapi per channel hanya 10 dari 19 channel yang median-nya lebih tinggi → **belum bisa disebut terbukti; setidaknya tidak merugikan**. [UKUR]

## 1. Data
| Sumber | Jumlah | Catatan |
|---|---|---|
| Data lama (V2) | 5.608 baris, 39 handle | `data_shorts_per_channel.jsonl` |
| Channel baru (yt-dlp, daftar Shorts) | **3.736 Shorts, 33 handle** | `data_selingan_channels.jsonl`. Banyak handle tebakan gagal (0 hasil): WeirdHistory, historicallyshorts, Nexpo, Bedtime_Stories, LEMMiNO, CompanyMan, WhyFiles, factnomenal, BrightSide, DanaInfo, MindBlownFacts, BeyondTheBrief, FaktaSejarah, MisteriIndonesia, JejakMisteri, AsalUsul, OverSimplified, Wendoverproductions, BusinessCasual, dll. |
| Channel baru yang berhasil (≥40 Shorts) | EN: MrBallen, TheHistoryGuyChannel, TheB1M, SimpleHistory, Vsauce, GeographyNow, NileRed, Kurzgesagt, FascinatingHorror, RealEngineering, MentourPilot, RealLifeLore. ID: Detektif Astral, Nessie Judge, TaksakaSeta (sejarah), Kisah Tanah Jawa (KTJ), Alam Semenit | Channel ID dicari lewat pencarian web + ytsearch |
| Channel diabaikan | MEDIA ID (median 255 views), Otak Kanan (345), TakTerduga ID (1.100), PantesanLaku, TauGakSih | median < 2.000 views → rasio tidak bermakna |
| Transkrip | 37 Shorts (dari 40 diminta; 3 gagal), ±$0,05 Apify | top vs bottom per wilayah, channel yang sama |
| Komentar | **tidak diambil** | tidak ada pembanding yang cukup; hemat anggaran |
| Autocomplete YouTube ID | 98 seed, 810 saran | `autocomplete_selingan_id.json` |
| Pencarian web (Google ID) | 6 kueri `site:youtube.com/shorts …` | hanya untuk menemukan channel & contoh judul |

**Metode.** Rasio = views ÷ median channel (hanya channel ≥40 Shorts dan median ≥2.000 views). Breakout = ≥3×. Selang 95% = bootstrap 2.000 kali pada level video. **Channel berita (Kompas, Narasi, Tirto, WSJ, CNBC, Business Insider, Vox) dikeluarkan** dari angka utama karena "kasus polisi" di sana adalah berita politik, bukan cerita (kalau dimasukkan, W3 terlihat 17,5% — lihat catatan). Hasil akhir: **7.064 Shorts, 38 channel**.
Satu label per judul, prioritas: W3 > W4 > W5 > W1 > W6 (kata kunci EN+ID, kode di scratchpad `analyze.py`). "Lensa pilar" = judul memuat why/how/real reason/truth/actually/behind/secret/kenapa/mengapa/ternyata/alasan/benarkah/sebenarnya/di balik/mitos/isn't.
**Keterbatasan jujur:** label kata kunci kasar (contoh salah label: "Medieval Glass Smash Racing" → W6, "F-35 … Incredible" → W1, "Killer Princess" → W3). Judul beberapa channel ID ternyata diterjemahkan ke Inggris oleh yt-dlp, sehingga sebagian kata Indonesia tidak tertangkap. Ratusan Shorts satu channel tidak independen (TaksakaSeta memberi 194 dari 570 baris W6). Wilayah 1 dan 5 kecil (n≈100–120).

## 2. Hasil per wilayah [UKUR]
| Wilayah | n | channel | median rasio | breakout | CI 95% |
|---|---|---|---|---|---|
| Semua | 7.064 | 38 | 1,00× | 17,4% | 17–18% |
| W3 Misteri/investigasi | 260 | 30 | 1,06× | **14,2%** | 10–18% |
| **W4 Keputusan fatal/bencana** | 358 | 37 | 1,14× | **22,1%** | 18–26% |
| W5 Sains gelap/eksperimen | 122 | 27 | 0,96× | 19,7% | 13–27% |
| W1 Peristiwa luar biasa | 94 | 30 | 0,84× | 21,3% | 14–30% |
| W6 Sejarah terlupakan/tempat aneh | 570 | 33 | 1,09× | 17,5% | 15–21% |
| Lainnya (bukan selingan) | 5.660 | 38 | 0,99× | 17,2% | 16–18% |

Pemisahan ID vs EN: W4 ID 20,2% (n=114, CI 13–28) vs EN 23,0% (n=244); W6 ID 16,7% (n=342) vs EN 18,9% (n=228); W3 ID 15,1% vs EN 13,2% — pola sama di dua bahasa.
Konsistensi antar channel (channel dengan ≥6 judul di wilayah itu; breakout wilayah > breakout channel itu sendiri): **W4 16/23, W6 13/21**, W5 4/7, W3 5/12, W1 2/4.

Potongan tambahan (selingan saja, n=1.404):
| Potongan | n | breakout | CI |
|---|---|---|---|
| Judul daftar "3 …/These 3 …" | 50 (9 channel) | 30,0% | 18–42% (hampir semua KamusUnik) |
| Bukan daftar | 1.354 | 18,1% | 16–20% |
| Ada kata kematian/pembunuhan/korban | 77 | 20,8% | 12–30% |
| Tanpa kata kematian | 1.327 | 18,4% | 16–21% |
| Klenik/hantu/angker/ritual | 98 (15 channel) | 17,3% | 10–24% |
| Non-klenik | 1.306 | 18,6% | 17–21% |
| Memuat kata Indonesia/tempat ID | 212 (8 channel) | 14,2% | 10–19% |
| Tanpa kata Indonesia | 1.192 | 19,3% | 17–21% |
| W4 bisnis/desain gagal (bangkrut, merek, skandal, "$") | 49 | 24,5% | 12–37% |
| W4 kecelakaan/bencana fisik | 309 | 21,7% | 17–26% |
Terbaca [INFERENSI]: (a) klenik **tidak** memberi premi — hanya baseline, tetapi ekornya ekstrem (lihat KamusUnik 104×), jadi tidak ada alasan memakainya; (b) kematian tidak mendongkrak maupun menurunkan views; (c) "memuat kata Indonesia" sedikit di bawah baseline karena berasal dari 8 channel kecil dan daftar generik; tempat Indonesia menang bila ada **kontradiksi/dalang**, bukan sekadar "tempat Indonesia" (bagian 3).

### Bingkai pilar × wilayah (jawaban pertanyaan 2) [UKUR]
| Segmen | n | breakout | CI 95% |
|---|---|---|---|
| Semua judul, ada lensa | 1.317 | 20,1% | 18–22% |
| Semua judul, tanpa lensa | 5.747 | 16,8% | 16–18% |
| **Selingan (5 wilayah) ada lensa** | 202 | **24,8%** | 19–31% |
| Selingan tanpa lensa | 1.202 | 17,5% | 15–20% |
| W4 lensa / tanpa | 64 / 294 | 23,4% / 21,8% | 14–34 / 17–27 |
| W6 lensa / tanpa | 73 / 497 | 23,3% / 16,7% | 14–34 / 14–20 |
| W5 lensa / tanpa | 23 / 99 | 34,8% / 16,2% | 17–57 / 9–23 |
| W1 lensa / tanpa | 13 / 81 | 46,2% / 17,3% | 23–77 / 10–26 |
| W3 lensa / tanpa | 29 / 231 | 13,8% / 14,3% | 3–28 / 10–19 |
Pembacaan: lensa menaikkan breakout di W6, W5, W1 (n kecil, selang lebar) dan netral di W4, W3. Tetapi median lensa vs non-lensa per channel hanya unggul di **10 dari 19** channel (mis. KamusUnik, KokBisa, TheInfographicsShow, SmartNonsense justru lebih rendah). Jadi: **bingkai pilar tidak merugikan dan kemungkinan membantu, tetapi bukan jaminan** — pembedanya tetap hook dan eksekusi.

Bukti judul untuk bingkai "alasan asli di balik peristiwa/tempat terkenal" (breakout tertinggi dengan lensa di selingan):
- 73,7× Ngomongin Uang: "Tanpa Sadar, Ternyata Ada Warisan Kolonialisme Belanda di Budaya Kemerdekaan Kita" (panjat pinang) — W6 + lensa.
- 33,3× TheB1M: "Why LA is Becoming a SPONGE City"; 15,0× GeographyNow: "Why is Brunei even a country?" — W6 "kenapa tempat itu ada begini".
- 12,6× Ngomongin Uang: "Suramadu Gagal Angkat Ekonomi Madura — Ini Sebabnya!" — W4 proyek terkenal Indonesia + sebab.
- 20,5× TheB1M "This DOOMED Dam…", 12,8× "Japan's $40BN Mega-Airport is SINKING" — W4 benda besar + kegagalan.
- 21,2× TaksakaSeta "Misteri Kematian Gajah Mada… benarkah sakit atau dibunuh?" — tokoh terkenal + kontradiksi dua versi sumber.
- Pemenang lensa terlemah: W3 (misteri) — "kenapa" tidak relevan karena daya tariknya bukan penjelasan.
Pembanding tanpa lensa yang juga menang: MrBallen kisah pendek yang berakhir "tidak ada yang tahu sampai sekarang" (W3, 21×) dan MentourPilot berita kecelakaan hari itu (10,9×) — format berita/kisah yang tidak bisa kita tiru (kita tidak punya akses pasokan peristiwa baru; kisah MrBallen bergantung pada narator).

### 10 judul teratas per wilayah (rasio terhadap median channelnya; tanpa channel berita)
Tanda (!) = label kata kunci meleset, hanya untuk transparansi.
**W3 Misteri:** 103,9× KamusUnik "3 Danau Penuh Misteri Di Indonesia"; 40,4× KTJ "Saat Om Hao Jadi Incaran" (rekaman ritual/klenik); 30,8× SimpleHistory "Afghanistan Is Easy To Invade, Difficult To Control" (!); 26,4× KamusUnik "3 Indonesian Tribes Synonymous with the Mystical World"; 21,4× MrBallen "How He Solved An 11-Year Cold Case"; 20,0× KTJ "Fadi diincar sosok ini"; 18,6× KamusUnik "Gunung Paling Angker di Indonesia"; 17,8× KTJ "Kalo ga sama @Ghost_Ranger…"; 15,5× KamusUnik "3 Most Haunted Roads"; 15,5× KamusUnik "These Ancient Weapons Are Still Used Today" (!).
**W4 Fatal/bencana:** 727,3× LogicallyAnswered "GoPro Is Going Bankrupt?" (pencilan, 8 jt views, satu channel median 11 rb); 38,8× MrBallen "I Failed Navy SEALS Training 4 Times" (!); 26,4× KamusUnik "3 Cities Predicted to Sink"; 21,7× KamusUnik "Aircraft Carrier Can Sail 20 Years" (!); 20,5× TheB1M "DOOMED Dam"; 13,9× MrBallen "How BlockBuster Accidentally RUINED Her Life"; 12,8× TheB1M "Mega-Airport is SINKING"; 12,8× NileRed "I accidentally killed this magnet" (!); 12,6× Ngomongin Uang "Suramadu Gagal Angkat Ekonomi Madura"; 10,9× MentourPilot "Airplane Crashes into Cars in Miami!".
**W5 Sains gelap:** 35,7× KamusUnik "3 Villages Forbidden to Make Ogoh-ogo" (!); 19,1× RealLifeLore "How a US B2 Bomber Bombed Afghanistan from Missouri"; 17,1× TheB1M "Dismantling a NUCLEAR Reactor"; 15,9× RealLifeLore B-1 Syria; 12,3× SimpleHistory fallout shelter; 11,4× JohnnyHarris "How a nuclear bomb really works"; 11,1× TheB1M "Britain's $57BN Nuclear NIGHTMARE"; 10,2× JohnnyHarris "Russia's nuclear threats"; 8,6× RealEngineering "The Forbidden Alloy of WW2"; 7,8× TheHistoryGuy "Life Saving Invention". Nyaris tidak ada "eksperimen gelap" sungguhan di daftar; pemenangnya nuklir/militer sebagai benda.
**W1 Peristiwa luar biasa:** 33,2× RealEngineering "F-35 … Incredible" (!); 33,0× SimpleHistory "B-17 – Landing Survival Is NOT Guaranteed"; 17,0× FoodTheory "I Saved MrBeast $1,000,000" (!); 8,8× HowRidiculous (!); 7,7× SimpleHistory "Could You Survive the Marines' Underwater Tunnel Challenge?"; 6,9× RealEngineering; 6,1× RaymondChins (!); 5,3× MrBallen "She Broke The Most IMPOSSIBLE World Record" (kisah wanita melakukan operasi caesar pada dirinya sendiri); 5,1× FascinatingHorror "The Unluckiest Survivor"; 5,0× RealLifeLore (!). Pemenang sungguhan hanya MrBallen dan FascinatingHorror; selebihnya salah label.
**W6 Sejarah/tempat:** 73,7× Ngomongin Uang panjat pinang/warisan Belanda; 37,2× KamusUnik "Negara ini sudah ada MBG dari Dulu"; 34,1× KamusUnik "3 Most Dangerous Rivers in Indonesia"; 33,3× TheB1M "LA SPONGE City"; 29,5× KamusUnik "3 Indonesian Tribes Most Feared by Dutch"; 26,6× HowRidiculous (!); 24,9× TaksakaSeta "Candi-candi di Nusantara" (8 detik); 24,8× JerryRig (!); 21,7× KamusUnik "Makanan Pedas Terlarang"; 21,3× NihongoMantappu museum matematika (!).

## 3. Apa yang membedakan menang vs kalah di channel yang sama (transkrip, 37 video) [UKUR dari transkrip; tafsiran = INFERENSI]
| Wilayah | Channel | Menang | Kalah | Pembeda |
|---|---|---|---|---|
| W3 | MrBallen | "Strangest Missing Persons Case" 6,7× (147 dtk, kasus Timothy Molnar; "…frozen inside of a block of ice" tanpa sebab ditemukan), "Cold Case" 21× (179 dtk; akhir "to this day no one has any idea of what happened to David Lewis") | **Dyatlov Pass** 0,27× dan 0,21× (53–56 dtk; "Official cause of death, unknown compelling force") | Menang = **kasus belum terkenal + detail konkret + akhir tak terjawab**; kalah = kasus yang sudah dipakai semua channel, diringkas pendek |
| W3 | KTJ | rekaman ritual lapangan 40× ("ada tiga sosok…") | rekaman serupa 0,73× | Bukan skrip; konten klenik yang tidak bisa diverifikasi. Ekor ekstrem tapi tak terulang. Tidak cocok ditiru |
| W3 | Detektif Astral | "Tembok Yajuj Majuj di Papua? Real atau HOAX?" 10,6× (41 dtk: "benar enggak sih ada tembok di dasar laut Papua… ternyata berita hoaks sejak 2011") | "Siapa Zodiac Killer sebenarnya?" 0,35× (narasi "aku ngerasa… vision", bukan fakta) | Menang = **pertanyaan yang sudah ditanyakan penonton + jawaban cek fakta**; kalah = teori pribadi/paranormal |
| W4 | TheB1M | "DOOMED Dam" 20,5× (33 dtk: "what do you do with a dam that is certain to fail?… cacat beton… dibangun ulang 70 m di hilir"); "Mega-Airport SINKING" 12,8× (43 dtk: "turun 50 cm/tahun… lapisan lempung… permukaan laut 2067") | Grenfell 0,47× (108 dtk, 72 korban, ajakan menonton video panjang); Three Mile Island 0,26× | Menang = **satu benda besar, satu angka, satu sebab teknis, tanpa korban jiwa, 33–43 dtk**; kalah = tragedi korban jiwa + promosi video panjang |
| W4 | MentourPilot | kecelakaan baru 10,9× ("looks absolutely terrifying, but what happened and how was it possible?") | Vajont 0,07× ("a story about what happens when nature gives clear warnings") | Menang = **peristiwa hari itu**; kalah = sejarah panjang, moral di akhir |
| W4 | Ngomongin Uang | Suramadu 12,6× (99 dtk: "Kok bisa gitu ya?… kemiskinan Sampang 20,61% vs Surabaya 3,56%… investor lari ke Gresik") | "Bagaimana bencana dinyatakan bencana nasional" 0,21× (wawancara, 72 dtk) | Menang = **proyek terkenal yang gagal + angka kontras + sebab**; kalah = wawancara/penjelasan prosedur tanpa kontras |
| W4 | KamusUnik | "3 Lokasi yang Dilarang Dilewati Pesawat" 10,8× (39 dtk, daftar 3 dengan "nomor terakhir paling ditakuti pilot") | "3 Rumah Adat Tahan Gempa" 0,48× | Daftar yang menutup dengan yang paling mengagetkan menang; daftar kebanggaan tanpa ketegangan kalah |
| W6 | TaksakaSeta | "Misteri Kematian Gajah Mada" 21× (29 dtk: "benarkah sakit atau dibunuh? Nagarakretagama vs Kidung Sunda") | "Sejarah Lengkap Majapahit" 0,18× (10 dtk, kosong), "Sejarah Kejayaan Jaka Tingkir" 0,18× | Menang = **satu tokoh + dua sumber yang bertentangan**; kalah = ringkasan sejarah generik |
| W6 | KokBisa | "Perang Ini Cuma Berlangsung 40 Menit" 19,6×; "Hukuman Paling Ngeri" 11,9× | "Sejarah itu bukan ditulis oleh pemenang…" 0,26× (opini panelis), "Mau ngubah apa dari kota kita" 0,31× (acara) | Menang = **fakta ekstrem yang dapat digambar**; kalah = opini/acara |
| W6 | KamusUnik | "Negara ini sudah ada MBG dari dulu" 37× (34 dtk, tautan ke berita hari ini) | "3 Daerah yang Pernah Jadi Ibu Kota RI" 0,45× | Menang = **kaitan ke isu yang sedang ramai + teka-teki**; kalah = fakta datar |
| W6 | GeographyNow | "Why is Brunei even a country?" 15× (160 dtk) | "What is the leaf of Egypt?" 0,05× | Menang = pertanyaan "kenapa ada begini"; kalah = penjelasan peta yang tak ada pertanyaannya |
| W1 | MrBallen / FascinatingHorror | wanita operasi caesar sendiri 5,3× ("only woman ever…"), "The Unluckiest Survivor" (selamat dari Hiroshima lalu Nagasaki) 5,1× | "Harrison Ford SAVED kid's life" 0,21× (obrolan podcast), "Survived 60 HOURS underwater" 0,34×, "Man who almost saved Lincoln" 0,40× | Menang = **rekor/fakta yang tidak bisa dipercaya dalam satu kalimat**; kalah = format obrolan atau tokoh tak dikenal |
| W5 | JohnnyHarris / TheB1M | "How a nuclear bomb really works" 11× (114 dtk, ada benda di tangan); "Dismantling a NUCLEAR reactor" 17× | "Kim Jong Un's trash bomb" 0,19× (berita sesaat), "Nuclear fusion mega build" 0,28× (promosi hadiah) | Menang = **cara kerja benda yang menakutkan**; kalah = berita tren atau promosi |
**Pola lintas wilayah (konsisten dengan V2):** (1) pemenang membuka dengan **benda/peristiwa konkret + pertanyaan atau angka** di detik 0, bukan tema; (2) satu sebab/dalang/kontradiksi yang jelas; (3) 30–45 dtk untuk sebab teknis, hingga 150+ dtk hanya untuk kisah yang punya akhir tak terduga (MrBallen); (4) yang kalah: kasus yang sudah dipakai semua orang, wawancara/panel, opini, promosi video panjang atau hadiah, tragedi korban jiwa dengan moral di akhir.

## 4. Permintaan pencarian Indonesia (autocomplete, 98 seed, 810 saran) [UKUR]
Autocomplete bukan volume pencarian; hanya menunjukkan frasa yang diketik orang. Pola kuat:
- **"kenapa [tempat/proyek]" nyata ada:** kenapa Pulau Madura susah maju; kenapa jembatan Suramadu ditutup; kenapa pulau Jawa dan Bali tidak ada jembatan; kenapa bandara Kertajati sepi; kenapa bandara Kemayoran ditutup; kenapa stasiun Karet ditutup; kenapa stasiun Manggarai angker; kenapa candi terkubur; kenapa Candi Prambanan hancur; kenapa tol Cipularang sering terjadi kecelakaan; kenapa kereta bisa anjlok/tabrakan; kenapa gedung tidak ada lantai 4 dan 13; kenapa Menara Pisa miring; kenapa gunung meletus ada petir; kenapa Krakatau meletus/bisa beranak; kenapa Danau Toba berombak; kenapa Pulau Natal milik Australia; kenapa Pulau Sentinel berbahaya; kenapa Belanda menanam asam jawa; kenapa Belanda tidak punya penjara; kenapa Jepang menjajah Indonesia.
- **"kenapa [perusahaan] bangkrut"** sangat produktif: Blackberry, Transmart, Tupperware, Bukalapak, VOC, Nokia, KFC, Upnormal, Donkey.
- **Proyek mangkrak:** Meikarta, IKN, Sentul, "proyek mangkrak di Indonesia/Jakarta".
- **Tragedi Indonesia yang diketik:** Bintaro, Sampit, KM 50, Kanjuruhan, Poso, Trisakti, Mei 98, G30S, "penyebab tragedi Sampit/Poso/Bintaro/kereta Bekasi/Chernobyl", Lumpur Lapindo (masih muncul "2026", "sekarang").
- **Misteri:** kota hilang Saranjana, kota hilang di Palu, kapal hantu, pulau terlarang di Indonesia, tempat angker di Indonesia, MH370, kasus Mirna, kasus Vina Cirebon, "sejarah yang disembunyikan Indonesia". Banyak saran memuat nama kreator **Nadia Omara, Nessie Judge, Kamar Jeri** → ruang ini sudah dikuasai kreator besar dan paling padat kompetitor [UKUR; tafsir = INFERENSI].
- Seed tanpa saran: "eksperimen mengerikan", "penemuan tidak sengaja", "kenapa pesawat hilang", "keputusan fatal" (hanya drama) → **W5 dan "keputusan fatal" generik hampir tanpa permintaan Indonesia** [UKUR].
- **Kontaminasi:** banyak saran palsu (lagu karaoke, drama China "dracin", game Roblox/Minecraft); filter manual wajib.
Sinyal ID untuk W4/W6 lebih kuat daripada W3/W5 untuk konten berbingkai "kenapa", dan W3 dikuasai kreator besar.

## 5. Risiko [INFERENSI kecuali dinyatakan]
| Wilayah | Kecocokan diorama 3D | Ad-suitability | Verifiabilitas | Catatan |
|---|---|---|---|---|
| W4 bencana/kegagalan struktur & proyek | **Tinggi** (jembatan, bandara, bendungan, kapal, gedung) | Sedang: bencana dengan korban jiwa dapat dibatasi iklannya; kegagalan benda/proyek tanpa korban lebih aman | Tinggi (laporan investigasi, putusan, data resmi) | Prioritaskan benda/proyek tanpa korban dulu |
| W6 sejarah/tempat | **Tinggi** (candi, kota, pulau, peta) | Sedang: kolonialisme/perang/G30S/Mei 98 sensitif (politik, SARA) | Sedang–tinggi bila ≥2 sumber, tapi sejarah politik rawan | Hindari topik yang masih sengketa politik |
| W3 misteri/kasus | Rendah–sedang (orang, pembunuhan, mayat) | Rendah: kekerasan/kematian orang nyata, korban tak dapat membela diri | Rendah: teori vs fakta, banyak klenik | Dikeluarkan dari 30% |
| W5 sains gelap | Sedang (benda, alat) | Sedang (nuklir/perang) | Tinggi bila literatur | Sesekali, tanpa harapan khusus |
| W1 peristiwa luar biasa | Rendah (orang) | Sedang | Sedang | Sesekali; hanya yang ada rekor/dokumen resmi |
- **Klenik tak terverifikasi** (KTJ, "kota gaib Saranjana", "suku gaib"): ekor views memang ada (hingga 104×) tapi rata-rata hanya baseline (17,3%); langgar aturan kita (fakta/teori/spekulasi, ≥2 sumber). **Larang.** Detektif Astral memakai "scan energi" — bukan model.
- **Ad-suitability: BELUM DICEK di Help Center YouTube pada sesi ini.** Pedoman umum (dari pengetahuan sebelumnya): kematian/kekerasan/peristiwa sensitif terkini dapat berstatus iklan terbatas. Cek halaman "Advertiser-friendly content guidelines" sebelum produksi tragedi.
- **Orang nyata:** korban dan keluarga masih hidup (Kanjuruhan, Bintaro, KM 50, Vina, Mirna) → risiko pencemaran nama/dampak keluarga + sensitivitas hukum. Hindari kasus pidana yang masih bergulir.
- **Kebijakan "inauthentic content"** (V2 #3): selingan juga harus berbeda tiap episode, bukan cetakan template.

## 6. Rekomendasi
**Porsi ±30% (dari 10 video, 3):** 2 × Wilayah 4 + 1 × Wilayah 6. Pembagian disesuaikan setelah 10–20 video: bila W4 (benda/proyek gagal) < baseline kita, ganti dengan pilar.
**Aturan bingkai selingan** (turunan data, bukan jaminan):
1. Mulai dari **benda/tempat/proyek/peristiwa yang dikenal penonton ID**, bukan tema ("bencana", "misteri").
2. Judul/hook = pertanyaan atau kontradiksi: "Kenapa X? Ternyata Y", "X gagal — ini sebabnya", "benarkah A atau B?" (dua sumber yang bertentangan seperti Gajah Mada).
3. **Satu dalang/sebab teknis** dan **satu angka kontras** (50 cm/tahun, 20,61% vs 3,56%).
4. Prioritaskan **tanpa korban jiwa**: kegagalan benda/proyek/merek (Suramadu, Kertajati, Meikarta, bendungan, jembatan) sebelum tragedi manusia.
5. Dilarang: klenik, kasus pidana yang masih berjalan, mengulang kasus yang semua channel sudah ulang (Dyatlov), format wawancara/opini, promosi video panjang di Shorts.
6. Durasi: 35–60 dtk untuk sebab teknis; lebih panjang hanya bila ada akhir tak terduga.
7. Format daftar "3 …" menunjukkan breakout 30% (n=50, hampir semua satu channel, KamusUnik) → hanya bila ada yang paling mengejutkan di nomor 1; **tidak** menggantikan cerita.
**Uji di channel sendiri:** seri 6 video selingan (3 W4, 2 W6, 1 W3 sebagai kontrol bila tetap mau menguji); bandingkan stayed to watch dan rasio terhadap pilar. Satu-satunya cara memastikan.

## 7. Bank ide selingan (semua **BELUM DICEK**; 🔎 = ada di autocomplete YouTube ID)
Lolos ke shortlist hanya bila: benda/tempat dikenal, ada sebab/dalang tak tertebak, ≥2 sumber, bisa didiorama, tanpa klenik.
**W4 Keputusan fatal / kegagalan (proyek, benda, merek)**
1. 🔎 Kenapa jembatan Suramadu gagal mengangkat Madura (sudah dibuktikan di Ngomongin Uang 12,6×; angle baru: keputusan tol/akses) — bukan salin, cari sudut lain.
2. 🔎 Kenapa Bandara Kertajati sepi (keputusan lokasi, akses tol/kereta).
3. 🔎 Kenapa Bandara Kemayoran ditutup (keputusan pemindahan ke Soekarno-Hatta).
4. 🔎 Meikarta: proyek apartemen yang mangkrak — keputusan apa yang membuatnya begitu.
5. 🔎 IKN / proyek mangkrak lain di Indonesia — hanya bila ada dokumen resmi, hindari politik.
6. 🔎 Kenapa tidak ada jembatan Jawa–Bali (keputusan, biaya, dan Selat Bali).
7. 🔎 Kenapa stasiun Karet ditutup.
8. 🔎 Kenapa Menara Pisa miring dan bagaimana ditegakkan.
9. 🔎 Kenapa Titanic tenggelam (hanya bila ada sudut baru: keputusan yang jarang dibahas).
10. 🔎 Kenapa Blackberry bangkrut (keputusan satu hal).
11. 🔎 Kenapa Nokia bangkrut / Tupperware bangkrut / Bukalapak / Transmart (pilih satu dengan dokumen jelas).
12. 🔎 Kenapa VOC bangkrut (korupsi? utang? — cek sumber).
13. Bendungan berbahaya dibangun ulang (EN pemenang TheB1M "Paradise Dam") — cari padanan Indonesia: bendungan/situ yang jebol (Situ Gintung, 2009) [BELUM DICEK].
14. Bandara yang tenggelam: Kansai (EN 12,8×) — versi Indonesia: penurunan tanah Jakarta/Semarang dan tanggul laut [BELUM DICEK].
15. 🔎 Kenapa kereta bisa anjlok (satu kasus nyata dengan laporan KNKT) — tanpa fokus korban.
16. 🔎 Kenapa tol Cipularang sering kecelakaan (desain tikungan dan turunan).
17. 🔎 Lumpur Lapindo: sampai sekarang apa yang masih terjadi (hanya fakta putusan/penelitian).
**W6 Sejarah terlupakan / tempat aneh**
18. 🔎 Sejarah kelam panjat pinang (sudah 74× di Ngomongin Uang — jangan ulang; cari padanan: lomba 17-an lain asal-usul Belanda).
19. 🔎 Kenapa Belanda menanam asam jawa di pinggir jalan.
20. 🔎 Kenapa Belanda tidak punya penjara? (cek klaim; mungkin mitos).
21. 🔎 Kenapa candi bisa terkubur (Borobudur/Prambanan: abu vulkanik atau tanah?).
22. 🔎 Kenapa Candi Prambanan hancur (gempa atau pemindahan penduduk).
23. 🔎 Kenapa Pulau Natal milik Australia.
24. 🔎 Kenapa Pulau Sentinel dilarang dikunjungi (hukum India, risiko penyakit; hindari sensasi).
25. 🔎 Kenapa gedung tidak ada lantai 4 dan 13 (budaya, bukan klenik — tegaskan).
26. 🔎 Kenapa Danau Toba berombak / terbentuk dari letusan (sains, bukan legenda).
27. 🔎 Kota hilang di Palu: likuifaksi Petobo (fakta geologi; sensitif korban) — hati-hati.
28. Gajah Mada: sakit atau dibunuh — dua sumber (TaksakaSeta 21×); angle baru pada tokoh lain dengan dua versi sumber [BELUM DICEK].
29. 🔎 Kenapa Krakatau punya anak (Anak Krakatau) dan 1883 letusan berdampak global.
30. 🔎 Kenapa Jepang menjajah Indonesia (hanya bila ada sudut tak tertebak yang bisa diverifikasi).
**W5 / W1 / W3 (sesekali)**
31. Kenapa "Fallout shelter"/bunker di Indonesia ada (cek kasus nyata) [BELUM DICEK].
32. 🔎 Bom atom: bagaimana Hiroshima/Nagasaki kembali dihuni (EN: "Why Hiroshima and Nagasaki Don't Look Like Chernobyl") [BELUM DICEK].
33. 🔎 Kenapa gunung meletus ada petir (sains yang bisa digambar) [BELUM DICEK].
34. W1: pria yang selamat dari Hiroshima lalu Nagasaki (FascinatingHorror 5,1×) — cari padanan dengan dokumen kuat [BELUM DICEK].
35. W3 kontrol uji: kasus misteri lokal yang sudah terpecahkan, dengan dokumen pengadilan, bukan klenik [BELUM DICEK].
36. 🔎 Kenapa pesawat tidak boleh melintas di atas lokasi tertentu (KamusUnik 10,8×) — cek klaim (Tibet, Buckingham, Mekah) sebelum dipakai [BELUM DICEK].

## 8. Yang belum diketahui
- Performa selingan **di channel kita sendiri** (nol video diterbitkan di pilar baru).
- Ad-suitability resmi, belum dibaca.
- Efek channel besar pada perbandingan (Vsauce/NileRed sangat berbeda dari Shorts dokumenter kita).
- Komentar penonton selingan tidak diambil.
- Label kata kunci kasar; W1/W5 sampel kecil; TaksakaSeta (194 dari 570 baris W6) menarik rata-rata W6.
File data: `data_selingan_channels.jsonl`, `autocomplete_selingan_id.json`. Skrip dan transkrip mentah ada di scratchpad `selingan/` (`analyze.py`, `extra.py`, `transcripts.json`, `labeled.json`).
