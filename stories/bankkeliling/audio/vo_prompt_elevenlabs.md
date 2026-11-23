# VO ARSIP KASUS #018 bankkeliling — ElevenLabs (Saos Cocol R86jddkroI9bJwXFfjsr, eleven_v4; jalur utama v7.0 = konektor, 1 take, ulang hanya setelah user setuju)
Teks bersih (alignment/QA Whisper, caption): `script_vo.txt` (103 kata; skrip v4 23 Nov 2026, `references/10-kitab-cerita.md`). **Menunggu persetujuan user sebelum kredit dipakai.** Tag `[...]` hanya arahan nada ElevenLabs (tidak diucapkan); `[pause]` = hening ±0,5–0,6 dtk tepat sebelum The Turn ("Masalahnya"). Ekor akhir ≤ 0,15 dtk (`vo_chain.py`). Target take mentah: Ringkas 35–42 dtk (estimasi ±41 dtk); bila lebih, rapatkan jeda dulu, lalu `atempo` ≤ 1,10. H1 harus selesai ≤ 4,0 dtk (estimasi ±3,8 dtk; cek di `vo_words.json`).

**Pelafalan:** semua angka diucap penuh ("seratus delapan puluh", "dua ratus empat puluh ribu", "dua ratus ribu", "dua puluh ribu", "sepuluh ribu", "empat puluh ribu"). "bank keliling" jelas dan sedikit ditekan di H1 (keluhan user: topiknya harus langsung terdengar). "nyembunyiin" lisan. "pinjol" = pin-jol. Nada: tenang, dekat ("Bayangin kamu…"), lalu getir di kalimat pinjol; penutup ringan, tanpa menggurui.

## Peta jeda (arahan editor; JANGAN disalin ke ElevenLabs)
`/` ≈ 0,25 dtk · `//` ≈ 0,6 dtk · KAPITAL = tekanan
Pinjaman BANK KELILING dua ratus ribu, / cairnya SERATUS DELAPAN PULUH.
Bayangin kamu pedagang pasar, / butuh modal belanja besok pagi. Potongan dua puluh ribu kedengarannya WAJAR. Cicilannya ringan, / sepuluh ribu SEHARI.
Dua puluh empat hari kemudian, / total setoranmu DUA RATUS EMPAT PULUH RIBU. Bunganya kelihatan cuma EMPAT PULUH RIBU.
// Masalahnya, angka itu dihitung dari DUA RATUS RIBU / yang nggak pernah utuh kamu pegang. Potongan di awal itu NYEMBUNYIIN bunga aslinya.
Dihitung per hari, / bunganya LEBIH DARI LIMA KALI LIPAT batas pinjol berizin. Pinjol yang sering kita MAKI / aja dibatasi jauh di bawah itu.
Kotak kedua puluh empat dicoret lunas, / sampai kamu butuh MODAL LAGI.

## Prompt (salin apa adanya ke ElevenLabs)
[serious] Pinjaman bank keliling dua ratus ribu, cairnya seratus delapan puluh.
[warmly] Bayangin kamu pedagang pasar, butuh modal belanja besok pagi. Potongan dua puluh ribu kedengarannya wajar. Cicilannya ringan, sepuluh ribu sehari.
[curious] Dua puluh empat hari kemudian, total setoranmu dua ratus empat puluh ribu. Bunganya kelihatan cuma empat puluh ribu.
[pause] [serious] Masalahnya, angka itu dihitung dari dua ratus ribu yang nggak pernah utuh kamu pegang. [slowly] Potongan di awal itu nyembunyiin bunga aslinya.
[serious] Dihitung per hari, bunganya lebih dari lima kali lipat batas pinjol berizin. [sarcastic] Pinjol yang sering kita maki aja dibatasi jauh di bawah itu.
[warmly] Kotak kedua puluh empat dicoret lunas, sampai kamu butuh modal lagi.
