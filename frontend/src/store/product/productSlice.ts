import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "..";
import { type Product, type ProductState } from "../../types/Product";

const initialProductState: ProductState = {
  products: [],
  product: null,
  loading: false,
};

// Reducer functions of product state
export const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    productsPending: (state) => {
      state.products = [];
      state.product = null;
      state.loading = true;
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
      state.loading = false;
    },
    setProductFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    createProductSuccess: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
      state.message = "Product created successfully";
      state.loading = false;
    },
    createProductFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    eliminateProductSuccess: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item: Product) => item.id !== action.payload
      ); // filter out all items with a given value. In this case the action.payload is the id of the product.
      state.message = "Product deleted successfully";
      state.loading = false;
    },
    eliminateProductFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    modifyProductSuccess: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((item: Product) =>
        item.id?.toString() === action.payload.id ? action.payload : item
      );
      // map over the array and if the id matches, replace the item with the new value. In this case the action.payload is the new value
      state.product = action.payload;
      state.message = "Product updated successfully";
      state.loading = false;
    },
    modifyProductFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    eliminateProductMessage: (state) => {
      state.message = undefined;
      state.error = undefined;
    },
  },
});

export const storedProduct = (state: RootState) => state.product.product;
export const storedProductList = (state: RootState) => state.product.products;
export default productSlice.reducer;
