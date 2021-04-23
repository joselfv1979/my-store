import { combineReducers } from 'redux'

import productsReducer from './productsReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  cart: cartReducer,
  message: messageReducer,
})

export default rootReducer;