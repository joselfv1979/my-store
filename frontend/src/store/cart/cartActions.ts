import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { cartSlice } from "./cartSlice";
import { type CartItem } from "../../types/Cart";

const { actions } = cartSlice;

export const addProduct = (
  product: CartItem
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(actions.addItemSuccess(product));
  };
};

export const substractProduct = (
  product: CartItem
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(actions.substractItemSuccess(product));
  };
}

export const fetchItem = ( id: string ): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(actions.setCartItem(id));
  }

}

export const emptyCart = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(actions.emptyCartItems());
  }
}

