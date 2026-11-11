# Prompt preview signature style (untuk image model)

Tujuan: melihat **perkiraan** hasil tiap opsi gaya sebelum install apa pun. Prompt dikunci ke batas yang benar-benar bisa dibuat dengan kode (geometri sederhana, shading toon, tekstur lukis, karakter rig sederhana). Gambar AI ini **hanya referensi keputusan**, tidak dipakai di video.

Cara pakai: buka sesi/proyek **baru** di image model (jangan sertakan gambar Batch 1 yang realistis, nanti gayanya bocor). Paste blok di bawah sekaligus. Hasil: 8 gambar = 4 opsi × 2 frame uji (A: adegan bencana lebar, B: close-up karakter). Frame B penting karena menentukan wajah channel di semua video berikutnya.

```text
Generate 8 separate images, one per prompt below. Each image is vertical 9:16 (1080x1920). Generate each one independently; do not merge them, do not add any text, captions, titles, labels, logos or watermarks inside the images.

IMPORTANT FOR ALL 8: these are style previews for an animation that will be built entirely with code (simple 3D primitives or 2D canvas drawing). The look must stay achievable: simple shapes, clean stylization, limited detail. NOT photorealistic, NOT a big-studio CGI look (no Pixar/Disney-style subsurface skin, no individual hair strands, no realistic fabric, no fluid-simulation detail), NOT a photo, NOT anime-studio key art.

SHARED SETTING (both frame types): Boston, Commercial Street, January 1919, overcast midday. Two- and three-storey brick warehouses, a riveted black steel elevated railway running along the street on lattice columns, cobblestones, a horse-drawn wagon. Mood: dark documentary thriller. Palette: desaturated cold blue-grey and soot brown, with ONE accent colour: glossy dark amber molasses.

FRAME A (wide disaster shot): a five-metre-high wall of dark amber molasses rolls down the street toward the camera, low camera at street level, slight dutch angle. In the foreground a dock worker in a flat cap and work jacket runs toward the camera, mid-stride, terrified; behind him the wagon is being swallowed; broken wooden planks and a few torn steel plates ride the wave; the elevated railway columns are bending. Strong sense of scale and danger.

FRAME B (character close-up): medium close-up of the same dock worker (about 40 years old, moustache, flat cap, worn jacket, scarf) turning back over his shoulder, eyes wide, mouth open in shock, warm amber light reflecting on one side of his face from the approaching molasses, cold grey light on the other side, blurred street and elevated railway behind him. The face must be expressive and readable at phone size.

---

PROMPT 1 — OPTION 1 "Dark Toon Diorama", FRAME A
[SHARED SETTING] + [FRAME A]. Style: a stylized 3D diorama world made of simple low-poly shapes (boxy buildings, simple cylinders for columns, flat planes) with hand-painted brush textures on the walls, ground and sky, like a painted miniature set. Toon shading with 2–3 flat light bands, clean uniform dark ink outlines around every 3D object. Characters are flat 2D cartoon cut-outs standing inside the 3D world: clean vector-style drawing, thick dark outline, simple shapes, adult proportions (about 5.5 heads tall), lit by the scene light with a simple soft shadow on the ground. The molasses is a smooth glossy blob surface with one simple specular highlight and a few teardrop-shaped droplets, not a realistic fluid. Light atmospheric fog in depth, gentle depth-of-field blur in the background, fine film grain, vignette.

PROMPT 2 — OPTION 1 "Dark Toon Diorama", FRAME B
[SHARED SETTING] + [FRAME B]. Same style as prompt 1: the character is a flat 2D cartoon cut-out with clean vector shapes, thick dark outline, simple expressive face (big readable eyes, clear eyebrows, simple mouth shape), flat colour with one shadow band, rim-lit by warm amber light; the background is a softly blurred low-poly painted 3D street diorama with ink outlines. Film grain, vignette.

PROMPT 3 — OPTION 2 "Toon Miniature 3D", FRAME A
[SHARED SETTING] + [FRAME A]. Style: a stylized 3D miniature set rendered like a toy diorama: simple rounded geometry, matte toon materials with flat colour and soft shadows, thick black outline shell around every object. Characters are simple 3D toy figures (peg-doll / bean-shaped body, round head, dot eyes, thick bold eyebrows, simple painted mouth, stick-like limbs, clothing as simple coloured shapes, hat defines identity). The molasses is a smooth glossy rounded mass with soft highlights, simple droplets. Slight bloom, soft depth of field like a tabletop miniature, cinematic but simple lighting.

PROMPT 4 — OPTION 2 "Toon Miniature 3D", FRAME B
[SHARED SETTING] + [FRAME B]. Same style as prompt 3: close-up of the 3D toy figure worker (round head, dot eyes made wide with fear, thick raised eyebrows, open oval mouth, flat cap, painted moustache), thick black outline, matte toon materials, warm amber light on one side, cool grey on the other, blurred miniature street behind.

PROMPT 5 — OPTION 3 "Painted Noir", FRAME A
[SHARED SETTING] + [FRAME A]. Style: 2D hand-painted animation frame made of 4–5 flat layers stacked in depth (foreground, character, wagon and wave, buildings, sky). Loose black ink linework with slightly wobbly hand-drawn lines, watercolour washes with visible bleeding edges, pooled pigment and paper grain, dark moody tones, the amber molasses as a rich glowing wet wash. Characters painted with simple shapes and few lines but expressive poses. Perspective is drawn, not rendered. Visible cotton-paper texture over the whole image.

PROMPT 6 — OPTION 3 "Painted Noir", FRAME B
[SHARED SETTING] + [FRAME B]. Same style as prompt 5: a hand-painted ink-and-watercolour close-up, expressive loose ink lines on the face (wide eyes, raised brows, open mouth), warm amber wash on one side of the face, cold blue-grey wash on the other, soft painted background with wet edges, paper texture.

PROMPT 7 — OPTION 4 "Engraved Thriller", FRAME A
[SHARED SETTING] + [FRAME A]. Style: a moving 1919 newspaper engraving: black ink line hatching and cross-hatching on aged cream newsprint paper, all tones built from line density, bold contour lines, slight ink spread and paper fibre texture, subtle halftone dots in the sky. Only ONE colour besides black and cream: the molasses printed in a flat dark amber spot colour, slightly off-register. Characters drawn as engraved line-art figures with hatched shading, dramatic composition like a period illustrated news front page (but no text).

PROMPT 8 — OPTION 4 "Engraved Thriller", FRAME B
[SHARED SETTING] + [FRAME B]. Same style as prompt 7: an engraved line-art portrait close-up of the worker, face shaded with fine hatching and cross-hatching, wide frightened eyes, black ink on cream newsprint, the amber spot colour only as a reflected glow along one side of his face, off-register by a few pixels, paper texture.
```

Catatan untuk menilai hasil:
- Image model hampir pasti **sedikit melebihi** kemampuan kode (detail lebih banyak, cahaya lebih halus). Nilai gaya dan "rasa"-nya, bukan detail kecilnya.
- Batas yang paling mungkin dilanggar model: tekstur terlalu kaya di opsi 1/2, dan wajah terlalu detail di semua opsi. Kalau terjadi, bayangkan versi yang lebih sederhana.
- Setelah Anda memilih, saya kalibrasi dengan **style frame asli dari kode**, lalu kita bandingkan berdampingan dengan preview AI-nya. Selisih di antara keduanya adalah ekspektasi yang jujur.
