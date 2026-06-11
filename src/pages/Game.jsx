import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import GameHud from "../components/GameHud";
import GameCanvas from "../components/GameCanvas";
import { useState } from "react";

export default function Game() {
    const [score, setScore] = useState(0)
    const [lifePercent, setLifePercent] = useState(1)

    return (
        <>
            <Row>
                <GameCanvas score={score} setScore={setScore} setLifePercent={setLifePercent} lifePercent={lifePercent} />
            </Row>
            <Row>
                <GameHud score={score} lifePercent={lifePercent} />
            </Row>
        </>
    )
}