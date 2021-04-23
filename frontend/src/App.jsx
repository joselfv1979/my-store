import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { hideError, hideMessage } from './actions/messageActions';
import { logoutAction } from './actions/userActions';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductFormPage from './pages/ProductFormPage';
import LoginPage from './pages/LoginPage';
import UserFormPage from './pages/UserFormPage';
import CartPage from './pages/CartPage';
import About from './pages/About';
import { AppMessage, AppError, AppWaiting } from './components/AppStatus';
import './App.css';

function App({ dispatch, user, message, error, logged }) {

  const removeError = () => dispatch(hideError());
  const removeMessage = () => dispatch(hideMessage());
  const userLogout = () => dispatch(logoutAction());

  return (
    <BrowserRouter>
      <div className='App'>
        
        <AppWaiting />
        <Menu logged={logged} user={user} userLogout={userLogout}/>
        <AppMessage message={message} removeMessage={removeMessage}/>
        <AppError error={error} removeError={removeError}/>

        <main>
          <Route exact path="/" component={ProductListPage} />
          <Route path="/product/:id" component={ProductDetailPage} />
          <Route path="/new" component={ProductFormPage} />
          <Route path="/edit/:id" component={ProductFormPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={UserFormPage} />
          <Route path="/edit-profile" component={UserFormPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/about" component={About} />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  loading: state.products.loading,
  error: state.message.error,
  message: state.message.message,
  user: state.user.user,
  logged: state.user.logged
})

export default connect(mapStateToProps)(App);
