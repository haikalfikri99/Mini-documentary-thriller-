// ARSIP KASUS card — the channel's signature beat, one template for every episode (layout from #001 panel P3):
// a manila folder slammed on a dark wooden desk under a lamp, papers underneath, tab "ARSIP KASUS", the case title,
// place · date line, the hook frame as a paper-clipped sepia photo, and the red "KASUS #00N" stamp hitting at stampAt.
// arsipCard(g, u, { title, sub, no, photo: canvas, crop:[sx,sy,sw,sh], stampAt, dur })  — u = 0..1 through the beat.
const W = 1080, H = 1920;
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
export function arsipCard(g, u, { title, sub, no = 2, photo, crop = [0, 160, 1080, 1520], stampAt = .4, dur = 1.35 } = {}) {
  const sec = u * dur;
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  // desk: dark planks with grain
  g.fillStyle = '#2a1d16'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 26; i++) { const y = i * 80; g.fillStyle = hash(i) > .5 ? '#3a281c' : '#2f2117'; g.fillRect(-20, y, W + 40, 76);
    g.strokeStyle = '#24180f'; g.lineWidth = 1.5; for (let k = 0; k < 5; k++) { g.beginPath(); g.moveTo(-20, y + 15 + k * 12); g.bezierCurveTo(300, y + 10 + k * 13 + 6 * Math.sin(i + k), 700, y + 18 + k * 12, 1100, y + 12 + k * 12); g.stroke(); } }
  // papers underneath
  for (const [x, y, a, c] of [[90, 330, -.22, '#d9d1bf'], [560, 1240, .16, '#e2dccb'], [150, 1350, .05, '#cfc6b0']]) {
    g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(10, 14, 520, 680); g.fillStyle = c; g.fillRect(0, 0, 520, 680);
    g.fillStyle = 'rgba(138,131,120,.6)'; for (let k = 0; k < 18; k++) g.fillRect(40, 60 + k * 30, 300 + hash(k + x) * 140, 7); g.restore(); }
  // the folder (slight settle after the slam)
  const settle = Math.exp(-sec * 9) * Math.sin(sec * 40) * .006;
  g.save(); g.translate(540, 990); g.rotate(-.06 + settle);
  g.fillStyle = 'rgba(0,0,0,.45)'; g.beginPath(); g.roundRect(-420, -540, 870, 1170, 14); g.fill();
  g.fillStyle = '#c9a86a'; g.beginPath(); [[-430, -560], [-150, -560], [-120, -615], [150, -615], [180, -560], [430, -560], [430, 600], [-430, 600]].forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.fill();
  g.strokeStyle = '#8a6a3a'; g.lineWidth = 6; g.stroke();
  g.fillStyle = '#b8955a'; for (let k = 0; k < 40; k++) { g.beginPath(); g.arc(-420 + hash(k) * 840, -540 + hash(k * 3) * 1120, 2 + hash(k * 5) * 3, 0, 6.3); g.fill(); }
  g.fillStyle = '#d8bb7e'; g.fillRect(-410, -530, 820, 1110); g.strokeStyle = '#a8864f'; g.lineWidth = 4; g.strokeRect(-410, -530, 820, 1110);
  const T = (s, x, y, font, col) => { g.font = font; g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y); };
  T('ARSIP KASUS', 15, -585, '700 36px "Courier Prime"', '#3a2a18');
  T(title, 0, -440, '600 84px "Oswald"', '#2a1e14');
  T(sub, 0, -370, '700 34px "Courier Prime"', '#3a2a18');
  // the photo, paper-clipped, sepia
  g.save(); g.rotate(.05); g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(-292, -288, 600, 760); g.fillStyle = '#efe9da'; g.fillRect(-300, -300, 600, 760);
  if (photo) { g.filter = 'sepia(.85) contrast(1.15) brightness(.95)'; g.drawImage(photo, crop[0], crop[1], crop[2], crop[3], -270, -270, 540, 700); g.filter = 'none'; }
  g.restore();
  g.strokeStyle = '#8a8f96'; g.lineWidth = 9; g.lineCap = 'round'; g.save(); g.translate(400, 0); g.beginPath(); g.moveTo(-190, -330); g.lineTo(-190, -250); g.quadraticCurveTo(-190, -228, -160, -228); g.quadraticCurveTo(-130, -228, -130, -250); g.lineTo(-130, -350); g.quadraticCurveTo(-130, -372, -155, -372); g.quadraticCurveTo(-180, -372, -180, -350); g.lineTo(-180, -270); g.stroke(); g.restore();   // clip on the right so it never covers the place · date line
  g.restore();
  // red stamp, slammed at an angle, worn ink
  const st = u < stampAt ? 0 : Math.min(1, (u - stampAt) / (.12 / dur)), sc = st < 1 ? 1.6 - .6 * st : 1;
  if (st > 0) { g.save(); g.translate(760, 1500); g.rotate(-.2); g.scale(sc, sc); g.globalAlpha = .88 * st;
    g.strokeStyle = '#b3261e'; g.lineWidth = 12; g.strokeRect(-230, -80, 460, 160); g.lineWidth = 4; g.strokeRect(-212, -62, 424, 124);
    g.fillStyle = '#b3261e'; g.font = '600 96px "Oswald"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(`KASUS #${String(no).padStart(3, '0')}`, 0, 6);
    g.globalCompositeOperation = 'destination-out'; for (let k = 0; k < 160; k++) { g.beginPath(); g.arc(-230 + hash(k) * 460, -80 + hash(k * 7) * 160, 1 + hash(k * 3) * 4, 0, 6.3); g.fill(); }
    g.restore(); }
  // lamp pool + dust thrown up by the slam
  const r = g.createRadialGradient(540, 900, 200, 540, 900, 1250); r.addColorStop(0, 'rgba(255,220,160,0.10)'); r.addColorStop(1, 'rgba(0,0,0,0.55)'); g.fillStyle = r; g.fillRect(0, 0, W, H);
  if (sec < 1.2) { g.fillStyle = '#e8dcc0'; for (let k = 0; k < 40; k++) { const a = hash(k) * 6.28, d = (380 + hash(k * 3) * 300) * (1 + sec * .9); g.globalAlpha = 1 - sec / 1.2; g.beginPath(); g.arc(540 + Math.cos(a) * d * .85, 990 + Math.sin(a) * d + sec * sec * 120, 2 + hash(k * 9) * 4, 0, 6.3); g.fill(); } g.globalAlpha = 1; }
  g.restore();
}
