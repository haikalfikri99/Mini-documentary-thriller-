// ARSIP #012 Cara Halus Kartu Member Bikin Kamu Balik Lagi · ARSIP Kolase. 24 shots on the VO timing (vo_words.json); each shot is a
// small paper table with its own camera. Caption band y 1210–1536 stays clear: labels live in world y ≤ 1090 with the camera at
// cy 880 (screen y = 960 + (y − cy)·zoom ≤ 1180). Card A = 8 empty boxes (left hand, mirrored print), card B = 10 boxes with 2 GRATIS
// caps (right hand); both need 8 more caps. Box centres, the card inside the AI prints and the stamp's contact point come from the
// manifest (bake.py). 34% vs 19% (secondary sources) appear on screen only, never in the VO (7-selera #80e). Reveal pause 33.0–33.6:
// everything has landed and the camera holds. Last shot = the frame 0 composition (loop).
import { W, H, SP, PAL, setCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 1.54, 3.24, 4.72, 6.66, 8.3, 10.17, 13.14, 15.36, 16.64, 18.78, 21.0, 22.94, 24.26, 27.02, 29.4, 31.32,
  33.6, 35.56, 38.48, 40.66, 43.38, 46.64, 48.9, 50.4];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, fileOverlay } = K;
let film = null;

const SET = {
  hook: [['f_green', 170, 300, -8], ['f_amber', 950, 1120, 0], ['f_cream', 540, 1570, -3]],
  kenal: [['f_amber', 260, 380, 0], ['f_green_s', 960, 230, 0], ['f_cream', 540, 1565, -2]],
  study: [['f_news', 520, 700, -2], ['f_green_s', 980, 210, 0], ['f_cream', 540, 1565, 2]],
  same: [['f_manila', 520, 620, 2], ['f_green_s', 110, 200, 0], ['f_cream', 540, 1565, -3]],
  result: [['f_cream', 540, 1180, -1], ['f_amber_s', 960, 200, 0], ['f_green_s', 110, 1060, 0]],
  why: [['f_red', 540, 190, -4], ['f_amber_s', 980, 1080, 0], ['f_cream', 540, 1565, 2]],
  close: [['f_green', 900, 330, 8], ['f_amber_s', 120, 1080, 0], ['f_cream', 540, 1560, 2]],
};
const CAM = { cy: 880 };
const sg = (o = {}) => Object.assign({ cy: CAM.cy, z0: 1.0, z1: 1.05 }, o);
// a point of a placed part: local offset (world units at s = 1) → world, through the part's rotation and scale
const R = (dx, dy, r, s) => { const a = r * Math.PI / 180, c = Math.cos(a), n = Math.sin(a); return [(dx * c - dy * n) * s, (dx * n + dy * c) * s]; };
const on = (x, y, r, s, off) => { const [dx, dy] = R(off[0], off[1], r, s); return [x + dx, y + dy]; };
const box = (name, i, x, y, r = 0, s = 1) => on(x, y, r, s, SP[name].m.boxes[i]);
// the stamping hand: presses the rubber stamp on the world points pts at the times ts (shot-local), then lifts away
function stamper(u, pts, ts, s = 0.75, id = 900) {
  const tip = SP.stempel_hand.m.tip, pos = (p, lift) => [p[0] - tip[0] * s, p[1] - tip[1] * s - lift];
  const [x0, y0] = pos(pts[0], 140), K_ = [[ts[0] - 0.32, x0 + 420, y0 - 160, 8, 3, 1, null, 0]];
  pts.forEach((p, i) => { const [x, y] = pos(p, 0), [xu, yu] = pos(p, 60);
    K_.push([ts[i] - 0.07, xu, yu, 2, 1.4, 1, 'out']); K_.push([ts[i], x, y, 0, 0.2, 1, 'in', 0.5]); });
  const [xl, yl] = pos(pts[pts.length - 1], 110); K_.push([ts[ts.length - 1] + 0.22, xl + 20, yl - 40, 4, 2.2, 1, 'out']); K_.push([ts[ts.length - 1] + 0.5, xl - 40, yl - 90, 6, 3, 1, 'io']);
  return putK('stempel_hand', K_, u, id, { s });
}
// frame 0 composition (shots 1, 2, 24): card A in the left hand (top), card B in the right hand (bottom)
const HA = { x: 470, y: 425, r: -2, s: 0.95 }, HB = { x: 610, y: 900, r: 2, s: 0.95 };
const cardA = () => on(HA.x, HA.y, HA.r, HA.s, SP.tangan_a.m.card), cardB = () => on(HB.x, HB.y, HB.r, HB.s, SP.tangan_b.m.card);
const hands = (u, ka, kb) => { putK('tangan_a', ka, u, 11, { s: HA.s }); putK('tangan_b', kb, u, 12, { s: HB.s }); };
const restK = (o) => [[-9, o.x, o.y, o.r, 0, 1]];
// two cards stacked for the comparison shots (12, 13)
const CA = { x: 420, y: 430, r: -1, s: 0.78 }, CB = { x: 420, y: 800, r: 1, s: 0.78 };

const SHOTS = [
  // 01 · Dua kartu member ini sama-sama   both hands already moving at 0.00; "8 CAP" lands on card A at 0.12 and card B at 0.22
  (u, T, d) => {
    stage(u, d, sg({ z0: 1.02, z1: 1.06, shake: [[0.12, 9], [0.22, 9]] })); bg(SET.hook);
    hands(u, [[0, HA.x - 40, HA.y - 10, HA.r - 2, 1.2, 1], [0.12, HA.x, HA.y, HA.r, 0, 1, 'in', 1.0]],
             [[0, HB.x + 40, HB.y + 10, HB.r + 2, 1.2, 1], [0.2, HB.x, HB.y, HB.r, 0, 1, 'in', 1.0]]);
    const [ax, ay] = cardA(), [bx, by] = cardB();
    stampAt('st_8cap', u, 0.12, ax + 70, ay + 75, -8, 0.55);
    stampAt('st_8cap', u, 0.22, bx - 60, by + 80, 6, 0.55);
  },
  // 02 · butuh delapan cap—tapi   amber 8 beside each card + the box counts
  (u, T, d) => {
    const t8 = at(1, 'delapan');
    stage(u, d, sg({ z0: 1.05, z1: 1.08, shake: [[t8, 8]] })); bg(SET.hook);
    hands(u, restK(HA), restK(HB));
    putK('s_8kotak', slide(0.02, 0.22, 700, 612, -3, 700, 0, 0, -0.5), u, 21, { s: 0.85 });
    putK('s_10kotak', slide(0.1, 0.3, 370, 680, 3, -700, 0, 0, 0.5), u, 22, { s: 0.85 });
    putK('n8', slap(t8, 935, 400, 5), u, 23, { s: 0.42 });
    putK('n8b', slap(t8 + 0.14, 150, 880, -5), u, 24, { s: 0.42 });
  },
  // 03 · hasilnya beda jauh.   card A shrinks and fades, card B comes forward; BEDA JAUH between them; tick on B
  (u, T, d) => {
    const tb = at(2, 'beda'), tj = at(2, 'jauh');
    stage(u, d, sg({ z0: 1.04, z1: 1.08, shake: [[tb, 12]] })); bg(SET.hook);
    putK('tangan_a', [[0, HA.x, HA.y, HA.r, 0, 1, null, 0, 1], [0.5, HA.x - 60, HA.y - 40, -6, 0, 1, 'io', 0, 0.86]], u, 31, { s: HA.s, a: u < 0.5 ? 1 - 0.5 * u / 0.5 : 0.5 });
    putK('tangan_b', [[0, HB.x, HB.y, HB.r, 0, 1, null, 0, 1], [0.5, HB.x - 10, HB.y - 30, 0, 0.6, 1, 'back', 0.6, 1.08]], u, 32, { s: HB.s });
    stampAt('st_beda', u, tb, 560, 605, -6, 0.72);
    const [bx, by] = on(HB.x - 10, HB.y - 30, 0, HB.s * 1.08, SP.tangan_b.m.card);
    stampAt('m_tick_s', u, tj, bx + 175, by + 15, 0, 1.0);
    putK('s_210', slap(tj + 0.12, bx - 40, by + 205, -3), u, 33, { s: 0.8 });
  },
  // 04 · Kartu begini pasti kamu kenal   a fan of everyday stamp cards on the table (coffee, scooter wash, a plain one)
  (u, T, d) => {
    const tk = at(3, 'kenal');
    stage(u, d, sg({ z0: 1.0, z1: 1.06 })); bg(SET.kenal, u, true);
    putK('kartu_kopi', slide(0, 0.2, 370, 430, -10, -800, 0, 0, 0.6), u, 41, { s: 0.62 });
    putK('kartu_motor', slide(0.1, 0.3, 700, 620, 7, 800, 0, 0, -0.6), u, 42, { s: 0.62 });
    putK('kartu_a', slide(0.2, 0.4, 500, 860, -2, 0, 700, 0, 0.5), u, 43, { s: 0.72 });
    [0, 1].forEach(i => { const [x, y] = box('kartu_a', i, 500, 860, -2, 0.72); stampAt('cap_cuci', u, tk + i * 0.16, x, y, -6 + i * 9, 0.72); });
  },
  // 05 · di kedai kopi atau cuci motor:   the coffee counter and the scooter wash, each with its card
  (u, T, d) => {
    const tk = at(4, 'kopi'), tm = at(4, 'motor');
    stage(u, d, sg({ z0: 1.02, z1: 1.06, cx: 520, cx1: 560 })); bg(SET.kenal);
    putK('kedai_kopi', slide(0, 0.2, 300, 470, -2, -800, 0, 0, 0.5), u, 51, { s: 0.7 });
    putK('cuci_motor', slide(0.08, 0.28, 735, 860, 2, 800, 0, 0, -0.5), u, 52, { s: 0.72 });
    putK('kartu_kopi', slap(tk, 800, 375, 8), u, 53, { s: 0.45 });
    putK('s_kopi', slap(tk + 0.1, 300, 770, -3), u, 54, { s: 0.85 });
    putK('kartu_motor', slap(tm, 265, 935, -7), u, 55, { s: 0.45 });
    putK('s_motor', slap(tm + 0.1, 780, 625, 3), u, 56, { s: 0.85 });
  },
  // 06 · kumpulkan cap, dapat gratis satu.   the stamping hand fills all 8 boxes, then the free voucher lands
  (u, T, d) => {
    const tg = at(5, 'gratis'), C0 = { x: 540, y: 590, r: -2, s: 1.05 };
    stage(u, d, sg({ z0: 1.0, z1: 1.05, shake: [[tg, 8]] })); bg(SET.kenal);
    putK('kartu_a', slide(0, 0.16, C0.x, C0.y, C0.r, -800, 0, 0, 0.5), u, 61, { s: C0.s });
    const ts = Array.from({ length: 8 }, (_, i) => 0.2 + i * 0.105), pts = ts.map((_, i) => box('kartu_a', i, C0.x, C0.y, C0.r, C0.s));
    pts.forEach((p, i) => stampAt('cap_cuci', u, ts[i], p[0], p[1], (i * 37 % 11) - 5, 0.98));
    putK('tiket', slap(tg, 790, 960, 6), u, 62, { s: 0.85 });
    stamper(u, pts, ts, 0.72, 63);
  },
  // 07 · Dua peneliti mencobanya di sebuah tempat cuci mobil.   the ARSIP folder opens; the car wash; two observers and their visit log
  (u, T, d) => {
    const tm = at(6, 'mobil');
    stage(u, d, sg({ z0: 1.04, z1: 1.08 })); bg(SET.study, u, true);
    putK('cuci_mobil', slide(0, 0.22, 540, 520, 0, 0, -800, 0, 0.5), u, 71, { s: 0.95 });
    putK('sil_man', slide(0.25, 0.45, 160, 985, -2, -500, 0, 0, 0.4), u, 72, { s: 0.3 });
    putK('sil_man_m', slide(0.35, 0.55, 920, 985, 2, 500, 0, 0, -0.4), u, 73, { s: 0.3 });
    putK('catatan', slide(0.5, 0.7, 540, 990, -3, 0, 600, 0, 0.4), u, 74, { s: 0.38 });
    putK('s_mobil', slap(tm, 770, 255, 4), u, 75, { s: 0.85 });
    putK('s_src', slap(1.5, 300, 185, -1), u, 76, { s: 0.8 });
    fileOverlay(u, 0.05, 1.15);
  },
  // 08 · Sebagian pelanggan dapat kartu delapan kotak,   a row of 10 customers: the left half gets card A (left hand)
  (u, T, d) => {
    const t8 = at(7, 'delapan');
    stage(u, d, sg({ z0: 1.0, z1: 1.05 })); bg(SET.study, u, true);
    putK('barisan', slide(0, 0.2, 540, 300, 0, 0, -600, 0, 0.4), u, 81);
    route(u, 0.2, 0.45, [[100, 382], [100, 402], [500, 402], [500, 382]], { col: PAL.amber, w: 8, dash: null, seed: 81 });
    putK('s_sebagian', slap(0.3, 300, 455, -3), u, 82, { s: 0.85 });
    putK('tangan_a', slide(0.25, 0.5, 470, 760, -2, -900, 0, 0, 0.6), u, 83, { s: 0.9 });
    arrow(u, 0.55, 0.85, bow([380, 490], [560, 590], 0.25), { seed: 84, col: PAL.ink, w: 6 });
    putK('s_8kotak', slap(t8, 700, 985, -3), u, 85, { s: 0.85 });
  },
  // 09 · capnya masih kosong.   card A close: the stamp hovers but presses nothing; 0 / 8, "0 CAP"
  (u, T, d) => {
    const tk = at(8, 'kosong'), C0 = { x: 520, y: 650, r: -2, s: 1.05 };
    stage(u, d, sg({ z0: 1.04, z1: 1.09 })); bg(SET.study);
    put('kartu_a', C0.x, C0.y, C0.r, 0, 1, C0.s);
    const [bx, by] = box('kartu_a', 3, C0.x, C0.y, C0.r, C0.s), tip = SP.stempel_hand.m.tip, s = 0.72;
    const hx = bx - tip[0] * s, hy = by - tip[1] * s - 150;
    putK('stempel_hand', [[0, hx + 300, hy - 120, 8, 3, 1], [0.25, hx, hy, 3, 2.4, 1, 'back', 0.4], [0.7, hx + 10, hy - 25, 5, 2.6, 1, 'io'], [1.2, hx, hy, 3, 2.4, 1, 'io']], u, 91, { s });
    putK('s_08', slap(0.15, 230, 330, -5), u, 92, { s: 0.95 });
    stampAt('st_kosong', u, tk, 560, 760, -8, 0.8);
  },
  // 10 · Sebagian lagi dapat kartu sepuluh kotak,   the right half of the row gets card B: 10 boxes, still empty (right hand)
  (u, T, d) => {
    const t10 = at(9, 'sepuluh');
    stage(u, d, sg({ z0: 1.0, z1: 1.05 })); bg(SET.study, u, true);
    put('barisan', 540, 300, 0);
    route(u, 0.0, 0.01, [[100, 382], [100, 402], [500, 402], [500, 382]], { col: PAL.ink, w: 6, dash: null, seed: 81 });
    route(u, 0.15, 0.4, [[580, 382], [580, 402], [980, 402], [980, 382]], { col: PAL.amber, w: 8, dash: null, seed: 101 });
    putK('s_sebagian2', slap(0.25, 770, 455, 3), u, 101, { s: 0.85 });
    putK('tangan_b0', slide(0.2, 0.45, 610, 760, 2, 900, 0, 0, -0.6), u, 102, { s: 0.9 });
    arrow(u, 0.5, 0.8, bow([700, 490], [520, 590], -0.25), { seed: 103, col: PAL.ink, w: 6 });
    putK('s_10kotak', slap(t10, 380, 985, 3), u, 104, { s: 0.85 });
  },
  // 11 · tapi dua kotaknya sudah dicap gratis.   the hand stamps GRATIS in boxes 1 and 2 of card B
  (u, T, d) => {
    const t1 = at(10, 'dua'), t2 = at(10, 'dicap'), tg = at(10, 'gratis'), C0 = { x: 540, y: 650, r: -2, s: 1.05 };
    stage(u, d, sg({ z0: 1.03, z1: 1.08, shake: [[t1, 7], [t2, 7]] })); bg(SET.study);
    put('kartu_b0', C0.x, C0.y, C0.r, 0, 1, C0.s);
    put('kartu_a', 175, 1000, -8, 0, 1, 0.36, 0.85);
    const pts = [box('kartu_b0', 0, C0.x, C0.y, C0.r, C0.s), box('kartu_b0', 1, C0.x, C0.y, C0.r, C0.s)];
    pts.forEach((p, i) => stampAt('cap_gratis', u, [t1, t2][i], p[0], p[1], [-7, 5][i], 1.12));
    putK('s_210', slap(tg, 850, 345, 5), u, 111, { s: 0.95 });
    stamper(u, pts, [t1, t2], 0.72, 112);
  },
  // 12 · Jarak ke hadiahnya sama persis:   both cards: the boxes still to fill highlighted, a voucher at the end of each
  (u, T, d) => {
    const th = at(11, 'hadiahnya'), ts = at(11, 'sama');
    stage(u, d, sg({ z0: 1.0, z1: 1.05, shake: [[ts, 8]] })); bg(SET.same, u, true);
    putK('kartu_a', slide(0, 0.18, CA.x, CA.y, CA.r, -800, 0, 0, 0.5), u, 121, { s: CA.s });
    putK('kartu_b', slide(0.08, 0.26, CB.x, CB.y, CB.r, -800, 0, 0, 0.5), u, 122, { s: CB.s });
    stampAt('hl_a', u, 0.3, CA.x, CA.y, CA.r, CA.s); stampAt('hl_b', u, 0.42, CB.x, CB.y, CB.r, CB.s);
    putK('tiket', slap(th, 880, 425, 5), u, 123, { s: 0.55 });
    putK('tiket', slap(th + 0.1, 880, 800, -4), u, 124, { s: 0.55 });
    route(u, th + 0.05, th + 0.35, [[670, 430], [780, 428]], { seed: 125, col: PAL.ink }); route(u, th + 0.15, th + 0.45, [[670, 802], [780, 800]], { seed: 126, col: PAL.ink });
    stampAt('st_sama', u, ts, 845, 615, -8, 0.55);
  },
  // 13 · delapan kali cuci lagi.   an amber 8 on each road to the voucher, "=" between
  (u, T, d) => {
    const t8 = at(12, 'delapan'), tk = at(12, 'kali');
    stage(u, d, sg({ z0: 1.05, z1: 1.1, cx: 560, shake: [[t8, 8]] })); bg(SET.same);
    put('kartu_a', CA.x, CA.y, CA.r, 0, 1, CA.s); put('kartu_b', CB.x, CB.y, CB.r, 0, 1, CB.s);
    put('hl_a', CA.x, CA.y, CA.r, 0, 1, CA.s); put('hl_b', CB.x, CB.y, CB.r, 0, 1, CB.s);
    put('tiket', 880, 425, 5, 0, 1, 0.55); put('tiket', 880, 800, -4, 0, 1, 0.55);
    route(u, -1, 0, [[670, 430], [780, 428]], { seed: 125, col: PAL.ink }); route(u, -1, 0, [[670, 802], [780, 800]], { seed: 126, col: PAL.ink });
    putK('n8', slap(t8, 725, 405, 4), u, 131, { s: 0.3 });
    putK('n8b', slap(t8 + 0.12, 725, 780, -4), u, 132, { s: 0.3 });
    stampAt('m_eq', u, tk, 725, 605, 0, 1.1);
  },
  // 14 · Anehnya, dibanding yang kartunya kosong,   20 customers with the empty card: 4 of them reach the free wash
  (u, T, d) => {
    const tk = at(13, 'kosong');
    stage(u, d, sg({ z0: 1.0, z1: 1.05 })); bg(SET.result, u, true);
    putK('kerumunan_a0', slide(0, 0.2, 540, 470, -1, 0, -700, 0, 0.4), u, 141);
    if (u >= tk) put('kerumunan_a', 540, 470, -1, 0, 1, 1, Math.min(1, Math.floor((stepT(u) - tk) * 12 + 1) / 3));
    putK('kartu_a', slide(0.15, 0.35, 230, 760, -6, -700, 0, 0, 0.5), u, 142, { s: 0.42 });
    putK('s_kosong', slap(0.4, 240, 905, -3), u, 143, { s: 0.85 });
    putK('catatan', slide(0.3, 0.5, 820, 790, 5, 700, 0, 0, -0.5), u, 144, { s: 0.42 });
    putK('s_4dari20', slap(tk + 0.25, 540, 660, -2), u, 145, { s: 0.85 });
  },
  // 15 · pelanggan yang kartunya sudah dicap hampir dua kali   20 customers with the stamped card: 7 of them (HAMPIR 2×)
  (u, T, d) => {
    const tc = at(14, 'dicap'), th = at(14, 'hampir');
    stage(u, d, sg({ z0: 1.0, z1: 1.05 })); bg(SET.result);
    put('kerumunan_a', 560, 350, -1, 0, 1, 0.85);
    put('s_kosong', 330, 205, -3, 0, 1, 0.8); put('s_4dari20', 790, 505, -2, 0, 1, 0.8);
    putK('kerumunan_b0', slide(0, 0.22, 560, 730, 1, 800, 0, 0, -0.4), u, 151, { s: 0.85 });
    if (u >= tc) put('kerumunan_b', 560, 730, 1, 0, 1, 0.85, Math.min(1, Math.floor((stepT(u) - tc) * 12 + 1) / 3));
    putK('s_bercap', slap(0.25, 330, 588, 3), u, 152, { s: 0.8 });
    putK('s_7dari20', slap(tc + 0.25, 790, 885, 2), u, 153, { s: 0.8 });
    putK('s_2x', slap(th, 560, 1015, -3), u, 154, { s: 0.85 });
  },
  // 16 · lebih banyak yang dapat cuci gratis.   the chart: 19% (empty card) vs 34% (stamped card), bars enter from the left
  (u, T, d) => {
    const tb = at(15, 'banyak'), tg = at(15, 'gratis');
    stage(u, d, sg({ z0: 1.0, z1: 1.05 })); bg(SET.result, u, true);
    putK('grafik', slide(0, 0.2, 540, 560, -1, -900, 0, 0, 0.5), u, 161);
    putK('bar_19', slide(0.2, 0.45, 337, 478, -1, -700, 0, 0, 0), u, 162);
    putK('bar_34', slide(0.35, 0.65, 482, 655, -1, -900, 0, 0, 0), u, 163);
    putK('s_19', slap(0.55, 600, 478, -3), u, 164, { s: 0.8 });
    putK('s_34', slap(0.8, 868, 655, 3), u, 165, { s: 0.8 });
    arrow(u, tb, tb + 0.3, bow([625, 520], [835, 610], -0.3), { seed: 166, col: PAL.red, w: 7 });
    putK('s_2x', slap(tb + 0.2, 800, 228, 3), u, 167, { s: 0.8 });
    putK('tiket', slap(tg, 860, 925, 6), u, 168, { s: 0.5 });
  },
  // 17 · Dan kartunya penuh lebih cepat. [0.6 s hold]   time line: the stamped card reaches PENUH first; the screen holds in the pause
  (u, T, d) => {
    const tp = at(16, 'penuh'), tc = at(16, 'cepat');
    stage(u, d, sg({ z0: 1.0, z1: 1.06, ease: 'out' })); bg(SET.result);
    putK('garis_waktu', slide(0, 0.2, 540, 600, 0, 900, 0, 0, -0.5), u, 171);
    putK('kartu_a', slap(0.15, 168, 553, -4), u, 172, { s: 0.2 });
    putK('kartu_b', slap(0.25, 168, 693, 4), u, 173, { s: 0.2 });
    arrow(u, 0.3, 1.75, [[250, 553], [850, 553]], { seed: 174, col: PAL.ink, w: 12 });
    arrow(u, 0.3, tp + 0.15, [[250, 693], [640, 693]], { seed: 175, col: PAL.amber, w: 14, comp: 'source-over' });
    putK('s_penuh_b', slap(tp + 0.18, 700, 640, -4), u, 176, { s: 0.85 });
    putK('s_penuh', slap(1.8, 880, 502, 3), u, 177, { s: 0.85 });
    stampAt('st_cepat', u, tc, 650, 925, -6, 0.8);
  },
  // 18 · Bukan karena hadiahnya lebih besar.   the same voucher on both cards; "HADIAH LEBIH BESAR" is crossed out
  (u, T, d) => {
    const th = at(17, 'hadiahnya'), tb = at(17, 'besar');
    stage(u, d, sg({ z0: 1.0, z1: 1.05 })); bg(SET.why, u, true);
    putK('kartu_a', slide(0, 0.2, 280, 390, -5, -700, 0, 0, 0.5), u, 181, { s: 0.52 });
    putK('kartu_b', slide(0.06, 0.26, 800, 390, 5, 700, 0, 0, -0.5), u, 182, { s: 0.52 });
    putK('tiket', slide(0.12, 0.32, 280, 660, -4, -700, 0, 0, 0.5), u, 183, { s: 1.0 });
    putK('tiket', slide(0.18, 0.38, 800, 660, 4, 700, 0, 0, -0.5), u, 184, { s: 1.0 });
    arrow(u, 0.3, 0.45, [[280, 520], [280, 570]], { seed: 186, col: PAL.ink, w: 6 }); arrow(u, 0.35, 0.5, [[800, 520], [800, 570]], { seed: 187, col: PAL.ink, w: 6 });
    stampAt('m_eq', u, 0.45, 540, 660, 0, 1.2);
    putK('s_hadiah', slap(th, 540, 920, -2), u, 185, { s: 0.9 });
    stampAt('m_cross', u, tb, 540, 920, 0, 0.85);
  },
  // 19 · Kartu kosong terasa seperti pekerjaan yang belum dimulai.   the runner still crouched at the start; the 8-box track ahead
  (u, T, d) => {
    const tb = at(18, 'belum');
    stage(u, d, sg({ z0: 1.0, z1: 1.06 })); bg(SET.why, u, true);
    putK('lintasan_a', slide(0, 0.2, 540, 1005, 0, 900, 0, 0, -0.4), u, 191, { s: 0.95 });
    putK('pelari_start', slide(0.05, 0.25, 360, 600, 0, -800, 0, 0, 0.5), u, 192, { s: 0.92 });
    putK('kartu_a', slap(0.4, 860, 330, 6), u, 193, { s: 0.36 });
    putK('s_08', slap(0.55, 860, 450, -3), u, 194, { s: 0.8 });
    putK('s_belum', slap(tb, 780, 800, -3), u, 195, { s: 0.85 });
  },
  // 20 · Kartu bercap terasa sudah berjalan—   the same runner mid-stride; the first two marks of the 10-box track carry GRATIS caps
  (u, T, d) => {
    const tj = at(19, 'berjalan'), L = SP.lintasan_b.m, LS = 0.86, LX = 540, LY = 1005;
    stage(u, d, sg({ z0: 1.0, z1: 1.05 })); bg(SET.why, u, true);
    put('lintasan_b', LX, LY, 0, 0, 1, LS);
    [0, 1].forEach(i => stampAt('cap_gratis', u, 0.15 + i * 0.12, LX + L.marks[i] * LS, LY + L.lane * LS, [-6, 5][i], 0.55));
    putK('pelari_tengah', [[0, 380, 600, 0, 1.5, 1], [0.25, 430, 595, 0, 0.6, 1, 'out'], [d, 560, 590, 0, 0.6, 1, 'lin']], u, 201, { s: 0.8 });
    putK('kartu_b', slap(0.35, 210, 300, -6), u, 202, { s: 0.36 });
    putK('s_210', slap(0.5, 210, 420, 3), u, 203, { s: 0.8 });
    putK('s_jalan', slap(tj, 850, 320, 4), u, 204, { s: 0.85 });
  },
  // 21 · dan yang sudah dimulai, rasanya nanggung kalo berhenti.   the runner keeps going toward the GRATIS line; BERHENTI is crossed out
  (u, T, d) => {
    const tn = at(20, 'nanggung'), tb = at(20, 'berhenti'), L = SP.lintasan_b.m, LS = 0.86, LX = 540, LY = 1005;
    stage(u, d, sg({ z0: 1.02, z1: 1.06, shake: [[tn, 10]] })); bg(SET.why);
    put('lintasan_b', LX, LY, 0, 0, 1, LS);
    [0, 1].forEach(i => put('cap_gratis', LX + L.marks[i] * LS, LY + L.lane * LS, [-6, 5][i], 0, 1, 0.55));
    putK('pelari_tengah', [[0, 600, 590, 0, 0.6, 1], [d, 730, 588, 0, 0.6, 1, 'lin']], u, 211, { s: 0.8 });
    putK('tiket', slide(0.1, 0.3, LX + L.finish * LS, 860, 6, 600, 0, 0, -0.4), u, 212, { s: 0.45 });
    stampAt('st_nanggung', u, tn, 300, 455, -7, 0.62);
    putK('s_berhenti', slap(at(20, 'kalo'), 225, 650, -4), u, 213, { s: 0.8 });
    stampAt('m_cross', u, tb + 0.05, 225, 650, 0, 0.6);
  },
  // 22 · Lain kali, kalo kasir ngasih kartu yang sudah ada dua capnya,   the cashier hands over card B; the two caps are circled
  (u, T, d) => {
    const tk = at(21, 'kasir'), td = at(21, 'dua'), tc = at(21, 'capnya'), KX = 560, KY = 610, KS = 1.05;
    stage(u, d, sg({ z0: 1.0, z1: 1.07, cx: 560 })); bg(SET.close, u, true);
    putK('kedai_kopi', slide(0, 0.2, 240, 300, -5, -700, 0, 0, 0.4), u, 221, { s: 0.4, a: 0.9 });
    putK('kasir_b', [[0.05, KX + 120, KY + 40, 4, 1.6, 1], [0.35, KX, KY, 0, 0, 1, 'back', 0.6]], u, 222, { s: KS });
    const [x1, y1] = box('kasir_b', 0, KX, KY, 0, KS), [x2, y2] = box('kasir_b', 1, KX, KY, 0, KS);
    putK('s_kasir', slap(tk, 230, 990, -3), u, 223, { s: 0.85 });
    stampAt('m_circle', u, td, (x1 + x2) / 2, (y1 + y2) / 2 + 4, 0, 0.62);
    putK('s_210', slap(tc, 850, 995, 3), u, 224, { s: 0.85 });
  },
  // 23 · ingat: hadiahnya nggak makin dekat—cuma   card B close: the two GRATIS caps are crossed out, 8 boxes still to go
  (u, T, d) => {
    const th = at(22, 'hadiahnya'), tn = at(22, 'nggak'), tm = at(22, 'makin'), C0 = { x: 520, y: 610, r: -1, s: 1.05 };
    stage(u, d, sg({ z0: 1.02, z1: 1.07, shake: [[tn, 8]] })); bg(SET.close);
    put('kartu_b', C0.x, C0.y, C0.r, 0, 1, C0.s);
    stampAt('hl_b', u, th, C0.x, C0.y, C0.r, C0.s);
    [0, 1].forEach(i => { const [x, y] = box('kartu_b', i, C0.x, C0.y, C0.r, C0.s); stampAt('m_cross_s', u, tn + i * 0.12, x, y, 0, 0.95); });
    putK('s_sisa8', slap(tm, 600, 330, -3), u, 231, { s: 0.85 });
    putK('tiket', slap(tm + 0.3, 830, 960, 6), u, 232, { s: 0.6 });
    route(u, tm + 0.35, tm + 0.65, [[760, 790], [800, 880]], { seed: 233, col: PAL.ink });
  },
  // 24 · terasa lebih dekat.   back to frame 0: both hands with their cards; CUMA TERASA on card B (loop)
  (u, T, d) => {
    const tt = at(23, 'terasa');
    stage(u, d, sg({ z0: 1.0, z1: 1.03, shake: [[tt + 0.1, 9]] })); bg(SET.hook, u, true);
    hands(u, slide(0, 0.22, HA.x, HA.y, HA.r, -800, 0, 0, 0.5), slide(0.05, 0.27, HB.x, HB.y, HB.r, 800, 0, 0, -0.5));
    const [bx, by] = cardB();
    stampAt('st_terasa', u, tt + 0.1, bx + 10, by + 70, 6, 0.55);
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3,
      hot: /^(delapan|beda|kenal|kopi|motor|gratis|peneliti|mobil|kosong|sepuluh|sama|anehnya|dua|cepat|bukan|dimulai|berjalan|nanggung|dekat|terasa|cap)/i } });
}
export const renderAt = t => film.renderAt(t);
