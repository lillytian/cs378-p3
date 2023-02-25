import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DrinkInfo from "../components/DrinkInfo";

function Home() {
  const [drinks, setDrinks] = useState([]);
  const [drinkSearch, setDrinkSearch] = useState("");
  const [currDrinkDisplayed, setCurrDrinkDisplayed] = useState(null);

  // display drinks in dropdown
  const renderDrinkOptions = () => {
    return drinks.map((item) => {
      return (
        <span
          onClick={() => {
            setCurrDrinkDisplayed(item.id);
          }}
          key={item.name}
        >
          <DropdownItem
            style={{ wordWrap: "break-word", whiteSpace: "normal" }}
          >
            {item.name}
          </DropdownItem>
        </span>
      );
    });
  };

  // keep track of what user is currently searching for
  const onChange = (event) => {
    setDrinkSearch(event.target.value);
  };

  const generateRandomDrink = () => {
    const baseURL = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;

    fetch(baseURL)
      .then((res) => res.json())
      .then((data) => {
        const random = data["drinks"][0];
        setCurrDrinkDisplayed(random["idDrink"]);
      });
  };

  // check if the cocktail exists
  const addDrink = () => {
    const baseURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkSearch}`;

    fetch(baseURL)
      .then((res) => res.json())
      .then((data) => {
        const drinksData = data["drinks"];

        if (drinksData != null && drinksData.length > 0) {
          const toBeAdded = drinksData[0];
          const drink = {
            id: toBeAdded["idDrink"],
            name: toBeAdded["strDrink"],
          };

          drinks.push(drink);
          drinks.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          setDrinks([...drinks]);
        } else {
          alert("Not a valid cocktail.");
        }

        setDrinkSearch("");
      });
  };

  return (
    <Container className="app-con">
      <Row>
        <Col xs={10}>
          <input
            type="text"
            name="cocktail-name"
            placeholder="Name of a cocktail"
            value={drinkSearch}
            onChange={onChange}
            className="search-bar"
          />
        </Col>
        <Col xs={2} style={{ paddingLeft: "4px" }}>
          <Button
            onClick={addDrink}
            className="search-add"
            disabled={drinkSearch == null || drinkSearch.length == 0}
          >
            +
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
        <Col xs={6} style={{ paddingRight: "8px" }}>
          <Dropdown style={{ width: "100%" }}>
            <DropdownToggle
              variant="primary"
              disabled={drinks.length === 0}
              style={{ width: "100%" }}
            >
              Select a cocktail
            </DropdownToggle>
            <DropdownMenu style={{ width: "100%" }}>
              {renderDrinkOptions()}
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col xs={6} style={{ paddingLeft: "8px" }}>
          <Button onClick={generateRandomDrink} className="random-drink">
            Random cocktail
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {currDrinkDisplayed == null ? null : (
            <DrinkInfo id={currDrinkDisplayed} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
