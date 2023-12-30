import {
  Action,
  PreloadedState,
  ThunkAction,
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

// Combines the slice reducers into the root reducer
const reducers = combineReducers({
  product: productSlice,
  user: userSlice,
  cart: cartSlice,
});

// Saves the Redux store in persistent storage
const persistedReducer = persistReducer(persistConfig, reducers);

// Creates the store with these options
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Creates the store with preloaded state
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
// The AppThunk type will help us in writing type definitions for thunk actions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
