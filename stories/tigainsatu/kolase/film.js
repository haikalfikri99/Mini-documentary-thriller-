// ARSIP #006 3-in-1 · ARSIP Kolase. 24 shots on the VO timing (vo_words.json); each shot is a small paper table with its own camera.
// Caption band y 1210–1536 stays clear: every piece lives in y 120–1190. Characters: JOKI = adult man in a dark T-shirt (never a child),
// the driver = man in a white office shirt. Study: Hanna, Kreindler & Olken (Science 2017), afternoon Sudirman 2,8 → 5,3 min/km.
import { W, H, SP, PAL, setCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 2.24, 6.34, 7.94, 11.8, 13.02, 14.7, 16.24, 18.02, 20.32, 24.3, 25.74, 28.4, 29.76, 32.62, 34.06, 36.22,
  37.46, 39.2, 41.68, 43.56, 45.78, 49.0, 51.48, 54.7];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

const SET = {
  hook: [['f_red', 540, 250, -6], ['f_amber', 930, 1120, 0], ['f_cream', 540, 1570, -3]],
  city: [['f_green', 280, 330, -8], ['f_amber_s', 940, 1080, 0], ['f_cream', 540, 1560, 2]],
  car: [['f_manila', 560, 760, 3], ['f_green_s', 950, 230, 0], ['f_cream', 540, 1565, -2]],
  joki: [['f_amber', 540, 640, 0], ['f_red', 120, 220, 8], ['f_cream', 540, 1560, 2]],
  study: [['f_news', 520, 760, -2], ['f_amber_s', 120, 1120, 0], ['f_cream', 540, 1565, 2]],
  data: [['f_cream', 540, 1180, -1], ['f_amber_s', 860, 380, 0], ['f_green_s', 180, 520, 0]],
  late: [['f_red', 540, 1080, -10], ['f_manila', 760, 640, 4]],
  end: [['f_amber', 540, 700, 0], ['f_green_s', 140, 220, 0], ['f_cream', 540, 1565, -2]],
};
const camK = (u, keys, sh = []) => { let o = [0, 0]; for (const [t0, a] of sh) { const s = shake(u, t0, a); o = [o[0] + s[0], o[1] + s[1]]; } applyCam(cam(keys, u), o); };
// the 3-in-1 sign: blank AI sign + our printed face on its panel (panel centre ≈ (0, −232)·s from the sign centre)
function sign(u, keys, s = 1, id = 10, face = true) {
  const p = putK('rambu', keys, u, id, { s });
  if (p && face) put('sign_3in1', p.x, p.y - 232 * s * p.s, p.r, 0, 1, 0.9 * s * p.s);
  return p;
}

const SHOTS = [
  // 01 · Aturan three in one Jakarta dihapus.   the sign is on the table at 0.00, DIHAPUS hits at 0.14
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.08, cy: 860, shake: [[0.0, 8], [0.14, 12], [at(0, 'dihapus'), 10]] }); bg(SET.hook);
    sign(u, [[0, 540, 640, -3, 1.0, 1, null, 0, 1.04], [0.1, 540, 650, -2, 0, 1, 'in', 1.2, 1.0]], 1.0);
    putK('s_jakarta', slap(at(0, 'jakarta'), 280, 190, -4), u, 2);
    stampAt('st_dihapus', u, 0.14, 560, 620, -8, 0.9);
    if (u > at(0, 'dihapus')) ransomRow('ry16', u, at(0, 'dihapus'), 800, 190, 0.07, 0.75);
  },
  // 02 · Sore hari, jalan protokol kayak Sudirman hampir dua kali lebih lambat.
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.08, cx1: 520, cy: 900 }); bg(SET.city, u, true);
    putK('jam', slap(0.05, 830, 420, 6), u, 20, { s: 0.6 });
    putK('s_sore', slap(at(1, 'sore') + 0.1, 830, 590, 4), u, 21, { s: 0.85 });
    putK('sudirman', slide(0.15, 0.4, 420, 700, -2, -800, 0, 0, 0.6), u, 22, { s: 0.82 });
    putK('s_sudirman', slap(at(1, 'sudirman'), 430, 1090, -3), u, 23);
    putK('s_2x', slap(at(1, 'hampir'), 540, 190, -2), u, 24, { s: 1.0 });
  },
  // 03 · Kok bisa? Dulu,   the ARSIP file opens over the avenue
  (u, T, d) => {
    stage(u, d, { z0: 1.06, z1: 1.12, cy: 800 }); bg(SET.city);
    put('sudirman', 540, 700, -1, 0, 1, 0.85);
    ransomRow('rq', u, 0.12, 860, 330, 0.1, 0.9);
    fileOverlay(u, 0.06, 1.15);
  },
  // 04 · mobil yang lewat sini pas jam sibuk wajib isi minimal tiga orang.
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.1, cy: 760, cy1: 700 }); bg(SET.car, u, true);
    putK('mobil_tiga', slide(0, 0.3, 540, 640, 0, -1100, 0, 0, 0.4), u, 40, { s: 1.0 });
    putK('jam', slap(at(3, 'jam'), 210, 330, -6), u, 41, { s: 0.45 });
    putK('s_wajib', slap(at(3, 'wajib'), 540, 900, -2), u, 42);
    ransomRow('r3', u, at(3, 'tiga'), 860, 330, 0.1, 0.9);
  },
  // 05 · Yang nyetir sendirian,
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06 }); bg(SET.car);
    putK('pengemudi_sendirian', slide(0, 0.22, 540, 640, 0, 900, 0, 0, -0.5), u, 50, { s: 1.0 });
    putK('s_sendiri', slap(at(4, 'sendirian'), 540, 1030, -3), u, 51);
  },
  // 06 · tinggal sewa joki di pinggir jalan.   the adult jockey raises one finger at the passing car
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900 }); bg(SET.joki, u, true);
    put('pengemudi_sendirian', 800, 900, 0, 0, 1, 0.42);
    putK('joki', slide(0, 0.22, 330, 650, 0, -700, 0, 0, 0.6), u, 60, { s: 0.8 });
    putK('s_joki', slap(at(5, 'joki'), 790, 420, 5), u, 61);
  },
  // 07 · Joki malah jadi masalah,   a row of jockeys
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.07, shake: [[at(6, 'masalah'), 10]] }); bg(SET.joki);
    putK('joki', slap(0.05, 260, 640, -2), u, 70, { s: 0.55 });
    putK('joki_m', slap(0.25, 540, 660, 1), u, 71, { s: 0.55 });
    putK('joki', slap(0.45, 820, 640, 2), u, 72, { s: 0.55 });
    putK('s_masalah', slap(at(6, 'masalah'), 540, 1060, -3), u, 73, { s: 1.1 });
  },
  // 08 · jadi pemerintah menghapusnya.   the sign comes down (2016)
  (u, T, d) => {
    const th = at(7, 'menghapusnya');
    stage(u, d, { z0: 1.0, z1: 1.05, shake: [[th + 0.3, 12]] }); bg(SET.late, u, true);
    putK('petugas_cabut', slide(0, 0.22, 540, 660, 0, 800, 0, 0, -0.5), u, 80, { s: 0.88 });
    putK('s_pemerintah', slap(at(7, 'pemerintah'), 280, 210, -4), u, 81);
    stampAt('st_dihapus', u, th + 0.3, 560, 860, -7, 0.8);
    ransomRow('ry16', u, 0.3, 810, 210, 0.07, 0.7);
  },
  // 09 · Tapi ada yang keburu mengukur.   the clock and a measuring line
  (u, T, d) => {
    const tm = at(8, 'mengukur');
    stage(u, d, { z0: 1.0, z1: 1.08, cy: 860 }); bg(SET.study, u, true);
    putK('jam', [[0, 540, 560, -6, 1.5, 1, null, 0, 1.2], [0.1, 540, 580, -3, 0, 1, 'in', 1.2, 1.1]], u, 90);
    ransomRow('rq', u, at(8, 'keburu'), 850, 260, 0.1, 0.8);
    arrow(u, tm, tm + 0.5, [[170, 930], [910, 930]], { seed: 91, head: true });
    route(u, tm, tm + 0.5, [[170, 900], [170, 960]], { seed: 92 });
  },
  // 10 · Ekonom Harvard dan MIT memantau kecepatan jalan lewat Google Maps.
  (u, T, d) => {
    const tg = at(9, 'google');
    camK(u, [[0, 540, 900, 1.0], [tg - 0.4, 540, 880, 1.04], [tg + 0.4, 560, 680, 1.2, 'io'], [d, 560, 680, 1.22]]); bg(SET.study);
    putK('ekonom', slide(0, 0.25, 540, 620, 0, 0, 900, 0, 0.5), u, 100, { s: 1.0 });
    putK('s_ekonom', slap(at(9, 'ekonom'), 540, 230, -2), u, 101);
    putK('s_science', slap(at(9, 'memantau'), 540, 360, 2), u, 102);
    putK('s_maps', slap(tg, 560, 830, -1), u, 103, { s: 0.85 });
  },
  // 11 · Sore hari di Sudirman,
  (u, T, d) => {
    stage(u, d, { z0: 1.08, z1: 1.0, cy: 800 }); bg(SET.city, u, true);
    putK('sudirman', slide(0, 0.2, 540, 680, 1, 0, -900, 0, 0.5), u, 110, { s: 0.88 });
    putK('jam', slap(0.1, 860, 330, 6), u, 111, { s: 0.5 });
    putK('s_sore', slap(at(10, 'sore') + 0.15, 230, 330, -4), u, 112, { s: 0.85 });
  },
  // 12 · satu kilometer yang tadinya dua koma delapan menit…   a car crosses a 1 km line
  (u, T, d) => {
    const t28 = at(11, 'dua');
    stage(u, d, { z0: 1.0, z1: 1.05 }); bg(SET.data, u, true);
    putK('s_1km', slap(0.05, 540, 260, -3), u, 120);
    route(u, 0.1, 0.6, [[140, 760], [940, 760]], { seed: 121, dash: [18, 14] });
    const f = EASE.io(seg(stepT(u), 0.4, d));
    put('mobil_tiga', 300 + 480 * f, 640, 0, 0, 1, 0.48);
    putK('s_28', slap(t28, 540, 960, -2), u, 122);
  },
  // 13 · jadi lima koma tiga menit.   the delay bars
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, shake: [[at(12, 'tiga'), 12]] }); bg(SET.data);
    put('s_1km', 540, 260, -3, 0, 1, 1.0);
    putK('bars', slide(0, 0.22, 540, 640, -1, 0, 800, 0, 0.5), u, 130, { s: 1.0 });
    putK('s_53', slap(at(12, 'menit'), 680, 960, 3), u, 131);
  },
  // 14 · Anehnya, jalanan di luar jalur three in one,
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.07, cy: 880 }); bg(SET.city, u, true);
    putK('jalan_samping', slide(0, 0.25, 540, 640, 0, -900, 0, 0, 0.5), u, 140, { s: 1.0 });
    ransomRow('rq', u, 0.1, 870, 220, 0.1, 0.8);
    putK('s_luar', slap(at(13, 'jalur'), 540, 1100, -2), u, 141);
  },
  // 15 · bahkan di luar jam sibuk,
  (u, T, d) => {
    stage(u, d, { z0: 1.07, z1: 1.12, cy: 880 }); bg(SET.city);
    put('jalan_samping', 540, 640, 0, 0, 1, 1.0);
    putK('jam', slap(0.1, 230, 330, -6), u, 150, { s: 0.55 });
    stampAt('m_cross_s', u, at(14, 'luar'), 230, 330, 0, 1.0);
    putK('s_luarjam', slap(at(14, 'jam'), 560, 1060, 2), u, 151);
  },
  // 16 · ikut macet. Dugaan penelitinya,
  (u, T, d) => {
    stage(u, d, { z0: 1.12, z1: 1.04, cy: 880, shake: [[0.25, 12]] }); bg(SET.city);
    put('jalan_samping', 540, 640, 0, 0, 1, 1.0);
    stampAt('st_macet', u, 0.25, 540, 840, -6, 0.9);
    putK('s_dugaan', slap(at(15, 'dugaan'), 540, 230, -3), u, 160, { s: 1.1 });
  },
  // 17 · begitu aturan hilang,   the printed face flies off the sign
  (u, T, d) => {
    const th = at(16, 'hilang');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900 }); bg(SET.hook);
    const p = sign(u, [[0, 540, 650, -2, 0, 1]], 1.0, 170, false);
    if (u < th + 0.3) putK('sign_3in1', [[0, p.x, p.y - 232, -2, 0, 1, null, 0, 0.9], [th, p.x, p.y - 232, -2, 0, 1, 'hold', 0, 0.9],
      [th + 0.3, 980, -260, 40, 4, 1, 'out', 0, 0.7]], u, 171);
  },
  // 18 · nyetir sendirian gratis lagi,
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06 }); bg(SET.car, u, true);
    putK('pengemudi_sendirian', slide(0, 0.22, 540, 640, 0, -900, 0, 0, 0.5), u, 180, { s: 1.0 });
    putK('s_gratis', slap(at(17, 'gratis'), 540, 1020, -3), u, 181);
  },
  // 19 · jadi pengendara ramai-ramai bawa mobil sendiri.   a long line of cars, one person each
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.1, cx: 600, cx1: 480, cy: 820 }); bg(SET.car);
    putK('mobil_sendiri', slide(0, 0.25, 540, 640, 0, 900, 0, 0, -0.4), u, 190, { s: 1.0 });
    putK('s_1orang', slap(at(18, 'sendiri'), 540, 1020, -2), u, 191);
  },
  // 20 · Joki bikin aturan ini percuma?
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 900 }); bg(SET.joki, u, true);
    putK('joki', slide(0, 0.2, 360, 660, 0, -700, 0, 0, 0.6), u, 200, { s: 0.8 });
    sign(u, slide(0.2, 0.4, 800, 560, 3, 600, 0, 0, -0.5), 0.5, 201);
    stampAt('st_percuma', u, at(19, 'percuma'), 560, 1040, -6, 0.75);
  },
  // 21 · Nggak. Kata studi itu,
  (u, T, d) => {
    stage(u, d, { z0: 1.05, z1: 1.08, cy: 900, shake: [[0.08, 14]] }); bg(SET.joki);
    put('joki', 360, 660, 0, 0, 1, 0.8); sign(u, [[0, 800, 560, 3, 0, 1]], 0.5, 210);
    stampAt('st_nggak', u, 0.08, 540, 760, -8, 1.1);
    putK('s_science', slap(at(20, 'studi'), 560, 1060, 2), u, 211);
  },
  // 22 · ongkos sewa joki udah cukup buat nahan orang bawa mobil.   the driver pays the jockey
  (u, T, d) => {
    const tc = at(21, 'cukup');
    camK(u, [[0, 540, 900, 1.0], [tc, 540, 880, 1.04], [tc + 0.5, 560, 760, 1.14, 'io'], [d, 560, 760, 1.16]]); bg(SET.car, u, true);
    putK('bayar_joki', slide(0, 0.22, 540, 640, 0, 900, 0, 0, -0.4), u, 220, { s: 1.0 });
    putK('s_ongkos', slap(at(21, 'ongkos'), 540, 230, -2), u, 221);
    putK('s_nahan', slap(at(21, 'nahan'), 560, 1020, 1), u, 222);
  },
  // 23 · Jadi macet parah di Sudirman kayak gini…
  (u, T, d) => {
    stage(u, d, { z0: 1.12, z1: 1.0, cy: 760 }); bg(SET.city, u, true);
    putK('sudirman', slide(0, 0.2, 540, 680, -1, 0, 900, 0, 0.5), u, 230, { s: 0.88 });
    putK('s_sudirman', slap(at(22, 'sudirman'), 540, 200, -3), u, 231);
  },
  // 24 · dulu sebenarnya ditahan sama aturan yang kita anggap percuma.   the sign is back: frame 0 again, now "ditahan"
  (u, T, d) => {
    const td = at(23, 'ditahan');
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 880, shake: [[td, 10]] }); bg(SET.hook, u, true);
    sign(u, drop(0.05, 0.3, 540, 650, -2, 900), 1.0, 240);
    stampAt('st_tahan', u, td, 560, 1020, -6, 0.85);
    typed('s_kita', u, at(23, 'kita'), 24, 540, 190, -2);
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(three|dihapus|sudirman|lambat|joki|tiga|sendirian|harvard|mit|lima|macet|percuma|nggak|ditahan)/i } });
}
export const renderAt = t => film.renderAt(t);
