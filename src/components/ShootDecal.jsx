import "bootstrap/dist/css/bootstrap.min.css"
import ShootDecalImg from "../assets/shoot_decal.png"


export default function ShootDecal({x, y}) {
    const imgWidth = 30
    const imgHeight = 30

    return (
        <img
            src={ShootDecalImg}
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