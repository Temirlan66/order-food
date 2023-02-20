import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  deleteBasketItem,
  submitOrder,
  updateBasketItem,
} from "../../store/basket/basketSlice";
import BasketItem from "./BasketItem";
import TotalAmount from "./TotalAmount";
import { uiActions } from "../../store/ui/uiSlice";
import MuiModal from "../UI/MuiModal";
const Basket = ({ onClose, onOpen}) => {
  const items = useSelector((state) => state.basket.items);

  const dispatch = useDispatch();
  const dec = useCallback(
    (id, amount) => {
      if (amount > 1) {
        dispatch(updateBasketItem({ amount: amount - 1, id: id }));
      } else {
        dispatch(deleteBasketItem(id));
      }
    },
    [dispatch]
  );

  const incrementAmount = useCallback(
    (id, amount) => {
      dispatch(updateBasketItem({ amount: amount + 1, id: id }));
    },
    [dispatch]
  );

  const getTotalPrice = useCallback(() => {
    return items.reduce((sum, { price, amount }) => (sum += price * amount), 0);
  }, [items]);

  const orderSubmitHandlet = async () => {
    try {
      await dispatch(
        submitOrder({
          orderData: { items },
        })
      ).unwrap();
      dispatch(
        uiActions.showSnackbar({
          severity: "success",
          message: "Order completed successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showSnackbar({
          severity: "error",
          message: "Failed , try again later!",
        })
      );
    } finally {
      onClose();
    }
  };
  return (

      <MuiModal onClose={onClose} onOpen={onOpen}>
        <StyledTotalContainer>
          <FiwedHeightContainer>
            {items.map((item) => {
              return (
                <BasketItem
                  key={item._id}
                  incrementAmount={() => incrementAmount(item._id, item.amount)}
                  dec={() => dec(item._id, item.amount)}
                  title={item.title}
                  price={item.price}
                  amount={item.amount}
                />
              );
            })}
          </FiwedHeightContainer>

          <TotalAmount
            price={getTotalPrice()}
            onClose={onClose}
            onOrder={orderSubmitHandlet}
          />
        </StyledTotalContainer>
      </MuiModal>

  );
};

export default Basket;

const StyledTotalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
`;
const FiwedHeightContainer = styled.div`
  max-height: 228px;
  overflow-y: scroll;
`;
