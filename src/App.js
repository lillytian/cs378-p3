import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import CityButton from "./components/CityButton";
import TemperatureTable from "./components/TemperatureTable";

function App() {
  const [cities, setCities] = useState(["Austin", "Dallas", "Houston"]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const renderCityButtons = () => {
    return cities.map((item) => {
      return (
        <Col key={item} xs={4}>
          <CityButton
            onClick={() => {
              setSelectedCity(item);
            }}
            selected={selectedCity === item}
            title={item}
          />
        </Col>
      );
    });
  };

  return (
    <div>
      <Container fluid>
        <Row xs={12}>{renderCityButtons()}</Row>
        <Row>
          <Col xs={5}>
            <input type="text" />
          </Col>
          <Col xs={1}>
            <button>+</button>
          </Col>
        </Row>
        <Row>
          <TemperatureTable city={selectedCity} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
