import {
  addQuantity,
  subtractQuantity,
  clearCartAction,
  checkoutAction,
} from "../actions/cartActions";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import Cart from "./../components/Cart";
import styles from "./../scss/CartPage.module.scss";

const CartPage = ({ cart, logged, totalPayment, totalItems, dispatch }) => {
  const [checkout, setCheckout] = useState(false);

  const history = useHistory();

  const addQuantityDispatch = (product) => {
    dispatch(addQuantity(product));
  };

  const subtractQuantityDispatch = (product) => {
    dispatch(subtractQuantity(product));
  };

  const clearCartDispatch = () => {
    dispatch(clearCartAction());
  };

  const checkoutDispatch = (message) => {
    setCheckout(true);
    dispatch(checkoutAction(message));
  };

  return (
    <div className={styles.container}>
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <div className={styles.content}>
          <Cart
            cart={cart}
            addQuantity={addQuantityDispatch}
            subtractQuantity={subtractQuantityDispatch}
          />
          <div className={styles.total}>
            <p className={styles.text}>Total Items:</p>
            <p>{totalItems}</p>
            <p className={styles.text}>Total Payment:</p>
            <p>{totalPayment} €</p>
            <hr />
            <button
              className={styles.checkout}
              onClick={() => {
                logged
                  ? checkoutDispatch("Chekout successfull")
                  : history.push("/login");
              }}
            >
              Checkout
            </button>
            <button
              className={styles.clear}
              onClick={() => clearCartDispatch()}
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>Your cart is empty</div>
      )}
      {checkout && (
        <button className={styles.more} onClick={() => history.push("/")}>
          BUY MORE
        </button>
      )}
    </div>
  );
};

const totalPayment = (state) => {
  return state.cart.cartList
    .reduce((sum, curr) => sum + curr.price * curr.quantity, 0)
    .toFixed(2);
};

const totalItems = (state) => {
  return state.cart.cartList.reduce((sum, curr) => sum + curr.quantity, 0);
};

const mapStateToProps = (state) => ({
  logged: state.user.logged,
  cart: state.cart.cartList,
  totalPayment: totalPayment(state),
  totalItems: totalItems(state),
});

export default connect(mapStateToProps)(CartPage);
