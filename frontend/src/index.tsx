import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { DeleteModalContextProvider } from "./context/deleteModal/DeleteModalContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DeleteModalContextProvider>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID as string}>
              <App />
            </GoogleOAuthProvider>
          </DeleteModalContextProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
