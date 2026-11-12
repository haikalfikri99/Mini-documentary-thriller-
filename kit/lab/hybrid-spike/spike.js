// HYBRID 2.5D SPIKE — ARSIP #002 shot S22 (Raskin closes the laptop, 2019 room) rebuilt as a three.js scene.
// Everything painted is the SAME code as the 2D film (rig, sets, scene-kit). Only the camera is new:
// each painted layer is a textured plane at its own depth, a real perspective camera dollies + drifts,
// focus blur is per layer (rack focus), light pools are additive planes. Final grade (vignette, grain) is 2D on top.
import * as THREE from '../../src/vendor/three.module.min.js';
import { drawChar, LIFE } from '../../../stories/scroll/film/rig/arsip-rig.js';
import { W, H, vgrad, rrect, poly, ellipse, line, pool, vignette, grain, use } from '../../../stories/scroll/film/rig/scene-kit.js';
import * as S from '../../../stories/scroll/film/sets.js';
import { S22 } from '../../../stories/scroll/film/shots.js';
import { setCtx as shotsSetCtx } from '../../../stories/scroll/film/shots.js';

const { RASKIN19, SCREEN, seated, headAt } = S;
const lerp = (a, b, t) => a + (b - a) * t;
const io = x => (x = Math.max(0, Math.min(1, x)), x * x * (3 - 2 * x));
const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
const paint = (c, fn) => { const g = c.getContext('2d'); g.clearRect(0, 0, W, H); S.setCtx(g); fn(g); return g; };

// ---- static painted layers (drawn once) ----
const FOV = 30, D = (H / 2) / Math.tan(THREE.MathUtils.degToRad(FOV / 2));   // distance at which the z=0 plane fills the frame
const L = {};
L.window = mk(); paint(L.window, g => {            // far: window + city lights + moon + warm lamp (from setA, cam = 0)
  rrect(620, 260, 400, 560, 10, '#1b2132'); vgrad(640, 280, 360, 520, '#2a3654', '#3b3b5a');
  for (let i = 0; i < 40; i++) { const x = 650 + (i * 83 % 340), y = 520 + (i * 47 % 260); rrect(x, y, 10, 14, 2, i % 5 ? '#ffd58a' : '#9fd8ff'); }
  line([[820, 280], [820, 800]], 10, '#1b2132'); line([[640, 540], [1000, 540]], 10, '#1b2132');
  ellipse(900, 340, 34, 34, '#e9f0ff'); ellipse(560, 1040, 26, 26, '#ffcf8a');
});
L.shelf = mk(); paint(L.shelf, g => {              // mid: bookshelf + framed print
  rrect(40, 300, 300, 900, 6, '#2a2433');
  for (let r = 0; r < 4; r++) { rrect(40, 300 + r * 220 + 200, 300, 16, 2, '#1d1925'); for (let b = 0; b < 7; b++) rrect(60 + b * 38, 330 + r * 220 + (b % 3) * 8, 30, 170 - (b % 3) * 8, 3, ['#6a4a5a', '#4a5a6e', '#7a6a4a', '#3d4a5a', '#5a3d3d'][(b + r) % 5]); }
  rrect(400, 380, 160, 210, 6, '#3a3446'); rrect(414, 394, 132, 182, 4, '#55607a');
});
L.bg = mk(); paint(L.bg, () => vgrad(0, 0, W, H, '#232838', '#151821'));
L.lamp = mk(); { const g = L.lamp.getContext('2d'); g.fillStyle = '#000'; g.fillRect(0, 0, W, H); S.setCtx(g); pool(560, 1040, 260, 'rgb(255,190,120)', .22); }

// ---- three.js scene ----
export function createSpike(glCanvas) {
  const renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, preserveDrawingBuffer: true, alpha: false });
  renderer.setSize(W, H, false); renderer.setPixelRatio(1); renderer.setClearColor(0x151821, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, W / H, 100, 20000);
  const tex = {}, live = {};
  const plane = (name, z, { additive = false, opaque = false, over = 1 } = {}) => {
    const c = mk(); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.generateMipmaps = false; t.minFilter = THREE.LinearFilter;
    const m = new THREE.MeshBasicMaterial({ map: t, transparent: !opaque, depthTest: false, depthWrite: false, toneMapped: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending });
    const s = (D - z) / D * over, mesh = new THREE.Mesh(new THREE.PlaneGeometry(W * s, H * s), m);
    mesh.position.z = z; mesh.renderOrder = z; scene.add(mesh); tex[name] = t; live[name] = c; return mesh;
  };
  // z < 0 = farther from the camera. The plane is scaled by (D − z)/D so it projects at exactly its 2D size from the base camera.
  plane('bg', -1400, { opaque: true, over: 2.2 });
  const mWindow = plane('window', -900), mShelf = plane('shelf', -450), mLampPool = plane('lamp', -880, { additive: true });
  const mChar = plane('char', 0), mLight = plane('light', 40, { additive: true }), mFG = plane('fg', 260);
  const blitStatic = (name, src, blur, flip) => { const g = live[name].getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); g.filter = blur ? `blur(${blur}px)` : 'none'; g.drawImage(src, 0, 0); g.filter = 'none'; tex[name].needsUpdate = true; };

  const scratch = { char: mk(), fg: mk(), light: mk() };
  function frame(u, t, out2d) {
    LIFE.t = t;
    // 1) rack focus: far layers soften as the scene closes down, foreground desk stays soft
    blitStatic('bg', L.bg, 0);
    blitStatic('window', L.window, lerp(10, 15, u)); blitStatic('shelf', L.shelf, lerp(7, 10, u)); blitStatic('lamp', L.lamp, 12);
    // 2) character (sharp, z = 0) — same pose as S22
    const cg = paint(live.char, () => { });
    const P = headAt(RASKIN19, seated(RASKIN19, { facing: .55, expr: 'menyesal', gaze: [.4, .8], headTilt: .2 + .2 * io(u), rh: [100 - 20 * u, 70 - 30 * u], lh: [90, 80], look: .5 }), 430, 820, 3.0);
    drawChar(cg, RASKIN19, P, { rim: { col: SCREEN, dir: [.75, .4], w: 6 * (1 - u) + 1 }, amb: '#1a1f30', ambK: .3 + .3 * u, noShadow: true });
    tex.char.needsUpdate = true;
    // 3) screen light (additive on the character plane's depth)
    { const g = live.light.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, W, H); S.setCtx(g);
      pool(560, 1080, 320, 'rgb(127,227,255)', .35 * (1 - u)); pool(700, 1100, 500, 'rgb(127,227,255)', .3 * (1 - u)); tex.light.needsUpdate = true; }
    // 4) foreground: laptop lid closing + desk, drawn on its own canvas and softened
    { const f = scratch.fg, g = f.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); S.setCtx(g);
      const ang = lerp(0, 1.25, u); g.save(); g.translate(820, 1318); rrect(-230, -10, 400, 20, 6, '#5a5e6b'); g.rotate(-ang);
      poly([[-230, 0], [-230 + 260 * Math.cos(0.1), -250], [-210 + 260 * Math.cos(0.1), -256], [-210, 0]], '#7a7f8e'); g.restore();
      S.deskA(1330); blitStatic('fg', f, 4); }
    // 5) the camera: real dolly-in + lateral drift + a few degrees of yaw (planes hold their own parallax)
    const k = io(u);
    camera.position.set(lerp(-60, 50, k), lerp(0, 40, k), D - lerp(0, 420, k));
    camera.lookAt(lerp(-10, 8, k), lerp(0, 20, k), 0);
    renderer.render(scene, camera);
    // 6) 2D finish (same as the film): darken as the room goes out, vignette, grain
    const o = out2d.getContext('2d'); o.setTransform(1, 0, 0, 1, 0, 0); o.drawImage(glCanvas, 0, 0);
    o.save(); o.fillStyle = `rgba(0,0,0,${.45 * u})`; o.fillRect(0, 0, W, H); o.restore();
    use(o); vignette(.5); grain(42);
  }
  return { frame };
}

// the 2D original for comparison (film-engine push .02 on this shot)
export function render2D(u, t, out2d) {
  LIFE.t = t; const o = out2d.getContext('2d'); o.setTransform(1, 0, 0, 1, 0, 0); o.fillStyle = '#000'; o.fillRect(0, 0, W, H);
  const off = mk(); shotsSetCtx(off.getContext('2d')); S22(u);
  const z = 1 + .02 * io(u); o.setTransform(z, 0, 0, z, W / 2 * (1 - z), H / 2 * (1 - z)); o.drawImage(off, 0, 0); o.setTransform(1, 0, 0, 1, 0, 0);
}
