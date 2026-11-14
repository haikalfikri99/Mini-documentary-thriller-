# Riset tempo VO Shorts narasi Indonesia (14 Nov 2026)

Data mentah: `research/niche/data_vo_tempo.csv` (42 baris). Rencana asal: `RENCANA_RISET_VO.md` (opsi 2, Apify).

## Ringkasan
- Tidak ada perbedaan tempo yang berarti antara Short yang laku dan yang gagal. Median kata/dtk (rentang bicara) video narasi: **atas 2,21 vs bawah 2,23** (n = 16 vs 12). Selisih -0,02; selang 95% bootstrap -0,62 s/d +0,43; uji permutasi p = 0,998. Di dalam channel yang sama, selisihnya +0,03 (selang -0,19 s/d +0,15).
- Artinya: tempo bukan penentu hasil di sampel ini. Menaikkan atau menurunkan tempo dari 2,66 tidak punya dasar data untuk memperbaiki views.
- Tempo VO narasi yang diukur menyebar 1,83 s/d 3,25 kata/dtk, median 2,21 (IQR 2,06 s/d 2,57, n = 28). Tempo kita (2,66) berada di sekitar kuartil atas.
- **Rekomendasi: 2,5 s/d 2,8 kata/dtk, titik tengah 2,6 s/d 2,7 (tetap seperti sekarang).** Alasan di bagian akhir.

## Metode (terverifikasi)
1. Daftar Shorts per channel lewat `yt-dlp --flat-playlist` (jumlah views, id). Tidak ada trik pelewat bot-check.
2. Median views per channel dihitung dari semua Shorts di daftar kecuali 15 terbaru (proxy "lebih tua dari ~2 minggu", karena listing flat tak memberi tanggal; tanggal terbit dari Apify memastikan semua sampel terpilih dari 2021 s/d awal 2026, jauh lebih dari 2 minggu).
3. Kandidat: 9 teratas + 7 terbawah per channel (96 id). Transkrip diambil dengan Apify. Disaring: durasi 25 s/d 90 dtk, bahasa caption `id`, minimal 0,5 kata/dtk (membuang video musik/tanpa suara: 6 video), lalu ambil **4 teratas dan 3 terbawah** per channel menurut views.
4. Per video dari caption berstempel waktu: total kata (field `wordCount` aktor, bukan jumlah segmen, karena caption otomatis YouTube saling tumpang tindih), rentang bicara (mulai caption pertama berisi ucapan sampai akhir caption terakhir; caption "[Musik]" diabaikan), kata/dtk atas rentang, kata/dtk atas durasi video, rasio views ÷ median channel.
5. Statistik: median dan IQR; selisih median atas - bawah dengan bootstrap 10.000x (seed 1) dan uji permutasi 20.000x; juga selisih setelah tiap video dikurangi median channelnya (mengendalikan beda gaya antar channel).

Aktor: `dami_studio/youtube-transcript-bulk-scraper` (US$0,0004 per transkrip + US$0,0005 per start; mengembalikan segmen start/durasi dan penanda auto/manual). Biaya aktual: 4 run, 150 transkrip berbayar, **perkiraan ≈ US$0,06** (dihitung dari harga per kejadian; alat tidak menampilkan tagihan akhir, cek di Apify Console bila perlu). Jauh di bawah batas US$1,50. Uji awal 2 video menghabiskan ≈ US$0,002.

## Sampel
42 video, 6 channel. Tiga sampel yang dilaporkan terpisah karena bukan VO narasi:

| Channel | Jenis konten (diperiksa dari isi caption) | n | Dipakai di analisis utama |
|---|---|---|---|
| Kok Bisa? | VO skrip, penyiar | 7 | ya |
| Kamus Unik | VO skrip "Inilah tiga ..." | 7 | ya |
| Tau Gak Sih | VO skrip | 7 | ya |
| Alam Semenit | VO terjemahan narasi dokumenter | 7 | ya |
| KTJ | dialog/vlog uji nyali (bukan narasi) | 7 | tidak |
| Detektif Astral | bicara langsung/wawancara (bukan narasi) | 7 | tidak |

Handle `@KTJ` salah di tautan flat (404); channel yang benar dicari lewat pencarian (UCZIEmkvbSV8wBVWnP4wgftA). `@MEDIA_ID` tidak ketemu sebagai channel narasi Indonesia yang jelas (hasil pencarian: channel servis ponsel/lainnya), jadi dilewati, bukan ditebak. Jadi n = 42 total, **n = 28 untuk analisis narasi** (target awal 40 s/d 49 tercapai hanya bila KTJ dan Detektif Astral ikut dihitung).

Catatan: Alam Semenit hanya punya 6 Shorts narasi 25 s/d 90 dtk di daftar yang dipilih; sisanya berdurasi 130 s/d 180 dtk (Shorts panjang). "Terbawah" untuk channel ini adalah 3 Shorts ≤ 90 dtk dengan views terendah yang ditemukan (28 rb, 73 rb, 88 rb; rasio 0,19 s/d 0,58), bukan benar-benar paling bawah channel.

## Hasil (angka terverifikasi dari data)

Kata/dtk atas rentang bicara, caption otomatis semua:

| Kelompok | n | Median | IQR | Min - Maks |
|---|---|---|---|---|
| Narasi, atas | 16 | 2,21 | 2,12 - 2,50 | 1,83 - 2,99 |
| Narasi, bawah | 12 | 2,23 | 2,01 - 2,81 | 1,85 - 3,25 |
| Semua 6 channel, atas | 24 | 2,21 | 2,05 - 2,50 | 1,26 - 2,99 |
| Semua 6 channel, bawah | 18 | 2,36 | 2,05 - 2,55 | 1,77 - 3,25 |

Per channel (median kata/dtk rentang; atas n = 4, bawah n = 3):

| Channel | Atas | Bawah | Arah |
|---|---|---|---|
| Kok Bisa? | 2,83 | 3,06 | bawah lebih cepat |
| Kamus Unik | 2,26 | 2,39 | bawah lebih cepat |
| Tau Gak Sih | 2,12 | 1,90 | atas lebih cepat |
| Alam Semenit | 2,21 | 2,05 | atas lebih cepat |
| KTJ (dialog) | 1,65 | 2,06 | bawah lebih cepat |
| Detektif Astral (bicara) | 2,44 | 2,45 | sama |

Arahnya bolak-balik antar channel (2 narasi condong ke atas lebih cepat, 2 ke bawah lebih cepat), sehingga tidak ada pola konsisten.

Tempo per channel (semua 7 video): Kok Bisa 2,5 s/d 3,3 (tercepat), Kamus Unik 2,0 s/d 2,7, Alam Semenit 1,9 s/d 2,5, Tau Gak Sih 1,8 s/d 2,1.

Pengukuran lain: akhir kalimat/caption pertama jatuh median ≈ 6,8 dtk dari awal bicara (n = 19 video narasi yang caption-nya berpunktuasi, rentang 3,3 s/d 9,1; ini batas atas, karena diukur di akhir caption yang memuat tanda titik, bukan di kata terakhir kalimat). Kok Bisa dan Alam Semenit tanpa tanda baca sehingga kosong (NA di CSV). Rasio rentang bicara/durasi video median 1,02: VO hampir menutup seluruh video (caption bisa melewati durasi sedikit).

## Batas dan kelemahan (jujur)
- **Semua caption otomatis** (`auto`) tanpa kecuali. Auto-caption bisa salah ketik atau menghilangkan kata, sehingga tempo cenderung terbaca sedikit rendah. Besarnya tak bisa diukur tanpa audio asli. Karena sama di semua video, perbandingan atas vs bawah tidak terdistorsi sistematis, tetapi angka absolutnya (mis. 2,21) tak bisa langsung dibandingkan dengan 2,66 hitungan skrip kita. Alam Semenit juga memuat kata asing yang salah dengar.
- **Jeda dan energi tidak terukur** (caption tidak memberi jeda antar-kata). Rencana awal memang mengakui ini.
- **Tempo bukan satu-satunya yang berubah antara video laku dan gagal.** Views dipengaruhi topik, hook, judul, usia video, dan push algoritma. Di Kok Bisa, semua 4 video atas terbit 2022 (video bawah 2025 s/d 2026); di Kamus Unik video atas hampir semua berformat "Inilah tiga ..." dan lebih pendek (34 s/d 59 dtk) daripada video bawah (42 s/d 70 dtk); di Kok Bisa video bawah juga lebih panjang (67 s/d 85 dtk). Perbedaan format ini tidak dikendalikan.
- n kecil: 16 vs 12 video, dari hanya 4 channel narasi. Selang kepercayaan lebar (±0,5 kata/dtk): data tidak bisa mendeteksi efek kecil (< ±0,3). Hasil "tidak ada beda" berarti "tidak terbukti ada beda besar", bukan "pasti sama".
- Pemilihan top/bottom dari 16 kandidat per channel (diurutkan menurut views dari daftar flat yang membulatkan angka) bukan sampel acak. "Terbawah" di Alam Semenit tidak benar-benar terbawah (lihat atas).
- Video KTJ dan Detektif Astral dikeluarkan dari analisis utama karena dialog/bicara langsung (bukan VO); tempo percakapan alami lebih rendah dan tak sebanding. Tau Gak Sih #UdLKB2M68pU berformat dramatis berbeda tetapi tetap VO, dipertahankan.
- 6 transkrip yang bukan bahasa Indonesia atau hampir kosong (musik tanpa ucapan) dibuang (KTJ, Alam Semenit, Detektif Astral). 3 video tidak mengembalikan transkrip dan juga dibuang (kemungkinan tanpa caption).

## Rekomendasi tempo (inferensi, bukan data langsung)
1. **Pertahankan 2,6 s/d 2,7 kata/dtk**, dengan rentang aman 2,5 s/d 2,8. Dasar: (a) tidak ada bukti tempo membedakan video laku/gagal, jadi tak ada alasan mengubah; (b) channel narasi terbesar di sampel, Kok Bisa (views median 671 rb, Shorts hingga 18 juta), berada di 2,5 s/d 3,3 dengan caption otomatis yang cenderung mengecilkan angka, sehingga tempo sebenarnya kemungkinan lebih tinggi daripada median 2,2 yang tampak; (c) channel dengan tempo lebih lambat (Tau Gak Sih ≈ 1,9 s/d 2,1) punya views median terendah (1,4 rb), walau ini juga dipengaruhi ukuran channel.
2. Jangan turun di bawah ±2,3 (rentang kuartil bawah sampel) untuk Shorts 40 s/d 60 dtk: hook berisi kalimat pertama ≤ 7 dtk akan sulit muat.
3. Hook: kalimat pertama berakhir sekitar 4 s/d 9 dtk pada channel yang berpunktuasi (median ≈ 6,8 dtk), jadi kalimat pertama ≤ 5 s/d 6 dtk sudah tidak lambat dibanding pembanding.
4. Bila ingin bukti yang lebih kuat, jalankan uji sendiri (bagian akhir rencana): #004 s/d #006 pada tempo 2,5 vs 2,8 dengan topik dan hook sejenis, bandingkan retensi di Studio. Satu variabel per video.
5. Bila ingin kalibrasi caption vs audio, rekam layar 10 video seperti opsi 3 di rencana; tidak wajib untuk keputusan ini.
