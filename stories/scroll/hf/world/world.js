// The painted world of #002 on the HyperFrames canvas: shot table cut on the VO's word starts, a camera per shot,
// special transitions (freeze → archive, dip, flash), motion blur on fast shots, loop back to frame 0.
// HyperFrames drives it through hf-seek; everything is a pure function of time.
import { clamp, lerp, vnoise } from '../lib/toon/lib.js';
import { g, W, H, frame } from '../lib/toon/toon.js';
import { setU, MAIN } from './kit.js';
import * as K from './s_hook.js';
import * as B from './s_brake.js';
import * as Q from './s_quote.js';

const io = t => { t = clamp(t); return t * t * (3 - 2 * t); }, eo = t => 1 - (1 - clamp(t)) ** 3;
const back = (t, s = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((s + 1) * t + s); };
const cam = (s0, s1, c0, c1, e = io, sh = 0, rot = 0) => (u, d) => { const k = e(u / d), a = typeof sh === 'function' ? sh(u) : sh; return { s: lerp(s0, s1, k), cx: lerp(c0[0], c1[0], k), cy: lerp(c0[1], c1[1], k), ox: (vnoise(u * 3.1) - .5) * a, oy: (vnoise(u * 3.7 + 9) - .5) * a, rot }; };
const slam = (sh = 22) => (u) => ({ s: u < .2 ? Math.max(1, 1.3 - .3 * back(u / .2, 2.4)) : 1 + .05 * io((u - .2) / .8), cx: 540, cy: 960, ox: (vnoise(u * 30) - .5) * Math.exp(-u * 9) * sh, oy: (vnoise(u * 33 + 5) - .5) * Math.exp(-u * 9) * sh, rot: 0 });
const hit = (t0, amp) => u => amp * Math.exp(-Math.max(0, u - t0) * 6) * (u > t0 ? 1 : 0);

export const DUR = 44.83;
// a = start (s, = first word of the shot), fn = draw, cam, blur (sub-frames), freezeIn / dip / flash transitions
export const SEG = [
  { id: 'S1', a: 0, fn: K.S1, cam: cam(1.42, 1.58, [540, 820], [540, 790]) },
  { id: 'S2', a: 1.40, fn: K.S2, cam: cam(1.0, 1.06, [540, 1000], [540, 980]) },
  { id: 'S3', a: 2.96, fn: K.S3, cam: cam(1.55, 1.38, [540, 800], [540, 840]) },
  { id: 'S4', a: 4.55, fn: K.S4, cam: slam(), freezeIn: true },
  { id: 'S5', a: 5.00 }, { id: 'S6', a: 6.88 }, { id: 'S7', a: 8.26 }, { id: 'S8', a: 9.56 }, { id: 'S9', a: 10.40 },
  { id: 'S10', a: 11.80, fn: B.S10, cam: cam(1.0, 1.35, [540, 980], [540, 960], io), dip: true },
  { id: 'S11', a: 12.68, fn: B.S11, cam: cam(1.15, 1.0, [540, 960], [540, 960], eo, hit(0, 18)) },
  { id: 'S12', a: 15.02, fn: B.S12, cam: cam(1.0, 1.08, [540, 960], [540, 940]) },
  { id: 'S13', a: 17.30, fn: B.S13, cam: cam(1.0, 1.04, [540, 960], [540, 960]) },
  { id: 'S14', a: 19.06 }, { id: 'S15', a: 20.80 }, { id: 'S16', a: 22.88 }, { id: 'S17', a: 24.94 }, { id: 'S18', a: 26.62 },
  { id: 'S19', a: 28.10, fn: Q.S19, cam: cam(1.15, 1.02, [540, 900], [540, 960], eo), dip: true },
  { id: 'S20', a: 30.34, fn: Q.S20, cam: cam(1.0, 1.06, [540, 960], [540, 940]) },
  { id: 'S21', a: 32.18, fn: Q.S21, cam: cam(1.0, 1.08, [560, 1200], [560, 1000], io) },
  { id: 'S22', a: 35.64, fn: Q.S22, cam: cam(1.0, 1.1, [540, 960], [540, 900]) },
  { id: 'S23', a: 37.60 }, { id: 'S24', a: 39.56 }, { id: 'S25', a: 41.54 },
];
SEG.forEach((s, i) => { s.b = i < SEG.length - 1 ? SEG[i + 1].a : DUR; if (!s.cam) s.cam = cam(1, 1, [540, 960], [540, 960]); });

const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
const LAY = mk(), FREEZE = mk(), ACC = mk(), A = ACC.getContext('2d');
function placeholder(S, u) {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#20242b'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#5b6370'; g.font = '600 90px Oswald'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(S.id, 540, 900);
  g.font = '700 34px "Courier Prime"'; g.fillText('(belum digambar)', 540, 990);
}
function shot(i, u) {
  const S = SEG[i], Cm = S.cam(u, S.b - S.a); frame(S.a + u); setU(u);
  g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H);
  if (S.fn) S.fn(); else placeholder(S, u);
  const t = LAY.getContext('2d'); t.setTransform(1, 0, 0, 1, 0, 0); t.clearRect(0, 0, W, H); t.drawImage(MAIN, 0, 0);
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  g.translate(Cm.cx + Cm.ox, Cm.cy + Cm.oy); g.rotate(Cm.rot); g.scale(Cm.s, Cm.s); g.translate(-Cm.cx, -Cm.cy); g.drawImage(LAY, 0, 0); g.setTransform(1, 0, 0, 1, 0, 0);
}
const segAt = T => { const i = SEG.findIndex(s => T < s.b); return i < 0 ? SEG.length - 1 : i; };
let frozenFor = -1;
function scene(T) {
  if (T >= DUR - 1 / 30) { shot(0, 0); return; }   // loop: the last frame is the first
  const i = segAt(T), S = SEG[i], u = T - S.a;
  if (S.freezeIn && u < .38) {   // previous shot freezes → sepia → shrinks into the archive photo while the file slams in
    if (frozenFor !== i) { shot(i - 1, SEG[i - 1].b - SEG[i - 1].a - 1e-3); FREEZE.getContext('2d').drawImage(MAIN, 0, 0); K.setPhoto(FREEZE); frozenFor = i; }
    shot(i, u); const k = io(u / .38);
    g.save(); g.filter = `sepia(${k}) contrast(${1 + .15 * k})`; g.translate(540, lerp(960, 1100, k)); g.rotate(lerp(0, .02, k)); const sc = lerp(1, .5, k); g.scale(sc, sc);
    g.globalAlpha = 1 - clamp((u - .3) / .08); g.drawImage(FREEZE, -540, -960); g.restore(); g.filter = 'none'; g.globalAlpha = 1;
    if (u < .06) { g.fillStyle = `rgba(255,250,240,${.8 * (1 - u / .06)})`; g.fillRect(0, 0, W, H); }
    return;
  }
  if (S.freezeIn && frozenFor !== i) { shot(i - 1, SEG[i - 1].b - SEG[i - 1].a - 1e-3); FREEZE.getContext('2d').drawImage(MAIN, 0, 0); K.setPhoto(FREEZE); frozenFor = i; }
  shot(i, u);
  if (S.dip && u < .1) { g.fillStyle = `rgba(0,0,0,${.45 * (1 - u / .1)})`; g.fillRect(0, 0, W, H); }   // dip cut: the outgoing beat darkens for 3 frames
  if (S.flash && u < .12) { g.fillStyle = `rgba(255,252,245,${1 - u / .12})`; g.fillRect(0, 0, W, H); }
}
function renderAt(T) {
  T = clamp(T, 0, DUR); const i = segAt(T), S = SEG[i], n = S.blur || 1, dt = 1 / 30;
  if (n > 1) { A.setTransform(1, 0, 0, 1, 0, 0); for (let k = 0; k < n; k++) { const tt = Math.max(S.a, Math.min(S.b - 1e-3, T + (k / (n - 1) - .5) * dt * .5)); scene(tt); A.globalAlpha = 1 / (k + 1); A.drawImage(MAIN, 0, 0); } A.globalAlpha = 1; g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(ACC, 0, 0); }
  else scene(T);
}
window.addEventListener('hf-seek', e => renderAt(e.detail.time));
const ready = Promise.all([document.fonts.load('600 40px Oswald'), document.fonts.load('700 30px "Courier Prime"')]).then(() => renderAt(0));
window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {}; window.__hf.buildReady.world = ready;
renderAt(0);
