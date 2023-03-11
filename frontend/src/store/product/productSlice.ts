import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Product } from "../../types/Product";

export interface ProductState {
  products: Product[];
  product: Product | null;
  message?: string;
  error?: string;
  loading: boolean;
}

const initialProductState: ProductState = {
  products: [],
  product: null,
  loading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    setProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    },
    productPending: (state) => {
      state.products = [];
      state.product = null;
      state.loading = true;
      state.message = undefined;
      state.error = undefined;
    },
    setProductSuccess: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
      state.loading = false
    },
    setProductFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    createProductSuccess: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
      state.message = 'Product created successfully';
    },
    createProductFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    eliminateProductSuccess: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item: Product) => item.id !== action.payload
      );
      state.message = 'Product deleted successfully';
    },
    eliminateProductFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    modifyProductSuccess: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((item: Product) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.product = action.payload;
      state.message = 'Product updated successfully';
    },
    modifyProductFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    eliminateProductMessage: (state) => {
      state.message = undefined;
      state.error = undefined;
    }
  },
});

export const storedProduct = (state: RootState) => state.product.product;
export const storedProductList = (state: RootState) => state.product.products;
export default productSlice.reducer;
