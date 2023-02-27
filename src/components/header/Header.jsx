import { Button } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styledComponents from "styled-components";
import { getBasket } from "../../store/basket/basketSlice";
import { uiActions } from "../../store/ui/uiSlice";
import { styled } from "@mui/system";
import BasketButton from "./BasketButton";

function Header({ onShowBasket }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.basket);
  const [animationClass, setAnimationClass] = useState("");
  const themeMode = useSelector((state) => state.ui.themeMode);
  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);

  const calculateTotalAmount = useCallback(() => {
    const sum = items.reduce((s, item) => {
      return s + item.amount;
    }, 0);
    return sum;
  }, [items]);
  useEffect(() => {
    setAnimationClass("bump");

    const id = setTimeout(() => {
      setAnimationClass("");

      return () => {
        clearTimeout(id);
      };
    }, 600);
  }, [items]);

  const themeChangeHandler = () => {
    const theme = themeMode === "light" ? "dark" : "light";
    dispatch(uiActions.changeTheme(theme));
  };
  return (
    <Container>
      <Logo>ReactMeals</Logo>
      <BasketButton
        onClick={onShowBasket}
        className={animationClass}
        count={calculateTotalAmount()}
      ></BasketButton>

      <Button style={{color:"white"}} onClick={themeChangeHandler}>
        {themeMode === "light" ? "Turn dark mode" : "Turn light mode"}
      </Button>
     
    </Container>
  );
}

export default memo(Header);

const Container = styled("header")(({ theme }) => ({
  width: "100%",
  position: "fixed",
  top: 0,
  zIndex: "1",
  height: "101px",
  backgroundColor: theme.palette.primary.light,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: "120px",
  paddingRight: "120px",
}));

const Logo = styledComponents.p`
  margin: 0;
  font-weight: 600;
  font-size: 38px;
  line-height: 57px;
  color: #ffffff;
  font-family: Poppins, sans-serif;
`;
