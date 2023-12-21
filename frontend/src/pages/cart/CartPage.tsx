import { useAppSelector } from "../../hooks/redux-hooks";
import { totalItems } from "../../store/cart/cartSlice";
import Cart from "../../components/cart/Cart";
import { Container, Stack } from "react-bootstrap";
import Checkout from "../../components/checkout/Checkout";
import styles from "../../assets/scss/CartPage.module.scss";

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
