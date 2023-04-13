import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { type Product, type ProductState } from "../../types/Product.d";

const initialProductState: ProductState = {
  products: [],
  product: null,
  loading: true,
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    productsPending: (state) => {
      state.products = [];
      state.product = null;
      state.message = undefined;
      state.error = undefined;
    },
    productPending: (state) => {
      state.product = null;
      state.loading = true;
      state.message = undefined;
      state.error = undefined;
    },
    setProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
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
      );  // filter out all items with a given value. In this case the action.payload is the id of the product.
      state.message = 'Product deleted successfully';
    },
    eliminateProductFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    modifyProductSuccess: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((item: Product) =>
        item.id === action.payload.id ? action.payload : item
      );  // map over the array and if the id matches, replace the item with the new value. In this case the action.payload is the new value
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
