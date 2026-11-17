// ARSIP #011 Paylater · ARSIP Kolase. 21 shots on the VO timing (vo_words.json); each shot is a small paper table with its own
// camera. Caption band y 1210–1536 stays clear: every piece lives in y 150–1180. Hero = the hand holding a phone whose printed
// checkout screen carries the PAYLATER button (amber hand-tint, thumb on top). Fact numbers only: 32,8 juta rekening (OJK, Juni
// 2026), +10% and 26 minggu (Maesen & Ang); every Rp/$ price is illustrative and identical on purpose ("harga sama").
// Reveal pause 30.84–31.40: every piece of shot 15 has landed and the camera holds. Shot 21 returns to the frame-0 layout (loop).
import { W, H, SP, PAL, setCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 2.24, 3.9, 5.48, 6.9, 8.3, 10.52, 12.66, 14.56, 15.88, 18.16, 20.96, 23.2, 26.58, 28.38, 31.4, 33.16,
  35.38, 36.88, 38.68, 41.3, 43.75];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

const SET = {
  hook: [['f_green', 240, 300, -8], ['f_amber', 930, 1110, 0], ['f_cream', 540, 1560, -3]],
  money: [['f_manila', 560, 760, 2], ['f_red', 540, 220, -5], ['f_cream', 540, 1560, 2]],
  crowd: [['f_amber_s', 140, 300, 0], ['f_manila', 540, 880, 2], ['f_green_s', 960, 240, 0], ['f_cream', 540, 1565, -2]],
  time: [['f_amber', 220, 420, 0], ['f_green_s', 950, 1000, 0], ['f_cream', 540, 1560, -3]],
  study: [['f_news', 540, 720, -2], ['f_green_s', 960, 230, 0], ['f_cream', 540, 1565, 2]],
  compare: [['f_green', 540, 300, -4], ['f_manila', 540, 900, 2], ['f_cream', 540, 1565, -2]],
  chart: [['f_cream', 540, 1180, -1], ['f_amber_s', 150, 240, 0], ['f_green_s', 960, 1050, 0]],
  wallet: [['f_amber', 600, 640, 0], ['f_green_s', 140, 300, 0], ['f_cream', 540, 1565, 2]],
  you: [['f_red', 540, 240, 5], ['f_manila', 760, 800, -3], ['f_cream', 540, 1560, -2]],
};
const camK = (u, keys, sh = []) => { let o = [0, 0]; for (const [t0, a] of sh) { const s = shake(u, t0, a); o = [o[0] + s[0], o[1] + s[1]]; } applyCam(cam(keys, u), o); };
// the phone (jempol_*): screen points as offsets from the part centre at s = 1 (measured on the cut)
const PH = { x: 540, y: 700, s: 0.95 };
const BTN_PAY = [-80, -40], BTN_NOW = [-80, -118];
const onPhone = (p, o, s) => [p.x + o[0] * s, p.y + o[1] * s];
// a row of shopper silhouettes: n people centred on x, same scale (same head size), colour per index
function people(u, t0, n, x, y, s, gap, id, col = () => 'sil_man') {
  for (let i = 0; i < n; i++) {
    const px = x + (i - (n - 1) / 2) * gap;
    putK(col(i), drop(t0 + i * 0.05, t0 + i * 0.05 + 0.2, px, y + (i % 2 ? 6 : -4), (i % 3) - 1, 500), u, id + i, { s });
  }
}
// chart geometry: grafik placed at (540, 600) s 1 → doc point (dx, dy) = world (dx + 90, dy + 330)
const G = (dx, dy) => [dx + 90, dy + 330];
const LINE0 = [G(70, 302), G(140, 298), G(200, 300)];
const SPIKE = [G(200, 300), G(240, 140), G(268, 92), G(300, 160), G(340, 300)];
const LINE1 = [G(200, 300), G(232, 236), G(300, 228), G(380, 232)];
const LINE2 = [G(380, 232), G(460, 226), G(540, 234), G(620, 224), G(700, 230), G(800, 226)];

const SHOTS = [
  // 01 · Tombol ini nggak memotong harga—tapi   the phone + PAYLATER button on the table at 0.00; HARGA SAMA hits at 0.20;
  //      a dashed cut line runs over the price tag and is crossed out: the price is not cut
  (u, T, d) => {
    const tm = at(0, 'memotong'), th = at(0, 'harga');
    stage(u, d, { z0: 1.02, z1: 1.07, cy: 900, shake: [[0.0, 8], [0.2, 12]] }); bg(SET.hook);
    putK('jempol_checkout', [[0, PH.x, PH.y, -3, 1.2, 1, null, 0, PH.s * 1.03], [0.1, PH.x, PH.y, -2, 0, 1, 'in', 1.2, PH.s]], u, 1);
    putK('tag_rp', [[0, 215, 1000, -10, 0.8, 1, null, 0, 0.82], [0.12, 215, 1000, -8, 0, 1, 'in', 0.8, 0.8]], u, 2);
    route(u, tm, tm + 0.3, [[60, 1000], [390, 1030]], { seed: 11, col: PAL.red, w: 6 });
    stampAt('m_cross_s', u, th + 0.1, 230, 1015, 0, 0.9);
    stampAt('st_harga', u, 0.2, 640, 1065, -6, 0.62);
  },
  // 02 · orang malah belanja lebih banyak.   the phone steps back; a long receipt unrolls, parcels pile up, the total is circled
  (u, T, d) => {
    const tb = at(1, 'belanja'), tk = at(1, 'banyak');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900, shake: [[tk, 8]] }); bg(SET.money, u, true);
    putK('jempol_checkout', [[0, PH.x, PH.y, -2, 0, 1, null, 0, PH.s], [0.25, 290, 660, -6, 0, 1, 'back', 0.6, 0.6]], u, 20);
    putK('struk', slide(0.08, 0.32, 790, 560, 4, 700, 0, 0, -0.5), u, 21, { s: 0.95 });
    putK('paket_tumpuk', drop(tb - 0.1, tb + 0.12, 740, 960, 3, 900), u, 22, { s: 0.52 });
    putK('paket_tumpuk', drop(tk - 0.15, tk + 0.07, 380, 1050, -4, 900), u, 23, { s: 0.36 });
    stampAt('m_circle', u, tk, 870, 772, 0, 0.6);
    arrow(u, tb, tb + 0.35, [[1010, 1080], [1020, 760], [1015, 420]], { seed: 21, head: true, col: PAL.red, w: 9 });
  },
  // 03 · Namanya paylater.   the ARSIP file opens over the phone; PAYLATER in ransom letters; the button is circled amber
  (u, T, d) => {
    const tp = at(2, 'paylater');
    stage(u, d, { z0: 1.04, z1: 1.09, cy: 900 }); bg('file', u, true);
    const P = { x: 560, y: 720, s: 0.7 };
    putK('jempol_checkout', slide(0, 0.2, P.x, P.y, 3, 0, 900, 0, 0.5), u, 30, { s: P.s });
    fileOverlay(u, 0.04, 0.9);
    stampAt('m_circle_a', u, tp + 0.2, ...onPhone(P, BTN_PAY, P.s), 0, 0.85);
    ransomRow('rpl', u, tp, 540, 1090, 0.06, 0.82);
  },
  // 04 · Sampai pertengahan tahun ini,   the calendar at JUNI 2026; the torn-off months JAN–MEI scatter; JUNI is circled
  (u, T, d) => {
    const tp = at(3, 'pertengahan');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 900 }); bg(SET.time, u, true);
    putK('kal_juni', slide(0, 0.2, 560, 640, 2, 0, -900, 0, 0.5), u, 40, { s: 0.92 });
    [['s_jan', 170, 300, -14], ['s_feb', 930, 360, 12], ['s_mar', 160, 820, 9], ['s_apr', 940, 760, -10], ['s_mei', 190, 1080, -6]].forEach(([n, x, y, r], i) =>
      putK(n, slide(0.05 + i * 0.12, 0.3 + i * 0.12, x, y, r, (x < 540 ? 380 : -380), -300, 30, 0.5), u, 41 + i, { s: 0.9 }));
    stampAt('m_circle', u, tp, 575, 350, 0, 0.95);
  },
  // 05 · paylater bank saja sudah dipakai   the bank app with its PAYLATER tile + a debit card; label PAYLATER BANK (system blue)
  (u, T, d) => {
    const tb = at(4, 'bank'), td = at(4, 'dipakai');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900 }); bg(SET.compare, u, true);
    const P = { x: 640, y: 660, s: 0.9 };
    putK('jempol_bank', slide(0, 0.2, P.x, P.y, 2, 900, 0, 0, -0.5), u, 50, { s: P.s });
    putK('kartu_bank', slide(0.1, 0.3, 230, 930, -9, -800, 0, 0, 0.6), u, 51, { s: 0.78 });
    putK('s_paylater_bank', slap(tb, 330, 260, -3), u, 52, { s: 0.95 });
    stampAt('m_circle_a', u, td, ...onPhone(P, [3, -93], P.s), 0, 0.7);
  },
  // 06 · lebih dari tiga puluh dua juta rekening.   a crowd of account holders fills the table; 32,8 JUTA + REKENING
  (u, T, d) => {
    const tt = at(5, 'tiga'), tr = at(5, 'rekening');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 900, shake: [[tt, 8]] }); bg(SET.crowd, u, true);
    people(u, 0.0, 7, 540, 690, 0.2, 140, 600, i => (i % 3 === 1 ? 'sil_man_g' : 'sil_man'));
    people(u, 0.12, 6, 540, 850, 0.24, 160, 610, i => (i % 2 ? 'sil_man_g' : 'sil_man'));
    people(u, 0.24, 5, 540, 1010, 0.29, 195, 620, i => (i === 2 ? 'sil_man_g' : 'sil_man'));
    putK('kartu_angka', slap(tt, 540, 330, -2), u, 62, { s: 0.88 });
    putK('s_rekening', slap(tr, 760, 540, 3), u, 63, { s: 0.9 });
    putK('s_ojk', slap(tr + 0.15, 250, 535, -2), u, 64, { s: 0.75 });
  },
  // 07 · Belanja sekarang, bayarnya belakangan.   left: today + parcels; a dashed route to the right: due date + the bill
  (u, T, d) => {
    const ts = at(6, 'sekarang'), tb = at(6, 'bayarnya'), tl = at(6, 'belakangan');
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 900 }); bg(SET.time, u, true);
    putK('kal_hariini', slide(0, 0.2, 270, 560, -3, -800, 0, 0, 0.5), u, 70, { s: 0.72 });
    putK('paket_tumpuk', drop(0.1, 0.3, 280, 930, -2, 900), u, 71, { s: 0.48 });
    putK('s_sekarang', slap(ts, 290, 1120, -2), u, 72, { s: 0.85 });
    route(u, tb - 0.1, tb + 0.3, bow([410, 470], [660, 470], -0.25), { seed: 71, col: PAL.ink, w: 6 });
    putK('kal_tempo', slide(tb, tb + 0.2, 800, 560, 3, 800, 0, 0, -0.5), u, 73, { s: 0.72 });
    putK('tagihan', slap(tl, 800, 930, 4), u, 74, { s: 0.68 });
    putK('s_nanti', slap(tl + 0.2, 800, 1120, 3), u, 75, { s: 0.9 });
  },
  // 08 · Kedengarannya cuma soal kapan bayar.   two dates, the same amount under each: Rp250.000 = Rp250.000
  (u, T, d) => {
    const tk = at(7, 'kapan');
    stage(u, d, { z0: 1.06, z1: 1.0, cy: 900 }); bg(SET.time);
    put('kal_hariini', 280, 520, -3, 0, 1, 0.62); put('kal_tempo', 800, 520, 3, 0, 1, 0.62);
    putK('tag_rp', slide(0.05, 0.25, 280, 930, -5, -700, 0, 0, 0.6), u, 80, { s: 0.68 });
    putK('tag_rp', slide(0.15, 0.35, 800, 930, 4, 700, 0, 0, -0.6), u, 81, { s: 0.68 });
    stampAt('m_eq', u, 0.5, 540, 935, 0, 0.9);
    arrow(u, tk - 0.1, tk + 0.25, bow([380, 250], [700, 250], -0.35), { seed: 81, col: PAL.red, w: 7 });
  },
  // 09 · Tapi di Amerika,   a new table: an airmail envelope of retail data, AMERIKA SERIKAT, the researcher at his desk
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900 }); bg(SET.study, u, true);
    putK('amplop', slide(0, 0.2, 380, 330, -5, -900, 0, 0, 0.6), u, 90, { s: 0.85 });
    putK('peneliti_data', slide(0.06, 0.28, 590, 900, 0, 900, 0, 0, -0.5), u, 91, { s: 0.85 });
    putK('s_as', slap(at(8, 'amerika'), 650, 580, 3), u, 92, { s: 0.95 });
  },
  // 10 · peneliti membedah data sebuah peritel besar,   the data sheet on top, a row circled; the retailer = basket + label
  (u, T, d) => {
    const tm = at(9, 'membedah'), tp = at(9, 'peritel');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900 }); bg(SET.study);
    putK('peneliti_data', [[0, 590, 900, 0, 0, 1, null, 0, 0.85], [0.25, 360, 930, 0, 0, 1, 'back', 0.6, 0.7]], u, 100);
    putK('lembar_data', slide(0.05, 0.28, 640, 450, 3, 0, -900, 0, 0.5), u, 101, { s: 0.85 });
    stampAt('m_circle', u, tm + 0.15, 700, 545, 0, 0.95);
    putK('keranjang_isi', drop(tp - 0.15, tp + 0.05, 850, 880, 4, 900), u, 102, { s: 0.42 });
    putK('s_peritel', slap(tp + 0.15, 830, 1080, 3), u, 103, { s: 0.85 });
  },
  // 11 · sebelum dan sesudah pembelinya bisa pakai paylater.   timeline BEFORE | AFTER; the same shoppers on both sides,
  //      after the amber line they carry the phone with the button
  (u, T, d) => {
    const ts = at(10, 'sesudah'), tp = at(10, 'paylater');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900 }); bg(SET.compare, u, true);
    putK('garis_waktu', slide(0, 0.22, 540, 300, -1, -900, 0, 0, 0.5), u, 110);
    people(u, 0.15, 3, 270, 690, 0.22, 125, 111);
    putK('keranjang_isi', drop(0.3, 0.5, 270, 960, -3, 800), u, 115, { s: 0.48 });
    people(u, ts, 3, 810, 690, 0.22, 125, 116);
    putK('keranjang_isi', drop(ts + 0.2, ts + 0.4, 760, 980, 3, 800), u, 120, { s: 0.42 });
    putK('jempol_checkout', slap(tp, 930, 920, 8), u, 121, { s: 0.26 });
  },
  // 12 · Barangnya sama. Harganya sama.   two identical baskets (=), then two identical $25 tags (=) + SAMA
  (u, T, d) => {
    const t1 = at(11, 'sama'), th = at(11, 'harganya'), t2 = at(11, 'sama', 1);
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 900 }); bg(SET.compare);
    putK('s_sebelum_s', slap(0.05, 290, 300, -3), u, 125, { s: 0.95 });
    putK('s_sesudah_s', slap(0.15, 790, 300, 3), u, 126, { s: 0.95 });
    putK('keranjang_isi', slide(0, 0.2, 290, 560, -2, -800, 0, 0, 0.5), u, 127, { s: 0.75 });
    putK('keranjang_isi', slide(0.08, 0.28, 790, 560, 2, 800, 0, 0, -0.5), u, 128, { s: 0.75 });
    stampAt('m_eq', u, t1, 540, 565, 0, 0.9);
    putK('tag_usd', slap(th, 290, 880, -5), u, 129, { s: 0.68 });
    putK('tag_usd', slap(th + 0.12, 790, 880, 4), u, 130, { s: 0.68 });
    stampAt('m_eq', u, t2, 540, 885, 0, 0.9);
    stampAt('st_sama', u, t2 + 0.15, 540, 1070, -5, 0.55);
  },
  // 13 · Anehnya, isi belanjaan mereka naik lebih banyak sepuluh persen.   bars 100 vs 110; the before basket dims,
  //      the overflowing after basket drops; +10% in amber
  (u, T, d) => {
    const ti = at(12, 'isi'), tn = at(12, 'naik'), ts = at(12, 'sepuluh');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 900, shake: [[tn, 10]] }); bg(SET.compare, u, true);
    putK('s_sebelum_s', slide(0.05, 0.25, 170, 250, -3, -600, 0, 0, 0.5), u, 131, { s: 0.85 });
    putK('s_sesudah_s', slide(0.12, 0.32, 170, 350, 2, -600, 0, 0, 0.5), u, 132, { s: 0.85 });
    putK('bar_100', slide(ti, ti + 0.2, 560, 250, 0, -900, 0, 0, 0.4), u, 133);
    putK('bar_110', slide(tn, tn + 0.22, 585, 350, 0, -900, 0, 0, 0.4), u, 134);
    const dim = u < tn ? 1 : Math.max(0.55, 1 - (u - tn) * 1.5);
    putK('keranjang_isi', [[0, 290, 820, -2, 0, 1, null, 0, 0.72], [tn, 290, 820, -2, 0, 1, 'hold', 0, 0.72], [tn + 0.3, 270, 860, -3, 0, 1, 'out', 0, 0.58]], u, 135, { a: dim });
    putK('keranjang_luber', drop(tn - 0.1, tn + 0.12, 730, 790, 3, 900), u, 136, { s: 0.82 });
    putK('s_plus10', slap(ts, 900, 520, -4), u, 137, { s: 0.72 });
  },
  // 14 · Dan ini bukan euforia sesaat.   the 26-week chart: the line jumps when paylater arrives; a dashed "short spike"
  //      is drawn and crossed out (it is not a spike)
  (u, T, d) => {
    const tb = at(13, 'bukan'), te = at(13, 'euforia'), ts = at(13, 'sesaat');
    stage(u, d, { z0: 1.0, z1: 1.05, cx: 540, cx1: 500, cy: 660 }); bg(SET.chart, u, true);
    putK('grafik', slide(0, 0.2, 540, 600, -1, 900, 0, 0, -0.4), u, 140);
    arrow(u, 0.2, 0.55, LINE0, { seed: 141, head: false, col: PAL.ink, w: 9 });
    route(u, te - 0.1, te + 0.3, SPIKE, { seed: 142, col: '#6b5d4c', w: 6 });
    putK('s_sesaat', slap(te + 0.15, 420, 380, -3), u, 141, { s: 0.85 });
    stampAt('m_cross_s', u, ts + 0.15, 360, 490, 0, 1.0);
    arrow(u, tb, tb + 0.45, LINE1, { seed: 143, head: false, col: PAL.red, w: 10 });
  },
  // 15 · Kebiasaan itu bertahan sampai setengah tahun. [0.56 s hold]   the red line stays high to week 26; the basket at its
  //      end, the calendar at MINGGU KE-26, BERTAHAN; the screen freezes in the pause
  (u, T, d) => {
    const tb = at(14, 'bertahan'), tt = at(14, 'setengah'), hold = 30.84 - START[14];
    camK(u, [[0, 500, 660, 1.05], [hold, 600, 640, 1.08, 'io'], [d, 600, 640, 1.08]]); bg(SET.chart);
    put('grafik', 540, 600, -1, 0, 1, 1);
    arrow(u, 0, 0.01, LINE0, { seed: 141, head: false, col: PAL.ink, w: 9 });
    arrow(u, 0, 0.01, LINE1, { seed: 143, head: false, col: PAL.red, w: 10 });
    arrow(u, 0.1, tt, LINE2, { seed: 151, head: true, col: PAL.red, w: 10 });
    stampAt('st_bertahan', u, tb, 520, 450, -5, 0.6);
    putK('kal_26', slide(0.2, 0.42, 900, 300, 5, 700, 0, 0, -0.5), u, 150, { s: 0.42 });
    putK('keranjang_luber', slap(tt, 880, 470, 4), u, 151, { s: 0.28 });
  },
  // 16 · Bukan karena mereka boros.   the shoppers, each with a full basket; BOROS? is slapped and crossed out
  (u, T, d) => {
    const tb = at(15, 'boros');
    stage(u, d, { z0: 1.06, z1: 1.1, cy: 900 }); bg(SET.crowd, u, true);
    people(u, 0.0, 5, 540, 600, 0.3, 200, 160);
    for (let i = 0; i < 5; i++) putK('keranjang_luber', drop(0.1 + i * 0.06, 0.3 + i * 0.06, 140 + i * 200, 770, (i % 2 ? 4 : -4), 700), u, 165 + i, { s: 0.25 });
    putK('s_boros', slap(tb, 540, 1000, -4), u, 170, { s: 0.95 });
    stampAt('m_cross', u, tb + 0.35, 540, 1000, 0, 0.95);
  },
  // 17 · Paylater bikin dompet terasa lebih longgar.   the phone's button points at the wallet; the wallet sways open;
  //      TERASA LONGGAR in amber
  (u, T, d) => {
    const tk = at(16, 'bikin'), tl = at(16, 'longgar');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 900 }); bg(SET.wallet, u, true);
    const P = { x: 230, y: 380, s: 0.4 };
    putK('jempol_checkout', slide(0, 0.2, P.x, P.y, -8, -700, 0, 0, 0.5), u, 175, { s: P.s });
    const sw = u > tl ? Math.sin((u - tl) * 9) * 3 * Math.exp(-(u - tl) * 1.5) : 0;
    putK('dompet_longgar', [[0, 600, 1300, 4, 2, 1, null, 0, 0.92], [0.22, 600, 680, -3, 0, 1, 'back', 0.8, 0.92], [tl, 600, 680, -3 + sw, 0, 1, 'hold', 0, 0.92], [tl + 0.25, 600, 670, -3 + sw, 0, 1, 'out', 0, 0.97]], u, 176);
    arrow(u, tk, tk + 0.3, bow([330, 470], [470, 560], -0.3), { seed: 171, col: PAL.ink, w: 7 });
    putK('s_longgar', slap(tl, 560, 1010, -3), u, 177, { s: 0.9 });
  },
  // 18 · Uang yang belum keluar hari ini,   the money stays in the wallet: an outgoing dashed arrow is crossed; HARI INI calendar;
  //      BELUM KELUAR (system blue)
  (u, T, d) => {
    const tk = at(17, 'keluar'), th = at(17, 'hari');
    stage(u, d, { z0: 1.02, z1: 1.07, cy: 900 }); bg(SET.wallet);
    put('dompet_longgar', 600, 670, -3, 0, 1, 0.97);
    putK('kal_hariini', slide(0.05, 0.25, 180, 340, -6, -600, 0, 0, 0.5), u, 180, { s: 0.38 });
    route(u, 0.15, 0.5, [[780, 600], [900, 420], [960, 280]], { seed: 181, col: PAL.ink, w: 6 });
    stampAt('m_cross_s', u, tk, 900, 420, 0, 0.9);
    putK('s_belum', slap(th, 560, 1010, 2), u, 181, { s: 0.92 });
  },
  // 19 · rasanya belum benar-benar kepake.   the spending note says Rp0 (circled); behind it the bill waits (MENUNGGU)
  (u, T, d) => {
    const tb = at(18, 'belum'), tk = at(18, 'kepake');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900 }); bg(SET.wallet, u, true);
    putK('tagihan', slide(0, 0.22, 780, 380, 6, 700, 0, 0, -0.4), u, 190, { s: 0.75, a: 0.85 });
    putK('dompet_longgar', slide(0.05, 0.25, 820, 960, 5, 700, 0, 0, -0.4), u, 191, { s: 0.42 });
    putK('catatan', slide(0.1, 0.3, 370, 680, -3, -800, 0, 0, 0.5), u, 192, { s: 0.95 });
    stampAt('m_circle_a', u, tb, 330, 690, 0, 0.85);
    stampAt('st_tagihan', u, tk, 800, 505, 4, 0.5);
  },
  // 20 · Coba ingat belanjaan terakhir yang kamu bayar pakai paylater.   the viewer: a buyer thinking (?), his history full of
  //      paylater rows; the top row is highlighted
  (u, T, d) => {
    const ti = at(19, 'ingat'), tt = at(19, 'terakhir'), tp = at(19, 'paylater');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 900 }); bg(SET.you, u, true);
    putK('pembeli_ragu', slide(0, 0.22, 300, 690, 0, -800, 0, 0, 0.5), u, 200, { s: 0.76 });
    ransomRow('rq', u, ti, 120, 560, 0.1, 0.7);
    const P = { x: 790, y: 610, s: 0.75 };
    putK('jempol_riwayat', slide(tt - 0.1, tt + 0.12, P.x, P.y, 4, 800, 0, 0, -0.5), u, 201, { s: P.s });
    if (u >= tp) put('hl_amber', ...onPhone(P, [-64, -249], P.s), 4, 0, 1, 0.55, 0.35);
    putK('paket_tumpuk', drop(0.2, 0.4, 230, 1070, -3, 800), u, 202, { s: 0.3 });
  },
  // 21 · Kalo harus bayar hari itu juga, masih jadi beli?   back to frame 0: the same phone and tag; BAYAR SEKARANG is
  //      highlighted and BAYAR HARI INI lands where HARGA SAMA landed
  (u, T, d) => {
    const th = at(20, 'hari'), tj = at(20, 'juga');
    stage(u, d, { z0: 1.0, z1: 1.07, cy: 900, shake: [[tj, 10]] }); bg(SET.hook, u, true);
    putK('jempol_checkout', slide(0, 0.22, PH.x, PH.y, -2, 0, 900, 0, 0.5), u, 210, { s: PH.s });
    putK('tag_rp', slap(0.25, 215, 1000, -8), u, 211, { s: 0.8 });
    if (u >= th) put('hl_amber', ...onPhone(PH, BTN_NOW, PH.s), -2, 0, 1, 0.8, 0.5);
    stampAt('st_bayar', u, tj, 640, 1065, -6, 0.62);
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(harga|banyak|paylater|tiga|puluh|dua|juta|sekarang|belakangan|kapan|amerika|sebelum|sesudah|sama|anehnya|sepuluh|persen|setengah|boros|longgar|kepake|terakhir|beli)/i } });
}
export const renderAt = t => film.renderAt(t);
