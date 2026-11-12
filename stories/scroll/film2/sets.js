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
    ellipse(560 - cam * 24, 1040, 26, 26, '#ffcf8a');
  });
  pool(560 - cam * 24, 1040, 260, 'rgb(255,190,120)', .22);
}
export function deskA(y = 1300) {
  vgrad(0, y, W, H - y, '#3a2d28', '#1d1715'); rrect(0, y - 10, W, 22, 6, '#4a3a33');
  // closed laptop + mug, foreground soft
  depth(6, () => { rrect(560, y - 34, 360, 30, 8, '#6d7180'); rrect(560, y - 10, 380, 12, 4, '#4b4e58'); rrect(140, y - 120, 90, 110, 14, '#c9bfae'); ellipse(185, y - 120, 45, 10, '#2a1e18'); });
  contact(740, y, 200, .25);
}

// —— SET B: the 2006 office, day. Key = the window (warm daylight from the left) ——
export function setB({ cam = 0 } = {}) {
  vgrad(0, 0, W, H, '#e8dcc6', '#d4c3a6');
  depth(9, () => {
    rrect(30 - cam * 30, 240, 360, 720, 8, '#cdbb9b'); vgrad(50 - cam * 30, 260, 320, 680, '#f8f1df', '#e6efe9');
    for (let i = 0; i < 9; i++) rrect(50 - cam * 30, 280 + i * 74, 320, 16, 3, 'rgba(180,160,130,.55)');   // blinds
    rrect(560 - cam * 24, 330, 230, 310, 6, '#c96f4a'); ellipse(675 - cam * 24, 450, 62, 62, '#f2c26b'); rrect(590 - cam * 24, 560, 170, 18, 4, '#f4e6cf');   // poster
    ellipse(940 - cam * 20, 360, 70, 70, '#f3ece0'); line([[940 - cam * 20, 360], [940 - cam * 20, 318]], 6, '#5a4a3a'); line([[940 - cam * 20, 360], [970 - cam * 20, 372]], 5, '#5a4a3a');   // clock
    rrect(860 - cam * 20, 900, 120, 200, 18, '#a8805c'); ellipse(920 - cam * 20, 880, 110, 120, '#6f8a5a');   // plant
  });
  shaft([[60, 300], [380, 260], [1080, 1500], [560, 1700]], 'rgb(255,236,190)', .26);
}
export function deskB(y = 1380) {
  vgrad(0, y, W, H - y, '#a8805c', '#7d5d42'); rrect(0, y - 10, W, 22, 6, '#b88f68');
  contact(800, y, 240, .22);
}
// beige 2006 monitor with a web page and the amber "next page" button
export function monitor06(x, y, s = 1, page = 1) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rrect(-40, 170, 80, 70, 6, '#bdb09a'); rrect(-110, 230, 220, 24, 8, '#c9bca6');
  rrect(-230, -170, 460, 360, 22, '#d9ccb3'); rrect(-200, -140, 400, 290, 8, '#f6f3ea');
  rrect(-180, -120, 360, 34, 4, '#8fb0cf'); for (let i = 0; i < 6; i++) rrect(-180, -66 + i * 26, 360 - (i % 3) * 70, 12, 3, '#cfd5da');
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
  shadowFall(640, 950, 320, 1350, .5);
  vignette(.38); grain(11);
}
export function S5() {
  setB();
  monitor06(790, 1010, 1.1, 1);
  rrect(130, 900, 44, 380, 12, '#3d3a3a'); rrect(110, 1270, 330, 36, 14, '#4a4646');   // office chair
  const P = seated(RASKIN06, { x: 300, y: 1610, s: 1.85, facing: .8, expr: 'senyum', gaze: [.8, 0], lean: .14, rh: [150, 50], lh: [130, 62], look: .7 }, 180);
  drawChar(g, RASKIN06, P, { rim: { col: '#fff1d0', dir: [-.8, -.5], w: 5 }, amb: '#f3e6cc', ambK: .05, noShadow: true });
  deskB(1400); rrect(520, 1356, 270, 36, 8, '#d9ccb3'); rrect(830, 1362, 60, 30, 14, '#cfc2ab');   // keyboard, mouse
  vgrad(0, 1440, W, 480, 'rgba(0,0,0,0)', 'rgba(60,40,20,.35)'); line([[60, 1560], [1020, 1560]], 3, 'rgba(80,55,35,.4)'); rrect(480, 1600, 120, 16, 6, '#c9a27a');   // drawer
  contact(790, 1400, 230, .2);
  shadowFall(200, 500, 520, 1500, .22);
  vignette(.25); grain(12);
}
// S17 — top-down: "kamu" on the bed at 01:47, phone held over the chest, its glow the only key light on the face
export function S17() {
  vgrad(0, 0, W, H, '#3a3f58', '#2a2e44');                       // sheet
  for (let i = 0; i < 6; i++) line([[0, 300 + i * 260], [W, 340 + i * 250]], 3, 'rgba(255,255,255,.035)');   // folds
  depth(4, () => { rrect(250, 120, 580, 300, 80, '#d3d7e2'); vgrad(250, 330, 580, 90, 'rgba(0,0,0,0)', 'rgba(0,0,0,.18)'); });   // pillow
  depth(14, () => {   // nightstand with the clock (left edge), guling (right), out of focus
    rrect(-80, 300, 230, 330, 20, '#4a3a34'); rrect(-30, 420, 160, 80, 12, '#20202a');
    rrect(900, 520, 240, 900, 110, '#c9cdd8');
  });
  { const k = g; k.save(); k.filter = 'blur(3px)'; k.fillStyle = '#ff9f6a'; k.font = '600 52px Oswald'; k.fillText('01.47', -20, 478); k.restore(); }
  // the body lies along the frame: the rig in front view, head on the pillow
  const P = headAt(KAMU, { facing: 0, look: 0, expr: 'lelah', gaze: [0, .55], blink: 0, rh: [-34, 64], lh: [34, 70], hold: 'hp', holdHand: 'r', phoneBack: true, phoneRot: 0, lf: [-26, 0], rf: [24, 0] }, 540, 330, 2.6);
  drawChar(g, KAMU, P, { rim: { col: SCREEN, dir: [0, -1], w: 6 }, amb: '#3d3650', ambK: .22, noShadow: true });
  // blanket (sarung) over the legs
  { const y = 1120; rrect(150, y, 780, 860, 60, '#3d4f6e'); for (let i = 0; i < 12; i++) line([[180 + i * 64, y + 10], [180 + i * 64, y + 700]], 5, 'rgba(111,134,168,.55)'); for (let j = 0; j < 9; j++) line([[160, y + 40 + j * 76], [920, y + 40 + j * 76]], 5, 'rgba(111,134,168,.45)'); vgrad(150, y, 780, 60, 'rgba(0,0,0,.25)', 'rgba(0,0,0,0)'); }
  line([[640, 900], [760, 1100], [980, 1180], [1100, 1150]], 6, '#e6e3dc');   // charger cable
  pool(540, 470, 280, 'rgb(127,227,255)', .24);
  shadowFall(540, 560, 300, 1350, .55);
  vignette(.42); grain(13);
}
export { handPhoneCU, hgrad, grade };
