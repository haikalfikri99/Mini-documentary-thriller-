// DIORAMA KIT — the channel's 3D world (hybrid 2.5D/3D): ARSIP RIG characters as billboards in cutaway rooms, one continuous camera.
// three.js is vendored (vendor/three.module.min.js, r170). 1 unit = 1 cm. Y up. A room's origin is the centre of its floor; the cutaway
// is open to +x and +z (back wall at z = −d/2, left wall at x = −w/2). Everything is deterministic in t (seek protocol: draw from t alone).
//
//   const world = createWorld({ gl, W: 1080, H: 1920 });
//   const kamar = roomKamar(world, { at: [0, 0, 0] });                       // rooms3d.js (ready-made rooms) or world.room({...})
//   const me = world.actor({ spec: KAMU, at: [-72, -12], sit: 40, pose: t => ({ facing: .7, expr: 'lelah' }) });
//   world.camera(KEYS, { handheld: t => 1 - t / 3 });                        // cam3d.js keys (the one continuous take)
//   world.frame(t, out2dCanvas);                                             // call from the hf-seek listener
import * as THREE from './vendor/three.module.min.js';
import { drawChar, LIFE } from './arsip-rig.js';
import { seated } from './sets-lib.js';
import { use, vignette, grain } from './scene-kit.js';
import { makePath, handheld, applyPose, camSpeed } from './cam3d.js';
export { THREE };

export const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
export const paint = (w, h, fn) => { const c = canvas(w, h), g = c.getContext('2d'); fn(g, w, h); return c; };
export const rr = (g, x, y, w, h, r, f) => { g.fillStyle = f; g.beginPath(); g.roundRect(x, y, w, h, r); g.fill(); };
export const grad = (g, x0, y0, x1, y1, a, b) => { const k = g.createLinearGradient(x0, y0, x1, y1); k.addColorStop(0, a); k.addColorStop(1, b); return k; };
export const glow = (g, x, y, r, rgb, a) => { g.save(); g.globalCompositeOperation = 'lighter'; const k = g.createRadialGradient(x, y, 0, x, y, r); k.addColorStop(0, `rgba(${rgb},${a})`); k.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = k; g.fillRect(x - r, y - r, r * 2, r * 2); g.restore(); };
export const tex = (c, { repeat = false, aniso = 4 } = {}) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = aniso; if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; };
export const FEED = ['#7fa8c9', '#d9a77a', '#8fc0b0', '#c49ab8', '#a9b87a', '#d7c18a'];
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

export function createWorld({ gl, W = 1080, H = 1920, fps = 30 }) {
  const renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true, preserveDrawingBuffer: true, logarithmicDepthBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(W, H, false); renderer.setClearColor(0x0d0c12, 1);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(34, W / H, .3, 9000);
  scene.add(new THREE.AmbientLight(0x7a76a8, 0.95));
  const ticks = [];                                      // (t, P, cam) per sub-frame: animate things, set visibility
  const world = { THREE, scene, cam, W, H, fps, ticks, finish: { halation: .16, paper: .05, vignette: .5, grain: .04, tilt: null }, fog: () => ({ color: 0x0d0c12, density: .00006 }), pathFn: t => ({ tx: 0, ty: 100, tz: 0, az: 0, el: 10, dist: 300, fov: 30, roll: 0 }) };

  // ---- camera: the one continuous take ----
  let path = null, hand = () => 0;
  world.camera = (keys, { handheld: h } = {}) => { path = makePath(keys); hand = h || (() => 0); world.keys = keys; world.duration = keys[keys.length - 1].t; };
  world.pose = t => { let P = path(t); const a = hand(t); if (a > 0) P = handheld(P, t, a); return P; };

  // ---- primitives ----
  const lam = c => new THREE.MeshLambertMaterial({ color: c });
  world.light = (color, intensity, at, dist = 500, decay = 1.3, parent = scene) => { const l = new THREE.PointLight(color, intensity, dist, decay); l.position.set(...at); parent.add(l); return l; };
  world.glowPlane = ({ size = 100, at = [0, 0, 0], rot = [-Math.PI / 2, 0, 0], rgb = '127,227,255', a = .55, parent = scene } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: tex(paint(256, 256, g => glow(g, 128, 128, 128, rgb, a))), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    m.rotation.set(...rot); m.position.set(...at); parent.add(m); return m;
  };
  world.visible = (obj, fn) => ticks.push((t, P, c) => { obj.visible = !!fn(t, P, c); });

  // ---- rooms ----
  // floor/back/left: (g, w, h) => void painters for 1024-px-wide textures (or a CSS colour string)
  world.room = ({ at = [0, 0, 0], w = 420, d = 360, h = 260, floor = '#3a2f2e', back = '#34324a', left = '#34324a', edge = 0x1a1720, wedge = 0x2a283a, lit = true } = {}) => {
    const group = new THREE.Group(); group.position.set(...at); scene.add(group);
    const mat = (p, tw, th, side) => { const c = typeof p === 'function' ? paint(tw, th, p) : paint(tw, th, (g, x, y) => { g.fillStyle = p; g.fillRect(0, 0, x, y); }); const m = lit ? new THREE.MeshLambertMaterial({ map: tex(c) }) : new THREE.MeshBasicMaterial({ map: tex(c) }); return m; };
    const E = lam(edge), WE = lam(wedge);
    const slab = new THREE.Mesh(new THREE.BoxGeometry(w + 24, 14, d + 24), [E, E, mat(floor, 1024, Math.round(1024 * d / w), 0), E, E, E]); slab.position.set(-12, -7, 0); group.add(slab);
    const back_ = new THREE.Mesh(new THREE.BoxGeometry(w + 24, h, 12), [WE, WE, WE, WE, mat(back, 1024, Math.round(1024 * h / w)), WE]); back_.position.set(-12, h / 2, -d / 2 - 6); group.add(back_);
    const left_ = new THREE.Mesh(new THREE.BoxGeometry(12, h, d), [mat(left, 1024, Math.round(1024 * h / d)), WE, WE, WE, WE, WE]); left_.position.set(-w / 2 - 6, h / 2, 0); group.add(left_);
    const R = { group, w, d, h, anchors: {}, world,
      box: (bw, bh, bd, x, y, z, color = 0x4a536e) => { const m = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), color && color.isMaterial ? color : lam(color)); m.position.set(x, y, z); group.add(m); return m; },
      cyl: (r, hh, x, y, z, color = 0x3a3d4e, seg = 24) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, hh, seg), lam(color)); m.position.set(x, y, z); group.add(m); return m; },
      plane: (pw, ph, c, x, y, z, rot = [0, 0, 0], { basic = true, transparent = false } = {}) => { const t = tex(c), m = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), basic ? new THREE.MeshBasicMaterial({ map: t, transparent, toneMapped: false }) : new THREE.MeshLambertMaterial({ map: t, transparent })); m.rotation.set(...rot); m.position.set(x, y, z); group.add(m); m.userData.tex = t; return m; },
      light: (color, intensity, p, dist, decay) => world.light(color, intensity, p, dist, decay, group),
      glow: o => world.glowPlane({ ...o, parent: group }) };
    return R;
  };

  // ---- actors: ARSIP RIG billboards ----
  // pose: t => rig pose (facing, expr, gaze, rh, …); with `sit` (cm, seat height) the pose is run through seated().  opts: t => drawChar options.
  world.actor = ({ spec, at = [0, 0], y = 0, parent = scene, height = 168, sit = null, pose = () => ({}), opts = () => ({}), res = 1024, size = 190, yawLimit = .85, shadow = true } = {}) => {
    const CW = res, cc = canvas(CW, CW), cg = cc.getContext('2d'), PXCM = CW / size, FOOT = CW - Math.round(CW * .0625);
    const ct = tex(cc, { aniso: 1 }); ct.generateMipmaps = false; ct.minFilter = THREE.LinearFilter;
    const sprite = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: ct, transparent: true, alphaTest: .02, toneMapped: false }));
    sprite.position.set(at[0], y + size / 2, at[1]); parent.add(sprite);
    use(cg); cg.clearRect(0, 0, CW, CW); drawChar(cg, spec, { x: CW / 2, y: FOOT, s: 1, facing: 0, expr: 'netral' });
    const d = cg.getImageData(0, 0, CW, CW).data; let top = CW; for (let r = 0; r < CW && top === CW; r++) for (let x = 0; x < CW; x++) if (d[(r * CW + x) * 4 + 3] > 20) { top = r; break; }
    const fit = height * PXCM / (FOOT - top);                       // rig scale that makes a standing figure `height` cm tall
    let shade = null; if (shadow) { shade = new THREE.Mesh(new THREE.PlaneGeometry(70, 40), new THREE.MeshBasicMaterial({ map: tex(paint(128, 128, g => { const k = g.createRadialGradient(64, 64, 0, 64, 64, 64); k.addColorStop(0, 'rgba(0,0,0,.55)'); k.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = k; g.fillRect(0, 0, 128, 128); })), transparent: true, depthWrite: false })); shade.rotation.x = -Math.PI / 2; shade.position.set(at[0] + 2, y + .3, at[1] + 8); parent.add(shade); }
    const A = { sprite, fit, spec, set: (p) => { if (p.at) { sprite.position.x = p.at[0]; sprite.position.z = p.at[1]; if (shade) { shade.position.x = p.at[0] + 2; shade.position.z = p.at[1] + 8; } } if (p.y !== undefined) sprite.position.y = p.y + size / 2; } };
    ticks.push((t, P, c) => {
      if (!sprite.visible) return;
      const wp = new THREE.Vector3(); sprite.getWorldPosition(wp);
      use(cg); cg.setTransform(1, 0, 0, 1, 0, 0); cg.clearRect(0, 0, CW, CW);
      let p = { x: CW / 2, y: FOOT, s: fit, ...pose(t) };
      if (sit != null) p = seated(spec, p, sit * PXCM / fit);
      drawChar(cg, spec, p, { noShadow: true, ...opts(t) }); ct.needsUpdate = true;
      sprite.rotation.y = clamp(Math.atan2(c.position.x - wp.x, c.position.z - wp.z), -yawLimit, yawLimit);   // face the camera, never edge-on
    });
    return A;
  };

  // ---- the feed tunnel (four flared walls tiled with cards, streaming toward the camera) ----
  world.tunnel = ({ at = [0, 0, 0], rings = [[0, 3.7, 7.5], [-30, 6, 11], [-120, 20, 36], [-300, 50, 80], [-700, 70, 110], [-1500, 70, 110]], card = 14, speed = 2.2, tint = 0xa6b9c8, endGlow = true, parent = scene } = {}) => {
    const group = new THREE.Group(); group.position.set(...at); parent.add(group);
    const tt = tex(paint(256, 2048, (g) => { g.fillStyle = '#1f1c28'; g.fillRect(0, 0, 256, 2048); for (let i = 0; i < 8; i++) { const y = i * 256; rr(g, 16, y + 14, 224, 228, 16, '#f2f4f6'); rr(g, 28, y + 26, 200, 130, 10, FEED[i % 6]); rr(g, 28, y + 170, 130, 14, 5, '#c3ccd4'); rr(g, 28, y + 194, 80, 14, 5, '#d6dce1'); } }), { repeat: true, aniso: 8 });
    const pos = [], uv = [], idx = [], vv = []; let v = 0; rings.forEach((r, i) => { if (i) v += Math.abs(r[0] - rings[i - 1][0]) / (card * 8); vv.push(v); });
    for (let w = 0; w < 4; w++) for (let i = 0; i < rings.length - 1; i++) {
      const q = (r, s) => { const [yy, hw, hh] = r, c = [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]], a = c[w], b = c[(w + 1) % 4]; return [a[0] + (b[0] - a[0]) * s, yy, a[1] + (b[1] - a[1]) * s]; };
      const base = pos.length / 3; for (const [r, vi] of [[rings[i], vv[i]], [rings[i + 1], vv[i + 1]]]) for (const s of [0, 1]) { pos.push(...q(r, s)); uv.push(s * Math.max(1, (w % 2 ? r[2] : r[1]) * 2 / card), vi); }
      idx.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(idx);
    group.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tt, side: THREE.DoubleSide, toneMapped: false, color: tint })));
    if (endGlow) world.glowPlane({ size: 900, at: [0, rings[rings.length - 1][0] - 10, 0], rgb: '127,227,255', a: .55, parent: group });
    ticks.push(t => { tt.offset.y = -t * speed; });
    return { group, anchors: { top: at, bottom: [at[0], at[1] + rings[rings.length - 1][0], at[2]] } };
  };

  // ---- finishing (2D, on the output canvas) ----
  const acc = canvas(W, H), ag = acc.getContext('2d'), fin = canvas(W, H), tmp = canvas(W, H), half = canvas(W >> 1, H >> 1), paperGrain = paint(256, 256, (g) => { const im = g.createImageData(256, 256); for (let i = 0; i < 256 * 256; i++) { const r = Math.sin(i * 12.9898) * 43758.5453, v = ((r - Math.floor(r)) * 255) | 0; im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = v; im.data[i * 4 + 3] = 255; } g.putImageData(im, 0, 0); });
  function finishing(P, t, out) {
    const F = world.finish, g = fin.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.filter = 'none'; g.globalAlpha = 1; g.drawImage(acc, 0, 0);
    const tilt = F.tilt ? F.tilt(P) : clamp((P.dist - 250) / 250, 0, 1) * clamp((P.el - 14) / 18, 0, 1);   // "miniature" strength: long lens, high angle
    if (tilt > .02) { const b = tmp.getContext('2d'); b.setTransform(1, 0, 0, 1, 0, 0); b.globalCompositeOperation = 'source-over'; b.clearRect(0, 0, W, H); b.filter = `blur(${(14 * tilt * W / 1080).toFixed(1)}px)`; b.drawImage(acc, 0, 0); b.filter = 'none'; b.globalCompositeOperation = 'destination-in'; const m = b.createLinearGradient(0, 0, 0, H); m.addColorStop(0, 'rgba(0,0,0,1)'); m.addColorStop(.3, 'rgba(0,0,0,0)'); m.addColorStop(.62, 'rgba(0,0,0,0)'); m.addColorStop(1, 'rgba(0,0,0,1)'); b.fillStyle = m; b.fillRect(0, 0, W, H); g.drawImage(tmp, 0, 0); }
    if (F.halation > 0) { const hw = W >> 1, hh = H >> 1, b = half.getContext('2d'); b.setTransform(1, 0, 0, 1, 0, 0); b.globalCompositeOperation = 'source-over'; b.clearRect(0, 0, hw, hh); b.filter = `blur(${(11 * W / 1080).toFixed(1)}px) brightness(1.7) contrast(1.5)`; b.drawImage(fin, 0, 0, hw, hh); b.filter = 'none'; g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha = F.halation; g.drawImage(half, 0, 0, W, H); g.restore(); }   // halation: bright areas bleed a soft glow (half-res blur)
    if (F.paper > 0) { g.save(); g.globalCompositeOperation = 'soft-light'; g.globalAlpha = F.paper; g.fillStyle = g.createPattern(paperGrain, 'repeat'); g.fillRect(0, 0, W, H); g.restore(); }      // static paper tooth: "flat premium"
    const o = out.getContext('2d'); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.drawImage(fin, 0, 0);
    use(o); const sx = W / 1080; o.save(); o.scale(sx, sx); vignette(F.vignette); grain(Math.floor(t * fps), F.grain); o.restore();
    return tilt;
  }

  // ---- one frame: motion-blurred sub-frames averaged, then finishing ----
  function sub(t) {
    const P = world.pose(t); applyPose(cam, P); const f = world.fog(t, P, cam); scene.fog = f ? new THREE.FogExp2(f.color, f.density) : null;
    for (const k of ticks) k(t, P, cam); renderer.render(scene, cam); return P;
  }
  world.frame = (t, out) => {
    LIFE.t = t;
    const P0 = world.pose(t - .5 / fps), P1 = world.pose(t + .5 / fps), n = clamp(Math.ceil(camSpeed(P0, P1) / 2.6), 1, 5);
    ag.setTransform(1, 0, 0, 1, 0, 0);
    for (let j = 0; j < n; j++) { sub(t + ((j + .5) / n - .5) * .5 / fps); ag.globalAlpha = 1 / (j + 1); ag.drawImage(gl, 0, 0); }
    ag.globalAlpha = 1;
    const tilt = finishing(world.pose(t), t, out); return { n, tilt };
  };
  world.renderer = renderer;
  return world;
}
