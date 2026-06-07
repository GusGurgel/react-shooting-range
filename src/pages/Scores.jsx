import Alert from 'react-bootstrap/Alert';
import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Scores() {
    return (
        <Row>
            <Col>
                <Alert variant='info'>No Scores Found!</Alert>
            </Col>
        </Row>
    )
}