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
  setProductPending,
  eliminateProductMessage,
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
    dispatch(setProductPending());
    
    const response = await getProduct(id);    
    setTimeout(() => {
      response.success
      ? dispatch(setProductSuccess(response.value))
      : dispatch(setProductFail(response.message));
    }, 3000)
  };
};

export const addProduct = (
  product: FormData
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
  product: FormData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await updateProduct(product);
    console.log(response);
    
    response.success
      ? dispatch(modifyProductSuccess(response.value))
      : dispatch(modifyProductFail(response.message));
  };
};

export const cancelProductMessage = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => dispatch(eliminateProductMessage());
}
