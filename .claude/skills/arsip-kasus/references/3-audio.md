# 3. Audio
Dikerjakan **setelah visual disetujui**. Tanpa API key berbayar: musik = MIDI yang ditulis dengan kode lalu dirender fluidsynth + FluidR3_GM (MIT); SFX = disintesis numpy/scipy. Contoh lengkap: `stories/molase/film/score_full.py` dan `fullmix.py`.

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

## C. SFX (fungsi di `fullmix.py`)
`roar` (gemuruh: noise < 220 Hz + sub), `thud` (slam/stempel besar), `stampS`, `ping` (logam/paku), `crack` (kayu), `whoosh`, `boom` (ledakan), `screech` (logam bengkok), `groan` (tangki berderit), `gloop` (cairan kental), `plink` (tetes), `flip` (halaman), `air` (ambience), `horn` (kapal).
Setiap kejadian di layar yang punya bunyi diberi SFX pada detik yang sama (ambil waktunya dari `film.js`: awal panel + waktu kejadian di dalam panel).

## D. Loudness & mux
`loudnorm=I=-14:TP=-1:LRA=11` → hasil terukur ±−14,5 LUFS, peak −1 dBTP (cek: `ffmpeg -i f.mp4 -af ebur128=peak=true -f null -`). AAC 192 kbps, 48 kHz.

## E. QA audio tanpa telinga (`film/check_audio.py`)
Claude tidak bisa mendengar, jadi setiap mix dicek dengan alat dan hasilnya dilaporkan apa adanya:
1. **Kejelasan VO:** Whisper pada mix akhir vs Whisper pada VO saja. Angka harus sama (musik/SFX tidak menutupi kata). #002: 93/102 = 93/102.
2. **Timing SFX:** onset pada stem SFX dibandingkan dengan daftar cue di `fullmix.py`.
3. Level pita bicara VO vs latar (dicetak `fullmix.py`) ≥ 10 dB.
Rasa musik dan karakter SFX tetap dinilai user.
