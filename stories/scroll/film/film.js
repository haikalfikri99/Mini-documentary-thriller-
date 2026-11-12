// ARSIP 002 — the film: 25 shots on the VO timeline (storyboard v2). Engine: kit/src/film-engine.js.
import { SHOTS, setCtx } from './shots.js';
import { createFilm } from './rig/film-engine.js';

export const START = [0, 1.40, 2.96, 4.50, 5.84, 6.88, 8.26, 9.56, 10.40, 11.80, 12.68, 15.02, 17.30, 19.06, 20.80, 22.88, 24.94, 26.62, 28.10, 30.34, 32.18, 35.64, 37.60, 39.56, 41.54, 44.83];
export const DUR = 44.83;
// per-shot camera (see film-engine.js for the vocabulary)
const CAM = {
  0: { push: .06, fy: .4 }, 1: { push: .04, fy: .45 }, 2: { push: -.04, fy: .4 }, 3: { slam: 1 }, 4: { push: .05, fy: .5 },
  5: { push: .03, pan: [0, -120] }, 6: { push: .04, fx: .3, fy: .45 }, 7: { push: .03 }, 8: { cuts: [10.40, 10.66, 11.00] }, 9: { push: .06, fx: .68, fy: .62 },
  10: { push: .08, fy: .55 }, 11: { push: .02 }, 12: { push: .02 }, 13: { shake: [20.14, .4, 22] }, 14: { push: .03, pan: [-40, 0] },
  15: { push: .12 }, 16: { push: .05, fy: .3 }, 17: { push: .04, fy: .35, pan: [0, -60] }, 18: { push: .04, fy: .55 }, 19: { push: .04, fy: .6 },
  20: { push: .03, pan: [0, -70] }, 21: { push: .02 }, 22: { push: .02 }, 23: { push: -.1 }, 24: { push: .04, fy: .55 },
};
// flash on the archive slam, dip before "Tapi" and into 2019, warm flash when the button shatters
const FLASHES = [[4.50, .12, '#fff8e8'], [11.80, .1, '#000'], [28.10, .14, '#000'], [20.14, .1, '#ffd08a']];
const film = createFilm({ shots: SHOTS, start: START, dur: DUR, cam: CAM, flashes: FLASHES, setCtx });
export const init = film.init, renderAt = film.renderAt;
