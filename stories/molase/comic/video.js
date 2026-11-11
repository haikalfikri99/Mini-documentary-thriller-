// Key-scene preview v3: multiplane parallax, story-driven camera, motion blur (sub-frame accumulation on fast shots),
// captions synced to the VO's word timestamps (faster-whisper), freeze-frame → archive photo, push into the photo → the street.
// P1 (VO 0–2.3): the scream, pull back to the wave. P3 (VO 2.3–5.4): ARSIP KASUS slams. P8 (VO 8.98–12.65, shifted −3.6 s): the tank at the end of the street.
window.__video = true;
import { P1, P3, P8, finishP1, finishP8, setU, setLayer, preparePaint, brushReady, MAIN } from './panels.js';
import { frame, g, W, H } from '/engine/toon.js';
import { stamp, timedCaption } from '/engine/brand.js';
import { vnoise, clamp, lerp } from '/core/lib.js';
const AMBER = '#ffb43a';
const io = t => { t = clamp(t); return t * t * (3 - 2 * t); }, back = (t, s = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((s + 1) * t + s); }, ei = t => clamp(t) ** 3;
// phrases (≤ 3 words), word start times in video seconds from the VO alignment; hot = the keyword in the threat colour
const PH = (list, off = 0) => list.map(p => p.map(([s, t, hot]) => ({ s, t0: t + off, hot: !!hot })));
const SEG = [
  { a: 0, b: 2.3, fn: P1, fin: finishP1, blur: 5, caps: PH([[['Banjir', -.2], ['ini', .46], ['bukan', .74, 1]], [['datang', 1.32], ['dari', 1.7], ['sungai.', 1.88]]]) },
  { a: 2.3, b: 5.4, fn: P3, fin: null, blur: 1, caps: PH([[['Ia', 2.92], ['keluar', 3.26], ['dari', 3.56]], [['sebuah', 3.9], ['tangki', 4.2], ['raksasa—', 4.52, 1]]]) },
  { a: 5.4, b: 9.05, fn: P8, fin: finishP8, blur: 1, caps: PH([[['Boston,', 8.98]], [['15', 9.72], ['Januari', 9.98], ['1919.', 10.56, 1]]], -3.6) },
];
const DEPTH = [.55, .85, 1.25];   // parallax factor per layer: environment, mid characters, foreground
const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
const LAY = [mk(), mk(), mk()], freeze = mk(), acc = mk(), A = acc.getContext('2d');
function cam(i, u) {
  if (i === 0) {   // reveal: tight on the scream, pull back to the wave, then a slow push with growing shake
    const k = io(u / 1.5), s = u < 1.5 ? lerp(2.1, 1.05, k) : 1.05 + .03 * io((u - 1.5) / .8), a = 4 + 12 * u;
    return { s, cx: lerp(700, 560, k), cy: lerp(780, 930, k), ox: (vnoise(u * 3.1) - .5) * a, oy: (vnoise(u * 3.7 + 9) - .5) * a, rot: -.03 + (vnoise(u * 2 + 4) - .5) * .02 };
  }
  if (i === 1) {   // slam with overshoot, a punch-in on "raksasa", then a push into the photo that carries us to the street
    let s = u < .2 ? Math.max(1, 1.35 - .35 * back(u / .2, 2.4)) : 1 + .04 * io((u - .2) / 2);
    const pk = u - 2.22; if (pk > 0) s += .07 * Math.exp(-pk * 5) * Math.min(1, pk / .05);
    const pin = ei((u - 2.55) / .55); s *= 1 + 1.9 * pin;
    return { s, cx: 540, cy: lerp(960, 1080, pin), ox: (vnoise(u * 30) - .5) * Math.exp(-u * 9) * 22, oy: (vnoise(u * 33 + 5) - .5) * Math.exp(-u * 9) * 22, rot: 0 };
  }
  const k = io(u / 3.2);   // open on the tank at the end of the street, ease back to reveal the street and the worker below it
  return { s: lerp(1.75, 1.04, k), cx: lerp(560, 540, k), cy: lerp(900, 960, k), ox: lerp(0, -14, io(u / 3.65)), oy: 0, rot: 0 };
}
function draw(c, C, depth) {
  const s = 1 + (C.s - 1) * depth;
  g.setTransform(1, 0, 0, 1, 0, 0); g.translate(C.cx + C.ox * depth, C.cy + C.oy * depth); g.rotate(C.rot); g.scale(s, s); g.translate(-C.cx, -C.cy); g.drawImage(c, 0, 0); g.setTransform(1, 0, 0, 1, 0, 0);
}
function shot(i, u) {   // compose one panel frame onto MAIN (no captions)
  const S = SEG[i], C = cam(i, u); frame(S.a + u); setU(u, false);
  if (!S.fin) { setLayer(null); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); S.fn(); const t = LAY[0].getContext('2d'); t.setTransform(1, 0, 0, 1, 0, 0); t.clearRect(0, 0, W, H); t.drawImage(MAIN, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, W, H); draw(LAY[0], C, 1); return; }
  for (let n = 0; n < 3; n++) { setLayer(n); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); S.fn(); const t = LAY[n].getContext('2d'); t.setTransform(1, 0, 0, 1, 0, 0); t.clearRect(0, 0, W, H); t.drawImage(MAIN, 0, 0); }
  setLayer(null); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  for (let n = 0; n < 3; n++) draw(LAY[n], C, DEPTH[n]);
  S.fin();
}
const segAt = T => { let i = SEG.findIndex(s => T < s.b); return i < 0 ? SEG.length - 1 : i; };
let frozen = false;
function scene(T) {   // the picture at time T (no captions, no stamp)
  const i = segAt(T), u = T - SEG[i].a;
  if (i === 1 && u < .38) {   // freeze-frame of P1 shrinks into the archive photo while the folder slams in
    if (!frozen) { shot(0, 2.299); freeze.getContext('2d').drawImage(MAIN, 0, 0); frozen = true; }
    shot(1, u); const k = io(u / .38);
    g.save(); g.filter = `sepia(${k}) contrast(${1 + .15 * k})`; g.translate(540, lerp(960, 1100, k)); g.rotate(lerp(0, -.012, k)); const sc = lerp(1, .5, k); g.scale(sc, sc);
    g.globalAlpha = 1 - clamp((u - .3) / .08); g.drawImage(freeze, -540, -960); g.restore(); g.filter = 'none'; g.globalAlpha = 1;
    if (u < .06) { g.fillStyle = `rgba(255,250,240,${.8 * (1 - u / .06)})`; g.fillRect(0, 0, W, H); }
  } else if (i === 2 && u < .32) {   // out of the photo: the sepia archive dissolves into the living street (colour blooms in)
    shot(1, SEG[1].b - SEG[1].a - 1e-3); freeze.getContext('2d').drawImage(MAIN, 0, 0); shot(2, u); frozen = false;
    const k = io(u / .32), t = LAY[0].getContext('2d'); t.setTransform(1, 0, 0, 1, 0, 0); t.drawImage(MAIN, 0, 0);
    g.setTransform(1, 0, 0, 1, 0, 0); g.filter = `sepia(${1 - k})`; g.drawImage(LAY[0], 0, 0); g.filter = 'none';   // the colour blooms back in
    g.globalAlpha = (1 - k) ** 2; g.drawImage(freeze, 0, 0); g.globalAlpha = 1;
    if (u < .1) { g.fillStyle = `rgba(255,244,225,${.35 * (1 - u / .1)})`; g.fillRect(0, 0, W, H); }
  } else shot(i, u);
}
window.DUR = 9.05;
window.render = T => {
  const i = segAt(T), n = SEG[i].blur, dt = 1 / 24;
  if (n > 1) {   // motion blur: average n sub-frames across a 180° shutter
    A.setTransform(1, 0, 0, 1, 0, 0);
    for (let k = 0; k < n; k++) { const tt = Math.max(SEG[i].a, Math.min(SEG[i].b - 1e-3, T + (k / (n - 1) - .5) * dt * .35)); scene(tt); A.globalAlpha = 1 / (k + 1); A.drawImage(MAIN, 0, 0); }
    A.globalAlpha = 1; g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(acc, 0, 0);
  } else scene(T);
  const u = T - SEG[i].a;
  if (i === 2) { const k = clamp((u - 1.6) / .25); if (k > 0) { g.save(); g.globalAlpha = k; stamp('BOSTON', '15 JAN 1919', '12:30', AMBER, { x: 60, y: 210 }); g.restore(); } }
  const caps = SEG[i].caps; let p = -1; caps.forEach((ph, j) => { if (T >= ph[0].t0) p = j; });
  if (p >= 0 && !(i === 1 && u > 2.9)) timedCaption(caps[p], T, AMBER, { y: 1330 });
};
Promise.all([document.fonts.load('600 40px "Oswald"'), document.fonts.load('700 30px "Courier Prime"'), brushReady()]).then(async () => {
  setLayer(null); setU(0, false); frame(0); P1(); setU(0, false); P8(); await preparePaint(); window.render(0); window.READY = true;
});
