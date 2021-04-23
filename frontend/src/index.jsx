import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { loadState, saveState } from './utils/localStorage' 
import { AppContextProvider } from './context/AppContext';
import { UserContextProvider } from './context/UserContext';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';

const initialData = loadState();

const store = createStore(rootReducer, initialData, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => saveState(store.getState()));

ReactDOM.render(
  <AppContextProvider>
    <UserContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
    </UserContextProvider>
  </AppContextProvider>,
  document.getElementById('root')
);

