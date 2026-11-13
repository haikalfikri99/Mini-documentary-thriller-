// ARSIP #003 Micin · ARSIP Kolase. 25 shots on the VO timing; each shot is a little paper table with its own camera.
import { W, H, SP, PAL, setCtx, getCtx, loadAll, put, putA, putK, has, slap, slide, drop, rest, stampAt, drawPaper, cam, applyCam, shake,
  typed, createFilm, seg, EASE, stepT, hash, M } from './lib/engine.js';

export const START = [0, 1.66, 3.98, 6.86, 9.24, 11.10, 16.04, 18.04, 20.62, 22.32, 23.82, 26.00, 27.40, 29.20, 31.96, 33.10, 35.78, 36.76, 38.98, 42.08, 43.04, 45.92, 48.50, 52.54, 54.32, 56.6];
export const DUR = 56.6;
let WORDS = [], film = null, ctx = null;

// time of a spoken word (shot-local), searching from shot start
const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
function at(i, word, k = 0) {
  const w0 = START[i] - 0.05, hits = WORDS.filter(w => w.s >= w0 && norm(w.w).startsWith(norm(word)));
  return hits.length > k ? hits[k].s - START[i] : 0.3;
}

// ---------- table backgrounds: torn colour fields resting under each scene ----------
const BG = {
  hook: [['f_green', 260, 330, -8], ['f_amber', 900, 1160, 0], ['f_cream', 540, 1560, -3]],
  letter: [['f_manila', 560, 820, 3], ['f_green_s', 960, 260, 0], ['f_cream', 520, 1560, 2]],
  resto: [['f_red', 540, 260, -6], ['f_amber', 120, 1020, 0], ['f_cream', 560, 1570, -2]],
  news: [['f_news', 520, 800, -2], ['f_green', 960, 1500, 12]],
  globe: [['f_green', 540, 760, 4], ['f_amber_s', 860, 360, 0]],
  lab: [['f_green', 540, 520, -3], ['f_manila', 420, 1180, 2], ['f_amber_s', 940, 1060, 0]],
  enemy: [['f_red', 540, 760, 8], ['f_cream', 540, 1560, -2]],
  test: [['f_manila', 540, 820, -2], ['f_amber_s', 140, 300, 0], ['f_cream', 540, 1570, 2]],
  safe: [['f_manila', 540, 760, 2], ['f_green_s', 900, 300, 0], ['f_cream', 540, 1560, -3]],
  milk: [['f_amber', 540, 640, 0], ['f_cream', 540, 1560, 2]],
  chart: [['f_cream', 540, 1180, -1], ['f_amber_s', 860, 380, 0], ['f_green_s', 180, 520, 0]],
  bet: [['f_red', 540, 1080, -10], ['f_manila', 760, 640, 4]],
};
function bg(set, u = 9, enter = false) {
  drawPaper();
  for (const [n, x, y, r] of BG[set]) {
    if (!has(n)) continue;
    if (enter) putK(n, slide(0, 0.3, x, y, r, (x < 540 ? -700 : 700), 0, 0, 0.4), u, hash(x, y) * 999 | 0); else put(n, x, y, r);
  }
}
function stage(u, d, o = {}) {
  const c = cam([[0, o.cx ?? 540, o.cy ?? 960, o.z0 ?? 1], [d, o.cx1 ?? o.cx ?? 540, o.cy1 ?? o.cy ?? 960, o.z1 ?? 1.05, o.ease || 'io']], u);
  let sh = [0, 0]; for (const [t0, a] of (o.shake || [])) { const s = shake(u, t0, a); sh = [sh[0] + s[0], sh[1] + s[1]]; }
  applyCam(c, sh);
}
const ransomRow = (prefix, u, t0, x, y, gap = 0.1, s = 1) => {
  const names = M._ransom[prefix]; let cx = x - names.reduce((a, n) => a + (n ? SP[n].img.width / SP[n].k * s * 0.92 : 40), 0) / 2;
  names.forEach((n, i) => {
    if (!n) { cx += 40; return; } const w = SP[n].img.width / SP[n].k * s * 0.92;
    putK(n, slap(t0 + i * gap, cx + w / 2, y + (i % 2 ? 8 : -6), [-6, 4, -3, 5, -4, 3][i % 6]), u, 300 + i, { s });
    cx += w;
  });
};
function heartbeat(u, t0) { const p = (stepT(u) - t0) % 0.5; return p < 1 / 12 ? 1.12 : p < 2 / 12 ? 1.04 : 1; }

// ---------- the 25 shots: (u = shot time, T = film time, d = shot length) ----------
const SHOTS = [
  // 01 · Micin dituduh bikin bodoh.  Hero object at frame 0, crystals already flying, the stamp hits at once
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.08, cy: 900, shake: [[0.12, 10]] }); bg('hook');
    putK('sachet', [[0, 540, 690, -4, 1.4, 1, null, 0, 1.03], [0.12, 540, 700, -3, 0, 1, 'in', 1.2]], u, 1, { s: 1.3 });
    [[-330, -150, -40], [300, -190, 25], [-120, -300, 70], [380, -40, -60]].forEach(([dx, dy, rr], i) =>
      putK('xtal' + i, [[0, 540 + dx * 0.25, 300, 0, 2, 1], [0.9 + i * 0.1, 540 + dx, 300 + dy, rr, 3, 1, 'out']], u, 10 + i, { s: 1.5 }));
    stampAt('st_bodoh', u, 0.12, 560, 1010, -9, 1.45);
  },
  // 02 · Padahal semuanya berawal dari satu surat.
  (u, T, d) => {
    stage(u, d, { z1: 1.06, cy: 900 }); bg('hook');
    putK('envelope', slide(0, 0.32, 540, 820, 3, 900, -60, 12, 1.0), u, 2, { s: 1.35 });
    if (has('stamp1968')) putK('stamp1968', slap(0.62, 765, 715, 6), u, 3, { s: 1 });
    stampAt('st_post', u, 0.95, 720, 700, -12, 1.3);
    ransomRow('ry68', u, 1.2, 540, 420, 0.11, 1.1);
  },
  // 03 · Ada dokter yang nulis surat ke jurnal kedokteran Amerika:  (+ the ARSIP case-file tab, overlay <= 1.3 s)
  (u, T, d) => {
    stage(u, d, { z0: 1, z1: 1.16, cy: 900, cy1: 860, cx1: 520 }); bg('letter');
    putK('letter', slide(0, 0.3, 540, 820, -2, 0, 1200, 0, 0.6), u, 4);
    const out = 1.35;
    const fk = [[0.08, -520, 330, -4, 2, 1], [0.32, 430, 330, -3, 0, 1, 'back', 0.8], [out, 430, 330, -3, 0, 1, 'hold'], [out + 0.3, -620, 300, -8, 2, 1, 'in']];
    if (u < out + 0.32) {
      putK('folder', fk, u, 5);
      const p = putK('lbl_case', [[0.3, 300, 380, -4, 3, 1, null, 0, 1.1], [0.42, 300, 380, -4, 0, 1, 'in', 0.9], [out, 300, 380, -4, 0, 1, 'hold'], [out + 0.3, -700, 360, -8, 2, 1, 'in']], u, 6);
      putK('lbl_case2', [[0.45, 560, 400, 3, 3, 1, null, 0, 1.1], [0.56, 560, 400, 3, 0, 1, 'in', 0.9], [out, 560, 400, 3, 0, 1, 'hold'], [out + 0.3, -400, 380, -8, 2, 1, 'in']], u, 7);
      if (u < out) stampAt('st_dibuka', u, 0.7, 700, 520, -10, 1);
    }
    typed('s_jurnal', u, 1.7, 26, 540, 1120, 1.5);
  },
  // 04 · tiap habis makan di restoran Tionghoa,
  (u, T, d) => {
    stage(u, d, { z1: 1.05 }); bg('resto');
    { const sw = Math.sin(stepT(u) * 4.2) * 7 * Math.exp(-u * 0.6); putA('lantern', 860, 120, 0.5, 0.02, sw, 0.5); }
    putK('meal', slide(0, 0.35, 540, 780, -2, -900, 0, 0, 0.8), u, 8);
    putK('bowl', slap(0.6, 760, 1090, -3), u, 9, { s: 0.8 });
  },
  // 05 · tengkuknya kebas, jantungnya deg-degan.
  (u, T, d) => {
    stage(u, d, { cy: 860, z0: 1.0, z1: 1.08 }); bg('resto');
    putK('patient', slap(0.0, 500, 760, 2, -20, -40), u, 10);
    const hb = at(4, 'jantung');
    if (has('heart') && u > hb - 0.1) putK('heart', [[hb - 0.1, 800, 980, 8, 3, 1, null, 0, 0.8], [hb + 0.05, 800, 980, 8, 0, 1, 'back', 1]], u, 11, { s: heartbeat(u, hb) });
  },
  // 06 · Dia sendiri nggak yakin penyebabnya. Bisa arak masak, bisa garam, bisa micin.
  (u, T, d) => {
    stage(u, d, { z0: 1, z1: 1.04 }); bg('resto');
    putK('patient', [[0, 330, 470, -4, 0, 1]], u, 12, { s: 0.48 });
    ransomRow('rq', u, 0.5, 800, 430, 0.1, 1.3);
    const items = [['bottle', 's_arak', 260, at(5, 'arak')], ['salt', 's_garam', 540, at(5, 'garam')], ['sachet', 's_micin', 820, at(5, 'micin')]];
    items.forEach(([n, sl, x, t0], i) => {
      if (has(n)) putK(n, slap(t0, x, 880, [-4, 3, 5][i]), u, 20 + i, { s: n === 'sachet' ? 0.42 : 1 });
      putK(sl, slap(t0 + 0.15, x, 1110, [3, -2, -4][i]), u, 30 + i);
    });
  },
  // 07 · Tapi koran cuma ingat micin.
  (u, T, d) => {
    const tm = at(6, 'micin');
    stage(u, d, { z1: 1.06, shake: [[0.0, 7], [tm, 12]] }); bg('news');
    putK('newspaper', slap(0.0, 540, 800, -2, -20, -60), u, 40);
    ransomRow('rmic', u, tm, 540, 640, 0.07, 1.25);
    putK('hand', slide(tm + 0.35, tm + 0.6, 760, 900, -150, 600, 200, 0, 0.8), u, 42, { s: 0.8 });
  },
  // 08 · Lahirlah istilah sindrom restoran Tionghoa, dan beritanya
  (u, T, d) => {
    stage(u, d, { cy: 700, z0: 1.12, z1: 1.18 }); bg('news');
    put('newspaper', 540, 800, -2);
    typed('s_sindrom', u, at(7, 'sindrom') - 0.1, 30, 540, 900, -2, 0);
  },
  // 09 · nyebar ke mana-mana.
  (u, T, d) => {
    stage(u, d, { z0: 1.06, z1: 1 }); bg('globe');
    if (has('globe')) putK('globe', [[0, 540, 760, 0, 0, 1], [d, 540, 760, 4, 0, 1, 'lin']], u, 41);
    [[220, 360, -12], [860, 520, 10], [190, 1020, 8], [880, 1080, -9], [540, 1170, 3]].forEach(([x, y, r], i) => putK('clip' + i, slap(0.08 + i * 0.22, x, y, r), u, 50 + i));
  },
  // 10 · Setahun kemudian, ilmuwan
  (u, T, d) => {
    stage(u, d, { z1: 1.05 }); bg('lab', u, true);
    ransomRow('ry69', u, 0.1, 540, 300, 0.09, 1.1);
    if (has('scientist')) putK('scientist', slide(0.25, 0.6, 540, 820, 0, 0, 1000, 0, 0.7), u, 60);
    else if (has('microscope')) putK('microscope', slide(0.25, 0.6, 540, 820, 0, 0, 1000, 0, 0.7), u, 60);
  },
  // 11 · menyuntikkan micin ke bayi-bayi tikus.
  (u, T, d) => {
    stage(u, d, { z1: 1.05 }); bg('lab');
    if (has('syringe')) putK('syringe', slide(0, 0.35, 600, 560, -32, 600, -500, 0, 1), u, 61);
    [230, 540, 850].forEach((x, i) => { putK('mouse', drop(0.45 + i * 0.12, 0.62 + i * 0.12, x, 960 + (i % 2) * 30, (i % 2 ? 6 : -4), 700), u, 70 + i, { s: 0.95 }); });
    putK('s_dosis', slap(1.2, 540, 1140, 2), u, 75);
  },
  // 12 · Otak mereka rusak.
  (u, T, d) => {
    const tc = at(11, 'rusak');
    stage(u, d, { z0: 1.05, z1: 1.12, shake: [[tc, 14]] }); bg('lab');
    if (!has('brain')) return;
    const g = u < tc ? 0 : Math.min(1, (stepT(u) - tc) / 0.25) * 34, S = SP.brain, w = S.img.width / S.k;
    for (const side of [-1, 1]) {
      ctx.save(); ctx.beginPath();
      const cx = 540 + side * g;
      // jagged cut line down the middle
      ctx.moveTo(cx, -2000); for (let y = 300; y <= 1300; y += 40) ctx.lineTo(cx + (hash(y, 3) - .5) * 26 + (side < 0 ? 0 : 0), y);
      ctx.lineTo(cx, 4000); ctx.lineTo(cx + side * 3000, 4000); ctx.lineTo(cx + side * 3000, -2000); ctx.closePath(); ctx.clip();
      put('brain', 540 + side * g, 760, side * g * 0.15, g > 0 ? 0.6 : 0); ctx.restore();
    }
  },
  // 13 · Sejak itu, micin jadi musuh.
  (u, T, d) => {
    stage(u, d, { z1: 1.06, shake: [[at(12, 'musuh'), 10]] }); bg('enemy');
    putK('sachet', slap(0.0, 540, 760, 4), u, 80, { s: 0.85 });
    stampAt('st_musuh', u, at(12, 'musuh'), 540, 820, -12, 1.25);
  },
  // 14 · Tapi tikus-tikus itu nggak makan micin.
  (u, T, d) => {
    stage(u, d, { z1: 1.05 }); bg('lab');
    if (has('mouse')) putK('mouse', slide(0, 0.3, 360, 900, 0, -700, 0, 0, 0.8), u, 81, { s: 1.25 });
    if (has('bowl')) putK('bowl', slap(0.35, 760, 980, 3), u, 82, { s: 0.85 });
    putK('sachet', slap(0.5, 820, 640, -8), u, 83, { s: 0.36 });
    stampAt('m_cross', u, at(13, 'makan'), 780, 900, 0, 1);
  },
  // 15 · Mereka disuntik.
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.1, shake: [[0.05, 12]] }); bg('lab');
    if (has('syringe')) putK('syringe', slap(0.05, 540, 740, -24, -30, -60), u, 84, { s: 1.45 });
    putK('s_disuntik', slap(at(14, 'disuntik') + 0.1, 540, 1130, -2), u, 85);
  },
  // 16 · Waktu manusia dites tanpa tahu mana yang micin,
  (u, T, d) => {
    stage(u, d, { z1: 1.05 }); bg('test');
    if (has('glass')) { putK('glass', slide(0, 0.3, 320, 820, -2, -700, 0, 0, 0.8), u, 86); putK('glass', slide(0.12, 0.42, 760, 820, 2, 700, 0, 0, -0.8), u, 87); }
    putK('s_A', slap(0.55, 320, 1080, -4), u, 88); putK('s_B', slap(0.7, 760, 1080, 4), u, 89);
    typed('s_tanpatahu', u, at(15, 'tanpa') - 0.05, 28, 540, 360, -1.5);
  },
  // 17 · hasilnya nggak konsisten.
  (u, T, d) => {
    stage(u, d, { z0: 1.05, z1: 1.08 }); bg('test');
    if (has('glass')) { put('glass', 320, 820, -2); put('glass', 760, 820, 2); }
    put('s_A', 320, 1080, -4); put('s_B', 760, 1080, 4); put('s_tanpatahu', 540, 360, -1.5);
    [['m_tick_s', 300, 560], ['m_cross_s', 740, 560], ['m_cross_s', 360, 600], ['m_tick_s', 780, 600], ['m_cross_s', 330, 500], ['m_tick_s', 760, 520]]
      .forEach(([n, x, y], i) => stampAt(n, u, 0.05 + i * 0.13, x + (hash(i, 9) - .5) * 60, y, (hash(i, 4) - .5) * 30, 1));
  },
  // 18 · BPOM dan FDA bilang aman.  -> TERUNGKAP
  (u, T, d) => {
    const ta = at(17, 'aman');
    stage(u, d, { z1: 1.05, shake: [[ta, 9], [1.55, 12]] }); bg('safe');
    putK('s_bpom', slap(at(17, 'bpom'), 330, 420, -5), u, 90); putK('s_fda', slap(at(17, 'fda'), 760, 430, 4), u, 91);
    stampAt('st_aman', u, ta, 540, 760, -8, 1.5);
    stampAt('st_terungkap', u, 1.55, 540, 1080, 6, 1.25);
  },
  // 19 · Lucunya, zat yang bikin micin gurih, glutamat,
  (u, T, d) => {
    stage(u, d, { z1: 1.05, cy: 940 }); bg('milk');
    putK('sachet_open', slide(0, 0.3, 540, 1020, 0, 0, 900, 0, 0.6), u, 92, { s: 0.75 });
    putK('molecule', [[0.5, 540, 860, 0, 0, 1, null, 0, 0.3], [1.3, 540, 560, -4, 2.5, 1, 'back', 0, 1.0]], u, 93);
    putK('s_glutamat', slap(at(18, 'glutamat'), 540, 300, -3), u, 94);
  },
  // 20 · juga ada di ASI.
  (u, T, d) => {
    stage(u, d, { z0: 1.04, z1: 1.1 }); bg('milk');
    if (has('mother')) putK('mother', slide(0, 0.25, 540, 760, 0, 0, -900, 0, 0.7), u, 95);
    else if (has('babybottle')) putK('babybottle', slide(0, 0.25, 540, 760, 0, 0, -900, 0, 0.7), u, 95);
    putK('molecule', [[0, 840, 220, -4, 2, 1, null, 0, 0.5], [0.4, 800, 330, 10, 0, 1, 'in', 0.8, 0.45]], u, 96);
    putK('s_asi', slap(at(19, 'asi'), 540, 1130, -3), u, 97);
  },
  // 21 · Banyak banget, kira-kira sepuluh kali susu sapi.  (data engraving: the ASI bar grows ten times the cow's milk bar)
  (u, T, d) => {
    stage(u, d, { cy: 860, z0: 1, z1: 1.03 }); bg('chart');
    const base = 1060, gp = EASE.out(seg(stepT(u), 0.15, 1.4));
    putA('bar_sapi', 720, base, 0.5, 1, 0, 0);
    const S = SP.bar_asi, h = S.img.height / S.k;
    ctx.save(); ctx.beginPath(); ctx.rect(0, base - h * gp - 30, W, h * gp + 60); ctx.clip(); putA('bar_asi', 380, base, 0.5, 1, 0, 0); ctx.restore();
    putK('s_asi', slap(0.2, 380, base + 70, -2), u, 98); putK('s_sapi', slap(0.35, 720, base + 70, 2), u, 99);
    putK('cow', slap(0.5, 720, base - 230, 3), u, 100, { s: 0.75 });
    putK('babybottle', slap(1.4, 380, base - h * gp - 150, -6), u, 101, { s: 0.6 });
    putK('s_10x', slap(at(20, 'sepuluh'), 690, base - h + 160, 6), u, 102);
    putK('s_1x', slap(at(20, 'sapi'), 900, base - 60, -4), u, 103);
  },
  // 22 · Jadi lidahmu kenal gurih micin... sejak menyusu.
  (u, T, d) => {
    stage(u, d, { z1: 1.06 }); bg('milk');
    putK('sachet', slap(0.05, 250, 760, -5), u, 104, { s: 0.55 });
    stampAt('m_eq', u, at(21, 'micin'), 540, 770, 0, 1.7);
    const b = has('babybottle') ? 'babybottle' : (has('mother') ? 'mother' : null);
    if (b) putK(b, slap(at(21, 'sejak'), 820, 760, 5), u, 105, { s: 0.75 });
  },
  // 23 · Oh iya, lima puluh tahun kemudian, ada pria ngaku surat itu cuma taruhan.
  (u, T, d) => {
    stage(u, d, { z0: 1, z1: 1.06 }); bg('bet', u, true);
    ransomRow('ry18', u, 0.15, 540, 300, 0.1, 1.05);
    putK('sil_man', slide(at(22, 'pria') - 0.2, at(22, 'pria') + 0.2, 330, 1010, 0, -800, 0, 0, 0.6), u, 106, { s: 0.85 });
    putK('letter', slide(at(22, 'surat') - 0.2, at(22, 'surat') + 0.15, 790, 780, 7, 800, 0, 0, -0.8), u, 107, { s: 0.5 });
    if (has('dice')) putK('dice', drop(at(22, 'taruhan') - 0.15, at(22, 'taruhan') + 0.05, 820, 1060, 12, 600), u, 108, { s: 0.6 });
    typed('s_taruhan', u, at(22, 'taruhan'), 24, 600, 1140, -3);
  },
  // 24 · Keluarga si dokter membantah.
  (u, T, d) => {
    const tb = at(23, 'membantah');
    stage(u, d, { z1: 1.05, shake: [[tb, 10]] }); bg('bet');
    if (has('family')) putK('family', slide(0, 0.3, 540, 780, 0, 0, -900, 0, 0.7), u, 109);
    putK('s_keluarga', slap(0.35, 540, 300, 2), u, 110);
    stampAt('st_dibantah', u, tb, 540, 1150, -8, 1.2);
  },
  // 25 · Tapi gara-gara satu surat itu...  -> back to the sachet of frame 0 (loop)
  (u, T, d) => {
    const td = 1.45;
    stage(u, d, u < td ? { cy: 820, z0: 1.0, z1: 1.2 } : { z0: 1.02, z1: 1.02, cy: 900 }); bg(u < td ? 'letter' : 'hook');
    if (u < td) { put('letter', 540, 820, -2); return; }
    putK('sachet', [[td, 540, 690, -4, 3, 1, null, 0, 1.06], [td + 0.2, 540, 690, -4, 1.4, 1, 'in', 0.8, 1.03]], u, 1);
  },
];

export async function init(c) {
  ctx = c; setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const raw = await (await fetch('./audio/vo_words.json')).json();
  WORDS = raw.map(([s, e, w]) => ({ s, e, w }));
  film = createFilm({ shots: SHOTS, start: START, words: WORDS, caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(micin|bodoh|surat|musuh|disuntik|aman|asi|glutamat|taruhan|membantah)/i } });
}
export const renderAt = t => film.renderAt(t);
