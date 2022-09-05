import * as React from "react";
import { ColorPicker } from "../components";
import style from "./SearchByColor.module.scss";
export default () => {
    const [color, setColor] = React.useState("red");

    React.useEffect(() => {
        //load color from local storage
        document.body.style.backgroundColor = color;
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
            </div>
        </>
    )
};