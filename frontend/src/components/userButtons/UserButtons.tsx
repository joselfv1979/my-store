import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { addProduct } from "../../store/cart/cartActions";
import { type Product } from "../../types/Product";
import { type CartItem } from "../../types/Cart";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  product: Product;
};

const UserButtons = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  const newItem: CartItem = { ...product, quantity: 0 };

  const location = useLocation();
  const isProductListLocation = location.pathname === "/products";

  const navigate = useNavigate();

  const handleOnClick = () => {
    isProductListLocation
      ? navigate(`/product-detail/${product.id}`)
      : navigate(`/products`);
  };

  return (
    <>
      <button
        className="btn btn-primary py-2 px-3"
        data-testid="more-button"
        onClick={handleOnClick}
      >
        <span className="m-3">{isProductListLocation ? "View" : "Back"}</span>
      </button>
      <button
        className="btn btn-success py-2 px-3"
        data-testid="cart-button"
        onClick={() => dispatch(addProduct(newItem))}
      >
        <FontAwesomeIcon icon={faCartPlus} size="lg" />
        <span className="m-2">Add</span>
      </button>
    </>
  );
};

export default UserButtons;
