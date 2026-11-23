# VO ARSIP KASUS #018 bankkeliling — ElevenLabs (Saos Cocol R86jddkroI9bJwXFfjsr, eleven_v4; jalur utama v7.0 = konektor, 1 take, ulang hanya setelah user setuju)
Teks bersih (alignment/QA Whisper, caption): `script_vo.txt` (v5 23 Nov 2026; skrip v4 23 Nov 2026, `references/10-kitab-cerita.md`). **Menunggu persetujuan user sebelum kredit dipakai.** Tag `[...]` hanya arahan nada ElevenLabs (tidak diucapkan); `[pause]` = hening ±0,5–0,6 dtk tepat sebelum The Turn ("Masalahnya"). Ekor akhir ≤ 0,15 dtk (`vo_chain.py`). Target take mentah: Ringkas 35–42 dtk (estimasi ±41 dtk); bila lebih, rapatkan jeda dulu, lalu `atempo` ≤ 1,10. H1 harus selesai ≤ 4,0 dtk (estimasi ±3,8 dtk; cek di `vo_words.json`).

**Pelafalan:** semua angka diucap penuh ("seratus delapan puluh", "dua ratus empat puluh ribu", "dua ratus ribu", "dua puluh ribu", "sepuluh ribu", "empat puluh ribu"). "bank keliling" jelas dan sedikit ditekan di H1 (keluhan user: topiknya harus langsung terdengar). "nyembunyiin" lisan. "pinjol" = pin-jol. Nada: tenang, dekat ("Bayangin kamu…"), lalu getir di kalimat pinjol; penutup ringan, tanpa menggurui.

## Peta jeda
v5: jeda mengikuti tanda baca; hening ±0,6 dtk sebelum "Masalahnya". Tabel AV README = v4, diselaraskan setelah user setuju.

## Prompt (salin apa adanya ke ElevenLabs)
[serious] Bank keliling di Klaten bunganya lebih kejam dari pinjol.
[curious] Padahal di kertas, pinjamannya kelihatan murah.
[warmly] Kamu pinjam dua ratus ribu. Langsung dipotong dua puluh ribu, yang cair seratus delapan puluh.
[warmly] Cicilannya sepuluh ribu sehari, selama dua puluh empat hari. Totalnya dua ratus empat puluh ribu.
[curious] Bunganya cuma empat puluh ribu. Kedengarannya wajar, kan?
[pause] [serious] Masalahnya, empat puluh ribu itu dihitung dari dua ratus ribu. Yang kamu pegang cuma seratus delapan puluh.
[serious] Kalau dihitung per hari kayak pinjol, bunganya lebih dari lima kali lipat batas pinjol legal.
[sarcastic] Pinjol yang sering kita maki aja nggak boleh semahal itu.
[slowly] Sepuluh ribu sehari kedengarannya ringan. Bunganya yang nggak ringan.
