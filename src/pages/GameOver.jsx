import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router";
import skullImg from "../assets/skull.svg"
import { getHighScoreFromLocalStore } from "../utils";
import config from "../config";


export default function GameOver() {
    const navigate = useNavigate()
    const location = useLocation()
    const score = location?.state?.score || 0
    const difficulty = location?.state?.difficulty || "Medium"
    const highScore = getHighScoreFromLocalStore(difficulty)
    const isHighScore = highScore.value === score

    return (
        <Row>
            <Col lg="4" className='m-auto text-center'>
                <div className='display-1'>
                    Game Over!
                </div>
                <img src={skullImg} alt="skull" className="m-5" style={{ width: "200px" }} />
                <Alert className='display-6 d-flex justify-content-center align-items-center' variant='primary'>
                    <div>
                        Score: {score}
                    </div>
                    {
                        isHighScore &&
                        <div>
                            <Badge className='m-3' bg="warning" style={{ fontSize: "0.4em" }}>HighScore</Badge>
                        </div>
                    }
                </Alert>
                {
                    !isHighScore
                    &&
                    <Alert className='display-6' variant='info'>High Score: {highScore.value}</Alert>
                }
                <Alert className='display-6' variant={config.difficultyConfig[difficulty].colorVariant}>Difficulty: {difficulty}</Alert>
                <Button size="lg" variant='outline-primary' onClick={() => navigate("/game", { state: { difficulty } })}>Retry</Button>
            </Col>
        </Row>
    )
}