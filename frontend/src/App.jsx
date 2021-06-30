import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./utils/history";
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
import UserEdit from './pages/UserEditPage';
import UserListPage from './pages/UserListPage'
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/About";
import styles from "./App.module.scss";

function App({ dispatch, user, message, logged, items }) {
  const removeMessage = () => dispatch(clearMessage());
  const userLogout = () => dispatch(logoutAction());

  history.listen((location, action) => {
    dispatch(clearMessage());
  });

  return (
    <Router history={history}>
      <div className={styles.App}>
        <Menu
          logged={logged}
          user={user}
          items={items}
          userLogout={userLogout}
        />
        {message.message && (
          <AppMessage message={message} removeMessage={removeMessage} />
        )}

        <main>
          <Switch>
            <Route exact path="/" component={ProductListPage} />
            <Route path="/product/:id" component={ProductDetailPage} />
            <Route path="/new-product" component={ProductFormPage} />
            <Route path="/edit/:id" component={ProductFormPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={UserFormPage} />
            <Route path="/users" component={UserListPage} />
            <Route path="/edit-profile/:id" component={UserEdit} />
            <Route path="/cart" component={CartPage} />
            <Route path="/about" component={About} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

const totalItems = (state) => {
  return state.cart.cartList.reduce((sum, curr) => sum + curr.quantity, 0);
};

const mapStateToProps = (state) => ({
  message: state.message,
  user: state.user.user,
  logged: state.user.logged,
  items: totalItems(state),
});

export default connect(mapStateToProps)(App);
