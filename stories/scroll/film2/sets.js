// ARSIP 002 on the ARSIP RIG: cast, the reusable sets (A Raskin 2019 room, B 2006 office, C "kamu" bedroom) and key frames.
import { drawChar, solve, SKIN, handPhoneCU } from './rig/arsip-rig.js';
import { use, ctx, W, H, vgrad, hgrad, rrect, poly, ellipse, line, pool, shaft, contact, vignette, grain, depth, shadowFall, grade } from './rig/scene-kit.js';

let g;
export const setCtx = c => { g = c; use(c); };
export const SCREEN = '#7fe3ff', AMBER = '#ffb43a';

// —— cast ——
export const RASKIN06 = { body: 'adult', skin: SKIN.terang, hair: { type: 'pendek', col: '#2b221d' }, acc: [{ type: 'kacamata' }], top: { type: 'kemeja', col: '#8fb0cf' }, bottom: { type: 'panjang', col: '#3b3f4a' }, shoes: '#2a2522' };
export const RASKIN19 = { ...RASKIN06, stoop: .06, acc: [{ type: 'kacamata' }, { type: 'jenggot', col: '#2b221d' }], top: { type: 'kaos', col: '#4a4e58' } };
export const KAMU = { body: 'adult', skin: SKIN.sawo, hair: { type: 'pendek', col: '#1f1915' }, top: { type: 'kaos', col: '#6b7280' }, bottom: { type: 'sarung', col: '#3d4f6e', col2: '#6f86a8' }, shoes: '#2a2522' };
export const ORANG06 = { body: 'adult', skin: SKIN.sawo, hair: { type: 'pendek', col: '#1f1915' }, top: { type: 'kemeja', col: '#e8e2d4' }, bottom: { type: 'panjang', col: '#3b3f4a' }, shoes: '#2a2522' };

// seated pose: pelvis on a seat of height seatH, feet planted forward, knees forward (profile/3-4 view)
export function seated(spec, P, seatH = 96) {
  const B = solve(spec, { facing: P.facing }).B, leg = B.th + B.sn, fd = (P.facing ?? 1) < 0 ? -1 : 1;
  return { lf: [fd * 46, 0], rf: [fd * 66, 0], ...P, crouch: leg * .995 - seatH };
}
// place a character so its head centre lands on (hx, hy)
export function headAt(spec, P, hx, hy, s) { const J = solve(spec, { ...P, x: 0, y: 0 }); return { ...P, s, x: hx - J.C[0] * s, y: hy - J.C[1] * s }; }

// —— SET A: Raskin's room, 2019, night. Key = the phone (cyan); one warm practical far behind for contrast ——
export function setA({ cam = 0 } = {}) {
  vgrad(0, 0, W, H, '#232838', '#151821');
  depth(12, () => {
    // window with the city at night (right), bookshelf (left), a framed print, a warm lamp far back
    rrect(620 - cam * 30, 260, 400, 560, 10, '#1b2132'); vgrad(640 - cam * 30, 280, 360, 520, '#2a3654', '#3b3b5a');
    for (let i = 0; i < 40; i++) { const x = 650 + (i * 83 % 340) - cam * 30, y = 520 + (i * 47 % 260); rrect(x, y, 10, 14, 2, i % 5 ? '#ffd58a' : '#9fd8ff'); }
    line([[820 - cam * 30, 280], [820 - cam * 30, 800]], 10, '#1b2132'); line([[640 - cam * 30, 540], [1000 - cam * 30, 540]], 10, '#1b2132');
    rrect(40 - cam * 18, 300, 300, 900, 6, '#2a2433');
    for (let r = 0; r < 4; r++) { rrect(40 - cam * 18, 300 + r * 220 + 200, 300, 16, 2, '#1d1925'); for (let b = 0; b < 7; b++) rrect(60 + b * 38 - cam * 18, 330 + r * 220 + (b % 3) * 8, 30, 170 - (b % 3) * 8, 3, ['#6a4a5a', '#4a5a6e', '#7a6a4a', '#3d4a5a', '#5a3d3d'][(b + r) % 5]); }
    rrect(400 - cam * 24, 380, 160, 210, 6, '#3a3446'); rrect(414 - cam * 24, 394, 132, 182, 4, '#55607a');
    ellipse(560 - cam * 24, 1040, 26, 26, '#ffcf8a'); ellipse(900 - cam * 30, 340, 34, 34, '#e9f0ff');
  });
  pool(560 - cam * 24, 1040, 260, 'rgb(255,190,120)', .22);
}
export function deskA(y = 1300) {
  vgrad(0, y, W, H - y, '#3a2d28', '#1d1715'); rrect(0, y - 10, W, 22, 6, '#4a3a33');
  // closed laptop + mug, foreground soft
  depth(6, () => { rrect(560, y - 34, 360, 30, 8, '#6d7180'); rrect(560, y - 10, 380, 12, 4, '#4b4e58'); rrect(140, y - 120, 90, 110, 14, '#c9bfae'); ellipse(185, y - 120, 45, 10, '#2a1e18'); });
  contact(740, y, 200, .25);
}

// —— SET B: the 2006 office, day. Key = sunlight through a window in the LEFT wall (just off frame).
// Light travels left → right and slightly down: it prints the window (with its blinds) as a skewed patch on the back wall
// and the desk, rims everything from the left, and throws soft shadows to the right. One source, every surface agrees.
const SUN = 'rgb(255,226,170)';
// the window patch: a parallelogram skewed down-right; blind slats cut it into bands
function sunPatch(x, y, w, h, skew, slats, a, k = g) {
  // the lit bands between the blind slats, each a parallelogram following the skew; split by the window's mullion
  const band = h / slats, mx = x + w * .48;
  for (let i = 0; i < slats; i++) {
    const y0 = y + i * band + 5, y1 = y + (i + 1) * band - 5;
    [[x, mx - 6], [mx + 6, x + w]].forEach(([xa, xb]) => {
      const sk = v => (v - x) / w * skew; const gr = k.createLinearGradient(x, 0, x + w, 0);
      gr.addColorStop(0, `rgba(255,224,165,${a})`); gr.addColorStop(1, `rgba(255,224,165,${a * .45})`);
      k.fillStyle = gr; k.beginPath(); k.moveTo(xa, y0 + sk(xa)); k.lineTo(xb, y0 + sk(xb)); k.lineTo(xb, y1 + sk(xb)); k.lineTo(xa, y1 + sk(xa)); k.closePath(); k.fill();
    });
  }
}
export function setB({ cam = 0 } = {}) {
  // back wall: warm plaster, brighter where the light lands, a chair rail
  vgrad(0, 0, W, H, '#e3d4ba', '#cbb796'); hgrad(0, 0, W, H, 'rgba(255,255,255,0)', 'rgba(90,60,30,.10)');
  depth(5, k => {
    const o = -cam * 26;
    rrect(0, 1100, W, 14, 0, '#bca581');
    // whiteboard: the designer's own sketch of pagination, page 1 → 2 → 3 (story detail)
    rrect(330 + o, 300, 380, 280, 10, '#a69a86'); rrect(342 + o, 312, 356, 256, 6, '#f7f5ef');
    [0, 1, 2].forEach(i => { k.strokeStyle = '#4a6e9a'; k.lineWidth = 5; k.strokeRect(372 + o + i * 110, 380, 72, 96); k.fillStyle = '#4a6e9a'; k.font = '600 34px Oswald'; k.fillText(String(i + 1), 398 + o + i * 110, 440); if (i < 2) { line([[450 + o + i * 110, 428], [474 + o + i * 110, 428]], 4, '#c0553a'); } });
    line([[372 + o, 520], [660 + o, 520]], 4, '#c0553a'); rrect(342 + o, 572, 356, 10, 3, '#8f846f');
    // framed print + clock + a shelf of binders on the right
    rrect(770 + o, 300, 200, 250, 6, '#5a4a3a'); rrect(784 + o, 314, 172, 222, 3, '#d98a5a'); ellipse(870 + o, 400, 46, 46, '#f2c26b'); rrect(800 + o, 470, 140, 40, 4, '#7d9a8a');
    ellipse(170 + o, 250, 54, 54, '#f3ece0'); ellipse(170 + o, 250, 54, 54, 'rgba(0,0,0,0)'); line([[170 + o, 250], [170 + o, 214]], 5, '#4a3a2a'); line([[170 + o, 250], [196 + o, 262]], 4, '#4a3a2a');
    rrect(780 + o, 640, 280, 16, 3, '#9c7b58'); [0, 1, 2, 3, 4, 5].forEach(i => rrect(790 + o + i * 42, 662 - 0, 34, 120 - (i % 2) * 14, 4, ['#4a6e9a', '#c0553a', '#e3b54a', '#5a7f6a', '#8a6a8e', '#4a6e9a'][i])); rrect(780 + o, 790, 280, 16, 3, '#9c7b58');
  });
  // the window itself, in the left wall: a bright slice in perspective
  poly([[0, 120], [120, 210], [120, 1020], [0, 1100]], '#b9a382'); poly([[0, 150], [100, 226], [100, 1000], [0, 1066]], '#fff6e0');
  for (let i = 0; i < 12; i++) { const y0 = 170 + i * 72; poly([[0, y0], [100, y0 + 60 - i * 1.5], [100, y0 + 70 - i * 1.5], [0, y0 + 12]], 'rgba(170,150,120,.5)'); }
  // volumetric beam from the window to its print on the wall (very faint), with dust
  depth(28, k => { const gr = k.createLinearGradient(100, 0, 900, 0); gr.addColorStop(0, 'rgba(255,230,180,.22)'); gr.addColorStop(1, 'rgba(255,230,180,0)'); poly([[100, 226], [100, 1000], [900, 1150], [900, 520]], gr); }, 'lighter');
  for (let i = 0; i < 40; i++) { const x = 140 + (i * 137 % 700), y = 300 + (i * 211 % 700); ellipse(x, y + (x - 140) * .3, 2.2, 2.2, 'rgba(255,240,210,.5)'); }
  depth(5, k => sunPatch(380, 470, 520, 520, 150, 7, .55, k), 'lighter');
}
export function deskB(y = 1395, top = 1228) {
  // desk top seen from slightly above: a receding surface from the wall line (top) to the front edge (y)
  vgrad(0, top, W, y - top, '#b48a62', '#a07650'); line([[0, top], [W, top]], 3, 'rgba(70,45,25,.35)');
  depth(4, k => { k.globalCompositeOperation = 'lighter'; poly([[0, top + 20], [520, top + 10], [700, y - 10], [0, y - 4]], 'rgba(255,224,165,.16)'); }, 'lighter');   // sun on the desk, same direction
  vgrad(0, y, W, H - y, '#8a6444', '#5a4030'); rrect(0, y - 8, W, 18, 6, '#c29a70');
  for (let i = 0; i < 8; i++) line([[0, y + 46 + i * 58], [W, y + 36 + i * 62]], 2, 'rgba(50,32,18,.22)');   // grain on the front
}
// desk props (in front of the monitor line): keyboard, mouse + cable, mug with steam, papers, sticky notes
export function propsB(y = 1300, t = 0) {
  contact(620, y, 170, .22); rrect(470, y - 36, 300, 36, 10, '#d6c9b1'); for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) rrect(482 + c * 23.5, y - 31 + r * 10, 19, 7, 2, '#c4b69c');
  contact(842, y, 40, .2); rrect(812, y - 26, 60, 26, 13, '#d6c9b1'); line([[842, y - 26], [858, y - 70], [880, y - 92]], 3, '#9e9178');
  contact(968, y + 6, 54, .25); rrect(928, y - 96, 80, 100, 14, '#f0e8da'); ellipse(968, y - 96, 40, 9, '#5a3a24');
  const k = g; k.save(); k.strokeStyle = 'rgba(255,255,255,.35)'; k.lineWidth = 4; k.lineCap = 'round'; for (let i = 0; i < 2; i++) { k.beginPath(); const x0 = 955 + i * 22; k.moveTo(x0, y - 116); for (let j = 1; j < 6; j++) k.lineTo(x0 + Math.sin(j * 1.4 + t * 3 + i) * 7, y - 116 - j * 18); k.stroke(); } k.restore();
}
export function monitor06(x, y, s = 1, page = 1) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rrect(-40, 170, 80, 70, 6, '#bdb09a'); rrect(-110, 230, 220, 24, 8, '#c9bca6');
  rrect(-230, -170, 460, 360, 22, '#d9ccb3'); rrect(-200, -140, 400, 290, 8, '#f6f3ea');
  rrect(-180, -120, 360, 34, 4, '#8fb0cf'); for (let i = 0; i < 6; i++) rrect(-180, -66 + i * 26, 360 - (i % 3) * 70, 12, 3, '#cfd5da');
  rrect(-226, -186, 60, 56, 3, '#f6e27a'); rrect(176, -190, 54, 50, 3, '#f2b8c6');
  { const gr = g.createLinearGradient(-200, -140, 200, 150); gr.addColorStop(0, 'rgba(255,255,255,.22)'); gr.addColorStop(.4, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(-200, -140, 400, 290); }
  rrect(40, 104, 140, 34, 8, AMBER); g.fillStyle = '#3a2a10'; g.font = '600 18px Oswald'; g.fillText(`Hal ${page + 1} ›`, 72, 128);
  g.restore();
}

// —— SET C: "kamu"'s bedroom, 01:47. Key = the phone (cyan) on the face; fill = a dim street light through the curtain ——
export function setC({ cam = 0, time = '01.47' } = {}) {
  vgrad(0, 0, W, H, '#2b2a3c', '#1b1a26');
  depth(10, () => {
    rrect(640 - cam * 30, 200, 380, 520, 8, '#1f1f2c'); vgrad(660 - cam * 30, 220, 340, 480, '#3a3446', '#6a4f48');
    ellipse(860 - cam * 30, 360, 60, 60, '#ffb877');
    poly([[630 - cam * 30, 190], [760 - cam * 30, 190], [720 - cam * 30, 740], [610 - cam * 30, 740]], '#5a4a6a');   // curtain
    rrect(80 - cam * 20, 300, 220, 120, 14, '#3a3a4c'); { const k = ctx(); k.fillStyle = '#ff9f6a'; k.font = '600 64px Oswald'; k.fillText(time, 104 - cam * 20, 385); }   // digital clock
    line([[420 - cam * 22, 760], [420 - cam * 22, 1180]], 12, '#2c2c3a'); ellipse(420 - cam * 22, 700, 110, 110, '#3a3d4e'); ellipse(420 - cam * 22, 700, 30, 30, '#2c2c3a');   // standing fan
  });
  pool(860 - cam * 30, 380, 520, 'rgb(255,170,110)', .16);
}
export function bed(y = 1250) {
  vgrad(0, y + 160, W, H - y - 160, '#1a1822', '#121019');
  rrect(-40, y, W + 80, 190, 30, '#4a536e'); vgrad(-40, y, W + 80, 40, '#6a7594', '#4a536e');
  rrect(40, y - 70, 300, 110, 50, '#cfd4de');   // pillow
}

// —— key frames (stills for the look gate) ——
export function S1() {
  setA();
  const P = headAt(RASKIN19, seated(RASKIN19, { facing: .62, expr: 'netral', gaze: [.6, .75], headTilt: .12, rh: [86, 18], lh: [40, 150], hold: 'hp', phoneRot: .35, look: .5 }), 430, 800, 3.1);
  drawChar(g, RASKIN19, P, { rim: { col: SCREEN, dir: [.75, .4], w: 7 }, amb: '#2c3550', ambK: .22, noShadow: true });
  pool(700, 1020, 420, 'rgb(127,227,255)', .28);
  deskA(1420);
  for (let i = 0; i < 7; i++) line([[0, 1500 + i * 60], [W, 1490 + i * 64]], 2, 'rgba(255,220,190,.05)');   // wood grain
  poly([[420, 1420], [980, 1420], [1080, 1920], [300, 1920]], 'rgba(127,227,255,.05)');   // phone light spilling onto the desk
  depth(18, () => { rrect(-40, 1560, 220, 300, 30, '#2f3b4a'); ellipse(70, 1560, 110, 22, '#1a1f28'); ellipse(980, 1700, 200, 260, '#2c3a30'); ellipse(1060, 1600, 120, 200, '#36483a'); });   // foreground mug + plant, out of focus
  shadowFall(640, 950, 320, 1350, .5);
  vignette(.38); grain(11);
}
export function S5() {
  setB();
  const P = seated(RASKIN06, { x: 410, y: 1560, s: 1.85, facing: .8, expr: 'senyum', gaze: [.8, -.1], lean: .2, rh: [100, 132], lh: [84, 138], look: .7 }, 190);
  // his shadow on the wall: the same pose in flat dark, pushed right and down (light comes from the left), blurred
  const sh = { ...RASKIN06, skin: '#000000', feat: '#000000', hair: { type: 'pendek', col: '#000000' }, acc: [], top: { type: 'kemeja', col: '#000000' }, bottom: { type: 'panjang', col: '#000000' }, shoes: '#000000' };
  depth(14, k => { k.globalAlpha = .16; drawChar(k, sh, { ...P, x: P.x + 150, y: P.y + 30, s: P.s * 1.06 }, { noShadow: true, lightHead: 0 }); });
  monitor06(800, 960, 1.08, 1);
  rrect(230, 880, 44, 380, 12, '#3d3a3a'); rrect(230, 880, 10, 380, 5, 'rgba(255,230,180,.35)');   // chair back, sunlit edge
  const J = drawChar(g, RASKIN06, P, { rim: { col: '#fff1d0', dir: [-.95, -.25], w: 6 }, amb: '#f3e6cc', ambK: .05, noShadow: true, lightHead: .2 });
  deskB(1395, 1190); propsB(1222);
  // the hands sit on the keyboard, in front of the desk top: redraw forearm ends + hands over it
  [[J.eL, J.wL], [J.eR, J.wR]].forEach(([e, w]) => { const sx = p => [P.x + p[0] * P.s, P.y + p[1] * P.s], W0 = sx(w), E0 = sx(e), m = [W0[0] + (E0[0] - W0[0]) * .25, W0[1] + (E0[1] - W0[1]) * .25]; line([m, W0], 13 * P.s, '#e2c19e'); ellipse(W0[0], W0[1], 11 * P.s, 10 * P.s, '#e6c3a0'); });
  rrect(60, 1290, 250, 26, 4, '#f3efe6'); rrect(76, 1276, 236, 22, 4, '#ebe5d8');   // papers
  // hands back on top of the keyboard (the desk top was drawn over the lap)
  [P].forEach(() => { const k = g; k.save(); k.globalAlpha = 1; k.restore(); });
  // foreground: the edge of a plant and a stack of folders, close to the lens and out of focus
  depth(16, () => { ellipse(-20, 1700, 160, 260, '#5f7a4c'); ellipse(90, 1820, 120, 200, '#6f8a5a'); rrect(820, 1640, 320, 300, 18, '#c0553a'); rrect(840, 1600, 300, 60, 10, '#e3b54a'); });
  vgrad(0, 1450, W, 470, 'rgba(0,0,0,0)', 'rgba(60,40,20,.3)');
  shadowFall(140, 600, 600, 1600, .2);
  vignette(.24); grain(12);
}
// S17 — top-down: "kamu" on the bed at 01:47, phone held over the chest, its glow the only key light on the face
export function S17() {
  vgrad(0, 0, W, H, '#3a3f58', '#2a2e44');                       // sheet
  for (let i = 0; i < 6; i++) line([[0, 300 + i * 260], [W, 340 + i * 250]], 3, 'rgba(255,255,255,.035)');   // folds
  depth(4, () => { rrect(250, 120, 580, 300, 80, '#cfd4e0'); vgrad(250, 120, 580, 120, 'rgba(255,255,255,.12)', 'rgba(255,255,255,0)'); vgrad(250, 300, 580, 120, 'rgba(0,0,0,0)', 'rgba(0,0,0,.22)'); line([[300, 170], [380, 200]], 5, 'rgba(0,0,0,.08)'); line([[780, 180], [700, 220]], 5, 'rgba(0,0,0,.08)'); });   // pillow
  depth(14, () => {   // nightstand with the clock (left edge), guling (right), out of focus
    rrect(-80, 300, 230, 330, 20, '#4a3a34'); rrect(-30, 420, 160, 80, 12, '#20202a');
    rrect(900, 520, 240, 900, 110, '#c9cdd8');
  });
  { const k = g; k.save(); k.filter = 'blur(3px)'; k.fillStyle = '#ff9f6a'; k.font = '600 52px Oswald'; k.fillText('01.47', -20, 478); k.restore(); }
  // the body lies along the frame: the rig in front view, head on the pillow
  const P = headAt(KAMU, { facing: 0, look: 0, expr: 'lelah', gaze: [0, .55], blink: 0, rh: [-34, 64], lh: [34, 70], hold: 'hp', holdHand: 'r', phoneBack: true, phoneRot: 0, lf: [-26, 0], rf: [24, 0] }, 540, 330, 2.6);
  drawChar(g, KAMU, P, { rim: { col: SCREEN, dir: [0, -1], w: 6 }, amb: '#3d3650', ambK: .22, noShadow: true });
  // blanket (sarung) over the legs
  { const y = 1120, x0 = 150, w = 780;
    rrect(x0, y, w, 860, 60, '#34465f');
    const k = g; k.save(); k.beginPath(); k.roundRect(x0, y, w, 860, 60); k.clip();
    // sarung: wide bands + fine check + a darker "kepala" panel
    for (let i = 0; i < 14; i++) rrect(x0 + i * 60, y, 26, 860, 0, 'rgba(98,122,160,.45)');
    for (let j = 0; j < 16; j++) rrect(x0, y + j * 56, w, 22, 0, 'rgba(98,122,160,.35)');
    rrect(x0 + 300, y, 180, 860, 0, 'rgba(120,52,60,.55)'); for (let j = 0; j < 30; j++) poly([[x0 + 300, y + j * 30], [x0 + 390, y + j * 30 + 15], [x0 + 300, y + j * 30 + 30]], 'rgba(230,190,120,.25)');
    // folds: soft shadow/highlight bands across the cloth
    [[y + 120, .22], [y + 330, .18], [y + 560, .2]].forEach(([fy, a]) => { vgrad(x0, fy, w, 70, `rgba(0,0,0,${a})`, 'rgba(0,0,0,0)'); vgrad(x0, fy - 30, w, 30, 'rgba(255,255,255,0)', `rgba(255,255,255,${a * .35})`); });
    vgrad(x0, y, w, 90, 'rgba(0,0,0,.35)', 'rgba(0,0,0,0)');
    k.restore(); }
  for (let i = 0; i < 5; i++) line([[60 + i * 20, 700 + i * 180], [140 + i * 30, 760 + i * 170]], 4, 'rgba(255,255,255,.05)');   // sheet wrinkles
  line([[640, 900], [760, 1100], [980, 1180], [1100, 1150]], 6, '#e6e3dc');   // charger cable
  pool(540, 470, 280, 'rgb(127,227,255)', .24);
  shadowFall(540, 560, 300, 1350, .55);
  vignette(.42); grain(13);
}
export { handPhoneCU, hgrad, grade };
