
import matplotlib.image as img
from scipy.cluster.vq import whiten
from scipy.cluster.vq import kmeans
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

def get_img_dominant_colors(img_path:str) -> list[(int, int, int)]:
    image = img.imread(img_path)
    time.sleep(.2)
    r, g, b, a = [] , [], [], [] 
    for row in image:
        for temp_r, temp_g, temp_b, temp_a in row:
            r.append(temp_r)
            g.append(temp_g)
            b.append(temp_b)
            a.append(temp_a)
    df = pd.DataFrame({'red' : r,'green' : g,'blue' : b,'alpha' : a})
    #remove all alpha values that are less than 0.5
    df = df[df['alpha'] > 0.9]
    #remove alpha column
    df = df.drop('alpha', 1)
    df['scaled_color_red'] = whiten(df['red'])
    df['scaled_color_blue'] = whiten(df['blue'])
    df['scaled_color_green'] = whiten(df['green'])

    cluster_centers, _ = kmeans(df[['scaled_color_red','scaled_color_blue','scaled_color_green']], 3)
    dominant_colors = []
    red_std, green_std, blue_std = df[['red','green','blue']].std()
    for cluster_center in cluster_centers:
        red_scaled, green_scaled, blue_scaled = cluster_center
        dominant_colors.append((red_scaled * red_std, green_scaled * green_std, blue_scaled * blue_std))
    return dominant_colors

class Sticker:
    def __init__(self, name, image_url,type):
        self.name = name
        self.image_url = image_url
        self.type = type
    
    def get_img_rgb(self) -> list[(int, int, int)]:
        """Get the RGB values of the sticker image."""
        return get_img_dominant_colors(self.image_url)


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
    images = driver.find_elements(By.XPATH, "//img[@class='img-responsive center-block']")
    for image in images:
        sticker = Sticker(image.get_attribute("alt"), image.get_attribute("src"), "regular")
        print(f"Registrando {sticker.name}")
        stickers.append(sticker)
    time.sleep(1)
print("Coletado todos os adesivos regulares.")

# Navigate through all the sticker pages
for page in range(1, 83):
    url = f"https://csgostash.com/stickers/tournament?page={page}"
    driver.get(url)
    # get all elements with class "img-responsive center-block"
    images = driver.find_elements(By.XPATH, "//img[@class='img-responsive center-block']")
    for image in images:
        sticker = Sticker(image.get_attribute("alt"), image.get_attribute("src") , "tournament")
        print(f"Registrando {sticker.name}")
        stickers.append(sticker)
    time.sleep(1)
print("Coletado todos os adesivos de torneios.")

#close the driver
driver.close()

#save all stickers to a json file
import json
with open("csgo_stickers_data.json", "w") as f:
    json.dump([sticker._to_json() for sticker in stickers], f, indent=4)

print("Arquivo ,csgo_stickers_data.json, salvo com sucesso.")