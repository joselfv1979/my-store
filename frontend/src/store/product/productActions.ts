import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  addNewProduct,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../../services/productService";
import { productSlice } from "./productSlice";

const { actions } = productSlice;

export const fetchProducts = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    dispatch(actions.productsPending());

    const response = await getProducts();
    setTimeout(() => {
      response.success
      ? dispatch(actions.setProductsSuccess(response.value))
      : dispatch(actions.createProductFail(response.message));
    }, 1000)
  };
};

export const fetchProduct = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {    
    dispatch(actions.productPending());
    
    const response = await getProduct(id);    
    setTimeout(() => {
      response.success
      ? dispatch(actions.setProductSuccess(response.value))
      : dispatch(actions.setProductFail(response.message));
    }, 1000)
  };
};

export const addProduct = (
  product: FormData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {    
    const response = await addNewProduct(product);
    console.log({response});
    
    response.success
      ? dispatch(actions.createProductSuccess(response.value))
      : dispatch(actions.createProductFail(response.message));
  };
};

export const deleteProduct = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await removeProduct(id);
    response.success
      ? dispatch(actions.eliminateProductSuccess(id))
      : dispatch(actions.eliminateProductFail(response.message));
  };
};

export const editProduct = (
  product: FormData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await updateProduct(product);    
    response.success
      ? dispatch(actions.modifyProductSuccess(response.value))
      : dispatch(actions.modifyProductFail(response.message));
  };
};

export const cancelProductMessage = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => dispatch(actions.eliminateProductMessage());
}


