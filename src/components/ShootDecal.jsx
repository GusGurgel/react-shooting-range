import "bootstrap/dist/css/bootstrap.min.css"
import ShootDecalImg from "../assets/shoot_decal.png"
import config from "../config"


export default function ShootDecal({x, y}) {
    const imgWidth = config.shootDecalSize.width
    const imgHeight = config.shootDecalSize.height

    return (
        <img
            src={ShootDecalImg}
            className="unselectable no-pointer-events"
            style={{
                height: `${imgWidth}px`,
                width: `${imgHeight}px`,
                position: "absolute",
                left: x - imgWidth/2,
                top: y - imgHeight/2,
                zIndex: 2
            }}
        />
    )
}