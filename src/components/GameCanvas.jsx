import "bootstrap/dist/css/bootstrap.min.css"
import Col from 'react-bootstrap/Col';
import Gun from '../components/Gun'
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { getId } from "../utils";
import ShootDecal from "./ShootDecal";

export default function GameCanvas() {
    const location = useLocation()

    const mainColRef = useRef(null)

    const [mainColWidth, setWidth] = useState(0)
    const [mainColHeight, setHeight] = useState(0)
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const [canShoot, setCanShoot] = useState(true)
    const [shootDecals, setShootDecals] = useState([])

    console.log(shootDecals)

    const difficulty = location?.state?.difficulty || "Easy"

    const gunCooldownSeconds = 0.3
    const decalCooldownSeconds = 1

    /* Track main column width and height */
    useEffect(() => {
        const currentToObserve = mainColRef.current

        const resizeObserver = new ResizeObserver((event) => {
            setWidth(event[0].contentBoxSize[0].inlineSize);
            setHeight(event[0].contentBoxSize[0].blockSize);
        });

        if (currentToObserve) {
            resizeObserver.observe(currentToObserve);
        }

        return () => {
            resizeObserver.unobserve(currentToObserve)
        }
    }, []);

    /* Track mouse position relative to game canvas */
    const handleMouseMove = (event) => {
        if (mainColRef.current) {
            const rect = mainColRef.current.getBoundingClientRect();
            setMouseX(event.clientX - rect.left)
            setMouseY(event.clientY - rect.top)
        }
    }

    const addShootDecal = (x, y) => {
        const id = getId()

        setShootDecals(prevShootDecals => [...prevShootDecals, [x, y, id]])

        return id
    }

    const removeShootDecal = (id) => {
        setShootDecals(prevShootDecals => prevShootDecals.filter(val => val[2] !== id))
    }

    const handleMouseDown = () => {
        if (canShoot) {
            setCanShoot(false)
            const id = addShootDecal(mouseX, mouseY)

            setTimeout(() => {
                setCanShoot(true)
            }, gunCooldownSeconds * 1000)

            setTimeout(() => {
                removeShootDecal(id)
            }, decalCooldownSeconds * 1000)
        }
    }

    return (
        <Col
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            ref={mainColRef}
            className="border"
            style={{ height: "80vh", padding: "0px", position: "relative"}}
        >
            <Gun
                mouseX={mouseX}
                parentWidth={mainColWidth}
                parentHeight={mainColHeight}
                isShooting={!canShoot}
            />
            {
                shootDecals.map(([x, y, id]) => <ShootDecal x={x} y={y} key={id} />)
            }
        </Col>
    )
}