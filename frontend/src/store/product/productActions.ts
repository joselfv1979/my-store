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
import { Product } from "../../types/Product";
import {
  setProductSuccess,
  setProductsSuccess,
  createProductSuccess,
  eliminateProductSuccess,
  modifyProductSuccess,
  createProductFail,
  setProductFail,
  eliminateProductFail,
  modifyProductFail,
} from "./productSlice";

export const fetchProducts = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const response = await getProducts();
    response.success
      ? dispatch(setProductsSuccess(response.value))
      : dispatch(createProductFail(response.message));
  };
};

export const fetchProduct = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await getProduct(id);
    response.success
      ? dispatch(setProductSuccess(response.value))
      : dispatch(setProductFail(response.message));
  };
};

export const addProduct = (
  product: Product
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await addNewProduct(product);
    response.success
      ? dispatch(createProductSuccess(response.value))
      : dispatch(createProductFail(response.message));
  };
};

export const deleteProduct = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await removeProduct(id);
    response.success
      ? dispatch(eliminateProductSuccess(id))
      : dispatch(eliminateProductFail(response.message));
  };
};

export const editProduct = (
  product: Product
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await updateProduct(product);
    response.success
      ? dispatch(modifyProductSuccess(response.value))
      : dispatch(modifyProductFail(response.message));
  };
};
