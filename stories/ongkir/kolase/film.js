// ARSIP #014 Voucher Ongkir Rp0 · ARSIP Kolase (Mode Ringkas). 17 shots on the VO timing (vo_words.json); each shot is a small
// paper table with its own camera. Caption band y 1210–1536 stays clear: every text piece lives in y 150–1180 on screen.
// Hero = the AI phone with a generic cart printed on its screen (bake.py phone()) + the red ONGKIR Rp0 sticker; REM LEPAS at 0.20.
// Loop: the cart icon in the screen header is a tiny fitting-room curtain (frame 0, never pointed at) → shot 17 zooms into it
// and the cart becomes the fitting room ("ruang coba gratis"). Origin labels: DATA INDONESIA (checkout, shots 3–5) →
// EKSPERIMEN EROPA · 2014 from "Eropa" (shots 6–13: Shehu, Papies & Neslin 2020, field experiment). Layouts rotate:
// classic table · close-up makro (3, 13, 15, 17a) · kartu dokumen penuh (7) · split-screen (8–9) · grafik layar lebar (10–12).
import { W, H, SP, PAL, setCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake, hash } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 1.68, 3.72, 6.74, 8.94, 11.44, 12.92, 16.5, 18.08, 19.94, 21.08, 24.12, 25.68, 26.94, 29.36, 31.72,
  33.66, 36.18];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

const SET = {
  hook: [['f_red', 540, 250, -4], ['f_amber_s', 940, 1000, 0], ['f_cream', 540, 1570, -3]],
  brake: [['f_green', 760, 420, 6], ['f_amber_s', 140, 1040, 0], ['f_cream', 540, 1565, 2]],
  shop: [['f_amber', 260, 420, 0], ['f_green_s', 960, 1040, 0], ['f_cream', 540, 1565, -2]],
  warehouse: [['f_news', 540, 640, -2], ['f_red', 540, 1180, 3], ['f_cream', 540, 1570, 2]],
  card: [['f_green', 540, 330, -3], ['f_cream', 540, 1570, -2]],
  split: [['f_cream', 540, 1570, -2]],
  chart: [['f_manila', 540, 700, 1], ['f_cream', 540, 1570, 2]],
  macro: [['f_amber', 540, 640, 0], ['f_cream', 540, 1565, -2]],
  room: [['f_green', 540, 520, -4], ['f_amber_s', 960, 1060, 0], ['f_cream', 540, 1565, 2]],
};
const camK = (u, keys, sh = []) => { let o = [0, 0]; for (const [t0, a] of sh) { const s = shake(u, t0, a); o = [o[0] + s[0], o[1] + s[1]]; } applyCam(cam(keys, u), o); };
const F = n => SP.hp_cart.m.feat[n];
const hp = (x, y, s = 1) => n => [x + F(n)[0] * s, y + F(n)[1] * s];      // world position of a phone feature
// the handbrake released (lever tips down) or engaged (up): rotation keys around its own centre
const brake = (u, x, y, s, t0, from, to, id, pre = null) => putK('rem_tangan', [...(pre || [[-99, x, y, from, 0, 1]]), [t0, x, y, from, 0, 1, 'hold'], [t0 + 0.25, x, y, to, 0, 1, 'back', 0.6]], u, id, { s });

const SHOTS = [
  // 01 · Voucher ongkir nol rupiah ini   frame 0: phone + cart on the table (moving), ONGKIR Rp0 sticker slapped at 0.00,
  //      handbrake in the corner, REM LEPAS at 0.20; loop detail = curtain icon in the cart header (not highlighted)
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.06, cy: 900, shake: [[0.0, 8], [0.2, 12]] }); bg(SET.hook);
    putK('hp_cart', [[0, 520, 650, -3, 1.2, 1, null, 0, 1.03], [0.1, 520, 640, -2, 0, 1, 'in', 1.0, 1.0]], u, 1);
    putK('stk_rp0', [[0, 330, 860, -12, 1.4, 1, null, 0, 0.95], [0.08, 330, 870, -10, 0, 1, 'in', 1.0, 0.8]], u, 2);
    brake(u, 870, 930, 0.46, 0.15, -2, 8, 3);
    stampAt('st_remlepas', u, 0.2, 800, 1060, -6, 0.6);
  },
  // 02 · matiin rem belanja di otakmu.   the handbrake takes the stage and drops (released) on "matiin"; phone + sticker step back
  (u, T, d) => {
    const tm = at(1, 'matiin'), tr = at(1, 'rem');
    stage(u, d, { z0: 1.0, z1: 1.05, cx: 580, cy: 880, shake: [[tr, 10]] }); bg(SET.brake);
    putK('hp_cart', [[0, 520, 650, -2, 0, 1, null, 0, 1.0], [0.22, 250, 470, -6, 0, 1, 'back', 0.6, 0.5]], u, 20);
    putK('stk_rp0', [[0, 330, 870, -10, 0, 1, null, 0, 0.8], [0.22, 200, 640, -12, 0, 1, 'back', 0.6, 0.5]], u, 21);
    brake(u, 640, 700, 1.0, tr, -4, 9, 22, slide(0, 0.22, 640, 700, -4, 700, 0, 0, -0.4));
    arrow(u, tr + 0.05, tr + 0.4, bow([860, 430], [900, 760], -0.2), { seed: 24, head: true, w: 9 });
    stampAt('st_remlepas', u, tr, 620, 1060, -5, 0.72);
  },
  // 03 · Pas checkout, potongan ongkir kerasa kayak untung bersih.   close-up makro on the ongkir row (Rp15.000 struck → Rp0);
  //      HEMAT tag, UNTUNG BERSIH slip, DATA INDONESIA label
  (u, T, d) => {
    const HX = 540, HY = 760, P = hp(HX, HY), tp = at(2, 'potongan'), tu = at(2, 'untung'), r = P('ongkir');
    stage(u, d, { z0: 1.6, z1: 1.85, cx: r[0], cy: r[1] + 40 }); bg(SET.macro, u, true);
    put('hp_cart', HX, HY, 0);
    stampAt('m_circle', u, tp + 0.1, P('rp0')[0] - 10, P('rp0')[1], 0, 0.36);
    putK('lbl_id', slap(0.1, r[0] - 150, r[1] - 290, -3), u, 30, { s: 0.7 });
    putK('tag_hemat', slap(at(2, 'ongkir') + 0.05, r[0] + 160, r[1] - 175, 8), u, 31, { s: 0.52 });
    putK('s_untung', slap(tu, r[0] - 20, r[1] + 120, -3), u, 32, { s: 0.6 });
  },
  // 04 · Paling cuma bikin orang lebih sering belanja.   the courier rides in; parcels pile up; +1 PESANAN slips one by one
  (u, T, d) => {
    const ts = at(3, 'sering');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 880 }); bg(SET.shop, u, true);
    putK('kurir_motor', slide(0, 0.22, 580, 540, 0, 900, 0, 0, -0.4), u, 40, { s: 1.05 });
    putK('paket_tumpuk', drop(ts - 0.2, ts, 770, 930, 3, 700, 0.8), u, 41, { s: 0.85 });
    [['lebih', 830], ['sering', 930], ['belanja', 1030]].forEach(([w, y], i) => putK('s_pesan', slap(at(3, w), 270 + i * 22, y, [-4, 3, -2][i]), u, 42 + i, { s: 1.0 }));
    putK('lbl_id', slap(0.1, 230, 210, -2), u, 46, { s: 0.7 });
  },
  // 05 · Masalahnya, efek aslinya beda.   the case file opens over the "profit" slip; UNTUNG BERSIH gets crossed; BEDA stamped
  (u, T, d) => {
    const ta = at(4, 'aslinya'), tb = at(4, 'beda');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 880, shake: [[tb, 12]] }); bg('file', u, true);
    putK('paket_tumpuk', slide(0, 0.2, 760, 860, 3, 800, 0, 0, -0.4), u, 50, { s: 0.85 });
    putK('tag_hemat', slide(0.05, 0.25, 320, 860, -8, -800, 0, 0, 0.5), u, 51, { s: 0.85 });
    putK('s_untung', slap(0.3, 470, 620, -3), u, 52, { s: 0.85 });
    stampAt('m_cross', u, ta, 470, 620, 0, 0.75);
    stampAt('st_beda', u, tb, 560, 960, -7, 0.72);
    putK('lbl_id', slap(0.1, 820, 240, 3), u, 53, { s: 0.7 });
    fileOverlay(u, 0.04, 0.95);
  },
  // 06 · Toko online besar di Eropa pernah   the European warehouse; EKSPERIMEN EROPA · 2014 slaps on "Eropa"
  (u, T, d) => {
    const te = at(5, 'Eropa');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 860 }); bg(SET.warehouse, u, true);
    putK('gudang', slide(0, 0.2, 540, 560, -1, -900, 0, 0, 0.5), u, 60, { s: 1.0 });
    putK('s_toko', slap(at(5, 'Toko'), 330, 290, -3), u, 61, { s: 0.8 });
    putK('lbl_eu', slap(te, 560, 910, 2), u, 62, { s: 0.95 });
    ransomRow('ry14', u, at(5, 'pernah'), 760, 1050, 0.06, 0.62);
    putK('paket_tumpuk', slap(0.15, 900, 330, 6), u, 63, { s: 0.36 });
  },
  // 07 · nguji kode gratis ongkir ke tujuh ratus enam puluh ribu pelanggannya.   kartu dokumen penuh: the experiment card;
  //      the AI crowd fills its window; camera runs down to 760.395 PELANGGAN DIUJI on "tujuh"
  (u, T, d) => {
    const tt = at(6, 'tujuh');
    camK(u, [[0, 540, 700, 1.1], [tt, 540, 720, 1.06, 'io'], [tt + 0.9, 540, 830, 1.1, 'io'], [d, 540, 840, 1.12]]); bg(SET.card, u, true);
    putK('kartu_uji', slide(0, 0.2, 540, 650, -1, 0, 900, 0, 0.5), u, 70, { s: 1.0 });
    putK('kerumunan', slide(0.1, 0.3, 540, 590, 0, 0, 900, 0, 0.5), u, 71, { s: 0.98 });
    putK('lbl_eu', slap(0.2, 700, 190, 3), u, 72, { s: 0.85 });
    putK('s_kode', slap(at(6, 'kode'), 790, 440, 4), u, 73, { s: 0.78 });
    arrow(u, at(6, 'ribu'), at(6, 'ribu') + 0.35, [[300, 960], [540, 966], [780, 958]], { seed: 74, head: false, w: 9 });
  },
  // 08 · Separuh dapat gratis ongkir,   split-screen: the crowd card torn in two; left (amber) = GRATIS ONGKIR · 380.551 orang
  (u, T, d) => {
    const tg = at(7, 'gratis');
    stage(u, d, { z0: 1.0, z1: 1.02, cy: 900 }); bg(SET.split);
    putK('pan_l', slide(0, 0.18, 272, 660, 0, -700, 0, 0, 0.4), u, 80);
    putK('pan_r', slide(0, 0.18, 812, 660, 0, 700, 0, 0, -0.4), u, 81);
    putK('kerumunan_l', [[0, 520, 590, 0, 0, 1, null, 0, 1], [0.25, 272, 560, -2, 0, 1, 'back', 0.6, 1]], u, 82);
    put('kerumunan_r', 812, 560, 2, 0, 1, 1, 0.3);
    route(u, 0.1, 0.4, [[541, 200], [545, 640], [538, 1130]], { seed: 83, col: PAL.ink, w: 5 });
    putK('tag_gratis', slap(tg, 282, 880, -3), u, 84, { s: 0.98 });
    putK('lbl_eu', slap(0.15, 540, 190, -1), u, 85, { s: 0.8 });
    putK('s_kode', slap(tg + 0.25, 272, 1060, 3), u, 86, { s: 0.7 });
  },
  // 09 · separuh lagi bayar normal.   right half (green) lights up: ONGKIR NORMAL · 379.844 orang; the ongkir tag drops in
  (u, T, d) => {
    const tb = at(8, 'bayar'), f = seg(u, 0.05, 0.3);
    stage(u, d, { z0: 1.02, z1: 1.04, cy: 900 }); bg(SET.split);
    put('pan_l', 272, 660); put('pan_r', 812, 660);
    put('kerumunan_l', 272, 560, -2, 0, 1, 1, 0.55); put('tag_gratis', 282, 880, -3, 0, 1, 0.98, 0.55); put('s_kode', 272, 1060, 3, 0, 1, 0.7, 0.55);
    put('kerumunan_r', 812, 560, 2, 0, 1, 1, 0.3 + 0.7 * f);
    route(u, -1, 0, [[541, 200], [545, 640], [538, 1130]], { seed: 83, col: PAL.ink, w: 5 });
    putK('tag_normal', slap(tb, 806, 880, 3), u, 90, { s: 0.98 });
    putK('tag_ongkir', drop(at(8, 'normal') - 0.2, at(8, 'normal'), 820, 1050, 6, 500, 0.8), u, 91, { s: 0.5 });
    put('lbl_eu', 540, 190, -1, 0, 1, 0.8);
  },
  // 10 · Anehnya,   (pause) grafik layar lebar: the result chart slides in; risky goods (shirt, cosmetics) vs safe goods (box, mirror)
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.03, cy: 880 }); bg(SET.chart, u, true);
    putK('grafik', slide(0, 0.2, 540, 650, -1, -1000, 0, 0, 0.5), u, 100, { s: 1.0 });
    putK('baju_gantung', slap(0.25, 210, 740, -2), u, 101, { s: 0.82 });
    putK('kosmetik', slap(0.35, 440, 860, 2), u, 102, { s: 0.78 });
    putK('barang_aman', slap(0.45, 860, 820, -1), u, 103, { s: 0.82 });
    putK('lbl_eu', slap(0.1, 300, 200, -2), u, 104, { s: 0.8 });
    ransomRow('rq', u, 0.6, 640, 640, 0.1, 0.62);
  },
  // 11 · yang naik cuma barang berisiko salah pilih tanpa dicoba,   red arrow UP + NAIK over the risky side; "=" + nyaris sama
  //      on the safe side; "tanpa dicoba" slip
  (u, T, d) => {
    const tn = at(10, 'naik'), tb = at(10, 'berisiko'), td = at(10, 'dicoba');
    stage(u, d, { z0: 1.0, z1: 1.05, cx: 540, cx1: 500, cy: 880 }); bg(SET.chart);
    put('grafik', 540, 650, -1); put('baju_gantung', 210, 740, -2, 0, 1, 0.82); put('kosmetik', 440, 860, 2, 0, 1, 0.78);
    put('barang_aman', 860, 820, -1, 0, 1, 0.82); put('lbl_eu', 300, 200, -2, 0, 1, 0.8);
    arrow(u, tn, tn + 0.4, [[560, 960], [566, 760], [560, 560]], { seed: 110, head: true, w: 12 });
    stampAt('st_naik', u, tn + 0.35, 330, 560, -6, 0.62);
    stampAt('m_eq_r', u, tb, 860, 590, 0, 0.75);
    putK('s_sama', slap(tb + 0.25, 860, 1010, 3), u, 111, { s: 0.75 });
    putK('s_dicoba', slap(td, 300, 1030, -3), u, 112, { s: 0.8 });
  },
  // 12 · kayak baju dan kosmetik—   camera into the risky side; the shirt grows on "baju", the cosmetics on "kosmetik"
  (u, T, d) => {
    const tb = at(11, 'baju'), tk = at(11, 'kosmetik');
    stage(u, d, { z0: 1.03, z1: 1.08, cx: 540, cy: 860, cy1: 840 }); bg(SET.chart);
    put('grafik', 540, 650, -1); put('lbl_eu', 300, 200, -2, 0, 1, 0.8);
    put('barang_aman', 860, 820, -1, 0, 1, 0.82, 0.45); put('m_eq_r', 860, 590, 0, 0, 1, 0.75);
    const gb = EASE.back(seg(stepT(u), tb, tb + 0.25)), gk = EASE.back(seg(stepT(u), tk, tk + 0.25));
    put('baju_gantung', 210 + 40 * gb, 740 - 30 * gb, -2, 0.6 * gb, 1, 0.82 + 0.28 * gb);
    put('kosmetik', 450, 870 - 20 * gk, 2, 0.6 * gk, 1, 0.78 + 0.22 * gk);
    put('st_naik', 330, 560, -6, 0, 1, 0.62);
    putK('s_baju', slap(tb + 0.1, 230, 985, -3), u, 120, { s: 0.75 });
    putK('s_kosmetik', slap(tk + 0.1, 560, 680, 3), u, 121, { s: 0.75 });
  },
  // 13 · dan paket retur ikut naik.   close-up makro: hands pack the shirt back into its box; RETUR stamped; red arrow up
  (u, T, d) => {
    const tr = at(12, 'retur'), tn = at(12, 'naik');
    stage(u, d, { z0: 1.05, z1: 1.12, cy: 820, shake: [[tr, 12]] }); bg(SET.macro, u, true);
    putK('paket_retur', slide(0, 0.18, 540, 640, -2, 0, -900, 0, 0.5), u, 130, { s: 1.15 });
    stampAt('st_retur', u, tr, 520, 920, -8, 0.78);
    arrow(u, tn - 0.15, tn + 0.15, [[900, 1000], [905, 780], [900, 560]], { seed: 131, head: true, w: 12 });
    putK('lbl_eu', slap(0.05, 300, 260, -3), u, 132, { s: 0.75 });
    putK('s_balik', slap(0.25, 760, 300, 4), u, 133, { s: 0.8 });
  },
  // 14 · Ongkir itu sebenarnya rem alami   the handbrake again, now engaged (lever up); the ongkir tag hangs on it; REM ALAMI
  (u, T, d) => {
    const tr = at(13, 'rem'), ta = at(13, 'alami');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 880 }); bg(SET.brake, u, true);
    brake(u, 580, 660, 1.05, tr, 9, -5, 140, slide(0, 0.2, 580, 660, 9, 800, 0, 0, -0.4));
    putK('tag_ongkir', slap(at(13, 'Ongkir'), 300, 420, -14), u, 142, { s: 0.7 });
    route(u, 0.2, 0.5, bow([400, 440], [600, 560], 0.2), { seed: 143, col: PAL.ink, w: 4 });
    stampAt('st_rem', u, tr, 830, 990, 6, 0.6);
    putK('s_alami', slap(ta, 470, 1040, -2), u, 144, { s: 0.8 });
  },
  // 15 · biar otak mikir ulang sebelum ambil risiko.   close-up makro: the finger hovers over CHECKOUT; the camera holds (a pause
  //      to think); "mikir ulang..." typed; the ongkir tag back on the phone; "ambil risiko"
  (u, T, d) => {
    const HX = 540, HY = 700, P = hp(HX, HY), b = P('button'), tm = at(14, 'mikir'), tr = at(14, 'risiko');
    stage(u, d, { z0: 1.6, z1: 1.72, cx: b[0], cy: b[1] - 130 }); bg(SET.macro, u, true);
    put('hp_cart', HX, HY, 0);
    put('rem_tangan', b[0] + 140, b[1] - 440, 9, 0, 1, 0.3);
    putK('tag_ongkir', slap(0.1, b[0] - 190, b[1] - 300, -10), u, 150, { s: 0.45 });
    typed('s_mikir', u, tm, 18, b[0], b[1] - 200, -2);
    putK('s_risiko', slap(tr, b[0] + 120, b[1] - 40, 3), u, 151, { s: 0.6 });
  },
  // 16 · Begitu dihapus jadi nol rupiah,   back to frame 0: the ongkir tag is crossed on "dihapus", the Rp0 sticker slaps over it
  //      on "nol"; the brake drops again
  (u, T, d) => {
    const th = at(15, 'dihapus'), tn = at(15, 'nol');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900, shake: [[tn, 12]] }); bg(SET.hook, u, true);
    putK('hp_cart', slide(0, 0.2, 520, 640, -2, 0, -900, 0, 0.5), u, 160);
    if (u < tn + 0.05) putK('tag_ongkir', slap(0.12, 340, 860, -10), u, 161, { s: 0.72 });
    stampAt('m_cross', u, th, 340, 860, 0, 0.8);
    if (u >= tn - 0.18) putK('stk_rp0', slap(tn, 330, 870, -10), u, 162, { s: 0.8 });
    brake(u, 870, 930, 0.46, at(15, 'rupiah'), -2, 8, 163);
  },
  // 17 · keranjang belanja berubah jadi ruang coba gratis.   loop: the camera dives into the curtain icon of the cart header
  //      (frame 0 detail) → the cart becomes the fitting room; parcels go out and come back; RUANG COBA GRATIS
  (u, T, d) => {
    const tb = at(16, 'berubah'), tc = at(16, 'coba'), tg = at(16, 'gratis'), P = hp(520, 640), c = P('curtain');
    if (u < tb) {
      camK(u, [[0, 540, 900, 1.04], [tb, c[0], c[1] + 40, 2.6, 'in']]); bg(SET.hook);
      put('hp_cart', 520, 640, -2); put('rem_tangan', 870, 930, 8, 0, 1, 0.46); put('stk_rp0', 330, 870, -10, 0, 1, 0.8);
      stampAt('m_circle', u, 0.15, c[0], c[1], 0, 0.32);
      return;
    }
    stage(u - tb, d - tb, { z0: 1.0, z1: 1.05, cy: 860, shake: [[0, 10]] }); bg(SET.room, u - tb, true);
    putK('kamar_pas', drop(tb - 0.01, tb + 0.12, 540, 620, 0, 600, 0.6), u, 170, { s: 1.12 });
    putK('stk_rp0', slap(tc - 0.2, 560, 330, -6), u, 171, { s: 0.6 });
    putK('paket_tumpuk', slide(tb + 0.1, tb + 0.3, 170, 900, -4, -600, 0, 0, 0.5), u, 172, { s: 0.38 });
    putK('paket_retur', slide(tb + 0.15, tb + 0.35, 910, 900, 4, 600, 0, 0, -0.5), u, 173, { s: 0.38 });
    route(u, tb + 0.3, tb + 0.7, bow([230, 820], [400, 640], -0.3), { seed: 174, col: PAL.ink, w: 5 });
    route(u, tb + 0.6, tb + 1.0, bow([680, 640], [860, 820], -0.3), { seed: 175, col: PAL.red, w: 5 });
    putK('s_dikirim', slap(tb + 0.35, 190, 1040, -3), u, 176, { s: 0.75 });
    putK('s_balik', slap(tb + 0.65, 900, 1040, 3), u, 177, { s: 0.75 });
    stampAt('st_coba', u, tg, 540, 1110, -5, 0.7);
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(voucher|ongkir|nol|rupiah|rem|untung|bersih|sering|beda|eropa|tujuh|ratus|enam|puluh|ribu|separuh|gratis|normal|naik|berisiko|baju|kosmetik|retur|alami|risiko|dihapus|ruang|coba)/i } });
}
export const renderAt = t => film.renderAt(t);
