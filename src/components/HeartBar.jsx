import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { clamp } from "../utils";
import Heart from "./Heart";


/* lifePercent is a float number varying between 0 and 1 */
export default function HeartBar({heartCount = 5, lifePercent = 0}) {
    heartCount = clamp(heartCount, 1, 20)
    lifePercent = clamp(lifePercent, 0, 1)
    const heartList = []

    for (let i = 0; i < heartCount; i++) {
        heartList.push(clamp((lifePercent * heartCount) - i, 0, 1))
    }

    return (
        heartList.map((HeartLevel, index) => <Heart key={index} level={HeartLevel} />)
    )
}