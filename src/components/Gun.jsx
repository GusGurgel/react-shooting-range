import "bootstrap/dist/css/bootstrap.min.css"
import gunIdle from "../assets/gun_1.png"
import gunFired from "../assets/gun_2.png"
import { clamp } from "../utils";
import config from "../config";
import { useRef } from "react";


export default function Gun({ mouseX, parentWidth, parentHeight, isShooting=false }) {
    const gunImageRef = useRef(null)
    const imgHeight = config.gunSize.width
    const imgWidth = config.gunSize.height
    const offsetMouseX = -73
    const minMouseX = 0
    const maxMouseX = parentWidth - (imgWidth - (10 /* Offset to compensate image size */))

    return (
        <img
            ref={gunImageRef}
            src={isShooting ? gunFired : gunIdle}
            alt="gun"
            className="unselectable no-pointer-events"
            style={{
                height: `${imgHeight}px`,
                width: `${imgWidth}px`,
                position: "absolute",
                left: clamp(mouseX + offsetMouseX, minMouseX, maxMouseX),
                top: parentHeight - imgHeight,
                zIndex: 4
            }}
        />
    )
}