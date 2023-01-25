import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { loadState, saveState } from "./utils/localStorage";
import { applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { store } from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';


// const initialData = loadState();

// const store = createStore(
//   rootReducer,
//   initialData,
//   composeWithDevTools(applyMiddleware(thunk))
// );

//store.subscribe(() => saveState(store.getState()));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
