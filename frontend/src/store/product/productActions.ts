import {
  addNewProduct,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../../services/productService";
import { productSlice } from "./productSlice";
import { AppThunk } from "../../types/AppThunk";
import { validateProduct } from "./../../utils/validateProduct";

const { actions } = productSlice;

// Action to fetch all products
export const fetchProducts =
  (query?: string): AppThunk =>
  async (dispatch) => {
    dispatch(actions.productsPending());

    const response = await getProducts(query);

    response.success
      ? dispatch(actions.setProductsSuccess(response.value))
      : dispatch(actions.createProductFail(response.message));
  };

// Action to fetch one product by id
export const fetchProduct =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(actions.productPending());

    const response = await getProduct(id);

    response.success
      ? dispatch(actions.setProductSuccess(response.value))
      : dispatch(actions.setProductFail(response.message));
  };

// Action to create a new product
export const addProduct =
  (product: FormData): AppThunk =>
  async (dispatch) => {
    dispatch(actions.productsPending());
    const validProduct = validateProduct(product);
    if (!validProduct.success) {
      dispatch(actions.createProductFail(validProduct.message));
      return;
    }

    const response = await addNewProduct(product);
    response.success
      ? dispatch(actions.createProductSuccess(response.value))
      : dispatch(actions.createProductFail(response.message));
  };

// Action to delete one product by id,
export const deleteProduct =
  (id: string): AppThunk =>
  async (dispatch) => {
    const response = await removeProduct(id);
    response.success
      ? dispatch(actions.eliminateProductSuccess(id))
      : dispatch(actions.eliminateProductFail(response.message));
  };

// Action to update one product by id
export const editProduct =
  (product: FormData): AppThunk =>
  async (dispatch) => {
    const validProduct = validateProduct(product);
    if (!validProduct.success) {
      dispatch(actions.modifyProductFail(validProduct.message));
      return;
    }

    const response = await updateProduct(product);
    response.success
      ? dispatch(actions.modifyProductSuccess(response.value))
      : dispatch(actions.modifyProductFail(response.message));
  };

// Action to remove any message from ProductState
export const cancelProductMessage = (): AppThunk => async (dispatch) => {
  dispatch(actions.eliminateProductMessage());
};
