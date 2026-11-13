# 3. Audio
Tanpa API key berbayar: musik = MIDI yang ditulis dengan kode lalu dirender fluidsynth + FluidR3_GM (MIT); SFX = disintesis numpy/scipy. **Kit:** `kit/audio/score_lib.py` (skor), `kit/audio/arsip_audio.py` (±35 SFX + `Mixer` standar), `kit/audio/vo_chain.py`, `kit/audio/check_audio.py`; episode hanya menulis not (`kolase/score_full.py`) dan aturan foley (`kolase/fullmix.py`). Contoh lengkap: `stories/micin/kolase/`.

## A. Prioritas (prinsip Murch): VO selalu nomor satu
**Rantai VO** (file asli tidak diubah):
1. High-pass 100 Hz (membuang dengung/rumble; VO film #001 punya dengung bass di 2,3 dtk pertama).
2. Leveller per frasa pada pita 300 Hz–4 kHz (jendela 300 ms, ±12 dB, celah sunyi dibiarkan), dihaluskan 250 ms.
3. Presence lift 2–5 kHz (+50%), lalu normalisasi ke −17 dBFS RMS.

**Latar menyingkir saat VO bicara:** envelope VO (attack 40 ms, release 250 ms) →
- musik: −6 dB tambahan + pita 1–4 kHz dikurangi 60%;
- SFX: pita 700 Hz–4,5 kHz dikurangi 70%.
Skor diset ±15 dB di bawah VO (`-32 dBFS RMS`) sebelum ducking.

**Ukur, jangan menebak:** `fullmix.py` mencetak level VO vs latar pada 300 Hz–4 kHz per bagian. Target ≥ 10 dB; momen benturan boleh ±7 dB asalkan dentuman ditaruh < 260 Hz atau tepat sesudah kata (contoh: "pecah").

## B. Skor per babak (MIDI)
Saluran GM yang dipakai: 44 tremolo strings, 61 brass, 47 timpani, 116 taiko, 55 orchestra hit, 49 slow strings, 8 celesta, 45 pizzicato, 43 contrabass, 58 tuba/low brass, 14 tubular bells, 10 music box. Kunci D minor.
| Babak | Musik |
|---|---|
| Hook | tremolo + brass & taiko di frame 1, roll timpani ke slam |
| Intro misteri | slam orchestra hit, drone D–Eb, swell low brass di kata kunci |
| Tempat & waktu | motif celesta polos di atas pizzicato "jam", satu nada sumbang saat tokoh menyadari ancaman |
| Pecah | tremolo naik, "ping" per kejadian, hentakan + jeda |
| Eskalasi | ostinato low strings 8th, timpani, stab brass tepat di kata kunci |
| Tanda bahaya | music box + string lembut, manis tapi janggal |
| Penyebab | denyut pizzicato makin keras, hit low brass per stempel |
| Korban | hampir sunyi, lonceng di angka |
| Penutup | motif polos kembali di atas disonansi, hit terakhir di kata terakhir |

## C. SFX (fungsi di `kit/audio/arsip_audio.py`)
`roar` (gemuruh: noise < 220 Hz + sub), `thud` (slam/stempel besar), `stampS`, `ping` (logam/paku), `crack` (kayu), `whoosh`, `boom` (ledakan), `screech` (logam bengkok), `groan` (tangki berderit), `gloop` (cairan kental), `plink` (tetes), `flip` (halaman), `air` (ambience), `horn` (kapal).
Sejak #003 waktu SFX diambil **otomatis** dari kejadian di layar (bagian G), bukan ditulis tangan.

## D. Loudness & mux
`loudnorm=I=-14:TP=-1:LRA=11` → hasil terukur ±−14,5 LUFS, peak −1 dBTP (cek: `ffmpeg -i f.mp4 -af ebur128=peak=true -f null -`). AAC 192 kbps, 48 kHz.

## E. QA audio tanpa telinga (`kit/audio/check_audio.py`)
Claude tidak bisa mendengar, jadi setiap mix dicek dengan alat dan hasilnya dilaporkan apa adanya:
1. **Kejelasan VO:** Whisper pada mix akhir vs Whisper pada VO saja. Mix harus **≥** VO (musik/SFX tidak menutupi kata). Whisper bervariasi ±2–3 kata pada kata pendek/gaul ("nggak"): bila gagal tipis padahal margin per kata lulus, turunkan foley (`FOLEY`) atau musik 2 dB, jangan mengakali gerbang. #003: 118/143 ≥ 116/143.
2. **Timing SFX:** onset pada stem SFX dibandingkan dengan daftar cue di `fullmix.py`.
3. Level pita bicara VO vs latar (dicetak `fullmix.py`) ≥ 10 dB.
Rasa musik dan karakter SFX tetap dinilai user.

## F. Pelajaran #002
- Laporan margin per bagian bisa menyembunyikan satu kata yang tertutup: dentuman + denting + hentakan musik tepat di "hilang" = 3 dB. Sejak #002 `Mixer.finish(words=…)` melaporkan setiap kata < 8 dB; targetnya **none**.
- Bunyi UI (swipe) diletakkan di atas pita bicara (4,2–9,5 kHz); denting koin/kaca dipelankan saat VO bicara; piano tidak ditaruh di atas kata kunci yang diucapkan pelan.
- "Tanpa suara di sini" pada satu kata = stempel waktu alignment meleset → koreksi `vo_words.json` (caption ikut benar).

## Revisi v4.1 (13 Nov 2026, `research/niche/RISET_AUDIO_CAPTION_META.md`, sampel 11 video — lemah)
- Tempo VO target **2,6–3,0 kata/dtk** (#002 2,24 terlalu lambat); minta ElevenLabs bicara lebih cepat/bertenaga; speed bisa dinaikkan ringan saat proses.
- Bunyi mulai ≤ 0,2 dtk; tanpa jeda hening panjang (satu-satunya jeda 8,8 dtk ada di video gagal).
- Loudness −14 LUFS dipertahankan (loudness tidak membedakan performa); bed musik boleh ada/tidak.

## G. ARSIP Kolase (#003): foley otomatis + ansambel kecil
- **Kejadian suara dari animasi:** `node kit/tools/render_2d.mjs <kolase> events` merekam setiap slap/slide/pat/drop/stempel/ketikan/coretan/pena yang terjadi di layar (waktu film + pan + ukuran) ke `events.json`. `fullmix.py` memetakan jenis → foley kertas (`paperSlap`, `paperSlide`, `paperPat`, `stampThump`, `penScratch`, `typeKey`). Potongan yang keluar layar = geser lembut, bukan dentuman.
- **Aturan pukulan di dalam kata:** bila slap/stempel jatuh di dalam kata yang diucapkan, hanya badan < 200 Hz yang dipakai (`hit=True`). Ini yang membuat #003 lulus tanpa kata < 8 dB.
- **Level #003:** foley ×0,75, musik −32 dBFS RMS, VO −17 → margin terburuk 19,8 dB.
- **Skor:** ansambel kecil gaya lama (GM 45 pizzicato, 70 bassoon, 58 tuba, 71 clarinet, 9 glockenspiel, 13 xilofon, 47 timpani, 115 woodblock, 44 tremolo), satu ide per babak; minor "licik" untuk misteri/kesalahan, mayor hangat untuk jawaban yang menenangkan; timpani pada stempel vonis (BODOH?, MUSUH, TERUNGKAP, DIBANTAH); tanpa piano/strings generik.
- Mux: grain tipis `noise=alls=2`, CRF 21, `loudnorm I=-14:TP=-1.5` → file ±35 MB/56 dtk (kirim preview CRF 27 bila file > 30 MB gagal terkirim).
