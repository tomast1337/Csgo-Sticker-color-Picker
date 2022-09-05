import * as React from "react";
import style from "./stickerCard.module.scss";
import { stickerType } from "../types/stickerType";

export default (props: { sticker: stickerType }) => {
    React.useEffect(() => {
        //apply the animation

    }, []);

    return (
        <div className={style.card}>
            <a href={
                `https://steamcommunity.com/market/search?q=${props.sticker.name.replace(" ", "%20")}`
            } target="_blank">
                <h1>{props.sticker.name}</h1>
                <img src={props.sticker.image_url} alt={props.sticker.name} />
                <div className={style.coloInfo}>
                    <span style={{
                        backgroundColor: `hsl(${props.sticker.dominant_colors[0]}, ${60}%, ${50}%)`
                    }} />
                    <span style={{
                        backgroundColor: `hsl(${props.sticker.dominant_colors[1]}, ${60}%, ${50}%)`
                    }} />
                    <span style={{
                        backgroundColor: `hsl(${props.sticker.dominant_colors[2]}, ${60}%, ${50}%)`
                    }} />
                </div>
            </a>
        </div>
    )
}