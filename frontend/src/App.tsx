import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import HomePage from "pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductAddPage from "./pages/ProductAddPage";
import ProductEditPage from "./pages/ProductEditPage";
import LoginPage from "./pages/login/LoginPage";
import UserAddPage from "./pages/UserAddPage";
import UserEdit from "./pages/UserEditPage";
import UserListPage from "./pages/UserListPage";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/about/About";
import styles from "./App.module.scss";
import { useAppDispatch } from "./hooks/redux-hooks";
import { cancelProductMessage } from "./store/product/productActions";

function App() {

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cancelProductMessage());
  }, [dispatch, pathname]);

  return (
    <div className={styles.App}>
      <Menu />

      <main>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/product-detail/:id" element={<ProductDetailPage />} />
          <Route path="/new-product" element={<ProductAddPage />} />
          <Route path="/edit-product/:id" element={<ProductEditPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<UserAddPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/edit-profile/:id" element={<UserEdit />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
