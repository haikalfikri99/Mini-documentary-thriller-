// ARSIP 003 — Micin. Shot starts = first word of each VO line (audio/vo_words.json), ~2.3 s per shot.
import { SHOTS, setCtx, setTime } from './shots.js';
import { createFilm } from './rig/film-engine.js';
export const START = [0, 1.66, 3.98, 6.86, 9.24, 11.10, 16.04, 18.04, 20.62, 22.32, 23.82, 26.00, 27.40, 29.20, 31.96, 33.10, 35.78, 36.76, 38.98, 42.08, 43.04, 45.92, 48.50, 52.54, 54.32, 56.6];
export const DUR = 56.6;
const CAM = {
  0: { push: .05, fy: .45, shake: [.35, .25, 10] }, 1: { push: .05 }, 2: { push: .04, fy: .45 }, 3: { push: .05, fy: .4 }, 4: { push: .06, fy: .4, shake: [1.0, .9, 4] },
  5: { push: .03 }, 6: { slam: 1, shake: [0, .3, 12] }, 7: { push: .05 }, 8: { push: -.08 }, 9: { push: .04 }, 10: { push: .07, fx: .55, fy: .45 },
  11: { push: .08, shake: [.3, .4, 6] }, 12: { slam: 1 }, 13: { push: .04 }, 14: { push: .1 }, 15: { push: .04 }, 16: { push: .03 }, 17: { push: .05 },
  18: { push: .06, fy: .4 }, 19: { push: .05 }, 20: { push: .03 }, 21: { push: .04 }, 22: { push: .05, fx: .4 }, 23: { slam: 1 }, 24: { push: .08 },
};
const FLASHES = [[16.04, .1, '#fff8e8'], [27.40, .1, '#ffd0c8'], [36.76, .12, '#e8fff2'], [54.32, .1, '#fff8e8']];
const film = createFilm({ shots: SHOTS, start: START, dur: DUR, cam: CAM, flashes: FLASHES, setCtx });
export const init = film.init;
export const renderAt = t => { setTime(t); film.renderAt(t); };
