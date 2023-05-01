import styles from "./../scss/CartPage.module.scss";
import { useAppSelector } from "../hooks/redux-hooks";
import { totalItems } from "../store/cart/cartSlice";
import Cart from "../components/Cart";
import { Container, Stack } from "react-bootstrap";
import Checkout from "../components/Checkout";

//  cart, logged, totalPayment, totalItems, checkout, cler
const CartPage = () => {
  const items = useAppSelector(totalItems);

  return (
    <Container>
      <h1 className={styles.cartTitle}>Cart</h1>

      {items > 0 ? (
        <div className={styles.cartContent}>
          <Stack>
            <Cart />
          </Stack>
          <Stack>
            <Checkout />
          </Stack>
        </div>
      ) : (
        <p className={styles.cartEmptyText}>Your cart is empty</p>
      )}
    </Container>
  );
};

export default CartPage;
