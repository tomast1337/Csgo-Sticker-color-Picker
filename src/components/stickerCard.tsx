import * as React from "react";
import style from "./stickerCard.module.scss";
import { stickerType } from "../types/stickerType";

export default (props: { sticker: stickerType }) => {

    const [tiltDeg, setTiltDeg] = React.useState({ x: 0, y: 0 });
    const [lightPos, setLightPos] = React.useState({ x: 0, y: 0 });

    const TiltEffect = (e: React.MouseEvent<HTMLDivElement>) => {
        // get mouse position
        const { left, top } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        // get width and height of element
        const { offsetWidth: width, offsetHeight: height } = e.currentTarget;
        // get the center of the div
        const centerX = width / 2;
        const centerY = height / 2;

        const factorX = (centerX - x) / width * 2; // Clap the value between -1 and 1
        const factorY = (centerY - y) / height * 2; // Clap the value between -1 and 1

        const maxAngle = 360 / 20;
        // set the angle
        const degX = factorX * maxAngle;
        const degY = factorY * maxAngle;

        setTiltDeg({
            x: degX,
            y: degY
        });

        // lightPos equal to the mouse position
        const lightPosX = x / width * 100;
        const lightPosY = y / height * 100;
        setLightPos({
            x: lightPosX,
            y: lightPosY
        });

    };
    const MouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        setTiltDeg({ x: 0, y: 0 });
        setLightPos({ x: 0, y: 0 });
    };

    return (
        <>
            <div className={style.card}
                onMouseMove={TiltEffect}
                onMouseLeave={MouseLeave}
                style={{
                    transform:
                        `rotateX(${tiltDeg.y}deg)
                 rotateY(${tiltDeg.x}deg)`,
                }}>
                <a href={
                    `https://steamcommunity.com/market/search?q=${props.sticker.name.replace(" ", "%20")}`
                } target="_blank">
                    <h1
                    style={{
                        background: `linear-gradient(120deg, ${props.sticker.dominant_colors[1]} 0%, ${props.sticker.dominant_colors[0]} 50% , ${props.sticker.dominant_colors[2]} 100%)`,
                        WebkitBackgroundClip: "text",
                    }}>
                        {props.sticker.name}
                    </h1>

                    <span
                        className={style.spotLight}
                        style={{
                            transform: `translate(${lightPos.x}%, ${lightPos.y}%)`,
                            display: lightPos.x === 0 && lightPos.y === 0 ? "none" : "inline-block",
                            background: `radial-gradient(circle,
                                rgba(255, 255, 255, ${0.2}) 0%,
                                rgba(255, 255, 255, 0) 80%)`
                        }} />

                    <img
                        src={props.sticker.image_url}
                        alt={props.sticker.name} />
                    <div className={style.coloInfo}>
                        {
                            props.sticker.dominant_colors.map((color:string, index:number) => (
                                <span 
                                key={index}
                                style={{
                                    backgroundColor: color,
                                }} />
                            ))
                                
                        }
                    </div>
                </a>
            </div>
        </>
    )
}