import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { clearMessage } from "./actions/messageActions";
import { logoutAction } from "./actions/userActions";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { AppMessage } from "./components/AppStatus";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductFormPage from "./pages/ProductFormPage";
import LoginPage from "./pages/LoginPage";
import UserFormPage from "./pages/UserFormPage";
import UserEdit from "./pages/UserEditPage";
import UserListPage from "./pages/UserListPage";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/About";
import styles from "./App.module.scss";

//{ dispatch, user, message, logged, items }

function App() {
  // const removeMessage = () => dispatch(clearMessage());
  // const userLogout = () => dispatch(logoutAction());

  return (
    <div className={styles.App}>
      <Menu />
      {/* {message.message && (
        <AppMessage message={message} removeMessage={removeMessage} />
      )} */}

      <main>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/new-product" element={<ProductFormPage />} />
          <Route path="/edit-product/:id" element={<ProductFormPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<UserFormPage />} />
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

// const totalItems = (state) => {
//   return state.cart.cartList.reduce((sum, curr) => sum + curr.quantity, 0);
// };

// const mapStateToProps = (state) => ({
//   message: state.message,
//   user: state.user.user,
//   logged: state.user.logged,
//   items: totalItems(state),
// });

// export default connect(mapStateToProps)(App);
export default App;
