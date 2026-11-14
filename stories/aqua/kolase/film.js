// ARSIP #004 Aqua · ARSIP Kolase. 22 shots on the VO timing (vo_words.json); each shot is a small paper table with its own camera.
// Caption band y 1210–1536 stays clear: every piece lives in y 120–1190.
import { W, H, SP, PAL, setCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0, 2.14, 4.58, 7.88, 9.96, 13.06, 14.54, 15.74, 17.36, 19.46, 22.00, 24.62, 27.38, 28.92, 31.74, 36.04, 38.20,
  41.54, 44.30, 45.74, 48.28, 51.56, 53.64];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

// episode table sets (torn colour fields under a scene)
const SET = {
  hook: [['f_red', 540, 250, -6], ['f_amber', 930, 1120, 0], ['f_cream', 540, 1570, -3]],
  warung: [['f_green', 280, 330, -8], ['f_amber_s', 940, 1080, 0], ['f_cream', 540, 1560, 2]],
  price: [['f_manila', 560, 760, 3], ['f_green_s', 950, 230, 0], ['f_cream', 540, 1565, -2]],
  doc: [['f_news', 520, 760, -2], ['f_amber_s', 120, 1120, 0]],
  rival: [['f_amber', 540, 640, 0], ['f_cream', 540, 1560, 2]],
  ref: [['f_green', 540, 600, 4], ['f_amber_s', 900, 230, 0], ['f_cream', 520, 1560, -2]],
  deny: [['f_manila', 400, 760, -3], ['f_red', 760, 230, 8]],
  court: [['f_green', 520, 560, -4], ['f_manila', 600, 1120, 2], ['f_cream', 540, 1570, 2]],
  file: [['f_manila', 560, 820, 3], ['f_green_s', 960, 260, 0], ['f_cream', 520, 1560, 2]],
  end: [['f_amber', 540, 700, 0], ['f_green_s', 140, 220, 0], ['f_cream', 540, 1565, -2]],
};

// warung + the gold star on its sign board (sign centre ≈ (+2, −307)·s from the warung centre; board ≈ 392×156 at s=1)
function warung(u, keys, s, star = 'on', id = 20, tOff = 0) {
  const p = putK('warung', keys, u, id, { s });
  if (!p) return null;
  const sx = p.x + 2 * s, sy = p.y - 307 * s;
  if (star === 'on') put('star', sx, sy, p.r - 4, 0, 1, 0.48 * s);
  if (star === 'ghost') put('star_ghost', sx, sy, p.r - 4, 0, 1, 0.47 * s);
  if (typeof star === 'number') {   // the star is slapped onto the board at time `star`
    if (u >= star - 0.17) putK('star', [[star - 0.17, sx - 20, sy - 40, -12, 4.5, 1, null, 0, 0.62 * s], [star, sx, sy, p.r - 4, 0, 1, 'in', 1.2, 0.48 * s]], u, id + 1);
  }
  return { x: sx, y: sy };
}
// several camera keys in one shot: [[t, cx, cy, zoom, ease]]
const camK = (u, keys, sh = []) => { let o = [0, 0]; for (const [t0, a] of sh) { const s = shake(u, t0, a); o = [o[0] + s[0], o[1] + s[1]]; } applyCam(cam(keys, u), o); };

const SHOTS = [
  // 01 · Aqua didenda tiga belas koma delapan miliar.   the company (factory + its bottle) is on the table at 0.00, the fine slaps at once
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.08, cy: 880, shake: [[0.0, 8], [0.14, 12]] }); bg(SET.hook);
    putK('pabrik', [[0, 540, 560, -2, 1.2, 1, null, 0, 1.0], [0.1, 540, 570, -1, 0, 1, 'in', 1.0, 0.98]], u, 4);
    putK('bottle_hero', [[0, 830, 800, -5, 1.2, 1, null, 0, 0.66], [0.14, 830, 820, -3, 0, 1, 'in', 1.2, 0.62]], u, 1);
    putK('s_aqua', slap(0.25, 300, 440, -6), u, 2, { s: 1.3 });
    putK('s_138', [[0, 540, 225, -3, 2, 1, null, 0, 1.06], [0.08, 540, 235, -3, 0, 1, 'in', 1.0, 1.0]], u, 3);
    stampAt('st_denda', u, 0.14, 470, 1040, -8, 1.2);
  },
  // 02 · Gara-gara warung kayak gini jual air mineral merek lain.
  (u, T, d) => {
    const tw = at(1, 'warung'), tm = at(1, 'merek');
    stage(u, d, { z0: 1, z1: 1.1, cx1: 600, cy: 900, cy1: 860 }); bg(SET.warung, u, true);
    warung(u, slide(0, tw, 540, 640, 0, 0, 1200, 0, 0.8), 1.0, 'none');
    putK('bottle_rival', drop(tm - 0.2, tm, 830, 830, 6, 700), u, 30, { s: 0.42 });
    putK('s_merek', slap(tm + 0.2, 800, 1100, -4), u, 31);
  },
  // 03 · Kok bisa? Ada warung berstatus bintang, star outlet.   ARSIP file overlay during "Kok bisa?"
  (u, T, d) => {
    const tb = at(2, 'bintang'), ts = at(2, 'star');
    stage(u, d, { z0: 1.0, z1: 1.1, cy: 800, cy1: 720 }); bg(SET.warung);
    warung(u, [[0, 540, 700, 0, 0, 1]], 1.0, tb);
    putK('s_star', slap(ts, 540, 900, -3), u, 40);
    if (u > 1.6) ransomRow('ry16', u, 1.6, 830, 170, 0.08, 0.7);
    fileOverlay(u, 0.06, 1.25);
  },
  // 04 · Warung ini dapat harga Aqua lebih murah.
  (u, T, d) => {
    stage(u, d, { z1: 1.05 }); bg(SET.price);
    warung(u, [[0, 370, 560, -3, 0, 1]], 0.62, 'on');
    putK('bottle_hero', slide(0.05, 0.35, 820, 640, 4, 600, 0, 0, -0.8), u, 50, { s: 0.6 });
    putK('tag_murah', slap(at(3, 'harga'), 560, 1050, -6), u, 51, { s: 1.15 });
  },
  // 05 · Tapi ada satu syarat. Kalau warung itu jual Le Minerale,   the clause of the agreement
  (u, T, d) => {
    const tl = at(4, 'le');
    camK(u, [[0, 540, 900, 1.0], [1.2, 540, 900, 1.0], [2.2, 520, 820, 1.22, 'io'], [d, 520, 820, 1.25]]); bg(SET.doc);
    putK('perjanjian', slide(0, 0.32, 520, 640, -2, 0, 1200, 0, 0.6), u, 60, { s: 0.95 });
    putK('s_syarat', slap(at(4, 'syarat'), 330, 220, -5), u, 61);
    putK('bottle_rival', slap(tl, 790, 860, 8), u, 62, { s: 0.36 });
    putK('s_lemin', slap(tl + 0.12, 730, 640, 5), u, 63, { s: 0.8 });
  },
  // 06 · yang katanya ada manis-manisnya…
  (u, T, d) => {
    stage(u, d, { z0: 1.04, z1: 1.12, cy: 820 }); bg(SET.rival);
    putK('bottle_rival', [[0, 520, 590, 6, 0, 1], [d, 520, 590, 2, 0, 1, 'lin']], u, 70, { s: 0.9 });
    putK('s_lemin', [[0, 780, 360, 8, 0, 1]], u, 71, { s: 0.85 });
    typed('s_manis', u, at(5, 'katanya'), 22, 540, 970, -3);
    ransomRow('rq2', u, at(5, 'manis') + 0.25, 860, 250, 0.1, 0.9);
  },
  // 07 · bintangnya dicopot.   the hand pulls the star off the board
  (u, T, d) => {
    const tc = at(6, 'dicopot');
    stage(u, d, { z0: 1.0, z1: 1.06, shake: [[tc + 0.1, 16]] }); bg(SET.hook);
    putK('hand_star', [[0, 1100, 700, 12, 2, 1], [0.2, 540, 680, 0, 0, 1, 'back', 0.8], [tc, 540, 680, 0, 0, 1, 'hold'], [tc + 0.14, 600, 590, 9, 3.5, 1, 'out']], u, 80, { s: 1.0 });
  },
  // 08 · Harga Aqua-nya jadi lebih mahal.   same table as shot 04, star gone, the tag flips
  (u, T, d) => {
    const tm = at(7, 'mahal');
    stage(u, d, { z1: 1.06, shake: [[tm, 10]] }); bg(SET.price);
    warung(u, [[0, 370, 560, -3, 0, 1]], 0.62, 'ghost');
    putK('bottle_hero', [[0, 820, 640, 4, 0, 1]], u, 90, { s: 0.6 });
    if (u < tm) put('tag_murah', 560, 1050, -6, 0, 1, 1.15);
    putK('tag_mahal', slap(tm, 560, 1040, 5), u, 91, { s: 1.15 });
  },
  // 09 · KPPU, wasitnya persaingan bisnis,
  (u, T, d) => {
    stage(u, d, { z1: 1.06, shake: [[0.05, 10]] }); bg(SET.ref, u, true);
    putK('kantor', slide(0, 0.25, 540, 470, 0, 0, -900, 0, 0.5), u, 99, { s: 0.95 });
    putK('wasit_tiup', [[0, 500, 820, -3, 3, 1, null, 0, 1.1], [0.1, 500, 810, -2, 0, 1, 'in', 1.2, 1.0]], u, 102);
    putK('s_kppu', slap(0.12, 330, 950, -6), u, 100, { s: 0.8 });
    putK('s_kppu2', slap(0.45, 540, 190, 2), u, 101);
    putK('s_wasit', slap(at(8, 'wasitnya'), 640, 1120, -2), u, 103);
  },
  // 10 · bilang itu persaingan nggak sehat. Aqua didenda.   the KPPU referee shows the red card to the company (2017)
  (u, T, d) => {
    const tk = at(9, 'nggak'), td = at(9, 'didenda');
    stage(u, d, { z0: 1.0, z1: 1.07, shake: [[tk, 8], [td, 12]] }); bg(SET.ref);
    put('pabrik', 760, 640, 0, 0, 1, 0.5);
    putK('s_aqua', slap(0.1, 790, 420, 4), u, 113, { s: 0.9 });
    putK('wasit_kartu', slide(tk - 0.25, tk, 330, 720, -2, -700, 0, 0, 0.8), u, 111, { s: 0.92 });
    putK('s_kppu', slap(tk + 0.1, 230, 860, -6), u, 112, { s: 0.6 });
    stampAt('st_denda', u, td, 770, 640, -7, 0.72);
    if (u > td + 0.15) ransomRow('ry17', u, td + 0.15, 800, 190, 0.07, 0.8);
  },
  // 11 · Tapi Aqua membantah, katanya itu ulah distributor.   the company man pushes back at the KPPU referee's card (right) and points at the distributor's truck (left)
  (u, T, d) => {
    const tb = at(10, 'membantah'), tk = at(10, 'katanya');
    stage(u, d, { z1: 1.05, shake: [[tb, 9]] }); bg(SET.deny);
    putK('wasit_kartu', [[0, 905, 690, 2, 0, 1]], u, 125, { s: 0.55 });
    putK('bos_bantah', slide(0, 0.25, 520, 770, 0, 0, 700, 0, 0.6), u, 120, { s: 0.86 });
    putK('s_pihak', slap(0.3, 520, 330, -3), u, 124, { s: 0.85 });
    stampAt('st_dibantah', u, tb, 560, 1110, -5, 0.9);
    putK('truck', slide(tk, tk + 0.35, 215, 590, 2, -600, 0, 0, 0.8), u, 121, { s: 0.38 });
    putK('s_distributor', slap(at(10, 'distributor'), 215, 470, -3), u, 123, { s: 0.75 });
  },
  // 12 · Dan pengadilan… membatalkan denda Aqua.   (2019)
  (u, T, d) => {
    const tm = at(11, 'membatalkan');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 900, shake: [[tm, 14]] }); bg(SET.court, u, true);
    putK('gavel', slide(0, 0.3, 540, 600, 0, 0, -1000, 0, 0.7), u, 130, { s: 1.15 });
    putK('s_pn', slap(at(11, 'pengadilan'), 330, 190, -4), u, 131);
    stampAt('st_denda', u, 0.4, 540, 920, -6, 0.85);
    stampAt('m_cross_s', u, tm - 0.05, 540, 920, 0, 1.6);
    stampAt('st_batal', u, tm + 0.1, 560, 1090, 4, 0.95);
    if (u > tm + 0.4) ransomRow('ry19', u, tm + 0.4, 830, 190, 0.07, 0.75);
  },
  // 13 · Aqua bebas? Belum.   the company man sighs with relief on "bebas?", BELUM slams down
  (u, T, d) => {
    const tq = at(12, 'bebas'), tb = at(12, 'belum');
    stage(u, d, { z1: 1.06, shake: [[tb, 14]] }); bg(SET.hook);
    putK('bos_lega', [[0, 540, 720, 0, 0, 1], [tq + 0.1, 540, 690, 2, 1.5, 1, 'out'], [tb, 540, 720, -2, 0, 1, 'in', 1.0]], u, 140, { s: 0.92 });
    putK('s_pihak', slap(0.05, 260, 300, -5), u, 141, { s: 0.85 });
    ransomRow('rq', u, tq, 850, 300, 0.1, 0.9);
    stampAt('st_belum', u, tb, 540, 1050, -10, 1.15);
  },
  // 14 · Masalahnya, KPPU pegang bukti dari awal:   the case file, documents peeking out
  (u, T, d) => {
    const tk = at(13, 'kppu'), tb = at(13, 'bukti');
    stage(u, d, { z0: 1.0, z1: 1.08, cy: 900 }); bg(SET.file, u, true);
    putK('perjanjian', slide(0.25, 0.55, 420, 420, -8, 0, 300, 0, 0.5), u, 150, { s: 0.6 });
    putK('email', slide(0.35, 0.65, 700, 400, 6, 0, 300, 0, -0.5), u, 151, { s: 0.55 });
    putK('folder', slide(0, 0.3, 540, 760, -2, 0, 1100, 0, 0.6), u, 152);
    putK('s_kppu', slap(tk, 300, 660, -4), u, 153, { s: 0.6 });
    stampAt('st_bukti', u, tb, 600, 900, -9, 1.1);
    if (u > at(13, 'awal')) ransomRow('ry16', u, at(13, 'awal'), 760, 1080, 0.07, 0.7);
  },
  // 15 · email berjudul Star Outlet Degradation, alias turunin status warung bintang.
  (u, T, d) => {
    const ts = at(14, 'star'), ta = at(14, 'alias');
    camK(u, [[0, 540, 760, 0.98], [ts - 0.1, 540, 760, 1.0], [ts + 0.5, 580, 620, 1.4, 'io'], [ta, 580, 625, 1.42], [ta + 0.5, 540, 690, 1.15, 'io'], [d, 540, 690, 1.18]]);
    bg(SET.doc);
    putK('email', slide(0, 0.3, 540, 640, -1, 0, 1100, 0, 0.6), u, 160, { s: 0.84 });
    putK('s_turunin', slap(ta + 0.05, 540, 820, -2), u, 161, { s: 0.75 });
  },
  // 16 · Dan satu warung beneran dicopot bintangnya.   the star flies off, the ghost of it stays on the board
  (u, T, d) => {
    const tc = at(15, 'dicopot');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900, shake: [[tc, 12]] }); bg(SET.warung);
    const s = warung(u, [[0, 540, 700, 0, 0, 1]], 1.0, 'ghost');
    if (u < tc) put('star', s.x, s.y, -4, 0, 1, 0.48);
    else putK('star', [[tc, s.x, s.y, -4, 0, 1, null, 0, 0.48], [tc + 0.25, 980, 120, 70, 5, 1, 'out', 0, 0.6]], u, 170);
    putK('s_satu', slap(at(15, 'satu'), 220, 230, -6), u, 171);
    stampAt('st_dicopot', u, tc + 0.12, 540, 1085, -7, 1.0);
  },
  // 17 · KPPU nggak terima, dan membawa kasus ini ke Mahkamah Agung.   the referee walks the case file to the court
  (u, T, d) => {
    const tb = at(16, 'membawa'), tm = at(16, 'mahkamah');
    stage(u, d, { z0: 1.0, z1: 1.04 }); bg(SET.court);
    putK('court', slide(0.2, 0.5, 760, 430, 0, 700, 0, 0, -0.6), u, 180, { s: 0.55 });
    const f = EASE.lin(seg(stepT(u), 0, d)), bob = Math.abs(Math.sin(stepT(u) * 9)) * -10;
    put('wasit_map', 220 + 300 * f, 820 + bob, 0, 0, 1, 0.82);
    put('s_kppu', 165 + 300 * f, 690 + bob, -5, 0, 1, 0.42);
    route(u, tb, tb + 0.7, bow([420, 700], [680, 560], 0.15), { seed: 181 });
    putK('s_ma', slap(tm, 740, 190, 3), u, 183);
  },
  // 18 · Hasilnya… Mahkamah Agung memihak KPPU.   (2019)
  (u, T, d) => {
    const tm = at(17, 'memihak');
    stage(u, d, { z0: 1.0, z1: 1.1, cy: 820, shake: [[tm, 14]] }); bg(SET.court);
    put('court', 540, 600, 0, 0, 1, 1.0);
    stampAt('st_menang', u, tm, 540, 950, -6, 1.15);
    if (u > tm + 0.35) ransomRow('ry19', u, tm + 0.35, 540, 170, 0.07, 0.8);
  },
  // 19 · Denda Aqua berlaku lagi.   the company man slumps in front of the factory; echo of frame 0
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.07, cy: 880, shake: [[0.08, 12]] }); bg(SET.hook);
    put('pabrik', 600, 520, 0, 0, 1, 0.78);
    putK('bos_lemas', slide(0, 0.2, 330, 800, 0, 0, -300, 0, 0.6), u, 190, { s: 0.78 });
    stampAt('st_denda', u, 0.08, 720, 1040, -8, 1.1);
    putK('s_138', slap(at(18, 'berlaku'), 560, 215, -3), u, 191);
  },
  // 20 · Air putih doang, sampai Mahkamah Agung.   tight on one small bottle in the defendant's chair, then pull back to the grand courtroom
  (u, T, d) => {
    const ts = at(19, 'sampai');
    camK(u, [[0, 538, 880, 2.6], [ts - 0.05, 538, 885, 2.7], [ts + 0.75, 540, 660, 1.0, 'io'], [d, 540, 660, 1.02]]); bg(SET.court);
    put('botol_sidang', 540, 660, 0, 0, 1, 1.0);
    if (u > ts + 0.8) { arrow(u, ts + 0.8, ts + 1.05, bow([620, 290], [560, 820], 0.12), { seed: 201 }); putK('s_terdakwa', slap(ts + 1.05, 600, 235, -3), u, 202); }
  },
  // 21 · Jadi isi rak warung itu… nggak selalu pilihan pemilik warungnya.
  (u, T, d) => {
    const tn = at(20, 'nggak'), tp = at(20, 'pilihan');
    stage(u, d, { z0: 1.0, z1: 1.05 }); bg(SET.end, u, true);
    putK('shelf_one', slide(0, 0.3, 780, 640, 2, 700, 0, 0, -0.6), u, 210);
    putK('shopkeeper', slide(tn - 0.2, tn + 0.15, 340, 720, 0, -800, 0, 0, 0.6), u, 211, { s: 0.92 });
    typed('s_pilihan', u, tp, 18, 330, 230, -3);
  },
  // 22 · Warung dekat rumahmu jual merek apa aja?   (then the film loops to frame 0)
  (u, T, d) => {
    const tm = at(21, 'merek');
    stage(u, d, { z0: 1.0, z1: 1.06 }); bg(SET.end);
    putK('shelf_many', slide(0, 0.28, 540, 660, 0, 0, 1000, 0, 0.6), u, 220);
    putK('s_rumah', slap(at(21, 'warung'), 540, 200, -3), u, 221);
    ransomRow('rq', u, tm, 540, 1090, 0.1, 1.1);
    putK('star', drop(tm + 0.45, tm + 0.7, 860, 330, 12, 900), u, 222, { s: 0.42 });
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(aqua|didenda|warung|bintang|murah|mahal|kppu|membatalkan|belum|bukti|degradation|dicopot|memihak|merek)/i } });
}
export const renderAt = t => film.renderAt(t);
