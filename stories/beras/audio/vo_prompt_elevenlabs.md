# VO ARSIP KASUS #019 beras — ElevenLabs (Saos Cocol R86jddkroI9bJwXFfjsr, eleven_v4; jalur utama v7.0 = konektor, 1 take, ulang hanya setelah user setuju)
**Status naskah:** draf final Claude (22 Nov 2026), **menunggu persetujuan user sebelum kredit dipakai**. Teks bersih (alignment/QA Whisper, caption): `script_vo.txt` (131 kata; tanda `/` dan `//` di sana = arahan jeda, tidak diucapkan). Tag `[...]` hanya arahan nada ElevenLabs (tidak diucapkan); `[pause]` = hening ±0,5–0,6 dtk tepat sebelum The Turn ("Anehnya…"). Ekor akhir ≤ 0,15 dtk (`vo_chain.py`). Target take mentah: Investigasi 48–55 dtk (estimasi 50–53 dtk); bila lebih, rapatkan jeda dulu, lalu `atempo` ≤ 1,10. H1 harus selesai ≤ 4,0 dtk (cek di `vo_words.json`).
**Pelafalan:** "Sania" = **sa-ni-a**; "Setra Ramos" = **se-tra ra-mos** (bukan lafal Inggris); "Satgas" = **sat-gas**; "Polri" = **pol-ri**; "Kementan" = **ke-men-tan**; "delapan puluh lima persen" dan "empat belas ribu" diucap penuh; "nggak" lisan (bukan "tidak"). Nama merek diucap datar, tanpa nada menuduh (atribusi "kata Polri" sudah di kalimat yang sama).

## Prompt (salin apa adanya ke ElevenLabs)
[serious] Label premium di karung beras ini bisa dicetak tanpa uji lab.
[warmly] Kita rela bayar lebih mahal, karena premium kedengarannya udah lolos standar.
[curious] Tahun lalu, Satgas Pangan Polri bawa karung kayak gini ke balai uji. Lima merek kena, dari Sania, Setra Ramos, sampai Jelita dan Anak Kembar. [serious] Kata Polri, beratnya nggak sesuai, harganya lewat batas pemerintah. Sampai hari ini, kasusnya belum divonis.
[pause] [mysteriously] Anehnya, Satgas nyebut ada produsen yang nggak pernah uji lab sejak berdiri. [slowly] Labelnya dicetak duluan, ujiannya baru datang dari polisi.
[serious] Masalahnya, ini bukan cuma lima merek. Kementan mengklaim udah nguji ratusan sampel di sepuluh provinsi. Lebih dari delapan puluh lima persen beras premiumnya nggak sesuai mutu. Akibatnya, tiap karung lima kilo bisa kemahalan sekitar empat belas ribu.
[warmly] Karung premium terakhir yang kamu angkat ke kasir: kamu bayar berasnya, atau tulisannya?
