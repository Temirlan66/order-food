import { useCallback, useState } from "react";
import "./App.css";
import Basket from "./components/basket/Basket";
import Header from "./components/header/Header";
import Meals from "./components/meals/Meals";
import Summary from "./components/summary/Summary";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { useFoods } from "./hooks/useFoods";
import styled from "styled-components";
import Snackbar from "./components/UI/Snackbar";
import { uiActions } from "./store/ui/uiSlice";
function AppContent() {
  const dispatch = useDispatch();
  const [isBasketVisible, setBasketVisible] = useState(false);
  const snackbar = useSelector((state) => state.ui.snackbar);
  const { sortDirection, changesetSortDirection, meals, isLoading, error } =
    useFoods();
  const showBasketHnadler = useCallback(() => {
    setBasketVisible((prevState) => !prevState);
  }, []);
  return (
    <Provider store={store}>
      <Header onShowBasket={showBasketHnadler} />

      <Summary />
      <Content>
        <select
          onChange={(e) => changesetSortDirection(e.target.value)}
          value={sortDirection}
        >
          <option value="ASC">cheaper</option>
          <option value="DESC">more expensive</option>
        </select>
      </Content>
      <Meals meals={meals} isLoading={isLoading} error={error} />
      {isBasketVisible && <Basket onOpen={isBasketVisible} onClose={showBasketHnadler} />}
      <Snackbar
        isOpen={snackbar.isOpen}
        severits={snackbar.severity}
        message={snackbar.message}
        onClose={() => dispatch(uiActions.closeSnackbar())}
      />
    </Provider>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
const Content = styled.div`
  padding: 20px 10px;
  border: none;
  margin-top: 180px;
  display: flex;
  margin-left: 200px;
  justify-content: center;
  position: absolute;
`;
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
