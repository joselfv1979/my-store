import React from "react";
import styles from "./../scss/CartPage.module.scss";
import { useAppSelector } from "../hooks/redux-hooks";
import { totalItems, totalPrice } from "../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Button, Card, Stack } from "react-bootstrap";
export const Checkout = () => {
  const items = useAppSelector(totalItems);
  const shipping = 5;
  const subtotal = Number(useAppSelector(totalPrice));

  const navigate = useNavigate();
  
  return (
    <>
      <Card className={styles.checkoutCard}>
      <Card.Header className={styles.checkoutTitle}>
            <Card.Title>Checkout</Card.Title>
          </Card.Header>
        <Card.Body>
          <Card.Title className={styles.checkoutConcept}>
            Total Items: <span className={styles.checkoutQuantity}>{items} U</span>
          </Card.Title>
          <Card.Title className={styles.checkoutConcept}>
            Shipping: <span className={styles.checkoutQuantity}>{shipping} €</span>
          </Card.Title>
          <Card.Title className={styles.checkoutConcept}>
            Subtotal: <span className={styles.checkoutQuantity}>{subtotal} €</span>
          </Card.Title>
          <Card.Title className={styles.checkoutConcept}>
            Total invoice: <span className={styles.checkoutQuantity}>{subtotal + shipping} €</span>
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
