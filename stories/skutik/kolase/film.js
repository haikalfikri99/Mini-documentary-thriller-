// ARSIP #005 Skutik · ARSIP Kolase. 29 shots on the VO timing (vo_words.json); each shot is a small paper table with its own camera.
// Caption band y 1210–1536 stays clear: every piece lives in y 120–1190. Characters: pihak YAMAHA = grey hair + glasses (navy suit),
// pihak HONDA = moustache + striped tie; KPPU = the referee from #004 (same man, same polo); "kamu" = the buyer in the light T-shirt.
import { W, H, SP, PAL, setCtx, loadAll, put, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow, cam, applyCam, shake } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0.0, 3.52, 5.5, 7.94, 9.46, 10.88, 12.4, 14.7, 15.98, 17.9, 19.36, 20.42, 23.02, 24.66, 26.68, 28.58, 31.2, 33.48,
  34.62, 37.2, 39.56, 41.34, 42.68, 46.58, 48.44, 49.52, 50.54, 53.1, 54.28, 56.35];
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

const SET = {
  hook: [['f_red', 540, 250, -6], ['f_amber', 930, 1120, 0], ['f_cream', 540, 1570, -3]],
  dealer: [['f_green', 280, 330, -8], ['f_amber_s', 940, 1080, 0], ['f_cream', 540, 1560, 2]],
  price: [['f_manila', 560, 760, 3], ['f_green_s', 950, 230, 0], ['f_cream', 540, 1565, -2]],
  ref: [['f_green', 540, 600, 4], ['f_amber_s', 900, 230, 0], ['f_cream', 520, 1560, -2]],
  golf: [['f_green', 540, 640, -3], ['f_amber_s', 140, 1080, 0], ['f_cream', 540, 1560, 2]],
  doc: [['f_news', 520, 760, -2], ['f_amber_s', 120, 1120, 0]],
  deny: [['f_manila', 400, 760, -3], ['f_red', 760, 230, 8]],
  court: [['f_green', 520, 560, -4], ['f_manila', 600, 1120, 2], ['f_cream', 540, 1570, 2]],
  road: [['f_amber', 540, 640, 0], ['f_cream', 540, 1560, 2]],
  end: [['f_amber', 540, 700, 0], ['f_green_s', 140, 220, 0], ['f_cream', 540, 1565, -2]],
};
const camK = (u, keys, sh = []) => { let o = [0, 0]; for (const [t0, a] of sh) { const s = shake(u, t0, a); o = [o[0] + s[0], o[1] + s[1]]; } applyCam(cam(keys, u), o); };
// the two scooters of frame 0 (HONDA-style sporty one on the left facing right, YAMAHA-style rounded one on the right facing left)
function duoScoot(u, s = 0.8, y = 650, enter = -1) {
  if (enter >= 0) {
    putK('skutik_b', [[enter, -300, y, -4, 1.5, 1, null, 0, s], [enter + 0.22, 300, y, -2, 0, 1, 'in', 1.4, s]], u, 11);
    putK('skutik_a', [[enter, 1380, y + 10, 4, 1.5, 1, null, 0, s], [enter + 0.22, 790, y + 10, 2, 0, 1, 'in', 1.4, s]], u, 12);
  } else { put('skutik_b', 300, y, -2, 0, 1, s); put('skutik_a', 790, y + 10, 2, 0, 1, s); }
  return { b: [300, y], a: [790, y + 10] };
}

const SHOTS = [
  // 01 · Yamaha dan Honda didenda empat puluh tujuh koma lima miliar.   both scooters crash in at 0.00, the fine is on the table, DIDENDA at 0.14
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.08, cy: 880, shake: [[0.0, 8], [0.14, 12], [at(0, 'didenda'), 10]] }); bg(SET.hook);
    putK('skutik_b', [[0, 250, 650, -4, 1.0, 1, null, 0, 0.84], [0.12, 300, 650, -2, 0, 1, 'in', 1.4, 0.8]], u, 11);
    putK('skutik_a', [[0, 840, 660, 4, 1.0, 1, null, 0, 0.84], [0.12, 790, 660, 2, 0, 1, 'in', 1.4, 0.8]], u, 12);
    putK('s_475', [[0, 540, 225, -3, 2, 1, null, 0, 1.06], [0.08, 540, 235, -3, 0, 1, 'in', 1.0, 0.92]], u, 3);
    putK('s_yamaha', slap(Math.max(0.3, at(0, 'yamaha')), 800, 410, 4), u, 4);
    putK('s_honda', slap(at(0, 'honda'), 290, 400, -4), u, 5);
    stampAt('st_denda', u, 0.14, 540, 1060, -8, 1.0);
  },
  // 02 · Gara-gara harga motor matik kayak gini.   the hand flips the price tag hanging from the handlebar
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.1, cx1: 600, cy: 760 }); bg(SET.price, u, true);
    putK('tangan_label', slide(0, 0.22, 540, 640, 0, 900, 0, 0, -0.6), u, 20, { s: 0.95 });
    putK('tag_a', slap(at(1, 'harga'), 760, 950, 6), u, 21, { s: 0.85 });
    putK('s_matik', slap(at(1, 'motor'), 540, 200, -3), u, 22);
  },
  // 03 · Di dealer, kamu kira mereka bersaing ketat,   you, comparing two tags (ARSIP file overlay over the first second)
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 860 }); bg(SET.dealer);
    putK('pembeli_banding', slide(0, 0.25, 560, 690, 0, 0, 900, 0, 0.6), u, 30, { s: 0.9 });
    putK('s_dealer', slap(0.2, 260, 1080, -4), u, 31);
    putK('s_kamu', slap(at(2, 'kamu'), 860, 330, 6), u, 32);
    typed('s_ketat', u, at(2, 'bersaing'), 22, 700, 1110, -2);
    fileOverlay(u, 0.04, 1.0);
  },
  // 04 · jadi harganya adu murah.
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, shake: [[at(3, 'murah'), 9]] }); bg(SET.price);
    put('skutik_b', 290, 560, -2, 0, 1, 0.6); put('skutik_a', 800, 570, 2, 0, 1, 0.6);
    putK('tag_murah', slap(at(3, 'harganya'), 300, 920, -6), u, 40, { s: 0.85 });
    putK('tag_murah', slap(at(3, 'murah'), 780, 960, 5), u, 41, { s: 0.85 });
    arrow(u, at(3, 'adu'), at(3, 'adu') + 0.35, bow([420, 780], [660, 780], 0.25), { seed: 42, head: true });
  },
  // 05 · Tapi KPPU,   the referee from #004 blows the whistle
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, shake: [[0.05, 10]] }); bg(SET.ref, u, true);
    putK('wasit_tiup', [[0, 540, 700, -3, 3, 1, null, 0, 1.0], [0.1, 540, 690, -2, 0, 1, 'in', 1.2, 0.92]], u, 50);
    putK('s_kppu', slap(at(4, 'kppu'), 300, 1000, -6), u, 51, { s: 0.8 });
    putK('s_kppu2', slap(at(4, 'kppu') + 0.3, 540, 190, 2), u, 52);
  },
  // 06 · wasitnya persaingan bisnis,
  (u, T, d) => {
    stage(u, d, { z0: 1.03, z1: 1.1, cy: 860 }); bg(SET.ref);
    put('wasit_tiup', 540, 690, -2, 0, 1, 0.92);
    put('s_kppu', 300, 1000, -6, 0, 1, 0.8);
    putK('s_wasit', slap(at(5, 'wasitnya'), 560, 200, -2), u, 60, { s: 0.85 });
  },
  // 07 · menuduh mereka diam-diam janjian harga.   the two company men whisper (HONDA left, YAMAHA right)
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 880, shake: [[at(6, 'janjian'), 10]] }); bg(SET.deny, u, true);
    putK('duo_bisik', slide(0, 0.22, 540, 660, 0, 0, -900, 0, 0.6), u, 70, { s: 0.92 });
    putK('s_honda', slap(at(6, 'mereka'), 300, 300, -5), u, 71);
    putK('s_yamaha', slap(at(6, 'mereka') + 0.15, 780, 300, 4), u, 72);
    stampAt('st_janjian', u, at(6, 'janjian'), 540, 1060, -6, 0.66);
  },
  // 08 · Kalau pesaing janjian,   push in on the whisper, an equals sign between the two
  (u, T, d) => {
    camK(u, [[0, 540, 880, 1.0], [d, 540, 560, 1.35, 'io']]); bg(SET.deny);
    put('duo_bisik', 540, 660, 0, 0, 1, 0.92);
    put('s_honda', 300, 300, -5); put('s_yamaha', 780, 300, 4);
    stampAt('m_eq', u, at(7, 'janjian'), 540, 300, 0, 1.0);
  },
  // 09 · pembeli kehilangan pilihan yang lebih murah.   the buyer shrugs: both tags now say the same
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, shake: [[at(8, 'murah'), 9]] }); bg(SET.dealer);
    putK('pembeli_kecewa', slide(0, 0.22, 540, 640, 0, 0, 900, 0, 0.6), u, 90, { s: 0.92 });
    putK('s_pembeli', slap(0.1, 540, 200, -3), u, 91);
    putK('tag_sama', slap(at(8, 'pilihan'), 250, 1040, -6), u, 92, { s: 0.7 });
    putK('tag_sama', slap(at(8, 'pilihan') + 0.2, 830, 1040, 5), u, 93, { s: 0.7 });
  },
  // 10 · Buktinya? Lapangan golf.
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.08, cy: 800, shake: [[0.1, 10]] }); bg(SET.golf, u, true);
    putK('golf_lapangan', slide(0, 0.2, 540, 640, 0, 0, -900, 0, 0.5), u, 100, { s: 1.0 });
    stampAt('st_bukti', u, 0.1, 540, 1030, -6, 0.9);
    putK('s_golf', slap(at(9, 'lapangan'), 540, 210, -3), u, 101);
  },
  // 11 · Kata KPPU,   the referee steps onto the golf course
  (u, T, d) => {
    stage(u, d, { z0: 1.06, z1: 1.1, cy: 760 }); bg(SET.golf);
    put('golf_lapangan', 540, 640, 0, 0, 1, 1.0); put('s_golf', 540, 210, -3);
    putK('wasit_tiup', slide(0, 0.2, 770, 760, -2, 600, 0, 0, -0.6), u, 110, { s: 0.6 });
    putK('s_kppu', slap(at(10, 'kppu'), 300, 930, -4), u, 111, { s: 0.6 });
  },
  // 12 · bos-bos kedua perusahaan pernah ketemu di sana.   the same two men, same suits, shaking hands on the green
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 860 }); bg(SET.golf);
    putK('duo_golf', slide(0, 0.22, 540, 680, 0, 0, 900, 0, 0.6), u, 120, { s: 0.98 });
    putK('s_bos', slap(at(11, 'bos'), 540, 215, -2), u, 121, { s: 0.92 });
    putK('s_yamaha', slap(at(11, 'perusahaan'), 300, 1100, -4), u, 122);
    putK('s_honda', slap(at(11, 'perusahaan') + 0.15, 790, 1100, 4), u, 123);
  },
  // 13 · Habis itu, lewat email,   the envelope flies in (2015)
  (u, T, d) => {
    const te = at(12, 'email');
    stage(u, d, { z0: 1.0, z1: 1.06 }); bg(SET.doc, u, true);
    putK('amplop', [[0.1, 120, 900, -20, 1, 1, null, 0, 0.6], [te, 540, 640, -6, 0, 1, 'in', 1.2, 1.25]], u, 130);
    if (u > 0.1 && u < te) route(u, 0.1, te, bow([0, 960], [400, 700], 0.1), { seed: 131, dash: [14, 12] });
    ransomRow('ry15', u, at(12, 'lewat'), 540, 200, 0.07, 0.8);
    putK('s_email', slap(te + 0.1, 540, 990, -3), u, 132);
  },
  // 14 · Yamaha disuruh ngikutin harga Honda.   the Yamaha man reads the instruction
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 860 }); bg(SET.doc);
    putK('pihak_a_baca', slide(0, 0.22, 420, 690, 0, -800, 0, 0, 0.6), u, 140, { s: 0.88 });
    putK('s_pihak_y', slap(0.15, 420, 230, -3), u, 141, { s: 0.85 });
    putK('amplop', slap(0.3, 850, 470, 10), u, 142, { s: 0.5 });
    typed('s_ikut', u, at(13, 'ngikutin'), 26, 640, 1110, -2);
  },
  // 15 · Dan harganya… beneran disesuaikan.   back to the tag: it flips to SAMA
  (u, T, d) => {
    const tds = at(14, 'disesuaikan');
    camK(u, [[0, 540, 800, 1.0], [tds, 620, 900, 1.18, 'io'], [d, 620, 900, 1.2]], [[tds, 12]]); bg(SET.price);
    put('tangan_label', 540, 640, 0, 0, 1, 0.95);
    if (u < tds) put('tag_a', 760, 1030, 6, 0, 1, 0.85);
    putK('tag_sama', slap(tds, 760, 1025, -4), u, 150, { s: 0.85 });
  },
  // 16 · Yamaha kena denda dua puluh lima miliar.   the Yamaha factory gets its stamp
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 840, shake: [[at(15, 'denda'), 12]] }); bg(SET.hook, u, true);
    putK('pabrik_motor', slide(0, 0.22, 540, 560, 0, -900, 0, 0, 0.5), u, 160, { s: 0.85 });
    putK('s_yamaha', slap(0.1, 270, 240, -4), u, 161, { s: 1.2 });
    stampAt('st_denda', u, at(15, 'denda'), 560, 760, -7, 0.8);
    putK('s_25', slap(at(15, 'dua'), 540, 1040, -3), u, 162);
  },
  // 17 · Honda, dua puluh dua koma lima miliar.   the Honda factory + the two fines as bars
  (u, T, d) => {
    const tdu = at(16, 'dua');
    stage(u, d, { z0: 1.0, z1: 1.05, shake: [[at(16, 'miliar'), 10]] }); bg(SET.hook);
    putK('pabrik_motor_m', slide(0, 0.2, 540, 470, 0, 900, 0, 0, -0.5), u, 170, { s: 0.7 });
    putK('s_honda', slap(0.05, 820, 230, 4), u, 171, { s: 1.2 });
    stampAt('st_denda', u, at(16, 'miliar'), 600, 560, -7, 0.62);
    putK('bars', slide(tdu - 0.1, tdu + 0.15, 540, 960, -1, 0, 700, 0, 0.5), u, 172, { s: 0.95 });
  },
  // 18 · Dua-duanya membantah.   both men push back (head sizes matched)
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.05, shake: [[at(17, 'membantah'), 12]] }); bg(SET.deny, u, true);
    putK('pihak_a_bantah', slide(0, 0.2, 285, 690, 0, -700, 0, 0, 0.6), u, 180, { s: 0.7 });
    putK('pihak_b_bantah', slide(0.05, 0.25, 800, 700, 0, 700, 0, 0, -0.6), u, 181, { s: 0.77 });
    stampAt('st_dibantah', u, at(17, 'membantah'), 540, 1090, -5, 0.85);
  },
  // 19 · Yamaha bilang, golf dan email itu bukan bukti.
  (u, T, d) => {
    const tb = at(18, 'bukan');
    stage(u, d, { z0: 1.0, z1: 1.05, cy: 880 }); bg(SET.deny);
    putK('pihak_a_bantah', slide(0, 0.2, 360, 700, 0, -800, 0, 0, 0.6), u, 190, { s: 0.82 });
    putK('s_pihak_y', slap(0.05, 360, 230, -3), u, 191, { s: 0.85 });
    putK('golf_lapangan', slap(at(18, 'golf'), 830, 500, 4), u, 192, { s: 0.36 });
    putK('amplop', slap(at(18, 'email'), 830, 760, -6), u, 193, { s: 0.55 });
    stampAt('m_cross_s', u, tb, 830, 640, 0, 1.4);
    putK('s_bukan', slap(at(18, 'bukti'), 790, 1080, -3), u, 194);
  },
  // 20 · Honda bilang, nggak mungkin mereka atur harga.
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 860 }); bg(SET.deny);
    putK('pihak_b_bantah', slide(0, 0.2, 560, 690, 0, 800, 0, 0, -0.6), u, 200, { s: 0.88 });
    putK('s_pihak_h', slap(0.05, 560, 230, 3), u, 201, { s: 0.85 });
    typed('s_mustahil', u, at(19, 'nggak'), 24, 540, 1110, -2);
  },
  // 21 · Mereka bawa kasus ini ke pengadilan.   (Pengadilan Negeri, 2017)
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.06, cy: 820 }); bg(SET.court, u, true);
    putK('court', slide(0, 0.25, 540, 600, 0, 0, -1000, 0, 0.6), u, 210, { s: 0.85 });
    ransomRow('ry17', u, at(20, 'kasus'), 540, 190, 0.07, 0.8);
    putK('s_pn', slap(at(20, 'pengadilan'), 540, 1060, -3), u, 211);
  },
  // 22 · Lolos? Nggak.
  (u, T, d) => {
    const tn = at(21, 'nggak');
    stage(u, d, { z0: 1.0, z1: 1.06, shake: [[tn, 14]] }); bg(SET.court);
    putK('gavel', [[0, 540, 560, -8, 2, 1, null, 0, 1.0], [tn, 540, 640, 0, 0, 1, 'in', 1.4, 1.05]], u, 220);
    ransomRow('rq', u, 0.1, 860, 260, 0.1, 0.9);
    stampAt('st_nggak', u, tn, 540, 1040, -8, 1.0);
  },
  // 23 · Pengadilan sampai Mahkamah Agung tetap memihak KPPU.   tight on two scooters in the dock, pull back to the grand court; the referee wins
  (u, T, d) => {
    const tm = at(22, 'mahkamah'), tp = at(22, 'memihak');
    camK(u, [[0, 490, 730, 2.2], [tm - 0.1, 495, 735, 2.3], [tm + 0.7, 540, 660, 1.0, 'io'], [d, 540, 660, 1.03]], [[tp, 12]]); bg(SET.court);
    put('skutik_sidang', 540, 640, 0, 0, 1, 1.0);
    if (u > tm + 0.7) putK('s_ma', slap(tm + 0.7, 540, 200, -3), u, 230);
    putK('wasit_kartu_m', slide(tp - 0.3, tp, 820, 640, 2, 600, 0, 0, -0.6), u, 231, { s: 0.5 });
    stampAt('st_menang', u, tp + 0.05, 500, 800, -6, 0.72);
    if (u > tp + 0.4) ransomRow('ry19', u, tp + 0.4, 250, 330, 0.07, 0.7);
  },
  // 24 · Di jalanan kelihatan musuhan.   the two scooters race
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.08, cx1: 520 }); bg(SET.road, u, true);
    const f = EASE.lin(seg(stepT(u), 0, d)), bob = Math.abs(Math.sin(stepT(u) * 14)) * -6;
    put('skutik_balap', 600 - 90 * f, 660 + bob, -1, 0, 1, 1.0);
    putK('s_jalan', slap(at(23, 'jalanan'), 540, 220, -3), u, 240);
    ransomRow('rq', u, at(23, 'musuhan') + 0.2, 540, 1080, 0.1, 0.8);
  },
  // 25 · Di lapangan golf…
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.1, cy: 700 }); bg(SET.golf, u, true);
    putK('golf_lapangan', slide(0, 0.2, 540, 640, 0, 0, 900, 0, 0.5), u, 250);
    putK('s_golf', slap(at(24, 'lapangan'), 540, 230, 3), u, 251);
  },
  // 26 · ternyata sepakat.   zoom on the handshake
  (u, T, d) => {
    const ts = at(25, 'sepakat');
    camK(u, [[0, 540, 760, 1.0], [d, 522, 768, 1.3, 'io']], [[ts, 12]]); bg(SET.golf);
    put('duo_golf', 540, 680, 0, 0, 1, 0.98);
    stampAt('st_sepakat', u, ts, 522, 900, -7, 0.8);
  },
  // 27 · Jadi tiap kamu bandingin harga motor matik di dealer…   back to frame 0's table, a tag on each scooter
  (u, T, d) => {
    stage(u, d, { z0: 1.0, z1: 1.04, cy: 880 }); bg(SET.hook, u, true);
    duoScoot(u, 0.8, 650, 0);
    putK('s_kamu', slap(at(26, 'kamu'), 540, 230, -4), u, 271);
    putK('tag_a', slap(at(26, 'bandingin'), 290, 1000, -6), u, 272, { s: 0.7 });
    putK('tag_a', slap(at(26, 'harga'), 800, 1010, 5), u, 273, { s: 0.7 });
  },
  // 28 · menurut KPPU,
  (u, T, d) => {
    stage(u, d, { z0: 1.04, z1: 1.07, cy: 880 }); bg(SET.hook);
    duoScoot(u);
    put('tag_a', 290, 1000, -6, 0, 1, 0.7); put('tag_a', 800, 1010, 5, 0, 1, 0.7);
    putK('s_kppu', slap(at(27, 'kppu'), 540, 240, -4), u, 281, { s: 0.7 });
  },
  // 29 · harganya pernah diatur dari lapangan golf.   both tags turn SAMA, the golf flag is planted between them (then the loop hits frame 0)
  (u, T, d) => {
    const tg = at(28, 'lapangan');
    stage(u, d, { z0: 1.07, z1: 1.02, cy: 880, shake: [[tg + 0.2, 12]] }); bg(SET.hook);
    duoScoot(u);
    put('s_kppu', 540, 240, -4, 0, 1, 0.7);
    putK('tag_sama', slap(at(28, 'harganya') + 0.1, 290, 1000, -6), u, 291, { s: 0.7 });
    putK('tag_sama', slap(at(28, 'harganya') + 0.25, 800, 1010, 5), u, 292, { s: 0.7 });
    putK('s_diatur', slap(at(28, 'diatur'), 540, 380, -2), u, 293, { s: 0.85 });
    putK('flag', drop(tg, tg + 0.2, 545, 840, 4, 900), u, 294, { s: 0.75 });
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words,
    caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(yamaha|honda|didenda|denda|kppu|golf|email|janjian|murah|membantah|nggak|sepakat|mahkamah|matik)/i } });
}
export const renderAt = t => film.renderAt(t);
