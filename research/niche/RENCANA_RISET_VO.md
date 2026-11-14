# Rencana riset VO (tempo, jeda, energi) — 14 Nov 2026
**Masalah:** patokan tempo VO berasal dari 11 rekaman (3 berbahasa Indonesia). Terlalu sedikit untuk memilih antara 2,6 dan 2,8 kata/dtk. Server ini tidak bisa mengambil audio YouTube (diblokir; mengakali pemblokiran tidak dilakukan).
**Yang diukur per video (dari audio asli, Whisper):** kata/dtk total, kata/dtk saat bicara, jumlah & panjang jeda, variasi tempo per kalimat, kapan kalimat 1 selesai, LUFS. Dibandingkan dengan rasio views ÷ median channel (pemenang vs gagal di channel yang sama).
**Sampel target:** 30–40 Shorts narasi berbahasa Indonesia sejenis kita (cerita/penjelasan dengan VO, bukan talking head): ±5 channel × (4 teratas + 3 terbawah). Kandidat channel: Kok Bisa, Kamus Unik, TauGakSih, KTJ, Alam Semenit, ditambah 1–2 channel narasi lain yang user pilih.
**Cara mendapatkan audio (pilih satu):**
1. **User merekam layar di HP** (gratis): putar tiap Short sampai habis dengan suara, simpan rekaman, unggah ke Drive folder `Mini Thriller IDN/_riset VO/`. ±30–40 klip × 1 menit ≈ 45–60 menit kerja. Paling akurat (audio asli).
2. **Apify** (aktor transkrip YouTube yang pernah dipakai, ±US$0,02–0,03 per video, masuk kredit gratis bulanan Apify bila masih ada): cepat, tanpa kerja user, tetapi hanya teks caption + stempel waktu (tempo total cukup akurat; jeda/energi tidak terukur; caption otomatis Indonesia bisa kehilangan kata → tempo terbaca lebih rendah).
3. Gabungan: Apify untuk 40 video (tempo total) + rekaman user untuk 10 video (kalibrasi Whisper vs caption).
**Uji sendiri (paling kuat, setelah ada beberapa video):** #004–#006 diunggah dengan tempo berbeda (mis. 2,6 / 2,8) pada hook dan topik sejenis; bandingkan stayed-to-watch dan grafik retensi di Studio. Satu variabel per video.
