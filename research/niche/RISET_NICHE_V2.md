# Riset Niche v2 — keputusan pilar dengan data lebih besar (13 Nov 2026)
Melanjutkan `RISET_NICHE_V1.md`. Tujuan: memastikan pembingkaian ulang pilar sebelum memilih judul, menjamin persediaan ide, dan menemukan faktor yang belum pernah kita pikirkan.

## 0. Data
| Sumber | Jumlah | Alat |
|---|---|---|
| Shorts + views per channel | **5.540 Shorts, 31 channel** (EN + ID; sains, bisnis, berita, psikologi, fakta) | yt-dlp (gratis) |
| Transkrip | 48 (16 v1 + 32 v2: 6 teratas vs 6 terbawah di channel yang sama) | Apify |
| Komentar teratas | ±235 dari 10 pemenang | Apify |
| Saran pencarian YouTube Indonesia | 1.919 frasa dari 85 benda/merek sehari-hari | YouTube autocomplete |
| Aturan YPP & Shorts | Help Center resmi (72851, 12843009, 12504220) | web |
Biaya total Apify ±$1,5. Batas: kategori judul dibuat dengan kata kunci (kasar); frame 0 belum dianalisis.

## 1. Uji statistik di dalam channel yang sama
Rasio = views ÷ median channel itu sendiri (menghapus efek besar-kecilnya channel). "Breakout" = ≥ 3× median.
| Bingkai judul | n | Median | Breakout | CI 95% |
|---|---|---|---|---|
| Semua (pembanding) | 5.540 | 1,00× | 17,9% | 17–19% |
| **Psikologi/manipulasi** (di luar channel psikologi) | 36 | 0,85× | **2,8%** | 0–8% |
| Channel psikologi murni (Psych2go) | 250 | 1,00× | 10,0% | 6–14% |
| Mitos/kontradiksi ("isn't", "benarkah", "bukan") | 166 | 1,00× | **21,7%** | 16–28% |
| Bisnis/harga + why/how/mitos | 124 | 1,09× | 20,2% | 14–27% |
| Channel Indonesia (semua) | 1.780 | 1,00× | 20,3% | 18–22% |
**Terbaca:** judul yang masuk lewat **psikologi/manipulasi tertinggal jelas** (2,8% vs 17,9%, selang kepercayaan tidak bertumpuk). Bahkan di channel psikologi, pemenangnya soal tubuh/hubungan ("What never having sex does to your brain" 22×), bukan manipulasi. **Mitos/kontradiksi** dan **bisnis/harga dengan "kenapa"** berada di atas rata-rata, walau selisihnya belum signifikan; pembeda terbesar ada di eksekusi (bagian 2).

## 2. Top vs bottom di channel yang sama (transkrip)
| Channel | Teratas | Terbawah | Pembeda |
|---|---|---|---|
| Smart Nonsense | knuckleball 9,6 jt ("This is a knuckleball…"), lebah jatuh saat lampu mati 5,8 jt, "Bananas are berries, strawberries aren't" 5,8 jt, 99 sen, Dyson, ChatGPT | gempa 24 rb, kalajengking menyala 15 rb, pantai menyala 12 rb, Twitter 27 rb, 2 video sponsor 12–23 rb | pemenang = **benda yang dipegang/dikenal semua orang + anggapan yang dibalik**; yang kalah = penjelasan buku pelajaran tanpa kontradiksi, atau sponsor |
| Zack D. Films | paruh tukan 68 jt, hiu memotong paus 61 jt, telinga doberman 50 jt (28–38 dtk) | anjing & donor ginjal, "fear into attachment", teleskop, **food companies** | pemenang = **aksi fisik yang sedang terjadi di detik 0** ("It swung down and smashed…"); yang kalah = psikologi/abstrak |
| Kok Bisa? | piranha 4,1 jt (mitos dibalik + **dalang: presiden AS**), perang 40 menit, hukuman sejarah | sponsor obat maag, "kenapa laki-laki tidak bercerita", kampanye | sama: mitos + tokoh; yang kalah = psikologi relatable & sponsor |
| Ngomongin Uang | **panjat pinang = warisan Belanda** 2,1 jt (74×), harga beras Rp1 jt | promosi produk sendiri, talking head politik | benda budaya yang dikenal semua orang + asal-usul tersembunyi + musuh |
**Pola yang konsisten di 4 channel, 2 bahasa:** benda/peristiwa yang dikenal → anggapan dibalik → tokoh/dalang → jawaban yang tidak tertebak. Psikologi sebagai pintu masuk dan konten bersponsor selalu di bawah.

## 3. Kenapa orang menonton (dari v1, dikonfirmasi)
Aha/cara kerja (C) dan anggapan dibalik (A) membuat orang menonton; musuh (D), perdebatan, dan pengalaman pribadi (E) membuat orang berkomentar. "Melindungi diri" (B) hampir tidak muncul. Bukti baru Indonesia: **kebanggaan/identitas lokal** ("yang bangga Indonesia ngumpul" di Kamus Unik; "parkir jadi 2000" di Ngomongin Uang).

## 4. Hal yang belum pernah kita pikirkan
| # | Faktor | Fakta | Akibat untuk kita |
|---|---|---|---|
| 1 | **Syarat YPP naik 2× pada 1 Feb 2027** (resmi, Help 12843009) | Sekarang: 1.000 subscriber + **10 jt views Shorts / 90 hari** atau 4.000 jam tonton video panjang. Mulai 1 Feb 2027: **20 jt Shorts / 90 hari** atau **8.000 jam**. Channel yang sudah masuk YPP tidak terdampak. Tier awal (500 sub + 3 jt Shorts) tidak berubah tapi hanya fan funding/Shopping, bukan iklan | Mengejar 10 jt dalam ±80 hari dari 185 views/12 jam tidak realistis tanpa viral besar → **rencanakan untuk syarat baru**: ±222 rb views/hari, atau jalur video panjang (jam tonton Shorts **tidak** dihitung). Target menengah: tier awal (500 sub + 3 jt) |
| 2 | Cara uang Shorts dibagi | Pool per negara, kreator dapat 45%; RPM tergantung negara penonton (Help 12504220). Angka RPM Indonesia tidak ada di sumber resmi | Penonton Indonesia membayar lebih kecil per view (dugaan kuat, belum terverifikasi angka) → volume & konsistensi lebih penting; opsi jangka panjang: versi Inggris |
| 3 | **Kebijakan "inauthentic content"** (Jul 2025, penegakan Jan 2026) | Menyasar konten massal/template dengan sedikit variasi, bukan AI per se | Animasi orisinal + riset = aman; jangan sampai tiap episode terlihat cetakan yang sama; jangan pernah memakai footage orang lain (banyak channel fakta ID melakukannya) |
| 4 | Konten bersponsor/promo di Shorts | Semua video sponsor/promo di sampel ada di dasar channel (Smart Nonsense, Kok Bisa, Ngomongin Uang) | Jangan ada promo di Shorts; CTA di VO juga tidak |
| 5 | **Permintaan pencarian Indonesia nyata** | Autocomplete YouTube ID: "kenapa alfamart dan indomaret berdekatan", "kenapa mall dipagari", "kenapa bioskop selalu di lantai atas", "kenapa makanan di bioskop mahal", "kenapa tiket pesawat domestik mahal", "kenapa spbu sepi tidak bangkrut", "kenapa botol yakult kecil", "kenapa jalan tol tidak diaspal", "kenapa indomie di luar jawa berbeda", "kenapa kfc sepi", "kenapa pinjol bisa akses kontak", "kenapa orang kaya pakai kartu kredit", "kenapa berlian mahal", "kenapa hp iklan terus" | Judul yang memakai frasa pencarian nyata dapat trafik pencarian jangka panjang (evergreen) selain feed; juga sumber ide tanpa batas |
| 6 | Kecocokan dengan alat produksi | Benda/tempat (toko, lampu, botol, jalan tol) mudah dibangun sebagai diorama 3D; psikologi abstrak sulit digambar | Pilar baru juga **lebih murah diproduksi** dan visualnya lebih kuat |
| 7 | Durasi | Pemenang Zack 28–38 dtk, Smart Nonsense 55–68 dtk, Kok Bisa 59 dtk | Panjang mengikuti cerita; 35–60 dtk aman |
| 8 | Tokoh berulang | Komentar teratas Smart Nonsense soal tokoh "Derd" (23 rb like) | Opsi masa depan: satu tokoh arsiparis berulang untuk komunitas |
| 9 | Penutup pertanyaan ringan | "Jadi gimana, kalian 40 menit bisa apa?" 1 rb like + ribuan balasan | Pertanyaan konkret & lucu > "tulis di kolom komentar" |

## 5. Keputusan & tingkat keyakinan
**Pilar baru (wilayah 2, ±70%): "Alasan ASLI di balik benda, tempat, harga, dan merek yang kamu kenal — terutama yang ada di Indonesia."** Psikologi, ekonomi, sejarah, dan kartel menjadi isi jawaban, bukan pintu masuk.
**Keyakinan: tinggi, bukan 100%.** Tiga bukti independen menunjuk ke arah yang sama (statistik dalam channel, transkrip top vs bottom, komentar), ditambah dua keuntungan praktis (persediaan ide dari permintaan pencarian nyata; lebih mudah divisualkan). Yang belum terbukti: performa pilar baru **di channel kita sendiri**. Uji: #003 dan #004 dengan pilar baru; bila stayed to watch tetap < 40%, masalahnya ada di hook/visual, bukan pilar (data v2 sudah memisahkan keduanya).

## 6. Persediaan ide
Lihat `BANK_IDE.md`: 70+ ide awal (belum dicek) dan **6 sumber ide tak terbatas** (autocomplete, putusan KPPU/regulator, gugatan & paten, judul pemenang EN untuk dilokalkan, permintaan di komentar, kalender berita/musim).
