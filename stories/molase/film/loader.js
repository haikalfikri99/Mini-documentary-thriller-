// The film page: ?film renders the whole film (window.render(t), window.DUR); ?thumb renders the thumbnail;
// with no query it shows the still proofs of P1/P3/P8 (panels.js).
const q = new URLSearchParams(location.search);
if (q.has('film') || q.has('thumb')) { window.__video = true; await import('./film.js'); } else await import('./panels.js');
