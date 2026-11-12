// noir.js — the premium look for #002: an editorial / noir graphic-novel portrait (adult proportions, small almond eyes,
// a hard terminator splitting the face into light and ink), halftone dots as the language of light (Spider-Verse style),
// and print texture. Built on the toon engine so the boiling line stays the channel's signature.
import { clamp, lerp, hash } from '../lib/toon/lib.js';
import { g, W, H, INK, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, rr, rect, spline, dot, getM, zoom } from '../lib/toon/toon.js';

export const NOIR = { ink: '#0d0f14', shadow: '#151a24', paper: '#efe6d2', skin: '#d9b08f', skinLit: '#f2d5bb', hair: '#16130f' };
const shift = (pts, dx, dy) => pts.map(([x, y]) => [x + dx, y + dy]);

// halftone light: dots inside the clip path, bigger near the light, sized on a fixed screen grid (print look)
export function halftone(clipPath, lx, ly, r, col, { cell = 14, max = .62, a = .9, inner = 0 } = {}) {
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); if (clipPath) g.clip(clipPath); g.fillStyle = col; g.globalAlpha = a;
  const x0 = Math.max(0, lx - r), x1 = Math.min(W, lx + r), y0 = Math.max(0, ly - r), y1 = Math.min(H, ly + r);
  for (let y = Math.floor(y0 / cell) * cell; y < y1; y += cell) for (let x = Math.floor(x0 / cell) * cell + ((y / cell) % 2 ? cell / 2 : 0); x < x1; x += cell) {
    const d = Math.hypot(x - lx, y - ly); if (d > r) continue; const k = clamp((1 - d / r) * (1 + inner));
    const rad = cell * max * Math.sqrt(k); if (rad < .6) continue; g.beginPath(); g.arc(x, y, rad, 0, 6.2832); g.fill();
  }
  g.restore();
}
// misregistered print grain: paper fibres + a faint second plate offset by 2 px (applied to the whole frame)
let tex = null;
export function printTexture(a = .16) {
  if (!tex) { tex = document.createElement('canvas'); tex.width = 540; tex.height = 960; const x = tex.getContext('2d'); const d = x.createImageData(540, 960);
    for (let i = 0; i < d.data.length; i += 4) { const n = 128 + (hash(i * .37) - .5) * 90 + (hash(Math.floor(i / 2160) * 7.1) - .5) * 40; d.data[i] = d.data[i + 1] = d.data[i + 2] = n; d.data[i + 3] = 255; } x.putImageData(d, 0, 0); }
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'overlay'; g.globalAlpha = a; g.drawImage(tex, 0, 0, W, H); g.restore();
}
// cinematic finish: crushed blacks toward ink-blue, a cool/warm split, film grain, heavy vignette
export function noirFinish({ vig = .55, warm = 0 } = {}) {
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalCompositeOperation = 'multiply'; g.globalAlpha = .18; g.fillStyle = '#26324a'; g.fillRect(0, 0, W, H);
  if (warm) { g.globalCompositeOperation = 'soft-light'; g.globalAlpha = warm; g.fillStyle = '#ffcf8a'; g.fillRect(0, 0, W, H); }
  g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
  const r = g.createRadialGradient(W / 2, H * .45, H * .18, W / 2, H * .5, H * .78); r.addColorStop(0, 'rgba(5,6,9,0)'); r.addColorStop(1, `rgba(5,6,9,${vig})`); g.fillStyle = r; g.fillRect(0, 0, W, H);
  g.restore(); printTexture(.14);
}

// —— the noir portrait: head and shoulders, 3/4 view facing right (face = -1 mirrors) ——
// light: { x, y } screen point of the key light (the phone/laptop), col: its colour; o: { s, face, tilt, lid, brow, sad, closed, look, beard, stubble, glasses, glint, hair, jacket, skin }
export function portrait(x, y, o = {}) {
  const s = o.s ?? 1, f = o.face ?? 1, L = o.light || { x: x, y: y + 400 * s, col: '#7fe3ff' };
  const skin = o.skin || NOIR.skin, hairC = o.hair || NOIR.hair, jacket = o.jacket || '#1b2029';
  push(); translate(x, y); rotate(o.tilt || 0); scale(s * f, s);
  // shoulders / jacket: mostly swallowed by the dark (silhouette first)
  const body = [[-300, 520], [-250, 300], [-150, 230], [-60, 205], [60, 205], [160, 235], [250, 300], [310, 520]];
  const Pb = shape(spline(body, true, 10), { fill: jacket, lw: 7 });
  stroke(spline([[-60, 205], [-20, 290], [10, 330]], false, 8), 6, { line: '#0b0d11' });   // collar fold
  // neck
  shape([[-48, 110], [42, 110], [52, 222], [-58, 222]], { fill: skin, lw: 6, shade: () => fillOnly([[-48, 110], [42, 110], [52, 175], [-58, 190]], NOIR.ink, { alpha: .6, boil: .3 }) });
  // ear (far side, toward the back)
  shape(ell(-92, 8, 22, 34), { fill: skin, lw: 6 });
  // face silhouette: forehead → brow ridge → cheekbone → jaw → chin (front = +x)
  const face = spline([[-92, -118], [10, -150], [84, -112], [96, -52], [92, -8], [98, 30], [82, 72], [60, 112], [18, 138], [-36, 128], [-82, 82], [-104, 20], [-108, -60]], true, 10);
  const Pf = shape(face, { fill: skin, lw: 7 });
  // shadow side: everything of the face NOT covered by the face shifted toward the light
  { const m = getM(), lx = (L.x - m[4]) / (s * f), ly = (L.y - m[5]) / s, d = Math.hypot(lx, ly) || 1, k = o.term ?? 74;
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.clip(Pf);
    const lit = shape(shift(face, lx / d * k, ly / d * k), { fill: null, stroke: false, boil: .6 });
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = .82; g.fillStyle = NOIR.shadow; const sh = new Path2D(); sh.addPath(Pf); sh.addPath(lit); g.fill(sh, 'evenodd'); g.globalAlpha = 1;
    halftone(lit, L.x, L.y, 520 * s, L.col, { cell: 11 * s, max: .55, a: .55, inner: .2 });
    g.restore(); }
  // nose: a ridge line and the underside shadow (no outlined triangle)
  stroke(spline([[52, -52], [66, -10], [84, 26]], false, 8), 6);
  fillOnly(spline([[84, 26], [70, 40], [50, 38], [58, 30]], true, 6), NOIR.ink, { alpha: .7, boil: .3 });
  // eyes: almond, dark iris, heavy upper lid
  const lid = o.lid ?? .35, look = o.look || [0, .4];
  for (const [ex, ey, w, h] of [[42, -38, 30, 13], [-28, -38, 24, 11]]) {
    if (o.closed) { stroke(spline([[ex - w, ey + 2], [ex, ey + 6], [ex + w, ey + 1]], false, 8), 6); continue; }
    const almond = spline([[ex - w, ey + 2], [ex - w * .2, ey - h], [ex + w, ey - 1], [ex + w * .2, ey + h * .9]], true, 8);
    shape(almond, { fill: '#e9e3d6', lw: 4, shade: () => { dot(ex + look[0] * w * .45, ey + look[1] * h * .6, h * .78, '#1a1512'); if (o.glint !== false) dot(ex + look[0] * w * .45 + 3, ey + look[1] * h * .6 - 3, 2.4, L.col); fillOnly([[ex - w * 1.4, ey - h * 1.8], [ex + w * 1.4, ey - h * 1.8], [ex + w * 1.4, ey - h + lid * 2 * h], [ex - w * 1.4, ey - h + lid * 2 * h]], skin, { boil: .3 }); } });
    stroke(spline([[ex - w * 1.05, ey + 1], [ex - w * .2, ey - h + lid * 2 * h - 2], [ex + w * 1.05, ey - 2]], false, 8), 7);   // lid line
  }
  // brows: thick strokes, inner end raised when sad
  const br = o.brow ?? 0, sad = o.sad ?? 0;
  stroke(spline([[18, -60 - sad * 10], [42, -66 - br * 8], [72, -60]], false, 8), 10);
  stroke(spline([[-48, -60], [-28, -65 - br * 8], [-6, -60 - sad * 10]], false, 8), 9);
  // mouth: a short line, corners down when sad
  stroke(spline([[22, 84 + sad * 4], [44, 80], [64, 84 + sad * 6]], false, 6), 6);
  if (o.stubble) for (let i = 0; i < 70; i++) dot(-60 + hash(i * 3.1) * 140, 70 + hash(i * 7.7) * 60, 1.6, '#5b4a3e');
  if (o.beard) shape(spline([[-96, 30], [-70, 96], [-20, 140], [30, 146], [70, 112], [86, 70], [70, 96], [44, 100], [20, 94], [-10, 104], [-60, 70], [-84, 20]], true, 8), { fill: '#2a221d', lw: 6 });
  // hair: one dark mass (merges with the shadow, so the head reads as a silhouette with a lit face)
  shape(spline([[-118, -20], [-128, -110], [-70, -170], [20, -182], [92, -142], [104, -96], [76, -118], [40, -110], [6, -124], [-30, -112], [-70, -96], [-96, -40]], true, 10), { fill: hairC, lw: 7 });
  // glasses with the screen reflected in the lenses
  if (o.glasses) {
    for (const [ex, ey, w, h] of [[42, -38, 40, 26], [-28, -38, 32, 24]]) { const lens = rr(ex - w, ey - h, w * 2, h * 2, 10); shape(lens, { fill: null, lw: 6 }); if (o.glint !== false) fillOnly([[ex - w * .6, ey - h * .7], [ex + w * .1, ey - h * .7], [ex - w * .1, ey + h * .5], [ex - w * .8, ey + h * .5]], L.col, { alpha: .35 * (o.glintA ?? 1), boil: .3 }); }
    stroke([[2, -38], [10, -40]], 6); stroke([[-60, -40], [-94, -30]], 6);
  }
  pop();
  // the lit edge of the body: halftone of the screen light on the jacket
  halftone(Pb, L.x, L.y, 480 * s, L.col, { cell: 12 * s, max: .5, a: .35 });
}

// —— the silhouette portrait (what premium noir posters do): a profile in ink, rim-lit by the screen along the face,
// the screen mirrored in the lens. Emotion comes from posture (head drop), not from drawn features.
// o: { s, down 0..1, lens 0..1 (screen in the glasses), rim 0..1, col, beard, feedOff }
const PROFILE = [[-150, -120], [-120, -205], [-40, -250], [40, -240], [92, -196], [112, -140], [118, -96], [128, -70], [124, -50], [146, -10], [150, 6], [132, 14], [128, 34], [138, 46], [130, 60], [122, 70], [126, 92], [112, 114], [84, 130], [40, 136], [0, 150]];
const BACK = [[0, 150], [-30, 200], [-60, 236], [-180, 260], [-300, 330], [-360, 520], [380, 520], [330, 330], [220, 270], [120, 240], [60, 200], [-150, 40], [-170, -40]];
export function silhouette(x, y, o = {}) {
  const s = o.s ?? 1, down = o.down ?? 0, col = o.col || '#7fe3ff', rim = o.rim ?? 1;
  push(); translate(x, y); scale(s);
  // shoulders and back of the head: one ink mass
  const body = spline([[-70, 120], [-80, 230], [-200, 262], [-330, 320], [-400, 470], [-420, 900], [430, 900], [420, 480], [360, 330], [220, 262], [96, 232], [62, 150], [20, 120]], true, 10);
  shape(body, { fill: '#07080b', lw: 0, line: null, boil: .4 });
  if (rim > 0) stroke(spline([[62, 150], [96, 232], [220, 262], [330, 312]], false, 8), 5, { line: col, alpha: .55 * rim, boil: .4 });   // light along the throat and shoulder
  push(); translate(0, 150); rotate(.35 * down); translate(0, -150);   // the head pivots on the neck when he lowers it
  const prof = o.beard ? PROFILE.slice(0, 15).concat([[128, 96], [130, 128], [112, 166], [64, 186], [0, 178]]) : PROFILE;
  const head = spline(prof.concat([[-60, 160], [-150, 40], [-170, -40]]), true, 10);
  const P = shape(head, { fill: '#07080b', lw: 0, line: null, boil: .4 });
  // rim light along the face line, brighter at nose, lips and chin (closest to the screen)
  if (rim > 0) { const edge = spline(prof.slice(4), false, 10);
    g.save(); g.filter = 'blur(10px)'; stroke(edge, 26, { line: col, alpha: .35 * rim, boil: .4 }); g.restore(); g.filter = 'none';
    stroke(edge, 7, { line: col, alpha: .95 * rim, boil: .4 }); stroke(spline(PROFILE.slice(1, 5), false, 8), 4, { line: col, alpha: .35 * rim, boil: .4 }); }
  // glasses: the lens edge and the feed reflected in it
  if (o.glasses !== false) {
    const lens = spline([[80, -114], [116, -112], [120, -88], [114, -68], [82, -70], [76, -92]], true, 6);
    shape(lens, { fill: '#0b0f15', lw: 5, line: '#2a3240' });
    if (o.lens ?? 1) { fillOnly([[84, -110], [112, -107], [110, -76], [86, -79]], col, { alpha: .75 * (o.lens ?? 1), boil: .2 });
      for (let k = 0; k < 3; k++) { const yy = -104 + ((k * 11 + (o.feedOff || 0) * 33) % 30); fillOnly(rect(88, yy, 18, 3), '#0d1116', { alpha: .6 * (o.lens ?? 1), boil: .1 }); } }
    stroke([[78, -96], [-60, -86]], 5, { line: '#1b212b' });
  }
  pop(); pop();
}
