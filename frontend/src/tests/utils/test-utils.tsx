import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore, type AppStore, type RootState } from "../../store/index";
import {
  DeleteModalContent,
  DeleteModalContext,
} from "../../context/deleteModal/DeleteModalContext";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  value?: DeleteModalContent;
}

const customRender = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    value = {
      showDeleteModal: true,
      setShowDeleteModal: jest.fn(),
      id: null,
      setId: jest.fn(),
    },
    ...renderOptions
  }: ExtendedRenderOptions = {}
): {
  container: HTMLElement;
  baseElement: HTMLElement;
  store: AppStore;
  value: DeleteModalContent;
} => {
  const Wrapper = ({ children }: PropsWithChildren<{}>) => {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <DeleteModalContext.Provider value={value}>
            {children}
          </DeleteModalContext.Provider>
        </Provider>
      </BrowserRouter>
    );
  };

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    value,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

export * from '@testing-library/react';
export {customRender as render};
