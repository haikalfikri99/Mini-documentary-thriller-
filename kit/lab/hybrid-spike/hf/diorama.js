// SPIKE 2 — "KAMU 01.47" as a 3D diorama + one continuous camera take (close-up → isometric orbit → whip → dive through the phone into the feed tunnel).
// Painted look kept: the ARSIP RIG character is a billboard (same drawChar, same rim light), rooms are flat-colour solids with
// baked gradients + a few real lights, glows are additive, tilt-shift + vignette + grain are 2D finishing.
import * as THREE from './three.module.min.js';
import { drawChar, LIFE, SKIN } from './rig/arsip-rig.js';
import * as S from './sets.js';
import { use, vignette, grain } from './rig/scene-kit.js';
import { makePath, handheld, applyPose, camSpeed } from './cam3d.js';

const { KAMU, SCREEN, seated } = S;
const AMBER = '#ffb43a', FEED = ['#7fa8c9', '#d9a77a', '#8fc0b0', '#c49ab8', '#a9b87a', '#d7c18a'];
const mkc = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const tex = (c, rep) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; if (rep) t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; };
const rr = (g, x, y, w, h, r, f) => { g.fillStyle = f; g.beginPath(); g.roundRect(x, y, w, h, r); g.fill(); };
const grad = (g, x0, y0, x1, y1, a, b) => { const k = g.createLinearGradient(x0, y0, x1, y1); k.addColorStop(0, a); k.addColorStop(1, b); return k; };
const glow = (g, x, y, r, rgb, a) => { g.save(); g.globalCompositeOperation = 'lighter'; const k = g.createRadialGradient(x, y, 0, x, y, r); k.addColorStop(0, `rgba(${rgb},${a})`); k.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = k; g.fillRect(x - r, y - r, r * 2, r * 2); g.restore(); };

// ---- world (1 unit = 1 cm). Room: x −210..210, z −180..180, y 0..260. Open to +x and +z (the viewer's side). ----
const ROOM = { w: 420, d: 360, h: 260 };
const T = { camera: [0, 8.0] };
// the take. az 0 = camera on +z, 90 = on +x. Isometric diorama ≈ az 45 / el 32 with a long lens (fov 14).
export const KEYS = [
  { t: 0.0, tx: -74, ty: 108, tz: -8, az: 24, el: 4, dist: 210, fov: 34, roll: 0 },    // medium close-up, low: his face in the phone light
  { t: 1.5, tx: -72, ty: 106, tz: -8, az: 16, el: 5, dist: 150, fov: 34, roll: 0 },     // a slow push while he stares at the phone
  { t: 3.1, tx: -10, ty: 80, tz: -50, az: 36, el: 22, dist: 1000, fov: 30, roll: 0 },  // crane up and back: the room
  { t: 4.1, tx: -10, ty: 70, tz: -50, az: 46, el: 32, dist: 3900, fov: 14, roll: 0 },  // isometric diorama, long lens
  { t: 5.0, tx: -4, ty: 66, tz: -58, az: 66, el: 30, dist: 3900, fov: 14, roll: 0, hold: .8 },   // orbit
  { t: 5.55, tx: 30, ty: 58, tz: -120, az: 30, el: 66, dist: 190, fov: 26, roll: 6 },  // whip toward the phone
  { t: 6.05, tx: 44, ty: 52, tz: -150, az: 0, el: 88, dist: 32, fov: 30, roll: 0, hold: .55 }, // top-down on the screen
  { t: 6.75, tx: 44, ty: -60, tz: -150, az: 0, el: 88, dist: 30, fov: 54, roll: 35 },  // falls through the screen
  { t: 8.0, tx: 44, ty: -820, tz: -150, az: 0, el: 88, dist: 30, fov: 74, roll: 150 }, // down the feed tunnel
];
const path = makePath(KEYS);
export const pose = t => { let P = path(t); if (t < 3.1) P = handheld(P, t, 1 - t / 3.1 * .6); return P; };

export function createDiorama(glCanvas, W, H) {
  const renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, preserveDrawingBuffer: true, logarithmicDepthBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(W, H, false); renderer.setClearColor(0x0d0c12, 1);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(34, W / H, .3, 9000);
  const room = new THREE.Group(); scene.add(room);
  const lam = c => new THREE.MeshLambertMaterial({ color: c });

  // lights (the film's rule: one key — the phone's cyan — plus a warm practical far back)
  scene.add(new THREE.AmbientLight(0x7a76a8, 0.95));
  const phoneL = new THREE.PointLight(0x7fe3ff, 2000, 460, 1.3); phoneL.position.set(42, 62, -128); room.add(phoneL);
  const lampL = new THREE.PointLight(0xffb878, 2600, 700, 1.3); lampL.position.set(110, 170, -140); room.add(lampL);

  // floor slab (the diorama base), baked floor with a cyan pool under the phone and a rug
  const fc = mkc(1024, 880), fg = fc.getContext('2d');
  fg.fillStyle = grad(fg, 0, 0, 0, 880, '#3a2f2e', '#241d20'); fg.fillRect(0, 0, 1024, 880);
  for (let i = 0; i < 14; i++) { fg.fillStyle = i % 2 ? 'rgba(0,0,0,.10)' : 'rgba(255,255,255,.03)'; fg.fillRect(0, i * 63, 1024, 3); }
  rr(fg, 330, 180, 560, 520, 30, '#3d3a58'); rr(fg, 350, 200, 520, 480, 22, '#4a466a');
  const fl = new THREE.MeshLambertMaterial({ map: tex(fc) }), edge = lam(0x1a1720);
  const slab = new THREE.Mesh(new THREE.BoxGeometry(ROOM.w + 24, 14, ROOM.d + 24), [edge, edge, fl, edge, edge, edge]); slab.position.set(-12 + 0, -7, 0); room.add(slab);
  // back wall (window + curtain + clock) and left wall, both with a visible thickness
  const wc = mkc(1024, 640), wg = wc.getContext('2d');
  wg.fillStyle = grad(wg, 0, 0, 0, 640, '#3a3850', '#262536'); wg.fillRect(0, 0, 1024, 640);
  wg.fillStyle = 'rgba(0,0,0,.14)'; wg.fillRect(0, 560, 1024, 80);                                   // skirting
  rr(wg, 560, 90, 330, 360, 10, '#1f1f2c'); wg.fillStyle = grad(wg, 0, 110, 0, 430, '#3a3446', '#6a4f48'); wg.fillRect(578, 108, 294, 324);
  wg.fillStyle = '#ffb877'; wg.beginPath(); wg.arc(760, 200, 42, 0, 7); wg.fill(); glow(wg, 760, 200, 220, '255,170,110', .5);
  wg.fillStyle = '#5a4a6a'; wg.beginPath(); wg.moveTo(548, 80); wg.lineTo(690, 80); wg.lineTo(650, 470); wg.lineTo(540, 470); wg.fill(); // curtain
  rr(wg, 90, 150, 210, 110, 12, '#2a2a3a'); wg.fillStyle = '#ff9f6a'; wg.font = '600 64px Oswald'; wg.fillText('01.47', 112, 232);     // clock
  glow(wg, 200, 205, 150, '255,159,106', .25);
  const lc = mkc(1024, 640), lg = lc.getContext('2d'); lg.fillStyle = grad(lg, 0, 0, 0, 640, '#34324a', '#222131'); lg.fillRect(0, 0, 1024, 640);
  lg.fillStyle = 'rgba(0,0,0,.14)'; lg.fillRect(0, 560, 1024, 80); rr(lg, 380, 120, 200, 270, 8, '#2a2433'); rr(lg, 394, 134, 172, 242, 4, '#55607a');
  const wallM = new THREE.MeshLambertMaterial({ map: tex(wc) }), lwallM = new THREE.MeshLambertMaterial({ map: tex(lc) }), wedge = lam(0x2a283a);
  const back = new THREE.Mesh(new THREE.BoxGeometry(ROOM.w + 24, ROOM.h, 12), [wedge, wedge, wedge, wedge, wallM, wedge]); back.position.set(-12, ROOM.h / 2, -ROOM.d / 2 - 6); room.add(back);
  const left = new THREE.Mesh(new THREE.BoxGeometry(12, ROOM.h, ROOM.d), [lwallM, wedge, wedge, wedge, wedge, wedge]); left.position.set(-ROOM.w / 2 - 6, ROOM.h / 2, 0); room.add(left);

  // furniture: bed against the left wall, nightstand with the phone, standing fan, lamp
  const box = (w, h, d, x, y, z, m) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); room.add(b); return b; };
  box(120, 14, 210, -146, 22, -66, lam(0x2c2a3c)); box(124, 22, 214, -146, 40, -66, lam(0x4a536e)); box(104, 12, 60, -146, 56, -128, lam(0xcfd4de));   // bed frame, mattress, pillow
  box(52, 52, 44, 44, 26, -150, lam(0x2f2b3d)); box(46, 3, 38, 44, 53.5, -150, lam(0x3a3650));                                                     // nightstand
  const phone = box(8, .8, 15.6, 44, 55.4, -150, lam(0x101218));
  const sc = mkc(256, 512), sg = sc.getContext('2d');
  sg.fillStyle = '#e9eef2'; sg.fillRect(0, 0, 256, 512); for (let i = 0; i < 4; i++) { rr(sg, 14, 60 + i * 110, 228, 96, 12, '#f2f4f6'); rr(sg, 24, 70 + i * 110, 208, 50, 8, FEED[i]); rr(sg, 24, 128 + i * 110, 120, 10, 4, '#c3ccd4'); }
  sg.fillStyle = '#fff'; sg.fillRect(0, 0, 256, 48); sg.fillStyle = '#20242c'; sg.font = '600 26px Oswald'; sg.fillText('Beranda', 16, 34);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 15), new THREE.MeshBasicMaterial({ map: tex(sc), toneMapped: false })); screen.rotation.x = -Math.PI / 2; screen.position.set(44, 55.85, -150); room.add(screen);
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(130, 130), (() => { const c = mkc(256, 256); glow(c.getContext('2d'), 128, 128, 128, '127,227,255', .55); return new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }); })());
  halo.rotation.x = -Math.PI / 2; halo.position.set(44, 56.4, -150); room.add(halo);
  // fan: pole + rotating head
  box(3, 80, 3, 150, 40, -130, lam(0x2c2c3a)); const fanHead = new THREE.Group(); fanHead.position.set(150, 88, -126);
  fanHead.add(new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 3, 28), lam(0x3a3d4e)).rotateX(Math.PI / 2)); fanHead.children[0].material.transparent = true; fanHead.children[0].material.opacity = .85;
  const blades = new THREE.Group(); for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(7, 20, 1), lam(0x6a6f84)); b.position.y = 10; const p = new THREE.Group(); p.rotation.z = i * 2.094; p.add(b); blades.add(p); } fanHead.add(blades); room.add(fanHead);
  box(40, 1, 36, 80, 0.5, -20, lam(0x241f2a)).visible = false;

  // the character: ARSIP RIG as a billboard standing on the floor in front of the bed
  const CW = 1024, cc = mkc(CW, CW), cg = cc.getContext('2d'), SIZE = 190, PXCM = CW / SIZE;
  const ct = tex(cc); ct.generateMipmaps = false; ct.minFilter = THREE.LinearFilter;
  const sprite = new THREE.Mesh(new THREE.PlaneGeometry(SIZE, SIZE), new THREE.MeshBasicMaterial({ map: ct, transparent: true, alphaTest: .02, toneMapped: false })); sprite.position.set(-72, SIZE / 2, -12); room.add(sprite);
  // fit: scale so a standing figure is 168 cm tall
  const fit = (() => { S.setCtx(cg); cg.clearRect(0, 0, CW, CW); drawChar(cg, KAMU, { x: CW / 2, y: CW - 64, s: 1, facing: 0, expr: 'netral' }); const d = cg.getImageData(0, 0, CW, CW).data; let top = CW; for (let y = 0; y < CW && top === CW; y++) for (let x = 0; x < CW; x++) if (d[(y * CW + x) * 4 + 3] > 20) { top = y; break; } return 168 * PXCM / (CW - 64 - top); })();
  function drawKamu(t) {
    S.setCtx(cg); cg.setTransform(1, 0, 0, 1, 0, 0); cg.clearRect(0, 0, CW, CW);
    const seat = 40 * PXCM / fit, k = Math.min(1, t / 1.2);
    const P = seated(KAMU, { x: CW / 2, y: CW - 64, s: fit, facing: .7, expr: t < 2.2 ? 'lelah' : 'cemas', gaze: [.75, .35], headTilt: .1 + .04 * Math.sin(t * 1.1), rh: [70 + 14 * k, 70], lh: [40, 150], look: .55 }, seat);
    drawChar(cg, KAMU, P, { rim: { col: SCREEN, dir: [.8, .3], w: 6 }, amb: '#2c3550', ambK: .22, noShadow: true });
    ct.needsUpdate = true;
  }
  // soft contact shadow under the character
  const sh = (() => { const c = mkc(128, 128), g = c.getContext('2d'); const k = g.createRadialGradient(64, 64, 0, 64, 64, 64); k.addColorStop(0, 'rgba(0,0,0,.55)'); k.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = k; g.fillRect(0, 0, 128, 128); return new THREE.Mesh(new THREE.PlaneGeometry(70, 40), new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, depthWrite: false })); })();
  sh.rotation.x = -Math.PI / 2; sh.position.set(-70, .3, -4); room.add(sh);

  // the feed tunnel under the phone: four flared walls tiled with feed cards that stream upward
  const tunnel = new THREE.Group(); scene.add(tunnel);
  const tc = mkc(256, 2048), tg = tc.getContext('2d'); tg.fillStyle = '#1f1c28'; tg.fillRect(0, 0, 256, 2048);
  for (let i = 0; i < 8; i++) { const y = i * 256; rr(tg, 16, y + 14, 224, 228, 16, '#f2f4f6'); rr(tg, 28, y + 26, 200, 130, 10, FEED[i % 6]); rr(tg, 28, y + 170, 130, 14, 5, '#c3ccd4'); rr(tg, 28, y + 194, 80, 14, 5, '#d6dce1'); }
  const tt = tex(tc, true); tt.repeat.set(1, 1); tt.anisotropy = 8;
  const tm = new THREE.MeshBasicMaterial({ map: tt, side: THREE.DoubleSide, toneMapped: false, color: 0xa6b9c8 });
  const RING = [[0, 3.7, 7.5], [-30, 6, 11], [-120, 20, 36], [-300, 50, 80], [-700, 70, 110], [-1500, 70, 110]];   // [y, half-width, half-height]
  const pos = [], uv = [], idx = []; let vAcc = 0, vv = [];
  RING.forEach((r, i) => { if (i) vAcc += Math.abs(r[0] - RING[i - 1][0]) / 112; vv.push(vAcc); });   // one texture repeat = 8 cards × 14 units
  for (let w = 0; w < 4; w++) for (let i = 0; i < RING.length - 1; i++) {
    const q = (r, s) => { const [y, hw, hh] = r, c = [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]]; const a = c[w], b = c[(w + 1) % 4]; return [42 + a[0] + (b[0] - a[0]) * s, y, -150 + a[1] + (b[1] - a[1]) * s]; };
    const base = pos.length / 3; for (const [r, v] of [[RING[i], vv[i]], [RING[i + 1], vv[i + 1]]]) for (const s of [0, 1]) { pos.push(...q(r, s)); const wd = (w % 2 ? r[2] : r[1]) * 2; uv.push(s * Math.max(1, wd / 14), v); }
    idx.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
  }
  const tgeo = new THREE.BufferGeometry(); tgeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); tgeo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); tgeo.setIndex(idx);
  tunnel.add(new THREE.Mesh(tgeo, tm));
  const endGlow = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), (() => { const c = mkc(256, 256); glow(c.getContext('2d'), 128, 128, 128, '127,227,255', .55); return new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }); })());
  endGlow.rotation.x = -Math.PI / 2; endGlow.position.set(42, -1490, -150); tunnel.add(endGlow);
  tunnel.position.y = 55.85;

  const acc = mkc(W, H), ag = acc.getContext('2d'), fin = mkc(W, H);
  function renderSub(t) {
    const P = pose(t); applyPose(cam, P);
    // billboard toward the camera, clamped so it never goes edge-on
    const yaw = Math.max(-.85, Math.min(.85, Math.atan2(cam.position.x - sprite.position.x, cam.position.z - sprite.position.z)));
    sprite.rotation.y = yaw; fanHead.rotation.y = Math.sin(t * .8) * .6; blades.rotation.z = -t * 24;
    const inside = cam.position.y < 56.3;                    // below the phone screen: leave the room, ride the tunnel
    room.visible = !inside; tunnel.visible = P.dist < 400; halo.visible = P.dist > 70;
    scene.fog = inside ? new THREE.FogExp2(0x10202c, .0024) : new THREE.FogExp2(0x0d0c12, .00006);
    tt.offset.y = -t * 2.2 - Math.max(0, 6.05 - t) * 0;      // cards stream toward the camera
    renderer.render(scene, cam);
    return P;
  }
  // tilt-shift: blur the top and bottom bands (strength follows how "miniature" the shot is: long lens, high angle)
  function tiltShift(src, dst, k) {
    const g = dst.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(src, 0, 0); if (k < .02) return;
    const b = mkc(W, H), bg = b.getContext('2d'); bg.filter = `blur(${(14 * k).toFixed(1)}px)`; bg.drawImage(src, 0, 0); bg.filter = 'none';
    bg.globalCompositeOperation = 'destination-in'; const m = bg.createLinearGradient(0, 0, 0, H); m.addColorStop(0, 'rgba(0,0,0,1)'); m.addColorStop(.3, 'rgba(0,0,0,0)'); m.addColorStop(.62, 'rgba(0,0,0,0)'); m.addColorStop(1, 'rgba(0,0,0,1)'); bg.fillStyle = m; bg.fillRect(0, 0, W, H);
    g.drawImage(b, 0, 0);
  }
  function frame(t, out, fps = 30) {
    LIFE.t = t; drawKamu(t);
    const P0 = pose(t - 1 / fps / 2), P1 = pose(t + 1 / fps / 2), n = Math.max(1, Math.min(5, Math.ceil(camSpeed(P0, P1) / 2.6)));
    ag.setTransform(1, 0, 0, 1, 0, 0); ag.globalAlpha = 1;
    for (let j = 0; j < n; j++) {                            // motion blur: n sub-frames over a 180° shutter, running average
      renderSub(t + ((j + .5) / n - .5) * .5 / fps); ag.globalAlpha = 1 / (j + 1); ag.drawImage(glCanvas, 0, 0);
    }
    ag.globalAlpha = 1;
    const P = pose(t), miniature = Math.max(0, Math.min(1, (P.dist - 250) / 250)) * Math.max(0, Math.min(1, (P.el - 14) / 18));
    tiltShift(acc, fin, miniature);
    const o = out.getContext('2d'); o.setTransform(1, 0, 0, 1, 0, 0); o.drawImage(fin, 0, 0);
    use(o); const sx = W / 1080; o.save(); o.scale(sx, sx); vignette(.5); grain(Math.floor(t * 30), .04); o.restore();
    return { n, miniature };
  }
  return { frame, renderer };
}
