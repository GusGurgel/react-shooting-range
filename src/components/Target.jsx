import "bootstrap/dist/css/bootstrap.min.css"
import TargetImg from "../assets/target.png"
import config from "../config"


export default function Target({x, y, onMouseDown}) {
    const imgWidth = config.targetSize.width
    const imgHeight = config.targetSize.height

    return (
        <img
            src={TargetImg}
            className="unselectable"
            onMouseDown={onMouseDown}
            draggable="false"
            style={{
                height: `${imgWidth}px`,
                width: `${imgHeight}px`,
                position: "absolute",
                left: x - imgWidth/2,
                top: y - imgHeight/2,
                zIndex: 1
            }}
        />
    )
}