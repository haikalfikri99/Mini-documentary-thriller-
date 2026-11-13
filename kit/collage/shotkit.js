// ARSIP Kolase · helpers every episode's film.js uses: word times, table backgrounds, the shot camera, ransom rows,
// and the fixed openers/closers of the series (ARSIP file overlay, TERUNGKAP). Episodes import these instead of copying them.
import { SP, M, PAL, put, putK, has, slap, slide, stampAt, drawPaper, cam, applyCam, shake, stepT, hash } from './engine.js';

// table backgrounds: [part, x, y, rot] of torn colour fields resting under a scene (episodes may add their own sets)
export const BG = {
  hook: [['f_green', 260, 330, -8], ['f_amber', 900, 1160, 0], ['f_cream', 540, 1560, -3]],
  file: [['f_manila', 560, 820, 3], ['f_green_s', 960, 260, 0], ['f_cream', 520, 1560, 2]],
  red: [['f_red', 540, 260, -6], ['f_amber', 120, 1020, 0], ['f_cream', 560, 1570, -2]],
  news: [['f_news', 520, 800, -2], ['f_green', 960, 1500, 12]],
  green: [['f_green', 540, 520, -3], ['f_manila', 420, 1180, 2], ['f_amber_s', 940, 1060, 0]],
  verdict: [['f_manila', 540, 760, 2], ['f_green_s', 900, 300, 0], ['f_cream', 540, 1560, -3]],
  warm: [['f_amber', 540, 640, 0], ['f_cream', 540, 1560, 2]],
  chart: [['f_cream', 540, 1180, -1], ['f_amber_s', 860, 380, 0], ['f_green_s', 180, 520, 0]],
  late: [['f_red', 540, 1080, -10], ['f_manila', 760, 640, 4]],
};

export function makeShotKit(START) {
  let WORDS = [];
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return {
    setWords: w => { WORDS = w; },
    // shot-local time of the k-th spoken word starting with `word`, searching from the start of shot i
    at(i, word, k = 0) { const hits = WORDS.filter(w => w.s >= START[i] - 0.05 && norm(w.w).startsWith(norm(word))); return hits.length > k ? hits[k].s - START[i] : 0.3; },
    // the table and its colour fields; enter = fields slide in (first shot of a new act)
    bg(set, u = 9, enter = false) {
      drawPaper();
      for (const [n, x, y, r] of (typeof set === 'string' ? BG[set] : set)) {
        if (!has(n)) continue;
        if (enter) putK(n, slide(0, 0.3, x, y, r, (x < 540 ? -700 : 700), 0, 0, 0.4), u, hash(x, y) * 999 | 0); else put(n, x, y, r);
      }
    },
    // rostrum camera for one shot: push from z0 to z1 (default 1 → 1.05), optional pan, shakes [[t0, amplitude], ...]
    stage(u, d, o = {}) {
      const c = cam([[0, o.cx ?? 540, o.cy ?? 960, o.z0 ?? 1], [d, o.cx1 ?? o.cx ?? 540, o.cy1 ?? o.cy ?? 960, o.z1 ?? 1.05, o.ease || 'io']], u);
      let sh = [0, 0]; for (const [t0, a] of (o.shake || [])) { const s = shake(u, t0, a); sh = [sh[0] + s[0], sh[1] + s[1]]; }
      applyCam(c, sh);
    },
    // ransom letters baked with bk.ransom(prefix, text, ...) slapped one by one from t0
    ransomRow(prefix, u, t0, x, y, gap = 0.1, s = 1) {
      const names = M._ransom[prefix]; let cx = x - names.reduce((a, n) => a + (n ? SP[n].img.width / SP[n].k * s * 0.92 : 40), 0) / 2;
      names.forEach((n, i) => {
        if (!n) { cx += 40; return; } const w = SP[n].img.width / SP[n].k * s * 0.92;
        putK(n, slap(t0 + i * gap, cx + w / 2, y + (i % 2 ? 8 : -6), [-6, 4, -3, 5, -4, 3][i % 6]), u, 300 + i, { s });
        cx += w;
      });
    },
    // series opener: the manila ARSIP KASUS folder slides over the shot for ≤ 1.3 s, labels slap, DIBUKA is stamped
    fileOverlay(u, t0 = 0.08, out = 1.35) {
      if (u > out + 0.32 || u < t0) return;
      putK('folder', [[t0, -520, 330, -4, 2, 1], [t0 + 0.24, 430, 330, -3, 0, 1, 'back', 0.8], [out, 430, 330, -3, 0, 1, 'hold'], [out + 0.3, -620, 300, -8, 2, 1, 'in']], u, 5);
      putK('lbl_case', [[t0 + 0.22, 300, 380, -4, 3, 1, null, 0, 1.1], [t0 + 0.34, 300, 380, -4, 0, 1, 'in', 0.9], [out, 300, 380, -4, 0, 1, 'hold'], [out + 0.3, -700, 360, -8, 2, 1, 'in']], u, 6);
      putK('lbl_case2', [[t0 + 0.37, 560, 400, 3, 3, 1, null, 0, 1.1], [t0 + 0.48, 560, 400, 3, 0, 1, 'in', 0.9], [out, 560, 400, 3, 0, 1, 'hold'], [out + 0.3, -400, 380, -8, 2, 1, 'in']], u, 7);
      if (u < out) stampAt('st_dibuka', u, t0 + 0.62, 700, 520, -10, 1);
    },
    heartbeat(u, t0) { const p = (stepT(u) - t0) % 0.5; return p < 1 / 12 ? 1.12 : p < 2 / 12 ? 1.04 : 1; },
  };
}
