// ARSIP #013 Biaya Layanan · ARSIP Kolase. 21 shots on the VO timing (vo_words.json; long lines split at word boundaries);
// each shot is a small paper table with its own camera. Caption band y 1210–1536 stays clear: text pieces live in y 150–1180.
// Hero = the phone of ai/hp_checkout.jpg; its blank screen gets a code-drawn checkout page (bake.py screens(): size + rotation
// measured on the cut-out, so screenOn() pastes it exactly on the glass). Rupiah = ILUSTRASI (Rp50.000 → Rp58.000).
// Data origin: DATA INDONESIA (green) on the YLKI shots 11.32–16.70; EKSPERIMEN AS (paper) from "Amerika" 20.78 to 36.48.
// Conceptual loop: the small grey "Biaya layanan" row sits un-marked on the Frame-0 screen; it is highlighted at "tadi" (43.64).
// Layouts (§M): panggung, close-up makro (S03, S07, S16 S18b…), kartu penuh (S05, S07b), split-screen (S11–S13), grafik (S14–S15).
import { W, H, SP, PAL, setCtx, getCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake, hash } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 3.66, 5.1, 6.4, 7.76, 11.32, 13.58, 16.7, 17.8, 20.26, 23.56, 26.32, 27.48, 30.56, 32.02, 34.7, 36.48,
  38.14, 39.48, 42.6, 44.98, 48.28];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow } = K;
let film = null;
const D2R = Math.PI / 180;
const size = n => [SP[n].img.width / SP[n].k, SP[n].img.height / SP[n].k];

const SET = {
  hook: [['f_green', 200, 330, -8], ['f_amber', 920, 1080, 0], ['f_cream', 540, 1570, -3]],
  shop: [['f_amber', 820, 320, 0], ['f_green_s', 150, 1050, 0], ['f_cream', 540, 1565, 2]],
  macro: [['f_cream', 540, 1570, -2]],
  doc: [['f_manila', 540, 760, 2], ['f_cream', 540, 1570, -2]],
  id: [['f_green', 760, 330, 6], ['f_amber_s', 140, 1040, 0], ['f_cream', 540, 1565, 2]],
  us: [['f_news', 540, 640, -2], ['f_red', 540, 1180, -3], ['f_cream', 540, 1570, 2]],
  split: [['f_green', -60, 700, 84], ['f_amber', 980, 720, 0], ['f_cream', 540, 1570, -2]],
  chart: [['f_cream', 540, 1180, -1], ['f_news', 540, 640, 0], ['f_red', 540, 160, -4]],
  hall: [['f_red', 540, 300, -5], ['f_amber_s', 960, 1080, 0], ['f_cream', 540, 1565, 2]],
  calm: [['f_green_s', 900, 300, 0], ['f_amber', 120, 1040, 0], ['f_cream', 540, 1565, -2]],
};
const R = M => M._rows;

// ---------- the phone: hp cut-out + a screen piece on its glass; over = [[part, localX, localY, alpha?, scale?], ...]
function screenOn(x, y, r, S, scr, over = [], a = 1) {
  const [dx, dy, , , rr] = SP.hp.m.screen, A = r * D2R;
  const cx = x + (dx * Math.cos(A) - dy * Math.sin(A)) * S, cy = y + (dx * Math.sin(A) + dy * Math.cos(A)) * S, ro = r + rr, B = ro * D2R;
  const L = (lx, ly) => [cx + (lx * Math.cos(B) - ly * Math.sin(B)) * S, cy + (lx * Math.sin(B) + ly * Math.cos(B)) * S];
  put(scr, cx, cy, ro, 0, 1, S, a);
  for (const [n, lx, ly, al = 1, sc = 1] of over) { if (!n) continue; const q = L(lx, ly); put(n, q[0], q[1], ro, 0, 1, S * sc, a * al); }
  return { L, ro, S };
}
const phone = (x, y, r, S, scr, over, a = 1) => { put('hp', x, y, r, 0, 1, S, a); return screenOn(x, y, r, S, scr, over, a); };
function phoneK(keys, u, id, S, scr, over, a = 1) { const p = putK('hp', keys, u, id, { s: S, a }); return p ? screenOn(p.x, p.y, p.r, p.s * S, scr, over, a) : null; }
// phone position (rotation r) that puts screen-local point `loc` at world point `tgt`
function aim(S, loc, tgt, r = 0) {
  const [dx, dy, , , rr] = SP.hp.m.screen, B = (r + rr) * D2R, A = r * D2R;
  const lx = loc[0] * Math.cos(B) - loc[1] * Math.sin(B), ly = loc[0] * Math.sin(B) + loc[1] * Math.cos(B);
  const ox = dx * Math.cos(A) - dy * Math.sin(A), oy = dx * Math.sin(A) + dy * Math.cos(A);
  return [tgt[0] - (ox + lx) * S, tgt[1] - (oy + ly) * S];
}
// checkout overlays: biaya row (alpha a1), total value by name
const ovB = (biaya = 1, tot = 'sx_t58') => [['sx_biaya', R(M).b_biaya[0], R(M).b_biaya[1], biaya], [tot, R(M).b_total[0], R(M).b_total[1]]];
// a bar grown from its base (clip), p in 0..1
function growBar(n, x, base, p, s = 1) {
  const [w, h] = size(n), c = getCtx(); if (p <= 0) return;
  c.save(); c.beginPath(); c.rect(x - w * s / 2 - 30, base - h * s * p, w * s + 60, h * s * p + 40); c.clip();
  put(n, x, base - h * s / 2 + 6, 0, 0, 1, s); c.restore();
}
const lerp = (a, b, t) => a + (b - a) * t;

const SHOTS = [
  // 01 · Layar checkout aplikasi ini ngasih dua harga buat barang yang sama.   FRAME 0: phone + checkout page (Rp50.000 top, Rp58.000
  // total); the total is circled at 0.10, DUA HARGA hits at 0.20; the top price is circled on "dua"; the small biaya row is NOT marked (loop)
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.06, cx: 540, cy: 960, shake: [[0.0, 8], [0.2, 12]] }); bg(SET.hook);
    const ph = phoneK([[0, 450, 894, -2, 1.2, 1, null, 0, 1.04], [0.1, 450, 900, -1, 0, 1, 'in', 1.2, 1.0]], u, 1, 1.3, 'scr_bayar', ovB());
    const tt = ph.L(R(M).b_total[0], R(M).b_total[1]), tp = ph.L(R(M).b_price[0], R(M).b_price[1]);
    stampAt('m_circle', u, 0.1, tt[0], tt[1], -3, 0.8);
    stampAt('m_circle', u, at(0, 'dua'), tp[0], tp[1], 2, 0.8);
    stampAt('st_duaharga', u, 0.2, 300, 1150, -9, 0.55);
    putK('s_hook', slap(0.45, 540, 200, -2), u, 2, { s: 0.62 });
    putK('s_ilustrasi', slap(0.6, 930, 330, 6), u, 3, { s: 0.85 });
  },
  // 02 · Pas masukin ke keranjang,   the hand drops a box into the basket; Rp50.000 tag on the box; the cart screen on a small phone
  (u, T, d) => {
    const tk = at(1, 'keranjang');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 760 }); bg(SET.shop, u, true);
    putK('keranjang', slide(0, 0.2, 620, 700, 0, 900, 0, 0, -0.4), u, 20, { s: 1.0 });
    putK('tag_50', slap(tk, 830, 470, 10), u, 21, { s: 0.75 });
    phoneK(slide(0.05, 0.25, 230, 540, -6, -700, 0, 0, 0.5), u, 22, 0.5, 'scr_keranjang', []);
    putK('s_ilustrasi', slap(0.4, 220, 1030, -4), u, 23, { s: 0.8 });
  },
  // 03 · harganya kelihatan murah.   CLOSE-UP MAKRO: the cart screen fills the frame; amber marker on Rp50.000; green tick on "murah"
  (u, T, d) => {
    const S = 2.05, kp = R(M).k_price, p0 = aim(S, kp, [540, 600]);
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 900 }); bg(SET.macro);
    const ph = phoneK(slide(0, 0.18, p0[0], p0[1], 0, 0, 700, 0, 0.4), u, 30, S, 'scr_keranjang', []);
    const q = ph.L(kp[0], kp[1]);
    if (u >= 0.1) { const pr = EASE.out(seg(stepT(u), 0.1, 0.4)); const c = getCtx(); c.save(); c.beginPath(); c.rect(q[0] - 340, q[1] - 80, 680 * pr, 160); c.clip(); put('hl_price', q[0], q[1], ph.ro, 0, 1, S); c.restore(); }
    stampAt('m_tick_s', u, at(2, 'murah'), q[0] + 300, q[1] - 110, 0, 1.1);
    putK('tag_50', slap(0.3, 860, 1030, 8), u, 31, { s: 0.7 });
  },
  // 04 · Eh, pas mau bayar,   the buyer reacts; "!" on "Eh"; the checkout page (no total yet) on a phone; "halaman bayar"
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 760, shake: [[0.05, 8]] }); bg(SET.hook, u, true);
    putK('kaget', slide(0, 0.18, 360, 690, 0, -800, 0, 0, 0.5), u, 40, { s: 1.08 });
    ransomRow('rx', u, 0.05, 640, 300, 0.1, 0.8);
    phoneK(slide(0.08, 0.28, 820, 560, 5, 800, 0, 0, -0.5), u, 41, 0.6, 'scr_bayar', [['sx_t50', R(M).b_total[0], R(M).b_total[1], 0.0]]);
    putK('s_halbayar', slap(at(3, 'bayar'), 800, 1000, -3), u, 42, { s: 0.8 });
  },
  // 05 · muncul baris kecil bernama biaya layanan yang naikin total belanja.   KARTU PENUH (layar HP): the biaya row pops in, amber on
  // "biaya", the total rolls 50.000 → 58.000 on "naikin"; +Rp8.000 tag; red arrow row → total; NAIK
  (u, T, d) => {
    const S = 1.36, tb = at(4, 'biaya'), tn = at(4, 'naikin'), p0 = aim(S, [0, 0], [530, 650]);
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900, shake: [[tn + 0.3, 10]] }); bg(SET.doc, u, true);
    const k = seg(stepT(u), tn, tn + 0.36), tot = k <= 0 ? 'sx_t50' : k < 0.34 ? 'sx_t52' : k < 0.67 ? 'sx_t55' : 'sx_t58';
    const vis = u >= at(4, 'baris') ? 1 : 0;
    const ph = phoneK(slide(0, 0.18, p0[0], p0[1], 0, 0, 800, 0, 0.4), u, 50, S, 'scr_bayar', [['sx_biaya', R(M).b_biaya[0], R(M).b_biaya[1], vis], [tot, R(M).b_total[0], R(M).b_total[1]]]);
    const qb = ph.L(0, R(M).b_biaya[1] + 3), qt = ph.L(R(M).b_total[0], R(M).b_total[1]);
    if (u >= tb) put('hl_amber', qb[0], qb[1], ph.ro, 0, 1, 1.42);
    arrow(u, tn - 0.05, tn + 0.3, bow([qb[0] + 230, qb[1] + 10], [qt[0] + 150, qt[1] - 20], -0.4), { seed: 51, head: true, w: 7 });
    putK('tag_8', slap(at(4, 'layanan'), 900, 520, 8), u, 52, { s: 0.6 });
    stampAt('st_naik', u, at(4, 'total') + 0.05, 230, 1080, -8, 0.6);
  },
  // 06 · Tahun ini, lembaga konsumen sampai ngingetin   the consumer body's spokesman at a press table; DATA INDONESIA · 2026; 2026
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 860 }); bg(SET.id, u, true);
    putK('jubir', slide(0, 0.2, 560, 610, 0, 900, 0, 0, -0.4), u, 60, { s: 1.0 });
    putK('lbl_id', slap(0.05, 330, 1060, -2), u, 61, { s: 0.62 });
    ransomRow('ry26', u, at(5, 'Tahun'), 230, 250, 0.08, 0.7);
    putK('s_lembaga', slap(at(5, 'lembaga'), 800, 1080, 3), u, 62, { s: 0.7 });
  },
  // 07 · soal celah biaya aplikasi yang dibebanin ke pembeli.   KARTU PENUH: the press clipping, camera runs down to the quote;
  // amber on "mencari celah" and on "menanggung bebannya"; DATA INDONESIA stays; the +Rp8.000 tag in the corner
  (u, T, d) => {
    const KX = 540, KY = 660, KS = 1.18, kq = SP.kliping.m;
    stage(u, d, { z0: 1.0, z1: 1.08, cy: 600, cy1: 720 }); bg(SET.doc, u, true);
    putK('kliping', slide(0, 0.2, KX, KY, -1, 0, 900, 0, 0.5), u, 70, { s: KS });
    if (u >= at(6, 'celah')) put('hl_amber_l', KX + (kq.q_celah[0] + 20) * KS, KY + kq.q_celah[1] * KS, -1, 0, 1, 1.0);
    if (u >= at(6, 'dibebanin')) put('hl_amber_l', KX + (kq.q_beban[0] - 30) * KS, KY + kq.q_beban[1] * KS, -1, 0, 1, 0.95);
    put('lbl_id', 740, 205, 2, 0, 1, 0.55);
    putK('tag_8', slap(at(6, 'pembeli'), 900, 960, -6), u, 71, { s: 0.5 });
  },
  // 08 · Masalahnya,   CLOSE-UP MAKRO: the magnifier slides over the small biaya row (magnified inside the lens); "?"
  (u, T, d) => {
    const S = 1.6, bq = R(M).b_biaya, p0 = aim(S, [bq[0], bq[1]], [540, 640]);
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 680 }); bg(SET.macro);
    const ph = phone(p0[0], p0[1], 0, S, 'scr_bayar', ovB());
    const lens = SP.kaca.m.lens, KS = 1.5, kp = slide(0, 0.22, 410 - lens[0] * KS, 640 - lens[1] * KS, -4, 600, 400, 0, 0.6);
    const pk = putK('kaca', kp, u, 80, { s: KS });
    if (pk) {   // magnified row inside the glass
      const lx = pk.x + lens[0] * KS, ly = pk.y + lens[1] * KS, c = getCtx(), q = ph.L(bq[0], bq[1]);
      c.save(); c.beginPath(); c.ellipse(lx, ly, lens[2] * KS / 2 - 8, lens[3] * KS / 2 - 6, (-4 + lens[4]) * D2R, 0, Math.PI * 2); c.clip();
      c.fillStyle = '#FAF8F2'; c.fillRect(lx - 300, ly - 160, 600, 320);
      put('sx_biaya', q[0] + (q[0] - lx) * 0.25, q[1] + (q[1] - ly) * 0.25, ph.ro, 0, 1, S * 1.25); c.restore();
    }
    ransomRow('rq', u, 0.3, 900, 280, 0.1, 0.8);
  },
  // 09 · efeknya bukan cuma di biaya tambahan itu.   the +Rp8.000 tag shrinks aside; a bigger thing comes in: the full basket; "?"
  (u, T, d) => {
    const tt = at(8, 'tambahan'), sh = EASE.io(seg(stepT(u), tt, tt + 0.4));
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 760 }); bg(SET.shop, u, true);
    put('tag_8', lerp(320, 250, sh), lerp(420, 330, sh), -6, 0, 1, lerp(0.95, 0.55, sh));
    putK('keranjang', slide(at(8, 'efeknya') - 0.15, at(8, 'efeknya') + 0.1, 640, 760, 2, 800, 0, 0, -0.4), u, 90, { s: 1.0 });
    route(u, 0.4, 0.9, bow([380, 470], [560, 600], 0.3), { seed: 91, col: PAL.red });
    ransomRow('rq', u, at(8, 'bukan'), 870, 330, 0.1, 0.8);
    phoneK(slide(0.0, 0.2, 200, 980, -8, -700, 0, 0, 0.4), u, 92, 0.42, 'scr_bayar', ovB());
  },
  // 10 · Peneliti di Amerika menguji jutaan pembeli tiket online.   the researcher at his laptop; EKSPERIMEN AS · 2015 lands on
  // "Amerika" (origin label switches here); the crowd of phone buyers; a TIKET ONLINE stub
  (u, T, d) => {
    const ta = at(9, 'Amerika'), tj = at(9, 'jutaan');
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 760 }); bg(SET.us, u, true);
    putK('peneliti', slide(0, 0.2, 360, 450, -2, -800, 0, 0, 0.5), u, 100, { s: 0.78 });
    putK('lbl_as', slap(ta, 790, 215, 3), u, 101, { s: 0.6 });
    putK('kerumunan', slide(tj - 0.2, tj, 540, 880, 0, 0, 700, 0, 0.3), u, 102, { s: 0.86 });
    putK('tiket', slap(at(9, 'tiket'), 840, 470, 8), u, 103, { s: 0.75 });
  },
  // 11 · Separuh dikasih lihat harga plus biaya sejak awal.   SPLIT-SCREEN: left half (green) = crowd half + phone showing price AND
  // fee from the start; 50%; the right half waits, dim
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.03, cy: 760 }); bg(SET.split, u, true);
    route(u, 0, 0.3, [[540, 170], [536, 640], [544, 1180]], { seed: 111, col: PAL.ink, w: 4 });
    putK('krm_kiri', slide(0, 0.2, 270, 880, 0, -600, 0, 0, 0.4), u, 110, { s: 0.98 });
    phoneK(slide(0.1, 0.3, 300, 470, -4, -600, 0, 0, 0.4), u, 111, 0.55, 'scr_depan', []);
    put('krm_kanan', 810, 880, 0, 0, 1, 0.98, 0.25);
    ransomRow('r50', u, at(10, 'Separuh'), 270, 1080, 0.08, 0.55);
    putK('s_awal', slap(at(10, 'sejak'), 270, 750, -3), u, 112, { s: 0.7 });
    put('lbl_as', 800, 215, 3, 0, 1, 0.55);
  },
  // 12 · Separuh lagi   the right half (amber) comes in: crowd half + phone with the price only; 50%
  (u, T, d) => {
    stage(u, d, { z0: 1.03, z1: 1.04, cy: 760 }); bg(SET.split);
    put('krm_kiri', 270, 880, 0, 0, 1, 0.98); phone(300, 470, -4, 0.55, 'scr_depan', []);
    put('s_awal', 270, 750, -3, 0, 1, 0.7); ransomRow('r50', u, -9, 270, 1080, 0.08, 0.55);
    route(u, -1, 0, [[540, 170], [536, 640], [544, 1180]], { seed: 111, col: PAL.ink, w: 4 });
    putK('krm_kanan', slide(0, 0.18, 810, 880, 0, 600, 0, 0, -0.4), u, 120, { s: 0.98 });
    phoneK(slide(0.08, 0.26, 800, 470, 4, 600, 0, 0, -0.4), u, 121, 0.55, 'scr_akhir', []);
    ransomRow('r50b', u, at(11, 'lagi'), 810, 1080, 0.08, 0.55);
  },
  // 13 · baru dikasih lihat biayanya pas mau bayar.   right phone: the fee row pops in only on "bayar"; "biaya pas mau bayar"; reveal pause
  (u, T, d) => {
    const tb = at(12, 'bayar');
    stage(u, d, { z0: 1.04, z1: 1.07, cx: 540, cx1: 620, cy: 760, cy1: 720 }); bg(SET.split);
    put('krm_kiri', 270, 880, 0, 0, 1, 0.98, 0.6); phone(300, 470, -4, 0.55, 'scr_depan', [], 0.7);
    route(u, -1, 0, [[540, 170], [536, 640], [544, 1180]], { seed: 111, col: PAL.ink, w: 4 });
    put('krm_kanan', 810, 880, 0, 0, 1, 0.98); ransomRow('r50b', u, -9, 810, 1080, 0.08, 0.55);
    const ph = phone(800, 470, 4, 0.55, 'scr_akhir', [['sx_biaya_us', 0, R(M).us_biaya[1], u >= tb ? 1 : 0]]);
    if (u >= tb) { const q = ph.L(0, R(M).us_biaya[1]); stampAt('m_circle', u, tb + 0.05, q[0], q[1], 0, 0.62); }
    putK('s_akhir', slap(at(12, 'biayanya'), 790, 760, 3), u, 130, { s: 0.68 });
  },
  // 14 · Hasilnya jomplang.   GRAFIK LAYAR LEBAR: the two bars grow (fee up front vs fee at the end); JOMPLANG
  (u, T, d) => {
    const GX = 540, GY = 640, g = SP.grafik.m, base = GY + g.base[1];
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 700, shake: [[at(13, 'jomplang'), 12]] }); bg(SET.chart, u, true);
    putK('grafik', slide(0, 0.18, GX, GY, 0, -900, 0, 0, 0.4), u, 140);
    growBar('bar_depan', GX + g.xL, base, EASE.out(seg(stepT(u), 0.15, 0.55)));
    growBar('bar_akhir', GX + g.xR, base, EASE.out(seg(stepT(u), 0.3, 0.85)));
    stampAt('st_jomplang', u, at(13, 'jomplang'), 560, 420, -6, 0.62);
    put('lbl_as', 840, 215, 3, 0, 1, 0.55);
  },
  // 15 · Kelompok kedua justru belanja seperlima lebih banyak   chart: dashed level of the left bar carried across; the extra fifth
  // bracketed on the right bar; + SEPERLIMA; KELOMPOK 1 / 2 under the bars
  (u, T, d) => {
    const GX = 540, GY = 640, g = SP.grafik.m, base = GY + g.base[1], hL = size('bar_depan')[1], hR = size('bar_akhir')[1];
    const ts = at(14, 'seperlima');
    stage(u, d, { z0: 1.04, z1: 1.08, cx: 560, cx1: 640, cy: 680 }); bg(SET.chart);
    put('grafik', GX, GY, 0); growBar('bar_depan', GX + g.xL, base, 1); growBar('bar_akhir', GX + g.xR, base, 1);
    putK('s_kel1', slap(0.05, GX + g.xL, base - hL - 40, -2), u, 150, { s: 0.6 });
    putK('s_kel2', slap(at(14, 'kedua'), GX + g.xR, base - hR - 40, 2), u, 151, { s: 0.6 });
    route(u, ts - 0.5, ts - 0.1, [[GX + g.xL + 120, base - hL + 10], [GX + g.xR + 150, base - hL + 10]], { seed: 152, col: PAL.ink, w: 4 });
    arrow(u, ts - 0.1, ts + 0.2, [[GX + g.xR + 160, base - hL + 6], [GX + g.xR + 160, base - hR + 14]], { seed: 153, head: true, w: 8 });
    putK('s_seperlima', slap(ts, GX + g.xR - 10, base - hR - 120, -3), u, 154, { s: 0.7 });
    put('lbl_as', 840, 215, 3, 0, 1, 0.55);
  },
  // 16 · dan beli tiket lebih mahal.   the hall: the front rows (near the stage) wash amber on "tiket"; a KURSI DEPAN stub; "lebih mahal"
  (u, T, d) => {
    const tt = at(15, 'tiket');
    stage(u, d, { z0: 1.0, z1: 1.07, cx: 540, cx1: 460, cy: 860 }); bg(SET.hall, u, true);
    putK(u >= tt ? 'stadion_hl' : 'stadion', slide(0, 0.18, 540, 640, 0, 900, 0, 0, -0.3), u, 160, { s: 1.0 });
    putK('tiket_depan', slap(tt + 0.1, 250, 960, -6), u, 161, { s: 0.75 });
    putK('s_mahal', slap(at(15, 'mahal'), 800, 1010, 3), u, 162, { s: 0.7 });
    put('lbl_as', 800, 215, 3, 0, 1, 0.55);
  },
  // 17 · Pas lihat harga murah di awal,   back to the cart: phone with Rp50.000 marked; tag; "harga awal" (the US label is gone)
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 740 }); bg(SET.calm, u, true);
    const ph = phoneK(slide(0, 0.2, 430, 760, -3, -800, 0, 0, 0.5), u, 170, 0.98, 'scr_keranjang', []);
    const q = ph.L(R(M).k_price[0], R(M).k_price[1]);
    if (u >= at(16, 'harga')) put('hl_price', q[0], q[1], ph.ro, 0, 1, ph.S);
    putK('tag_50', slap(at(16, 'murah'), 840, 500, 10), u, 171, { s: 0.75 });
    putK('s_murah', slap(at(16, 'awal'), 830, 940, 3), u, 172, { s: 0.75 });
  },
  // 18 · otak kita udah terlanjur ngerasa   the buyer smiles, thumbs up; the Rp50.000 tag gets a green tick
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 740 }); bg(SET.calm);
    putK('senyum', slide(0, 0.18, 400, 700, 0, -800, 0, 0, 0.5), u, 180, { s: 1.12 });
    put('tag_50', 840, 500, 10, 0, 1, 0.75);
    stampAt('m_tick_s', u, at(17, 'terlanjur'), 900, 650, 0, 1.0);
    phone(860, 980, 6, 0.4, 'scr_keranjang', []);
  },
  // 19 · cocok—biaya di akhir cuma dianggap selisih kecil.   CLOSE-UP MAKRO on the tags: big Rp50.000 + COCOK; the +Rp8.000 tag
  // lands then shrinks to a crumb on "dianggap"; "selisih kecil"
  (u, T, d) => {
    const ta = at(18, 'akhir'), tg = at(18, 'dianggap'), k = EASE.io(seg(stepT(u), tg, tg + 0.5));
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 860 }); bg(SET.calm, u, true);
    phone(220, 470, -8, 0.5, 'scr_keranjang', []);
    putK('tag_50', slide(0, 0.18, 590, 520, -4, 0, -800, 0, 0.4), u, 190, { s: 1.8 });
    stampAt('st_cocok', u, 0.12, 600, 760, -6, 0.8);
    if (u >= ta - 0.17) { if (u < tg) putK('tag_8', slap(ta, 780, 990, 8), u, 191, { s: 0.9 }); else put('tag_8', lerp(780, 900, k), lerp(990, 1000, k), 8 + 14 * k, 0, 1, lerp(0.9, 0.32, k)); }
    putK('s_selisih', slap(at(18, 'selisih'), 400, 990, -3), u, 192, { s: 0.72 });
  },
  // 20 · Dua total di layar checkout tadi bekerja persis   LOOP: the Frame-0 phone again; both totals circled on "Dua"/"total";
  // on "tadi" the small grey biaya row (unmarked at 0 s) is marked amber
  (u, T, d) => {
    const tt0 = at(19, 'total'), td = at(19, 'tadi');
    stage(u, d, { z0: 1.0, z1: 1.1, cx: 540, cx1: 580, cy: 960, cy1: 840 }); bg(SET.hook, u, true);
    const ph = phone(450, 900, -1, 1.3, 'scr_bayar', ovB());
    const tt = ph.L(R(M).b_total[0], R(M).b_total[1]), tp = ph.L(R(M).b_price[0], R(M).b_price[1]), qb = ph.L(0, R(M).b_biaya[1] + 3);
    stampAt('m_circle', u, 0.05, tp[0], tp[1], 2, 0.8);
    stampAt('m_circle', u, tt0, tt[0], tt[1], -3, 0.8);
    if (u >= td) { const pr = EASE.out(seg(stepT(u), td, td + 0.3)), c = getCtx(); c.save(); c.beginPath(); c.rect(qb[0] - 200, qb[1] - 50, 400 * pr, 100); c.clip(); put('hl_amber', qb[0], qb[1], ph.ro, 0, 1, 1.1); c.restore(); }
  },
  // 21 · ngunci pilihanmu sebelum harga aslinya keluar.   CLOSE-UP MAKRO: the padlock drops on the BAYAR button ("ngunci");
  // TERKUNCI; on "aslinya" the total turns red and is circled; "harga asli"
  (u, T, d) => {
    const S = 1.45, bb = R(M).b_btn, tl = 0.57, ta = at(20, 'aslinya'), p0 = aim(S, [0, 120], [540, 720]);
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900, shake: [[tl, 12]] }); bg(SET.macro);
    const ph = phone(p0[0], p0[1], 0, S, 'scr_bayar', ovB(1, u >= ta ? 'sx_t58r' : 'sx_t58'));
    const qb = ph.L(bb[0], bb[1]), qt = ph.L(R(M).b_total[0], R(M).b_total[1]), qg = ph.L(0, R(M).b_biaya[1] + 3);
    put('hl_amber', qg[0], qg[1], ph.ro, 0, 1, 1.42);
    putK('gembok', drop(tl - 0.22, tl, qb[0] + 170, qb[1] - 60, 6, 700, 1.0), u, 210, { s: 0.7 });
    stampAt('st_terkunci', u, at(20, 'pilihanmu'), 440, 1075, -6, 0.6);
    stampAt('m_circle', u, ta, qt[0], qt[1], -3, 1.0);
    putK('s_asli', slap(ta + 0.1, qt[0] + 60, qt[1] - 120, -4), u, 211, { s: 0.7 });
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(checkout|dua|harga|keranjang|murah|bayar|biaya|layanan|total|konsumen|celah|pembeli|amerika|jutaan|separuh|awal|jomplang|seperlima|mahal|cocok|kecil|ngunci|aslinya)/i } });
}
export const renderAt = t => film.renderAt(t);
