import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../hooks/redux-hooks";
import { addProduct } from "../store/cart/cartActions";
import { type Product } from "../types/Product";
import { type CartItem } from "../types/Cart";

type Props = {
  product: Product;
};

const UserButtons = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  const newItem: CartItem = { ...product, quantity: 0 };

  return (
    <Button
      variant="success"
      onClick={() => dispatch(addProduct(newItem))}
      style={{ display: "flex" }}
    >
      <FontAwesomeIcon icon={faCartPlus} size="lg" />
      <span style={{ marginLeft: "1rem" }}>Add to Cart</span>
    </Button>
  );
};

export default UserButtons;
