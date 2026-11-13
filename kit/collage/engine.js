// ARSIP Kolase · the cutting table (vertical 1080x1920). Paper pieces: shadow by height, cut edge, paper back,
// poses on twos with overshoot/settle/jitter, slaps and slides, a rostrum camera, torn-paper captions.
// Adapted from lemo-opuscar styles/vintage-collage/demo/index.html (MIT, (c) 2026 Lemomo / LemoLab; see LICENSE-lemo-opuscar).
export const W = 1080, H = 1920;
export const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
export const EASE = {
  lin: p => p, out: p => 1 - Math.pow(1 - p, 3), in: p => p * p * p,
  io: p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2,
  back: p => { const s = 1.9; p -= 1; return p * p * ((s + 1) * p + s) + 1; }, hold: () => 0,
};
export function hash(a, b = 0) { let h = Math.imul(a | 0, 374761393) ^ Math.imul(b | 0, 668265263); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
export const STEP = 1 / 12;                       // paper moves on twos; the camera every frame
export const stepT = t => Math.floor(t / STEP + 1e-6) * STEP;
const D2R = Math.PI / 180;
export const PAL = { paper: '#E6D8BC', card: '#F3EAD6', manila: '#E4C68C', ink: '#1E1915', red: '#B3261E', green: '#2F4F4A', amber: '#D58E2A', news: '#E3DDD0' };
const EDGE = '#B29A72', BACK = '#E9DFC8', SHADOW = 'rgb(58,38,20)';

let ctx = null; export const SP = {}; export let M = null; let B = 1.5;
export const setCtx = c => { ctx = c; };
export const getCtx = () => ctx;

function canvasOf(w, h) { const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
function tinted(img, color, pad, blur) {
  const c = canvasOf(img.width + 2 * pad, img.height + 2 * pad), g = c.getContext('2d');
  const tmp = canvasOf(img.width, img.height), t = tmp.getContext('2d');
  t.drawImage(img, 0, 0); t.globalCompositeOperation = 'source-in'; t.fillStyle = color; t.fillRect(0, 0, img.width, img.height);
  if (blur) g.filter = `blur(${blur}px)`;
  g.drawImage(tmp, pad, pad); return c;
}
function backside(img) { const c = tinted(img, BACK, 0, 0), g = c.getContext('2d'); g.globalAlpha = 0.10; g.globalCompositeOperation = 'source-atop'; g.drawImage(img, 0, 0); return c; }
function sprite(img, k, back = true) {
  const pad = Math.round(16 * k);
  return { img, k, pad, edge: tinted(img, EDGE, 0, 0), sh1: tinted(img, SHADOW, pad, 2.5 * k), sh2: tinted(img, SHADOW, pad, 9 * k), back: back ? backside(img) : null };
}
async function loadImg(src) { const im = new Image(); im.src = src; await im.decode(); return im; }

const FONTS = [['Courier Prime', 'CourierPrime-Bold.ttf', '700'], ['IM Fell SC', 'IMFeENsc28P.ttf', '400'], ['IM Fell', 'IMFeENrm28P.ttf', '400'], ['Alfa Slab', 'AlfaSlabOne-Regular.ttf', '400']];
export async function loadAll(partsDir, fontDir) {
  await Promise.all(FONTS.map(async ([fam, file, wt]) => { const f = new FontFace(fam, `url(${fontDir}/${file})`, { weight: wt }); await f.load(); document.fonts.add(f); }));
  M = await (await fetch(partsDir + '/manifest.json')).json(); B = M._.B;
  const names = Object.keys(M).filter(k => !k.startsWith('_') && k !== 'paper');
  await Promise.all(names.map(async n => {
    const img = await loadImg(`${partsDir}/${n}.png`);
    SP[n] = M[n].ink ? { img, k: B, ink: true } : sprite(img, M[n].k || B, true);
    SP[n].m = M[n];
  }));
  SP.paper = { img: await loadImg(partsDir + '/paper.jpg'), m: M.paper };
}

// ---------- one paper piece: shadow -> cut edge -> front or back ----------
export function drawSprite(S, ax, ay, lx, ly, r, z, sx = 1, s = 1, alpha = 1) {
  const img = S.img, w = img.width / S.k, h = img.height / S.k, pad = (S.pad || 0) / S.k;
  const flipW = Math.abs(sx) < 0.04 ? 0.04 * Math.sign(sx || 1) : sx;
  const place = (dx, dy) => { ctx.save(); ctx.translate(ax + dx, ay + dy); ctx.rotate(r * D2R); ctx.scale(flipW * s, s); };
  if (S.sh1) {
    const zz = Math.max(0, z), off = [3 + 4.2 * zz, 4 + 5.4 * zz], soft = clamp(zz / 2.2, 0, 1);
    const sa = alpha * (0.32 - 0.035 * Math.min(zz, 4));
    place(off[0], off[1]);
    if (soft < 1) { ctx.globalAlpha = sa * (1 - soft); ctx.drawImage(S.sh1, -lx - pad, -ly - pad, w + 2 * pad, h + 2 * pad); }
    if (soft > 0) { ctx.globalAlpha = sa * soft; ctx.drawImage(S.sh2, -lx - pad, -ly - pad, w + 2 * pad, h + 2 * pad); }
    ctx.restore();
    const side = Math.sqrt(Math.max(0, 1 - sx * sx));
    place(0.9 + 2.4 * side * Math.sign(sx || 1), 1.2); ctx.globalAlpha = alpha; ctx.drawImage(S.edge, -lx, -ly, w, h); ctx.restore();
  }
  place(0, 0); ctx.globalAlpha = alpha;
  if (S.ink) ctx.globalCompositeOperation = 'multiply';
  ctx.drawImage(sx < 0 && S.back ? S.back : img, -lx, -ly, w, h);
  ctx.restore(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
}
export const sz = S => [S.img.width / S.k, S.img.height / S.k];
export function put(name, x, y, r = 0, z = 0, sx = 1, s = 1, a = 1) {
  const S = typeof name === 'string' ? SP[name] : name; if (!S) { console.error('missing part', name); return; }
  const [w, h] = sz(S); drawSprite(S, x, y, w / 2, h / 2, r, z, sx, s, a);
}

// anchored at a fraction of the piece (fx, fy in 0..1): hinges, pendulums, growing bars
export function putA(name, x, y, fx, fy, r = 0, z = 0, s = 1, a = 1) {
  const S = SP[name]; if (!S) { console.error('missing part', name); return; }
  const [w, h] = sz(S); drawSprite(S, x, y, w * fx, h * fy, r, z, 1, s, a);
}
export const has = n => !!SP[n];

// ---------- motion: keys [t, x, y, rot, z, sx, ease, land, scale] ----------
export function pose(keys, t, id = 1) {
  if (t <= keys[0][0]) { const k = keys[0]; return { x: k[1], y: k[2], r: k[3], z: k[4], sx: k[5] ?? 1, s: k[8] ?? 1 }; }
  let i = keys.length - 1; for (let j = 0; j < keys.length - 1; j++) if (t < keys[j + 1][0]) { i = j; break; }
  const a = keys[i]; let p;
  if (i === keys.length - 1) p = { x: a[1], y: a[2], r: a[3], z: a[4], sx: a[5] ?? 1, s: a[8] ?? 1 };
  else {
    const b = keys[i + 1], e = EASE[b[6] || 'out'](seg(t, a[0], b[0]));
    p = { x: lerp(a[1], b[1], e), y: lerp(a[2], b[2], e), r: lerp(a[3], b[3], e), z: lerp(a[4], b[4], e), sx: lerp(a[5] ?? 1, b[5] ?? 1, e), s: lerp(a[8] ?? 1, b[8] ?? 1, e), moving: b[6] !== 'hold' };
  }
  for (let j = 0; j <= i; j++) {
    const k = keys[j]; if (!k[7]) continue;
    const s = t - k[0]; if (s < 0 || s > 0.34) continue;
    const n = Math.round(s / STEP), dec = Math.pow(0.45, n);
    p.r += k[7] * dec * (n % 2 ? -1 : 1); p.y += -2.2 * dec * (n % 2 ? 0 : 1) * Math.sign(k[7]);
  }
  if (p.moving) { const n = Math.round(t / STEP); p.x += (hash(id, n) - .5) * 1.4; p.y += (hash(id + 7, n) - .5) * 1.4; p.r += (hash(id + 3, n) - .5) * 0.5; }
  return p;
}
// draw with keys at stepped time; returns pose (null before it enters)
export function putK(name, keys, t, id = 1, opts = {}) {
  if (t < keys[0][0] - 1e-6) return null;
  const p = pose(keys, stepT(t), id); put(name, p.x, p.y, p.r, p.z, p.sx, p.s * (opts.s || 1), opts.a ?? 1); return p;
}
// slapped down at t0 (0.17 s before it is higher, larger, tilted)
export const slap = (t0, x, y, r = 0, dx = -14, dy = -26) => [[t0 - 0.17, x + dx, y + dy, r - 5, 4.5, 1, null, 0, 1.12], [t0, x, y, r, 0, 1, 'in', 0.9, 1.0]];
// slides in from an offset over [t0, t1] with overshoot and a settle
export const slide = (t0, t1, x, y, r, fx, fy, fr = 0, land = 0.8) => [[t0, x + fx, y + fy, r + fr, 2.0, 1], [t1, x, y, r, 0, 1, 'back', land]];
// dropped from above, lands with a bounce
export const drop = (t0, t1, x, y, r = 0, h = 900, land = 1.2) => [[t0, x, y - h, r - 6, 3.5, 1], [t1, x, y, r, 0, 1, 'in', land]];
// already resting (present from the start)
export const rest = (x, y, r = 0) => [[-99, x, y, r, 0, 1]];
// ink stamp pressed at t0: a light blur of contact, then ink
export function stampAt(name, t, t0, x, y, r = -8, s = 1) {
  if (t < t0 - 0.12) return;
  const p = seg(t, t0 - 0.12, t0), S = SP[name];
  const sc = s * (1.18 - 0.18 * EASE.in(p)), a = t < t0 ? 0.25 * p : 1;
  const [w, h] = sz(S); drawSprite(S, x, y, w / 2, h / 2, r, 0, 1, sc, a);
}

// ---------- table + torn colour fields ----------
export function drawPaper(x0 = -200, y0 = -300, x1 = W + 200, y1 = H + 300) {
  const P = SP.paper, w = P.img.width / P.m.scale, h = P.img.height / P.m.scale, bx = P.m.x, by = P.m.y;
  const i0 = Math.floor((x0 - bx) / w), i1 = Math.floor((x1 - bx) / w), j0 = Math.floor((y0 - by) / h), j1 = Math.floor((y1 - by) / h);
  for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
    ctx.save(); ctx.translate(bx + i * w + (i & 1 ? w : 0), by + j * h + (j & 1 ? h : 0)); ctx.scale(i & 1 ? -1 : 1, j & 1 ? -1 : 1);
    ctx.drawImage(P.img, 0, 0, w + 0.5, h + 0.5); ctx.restore();
  }
}

// ---------- camera: keys [t, cx, cy, zoom, ease, rot] ----------
export function cam(keys, t) {
  let k = keys.length - 1; for (let i = 0; i < keys.length - 1; i++) if (t < keys[i + 1][0]) { k = i; break; }
  if (k === keys.length - 1 || t <= keys[0][0]) { const a = t <= keys[0][0] ? keys[0] : keys[k]; return { cx: a[1], cy: a[2], z: a[3], r: a[5] || 0 }; }
  const a = keys[k], b = keys[k + 1], p = EASE[b[4] || 'io'](seg(t, a[0], b[0]));
  return { cx: lerp(a[1], b[1], p), cy: lerp(a[2], b[2], p), z: Math.exp(lerp(Math.log(a[3]), Math.log(b[3]), p)), r: lerp(a[5] || 0, b[5] || 0, p) };
}
export function applyCam(c, sh = [0, 0]) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(W / 2 + sh[0], H / 2 + sh[1]); ctx.rotate((c.r || 0) * D2R); ctx.scale(c.z, c.z); ctx.translate(-c.cx, -c.cy); }
export const shake = (t, t0, a = 8) => { const s = t - t0; if (s < 0 || s > 0.5) return [0, 0]; const d = Math.exp(-s * 9); return [a * d * Math.sin(s * 70), a * 1.2 * d * Math.sin(s * 55 + 1)]; };

// ---------- typewriter slip typed letter by letter (a baked slip, revealed by clipping) ----------
export function typed(name, t, t0, cps, x, y, r = 0, z = 0) {
  if (t < t0) return; const S = SP[name], m = S.m, [w, h] = sz(S);
  const n = Math.min(m.n, Math.floor((stepT(t) - t0) * cps));
  // slip first (blank background is the same sprite clipped to the text start), then the letters revealed left to right
  const frac = m.n ? n / m.n : 1, tx = m.tx || 0, textW = w - 2 * tx;
  ctx.save(); ctx.translate(x, y); ctx.rotate(r * D2R);
  ctx.beginPath(); ctx.rect(-w / 2 - 20, -h / 2 - 20, tx + textW * frac + 20, h + 40); ctx.clip();
  put(name, 0, 0, 0, z); ctx.restore();
}

// ---------- captions: torn black slips with cream type in the caption band ----------
// words: [{w, s, e}] (script spelling, seconds). Chunks of <= maxChars break on punctuation and pauses.
export function chunkWords(words, maxChars = 18, maxWords = 4) {
  const out = []; let cur = [];
  const flush = () => { if (cur.length) out.push({ words: cur, s: cur[0].s, e: cur[cur.length - 1].e }); cur = []; };
  words.forEach((w, i) => {
    const len = cur.reduce((a, x) => a + x.w.length + 1, 0) + w.w.length;
    if (cur.length && (len > maxChars || cur.length >= maxWords || w.s - cur[cur.length - 1].e > 0.35)) flush();
    cur.push(w);
    if (/[.,?!…:]$/.test(w.w)) flush();
  });
  flush();
  for (let i = 0; i < out.length; i++) out[i].until = i + 1 < out.length ? out[i + 1].s : out[i].e + 0.6;
  return out;
}
function tornRect(x, y, w, h, seed) {
  ctx.beginPath(); const n = Math.max(6, Math.round(w / 26)), m = Math.max(3, Math.round(h / 22));
  const jit = (i) => (hash(seed, i) - .5) * 5;
  for (let i = 0; i <= n; i++) ctx.lineTo(x + w * i / n, y + jit(i));
  for (let i = 1; i <= m; i++) ctx.lineTo(x + w + jit(100 + i), y + h * i / m);
  for (let i = n - 1; i >= 0; i--) ctx.lineTo(x + w * i / n, y + h + jit(200 + i));
  for (let i = m - 1; i >= 1; i--) ctx.lineTo(x + jit(300 + i), y + h * i / m);
  ctx.closePath();
}
export function drawCaption(chunks, t, opt = {}) {
  const c = chunks.find(c => t >= c.s - 0.05 && t < c.until); if (!c) return;
  const size = opt.size || 66, cy = opt.y || 1330, idx = chunks.indexOf(c);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = `700 ${size}px "Courier Prime"`;
  const text = c.words.map(w => w.w).join(' ').toUpperCase();
  const tw = ctx.measureText(text).width, padX = 30, padY = 18, h = size + 2 * padY, w = tw + 2 * padX;
  const rot = (hash(idx, 5) - .5) * 3, landing = seg(t, c.s - 0.05, c.s + 0.08);
  const sc = 1.08 - 0.08 * EASE.in(landing);
  ctx.translate(W / 2, cy); ctx.rotate(rot * D2R); ctx.scale(sc, sc);
  ctx.fillStyle = 'rgba(40,24,10,0.35)'; tornRect(-w / 2 + 6, -h / 2 + 8, w, h, idx + 9); ctx.fill();
  ctx.fillStyle = '#1E1915'; tornRect(-w / 2, -h / 2, w, h, idx + 9); ctx.fill();
  ctx.textBaseline = 'middle'; let x = -tw / 2;
  for (const wd of c.words) {
    const s = wd.w.toUpperCase(), sw = ctx.measureText(s + ' ').width;
    ctx.fillStyle = t >= wd.s - 0.02 ? (opt.hot && opt.hot.test(wd.w) ? '#E9A53A' : '#F3EAD6') : 'rgba(243,234,214,0.35)';
    ctx.fillText(s, x, 3); x += sw;
  }
  ctx.restore();
}

// ---------- film assembly: shots are functions of local time (seconds since the shot started) ----------
export function createFilm({ shots, start, words, caption = {} }) {
  const chunks = words ? chunkWords(words, caption.maxChars, caption.maxWords) : [];
  return {
    renderAt(t) {
      let i = start.length - 2; for (let j = 0; j < start.length - 1; j++) if (t < start[j + 1]) { i = j; break; }
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = PAL.paper; ctx.fillRect(0, 0, W, H);
      ctx.save(); shots[i](t - start[i], t, start[i + 1] - start[i]); ctx.restore();
      if (chunks.length) drawCaption(chunks, t, caption);
    }
  };
}
