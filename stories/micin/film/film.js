// ARSIP 3 — the film. Shot starts come from the storyboard (cut on the first word of each line, ~1.5–2 s per shot).
import { SHOTS, setCtx } from './shots.js';
import { createFilm } from './rig/film-engine.js';
export const START = [0, 2.0, 3.4, 56.6];   // one entry per shot + the film end
export const DUR = 56.6;
const CAM = { 0: { push: .06, fy: .4 }, 1: { slam: 1 }, 2: { push: .04 } };   // vocabulary: kit/src/film-engine.js
const FLASHES = [[2.0, .12, '#fff8e8']];                                         // the ARSIP slam flash
const film = createFilm({ shots: SHOTS, start: START, dur: DUR, cam: CAM, flashes: FLASHES, setCtx });
export const init = film.init, renderAt = film.renderAt;
