import styled from "styled-components";
import Modal from "../UI/Modal";
import BasketItem from "./BasketItem";
import TotalAmount from "./TotalAmount";

const Basket = () => {
  const items = [
    {
      id: "1",
      title: "Sushi",
      amount: "3",
      price: 22.99,
    },
    {
      id: "2",
      title: "Schnitzel",
      amount: "3",
      price: 16.51,
    },
    {
      id: "3",
      title: "Barbecue Burger",
      amount: "3",
      price: 12.99,
    },
    {
      id: "4",
      title: "Green Bowl",
      amount: "3",
      price: 19.99,
    },
  ];
  return (
    <Modal onClose={() => {}}>
      <StyledTotalContainer>
        <FiwedHeightContainer>
          {items.map((item) => {
            return (
              <BasketItem
                key={item.id}
                title={item.title}
                price={item.price}
                amount={item.amount}
              />
            );
          })}
        </FiwedHeightContainer>

        <TotalAmount price={200} onClose={() => {}} onOrder={() => {}} />
      </StyledTotalContainer>
    </Modal>
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
  /* padding-bottom: 30px; */
`;
