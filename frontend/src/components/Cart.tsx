import { PlusCircleIcon, MinusCircleIcon } from "./Icons";
import styles from "./../scss/CartPage.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { stateCart } from "../store/cart/cartSlice";
import { Button, Stack } from "react-bootstrap";
import { addProduct, substractProduct } from "../store/cart/cartActions";
import { CartItem } from "../types/Cart";

const Cart = () => {
  const cart = useAppSelector(stateCart);
  const dispatch = useAppDispatch();

  const subtractItem = (item: CartItem) => {
    dispatch(substractProduct(item));
  };

  const addItem = (item: CartItem) => {
    dispatch(addProduct(item));
  };

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
            <Button variant="dark" onClick={() => addItem(item)}>
              <PlusCircleIcon width="1rem" />
            </Button>
            <Button variant="dark" onClick={() => subtractItem(item)}>
              <MinusCircleIcon />
            </Button>
          </Stack>
        </div>
      ))}
    </>
  );
};

export default Cart;
