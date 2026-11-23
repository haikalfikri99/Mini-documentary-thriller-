# VO ARSIP KASUS #019 beras — ElevenLabs (Saos Cocol R86jddkroI9bJwXFfjsr, eleven_v4; jalur utama v7.0 = konektor, 1 take, ulang hanya setelah user setuju)
**Status naskah:** hook ditulis ulang 23 Nov 2026 (bentuk Peristiwa, `research/batch_017_020/hook_varian_beras.md`), **menunggu persetujuan user sebelum kredit dipakai**. Teks bersih tanpa notasi (alignment/QA Whisper, caption): `script_vo.txt` (127 kata). Tag `[...]` hanya arahan nada ElevenLabs (tidak diucapkan); `[pause]` = hening ±0,5–0,6 dtk tepat sebelum The Turn ("Anehnya…"). Ekor akhir ≤ 0,15 dtk (`vo_chain.py`). Target take mentah: Investigasi 48–55 dtk (estimasi ±51 dtk); bila lebih, rapatkan jeda dulu, lalu `atempo` ≤ 1,10. H1 (9 kata) harus selesai ≤ 4,0 dtk (cek di `vo_words.json`; estimasi 3,5 dtk).
**Pelafalan:** "Sania" = **sa-ni-a**; "Setra Ramos" = **se-tra ra-mos** (bukan lafal Inggris); "Satgas" = **sat-gas**; "Polri" = **pol-ri**; "Kementan" = **ke-men-tan**; "Kemendag" = **ke-men-dag**; "delapan puluh lima persen" dan "empat belas ribu" diucap penuh; "nggak" lisan (bukan "tidak"). Nama merek diucap datar, tanpa nada menuduh (atribusi "Satgas Pangan Polri nyebut" ada di kalimat sebelumnya). Kalimat pembuka cepat dan datar, seperti laporan kejadian, tanpa nada heboh.

## Peta jeda (arahan editor; JANGAN disalin ke ElevenLabs)
`/` ≈ 0,25 dtk · `//` ≈ 0,6 dtk · KAPITAL = tekanan
Polisi bawa lima merek beras PREMIUM ke balai uji.
Kita rela bayar lebih buat label premium, / karena kedengarannya udah lolos STANDAR.
Satgas Pangan Polri nyebut mereknya satu per satu. Sania, Setra Ramos, Jelita, sampai Anak Kembar. Kata Polri, beratnya nggak sesuai, / harganya lewat batas pemerintah. Sampai hari ini, kasusnya belum DIVONIS.
// Anehnya, Satgas juga nyebut ada produsen yang nggak pernah uji lab SEJAK BERDIRI. Buat produsen kayak gitu, label premium lahir duluan, / ujinya nunggu POLISI datang.
Masalahnya, ceritanya nggak berhenti di lima merek. Kementan mengklaim udah nguji ratusan sampel dari sepuluh provinsi. Lebih dari DELAPAN PULUH LIMA PERSEN beras premiumnya nggak sesuai mutu. Hitungan Kemendag, karung lima kilonya bisa kemahalan sekitar EMPAT BELAS RIBU.
Karung premium terakhir yang kamu angkat ke kasir: / kamu bayar berasnya, atau TULISANNYA?

## Prompt (salin apa adanya ke ElevenLabs)
[serious] Polisi bawa lima merek beras premium ke balai uji.
[warmly] Kita rela bayar lebih buat label premium, karena kedengarannya udah lolos standar.
[curious] Satgas Pangan Polri nyebut mereknya satu per satu. Sania, Setra Ramos, Jelita, sampai Anak Kembar. [serious] Kata Polri, beratnya nggak sesuai, harganya lewat batas pemerintah. Sampai hari ini, kasusnya belum divonis.
[pause] [mysteriously] Anehnya, Satgas juga nyebut ada produsen yang nggak pernah uji lab sejak berdiri. [slowly] Buat produsen kayak gitu, label premium lahir duluan, ujinya nunggu polisi datang.
[serious] Masalahnya, ceritanya nggak berhenti di lima merek. Kementan mengklaim udah nguji ratusan sampel dari sepuluh provinsi. Lebih dari delapan puluh lima persen beras premiumnya nggak sesuai mutu. Hitungan Kemendag, karung lima kilonya bisa kemahalan sekitar empat belas ribu.
[warmly] Karung premium terakhir yang kamu angkat ke kasir: kamu bayar berasnya, atau tulisannya?
