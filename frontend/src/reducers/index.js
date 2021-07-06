import { combineReducers } from 'redux'

import productReducer from './productReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
  message: messageReducer,
})

export default rootReducer;