import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppContextProvider } from './context/AppContext';
import { UserContextProvider } from './context/UserContext';
import { ProductContextProvider } from './context/ProductContext';

ReactDOM.render(
  <AppContextProvider>
    <UserContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </UserContextProvider>
  </AppContextProvider>,
  document.getElementById('root')
);

