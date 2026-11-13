// ARSIP 003 — Micin. Built from kit/src/scenes-lib.js (scene types + hero objects) and the ARSIP RIG.
// Each shot = function of u (0..1 through the shot). Frame 0 = the hero object, big, moving from u=0.
import { drawChar, PRESETS } from './rig/arsip-rig.js';
import * as K from './rig/scenes-lib.js';
import { headAt } from './rig/sets-lib.js';
import * as SL from './rig/sets-lib.js';
const { ease, out, back, clamp } = K;
let g;
export const setCtx = c => { g = c; K.setCtx(c); SL.setCtx(c); };
let T = 0; export const setTime = t => { T = t; };   // film time, for the ARSIP overlay

const DOKTER = { body: 'adult', hair: { type: 'belah', col: '#2b221d' }, acc: [{ type: 'kacamata' }, { type: 'dasi', col: '#7a2b2b' }], top: { type: 'kemeja', col: '#e8e2d4' }, bottom: { type: 'panjang', col: '#3b3f4a' }, shoes: '#2a2522' };
const RIM = col => ({ rim: { col, dir: [.7, .4], w: 7 }, amb: '#2c3550', ambK: .12, noShadow: true });
function char(spec, x, y, s, pose, rim = '#ffd7a0') { drawChar(g, spec, headAt(spec, pose, x, y, s), RIM(rim)); }

// S01 0.00 "Micin dituduh bikin bodoh." — hero sachet rips at frame 0, stamp BODOH?
export function S01(u) {
  K.bg('hangat', { ly: 820, a: .6 });
  K.sachet(540, 900 + 10 * Math.sin(u * 6), 1.55 + .05 * u, { tear: out(u * 4), rot: -.05 + .04 * u, glow: 1 });
  K.crystals(820, 470, u * .8 + .05, { n: 40, spread: 380, fall: -300 });
  K.stampSlam('BODOH?', 560, 1180, u + .2, 0, { size: 150, rot: -.1 });
  K.finish(1, .28);
}
// S02 1.66 "Padahal semuanya berawal dari satu surat." — crystals rain onto an envelope stamped 1968
export function S02(u) {
  K.bg('meja', { ly: 900 }); K.tableTop(1500);
  K.envelope(540, 1180, 1.25 + .08 * u, { open: ease(u * 1.4), rot: .04 });
  K.crystals(540, 420, .3 + u * .5, { n: 30, spread: 500, fall: 700, seed: 11 });
  K.finish(2);
}
// S03 3.98 "Ada dokter yang nulis surat ke jurnal kedokteran Amerika:" — the letter, journal masthead; ARSIP overlay
export function S03(u) {
  K.bg('meja', { ly: 700 }); K.tableTop(1640);
  K.letter(540, 1050 + 40 * (1 - out(u * 2)), 1.12, { head: 'NEJM · 4 APRIL 1968', lines: ['To the Editor:', 'For several years since', 'I have been in this', 'country, I have', 'experienced a strange', 'syndrome whenever I', 'have eaten out in a', 'Chinese restaurant...'], hl: [1, u * 1.5], rot: -.03 });
  K.title('JURNAL KEDOKTERAN AS · 1968', 540, 360, 64, K.AMBER);
  K.arsipOverlay(T - 3.98, 3, '1968');
  K.finish(3);
}
// S04 6.86 "tiap habis makan di restoran Tionghoa," — the doctor at a restaurant table
export function S04(u) {
  K.bg('merah', { ly: 520, a: .45 });
  char(DOKTER, 470 + 20 * u, 820, 2.6, { facing: .2, expr: 'senang', gaze: [.3, .6], rh: [10, 120], lh: [-10, 120] }, '#ff9a7a');
  K.restoTable(1420, { sway: u * 3 });
  K.finish(4);
}
// S05 9.24 "tengkuknya kebas, jantungnya deg-degan." — hand on neck, then a pounding heart
export function S05(u) {
  K.bg('merah', { ly: 700, a: .5 });
  const beat = u > .5 ? 1 + .12 * Math.abs(Math.sin((u - .5) * 40)) : 0;
  char(DOKTER, 540, 700, 3.2, { facing: .1, expr: u < .5 ? 'kesakitan' : 'panik', gaze: [.2, .4], rh: [6, 96], lh: [10, 90], headTilt: .14 }, '#ff9a7a');
  if (u < .5) { K.pool(560, 470, 170, 'rgb(255,90,70)', .6 + .3 * Math.sin(u * 30)); for (let i = 0; i < 5; i++) SL.txt('~', 640 + i * 22, 470 - i * 14, 46, '#fff'); }
  if (beat) { g.save(); g.translate(760, 980); g.scale(beat * .8, beat * .8); g.fillStyle = '#e8574a'; g.beginPath(); g.moveTo(0, 90); g.bezierCurveTo(-180, -20, -120, -150, 0, -60); g.bezierCurveTo(120, -150, 180, -20, 0, 90); g.fill(); g.restore(); }
  K.finish(5);
}
// S06 11.10 "Dia sendiri nggak yakin penyebabnya. Bisa arak masak, bisa garam, bisa micin." — three suspects appear
export function S06(u) {
  K.bg('meja', { ly: 800 }); K.tableTop(1380);
  char(DOKTER, 540, 430, 1.6, { facing: 0, expr: 'bingung', gaze: [0, .8], rh: [-40, -120], lh: [10, 90], headTilt: .12 });
  const t = u * 4.94;   // seconds into the shot (11.10 → 16.04)
  const appear = (t0) => back(clamp((t - t0) / .35));
  if (t > 2.2) { g.save(); g.translate(230, 1180); g.scale(appear(2.2), appear(2.2)); K.wineBottle(0, 0, 1.05); g.restore(); }
  if (t > 3.4) { g.save(); g.translate(540, 1200); g.scale(appear(3.4), appear(3.4)); K.saltShaker(0, 0, 1.05); g.restore(); }
  if (t > 4.3) K.sachet(850, 1150, .62 * appear(4.3), { rot: .08 });
  K.title('?', 760, 330, 150, K.AMBER, { k: 1 + .1 * Math.sin(u * 20) });
  K.finish(6);
}
// S07 16.04 "Tapi koran cuma ingat micin." — two suspects fade, the newspaper slams MICIN!
export function S07(u) {
  K.bg('koran', { ly: 900 });
  g.save(); g.globalAlpha = 1 - ease(u * 3); K.wineBottle(230, 1400, .8); K.saltShaker(850, 1420, .8); g.restore();
  K.newspaper(540, 960, 1.2 * (1.5 - .5 * out(u * 3)), { head: 'MICIN!', sub: 'DOKTER CURIGAI BUMBU PENYEDAP', rot: -.05 + .05 * out(u * 3) });
  K.finish(7);
}
// S08 18.04 "Lahirlah istilah sindrom restoran Tionghoa," — headline names the syndrome
export function S08(u) {
  K.bg('koran', { ly: 800 });
  K.newspaper(540, 1000, 1.25 + .06 * u, { head: '"SINDROM RESTORAN TIONGHOA"', sub: 'ISTILAH BARU, 1968', rot: .03 });
  K.finish(8);
}
// S09 20.62 "dan beritanya nyebar ke mana-mana." — the world lights up with copies
export function S09(u) {
  K.bg('lab', { ly: 900 });
  K.globe(540, 980, 430, u);
  for (let i = 0; i < 6; i++) { const k = clamp(u * 2 - i * .15); if (k <= 0) continue; K.newspaper(160 + i * 150, 1600 - 300 * out(k), .28, { head: 'MICIN!', rot: (i % 2 ? .2 : -.2) }); }
  K.finish(9);
}
// S10 22.32 "Setahun kemudian," — year marker 1969, lab
export function S10(u) {
  K.bg('lab', { ly: 700 }); K.tableTop(1420, '#26323c');
  K.yearMark(1969, u, 640);
  char(PRESETS.ilmuwan, 540, 1020, 2.2, { facing: .05, expr: 'berpikir', gaze: [.3, .7], rh: [30, -60], lh: [-10, 100] }, '#bfefff');
  K.finish(10);
}
// S11 23.82 "ilmuwan menyuntikkan micin ke bayi-bayi tikus." — the syringe, many baby mice
export function S11(u) {
  K.bg('lab', { ly: 1000 }); K.tableTop(1380, '#26323c');
  for (let i = 0; i < 5; i++) K.mouse(180 + i * 180, 1330 - (i % 2) * 40, .9, { bounce: u * 8 + i, look: i % 2 ? -1 : 1 });
  K.syringe(560, 820 + 60 * ease(u), 1.3, { rot: .5 + .1 * ease(u), press: ease(u * 1.3) });
  K.title('DOSIS BESAR, DISUNTIK', 540, 380, 78, K.AMBER);
  K.finish(11);
}
// S12 26.00 "Otak mereka rusak." — brain diagram cracks
export function S12(u) {
  K.bg('merah', { ly: 900 });
  K.brain(540, 960, 1.6, { crack: out(u * 1.6), glow: u });
  K.finish(12);
}
// S13 27.40 "Sejak itu, micin jadi musuh." — the sachet stamped MUSUH
export function S13(u) {
  K.bg('merah', { ly: 800, a: .4 });
  K.sachet(540, 960, 1.3 + .1 * u, { rot: .04 });
  K.stampSlam('MUSUH', 540, 1420, u, .25, { size: 150, rot: -.12 });
  K.finish(13);
}
// S14 29.20 "Tapi tikus-tikus itu nggak makan micin." — mice next to a bowl, crossed out
export function S14(u) {
  K.bg('lab', { ly: 900 }); K.tableTop(1380, '#26323c');
  for (let i = 0; i < 3; i++) K.mouse(240 + i * 300, 1300, 1.1, { bounce: u * 6 + i });
  ellipse(540, 980, 230, 60, '#f3ead6'); poly([[310, 980], [770, 980], [700, 1100], [380, 1100]], '#e0d2b3'); for (let i = 0; i < 20; i++) ellipse(400 + K.hash(i) * 280, 975 + K.hash(i + 4) * 14, 10, 7, '#fff');
  K.cross(540, 1000, 220, u * 2.2);
  K.finish(14);
}
const ellipse = (x, y, rx, ry, c) => { g.fillStyle = c; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 6.29); g.fill(); };
const poly = (pts, c) => { g.fillStyle = c; g.beginPath(); g.moveTo(...pts[0]); for (const p of pts.slice(1)) g.lineTo(...p); g.closePath(); g.fill(); };
// S15 31.96 "Mereka disuntik." — the syringe huge, close
export function S15(u) {
  K.bg('lab', { ly: 900, a: .7 });
  K.syringe(560, 960, 2.2 + .2 * u, { rot: -.2, press: .3 + .5 * u });
  K.finish(15);
}
// S16 33.10 "Waktu manusia dites tanpa tahu mana yang micin," — two covered cups, a man choosing
export function S16(u) {
  K.bg('meja', { ly: 800 }); K.tableTop(1380);
  char(PRESETS.pria, 540, 520, 2.0, { facing: 0, expr: 'curiga', gaze: [Math.sin(u * 6) * .6, .8], rh: [30, 120], lh: [-30, 120] });
  K.testCup(330, 1260, 1.1, { label: 'A', lift: 0 }); K.testCup(750, 1260, 1.1, { label: 'B', lift: 0 });
  K.title('MANA YANG MICIN?', 540, 300, 90, K.AMBER);
  K.finish(16);
}
// S17 35.78 "hasilnya nggak konsisten." — results scatter: ✓ ✗ ✓ ✗
export function S17(u) {
  K.bg('meja', { ly: 900 });
  const marks = [1, 0, 0, 1, 0, 1]; marks.forEach((m, i) => { const k = clamp(u * 3 - i * .3), x = 260 + (i % 3) * 280, y = 760 + Math.floor(i / 3) * 360; if (m) K.check(x, y, 90, k); else K.cross(x, y, 80, k); });
  K.finish(17);
}
// S18 36.76 "BPOM dan FDA bilang aman." — shield, TERUNGKAP
export function S18(u) {
  K.bg('aman', { ly: 850 });
  K.shield(540, 900, 1.6, { text: 'AMAN', sub: 'BPOM · FDA', k: u * 3 });
  K.terungkap(u, .45, 540, 1340);
  K.finish(18);
}
// S19 38.98 "Lucunya, zat yang bikin micin gurih, glutamat," — a molecule rises out of the sachet
export function S19(u) {
  K.bg('hangat', { ly: 800 });
  K.sachet(540, 1300, .9, { tear: 1, rot: -.03 });
  K.molecule(540, 1000 - 380 * out(u * 1.5), 1.2, { spin: u * .6, glow: 1 });
  if (u > .5) K.title('GLUTAMAT', 540, 360, 130, K.AMBER, { k: back((u - .5) * 5) });
  K.finish(19);
}
// S20 42.08 "juga ada di ASI." — the molecule drops into a baby bottle
export function S20(u) {
  K.bg('susu', { ly: 800 });
  K.babyBottle(540, 1150, 1.5, { label: 'ASI' });
  K.molecule(540, 520 + 300 * out(u * 2), .6 * (1 - .5 * out(u * 2)), { spin: u * 2, glow: 1 });
  K.finish(20);
}
// S21 43.04 "Banyak banget, kira-kira sepuluh kali susu sapi." — bars ASI vs cow's milk
export function S21(u) {
  K.bg('susu', { ly: 700 });
  K.bars(540, 1450, [{ label: 'ASI', v: 10, col: '#ffb43a', val: '±10×' }, { label: 'SUSU SAPI', v: 1, col: '#3f6fa0', val: '1×' }], u, { max: 10, hMax: 760, w: 300, gap: 140 });
  K.title('GLUTAMAT BEBAS', 540, 330, 84, '#fff6e6');
  K.finish(21);
}
// S22 45.92 "Jadi lidahmu kenal gurih micin… sejak menyusu." — sachet and bottle side by side, the same molecule
export function S22(u) {
  K.bg('hangat', { ly: 800 });
  K.sachet(300, 1100, .7, { rot: -.06 }); K.babyBottle(790, 1120, .95, { label: 'ASI', rot: .05 });
  K.molecule(540, 560, .55, { spin: u * 2, glow: 1 }); K.title('=', 545, 1180, 220, K.AMBER);
  K.finish(22);
}
// S23 48.50 "Oh iya, lima puluh tahun kemudian, ada pria ngaku surat itu cuma taruhan." — 2018, an old man grins
export function S23(u) {
  K.bg('meja', { ly: 700 }); K.tableTop(1500);
  K.yearMark(2018, u * 2, 360);
  char(PRESETS.kakek, 360, 880, 2.3, { facing: .4, expr: 'licik', gaze: [.6, .6], rh: [70, 20], lh: [-10, 90] });
  K.letter(800, 1250, .55, { head: 'SURAT 1968', lines: ['...', '...'], rot: .1 });
  K.finish(23);
}
// S24 52.54 "Keluarga si dokter membantah." — the family, DIBANTAH
export function S24(u) {
  K.bg('meja', { ly: 800 });
  char(PRESETS.wanita, 360, 760, 2.0, { facing: .15, expr: 'marah', gaze: [.3, .7], rh: [30, 120], lh: [-30, 120], headTilt: Math.sin(u * 14) * .08 });
  char(PRESETS.pria, 720, 740, 2.0, { facing: -.15, expr: 'marah', gaze: [-.3, .7], rh: [30, 120], lh: [-30, 120], headTilt: -Math.sin(u * 14) * .08 });
  K.stampSlam('DIBANTAH', 540, 1180, u, .25, { size: 140, rot: .06 });
  K.finish(24);
}
// S25 54.32 "Tapi gara-gara satu surat itu…" — the letter, then back to the sachet (loop into frame 0)
export function S25(u) {
  K.bg('hangat', { ly: 820, a: .6 });
  if (u < .55) K.letter(540, 960, 1.0 - .3 * u, { head: 'NEJM · 4 APRIL 1968', lines: ['To the Editor:', '...'], sig: 'R. H. M. Kwok', sig2: 'H. Steel?', rot: -.03 + .1 * u });
  else K.sachet(540, 900, 1.2 + .35 * ease((u - .55) / .45), { rot: -.05 });
  K.finish(25, .28);
}
export const SHOTS = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19, S20, S21, S22, S23, S24, S25];
