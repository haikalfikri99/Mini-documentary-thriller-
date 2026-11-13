# Riset Struktur Script — pemenang vs gagal di channel yang sama (13 Nov 2026)
Tujuan: menguji Formula ARSIP v4 (`.claude/skills/arsip-kasus/references/1-cerita-dan-script.md` bagian F) dengan pola **struktur dan narasi** Shorts nyata. Data mentah per video: `data_struktur_script.csv` (66 baris; kolom `dikecualikan` menandai yang tidak dipakai).
Konteks: `KEPUTUSAN_RISET.md` dan `RISET_NICHE_V2.md` sudah menunjukkan **topik/bingkai** membedakan pemenang. Di sini ditanya: apakah **bentuk script**-nya juga membedakan?

## 0. Jawaban singkat
**Hampir semua ukuran struktur (durasi, jumlah kata, kata/dtk, waktu jawaban, jumlah pertanyaan, "kamu") TIDAK membedakan top dari bottom di dalam channel yang sama** (korelasi peringkat dalam-channel |ρ| ≤ 0,10 kecuali waktu payoff ρ = 0,30). Yang membedakan: **pola kalimat pertama** (benda/klaim langsung vs sapaan/cerita tanpa pegangan) dan **jenis penutup** (punchline atau pertanyaan ke penonton vs berhenti begitu saja atau CTA). Formula v4 sebagian besar dikonfirmasi; tiga angka perlu dikoreksi (bagian 6).

## 1. Data dan batasan (baca dulu)
| Langkah | Jumlah |
|---|---|
| Dipilih (4 top + 3 bottom per channel, rasio views ÷ median channel, dari `data_shorts_per_channel.jsonl` + `data_selingan_channels.jsonl`) | 78 video, 12 channel |
| Transkrip berhasil (Apify `johnvc/YoutubeTranscripts`, 2 run, di bawah batas $0,8) | 66 |
| Gagal (tidak ada transkrip en/id) | 12: **FactTechz semua (7)**, Zack "Electrical Outlets", KamusUnik 1, LogicallyAnswered 1, TaksakaSeta 1, AlamSemenit 1 |
| Dikeluarkan: sponsor/promo | 7: SmartNonsense (Indeed), KokBisa (iklan Promag; promo Future Makers), NgomonginUang (3 promo ebook/produk sendiri + 1 sponsor Makmur) |
| Dikeluarkan: tanpa narasi / terlalu pendek | 5: HowRidiculous (4, hanya komentar stunt), TaksakaSeta 8 dtk (1 kalimat) |
| Dilabeli | 54 |
| Panjang (>90 dtk; TodayIFoundOut 120–180 dtk, dll.) — dilaporkan terpisah | 10 |
| **Set inti** (narasi, tanpa sponsor, ≤90 dtk) | **44 video: 28 top, 16 bottom, 9 channel; 8 channel punya pasangan top+bottom** |
Channel: SmartNonsense 6, ZackDFilms 6, KamusUnik 6, LogicallyAnswered 6, KokBisa 5, TaksakaSeta 5, TakTerdugaID 5, AlamSemenit 3, TodayIFoundOut 2. **NgomonginUang tidak punya bottom bersih** (semua bottom-nya promo), jadi hanya masuk sebagai video panjang.
**Keterbatasan:**
- Waktu kata diperkirakan dari segmen caption YouTube (kata diinterpolasi dalam segmen; galat ±0,5 dtk). Jeda hening tidak terlihat, jadi "kata/dtk saat bicara" = kata ÷ (kata terakhir − kata pertama) dan hampir sama dengan kata/durasi (2,54 vs 2,59).
- Caption otomatis KokBisa, LogicallyAnswered, AlamSemenit, Taksaka, TakTerduga **tanpa tanda baca** → panjang kalimat hanya n = 28 dari 44; jumlah pertanyaan dihitung tangan untuk video itu.
- Label (waktu inti/jawaban/payoff, pola hook, jenis penutup, tokoh/dalang) saya tentukan dengan membaca transkrip; definisi di bagian 2. Itu penilaian, bukan ukuran otomatis.
- TakTerdugaID, TaksakaSeta, dan sebagian AlamSemenit adalah narasi TTS berbasis template dengan views kecil (median channel 1,1 rb dan 4,3 rb); rasio "top" di sana berarti ±2–25× dari angka yang kecil. Saya sertakan karena diminta, tapi bobotnya rendah.
- n kecil per sel. Tidak ada uji signifikansi; yang dilaporkan: median, jumlah, dan konsistensi arah di channel berpasangan.

## 2. Definisi operasional
- **Durasi / kata**: durasi video dari metadata; kata dari transkrip tanpa tag [musik].
- **Kata/dtk**: bicara = kata ÷ (akhir kata terakhir − awal kata pertama); total = kata ÷ durasi.
- **Akhir kalimat 1**: waktu akhir kalimat pertama (tanda baca; untuk video tanpa tanda baca ditentukan dari jeda frasa pertama).
- **t_inti**: kapan benda/klaim/pertanyaan inti pertama terucap (hampir selalu 0 dtk).
- **t_jawaban**: awal kalimat tempat penjelasan "kenapa/bagaimana" dimulai (bukan konteks). **t_payoff**: awal kalimat yang membawa fakta puncak/pembalik/akhir cerita. Keduanya % dari durasi.
- **Penutup**: PUNCH (fakta/punchline pembalik), Q (pertanyaan ke penonton), ADV (nasihat/peringatan satu kalimat), CTA (subscribe/like/komentar/share), LOOP (menyambung ke kalimat pertama), CLIFF (menggantung), RES (hanya selesai/hasil cerita), SIGN ("dan seperti biasa terima kasih").
- **Tokoh**: orang atau pelaku bernama atau diperankan. **Dalang**: pelaku yang dipersalahkan atau otak di balik fakta (presiden AS di mitos piranha, Belanda di panjat pinang, pendiri GoPro).
- **Pola hook**: OBJ (benda/merek dikenal + klaim: "This is a knuckleball."), KLAIM (pernyataan mengejutkan), ACTION (in medias res), Q (pertanyaan), WARN (peringatan), LIST ("Inilah tiga..."), STORY (pengantar tokoh/kronologi), FACT (pernyataan fenomena tanpa benda dikenal), HIPOTESIS.

## 3. Ringkasan angka (set inti, n = 44)
| Ukuran | Top (n=28) | Bottom (n=16) | Berpasangan (top > bottom, di channel yang punya keduanya) |
|---|---|---|---|
| Durasi, median (dtk) | 47 | 50 | 4/8 |
| Kata, median (IQR) | 131 (95–157) | 113 (97–130) | 4/8 |
| Kata/dtk saat bicara | 2,62 | 2,42 | 5/8 |
| Akhir kalimat 1 (dtk) | 3,7 (n=25) | 3,7 (n=12) | 4/7 |
| Kata dalam 3 dtk pertama | 8 | 8 | — |
| Kalimat 1 selesai ≤ 3 dtk | 10/25 | 5/12 | — |
| Kalimat 1 selesai ≤ 2 dtk | 4/25 | 2/12 | — |
| t_inti (dtk) | 0,0 | 0,1 | — |
| t_jawaban, % durasi | 17 (16 dari 23 ≤ 25%) | 17 (8 dari 12 ≤ 25%) | 3/6 |
| t_payoff, % durasi | 66 (IQR 55–80) | 76 (IQR 65–80) | 4/7 |
| Pertanyaan eksplisit, median | 1 | 0,5 | 4/8 |
| "kamu/you/kalian" per 100 kata | 0,25 | 0,75 | **2/8** |
| Ada angka | 12/28 | 8/16 | — |
| Ada tokoh | 10/28 (36%) | 4/16 (25%) | — |
| Ada dalang | 5/28 (18%) | 2/16 (13%) | — |
| Panjang kalimat, median (kata; hanya video berpungtuasi) | 11 (n=19) | 12 (n=9) | — |
| CTA di tengah video (list "3 ...") | 3 | 1 | tak berbeda |
Korelasi peringkat dalam-channel (rasio vs ukuran; n=39 kecuali dicatat): durasi −0,02 · kata −0,03 · kata/dtk +0,10 · akhir kalimat 1 −0,04 (n=28) · t_jawaban +0,05 (n=31) · **t_payoff +0,30 (n=29)** · pertanyaan +0,08 · "kamu" +0,09.
Pembagian kecepatan bicara (set inti): <2,3 kata/dtk: n=12, 6 top, median rasio **1,2×** · 2,3–2,7: n=14, 10 top, **12,6×** · >2,7: n=18, 12 top, **6,6×**. (Dikacaukan channel; lemah.)
Per bahasa (set inti): EN 2,81 kata/dtk (n=22, median 42 dtk, 119 kata); ID 2,37 (n=22, 52,5 dtk, 117 kata). ID manusia yang menang: KokBisa top 2,5–2,6; KamusUnik 2,3–2,5. VO kita: #001 2,15 · #002 2,28.

## 4. Tabel per channel (set inti)
| Channel | Top: durasi/kata/kata-dtk/%jawab/%payoff | Bottom: sama | Hook top → bottom | Penutup top → bottom |
|---|---|---|---|---|
| SmartNonsense (4 vs 2) | 62 dtk / 186 / 2,9 / 31 / 93 | 46 / 114 / 2,4 / 34 / 83 | OBJ,OBJ,Q,OBJ → FACT,FACT | punch/loop/recap lalu tagline subscribe → fakta lalu tagline subscribe |
| ZackDFilms (3 vs 3) | 31 / 97 / 2,9 / 41 / 80 | 35 / 107 / 2,7 / 43 / 79 | ACTION ×3 → ACTION, HIPOTESIS, ACTION | RES, PUNCH, ADV → RES, RES, ADV |
| KamusUnik (4 vs 2) | 47 / 115 / 2,4 / 12 / 69 | 51 / 135 / 2,6 / 11 / 67 | KLAIM, LIST, LIST, WARN → LIST, LIST | Q, RES, RES, Q → RES, RES |
| LogicallyAnswered (4 vs 2) | 51 / 141 / 2,8 / 22 / 53 | 45 / 128 / 2,9 / 21 / 56 | Q, Q, KLAIM, OBJ → Q, STORY | PUNCH, CLIFF, ADV, PUNCH → PUNCH, RES |
| KokBisa (4 vs 1) | 59 / 154 / 2,6 / 20 / 65 | 85 / 259 / 3,0 / 20 / 89 | KLAIM, Q, Q, Q → Q | semua Q/ADV/WARN + "terima kasih" → CTA komentar |
| AlamSemenit (2 vs 1) | 60 / 141 / 2,3 / 20 / 51 | 59 / 95 / 1,8 / – / 51 | OBJ, WARN → STORY (mulai di tengah kisah) | RES, ADV → RES |
| TakTerdugaID (2 vs 3) | 38 / 81 / 2,1 / 24 / – | 55 / 109 / 2,0 / 14 / 76 | Q,Q → Q,Q,Q (sapaan "Hai sobat Wild...") | Q,Q → CTA,CTA,Q |
| TaksakaSeta (3 vs 2) | 21 / 49 / 2,4 / 50 / 55 | 18 / 43 / 2,3 / – / 20 | STORY, DEF, Q → STORY, STORY | RES,RES,CLIFF → RES,RES |
| TodayIFoundOut (2 top, 42 dtk) | 42 / 136 / 3,2 / 7 / 62 | (bottom semua 123–176 dtk, di luar set inti) | STORY, Q | RES, RES |
Video panjang (>90 dtk, n=10; ditampilkan karena kita tidak membuat video seperti itu): kata/dtk 2,0–3,5; jawaban di 6–28% durasi (kecuali Ngomongin beras 64%); tidak dianalisis lebih jauh.

## 5. Temuan yang bisa dipakai
### 5.1 Kalimat pertama: apa yang menang, apa yang kalah
| Pola | n (set inti) | Top | Median rasio | Contoh |
|---|---|---|---|---|
| OBJ benda/merek + klaim | 5 | **5/5** | 26,6× | "This is a knuckleball. Moving forward with zero spin, it's the hardest pitch to hit in baseball." (9,6 jt) · "This is ChatGPT. Every time you ask it something, it wastes water." (7,6 jt) · "This is the fancy pants Dyson bladeless fan, but it isn't actually bladeless." (6,7 jt) · "Remember GoPro... Well, they're getting annihilated." |
| KLAIM mengejutkan | 3 | 3/3 | 37,2× | "perang ini cuman berlangsung 40 menit, lebih pendek dari film-film bioskop" · "Ternyata Indonesia tiru program MBG dari negara ini" |
| WARN | 2 | 2/2 | 55,8× | "Jangan pernah datang sendirian ke tiga danau di Indonesia ini." |
| Q (pertanyaan) | 15 | 10/15 | 6,5× | "Benarkah piranha makan manusia?" (didahului "kalau lihat ikan ini di film-film...") |
| ACTION (in medias res) | 5 | 3/5 | 5,0× | "It swung down and smashed right into the toucan's upper beak." (3 pemenang Zack dan 2 bottom Zack sama-sama ACTION: hook tidak membedakan di Zack, topik yang membedakan) |
| STORY (pengantar tokoh/kronologi) | 6 | 2/6 | 0,35× | "Hari berikutnya kondisi Grab Kun..." · "Here's the story of how Brian Armstrong founded Coinbase" |
| FACT (fenomena, bukan benda dikenal) | 2 | **0/2** | 0,04× | "If you put a scorpion under a UV light, its whole body glows." · "This beach is glowing." |
| Sapaan template | 3 | 0/3 | 0,02–0,07× | "Hai sobat Wild, kalian tahu enggak sih..." |
Catatan: 4 dari 5 OBJ berasal dari SmartNonsense, jadi bukti OBJ = satu channel + GoPro. Arahnya konsisten dengan temuan sebelumnya (knuckleball, Dyson, 99 sen), tapi n kecil.
**Kalimat 1 selesai ≤ 2,0 dtk (aturan H1) hanya terjadi di 4 dari 25 pemenang (16%)**; median pemenang 3,7 dtk. Yang konsisten pada pemenang adalah **t_inti = 0**: benda/klaim inti terucap di kata pertama (25 dari 27 yang terukur ≤ 0,8 dtk; dua pengecualian: piranha 5,5 dtk setelah konteks "film-film", Portuguese man o war 4,6 dtk). Delapan kata dalam 3 dtk pertama, sama pada pemenang dan gagal.

### 5.2 Kapan jawaban dan payoff muncul
- Jawaban ("kenapa") dimulai median **17% durasi** (±8 dtk dari 47 dtk), IQR 10–25% pada pemenang; 16 dari 23 pemenang ≤ 25%. Cerita yang menunda penjelasan sampai >50% (Dyson 58%, knuckleball 51%, Zack telescope 51%) tersebar di pemenang dan gagal: tidak ada efek.
- Payoff/fakta puncak median **66%** pada pemenang (IQR 55–80), 76% pada gagal. Rentang pemenang lebar: 50% (AlamSemenit, Logically) sampai 89–96% (SmartNonsense: 99 sen 91%, Dyson "tapi mereka tidak bladeless" 96%). Hanya 10/25 pemenang jatuh di 60–80%.
- Pada kasus SmartNonsense, payoff yang jatuh di **kalimat terakhir** (Dyson, 99 sen, knuckleball "Almost nobody throws it anymore") dikaitkan dengan penutup PUNCH/LOOP; gagal berakhir dengan fakta tambahan lalu langsung tagline.

### 5.3 Penutup
| Penutup (label utama) | n | Top | Median rasio |
|---|---|---|---|
| PUNCH (fakta/punchline pembalik) | 6 | **5/6** | 17,1× |
| Q (pertanyaan ke penonton) | 8 | **7/8** | 15,8× |
| ADV (nasihat/peringatan satu kalimat) | 5 | 4/5 | 7,8× |
| LOOP/CLIFF/RECAP | 4 | 4/4 | 13,8–26,6× |
| RES (hanya selesai/hasil cerita) | 16 | 8/16 | 2,0× |
| CTA (subscribe/komentar/share sebagai penutup) | 8 | 3/8 | 0,14× |
- 3 "CTA" yang menang semuanya SmartNonsense: punchline atau loop **lalu** tagline "For more smart nonsense, subscribe." Dua gagalnya (scorpion, glowing beach) berakhir fakta datar lalu tagline. TakTerdugaID ("jangan lupa like dan subscribe") dan KokBisa lubang ("tulis di kolom komentar") gagal. Kesimpulan: CTA sebagai pengganti punchline merugikan; CTA setelah punchline tidak terbukti merugikan di satu channel.
- Pertanyaan ke penonton: KokBisa 4 dari 4 pemenang berakhir pertanyaan/peringatan + "dan seperti biasa terima kasih" ("kalau kalian sendiri dalam 40 menit kira-kira bisa ngapain aja"; "kalau menurut kalian mana hukuman yang paling ngeri"). KamusUnik: "Oh iya, apa nama danau di daerah kalian, Guys?" Pertanyaan konkret dan ringan, bukan "tulis di komentar".
- Nasihat bukan penyebab kalah: 4 dari 5 ADV menang (Doberman "kita menyakiti anjing tanpa alasan", Toyota "mobility for all", "jangan coba-coba ya", Tomcat "ia harus ditiup..."). Satu ADV gagal (Zack bliss point). Kalimat nasihat/peringatan **satu baris setelah pembalik** tampak aman; ADV sebagai ganti pembalik tidak diuji.

### 5.4 Tokoh/dalang, angka, "kamu", pertanyaan, panjang kalimat
- Tokoh: 36% pemenang vs 25% gagal; dalang 18% vs 13%. Pemenang tanpa tokoh mudah ditemukan (knuckleball, ChatGPT, Dyson, tukan, cookiecutter, Doberman, hybrid Toyota). Dalang muncul di pemenang yang bernada "anggapan dibalik" ID (piranha: presiden AS; panjat pinang: Belanda; GoPro: pendiri), tapi VW (perusahaan sebagai pelaku) berakhir di bottom.
- Angka: 43% pemenang vs 50% gagal. Tidak ada efek.
- "kamu/you": 0,25 vs 0,75 per 100 kata; 2/8 channel top > bottom. Pemenang jarang menyapa penonton langsung. Bottom yang tinggi: Zack telescope/bliss point ("you" 8–9 kali), sapaan template TakTerduga.
- Pertanyaan eksplisit: median 1 (rentang 0–3 pada pemenang; KokBisa 2–3 karena gaya caption). Tidak ada pemenang dengan rantai pertanyaan; "loop terbuka" mereka diwujudkan lewat "Why? Because", "Tapi", "Wait, zoom."
- Panjang kalimat: 11 vs 12 kata (hanya video berpungtuasi). SmartNonsense sering menumpuk 25–30 kata dalam satu kalimat dan tetap menang; jadi batas 12 kata adalah preferensi bahasa lisan, bukan syarat.

### 5.5 Kasus paired yang paling jelas
- **KamusUnik**: keenam video memakai template identik ("Inilah tiga ...", hitung mundur 3-2-1, CTA di tengah sebelum nomor 1), rasio 0,03–0,12× vs 37–119×. Pembeda = **sudut Indonesia + bahaya/misteri** ("tiga danau di Indonesia", ogoh-ogoh, MBG) vs "ritual kematian dunia", "makanan ekstrem". Struktur sama, hasil beda: konten/sudut mengalahkan struktur.
- **Zack**: ketiga pemenang aksi fisik hewan (28–38 dtk, 76–111 kata); tiga gagal: transplantasi ginjal, teleskop lebih cepat dari cahaya, food companies (psikologi/abstrak). Hook ACTION ada di kedua kubu; konsisten dengan "psikologi/abstrak kalah".
- **SmartNonsense**: pemenang lebih panjang dan padat (62 dtk, 186 kata, 2,9 kata/dtk) dari gagal (46 dtk, 114 kata, 2,4); gagal membuka dengan fenomena ("scorpion glows") dan memberi penjelasan buku pelajaran. Hanya channel ini yang menunjukkan perbedaan kepadatan; di 4 channel lain arahnya berlawanan atau datar.
- **Anomali sponsor**: NgomonginUang "Investasi mana yang cocok di tengah tekanan Rupiah?" (iklan jelas untuk platform Makmur) mencapai 565 rb views = **19,8×** median channel. Itu satu kasus, tapi melemahkan klaim "semua sponsor ada di dasar" (KEPUTUSAN_RISET bagian 4, butir 4). Tiga sponsor lain (Indeed, Promag, promo sendiri) memang di dasar.

## 6. Konfirmasi / koreksi untuk Formula v4
Label: **kuat** = konsisten di ≥ 2 sumber data atau ≥ 4 channel dan arah jelas; **lemah** = arah ada tetapi n kecil, satu channel, atau dikacaukan topik.

### Dikonfirmasi
| # | Aturan v4 | Bukti | Kekuatan |
|---|---|---|---|
| K1 | Pintu masuk = benda/merek dikenal + klaim di kata 1–3 (F3 beat 1, H2) | OBJ 5/5 top (26,6×), KLAIM 3/3, FACT tanpa benda dikenal 0/2, sapaan template 0/3; **t_inti ≈ 0** pada 25 dari 27 pemenang | **kuat** (arah) / lemah (OBJ n=5, 4 dari SmartNonsense) |
| K2 | Penutup punchline/fakta pembalik, bukan CTA | PUNCH 5/6 top (17×); CTA-pengganti 3/8 top (0,14×); Q 7/8 top | **kuat** untuk "jangan CTA sebagai penutup"; lemah untuk PUNCH vs Q mana lebih baik |
| K3 | Satu pertanyaan ringan dan konkret di akhir diperbolehkan | Q-ending 7/8 top, terutama KokBisa/KamusUnik (ID) | lemah (n=8, ID, ditambah "terima kasih" KokBisa) |
| K4 | "kamu" secukupnya, tidak wajib | pemenang 0,25 vs gagal 0,75 per 100 kata; top > bottom hanya 2/8 channel | **kuat** (tidak memaksa "kamu") |
| K5 | Tidak perlu rantai pertanyaan; jawaban tidak ditunda lama | pertanyaan median 1; jawaban dimulai median 17% | lemah |
| K6 | Durasi 35–60 dtk, 85–110+ kata | median pemenang 47 dtk, IQR 37–59; durasi tidak berkorelasi dengan rasio (ρ −0,02) | lemah (rentang aman, bukan optimum) |
| K7 | Tanpa sponsor/promo | 3 dari 4 sponsor/promo ada di dasar | lemah (1 pengecualian: Makmur 19,8×) |
| K8 | Kalimat pendek, satu kalimat satu gambar | median 11 kata pada pemenang | lemah (SmartNonsense menang dengan kalimat panjang) |

### Dikoreksi / diturunkan
| # | Aturan v4 | Temuan | Usul | Kekuatan |
|---|---|---|---|---|
| C1 | H1: kalimat hook selesai ≤ 2,0 dtk | hanya 4/25 pemenang (16%) memenuhi; median 3,7 dtk, sama dengan gagal | ganti "kalimat 1 selesai ≤ 3,5 dtk **dan** benda/klaim inti sudah terucap di 1,0 dtk pertama"; payoff kedua (taruhan pribadi) ≤ 3,0 dtk tidak punya pembanding di data, turunkan jadi target lunak | **kuat** (sebagai bukti bahwa 2,0 dtk bukan pola pemenang) |
| C2 | Anggaran kata = durasi × 2,2 (45 dtk ≈ 100 kata) | pemenang median **2,6** kata/dtk (EN 2,8; ID 2,4–2,6; KokBisa top 2,5–2,6; KamusUnik 2,3–2,5); video <2,3 kata/dtk median rasio 1,2× vs 12,6× pada 2,3–2,7 (n=12 vs 14) | target ID: **2,4 kata/dtk (rentang 2,3–2,7)**: 45 dtk ≈ 108 kata, 40 dtk ≈ 96, 55 dtk ≈ 132. Jangan di bawah 2,2. VO kita (2,15–2,28) ada di tepi bawah. Catatan: celah 20–25% tanpa kata untuk aksi/SFX tidak terukur dari caption | lemah (dikacaukan channel; TTS template menurunkan kelompok <2,3) |
| C3 | Twist di 65–75% durasi sebagai kewajiban (F3 beat 6) | median pemenang 66% (cocok), tapi rentang 50–96%; payoff di kalimat terakhir juga menang; hanya 10/25 pemenang di 60–80% | tulis sebagai **pusat 60–80%, boleh 50–95%**; yang penting ada satu pembalik jelas dan penutup tidak datar | lemah |
| C4 | Beat 3 "alasan asli dimulai" di 20–38% (9–17 dtk dari 45) | jawaban dimulai median 17% (≈ 8 dtk); 16/23 pemenang ≤ 25% | majukan ke **10–25% (4–11 dtk)**; setup (beat 2) cukup ≤ 6 dtk. Menunda penjelasan sampai >50% tidak dihukum maupun dihargai | lemah |
| C5 | V3 "ada tokoh/dalang/momen konkret" sebagai cek wajib | tokoh 36% pemenang vs 25% gagal; banyak pemenang tanpa tokoh (benda/mekanisme fisik) | jadikan **opsional**: wajib momen konkret/gambar, tokoh/dalang bila ceritanya memang punya | lemah |
| C6 | "Penutup bukan nasihat" (V4) | 4/5 ADV berupa satu baris setelah pembalik berada di top | ubah ke "bukan nasihat **sebagai pengganti** punchline; satu baris peringatan/komentar setelah pembalik boleh" | lemah (n=5) |
| C7 | "Tanpa CTA" mutlak | CTA tagline setelah punchline ada di 3 pemenang SmartNonsense | pertahankan larangan CTA sebagai penutup; tidak perlu dikejar lebih jauh | lemah |
| C8 | "Tanpa sponsor" dibenarkan karena semua sponsor di dasar | 1 sponsor (Makmur) 19,8× | tetap tanpa sponsor untuk identitas channel, tapi hapus klaim "terbukti selalu kalah" | lemah |

### Hal yang TIDAK bisa dikonfirmasi dari data ini
- R1 (loop terbuka berantai ≤10 dtk), R3 (re-hook 40–55%), R4 (loop tanpa jahitan): caption tidak menunjukkan visual; loop kalimat terakhir→pertama hanya terlihat 1× (Dyson).
- Jeda hening (H3) dan celah tanpa kata: tidak terukur.
- Apakah kecepatan lebih tinggi menaikkan retensi: data views, bukan retensi.

## 7. Saran pakai
1. Tulis script ID sekitar **2,4 kata/dtk** (bukan 2,2) dan jangan mengejar kalimat 1 ≤ 2 dtk; fokus pada "benda/klaim inti di kata 1–3".
2. Kalimat 1 jangan sapaan, jangan pengantar tokoh/tanggal; pola OBJ/KLAIM/WARN/Q-tentang-benda.
3. Mulai penjelasan di 10–25% durasi; taruh pembalik di 60–80% (boleh lebih akhir) dan akhiri dengan punchline atau pertanyaan konkret satu kalimat; hindari akhir yang hanya "hasil cerita" (RES: median rasio 2,0×) dan CTA sebagai penutup.
4. Jangan menambah "kamu" demi retensi; data tidak mendukung.
5. Uji di channel kita sendiri: satu variabel per video (kata/dtk 2,2 vs 2,5 pada hook sejenis; penutup PUNCH vs Q) agar klaim lemah di atas bisa dinaikkan atau dibuang.

## 8. Berkas
- `data_struktur_script.csv`: 66 baris, kolom: id, channel, grup, rasio, views, judul, lang, dur, kata, wps_bicara, wps_total, mulai_bicara, akhir_kalimat1, n_kalimat, kal_med_kata, berpungtuasi, t_inti, t_jawaban, t_payoff, pct_jawaban, pct_payoff, n_tanya (kosong = tidak terukur; beberapa dihitung tangan di laporan), n_kamu, kamu_per100, kita_per100, angka, tokoh, dalang, pola_hook, akhir, cta_tengah, kata_hook_3dtk, dikecualikan, panjang, catatan.
- Transkrip mentah dan skrip analisis ada di scratchpad sesi (`.../scratchpad/script/`), tidak di-commit.
