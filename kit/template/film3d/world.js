// ARSIP __NO__ — the 3D world: rooms, actors, props, ONE continuous camera. Edit this file per episode; the machinery is kit/src/diorama-kit.js.
// Starter content = the take proven in the hybrid spike: kamar 01.47 → (close-up, crane, isometric orbit, whip) → fall through the phone →
// feed tunnel → 2006 office from above → push to the desk: a document, redaction bars, a stamp. Replace rooms/actors/keys with this story's.
//   cheat sheet: camera keys = cam3d.js · rooms = rooms3d.js (add new ones there) · acting = acting.js · documents/board = evidence.js · words = vo-sync.js
import { createWorld } from './rig/diorama-kit.js';
import { roomKamar, roomKantor06 } from './rig/rooms3d.js';
import { paper } from './rig/evidence.js';
import { perform, idle, addDarts, GESTURE } from './rig/acting.js';
import { voSync } from './rig/vo-sync.js';
import { PRESETS, SKIN } from './rig/arsip-rig.js';
import WORDS from './words.js';

export const DUR = __DUR__;
const SCREEN = '#7fe3ff';
const KAMU = { body: 'adult', skin: SKIN.sawo, hair: { type: 'pendek', col: '#1f1915' }, top: { type: 'kaos', col: '#6b7280' }, bottom: { type: 'sarung', col: '#3d4f6e', col2: '#6f86a8' }, shoes: '#2a2522' };
const T = voSync(WORDS);                                           // beats from the spoken words (fallback seconds while the VO is not aligned yet)

export function build(gl, W, H) {
  const world = createWorld({ gl, W, H });
  // ---- places (world coordinates, 1 unit = 1 cm). The office hangs 21 m below the bedroom: the camera falls there through the phone. ----
  const kamar = roomKamar(world, { at: [0, 0, 0] });
  const tunnel = world.tunnel({ at: [44, 55.85, -150], endGlow: false });
  const OFFICE = [44, -2150, -150], kantor = roomKantor06(world, { at: OFFICE });

  // ---- people ----
  world.actor({ spec: KAMU, at: kamar.anchors.seat, sit: 40, pose: t => ({ facing: .7, ...perform(t, [
      { t: 0, expr: 'lelah', gaze: [.75, .35], rh: [70, 70] }, { t: 2.2, expr: 'cemas' }, { t: 3.0, dur: .6, rh: GESTURE.phoneRaise.rh }]), ...idle(t) }),
    opts: () => ({ rim: { col: SCREEN, dir: [.8, .3], w: 6 }, amb: '#2c3550', ambK: .22 }) });
  world.actor({ spec: PRESETS.bapak, at: [OFFICE[0] - 30, OFFICE[2] - 70], y: OFFICE[1], sit: 46, pose: t => ({ facing: .6, ...perform(t, [
      { t: 0, expr: 'netral', gaze: [.6, .2], rh: [60, 80], lh: [50, 90] }, { t: T('dokumen', 0, 11.0), expr: 'curiga', gaze: addDarts([.5, .5], t, { seed: 3 }) }, { t: T('dokumen', 0, 11.0) + .4, dur: .6, rh: GESTURE.reach.rh }]), ...idle(t, 1, 2) }),
    opts: () => ({ rim: { col: '#fff1d0', dir: [-.9, -.2], w: 6 }, amb: '#f3e6cc', ambK: .06 }) });

  // ---- evidence ----
  paper(world, { at: kantor.anchors.paper, scale: 1.5, title: 'LAPORAN INTERNAL', lines: ['Tanggal : 12/11/2006', 'Perihal : fitur gulir', 'Status  : dirilis', 'Catatan : tombol "lanjut"', 'dihapus atas permintaan', 'tim pertumbuhan.'],
    redact: [{ line: 3, t0: T('tombol', 0, 12.4), dur: .5, from: .26, w: .7 }, { line: 4, t0: T('tombol', 0, 12.4) + .2, dur: .5, w: .75 }], stamp: { text: 'DITUTUP', t0: T('menyesal', 0, 13.3) } });

  // ---- the one continuous take (az 0 = camera on +z, 90 = +x; el 90 = down; dist in cm; fov = vertical, deg) ----
  const P = kamar.anchors.phone, DESK = kantor.anchors.paper;
  world.camera([
    { t: 0.0, why: 'we meet him in the phone light', tx: -74, ty: 108, tz: -8, az: 24, el: 4, dist: 210, fov: 34, roll: 0 },                       // medium close-up, low
    { t: 1.5, why: 'slow push: tension builds on the phone', tx: -72, ty: 106, tz: -8, az: 16, el: 5, dist: 150, fov: 34, roll: 0 },                       // slow push
    { t: 3.1, why: 'crane up and back: he is small in a big room', tx: -10, ty: 80, tz: -50, az: 36, el: 22, dist: 1000, fov: 30, roll: 0 },                     // crane up and back
    { t: 4.1, why: 'isometric: the whole situation at a glance', tx: -10, ty: 70, tz: -50, az: 46, el: 32, dist: 3900, fov: 14, roll: 0 },                     // isometric diorama, long lens
    { t: 5.0, why: 'orbit: time passes, nothing changes', tx: -4, ty: 66, tz: -58, az: 66, el: 30, dist: 3900, fov: 14, roll: 0, hold: .8 },            // orbit
    { t: 5.55, why: 'whip: the phone is the problem (eye goes to it)', tx: 30, ty: 58, tz: -120, az: 30, el: 66, dist: 190, fov: 26, roll: 6 },                     // whip to the phone
    { t: 6.05, why: 'top-down on the screen: the feed', tx: P[0], ty: 52, tz: P[2], az: 0, el: 88, dist: 32, fov: 30, roll: 0, hold: .55 },          // top-down on the screen
    { t: 6.75, why: 'falling in: he cannot stop', tx: P[0], ty: -60, tz: P[2], az: 0, el: 88, dist: 30, fov: 54, roll: 35 },                   // falls through
    { t: 7.9, why: 'the feed has no end', tx: P[0], ty: -1400, tz: P[2], az: 0, el: 88, dist: 30, fov: 74, roll: 150 },                 // end of the tunnel
    { t: 8.7, why: 'out into 2006: where it started', tx: OFFICE[0], ty: OFFICE[1] + 110, tz: OFFICE[2], az: 0, el: 86, dist: 260, fov: 60, roll: 250 },   // out above the office
    { t: 9.7, why: 'swing round: the office', tx: OFFICE[0], ty: OFFICE[1] + 60, tz: OFFICE[2], az: 35, el: 40, dist: 1700, fov: 20, roll: 330 },
    { t: 10.7, why: 'isometric hold: the room where the decision was made', tx: OFFICE[0] - 10, ty: OFFICE[1] + 70, tz: OFFICE[2] - 20, az: 46, el: 32, dist: 3700, fov: 14, roll: 360, hold: .7 },   // isometric, the office
    { t: 11.9, why: 'push to the document: the evidence', tx: DESK[0], ty: DESK[1], tz: DESK[2], az: 18, el: 62, dist: 150, fov: 28, roll: 360, hold: .6 },    // push to the document
    { t: 14.0, why: 'hold on the stamp: the case is closed', tx: DESK[0], ty: DESK[1], tz: DESK[2], az: 14, el: 66, dist: 128, fov: 28, roll: 360 },
  ], { handheld: t => Math.max(0, 1 - t / 3.1) * .6 + (t > 11.9 ? .25 : 0) });

  // ---- visibility + fog: what the camera cannot see is not drawn ----
  world.visible(kamar.group, (t, p, c) => c.position.y > 56.3 && p.ty > -700);
  world.visible(tunnel.group, (t, p) => p.dist < 400);
  world.visible(kantor.group, (t, p) => p.ty < -1200);
  world.fog = (t, p, c) => (c.position.y < 56.3 && c.position.y > -1440 && Math.abs(c.position.x - 44) < 200) ? { color: 0x10202c, density: .0024 } : { color: 0x0d0c12, density: .00006 };
  return world;
}
