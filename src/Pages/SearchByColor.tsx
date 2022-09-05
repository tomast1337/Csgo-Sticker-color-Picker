import * as React from "react";
import { ColorPicker, StickerCard } from "../components";
import style from "./SearchByColor.module.scss";
import { stickerData } from "../data";
import { stickerType } from "../types";


export default () => {
    const [color, setColor] = React.useState("hsl(0, 0%, 0%)");

    const [filterTournament, setFilterTournament] = React.useState(true);
    const [filterFoil, setFilterFoil] = React.useState(true);
    const [filterHolo, setFilterHolo] = React.useState(true);
    const [filterGold, setFilterGold] = React.useState(true);
    const [filterGlitter, setFilterGlitter] = React.useState(true);
    const [filterLenticular, setFilterLenticular] = React.useState(true);
    const [hue, setHue] = React.useState(10);
    const [saturation, setSaturation] = React.useState(100);
    const [lightness, setLightness] = React.useState(50);


    const convert = (color: string) => {
        //grab the hue form the hls color
        const hue = color.split(",")[0].split("(")[1];
        return Number(hue);
    };

    React.useEffect(() => {
        //set title
        document.title = "CSGO Sticker Finder";
        console.log({ color });
    }, [hue, saturation, lightness, filterTournament, filterFoil, filterHolo, color]);

    return (
        <>
            <div className={style.title}>
                <h1>CSGO Sticker Finder</h1>
                <h2>by Nicolas Nery aka Tomast1337</h2>
                <h3>I don't own any of the images displayed here</h3>
            </div>
            <div className={style.picker} id="top">
                <h1>Select a color</h1>
                <ColorPicker setColor={setColor} />
                <h1>Filter</h1>
                <form>
                    <label style={{ color: "peru" }}>
                        <input type="checkbox" checked={!filterGlitter} onChange={() => setFilterGlitter(!filterGlitter)} />
                        <span />
                        (Glitter)
                    </label>
                    <label style={{ color: "linen" }}>
                        <input type="checkbox" checked={!filterLenticular} onChange={() => setFilterLenticular(!filterLenticular)} />
                        <span />
                        (Lenticular)
                    </label>
                    <label style={{ color: "fuchsia" }}>
                        <input type="checkbox" checked={!filterFoil} onChange={() => setFilterFoil(!filterFoil)} />
                        <span />
                        (Foil)
                    </label>
                    <label style={{ color: "slateblue" }}>
                        <input type="checkbox" checked={!filterHolo} onChange={() => setFilterHolo(!filterHolo)} />
                        <span />
                        (Holo)
                    </label>
                    <label style={{ color: "gold" }}>
                        <input type="checkbox" checked={!filterGold} onChange={() => setFilterGold(!filterGold)} />
                        <span />
                        (Gold)
                    </label>
                    <label style={{ color: "red" }}>
                        <input type="checkbox" checked={!filterTournament} onChange={() => setFilterTournament(!filterTournament)} />
                        <span />
                        Tournament
                    </label>
                </form>
                <h1>Sensitivity</h1>
                <form>
                    <label style={{ color: "peru" }}>
                        <input type="range" min="0" max="180" value={hue} onChange={(e) => setHue(Number(e.target.value))} />
                        <span />
                        Hue
                    </label>
                    <label style={{ color: "peru" }}>
                        <input type="range" min="0" max="100" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} />
                        <span />
                        Saturation
                    </label>
                    <label style={{ color: "peru" }}>
                        <input type="range" min="0" max="100" value={lightness} onChange={(e) => setLightness(Number(e.target.value))} />
                        <span />
                        Lightness
                    </label>
                </form>
            </div>
            <div className={style.SelectedStickers}>
                <h1>Selected The Stickers</h1>
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
                            const h: number = parseInt(color.split(",")[0].split("(")[1]);
                            const s: number = parseInt(color.split(",")[1].split("%")[0]);
                            const l: number = parseInt(color.split(",")[2].split(")")[0].split("%")[0]);
                            sticker.dominant_colors.forEach((color: string) => {
                                const stickerH = parseInt(color.split(",")[0].split("(")[1]);
                                const stickerS = parseInt(color.split(",")[1].split("%")[0]);
                                const stickerL = parseInt(color.split(",")[2].split(")")[0].split("%")[0]);

                                if (Math.abs(stickerH - h) < hue 
                                && Math.abs(stickerS - s) < saturation
                                && Math.abs(stickerL - l) < lightness) {
                                    diff = true;
                                }
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