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
    <Container style={{ width: " 100%", height: "100%" }}>
      <h1 style={{ color: "#fff", textAlign: "center", margin: "2rem" }}>
        Cart
      </h1>

      {items > 0 ? (
        <Row style={{ height: " 100%", display: "flex" }}>
          <Col xs={7}>
            <Cart />
          </Col>
          <Col>
            <Checkout />
          </Col>
        </Row>
      ) : (
        <Row className={styles.empty}>Your cart is empty</Row>
      )}
    </Container>
  );
};

export default CartPage;
