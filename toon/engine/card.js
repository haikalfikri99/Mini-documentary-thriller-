// card.js — a Cast Kit character as a 2D card standing in a three.js world (the "2D characters in a 3D world" look).
// The character is drawn with toon.js into its own canvas every frame and shown on an upright, camera-facing plane.
import { THREE, fg } from '/engine3d/core.js';
import { init, frame, g } from './toon.js';
import { person } from './cast.js';

const UNITS = 720;   // Cast Kit units from the feet to the top of an adult's hat
export class Card {
  constructor(height = 1.78, { res = 1200, front = true, body = 'man' } = {}) {
    this.cv = document.createElement('canvas'); this.cv.width = Math.round(res * .7); this.cv.height = res;
    this.px = res / UNITS * .92;                       // canvas px per Cast Kit unit
    this.tex = new THREE.CanvasTexture(this.cv); this.tex.colorSpace = THREE.SRGBColorSpace; this.tex.anisotropy = 4;
    const ref = body === 'child' ? 470 : UNITS;          // a child's card is scaled from its own height
    const hW = height / (ref * .92 / UNITS * res / res) ;
    const worldPerPx = height / (ref * this.px), w = this.cv.width * worldPerPx, h = this.cv.height * worldPerPx;
    const geo = new THREE.PlaneGeometry(w, h); geo.translate(0, h / 2 - 20 * worldPerPx, 0);
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: this.tex, transparent: true, alphaTest: .02, depthWrite: false, fog: false }));
    this.group = new THREE.Group(); this.group.add(this.mesh); if (front) fg(this.group);
  }
  // P: a Cast Kit person (x, y, s are set here); t drives the line boil
  draw(P, t) {
    const old = g; init(this.cv); frame(t);
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, this.cv.width, this.cv.height);
    person({ ...P, x: this.cv.width / 2, y: this.cv.height - 20, s: this.px * (P.s ?? 1) });
    this.tex.needsUpdate = true;
  }
  face(camera) { const p = this.group.position; this.group.rotation.set(0, Math.atan2(camera.position.x - p.x, camera.position.z - p.z), 0); }
}
