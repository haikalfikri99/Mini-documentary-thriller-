// one page, two modes: stills (default) or the key-scene video (?video)
if (new URLSearchParams(location.search).has('video')) await import('./video.js'); else await import('./panels.js');
