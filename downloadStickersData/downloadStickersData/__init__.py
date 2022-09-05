
import json
import time

import matplotlib.image as img
import pandas as pd
from scipy.cluster.vq import kmeans, whiten
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from colorstuff import RGB2HSL,get_img_dominant_colors,HSL2str

class Sticker:
    def __init__(self, name, image_url, type):
        self.name = name
        self.image_url = image_url
        self.type = type

    def get_img_rgb(self) -> list[(int, int, int)]:
        """Get the RGB values of the sticker image."""
        lits = get_img_dominant_colors(self.image_url)
        lit = [RGB2HSL(i) for i in lits]
        return [HSL2str(i) for i in lit]

    def _to_json(self):
        return {
            "name": self.name,
            "image_url": self.image_url,
            "type": self.type,
            "dominant_colors": self.get_img_rgb()
        }


driver = webdriver.Chrome()
stickers: list[Sticker] = []

# Navigate through all the sticker pages
for page in range(1, 13):
    url = f"https://csgostash.com/stickers/regular?page={page}"
    driver.get(url)
    # get all elements with class "img-responsive center-block"
    images = driver.find_elements(
        By.XPATH, "//img[@class='img-responsive center-block']")
    for image in images:
        sticker = Sticker(image.get_attribute("alt"),
                          image.get_attribute("src"), "regular")
        print(f"Registrando {sticker.name}")
        stickers.append(sticker)
print("Coletado todos os adesivos regulares.")


# Navigate through all the sticker pages
for page in range(1, 83):
    url = f"https://csgostash.com/stickers/tournament?page={page}"
    driver.get(url)
    # get all elements with class "img-responsive center-block"
    images = driver.find_elements(
        By.XPATH, "//img[@class='img-responsive center-block']")
    for image in images:
        sticker = Sticker(image.get_attribute("alt"),
                          image.get_attribute("src"), "tournament")
        print(f"Registrando {sticker.name}")
        stickers.append(sticker)
print("Coletado todos os adesivos de torneios.")

# close the driver
driver.close()


# save all stickers to a json file
with open("csgo_stickers_data.json", "w") as f:
    json.dump([sticker._to_json() for sticker in stickers], f, indent=1)

print("Arquivo, csgo_stickers_data.json, salvo com sucesso.")
