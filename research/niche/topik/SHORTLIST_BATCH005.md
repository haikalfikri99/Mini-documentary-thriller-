# Shortlist batch #005–#008 (15 Nov 2026)
Data mentah: `kandidat_batch005.json`, `hasil_batch005.json` (`kit/tools/riset_topik.py`, filter relevansi baru). Skor 5 sumbu menurut `RUMUS_PEMILIHAN.md` (Permintaan dan Celah dihitung dari data; Lokal, Cerita, Bahan = **penilaian Claude, estimasi**), lalu rubrik 20 poin v5.0 (juga estimasi). **Fakta klaim kandidat (angka, studi, arah temuan) BELUM diverifikasi**; semuanya berasal dari spesifikasi Gemini, kecuali nominal skutik yang cocok dengan judul BeritaSatu (Honda Rp22,5 M + Yamaha Rp25 M = Rp47,5 M).

## Data riset (YouTube Indonesia)
| Kandidat | n_saran | video | ≥100k | ≥1M | Video teratas yang SESUDUT (bukan semua hasil) |
|---|---|---|---|---|---|
| Skutik Yamaha–Honda | 2 | 15 | 0 | 0 | BeritaSatu "Kartel Motor, KPPU Denda Honda Rp 22,5 M dan Yamaha Rp 25 M" 3,3 rb; KompasTV 2,9 rb; Faisal Basri membantah 1 rb |
| Shopee & KPPU | 0 | 2 | 0 | 0 | webinar KPPU 1,7 rb; "Shopee gratis ongkir, uangnya dari mana?" 229 |
| Timer lampu merah | 2 | 20 | 4 | 0 | **tidak ada yang sesudut** (hasil ≥100k = timer AC, PLN, rambu anak, Alphard HI) |
| 3-in-1 Jakarta | 5 | 18 | 0 | 0 | Merdeka "Jakarta makin semrawut setelah Ahok hapus 3 in 1" 24,8 rb; BBC "hari terakhir joki 3 in 1" 13,4 rb |
| QRIS | 37 | 20 | 3 | 1 | Kok Bisa "Cara Kerja QRIS" 1,19 jt; Bennix 743 rb; Cerindo 148 rb (sudah jenuh) |
| Tol Cipali | 37* | 10 | 1 | 0 | KompasTV "Sopir Vanessa Angel… Automatic Behavior Syndrome" 138 rb. *37 saran sebagian besar lagu/ASMR "highway hypnosis", bukan Cipali |
| HP murah penuh iklan | 17 | 20 | 10 | 3 | sesudut "kenapa HP Xiaomi murah": GadgetIn 698 rb; sisanya review/cara matikan iklan (diabaikan menurut rumus) |
| Kesurupan massal pabrik | 21 | 17 | 3 | 2 | Hirotada Radifan "kesurupan masal pabrik Majalengka" 2,1 jt; Detektif Astral 100 rb (horor/klenik) |

## Skor 5 sumbu (0–5, total 25) dan gerbang
| Kandidat | Permintaan | Celah | Lokal | Cerita | Bahan | **Total** | Gerbang (Lokal ≥ 4, Celah ≥ 3, Cerita ≥ 3) |
|---|---|---|---|---|---|---|---|
| HP murah penuh iklan | 4 | 4 | 5 | 4 | 3 | **20** | lolos |
| 3-in-1 Jakarta | 2 | 5 | 4 | 4 | 4 | **19** | lolos |
| QRIS | 5 | 2 | 5 | 3 | 4 | 19 | **gugur** (Celah 2: jenuh) |
| Skutik Yamaha–Honda | 2 | 3 | 5 | 4 | 4 | 18 | lolos (tipis) |
| Kesurupan massal pabrik | 4 | 3 | 3 | 3 | 3 | 16 | **gugur** (Lokal 3; horor/klenik bertentangan aturan) |
| Tol Cipali | 3† | 4 | 3 | 3 | 2 | 15 | **gugur** (Lokal 3) |
| Shopee & KPPU | 2 | 3 | 5 | 3 | 2 | 15 | lolos, peringkat rendah |
| Timer lampu merah | 2 | 3‡ | 4 | 3 | 2 | 14 | lolos, peringkat rendah |
†n_saran dikoreksi dari 37 karena noise lagu/ASMR. ‡Celah kosong tetapi tidak ada bukti permintaan sesudut (aturan rumus: butuh satu video ≥ 20 rb).

## Rubrik validasi 20 poin v5.0 (≥ 16 dan tidak ada ≤ 2)
| Kandidat | Kedekatan sehari-hari | Kontras intuisi/twist | Bukti visual kolase | Keamanan hukum & monetisasi | **Total** | Hasil |
|---|---|---|---|---|---|---|
| HP murah penuh iklan | 5 | 4 | 4 | 3 | **16** | lolos (tipis) |
| 3-in-1 Jakarta | 4 | 5 | 3 | 4 | **16** | lolos (tipis) |
| Timer lampu merah | 4 | 5 | 3 | 4 | **16** | lolos (tipis, **bukti studi belum ada**) |
| Skutik Yamaha–Honda | 5 | 3 | 4 | 3 | 15 | tidak lolos |
| QRIS | 5 | 2 | 3 | 5 | 15 | tidak lolos (nilai 2) |
| Shopee & KPPU | 5 | 3 | 2 | 3 | 13 | tidak lolos (nilai 2) |
| Tol Cipali | 3 | 3 | 3 | 4 | 13 | tidak lolos |
| Kesurupan massal pabrik | 3 | 3 | 3 | 2 | 11 | tidak lolos (nilai 2) |

## Kesimpulan untuk batch #005–#008
- Hanya **tiga** kandidat lolos kedua pemeriksaan, semuanya di ambang minimum: **HP murah penuh iklan, 3-in-1 Jakarta, timer lampu merah**. Batch 4 episode belum bisa dikunci penuh dari daftar ini; slot ke-4 perlu kandidat dari `SHORTLIST_004.md`/`ditolak/` (mis. printer tangki tinta Epson 20, Indomie ditarik Taiwan 19, slot LDW) yang dicek ulang dengan rubrik v5.0, atau kandidat baru dari 5 lensa seed.
- **Usulan penugasan (kuota 3 : 1):** #005 HP murah penuh iklan (Pola 1, merek + uang); #006 3-in-1 Jakarta (Pola 1, kebijakan + angka); #007 timer lampu merah (**uji Pola 3/4/5**, tetap diawali objek lampu merah, tanpa frasa "Trik Psikologi"); #008 dari kandidat tambahan. Skutik Yamaha–Honda adalah cerita Pola 1 yang kuat tetapi permintaan nyaris nol dan rubrik 15/20: simpan sebagai cadangan.
- **Pelajaran dari data:** #004 dibuat dengan permintaan 17 saran (skor 3) dan hasilnya 72,5% stayed-to-watch, jadi sumbu Permintaan bukan penentu di feed Shorts; jangan menggugurkan kandidat kuat hanya karena n_saran rendah.
- **Wajib diverifikasi sebelum fact sheet** (belum bisa dipastikan dari sini): angka dan arah temuan 3-in-1 (Science 2017: apakah penghapusan memperburuk macet, seberapa besar), studi Sukoharjo & Malang untuk timer, margin ≤ 5% dan sumbernya untuk HP murah, "manfaat Rp1,47 T" Shopee, putusan akhir MA untuk skutik, dan semua primer yang mungkin tidak terbaca.
