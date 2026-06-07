import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { clamp } from "../utils";


/* level is a float number varying between 0 and 1 */
export default function Heart({ level = 1 }) {
    level = 1 - clamp(level, 0, 1)
    const heartIndex = Math.floor((level * 5) + 1)

    return (
        <img
            src={`/hearts/heart_0${heartIndex}.png`}
            alt="gun"
            style={{
                height: "30px",
                imgWidth: "30px",
                imageRendering: "pixelated"
            }}
        />
    )
}