import "bootstrap/dist/css/bootstrap.min.css"
import Row from "react-bootstrap/Row";
import ScoresTable from "../components/ScoresTable";
import { getScoresFromLocalStore } from "../utils";


export default function Scores() {
    const scores = getScoresFromLocalStore().sort(
        (a, b) => { 
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
    )

    return (
        <Row>
            <ScoresTable scores={scores} />
        </Row>
    )
}