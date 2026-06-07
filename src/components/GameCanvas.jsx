import "bootstrap/dist/css/bootstrap.min.css"
import Col from 'react-bootstrap/Col';
import Gun from '../components/Gun'
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";

export default function GameCanvas() {
    const location = useLocation()

    const mainColRef = useRef(null)

    const [mainColWidth, setWidth] = useState(0);
    const [mainColHeight, setHeight] = useState(0);
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)

    const difficulty = location?.state?.difficulty || "Easy"

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
    const handleMouseMove = () => {
        if (mainColRef.current) {
            const rect = mainColRef.current.getBoundingClientRect();
            setMouseX(event.clientX - rect.left)
            setMouseY(event.clientY - rect.top)
        }
    }

    return (
        <Col
            onMouseMove={handleMouseMove}
            ref={mainColRef}
            className="border"
            style={{ height: "80vh", padding: "0px" }}
        >
            <Gun
                mouseX={mouseX}
                parentWidth={mainColWidth}
                parentHeight={mainColHeight}
            />
        </Col>
    )
}