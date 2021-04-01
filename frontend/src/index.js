import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppContextProvider } from './context/AppContext';
import { UserContextProvider } from './context/UserContext';
import { ProductContextProvider } from './context/ProductContext';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <AppContextProvider>
    <UserContextProvider>
      <ProductContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ProductContextProvider>
    </UserContextProvider>
  </AppContextProvider>,
  document.getElementById('root')
);

