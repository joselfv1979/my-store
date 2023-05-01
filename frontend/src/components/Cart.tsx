import { PlusCircleIcon, MinusCircleIcon } from "./Icons";
import styles from "./../scss/CartPage.module.scss";
import { useAppSelector } from "../hooks/redux-hooks";
import { stateCart } from "../store/cart/cartSlice";
import {
  Button,
  Stack,
} from "react-bootstrap";

// cart, subtractQuantity, addQuantity
const Cart = () => {
  const cart = useAppSelector(stateCart);

  const photoPath = process.env.REACT_APP_API_IMAGES;

  return (
    <>
      {cart.map((item) => (
        <div key={item?.id} className={styles.cartItem}>
          <img
            src={`${photoPath}/${item.imagePath}`}
            className={styles.itemPhoto}
            alt="Card item"
          />
          <h4>{item.name}</h4>
          <Stack gap={2} className={styles.itemText}>
            <h5>Quantity: {item.quantity}</h5>
            <h5>Price: {item.price} €</h5>
          </Stack>

          <Stack gap={2} className={styles.itemButtonStack}>
            <Button variant="dark">
              <PlusCircleIcon width="1rem" />
            </Button>
            <Button variant="dark">
              <MinusCircleIcon />
            </Button>
          </Stack>
        </div>
      ))}
    </>
  );
};

export default Cart;
