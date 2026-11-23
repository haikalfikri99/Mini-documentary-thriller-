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
- **[SUPERSEDED by v7.0: "target 2,6–2,7 kata/dtk" = riwayat #004; standar tunggal sekarang 2,50–2,66 kata/dtk, atempo ≤ 1,10 (§K)]** Keputusan #004 (user: 2,66 enak; rentang aman 2,5–2,8; jangan < 2,3). Riset Apify 14 Nov (`research/niche/RISET_VO_TEMPO.md`, 28 Shorts narasi Indonesia dari 4 channel): tempo **tidak membedakan** Short laku vs gagal (median 2,21 vs 2,23 dari caption otomatis, p = 0,998), jadi tempo cukup dijaga di rentang wajar; kejelasan dan cerita yang menentukan. Riset lama: pemenang diukur dari audio rata-rata 2,97 (2,63–3,23), pemenang Indonesia 2,63/2,66/3,10 (rata-rata 2,80), gagal 2,20–2,71 (`RISET_AUDIO_CAPTION_META.md`, n=11, lemah). Tanpa sunyi > 0,3 dtk (satu-satunya pengecualian: hening `//` 0,5–0,8 dtk sebelum The Turn/pukulan, §K); bunyi mulai ≤ 0,15 dtk. ElevenLabs Saos Cocol eleven_v4 cenderung ±2,25 kata/dtk → proses: `kit/audio/vo_tighten.py` (rapatkan jeda, lalu atempo **maks 1,10**, nada tetap; keputusan user 15 Nov 2026); cek Whisper masih mengenali semua kata. Alignment: `kit/tools/align_vo.py`.
- Bunyi mulai ≤ 0,2 dtk; tanpa jeda hening panjang (satu-satunya jeda 8,8 dtk ada di video gagal).
- Loudness −14 LUFS dipertahankan (loudness tidak membedakan performa); bed musik boleh ada/tidak.

## G. ARSIP Kolase (#003): foley otomatis + ansambel kecil
- **Kejadian suara dari animasi:** `node kit/tools/render_2d.mjs <kolase> events` merekam setiap slap/slide/pat/drop/stempel/ketikan/coretan/pena yang terjadi di layar (waktu film + pan + ukuran) ke `events.json`. `fullmix.py` memetakan jenis → foley kertas (`paperSlap`, `paperSlide`, `paperPat`, `stampThump`, `penScratch`, `typeKey`). Potongan yang keluar layar = geser lembut, bukan dentuman.
- **Aturan pukulan di dalam kata:** bila slap/stempel jatuh di dalam kata yang diucapkan, hanya badan < 200 Hz yang dipakai (`hit=True`). Ini yang membuat #003 lulus tanpa kata < 8 dB.
- **Level #003:** foley ×0,75, musik −32 dBFS RMS, VO −17 → margin terburuk 19,8 dB.
- **Skor:** ansambel kecil gaya lama (GM 45 pizzicato, 70 bassoon, 58 tuba, 71 clarinet, 9 glockenspiel, 13 xilofon, 47 timpani, 115 woodblock, 44 tremolo), satu ide per babak; minor "licik" untuk misteri/kesalahan, mayor hangat untuk jawaban yang menenangkan; timpani pada stempel vonis (BODOH?, MUSUH, TERUNGKAP, DIBANTAH); tanpa piano/strings generik.
- Mux: grain tipis `noise=alls=2`, CRF 21, `loudnorm I=-14:TP=-1.5` → file ±35 MB/56 dtk (kirim preview CRF 27 bila file > 30 MB gagal terkirim).

## H. Pelajaran #004 (gerbang Whisper)
- Gerbang `mix ≥ VO` bisa gagal 1–2 kata tanpa ada kata yang tertutup (penyebab: normalisasi level VO di `Mixer`, bukan masking). **Diagnosis wajib sebelum mengubah mix:** ulang mix dengan musik dibisukan, lalu dengan foley dibisukan. Bila keduanya tetap gagal dan margin per kata lulus (tidak ada < 8 dB), render boleh lanjut dan angka apa adanya ditulis di UPLOAD.md.
- Pukulan musik pada stempel yang jatuh di awal kata ("didenda"): timpani boleh di stempel, tuba/glock ditaruh **sesudah** kata. `fullmix.py`: pukulan yang mendarat ≤ 0,2 dtk sebelum kata juga dianggap "di dalam kata" (hanya badan < 200 Hz).

## I. Tempo & pengucapan VO: pelajaran #004 (14 Nov; tempo kini = standar tunggal v7.0 di §K)
- Take ElevenLabs asli Saos Cocol ±2,25 kata/dtk → proses ringan: rapatkan jeda, nada tetap (atempo ≤ 1,10, §K). 2,8 kata/dtk **terasa ngebut** bagi user; pembanding narasi Kok Bisa 2,66 dan Kamus Unik 2,63 → **pakai 2,66** (rentang standar 2,50–2,66). **[SUPERSEDED by v7.0: "atempo ±1,12" dan "tempo 2,60–2,75" di log #004 = riwayat; standar tunggal di §K]**
- Suara yang aslinya pelan lalu dipercepat terdengar lebih terburu-buru daripada suara yang cepat sejak awal. eleven_v4 tidak punya parameter speed (hanya stability/similarity; biarkan default), jadi tempo dirapatkan di `vo_chain.py`/`vo_tighten.py`.
- Uji di kanal sendiri: bandingkan stayed-to-watch antar episode dengan tempo berbeda (hook sejenis), riset luar hanya titik awal.
- Cek pengucapan: "KPPU" per huruf (ka-pe-pe-u), "tiga belas koma delapan miliar" (bukan "tiga belas delapan"), nama merek asing ("Le Minerale"), istilah Inggris di layar boleh asing. Kalimat pertama selesai ≤ 2,2 dtk, tanpa jeda di 3 dtk pertama, suara mulai di detik 0.
- **Generate lewat konektor ElevenLabs (sejak 15 Nov 2026):** kredit ±1 per karakter prompt per versi; `generations_count` = n versi = n× kredit. Default hemat: **1 versi per episode**, cek Whisper (small; kata yang dicurigai dicek ulang dengan medium pada potongan audio), generate ulang hanya episode yang gagal, setelah melapor dan atas persetujuan user. Selalu `estimate_only` dulu bila belum tahu biayanya.
- **[DIARSIPKAN → arsip-riwayat/3-audio_baris62-73.md]** log mentah #004 (angka proses jeda, kredit batch #005–#008) dan pengaturan lama "2 take, user menaruh raw_take1/2.mp3" **[SUPERSEDED by v7.0: 1 take]**.
## J. Tight Audio Tail ≤ 0,15 dtk (v5.0, untuk auto-replay)
Hening setelah suku kata terakhir dipangkas ≤ 0,15 dtk tanpa fade-out panjang, supaya replay langsung menyambar frame 0 (Circular Reframe Loop, `1-cerita…` §F3) **[SUPERSEDED by v6.1: Conceptual Loop `1-cerita…` §M8; ekor ≤ 0,15 dtk tetap berlaku]**. Ambang "terdengar" = tingkat jangka pendek (jendela 10 ms) di atas −45 dBFS setelah VO dinormalkan ke −17 dBFS RMS.
- `kit/audio/vo_tail.py` (`voiced_end`, `trim_tail`: potong ke bunyi terakhir + 0,15 dtk dengan fade cosinus 12 ms agar tidak berdetak).
- `kit/audio/vo_chain.py` memangkas `vo_level.wav` dan mencetak "tail: source … → vo_level.wav … (last audible sound …, tail … ≤ 0.15 s)"; memberi peringatan bila `episode.json` dur lebih dari ±0,5 dtk sesudah bunyi terakhir.
- `kit/tools/line_starts.py` kini menetapkan `dur` = min(durasi file, bunyi terakhir + 0,15 dtk), jadi film berakhir tepat sesudah VO. Episode lama (#004: dur 53,64 dtk, bunyi terakhir 53,42) tidak diubah.
- **Batch #005–#008 (15 Nov 2026), `kit/audio/vo_tighten.py`:** guardrail user = jeda dulu (titik 0,18–0,25, koma 0,10–0,15, elipsis 0,25), **atempo tidak pernah > 1,10**; bila 1,10 belum cukup, durasi dibiarkan lebih panjang (suara natural lebih penting). Temuan: take eleven_v4 Saos Cocol **sudah rapat** (hening sungguhan antar-kalimat hanya ±0,30–0,45 dtk, total hening 4,8–7,6 dtk per take), jadi merapatkan jeda hanya menghemat 0,5–1,8 dtk; durasi ditentukan kecepatan ucapnya. Hasil: #005 56,35 dtk (2,55 kata/dtk, 1,10x, di atas target 55), #006 54,70 (2,66, 1,053x), #007 53,46 (2,50, 1,10x), #008 54,42 (2,65, 1,10x). Celah Whisper 0,3–0,46 dtk di tanda baca berisi napas/ekor suara, bukan hening (dicek dengan level energi: hening > 0,3 dtk = 0). **Pelajaran untuk naskah berikutnya:** take mentah Saos Cocol ±2,24–2,50 kata/dtk → naskah ≤ 135 kata bila ingin ≤ 55 dtk tanpa melewati 1,10x.
- File sumber VO tidak pernah diubah. **[SUPERSEDED by v7.0: "tempo tetap 2,60–2,75" → 2,50–2,66, §K]** Gerbang QA audio tetap berlaku.

## K. v7.0 (20 Nov 2026): jalur VO utama = konektor ElevenLabs
**Standar tunggal VO (v7.0; menang atas "2 take", "2,6–2,7", "atempo ±1,2" di §F–§J dan `SKILL.md`; brief perbaikan #4, 23 Nov 2026):**
| Parameter | Nilai |
|---|---|
| Take | **1 take** via konektor; ulang hanya setelah user setuju (kredit) |
| Tempo | **2,50–2,66 kata/dtk** (`vo_tighten.py --wps 2.66`); atempo **≤ 1,10** (jeda dirapatkan dulu; bila belum cukup, durasi dibiarkan lebih panjang) |
| Hening `//` | **0,5–0,8 dtk** sebelum The Turn/pukulan (`AGENTS.md` §2 menulis 0,5–0,6 sebagai nilai tengah) |
| Jeda `/` | ≈ 0,25 dtk (titik 0,18–0,25; koma 0,10–0,15) |
| Kalimat | ideal 8–13 kata; peringatan linter > 17 |
| H1 | ≤ 14 kata dan selesai ≤ 4,0 dtk; bunyi mulai ≤ 0,15 dtk |
| Mode durasi | Ringkas 35–42 dtk / 85–105 kata · Investigasi 48–55 dtk / 115–135 kata, selang-seling |
| Ekor | ≤ 0,15 dtk (§J) |

Jalur utama generasi VO sejak #009 (dipertegas v7.0) = **konektor ElevenLabs yang terhubung di akun**: `audio/vo_prompt_elevenlabs.md` jadi acuan ekspresi/jeda, **1 take**, ulang hanya setelah user setuju (kredit). Saos Cocol `R86jddkroI9bJwXFfjsr`, `eleven_v4`. Tight audio tail ≤ 0,15 dtk tetap (§J). Generate manual oleh user di web tetap cadangan. Catatan: `raw_take1.mp3`/`raw_words.json` dihapus dari repo (20 Nov 2026) untuk memperkecil ukuran; `vo_tighten.py` perlu take mentah baru bila VO harus dirapatkan ulang. Kalau gerbang Whisper gagal karena kata yang konsisten salah dikenali pada VO murni juga (#014 "ongkir"), bandingkan dengan Whisper VO tanpa musik dan catat pengecualiannya di `UPLOAD.md`.
