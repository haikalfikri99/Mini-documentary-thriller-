// Full film panels (storyboard v5), batch A: P2, P4, P5, P6, P7, plus shared card helpers (desk, paper, rubber stamp, arrow).
// Every panel reads U (seconds inside the panel). Characters act with keys() (anticipation, overshoot, settle); every move has a reason.
import { clamp, lerp, hash } from '/core/lib.js';
import { g, W, H, INK, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, spline, rr, rect, noodle, dot } from '/engine/toon.js';
import { person, setLight, form, SKIN, EXPR } from '/engine/cast.js';
import { keys, ease, blink, walk } from '/engine/motion.js';
import { paint, grade2, grain, vignette, dof } from '/engine/look.js';
import { MOL, barrel } from '/engine/fx.js';
import { U, setCam, scenePaint, P, at, who, CAST, boston, street, mix, shade, AMBER } from './panels.js';

export const ss = t => { t = clamp(t); return t * t * (3 - 2 * t); };
export const pop1 = (t, d = .14) => { t = clamp(t / d); const b = t - 1; return t >= 1 ? 1 : 1 + b * b * (2.7 * b + 1.7); };   // ease-out-back 0→1
// —— shared card set: the archive desk, sheets of paper, red rubber stamps, ink arrows
export function desk(tone = 0) {
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = mix('#2a1d16', '#14100c', tone); g.fillRect(0, 0, W, H);
  for (let i = 0; i < 26; i++) { const y = i * 80; fillOnly(rect(-20, y, W + 40, 76), mix(mix('#3a281c', '#2c1e15', hash(i)), '#14100c', tone), { boil: .1 }); for (let k = 0; k < 4; k++) stroke(spline([[-20, y + 15 + k * 14], [400, y + 12 + k * 15 + 6 * Math.sin(i + k)], [1100, y + 16 + k * 14]], false, 8), 1.5, { line: '#24180f', boil: .1 }); }
}
export function lamp(x = 540, y = 900, a = .55) { g.setTransform(1, 0, 0, 1, 0, 0); const r = g.createRadialGradient(x, y, 150, x, y, 1250); r.addColorStop(0, 'rgba(255,220,160,0.10)'); r.addColorStop(1, `rgba(0,0,0,${a})`); g.fillStyle = r; g.fillRect(0, 0, W, H); }
export function paper(x, y, w, h, rot = 0, col = '#e8e0cc', lines = 0) {
  push(); translate(x, y); rotate(rot); fillOnly(rect(-w / 2 + 14, -h / 2 + 18, w, h), '#000', { alpha: .25, boil: .1 });
  form(rect(-w / 2, -h / 2, w, h), col, { lw: 5, sw: 14, shade: () => { for (let k = 0; k < lines; k++) fillOnly(rect(-w / 2 + 40, -h / 2 + 60 + k * 30, (w - 80) * (.55 + hash(k + x) * .4), 7), '#8a8378', { boil: .1, alpha: .55 }); } }); pop();
}
// rubber stamp that slams in at time k0 (pops from 1.6× to 1×), red ink with worn holes
export function rubber(str, x, y, rot, t, { size = 96, col = '#b3261e', pad = 40 } = {}) {
  if (t < 0) return; const st = Math.min(1, t / .12), sc = st < 1 ? 1.6 - .6 * st : 1 + .04 * Math.exp(-(t - .12) * 14) * Math.sin((t - .12) * 40);
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(x, y); g.rotate(rot); g.scale(sc, sc); g.globalAlpha = .9 * st;
  g.font = `600 ${size}px "Oswald"`; const w = g.measureText(str).width + pad * 2, h = size * 1.6;
  g.strokeStyle = col; g.lineWidth = size * .12; g.strokeRect(-w / 2, -h / 2, w, h); g.lineWidth = size * .04; g.strokeRect(-w / 2 + size * .18, -h / 2 + size * .18, w - size * .36, h - size * .36);
  g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(str, 0, size * .06);
  g.globalCompositeOperation = 'destination-out'; for (let k = 0; k < 150; k++) { g.beginPath(); g.arc(-w / 2 + hash(k + size) * w, -h / 2 + hash(k * 7) * h, 1 + hash(k * 3) * 4, 0, 6.3); g.fill(); }
  g.restore(); g.globalCompositeOperation = 'source-over';
}
// hand-inked arrow from a to b, drawn on over d seconds from t = 0
export function arrow(a, b, t, { col = INK, w = 10, d = .25, bend = 40 } = {}) {
  const k = clamp(t / d); if (k <= 0) return; const m = [(a[0] + b[0]) / 2 + bend, (a[1] + b[1]) / 2 - bend], pts = [];
  for (let i = 0; i <= 20 * k; i++) { const s = i / 20, u = 1 - s; pts.push([u * u * a[0] + 2 * u * s * m[0] + s * s * b[0], u * u * a[1] + 2 * u * s * m[1] + s * s * b[1]]); }
  if (pts.length > 1) stroke(pts, w, { line: col, boil: .3 });
  if (k >= 1) { const [p, q] = [pts[pts.length - 2], pts[pts.length - 1]], an = Math.atan2(q[1] - p[1], q[0] - p[0]); stroke([[q[0] - Math.cos(an - .5) * 40, q[1] - Math.sin(an - .5) * 40], q, [q[0] - Math.cos(an + .5) * 40, q[1] - Math.sin(an + .5) * 40]], w, { line: col, boil: .3 }); }
}
export function bigText(str, x, y, { size = 150, fill = '#f4efe6', hot = false, k = 1, rot = 0 } = {}) {
  if (k <= 0) return; const sc = pop1(k * .14) ; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(x, y); g.rotate(rot); g.scale(sc, sc);
  g.font = `600 ${size}px "Oswald"`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = size * .16; g.strokeStyle = INK; g.strokeText(str, 0, 0);
  g.fillStyle = hot ? AMBER : fill; g.fillText(str, 0, 0); g.restore();
}
export function finishCard(a = .36) { paint(a); grade2('#2a2030', '#ffd49a', .12); grain(.05); vignette(.3); }

// ———————————————— P2 (1.32–2.9) "…datang dari sungai.": the worker's face, the wave reflected in his eyes
export function P2() {
  setLight({ dir: [0, -1], tint: '#24232c', a: .3, rim: AMBER, rimA: .95, rw: 10 });
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#2a1104'; g.fillRect(0, 0, W, H);
  for (let k = 0; k < 18; k++) { const x = hash(k) * 1180 - 50, y0 = ((U * 260 + hash(k * 3) * 1900) % 2300) - 300; stroke(spline([[x, y0], [x + 20, y0 + 220], [x + 10, y0 + 480]], false, 8), 10 + hash(k * 5) * 26, { line: k % 4 ? '#4a2208' : '#8a4512', boil: .3 }); }   // the wall of molasses behind him, sliding down
  for (let k = 0; k < 7; k++) { const x = 80 + hash(k * 9) * 920, y = ((U * 900 + hash(k) * 1900) % 2100) - 100, r = 14 + hash(k * 4) * 18; shape(spline([[x, y - r * 2.4], [x + r, y], [x, y + r], [x - r, y]]), { fill: '#a8571a', lw: 5, shade: () => dot(x - r * .3, y - r * .2, r * .3, '#ffd08a') }); }
  const s = 3.0, hy = 830, k = ss((U - .1) / .5);
  const pose = { lean: 0, bob: 0, armB: { h: [-40, 160], bend: -20 }, armF: { h: [40, 160], bend: 20 } };
  const expr = keys(U, [[0, { ...EXPR.scream, mouth: { o: .9, w: 1, sm: -.7 } }], [.6, { ...EXPR.scream, eyeS: 1.22, pupil: 2.2, mouth: { o: 1.1, w: 1.05, sm: -.8 } }, ease.out], [1.58, { ...EXPR.scream, eyeS: 1.25, pupil: 2, mouth: { o: 1.0, w: 1.0, sm: -.8 } }]]);
  person({ ...CAST.worker, hat: 'none', view: 'front', x: 540, y: hy + 566 * s, s, pose, expr, look: [0, .05], headTilt: .03 * Math.sin(U * 11) });
  // the wave reflected in both eyes (amber curl + a hot glint): the threat is in his eyes before we see it again
  const ex = 96, ey = 796;   // eye centres of the front head at this scale (measured from the render)
  for (const sx of [-1, 1]) { const cx = 540 + sx * ex + 16 * s * .0, cy = ey;
    stroke(spline([[cx - 26, cy + 14], [cx - 12, cy - 16], [cx + 10, cy - 22], [cx + 24, cy - 6]], false, 8), 7, { line: AMBER, boil: .2, alpha: .85 * k });
    dot(cx + 14, cy - 16, 6, `rgba(255,240,210,${k})`); }
  for (const [x, y, r] of [[300, 520, 22], [790, 560, 18], [250, 700, 14]]) { const yy = y + ((U * 160) % 120); shape(spline([[x, yy - r * 1.8], [x + r, yy], [x, yy + r], [x - r, yy]]), { fill: '#bfe3f2', lw: 5 }); }   // sweat running
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'soft-light'; g.fillStyle = 'rgba(255,150,40,.35)'; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'source-over';
  paint(.38); grade2('#2a3550', '#ffcf8a', .14); grain(.05); vignette(.42);
}

// ———————————————— P4 (4.2–5.38) "…sebuah tangki raksasa": the tank from the street, very low; people tiny at its foot
export function P4() {
  setCam(760, 1560, .4, '#d6dbe0'); setLight({ dir: [.55, -.8], tint: '#2a2c3a', a: .26 });
  scenePaint('P4', '#aebfcd', () => { boston({ tankAt: [.4, 17] }); street(1.1); });
  who(CAST.lady, -2.6, 9.5, { pose: walk(.3 + U * .85), face: 1, expr: 'calm' });
  who(CAST.kid, -2.0, 9.2, { pose: walk(.6 + U * 1.1), face: 1, expr: 'calm' });
  who(CAST.gent, 3.2, 10.5, { pose: walk(.1 + U * .9), face: -1, expr: 'neutral' });
  dof(1700, 1920, 6); paint(.4); grade2('#2c3b55', '#ffdca8', .14); grain(.045); vignette(.32);
}

// ———————————————— P5 (5.38–7.6) "—dan yang mengalir adalah molase,": macro of molasses ribboning into itself, glossy and slow
export function P5() {
  g.setTransform(1, 0, 0, 1, 0, 0); const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#120702'); gr.addColorStop(.55, '#3a1a06'); gr.addColorStop(1, '#5a2a0a'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  // the pool: concentric folds spreading out from where the stream lands
  for (let k = 7; k >= 0; k--) { const r = ((k * 120 + U * 70) % 960), a = 1 - r / 960; form(ell(540, 1380, 120 + r * 1.1, 40 + r * .32, 40), mix('#4a2208', '#2a1104', k % 2 ? .2 : .7), { lw: 5, sw: 10, shade: () => stroke(spline([[540 - r * .8, 1370 - r * .2], [540 - r * .3, 1350 - r * .3], [540 + r * .2, 1355 - r * .3]], false, 8), 6, { line: '#e8952e', alpha: a * .8, boil: .2 }) }); }
  // the falling ribbon: it narrows as it falls, sways, and folds onto the pile
  const pts = []; for (let i = 0; i <= 24; i++) { const v = i / 24, y = -40 + v * 1420, x = 540 + 60 * Math.sin(v * 5 + U * 1.6) * v + 30 * Math.sin(U * 2.3 + v * 9) * v * v; pts.push([x, y, 70 - 40 * v + 16 * Math.sin(U * 3 + v * 12)]); }
  const L = pts.map(([x, y, w]) => [x - w, y]), R = pts.map(([x, y, w]) => [x + w, y]).reverse();
  shape(spline([...L, ...R], true, 6), { fill: '#6a3410', lw: 8, shade: () => { stroke(spline(pts.map(([x, y, w]) => [x - w * .45, y]), false, 6), 10, { line: '#ffcf8a', boil: .2 }); stroke(spline(pts.slice(2, 14).map(([x, y, w]) => [x + w * .5, y]), false, 6), 5, { line: '#e8952e', boil: .2 }); } });
  // the pile where it folds: three coils, sliding
  for (let k = 0; k < 3; k++) { const y = 1300 + k * 40, w = 160 + k * 60, ph = U * 1.4 + k; form(spline([[540 - w, y + 30], [540 - w * .6, y - 30 + 10 * Math.sin(ph)], [540, y - 50], [540 + w * .6, y - 30 + 10 * Math.cos(ph)], [540 + w, y + 30], [540, y + 50]]), mix('#6a3410', '#3a1806', k * .35), { lw: 6, sw: 10, shade: () => stroke(spline([[540 - w * .6, y - 22], [540 - w * .1, y - 40], [540 + w * .3, y - 34]], false, 8), 7, { line: '#ffcf8a', alpha: .8, boil: .2 }) }); }
  // a few slow bubbles and a long glint traveling down the stream
  for (let k = 0; k < 6; k++) { const ph = (U * .4 + hash(k)) % 1, x = 300 + hash(k * 3) * 480, y = 1500 - ph * 200; form(ell(x, y, 10 + hash(k) * 12, 8 + hash(k) * 9, 16), '#5a2a0c', { lw: 4, sw: 3, shade: () => dot(x - 4, y - 4, 3, '#ffe2a6') }); }
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'screen'; const sh = g.createRadialGradient(560, 700, 10, 560, 700, 500); sh.addColorStop(0, 'rgba(255,170,60,.25)'); sh.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = sh; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'source-over';
  paint(.3); grain(.05); vignette(.45);
}

// ———————————————— P6 (7.6–8.95) "cairan gula pekat.": cane, a MOLASSES barrel, a stamp lands on "gula"
export function P6() {
  setLight({ dir: [-.4, -.9], tint: '#1a1410', a: .32 }); desk();
  paper(540, 900, 860, 1100, -.03, '#e2d9c2', 0);
  // sugar cane: three jointed stalks with leaves (muted: amber stays the only saturated colour)
  for (const [x, a, c] of [[250, -.18, '#8a9a5a'], [330, -.08, '#7d8c52'], [410, .02, '#93a262']]) { push(); translate(x, 1350); rotate(a);
    for (let j = 0; j < 6; j++) form(rr(-22, -j * 150 - 150, 44, 146, 16), c, { lw: 5, sw: 8, shade: () => fillOnly(rect(-22, -j * 150 - 10, 44, 9), shade(c, -.3), { boil: .1 }) });
    form(spline([[0, -900], [90, -1010], [40, -980], [-10, -880]]), '#6f7d48', { lw: 4 }); pop(); }
  // the barrel, stencilled
  const by = 1080; push(); translate(700, by); rotate(.03);
  form(spline([[-170, -300], [170, -300], [200, 0], [170, 300], [-170, 300], [-200, 0]]), '#7a5b3e', { lw: 8, sw: 24, shade: () => { for (const y of [-220, 210]) fillOnly(rect(-210, y, 420, 24), '#3a3a3a', { boil: .2 }); for (let k = -3; k <= 3; k++) stroke([[k * 52, -290], [k * 56, 290]], 3, { line: '#5a4128' }); } }); pop();
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(700, by); g.rotate(.03); g.font = '600 74px "Oswald"'; g.fillStyle = 'rgba(30,20,14,.85)'; g.textAlign = 'center'; g.fillText('MOLASSES', 0, -20); g.font = '700 34px "Courier Prime"'; g.fillText('PURITY · BOSTON', 0, 40); g.restore();
  // a drip of molasses running down the barrel from its bung (the only amber)
  const dl = 60 + U * 120; shape(spline([[690, by - 140], [712, by - 140], [708, by - 140 + dl], [700, by - 120 + dl], [692, by - 140 + dl]]), { fill: '#a8571a', lw: 4, shade: () => dot(698, by - 150 + dl * .6, 4, '#ffd08a') });
  rubber('GULA PEKAT', 560, 560, -.12, U - .32, { size: 104 });
  lamp(560, 900, .5); finishCard();
}

// ———————————————— P7 (8.95–9.7) "Boston,": a period map; a pin drops into the North End
export function P7() {
  desk(.2); paper(540, 960, 1000, 1500, .015, '#e6dcc0', 0);
  push(); translate(540, 960); rotate(.015);
  fillOnly(rect(-480, -730, 960, 1460), '#c9d1cc', { boil: .1 });   // harbour water
  for (let k = 0; k < 22; k++) stroke([[-470, -700 + k * 66], [470, -690 + k * 66]], 2, { line: '#aab6b2', boil: .1 });
  const land = '#e3d6b4';
  form(spline([[-480, -730], [120, -730], [60, -560], [-40, -470], [40, -360], [-20, -240], [60, -120], [-30, 40], [-120, 120], [-60, 260], [-200, 420], [-480, 520]]), land, { lw: 5, sw: 10 });   // Boston peninsula
  form(spline([[180, -620], [480, -720], [480, -260], [300, -320], [240, -470]]), land, { lw: 5, sw: 10 });   // Charlestown
  form(spline([[200, 160], [480, 60], [480, 700], [260, 700], [160, 420]]), land, { lw: 5, sw: 10 });   // South Boston
  for (let k = 0; k < 40; k++) { const x = -440 + hash(k) * 420, y = -650 + hash(k * 3) * 1080; if (x < -60 + y * .1) fillOnly(rect(x, y, 14, 9), '#c9b892', { boil: .1 }); }   // street blocks
  pop();
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(540, 960); g.rotate(.015); g.fillStyle = '#4a3a28'; g.textAlign = 'center';
  g.font = '700 30px "Courier Prime"'; g.fillText('BOSTON HARBOR', 230, 0); g.fillText('CHARLESTOWN', 340, -520); g.fillText('SOUTH BOSTON', 330, 420);
  g.font = '600 46px "Oswald"'; g.fillText('NORTH END', -170, -330); g.restore();
  // the pin: drops with a bounce at u .05, the impact ring spreads
  const t = U - .05, y0 = 960 - 380, k = clamp(t / .16), py = lerp(y0 - 500, y0, k * k), sq = t > .16 ? 1 + .25 * Math.exp(-(t - .16) * 18) * Math.cos((t - .16) * 40) : 1;
  if (t > .16) for (let r = 0; r < 2; r++) { const rr2 = (t - .16) * 260 + r * 40; form(ell(540 - 20, y0 + 6, rr2, rr2 * .35, 30), 'rgba(0,0,0,0)', { lw: 4, alpha: Math.max(0, 1 - rr2 / 220) }); }
  if (t > 0) { push(); translate(520, py); scale(1 / sq, sq); stroke([[0, 0], [0, -110]], 8, { line: '#3a3a3a' }); form(ell(0, -130, 34, 34, 24), '#b3261e', { lw: 6, shade: () => dot(-10, -140, 8, '#ff9a8a') }); pop(); }
  lamp(540, 700, .45); finishCard(.32);
}
