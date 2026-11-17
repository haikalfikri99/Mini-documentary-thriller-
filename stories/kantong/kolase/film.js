// ARSIP #010 Kantong Plastik Rp200 · ARSIP Kolase. 23 shots on the VO timing (vo_words.json); each shot is a small paper table
// with its own camera. Caption band y 1210–1536 stays clear: every text piece lives in y 150–1180 on screen.
// Hero = the plastic bag (AI) with its Rp200 tag. Indonesia 2016: receipt, trial map, calendar, usage chart (end point = KLHK
// "up to 30%", no invented steps). America (Homonoff 2018): left = "this county" pays 5 cents (red), right = "another store"
// gives a 5-cent bonus (amber); shopper rows under each side: 2 of 5 stop (≈ the 42-point drop), 0 of 5 on the bonus side.
// Prestige: the AI balance split into post / beam / pans (bake.py) tips toward RUGI while the pans hang straight.
// Reveal pause 36.24–36.85 (start of shot 16): the balance drops in and settles before "Nilainya".
import { W, H, SP, PAL, setCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake, hash } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 2.48, 3.84, 6.52, 8.92, 10.6, 12.5, 15.06, 17.76, 20.6, 22.48, 24.48, 27.24, 30.7, 33.48, 36.16, 38.5,
  40.72, 42.16, 44.68, 47.4, 50.52, 52.07, 55.22];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

const SET = {
  hook: [['f_green', 230, 300, -8], ['f_amber', 880, 1080, 0], ['f_cream', 540, 1570, -3]],
  shop: [['f_green', 760, 300, 6], ['f_amber_s', 150, 1060, 0], ['f_cream', 540, 1565, 2]],
  money: [['f_amber', 300, 420, 0], ['f_green_s', 950, 1000, 0], ['f_cream', 540, 1565, -2]],
  data: [['f_cream', 540, 1180, -1], ['f_red', 540, 250, -4], ['f_amber_s', 150, 980, 0]],
  us: [['f_news', 520, 700, -2], ['f_green_s', 950, 230, 0], ['f_cream', 540, 1565, 2]],
  split: [['f_red', 120, 640, 84], ['f_amber', 900, 700, 0], ['f_cream', 540, 1570, -2]],
  scale: [['f_green', 540, 330, -4], ['f_amber_s', 140, 1060, 0], ['f_amber_s', 960, 1080, 0], ['f_cream', 540, 1565, -2]],
  loss: [['f_red', 540, 1040, -8], ['f_manila', 760, 520, 4], ['f_cream', 540, 1565, 2]],
};
const camK = (u, keys, sh = []) => { let o = [0, 0]; for (const [t0, a] of sh) { const s = shake(u, t0, a); o = [o[0] + s[0], o[1] + s[1]]; } applyCam(cam(keys, u), o); };
const D2R = Math.PI / 180;
const size = n => [SP[n].img.width / SP[n].k, SP[n].img.height / SP[n].k];

// ---------- the balance: AI print in four registered pieces (bake.py balance()); C = pivot in world, th = beam tilt (deg, − = left down)
function balance(C, s, th, a = 1) {
  const tb = M._tb, P = tb.pivot, wps = SP.tb_post.m.wps, r = th * D2R, c = Math.cos(r), sn = Math.sin(r);
  const ctr = n => { const [w, h] = size(n), o = SP[n].m.org; return [o[0] + w / 2 / wps, o[1] + h / 2 / wps]; };
  const rot = (q, R = true) => { const dx = (q[0] - P[0]) * wps * s, dy = (q[1] - P[1]) * wps * s; return R ? [C[0] + dx * c - dy * sn, C[1] + dx * sn + dy * c] : [C[0] + dx, C[1] + dy]; };
  const pp = rot(ctr('tb_post'), false); put('tb_post', pp[0], pp[1], 0, 0, 1, s, a);
  const bp = rot(ctr('tb_beam')); put('tb_beam', bp[0], bp[1], th, 0, 1, s, a);
  const out = {};
  for (const [n, hk, side] of [['tb_panL', tb.hookL, 'L'], ['tb_panR', tb.hookR, 'R']]) {
    const hw = rot(hk), pc = ctr(n);
    put(n, hw[0] + (pc[0] - hk[0]) * wps * s, hw[1] + (pc[1] - hk[1]) * wps * s, 0, 0, 1, s, a);
    out[side] = [hw[0], hw[1] + (582 * 2.56 - hk[1]) * wps * s];   // top of the dish, where things rest
  }
  return out;
}
// ---------- shopper silhouettes in a row, each with a bag; crossed = red cross over the bag at tX (staggered)
function crowd(u, t0, x0, y, n, gap, s, crossed = [], tX = 99, seed = 1, a = 1, fromX = 800) {
  let k = 0;
  for (let i = 0; i < n; i++) {
    const sc = s * (0.9 + 0.16 * hash(i + 1, seed)), x = x0 + i * gap, yy = y + (1 - sc / s) * 70, te = t0 + i * 0.03;
    const nm = (i + seed) % 3 === 1 ? 'sil_org2' : 'sil_org';
    putK(nm, slide(te, te + 0.22, x, yy, 0, fromX, 0, 0, 0.3), u, 600 + i * 3 + seed, { s: sc, a });
    const bx = x + 26 * sc, by = yy + 52 * sc;
    putK('ic_kantong', slide(te, te + 0.22, bx, by, 4, fromX, 0, 0, 0.3), u, 601 + i * 3 + seed, { s: sc * 0.95, a });
    if (crossed.includes(i)) { stampAt('m_cross_s', u, tX + k * 0.1, bx, by - 6, 0, 0.42 * sc / s); k++; }
  }
}
const coinOn = (n, p, u, t0, id, s = 0.62, dx = 0) => putK(n, drop(t0 - 0.2, t0, p[0] + dx, p[1] - size(n)[1] * s / 2 + 8, 0, 300, 0.8), u, id, { s });

const SHOTS = [
  // 01 · Kantong plastik ini cuma dua ratus perak—tapi   bag + Rp200 tag on the table at 0.00; DITOLAK hits at 0.20; a Rp200 coin on "dua"
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.07, cy: 820, shake: [[0.0, 8], [0.2, 12]] }); bg(SET.hook);
    putK('kantong_hero', [[0, 520, 560, -4, 1.2, 1, null, 0, 0.94], [0.1, 520, 570, -3, 0, 1, 'in', 1.2, 0.9]], u, 1);
    putK('tag_rp200', [[0, 800, 300, 14, 1.0, 1, null, 0, 0.84], [0.12, 800, 310, 12, 0, 1, 'in', 1.0, 0.8]], u, 2);
    putK('koin200', slap(at(0, 'dua'), 860, 760, 8), u, 3, { s: 0.95 });
    stampAt('st_ditolak', u, 0.2, 520, 960, -7, 0.78);
  },
  // 02 · banyak pembeli menolaknya.   the bag lifts away; a row of ten shoppers with bags; three bags get a red cross on "menolaknya"
  (u, T, d) => {
    const tm = at(1, 'menolaknya');
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 820 }); bg(SET.hook);
    putK('kantong_hero', [[0, 520, 570, -3, 0, 1, null, 0, 0.9], [0.22, 300, 400, -6, 0, 1, 'back', 0.6, 0.44]], u, 20);
    putK('tag_rp200', [[0, 800, 310, 12, 0, 1, null, 0, 0.8], [0.22, 520, 260, 8, 0, 1, 'back', 0.6, 0.62]], u, 21);
    putK('koin200', [[0, 860, 760, 8, 0, 1, null, 0, 0.95], [0.22, 700, 420, 4, 0, 1, 'back', 0.6, 0.6]], u, 22);
    crowd(u, 0.08, 100, 880, 10, 98, 1.25, [1, 5, 8], tm, 1);
  },
  // 03 · Tahun dua ribu enam belas, di puluhan kota,   ARSIP file opens; the trial map; 2016; pins drop on "puluhan"
  (u, T, d) => {
    const tp = at(2, 'puluhan'), pins = SP.peta.m.pins, MX = 540, MY = 600, MS = 1.06;
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 860 }); bg('file', u, true);
    putK('peta', slide(0, 0.22, MX, MY, -2, 0, 900, 0, 0.5), u, 30, { s: MS });
    pins.forEach(([px, py], i) => { const x = MX + px * MS, y = MY + py * MS; putK('pin', drop(tp + i * 0.04 - 0.12, tp + i * 0.04, x, y - 26, 0, 120, 0.4), u, 310 + i, { s: 0.85 }); });
    ransomRow('ry16', u, at(2, 'dua'), 400, 940, 0.08, 0.85);
    putK('s_kota', slap(at(2, 'kota'), 780, 1060, 3), u, 31);
    fileOverlay(u, 0.04, 0.95);
  },
  // 04 · kantong plastik minimarket nggak lagi gratis.   the checkout; GRATIS (green, before 2016) is crossed; the Rp200 tag lands on the bag roll
  (u, T, d) => {
    const tg = at(3, 'gratis');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 800, shake: [[tg, 10]] }); bg(SET.shop, u, true);
    putK('kasir_kantong', slide(0, 0.2, 560, 610, 0, 900, 0, 0, -0.4), u, 40, { s: 1.0 });
    putK('s_minimarket', slap(at(3, 'minimarket'), 700, 205, 2), u, 41);
    stampAt('st_gratis', u, 0.25, 300, 1035, -6, 0.8);
    stampAt('m_cross', u, tg, 300, 1030, 0, 0.9);
    putK('tag_rp200', slap(tg + 0.3, 330, 760, -12), u, 42, { s: 0.8 });
  },
  // 05 · Harganya dua ratus rupiah—   the receipt: the KANTONG PLASTIK 200 line is highlighted; coin; tag
  (u, T, d) => {
    const SX = 380, SY = 600, ry = SY + SP.struk.m.row_kantong;
    stage(u, d, { z0: 1.02, z1: 1.08, cx: 520, cy: 760 }); bg(SET.money, u, true);
    putK(u >= at(4, 'dua') ? 'struk_hl' : 'struk', slide(0, 0.2, SX, SY, -2, -800, 0, 0, 0.5), u, 50, { s: 1.0 });
    putK('koin200', slap(at(4, 'ratus'), 790, 470, 6), u, 51, { s: 1.0 });
    putK('tag_rp200', slap(at(4, 'rupiah'), 790, 820, 5), u, 52, { s: 0.85 });
    arrow(u, at(4, 'dua') + 0.1, at(4, 'dua') + 0.4, bow([600, ry - 4], [700, 520], -0.25), { seed: 53, head: true, col: PAL.ink, w: 6 });
  },
  // 06 · recehan yang biasanya diganti permen.   coins + hand-tinted candies; arrow coin → candy; slip "kembalian Rp200 = permen"
  (u, T, d) => {
    const tg = at(5, 'diganti');
    stage(u, d, { z0: 1.0, z1: 1.07, cy: 780 }); bg(SET.money);
    putK('koin_permen', slide(0, 0.2, 540, 640, -2, 0, 900, 0, 0.5), u, 60, { s: 1.0 });
    putK('koin200', [[0, 790, 470, 6, 0, 1, null, 0, 1.0], [0.2, 230, 330, -4, 0, 1, 'back', 0.6, 0.7]], u, 61);
    arrow(u, tg - 0.1, tg + 0.25, bow([300, 400], [640, 560], -0.3), { seed: 62, head: true, col: PAL.ink, w: 6 });
    putK('s_kembalian', slap(tg + 0.15, 540, 930, -2), u, 63, { s: 0.92 });
    putK('tag_rp200', [[0, 790, 820, 5, 0, 1, null, 0, 0.85], [0.2, 840, 300, 10, 0, 1, 'back', 0.6, 0.6]], u, 64);
  },
  // 07 · Sejak itu, cuma dalam tiga bulan,   calendar pages FEB → MAR → APR → MEI; 3 BULAN; the bag with its tag stays in the corner
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 800 }); bg(SET.data, u, true);
    putK('kantong_hero', slide(0, 0.2, 200, 820, -6, -700, 0, 0, 0.5), u, 70, { s: 0.42 });
    putK('tag_rp200', slide(0.05, 0.25, 240, 1010, -8, -700, 0, 0, 0.5), u, 71, { s: 0.55 });
    const pages = [['kal_feb', 0.05], ['kal_mar', at(6, 'cuma')], ['kal_apr', at(6, 'tiga')], ['kal_mei', at(6, 'bulan')]];
    pages.forEach(([n, t], i) => putK(n, slap(t, 600 + i * 22, 520 + i * 14, [-4, 3, -2, 4][i]), u, 72 + i, { s: 1.15 }));
    putK('s_3bulan', slap(at(6, 'bulan') + 0.1, 640, 960, -3), u, 77);
  },
  // 08 · pemakaian kantong plastik turun sampai tiga puluh persen.   the chart: the red line runs from 100 (FEB) down to 70 (MEI); -30%
  (u, T, d) => {
    const GX = 540, GY = 560, GS = 1.15, w = (x, y) => [GX + (x - 350) * GS, GY + (y - 260) * GS];
    const tt = at(7, 'turun'), tp = at(7, 'tiga');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 760, shake: [[tp, 10]] }); bg(SET.data);
    putK('grafik', slide(0, 0.2, GX, GY, -1, -900, 0, 0, 0.5), u, 80, { s: GS });
    const p0 = w(130, 110), p1 = w(610, 209);
    arrow(u, tt - 0.4, tp, [p0, [lerp(p0[0], p1[0], 0.5), lerp(p0[1], p1[1], 0.5) + 6], p1], { seed: 81, head: true, w: 10 });
    putK('kantong_hero', slap(0.25, p0[0] + 70, p0[1] + 85, -4), u, 82, { s: 0.15 });
    if (u >= tp) putK('kantong_hero', slap(tp, p1[0] - 10, p1[1] - 70, 6), u, 83, { s: 0.1 });
    putK('s_30', slap(tp, 600, 980, -3), u, 84, { s: 0.92 });
  },
  // 09 · Anehnya, dua ratus perak itu bukan rugi besar.   receipt: the 200 line circled next to the 24.200 total; RUGI BESAR? crossed
  (u, T, d) => {
    const SX = 330, SY = 610, ry = SY + SP.struk.m.row_kantong, rt = SY + SP.struk.m.row_total, tr = at(8, 'rugi');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 760 }); bg(SET.money, u, true);
    putK(u >= at(8, 'dua') ? 'struk_tot' : 'struk', slide(0, 0.2, SX, SY, -2, 0, 900, 0, 0.5), u, 90, { s: 1.0 });
    stampAt('m_circle', u, at(8, 'dua'), SX + 120, ry, 0, 0.36);
    putK('koin200', slap(at(8, 'perak'), 760, 330, 6), u, 91, { s: 0.6 });
    putK('s_rugibesar', slap(tr, 720, 880, 4), u, 92, { s: 0.72 });
    stampAt('m_cross', u, at(8, 'besar') + 0.12, 720, 880, 0, 0.9);
  },
  // 10 · Lalu kenapa orang sampai menolak?   the offered bag (Rp200 tag) and the raised palm; DITOLAK; "?"
  (u, T, d) => {
    const tm = at(9, 'menolak');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 760, shake: [[tm, 12]] }); bg(SET.hook, u, true);
    putK('tolak_kantong', slide(0, 0.2, 540, 620, 0, 900, 0, 0, -0.4), u, 100, { s: 1.0 });
    putK('tag_rp200', slap(0.15, 330, 860, -10), u, 101, { s: 0.62 });
    ransomRow('rq', u, at(9, 'kenapa'), 880, 250, 0.1, 0.8);
    stampAt('st_ditolak', u, tm, 620, 960, -6, 0.78);
  },
  // 11 · Petunjuknya datang dari Amerika.   the clue: a 2018 journal page; an American checkout; a dashed route to the Indonesian map
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 780 }); bg(SET.us, u, true);
    putK('jurnal', slide(0, 0.2, 290, 520, -4, -800, 0, 0, 0.5), u, 110, { s: 0.88 });
    putK('toko_as', slide(at(10, 'datang') - 0.1, at(10, 'datang') + 0.1, 680, 820, 2, 800, 0, 0, -0.4), u, 111, { s: 0.72 });
    putK('peta', slap(0.2, 830, 250, 4), u, 112, { s: 0.36 });
    putK('s_as', slap(at(10, 'Amerika'), 650, 1010, -2), u, 113, { s: 0.88 });
    route(u, at(10, 'Amerika') - 0.1, at(10, 'Amerika') + 0.35, bow([620, 560], [800, 330], 0.3), { seed: 114, col: PAL.red });
  },
  // 12 · Di satu daerah, tiap kantong harus dibayar lima sen.   left side (red): Maryland county; the bag; BAYAR 5 SEN; a 5-cent coin
  (u, T, d) => {
    const tb = at(11, 'dibayar');
    stage(u, d, { z0: 1.06, z1: 1.1, cx: 420, cy: 720, cx1: 400 }); bg(SET.split, u, true);
    putK('s_md', slap(at(11, 'daerah'), 470, 200, -1), u, 120);
    putK('s_daerah', slap(at(11, 'satu'), 290, 300, -3), u, 121);
    putK('kantong_hero', slide(0, 0.2, 290, 620, -3, -700, 0, 0, 0.5), u, 122, { s: 0.5 });
    putK('tag_bayar5', slap(tb, 300, 940, -4), u, 123, { s: 0.85 });
    putK('koin5', drop(at(11, 'lima') - 0.2, at(11, 'lima'), 520, 760, 0, 500, 0.8), u, 124, { s: 0.75 });
  },
  // 13 · Di toko lain, yang bawa tas sendiri justru dapat bonus lima sen.   camera opens to both sides; right (amber): cloth tote, BONUS 5 SEN
  (u, T, d) => {
    const tb = at(12, 'bonus');
    camK(u, [[0, 400, 720, 1.08], [0.4, 540, 760, 1.0, 'io'], [d, 540, 760, 1.02]]); bg(SET.split);
    put('s_md', 470, 200, -1); put('s_daerah', 290, 300, -3); put('kantong_hero', 290, 620, -3, 0, 1, 0.5);
    put('tag_bayar5', 300, 940, -4, 0, 1, 0.85); put('koin5', 520, 760, 0, 0, 1, 0.75);
    route(u, 0.1, 0.5, [[600, 330], [596, 700], [602, 1080]], { seed: 131, col: PAL.ink, w: 4 });
    putK('s_tokolain', slap(at(12, 'toko'), 820, 320, 3), u, 130);
    putK('tas_kain', slide(at(12, 'tas') - 0.2, at(12, 'tas'), 820, 650, 2, 700, 0, 0, -0.4), u, 132, { s: 0.75 });
    putK('tag_bonus5', slap(tb, 820, 960, 4), u, 133, { s: 0.85 });
    putK('koin5', drop(at(12, 'lima') - 0.2, at(12, 'lima'), 960, 800, 0, 500, 0.8), u, 134, { s: 0.6 });
  },
  // 14 · Yang harus bayar, banyak yang berhenti pakai kantong.   left: the shopper hugging his groceries (no bag); his row: 2 of 5 stop
  (u, T, d) => {
    const tb = at(13, 'berhenti');
    stage(u, d, { z0: 1.0, z1: 1.05, cx: 500, cx1: 470, cy: 720 }); bg(SET.split, u, true);
    putK('pembeli_kantong', slide(0, 0.22, 790, 577, 0, 700, 0, 0, -0.4), u, 141, { s: 0.75, a: 0.42 });
    putK('pembeli_peluk', slide(0, 0.2, 290, 438, 0, -700, 0, 0, 0.5), u, 140, { s: 0.5 });
    putK('tag_bayar5', slap(at(13, 'bayar'), 300, 770, -4), u, 142, { s: 0.75 });
    crowd(u, 0.1, 100, 990, 5, 92, 1.0, [1, 3], tb, 2, 1, -700);
    putK('s_berhenti', slap(tb + 0.2, 300, 680, -3), u, 143, { s: 0.85 });
  },
  // 15 · Yang dapat bonus? Tetap pakai kantong seperti biasa.   right: the same shopper walking with full bags; his row: all keep their bags
  (u, T, d) => {
    const tb = at(14, 'bonus'), tt = at(14, 'tetap');
    stage(u, d, { z0: 1.0, z1: 1.04, cx: 550, cx1: 575, cy: 720 }); bg(SET.split);
    put('pembeli_peluk', 290, 438, 0, 0, 1, 0.5, 0.45); put('tag_bayar5', 300, 770, -4, 0, 1, 0.75, 0.45);
    crowd(u, -9, 100, 990, 5, 92, 1.0, [1, 3], -1, 2, 0.45);
    put('pembeli_kantong', 790, 577, 0, 0, 1, 0.75);
    putK('tag_bonus5', slap(tb, 900, 330, 6), u, 150, { s: 0.7 });
    crowd(u, 0.1, 620, 990, 5, 92, 1.0, [], 99, 3, 1, 700);
    stampAt('m_tick_s', u, tt, 1000, 860, 0, 0.8);
  },
  // 16 · Nilainya sama-sama lima sen.   (pause) the balance drops in level; a 5-cent coin on each pan; BAYAR | BONUS; SAMA-SAMA 5 SEN
  (u, T, d) => {
    const ts = at(15, 'sama'), C = [540, 450 - 820 * (1 - EASE.out(seg(stepT(u), 0.0, 0.32)))];
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 760, shake: [[0.32, 8]] }); bg(SET.scale, u, true);
    const p = balance(C, 1.0, 0);
    coinOn('koin5', p.L, u, ts, 160); coinOn('koin5', p.R, u, ts + 0.12, 161);
    putK('tag_bayar5', slap(0.5, p.L[0], p.L[1] + 105, -5), u, 162, { s: 0.62 });
    putK('tag_bonus5', slap(0.62, p.R[0], p.R[1] + 105, 5), u, 163, { s: 0.62 });
    putK('s_sama', slap(ts + 0.25, 540, 205, -2), u, 164, { s: 0.85 });
  },
  // 17 · Tapi bonus terasa seperti untung kecil,   the beam starts to tip; the bonus pan rises a little: UNTUNG (amber), small
  (u, T, d) => {
    const tu = at(16, 'untung'), th = -5 * EASE.io(seg(u, 0.1, 0.9));
    stage(u, d, { z0: 1.02, z1: 1.07, cx: 560, cx1: 640, cy: 770 }); bg(SET.scale);
    const p = balance([540, 450], 1.0, th);
    coinOn('koin5', p.L, u, -1, 170); coinOn('koin5', p.R, u, -1, 171);
    put('tag_bayar5', p.L[0], p.L[1] + 105, -5, 0, 1, 0.62); put('tag_bonus5', p.R[0], p.R[1] + 105, 5, 0, 1, 0.62);
    putK('lbl_untung', slap(tu, p.R[0] - 10, p.R[1] - 150, 4), u, 172, { s: 0.62 });
  },
  // 18 · sedangkan bayar kantong   camera to the paying pan; a bag drops onto it and that pan sinks
  (u, T, d) => {
    const tk = at(17, 'kantong'), th = -5 - 9 * EASE.out(seg(u, tk - 0.1, tk + 0.4));
    stage(u, d, { z0: 1.07, z1: 1.08, cx: 640, cx1: 450, cy: 790, shake: [[tk + 0.1, 10]] }); bg(SET.scale);
    const p = balance([540, 450], 1.0, th);
    coinOn('koin5', p.L, u, -1, 180, 0.62, 50); coinOn('koin5', p.R, u, -1, 181);
    if (u >= tk - 0.25) putK('kantong_hero', drop(tk - 0.25, tk, p.L[0] - 20, p.L[1] - 125, -4, 400, 0.8), u, 182, { s: 0.3 });
    put('tag_bayar5', p.L[0], p.L[1] + 105, -5, 0, 1, 0.62); put('tag_bonus5', p.R[0], p.R[1] + 105, 5, 0, 1, 0.62);
    put('lbl_untung', p.R[0] - 10, p.R[1] - 150, 4, 0, 1, 0.62);
  },
  // 19 · terasa seperti kehilangan barang yang tadinya gratis.   the open hand loses its coin; the bag (once free) floats away; RUGI on the hand
  (u, T, d) => {
    const tg = at(18, 'gratis');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 760, shake: [[tg, 12]] }); bg(SET.loss, u, true);
    putK('koin_jatuh', slide(0, 0.2, 600, 640, 0, 900, 0, 0, -0.4), u, 190, { s: 0.9 });
    const fl = seg(u, at(18, 'kehilangan'), d);
    put('kantong_hero', 230 - 40 * fl, 420 - 160 * fl, -8 - 10 * fl, 1.5 + fl, 1, 0.34 - 0.06 * fl, 1 - 0.35 * fl);
    putK('s_tadinya', slap(at(18, 'tadinya'), 250, 700 - 160 * fl, -4), u, 191, { s: 0.85, a: 1 - 0.3 * fl });
    stampAt('st_rugi', u, tg, 640, 960, -8, 0.85);
  },
  // 20 · Otak kita lebih benci rugi daripada senang untung.   the balance fully tipped: RUGI pan (bag + coin) down, UNTUNG up; a head silhouette
  (u, T, d) => {
    const tr = at(19, 'rugi'), tu = at(19, 'untung'), th = -14 - 3 * EASE.out(seg(u, tr - 0.1, tr + 0.3));
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 800, shake: [[tr + 0.1, 12]] }); bg(SET.scale, u, true);
    const p = balance([560, 450], 1.0, th);
    coinOn('koin5', p.L, u, -1, 202, 0.62, 50); coinOn('koin5', p.R, u, -1, 203);
    put('kantong_hero', p.L[0] - 20, p.L[1] - 125, -4, 0, 1, 0.3);
    putK('lbl_rugi', slap(tr, p.L[0], p.L[1] + 100, -6), u, 204, { s: 0.75 });
    arrow(u, tr + 0.05, tr + 0.35, [[p.L[0] - 150, p.L[1] - 160], [p.L[0] - 150, p.L[1] + 20]], { seed: 206, head: true, w: 9 });
    arrow(u, tu + 0.05, tu + 0.35, [[p.R[0] + 140, p.R[1] + 40], [p.R[0] + 140, p.R[1] - 120]], { seed: 207, head: true, w: 6, col: PAL.ink });
    putK('lbl_untung', slap(tu, p.R[0], p.R[1] - 140, 5), u, 205, { s: 0.62 });
  },
  // 21 · Lain kali, kalo yang biasanya gratis tiba-tiba berbayar,   back home: receipt + bag; GRATIS (green) gets crossed; Rp200 tag lands
  (u, T, d) => {
    const SX = 330, SY = 620, ry = SY + SP.struk.m.row_kantong, tg = at(20, 'gratis'), tb = at(20, 'berbayar');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 760, shake: [[tb, 10]] }); bg(SET.hook, u, true);
    putK(u >= tb ? 'struk_hl' : 'struk', slide(0, 0.2, SX, SY, -3, -800, 0, 0, 0.5), u, 210, { s: 0.95 });
    putK('kantong_hero', slide(0.05, 0.25, 790, 560, 4, 800, 0, 0, -0.5), u, 211, { s: 0.52 });
    stampAt('st_gratis', u, tg, 790, 900, 5, 0.66);
    stampAt('m_cross', u, tb, 790, 895, 0, 0.8);
    putK('tag_rp200', slap(tb + 0.15, 830, 330, 10), u, 212, { s: 0.7 });
  },
  // 22 · perhatikan rasa beratnya—   the bag (Rp200) on one pan sinks, the 200 coin on the other stays light; "rasa beratnya"
  (u, T, d) => {
    const th = -15 * EASE.out(seg(u, 0.15, 0.7));
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 760 }); bg(SET.scale, u, true);
    const p = balance([540, 450], 0.95, th);
    put('kantong_hero', p.L[0] - 10, p.L[1] - 120, -4, 0, 1, 0.28);
    put('tag_rp200', p.L[0] + 40, p.L[1] - 30, 10, 0, 1, 0.45);
    coinOn('koin200', p.R, u, 0.05, 220, 0.55);
    putK('s_berat', slap(at(21, 'rasa'), 540, 205, -2), u, 221, { s: 0.9 });
  },
  // 23 · yang kamu hitung bukan uangnya, tapi rasa ruginya.   loop to frame 0: the bag + Rp200 tag; the coin crossed; RASA RUGI stamped
  (u, T, d) => {
    const tu = at(22, 'uangnya'), tr = at(22, 'ruginya');
    stage(u, d, { z0: 1.02, z1: 1.07, cy: 820, shake: [[tr, 10]] }); bg(SET.hook, u, true);
    putK('kantong_hero', slide(0, 0.22, 520, 570, -3, 0, -900, 0, 0.5), u, 230, { s: 0.9 });
    putK('tag_rp200', slap(0.15, 800, 310, 12), u, 231, { s: 0.8 });
    putK('koin200', slap(0.3, 860, 760, 8), u, 232, { s: 0.95 });
    stampAt('m_cross_s', u, tu, 860, 760, 0, 1.1);
    stampAt('st_rasarugi', u, tr, 520, 960, -7, 0.74);
  },
];
function lerp(a, b, t) { return a + (b - a) * t; }

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(kantong|dua|ratus|perak|menolak|gratis|permen|tiga|turun|persen|rugi|amerika|lima|sen|bonus|bayar|berhenti|biasa|sama|untung|kehilangan|benci|berbayar|berat|uang)/i } });
}
export const renderAt = t => film.renderAt(t);
