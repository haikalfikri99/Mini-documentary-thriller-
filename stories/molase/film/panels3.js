// Full film panels, batch B (the disaster): P9, P10, P12–P19. Side views keep one screen direction: the flood moves left → right.
import { clamp, lerp, hash } from '/core/lib.js';
import { g, W, H, INK, push, pop, translate, rotate, scale, shape, fillOnly, stroke, ell, spline, rr, rect, noodle, dot } from '/engine/toon.js';
import { person, setLight, form, SKIN, EXPR } from '/engine/cast.js';
import { keys, ease, run, flutter } from '/engine/motion.js';
import { paint, grade2, grain, vignette, dof } from '/engine/look.js';
import { MOL, barrel, plank, wheel, drop } from '/engine/fx.js';
import { U, setCam, scenePaint, P, at, who, CAST, boston, street, mix, shade, AMBER } from './panels.js';
import { desk, paper, rubber, arrow, bigText, finishCard, lamp, ss, pop1 } from './panels2.js';

const finish = (cool = .14, v = .36) => { paint(.38); grade2('#2a3550', '#ffcf8a', cool); grain(.05); vignette(v); };
// a mass of molasses: lobed body with glossy streaks (screen coords)
function mass(pts, { col = '#3a1806', hi = '#e8952e', spec = '#ffcf8a', lw = 8 } = {}) {
  shape(spline(pts, true, 8), { fill: col, lw, shade: () => { for (let k = 0; k < 6; k++) { const i = Math.floor(hash(k * 3) * (pts.length - 3)); stroke(spline(pts.slice(i, i + 3).map(([x, y]) => [x + 30 + k * 6, y + 40 + k * 10]), false, 8), 6 + hash(k) * 8, { line: k % 3 ? '#552610' : hi, boil: .3 }); } const [x, y] = pts[1]; stroke(spline([[x + 40, y + 50], [x + 90, y + 30], [x + 150, y + 40]], false, 8), 6, { line: spec, alpha: .8 }); } });
}
// a side-view street for the flood (flat facades, cobbles) — the camera looks across the street
function sideStreet(sky = '#b9c2c8') {
  g.setTransform(1, 0, 0, 1, 0, 0); const gr = g.createLinearGradient(0, 0, 0, 1300); gr.addColorStop(0, '#9fb0bd'); gr.addColorStop(1, sky); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  const cols = ['#7a5a4a', '#6e5e56', '#866a52', '#62524a'];
  for (let i = 0; i < 5; i++) { const x = -60 + i * 250, h = 520 + hash(i) * 260; form(rect(x, 1360 - h, 240, h), cols[i % 4], { lw: 6, sw: 12, shade: () => { for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) if (1360 - h + 60 + r * 130 < 1220) form(rect(x + 40 + c * 100, 1360 - h + 60 + r * 130, 60, 80), '#2b333b', { lw: 4, sw: 0 }); } }); }
  fillOnly(rect(0, 1360, W, 560), '#4a4744', { boil: .1 });
  for (let r = 0; r < 9; r++) for (let c = 0; c < 14; c++) { const x = c * 82 + (r % 2) * 41, y = 1380 + r * 60 + r * r * 3; fillOnly(rr(x, y, 70 + r * 3, 30 + r * 4, 12), mix('#6a6660', '#55524d', hash(r * 14 + c)), { boil: .1 }); }
}

// ———————————————— P9 (12.6–14.05) "Tangki baja setinggi 15 meter…": the riveted wall; rivets shoot out one by one
export function P9() {
  setLight({ dir: [.5, -.8], tint: '#22242c', a: .3 });
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#5d5b55'; g.fillRect(0, 0, W, H);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) form(rect(-40 + c * 400 + (r % 2) * 200, -40 + r * 500, 400, 500), mix('#625f58', '#55534d', hash(r * 3 + c)), { lw: 6, sw: 18 });   // overlapping plates
  const rows = [460, 960, 1460], pops = [.22, .42, .6, .76, .9, 1.02, 1.12];
  for (const y of rows) for (let k = 0; k < 13; k++) { const x = 30 + k * 82, id = rows.indexOf(y) * 13 + k, pi = [8, 17, 30, 4, 22, 35, 12].indexOf(id), t = pi >= 0 ? U - pops[pi] : -1;
    if (t < 0) { form(ell(x, y, 16, 16, 14), '#6e6b63', { lw: 4, sw: 4, shade: () => dot(x - 5, y - 5, 4, '#9a978e') }); continue; }
    form(ell(x, y, 13, 13, 12), '#1a0b03', { lw: 4 });   // the hole
    const jl = Math.min(1, t * 6) * (160 + hash(id) * 90); shape(spline([[x - 10, y], [x + 10, y], [x + 26 + jl * .3, y + jl], [x - 6 + jl * .25, y + jl * 1.05]]), { fill: '#6a3410', lw: 5, shade: () => stroke([[x, y + 6], [x + jl * .22, y + jl * .9]], 4, { line: '#ffcf8a' }) });   // molasses spurting
    const fly = t * 1.8, sc = 1 + fly * 5; if (fly < 1) { push(); translate(x + (x - 540) * fly * 1.4, y + (y - 960) * fly * 1.2 - 200 * fly); rotate(fly * 9); scale(sc); form(ell(0, 0, 16, 10, 14), '#7a776e', { lw: 3 }); pop(); }   // the rivet flies at the camera
  }
  // the height, inked on: "15 METER" lands on the word
  arrow([110, 1700], [110, 220], U - .75, { col: '#f4efe6', w: 12, bend: 0, d: .2 });
  bigText('15 METER', 560, 760, { size: 190, k: (U - .9) / .14 * 1, hot: true, rot: -.04 });
  finish(.12, .4);
}

// ———————————————— P10 (14.05–15.0) "…pecah.": the tank bursts (wide, the street of P8)
export function P10() {
  setCam(980, 1060, 1.3, '#d9dcdc'); setLight({ dir: [.55, -.8], tint: '#2a2c3a', a: .26 });
  scenePaint('P10', '#aebfcd', () => { boston({ tankAt: [.6, 40], waveZ: 1 }); street(1.1); });
  const k = ss(U / .9), [tx, ty] = P(.6, 6, 40), tw = 980 * 27.4 / 40;
  // the burst: molasses heaves out of the split seam, plates and the roof fly
  stroke([[tx - 40, ty - 220], [tx - 10, ty - 120], [tx - 50, ty - 30], [tx - 5, ty + 60], [tx - 30, ty + 160]], 9, { line: '#120702' });   // the seam splits
  for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * .32, L = k * (260 + hash(i) * 200); stroke(spline([[tx - 20, ty], [tx - 20 + Math.cos(a) * L * .5, ty + Math.sin(a) * L * .6], [tx - 20 + Math.cos(a) * L, ty + Math.sin(a) * L + L * L * .002]], false, 8), 30 * (1 - k * .4), { line: i % 2 ? '#4a2208' : '#6a3410', boil: .3 }); }   // jets fan out of the split
  for (const sd of [-1, 1]) mass([[tx - 20, ty - 40], [tx - 20 + sd * (120 + k * 460), ty + 60 - k * 90], [tx - 20 + sd * (200 + k * 640), ty + 120 + k * 120], [tx - 20 + sd * (60 + k * 300), ty + 200 + k * 90], [tx - 20, ty + 190]]);   // the flood spills both ways, low and fast
  for (let i = 0; i < 9; i++) { const a = -Math.PI * (.1 + .8 * hash(i)), d = k * (220 + hash(i * 3) * 420); push(); translate(tx + Math.cos(a) * d, ty - 60 + Math.sin(a) * d + k * k * 160); rotate(k * (4 + i)); form(rect(-50, -14, 100, 28), '#4e4c47', { lw: 4, sw: 4 }); pop(); }
  push(); translate(tx, ty - 230 - k * 380); rotate(-.3 * k); form(spline([[-220, 0], [0, -50], [220, 0], [0, 26]]), '#4e4c47', { lw: 5, sw: 8 }); pop();   // the roof, blown off
  for (let i = 0; i < 16; i++) { const a = -Math.PI * hash(i * 7), d = k * (300 + hash(i) * 500); drop(tx + Math.cos(a) * d, ty - 100 + Math.sin(a) * d + k * k * 300, 10 + hash(i * 5) * 16, 1.4); }
  dof(1480, 1920, 7); finish(.14, .32);
}

// ———————————————— P12 (16.6–17.5) "…molase": the tank as a cutaway, full; the number stamped with an arrow
export function P12() {
  desk(); paper(540, 960, 900, 1260, -.02, '#e2d9c2', 0);
  push(); translate(540, 1000); rotate(-.02);
  form(rect(-300, -380, 600, 700), '#d8cdb6', { lw: 7, sw: 12 });
  const lv = ss(U / .5); fillOnly(rect(-292, 312 - 680 * (.2 + .78 * lv), 584, 680 * (.2 + .78 * lv)), '#a8571a', { boil: .3 });   // the level rises to full
  for (let k = 0; k < 5; k++) stroke([[-292, 312 - 680 * (.2 + .78 * lv) + 20 + k * 40], [292, 300 - 680 * (.2 + .78 * lv) + 30 + k * 40]], 4, { line: '#ffcf8a', alpha: .5 });
  form(ell(0, -380, 300, 50, 30), '#c9bda4', { lw: 6 });
  pop();
  rubber('2,3 JUTA GALON', 540, 470, -.08, U - .05, { size: 92 });
  arrow([760, 560], [700, 820], U - .2, { col: '#b3261e', w: 10 });
  lamp(540, 900, .5); finishCard();
}

// ———————————————— P13 (17.5–18.5) "…tumpah ke jalanan.": what that means — 8.7 million litres, three and a half Olympic pools
export function P13() {
  desk(.1); paper(540, 960, 940, 1300, .015, '#e6dcc0', 0);
  bigText('≈ 8,7 JUTA LITER', 540, 520, { size: 110, k: (U - .02) / .14, hot: true });
  for (let i = 0; i < 4; i++) { const x = 300 + (i % 2) * 480, y = 820 + Math.floor(i / 2) * 330, f = clamp((U - .15 - i * .14) / .25) * (i === 3 ? .5 : 1), w = 400;
    push(); translate(x - w / 2 + 240 - (i % 2) * 0, y); form(rr(-200, -110, w, 220, 20), '#cfc3aa', { lw: 6, sw: 8 });   // a pool, 50 × 25 m, seen from above
    if (f > 0) fillOnly(rr(-192, -102, (w - 16) * f, 204, 16), '#a8571a', { boil: .3 });
    for (let l = 1; l < 6; l++) stroke([[-192, -102 + l * 34], [192, -102 + l * 34]], 2, { line: '#8a7a66', alpha: .5 }); pop(); }
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.font = '600 52px "Oswald"'; g.fillStyle = '#2a1e14'; g.textAlign = 'center'; g.fillText('≈ 3,5 KOLAM RENANG OLIMPIADE', 540, 1560); g.restore();
  lamp(540, 900, .48); finishCard(.32);
}

// ———————————————— P14 (18.5–19.7) "Gelombangnya melaju": across the street, the wave overtakes a delivery wagon; the horse bolts ahead of it
export function P14() {
  setLight({ dir: [.4, -.9], tint: '#24232c', a: .3, rim: AMBER, rimA: .7, rw: 6 }); sideStreet();
  const fx = -260 + U * 520;   // the wave front, moving right
  const wl = clamp((fx - 300) / 300), wx = 420 + U * 140;
  push(); translate(wx, 1300 - wl * 220); rotate(-.5 * wl); form(rect(-180, -110, 360, 90), '#6a4a34', { lw: 6 }); barrel(-90, -150, .3 * wl, 1.3); barrel(40, -160, -.5 * wl, 1.3); wheel(-110, 0, U * 6, 56); wheel(120, 0, U * 6, 56); pop();
  mass([[-300, 1800], [-300, 260], [fx - 220, 200], [fx + 40, 250], [fx + 200, 360], [fx + 190, 470], [fx + 110, 440], [fx + 60, 560], [fx + 160, 900], [fx + 330, 1380], [fx + 520, 1600], [-300, 1800]]);   // the wall, its lip curling forward (right)
  const hx = 560 + U * 220, gal = Math.sin(U * 18);   // the horse bolts ahead of it (silhouette, facing and running right)
  push(); translate(hx, 1360); scale(1.5); form(spline([[-150, -170], [60, -190], [130, -260], [190, -250], [170, -200], [120, -160], [110, -90], [80, -60 - 30 * gal], [40, 0], [10, -60], [-80, -70], [-120, 0 + 20 * gal], [-150, -60], [-190, -110]]), '#2e2620', { lw: 6 }); pop();
  for (let i = 0; i < 10; i++) { const t = (U * 1.5 + hash(i)) % 1; drop(fx + 100 + t * 300 + hash(i * 3) * 120, 500 + hash(i) * 400 - t * 200 + t * t * 500, 12 + hash(i * 5) * 12, 1.3); }
  finish();
}

// ———————————————— P15 (19.7–21.55) "…sekitar 56 km per jam.": a period gauge; the needle swings to 56 and shudders
export function P15() {
  desk(.15);
  push(); translate(540, 900); form(ell(0, 0, 400, 400, 60), '#2a2622', { lw: 10, sw: 30 }); form(ell(0, 0, 360, 360, 60), '#e8dfc8', { lw: 6, sw: 10 });
  for (let v = 0; v <= 80; v += 5) { const a = Math.PI * (.75 + 1.5 * v / 80), r0 = v % 10 ? 320 : 290; stroke([[Math.cos(a) * r0, Math.sin(a) * r0], [Math.cos(a) * 345, Math.sin(a) * 345]], v % 10 ? 4 : 8); }
  pop();
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(540, 900); g.font = '600 46px "Oswald"'; g.fillStyle = '#2a1e14'; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let v = 0; v <= 80; v += 20) { const a = Math.PI * (.75 + 1.5 * v / 80); g.fillText(String(v), Math.cos(a) * 240, Math.sin(a) * 240); }
  g.font = '700 34px "Courier Prime"'; g.fillText('KM / JAM', 0, 150); g.restore();
  // the amber danger arc and the needle (swing with overshoot, then a shudder)
  push(); translate(540, 900); stroke(Array.from({ length: 21 }, (_, i) => { const a = Math.PI * (.75 + 1.5 * (50 + i * .5) / 80); return [Math.cos(a) * 330, Math.sin(a) * 330]; }), 18, { line: AMBER, boil: .2 });
  const v = 56 * (1 - Math.exp(-U * 7) * Math.cos(U * 13)) + Math.sin(U * 60) * .8, a = Math.PI * (.75 + 1.5 * v / 80);
  form([[Math.cos(a + 1.57) * 14, Math.sin(a + 1.57) * 14], [Math.cos(a) * 320, Math.sin(a) * 320], [Math.cos(a - 1.57) * 14, Math.sin(a - 1.57) * 14], [-Math.cos(a) * 50, -Math.sin(a) * 50]], '#b3261e', { lw: 5 });
  form(ell(0, 0, 34, 34, 20), '#2a2622', { lw: 5 }); pop();
  bigText('56 KM/JAM', 540, 1520, { size: 130, k: (U - .25) / .14, hot: true });
  lamp(540, 900, .5); finishCard(.3);
}

// ———————————————— P16 (21.55–23.4) "Kereta layang terlempar dari rel.": the el girder buckles; a car is lifted off the rails
export function P16() {
  setLight({ dir: [.4, -.9], tint: '#24232c', a: .3, rim: AMBER, rimA: .7, rw: 6 }); sideStreet('#c2c8cc');
  const k = ss((U - .15) / .9), sag = k * 120;
  // columns and the girder, bending upward where the flood hits it
  for (const x of [80, 420, 760, 1080]) form(rect(x - 24, 760, 48, 600), '#3f434a', { lw: 6, sw: 8 });
  const gir = Array.from({ length: 12 }, (_, i) => { const x = -60 + i * 110, b = Math.exp(-(((x - 560) / 260) ** 2)); return [x, 700 - sag * b]; });
  form([...gir, ...gir.slice().reverse().map(([x, y]) => [x, y + 90])], '#4a4e56', { lw: 7, sw: 10, shade: () => { for (let i = 0; i < 11; i++) stroke([gir[i], [gir[i + 1][0], gir[i + 1][1] + 90]], 3, { line: '#2c2f35' }); } });
  // the car: lifted, tipping away from the flood (right), one bogie off the rail
  push(); translate(560 + k * 160, 560 - k * 120); rotate(.42 * k);
  form(rect(-260, -170, 520, 170), '#5a4a3a', { lw: 7, sw: 14, shade: () => { for (let w = 0; w < 6; w++) form(rect(-230 + w * 80, -140, 56, 60), '#d9c49a', { lw: 4, sw: 0 }); } });
  form(rect(-280, -190, 560, 26), '#3a3430', { lw: 5 }); wheel(-170, 20, U * 3, 34, '#2a2a2a'); wheel(170, 20, U * 3, 34, '#2a2a2a'); pop();
  const cx = 200 + U * 260;   // a breaking crest rolling right under the car, lip curling forward
  mass([[-300, 1800], [-300, 980], [cx - 300, 900], [cx - 60, 640], [cx + 140, 600], [cx + 260, 680], [cx + 210, 760], [cx + 130, 720], [cx + 110, 840], [cx + 300, 980], [cx + 600, 1000 + 30 * Math.sin(U * 4)], [1300, 1060], [1300, 1800]]);
  for (let i = 0; i < 8; i++) { const t = (U * 1.4 + hash(i)) % 1; drop(cx + 180 + t * 200 + hash(i * 3) * 80, 640 - t * 220 + t * t * 520, 10 + hash(i * 5) * 12, 1.4); }
  for (let i = 0; i < 12; i++) { const t = (U * 1.3 + hash(i)) % 1; drop(300 + hash(i * 3) * 600 + t * 120, 760 - t * 300 + t * t * 500, 12 + hash(i * 5) * 14, 1.3); }
  finish();
}

// ———————————————— P17 (23.4–24.55) "Bangunan hancur.": a wooden building folds as the flood hits it; boards fly right
export function P17() {
  setLight({ dir: [.4, -.9], tint: '#24232c', a: .3, rim: AMBER, rimA: .7, rw: 6 }); sideStreet('#c2c8cc');
  const k = ss(U / .8);
  push(); translate(620, 1360); rotate(.35 * k); scale(1, 1 - .25 * k);   // the frame racks and leans away from the flood
  form(rect(-280, -760, 560, 760), '#8a6a4c', { lw: 8, sw: 18, shade: () => { for (let r = 1; r < 16; r++) stroke([[-280, -r * 48], [280, -r * 48]], 3, { line: '#5a4128' }); for (const [x, y] of [[-170, -620], [70, -620], [-170, -340], [70, -340]]) form(rect(x, y, 100, 140), '#2b333b', { lw: 5, sw: 0 }); } });
  form([[-320, -760], [0, -960], [320, -760]], '#5a3a2a', { lw: 7, sw: 10 }); pop();
  for (let i = 0; i < 10; i++) { const t = clamp(U / 1.1), a = -.3 - hash(i) * 1.2; plank(620 + Math.cos(a) * t * (300 + hash(i * 3) * 500), 900 + hash(i) * 400 + Math.sin(a) * t * 400 + t * t * 300, t * (3 + i), 160, 26, '#8a6a4c'); }
  mass([[-300, 1800], [-300, 700], [200, 620], [420, 780], [560, 1000 - k * 200], [700, 1360], [900, 1500], [-300, 1900]]);
  finish();
}

// ———————————————— P18 (24.55–26.0) "Warga tersapu gelombang lengket": two people waist-deep, straining against the pull
export function P18() {
  setLight({ dir: [.3, -.9], tint: '#24232c', a: .3, rim: AMBER, rimA: .8, rw: 7 });
  setCam(1000, 1100, 1.4, '#cfd2d2'); scenePaint('P18', '#c9c2b2', () => { boston({ waveZ: 9 }); street(1.1, 1); });
  const lvl = 1250;   // the molasses surface (screen y)
  const strain = (ph) => ({ lean: .1 + .04 * Math.sin(U * 3 + ph), bob: 0, armF: { h: [lerp(40, 70, (Math.sin(U * 2.4 + ph) + 1) / 2), lerp(-130, -40, (Math.sin(U * 2.4 + ph) + 1) / 2)], bend: -40, hand: 'open' }, armB: { h: [-60, 20], bend: 50, fist: 1 }, legF: [0, 0], legB: [0, 0] });
  const e1 = keys(U, [[0, { ...EXPR.fear }], [.8, { ...EXPR.fear, mouth: { o: .7, w: .8, sm: -.8 } }], [1.45, { ...EXPR.worried, inner: 1, lid: 0, mouth: { o: .3, w: .7, sm: -.9 } }]]);
  const reach = ph => ({ lean: .12 + .03 * Math.sin(U * 3 + ph), bob: 0, armF: { h: [lerp(120, 175, (Math.sin(U * 2.6 + ph) + 1) / 2), lerp(-40, -90, (Math.sin(U * 2.6 + ph) + 1) / 2)], bend: -20, hand: 'open' }, armB: { h: [-60, 20], bend: 50, fist: 1 }, legF: [0, 0], legB: [0, 0] });   // both stretch toward the other's hand
  person({ ...CAST.lady, x: 270, y: lvl + 260 + U * 20, s: 1.15, face: 1, pose: reach(0), expr: e1, look: [.8, -.1] });
  person({ ...CAST.docker, x: 840, y: lvl + 300 + U * 30, s: 1.25, face: -1, pose: reach(1.7), expr: { ...EXPR.scream, mouth: { o: .8, w: .9, sm: -.7 } }, look: [.5, -.5] });
  // the surface, swelling past them (left → right), sticky threads where it clings to their sleeves
  const sp = []; for (let i = 0; i <= 24; i++) { const x = -40 + i * 48; sp.push([x, lvl + 18 * Math.sin(x * .012 - U * 4) + 10 * Math.sin(x * .031 + U * 2)]); }
  shape(spline([...sp, [1120, 1960], [-40, 1960]], true, 8), { fill: '#3a1806', lw: 8, shade: () => { for (let k = 0; k < 7; k++) { const y = lvl + 60 + k * 90; stroke(spline([[-40, y], [300, y - 20 + 10 * Math.sin(U * 3 + k)], [700, y + 10], [1120, y - 10]], false, 8), 8, { line: k % 2 ? '#552610' : '#8a4512', boil: .3 }); } stroke(spline(sp.slice(2, 12).map(([x, y]) => [x, y + 14]), false, 8), 6, { line: '#ffcf8a', alpha: .8 }); } });
  for (const [x, y] of [[420, lvl - 10], [800, lvl - 30]]) for (let k = 0; k < 3; k++) stroke(spline([[x - 30 + k * 30, y - 60], [x - 20 + k * 30, y - 10], [x - 25 + k * 30, y + 20]], false, 6), 3, { line: '#6a3410', alpha: .8 });
  finish(.14, .4);
}

// ———————————————— P19 (26.0–27.25) "…yang sulit mereka hindari.": a hand reaching up out of the molasses, strands clinging
export function P19() {
  g.setTransform(1, 0, 0, 1, 0, 0); const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#8a8f94'); gr.addColorStop(.5, '#5a5048'); gr.addColorStop(1, '#2a1104'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  const sink = U * 60, open = keys(U, [[0, .2], [.5, 1, ease.out], [1.25, .35]]);   // fingers spread, reaching… then curl as it is pulled down
  const [sk, sk2] = SKIN.light, hx = 540, hy = 760 + sink;
  form(noodle([hx + 30, 1500], [hx, hy + 120], 30, 70, 62), '#4f5a6a', { lw: 8, sw: 10 });   // sleeve
  form(spline([[hx - 90, hy + 140], [hx - 100, hy + 20], [hx - 40, hy - 40], [hx + 60, hy - 30], [hx + 100, hy + 40], [hx + 80, hy + 150]]), sk, { lw: 8, sw: 14 });   // palm
  for (let f = 0; f < 4; f++) { const a = -Math.PI / 2 + (f - 1.5) * .28 * open, L = [118, 138, 130, 104][f], b = [hx - 72 + f * 50, hy - 20], tip = [b[0] + Math.cos(a) * L * (.6 + .4 * open), b[1] + Math.sin(a) * L * (.6 + .4 * open)];
    form(noodle(b, tip, (1 - open) * 30, 34, 27), sk, { lw: 7, sw: 6 }); }
  form(noodle([hx + 90, hy + 70], [hx + 90 + 110 * open, hy - 40 * open], -20, 26, 20), sk, { lw: 7, sw: 6 });   // thumb
  // molasses coating the wrist, strands stretching from fingers back down to the surface
  form(spline([[hx - 110, hy + 230], [hx - 80, hy + 120], [hx + 20, hy + 150], [hx + 110, hy + 110], [hx + 120, hy + 260]]), '#4a2208', { lw: 6 });
  for (let k = 0; k < 5; k++) { const x = hx - 70 + k * 40; stroke(spline([[x, hy - 10 - k * 4], [x + 10, hy + 300], [x - 30 + k * 20, 1380]], false, 8), 4 - k * .4, { line: '#6a3410', alpha: .85, boil: .3 }); }
  const sp = []; for (let i = 0; i <= 24; i++) { const x = -40 + i * 48; sp.push([x, 1380 + 16 * Math.sin(x * .014 - U * 3)]); }
  shape(spline([...sp, [1120, 1960], [-40, 1960]], true, 8), { fill: '#2f1608', lw: 8, shade: () => stroke(spline(sp.slice(4, 16).map(([x, y]) => [x, y + 16]), false, 8), 6, { line: '#ffcf8a', alpha: .8 }) });
  finish(.14, .45);
}
