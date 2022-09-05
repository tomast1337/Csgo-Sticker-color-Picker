type stickerData = {
    "name": string;
    "image_url": string;
    "type": string;
    "dominant_colors": [
        [number, number, number],
        [number, number, number],
        [number, number, number],
    ];
};

type stickerDataArray = stickerData[];

export { stickerData, stickerDataArray };