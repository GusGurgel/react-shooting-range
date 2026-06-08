import "bootstrap/dist/css/bootstrap.min.css"
import TargetImg from "../assets/target.png"


export default function Target({x, y}) {
    const imgWidth = 30
    const imgHeight = 30

    return (
        <img
            src={TargetImg}
            className="unselectable"
            style={{
                height: `${imgWidth}px`,
                width: `${imgHeight}px`,
                position: "absolute",
                left: x - imgWidth/2,
                top: y - imgHeight/2
            }}
        />
    )
}