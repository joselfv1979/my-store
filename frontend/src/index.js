import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProductContextProvider } from './context/ProductContext';
import { UserContextProvider } from './context/UserContext';

ReactDOM.render(
  <UserContextProvider>
    <ProductContextProvider>
    <App />
  </ProductContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
);

