import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import productSlice  from './product/productSlice'
import userSlice from './user/userSlice';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middleware = [logger]
const enhancers = applyMiddleware(...middleware)

export const store = configureStore({
  reducer: {
    product: productSlice,
    user: userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch