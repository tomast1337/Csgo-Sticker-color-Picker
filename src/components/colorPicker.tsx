import * as React from "react";
import style from "./colorPicker.module.scss";
export default ({ setColor }: any) => {
    const [hue, setHue] = React.useState(180);
    const [saturation, setSaturation] = React.useState(95);
    const [lightness, setLightness] = React.useState(50);

    React.useEffect(() => {
        setColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }, [hue, saturation, lightness]);

    return (
        <>
            <div className={style.colorPicker}>
                <div className={style.hue} onMouseUp={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    setHue(Math.round(x / rect.width * 360));
                    setColor(`hsl(${Math.round(x / rect.width * 360)}, ${saturation}%, ${lightness}%)`);
                }}>
                    <div className={style.huePointer} style={{
                        left: `${hue / 360 * 100}%`,
                        backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`
                    }} />
                </div>
                <div className={style.saturation} style={{
                    backgroundImage: `linear-gradient(to right, hsl(${hue}, 0%, 50%), hsl(${hue}, 100%, 50%))`
                }} onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    setSaturation(Math.round(x / rect.width * 100));
                    setColor(`hsl(${hue}, ${Math.round(x / rect.width * 100)}%, ${lightness}%)`);
                }} >
                    <div className={style.saturationPointer} style={{
                        left: `${saturation}%`,
                        backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`
                    }} />
                </div>
                <div className={style.lightness} style={{
                    backgroundImage: `linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 50%), hsl(${hue}, ${saturation}%, 100%))`
                }} onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    setLightness(Math.round(x / rect.width * 100));
                    setColor(`hsl(${hue}, ${saturation}%, ${Math.round(x / rect.width * 100)}%)`);
                }} >
                    <div className={style.lightnessPointer} style={{
                        left: `${lightness}%`,
                        backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`
                    }} />
                </div>
            </div>
        </>
    )
}