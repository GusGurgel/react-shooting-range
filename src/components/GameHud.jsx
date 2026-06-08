import "bootstrap/dist/css/bootstrap.min.css"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import { useState } from "react";
import Heart from "./Heart";
import HeartBar from "./HeartBar";


export default function GameHud({score = 0, lifePercent=1}) {
    return (
        <>
            <Col>
                <HeartBar heartCount="5" lifePercent={lifePercent} />
            </Col>
            <Col className="text-end fs-4">
                Score: <span className="text-primary">{score}</span>
            </Col>
        </>
    )
}