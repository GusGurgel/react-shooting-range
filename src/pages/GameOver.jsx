import Alert from 'react-bootstrap/Alert';
import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router';
import skullImg from "../assets/skull.svg"
import { getHighScoreFromLocalStore } from '../utils';


export default function GameOver() {
    const navigate = useNavigate()
    const location = useLocation()
    const score = location?.state?.score || 0
    const difficulty = location?.state?.difficulty || "Medium"
    const highScore = getHighScoreFromLocalStore(difficulty)

    return (
        <Row>
            <Col lg="4" className='m-auto text-center'>
                <div className='display-1'>
                    Game Over!
                </div>
                <img src={skullImg} alt="skull" className="m-4" style={{width: "250px"}}/>
                <Alert className='display-6' variant='primary'>Score: {score}</Alert>
                <Alert className='display-6' variant='primary'>High Score: {highScore.value}</Alert>
                <Alert className='display-6' variant='primary'>Difficulty: {difficulty}</Alert>
                <Button size="lg" onClick={() => navigate("/game",  {state: {difficulty}})}>Retry</Button>
            </Col>
        </Row>
    )
}