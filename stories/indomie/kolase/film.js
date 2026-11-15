// ARSIP #NNN <Judul> · ARSIP Kolase. One function per VO line (START = line starts from vo_words.json); each shot is a small
// paper table with its own camera. Read kit/styles/arsip-kolase/STYLE.md first; stories/micin/kolase/film.js is the full example.
import { W, H, SP, PAL, setCtx, loadAll, put, putA, putK, has, slap, slide, drop, stampAt, typed, createFilm, seg, EASE, stepT, M, EV,
  arrow, route, bow } from './lib/engine.js';
import { makeShotKit } from './lib/shotkit.js';
export { EV };

export const START = [0, 2.0, 4.0];   // ← line starts (s) + the duration as the last value
export const DUR = START[START.length - 1];
const K = makeShotKit(START), { at, bg, stage, ransomRow, fileOverlay } = K;
let film = null;

const SHOTS = [
  // 01 · hook: the hero object is on the table at frame 0, already moving; the hook stamp lands at 0.12 s
  (u, T, d) => {
    stage(u, d, { z0: 1.02, z1: 1.08, cy: 900, shake: [[0.12, 10]] }); bg('hook');
    putK('st_hook', [[0, 540, 700, 0, 0, 1]], u, 1);   // ← replace with the hero part, e.g. putK('hero', [[0, 540, 690, -4, 1.4, 1, null, 0, 1.03], [0.12, 540, 700, -3, 0, 1, 'in', 1.2]], u, 1, { s: 1.3 })
    stampAt('st_hook', u, 0.12, 560, 1010, -9, 1.45);
  },
  // 02 · setup with the ARSIP file overlay (≤ 1.3 s over a moving shot)
  (u, T, d) => {
    stage(u, d, { z1: 1.12 }); bg('file');
    fileOverlay(u);
  },
];

export async function init(c) {
  setCtx(c);
  await loadAll('./parts', './lib/fonts');
  const words = (await (await fetch('./audio/vo_words.json')).json()).map(([s, e, w]) => ({ s, e, w }));
  K.setWords(words);
  film = createFilm({ shots: SHOTS, start: START, words, caption: { size: 84, y: 1360, maxChars: 16, maxWords: 3, hot: /^(kata|kunci)/i } });
}
export const renderAt = t => film.renderAt(t);
