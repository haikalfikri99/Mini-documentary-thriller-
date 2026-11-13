// Shots for ARSIP 3. Each shot = function of u (0..1). Build from the kit: rig (characters), sets-lib (rooms/props),
// scene-kit (light, depth, grade), arsip-card (the channel's case card). Replace these three examples.
import { drawChar, PRESETS, SKIN } from './rig/arsip-rig.js';
import { arsipCard } from './rig/arsip-card.js';
import * as L from './rig/sets-lib.js';
import { pool, vignette, grain } from './rig/scene-kit.js';
let g, MAIN;
const setLocal = c => { g = c; L.setCtx(c); };
export const setCtx = c => { MAIN = c; setLocal(c); };
function offShot(fn, u) { const c = document.createElement('canvas'); c.width = 1080; c.height = 1920; setLocal(c.getContext('2d')); fn(u); setLocal(MAIN); return c; }
let PHOTO = null;

// S01 hook: frame 0 must read instantly (it is the thumbnail in the feed)
export function S01(u) {
  L.setA();
  const P = L.headAt(PRESETS.pria, L.seated(PRESETS.pria, { facing: .6, expr: 'kaget', gaze: [.6, .7], rh: [86, 18], hold: 'hp', look: .5 }), 430, 800, 3.1);
  drawChar(g, PRESETS.pria, P, { rim: { col: L.SCREEN, dir: [.75, .4], w: 7 }, amb: '#2c3550', ambK: .22, noShadow: true });
  pool(700, 1020, 420, 'rgb(127,227,255)', .28); L.deskA(1420);
  L.txt('JUDUL HOOK', 540, 260, 84); vignette(.38); grain(1);
}
// S02 the ARSIP KASUS card (template, never redesigned): stamp on the first time/place word
export function S02(u) {
  if (!PHOTO) PHOTO = offShot(S01, .9);
  arsipCard(g, u, { title: 'JUDUL KASUS', sub: 'TEMPAT · TAHUN', no: Number('3'), photo: PHOTO, crop: [60, 420, 1000, 1300], stampAt: .5, dur: 1.4 });
}
export function S03(u) { L.setD(); L.bigButton(540, 980, 1.0, { label: 'CONTOH' }); vignette(.45); grain(3); }
export const SHOTS = [S01, S02, S03];
