# ARSIP RIG: satu base karakter untuk semua video channel
Modul: `src/arsip-rig.js` (Canvas2D murni, tanpa dependensi, deterministik, aman untuk seek HyperFrames).
Lab dan lembar acuan: `lab/` (`npx hyperframes snapshot` / `render`), hasil di `renders/`.

## Keputusan desain
| Keputusan | Alasan |
|---|---|
| Satu kerangka, semua orang | pria, wanita, anak, lansia = parameter + aset, bukan rig baru |
| Kulit default **sawo matang** `#b5815a`, fitur wajah coklat tua | hasil studi warna (`renders/studi_warna_kepala.png`): satu-satunya yang terbaca di malam dan siang, kena cahaya adegan, dekat dengan penonton. Hitam ditolak karena meniru referensi |
| Warna kulit per tokoh (`SKIN.sawo/langsat/terang/gelap`) | tokoh asing atau beragam tanpa rig baru |
| Bentuk kepala fix, ekspresi = stiker | konsisten dan murah; tidak pernah ada wajah "salah" |
| Tangan 2 tingkat detail | bulat di shot lebar, tangan berjari (`handPhoneCU`) di close-up |
| IK 2 tulang, kaki menapak saat jalan, pegas deterministik | fisika wajar: tulang tidak memanjang, kaki tidak meluncur, kepala dan tali ikut telat |
| Rim light per bagian + ambient adegan pada kulit | tokoh menyatu dengan cahaya adegan (lihat `research/referensi/ANALISA_VISUAL_2D.md`) |

## Pakai
```js
import { drawChar, PRESETS, walk, spring, handPhoneCU, SKIN } from './src/arsip-rig.js';
const raskin = { body: 'adult', skin: SKIN.terang, hair: { type: 'pendek', col: '#2b221d' }, acc: [{ type: 'kacamata' }],
                 top: { type: 'kemeja', col: '#7d8fa3' }, bottom: { type: 'panjang', col: '#3b3f4a' }, shoes: '#2a2522' };
drawChar(ctx, raskin, { x: 540, y: 1500, s: 1.4, facing: .3, expr: 'menyesal', rh: [-30, 40], hold: 'hp' },
         { rim: { col: '#7fe3ff', dir: [-.6, -.8], w: 5 }, amb: '#3d3650', ambK: .16 });
```
**Spec** (siapa): `body` (adult/child), `height`, `build`, `stoop`, `skin`, `feat`, `hair{type,col,tie}`, `headwear{type,col}`, `acc[]`, `top{type,col}`, `bottom{type,col,col2}`, `shoes`.
**Pose** (apa yang dilakukan): `x,y,s`, `facing` (−1 kiri profil … 0 depan … 1 kanan), `lean`, `crouch`, `bob`, `lf/rf` (kaki), `lh/rh` (target tangan relatif bahu), `headTilt`, `look`, `gaze`, `expr`, `mouth` (A/E/O/M untuk lipsync), `blink`, `hold:'hp'`, `stringSway`, `hairSway`.
**Opsi** (cahaya): `rim{col,dir,w}`, `amb`, `ambK`, `lightHead`, `noShadow`.

## Aset yang tersedia
- **Rambut:** pendek, panjang, kuncir, sanggul, keriting, botak (uban samping)
- **Penutup kepala:** peci, kerudung, topi
- **Aksesori:** kacamata, kumis, jenggot, syal
- **Atasan:** kaos, kemeja, hoodie, jas, kebaya, gamis
- **Bawahan:** panjang, pendek, rok, sarung (kotak-kotak)
- **Ekspresi (12):** netral, senyum, senang, kaget, takut, marah, sedih, curiga, lelah, menyesal, bingung, kesakitan
- **Preset:** pria, wanita, ibu, kakak, kakek, nenek, adik_lk, adik_pr

## Menambah aset baru
Tambahkan satu cabang `type` di `drawHair` (rambut dan penutup kepala), `drawFace` (aksesori wajah), atau bagian torso/skirt di `drawChar` (wardrobe). Lalu tambahkan namanya di `ASSETS` dan satu sel di `lab/sheets.js` (`ASET`) supaya bisa dicek visual. Aset yang sudah dibuat dipakai ulang di video berikutnya.

## Belum ada (dibuat saat cerita membutuhkan)
- pose duduk dan rebahan (sudah bisa lewat IK: panggul diturunkan, kaki ke depan; rebahan = putar seluruh tokoh)
- tangan close-up selain memegang HP (menunjuk, mengetik)
- shot dari belakang
