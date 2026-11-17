"""burger_tipis = burger_tebal with the patty band squeezed (same bun, same tint) — the thinner 1/4-pound burger (#009 review v1)."""
import os
import numpy as np
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); AI = os.path.join(H, '..', 'ai')
Y0, Y1, K = 1160, 1395, 0.45          # patty rows in the 2400x1792 print, kept fraction
def squeeze(im, fill):
    a = np.asarray(im); band = Image.fromarray(a[Y0:Y1]).resize((a.shape[1], int((Y1 - Y0) * K)), Image.LANCZOS)
    out = np.concatenate([a[:Y0], np.asarray(band), a[Y1:]], 0)
    pad = np.empty((a.shape[0] - out.shape[0],) + a.shape[1:], a.dtype); pad[...] = fill
    return Image.fromarray(np.concatenate([out, pad], 0))
squeeze(Image.open(os.path.join(AI, 'burger_tebal.jpg')).convert('RGB'), 255).save(os.path.join(AI, 'burger_tipis.jpg'), quality=92)
squeeze(Image.open(os.path.join(AI, 'burger_tebal.tint.png')).convert('RGBA'), 0).save(os.path.join(AI, 'burger_tipis.tint.png'))
print('ok')
