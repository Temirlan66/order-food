import StyledComponent from "styled-components";
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../../store/basket/basketSlice";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import BasicButtons from "../../UI/Button";
const MealItemForm = ({ id, price, title }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);

  const amountChangeHandler = (event) => {
    setAmount(+event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const basketItem = {
      id,
      price,
      title,
      amount,
    };
    dispatch(addToBasket(basketItem));
  };
  return (
    <StyledForm >
      <Container>
        <label htmlFor={id}>Amount</label>
        <StyledTextFieled
          id={id}
          value={amount}
          onChange={amountChangeHandler}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
        />
      </Container>

      <BasicButtons onClick={submitHandler}>
        <StyledIcon />
        Add
      </BasicButtons>
    </StyledForm>
  );
};

export default MealItemForm;

const StyledTextFieled = styled(TextField)(() => ({
  "&": {
    width: "70px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "5px 10px",
    fontSize: "14px",
  },
}));
const StyledIcon = StyledComponent(PlusIcon)`
  margin-right: 10px;
`;

const Container = StyledComponent.div`
  margin-bottom: 12px;
  label {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: #222222;
    margin-right: 20px;
  }
  input {
    width: 60px;
    height: 32px;
    border: 1px solid #d6d6d6;
    border-radius: 6px;
    outline: none;
    padding: 4px 12px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
`;

const StyledForm = StyledComponent.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
