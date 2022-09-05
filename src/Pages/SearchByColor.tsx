import * as React from "react";
import { ColorPicker, StickerCard } from "../components";
import style from "./SearchByColor.module.scss";
import { stickerData } from "../data";
import { stickerType } from "../types";


export default () => {
    const [color, setColor] = React.useState("red");

    const [filterTournament, setFilterTournament] = React.useState(true);
    const [filterFoil, setFilterFoil] = React.useState(true);
    const [filterHolo, setFilterHolo] = React.useState(true);
    const [filterGold, setFilterGold] = React.useState(true);
    const [filterGlitter, setFilterGlitter] = React.useState(true);
    const [filterLenticular, setFilterLenticular] = React.useState(true);

    const convert = (color: string) => {
        //grab the hue form the hls color
        const hue = color.split(",")[0].split("(")[1];
        return Number(hue);
    };

    React.useEffect(() => {
    }, [filterTournament, filterFoil, filterHolo, color]);

    return (
        <>
            <div className={style.title}>
                <h1>CSGO Sticker Finder</h1>
                <h2>by Nicolas Nery aka Tomast1337</h2>
            </div>
            <div className={style.picker} id="top">
                <h1>Select a color</h1>
                <ColorPicker setColor={setColor} />
                <form>
                    <label>
                        <input type="checkbox" checked={!filterTournament} onChange={() => setFilterTournament(!filterTournament)} />
                        Tournament Stickers
                    </label>
                    <label>
                        <input type="checkbox" checked={!filterGlitter} onChange={() => setFilterGlitter(!filterGlitter)} />
                        (Glitter)
                    </label>
                    <label>
                        <input type="checkbox" checked={!filterLenticular} onChange={() => setFilterLenticular(!filterLenticular)} />
                        (Lenticular)
                    </label>
                    <label>
                        <input type="checkbox" checked={!filterFoil} onChange={() => setFilterFoil(!filterFoil)} />
                        (Foil)
                    </label>
                    <label>
                        <input type="checkbox" checked={!filterHolo} onChange={() => setFilterHolo(!filterHolo)} />
                        (Holo)
                    </label>
                    <label>
                        <input type="checkbox" checked={!filterGold} onChange={() => setFilterGold(!filterGold)} />
                        (Gold)
                    </label>
                </form>
            </div>
            <div className={style.SelectedStickers}>
                <h1>Selected Stickers</h1>
                <div className={style.stickers}>
                    {
                        stickerData.map((sticker) => {
                            if ((sticker.type === "tournament") && filterTournament) return null;
                            if (sticker.name.includes("(Foil)") && filterFoil) return null;
                            if (sticker.name.includes("(Holo)") && filterHolo) return null;
                            if (sticker.name.includes("(Gold)") && filterGold) return null;
                            if (sticker.name.includes("(Glitter)") && filterGlitter) return null;
                            if (sticker.name.includes("(Lenticular)") && filterLenticular) return null;

                            let diff = false;
                            const hue = convert(color);
                            sticker.dominant_colors.forEach((color: number) => {
                                if (Math.abs(hue - color) < 20) diff = true;
                            });
                            return diff ? <StickerCard sticker={sticker} /> : null;
                        })
                    }
                </div>
            </div>
            <div className={style.goToTop}>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to the top</button>
            </div>
        </>
    )
};