import React from "react";
import styles from "./../scss/CartPage.module.scss";
import { useAppSelector } from "../hooks/redux-hooks";
import { totalItems, totalPrice } from "../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Card } from "react-bootstrap";
export const Checkout = () => {
  const items = useAppSelector(totalItems);
  const price = useAppSelector(totalPrice);

  const navigate = useNavigate();
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Total Items:</Card.Title>
          <Card.Subtitle>{items}</Card.Subtitle>
          <Card.Title>Total Payment:</Card.Title>
          <Card.Subtitle>{price} €</Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <ButtonGroup>
            <button className={styles.checkout}>Checkout</button>
            <button
              className={styles.clear}
              onClick={() => console.log("clear")}
            >
              Clear
            </button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
      <button className={styles.more} onClick={() => navigate("/")}>
        BUY MORE
      </button>
    </>
  );
};

export default Checkout;
