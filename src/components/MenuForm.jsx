import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import { useState } from "react";


export default function MenuForm() {
    const navigate = useNavigate()
    const [difficulty, setDifficulty] = useState("Easy")

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate("/game", {state: {difficulty}})
    }

    const handleDifficultySelectChange = (e) => {
        setDifficulty(e.target.value)
    }

    return (
        <Col lg="4" className="m-auto">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Select value={difficulty} onChange={handleDifficultySelectChange} aria-label="Select the difficulty of the game">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="outline-success" type="submit">
                    Play
                </Button>
            </Form>
        </Col>
    )
}