// ARSIP #015 Label Best Seller di Buku Menu · ARSIP Kolase. 18 shots on the VO timing (vo_words.json; line 10 split at "naik");
// each shot is a small paper table with its own camera. Caption band y 1210–1536 stays clear: every text piece lives in y 150–1180.
// Hero = the open menu book (AI, dish rows typed in bake.py) with the red BEST SELLER rosette slapped on "Ayam Geprek" at 0.12 s.
// Conceptual Loop: a faint print of many pointing hands sits behind the rosette at frame 0 (alpha 0.16, never named by the VO);
// in shot 17 (44.6 s) the camera returns to the same page and the hands come out clear: the "tanda" is other people's choices.
// Beijing (Cai, Chen & Fang 2009): split-screen KELOMPOK A (tent card 5 MENU TERLARIS, ranks 1–5) vs KELOMPOK B (5 MENU CONTOH,
// no ranks); chart = +13–20% vs ≈0 (only the abstract's numbers, gridlines 0/10/20); satisfaction = what guests SAY (questionnaire).
// Every Beijing piece carries the EKSPERIMEN BEIJING · 2006 slip (origin label, §N.3); no source strips on screen (#82).
// Layouts (§M): base table 02 04 06 10 14 16 · kartu penuh 01 15 17 · close-up makro 03 05 13 · split-screen 07 08 18 · grafik 09 11 12.
import { W, H, SP, PAL, setCtx, getCtx, loadAll, put, putA, putK, has, slap, slide, drop, stampAt, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake, hash } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 3.84, 6.42, 9.24, 12.6, 14.58, 18.04, 21.94, 25.16, 26.54, 28.32, 30.68, 33.6, 35.14, 38.42, 41.2, 44.64,
  46.62, 49.86];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

const SET = {
  hook: [['f_green', 230, 260, -8], ['f_amber_s', 960, 1110, 0], ['f_cream', 540, 1570, -3]],
  cafe: [['f_amber', 880, 360, 0], ['f_green_s', 140, 1060, 0], ['f_cream', 540, 1565, 2]],
  beijing: [['f_news', 540, 760, -2], ['f_red', 540, 170, -3], ['f_cream', 540, 1570, 2]],
  split: [['p_left', 270, 700, 0], ['p_right', 812, 700, 0], ['f_cream', 540, 1575, -1]],
  chart: [['f_cream', 540, 1185, -1], ['f_cream', 540, 1570, 2]],
  doc: [['f_manila', 540, 690, 2], ['f_cream', 540, 1570, -2]],
  macro: [['f_news', 540, 700, 3], ['f_cream', 540, 1570, -1]],
  warm: [['f_amber', 220, 380, 0], ['f_green_s', 960, 1080, 0], ['f_cream', 540, 1565, -2]],
};
const D2R = Math.PI / 180;
const size = n => [SP[n].img.width / SP[n].k, SP[n].img.height / SP[n].k];

// ---------- the hero page: menu + ghost hands (loop) + BEST SELLER rosette; returns the rosette position
const MH = { x: 540, y: 730, s: 0.95 };
function heroPage(u, enter = false, ghostA = 0.16, ghostS = 0.42, badgeT = 0.12, id = 1) {
  const g = M._menu.geprek, bx = MH.x + g[0] * MH.s + 52, by = MH.y + g[1] * MH.s - 6;
  if (enter) putK('menu_hero', [[0, MH.x, MH.y + 8, -2.5, 1.2, 1, null, 0, MH.s * 1.01], [0.1, MH.x, MH.y, -1.5, 0, 1, 'in', 1.0, MH.s]], u, id);
  else put('menu_hero', MH.x, MH.y, -1.5, 0, 1, MH.s);
  // ghost of many hands, centred on the plate = under the rosette
  const tp = M._tangan.plate;
  put('tangan', bx - tp[0] * ghostS, by + 40 - tp[1] * ghostS, 0, 0, 1, ghostS, ghostA);
  if (badgeT < 0) put('lencana', bx, by, 8, 0, 1, 0.72); else putK('lencana', slap(badgeT, bx, by, 8, -20, -40), u, id + 1, { s: 0.72 });
  return [bx, by];
}
// diner silhouettes in a row (generic black paper)
function diners(u, t0, x0, y, n, gap, s, seed = 1, a = 1, fromX = -700) {
  for (let i = 0; i < n; i++) {
    const sc = s * (0.9 + 0.16 * hash(i + 1, seed)), x = x0 + i * gap, yy = y + (1 - sc / s) * 70, te = t0 + i * 0.04;
    putK((i + seed) % 3 === 1 ? 'sil_b' : 'sil_a', slide(te, te + 0.22, x, yy, 0, fromX, 0, 0, 0.3), u, 600 + i * 3 + seed, { s: sc, a });
  }
}
// tent card standing on the AI table: AI table+teapot, the readable code card over its blank card
function tentCard(u, card, x, y, s, t0, id, fromX = -700) {
  const c = M._plakat.card;
  putK('plakat_meja', slide(t0, t0 + 0.22, x, y, 0, fromX, 0, 0, 0.4), u, id, { s });
  putK(card, slide(t0 + 0.06, t0 + 0.3, x + c[0] * s + 10, y + c[1] * s - 62 * s, -2, fromX, 0, 0, 0.4), u, id + 1, { s: s * 0.72 });
}
// bars of the chart (drawn live in world units under the camera): A solid up to a, hatched range a→a2; B sliver b
function bars(G, s, a, a2, b, t = 1) {
  const g = getCtx(), m = SP.grafik.m, base = G[1] + m.base * s, per = m.per * s, bw = 150 * s;
  const rect = (cx, h0, h1, fill, hatch) => {
    if (h1 <= h0) return; const x = cx - bw / 2, y0 = base - h1 * per, hh = (h1 - h0) * per;
    g.save(); g.fillStyle = fill; g.fillRect(x, y0, bw, hh);
    if (hatch) { g.beginPath(); g.rect(x, y0, bw, hh); g.clip(); g.strokeStyle = PAL.ink; g.lineWidth = 2.5; g.globalAlpha = 0.55;
      for (let k = -hh; k < bw + hh; k += 14) { g.moveTo(x + k, y0 + hh); g.lineTo(x + k + hh, y0); } g.stroke(); g.globalAlpha = 1; }
    g.restore(); g.save(); g.strokeStyle = PAL.ink; g.lineWidth = 4; g.strokeRect(x, y0, bw, hh); g.restore();
  };
  rect(G[0] + m.xA * s, 0, a, PAL.amber, false);
  rect(G[0] + m.xA * s, a, a2, '#EBC27A', true);
  rect(G[0] + m.xB * s, 0, b, PAL.card, true);
}

const SHOTS = [
  // 01 · Satu tanda kecil di buku menu ini diam-diam ngarahin pesananmu.   FRAME 0: the menu book (960 px) is on the table; the red
  //      BEST SELLER rosette slaps on "Ayam Geprek" at 0.12; faint hands behind it (loop); SATU TANDA KECIL; a dashed pull to the rosette
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.07, cy: 890, shake: [[0.12, 12]] }); bg(SET.hook);
    const [bx, by] = heroPage(u, true);
    putK('s_kecil', slap(at(0, 'tanda'), 640, 300, -3), u, 5, { s: 0.82 });
    route(u, at(0, 'ngarahin') - 0.1, at(0, 'ngarahin') + 0.4, bow([960, 1030], [bx + 70, by + 90], 0.25), { seed: 6, col: PAL.red, w: 6 });
  },
  // 02 · Pas bingung milih makanan di restoran atau kafe,   the undecided diner (menu pseudo-text cleaned in bake); "?"; the book + a small rosette wait
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 890 }); bg(SET.cafe, u, true);
    putK('menu_hero', slide(0, 0.2, 250, 1010, -8, -700, 0, 0, 0.5), u, 20, { s: 0.36 });
    putK('bingung', slide(0, 0.2, 600, 650, 0, 800, 0, 0, -0.4), u, 21, { s: 0.95 });
    ransomRow('rq', u, at(1, 'bingung'), 230, 340, 0.1, 0.8);
    putK('lencana', slap(at(1, 'kafe'), 175, 945, -8), u, 22, { s: 0.3 });
  },
  // 03 · mata kita otomatis ngelirik label Best Seller.   CLOSE-UP: the readable menu card fills the frame; the eye's glance zig-zags
  //      over the rows and stops on Ayam Geprek; the rosette lands on "label"; amber highlighter under that row
  (u, T, d) => {
    const KX = 520, KY = 650, KS = 1.05, R = SP.kartu_menu.m.rows, ry = KY + R[1] * KS, tl = at(2, 'label'), tg = at(2, 'ngelirik');
    stage(u, d, { z0: 1.0, z1: 1.1, cx: 540, cx1: 600, cy: 890, cy1: 800, shake: [[tl, 8]] }); bg(SET.macro, u, true);
    if (u >= tl) put('hl_amber', KX, ry + 4, -1, 0, 1, 1.25, 0.8);
    putK('kartu_menu', slide(0, 0.18, KX, KY, -1, 0, 900, 0, 0.5), u, 30, { s: KS });
    putK('mata', slap(0.12, 820, 230, 6), u, 31, { s: 1.0 });
    const zz = [[760, 280], [250, KY + R[0] * KS], [700, KY + R[3] * KS], [260, KY + R[5] * KS], [640, KY + R[2] * KS], [800, ry - 10]];
    route(u, tg - 0.5, tg + 0.3, zz, { seed: 32, col: PAL.ink, w: 5 });
    putK('lencana', slap(tl, 880, ry - 20, 10), u, 33, { s: 0.55 });
  },
  // 04 · Rasanya kayak jalan pintas aman buat nyari menu paling enak.   the long way (reading row by row) is crossed; the short red
  //      arrow straight to the rosette = jalan pintas; tick on "aman"; "paling enak?" next to it
  (u, T, d) => {
    const KX = 380, KY = 660, KS = 0.8, R = SP.kartu_menu.m.rows, ry = KY + R[1] * KS, tj = at(3, 'jalan');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 890 }); bg(SET.warm, u, true);
    putK('kartu_menu', slide(0, 0.2, KX, KY, -2, -800, 0, 0, 0.5), u, 40, { s: KS });
    put('lencana', KX + 230, ry - 10, 10, 0, 1, 0.45);
    const snake = []; R.forEach((r, i) => { const y = KY + r * KS; snake.push(i % 2 ? [KX + 190, y] : [KX - 190, y], i % 2 ? [KX - 190, y + 10] : [KX + 190, y + 10]); });
    route(u, 0.1, tj - 0.15, [[160, 250], ...snake], { seed: 41, col: PAL.ink, w: 4 });
    stampAt('m_cross_s', u, tj - 0.1, KX, KY + R[6] * KS, 0, 0.9);
    arrow(u, tj, tj + 0.35, bow([160, 250], [KX + 190, ry - 40], -0.2), { seed: 42, head: true, w: 9 });
    putK('s_pintas', slap(tj + 0.3, 760, 300, -4), u, 43, { s: 0.9 });
    stampAt('m_tick_s', u, at(3, 'aman'), 930, 420, 0, 0.8);
    putK('s_paling', slap(at(3, 'paling'), 800, 1000, 3), u, 44, { s: 0.9 });
  },
  // 05 · Biar tahu seberapa kuat pengaruhnya,   CLOSE-UP: the influence dial; its needle swings from LEMAH toward KUAT and wavers;
  //      the rosette under it; "?"
  (u, T, d) => {
    const DX = 540, DY = 560, DS = 1.4, pv = SP.dial.m.pivot, px = DX + pv[0] * DS, py = DY + pv[1] * DS, tk = at(4, 'kuat');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 890 }); bg(SET.macro, u, true);
    putK('dial', slide(0, 0.18, DX, DY, 0, 900, 0, 0, -0.4), u, 50, { s: DS });
    const sw = EASE.out(seg(stepT(u), tk - 0.2, tk + 0.5)), wob = Math.sin(stepT(u) * 9) * 6 * seg(u, tk, d);
    if (u >= 0.12) putA('jarum', px, py, 0.04, 0.5, 190 + 105 * sw + wob, 0, DS * 0.95);
    putK('lencana', slap(0.25, 540, 930, -4), u, 51, { s: 0.62 });
    ransomRow('rq', u, at(4, 'pengaruhnya'), 880, 980, 0.1, 0.7);
  },
  // 06 · peneliti menguji daftar best seller di jaringan restoran Beijing.   the ARSIP file opens; a Beijing restaurant (AI, cropped:
  //      no pseudo-characters); the test sheet slaps on "menguji"; EKSPERIMEN BEIJING · 2006 on "Beijing"
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 890 }); bg(SET.beijing, u, true);
    putK('restoran', slide(0, 0.2, 540, 610, -1, 900, 0, 0, -0.4), u, 60, { s: 0.98 });
    putK('lembar_uji', slap(at(5, 'menguji'), 300, 900, -5), u, 61, { s: 0.6 });
    putK('s_beijing', slap(at(5, 'Beijing'), 720, 1010, 2), u, 62, { s: 0.85 });
    putK('lencana', slap(at(5, 'daftar') + 0.1, 880, 300, 10), u, 63, { s: 0.34 });
    fileOverlay(u, 0.04, 0.95);
  },
  // 07 · Sebagian pengunjung dikasih lima menu best seller lengkap sama peringkatnya.   SPLIT-SCREEN, camera on the left (amber/manila)
  //      panel: KELOMPOK A, the table card 5 MENU TERLARIS with ranks 1–5 (ranks pulse on "peringkatnya"), three diners
  (u, T, d) => {
    const tp = at(6, 'peringkatnya');
    stage(u, d, { z0: 1.12, z1: 1.16, cx: 330, cx1: 320, cy: 890 }); bg(SET.split, u, true);
    putK('s_beijing', slap(0.05, 540, 205, -1), u, 70, { s: 0.62 });
    putK('s_kelA', slap(at(6, 'Sebagian'), 270, 320, -3), u, 71, { s: 0.85 });
    tentCard(u, 'plakat_top5', 270, 700, 0.88, 0.1, 72);
    diners(u, at(6, 'pengunjung') - 0.1, 120, 930, 3, 100, 0.95, 1);
    ransomRow('r15', u, tp, 400, 470, 0.08, 0.6);
    route(u, 0.1, 0.5, [[540, 240], [536, 700], [542, 1150]], { seed: 73, col: PAL.ink, w: 4 });
  },
  // 08 · Pengunjung lain cuma dikasih lima menu contoh tanpa peringkat.   the camera opens to both panels; right (grey-green): KELOMPOK B,
  //      5 MENU CONTOH, dots instead of numbers; a red cross where the ranks would be
  (u, T, d) => {
    const c = M._plakat.card, tc = at(7, 'tanpa');
    const ck = cam([[0, 330, 890, 1.14], [0.5, 540, 890, 1.0, 'io'], [d, 545, 890, 1.02]], u); applyCam(ck); bg(SET.split);
    put('s_beijing', 540, 205, -1, 0, 1, 0.62); put('s_kelA', 270, 320, -3, 0, 1, 0.85);
    put('plakat_meja', 270, 700, 0, 0, 1, 0.88); put('plakat_top5', 270 + c[0] * 0.88 + 10, 700 + c[1] * 0.88 - 62 * 0.88, -2, 0, 1, 0.88 * 0.72);
    diners(u, -9, 120, 930, 3, 100, 0.95, 1);
    route(u, -1, 0, [[540, 240], [536, 700], [542, 1150]], { seed: 73, col: PAL.ink, w: 4 });
    putK('s_kelB', slap(at(7, 'Pengunjung'), 810, 320, 3), u, 80, { s: 0.85 });
    tentCard(u, 'plakat_contoh', 810, 700, 0.88, at(7, 'lain'), 81, 700);
    diners(u, at(7, 'dikasih'), 660, 930, 3, 100, 0.95, 4, 1, 700);
    stampAt('m_cross_s', u, tc + 0.1, 810 + c[0] * 0.88 + 10 + SP.plakat_contoh.m.rank_x * 0.63, 600, 0, 0.7);
  },
  // 09 · Hasilnya timpang.   WIDE CHART: increase in orders; bar A starts to rise, bar B stays flat; TIMPANG stamped across
  (u, T, d) => {
    const G = [540, 640], GS = 1.1, tt = at(8, 'timpang');
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 890, shake: [[tt, 12]] }); bg(SET.chart, u, true);
    putK('grafik', slide(0, 0.2, G[0], G[1], -1, -900, 0, 0, 0.5), u, 90, { s: GS });
    if (u > 0.25) { const e = EASE.out(seg(stepT(u), 0.25, d)); bars(G, GS, 8 * e, 8 * e, 0.4 * e); }
    putK('s_beijing', slap(0.15, 760, 255, 2), u, 91, { s: 0.6 });
    stampAt('st_timpang', u, tt, 540, 560, -8, 0.8);
  },
  // 10 · Pesanan menu di daftar best seller   the waiter writes orders; tickets for the ranked dishes pile up next to the 5 TERLARIS card
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 890 }); bg(SET.beijing, u, true);
    putK('pelayan', slide(0, 0.18, 330, 650, 0, -800, 0, 0, 0.5), u, 100, { s: 0.95 });
    putK('plakat_top5', slap(0.15, 820, 330, 5), u, 101, { s: 0.68 });
    [[0.3, 800, 640, -6], [0.55, 830, 730, 4], [0.8, 790, 820, -3], [1.05, 840, 905, 7]].forEach(([t, x, y, r], i) =>
      putK('nota' + i, drop(t - 0.18, t, x, y, r, 500, 0.7), u, 102 + i, { s: 0.9 }));
    putK('s_beijing', slap(0.1, 300, 1070, -1), u, 107, { s: 0.6 });
  },
  // 11 · naik tiga belas sampai dua puluh persen,   WIDE CHART: bar A climbs to 13% (solid) and a hatched range to 20%; +13–20%
  (u, T, d) => {
    const G = [540, 640], GS = 1.1, t13 = at(10, 'tiga'), t20 = at(10, 'dua'), tp = at(10, 'persen');
    stage(u, d, { z0: 1.02, z1: 1.08, cx: 470, cy: 890, shake: [[tp, 8]] }); bg(SET.chart);
    put('grafik', G[0], G[1], -1, 0, 1, GS);
    const a = 8 + 5 * EASE.out(seg(stepT(u), 0.05, t13 + 0.3)), a2 = a + 7 * EASE.out(seg(stepT(u), t20 - 0.1, t20 + 0.35));
    bars(G, GS, a, a2, 0.4);
    putK('s_beijing', slap(-1, 760, 255, 2), u, 110, { s: 0.6 });
    putK('s_range', slap(tp, 640, 450, -4), u, 111, { s: 0.85 });
    putK('plakat_top5', slap(0.2, 230, 1030, -4), u, 112, { s: 0.42 });
  },
  // 12 · sedangkan daftar contoh nyaris nggak ngaruh.   camera to bar B: a sliver at ≈ 0; the 5 CONTOH card under it
  (u, T, d) => {
    const G = [540, 640], GS = 1.1, tn = at(11, 'nyaris');
    stage(u, d, { z0: 1.06, z1: 1.08, cx: 470, cx1: 640, cy: 890 }); bg(SET.chart);
    put('grafik', G[0], G[1], -1, 0, 1, GS); bars(G, GS, 13, 20, 0.4);
    put('s_beijing', 760, 255, 2, 0, 1, 0.6); put('s_range', 640, 450, -4, 0, 1, 0.85); put('plakat_top5', 230, 1030, -4, 0, 1, 0.42);
    putK('plakat_contoh', slap(0.25, 820, 1030, 4), u, 120, { s: 0.42 });
    putK('s_nol', slap(tn, 790, 690, 3), u, 121, { s: 0.85 });
    stampAt('m_eq', u, at(11, 'ngaruh'), 920, 820, 0, 0.6);
  },
  // 13 · Anehnya lagi,   (pause) CLOSE-UP: the guest questionnaire slides in; boxes still empty; "?"
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.1, cy: 880 }); bg(SET.macro, u, true);
    putK('kuesioner', slide(0, 0.2, 520, 640, -2, 0, 900, 0, 0.5), u, 130, { s: 1.3 });
    putK('s_beijing', slap(0.2, 700, 230, 2), u, 131, { s: 0.6 });
    ransomRow('rq', u, at(12, 'lagi'), 900, 1010, 0.1, 0.75);
    putK('plakat_top5', slap(0.4, 210, 1010, -6), u, 132, { s: 0.4 });
  },
  // 14 · tamu yang pesan menu best seller juga ngaku lebih puas.   the satisfied guest (AI); his table card = 5 TERLARIS; the
  //      questionnaire gets a tick on "lebih puas" on "puas"; slip: menurut pengakuan tamu (self-reported)
  (u, T, d) => {
    const Q = [230, 440], QS = 0.62, bx = SP.kuesioner.m.box;
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 890 }); bg(SET.beijing, u, true);
    putK('tamu', slide(0, 0.2, 680, 650, 0, 800, 0, 0, -0.4), u, 140, { s: 0.95 });
    putK('kuesioner', slide(0.05, 0.25, Q[0], Q[1], -4, -700, 0, 0, 0.5), u, 141, { s: QS });
    stampAt('m_tick_s', u, at(13, 'puas'), Q[0] + bx[0] * QS + 4, Q[1] + bx[1] * QS - 6, 0, 0.55);
    putK('plakat_top5', slap(at(13, 'best'), 220, 860, -5), u, 142, { s: 0.5 });
    putK('s_ngaku', slap(at(13, 'ngaku'), 400, 1050, -2), u, 143, { s: 0.85 });
    put('s_beijing', 760, 205, 2, 0, 1, 0.6);
  },
  // 15 · Otak kita memang malas menilai rasa dari nol,   FULL DOCUMENT: the taste score sheet, every box empty; DILEWATI stamped on
  //      "malas"; the 0 box circled on "nol"; the rosette (the shortcut) in the corner
  (u, T, d) => {
    const SX = 540, SY = 640, SS = 1.15, r0 = SP.nilai_rasa.m.row0, tm = at(14, 'malas');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 890, shake: [[tm, 10]] }); bg(SET.doc, u, true);
    putK('nilai_rasa', slide(0, 0.2, SX, SY, -1, -900, 0, 0, 0.5), u, 150, { s: SS });
    putK('lencana', slap(at(14, 'menilai'), 930, 250, 12), u, 151, { s: 0.42 });
    stampAt('st_dilewati', u, tm, 560, 700, -10, 0.85);
    stampAt('m_circle', u, at(14, 'nol'), SX + r0[0] * SS, SY + r0[1] * SS, 0, 0.26);
  },
  // 16 · jadi kita nebeng pilihan orang banyak sebagai jaminan enak.   many hands point at one plate (AI, centre crop); the rosette
  //      lands on the plate on "pilihan"; JAMINAN ENAK stamped on "jaminan"; diners behind
  (u, T, d) => {
    const TX = 540, TY = 600, TS = 1.12, tp = M._tangan.plate, tj = at(15, 'jaminan');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 890, shake: [[tj, 12]] }); bg(SET.hook, u, true);
    putK('tangan', slide(0, 0.2, TX, TY, 0, 0, -900, 0, 0.5), u, 160, { s: TS });
    putK('lencana', slap(at(15, 'pilihan'), TX + tp[0] * TS, TY + tp[1] * TS - 20, 6), u, 161, { s: 0.5 });
    stampAt('st_jaminan', u, tj, 540, 1010, -6, 0.85);
  },
  // 17 · Menu best seller terakhir yang kamu pesan:   LOOP: back to the frame-0 page; the camera pushes into the rosette and the faint
  //      hands behind it come out clear (other people's choices behind the sign)
  (u, T, d) => {
    const g = M._menu.geprek, bx = MH.x + g[0] * MH.s + 52, by = MH.y + g[1] * MH.s - 6, e = EASE.io(seg(u, 0.15, d));
    stage(u, d, { z0: 1.0, z1: 1.32, cx: 540, cx1: bx + 40, cy: 890, cy1: by + 230 }); bg(SET.hook, u, true);
    put('menu_hero', MH.x, MH.y, -1.5, 0, 1, MH.s);
    const tp = M._tangan.plate, gs = 0.42 + 0.18 * e;
    put('tangan', bx - tp[0] * gs, by + 40 - tp[1] * gs, 0, 0, 1, gs, 0.16 + 0.84 * e);
    put('lencana', bx, by, 8, 0, 1, 0.72);
  },
  // 18 · murni seleramu, atau ikutan pilihan orang lain?   SPLIT-SCREEN: left the diner's own finger on his menu (seleramu), right the
  //      crowd of hands on the rosette dish (pilihan orang lain); "?" on the seam
  (u, T, d) => {
    const tj = M._tunjuk.jari, tp = M._tangan.plate;
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 890 }); bg(SET.split, u, true);
    putK('tunjuk', slide(0, 0.2, 280, 640, 0, -700, 0, 0, 0.5), u, 180, { s: 0.8 });
    putK('s_seleramu', slap(at(17, 'seleramu'), 270, 270, -3), u, 181, { s: 0.85 });
    putK('tangan', slide(at(17, 'atau') - 0.2, at(17, 'atau'), 800, 640, 0, 700, 0, 0, -0.4), u, 182, { s: 0.63 });
    putK('lencana', slap(at(17, 'atau') + 0.15, 800 + tp[0] * 0.63, 640 + tp[1] * 0.63 - 12, 6), u, 183, { s: 0.36 });
    putK('s_oranglain', slap(at(17, 'pilihan'), 812, 1000, 3), u, 184, { s: 0.8 });
    route(u, 0.1, 0.5, [[540, 240], [536, 700], [542, 1150]], { seed: 185, col: PAL.ink, w: 4 });
    ransomRow('rq', u, at(17, 'lain'), 540, 1040, 0.1, 0.6);
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3,
      hot: /^(tanda|menu|pesanan|best|seller|label|pintas|enak|beijing|lima|peringkat|contoh|timpang|naik|tiga|belas|dua|puluh|persen|nggak|ngaruh|puas|malas|nol|nebeng|jaminan|murni|selera|ikutan)/i } });
}
export const renderAt = t => film.renderAt(t);
