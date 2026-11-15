// ARSIP #007 HP Xiaomi · ARSIP Kolase. 24 shots on the VO timing (vo_words.json); each shot is a small paper table with its own camera.
// Caption band y 1210–1536 stays clear: every piece lives in y 120–1190. Characters: pihak XIAOMI = East Asian man ~50, dark suit,
// open collar; "kamu" = the buyer with the new phone. Numbers are Xiaomi's own (prospectus 2018, annual reports 2019/2020/2025).
import { W, H, SP, PAL, setCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 3.4, 5.08, 8.78, 10.46, 12.38, 15.14, 17.1, 18.62, 20.38, 22.44, 25.2, 27.04, 28.18, 31.22, 33.98, 36.78,
  38.74, 40.54, 42.06, 43.34, 45.46, 49.02, 50.8, 53.46];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

const SET = {
  hook: [['f_red', 540, 250, -6], ['f_amber', 930, 1120, 0], ['f_cream', 540, 1570, -3]],
  pledge: [['f_green', 280, 330, -8], ['f_amber_s', 940, 1080, 0], ['f_cream', 540, 1560, 2]],
  doc: [['f_news', 520, 760, -2], ['f_amber_s', 120, 1120, 0], ['f_cream', 540, 1565, 2]],
  bait: [['f_amber', 540, 640, 0], ['f_red', 120, 220, 8], ['f_cream', 540, 1560, 2]],
  data: [['f_cream', 540, 1180, -1], ['f_amber_s', 860, 380, 0], ['f_green_s', 180, 520, 0]],
  money: [['f_manila', 560, 760, 3], ['f_green_s', 950, 230, 0], ['f_cream', 540, 1565, -2]],
  end: [['f_amber', 540, 700, 0], ['f_green_s', 140, 220, 0], ['f_cream', 540, 1565, -2]],
};
const camK = (u, keys, sh = []) => { let o = [0, 0]; for (const [t0, a] of sh) { const s = shake(u, t0, a); o = [o[0] + s[0], o[1] + s[1]]; } applyCam(cam(keys, u), o); };
// the hand + phone of frame 0; the ad card sits on its screen (screen centre ≈ (+7, −141)·s from the cut-out centre, tilted ≈ 12°)
function phone(u, keys, s = 1, ad = -1, id = 10) {
  const p = putK('hp_tangan', keys, u, id, { s });
  if (p && ad >= 0 && u >= ad - 0.17) putK('adcard', [[ad - 0.17, p.x + 7 * s, p.y - 141 * s - 30, p.r + 6, 3, 1, null, 0, 0.62 * s], [ad, p.x + 7 * s, p.y - 141 * s, p.r + 12, 0, 1, 'in', 1.2, 0.55 * s]], u, id + 1);
  return p;
}
// two coin stacks on one table: Rp11 (HP) vs Rp76 (internet services), heights in proportion, bottoms on y 990
const stackSmall = (u, t0) => u >= t0 && putK('koin_tumpuk', drop(t0, t0 + 0.2, 300, 990 - 602 * 0.17 / 2, 0, 600), u, 160, { s: 0.17 });
const stackBig = (u, t0) => u >= t0 && putK('koin_tumpuk', [[t0, 760, 939, 0, 0, 1, null, 0, 0.17], [t0 + 0.6, 760, 990 - 602 * 1.15 / 2 + 602 * 0.17 / 2 - 50, 0, 0, 1, 'out', 0, 1.15]], u, 161);

const SHOTS = [
  // 01 · HP Xiaomi kayak gini sering muncul iklan di aplikasinya.   the phone is in hand at 0.00, IKLAN? at 0.14, the ad pops on "iklan"
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.08, cy: 860, shake: [[0.0, 8], [0.14, 12], [at(0, 'iklan'), 8]] }); bg(SET.hook);
    phone(u, [[0, 540, 640, 2, 1.2, 1, null, 0, 1.04], [0.1, 540, 650, 0, 0, 1, 'in', 1.2, 1.0]], 1.0, at(0, 'iklan'));
    putK('s_xiaomi', slap(at(0, 'xiaomi'), 250, 230, -5), u, 2, { s: 0.85 });
    stampAt('st_iklan', u, 0.14, 560, 1060, -8, 1.0);
  },
  // 02 · Padahal Xiaomi janji,   the company man takes an oath (2018)
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 880 }); bg(SET.pledge, u, true);
    putK('pihak_x_janji', slide(0, 0.22, 540, 680, 0, 0, 900, 0, 0.5), u, 20, { s: 1.0 });
    putK('s_pihak', slap(0.1, 300, 230, -4), u, 21);
    ransomRow('ry18', u, at(1, 'janji'), 820, 230, 0.07, 0.75);
  },
  // 03 · untung bersih dari semua barang jualannya maksimal lima persen setahun.
  (u, T, d) => {
    const tl = at(2, 'lima');
    stage(u, d, { z0: 1.0, z1: 1.08, cy: 800, shake: [[tl + 0.3, 12]] }); bg(SET.pledge);
    putK('produk_jejer', slide(0, 0.25, 540, 520, 0, -1100, 0, 0, 0.4), u, 30, { s: 1.0 });
    putK('s_semua', slap(at(2, 'semua'), 540, 770, -2), u, 31);
    stampAt('st_janji', u, tl + 0.3, 540, 990, -5, 0.9);
  },
  // 04 · Kok bisa? Kalau lebih,   the ARSIP file; the 5% ceiling
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 860 }); bg(SET.data, u, true);
    putK('ceiling', slide(0.1, 0.35, 540, 680, 0, 0, 900, 0, 0.5), u, 40, { s: 0.95 });
    ransomRow('rq', u, 0.12, 200, 280, 0.1, 0.8);
    fileOverlay(u, 0.06, 1.0);
  },
  // 05 · kelebihannya dikembalikan ke pengguna.   coins poured back into a palm
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.07 }); bg(SET.money, u, true);
    putK('tangan_koin', slide(0, 0.22, 540, 640, 0, 900, 0, 0, -0.5), u, 50, { s: 1.0 });
    putK('s_kembali', slap(at(4, 'dikembalikan'), 540, 1060, -2), u, 51);
  },
  // 06 · Jarang lho ada perusahaan yang mau untungnya dibatasi.
  (u, T, d) => {
    const tb = at(5, 'dibatasi');
    stage(u, d, { z0: 1.0, z1: 1.08, cy: 860, shake: [[tb, 10]] }); bg(SET.data);
    put('ceiling', 540, 680, 0, 0, 1, 0.95);
    putK('s_jarang', slap(at(5, 'jarang'), 540, 230, -3), u, 60, { s: 1.1 });
    ransomRow('r5', u, tb, 860, 1060, 0.1, 0.8);
  },
  // 07 · Dan menurut laporan resminya,   Xiaomi's own annual reports
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.1, cy: 800 }); bg(SET.doc, u, true);
    putK('laporan', slide(0, 0.25, 540, 640, -2, 0, 1000, 0, 0.5), u, 70, { s: 1.12 });
    putK('s_kata', slap(at(6, 'laporan'), 540, 250, 2), u, 71);
  },
  // 08 · janji itu ditepati.
  (u, T, d) => {
    const tt = at(7, 'ditepati');
    stage(u, d, { z0: 1.1, z1: 1.05, cy: 800, shake: [[tt, 12]] }); bg(SET.doc);
    put('laporan', 540, 640, -2, 0, 1, 1.12); put('s_kata', 540, 250, 2);
    stampAt('st_ditepati', u, tt, 560, 870, -6, 0.85);
  },
  // 09 · Terus untung besarnya dari mana?
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 880 }); bg(SET.hook, u, true);
    phone(u, slide(0, 0.2, 540, 620, 0, 0, 900, 0, 0.5), 0.78);
    ransomRow('rq', u, at(8, 'mana'), 850, 330, 0.1, 0.9);
    typed('s_dari', u, at(8, 'untung'), 24, 540, 1080, -2);
  },
  // 10 · Dokumen resmi Xiaomi sendiri mengaku:   the prospectus (2018), the company man explains
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 880 }); bg(SET.doc, u, true);
    putK('pihak_x_tunjuk', slide(0, 0.22, 360, 680, 0, -800, 0, 0, 0.6), u, 100, { s: 0.92 });
    putK('s_dok', slap(at(9, 'dokumen'), 560, 210, 2), u, 101);
    putK('globe', slap(at(9, 'mengaku'), 820, 640, 6), u, 102, { s: 0.75 });
  },
  // 11 · bisnis utama kami sebenarnya perusahaan internet.   the quote is typed out
  (u, T, d) => {
    const ti = at(10, 'internet');
    stage(u, d, { z0: 1.05, z1: 1.1, cy: 860, shake: [[ti, 9]] }); bg(SET.doc);
    put('pihak_x_tunjuk', 360, 680, 0, 0, 1, 0.92); put('s_dok', 560, 210, 2);
    putK('globe', [[0, 820, 640, 6, 0, 1, null, 0, 0.75], [ti, 820, 640, 6, 0, 1, 'hold', 0, 0.75], [ti + 0.2, 800, 620, -4, 0, 1, 'in', 1.2, 0.95]], u, 110);
    typed('s_quote', u, at(10, 'bisnis'), 22, 540, 1080, -1);
  },
  // 12 · HP-nya dijual dengan untung tipis,   the phone as bait on a hook
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 860 }); bg(SET.bait, u, true);
    putK('hp_kail', [[0, 540, -500, 6, 0, 1], [0.35, 540, 560, -3, 0, 1, 'back', 1.0]], u, 120, { s: 0.68 });
    putK('s_tipis', slap(at(11, 'untung'), 540, 1100, -2), u, 121);
  },
  // 13 · buat dapetin pengguna.
  (u, T, d) => {
    const sw = Math.sin(stepT(u) * 4) * 3;
    stage(u, d, { z0: 1.06, z1: 1.1, cy: 820 }); bg(SET.bait);
    put('hp_kail', 540, 560, -3 + sw, 0, 1, 0.68);
    stampAt('st_umpan', u, 0.1, 560, 760, -8, 0.85);
    putK('s_dapat', slap(at(12, 'dapetin'), 540, 1100, -2), u, 130);
  },
  // 14 · Kamu merasa untung dapat HP bagus harga miring,
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 880 }); bg(SET.pledge, u, true);
    putK('pembeli_hp', slide(0, 0.22, 540, 650, 0, 0, 900, 0, 0.5), u, 140, { s: 1.0 });
    putK('s_kamu', slap(at(13, 'kamu'), 840, 300, 6), u, 141);
    putK('s_miring', slap(at(13, 'harga'), 540, 1100, -2), u, 142);
  },
  // 15 · padahal layar HP-mu ikut jadi papan iklan.   the screen becomes a billboard
  (u, T, d) => {
    const tp = at(14, 'papan');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 860 }); bg(SET.hook, u, true);
    phone(u, slide(0, 0.2, 340, 700, 0, -800, 0, 0, 0.6), 0.78, at(14, 'layar'));
    putK('papan_iklan', slide(tp - 0.2, tp + 0.05, 790, 470, 2, 600, 0, 0, -0.5), u, 151, { s: 0.48 });
    arrow(u, tp, tp + 0.3, bow([450, 520], [640, 450], 0.25), { seed: 152, head: true });
    putK('s_papan', slap(at(14, 'iklan'), 560, 1100, -2), u, 153);
  },
  // 16 · Memang, dari tiap seratus rupiah jualan HP,   the small pile for phones
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 880 }); bg(SET.data, u, true);
    putK('s_per100', slap(at(15, 'tiap'), 420, 200, -2), u, 162);
    putK('s_kotor', slap(at(15, 'tiap') + 0.25, 420, 290, 1), u, 163);
    stackSmall(u, at(15, 'jualan'));
    putK('s_hp', slap(at(15, 'hp'), 300, 1080, -3), u, 164);
    putK('hp_tangan', slap(at(15, 'jualan') - 0.3, 300, 640, -6), u, 165, { s: 0.38 });
  },
  // 17 · untung kotornya cuma sebelas rupiah.
  (u, T, d) => {
    stage(u, d, { z0: 1.04, z1: 1.08, cy: 880 }); bg(SET.data);
    put('s_per100', 420, 200, -2); put('s_kotor', 420, 290, 1); put('s_hp', 300, 1080, -3);
    put('koin_tumpuk', 300, 990 - 51, 0, 0, 1, 0.17); put('hp_tangan', 300, 640, -6, 0, 1, 0.38);
    putK('s_11', slap(at(16, 'sebelas'), 300, 800, -4), u, 170);
  },
  // 18 · Tapi dari layanan internet…   the big stack grows
  (u, T, d) => {
    stage(u, d, { z0: 1.08, z1: 1.02, cy: 860 }); bg(SET.data);
    put('s_per100', 420, 200, -2); put('s_kotor', 420, 290, 1); put('s_hp', 300, 1080, -3); put('s_11', 300, 800, -4);
    put('koin_tumpuk', 300, 990 - 51, 0, 0, 1, 0.17); put('hp_tangan', 300, 640, -6, 0, 1, 0.38);
    stackBig(u, at(17, 'layanan'));
    putK('s_net', slap(at(17, 'internet'), 760, 1080, 3), u, 180);
  },
  // 19 · tembus tujuh puluh enam rupiah.
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.06, cy: 860, shake: [[at(18, 'tujuh'), 12]] }); bg(SET.data);
    put('s_per100', 420, 200, -2); put('s_kotor', 420, 290, 1); put('s_hp', 300, 1080, -3); put('s_11', 300, 800, -4); put('s_net', 760, 1080, 3);
    put('koin_tumpuk', 300, 990 - 51, 0, 0, 1, 0.17); put('hp_tangan', 300, 640, -6, 0, 1, 0.38);
    put('koin_tumpuk', 760, 990 - 602 * 1.15 / 2 + 51 - 50, 0, 0, 1, 1.15);
    putK('s_76', slap(at(18, 'tujuh'), 400, 560, -5), u, 190);
  },
  // 20 · Sumber uang terbesarnya?   coins pour out of the screen
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06 }); bg(SET.money, u, true);
    putK('hp_koin', slide(0, 0.2, 540, 650, 0, 0, 900, 0, 0.5), u, 200, { s: 1.0 });
    putK('s_sumber', slap(0.1, 540, 220, -2), u, 201);
    ransomRow('rq', u, at(19, 'terbesarnya'), 860, 1040, 0.1, 0.8);
  },
  // 21 · Iklan. Xiaomi sendiri bilang,
  (u, T, d) => {
    stage(u, d, { z0: 1.06, z1: 1.1, shake: [[0.08, 14]] }); bg(SET.money);
    put('hp_koin', 540, 650, 0, 0, 1, 1.0); put('s_sumber', 540, 220, -2);
    stampAt('st_iklan2', u, 0.08, 540, 640, -8, 1.2);
    putK('s_kata', slap(at(20, 'xiaomi'), 540, 1060, 2), u, 210, { s: 1.2 });
  },
  // 22 · iklannya dibuat nggak mengganggu dan bisa dikurangi di pengaturan.   the company man, calm; a thumb switches ads off
  (u, T, d) => {
    const tb = at(21, 'bisa');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 880 }); bg(SET.pledge, u, true);
    putK('pihak_x_janji', slide(0, 0.22, 300, 680, 0, -700, 0, 0, 0.6), u, 220, { s: 0.75 });
    putK('s_ganggu', slap(at(21, 'nggak'), 300, 1090, -3), u, 221);
    putK('tangan_saklar', slide(tb - 0.2, tb + 0.05, 790, 660, 3, 600, 0, 0, -0.5), u, 222, { s: 0.62 });
    putK('s_atur', slap(at(21, 'dikurangi'), 560, 210, -2), u, 223);
  },
  // 23 · Jadi iklan kecil kayak gini,   back to frame 0
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 860 }); bg(SET.hook, u, true);
    phone(u, slide(0, 0.2, 540, 650, 0, 0, 900, 0, 0.5), 1.0, at(22, 'iklan'));
    putK('s_kecil', slap(at(22, 'kecil'), 850, 320, 6), u, 231);
  },
  // 24 · kata Xiaomi, memang bagian penting dari bisnisnya.   (the loop lands on frame 0)
  (u, T, d) => {
    stage(u, d, { z0: 1.05, z1: 1.02, cy: 860 }); bg(SET.hook);
    phone(u, [[0, 540, 650, 0, 0, 1]], 1.0, 0);
    put('s_kecil', 850, 320, 6);
    putK('s_kata', slap(0.05, 270, 230, -4), u, 241);
    putK('s_penting', slap(at(23, 'penting'), 540, 1090, -2), u, 242);
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(xiaomi|iklan|lima|persen|ditepati|internet|tipis|sebelas|tujuh|pengaturan|penting|janji)/i } });
}
export const renderAt = t => film.renderAt(t);
