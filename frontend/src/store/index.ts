import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import userSlice from "./user/userSlice";
import cartSlice from "./cart/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  product: productSlice,
  user: userSlice,
  cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
