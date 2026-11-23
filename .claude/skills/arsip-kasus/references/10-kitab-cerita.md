# 10 — Kitab Cerita: cara membuat skrip jadi CERITA, bukan daftar fakta (dibuat 23 Nov 2026)
**Wajib dibaca sebelum menulis skrip apa pun; Gerbang Cerita (§5) dijalankan SEBELUM linter.** Struktur di `1-cerita…` §M (timing, rehook, Turn) = rangka. Kitab ini = daging: teknik yang membuat penonton bertahan, geram, dan berkomentar.

## 0. Diagnosa kegagalan #017–#020 versi 2 (ditolak user 23 Nov 2026)
- Skrip ditulis untuk lolos linter dan akurasi; cerita hilang. Fakta disusun sebagai daftar sumber ("Satgas nyebut… Kata Polri… Kementan mengklaim… Hitungan Kemendag") → yang terdengar notulen rapat, bukan kejadian.
- Antagonis tidak *berbuat* apa-apa di layar; penonton tidak tahu siapa yang harus dibenci. Tidak ada kalimat yang memancing komentar.
- Pelajaran: **tulis ceritanya dulu, pasang fakta kemudian.** Fakta tidak boleh mengubah urutan cerita; kalau fakta tidak muat, pindah ke kartu layar.

## 1. Teknik terbukti dari skrip pemenang kanal (#004 Aqua 78,5% stayed · #005 Skutik 73% · #006 3-in-1 72% · #009 Burger 80,9%)
| # | Teknik | Contoh pemenang | Kenapa bekerja |
|---|---|---|---|
| 1 | Hook = akibat besar + sebab kecil yang absurd | "Aqua didenda 13,8 miliar. Gara-gara warung… jual merek lain." | jarak akibat–sebab = celah informasi (Loewenstein); rasa ingin tahu paling tinggi saat jawaban terasa *bisa didapat* [R2] |
| 2 | Sebut keyakinan penonton, lalu patahkan | "Di dealer, kamu kira mereka bersaing ketat." | penonton jadi tokoh; pembalikan terasa pribadi |
| 3 | Bukti = benda/adegan yang bisa digambar | "Buktinya? Lapangan golf." · email "Star Outlet Degradation" | otak mengingat gambar konkret, bukan nama lembaga |
| 4 | Tanya-jawab pendek sebagai engsel | "Aqua bebas? Belum." · "Lolos? Nggak." | micro-rehook lisan; pertanyaan yang muncul di kepala penonton dijawab sebelum ia bosan [R3] |
| 5 | Rantai *tapi / makanya*, bukan *dan lalu* | Aqua didenda → TAPI membantah → pengadilan batal → TAPI MA… | aturan "but/therefore" Parker & Stone (South Park) dan ABT Randy Olson: tiap ketukan disebabkan ketukan sebelumnya |
| 6 | Antagonis bergerak dan membantah | "Dua-duanya membantah. Yamaha bilang, golf dan email itu bukan bukti." | konflik butuh lawan bersuara; cerita hanya sekuat kekuatan lawannya (McKee, *Story* 1997; ⚠ kutipan dari sumber sekunder) |
| 7 | Jargon diterjemahkan jadi peran, sekali | "KPPU, wasitnya persaingan bisnis" | penonton 20–45 tidak hafal singkatan |
| 8 | Pembalikan berlapis (menang → kalah → menang) | PN membatalkan denda → MA memberlakukan lagi | dua Turn > satu Turn; menahan penonton sampai 75–90% |
| 9 | Penutup kembali ke benda di dunia penonton | "Warung dekat rumahmu jual merek apa aja?" | cerita pindah dari layar ke hidup penonton → komentar |

## 2. Bukti riset (alasan, bukan selera)
- Cerita mengalahkan statistik bila keterlibatan emosi tinggi: Freling dkk. 2020, meta-analisis 61 studi (dicatat sesi 22 Nov; ⚠ angka efek belum dibaca ulang).
- Kata moral-emosional menaikkan penyebaran: Brady dkk. 2017 *PNAS* (+20% per kata) [R4]; replikasi pra-registrasi + meta 27 studi, N 4,8 juta: **+13% per kata** (IRR 1,13) [R5]; kausal di 5 eksperimen pra-registrasi [R6]. Kemarahan moral mendorong berbagi (McLoughlin dkk. 2024 *Science*). → kata seperti *nuduh, dibungkus ulang, hangus, dibiarkan, kemahalan* sah dan efektif **asal faktanya mendukung**.
- Efek "korban teridentifikasi" lemah/gagal replikasi (Maier 2024) → jangan andalkan tokoh rekaan; pakai sudut **"kamu"** + antagonis yang jelas. Tokoh nyata (mis. Didi Supandi #020) boleh karena fakta.
- Akhir negatif/tak tuntas lebih membekas (Morris 2019; ⚠ dicatat sesi 22 Nov, belum dibaca ulang).

## 3. Atribusi yang benar (mengoreksi "larangan atribusi total" yang keliru)
- **Boleh (alat cerita):** lembaga sebagai *pelaku adegan* ("Polisi bawa lima merek ke balai uji") · lawan yang menuduh/membantah ("KPPU menuduh… Yamaha bilang…") · satu atribusi pendek untuk klaim sensitif ("Mereka juga nuduh…").
- **Buruk (notulen):** ≥ 3 lembaga berbeda masing-masing diberi "kata/nyebut/mengklaim/hitungan". Linter: WARN "rantai atribusi". Perbaikan: satu suara narator; lembaga kedua dan ketiga pindah ke strip/kartu layar (`KLAIM KEMENTAN · JUN 2025`, `HITUNGAN KEMENDAG`).
- Hedge tetap diucapkan bila fakta lemah ("bisa… sekitar"), tetapi di dalam kalimat cerita, bukan sebagai kalimat sumber.

## 4. Fakta = detail cerita
1. Pilih 1–2 angka yang *dirasakan* (Rp14 rb per karung, 20 GB hangus); sisanya ke layar.
2. Tiap fakta dijawab kalimat berikutnya: "terus apa artinya buat kamu?"
3. Tiap 12–15 detik ada kejadian baru (bukan lembaga baru): timbangan, label harga, mesin cetak, putusan.
4. Fakta yang paling bikin geram dipakai sebagai senjata (hook atau Turn), bukan diselip di tengah daftar.

## 5. Gerbang Cerita (wajib, ditulis di README episode sebelum lint)
**Cerita Brief 5 baris:**
1. *Protagonis:* kamu, sedang memegang/melakukan apa (benda Frame 0).
2. *Antagonis + perbuatan yang bikin kesal:* satu kalimat kerja aktif.
3. *Taruhan:* apa yang hilang darimu, dalam satuan yang terasa (rupiah per karung, GB per bulan).
4. *Turn + detik:* kalimat yang membalik makna hook.
5. *Emosi target + pemicu komentar:* geram/was-was/takjub + kalimat yang akan diketik penonton.
**Uji Penonton (jawab satu kalimat; gagal satu = tulis ulang):** (1) Ini cerita tentang apa, ≤ 12 kata tanpa istilah? (2) Siapa yang bikin kesal, dan dia ngapain? (3) Di detik berapa penonton kaget, karena apa? (4) Apa yang akan dikomentari / dikirim ke grup WA?
**Pertanyaan inti (pelajaran v5, 23 Nov 2026):** tulis SATU pertanyaan yang penonton ingin dijawab (mis. "MK bilang kuota milikmu, kenapa masih hangus?"); tiap kalimat harus mendekatkan jawabannya; fakta benar yang tidak melayani pertanyaan itu DIBUANG, bukan dipindah ke tengah.
**Urutan kerja:** Brief → tulis cerita lisan sekali jadi tanpa melihat linter → baca keras (napas) → pasang fakta + hedge → lint → Uji Penonton ulang.

## 6. Sebelum/sesudah (#019 beras)
- **Ditolak (v2):** "Satgas Pangan Polri nyebut mereknya satu per satu… Kata Polri… Satgas juga nyebut… Kementan mengklaim… Hitungan Kemendag…" → 4 lembaga beratribusi, antagonis diam, tidak ada yang dibenci.
- **Disukai (v1):** "Label premium di karung beras ini bisa dicetak tanpa uji lab." + "Labelnya dicetak duluan, ujiannya baru datang dari polisi." → klaim + benda + gambar. Kurangnya: masih rantai "Kata Polri / Satgas nyebut / Kementan mengklaim".
- **Kalibrasi v3:** 3 varian di `research/batch_017_020/varian_beras_019.md` (A korban "kamu" · B misteri-bukti · C antagonis duluan).

## 7. Korpus outlier (status 23 Nov 2026)
yt-dlp diblokir YouTube dari server ("Sign in to confirm you're not a bot"; tidak ditembus, `AGENTS.md` §2). vidIQ 10 kredit = 2 transkrip → tidak dipakai. Teknik §1 berasal dari skrip kanal sendiri + metrik Studio + sumber craft di atas. Bila user mau menambah korpus luar: salin teks dari tombol "Tampilkan transkrip" YouTube ke `research/korpus/<id>.txt` (GUI, gratis), lalu tambah baris di §1.

**Sumber:** [R2] Recht dkk. 2026 *Cognition* "Knowability predicts curiosity and learning" · [R3] Kedrick dkk. 2023 *Cognitive Science* (pertanyaan yang dibuat sendiri → rasa ingin tahu + ingatan naik) · [R4] Brady dkk. 2017 *PNAS* · [R5] Brady dkk. 2025 *PNAS Nexus* (replikasi + meta) · [R6] Brady dkk. 2025 *J Exp Psych: General* · Parker & Stone "but/therefore" (kelas NYU, ±2011; ⚠ tanggal bervariasi di sumber sekunder) · Olson, *Houston, We Have a Narrative* (2015) · McKee, *Story* (1997).
