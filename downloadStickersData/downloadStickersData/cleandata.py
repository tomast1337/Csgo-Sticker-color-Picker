import json

import matplotlib.image as img
import pandas as pd
from scipy.cluster.vq import kmeans, whiten


def RGB_HUE(r: int, g: int, b: int) -> int:
    r, g, b = r, g, b
    Cmax = max(r, g, b)
    Cmin = min(r, g, b)
    delta = Cmax - Cmin
    if delta == 0:
        H = 0
    elif Cmax == r:
        H = 60 * (((g - b) / delta) % 6)
    elif Cmax == g:
        H = 60 * (((b - r) / delta) + 2)
    elif Cmax == b:
        H = 60 * (((r - g) / delta) + 4)
    return H

data = []
# open csgo_stickers_data.json
with open('csgo_stickers_data.json') as f:
    data = json.load(f)
    for sticker in data:
        for index,color in enumerate(sticker['dominant_colors']):
            sticker['dominant_colors'][index] = RGB_HUE(color[0],color[1],color[2])
# save csgo_stickers_data.json
with open('csgo_stickers_data.json', 'w') as f:
    json.dump(data, f , indent=2)

