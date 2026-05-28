import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function MenuForm() {
    return (
        <Col lg="4" className="m-auto">
            <Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Select aria-label="Select the difficulty of the game">
                        <option value="1">Easy</option>
                        <option value="2">Medium</option>
                        <option value="3">Hard</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="outline-success" type="submit">
                    Play
                </Button>
            </Form>
        </Col>
    )
}