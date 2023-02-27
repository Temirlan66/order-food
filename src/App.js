import { useCallback, useMemo, useState } from "react";
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
import { createTheme, MenuItem, Select, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./lib/constants/theme";
function AppContent() {
  const dispatch = useDispatch();
  const [isBasketVisible, setBasketVisible] = useState(false);
  const snackbar = useSelector((state) => state.ui.snackbar);
  const { sortDirection, changesetSortDirection, meals, isLoading, error } =
    useFoods();

  const themeMode = useSelector((state) => state.ui.themeMode);
  const showBasketHnadler = useCallback(() => {
    setBasketVisible((prevState) => !prevState);
  }, []);

  const theme = useMemo(() => {
    const currentTheme =
      themeMode === "light"
        ? {
            ...lightTheme,
          }
        : {
            ...darkTheme,
          };

    return createTheme(currentTheme);
  }, [themeMode]);
  return (
    <ThemeProvider theme={theme}>
      <Header onShowBasket={showBasketHnadler} />

      <Summary />
      <Content>
        <StyledSelect
          value={sortDirection}
          label="Age"
          onChange={(e) => changesetSortDirection(e.target.value)}
        >
          <MenuItem value={"ASC"}>Cheaper</MenuItem>
          <MenuItem value={"DESC"}>More expensive</MenuItem>
        </StyledSelect>
      </Content>
      <Meals meals={meals} isLoading={isLoading} error={error} />
      {isBasketVisible && (
        <Basket onOpen={isBasketVisible} onClose={showBasketHnadler} />
      )}
      <Snackbar
        isOpen={snackbar.isOpen}
        severits={snackbar.severity}
        message={snackbar.message}
        onClose={() => dispatch(uiActions.closeSnackbar())}
      />
    </ThemeProvider>
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
const Content = styled("div")(() => ({
  "&": {
    marginTop: "150px",
    position: "absolute",
    marginLeft: "100px",
  },
}));

const StyledSelect = styled(Select)(() => ({
  "&": {
    background: "white",
  },
}));
/* padding: 20px 10px;
  border: none;
  margin-top: 180px;
 
  /* justify-content: center; */
//
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
