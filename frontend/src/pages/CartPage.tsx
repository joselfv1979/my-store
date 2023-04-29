import styles from "./../scss/CartPage.module.scss";
import { useAppSelector } from "../hooks/redux-hooks";
import { totalItems } from "../store/cart/cartSlice";
import Cart from "../components/Cart";
import { Col, Container, Row } from "react-bootstrap";
import Checkout from "../components/Checkout";

//  cart, logged, totalPayment, totalItems, checkout, cler
const CartPage = () => {
  const items = useAppSelector(totalItems);

  return (
    <Container className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Cart</h1>

      {items > 0 ? (
        <Row>
          <Col xs={7}>
            <Cart />
          </Col>
          <Col>
            <Checkout />
          </Col>
        </Row>
      ) : (
        <Row>Your cart is empty</Row>
      )}
    </Container>
  );
};

export default CartPage;
