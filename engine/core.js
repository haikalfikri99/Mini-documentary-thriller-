// Dark Toon Diorama — core: stage (renderer, layers, grade), helpers, procedural painted textures.
// Every frame is a pure function of time: no Math.random / Date in shot code; use rng(seed).
import * as THREE from './vendor/three.module.js';
export { THREE };

export function rng(seed = 1) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const smooth = k => { k = clamp(k); return k * k * (3 - 2 * k); };
export const ease = { inOut: k => smooth(k), out: k => 1 - Math.pow(1 - clamp(k), 3), in: k => Math.pow(clamp(k), 3) };
export const range = (t, a, b) => clamp((t - a) / (b - a));

// ---------------------------------------------------------------- theme (per story; can be more colourful)
export const THEMES = {
  // default channel look: desaturated cold grey, one warm accent
  noir: { sky: ['#9aa1a6', '#5d646b'], fog: 0x8a9096, fogNear: 18, fogFar: 95, sat: 0.62, contrast: 1.08, bright: 0.98,
          ambient: 0xc8ccd2, ambientI: 1.25, sun: 0xe6e9ee, sunI: 1.6, accent: '#d98a2b', vignette: .55, grain: .07 },
  // same style, more colour (for lighter / warmer stories)
  warm: { sky: ['#a9c3d8', '#e9d2a8'], fog: 0xc9c3b4, fogNear: 25, fogFar: 140, sat: 1.0, contrast: 1.05, bright: 1.02,
          ambient: 0xfff1dc, ambientI: 1.35, sun: 0xfff0d0, sunI: 2.2, accent: '#e2563b', vignette: .35, grain: .05 },
};

// ---------------------------------------------------------------- stage
// Two WebGL canvases: BG layer (optionally blurred = depth of field) and FG layer (sharp).
export class Stage {
  constructor(root, { w = 1080, h = 1920, scale = 1, theme = 'noir' } = {}) {
    this.w = w; this.h = h; this.theme = typeof theme === 'string' ? THEMES[theme] : theme;
    root.style.cssText += `;position:relative;width:${w}px;height:${h}px;overflow:hidden;background:#000`;
    const mk = (z) => { const c = document.createElement('canvas'); c.width = w * scale; c.height = h * scale;
      c.style.cssText = `position:absolute;left:0;top:0;width:${w}px;height:${h}px;z-index:${z}`; root.appendChild(c); return c; };
    this.cBg = mk(1); this.cFg = mk(2);
    const opt = { antialias: true, preserveDrawingBuffer: true, alpha: true };
    this.rBg = new THREE.WebGLRenderer({ canvas: this.cBg, ...opt });
    this.rFg = new THREE.WebGLRenderer({ canvas: this.cFg, ...opt });
    for (const r of [this.rBg, this.rFg]) { r.setPixelRatio(1); r.setSize(w * scale, h * scale, false);
      r.outputColorSpace = THREE.SRGBColorSpace; r.toneMapping = THREE.NoToneMapping; }
    this.rFg.setClearColor(0x000000, 0);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, w / h, 0.05, 600);
    // overlays: grade (vignette), grain, flash
    const ov = (css, z) => { const d = document.createElement('div'); d.style.cssText = `position:absolute;inset:0;pointer-events:none;z-index:${z};${css}`; root.appendChild(d); return d; };
    this.vig = ov('', 5);
    this.grain = ov('', 6);
    this.flash = ov('background:#fff;opacity:0', 7);
    this.grainTex = grainDataURL();
    this.grain.style.backgroundImage = `url(${this.grainTex})`;
    this.lights();
    this.setTheme(this.theme);
    this.blur = 0;
  }
  lights() {
    this.amb = new THREE.HemisphereLight(0xffffff, 0x404040, 1); this.scene.add(this.amb);
    this.sun = new THREE.DirectionalLight(0xffffff, 1); this.sun.position.set(-30, 60, 25); this.scene.add(this.sun);
    this.warm = new THREE.PointLight(0xff9a3c, 0, 40, 1.6); this.scene.add(this.warm);
  }
  setTheme(th) {
    this.theme = th; const s = this.scene;
    s.fog = new THREE.Fog(th.fog, th.fogNear, th.fogFar);
    s.background = skyTexture(th.sky);
    this.amb.color.set(th.ambient); this.amb.groundColor.set(0x3a3d42); this.amb.intensity = th.ambientI;
    this.sun.color.set(th.sun); this.sun.intensity = th.sunI;
    this.grade();
  }
  grade({ sat, contrast, bright, vignette, grain } = {}) {
    const th = this.theme;
    sat ??= th.sat; contrast ??= th.contrast; bright ??= th.bright; vignette ??= th.vignette; grain ??= th.grain;
    this._filter = `saturate(${sat}) contrast(${contrast}) brightness(${bright})`;
    this.vig.style.background = `radial-gradient(ellipse 80% 68% at 50% 46%, transparent 52%, rgba(0,0,0,${vignette}) 100%)`;
    this.grain.style.opacity = grain;
    this.applyFilters();
  }
  applyFilters() {
    this.cBg.style.filter = (this.blur > 0 ? `blur(${this.blur}px) ` : '') + this._filter;
    this.cFg.style.filter = this._filter;
  }
  setBlur(px) { if (px !== this.blur) { this.blur = px; this.applyFilters(); } }
  // objects tagged obj.userData.fg = true go on the sharp layer
  render(t = 0) {
    const fg = [], bg = [];
    this.scene.traverse(o => { if (o.isMesh || o.isSprite || o.isPoints || o.isLine) (isFg(o) ? fg : bg).push(o); });
    const bgVis = bg.map(o => o.visible), fgVis = fg.map(o => o.visible);
    fg.forEach(o => o.visible = false);
    this.rBg.render(this.scene, this.camera);
    fg.forEach((o, i) => o.visible = fgVis[i]); bg.forEach(o => o.visible = false);
    const bgBack = this.scene.background; this.scene.background = null;
    this.rFg.render(this.scene, this.camera);
    this.scene.background = bgBack; bg.forEach((o, i) => o.visible = bgVis[i]);
    this.grain.style.backgroundPosition = `${(t * 997 | 0) % 512}px ${(t * 613 | 0) % 512}px`;
  }
}
function isFg(o) { for (let p = o; p; p = p.parent) if (p.userData && p.userData.fg) return true; return false; }
export function fg(obj, v = true) { obj.userData.fg = v; return obj; }

// ---------------------------------------------------------------- toon helpers
let _grad3;
export function gradient3() {
  if (_grad3) return _grad3;
  const d = new Uint8Array([90, 170, 255]); _grad3 = new THREE.DataTexture(d, 3, 1, THREE.RedFormat);
  _grad3.minFilter = _grad3.magFilter = THREE.NearestFilter; _grad3.needsUpdate = true; return _grad3;
}
export function ink(mesh, thick = 0.04, color = 0x14110f) {
  // inverted-hull outline (child mesh sharing the geometry, pushed out along normals)
  const h = new THREE.Mesh(mesh.geometry, inkMaterial(thick, color)); h.userData.ink = true; mesh.add(h); return mesh;
}
const _inkCache = new Map();
function inkMaterial(thick, color) {
  const k = thick + '_' + color; if (_inkCache.has(k)) return _inkCache.get(k);
  const m = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide, fog: true });
  m.onBeforeCompile = sh => { sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>',
    `#include <begin_vertex>\n transformed += normalize(normal) * ${thick.toFixed(4)};`); };
  m.customProgramCacheKey = () => 'ink' + k; _inkCache.set(k, m); return m;
}
export function toonMat(color, opts = {}) {
  return new THREE.MeshToonMaterial({ color, gradientMap: gradient3(), ...opts });
}

// ---------------------------------------------------------------- canvas texture painting
export function canvasTex(w, h, draw, { repeat = null, srgb = true } = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); draw(g, w, h);
  const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4; if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
  return t;
}
export function noiseBlots(g, w, h, R, n, col, a0, a1, r0, r1) {
  for (let i = 0; i < n; i++) { const x = R() * w, y = R() * h, r = r0 + R() * (r1 - r0);
    const gr = g.createRadialGradient(x, y, 0, x, y, r); const a = a0 + R() * (a1 - a0);
    gr.addColorStop(0, col.replace('A', a)); gr.addColorStop(1, col.replace('A', 0)); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); }
}
export function streaks(g, w, h, R, n, col, len = [20, 120]) {
  for (let i = 0; i < n; i++) { const x = R() * w, y = R() * h * .9, l = len[0] + R() * (len[1] - len[0]);
    const gr = g.createLinearGradient(x, y, x, y + l); gr.addColorStop(0, col.replace('A', .0)); gr.addColorStop(.2, col.replace('A', .18 + R() * .2)); gr.addColorStop(1, col.replace('A', 0));
    g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 4, l); }
}
function skyTexture([top, bot]) {
  return canvasTex(64, 512, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, bot); gr.addColorStop(.55, top); gr.addColorStop(1, top);
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
  });
}
export function cloudsTex(seed = 3, tone = [150, 156, 162]) {
  const R = rng(seed);
  return canvasTex(1024, 512, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, `rgb(${tone.map(v => v - 45)})`); gr.addColorStop(1, `rgb(${tone})`);
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 160; i++) { const x = R() * w, y = R() * h * .9, r = 40 + R() * 140, d = R() < .5 ? -1 : 1;
      const v = tone.map(c => c + d * (12 + R() * 22)); const gg = g.createRadialGradient(x, y, 0, x, y, r);
      gg.addColorStop(0, `rgba(${v},.35)`); gg.addColorStop(1, `rgba(${v},0)`); g.fillStyle = gg; g.fillRect(x - r, y - r * .6, r * 2, r * 1.2); }
  });
}

function grainDataURL() {
  const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); const im = g.createImageData(256, 256); const R = rng(9);
  for (let i = 0; i < im.data.length; i += 4) { const v = 128 + (R() - .5) * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
  g.putImageData(im, 0, 0); return c.toDataURL();
}
