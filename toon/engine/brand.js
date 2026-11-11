// brand.js — the channel signature that stays the same in every film, whatever the story's palette:
// 1) the time-and-place stamp in the first second, 2) captions with the keyword in the Threat Colour,
// 3) the Threat Colour rule: the cause of the disaster is the only saturated, glowing colour in the frame.
import { g, W, H, INK, fillOnly, ell, shape } from './toon.js';

export const PAPER = '#f4efe6';

// Glow: flat translucent rings (never gradients), and an optional wash of the threat colour over the frame
export function glow(cx, cy, rx, ry, col, a = .14, rings = 3) {
  for (let i = rings; i >= 1; i--) fillOnly(ell(cx, cy, rx * (1 + i * .35), ry * (1 + i * .35), 48), col, { boil: .6, alpha: a });
}
export function wash(col, a = .08) { g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = a; g.fillStyle = col; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }

// Stamp: place · date on one line, the clock time large; ink box, paper text, a threat-coloured tick
export function stamp(place, date, time, threat, { x = 64, y = 150 } = {}) {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.font = '700 30px "Courier Prime"'; const w1 = g.measureText(`${place} · ${date}`).width;
  g.font = '600 92px "Oswald"'; const w2 = g.measureText(time).width;
  const w = Math.max(w1, w2 + 70) + 48, h = 176;
  g.fillStyle = INK; g.globalAlpha = .88; g.fillRect(x, y, w, h); g.globalAlpha = 1;
  g.strokeStyle = PAPER; g.lineWidth = 2; g.strokeRect(x + 8, y + 8, w - 16, h - 16);
  g.fillStyle = PAPER; g.textBaseline = 'alphabetic'; g.textAlign = 'left';
  g.font = '700 30px "Courier Prime"'; g.fillText(`${place} · ${date}`, x + 24, y + 52);
  g.font = '600 92px "Oswald"'; g.fillText(time, x + 70, y + 152);
  // clock icon in the threat colour
  const cx = x + 42, cy = y + 118; g.lineWidth = 5; g.strokeStyle = threat; g.beginPath(); g.arc(cx, cy, 17, 0, Math.PI * 2); g.stroke();
  g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx, cy - 11); g.moveTo(cx, cy); g.lineTo(cx + 8, cy + 4); g.stroke();
}

// Caption: condensed bold, paper fill, thick ink outline; the word(s) between < > are set in the threat colour
export function caption(str, threat, { y = 1470, size = 84, k = 1 } = {}) {
  if (k <= 0) return;
  const sc = k < 1 ? 1 + (1 - k) * .35 * Math.sin(k * Math.PI) - (1 - k) * .3 : 1;   // pop: a quick overshoot as it lands
  g.globalAlpha = Math.min(1, k * 3);
  g.setTransform(sc, 0, 0, sc, W / 2 * (1 - sc), y * (1 - sc)); g.font = `600 ${size}px "Oswald"`; g.textBaseline = 'middle'; g.textAlign = 'left';
  const parts = str.toUpperCase().split(/(<[^>]+>)/).filter(Boolean).map(s => ({ s: s.replace(/[<>]/g, ''), hot: s.startsWith('<') }));
  const total = parts.reduce((a, p) => a + g.measureText(p.s).width, 0);
  let x = (W - total) / 2;
  g.fillStyle = INK; g.globalAlpha *= .62; g.fillRect(x - 34, y - size * .72, total + 68, size * 1.4); g.globalAlpha = Math.min(1, k * 3);   // ink ribbon: the keyword stays readable over its own threat colour
  for (const p of parts) {
    g.lineJoin = 'round'; g.lineWidth = 16; g.strokeStyle = INK; g.strokeText(p.s, x, y);
    g.fillStyle = p.hot ? threat : PAPER; g.fillText(p.s, x, y); x += g.measureText(p.s).width;
  }
  g.globalAlpha = 1; g.setTransform(1, 0, 0, 1, 0, 0);
}
