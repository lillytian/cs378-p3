import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import IngredientsTable from "./IngredientsTable";

function DrinkInfo(props) {
  const { id } = props;
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const formatIngredients = (data) => {
      let ingredients = [];

      // data is formatted weird
      for (let i = 1; i <= 15; i++) {
        const item = data[`strIngredient${i}`];
        if (item == null) {
          break;
        } else {
          const ingred = {
            item,
            measurement: data[`strMeasure${i}`],
          };
          ingredients.push(ingred);
        }
      }

      return ingredients;
    };

    const baseURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(baseURL)
      .then((res) => res.json())
      .then((data) => {
        const curr = data["drinks"][0];

        const currInfo = {
          id: curr["idDrink"],
          name: curr["strDrink"],
          glass: curr["strGlass"],
          instructions: curr["strInstructions"],
          img: `${curr["strDrinkThumb"]}/preview`,
          ingredients: formatIngredients(curr),
          category: curr["strCategory"],
          iba: curr["strIBA"],
        };

        setInfo(currInfo);
      });
  }, [id]);

  if (info == null) {
    return null;
  }

  return (
    <div className="drink-info-con">
      <Row>
        <Col>
          <img alt={`${info.name}`} src={info.img} className="info-img" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>{info.name}</h1>
        </Col>
      </Row>
      <Row className="info-block">
        <Col>
          <Row>
            <Col>
              <h2>Ingredients</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <IngredientsTable ingredients={info.ingredients} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="info-block">
        <Col>
          <Row>
            <Col>
              <h2>Instructions</h2>
            </Col>
          </Row>
          <Row>
            <Col>{info.instructions}</Col>
          </Row>
        </Col>
      </Row>
      <Row className="info-block">
        <Col>
          <Row>
            <Col>
              <h3>Serving Glass</h3>
            </Col>
          </Row>
          <Row>
            <Col>{info.glass}</Col>
          </Row>
        </Col>
      </Row>
      <Row className="info-block">
        <Col>
          <Row>
            <Col>
              <h3>Category</h3>
            </Col>
          </Row>
          <Row>
            <Col>{info.category ?? "None"}</Col>
          </Row>
        </Col>
      </Row>
      <Row className="info-block">
        <Col>
          <Row>
            <Col>
              <h3>IBA Official Cocktail List</h3>
            </Col>
          </Row>
          <Row>
            <Col>{info.iba ?? "None"}</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default DrinkInfo;
