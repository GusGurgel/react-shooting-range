import "bootstrap/dist/css/bootstrap.min.css"
import Col from 'react-bootstrap/Col';
import Gun from '../components/Gun'
import { useLocation, useNavigate } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { clamp, getId } from "../utils";
import ShootDecal from "./ShootDecal";
import Target from "./Target";
import config from "../config";

export default function GameCanvas({ score, setScore, setLifePercent }) {
    const location = useLocation()
    const navigate = useNavigate()

    const mainColRef = useRef(null)

    const [mainColWidth, setWidth] = useState(0)
    const [mainColHeight, setHeight] = useState(0)
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const [canShoot, setCanShoot] = useState(true)
    const [shootDecals, setShootDecals] = useState([])
    const [targets, setTargets] = useState([])

    const difficulty = location?.state?.difficulty || "Medium"

    const gunCooldownSeconds = 0.3
    const decalCooldownSeconds = 1
    const targetLifeTimeSeconds = 2
    const targetSpawnCooldown = 1
    const lifeDecrementPerTargetTimeout = 0.5

    const removeTarget = useCallback((targetId) => {
        setTargets(
            (oldTargets) => {
                return oldTargets.filter(val => val[2] !== targetId)
            }
        )
    }, [])

    const addTarget = useCallback((x, y) => {
        const targetId = getId()

        const timeoutId = setTimeout(() => {
            removeTarget(targetId)
            setLifePercent(oldLifePercent => {
                if (oldLifePercent - lifeDecrementPerTargetTimeout <= 0) {
                    navigate("/gameover", { state: { ...location?.state, score } })
                }
                return oldLifePercent - lifeDecrementPerTargetTimeout
            })
        }, targetLifeTimeSeconds * 1000)

        setTargets((oldTargets) => [...oldTargets, [x, y, targetId, timeoutId]])

        return targetId;
    }, [removeTarget, setLifePercent, setTargets, location, navigate, score])

    /* Track main column width and height */
    /* Spawn targets */
    useEffect(() => {
        const currentToObserve = mainColRef.current

        const resizeObserver = new ResizeObserver((event) => {
            setWidth(event[0].contentBoxSize[0].inlineSize);
            setHeight(event[0].contentBoxSize[0].blockSize);
        });

        if (currentToObserve) {
            resizeObserver.observe(currentToObserve);
        }

        const spawnTargetIntervalId = setInterval(() => {
            const x = clamp(Math.floor((Math.random() * mainColWidth)), config.targetSize.width, mainColWidth - config.targetSize.width)
            const y = clamp(Math.floor((Math.random() * mainColHeight)), config.targetSize.height, mainColHeight - config.gunSize.height - 10)

            addTarget(x, y)
        }, targetSpawnCooldown * 1000)

        return () => {
            resizeObserver.unobserve(currentToObserve)
            clearInterval(spawnTargetIntervalId)
        }
    }, [mainColHeight, mainColWidth, addTarget]);

    /* Track mouse position relative to game canvas */
    const handleMouseMove = (event) => {
        if (mainColRef.current) {
            const rect = mainColRef.current.getBoundingClientRect();
            setMouseX(event.clientX - rect.left)
            setMouseY(event.clientY - rect.top)
        }
    }

    const addShootDecal = useCallback((x, y) => {
        const id = getId()

        setShootDecals(prevShootDecals => [...prevShootDecals, [x, y, id]])

        return id
    }, [])

    const removeShootDecal = useCallback((id) => {
        setShootDecals(prevShootDecals => prevShootDecals.filter(val => val[2] !== id))
    }, [])

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
            style={{ height: "80vh", padding: "0px", position: "relative" }}
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
            {
                targets.map(([x, y, id, timeoutId]) => {
                    return <Target
                        x={x}
                        y={y}
                        key={id}
                        onMouseDown={() => {
                            if (!canShoot) {
                                return
                            }
                            clearTimeout(timeoutId)
                            setScore(oldScore => oldScore + 1)
                            removeTarget(id)
                        }}
                    />
                })
            }
        </Col>
    )
}