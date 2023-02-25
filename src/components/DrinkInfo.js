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
        console.log(id);
        const curr = data["drinks"][0];

        const currInfo = {
          id: curr["idDrink"],
          name: curr["strDrink"],
          glass: curr["strGlass"],
          instructions: curr["strInstructions"],
          img: `${curr["strDrinkThumb"]}\/preview`,
          ingredients: formatIngredients(curr),
        };

        setInfo(currInfo);
      });
  }, [id]);

  if (info == null) {
    return null;
  }

  console.log("rendered");

  return (
    <div className="drink-info-con">
      <Row>
        <Col>
          <img src={info.img} className="info-img" />
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
    </div>
  );
}

export default DrinkInfo;
