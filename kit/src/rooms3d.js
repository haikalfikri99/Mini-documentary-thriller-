// ROOMS 3D — ready-made diorama rooms from the episodes. Each returns { room, anchors }; anchors are world-space positions to aim cameras/props at.
// Add a room here when an episode needs a new one (the "aset yang dibuat untuk satu episode langsung masuk kit" rule).
import { THREE, paint, rr, grad, glow, FEED, tex } from './diorama-kit.js';

// "kamu" bedroom at 01.47 (#002): bed on the left wall, nightstand + phone, window with a warm streetlight, standing fan. Key light = the phone (cyan).
export function roomKamar(world, { at = [0, 0, 0] } = {}) {
  const W_ = 420, D_ = 360, H_ = 260;
  const R = world.room({ at, w: W_, d: D_, h: H_,
    floor: (g, w, h) => { g.fillStyle = grad(g, 0, 0, 0, h, '#3a2f2e', '#241d20'); g.fillRect(0, 0, w, h); for (let i = 0; i < 14; i++) { g.fillStyle = i % 2 ? 'rgba(0,0,0,.10)' : 'rgba(255,255,255,.03)'; g.fillRect(0, i * h / 14, w, 3); } rr(g, w * .32, h * .2, w * .55, h * .6, 30, '#3d3a58'); rr(g, w * .34, h * .22, w * .51, h * .56, 22, '#4a466a'); },
    back: (g, w, h) => { g.fillStyle = grad(g, 0, 0, 0, h, '#3a3850', '#262536'); g.fillRect(0, 0, w, h); g.fillStyle = 'rgba(0,0,0,.14)'; g.fillRect(0, h * .875, w, h * .125); rr(g, 560, 90, 330, 360, 10, '#1f1f2c'); g.fillStyle = grad(g, 0, 110, 0, 430, '#3a3446', '#6a4f48'); g.fillRect(578, 108, 294, 324); g.fillStyle = '#ffb877'; g.beginPath(); g.arc(760, 200, 42, 0, 7); g.fill(); glow(g, 760, 200, 220, '255,170,110', .5); g.fillStyle = '#5a4a6a'; g.beginPath(); g.moveTo(548, 80); g.lineTo(690, 80); g.lineTo(650, 470); g.lineTo(540, 470); g.fill(); rr(g, 90, 150, 210, 110, 12, '#2a2a3a'); g.fillStyle = '#ff9f6a'; g.font = '600 64px Oswald'; g.fillText('01.47', 112, 232); glow(g, 200, 205, 150, '255,159,106', .25); },
    left: (g, w, h) => { g.fillStyle = grad(g, 0, 0, 0, h, '#34324a', '#222131'); g.fillRect(0, 0, w, h); g.fillStyle = 'rgba(0,0,0,.14)'; g.fillRect(0, h * .875, w, h * .125); rr(g, 380, 120, 200, 270, 8, '#2a2433'); rr(g, 394, 134, 172, 242, 4, '#55607a'); } });
  const L = c => new THREE.MeshLambertMaterial({ color: c });
  R.box(120, 14, 210, -146, 22, -66, 0x2c2a3c); R.box(124, 22, 214, -146, 40, -66, 0x4a536e); R.box(104, 12, 60, -146, 56, -128, 0xcfd4de);   // bed frame, mattress, pillow
  R.box(52, 52, 44, 44, 26, -150, 0x2f2b3d); R.box(46, 3, 38, 44, 53.5, -150, 0x3a3650);                                                      // nightstand
  R.box(8, .8, 15.6, 44, 55.4, -150, 0x101218);                                                                                                // phone body
  const sc = paint(256, 512, (g) => { g.fillStyle = '#e9eef2'; g.fillRect(0, 0, 256, 512); for (let i = 0; i < 4; i++) { rr(g, 14, 60 + i * 110, 228, 96, 12, '#f2f4f6'); rr(g, 24, 70 + i * 110, 208, 50, 8, FEED[i]); rr(g, 24, 128 + i * 110, 120, 10, 4, '#c3ccd4'); } g.fillStyle = '#fff'; g.fillRect(0, 0, 256, 48); g.fillStyle = '#20242c'; g.font = '600 26px Oswald'; g.fillText('Beranda', 16, 34); });
  R.plane(7.4, 15, sc, 44, 55.85, -150, [-Math.PI / 2, 0, 0]);
  const halo = R.glow({ size: 130, at: [44, 56.4, -150], rgb: '127,227,255', a: .55 });
  world.ticks.push((t, P) => { halo.visible = P.dist > 70; });                 // the halo would wash the screen out when the camera is on it
  R.cyl(1.5, 80, 150, 40, -130, 0x2c2c3a, 8);
  const fan = new THREE.Group(); fan.position.set(150, 88, -126); const disc = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 3, 28), new THREE.MeshLambertMaterial({ color: 0x3a3d4e, transparent: true, opacity: .85 })); disc.rotation.x = Math.PI / 2; fan.add(disc);
  const blades = new THREE.Group(); for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(7, 20, 1), L(0x6a6f84)); b.position.y = 10; const p = new THREE.Group(); p.rotation.z = i * 2.094; p.add(b); blades.add(p); } fan.add(blades); R.group.add(fan);
  world.ticks.push(t => { fan.rotation.y = Math.sin(t * .8) * .6; blades.rotation.z = -t * 24; });
  R.light(0x7fe3ff, 2000, [42, 62, -128], 460, 1.3); R.light(0xffb878, 2600, [110, 170, -140], 700, 1.3);
  const a = (x, y, z) => [at[0] + x, at[1] + y, at[2] + z];
  R.anchors = { phone: a(44, 55.85, -150), seat: [-72, -12], center: a(-10, 70, -50), window: a(110, 150, -170), bed: a(-146, 52, -66) };
  return R;
}

// the 2006 office (#002): daylight through blinds from the left/back, CRT monitor on a wooden desk, a chair. Key light = warm sun.
export function roomKantor06(world, { at = [0, 0, 0] } = {}) {
  const R = world.room({ at, w: 420, d: 360, h: 260,
    floor: (g, w, h) => { g.fillStyle = grad(g, 0, 0, 0, h, '#7a6a58', '#5c4f43'); g.fillRect(0, 0, w, h); for (let i = 0; i < 12; i++) { g.fillStyle = 'rgba(0,0,0,.07)'; g.fillRect(0, i * h / 12, w, 3); } g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 4; i++) { g.fillStyle = 'rgba(255,224,165,.20)'; g.beginPath(); g.moveTo(w * .50, h * (.05 + i * .06)); g.lineTo(w * .90, h * (.20 + i * .06)); g.lineTo(w * .90, h * (.25 + i * .06)); g.lineTo(w * .50, h * (.10 + i * .06)); g.fill(); } g.restore(); },
    back: (g, w, h) => { g.fillStyle = grad(g, 0, 0, 0, h, '#d8cfb8', '#b9ae96'); g.fillRect(0, 0, w, h); g.fillStyle = 'rgba(0,0,0,.10)'; g.fillRect(0, h * .875, w, h * .125); rr(g, 520, 80, 380, 380, 8, '#6a5c48'); g.fillStyle = grad(g, 0, 96, 0, 444, '#fdf0cc', '#f3dca0'); g.fillRect(534, 94, 352, 352); g.fillStyle = 'rgba(150,120,70,.55)'; for (let i = 0; i < 14; i++) g.fillRect(534, 94 + i * 25.5, 352, 12); glow(g, 710, 270, 380, '255,224,165', .55); rr(g, 120, 170, 160, 110, 6, '#8a7a62'); rr(g, 130, 180, 140, 90, 4, '#b8c4d0'); },
    left: (g, w, h) => { g.fillStyle = grad(g, 0, 0, 0, h, '#cfc5ad', '#aea48c'); g.fillRect(0, 0, w, h); g.fillStyle = 'rgba(0,0,0,.10)'; g.fillRect(0, h * .875, w, h * .125); } });
  R.box(150, 5, 70, 60, 73, -110, 0x8a6a48); R.box(6, 73, 66, -10, 36, -110, 0x6a4f36); R.box(6, 73, 66, 130, 36, -110, 0x6a4f36);               // desk
  R.box(40, 34, 36, 40, 93, -125, 0xb9b3a4); const scr = paint(128, 96, (g) => { g.fillStyle = '#dfe8ee'; g.fillRect(0, 0, 128, 96); g.fillStyle = '#2a4a8a'; g.fillRect(0, 0, 128, 12); for (let i = 0; i < 5; i++) { g.fillStyle = '#9fb0bf'; g.fillRect(8, 22 + i * 14, 90 - i * 6, 6); } });
  R.plane(32, 24, scr, 40, 95, -106.5, [0, 0, 0]); R.box(20, 4, 20, 40, 77.5, -125, 0x8a8576);                                                       // CRT: body, screen, foot
  R.box(46, 5, 44, 0, 44, -40, 0x3a4a6a); R.box(46, 50, 5, 0, 70, -62, 0x3a4a6a); R.box(5, 44, 5, 0, 22, -40, 0x2a2a30);                               // chair
  R.light(0xffe2a8, 5200, [60, 210, -150], 900, 1.2); R.light(0xffffff, 800, [-60, 150, 60], 700, 1.3);
  const a = (x, y, z) => [at[0] + x, at[1] + y, at[2] + z];
  R.anchors = { desk: a(70, 75.6, -100), paper: a(78, 75.7, -92), center: a(-10, 70, -50), seat: [0, -40], monitor: a(40, 95, -125) };
  return R;
}
