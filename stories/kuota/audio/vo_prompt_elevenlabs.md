# VO ARSIP KASUS #020 kuota — ElevenLabs (Saos Cocol R86jddkroI9bJwXFfjsr, eleven_v4; jalur utama v7.0 = konektor ElevenLabs, 1 take, ulang hanya setelah user setuju)
**Skrip v4 Claude (23 Nov 2026, `references/10-kitab-cerita.md`), menunggu persetujuan user sebelum kredit dipakai.** Teks bersih: `script_vo.txt` (104 kata, Mode Ringkas). Tag `[...]` hanya arahan nada (tidak diucapkan); `[pause]` = hening ±0,5–0,6 dtk tepat sebelum The Turn ("Masalahnya"). Ekor akhir ≤ 0,15 dtk (`vo_chain.py`). Target take mentah 35–42 dtk (estimasi ±41 dtk); bila lebih, rapatkan jeda dulu, lalu `atempo` ≤ 1,10. H1 (8 kata) harus selesai ≤ 4,0 dtk (cek `vo_words.json`; estimasi 3,1 dtk).
**Pelafalan:** "giga" = gi-ga; "Didi Supandi" jelas; "driver" = drai-ver; "ojol" = o-jol; "MK" = em-ka; "Komdigi" = kom-di-gi; "rollover" = rol-o-ver; "Telkomsel", "Indosat" lafal Indonesia; "XLSmart" = eks-el-smart; "HP-mu" = ha-pe-mu; angka diucap penuh. Nada: H1 dekat dan sedikit cemas (seperti melihat layar sendiri); hangat-bangga di "dia menang"; dingin mulai "Masalahnya"; nama operator dibaca datar, seperti membacakan laporan (tanpa nada mengejek); "Perlindungannya? Notifikasi." = jeda kecil, jawaban datar-getir; kalimat terakhir pelan, tanpa ceramah.

## Peta jeda (arahan editor; JANGAN disalin ke ElevenLabs)
`/` ≈ 0,25 dtk · `//` ≈ 0,6 dtk · KAPITAL = tekanan
Sisa kuotamu DUA PULUH GIGA, / besok pagi HANGUS.
Uangmu ikut LENYAP. / Kebanyakan orang cuma ngedumel. Didi Supandi, driver ojol, / bawa kasus persis kayak gini ke MK.
Juli lalu, dia MENANG: / sisa kuota diakui milik pengguna. Sebulan kemudian, Komdigi MELARANG operator narik biaya tambahan buat sisa kuota.
// Masalahnya, akhir September operator wajib LAPOR. Telkomsel, TUJUH PULUH ENAM dari sembilan puluh lima paket belum rollover. Indosat, TUJUH PULUH SATU dari sembilan puluh empat. / XLSmart, sembilan dari seratus satu.
Perlindungannya? / NOTIFIKASI. Pejabat Komdigi sendiri bilang, / notifikasi BUKAN SOLUSI buat kuota yang terlanjur nggak kepakai.
Pesan masa aktif tinggal dua hari di HP-mu, / buat banyak paket, / itulah PERLINDUNGANNYA.

## Prompt (salin apa adanya ke ElevenLabs)
[worried] Sisa kuotamu dua puluh giga, besok pagi hangus.
[serious] Uangmu ikut lenyap. Kebanyakan orang cuma ngedumel. [warmly] Didi Supandi, driver ojol, bawa kasus persis kayak gini ke MK.
[warmly] Juli lalu, dia menang: sisa kuota diakui milik pengguna. [serious] Sebulan kemudian, Komdigi melarang operator narik biaya tambahan buat sisa kuota.
[pause] [serious] Masalahnya, akhir September operator wajib lapor. Telkomsel, tujuh puluh enam dari sembilan puluh lima paket belum rollover. Indosat, tujuh puluh satu dari sembilan puluh empat. XLSmart, sembilan dari seratus satu.
[curious] Perlindungannya? [serious] Notifikasi. Pejabat Komdigi sendiri bilang, notifikasi bukan solusi buat kuota yang terlanjur nggak kepakai.
[slowly] Pesan masa aktif tinggal dua hari di HP-mu, buat banyak paket, itulah perlindungannya.
