// VO SYNC — camera and prop beats keyed to the spoken words, not to guessed seconds.
//   import WORDS from './words.js';            // written from audio/vo_words.json by make_film.sh ([[start, end, "kata"], …])
//   const T = voSync(WORDS);
//   T('menyesal')          → start time of the first "menyesal" (case and punctuation ignored)
//   T('scroll', 1)         → the second "scroll";   T('scroll', 0, 7.5) → 7.5 s if the word is not in the VO yet (episode still being written)
//   T.end('menyesal')      → when that word ends;   T.after('menyesal', .2) → start + .2
export function voSync(words = []) {
  const norm = s => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ''), idx = {};
  words.forEach(([a, b, w]) => { (idx[norm(w)] ||= []).push([a, b]); });
  const at = (w, nth = 0, fallback = NaN) => (idx[norm(w)]?.[nth]?.[0] ?? fallback);
  at.end = (w, nth = 0, fallback = NaN) => (idx[norm(w)]?.[nth]?.[1] ?? fallback);
  at.after = (w, dt, nth = 0, fallback = NaN) => at(w, nth, fallback) + dt;
  at.duration = words.length ? words[words.length - 1][1] : 0;
  return at;
}
