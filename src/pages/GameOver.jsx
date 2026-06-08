import Alert from 'react-bootstrap/Alert';
import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router';


export default function GameOver() {
    const location = useLocation()
    const score = location?.state?.score || 0
    const difficulty = location?.state?.difficulty || "Medium"

    return (
        <Row>
            <Col>
                <Alert variant='danger'>GameOver, our score: {score}</Alert>
                <Alert variant='danger'>Difficulty: {difficulty}</Alert>
            </Col>
        </Row>
    )
}