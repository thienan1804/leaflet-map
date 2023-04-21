import React from "react";
import { Overlay } from "react-leaflet";

const ImageOverlay = () => {
    const bounds = [
        [10.968, 106.843],
        [10.962, 106.862],
    ];

    return (
        <Overlay bounds={bounds}>
            <img src="path/to/your/image.jpg" alt="Overlay" />
        </Overlay>
    );
};

export default ImageOverlay;