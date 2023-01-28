// import { Children } from "react";
import styled from "styled-components";
import {ReactComponent as BasketIcon} from "../../assets/icons/basket-icon.svg"

const BasketButton = ({count}) => {
  return (
    <StyledButton>
      <BasketIcon />
      <StyledTitle>Your cart</StyledTitle>
      <CountStyled id="counter">{count || 0}</CountStyled>
    </StyledButton>
  );
};

export default BasketButton;

const StyledButton = styled.button`
  background: #5a1f08;
  border-radius: 30px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: white;
  margin: 0;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: #2c0d00;
  }
  :hover > #counter > {
    background-color: #2c0d00;
  }
`;

const StyledTitle = styled.span`
  margin-left: 12px;
  margin-right: 24px;
`;
const CountStyled = styled.span`
  background: #8a2b06;
  border-radius: 30px;
  padding: 4px 20px;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #ffffff;
`