import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../hooks/redux-hooks";
import { addProduct } from "../store/cart/cartActions";
import { type Product } from "../types/Product";
import { type CartItem } from "../types/Cart";

type Props = {
  product: Product;
  style: string
};

const UserButtons = ({ product, style }: Props) => {
  const dispatch = useAppDispatch();

  const newItem: CartItem = { ...product, quantity: 0 };

  return (
    <Button
      variant="success"
      className={style}
      onClick={() => dispatch(addProduct(newItem))}
    >
      <FontAwesomeIcon icon={faCartPlus} size="lg" />
      <span>Add to Cart</span>
    </Button>
  );
};

export default UserButtons;
