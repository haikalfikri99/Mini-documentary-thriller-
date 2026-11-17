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
// burger_dua: the left (thicker, A&W) and right (McDonald's) burgers sit at ±214 world px (at s 1) from its centre
const DUO = { x: 540, y: 600, s: 0.92 }, duoL = () => DUO.x - 214 * DUO.s, duoR = () => DUO.x + 214 * DUO.s;

const SHOTS = [
  // 01 · Burger ini lebih tebal,   the tinted burger is on the table at 0.00; GAK LAKU hits at 0.20
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.08, cy: 800, shake: [[0.0, 8], [0.2, 12]] }); bg(SET.hook);
    putK('burger_tebal', [[0, 540, 590, -4, 1.2, 1, null, 0, 1.04], [0.1, 540, 600, -3, 0, 1, 'in', 1.2, 1.0]], u, 1);
    stampAt('st_gaklaku', u, 0.2, 540, 990, -7, 0.85);
  },
  // 02 · harganya sama—tapi   the burger lifts; two identical tags slide in, "=" between them
  (u, T, d) => {
    const ts = at(1, 'sama');
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 800, shake: [[ts, 8]] }); bg(SET.hook);
    putK('burger_tebal', [[0, 540, 600, -3, 0, 1], [0.22, 540, 470, -3, 0, 1, 'back', 0.6, 0.78]], u, 20);
    putK('tag_harga', slide(0.05, 0.25, 290, 960, -6, -700, 0, 0, 0.6), u, 21, { s: 0.95 });
    putK('tag_harga', slide(0.12, 0.32, 790, 960, 4, 700, 0, 0, -0.6), u, 22, { s: 0.95 });
    stampAt('m_eq', u, ts, 540, 965, 0, 1.0);
  },
  // 03 · justru nggak laku.   GAK LAKU slams over the burger
  (u, T, d) => {
    const tn = at(2, 'nggak');
    stage(u, d, { z0: 1.0, z1: 1.08, cy: 760, shake: [[tn, 14]] }); bg(SET.hook);
    put('burger_tebal', 540, 470, -3, 0, 1, 0.78);
    put('tag_harga', 290, 960, -6, 0, 1, 0.95); put('tag_harga', 790, 960, 4, 0, 1, 0.95); put('m_eq', 540, 965, 0);
    stampAt('st_gaklaku', u, tn, 540, 620, -7, 1.0);
  },
  // 04 · Tahun delapan puluhan,   the ARSIP file opens; 1980-AN
  (u, T, d) => {
    stage(u, d, { z0: 1.06, z1: 1.1, cy: 820 }); bg('file', u, true);
    put('burger_tebal', 560, 860, 4, 0, 1, 0.5);
    fileOverlay(u, 0.06, 1.0);
    ransomRow('ry80', u, at(3, 'delapan'), 540, 1010, 0.07, 0.9);
  },
  // 05 · A&W merilis burger sepertiga pound   the two burgers; the thicker left one is A&W's 1/3 pound
  (u, T, d) => {
    const ts = at(4, 'sepertiga');
    stage(u, d, { z0: 1.0, z1: 1.08, cx: 540, cx1: 500, cy: 700 }); bg(SET.menu, u, true);
    putK('burger_dua', slide(0, 0.22, DUO.x, DUO.y, 0, 900, 0, 0, -0.4), u, 50, { s: DUO.s });
    putK('s_aw', slap(ts, duoL() + 40, 340, -4), u, 51, { s: 0.9 });
    arrow(u, ts + 0.15, ts + 0.4, bow([duoL() + 20, 400], [duoL(), 470], 0.2), { seed: 51, head: true, col: PAL.ink, w: 6 });
  },
  // 06 · untuk menantang seperempat pound McDonald's.   the camera crosses to the thinner right one: 1/4 pound
  (u, T, d) => {
    const ts = at(5, 'seperempat');
    stage(u, d, { z0: 1.08, z1: 1.04, cx: 500, cx1: 570, cy: 700 }); bg(SET.menu);
    put('burger_dua', DUO.x, DUO.y, 0, 0, 1, DUO.s); put('s_aw', duoL() + 40, 340, -4, 0, 1, 0.9);
    putK('s_mcd', slap(ts, duoR() - 120, 880, 3), u, 60, { s: 0.85 });
    arrow(u, ts + 0.15, ts + 0.4, bow([duoR() - 20, 830], [duoR(), 760], -0.2), { seed: 61, head: true, col: PAL.ink, w: 6 });
  },
  // 07 · Harganya dipatok sama.   identical tags under both burgers, "="
  (u, T, d) => {
    const ts = at(6, 'sama');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 760, shake: [[ts, 8]] }); bg(SET.menu);
    put('burger_dua', DUO.x, DUO.y - 80, 0, 0, 1, DUO.s);
    putK('tag_harga', slide(0, 0.2, duoL(), 900, -5, -700, 0, 0, 0.6), u, 70, { s: 0.85 });
    putK('tag_harga', slide(0.08, 0.28, duoR(), 900, 4, 700, 0, 0, -0.6), u, 71, { s: 0.85 });
    stampAt('m_eq', u, ts, 540, 905, 0, 1.0);
  },
  // 08 · Dalam tes rasa tertutup,   the blindfolded taster
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 860 }); bg(SET.test, u, true);
    putK('pencicip', slide(0, 0.22, 540, 640, 0, 0, 900, 0, 0.5), u, 80, { s: 1.0 });
    putK('s_tes', slap(at(7, 'tes'), 540, 1060, -2), u, 81);
  },
  // 09 · mayoritas orang juga memilih burger ini lebih enak.   the score card: 1/3 pound ticked
  (u, T, d) => {
    const tm = at(8, 'memilih');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 820 }); bg(SET.test);
    putK('pencicip', [[0, 540, 640, 0, 0, 1, null, 0, 1.0], [0.25, 290, 680, -2, 0, 1, 'back', 0.6, 0.78]], u, 90);
    putK('kartu_rasa', slide(0.15, 0.4, 770, 600, 3, 700, 0, 0, -0.5), u, 91, { s: 0.82 });
    stampAt('m_tick_s', u, tm, 625, 590, 0, 0.9);
    putK('burger_tebal', slap(at(8, 'enak'), 780, 940, 6), u, 92, { s: 0.42 });
  },
  // 10 · Anehnya, begitu dijual,   the empty counter
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.07, cy: 820 }); bg(SET.sales, u, true);
    putK('kasir_sepi', slide(0, 0.22, 540, 640, 0, 900, 0, 0, -0.4), u, 100, { s: 1.0 });
    ransomRow('rq', u, 0.15, 900, 250, 0.1, 0.8);
    putK('s_dijual', slap(at(9, 'dijual'), 540, 1020, -2), u, 101);
  },
  // 11 · angkanya malah ambruk.   sales chart: the red line rises a little, then dives on "ambruk"
  (u, T, d) => {
    const ta = at(10, 'ambruk');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 760, shake: [[ta + 0.1, 14]] }); bg(SET.sales);
    putK('grafik', slide(0, 0.2, 540, 640, -2, -900, 0, 0, 0.5), u, 110, { s: 1.0 });
    arrow(u, 0.25, 0.5, [[300, 520], [400, 480], [470, 470]], { seed: 111, head: false, w: 10 });
    arrow(u, ta - 0.1, ta + 0.25, [[470, 470], [560, 560], [640, 610], [760, 820]], { seed: 112, head: true, w: 10 });
  },
  // 12 · Perusahaan pun menyewa peneliti   the researcher (1980s suit, notepad)
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 860 }); bg(SET.research, u, true);
    putK('peneliti_80an', slide(0, 0.2, 300, 660, 0, -800, 0, 0, 0.6), u, 120, { s: 0.85 });
    putK('s_peneliti', slap(at(11, 'peneliti'), 300, 1060, -3), u, 121);
  },
  // 13 · untuk mewawancarai pembeli.   the customer enters opposite him
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 860 }); bg(SET.research);
    put('peneliti_80an', 300, 660, 0, 0, 1, 0.85); put('s_peneliti', 300, 1060, -3);
    putK('pembeli_bingung', slide(0.05, 0.25, 800, 690, 0, 800, 0, 0, -0.6), u, 130, { s: 0.95 });
    putK('s_pembeli', slap(at(12, 'pembeli'), 800, 1060, 3), u, 131);
  },
  // 14 · Jawabannya bikin geleng kepala.   the interview sheet: the tick goes on 1/4
  (u, T, d) => {
    const tg = at(13, 'geleng');
    camK(u, [[0, 540, 860, 1.0], [tg, 520, 760, 1.1, 'io'], [d, 520, 760, 1.12]]); bg(SET.research);
    putK('lembar_wawancara', slide(0, 0.22, 540, 640, -2, 0, 900, 0, 0.5), u, 140, { s: 1.0 });
    stampAt('m_tick_s', u, tg, 305, 735, 0, 0.9);
    putK('s_src1', slap(0.3, 540, 950, -1), u, 141);
  },
  // 15 · Lebih dari separuh orang   the bar passes the half mark
  (u, T, d) => {
    const ts = at(14, 'separuh');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 760, shake: [[ts, 10]] }); bg(SET.research, u, true);
    putK('bar_separuh', slide(0, 0.2, 540, 420, -2, 900, 0, 0, -0.4), u, 150, { s: 1.0 });
    putK('pembeli_bingung', slide(0.08, 0.28, 540, 850, 0, 0, 800, 0, 0.4), u, 151, { s: 0.6 });
  },
  // 16 · mengira sepertiga lebih kecil dari seperempat. [0.6 s hold]   "1/3 < 1/4 ?" in amber; the screen freezes in the pause
  (u, T, d) => {
    const tk = at(15, 'kecil'), hold = 27.28 - START[15];
    camK(u, [[0, 540, 820, 1.0], [hold, 540, 800, 1.08, 'io'], [d, 540, 800, 1.08]]); bg(SET.brain, u, true);
    putK('pembeli_bingung', slide(0, 0.2, 540, 620, 0, 0, 900, 0, 0.5), u, 160, { s: 0.92 });
    ransomRow('rq', u, at(15, 'mengira'), 870, 300, 0.1, 0.7);
    putK('s_lt', slap(tk, 540, 990, -3), u, 161);
  },
  // 17 · Bukan karena mereka bodoh.   "BODOH?" is crossed out
  (u, T, d) => {
    const tb = at(16, 'bodoh');
    stage(u, d, { z0: 1.08, z1: 1.12, cy: 780 }); bg(SET.brain);
    put('pembeli_bingung', 540, 620, 0, 0, 1, 0.92);
    putK('s_bodoh', slap(tb, 540, 960, -4), u, 170);
    stampAt('m_cross', u, tb + 0.35, 540, 960, 0, 1.0);
  },
  // 18 · Otak kita memang malas menghitung pecahan.   a pencil over the sum nobody does: 1/3 = 0,33 · 1/4 = 0,25
  (u, T, d) => {
    const tm = at(17, 'menghitung');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 760 }); bg(SET.brain, u, true);
    putK('tangan_pensil', slide(0, 0.22, 560, 560, 0, 900, 0, 0, -0.4), u, 180, { s: 1.0 });
    typed('s_c3', u, tm, 18, 400, 760, -6);
    typed('s_c4', u, tm + 0.45, 18, 420, 860, -6);
    putK('s_pecahan', slap(at(17, 'pecahan'), 800, 960, 4), u, 181);
  },
  // 19 · Begitu melihat angka tiga melawan empat,   the big 3 and 4 (the denominators the eye compares)
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 760 }); bg(SET.brain, u, true);
    putK('s_lt', slide(0, 0.18, 540, 260, -3, -900, 0, 0, 0.5), u, 190, { s: 0.8 });
    putK('n3', slap(at(18, 'tiga'), 290, 680, -4), u, 191, { s: 0.85 });
    putK('n_vs', slap(at(18, 'melawan'), 540, 700, 2), u, 192);
    putK('n4', slap(at(18, 'empat'), 790, 680, 4), u, 193, { s: 0.85 });
  },
  // 20 · otak langsung menganggap tiga pasti lebih sedikit.   the 3 is circled, shrinks, "<" lands between
  (u, T, d) => {
    const t3 = at(19, 'tiga'), tl = at(19, 'sedikit');
    stage(u, d, { z0: 1.03, z1: 1.08, cy: 760, shake: [[tl, 10]] }); bg(SET.brain);
    put('s_lt', 540, 260, -3, 0, 1, 0.8); put('n4', 790, 680, 4, 0, 1, 0.85);
    putK('n3', [[0, 290, 680, -4, 0, 1, null, 0, 0.85], [tl, 290, 680, -4, 0, 1, 'hold', 0, 0.85], [tl + 0.3, 300, 720, -4, 0, 1, 'in', 0.8, 0.6]], u, 200);
    stampAt('m_circle', u, t3, 290, 690, 0, 1.25);
    putK('n_lt', slap(tl, 545, 700, 0), u, 201, { s: 0.8 });
  },
  // 21 · Lain kali, kalo kamu bandingin ukuran atau promo pecahan di label harga,   the shelf; fraction promo tags; amber highlight
  (u, T, d) => {
    const tp = at(20, 'promo'), tl = at(20, 'label');
    stage(u, d, { z0: 1.0, z1: 1.08, cy: 720 }); bg(SET.shelf, u, true);
    putK('rak_label', slide(0, 0.22, 540, 600, 0, 0, 900, 0, 0.5), u, 210, { s: 1.0 });
    putK('tag_13', slap(tp, 330, 590, -3), u, 211, { s: 0.85 });
    putK('tag_14', slap(at(20, 'pecahan'), 740, 760, 3), u, 212, { s: 0.85 });
    if (u >= tl) putK('tag_13h', [[tl, 330, 590, -3, 0, 1, null, 0, 0.85]], u, 213);   // the same tag, now on amber paper (highlighter)
  },
  // 22 · cek ulang angkanya—otakmu bisa terkecoh sebelum sempat ngitung.   back to frame 0 (the tinted burger); CEK ULANG; sources
  (u, T, d) => {
    const tc = at(21, 'cek');
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 800, shake: [[tc, 8]] }); bg(SET.hook, u, true);
    putK('burger_tebal', slide(0, 0.22, 540, 610, -3, 0, -900, 0, 0.5), u, 220, { s: 1.0 });
    stampAt('st_cek', u, tc, 540, 990, -6, 0.85);
    putK('s_src', slap(at(21, 'terkecoh'), 540, 230, 0), u, 221);
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
