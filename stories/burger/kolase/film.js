// ARSIP #009 Burger Sepertiga Pound · ARSIP Kolase. 22 shots on the VO timing (vo_words.json); each shot is a small paper table
// with its own camera. Caption band y 1210–1536 stays clear: every piece lives in y 150–1180. Hero = the hand-tinted thick burger
// (§L); A&W = the thicker left burger of burger_dua, McDonald's = the right one; brand names only on typed strips. No numbers that
// the sources do not give: the price tags carry no price, the sales chart no values, "more than half" is a bar past the half mark.
// Reveal pause 27.28–27.88: every piece has landed and the camera holds (frozen screen, AV script).
import { W, H, SP, PAL, setCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 1.52, 2.96, 4.28, 5.93, 7.7, 9.98, 11.56, 12.96, 15.44, 17.42, 18.68, 19.98, 21.72, 23.74, 24.84, 27.88,
  29.54, 31.76, 33.74, 36.2, 39.98, 43.5];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

const SET = {
  hook: [['f_red', 540, 250, -6], ['f_amber', 930, 1120, 0], ['f_cream', 540, 1570, -3]],
  menu: [['f_green', 260, 330, -8], ['f_manila', 900, 1080, 3], ['f_cream', 540, 1560, 2]],
  test: [['f_amber', 300, 420, 0], ['f_green_s', 950, 260, 0], ['f_cream', 540, 1565, -2]],
  sales: [['f_cream', 540, 1180, -1], ['f_red', 540, 260, -4], ['f_amber_s', 150, 980, 0]],
  research: [['f_news', 520, 760, -2], ['f_green_s', 960, 230, 0], ['f_cream', 540, 1565, 2]],
  brain: [['f_red', 540, 300, 5], ['f_amber_s', 140, 1080, 0], ['f_cream', 540, 1565, -2]],
  shelf: [['f_green', 760, 330, 6], ['f_amber_s', 140, 1080, 0], ['f_cream', 540, 1560, 2]],
};
const camK = (u, keys, sh = []) => { let o = [0, 0]; for (const [t0, a] of sh) { const s = shake(u, t0, a); o = [o[0] + s[0], o[1] + s[1]]; } applyCam(cam(keys, u), o); };
// the pair (review v1): burger_tebal (A&W 1/3 pound, left) and burger_tipis = the same print with the patty squeezed
// (McDonald's 1/4 pound, right), both hand-tinted, bottoms aligned. Tags carry an illustrative Rp25.000 (same on both).
const PL = [285, 560], PR = [800, 578], PS = 0.56;
const pair = (u, id, enter = -1) => {
  if (enter < 0) { put('burger_tebal', PL[0], PL[1], -3, 0, 1, PS); put('burger_tipis', PR[0], PR[1], 3, 0, 1, PS); return; }
  putK('burger_tebal', slide(enter, enter + 0.22, PL[0], PL[1], -3, -800, 0, 0, 0.5), u, id, { s: PS });
  putK('burger_tipis', slide(enter + 0.06, enter + 0.28, PR[0], PR[1], 3, 800, 0, 0, -0.5), u, id + 1, { s: PS });
};
const tags = (u, id, y, t0 = -1) => {
  if (t0 < 0) { put('tag_harga', PL[0], y, -5, 0, 1, 0.9); put('tag_harga', PR[0], y, 4, 0, 1, 0.9); return; }
  putK('tag_harga', slide(t0, t0 + 0.2, PL[0], y, -5, -700, 0, 0, 0.6), u, id, { s: 0.9 });
  putK('tag_harga', slide(t0 + 0.08, t0 + 0.28, PR[0], y, 4, 700, 0, 0, -0.6), u, id + 1, { s: 0.9 });
};

const SHOTS = [
  // 01 · Burger ini lebih tebal,   two burgers on the table at 0.00 (same bun, the left patty thicker); GAK LAKU hits the thick one at 0.20
  (u, T, d) => {
    const tt = at(0, 'tebal');
    stage(u, d, { z0: 1.02, z1: 1.07, cy: 820, shake: [[0.0, 8], [0.2, 12]] }); bg(SET.hook);
    putK('burger_tebal', [[0, PL[0], PL[1] - 10, -5, 1.2, 1, null, 0, PS * 1.04], [0.1, PL[0], PL[1], -3, 0, 1, 'in', 1.2, PS]], u, 1);
    putK('burger_tipis', [[0, PR[0], PR[1] - 10, 5, 1.2, 1, null, 0, PS * 1.04], [0.12, PR[0], PR[1], 3, 0, 1, 'in', -1.2, PS]], u, 2);
    stampAt('st_gaklaku', u, 0.2, PL[0] + 10, 860, -8, 0.6);
    putK('s_tebal', slap(tt, PL[0] - 20, 300, -5), u, 3);
    arrow(u, tt + 0.1, tt + 0.35, bow([PL[0] - 20, 345], [PL[0] - 60, 520], 0.15), { seed: 11, head: true, col: PAL.ink, w: 6 });
  },
  // 02 · harganya sama—tapi   identical price tags slide under both; "=" on "sama"
  (u, T, d) => {
    const ts = at(1, 'sama');
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 820, shake: [[ts, 8]] }); bg(SET.hook);
    pair(u, 20); put('s_tebal', PL[0] - 20, 300, -5);
    tags(u, 21, 930, 0.02);
    stampAt('m_eq', u, ts, 542, 935, 0, 0.9);
  },
  // 03 · justru nggak laku.   the thick burger drains to black and white under GAK LAKU (same size, review v2); the thin one rises
  (u, T, d) => {
    const tn = at(2, 'nggak'), g = seg(u, tn - 0.35, tn + 0.15);
    stage(u, d, { z0: 1.0, z1: 1.07, cy: 800, shake: [[tn, 14]] }); bg(SET.hook);
    tags(u, 30, 930); put('m_eq', 542, 935, 0, 0, 1, 0.9);
    const kT = [[0, PL[0], PL[1], -3, 0, 1, null, 0, PS], [tn - 0.35, PL[0], PL[1], -3, 0, 1, 'hold', 0, PS], [tn + 0.15, PL[0], PL[1] + 10, -5, 0, 1, 'io', 0, PS]];
    putK('burger_tebal', kT, u, 31, { a: 1 - g }); putK('burger_tebal_bw', kT, u, 31, { a: g });
    putK('burger_tipis', [[0, PR[0], PR[1], 3, 0, 1, null, 0, PS], [tn - 0.35, PR[0], PR[1], 3, 0, 1, 'hold', 0, PS], [tn + 0.15, PR[0], PR[1] - 40, 2, 0, 1, 'back', -0.6, PS * 1.04]], u, 32);
    stampAt('st_gaklaku', u, tn + 0.05, PL[0] + 5, 640, -8, 0.62);
  },
  // 04 · Tahun delapan puluhan,   the ARSIP file opens; 1980-AN
  (u, T, d) => {
    stage(u, d, { z0: 1.06, z1: 1.1, cy: 820 }); bg('file', u, true);
    put('burger_tebal', 360, 830, -4, 0, 1, 0.38); put('burger_tipis', 730, 840, 4, 0, 1, 0.38);
    fileOverlay(u, 0.06, 1.0);
    ransomRow('ry80', u, at(3, 'delapan'), 540, 1010, 0.07, 0.9);
  },
  // 05 · A&W merilis burger sepertiga pound   the same pair: the thick left one is A&W's 1/3 pound
  (u, T, d) => {
    const ts = at(4, 'sepertiga');
    stage(u, d, { z0: 1.0, z1: 1.04, cx: 540, cx1: 525, cy: 700 }); bg(SET.menu, u, true);
    pair(u, 50, 0);
    putK('s_aw', slap(ts, 290, 320, -4), u, 52, { s: 0.8 });
    arrow(u, ts + 0.15, ts + 0.4, bow([290, 370], [280, 440], 0.2), { seed: 51, head: true, col: PAL.ink, w: 6 });
  },
  // 06 · untuk menantang seperempat pound McDonald's.   the thinner right one: 1/4 pound
  (u, T, d) => {
    const ts = at(5, 'seperempat');
    stage(u, d, { z0: 1.04, z1: 1.02, cx: 525, cx1: 555, cy: 700 }); bg(SET.menu);
    pair(u); put('s_aw', 290, 320, -4, 0, 1, 0.8);
    putK('s_mcd', slap(ts, 765, 260, 3), u, 60, { s: 0.7 });
    arrow(u, ts + 0.15, ts + 0.4, bow([820, 300], [810, 450], -0.2), { seed: 61, head: true, col: PAL.ink, w: 6 });
    putK('n_vs', slap(ts - 0.2, 545, 600, 2), u, 61, { s: 0.7 });
  },
  // 07 · Harganya dipatok sama.   identical tags under both burgers, "="
  (u, T, d) => {
    const ts = at(6, 'sama');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 760, shake: [[ts, 8]] }); bg(SET.menu);
    pair(u); put('s_aw', 290, 320, -4, 0, 1, 0.8); put('s_mcd', 765, 260, 3, 0, 1, 0.7);
    tags(u, 70, 900, 0);
    stampAt('m_eq', u, ts, 542, 905, 0, 0.9);
  },
  // 08 · Dalam tes rasa tertutup,   the blindfolded taster; burger A and burger B in front of him
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 840 }); bg(SET.test, u, true);
    putK('pencicip', slide(0, 0.22, 540, 590, 0, 0, 900, 0, 0.5), u, 80, { s: 0.92 });
    putK('s_tes', slap(at(7, 'tes'), 540, 250, -2), u, 81);
    putK('burger_tebal', slide(0.2, 0.4, 250, 1000, -4, -700, 0, 0, 0.5), u, 82, { s: 0.25 });
    putK('burger_tipis', slide(0.28, 0.48, 830, 1005, 4, 700, 0, 0, -0.5), u, 83, { s: 0.25 });
    putK('s_a', slap(0.5, 120, 900, -6), u, 84, { s: 0.8 }); putK('s_b', slap(0.6, 960, 905, 6), u, 85, { s: 0.8 });
  },
  // 09 · mayoritas orang juga memilih burger ini lebih enak.   the score card: 1/3 pound ticked; the thick burger is the winner
  (u, T, d) => {
    const tm = at(8, 'memilih');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 820 }); bg(SET.test);
    putK('pencicip', [[0, 540, 590, 0, 0, 1, null, 0, 0.92], [0.25, 290, 640, -2, 0, 1, 'back', 0.6, 0.74]], u, 90);
    putK('kartu_rasa', slide(0.15, 0.4, 770, 560, 3, 700, 0, 0, -0.5), u, 91, { s: 0.82 });
    stampAt('m_tick_s', u, tm, 630, 528, 0, 0.55);   // inside the 1/3 box (box centre ≈ 623, 536)
    put('burger_tipis', 830, 1005, 4, 0, 1, 0.25, 1 - 0.5 * seg(u, tm, tm + 0.3));
    putK('burger_tebal', [[0, 250, 1000, -4, 0, 1, null, 0, 0.25], [at(8, 'enak'), 250, 1000, -4, 0, 1, 'hold', 0, 0.25], [at(8, 'enak') + 0.25, 560, 975, 6, 0, 1, 'back', 0.8, 0.34]], u, 92);
  },
  // 10 · Anehnya, begitu dijual,   the empty 1980s counter; the burger and its tag wait on it
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.07, cy: 820 }); bg(SET.sales, u, true);
    putK('kasir_sepi', slide(0, 0.22, 540, 620, 0, 900, 0, 0, -0.4), u, 100, { s: 1.0 });
    ransomRow('rq', u, 0.15, 900, 250, 0.1, 0.8);
    putK('burger_tebal', drop(0.35, 0.55, 760, 760, 4, 700), u, 102, { s: 0.22 });
    putK('tag_harga', slap(0.6, 300, 930, -6), u, 103, { s: 0.7 });
    putK('s_dijual', slap(at(9, 'dijual'), 640, 1010, -2), u, 101);
  },
  // 11 · angkanya malah ambruk.   sales chart: launch, TV & radio ads, a small rise, then the red line dives on "ambruk"
  (u, T, d) => {
    const ta = at(10, 'ambruk');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 760, shake: [[ta + 0.1, 14]] }); bg(SET.sales);
    putK('grafik', slide(0, 0.2, 540, 640, -2, -900, 0, 0, 0.5), u, 110, { s: 1.0 });
    putK('burger_tebal', slap(0.15, 300, 470, -6), u, 111, { s: 0.15 });
    arrow(u, 0.25, 0.5, [[310, 540], [400, 500], [470, 488]], { seed: 111, head: false, w: 10 });
    putK('s_iklan', slap(0.3, 560, 400, 3), u, 112, { s: 0.85 });
    arrow(u, ta - 0.1, ta + 0.25, [[470, 488], [560, 570], [640, 620], [760, 830]], { seed: 112, head: true, w: 10 });
    stampAt('m_cross_s', u, ta + 0.3, 790, 860, 0, 0.8);
  },
  // 12 · Perusahaan pun menyewa peneliti   the researcher; the product and the blank interview sheet on his desk
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 860 }); bg(SET.research, u, true);
    putK('peneliti_80an', slide(0, 0.2, 320, 660, 0, -800, 0, 0, 0.6), u, 120, { s: 0.85 });
    putK('lembar_wawancara', slide(0.15, 0.35, 810, 560, 6, 700, 0, 0, -0.5), u, 122, { s: 0.48 });
    putK('burger_tebal', drop(0.4, 0.6, 820, 860, 5, 700), u, 123, { s: 0.26 });
    putK('s_riset', slap(at(11, 'peneliti'), 470, 1070, -3), u, 121, { s: 0.85 });
  },
  // 13 · untuk mewawancarai pembeli.   the customer enters opposite him
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 860 }); bg(SET.research);
    put('peneliti_80an', 300, 660, 0, 0, 1, 0.85); put('s_riset', 470, 1070, -3, 0, 1, 0.85);
    putK('pembeli_bingung', slide(0.05, 0.25, 800, 690, 0, 800, 0, 0, -0.6), u, 130, { s: 0.95 });
    putK('s_pembeli', slap(at(12, 'pembeli'), 860, 330, 3), u, 131);
    ransomRow('rq', u, at(12, 'pembeli') + 0.3, 600, 300, 0.1, 0.6);
  },
  // 14 · Jawabannya bikin geleng kepala.   the interview sheet: the tick goes on 1/4 (each answer has its burger)
  (u, T, d) => {
    const tg = at(13, 'geleng');
    camK(u, [[0, 540, 860, 1.0], [tg, 520, 760, 1.08, 'io'], [d, 520, 760, 1.1]]); bg(SET.research);
    putK('lembar_wawancara', slide(0, 0.22, 540, 640, -2, 0, 900, 0, 0.5), u, 140, { s: 1.0 });
    putK('burger_tebal', slap(0.3, 760, 595, 4), u, 141, { s: 0.15 });
    putK('burger_tipis', slap(0.4, 760, 705, -3), u, 142, { s: 0.15 });
    stampAt('m_tick_s', u, tg, 290, 720, 0, 0.6);    // inside the 1/4 box (box centre ≈ 283, 729)
    putK('pembeli_bingung', slide(tg + 0.2, tg + 0.4, 880, 950, 5, 500, 0, 0, -0.5), u, 143, { s: 0.32 });
  },
  // 15 · Lebih dari separuh orang   ten people: more than half turn red with a question mark; the bar passes the half mark
  (u, T, d) => {
    const ts = at(14, 'separuh');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 760, shake: [[ts, 10]] }); bg(SET.research, u, true);
    putK(u < ts ? 'orang10' : 'orang10_merah', slide(0, 0.2, 540, 500, -2, 900, 0, 0, -0.4), u, 150, { s: 1.0 });
    putK('bar_separuh', slide(0.1, 0.3, 540, 900, 2, -900, 0, 0, 0.4), u, 151, { s: 0.85 });
  },
  // 16 · mengira sepertiga lebih kecil dari seperempat. [0.6 s hold]   "1/3 < 1/4 ?" in amber; the screen freezes in the pause
  (u, T, d) => {
    const tk = at(15, 'kecil'), hold = 27.28 - START[15];
    camK(u, [[0, 540, 820, 1.0], [hold, 540, 800, 1.08, 'io'], [d, 540, 800, 1.08]]); bg(SET.brain, u, true);
    putK('pembeli_bingung', slide(0, 0.2, 540, 620, 0, 0, 900, 0, 0.5), u, 160, { s: 0.92 });
    ransomRow('rq', u, at(15, 'mengira'), 870, 300, 0.1, 0.7);
    putK('burger_tebal', slap(at(15, 'sepertiga'), 165, 820, -6), u, 162, { s: 0.2 });
    putK('burger_tipis', slap(at(15, 'seperempat'), 915, 820, 6), u, 163, { s: 0.2 });
    putK('s_lt', slap(tk, 540, 990, -3), u, 161);
  },
  // 17 · Bukan karena mereka bodoh.   "BODOH?" is crossed out
  (u, T, d) => {
    const tb = at(16, 'bodoh');
    stage(u, d, { z0: 1.08, z1: 1.12, cy: 780 }); bg(SET.brain);
    put('pembeli_bingung', 540, 620, 0, 0, 1, 0.92); put('burger_tebal', 165, 820, -6, 0, 1, 0.2); put('burger_tipis', 915, 820, 6, 0, 1, 0.2);
    putK('s_bodoh', slap(tb, 540, 960, -4), u, 170);
    stampAt('m_cross', u, tb + 0.35, 540, 960, 0, 1.0);
  },
  // 18 · Otak kita memang malas menghitung pecahan.   a pencil over the sum nobody does: 1/3 = 0,33 · 1/4 = 0,25
  (u, T, d) => {
    const tm = at(17, 'menghitung');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 760 }); bg(SET.brain, u, true);
    putK('tangan_pensil', slide(0, 0.22, 560, 560, 0, 900, 0, 0, -0.4), u, 180, { s: 1.0 });
    putK('s_lt', slide(0.1, 0.3, 300, 250, -4, -800, 0, 0, 0.5), u, 182, { s: 0.6 });
    typed('s_c3', u, tm, 18, 400, 760, -6);
    typed('s_c4', u, tm + 0.45, 18, 420, 860, -6);
    putK('s_pecahan', slap(at(17, 'pecahan'), 800, 960, 4), u, 181);
  },
  // 19 · Begitu melihat angka tiga melawan empat,   the big 3 and 4 (the denominators the eye compares), each over its burger
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 760 }); bg(SET.brain, u, true);
    putK('s_lt', slide(0, 0.18, 540, 260, -3, -900, 0, 0, 0.5), u, 190, { s: 0.8 });
    putK('n3', slap(at(18, 'tiga'), 290, 600, -4), u, 191, { s: 0.8 });
    putK('n_vs', slap(at(18, 'melawan'), 540, 620, 2), u, 192);
    putK('n4', slap(at(18, 'empat'), 790, 600, 4), u, 193, { s: 0.8 });
    putK('burger_tebal', slide(0.1, 0.3, 290, 930, -4, -700, 0, 0, 0.5), u, 194, { s: 0.26 });
    putK('burger_tipis', slide(0.15, 0.35, 790, 935, 4, 700, 0, 0, -0.5), u, 195, { s: 0.26 });
  },
  // 20 · otak langsung menganggap tiga pasti lebih sedikit.   the 3 is circled, shrinks, "<" lands between
  (u, T, d) => {
    const t3 = at(19, 'tiga'), tl = at(19, 'sedikit');
    stage(u, d, { z0: 1.03, z1: 1.08, cy: 760, shake: [[tl, 10]] }); bg(SET.brain);
    put('s_lt', 540, 260, -3, 0, 1, 0.8); put('n4', 790, 600, 4, 0, 1, 0.8);
    put('burger_tebal', 290, 930, -4, 0, 1, 0.26); put('burger_tipis', 790, 935, 4, 0, 1, 0.26);
    putK('n3', [[0, 290, 600, -4, 0, 1, null, 0, 0.8], [tl, 290, 600, -4, 0, 1, 'hold', 0, 0.8], [tl + 0.3, 300, 640, -4, 0, 1, 'in', 0.8, 0.58]], u, 200);
    stampAt('m_circle', u, t3, 290, 610, 0, 1.2);
    putK('n_lt', slap(tl, 545, 620, 0), u, 201, { s: 0.8 });
  },
  // 21 · Lain kali, kalo kamu bandingin ukuran atau promo pecahan di label harga,   the shelf; fraction promo tags; highlighter
  (u, T, d) => {
    const tp = at(20, 'promo'), tl = at(20, 'label'), tu = at(20, 'ukuran');
    stage(u, d, { z0: 1.0, z1: 1.08, cy: 720 }); bg(SET.shelf, u, true);
    putK('rak_label', slide(0, 0.22, 540, 600, 0, 0, 900, 0, 0.5), u, 210, { s: 1.0 });
    putK('burger_tebal', slap(tu, 200, 950, -6), u, 214, { s: 0.2 });
    putK('burger_tipis', slap(tu + 0.15, 880, 955, 6), u, 215, { s: 0.2 });
    putK('tag_13', slap(tp, 330, 590, -3), u, 211, { s: 0.85 });
    putK('tag_14', slap(at(20, 'pecahan'), 740, 760, 3), u, 212, { s: 0.85 });
    if (u >= tl) putK('tag_13h', [[tl, 330, 590, -3, 0, 1, null, 0, 0.85]], u, 213);   // the same tag, now on amber paper (highlighter)
  },
  // 22 · cek ulang angkanya—otakmu bisa terkecoh sebelum sempat ngitung.   back to the frame-0 pair with its tags; CEK ULANG; the right sum
  (u, T, d) => {
    const tc = at(21, 'cek'), ta = at(21, 'angkanya');
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 800, shake: [[tc, 8]] }); bg(SET.hook, u, true);
    pair(u, 220, 0); tags(u, 222, 860, 0.15);
    stampAt('st_cek', u, tc, 540, 1015, -5, 0.8);
    putK('s_gt', slap(ta + 0.2, 520, 290, 2), u, 224, { s: 0.85 });
    stampAt('m_tick_s', u, ta + 0.5, 800, 280, 0, 0.8);
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(tebal|sama|laku|sepertiga|seperempat|enak|ambruk|peneliti|separuh|kecil|bodoh|pecahan|tiga|empat|sedikit|cek|terkecoh)/i } });
}
export const renderAt = t => film.renderAt(t);
