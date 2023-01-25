import React from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductFormPage from "./pages/ProductFormPage";
import LoginPage from "./pages/LoginPage";
import UserAddPage from "./pages/UserAddPage";
import UserEdit from "./pages/UserEditPage";
import UserListPage from "./pages/UserListPage";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/About";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <Menu />

      <main>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/new-product" element={<ProductFormPage />} />
          <Route path="/edit-product/:id" element={<ProductFormPage />} />
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
