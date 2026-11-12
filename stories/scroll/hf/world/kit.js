// Shared set for #002: palette, the phone and its endless feed, the amber "next page" button (the brake),
// the 2006 monitor, the archive desk, stamps, and the screen light. Everything is drawn with the toon engine.
import { clamp, lerp, hash } from '../lib/toon/lib.js';
import { g, W, H, INK, init, frame, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, rr, rect, spline, dot, getM, setM, S as TS } from '../lib/toon/toon.js';
import { form, setLight } from '../lib/toon/cast.js';
import { paint, grade2, grain, vignette } from '../lib/toon/look.js';

export const SCREEN = '#7fe3ff', SCREEN_HI = '#dff8ff', SCREEN_DEEP = '#2b6f86';
export const AMBER = '#ffb43a', AMBER_DEEP = '#b86d10', PAPER = '#f4efe6', RED = '#b3261e';
export const NIGHT = '#151b24', NIGHT2 = '#1d2633';
export let U = 0; export const setU = u => { U = u; };

export const ss = t => { t = clamp(t); return t * t * (3 - 2 * t); };
export const eo = t => 1 - (1 - clamp(t)) ** 3, ei = t => clamp(t) ** 3;
export const back = (t, s = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((s + 1) * t + s); };
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const toHex = a => '#' + a.map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');
export const mix = (a, b, k) => { const A = hex(a), B = hex(b); return toHex(A.map((v, i) => lerp(v, B[i], k))); };

// —— offscreen drawing with the toon engine (feed contents, photos) ——
export const MAIN = document.getElementById('world'); init(MAIN);
export function offscreen(w, h, fn, t = 0) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d'), m = getM(); init(c); setM([1, 0, 0, 1, 0, 0]); fn(ctx, w, h); init(MAIN); setM(m); return c;   // keeps the caller's matrix and push stack
}
// draw a canvas into the current toon matrix (so it follows push/translate/rotate/scale)
export function blit(c, x, y, w, h, alpha = 1) { const m = getM(); g.save(); g.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]); g.globalAlpha = alpha; g.drawImage(c, x, y, w, h); g.restore(); }

// —— the feed: tall vertical cards (short videos), each a simple picture; `off` scrolls in card units ——
const CARD_ART = [
  (ctx, w, h) => { ctx.fillStyle = '#1f4250'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#dff1ee'; ctx.beginPath(); ctx.arc(w * .68, h * .3, w * .12, 0, 7); ctx.fill(); ctx.fillStyle = '#123039'; ctx.beginPath(); ctx.moveTo(0, h * .75); ctx.lineTo(w * .35, h * .45); ctx.lineTo(w * .6, h * .68); ctx.lineTo(w * .8, h * .52); ctx.lineTo(w, h * .7); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill(); },
  (ctx, w, h) => { ctx.fillStyle = '#3a4a5c'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#c9d6dc'; ctx.beginPath(); ctx.arc(w * .5, h * .42, w * .2, 0, 7); ctx.fill(); ctx.fillStyle = '#15202b'; ctx.beginPath(); ctx.arc(w * .5, h * .36, w * .21, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#ffb43a'; ctx.fillRect(w * .25, h * .62, w * .5, h * .4); },
  (ctx, w, h) => { ctx.fillStyle = '#18242f'; ctx.fillRect(0, 0, w, h); for (let i = 0; i < 6; i++) { ctx.fillStyle = ['#7fe3ff', '#4f8fa3', '#dff1ee', '#2c5a6b', '#9fd3df', '#ffb43a'][i]; ctx.beginPath(); ctx.arc(w * (.2 + hash(i) * .6), h * (.25 + hash(i * 3) * .5), w * (.06 + hash(i * 5) * .08), 0, 7); ctx.fill(); } },
  (ctx, w, h) => { ctx.fillStyle = '#e6e1d4'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#2c3a46'; ctx.fillRect(w * .15, h * .5, w * .7, h * .12); ctx.fillStyle = '#ffb43a'; ctx.beginPath(); ctx.ellipse(w * .5, h * .46, w * .26, h * .06, 0, 0, 7); ctx.fill(); },
  (ctx, w, h) => { ctx.fillStyle = '#0f1820'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#2f6b7a'; ctx.fillRect(0, h * .7, w, h * .3); ctx.fillStyle = '#dff1ee'; ctx.beginPath(); ctx.arc(w * .42, h * .62, w * .09, 0, 7); ctx.fill(); },
];
export const AD = 3;   // index of the card that carries an "IKLAN" tag
export function feed(ctx, w, h, off, { ads = false, dim = 0 } = {}) {
  ctx.fillStyle = '#0d1116'; ctx.fillRect(0, 0, w, h);
  const ch = h, i0 = Math.floor(off), f = off - i0;
  for (let k = -1; k <= 1; k++) {
    const idx = i0 + k, y = (k - f) * ch, n = ((idx % CARD_ART.length) + CARD_ART.length) % CARD_ART.length;
    ctx.save(); ctx.translate(0, y); ctx.beginPath(); ctx.rect(0, 0, w, ch); ctx.clip();
    CARD_ART[n](ctx, w, ch, idx);
    // overlay chrome of a short video: caption lines + side rail dots (no real app's UI)
    ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(0, ch * .78, w, ch * .22);
    ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(w * .07, ch * .83, w * (.45 + hash(idx) * .25), ch * .022); ctx.fillRect(w * .07, ch * .87, w * (.3 + hash(idx * 2) * .2), ch * .018);
    for (let r = 0; r < 3; r++) { ctx.beginPath(); ctx.arc(w * .9, ch * (.5 + r * .085), w * .035, 0, 7); ctx.fill(); }
    if (ads && n === AD) { ctx.fillStyle = AMBER; ctx.fillRect(w * .07, ch * .76, w * .2, ch * .045); ctx.fillStyle = INK; ctx.font = `600 ${Math.round(ch * .03)}px Oswald`; ctx.textBaseline = 'middle'; ctx.fillText('IKLAN', w * .095, ch * .783); }
    ctx.restore();
  }
  if (dim) { ctx.fillStyle = `rgba(0,0,0,${dim})`; ctx.fillRect(0, 0, w, h); }
}
const FEEDC = { c: null };
export function feedCanvas(w, h, off, o) { if (!FEEDC.c || FEEDC.c.width !== w || FEEDC.c.height !== h) { FEEDC.c = document.createElement('canvas'); FEEDC.c.width = w; FEEDC.c.height = h; } feed(FEEDC.c.getContext('2d'), w, h, off, o); return FEEDC.c; }

// —— the phone, held upright; centre (x, y), screen w×h; `off` = feed scroll; light = screen glow on the glass ——
export function phone(x, y, w, h, rot, off, { light = 1, ads = false, dim = 0, screenFn = null } = {}) {
  push(); translate(x, y); rotate(rot);
  form(rr(-w / 2 - 26, -h / 2 - 30, w + 52, h + 60, 54), '#1c2027', { lw: 7, sw: 10, rim: false });
  const c = screenFn ? screenFn(w, h) : feedCanvas(Math.round(w), Math.round(h), off, { ads, dim });
  blit(c, -w / 2, -h / 2, w, h);
  fillOnly(rr(-w * .12, -h / 2 - 18, w * .24, 12, 6), '#0d0f13', { boil: .1 });
  if (light > 0) { const m = getM(); g.save(); g.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]); g.globalCompositeOperation = 'screen'; g.globalAlpha = .12 * light; g.fillStyle = SCREEN; g.fillRect(-w / 2, -h / 2, w, h); g.restore(); }
  pop();
}

// —— screen light: a soft pool of cold light from a point (the phone) onto everything above it ——
export function screenLight(x, y, r, a = .5) {
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'soft-light';
  const gr = g.createRadialGradient(x, y, 10, x, y, r); gr.addColorStop(0, `rgba(160,235,255,${a})`); gr.addColorStop(1, 'rgba(160,235,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, W, H); g.restore();
}
// darkness outside the light (a room at night): multiply a radial falloff
export function nightFall(x, y, r0, r1, a = .75) {
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); const gr = g.createRadialGradient(x, y, r0, x, y, r1);
  gr.addColorStop(0, 'rgba(8,10,14,0)'); gr.addColorStop(1, `rgba(8,10,14,${a})`); g.fillStyle = gr; g.fillRect(0, 0, W, H); g.restore();
}

// —— the brake: the amber "Halaman berikutnya ›" button of a 2006 web page ——
export function nextButton(x, y, s = 1, { label = 'Halaman berikutnya ›', press = 0, lit = 0, crack = 0, alpha = 1 } = {}) {
  push(); translate(x, y); scale(s);
  const w = 520, h = 120, dy = press * 10;
  fillOnly(rr(-w / 2 + 10, -h / 2 + 18, w, h, 22), '#000', { alpha: .3 * alpha, boil: .1 });
  shape(rr(-w / 2, -h / 2 + 12, w, h, 22), { fill: AMBER_DEEP, lw: 7, alpha });
  shape(rr(-w / 2, -h / 2 + dy, w, h - 6, 22), { fill: mix(AMBER, '#fff1cf', lit * .35), lw: 7, alpha, shade: () => fillOnly(rr(-w / 2 + 16, -h / 2 + dy + 10, w - 32, 22, 11), '#fff3d6', { alpha: .55 * alpha, boil: .1 }) });
  g.save(); const m = getM(); g.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]); g.globalAlpha = alpha;
  g.font = '600 50px Oswald'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = INK; g.fillText(label, 0, dy + 2); g.restore();
  if (crack > 0) { const k = clamp(crack); stroke([[-40, -h / 2 + dy], [-10, -12], [-36, 8], [6, 30], [-6, h / 2 - 6]].slice(0, 2 + Math.floor(k * 3)), 6, { line: INK, boil: .3 });
    if (k > .5) stroke([[-10, -12], [60, -30], [120, -10]].slice(0, 1 + Math.floor((k - .5) * 6)), 5, { line: INK, boil: .3 }); }
  pop();
}

// —— 2006 web page (paper-white, blue links) for the monitor and the endless scroll ——
export function webPage(ctx, w, h, off, { button = true, page = 1 } = {}) {
  ctx.fillStyle = '#fbfaf5'; ctx.fillRect(0, 0, w, h);
  const row = 120; const i0 = Math.floor(off / row);
  for (let i = i0; i < i0 + Math.ceil(h / row) + 2; i++) {
    const y = i * row - off; if (y > h) break;
    ctx.fillStyle = '#2a4fbf'; ctx.fillRect(w * .08, y + 26, w * (.35 + hash(i) * .3), 16);
    ctx.fillStyle = '#9a968c'; ctx.fillRect(w * .08, y + 56, w * (.7 + hash(i * 3) * .2), 10); ctx.fillRect(w * .08, y + 76, w * (.5 + hash(i * 5) * .3), 10);
  }
  ctx.fillStyle = '#d9d4c7'; ctx.fillRect(0, 0, w, 70); ctx.fillStyle = '#6b665c'; ctx.font = '700 30px "Courier Prime"'; ctx.textBaseline = 'middle'; ctx.fillText(`halaman ${page}`, w * .06, 36);
}

// —— archive desk, papers, rubber stamp (#001 card set) ——
export function desk(tone = 0) {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = mix('#2a1d16', '#14100c', tone); g.fillRect(0, 0, W, H);
  for (let i = 0; i < 26; i++) { const y = i * 80; fillOnly(rect(-20, y, W + 40, 76), mix(mix('#3a281c', '#2c1e15', hash(i)), '#14100c', tone), { boil: .1 }); for (let k = 0; k < 4; k++) stroke(spline([[-20, y + 15 + k * 14], [400, y + 12 + k * 15 + 6 * Math.sin(i + k)], [1100, y + 16 + k * 14]], false, 8), 1.5, { line: '#24180f', boil: .1 }); }
}
export function rubber(str, x, y, rot, t, { size = 96, col = RED, pad = 40 } = {}) {
  if (t < 0) return; const st = Math.min(1, t / .12), sc = st < 1 ? 1.6 - .6 * st : 1 + .04 * Math.exp(-(t - .12) * 14) * Math.sin((t - .12) * 40);
  const c = document.createElement('canvas'), o = c.getContext('2d'); o.font = `600 ${size}px Oswald`; const w = o.measureText(str).width + pad * 2, h = size * 1.6;
  c.width = Math.ceil(w + size); c.height = Math.ceil(h + size); o.translate(c.width / 2, c.height / 2); o.font = `600 ${size}px Oswald`;
  o.strokeStyle = col; o.lineWidth = size * .12; o.strokeRect(-w / 2, -h / 2, w, h); o.lineWidth = size * .04; o.strokeRect(-w / 2 + size * .18, -h / 2 + size * .18, w - size * .36, h - size * .36);
  o.fillStyle = col; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText(str, 0, size * .06);
  o.globalCompositeOperation = 'destination-out'; for (let k = 0; k < 150; k++) { o.beginPath(); o.arc(-w / 2 + hash(k + size) * w, -h / 2 + hash(k * 7) * h, 1 + hash(k * 3) * 4, 0, 6.3); o.fill(); }
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(x, y); g.rotate(rot); g.scale(sc, sc); g.globalAlpha = .9 * st; g.drawImage(c, -c.width / 2, -c.height / 2); g.restore();
}
export function inkForm(pts, col = SCREEN, a = .7, glow = .3) {
  const P = shape(pts, { fill: '#07080b', lw: 0, line: null, boil: .4 });
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.lineJoin = 'round';
  if (glow) { g.filter = 'blur(8px)'; g.globalAlpha = glow; g.strokeStyle = col; g.lineWidth = 16; g.stroke(P); g.filter = 'none'; }
  g.globalAlpha = a; g.strokeStyle = col; g.lineWidth = 4; g.stroke(P); g.restore(); return P;
}
export function finishNight(a = .3) { paint(a); grade2('#1c2a3a', '#bfeeff', .1); grain(.05); vignette(.38); }
export function finishCard(a = .36) { paint(a); grade2('#2a2030', '#ffd49a', .12); grain(.05); vignette(.3); }
export { setLight, form };
