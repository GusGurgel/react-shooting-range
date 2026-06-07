import { Routes, Route, Outlet, useLocation, useNavigate } from "react-router"
import Menu from "./pages/Menu"
import NotFound from "./pages/NotFound"
import Container from "react-bootstrap/Container"
import Scores from "./pages/Scores"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import TargetImage from "./assets/target.png"
import Game from "./pages/Game"

function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const isMenu = location.pathname === "/"
  const isScore = location.pathname === "/scores"

  return (
    <Container className="mt-2">
      <Row>
        <Col className="m-2">
          <span className="p-2" style={{ borderRight: "1px solid #dee2e6", marginRight: "12px" }} >Shooting Range <img width="50" src={TargetImage} alt="Target Image" /></span>
          <Button onClick={() => { navigate("/") }} disabled={isMenu} className="m-1" variant="outline-primary">Menu</Button>
          <Button onClick={() => { navigate("/scores") }} disabled={isScore} className="m-1" variant="outline-primary">Scores</Button>
        </Col>
        <hr />
      </Row>
      <Outlet />
    </Container>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Menu />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
