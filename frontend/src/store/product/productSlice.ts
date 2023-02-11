import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Product } from "../../types/Product";

export interface ProductState {
  products: Product[];
  product: Product | null;
  message?: string;
  error: boolean;
  loading: boolean;
}

const initialProductState: ProductState = {
  products: [],
  product: null,
  error: false,
  loading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    usersLoading: (state) => {
      state.loading = true;
    },
    setProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    },
    setProductSuccess: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
    setProductFail: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.loading = false;
      state.error = true;
    },
    createProductSuccess: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
    },
    createProductFail: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = true;
    },
    eliminateProductSuccess: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item: Product) => item.id !== action.payload
      );
    },
    eliminateProductFail: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = true;
    },
    modifyProductSuccess: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((item: Product) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    modifyProductFail: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = true;
    },
  },
});

export const storedProduct = (state: RootState) => state.product.product;
export const storedProductList = (state: RootState) => state.product.products;

export const {
  setProductsSuccess,
  setProductSuccess,
  createProductSuccess,
  eliminateProductSuccess,
  modifyProductSuccess,
  setProductFail,
  createProductFail,
  eliminateProductFail,
  modifyProductFail
} = productSlice.actions;

export default productSlice.reducer;
