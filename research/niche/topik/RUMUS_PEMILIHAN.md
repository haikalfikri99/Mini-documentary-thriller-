# Rumus pemilihan topik/judul ARSIP KASUS (14 Nov 2026)
Dipakai sebelum shortlist dikirim ke user. Alat: `kit/tools/riset_topik.py` (autocomplete YouTube ID + yt-dlp; gratis, tanpa API key; `pip install yt-dlp requests`).
Latar: shortlist #004 pertama hanya dari bank ide → bohlam (fakta kuat, tidak relate orang Indonesia) ditolak user. Dan Indomaret–Alfamart (kandidat awal) ternyata jenuh: 4 video ≥100 rb views, 2 ≥1 jt.

## Lima sumbu (0–5 tiap sumbu, total 25)
| Sumbu | Pertanyaan | Cara mengukur (gratis) |
|---|---|---|
| **Permintaan** | Adakah orang yang mencari/mengetik ini? | Jumlah saran autocomplete YouTube ID untuk benda + awalan (kenapa/kok/alasan/rahasia/sejarah): ≥25 → 5; 15–24 → 4; 10–14 → 3; <10 → 2 |
| **Celah** | Adakah video Indonesia dengan **sudut yang sama** yang sudah ≥100 rb views? | Hitung video sesudut (bukan semua hasil) di 10–20 hasil yt-dlp: 0 → 5 (tapi harus ada bukti permintaan, mis. satu video ≥ 20 rb); 1 → 4; 2 → 3; 3–4 → 2; ≥5 → 1. Hasil "cara menghilangkan…" bukan sudut cerita: abaikan |
| **Lokal** | Benda/merek/peristiwa yang dikenal penonton Indonesia, ada sudut Indonesia? | Penilaian; **gerbang: harus ≥ 4** |
| **Cerita** | Ada dalang/tokoh, taruhan nyata (uang/kesehatan/nyawa/kehilangan), twist yang tidak tertebak? | Penilaian; gerbang ≥ 3 |
| **Bahan** | ≥ 2 sumber (idealnya dokumen primer) dan arsip gambar domain publik/CC? | Penilaian; benda modern bermerek = gambar kita sendiri, kemasan generik |

**Uji hook = uji KEMASAN (diganti 14 Nov, atas koreksi user): fakta harus benar, kemasan sebebas-bebasnya.** Sebelum finalis dikirim: (1) kumpulkan fakta yang benar; (2) tulis ≥ 8 varian hook/judul dengan alat kemasan: angka mencolok, urutan dibalik (hasil dulu), pola "kalah-menang-kalah", kutipan dokumen, kontras, pertanyaan lokal yang dekat dengan penonton, personifikasi benda; (3) pilih yang paling kuat menahan jempol dan pastikan **setiap pernyataan faktualnya benar** (cek satu per satu terhadap fact sheet). Dibolehkan: dramatisasi urutan, pilihan kata, ritme, sudut pandang, judul provokatif. Dilarang: pernyataan yang salah, bukti karangan, alasan/hasil yang tidak diketahui (aturan kebenaran lama, keputusan user). Satu pertimbangan praktis, bukan moral: tuduhan polos terhadap merek bernama bisa mengundang gugatan/klaim; beri atribusi singkat ("kata KPPU") **di kalimat sesudah hook**, bukan di hook. Gugur bila: setelah dikemas pun tidak ada hook yang kuat, atau hook terkuat bersandar pada klaim yang salah/tak diketahui.
**Gerbang (gugur bila gagal):** Lokal < 4 · Celah < 3 · Cerita < 3 · fakta inti tidak bisa diverifikasi ≥ 2 sumber.
**Ranking:** total sumbu; seri dipecah dengan Celah, lalu Bahan.

## Cara menjalankan
1. Kandidat → `kandidat.json` (id, judul, `demand` = benda untuk autocomplete, `supply` = 2 kueri YouTube).
2. `python3 kit/tools/riset_topik.py kandidat.json hasil.json` (±1 menit untuk 18 kandidat).
3. **Baca judul teratas, jangan hanya angka**: views maksimum sering dari video tak sesudut (contoh "sachet" = iklan sampo 201 jt; "bohlam" = Veritasium 25 jt berbahasa Inggris).
4. Verifikasi fakta hanya untuk judul yang dipilih user (aturan lama tetap).

## Keterbatasan (jujur)
- yt-dlp flat search tidak memberi tanggal unggah; video lama dan baru tercampur. Kurasi sebaiknya mengecek tanggal untuk finalis.
- Hasil pencarian diurutkan relevansi YouTube, bukan views; kandidat di luar 10–20 teratas tak terhitung.
- Tidak ada data kita sendiri yang membuktikan topik "belum dibahas" mengalahkan "sudah dibahas"; Celah adalah hipotesis (uji lewat data Studio #004 dst).
- Shorts vs video panjang tidak dipisah (flat search); jangan menyimpulkan "tidak ada Shorts".
