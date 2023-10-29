import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import userSlice from "./user/userSlice";
import cartSlice from "./cart/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

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

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  })
}

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
