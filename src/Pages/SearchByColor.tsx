import * as React from "react";
import { ColorPicker, StickerCard } from "../components";
import style from "./SearchByColor.module.scss";
import { stickerData } from "../data";
import { verify } from "crypto";
import { stickerType } from "../types";


export default () => {
    const [color, setColor] = React.useState("red");

    const [selectedStickers, setSelectedStickers] = React.useState<stickerType[]>([]);

    const convert = (color: string) => {
        //grab the hue form the hls color
        const hue = color.split(",")[0].split("(")[1];
        return Number(hue);
    }

    const filterStickers = (color: string) => {
        const newData = [] as stickerType[];
        stickerData.map(sticker => {
            const selectedHUE = convert(color);
            sticker.dominant_colors.forEach((color: number) => {
                const diff = Math.round(Math.abs(selectedHUE - Math.round(color)));
                if (diff < 1) {
                    newData.push(sticker);
                }
            });
        })
        setSelectedStickers(newData);
    }

    React.useEffect(() => {
        //load color from local storage
        filterStickers(color);
    }, [color]);

    return (
        <>
            <div className={style.title}>
                <h1>CSGO Sticker Selector</h1>
                <h2>by Nicolas Nery aka Tomast1337</h2>
            </div>
            <div className={style.picker}>
                <h1>Select a color</h1>
                <ColorPicker setColor={setColor} />
            </div>
            <div className={style.SelectedStickers}>
                <h1>Selected Stickers</h1>
                <div className={style.stickers}>
                    {selectedStickers.map((sticker,key) => {
                        return <StickerCard key={sticker.name} sticker={sticker} />
                    })}
                </div>
            </div>
        </>
    )
};