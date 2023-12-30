import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { type CartItem, type CartState } from "../../types/Cart";

const initialCartState: CartState = {
  items: [],
  totalPrice: 0,
};

// Reducer functions of cart state
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemSuccess: (state, action: PayloadAction<CartItem>) => {
      const existedItem = state.items.find(
        (i: CartItem) => i.id === action.payload.id
      );

      if (existedItem) {
        state.items = state.items.map((item: CartItem) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.items = [...state.items, { ...action.payload, quantity: 1 }];
      }

      state.item = action.payload;
      state.message = "Cart updated successfully";
    },
    substractItemSuccess: (state, action: PayloadAction<CartItem>) => {
      const itemToDelete = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.items =
        itemToDelete?.quantity === 1
          ? state.items.filter((item) => item.id !== itemToDelete?.id)
          : state.items.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
      state.item = action.payload;
      state.message = "Cart updated successfully";
    },
    emptyCartItems: (state) => {
      state.items = [];
      state.message = "Cart updated successfully";
      state.totalPrice = 0;
    },
    setCartItem: (state, action: PayloadAction<string>) => {
      state.item = state.items.find((i: CartItem) => i.id === action.payload);
    }
  },
});

export const stateCart = (state: RootState) => state.cart.items;
export const totalPrice = (state: RootState) => state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
.toFixed(2);
export const totalItems = (state: RootState) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
export default cartSlice.reducer;