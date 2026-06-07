import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Gun from '../components/Gun'
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import GameHud from "../components/GameHud";
import GameCanvas from "../components/GameCanvas";

export default function Game() {
    return (
        <>
            <Row>
                <GameCanvas />
            </Row>
            <Row>
                <GameHud />
            </Row>
        </>
    )
}