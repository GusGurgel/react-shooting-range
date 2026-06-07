import "bootstrap/dist/css/bootstrap.min.css"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import { useState } from "react";
import Heart from "./Heart";
import HeartBar from "./HeartBar";


export default function GameHud({score = 0}) {
    return (
        <>
            <Col>
                <HeartBar heartCount="5" lifePercent="0.95" />
            </Col>
            <Col className="text-end">
                Score: {score}
            </Col>
        </>
    )
}