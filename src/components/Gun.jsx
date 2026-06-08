import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import gunIdle from "../assets/gun_1.png"
import gunFired from "../assets/gun_2.png"
import { clamp } from "../utils";


export default function Gun({ mouseX, parentWidth, parentHeight, isShooting=false }) {
    const gunImageRef = useRef(null)
    const imgHeight = 150
    const imgWidth = 150
    const offsetMouseX = -73
    const minMouseX = 0
    const maxMouseX = parentWidth - (imgWidth - (10 /* Offset to compensate image size */))

    return (
        <img
            ref={gunImageRef}
            src={isShooting ? gunFired : gunIdle}
            alt="gun"
            className="unselectable"
            style={{
                height: `${imgHeight}px`,
                width: `${imgWidth}px`,
                position: "absolute",
                left: clamp(mouseX + offsetMouseX, minMouseX, maxMouseX),
                top: parentHeight - imgHeight
            }}
        />
    )
}