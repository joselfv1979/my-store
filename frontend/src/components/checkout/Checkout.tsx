import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { totalItems, totalPrice } from "../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../../store/cart/cartActions";

export const Checkout = () => {
  const items = useAppSelector(totalItems);
  const subtotal = Number(useAppSelector(totalPrice));
  const SHIPPING = 5;

  const dispatch = useAppDispatch();

  const clearCart = () => {
    dispatch(emptyCart());
  };

  const navigate = useNavigate();

  return (
    <div className="card rounded-1 mx-0" style={{ width: "20rem" }}>
      <h4 className="card-header text-center">Checkout</h4>
      <div className="card-body">
        <h5 className="card-title row p-1">
          <div className="col-auto me-auto">Total Items:</div>
          <div className="col-auto">{items} U</div>
        </h5>
        <h5 className="card-title row p-1">
          <div className="col-auto me-auto">Shipping:</div>
          <div className="col-auto">{SHIPPING} €</div>
        </h5>
        <h5 className="card-title row p-1">
          <div className="col-auto me-auto">Subtotal:</div>
          <div className="col-auto">{subtotal} €</div>
        </h5>
        <h5 className="card-title row p-1">
          <div className="col-auto me-auto">Total invoice:</div>
          <div className="col-auto">{subtotal + SHIPPING} €</div>
        </h5>
      </div>
      <div className="card-footer d-flex flex-column">
        <button className="btn btn-dark py-2 px-5 my-2">Checkout</button>
        <button className="btn btn-danger py-2 px-5 my-2" onClick={clearCart}>
          Clear
        </button>
        <div className="d-grid gap-2">
          <button
            className="btn btn-secondary my-2"
            onClick={() => navigate("/")}
          >
            BUY MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
