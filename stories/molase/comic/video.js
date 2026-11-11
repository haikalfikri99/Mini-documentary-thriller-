// Key-scene preview v2: multiplane parallax, story-driven camera, freeze-frame → archive-photo transition, word captions.
// P1 (VO 0–2.3): extreme close-up on the scream → pull back to reveal the wave. P3 (VO 2.3–5.4): the last frame of P1 freezes,
// turns sepia and shrinks into the photo while the ARSIP slams. P8 (VO 9.0–12.65): crane down from the tank to the street.
window.__video = true;
import { P1, P3, P8, finishP1, finishP8, setU, setLayer, preparePaint, brushReady, MAIN } from './panels.js';
import { frame, g, W, H } from '/engine/toon.js';
import { stamp, wordCaption } from '/engine/brand.js';
import { vnoise, clamp, lerp } from '/core/lib.js';
const AMBER = '#ffb43a';
const io = t => { t = clamp(t); return t * t * (3 - 2 * t); }, eo = t => 1 - (1 - clamp(t)) ** 3, back = (t, s = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((s + 1) * t + s); };
const SEG = [
  { a: 0, b: 2.3, fn: P1, fin: finishP1, text: 'Banjir ini <bukan> datang dari sungai.', w: [.05, 2.15], y: 1330 },
  { a: 2.3, b: 5.4, fn: P3, fin: null, text: 'Ia keluar dari sebuah tangki <raksasa>—', w: [.05, 2.9], y: 1690 },
  { a: 5.4, b: 9.05, fn: P8, fin: finishP8, text: 'Boston, 15 Januari 1919.', w: [.25, 3.3], y: 1340 },
];
const DEPTH = [.55, .85, 1.25];   // parallax factor per layer: environment, mid characters, foreground
const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
const LAY = [mk(), mk(), mk()], freeze = mk();
// camera per panel: scale s about (cx, cy), offset (ox, oy), roll
function cam(i, u) {
  if (i === 0) {   // reveal: tight on the scream, pull back to show the wave, then a slow push with growing shake
    const k = io(u / 1.5), s = u < 1.5 ? lerp(2.5, 1.05, k) : 1.05 + .03 * io((u - 1.5) / .8), a = 4 + 12 * u;
    return { s, cx: lerp(548, 540, k), cy: lerp(690, 930, k), ox: (vnoise(u * 3.1) - .5) * a, oy: (vnoise(u * 3.7 + 9) - .5) * a, rot: -.03 + (vnoise(u * 2 + 4) - .5) * .02 };
  }
  if (i === 1) return { s: u < .2 ? Math.max(1, 1.35 - .35 * back(u / .2, 2.4)) : 1 + .05 * io((u - .2) / 2.9), cx: 540, cy: 960, ox: (vnoise(u * 30) - .5) * Math.exp(-u * 9) * 22, oy: (vnoise(u * 33 + 5) - .5) * Math.exp(-u * 9) * 22, rot: 0 };
  // crane down from the sky and the tank to the street, settling as the worker looks up
  const k = eo(u / 2.4);
  return { s: lerp(1.7, 1.05, k), cx: lerp(470, 540, k), cy: lerp(560, 960, k), ox: lerp(0, -18, io(u / 3.65)), oy: 0, rot: 0 };   // tilt down: from the tank and the sky to the street
}
function draw(c, C, depth) {   // draw canvas c with camera C scaled by depth
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
let frozen = false;
window.DUR = 9.05;
window.render = T => {
  let i = SEG.findIndex(s => T < s.b); if (i < 0) i = SEG.length - 1;
  const u = T - SEG[i].a;
  if (i === 1 && u < .38) {   // freeze-frame of P1 shrinks into the archive photo while the folder slams in
    if (!frozen) { shot(0, 2.299); freeze.getContext('2d').drawImage(MAIN, 0, 0); frozen = true; }
    shot(1, u); const k = io(u / .38);
    g.save(); g.filter = `sepia(${k}) contrast(${1 + .15 * k})`; g.translate(lerp(540, 540, k), lerp(960, 1100, k)); g.rotate(lerp(0, -.012, k)); const sc = lerp(1, .5, k); g.scale(sc, sc);
    g.globalAlpha = 1 - clamp((u - .3) / .08); g.drawImage(freeze, -540, -960); g.restore(); g.filter = 'none'; g.globalAlpha = 1;
    if (u < .06) { g.fillStyle = `rgba(255,250,240,${.8 * (1 - u / .06)})`; g.fillRect(0, 0, W, H); }
  } else if (i === 2 && u < .3) {   // crossfade P3 → P8
    shot(1, SEG[1].b - SEG[1].a); freeze.getContext('2d').drawImage(MAIN, 0, 0); shot(2, u);
    g.globalAlpha = 1 - u / .3; g.drawImage(freeze, 0, 0); g.globalAlpha = 1; frozen = false;
  } else shot(i, u);
  if (i === 2) { const k = clamp((u - 1.6) / .25); if (k > 0) { g.save(); g.globalAlpha = k; stamp('BOSTON', '15 JAN 1919', '12:30', AMBER, { x: 60, y: 210 }); g.restore(); } }
  const S = SEG[i], words = S.text.split(' '), n = words.length, shown = clamp(Math.floor((u - S.w[0]) / ((S.w[1] - S.w[0]) / n)) + 1, 0, n);
  if (shown > 0) { const c0 = Math.floor((shown - 1) / 3) * 3; wordCaption(words.slice(c0, shown).join(' '), AMBER, { y: S.y }); }
};
Promise.all([document.fonts.load('600 40px "Oswald"'), document.fonts.load('700 30px "Courier Prime"'), brushReady()]).then(async () => {
  setLayer(null); setU(0, false); frame(0); P1(); setU(0, false); P8(); await preparePaint(); window.render(0); window.READY = true;
});
