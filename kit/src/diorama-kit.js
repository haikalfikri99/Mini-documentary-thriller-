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
  const renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(W, H, false); renderer.setClearColor(0x0d0c12, 1);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(34, W / H, 1.5, 9000);
  const ambient = new THREE.AmbientLight(0x7a76a8, 0.95); scene.add(ambient);
  const ticks = [];                                      // (t, P, cam) per sub-frame: animate things, set visibility
  const world = { THREE, scene, cam, ambient, W, H, fps, ticks, finish: { halation: .16, paper: .05, vignette: .5, grain: .04, tilt: null }, fog: () => ({ color: 0x0d0c12, density: .00006 }), pathFn: t => ({ tx: 0, ty: 100, tz: 0, az: 0, el: 10, dist: 300, fov: 30, roll: 0 }) };

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
  // painters: (g, w, h) => void for ~1024-px-wide textures (or a CSS colour string).
  // enclosed:false (default) = cutaway: floor slab + back + left walls, open to +x/+z (for "maps" and the iso view).
  // enclosed:true  = a real room, camera INSIDE it: four walls + ceiling, with openings (windows/doors) the camera can fly through:
  //   openings: { back: [{ x: 110, w: 150, y0: 100, y1: 220 }], … }  x = centre across the wall as seen from inside (cm from the wall centre), y in cm from the floor.
  world.room = ({ at = [0, 0, 0], w = 420, d = 360, h = 260, floor = '#3a2f2e', back = '#34324a', left = '#34324a', right = null, front = null, ceiling = '#1c1b27', edge = 0x1a1720, wedge = 0x2a283a, lit = true, enclosed = false, openings = {}, frame = '#14131c' } = {}) => {
    const group = new THREE.Group(); group.position.set(...at); scene.add(group);
    const surf = (p, tw, th, holes, ww, wh) => {
      const c = typeof p === 'function' ? paint(tw, th, p) : paint(tw, th, (g, x, y) => { g.fillStyle = p; g.fillRect(0, 0, x, y); });
      let alpha = false;
      if (holes && holes.length) { alpha = true; const g = c.getContext('2d'), k = tw / ww; holes.forEach(o => { const x0 = tw / 2 + (o.x - o.w / 2) * k, y0 = th - o.y1 * k, hw = o.w * k, hh = (o.y1 - o.y0) * k, f = 7 * k; g.strokeStyle = frame; g.lineWidth = f * 2; g.strokeRect(x0, y0, hw, hh); g.save(); g.globalCompositeOperation = 'destination-out'; g.fillStyle = '#000'; g.fillRect(x0, y0, hw, hh); g.restore(); }); }
      const T = tex(c); return lit ? new THREE.MeshLambertMaterial({ map: T, transparent: alpha, alphaTest: alpha ? .5 : 0, side: THREE.DoubleSide }) : new THREE.MeshBasicMaterial({ map: T, transparent: alpha, alphaTest: alpha ? .5 : 0, side: THREE.DoubleSide });
    };
    const E = lam(edge), WE = lam(wedge);
    if (!enclosed) {
      const mat = (p, tw, th) => { const m = surf(p, tw, th); m.side = THREE.FrontSide; return m; };
      const slab = new THREE.Mesh(new THREE.BoxGeometry(w + 24, 14, d + 24), [E, E, mat(floor, 1024, Math.round(1024 * d / w)), E, E, E]); slab.position.set(-12, -7, 0); group.add(slab);
      const back_ = new THREE.Mesh(new THREE.BoxGeometry(w + 24, h, 12), [WE, WE, WE, WE, mat(back, 1024, Math.round(1024 * h / w)), WE]); back_.position.set(-12, h / 2, -d / 2 - 6); group.add(back_);
      const left_ = new THREE.Mesh(new THREE.BoxGeometry(12, h, d), [mat(left, 1024, Math.round(1024 * h / d)), WE, WE, WE, WE, WE]); left_.position.set(-w / 2 - 6, h / 2, 0); group.add(left_);
    } else {
      const wall = (p, ww, rot, pos, holes) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(ww, h), surf(p, 1024, Math.round(1024 * h / ww), holes, ww, h)); m.rotation.set(...rot); m.position.set(...pos); group.add(m); return m; };
      const fl = new THREE.Mesh(new THREE.PlaneGeometry(w, d), surf(floor, 1024, Math.round(1024 * d / w))); fl.rotation.x = -Math.PI / 2; group.add(fl);
      const ce = new THREE.Mesh(new THREE.PlaneGeometry(w, d), surf(ceiling, 512, Math.round(512 * d / w))); ce.rotation.x = Math.PI / 2; ce.position.y = h; group.add(ce);
      wall(back, w, [0, 0, 0], [0, h / 2, -d / 2], openings.back); wall(left, d, [0, Math.PI / 2, 0], [-w / 2, h / 2, 0], openings.left);
      wall(right ?? back, d, [0, -Math.PI / 2, 0], [w / 2, h / 2, 0], openings.right); wall(front ?? left, w, [0, Math.PI, 0], [0, h / 2, d / 2], openings.front);
    }
    const R = { group, w, d, h, anchors: {}, world, enclosed,
      box: (bw, bh, bd, x, y, z, color = 0x4a536e) => { const m = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), color && color.isMaterial ? color : lam(color)); m.position.set(x, y, z); group.add(m); return m; },
      cyl: (r, hh, x, y, z, color = 0x3a3d4e, seg = 24) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, hh, seg), lam(color)); m.position.set(x, y, z); group.add(m); return m; },
      plane: (pw, ph, c, x, y, z, rot = [0, 0, 0], { basic = true, transparent = false } = {}) => { const t = tex(c), m = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), basic ? new THREE.MeshBasicMaterial({ map: t, transparent, toneMapped: false }) : new THREE.MeshLambertMaterial({ map: t, transparent })); m.rotation.set(...rot); m.position.set(x, y, z); group.add(m); m.userData.tex = t; return m; },
      light: (color, intensity, p, dist, decay) => world.light(color, intensity, p, dist, decay, group),
      glow: o => world.glowPlane({ ...o, parent: group }) };
    return R;
  };

  // ---- the world outside: sky dome, skyline ring, tower facade ----
  // sky: vertical gradient on an inside-out sphere. skyline: a ring of silhouetted buildings with lit windows around the scene.
  world.sky = ({ stops = [[0, '#04060d'], [.3, '#0c1126'], [.47, '#3b3358'], [.5, '#7a5a6a'], [.54, '#241c34'], [1, '#07080f']], stars = 140, radius = 7000 } = {}) => {
    const c = paint(8, 512, (g, w, h) => { const k = g.createLinearGradient(0, 0, 0, h); stops.forEach(([o, col]) => k.addColorStop(o, col)); g.fillStyle = k; g.fillRect(0, 0, w, h); });
    const big = paint(1024, 512, (g, w, h) => { g.drawImage(c, 0, 0, w, h); for (let i = 0; i < stars; i++) { const r = Math.sin(i * 12.9898) * 43758.5453, q = Math.sin(i * 78.233) * 12345.678; g.fillStyle = `rgba(255,255,255,${.25 + .5 * (i % 3) / 3})`; g.fillRect((r - Math.floor(r)) * w, (q - Math.floor(q)) * h * .55, 2, 2); } });
    const m = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 16), new THREE.MeshBasicMaterial({ map: tex(big), side: THREE.BackSide, fog: false, depthWrite: false, toneMapped: false })); m.renderOrder = -10; scene.add(m);
    ticks.push((t, P, c2) => m.position.copy(c2.position)); return m;
  };
  world.skyline = ({ radius = 4200, bottom = -3200, height = 4200, tops = [.25, .6], seed = 1, lit = ['255,213,138', '159,216,255', '255,190,120'], base = '#151a2c' } = {}) => {
    const CW = 8192, CH = 1024, c = paint(CW, CH, (g) => {
      let x = 0, i = 0; while (x < CW) { const r = Math.sin((i + seed) * 91.7) * 43758.5453, f = r - Math.floor(r), bw = 180 + f * 300, bh = CH * (tops[0] + (tops[1] - tops[0]) * ((Math.sin((i + seed) * 17.3) * .5 + .5))); g.fillStyle = i % 3 ? base : '#1c2238'; g.fillRect(x, CH - bh, bw, bh);
        for (let wy = CH - bh + 28; wy < CH - 20; wy += 32) for (let wx = x + 16; wx < x + bw - 20; wx += 28) { const q = Math.sin(wx * 12.9 + wy * 78.2 + seed) * 43758.5; if (q - Math.floor(q) > .6) { g.fillStyle = `rgba(${lit[(wx + wy) % lit.length | 0] || lit[0]},1)`; g.fillRect(wx, wy, 14, 18); } }
        x += bw + 8 + f * 40; i++; } });
    const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 64, 1, true), new THREE.MeshBasicMaterial({ map: tex(c, { repeat: true }), side: THREE.BackSide, transparent: true, fog: false, depthWrite: false, toneMapped: false }));
    m.material.map.repeat.set(2, 1); m.position.y = bottom + height / 2; m.renderOrder = -9; scene.add(m); ticks.push((t, P, c2) => { m.position.x = c2.position.x; m.position.z = c2.position.z; }); return m;
  };
  // the tower the room sits in: a facade plane just outside the room's back wall, with a hole where the room's window is, and a grid of other lit windows
  // (some flicker cyan = people on their phones). cx/cy = world position of the room's window; the facade faces −z.
  world.facade = ({ at = [0, 0, 0], w = 2400, h = 4800, hole = { x: 0, y: 0, w: 150, h: 120 }, cols = 12, rows = 30, seed = 3, flicker = '127,227,255' } = {}) => {
    const CW = 1024, CH = Math.round(CW * h / w), k = CW / w, cell = [w / cols, h / rows]; const base = paint(CW, CH, (g) => { g.fillStyle = '#0b0e1c'; g.fillRect(0, 0, CW, CH); g.fillStyle = 'rgba(120,140,200,.10)'; for (let q = 0; q <= cols; q++) g.fillRect(q * cell[0] * k - 1, 0, 3, CH); for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) { g.fillStyle = '#161c33'; g.fillRect(q * cell[0] * k + 3, r * cell[1] * k + 3, cell[0] * k - 6, cell[1] * k - 10); } });
    const cv = canvas(CW, CH), g2 = cv.getContext('2d'), tx = tex(cv);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tx, transparent: true, alphaTest: .5, side: THREE.DoubleSide, toneMapped: false })); m.rotation.y = Math.PI; m.position.set(...at); scene.add(m);
    ticks.push((t) => {
      g2.setTransform(1, 0, 0, 1, 0, 0); g2.globalCompositeOperation = 'source-over'; g2.drawImage(base, 0, 0);
      for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) { const n = Math.sin((r * 31 + q * 17 + seed) * 12.9898) * 43758.5453, f = n - Math.floor(n); if (f > .7) { const phase = Math.sin(t * (2 + f * 3) + f * 40), on = f > .9 ? (phase > -.2 ? .95 : .35) : 1, col = f > .9 ? flicker : (f > .8 ? '255,213,138' : '255,190,120'); g2.fillStyle = `rgba(${col},${on * .62})`; g2.fillRect(q * cell[0] * k + 5, r * cell[1] * k + 5, cell[0] * k - 10, cell[1] * k - 14); if (f > .86) { g2.fillStyle = 'rgba(20,18,30,.8)'; g2.beginPath(); g2.arc((q + .5) * cell[0] * k, (r + .62) * cell[1] * k, cell[0] * k * .09, 0, 7); g2.fill(); } } }
      g2.save(); g2.globalCompositeOperation = 'destination-out'; g2.fillStyle = '#000'; g2.fillRect(CW / 2 + (hole.x - hole.w / 2) * k - 4, CH / 2 - (hole.y + hole.h / 2) * k - 4, hole.w * k + 8, hole.h * k + 8); g2.restore(); tx.needsUpdate = true;
    });
    return m;
  };

  // ---- real depth of field / rack focus ----
  // world.rackFocus([{ t: 0, at: [x,y,z] }, { t: 2.2, at: [x2,y2,z2], dur: .7 }], { range: 25, blur: 22 })   focus moves from point to point (smooth) while everything else softens
  // or world.dof = (t, P, cam) => ({ dist, range, blur }) for full control.  blur = max radius in px at 1080 wide (0 = off).
  world.rackFocus = (keys, { range = 25, blur = 22 } = {}) => { const v = new THREE.Vector3(); world.dof = (t, P, c) => { let at = keys[0].at, i = 0; for (; i < keys.length; i++) if (t >= keys[i].t) { const k = keys[i], d = k.dur ?? .6, prev = keys[i - 1]?.at || k.at, u = Math.max(0, Math.min(1, (t - k.t) / d)), e = u * u * (3 - 2 * u); at = prev.map((p, j) => p + (k.at[j] - p) * e); } v.set(...at); return { dist: c.position.distanceTo(v), range, blur }; }; };
  world.dof = null;
  const rt = new THREE.WebGLRenderTarget(W, H, { depthTexture: new THREE.DepthTexture(W, H), samples: 4 }); rt.depthTexture.type = THREE.UnsignedIntType;
  const post = new THREE.Scene(), postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const dofMat = new THREE.ShaderMaterial({ uniforms: { tC: { value: rt.texture }, tD: { value: rt.depthTexture }, near: { value: 1.5 }, far: { value: 9000 }, focus: { value: 100 }, range: { value: 20 }, blur: { value: 0 }, res: { value: new THREE.Vector2(W, H) } }, depthTest: false, depthWrite: false,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
    fragmentShader: `varying vec2 vUv; uniform sampler2D tC, tD; uniform float near, far, focus, range, blur; uniform vec2 res;
      float lin(float d){ float z = d * 2. - 1.; return (2. * near * far) / (far + near - z * (far - near)); }
      float coc(float z){ float spread = max(focus * .7, 30.); return blur * smoothstep(0., 1., (abs(z - focus) - range) / spread); }
      void main(){ float z = lin(texture2D(tD, vUv).r); float c0 = coc(z); vec4 acc = vec4(texture2D(tC, vUv).rgb, 1.); 
        if (c0 > .5) { float tw = 1.; vec3 sum = acc.rgb; for (int i = 1; i < 36; i++) { float fi = float(i); float r = c0 * sqrt(fi / 36.), a = fi * 2.39996; vec2 off = vec2(cos(a), sin(a)) * r / res; vec2 uv = vUv + off; float zs = lin(texture2D(tD, uv).r), cs = coc(zs); float w = clamp(cs - r + 1., 0., 1.); if (zs < z - 1.) w = max(w, clamp(c0 - r + 1., 0., 1.) * .0); sum += texture2D(tC, uv).rgb * w; tw += w; } acc = vec4(sum / tw, 1.); }
        gl_FragColor = vec4(acc.rgb, 1.); }` });
  post.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), dofMat));

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
    for (const k of ticks) k(t, P, cam);
    const D = world.dof ? world.dof(t, P, cam) : null;
    if (D && D.blur > 0) { dofMat.uniforms.focus.value = D.dist; dofMat.uniforms.range.value = D.range; dofMat.uniforms.blur.value = D.blur * W / 1080; renderer.setRenderTarget(rt); renderer.render(scene, cam); renderer.setRenderTarget(null); renderer.render(post, postCam); }
    else renderer.render(scene, cam);
    return P;
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
