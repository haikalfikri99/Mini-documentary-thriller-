# VO ARSIP KASUS #020 kuota — ElevenLabs (Saos Cocol R86jddkroI9bJwXFfjsr, eleven_v4; jalur utama v7.0 = konektor ElevenLabs, 1 take, ulang hanya setelah user setuju)
**Skrip v4 Claude (23 Nov 2026, `references/10-kitab-cerita.md`), menunggu persetujuan user sebelum kredit dipakai.** Teks bersih: `script_vo.txt` (v5 23 Nov 2026, Mode Ringkas). Tag `[...]` hanya arahan nada (tidak diucapkan); `[pause]` = hening ±0,5–0,6 dtk tepat sebelum The Turn ("Masalahnya"). Ekor akhir ≤ 0,15 dtk (`vo_chain.py`). Target take mentah 35–42 dtk (estimasi ±41 dtk); bila lebih, rapatkan jeda dulu, lalu `atempo` ≤ 1,10. H1 (8 kata) harus selesai ≤ 4,0 dtk (cek `vo_words.json`; estimasi 3,1 dtk).
**Pelafalan:** "giga" = gi-ga; "Didi Supandi" jelas; "driver" = drai-ver; "ojol" = o-jol; "MK" = em-ka; "Komdigi" = kom-di-gi; "rollover" = rol-o-ver; "Telkomsel", "Indosat" lafal Indonesia; "XLSmart" = eks-el-smart; "HP-mu" = ha-pe-mu; angka diucap penuh. Nada: H1 dekat dan sedikit cemas (seperti melihat layar sendiri); hangat-bangga di "dia menang"; dingin mulai "Masalahnya"; nama operator dibaca datar, seperti membacakan laporan (tanpa nada mengejek); "Perlindungannya? Notifikasi." = jeda kecil, jawaban datar-getir; kalimat terakhir pelan, tanpa ceramah.

## Peta jeda
v5: jeda mengikuti tanda baca; hening ±0,6 dtk sebelum "Masalahnya". Tabel AV README = v4, diselaraskan setelah user setuju.

## Prompt (salin apa adanya ke ElevenLabs)
[worried] Tiap bulan, sisa kuota yang udah kamu bayar hangus.
[warmly] Kebanyakan orang pasrah. Didi Supandi, driver ojol, nggak.
[warmly] Dia beli tiga puluh giga, kepakai sepuluh, dua puluh sisanya hangus.
[warmly] Dia bawa ke Mahkamah Konstitusi, dan Juli lalu dia menang. Hakim bilang, sisa kuota itu milik pengguna.
[serious] Komdigi lalu melarang operator narik biaya tambahan buat sisa kuota.
[curious] Terus, kenapa kuotamu masih hangus?
[pause] [serious] Masalahnya, aturan itu nggak maksa semua paket bisa disimpan. Operator cuma wajib nyediain pilihan.
[serious] Akhir September, lebih dari separuh paket yang dilaporin operator belum bisa rollover.
[serious] Komdigi sendiri bilang, pengingat masa aktif bukan solusi.
[slowly] Besok, waktu kuotamu hangus lagi, ingat: kata hakim, itu milikmu.
