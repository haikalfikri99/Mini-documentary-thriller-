// SPIKE 3 (test on #002 material): kamar 01.47 as a CLOSED room, camera inside, wide lens, real rack focus, out through the window,
// turn around and pull back to the tower and the city. Adapted from the camera language of a top cartoon-Shorts reference (no assets copied).
import { createWorld } from './rig/diorama-kit.js';
import { roomKamarClosed } from './rig/rooms3d.js';
import { perform, idle, GESTURE } from './rig/acting.js';
import { voSync } from './rig/vo-sync.js';
import { SKIN } from './rig/arsip-rig.js';
import WORDS from './words.js';

export const DUR = 12;   // example only: copy the parts you need into world.js
const SCREEN = '#7fe3ff';
const KAMU = { body: 'adult', skin: SKIN.sawo, hair: { type: 'pendek', col: '#1f1915' }, top: { type: 'kaos', col: '#6b7280' }, bottom: { type: 'sarung', col: '#3d4f6e', col2: '#6f86a8' }, shoes: '#2a2522' };

export function build(gl, W, H) {
  const world = createWorld({ gl, W, H });
  world.ambient.intensity = 6.0; world.ambient.color.set(0x9a96c8);
  world.sky(); world.skyline({ radius: 4200, bottom: -3200, height: 4200 });
  const kamar = roomKamarClosed(world, { at: [0, 0, 0] }), WIN = kamar.anchors.WIN, WC = kamar.anchors.windowC;
  // the tower: a facade just outside the back wall; hole where the window is. Facade centre is 9 m below the window (we are on an upper floor).
  const FC = [WC[0], WC[1] - 900, WC[2] - 14];
  world.facade({ at: FC, w: 1500, h: 3200, hole: { x: 0, y: 900, w: WIN.w, h: WIN.y1 - WIN.y0 }, cols: 8, rows: 20 });

  world.actor({ spec: KAMU, at: kamar.anchors.seat, sit: 40, pose: t => ({ facing: .7, ...perform(t, [
      { t: 0, expr: 'lelah', gaze: [.75, .35], rh: [70, 70] }, { t: 2.0, expr: 'cemas' }, { t: 2.6, dur: .7, rh: GESTURE.phoneRaise.rh }, { t: 5.0, expr: 'kaget', gaze: [.1, -.2], dur: .3 }]), ...idle(t) }),
    opts: () => ({ rim: { col: SCREEN, dir: [.8, .3], w: 6 }, amb: '#2c3550', ambK: .22 }) });

  const CL = kamar.anchors.clock, HEAD = kamar.anchors.head;
  world.camera([
    { t: 0.0, tx: CL[0], ty: CL[1] + 1, tz: CL[2], az: 14, el: 6, dist: 40, fov: 40, roll: 0 },                         // extreme close-up: the clock 01.47
    { t: 1.4, tx: CL[0] - 20, ty: CL[1] + 10, tz: CL[2] + 20, az: 24, el: 8, dist: 70, fov: 50, roll: 0 },
    { t: 2.6, tx: -96, ty: 104, tz: -34, az: 38, el: 8, dist: 175, fov: 66, roll: 3 },                                   // wide lens: him in the room
    { t: 4.0, tx: 60, ty: 140, tz: -120, az: 22, el: 6, dist: 150, fov: 72, roll: -4 },                                // drift toward the window, slightly tilted
    { t: 5.2, tx: WC[0], ty: WC[1], tz: WC[2] - 30, az: 0, el: 3, dist: 110, fov: 74, roll: 0, hold: .8 },            // lined up on the window
    { t: 6.0, tx: WC[0], ty: WC[1], tz: -420, az: 0, el: 2, dist: 90, fov: 78, roll: 0 },                              // out through the window: the city
    { t: 7.5, tx: WC[0], ty: WC[1] - 80, tz: FC[2], az: 150, el: 8, dist: 700, fov: 56, roll: 0 },                      // turn around while pulling out
    { t: 9.0, tx: WC[0], ty: WC[1] - 500, tz: FC[2], az: 188, el: 12, dist: 3300, fov: 50, roll: 0, hold: .6 },         // the tower
    { t: 12.0, tx: WC[0], ty: WC[1] - 560, tz: FC[2], az: 193, el: 12, dist: 3700, fov: 50, roll: 0 },
  ], { handheld: t => (t < 5.2 ? .55 : .15) });

  // focus: the clock → him → the window → the city → the window from outside → the tower
  world.rackFocus([{ t: 0, at: CL }, { t: 1.2, at: HEAD, dur: .8 }, { t: 3.7, at: [WC[0], WC[1], WC[2]], dur: .9 }, { t: 6.0, at: [WC[0], WC[1], -900], dur: .6 }, { t: 7.2, at: [WC[0], WC[1], FC[2]], dur: .8 }], { range: 30, blur: 24 });
  world.fog = () => ({ color: 0x141a33, density: .00004 });
  return world;
}
