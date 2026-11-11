// The full film (61 s, storyboard v5, 36 panels): panel timeline on the VO's word timestamps, a camera per panel,
// multiplane parallax where the panel has layers, motion blur on fast shots, word captions from the VO, special transitions.
window.__video = true;
import { P1, P3, P8, finishP1, finishP8, setU, setLayer, preparePaint, brushReady, MAIN, PHOTO } from './panels.js';
import * as B from './panels2.js';
import * as C from './panels3.js';
import * as D from './panels4.js';
import { WORDS } from './words.js';
import { frame, g, W, H } from '/engine/toon.js';
import { stamp, timedCaption } from '/engine/brand.js';
import { vnoise, clamp, lerp } from '/core/lib.js';
const AMBER = '#ffb43a';
const io = t => { t = clamp(t); return t * t * (3 - 2 * t); }, eo = t => 1 - (1 - clamp(t)) ** 3, ei = t => clamp(t) ** 3, back = (t, s = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((s + 1) * t + s); };
// camera spec: s [from, to], c [[x, y] from, to], e easing, sh shake amplitude (px), rot
const cam = (s0, s1, c0, c1, e = io, sh = 0, rot = 0) => (u, d) => { const k = e(u / d), a = typeof sh === 'function' ? sh(u) : sh; return { s: lerp(s0, s1, k), cx: lerp(c0[0], c1[0], k), cy: lerp(c0[1], c1[1], k), ox: (vnoise(u * 3.1) - .5) * a, oy: (vnoise(u * 3.7 + 9) - .5) * a, rot }; };
const slam = (sh = 22) => (u, d) => ({ s: u < .2 ? Math.max(1, 1.3 - .3 * back(u / .2, 2.4)) : 1 + .05 * io((u - .2) / (d - .2)), cx: 540, cy: 960, ox: (vnoise(u * 30) - .5) * Math.exp(-u * 9) * sh, oy: (vnoise(u * 33 + 5) - .5) * Math.exp(-u * 9) * sh, rot: 0 });
const hit = (t0, amp) => u => amp * Math.exp(-Math.max(0, u - t0) * 6) * (u > t0 ? 1 : 0);
// panel table: a = start (VO s), fn, cam, layers (multiplane), fin (finishing after compositing), u0 (time offset inside the panel), blur (sub-frames)
const SEG = [
  { id: 'P1', a: 0, fn: P1, layers: true, fin: finishP1, blur: 5, cam: (u) => { const k = io(u / 1.32); return { s: lerp(2.1, 1.12, k), cx: lerp(605, 560, k), cy: lerp(900, 930, k), ox: (vnoise(u * 3.1) - .5) * (4 + 14 * u), oy: (vnoise(u * 3.7 + 9) - .5) * (4 + 14 * u), rot: -.03 }; } },
  { id: 'P2', a: 1.32, fn: B.P2, cam: cam(1, 1.38, [540, 800], [540, 790], io, 6), blur: 3 },
  { id: 'P3', a: 2.9, fn: P3, cam: slam(), freezeIn: true },
  { id: 'P4', a: 4.2, fn: B.P4, cam: cam(1.25, 1.06, [540, 1450], [540, 1000], eo) },
  { id: 'P5', a: 5.38, fn: B.P5, cam: cam(1, 1.12, [540, 900], [540, 980]) },
  { id: 'P6', a: 7.6, fn: B.P6, cam: cam(1.02, 1.1, [540, 900], [560, 820]) },
  { id: 'P7', a: 8.95, fn: B.P7, cam: cam(1, 1.55, [540, 960], [520, 620], eo) },
  { id: 'P8', a: 9.7, fn: P8, layers: true, fin: finishP8, cam: (u) => { const k = io(u / 2.7); return { s: lerp(1.75, 1.04, k), cx: lerp(660, 540, k), cy: lerp(900, 960, k), ox: lerp(0, -14, io(u / 2.9)), oy: 0, rot: 0 }; }, stamp: true },
  { id: 'P9', a: 12.6, fn: C.P9, cam: cam(1, 1.25, [540, 1000], [560, 820], io, hit(.4, 10)) },
  { id: 'P10', a: 14.05, fn: C.P10, cam: cam(1.15, 1.0, [540, 900], [540, 960], eo, hit(0, 34)), flash: true, blur: 3 },
  { id: 'P11', a: 15.0, fn: P1, layers: true, fin: finishP1, u0: .75, blur: 5, cam: (u) => ({ s: lerp(1.0, 1.12, io(u / 1.6)), cx: 560, cy: 960, ox: (vnoise(u * 3.1) - .5) * 16, oy: (vnoise(u * 3.7 + 9) - .5) * 16, rot: -.03 }) },
  { id: 'P12', a: 16.6, fn: C.P12, cam: cam(1.04, 1.0, [540, 960], [540, 960], eo) },
  { id: 'P13', a: 17.5, fn: C.P13, cam: cam(1, 1.06, [540, 960], [540, 940]) },
  { id: 'P14', a: 18.5, fn: C.P14, cam: cam(1.0, 1.15, [540, 960], [600, 1000], io, 12), blur: 3 },
  { id: 'P15', a: 19.7, fn: C.P15, cam: cam(1.1, 1.0, [540, 900], [540, 960], eo, hit(.6, 8)) },
  { id: 'P16', a: 21.55, fn: C.P16, cam: cam(1.0, 1.1, [540, 960], [520, 900], io, hit(.25, 26)), blur: 3 },
  { id: 'P17', a: 23.4, fn: C.P17, cam: cam(1.3, 1.0, [560, 900], [540, 960], eo, hit(.1, 24)), blur: 3 },
  { id: 'P18', a: 24.55, fn: C.P18, cam: cam(1.0, 1.12, [540, 960], [540, 900]) },
  { id: 'P19', a: 26.0, fn: C.P19, cam: cam(1.05, 1.2, [540, 960], [540, 820]) },
  { id: 'P20', a: 27.25, fn: D.P20, cam: cam(1, 1.06, [540, 960], [540, 960]) },
  { id: 'P21', a: 29.0, fn: D.P21, cam: cam(1.0, 1.08, [480, 960], [600, 960]) },
  { id: 'P22', a: 31.0, fn: D.P22, cam: cam(1.0, 1.3, [540, 960], [560, 900]) },
  { id: 'P23', a: 33.5, fn: D.P23, cam: cam(1.0, 1.15, [540, 900], [540, 1000]) },
  { id: 'P24', a: 35.5, fn: D.P24, cam: cam(1.08, 1.0, [540, 1100], [540, 960], eo) },
  { id: 'P25', a: 36.7, fn: D.P25, cam: cam(1.0, 1.1, [540, 960], [540, 900]) },
  { id: 'P26', a: 38.3, fn: D.P26, cam: cam(1.0, 1.08, [440, 960], [640, 960]) },
  { id: 'P27', a: 40.4, fn: D.P27, cam: cam(1.0, 1.05, [540, 960], [540, 960]) },
  { id: 'P28', a: 42.1, fn: D.P28, cam: cam(1.0, 1.2, [540, 960], [540, 960]) },
  { id: 'P29', a: 43.7, fn: D.P29, cam: slam(14) },
  { id: 'P30', a: 44.9, fn: D.P30, cam: cam(1.0, 1.05, [540, 960], [540, 940]) },
  { id: 'P31', a: 45.95, fn: D.P31, cam: cam(1.0, 1.06, [520, 960], [560, 960]) },
  { id: 'P32', a: 49.6, fn: D.P32, cam: cam(1.0, 1.08, [540, 1000], [540, 960]) },
  { id: 'P33', a: 52.0, fn: D.P33, cam: cam(1.0, 1.06, [540, 960], [540, 960]) },
  { id: 'P34', a: 53.8, fn: D.P34, cam: cam(1.0, 1.35, [540, 960], [540, 860]) },
  { id: 'P35', a: 56.0, fn: D.P35, cam: cam(1.35, 1.5, [540, 860], [540, 840], io, hit(0, 10)) },
  { id: 'P36', a: 57.38, fn: D.P36, cam: cam(1.0, 1.08, [540, 960], [540, 940]) },
];
const DUR = 60.75; SEG.forEach((s, i) => { s.b = i < SEG.length - 1 ? SEG[i + 1].a : DUR; });
// captions: phrases of ≤ 3 words, split at punctuation; keywords in the threat colour
const HOT = /^(bukan|raksasa|molase|pekat|1919|pecah|2,3|juta|galon|56|hancur|lengket|bocor|tetesannya|tipis|retak|buruk|suhu|baru|21|150|diabaikan)/i;
const PHR = []; { let cur = []; for (const [t0, t1, s] of WORDS) { cur.push({ s: s.replace(/^-/, ''), t0: t0 - .04, hot: HOT.test(s.replace(/[^\w,]/g, '')) }); if (cur.length >= 3 || /[.,?!]$/.test(s)) { PHR.push(cur); cur = []; } } if (cur.length) PHR.push(cur); }
PHR.forEach(p => { if (p[0].t0 < .02) p[0].t0 = -.2; });
const DEPTH = [.55, .85, 1.25];
const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
const LAY = [mk(), mk(), mk()], freeze = mk(), acc = mk(), A = acc.getContext('2d');
function draw(c, Cm, depth) { const s = 1 + (Cm.s - 1) * depth; g.setTransform(1, 0, 0, 1, 0, 0); g.translate(Cm.cx + Cm.ox * depth, Cm.cy + Cm.oy * depth); g.rotate(Cm.rot); g.scale(s, s); g.translate(-Cm.cx, -Cm.cy); g.drawImage(c, 0, 0); g.setTransform(1, 0, 0, 1, 0, 0); }
function shot(i, u) {
  const S = SEG[i], Cm = S.cam(u, S.b - S.a); frame(S.a + u); setU(u + (S.u0 || 0), false);
  if (!S.layers) { setLayer(null); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); S.fn(); const t = LAY[0].getContext('2d'); t.setTransform(1, 0, 0, 1, 0, 0); t.clearRect(0, 0, W, H); t.drawImage(MAIN, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, W, H); draw(LAY[0], Cm, 1); return; }
  for (let n = 0; n < 3; n++) { setLayer(n); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); S.fn(); const t = LAY[n].getContext('2d'); t.setTransform(1, 0, 0, 1, 0, 0); t.clearRect(0, 0, W, H); t.drawImage(MAIN, 0, 0); }
  setLayer(null); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  for (let n = 0; n < 3; n++) draw(LAY[n], Cm, DEPTH[n]);
  if (S.fin) S.fin();
}
const segAt = T => { let i = SEG.findIndex(s => T < s.b); return i < 0 ? SEG.length - 1 : i; };
let frozenFor = -1;
function scene(T) {
  const i = segAt(T), S = SEG[i], u = T - S.a;
  if (T >= DUR - .3) { shot(0, 0); return; }   // loop: the last beat cuts back to the film's first frame
  if (S.freezeIn && u < .38) {   // the previous shot freezes, goes sepia and shrinks into the archive photo while the file slams in
    if (frozenFor !== i) { shot(i - 1, SEG[i - 1].b - SEG[i - 1].a - 1e-3); freeze.getContext('2d').drawImage(MAIN, 0, 0); frozenFor = i; }
    shot(i, u); const k = io(u / .38);
    g.save(); g.filter = `sepia(${k}) contrast(${1 + .15 * k})`; g.translate(540, lerp(960, 1100, k)); g.rotate(lerp(0, -.012, k)); const sc = lerp(1, .5, k); g.scale(sc, sc);
    g.globalAlpha = 1 - clamp((u - .3) / .08); g.drawImage(freeze, -540, -960); g.restore(); g.filter = 'none'; g.globalAlpha = 1;
    if (u < .06) { g.fillStyle = `rgba(255,250,240,${.8 * (1 - u / .06)})`; g.fillRect(0, 0, W, H); }
  } else shot(i, u);
  if (S.flash && u < .12) { g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = `rgba(255,252,245,${1 - u / .12})`; g.fillRect(0, 0, W, H); }
}
window.DUR = DUR;
window.render = T => {
  const i = segAt(T), S = SEG[i], n = S.blur || 1, dt = 1 / 24;
  if (n > 1) { A.setTransform(1, 0, 0, 1, 0, 0); for (let k = 0; k < n; k++) { const tt = Math.max(S.a, Math.min(S.b - 1e-3, T + (k / (n - 1) - .5) * dt * .25)); scene(tt); A.globalAlpha = 1 / (k + 1); A.drawImage(MAIN, 0, 0); } A.globalAlpha = 1; g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(acc, 0, 0); }
  else scene(T);
  const u = T - S.a;
  if (S.stamp) { const k = clamp((u - 1.0) / .25); if (k > 0) { g.save(); g.globalAlpha = k; stamp('BOSTON', '15 JAN 1919', '12:30', AMBER, { x: 60, y: 210 }); g.restore(); } }
  let p = -1; PHR.forEach((ph, j) => { if (T >= ph[0].t0) p = j; });
  if (p >= 0 && T < PHR[p][PHR[p].length - 1].t0 + 1.6) timedCaption(PHR[p], T, AMBER, { y: 1330 });
};
PHOTO.src = [B.P2, 1.5];
// thumbnail (?thumb, render at t = 0): the terror close-up of P2 with the hook in two lines, the series tag on top
if (new URLSearchParams(location.search).has('thumb')) window.render = () => {
  shot(0, 1.3);   // the worker fleeing in front of the towering wave
  g.setTransform(1, 0, 0, 1, 0, 0); const sh = g.createLinearGradient(0, 0, 0, 760); sh.addColorStop(0, 'rgba(10,6,4,.85)'); sh.addColorStop(1, 'rgba(10,6,4,0)'); g.fillStyle = sh; g.fillRect(0, 0, W, 760);
  B.bigText('BANJIR INI', 540, 300, { size: 190, k: 1 }); B.bigText('BUKAN AIR', 540, 500, { size: 210, k: 1, hot: true });
  g.font = '700 40px "Courier Prime"'; const tw = g.measureText('ARSIP KASUS #001').width + 60; g.fillStyle = '#b3261e'; g.fillRect(540 - tw / 2, 96, tw, 70);
  g.fillStyle = '#f4efe6'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ARSIP KASUS #001', 540, 133);
  B.bigText('BOSTON 1919', 540, 1700, { size: 90, k: 1 });
};
Promise.all([document.fonts.load('600 40px "Oswald"'), document.fonts.load('700 30px "Courier Prime"'), brushReady()]).then(async () => {
  for (const S of SEG) if (S.paint !== false) { frame(S.a); setU(0, false); setLayer(null); g.setTransform(1, 0, 0, 1, 0, 0); try { S.fn(); } catch (e) { console.error(S.id, e); throw e; } }
  await preparePaint(); window.render(0); window.READY = true;
});
