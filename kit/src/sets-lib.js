// Sets & props library (channel style, extracted from ARSIP #002). Every function draws on the context given to setCtx().
// Environments: setA (night room lit by a phone) · setB/deskB/propsB (2006 office, window light from the left) · setC/bed (bedroom 01:47)
//   setE (ordinary home 2006, evening) · setD (archive hall with one spotlight) · tunnel (corridor tiled with feed cards)
// Props: monitor06 · crt + page06 (old browser) · card + feedScreen (social feed) · bigButton · handCursor · stamp · txt (on-screen type)
// Helpers: seated (pose on a chair) · headAt (place a figure by its head) · handsOver (redraw hands over a desk top)
import { drawChar, solve, SKIN } from './arsip-rig.js';
import { use, ctx, W, H, vgrad, hgrad, rrect, poly, ellipse, line, pool, shaft, contact, vignette, grain, depth, shadowFall } from './scene-kit.js';
export let g;
export const setCtx = c => { g = c; use(c); };
export const SCREEN = '#7fe3ff', AMBER = '#ffb43a';
const lerp = (a, b, t) => a + (b - a) * t;
const FEED = ['#7fa8c9', '#d9a77a', '#8fc0b0', '#c49ab8', '#a9b87a', '#d7c18a'];

export function seated(spec, P, seatH = 96) {
  const B = solve(spec, { facing: P.facing }).B, leg = B.th + B.sn, fd = (P.facing ?? 1) < 0 ? -1 : 1;
  return { lf: [fd * 46, 0], rf: [fd * 66, 0], ...P, crouch: leg * .995 - seatH };
}
// place a character so its head centre lands on (hx, hy)

export function headAt(spec, P, hx, hy, s) { const J = solve(spec, { ...P, x: 0, y: 0 }); return { ...P, s, x: hx - J.C[0] * s, y: hy - J.C[1] * s }; }

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

export function sunPatch(x, y, w, h, skew, slats, a, k = g) {
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

export function txt(t, x, y, size = 64, col = '#f4ead8', al = 'center', font = 'Oswald') {
  g.save(); g.font = `600 ${size}px ${font}`; g.textAlign = al; g.lineJoin = 'round';
  g.strokeStyle = 'rgba(20,16,22,.9)'; g.lineWidth = size * .16; g.strokeText(t, x, y); g.fillStyle = col; g.fillText(t, x, y); g.restore();
}

export function stamp(t, x, y, rot = -.08, col = '#d9483b', size = 58) {
  g.save(); g.translate(x, y); g.rotate(rot); g.font = `700 ${size}px "Courier Prime"`; g.textAlign = 'center';
  const w = g.measureText(t).width + 40; g.strokeStyle = col; g.lineWidth = 6; g.globalAlpha = .9; g.strokeRect(-w / 2, -size * .9, w, size * 1.25); g.fillStyle = col; g.fillText(t, 0, 0); g.restore();
}
// a feed card (generic social post: image block + two text lines), palette kept calm

export function card(x, y, w, h, i, ad = false) {
  rrect(x, y, w, h, 18, '#f2f4f6'); rrect(x + 16, y + 16, w - 32, h * .62, 12, ad ? AMBER : FEED[i % FEED.length]);
  rrect(x + 16, y + h * .62 + 30, w * .6, 14, 5, '#c3ccd4'); rrect(x + 16, y + h * .62 + 54, w * .38, 14, 5, '#d6dce1');
  if (ad) { g.save(); g.fillStyle = '#3a2a10'; g.font = `600 ${Math.round(h * .16)}px Oswald`; g.textAlign = 'center'; g.fillText('IKLAN', x + w / 2, y + h * .4); g.restore(); }
}

export function feedScreen(scroll = 0, ad = -1) {
  return (c, x, y, w, h) => { const o = g; g = c; use(c); rrect(x, y, w, h, 0, '#e9eef2');
    for (let i = -1; i < 6; i++) { const yy = y + 90 + i * 220 - (scroll % 220); card(x + 20, yy, w - 40, 200, i + Math.floor(scroll / 220), i + Math.floor(scroll / 220) === ad); }
    rrect(x, y, w, 70, 0, '#ffffff'); g.fillStyle = '#20242c'; g.font = '600 30px Oswald'; g.fillText('Beranda', x + 24, y + 48); g = o; use(o); };
}
// render a shot into an offscreen canvas (for photo / freeze transitions)

export function setD(spot = AMBER, x = 540, y = 900, floor = 1140) {
  vgrad(0, 0, W, H, '#1c1a22', '#0f0e13');
  // the archive hall: tall shelves of case folders on both sides, receding into the dark
  depth(9, () => {
    [-1, 1].forEach(side => { for (let r = 3; r >= 0; r--) { const sc = 1 - r * .2, w = 170 * sc, x0 = side < 0 ? 20 + r * 92 : W - 20 - r * 92 - w, top = 300 + r * 110, bot = floor - r * 30, rows = 7, rh = (bot - top) / rows;
      rrect(x0, top, w, bot - top, 6, ['#2b2732', '#26232d', '#211e28', '#1c1a22'][r]);
      for (let k = 0; k < rows; k++) { rrect(x0 + 6, top + (k + 1) * rh - 10, w - 12, 8, 2, 'rgba(0,0,0,.4)'); for (let f = 0; f < 5; f++) rrect(x0 + 10 + f * (w - 20) / 5, top + k * rh + 10, (w - 20) / 5 - 5, rh - 24, 3, ['#7a5a3a', '#5a4a3a', '#8a6a44', '#6a5040', '#4a3a30'][(f + k + r) % 5]); }
      g.save(); g.fillStyle = `rgba(15,14,19,${.25 + r * .15})`; g.fillRect(x0, top, w, bot - top); g.restore(); } });
  });
  // polished floor with perspective joints, catching the spot
  vgrad(0, floor, W, H - floor, '#1d1a22', '#0b0a0e');
  for (let i = -9; i <= 9; i++) line([[x + i * 50, floor], [x + i * 230, H]], 2, 'rgba(255,220,170,.06)');
  for (let j = 1; j < 9; j++) { const yy = floor + Math.pow(j / 9, 1.7) * (H - floor); line([[0, yy], [W, yy]], 2, 'rgba(255,220,170,.05)'); }
  g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createLinearGradient(0, 0, 0, floor); gr.addColorStop(0, 'rgba(255,200,120,0)'); gr.addColorStop(1, 'rgba(255,200,120,.12)');
  poly([[x - 70, 0], [x + 70, 0], [x + 400, floor + 40], [x - 400, floor + 40]], gr); g.restore();
  ellipse(x, floor + 40, 430, 70, 'rgba(255,200,120,.12)'); pool(x, floor + 60, 500, 'rgb(255,190,110)', .1);
  for (let i = 0; i < 70; i++) { const px = x - 300 + (i * 211) % 600, py = (i * 397) % floor; ellipse(px + (py / floor) * ((i % 2) ? 60 : -60), py, 2, 2, `rgba(255,230,190,${.12 + (i % 3) * .06})`); }
}

export function bigButton(x, y, s = 1, { cracked = 0, glow = 1, label = 'HALAMAN BERIKUTNYA ›' } = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  ellipse(0, 150, 300, 46, 'rgba(0,0,0,.45)');
  rrect(-280, 40, 560, 110, 30, '#2b2830'); rrect(-280, 40, 560, 26, 14, '#3a3640');
  if (cracked < 1) {
    rrect(-240, -60, 480, 130, 36, '#b97416'); rrect(-240, -90, 480, 130, 36, AMBER); vgrad(-240, -90, 480, 50, 'rgba(255,255,255,.28)', 'rgba(255,255,255,0)');
    g.fillStyle = '#3a2a10'; g.font = '600 46px Oswald'; g.textAlign = 'center'; g.fillText(label, 0, -8);
    if (cracked > 0) { g.strokeStyle = '#2a1c0a'; g.lineWidth = 6; g.beginPath(); g.moveTo(-60, -90); g.lineTo(-20, -40); g.lineTo(-50, 0); g.lineTo(10, 40); g.moveTo(-20, -40); g.lineTo(60, -50); g.stroke(); }
  }
  g.restore();
  if (glow) pool(x, y - 20 * s, 420 * s, 'rgb(255,180,58)', .22 * glow);
}
// close-up hand gripping an object (generic grip, LOD 2), wrist from the top-right

export function handCursor(x, y, s = 1, press = 0) {
  g.save(); g.translate(x, y); g.scale(s, s * (1 - .12 * press)); g.lineJoin = 'round'; g.lineWidth = 2.2; g.strokeStyle = '#111';
  g.beginPath(); g.moveTo(-4, 4); g.quadraticCurveTo(-4, -1, 0, -1); g.quadraticCurveTo(4, -1, 4, 4); g.lineTo(4, 17);
  [[4, 9], [10, 11], [16, 13]].forEach(([x0, h]) => { g.lineTo(x0, 17 - h + 12); g.quadraticCurveTo(x0 + 3, 17 - h + 9, x0 + 6, 17 - h + 12); });
  g.lineTo(22, 34); g.quadraticCurveTo(22, 44, 15, 48); g.lineTo(-1, 48); g.quadraticCurveTo(-6, 44, -9, 38); g.lineTo(-15, 27); g.quadraticCurveTo(-16, 22, -11, 22); g.lineTo(-4, 28); g.closePath();
  g.fillStyle = '#fdfcf7'; g.fill(); g.stroke(); [10, 16].forEach(x0 => { g.beginPath(); g.moveTo(x0, 20); g.lineTo(x0, 27); g.stroke(); });
  g.restore();
}

export function setE({ cam = 0 } = {}) {
  vgrad(0, 0, W, H, '#a8b79c', '#869882'); hgrad(0, 0, W, H, 'rgba(0,0,0,.12)', 'rgba(255,200,140,.06)');
  depth(6, k => { const o = -cam * 28;
    rrect(600 + o, 230, 400, 500, 8, '#5b4a3a'); vgrad(620 + o, 250, 360, 460, '#f0a070', '#6c5c8c');
    poly([[620 + o, 610], [700 + o, 560], [760 + o, 600], [840 + o, 540], [980 + o, 590], [980 + o, 710], [620 + o, 710]], '#3a3448');
    for (let i = 0; i < 8; i++) rrect(650 + o + i * 40, 630 + (i % 3) * 20, 10, 12, 2, '#ffd58a');
    poly([[590 + o, 220], [720 + o, 220], [690 + o, 760], [580 + o, 760]], '#b55a48'); poly([[880 + o, 220], [1010 + o, 220], [1020 + o, 760], [910 + o, 760]], '#b55a48');
    for (let i = 0; i < 4; i++) { line([[610 + o + i * 28, 230], [600 + o + i * 26, 750]], 4, 'rgba(0,0,0,.15)'); line([[900 + o + i * 28, 230], [920 + o + i * 26, 750]], 4, 'rgba(0,0,0,.15)'); }
    rrect(110 + o, 280, 210, 290, 4, '#f3efe6'); rrect(110 + o, 280, 210, 74, 4, '#c0553a'); k.fillStyle = '#fff'; k.font = '600 46px Oswald'; k.textAlign = 'center'; k.fillText('2006', 215 + o, 334); k.textAlign = 'left';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) rrect(124 + o + c * 38, 372 + r * 46, 30, 36, 2, r === 2 && c === 3 ? '#e3b54a' : '#e1dbcf');
    rrect(370 + o, 300, 180, 140, 6, '#6a4a34'); rrect(382 + o, 312, 156, 116, 3, '#cdb88e'); ellipse(430 + o, 380, 20, 22, '#7a5a42'); ellipse(490 + o, 376, 22, 24, '#5a4a3a');
    rrect(0, 1040, W, 18, 0, 'rgba(0,0,0,.14)');
  });
  pool(980, 1140, 520, 'rgb(255,190,110)', .3);
}

export function crt(x, y, s = 1, screen) {
  g.save(); g.translate(x, y); g.scale(s, s);
  poly([[-200, -170], [200, -170], [150, -230], [-150, -230]], '#cfc3ab'); rrect(-60, 170, 120, 40, 6, '#bdb09a'); rrect(-140, 200, 280, 26, 10, '#c9bca6');
  rrect(-230, -190, 460, 380, 26, '#e0d5bf'); vgrad(-230, -190, 460, 60, 'rgba(255,255,255,.18)', 'rgba(255,255,255,0)');
  rrect(-196, -160, 392, 300, 22, '#20262c'); g.save(); g.beginPath(); g.roundRect(-188, -152, 376, 284, 26); g.clip(); screen(-188, -152, 376, 284);
  const gr = g.createRadialGradient(-60, -80, 20, 0, 0, 260); gr.addColorStop(0, 'rgba(255,255,255,.18)'); gr.addColorStop(1, 'rgba(0,0,0,.25)'); g.fillStyle = gr; g.fillRect(-188, -152, 376, 284);
  for (let i = 0; i < 70; i++) g.fillRect(-188, -152 + i * 4.1, 376, 1), g.fillStyle = 'rgba(0,0,0,.05)';
  g.restore(); ellipse(170, 168, 5, 5, '#6ad06a');
  g.restore();
}

export function page06(ctxX, ctxY, w, h, { page = 1, button = 1, big = false } = {}) {
  rrect(ctxX, ctxY, w, h, 0, '#f4f2ec'); rrect(ctxX, ctxY, w, h * .09, 0, '#2f5aa8'); rrect(ctxX, ctxY + h * .09, w, h * .07, 0, '#dcd8cf'); rrect(ctxX + w * .04, ctxY + h * .105, w * .7, h * .045, 4, '#ffffff');
  [0, 1, 2].forEach(i => rrect(ctxX + w * (.82 + i * .055), ctxY + h * .025, w * .04, h * .04, 3, ['#e8b84a', '#7fbf6a', '#d9483b'][i]));
  rrect(ctxX + w * .05, ctxY + h * .2, w * .4, h * .06, 4, '#c0553a');
  for (let i = 0; i < 3; i++) { rrect(ctxX + w * .05, ctxY + h * (.3 + i * .17), w * .26, h * .13, 4, FEED[i + 1]); rrect(ctxX + w * .35, ctxY + h * (.31 + i * .17), w * .55, h * .025, 3, '#5a6878'); rrect(ctxX + w * .35, ctxY + h * (.36 + i * .17), w * .45, h * .02, 3, '#b7c0c8'); rrect(ctxX + w * .35, ctxY + h * (.395 + i * .17), w * .5, h * .02, 3, '#b7c0c8'); }
  if (button) { g.save(); g.globalAlpha = button; rrect(ctxX + w * .58, ctxY + h * .84, w * .36, h * .1, 8, AMBER); g.fillStyle = '#3a2a10'; g.font = `600 ${Math.round(h * (big ? .055 : .05))}px Oswald`; g.textAlign = 'center'; g.fillText(`Hal ${page + 1} ›`, ctxX + w * .76, ctxY + h * .91); g.textAlign = 'left'; g.restore(); }
  for (let i = 0; i < 4; i++) { g.fillStyle = i + 1 === page ? '#2f5aa8' : '#8a96a3'; g.font = `600 ${Math.round(h * .04)}px Oswald`; g.fillText(String(i + 1), ctxX + w * (.07 + i * .08), ctxY + h * .91); }
}

export function handsOver(J, P, skin) { [[J.eL, J.wL], [J.eR, J.wR]].forEach(([e, w]) => { const sx = p => [P.x + p[0] * P.s, P.y + p[1] * P.s], W0 = sx(w), E0 = sx(e), m = [W0[0] + (E0[0] - W0[0]) * .3, W0[1] + (E0[1] - W0[1]) * .3]; line([m, W0], 13 * P.s, skin); ellipse(W0[0], W0[1], 11 * P.s, 10 * P.s, skin); }); }

export function tunnel(u, cx, cy, pw, ph, alpha = .55) {
  const inner = [[cx - pw, cy - ph], [cx + pw, cy - ph], [cx + pw, cy + ph], [cx - pw, cy + ph]], outer = [[-60, -60], [W + 60, -60], [W + 60, H + 60], [-60, H + 60]];
  const L = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const shade = ['#1f1c28', '#24212e', '#16141c', '#211e2b'];
  [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([a, b], wi) => {
    poly([outer[a], outer[b], inner[b], inner[a]], shade[wi]);
    const cols = wi % 2 ? 4 : 3, rows = 9;
    for (let k = 0; k < rows; k++) for (let c = 0; c < cols; c++) {
      const tt = ((k + u * 2) % rows) / rows, t0 = 1 - Math.pow(1 - tt, 2.2), t1 = 1 - Math.pow(1 - Math.min(1, tt + .85 / rows), 2.2);
      const Q = (s, t) => L(L(outer[a], outer[b], s), L(inner[a], inner[b], s), t), s0 = (c + .08) / cols, s1 = (c + .92) / cols;
      g.save(); g.globalAlpha = (alpha * (1 - t0) + .05) * .55; poly([Q(s0, t0), Q(s1, t0), Q(s1, t1), Q(s0, t1)], FEED[(k + c + wi) % FEED.length]); g.restore();
    }
  });
  pool(cx, cy, Math.max(pw, ph) * 2.2, 'rgb(127,227,255)', .3);
}
