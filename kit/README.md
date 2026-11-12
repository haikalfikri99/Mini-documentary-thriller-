# KIT — alat produksi channel Mini Thriller IDN (gaya terkunci sejak ARSIP #002)
Semua video baru dibuat dari kit ini. Gaya visual, karakter, kartu arsip, caption, audio, dan pipeline render **tidak didesain ulang per episode**: episode hanya mengisi cerita, shot, dan cue.

## Peta folder
| Folder | Isi |
|---|---|
| `src/arsip-rig.js` | **ARSIP RIG**: satu base karakter (IK, jalan dengan kaki menapak, pegas, kedip/napas otomatis di film), aset modular, 24 preset, tangan close-up `handPhoneCU` |
| `src/scene-kit.js` | cahaya & lensa: `pool`, `shaft`, `shadowFall`, `depth` (DOF blur), `vignette`, `grain`, gradien, bayangan kontak |
| `src/sets-lib.js` | set & prop dari #002: kamar malam (setA), kantor 2006 (setB/deskB/propsB), kamar tidur 01.47 (setC/bed), rumah 2006 (setE), aula arsip (setD), lorong feed (tunnel), feed/kartu, monitor tabung + browser lama, tombol, kursor tangan, teks layar |
| `src/arsip-card.js` | **kartu ARSIP KASUS** (templat wajib, tata letak #001) |
| `src/film-engine.js` | timeline shot + kamera (push/pan/slam/cuts/shake) + flash transisi |
| `audio/arsip_audio.py` | pustaka SFX sintetis (±35 bunyi) + `Mixer` standar (ducking, carve pita suara, laporan margin per bagian **dan per kata**) |
| `audio/score_lib.py` | skor MIDI → fluidsynth + FluidR3_GM (MIT) |
| `audio/vo_chain.py` | rantai VO (high-pass, leveller per frasa, presence) → `vo_level.wav` |
| `audio/check_audio.py` | QA tanpa telinga: Whisper pada mix vs VO, onset SFX |
| `tools/build_captions.py` | caption per kata dari `episode.json` |
| `tools/new_episode.sh` | buat episode baru dari `template/` |
| `tools/make_film.sh` | satu perintah: VO → caption → skor → mix → check → render → mux −14 LUFS → QA |
| `template/film/` | kerangka episode (index, film.js, shots.js contoh, episode.json, score, mix) |
| `src/cam3d.js` + `HYBRID3D.md` | **kamera 3D kontinu** + handoff hybrid 2.5D/3D (karakter 2D di dunia diorama); spike di `lab/hybrid-spike/` |
| `lab/` + `renders/` | lembar acuan semua aset (model sheet, 26 ekspresi, 15 rambut, wajah/kepala/aksesori, wardrobe, 24 preset, tangan, uji gerak) |

## Alur episode baru
```bash
kit/tools/new_episode.sh <slug> <no> <durasi_vo_detik>      # stories/<slug>/ siap
# taruh VO: stories/<slug>/audio/vo_<slug>.mp3 → alignment kata → audio/vo_words.json (SKILL.md langkah 4)
# bangun shot di film/shots.js (rig + sets-lib + arsip-card), timing di film/film.js, cue di fullmix.py, musik di score_full.py
kit/tools/make_film.sh stories/<slug>/film 1                   # → stories/<slug>/renders/ARSIP_<no>_<slug>_v1.mp4
```
Pratinjau: `cd stories/<slug>/film && npx hyperframes snapshot --at 0.5,2.5,…` · storyboard keyframe: `film/board/`.

## Keputusan gaya (jangan diubah tanpa alasan baru)
| Keputusan | Alasan |
|---|---|
| Kepala bentuk tetap, kulit default **sawo matang** `#b5815a`, fitur wajah coklat tua | studi warna (`renders/studi_warna_kepala.png`): satu-satunya yang terbaca malam & siang; hitam = meniru referensi |
| Ekspresi = stiker; kulit per tokoh (`SKIN.sawo/langsat/terang/gelap`) | konsisten, tidak pernah ada wajah "salah"; tokoh asing tanpa rig baru |
| Satu sumber cahaya per shot + rim warna sumber + pool + vignette + grain + DOF 3 lapis | `research/referensi/ANALISA_VISUAL_2D.md` |
| Warna ancaman = cahaya layar `#7fe3ff`; rem/aksen cerita = amber `#ffb43a` | satu warna jenuh per makna |
| Kamera selalu bergerak pelan; insert top-down untuk tangan & HP | ritme referensi (shot 1,7–2 dtk) |

## Aset (lihat `renders/05`–`09`)
- **Ekspresi (26):** netral, senyum, senang, kaget, takut, marah, sedih, curiga, lelah, menyesal, bingung, kesakitan, menangis, panik, lega, tertawa, kagum, cemas, berpikir, ngantuk, berteriak, tersipu, sinis, jijik, licik, terkejut. Mulut lipsync: A, E, O, M.
- **Rambut (15):** pendek, cepak, belah, jambul, poni, bob, gondrong, panjang, ikal_panjang, kuncir, kepang, sanggul, keriting, botak (uban samping), none
- **Rambut wajah (7):** kumis, kumis_tipis, jenggot, janggut_kambing, brewok, cambang, stubble
- **Penutup kepala (8):** peci, kerudung, topi, helm, kupluk, blangkon, caping, fedora
- **Aksesori:** kacamata, kacamata_hitam, masker, anting, syal, dasi, kalung_id, tas
- **Atasan (16):** kaos, kemeja, kemeja_kotak, batik, koko, polo, hoodie, jaket, jas, jas_lab, seragam, rompi, singlet, kebaya, daster, gamis
- **Bawahan (6):** panjang, jeans, pendek, rok, rok_panjang, sarung
- **Preset (24):** pria, wanita, ibu, kakak, kakek, nenek, adik_lk, adik_pr, pelajar, pelajar_pr, mahasiswa, karyawati, bapak, ustadz, ojol, tukang, ilmuwan, petani, priyayi, detektif, remaja, ibu_rumah, pria_gondrong, gadis_kepang

## Pakai rig
```js
import { drawChar, PRESETS, SKIN, walk, spring, handPhoneCU } from './rig/arsip-rig.js';
drawChar(ctx, { ...PRESETS.mahasiswa, skin: SKIN.langsat }, { x: 540, y: 1500, s: 1.4, facing: .3, expr: 'cemas', rh: [80, 20], hold: 'hp' },
         { rim: { col: '#7fe3ff', dir: [.75, .4], w: 6 }, amb: '#3d3650', ambK: .18 });
```
**Spec:** `body` (adult/child), `height`, `build`, `stoop`, `skin`, `feat`, `hair{type,col,tie}`, `headwear{type,col}`, `acc[{type,col}]`, `top{type,col,col2,badge}`, `bottom{type,col,col2}`, `shoes`.
**Pose:** `x,y,s`, `facing` (−1 … 1), `lean`, `crouch`, `bob`, `lf/rf`, `lh/rh` (target tangan relatif bahu), `headTilt`, `look`, `gaze`, `expr`, `mouth`, `blink`, `hold:'hp'`, `phoneBack`, `stringSway`, `hairSway`. Duduk: `seated()`; rebahan: putar tokoh −90°; top-down: tampak depan di atas kasur.
**Opsi:** `rim{col,dir,w}`, `amb`, `ambK`, `lightHead`, `noShadow`.

## Menambah aset
Satu cabang `type` di `drawHair` (rambut/penutup kepala), `drawFace` (wajah/aksesori wajah), torso/skirt di `drawChar` (wardrobe), lalu daftarkan di `ASSETS` dan tambahkan satu sel di `lab/sheets.js`, render lembar, cek visual. Aset yang dibuat untuk satu episode langsung masuk kit agar dipakai ulang.
