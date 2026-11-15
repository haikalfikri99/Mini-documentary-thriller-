// ARSIP #008 Indomie Taiwan · ARSIP Kolase. 26 shots on the VO timing (vo_words.json); each shot is a small paper table with its own camera.
// Caption band y 1210–1536 stays clear: every piece lives in y 120–1190. Characters (same man in every shot): TAIWAN inspector =
// East Asian man in a white lab coat (clipboard); BPOM = Indonesian man in a light jacket (thumbs-up / document); INDOFOOD = man with
// round glasses and a dark suit. Incidents: Oct 2010 (nipagin in the soy sauce), Apr 2023 (ethylene oxide), Sep 2025 (one shipment).
import { W, H, SP, PAL, setCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 2.62, 4.24, 6.06, 7.32, 9.16, 11.2, 12.64, 14.42, 15.54, 16.94, 20.04, 21.42, 22.72, 27.58, 31.02, 32.5,
  33.7, 35.42, 36.88, 39.74, 43.16, 45.28, 46.8, 48.36, 51.24, 54.42];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

const SET = {
  hook: [['f_red', 540, 250, -6], ['f_amber', 930, 1120, 0], ['f_cream', 540, 1570, -3]],
  tw: [['f_red', 280, 330, -8], ['f_manila', 940, 1080, 0], ['f_cream', 540, 1560, 2]],
  id: [['f_green', 760, 330, 6], ['f_amber_s', 140, 1080, 0], ['f_cream', 540, 1560, 2]],
  lab: [['f_news', 520, 760, -2], ['f_amber_s', 120, 1120, 0], ['f_cream', 540, 1565, 2]],
  data: [['f_cream', 540, 1180, -1], ['f_amber_s', 860, 380, 0], ['f_green_s', 180, 520, 0]],
  port: [['f_manila', 560, 760, 3], ['f_green_s', 950, 230, 0], ['f_cream', 540, 1565, -2]],
  split: [['f_red', 270, 640, -2], ['f_green', 810, 640, 2], ['f_cream', 540, 1565, -2]],
  end: [['f_amber', 540, 700, 0], ['f_green_s', 140, 220, 0], ['f_cream', 540, 1565, -2]],
};
const camK = (u, keys, sh = []) => { let o = [0, 0]; for (const [t0, a] of sh) { const s = shake(u, t0, a); o = [o[0] + s[0], o[1] + s[1]]; } applyCam(cam(keys, u), o); };

const SHOTS = [
  // 01 · Indomie kayak gini ditolak Taiwan tiga kali.   the pack is on the table at 0.00, DITOLAK TAIWAN at 0.14, "3x" on "tiga"
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.08, cy: 860, shake: [[0.0, 8], [0.14, 12], [at(0, 'tiga'), 10]] }); bg(SET.hook);
    putK('mi_bungkus', [[0, 540, 630, -5, 1.2, 1, null, 0, 1.04], [0.1, 540, 640, -3, 0, 1, 'in', 1.2, 1.0]], u, 1);
    putK('s_indomie', slap(Math.max(0.3, at(0, 'indomie')), 330, 270, -5), u, 2);
    stampAt('st_ditolak', u, 0.14, 540, 980, -6, 0.9);
    ransomRow('rx3', u, at(0, 'tiga'), 830, 280, 0.1, 0.85);
  },
  // 02 · Gara-gara isi sachet bumbunya.   the sachets slide out of the pack
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.07, cy: 820 }); bg(SET.hook);
    put('mi_bungkus', 540, 420, -3, 0, 1, 0.62);
    putK('sachet_tiga', slide(0.05, 0.3, 540, 800, 2, 0, -260, 0, 0.6), u, 20, { s: 0.88 });
    putK('s_sachet', slap(at(1, 'sachet'), 540, 1100, -2), u, 21);
  },
  // 03 · Kok bisa? Padahal di sini,   the ARSIP file opens
  (u, T, d) => {
    stage(u, d, { z0: 1.06, z1: 1.1, cy: 820 }); bg(SET.lab, u, true);
    put('sachet_tiga', 540, 800, 2, 0, 1, 0.88);
    ransomRow('rq', u, 0.12, 860, 330, 0.1, 0.85);
    fileOverlay(u, 0.06, 0.95);
    putK('s_indonesia', slap(at(2, 'sini'), 540, 1100, -3), u, 30);
  },
  // 04 · BPOM bilang aman.
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, shake: [[at(3, 'aman') + 0.1, 10]] }); bg(SET.id, u, true);
    putK('petugas_id_aman', slide(0, 0.2, 540, 660, 0, 800, 0, 0, -0.5), u, 40, { s: 0.98 });
    putK('s_bpom', slap(0.08, 260, 260, -5), u, 41, { s: 0.8 });
    stampAt('st_aman', u, at(3, 'aman') + 0.1, 560, 1030, -7, 0.85);
  },
  // 05 · Kasus pertama, kata Taiwan,   (2010) the Taiwan inspector checks his clipboard
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 880 }); bg(SET.tw, u, true);
    ransomRow('ry10', u, 0.05, 800, 230, 0.07, 0.8);
    putK('petugas_tw_periksa', slide(0.1, 0.32, 470, 690, 0, -800, 0, 0, 0.6), u, 50, { s: 0.98 });
    putK('s_taiwan', slap(at(4, 'taiwan'), 800, 1060, 4), u, 51);
  },
  // 06 · kecap di sachetnya mengandung nipagin,
  (u, T, d) => {
    const tn = at(5, 'nipagin');
    camK(u, [[0, 540, 900, 1.0], [tn - 0.2, 600, 820, 1.18, 'io'], [d, 600, 820, 1.2]]); bg(SET.lab, u, true);
    putK('sachet_tiga', slide(0, 0.22, 540, 640, 2, 0, 900, 0, 0.5), u, 60, { s: 0.95 });
    putK('s_kecap', slap(at(5, 'kecap'), 820, 380, 6), u, 61);
    putK('s_nipagin', slap(tn, 600, 950, -4), u, 62);
  },
  // 07 · zat pengawet. Di Taiwan,
  (u, T, d) => {
    stage(u, d, { z0: 1.18, z1: 1.1, cx: 600, cy: 820 }); bg(SET.lab);
    put('sachet_tiga', 540, 640, 2, 0, 1, 0.95); put('s_kecap', 820, 380, 6); put('s_nipagin', 600, 950, -4);
    putK('s_pengawet', slap(0.1, 600, 1040, 2), u, 70);
    putK('s_taiwan', slap(at(6, 'taiwan'), 330, 330, -5), u, 71);
  },
  // 08 · pengawet ini nggak boleh dipakai.
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, shake: [[at(7, 'nggak'), 12]] }); bg(SET.tw, u, true);
    putK('petugas_tw_tolak', slide(0, 0.2, 540, 650, 0, -800, 0, 0, 0.6), u, 80, { s: 0.98 });
    putK('s_taiwan', slap(0.05, 820, 240, 5), u, 81);
    stampAt('st_dilarang', u, at(7, 'nggak'), 540, 1040, -6, 0.75);
  },
  // 09 · Di Indonesia boleh,
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, shake: [[at(8, 'boleh'), 10]] }); bg(SET.id, u, true);
    putK('petugas_id_aman', slide(0, 0.18, 540, 660, 0, 800, 0, 0, -0.5), u, 90, { s: 0.98 });
    putK('s_indonesia', slap(0.05, 290, 240, -4), u, 91);
    stampAt('st_boleh', u, at(8, 'boleh'), 560, 1030, -6, 0.85);
  },
  // 10 · asal di bawah batas.   the Indonesian gauge: a limit line, the level below it
  (u, T, d) => {
    const tb = at(9, 'batas');
    stage(u, d, { z0: 1.0, z1: 1.08, cy: 820, shake: [[tb, 8]] }); bg(SET.data, u, true);
    putK('meter_id', slide(0, 0.22, 540, 640, 0, 0, 900, 0, 0.5), u, 100, { s: 1.0 });
    putK('s_batas', slap(tb, 540, 1060, 3), u, 101);
  },
  // 11 · BPOM bilang, dua-duanya aman menurut aturan masing-masing.
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 880 }); bg(SET.id, u, true);
    putK('petugas_id_jelaskan', slide(0, 0.22, 540, 660, 0, 0, 900, 0, 0.5), u, 110, { s: 0.98 });
    putK('s_bpom', slap(0.1, 270, 260, -5), u, 111, { s: 0.8 });
    typed('s_masing', u, at(10, 'aman'), 26, 540, 1090, -2);
  },
  // 12 · Selesai? Belum.
  (u, T, d) => {
    const tb = at(11, 'belum');
    stage(u, d, { z0: 1.0, z1: 1.06, shake: [[tb, 14]] }); bg(SET.hook, u, true);
    putK('mi_bungkus', slide(0, 0.2, 540, 600, -3, 0, -900, 0, 0.5), u, 120, { s: 0.85 });
    ransomRow('rq', u, 0.12, 860, 280, 0.1, 0.85);
    stampAt('st_belum', u, tb, 540, 1000, -8, 1.1);
  },
  // 13 · Tiga belas tahun kemudian,   2010 → 2023
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 860 }); bg(SET.data, u, true);
    put('mi_bungkus', 540, 860, -3, 0, 1, 0.5);
    ransomRow('ry10', u, 0.05, 300, 480, 0.06, 0.8);
    arrow(u, 0.3, 0.6, bow([450, 480], [630, 480], 0.2), { seed: 131, head: true });
    ransomRow('ry23', u, at(12, 'tahun'), 790, 480, 0.07, 0.95);
  },
  // 14 · Taiwan kembali menemukan zat sisa pestisida bernama etilen oksida di bumbu Ayam Spesial.   magnifier on the powder; fumigated spice sacks
  (u, T, d) => {
    const te = at(13, 'etilen'), tp = at(13, 'pestisida');
    camK(u, [[0, 540, 900, 1.0], [te - 0.3, 540, 880, 1.04], [te + 0.4, 540, 820, 1.12, 'io'], [d, 540, 820, 1.14]]); bg(SET.lab, u, true);
    putK('kaca_pembesar', slide(0, 0.22, 420, 720, 0, -900, 0, 0, 0.5), u, 140, { s: 0.82 });
    putK('s_taiwan', slap(0.15, 280, 260, -5), u, 141);
    putK('rempah_fumigasi', slide(tp - 0.2, tp + 0.05, 790, 400, 3, 600, 0, 0, -0.5), u, 142, { s: 0.48 });
    putK('s_sisa', slap(tp + 0.3, 760, 620, 2), u, 145, { s: 0.8 });
    putK('s_eto', slap(te, 560, 900, -3), u, 143);
    putK('s_ayam', slap(at(13, 'ayam'), 560, 1040, 2), u, 144);
  },
  // 15 · Di Taiwan, zat ini nggak boleh terdeteksi sedikit pun.   the Taiwan gauge: limit = zero
  (u, T, d) => {
    const ts = at(14, 'sedikit');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 880, shake: [[ts, 12]] }); bg(SET.tw);
    putK('petugas_tw_tolak', [[0, 330, 680, 0, 0, 1]], u, 150, { s: 0.8 });
    putK('meter_tw', slide(0.62, 0.85, 820, 640, 3, 600, 0, 0, -0.5), u, 151, { s: 0.8 });
    putK('s_taiwan', slap(0.62, 330, 240, -4), u, 152);
    stampAt('st_nol', u, ts, 560, 1040, -6, 0.75);
  },
  // 16 · Di Indonesia ada batasnya,
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 880 }); bg(SET.id, u, true);
    putK('petugas_id_jelaskan', slide(0, 0.2, 320, 690, 0, -700, 0, 0, 0.6), u, 160, { s: 0.8 });
    putK('meter_id', slide(0.15, 0.35, 800, 640, 3, 600, 0, 0, -0.5), u, 161, { s: 0.85 });
    putK('s_indonesia', slap(0.05, 320, 240, -4), u, 162);
    putK('s_batas', slap(at(15, 'batasnya'), 800, 1060, 3), u, 163);
  },
  // 17 · dan kata BPOM,
  (u, T, d) => {
    stage(u, d, { z0: 1.05, z1: 1.09, cy: 880 }); bg(SET.id);
    put('petugas_id_jelaskan', 320, 690, 0, 0, 1, 0.8); put('meter_id', 800, 640, 3, 0, 1, 0.85);
    put('s_indonesia', 320, 240, -4); put('s_batas', 800, 1060, 3);
    putK('s_bpom', slap(at(16, 'bpom'), 760, 230, 5), u, 170, { s: 0.75 });
  },
  // 18 · kadarnya jauh di bawah itu.
  (u, T, d) => {
    const tj = at(17, 'jauh');
    camK(u, [[0, 540, 880, 1.09], [tj, 580, 800, 1.1, 'io'], [d, 580, 800, 1.11]], [[at(17, 'bawah'), 8]]); bg(SET.id);
    put('petugas_id_jelaskan', 320, 690, 0, 0, 1, 0.8); put('meter_id', 800, 640, 3, 0, 1, 0.85);
    put('s_indonesia', 320, 240, -4); put('s_bpom', 760, 230, 5, 0, 1, 0.75);
    arrow(u, tj, tj + 0.35, [[960, 470], [960, 800]], { seed: 181, head: true });
    putK('s_jauh', slap(at(17, 'bawah'), 640, 960, -2), u, 180, { s: 0.85 });
  },
  // 19 · Lalu terulang lagi.   (2025)
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, shake: [[at(18, 'terulang'), 10]] }); bg(SET.hook, u, true);
    putK('mi_bungkus', slide(0, 0.18, 540, 620, -3, 0, -900, 0, 0.5), u, 190, { s: 0.85 });
    ransomRow('ry25', u, at(18, 'terulang'), 540, 230, 0.07, 0.95);
    stampAt('st_ditolak_s', u, at(18, 'lagi'), 560, 1000, -7, 0.8);
  },
  // 20 · Satu kiriman Soto Banjar ditolak Taiwan.   one shipment at the port
  (u, T, d) => {
    const td = at(19, 'ditolak');
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 860, shake: [[td, 12]] }); bg(SET.port, u, true);
    putK('kardus_kiriman', slide(0, 0.22, 540, 640, 0, 900, 0, 0, -0.4), u, 200, { s: 1.0 });
    putK('s_kiriman', slap(0.15, 280, 240, -4), u, 201);
    putK('s_soto', slap(at(19, 'soto'), 760, 300, 4), u, 202);
    stampAt('st_ditolak', u, td, 540, 1030, -6, 0.75);
  },
  // 21 · Kata BPOM, kiriman itu bukan ekspor resmi dari pabriknya.   the route from the factory to that box is crossed out
  (u, T, d) => {
    const tb = at(20, 'bukan');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 880 }); bg(SET.port);
    putK('pabrik_mi', slide(0, 0.22, 720, 500, 2, 700, 0, 0, -0.5), u, 210, { s: 0.6 });
    put('kardus_kiriman', 300, 860, 0, 0, 1, 0.45);
    putK('s_bpom', slap(0.1, 270, 240, -5), u, 211, { s: 0.75 });
    route(u, 0.6, tb, bow([620, 680], [400, 800], 0.2), { seed: 212, dash: [16, 12] });
    stampAt('m_cross_s', u, tb + 0.1, 520, 740, 0, 1.2);
    stampAt('st_bukan', u, at(20, 'resmi'), 560, 1060, -4, 0.75);
  },
  // 22 · Indofood bilang, di sampel batch yang sama,
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 880 }); bg(SET.lab, u, true);
    putK('pihak_indofood', slide(0, 0.2, 540, 660, 0, 0, 900, 0, 0.5), u, 220, { s: 0.98 });
    putK('s_indofood', slap(0.05, 300, 240, -4), u, 221);
    putK('s_batch', slap(at(21, 'sampel'), 560, 1090, 2), u, 222);
  },
  // 23 · zat itu nggak terdeteksi.
  (u, T, d) => {
    const tt = at(22, 'terdeteksi');
    stage(u, d, { z0: 1.06, z1: 1.1, cy: 880, shake: [[tt, 10]] }); bg(SET.lab);
    put('pihak_indofood', 540, 660, 0, 0, 1, 0.98); put('s_indofood', 300, 240, -4);
    stampAt('st_tidak', u, tt, 560, 1020, -5, 0.8);
  },
  // 24 · Satu merek, dua jawaban.   split table: the Taiwan inspector says no, the BPOM man says yes
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 900 }); bg(SET.split, u, true);
    putK('petugas_tw_tolak', slide(0, 0.18, 280, 680, 0, -600, 0, 0, 0.6), u, 240, { s: 0.68 });
    putK('petugas_id_aman_m', slide(0.05, 0.23, 800, 680, 0, 600, 0, 0, -0.6), u, 241, { s: 0.68 });
    putK('s_merek', slap(0.1, 540, 220, -3), u, 242);
    putK('mi_bungkus', slap(0.2, 540, 360, 3), u, 245, { s: 0.3 });
    putK('s_taiwan', slap(at(23, 'dua'), 280, 1050, -3), u, 243);
    putK('s_indonesia', slap(at(23, 'jawaban'), 800, 1050, 3), u, 244);
  },
  // 25 · Jadi mi instan yang selalu ada di dapur rumah kita…
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.08, cy: 860 }); bg(SET.end, u, true);
    putK('dapur', slide(0, 0.25, 540, 640, 0, 0, 900, 0, 0.5), u, 250, { s: 1.0 });
    typed('s_dapur', u, at(24, 'dapur'), 20, 540, 1100, -2);
  },
  // 26 · ternyata dinilai pakai standar keamanan yang beda di tiap negara.   the balance tips; the pack returns to frame 0
  (u, T, d) => {
    const ts = at(25, 'standar'), tb = at(25, 'beda');
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 860, shake: [[tb, 8]] }); bg(SET.hook, u, true);
    putK('timbangan', slide(0, 0.22, 540, 450, 0, 0, -900, 0, 0.5), u, 260, { s: 0.86 });
    putK('s_standar', slap(ts, 540, 1110, -2), u, 261);
    putK('s_tw_nol', slap(tb, 310, 650, -4), u, 262, { s: 0.95 });
    putK('s_bpom_batas', slap(tb + 0.15, 770, 565, 4), u, 263, { s: 0.95 });
    putK('mi_bungkus', drop(at(25, 'tiap') - 0.1, at(25, 'tiap') + 0.15, 540, 880, -3, 900), u, 264, { s: 0.62 });
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(indomie|ditolak|taiwan|bpom|aman|nipagin|belum|etilen|oksida|batas|indofood|standar|beda)/i } });
}
export const renderAt = t => film.renderAt(t);
