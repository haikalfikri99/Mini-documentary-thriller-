# ARSIP Kolase — style prompt (channel style of Mini Thriller IDN, from #003)

> A case file on a paper table. Public-domain engravings, stamps and old prints are cut out with a thin white margin and laid on torn sheets of flat colour; typed slips, ransom letters and red rubber stamps tell the case. Pieces move like cut-out animation, on twos, with paper thickness and real shadows. Vertical, for Shorts.
> Base: lemo-opuscar *Vintage Engraving Collage* (MIT, LemoLab). Base rules stay in force unless changed here; the changes are in [CHANGES.md](CHANGES.md).

## 1. Essence
- **Real printed matter, cut by hand**: engravings, line drawings (Pearson Scott Foresman), anatomy plates, stamps, halftone clippings. Things with no free print (a sachet, a modern package) are printed by us as flat two-ink cut-outs, never with a real logo.
- **The case file**: manila card, typed slips, a red rubber stamp for every verdict. The ARSIP folder opens the case; TERUNGKAP lands on the twist.
- **Paper on a table**: thickness, a shadow that grows with height, a paper back on flips.
- **Cut-out motion**: slide in with overshoot, drop and bounce, slap, swing on a pin, cut and split, stamp. Never a smooth software scale or a fade between pieces.
- **Data engraving** for numbers: engraved bars whose lines swell, amber wash.
Not flat vector illustration, not a slideshow of photos, not 3D.

## 2. Frame and tempo (Formula v4.1)
- 1080×1920. Frame 0 = the hero object, big, centred, already moving; a stamp or ransom word lands in the first 0.2 s.
- A new piece or a new shot every 1.5–3 s. One subject per frame.
- Hero pieces in y 150–1150. Caption band y 1210–1536 stays clear of anything the viewer must read.

## 3. Colour
paper #E6D8BC · card #F3EAD6 · manila #E4C68C · ink #1E1915 · stamp red #B3261E · archive green #2F4F4A · amber #D58E2A · newsprint #E3DDD0.
Red only for stamps, marks and the key number. Never a green stamp on a green field.

## 4. Type and captions
- IM FELL (titles, document heads), Courier Prime (slips, data, captions), Alfa Slab One / Abril Fatface / Oswald / Old Standard in ransom letters (lining digits only). All OFL, in `kit/collage/fonts/`.
- Captions: torn black slip, cream Courier Prime Bold 84 px uppercase, 1–3 words, centre at y 1360; unspoken words dim, spoken words cream, key words amber.
- On-screen labels ≥ 40 px world.

## 5–7. Motion, camera, sound
As the base (§5–§7): on twos, overshoot and settle, hand jitter; rostrum camera push/pull/shake; paper foley (slide, pat, slap, snip, typewriter, stamp thump) and small-ensemble period score; voice ~10 dB over music, master −14 LUFS.

## 8. Native moves
Cut it out · Assemble · Turn the sheet · Through the hole · Ransom and typewriter · Data engraving (base) · **Stamp it** · **Open the file** (ours).

## 9. Pitfalls
Pieces too small for a phone (hero ≥ 45 % of frame width); ink stamps on a field of the same colour; text in the caption band; licence-unknown images; more than ~12 pieces in a frame.

## 10. Engine
`kit/collage/parts.py` (+ `collage_lib.py`) bakes parts; `kit/collage/engine.js` draws them (sprites, poses, slaps, stamps, camera, captions). Each episode: `stories/<slug>/kolase/{bake.py, prints.json, SOURCES.jsonl, film.js}`; storyboard with `node kit/tools/keyframes_2d.mjs stories/<slug>/kolase mid`.

---
Adapted from "Vintage Engraving Collage" in Lemo-Opuscar by Lemomo (LemoLab), https://github.com/lemomo-ai/lemo-opuscar — docs under CC BY-NC 4.0 (https://creativecommons.org/licenses/by-nc/4.0/) with LemoLab's additional permission to adapt them for making our own films (commercial included); code under MIT (kit/collage/LICENSE-lemo-opuscar). Changed: see CHANGES.md.
