import styles from "./../assets/scss/CartPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { totalItems, totalPrice } from "../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Button, Card, Stack } from "react-bootstrap";
import { emptyCart } from "../../store/cart/cartActions";

export const Checkout = () => {
  const items = useAppSelector(totalItems);
  const subtotal = Number(useAppSelector(totalPrice));
  const SHIPPING = 5;

  const dispatch = useAppDispatch();

  const clearCart = () => {
    dispatch(emptyCart());
  };

  const navigate = useNavigate();

  return (
    <>
      <Card className={styles.checkoutCard}>
        <Card.Header className={styles.checkoutTitle}>
          <Card.Title>Checkout</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Title className={styles.checkoutConcept}>
            Total Items:
            <span className={styles.checkoutQuantity}>{items} U</span>
          </Card.Title>
          <Card.Title className={styles.checkoutConcept}>
            Shipping:
            <span className={styles.checkoutQuantity}>{SHIPPING} €</span>
          </Card.Title>
          <Card.Title className={styles.checkoutConcept}>
            Subtotal:
            <span className={styles.checkoutQuantity}>{subtotal} €</span>
          </Card.Title>
          <Card.Title className={styles.checkoutConcept}>
            Total invoice:
            <span className={styles.checkoutQuantity}>
              {subtotal + SHIPPING} €
            </span>
          </Card.Title>
        </Card.Body>
        <Card.Footer>
          <Stack>
            <Button variant="dark" className={styles.checkoutButton}>
              Checkout
            </Button>
            <Button
              variant="danger"
              className={styles.checkoutButton}
              onClick={clearCart}
            >
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
