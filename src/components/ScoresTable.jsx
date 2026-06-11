import "bootstrap/dist/css/bootstrap.min.css"
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { getFormattedDate } from "../utils";

function ScoresTableHeader() {
    return (
        <thead>
            <tr>
                <th>
                    #
                </th>
                <th>
                    Date
                </th>
                <th>
                    Difficulty
                </th>
                <th>
                    Score
                </th>
            </tr>
        </thead>
    )
}

function ScoresTableRow({ index, date, difficulty, score }) {
    return (
        <tr>
            <td>
                {index}
            </td>
            <td>
                {date}
            </td>
            <td>
                {difficulty}
            </td>
            <td>
                {score}
            </td>
        </tr>
    )
}

export default function ScoresTable({ scores }) {
    return (
        <Col lg="6" className="m-auto" style={{ height: "80vh", overflowY: "auto"}}>
            <Table>
                <ScoresTableHeader />
                <tbody>
                    {
                        scores.map((score, index) => {
                            return (
                                <ScoresTableRow
                                    key={index}
                                    index={scores.length - index}
                                    date={getFormattedDate(new Date(score.date))}
                                    difficulty={score.difficulty}
                                    score={score.value}
                                />
                            )
                        })
                    }
                </tbody>
            </Table>
        </Col>
    )
}