// Rig lab: model sheet, expressions, modular assets, close-up hand, and a 5 s physics/acting test.
// Lighting follows research/referensi/ANALISA_VISUAL_2D.md: one clear source, rim on the figure, pool + vignette, blurred depth.
import { drawChar, solve, handPhoneCU, PRESETS, EXPR, walk, spring, ease, easeOut, clamp, INK } from './src/arsip-rig.js';

const W = 1080, H = 1920;
let g;
export const setCtx = c => { g = c; };

// —— environment kit ——
function bgGrad(c0, c1) { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, c0); gr.addColorStop(1, c1); g.fillStyle = gr; g.fillRect(0, 0, W, H); }
function pool(x, y, r, col, a) { g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, col.replace(')', `,${a})`).replace('rgb', 'rgba')); gr.addColorStop(1, col.replace(')', ',0)').replace('rgb', 'rgba')); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); g.restore(); }
function vignette(a = .45) { const gr = g.createRadialGradient(W / 2, H * .48, H * .25, W / 2, H * .5, H * .75); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, `rgba(0,0,0,${a})`); g.fillStyle = gr; g.fillRect(0, 0, W, H); }
function grain(seed, a = .05) { g.save(); g.globalAlpha = a; for (let i = 0; i < 2600; i++) { const r = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453; const x = (r - Math.floor(r)) * W, r2 = Math.sin(i * 4.1 + seed) * 9e3, y = (r2 - Math.floor(r2)) * H; g.fillStyle = i % 2 ? '#fff' : '#000'; g.fillRect(x, y, 2, 2); } g.restore(); }
function blurLayer(px, fn) { const c = document.createElement('canvas'); c.width = W; c.height = H; const o = g; g = c.getContext('2d'); fn(); g = o; g.save(); g.filter = `blur(${px}px)`; g.drawImage(c, 0, 0); g.restore(); }
function label(t, x, y, sz = 28, col = '#efe6d6', al = 'center', font = 'Oswald') { g.save(); g.font = `600 ${sz}px ${font}`; g.fillStyle = col; g.textAlign = al; g.fillText(t, x, y); g.restore(); }
function title(t, sub) { label(t, W / 2, 120, 58, '#f4ead8'); if (sub) label(sub, W / 2, 170, 26, '#bfb3a2', 'center', '"Courier Prime"'); }

// bust shot: places the head centre at (x, y), clipped to a card so the sheet layout never overflows
function bust(spec, P, x, y, s, cw, ch, opts) {
  const J = solve(spec, { ...P, x: 0, y: 0 });
  g.save(); g.beginPath(); g.roundRect(x - cw / 2, y - ch * .45, cw, ch, 18); g.clip();
  g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(x - cw / 2, y - ch * .45, cw, ch);
  drawChar(g, spec, { ...P, x: x - J.C[0] * s, y: y - J.C[1] * s, s }, { noShadow: true, ...opts });
  g.restore();
}
const RIM_WARM = { col: '#ffb46a', dir: [.75, -.66], w: 5 };
const NIGHT = { amb: '#3d3650', ambK: .16 };
const RIM_SCREEN = { col: '#7fe3ff', dir: [-.6, -.8], w: 5 };

// warm room backdrop used by the sheets (dark, one lamp → readable but cinematic)
function room(lampX = 860) {
  bgGrad('#2a2531', '#17141b');
  blurLayer(6, () => {
    g.fillStyle = '#231f29'; g.fillRect(0, 1500, W, 420);      // floor
    g.fillStyle = '#2f2a36'; g.fillRect(0, 1480, W, 22);       // skirting
    g.fillStyle = '#3a3240'; g.fillRect(lampX - 4, 0, 8, 260); // lamp cord
    g.fillStyle = '#4a3f45'; g.beginPath(); g.moveTo(lampX - 70, 330); g.lineTo(lampX + 70, 330); g.lineTo(lampX + 30, 260); g.lineTo(lampX - 30, 260); g.fill();
    g.fillStyle = '#ffe2a8'; g.beginPath(); g.ellipse(lampX, 332, 46, 10, 0, 0, Math.PI * 2); g.fill();
  });
  pool(lampX, 340, 700, 'rgb(255,190,120)', .32);
  pool(lampX, 340, 120, 'rgb(255,230,180)', .5);
}

// —— 1. model sheet: one base, eight people ——
export function MODEL() {
  room(900);
  title('ARSIP RIG · 1 BASE, BANYAK ORANG', 'kepala tetap · ekspresi stiker · aset modular');
  const row = (keys, y, s) => keys.forEach((k, i) => {
    const x = 160 + i * 253;
    drawChar(g, PRESETS[k], { x, y, s, facing: .12, expr: ['senyum', 'netral', 'senyum', 'senang', 'netral', 'senyum', 'senang', 'senyum'][Object.keys(PRESETS).indexOf(k)], look: .12 }, { rim: RIM_WARM, ...NIGHT });
    label(k.replace('_', ' ').toUpperCase(), x, y + 52, 30);
  });
  row(['pria', 'wanita', 'ibu', 'kakak'], 880, 1.05);
  row(['kakek', 'nenek', 'adik_lk', 'adik_pr'], 1560, 1.05);
  vignette(.4); grain(1);
}

// —— 2. expressions: the head never changes, only the sticker ——
export function EXPRESI() {
  bgGrad('#2b2733', '#1a171f'); pool(540, 900, 900, 'rgb(255,190,120)', .18);
  title('EKSPRESI · ASET STIKER', 'bentuk kepala fix, wajah diganti');
  const names = Object.keys(EXPR);
  names.forEach((n, i) => {
    const cx = 190 + (i % 3) * 350, cy = 400 + Math.floor(i / 3) * 360;
    bust({ body: 'adult', top: { type: 'kaos', col: '#4a4f5c' } }, { expr: n, facing: 0, look: 0, gaze: n === 'curiga' ? [.6, 0] : n === 'menyesal' ? [0, .6] : [0, 0] }, cx, cy, 2.2, 310, 300, { rim: RIM_WARM, ...NIGHT });
    label(n.toUpperCase(), cx, cy + 205, 32);
  });
  vignette(.35); grain(2);
}

// —— 3. modular assets: base + hair + headwear + accessories + wardrobe ——
export function ASET() {
  bgGrad('#2b2733', '#1a171f'); pool(540, 700, 900, 'rgb(255,190,120)', .16);
  title('ASET MODULAR', 'base + rambut + penutup kepala + aksesori + wardrobe');
  const base = { body: 'adult', top: { type: 'kaos', col: '#55505e' } };
  const head = (spec, x, y, t) => { bust(spec, { expr: 'netral', facing: .15, look: .15 }, x, y, 1.45, 160, 200, { rim: RIM_WARM, ...NIGHT }); label(t, x, y + 140, 24); };
  label('RAMBUT', 60, 250, 30, '#ffb43a', 'left');
  [['pendek', '#2b221d'], ['panjang', '#2b1f1a'], ['kuncir', '#2b1f1a'], ['sanggul', '#d6d1c8'], ['keriting', '#241c18'], ['botak', '#cfc9bf']].forEach(([t, c], i) => head({ ...base, hair: { type: t, col: c, tie: '#ffb43a' } }, 100 + i * 176, 380, t));
  label('PENUTUP KEPALA & AKSESORI', 60, 620, 30, '#ffb43a', 'left');
  [[{ headwear: { type: 'peci', col: '#1c1b1f' } }, 'peci'], [{ headwear: { type: 'kerudung', col: '#7f8f6a' } }, 'kerudung'], [{ headwear: { type: 'topi', col: '#b8433d' } }, 'topi'], [{ acc: [{ type: 'kacamata' }] }, 'kacamata'], [{ acc: [{ type: 'kumis', col: '#d8d3ca' }] }, 'kumis'], [{ acc: [{ type: 'jenggot', col: '#3b3430' }], hair: { type: 'pendek' } }, 'jenggot']].forEach(([a, t], i) => head({ ...base, ...a }, 100 + i * 176, 750, t));
  label('WARDROBE', 60, 990, 30, '#ffb43a', 'left');
  const wd = [[{ type: 'kaos', col: '#c9705a' }, { type: 'pendek', col: '#3b3f4a' }, 'kaos'], [{ type: 'kemeja', col: '#5d7f9e' }, { type: 'panjang', col: '#3b3f4a' }, 'kemeja'], [{ type: 'hoodie', col: '#3f6fb6' }, { type: 'panjang', col: '#2e3442' }, 'hoodie'], [{ type: 'jas', col: '#30323a' }, { type: 'panjang', col: '#30323a' }, 'jas'], [{ type: 'kebaya', col: '#8a6a8e' }, { type: 'sarung', col: '#6b4a32', col2: '#a4784f' }, 'kebaya+kain'], [{ type: 'gamis', col: '#a77d63' }, null, 'gamis']];
  wd.forEach(([top, bottom, t], i) => { const x = 110 + i * 172; drawChar(g, { body: 'adult', top, bottom, shoes: '#2a2522' }, { x, y: 1530, s: .92, expr: 'netral', facing: .1 }, { rim: RIM_WARM, ...NIGHT }); label(t, x, 1585, 26); });
  label('aset baru ditambah kapan saja, dipakai ulang', W / 2, 1720, 26, '#bfb3a2', 'center', '"Courier Prime"');
  vignette(.35); grain(3);
}

// —— 4. close-up hand (LOD 2): POV holding the phone at night ——
export function TANGAN(u = 0) {
  bgGrad('#1f2230', '#14151c');
  blurLayer(18, () => {   // the room behind, out of focus
    g.fillStyle = '#2b3446'; g.fillRect(60, 180, 360, 520);
    g.fillStyle = 'rgba(255,214,150,.55)'; g.fillRect(90, 210, 300, 460);
    g.fillStyle = '#3a3f52'; g.beginPath(); g.arc(860, 320, 90, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#5b4b6a'; g.fillRect(0, 1350, W, 600);
  });
  pool(560, 900, 760, 'rgb(127,227,255)', .22);
  handPhoneCU(g, 520, 820, 440, 860, {
    sleeve: '#3f6fb6', thumbT: u,
    screen: (c, x, y, w, h) => {
      c.fillStyle = '#e9eef2'; c.fillRect(x, y, w, h);
      for (let i = 0; i < 4; i++) { const yy = y + 90 + i * 210 - u * 140; c.fillStyle = ['#7fa8c9', '#d9a77a', '#8fc0b0', '#c49ab8'][i]; c.beginPath(); c.roundRect(x + 24, yy, w - 48, 150, 18); c.fill(); c.fillStyle = '#b7c2cb'; c.fillRect(x + 24, yy + 162, w * .55, 12); }
      c.fillStyle = '#ffffff'; c.fillRect(x, y, w, 70); c.fillStyle = '#20242c'; c.font = '600 30px Oswald'; c.fillText('Beranda', x + 24, y + 48);
    },
  });
  label('TANGAN CLOSE-UP · LOD 2', W / 2, 1720, 40);
  label('jari membungkus sisi HP, jempol di layar', W / 2, 1770, 24, '#bfb3a2', 'center', '"Courier Prime"');
  vignette(.5); grain(4);
}

// —— 5. 5-second acting test: walk in → stop → turn → lift phone → read → shock ——
const KAKAK = PRESETS.kakak;
function poseAt(t) {
  const tw = Math.min(t, 2.0);
  const w = walk(tw, { v: 150, T: 1.0, lift: 18 });
  const walking = t < 2.0;
  // settle the feet from the last walk pose to a stance (no sliding: blend only the airborne foot first)
  const st = ease((t - 2.0) / .35);
  const stanceL = [-17, 0], stanceR = [19, 0];
  const lf = walking ? w.lf : [w.lf[0] + (stanceL[0] - w.lf[0]) * st, w.lf[1] * (1 - st)];
  const rf = walking ? w.rf : [w.rf[0] + (stanceR[0] - w.rf[0]) * st, w.rf[1] * (1 - st)];
  const facing = t < 2.3 ? 1 : 1 - .85 * ease((t - 2.3) / .45);
  const lift = ease((t - 2.85) / .5);                   // phone up to the chest
  const shock = t > 4.15 ? easeOut((t - 4.15) / .18) : 0, antic = t > 4.0 && t < 4.15 ? ease((t - 4.0) / .15) : 0;
  const sw = walking ? w.swing : 0;
  return {
    x: 240 + w.x, bob: walking ? w.bob : w.bob * (1 - st), lf, rf, facing,
    look: facing * .9,
    crouch: antic * 6 - shock * 3,
    lh: shock > 0 ? [-6 + 30 * shock, 150 - 186 * shock] : [-6 - sw * 30, 150 - Math.abs(sw) * 6],
    rh: lift > 0 ? [6 - 40 * lift + 14 * shock, 150 - 112 * lift + 10 * shock] : [6 + sw * 30, 150 - Math.abs(sw) * 6],
    hold: t > 2.85 ? 'hp' : null, phoneRot: -.4 * lift,
    headTilt: lift * .12 * (1 - shock) - shock * .14,
    gaze: t > 3.2 && t < 4.15 ? [-.5, .8] : [0, 0],
    expr: t > 4.15 ? 'kaget' : t > 3.3 ? 'netral' : 'senyum',
    blink: Math.max(0, 1 - Math.abs(t - 3.7) / .06), walking,
    leanT: walking ? .07 : shock > 0 ? -.1 : 0,
  };
}
export function TEST(t) {
  // set: a dusk-lit corridor; the lamp is the key light, the figure carries its rim
  bgGrad('#2f2a3a', '#1a1720');
  blurLayer(7, () => {
    g.fillStyle = '#3a3346'; for (let i = 0; i < 4; i++) g.fillRect(80 + i * 270, 520, 180, 760);
    g.fillStyle = 'rgba(255,200,130,.5)'; g.fillRect(620, 580, 140, 300);
    g.fillStyle = '#241f2b'; g.fillRect(0, 1380, W, 540);
  });
  pool(700, 700, 800, 'rgb(255,190,120)', .3);
  const P = poseAt(t);
  P.lean = spring(tt => poseAt(tt).leanT, t, { k: 90, c: 11 });                       // momentum carries the lean past the stop
  P.stringSway = spring(tt => poseAt(tt).x * .02, t, { k: 60, c: 5 }) - P.x * .02;       // hoodie strings lag behind the body
  P.headTilt += (spring(tt => poseAt(tt).headTilt, t, { k: 140, c: 12 }) - P.headTilt) * 1;
  P.y = 1380; P.s = 1.55;
  // camera: a slow push-in, slightly faster on the shock
  const z = 1 + .04 * clamp(t / 5) + .05 * easeOut((t - 4.15) / .4) * (t > 4.15);
  g.save(); g.translate(W / 2, 1000); g.scale(z, z); g.translate(-W / 2, -1000);
  drawChar(g, KAKAK, P, { rim: RIM_WARM, ...NIGHT });
  g.restore();
  label(`UJI GERAK · ${t.toFixed(2)} s`, W / 2, 1780, 30, '#bfb3a2', 'center', '"Courier Prime"');
  vignette(.45); grain(5 + Math.floor(t * 24));
}
void INK;

// —— head colour study: same figure, same two lights (night lamp / daylight), four skin options ——
const mixc = (a, b, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
export function WARNA() {
  const opts = [
    ['A · HITAM', 'seperti referensi', { skin: '#141317', feat: '#f4ead8' }, false],
    ['B · PUTIH POLOS', 'tidak kena cahaya', { skin: '#f7f5f0', feat: '#1d1a1f' }, false],
    ['C · KERTAS ARSIP', 'kena cahaya scene', { skin: '#ecdfc6', feat: '#2a2024' }, true],
    ['D · SAWO MATANG', 'kena cahaya scene', { skin: '#b5815a', feat: '#2a1c16' }, true],
  ];
  const panel = (y0, night) => {
    g.save(); g.beginPath(); g.rect(0, y0, W, 860); g.clip();
    const gr = g.createLinearGradient(0, y0, 0, y0 + 860);
    if (night) { gr.addColorStop(0, '#2a2533'); gr.addColorStop(1, '#16131b'); } else { gr.addColorStop(0, '#e9dcc4'); gr.addColorStop(1, '#c9b593'); }
    g.fillStyle = gr; g.fillRect(0, y0, W, 860);
    if (night) { pool(900, y0 + 120, 700, 'rgb(255,190,120)', .28); pool(900, y0 + 120, 90, 'rgb(255,230,180)', .6); }
    else { g.fillStyle = 'rgba(255,250,235,.55)'; g.fillRect(760, y0 + 60, 260, 360); }
    opts.forEach(([t, sub, sk, lit], i) => {
      const amb = night ? '#3d3650' : '#f3e6cc';
      const skin = lit ? mixc(sk.skin, amb, night ? .38 : .08) : sk.skin;
      const x = 140 + i * 268;
      drawChar(g, { ...PRESETS.kakak, skin, feat: sk.feat }, { x, y: y0 + 760, s: 1.18, expr: i % 2 ? 'kaget' : 'senyum', facing: .15, look: .15 }, { rim: night ? RIM_WARM : { col: '#fff6e0', dir: [.75, -.66], w: 4 }, lightHead: lit ? (night ? .38 : .18) : 0 });
      label(t, x, y0 + 815, 26, night ? '#efe6d6' : '#2a2024');
    });
    label(night ? 'MALAM · lampu kamar' : 'SIANG · jendela', 40, y0 + 60, 30, night ? '#ffb43a' : '#7a4a1e', 'left');
    g.restore();
  };
  panel(80, true); panel(980, false);
  opts.forEach(([, sub], i) => label(sub, 140 + i * 268, 1890, 20, '#bfb3a2', 'center', '"Courier Prime"'));
  grain(9);
}
