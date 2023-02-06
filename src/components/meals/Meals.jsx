import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { fetchApi } from "../../lib/fetchAPI";
import MealItem from "./meal-item/MealItem";

const Meals = () => {
  const [meals, setMeals] = useState([]);

  const getMeals = async () => {
    try {
      const responce = await fetchApi("foods");
      setMeals(responce.data);
    } catch (error) {
      console.log("Something wert worht");
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  return (
    <Card>
      <ul>
        {meals.map((meal) => {
          return (
            <MealItem
              title={meal.title}
              price={meal.price}
              description={meal.description}
              id={meal._id}
              key={meal._id}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default memo(Meals);

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  width: 75%;
  margin: 230px auto;
  padding: 40px 40px 16px 40px;
`;
