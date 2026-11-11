// Key-scene preview: P1 (VO 0–2.3) → P3 (VO 2.3–5.4) → P8 (VO 9.0–12.65), 9.05 s.
// Camera moves per panel, slam/flash/crossfade transitions, word-by-word captions timed to the VO.
import { P1, P3, P8, setU, MAIN } from './panels.js';
import { init, frame, g, W, H } from '/engine/toon.js';
import { stamp, wordCaption } from '/engine/brand.js';
import { vnoise, clamp } from '/core/lib.js';
const AMBER = '#ffb43a';
const back = (t, s = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((s + 1) * t + s); }, io = t => { t = clamp(t); return t * t * (3 - 2 * t); };
const SEG = [   // [start, end, panel, captionText, words timing (start,end in local s)]
  [0, 2.3, P1, 'Banjir ini <bukan> datang dari sungai.', [.05, 2.15]],
  [2.3, 5.4, P3, 'Ia keluar dari sebuah tangki <raksasa>—', [.05, 2.9]],
  [5.4, 9.05, P8, 'Boston, 15 Januari 1919.', [.2, 3.3]],
];
const tmp = document.createElement('canvas'); tmp.width = W; tmp.height = H; const tx = tmp.getContext('2d');
function panel(i, u) {   // draw panel i at local time u onto MAIN, then apply its camera through tmp
  const [, , fn] = SEG[i]; setU(u, false); frame(SEG[i][0] + u); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); fn();
  let s = 1, cx = 540, cy = 960, ox = 0, oy = 0, rot = 0;
  if (i === 0) { s = 1.02 + .1 * io(u / 2.3); cy = 1000; const a = 7 + 10 * u; ox = (vnoise(u * 3.1) - .5) * a; oy = (vnoise(u * 3.7 + 9) - .5) * a; rot = (vnoise(u * 2 + 4) - .5) * .012; }
  if (i === 1) { s = u < .2 ? Math.max(1, 1.35 - .35 * back(u / .2, 2.4)) : 1 + .05 * io((u - .2) / 2.9); const k = Math.exp(-u * 9) * 22; ox = (vnoise(u * 30) - .5) * k; oy = (vnoise(u * 33 + 5) - .5) * k; }
  if (i === 2) { s = 1.1 - .03 * io(u / 3.65); ox = 40 - 80 * io(u / 3.65); cy = 900; }
  tx.setTransform(1, 0, 0, 1, 0, 0); tx.clearRect(0, 0, W, H); tx.drawImage(MAIN, 0, 0);
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  g.translate(cx + ox, cy + oy); g.rotate(rot); g.scale(s, s); g.translate(-cx, -cy); g.drawImage(tmp, 0, 0); g.setTransform(1, 0, 0, 1, 0, 0);
}
const prev = document.createElement('canvas'); prev.width = W; prev.height = H; const px = prev.getContext('2d');
window.DUR = 9.05;
window.render = T => {
  let i = SEG.findIndex(s => T < s[1]); if (i < 0) i = SEG.length - 1;
  const u = T - SEG[i][0];
  // crossfade into P8 from P3 over 0.25 s
  if (i === 2 && u < .25) { panel(1, SEG[1][1] - SEG[1][0]); px.setTransform(1, 0, 0, 1, 0, 0); px.drawImage(MAIN, 0, 0); panel(2, u); g.globalAlpha = 1 - u / .25; g.drawImage(prev, 0, 0); g.globalAlpha = 1; }
  else panel(i, u);
  // white flash on the cut P1 → P3
  if (i === 1 && u < .1) { g.fillStyle = `rgba(255,250,240,${1 - u / .1})`; g.fillRect(0, 0, W, H); }
  // overlays: stamp on P8, captions word by word
  if (i === 2) { const k = clamp((u - .35) / .25); if (k > 0) { g.save(); g.globalAlpha = k; stamp('BOSTON', '15 JAN 1919', '12:30', AMBER, { x: 60, y: 210 }); g.restore(); } }
  const [, , , text, [w0, w1]] = SEG[i], n = text.split(' ').length, shown = Math.max(0, Math.min(n, Math.floor((u - w0) / ((w1 - w0) / n)) + 1));
  if (shown > 0) { const words = text.split(' '), c0 = Math.floor((shown - 1) / 3) * 3; wordCaption(words.slice(c0, shown).join(' '), AMBER, { y: i === 1 ? 1690 : 1330 }); }   // phrases of up to 3 words, built word by word
};
document.fonts.load('600 40px "Oswald"').then(() => document.fonts.load('700 30px "Courier Prime"')).then(() => { window.render(0); window.READY = true; });
