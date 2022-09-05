import json
import time

import matplotlib.image as img
import pandas as pd
from scipy.cluster.vq import kmeans, whiten
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

def RGB2HSL(rgb):
    r, g, b = rgb
    r, g, b = r , g , b
    mx = max(r, g, b)
    mn = min(r, g, b)
    df = mx - mn
    if mx == mn:
        h = 0
    elif mx == r:
        h = (60 * ((g - b) / df) + 360) % 360
    elif mx == g:
        h = (60 * ((b - r) / df) + 120) % 360
    elif mx == b:
        h = (60 * ((r - g) / df) + 240) % 360
    if mx == 0:
        s = 0
    else:
        s = (df / mx) * 100
    l = (mx + mn) / 2 * 100
    return h, s, l

def get_img_dominant_colors(img_path: str) -> list[(int, int, int)]:
    image = img.imread(img_path)
    r, g, b, a = [], [], [], []
    for row in image:
        for temp_r, temp_g, temp_b, temp_a in row:
            r.append(temp_r)
            g.append(temp_g)
            b.append(temp_b)
            a.append(temp_a)
    df = pd.DataFrame({'red': r, 'green': g, 'blue': b, 'alpha': a})
    # remove all alpha values that are less than 0.5
    df = df[df['alpha'] > 0.9]
    # remove alpha column
    df = df.drop('alpha', 1)
    df['scaled_color_red'] = whiten(df['red'])
    df['scaled_color_blue'] = whiten(df['blue'])
    df['scaled_color_green'] = whiten(df['green'])

    cluster_centers, _ = kmeans(
        df[['scaled_color_red', 'scaled_color_blue', 'scaled_color_green']], 3)
    dominant_colors = []
    red_std, green_std, blue_std = df[['red', 'green', 'blue']].std()
    for cluster_center in cluster_centers:
        red_scaled, green_scaled, blue_scaled = cluster_center
        dominant_colors.append((red_scaled * red_std , green_scaled * green_std , blue_scaled * blue_std ))
    return dominant_colors

def HSL2str(hsl):
    h, s, l = hsl
    return f"hsl({h}, {s}%, {l}%)"
