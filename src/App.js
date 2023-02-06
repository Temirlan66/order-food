import { useCallback, useState } from "react";
import "./App.css";
import Basket from "./components/basket/Basket";
import Header from "./components/header/Header";
import Meals from "./components/meals/Meals";
import Summary from "./components/summary/Summary";
import { BasketProvider } from "./store/BasketContext";

function App() {
  const [isBasketVisible, setBasketVisible] = useState(false);

  const showBasketHnadler = useCallback(() => {
    setBasketVisible((prevState) => !prevState);
  },[])
  return (
    <BasketProvider>
      <Header onShowBasket={showBasketHnadler} />
      <Summary />
      <Meals />
      {isBasketVisible && <Basket onClose={showBasketHnadler} />}
    </BasketProvider>
  );
}

export default App;

/*
GET /foods
Headers: { UserID: "your_name"  } 
GET /basket
Headers: { UserID: "your_name"  } 
POST /foods/:foodId/addToBasket
BODY: { amount: number }
Headers: { UserID: "your_name"  } 
DELETE /basketItem/:id/delete
Headers: { UserID: "your_name"  } 
PUT /basketItem/:id/update
BODY: { amount: number }
Headers: { UserID: "your_name"  }
*/
