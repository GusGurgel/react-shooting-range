import "bootstrap/dist/css/bootstrap.min.css"
import Col from 'react-bootstrap/Col';
import Gun from '../components/Gun'
import { useLocation, useNavigate } from "react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addScoreToLocalStore, clamp, getId, pickRandom } from "../utils";
import ShootDecal from "./ShootDecal";
import Target from "./Target";
import config from "../config";
import shootSound1 from "../assets/shoot1.ogg"
import shootSound2 from "../assets/shoot2.ogg"
import shootSound3 from "../assets/shoot3.ogg"
import targetMissedSound from "../assets/target-missed.ogg"
import useAudioPlayer from "../hooks/useAudioPlayer";

export default function GameCanvas({ score, setScore, lifePercent, setLifePercent }) {
    const playShoot1 = useAudioPlayer(shootSound1)
    const playShoot2 = useAudioPlayer(shootSound2)
    const playShoot3 = useAudioPlayer(shootSound3)
    const playTargetMissedSound = useAudioPlayer(targetMissedSound)

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

    const targetLifeTimeSeconds = config.difficultyConfig[difficulty].targetLifeTimeSeconds
    const targetSpawnCooldown = config.difficultyConfig[difficulty].targetSpawnCooldown
    const lifeDecrementPerTargetTimeout = config.difficultyConfig[difficulty].lifeDecrementPerTargetTimeout

    const removeTarget = useCallback((targetId) => {
        setTargets(
            (oldTargets) => {
                return oldTargets.filter(val => val[2] !== targetId)
            }
        )
    }, [])

    useEffect(() => {
        if (lifePercent <= 0) {
            addScoreToLocalStore(score, difficulty)
            navigate("/gameover", { state: { ...location?.state, score } })
        }
    }, [lifePercent, location, navigate, score, difficulty])

    const addTarget = useCallback((x, y) => {
        const targetId = getId()

        const timeoutId = setTimeout(() => {
            removeTarget(targetId)
            playTargetMissedSound()
            setLifePercent(oldLifePercent => {
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
            pickRandom([playShoot1, playShoot2, playShoot3])()
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