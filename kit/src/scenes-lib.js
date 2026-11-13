// SCENES LIB — the channel's reusable 2D scene types and hero objects (style locked 13 Nov 2026, references/2-visual §0, §0b).
// Rules baked in: the hero object big and centred, motion from u=0, mid-key backgrounds that read on a phone,
// no outlines, a gradient on every big surface, soft contact shadows, one key light + rim, grain.
// Every function draws into the current context (setCtx). Sizes are for a 1080×1920 frame; s = scale.
import { W, H, use, vgrad, rrect, poly, ellipse, line, pool, contact, vignette, grain, shadowFall } from './scene-kit.js';
export let g;
export const setCtx = c => { g = c; use(c); };
export const RED = '#d9483b', AMBER = '#ffb43a', CYAN = '#7fe3ff', PAPER = '#efe6d0', INKC = '#1f1b22';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const ease = x => (x = clamp(x), x * x * (3 - 2 * x));
const out = x => 1 - Math.pow(1 - clamp(x), 3);
const back = x => { x = clamp(x); const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
export { ease, out, back, clamp, hash, pool };
const save = (x, y, r = 0, s = 1) => { g.save(); g.translate(x, y); g.rotate(r); g.scale(s, s); };

// ——— backgrounds (mid-key: frame luma ≈ 90–150 so the phone reads it) ———
export const BG = {
  hangat: ['#b4643a', '#5a2c1e', 'rgb(255,200,120)'],   // warm amber studio (hero objects)
  meja: ['#6d4b36', '#3a261b', 'rgb(255,214,150)'],     // archive desk
  lab: ['#4f7584', '#22384a', 'rgb(160,230,255)'],      // cool lab
  koran: ['#8a8170', '#4a4438', 'rgb(255,240,200)'],    // newsprint grey
  aman: ['#3f7d6a', '#1d3d36', 'rgb(170,255,210)'],     // safe green
  merah: ['#8c2f2a', '#3a1414', 'rgb(255,140,110)'],    // alarm
  susu: ['#9bb6c9', '#4f6b82', 'rgb(255,255,255)'],     // milk blue
};
export function bg(name = 'hangat', { lx = 540, ly = 760, r = 900, a = .55 } = {}) {
  const [c0, c1, light] = BG[name] || BG.hangat;
  vgrad(0, 0, W, H, c0, c1); pool(lx, ly, r, light, a); shadowFall(lx, ly, 300, 1250, .45);
}
export function finish(seed = 1, v = .32) { vignette(v); grain(seed); }
// floor line + soft table top for objects to sit on
export function tableTop(y = 1330, col = '#3b2a20') { vgrad(0, y, W, H - y, col, '#120c09'); g.fillStyle = 'rgba(255,255,255,.06)'; g.fillRect(0, y, W, 6); }

// ——— big type that is part of the picture (not the caption) ———
export function title(t, x, y, size = 96, col = '#fff6e6', { rot = 0, k = 1 } = {}) {
  save(x, y, rot, k); g.font = `600 ${size}px Oswald`; g.textAlign = 'center'; g.lineJoin = 'round';
  g.strokeStyle = 'rgba(20,16,22,.92)'; g.lineWidth = size * .17; g.strokeText(t, 0, 0); g.fillStyle = col; g.fillText(t, 0, 0); g.restore();
}
// rubber stamp that slams in: u0 = when it lands (in shot u), d = slam length
export function stampSlam(t, x, y, u, u0 = 0, { rot = -.1, col = RED, size = 92, d = .12 } = {}) {
  if (u < u0) return;
  const k = clamp((u - u0) / d), s = 1.9 - .9 * out(k);
  save(x, y, rot, s); g.globalAlpha = .97 * clamp(k * 3); g.font = `700 ${size}px "Courier Prime"`; g.textAlign = 'center';
  const w = g.measureText(t).width + 60; g.strokeStyle = col; g.lineWidth = 9; g.strokeRect(-w / 2, -size * .95, w, size * 1.32);
  g.lineWidth = 3; g.strokeRect(-w / 2 + 12, -size * .95 + 12, w - 24, size * 1.32 - 24);
  g.fillStyle = col; g.fillText(t, 0, 0); g.restore();
}
// the channel's twist mark
export const terungkap = (u, u0 = 0, x = 540, y = 1520) => stampSlam('TERUNGKAP', x, y, u, u0, { size: 96 });
// a red X / green check drawn over something
export function cross(x, y, r, k = 1) { const a = r * clamp(k * 2), b = r * clamp(k * 2 - 1); line([[x - r, y - r], [x - r + a * 2, y - r + a * 2]], r * .22, RED); if (b > 0) line([[x + r, y - r], [x + r - b * 2, y - r + b * 2]], r * .22, RED); }
export function check(x, y, r, k = 1) { const p = [[x - r, y], [x - r * .3, y + r * .7], [x + r, y - r * .8]]; const kk = clamp(k); const q = kk < .4 ? [p[0], [p[0][0] + (p[1][0] - p[0][0]) * kk / .4, p[0][1] + (p[1][1] - p[0][1]) * kk / .4]] : [p[0], p[1], [p[1][0] + (p[2][0] - p[1][0]) * (kk - .4) / .6, p[1][1] + (p[2][1] - p[1][1]) * (kk - .4) / .6]]; line(q, r * .24, '#5fd38a'); }

// ——— ARSIP overlay (replaces the full-screen card since #003): manila tab drops in over the moving shot, ≤1.3 s ———
export function arsipOverlay(t, no, line2 = '') {
  if (t < 0 || t > 1.3) return;
  const k = out(t / .25), fade = t > 1.05 ? 1 - (t - 1.05) / .25 : 1;
  g.save(); g.globalAlpha = clamp(fade); g.translate(540, -150 + 330 * k); g.rotate(-.03); g.scale(1.15, 1.15);
  g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(-372, 12, 760, 150);
  vgrad(-380, 0, 760, 150, '#e8c98a', '#caa564'); rrect(-380, -40, 250, 50, 12, '#e8c98a');
  g.font = '700 30px "Courier Prime"'; g.fillStyle = '#5a3a1a'; g.textAlign = 'left'; g.fillText('ARSIP KASUS', -360, -6);
  g.font = '600 64px Oswald'; g.fillStyle = '#2a1a10'; g.fillText(`#${String(no).padStart(3, '0')}`, -350, 95);
  if (line2) { g.font = '700 44px "Courier Prime"'; g.fillText(line2, -150, 92); }
  g.restore();
  if (t > .45) stampSlam('DIBUKA', 760, 330, t, .45, { size: 40, rot: -.12, d: .1 });
}

// ——— hero objects ———
// plain MSG sachet (no brand): foil body, red band, bowl icon; tear 0..1 rips the top corner
export function sachet(x, y, s = 1, { tear = 0, rot = 0, label = 'MICIN', glow = 0 } = {}) {
  save(x, y, rot, s);
  ellipse(0, 330, 230, 34, 'rgba(0,0,0,.28)');
  if (glow) pool(0, 0, 420, 'rgb(255,230,160)', .35 * glow);
  const top = -300 + 40 * tear;
  // body with crimped edges
  g.beginPath(); g.moveTo(-210, top); for (let i = 0; i <= 14; i++) g.lineTo(-210 + i * 30, top + (i % 2 ? -12 : 0)); g.lineTo(210, 300);
  for (let i = 14; i >= 0; i--) g.lineTo(-210 + i * 30, 300 + (i % 2 ? 12 : 0)); g.closePath();
  const gr = g.createLinearGradient(-210, 0, 210, 0); gr.addColorStop(0, '#d9dde3'); gr.addColorStop(.45, '#ffffff'); gr.addColorStop(.6, '#e9ecf0'); gr.addColorStop(1, '#aeb4bd'); g.fillStyle = gr; g.fill();
  vgrad(-210, -150, 420, 150, '#e0453a', '#b52f28');
  g.font = '600 120px Oswald'; g.textAlign = 'center'; g.fillStyle = '#fff7ea'; g.fillText(label, 0, -30);
  // bowl icon + steam
  ellipse(0, 150, 120, 26, '#f3d9a8'); poly([[-120, 150], [120, 150], [80, 230], [-80, 230]], '#c9573e'); ellipse(0, 150, 112, 20, '#f6e7c4');
  for (const dx of [-40, 0, 40]) line([[dx, 110], [dx + 12, 80], [dx - 6, 50], [dx + 6, 20]], 8, 'rgba(255,255,255,.55)');
  g.font = '700 34px "Courier Prime"'; g.fillStyle = '#5b5f66'; g.fillText('PENYEDAP RASA', 0, 282);
  // torn corner + crystals at the lip
  if (tear > 0) { poly([[90, top - 14], [210, top - 14], [210, top + 70]], '#2a1d16'); for (let i = 0; i < 9; i++) ellipse(120 + hash(i) * 80, top + 10 + hash(i + 9) * 30, 9, 7, '#ffffff'); }
  g.restore();
}
// MSG crystals pouring/bursting from (x,y): u 0..1, dir = gravity sign
export function crystals(x, y, u, { n = 70, spread = 520, fall = 1100, seed = 3 } = {}) {
  for (let i = 0; i < n; i++) {
    const a = hash(i + seed), b = hash(i * 3.1 + seed), t = clamp(u * 1.2 - a * .2);
    if (t <= 0) continue;
    const px = x + (b - .5) * spread * t, py = y - 220 * t * (1 - a) + fall * t * t;
    g.save(); g.translate(px, py); g.rotate(a * 6 + t * 4); g.fillStyle = i % 5 ? '#ffffff' : '#e8f4ff'; g.fillRect(-8, -5, 16, 10); g.restore();
  }
}
export function envelope(x, y, s = 1, { open = 0, rot = 0, stampTxt = '1968' } = {}) {
  save(x, y, rot, s); ellipse(0, 230, 330, 30, 'rgba(0,0,0,.25)');
  vgrad(-320, -200, 640, 400, '#f2e8d2', '#d8ccb0');
  poly([[-320, -200], [0, 30 - 230 * open], [320, -200]], open > .5 ? '#cbbd9c' : '#e6dcc2');
  poly([[-320, 200], [0, -20], [320, 200]], '#e2d7bd');
  rrect(170, -170, 120, 140, 6, '#c45a3c'); g.font = '700 30px "Courier Prime"'; g.fillStyle = '#f2e8d2'; g.textAlign = 'center'; g.fillText(stampTxt, 230, -90);
  g.restore();
}
// typed letter page; lines = text strings; hl = [index, 0..1 sweep]
export function letter(x, y, s = 1, { head = '', lines = [], hl = null, rot = 0, sig = '', sig2 = null } = {}) {
  save(x, y, rot, s); g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(-372, -512, 760, 1040);
  vgrad(-380, -520, 760, 1040, '#f7f0de', '#e3d8bf');
  g.font = '600 46px Oswald'; g.fillStyle = '#3a2c22'; g.textAlign = 'left'; if (head) g.fillText(head, -330, -430);
  g.fillStyle = 'rgba(80,60,40,.25)'; g.fillRect(-330, -405, 660, 3);
  g.font = '700 38px "Courier Prime"';
  lines.forEach((t, i) => { const yy = -330 + i * 70;
    if (hl && hl[0] === i) { g.fillStyle = 'rgba(255,214,60,.75)'; g.fillRect(-338, yy - 40, (g.measureText(t).width + 16) * clamp(hl[1]), 54); }
    g.fillStyle = '#2b2420'; g.fillText(t, -330, yy); });
  if (sig) { g.font = 'italic 600 54px Oswald'; g.fillStyle = '#1d3a6a'; g.fillText(sig, -40, 430); }
  if (sig2) { g.save(); g.globalAlpha = .85; g.font = 'italic 600 54px Oswald'; g.fillStyle = '#7a1d1d'; g.translate(-20, 445); g.rotate(-.12); g.fillText(sig2, 0, 0); g.restore(); }
  g.restore();
}
export function newspaper(x, y, s = 1, { head = 'BERITA', sub = '', rot = 0, mast = 'THE DAILY NEWS' } = {}) {
  save(x, y, rot, s); g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(-342, -462, 700, 940);
  vgrad(-350, -470, 700, 940, '#ece6d6', '#d6ceb9');
  g.font = '600 46px Oswald'; g.fillStyle = '#2b2620'; g.textAlign = 'center'; g.fillText(mast, 0, -400); g.fillRect(-310, -380, 620, 5);
  g.font = '600 92px Oswald'; const words = head.split(' '); let row = '', yy = -280; for (const w of words) { const tr = row ? row + ' ' + w : w; if (g.measureText(tr).width > 600 && row) { g.fillText(row, 0, yy); yy += 96; row = w; } else row = tr; } g.fillText(row, 0, yy);
  if (sub) { g.font = '700 32px "Courier Prime"'; g.fillText(sub, 0, yy + 70); }
  g.fillStyle = '#8f8778'; vgrad(-310, yy + 110, 290, 220, '#b9b09c', '#9b927f');
  g.fillStyle = 'rgba(70,64,54,.55)'; for (let k = 0; k < 14; k++) { g.fillRect(10, yy + 110 + k * 22, 300 - hash(k) * 60, 8); g.fillRect(-310, yy + 350 + k * 22, 620 - hash(k + 5) * 120, 8); }
  g.restore();
}
export function wineBottle(x, y, s = 1) { save(x, y, 0, s); ellipse(0, 250, 90, 16, 'rgba(0,0,0,.3)'); vgrad(-70, -60, 140, 310, '#3d6b4a', '#1f3a28'); rrect(-70, -60, 140, 310, 40, '#2e5a3c'); rrect(-26, -240, 52, 200, 14, '#2e5a3c'); rrect(-30, -260, 60, 40, 8, '#8a2b2b'); rrect(-60, 40, 120, 110, 10, '#efe2c4'); g.font = '600 34px Oswald'; g.fillStyle = '#5a2b1a'; g.textAlign = 'center'; g.fillText('ARAK', 0, 108); g.fillStyle = 'rgba(255,255,255,.25)'; g.fillRect(-50, -40, 16, 260); g.restore(); }
export function saltShaker(x, y, s = 1) { save(x, y, 0, s); ellipse(0, 210, 90, 16, 'rgba(0,0,0,.3)'); vgrad(-80, -80, 160, 290, '#f4f7fa', '#c9d1da'); rrect(-80, -80, 160, 290, 30, 'rgba(240,245,250,.9)'); vgrad(-76, 20, 152, 180, '#ffffff', '#e6ebf0'); rrect(-84, -150, 168, 90, 24, '#aeb6c0'); for (let i = 0; i < 6; i++) ellipse(-50 + i * 20, -130, 5, 5, '#5b6470'); g.font = '600 40px Oswald'; g.fillStyle = '#5b6470'; g.textAlign = 'center'; g.fillText('GARAM', 0, 120); g.restore(); }
export function syringe(x, y, s = 1, { rot = 0, press = 0, fill = '#ffffff' } = {}) {
  save(x, y, rot, s);
  rrect(-260, -46, 400, 92, 18, 'rgba(225,240,250,.55)'); rrect(-250, -36, 380 - 220 * press, 72, 12, fill);
  rrect(140, -14, 70, 28, 6, '#aeb6c0'); line([[210, 0], [380, 0]], 7, '#d8dde3');
  rrect(-300 + 220 * press - 220 * 0, -60, 30, 120, 6, '#8c96a3'); line([[-300 + 220 * press, 0], [-430, 0]], 20, '#8c96a3'); rrect(-450, -70, 30, 140, 8, '#6b7480');
  for (let i = 0; i < 6; i++) g.fillRect(-220 + i * 60, -46, 4, 26);
  g.restore();
}
export function mouse(x, y, s = 1, { look = 1, bounce = 0, baby = true } = {}) {
  save(x, y - Math.abs(Math.sin(bounce)) * 12, 0, s * (baby ? .8 : 1)); g.scale(look, 1);
  ellipse(0, 70, 110, 16, 'rgba(0,0,0,.25)'); line([[-90, 40], [-170, 20], [-220, 50]], 10, '#e9a7a7');
  ellipse(0, 10, 105, 70, '#f1ece6'); ellipse(85, -10, 55, 48, '#f6f1eb'); ellipse(70, -60, 26, 30, '#f2b9b9'); ellipse(70, -60, 16, 20, '#e79a9a');
  ellipse(105, -20, 9, 10, '#2a1d22'); ellipse(108, -24, 3, 3, '#fff'); ellipse(138, -2, 9, 8, '#e98b9a');
  g.restore();
}
export function brain(x, y, s = 1, { crack = 0, glow = 0 } = {}) {
  save(x, y, 0, s); if (glow) pool(0, 0, 360, 'rgb(255,120,100)', .4 * glow);
  const c = crack > 0 ? '#e7a3a3' : '#f2b8c0';
  for (const [dx, dy, rx, ry] of [[-90, -30, 150, 120], [90, -30, 150, 120], [-70, 60, 140, 100], [80, 60, 140, 100], [0, -90, 130, 80]]) ellipse(dx, dy, rx, ry, c);
  g.strokeStyle = 'rgba(160,70,90,.5)'; g.lineWidth = 8; g.lineCap = 'round';
  for (let i = 0; i < 9; i++) { g.beginPath(); const a = hash(i) * 6.28; g.arc(Math.cos(a) * 90, Math.sin(a) * 60, 40 + hash(i + 3) * 30, a, a + 2); g.stroke(); }
  if (crack > 0) line([[-10, -170], [20, -90], [-20, -20], [30, 40], [0, 140]].slice(0, 1 + Math.ceil(crack * 4)), 12, RED);
  g.restore();
}
// covered test cup with a question label (blind test)
export function testCup(x, y, s = 1, { label = '?', lift = 0, col = '#e9eef3' } = {}) {
  save(x, y, 0, s); ellipse(0, 150, 120, 20, 'rgba(0,0,0,.3)');
  poly([[-100, -60], [100, -60], [80, 150], [-80, 150]], col); ellipse(0, -60, 100, 22, '#f8fafc'); ellipse(0, -60, 88, 16, '#f5f0e2');
  g.save(); g.translate(0, -90 - 160 * lift); rrect(-120, -40, 240, 70, 20, '#8a6a4a'); ellipse(0, -40, 40, 18, '#6f5338'); g.restore();
  g.font = '600 80px Oswald'; g.fillStyle = '#5b6470'; g.textAlign = 'center'; g.fillText(label, 0, 90); g.restore();
}
export function shield(x, y, s = 1, { text = 'AMAN', sub = '', k = 1 } = {}) {
  save(x, y, 0, s * back(k)); pool(0, 0, 420, 'rgb(150,255,200)', .35);
  poly([[0, -260], [220, -180], [200, 80], [0, 260], [-200, 80], [-220, -180]], '#2f8f63'); poly([[0, -220], [180, -150], [165, 70], [0, 220], [-165, 70], [-180, -150]], '#45b07c');
  g.font = '600 110px Oswald'; g.fillStyle = '#f2fff6'; g.textAlign = 'center'; g.fillText(text, 0, 30);
  if (sub) { g.font = '700 40px "Courier Prime"'; g.fillText(sub, 0, 110); }
  g.restore();
}
// glutamate molecule (stylised ball-and-stick); spin = radians
export function molecule(x, y, s = 1, { spin = 0, glow = 0 } = {}) {
  save(x, y, spin, s); if (glow) pool(0, 0, 300, 'rgb(255,220,120)', .45 * glow);
  const P = [[-180, 0], [-90, -50], [0, 0], [90, -50], [180, 0], [-240, -60], [-240, 60], [240, -60], [240, 60], [0, 100]];
  for (const [a, b] of [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [0, 6], [4, 7], [4, 8], [2, 9]]) line([P[a], P[b]], 16, '#d9d4c8');
  P.forEach((p, i) => { const c = i >= 5 ? (i === 9 ? '#5a8ee8' : '#e8574a') : '#3a3f4a'; ellipse(p[0], p[1], i >= 5 ? 32 : 40, i >= 5 ? 32 : 40, c); ellipse(p[0] - 10, p[1] - 12, 10, 10, 'rgba(255,255,255,.35)'); });
  g.restore();
}
export function babyBottle(x, y, s = 1, { label = 'ASI', level = .7, rot = 0 } = {}) {
  save(x, y, rot, s); ellipse(0, 300, 120, 18, 'rgba(0,0,0,.25)');
  rrect(-110, -150, 220, 440, 50, 'rgba(240,248,255,.6)'); vgrad(-100, 280 - 420 * level, 200, 420 * level, '#fffaf0', '#f3e7cf'); rrect(-100, 280 - 420 * level, 200, 420 * level, 40, 'rgba(255,250,240,.95)');
  rrect(-120, -200, 240, 70, 14, '#7fb7e8'); poly([[-60, -200], [60, -200], [24, -320], [-24, -320]], '#f2c9a0'); ellipse(0, -322, 24, 16, '#f2c9a0');
  g.font = '600 90px Oswald'; g.fillStyle = '#4a6b8a'; g.textAlign = 'center'; g.fillText(label, 0, 120); g.restore();
}
export function milkCarton(x, y, s = 1, { label = 'SUSU SAPI' } = {}) {
  save(x, y, 0, s); ellipse(0, 260, 130, 18, 'rgba(0,0,0,.25)'); vgrad(-120, -100, 240, 360, '#ffffff', '#dfe6ec'); poly([[-120, -100], [0, -220], [120, -100]], '#cfd8e0'); rrect(-120, -100, 240, 360, 6, 'rgba(255,255,255,.9)');
  for (let i = 0; i < 4; i++) ellipse(-60 + hash(i) * 120, 20 + hash(i + 2) * 140, 30, 22, '#2b2b33');
  g.font = '600 46px Oswald'; g.fillStyle = '#3a6ea8'; g.textAlign = 'center'; g.fillText(label, 0, -30); g.restore();
}
// restaurant cue: round table, bowl, chopsticks, red lantern
export function restoTable(y = 1360, { lantern = true, sway = 0 } = {}) {
  if (lantern) { g.save(); g.translate(820, 360); g.rotate(Math.sin(sway) * .05); line([[0, -400], [0, 0]], 4, '#3a2a20'); ellipse(0, 90, 95, 110, '#d33a2c'); ellipse(0, 90, 70, 100, '#e8574a'); rrect(-40, -10, 80, 20, 4, '#e3b54a'); rrect(-40, 185, 80, 20, 4, '#e3b54a'); g.restore(); pool(820, 450, 300, 'rgb(255,120,80)', .35); }
  ellipse(540, y, 520, 90, '#5a2a24'); ellipse(540, y - 12, 500, 80, '#7a3a30');
  ellipse(470, y - 40, 120, 30, '#f3ead6'); poly([[350, y - 40], [590, y - 40], [550, y + 20], [390, y + 20]], '#f0e4c8'); ellipse(470, y - 40, 105, 22, '#d9a24a');
  line([[640, y - 60], [800, y - 10]], 8, '#c9a06a'); line([[650, y - 40], [810, y + 5]], 8, '#c9a06a');
}
// world spread: dots/newspapers popping across a stylised globe
export function globe(x, y, r, u, { n = 26, seed = 7 } = {}) {
  ellipse(x, y, r, r, '#2f5d7a'); pool(x - r * .3, y - r * .3, r * 1.1, 'rgb(150,210,255)', .25);
  g.save(); g.beginPath(); g.arc(x, y, r, 0, 6.29); g.clip();
  for (const [dx, dy, rx, ry] of [[-.35, -.25, .32, .22], [.2, -.3, .35, .2], [.3, .2, .25, .32], [-.3, .3, .2, .18], [.05, .05, .15, .12]]) ellipse(x + dx * r, y + dy * r, rx * r, ry * r, '#5e9a6a');
  g.restore();
  for (let i = 0; i < n; i++) { const t = clamp(u * 1.4 - hash(i + seed) * .9); if (t <= 0) continue; const a = hash(i * 2 + seed) * 6.28, d = Math.sqrt(hash(i * 5 + seed)) * r * .85;
    const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d; ellipse(px, py, 18 * back(t), 18 * back(t), '#ffb43a'); pool(px, py, 60, 'rgb(255,190,90)', .4 * t); }
}
// bar comparison: items = [{label, v, col}], u = grow 0..1
export function bars(x, y, items, u, { w = 200, gap = 120, max = 1, hMax = 700 } = {}) {
  const tw = items.length * w + (items.length - 1) * gap, x0 = x - tw / 2;
  items.forEach((it, i) => { const h = hMax * (it.v / max) * out(u * 1.3 - i * .15), bx = x0 + i * (w + gap);
    vgrad(bx, y - h, w, h, it.col, '#00000000'); rrect(bx, y - h, w, h, 18, it.col);
    title(it.label, bx + w / 2, y + 80, 56); if (it.val) title(it.val, bx + w / 2, y - h - 30, 72, AMBER); });
}
// a year marker on a timeline strip
export function yearMark(year, u, y = 520) { const k = out(u * 3); g.save(); g.globalAlpha = k; rrect(140, y - 70, 800, 140, 70, 'rgba(20,16,22,.55)'); g.restore(); title(String(year), 540, y + 38, 120 * (1.4 - .4 * k), AMBER); }
