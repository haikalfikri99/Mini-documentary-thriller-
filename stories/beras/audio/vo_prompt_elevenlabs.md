# VO ARSIP KASUS #019 beras — ElevenLabs (Saos Cocol R86jddkroI9bJwXFfjsr, eleven_v4; jalur utama v7.0 = konektor, 1 take, ulang hanya setelah user setuju)
**Status naskah:** v4 23 Nov 2026 (gabungan varian A+B+C, `research/batch_017_020/varian_beras_019.md`), **menunggu persetujuan user sebelum kredit dipakai**. Teks bersih tanpa notasi (alignment/QA Whisper, caption): `script_vo.txt` (v5 23 Nov 2026). Tag `[...]` hanya arahan nada ElevenLabs (tidak diucapkan); `[pause]` = hening ±0,5–0,6 dtk tepat sebelum The Turn ("Anehnya…"). Ekor akhir ≤ 0,15 dtk (`vo_chain.py`). Target take mentah: Investigasi 48–55 dtk (estimasi ±52 dtk); bila lebih, rapatkan jeda dulu, lalu `atempo` ≤ 1,10. H1 (8 kata) harus selesai ≤ 4,0 dtk (cek di `vo_words.json`; estimasi 3,1 dtk).
**Pelafalan:** "Kementerian Pertanian" utuh di kalimat 2, "Kementan" = ke-men-tan di kalimat 12; "Satgas" = sat-gas; "delapan puluh lima persen" dan "empat belas ribu" diucap penuh; "nggak" lisan. Kalimat pembuka datar dan cepat, seperti laporan kejadian (bukan heboh); "Cuma itu? Nggak." = tanya ringan lalu jawaban tegas pendek; nada menahan marah, bukan menuduh.

## Peta jeda
v5: jeda mengikuti tanda baca; hening ±0,6 dtk sebelum "Masalahnya". Tabel AV README = v4, diselaraskan setelah user setuju.

## Prompt (salin apa adanya ke ElevenLabs)
[serious] Beras murah pemerintah dibungkus ulang, dijual sebagai premium.
[serious] Tuduhan ini keluar dari Kementerian Pertanian sendiri.
[serious] Beras murah itu harusnya nahan harga pasar. Pindah ke karung premium, kamu yang bayar lebih mahal.
[warmly] Masalahnya, di rak kamu nggak bisa bedain. Yang kamu lihat cuma satu kata di karung: premium.
[curious] Terus, tulisan premium itu bisa dipercaya nggak?
[serious] Polisi ngetes lima merek beras premium. Beratnya nggak sesuai tulisan lima kilo. Harganya lewat batas pemerintah, bisa kemahalan sekitar empat belas ribu per karung.
[curious] Cuma itu? Nggak.
[serious] Kementan ngetes ratusan sampel dari sepuluh provinsi. Lebih dari delapan puluh lima persen beras premiumnya nggak sesuai mutu.
[slowly] Artinya, kamu bisa bayar harga premium buat beras yang mutunya bukan premium.
[serious] Tersangkanya udah ada. Sampai sekarang, belum ada yang divonis.
[warmly] Karung premium terakhir yang kamu angkat ke kasir: kamu bayar berasnya, atau tulisannya?
