# VO ARSIP KASUS #019 beras — ElevenLabs (Saos Cocol R86jddkroI9bJwXFfjsr, eleven_v4; jalur utama v7.0 = konektor, 1 take, ulang hanya setelah user setuju)
**Status naskah:** v4 23 Nov 2026 (gabungan varian A+B+C, `research/batch_017_020/varian_beras_019.md`), **menunggu persetujuan user sebelum kredit dipakai**. Teks bersih tanpa notasi (alignment/QA Whisper, caption): `script_vo.txt` (133 kata). Tag `[...]` hanya arahan nada ElevenLabs (tidak diucapkan); `[pause]` = hening ±0,5–0,6 dtk tepat sebelum The Turn ("Anehnya…"). Ekor akhir ≤ 0,15 dtk (`vo_chain.py`). Target take mentah: Investigasi 48–55 dtk (estimasi ±52 dtk); bila lebih, rapatkan jeda dulu, lalu `atempo` ≤ 1,10. H1 (8 kata) harus selesai ≤ 4,0 dtk (cek di `vo_words.json`; estimasi 3,1 dtk).
**Pelafalan:** "Kementerian Pertanian" utuh di kalimat 2, "Kementan" = ke-men-tan di kalimat 12; "Satgas" = sat-gas; "delapan puluh lima persen" dan "empat belas ribu" diucap penuh; "nggak" lisan. Kalimat pembuka datar dan cepat, seperti laporan kejadian (bukan heboh); "Cuma itu? Nggak." = tanya ringan lalu jawaban tegas pendek; nada menahan marah, bukan menuduh.

## Peta jeda (arahan editor; JANGAN disalin ke ElevenLabs)
`/` ≈ 0,25 dtk · `//` ≈ 0,6 dtk · KAPITAL = tekanan
Beras murah pemerintah DIBUNGKUS ULANG, / dijual sebagai PREMIUM.
Tuduhan itu keluar dari KEMENTERIAN PERTANIAN sendiri. Beras itu mestinya nahan harga pasar. / Pindah karung, kamu bayar LEBIH MAHAL.
Di rak, kamu cuma lihat tulisan PREMIUM. / Kedengarannya udah lolos uji.
Polisi juga bawa lima merek premium ke balai uji. Timbangannya nggak sesuai tulisan LIMA KILO. Harganya lewat batas pemerintah, / bisa kemahalan sekitar EMPAT BELAS RIBU.
Cuma itu? / NGGAK.
// Anehnya, Kepala Satgas Pangan bilang, / ada produsen yang NGGAK PERNAH uji lab. Buat produsen kayak gitu, tulisan premium DICETAK DULUAN. / Yang nguji malah polisi, / setelah berasnya dijual ke KAMU.
Masalahnya, itu baru LIMA MEREK. Kementan ngetes ratusan sampel. Lebih dari DELAPAN PULUH LIMA PERSEN beras premiumnya nggak sesuai mutu.
Tersangkanya udah ada, / vonisnya BELUM.
Karung premium terakhir yang kamu angkat ke kasir: / kamu bayar berasnya, atau TULISANNYA?

## Prompt (salin apa adanya ke ElevenLabs)
[serious] Beras murah pemerintah dibungkus ulang, dijual sebagai premium.
[serious] Tuduhan itu keluar dari Kementerian Pertanian sendiri. Beras itu mestinya nahan harga pasar. Pindah karung, kamu bayar lebih mahal.
[warmly] Di rak, kamu cuma lihat tulisan premium. Kedengarannya udah lolos uji.
[curious] Polisi juga bawa lima merek premium ke balai uji. [serious] Timbangannya nggak sesuai tulisan lima kilo. Harganya lewat batas pemerintah, bisa kemahalan sekitar empat belas ribu.
[curious] Cuma itu? [serious] Nggak.
[pause] [mysteriously] Anehnya, Kepala Satgas Pangan bilang, ada produsen yang nggak pernah uji lab. [slowly] Buat produsen kayak gitu, tulisan premium dicetak duluan. Yang nguji malah polisi, setelah berasnya dijual ke kamu.
[serious] Masalahnya, itu baru lima merek. Kementan ngetes ratusan sampel. Lebih dari delapan puluh lima persen beras premiumnya nggak sesuai mutu.
[serious] Tersangkanya udah ada, vonisnya belum.
[warmly] Karung premium terakhir yang kamu angkat ke kasir: kamu bayar berasnya, atau tulisannya?
