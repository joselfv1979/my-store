import { cartSlice } from "./cartSlice";
import { type CartItem } from "../../types/Cart";
import { AppThunk } from "../../types/AppThunk";

const { actions } = cartSlice;

// Action to add one product to cart
export const addProduct =
  (product: CartItem): AppThunk =>
  (dispatch) => {
    dispatch(actions.addItemSuccess(product));
  };

// Action to remove one product to cart
export const substractProduct =
  (product: CartItem): AppThunk =>
  (dispatch) => {
    dispatch(actions.substractItemSuccess(product));
  };

// Action to fetch one product from cart
export const fetchItem =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(actions.setCartItem(id));
  };

// Action to empty the cart
export const emptyCart = (): AppThunk => (dispatch) => {
  dispatch(actions.emptyCartItems());
};
