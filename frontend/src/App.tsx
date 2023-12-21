import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";
import HomePage from "pages/home/HomePage";
import ProductListPage from "./pages/productList/ProductListPage";
import ProductDetailPage from "./pages/productDetail/ProductDetailPage";
import ProductAddPage from "./pages/productAdd/ProductAddPage";
import ProductEditPage from "./pages/productEdit/ProductEditPage";
import LoginPage from "./pages/login/LoginPage";
import UserAddPage from "./pages/userAdd/UserAddPage";
import UserEdit from "./pages/userEdit/UserEditPage";
import UserListPage from "./pages/userList/UserListPage";
import CartPage from "./pages/cart/CartPage";
import ErrorPage from "./pages/error/ErrorPage";
import About from "./pages/about/About";
import styles from "./App.module.scss";
import { useAppDispatch } from "./hooks/redux-hooks";
import { cancelProductMessage } from "./store/product/productActions";
import PasswordResetPage from "pages/passwordReset/PasswordResetPage";

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
          <Route path="/password-reset" element={<PasswordResetPage />} />
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
