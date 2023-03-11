import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import userSlice from "./user/userSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";

//const middlewares = [logger]
//const enhancers = applyMiddleware(...middleware)

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  product: productSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
  //middleware: middlewares,
  //devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
