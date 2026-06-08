import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Gun from '../components/Gun'
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import GameHud from "../components/GameHud";
import GameCanvas from "../components/GameCanvas";

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