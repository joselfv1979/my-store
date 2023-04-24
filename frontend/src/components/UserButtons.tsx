import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Product } from "../types/Product";
import { addProduct } from "../store/cart/cartActions";
import { type CartItem } from "../types/Cart";

type Props = {
  product: Product;
};

const UserButtons = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  const selectedItem = useAppSelector((state) => state.cart.items).find(
    (item) => item.id === product.id
  );
  console.log("item cart", selectedItem);

  const newItem: CartItem = { ...product, quantity: 0 };

  return (
    <Button
      variant="success"
      onClick={() => dispatch(addProduct(newItem))}
      style={{ display: "flex" }}
    >
      <FontAwesomeIcon icon={faCartPlus} size="lg" />
      <span style={{ marginLeft: "1rem" }}>Add to Cart</span>
      {selectedItem ? (
        <span style={{ marginLeft: "1rem" }}>{selectedItem?.quantity}</span>
      ) : null}
    </Button>
  );
};

export default UserButtons;
