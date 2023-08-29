import React, { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {
  setupStore,
  type AppStore,
  type RootState,
} from "../../src/store/index";
import {
  DeleteModalContent,
  DeleteModalContext,
} from "../context/deleteModal/DeleteModalContext";

interface IExtendedRenderOptions extends RenderOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  value?: DeleteModalContent;
}

const preloadedState = {};
const deleteModalValue = {
  showDeleteModal: true,
  setShowDeleteModal: jest.fn(),
  id: null,
  setId: () => null,
};

const store = setupStore(preloadedState);
const value: DeleteModalContent = deleteModalValue;

export const customRender = (
  ui: ReactElement,
  options?: Omit<IExtendedRenderOptions, "wrapper">
): {
  container: HTMLElement;
  baseElement: HTMLElement;
} => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <BrowserRouter>
        <Provider store={options?.store ?? store}>
          <DeleteModalContext.Provider value={options?.value ?? value}>
            {children}
          </DeleteModalContext.Provider>
        </Provider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

