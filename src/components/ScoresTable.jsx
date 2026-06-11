import "bootstrap/dist/css/bootstrap.min.css"
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { getFormattedDate, getHighScoreFromLocalStore } from "../utils";
import config from "../config";

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

function ScoresTableRow({ index, date, difficulty, score, isHighScore = false }) {
    return (
        <tr className={isHighScore ? "table-warning" : null}>
            <td className="">
                {index}
            </td>
            <td>
                {date}
            </td>
            <td className={`text-${config.difficultyConfig[difficulty]?.colorVariant}`}>
                {difficulty}
            </td>
            <td>
                {score}
            </td>
        </tr>
    )
}

export default function ScoresTable({ scores }) {
    const highScoresPerDifficulty = { "Easy": null, "Medium": null, "Hard": null }

    for (const difficulty in highScoresPerDifficulty) {
        highScoresPerDifficulty[difficulty] = getHighScoreFromLocalStore(difficulty)
    }

    return (
        <Col lg="6" className="m-auto" style={{ height: "80vh", overflowY: "auto" }}>
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
                                    isHighScore={
                                        highScoresPerDifficulty[score.difficulty].value !== 0 &&
                                        score.value === highScoresPerDifficulty[score.difficulty].value
                                    }
                                />
                            )
                        })
                    }
                </tbody>
            </Table>
        </Col>
    )
}