import React from "react";
import styles from "./../scss/CartPage.module.scss";
import { useAppSelector } from "../hooks/redux-hooks";
import { totalItems, totalPrice } from "../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Button, Card, Stack } from "react-bootstrap";
export const Checkout = () => {
  const items = useAppSelector(totalItems);
  const price = useAppSelector(totalPrice);

  const navigate = useNavigate();
  
  return (
    <>
      <Card className={styles.checkoutCard}>
      <Card.Header>
            <Card.Title>Checkout</Card.Title>
          </Card.Header>
        <Card.Body>
          <Card.Title>
            Total Items: {items}
          </Card.Title>
          <Card.Title>
            Total Invoice: {price} €
          </Card.Title>
        </Card.Body>
        <Card.Footer>
          <Stack>
            <Button variant="dark" className={styles.checkoutButton}>
              Checkout
            </Button>
            <Button variant="danger" className={styles.checkoutButton}>
              Clear
            </Button>
          </Stack>
        </Card.Footer>
      </Card>
      <Stack className={styles.checkoutMoreStack}>
        <Button variant="secondary" size="lg" onClick={() => navigate("/")}>
          BUY MORE
        </Button>
      </Stack>
    </>
  );
};

export default Checkout;
