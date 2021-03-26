import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductFormPage from './pages/ProductFormPage';
import LoginPage from './pages/LoginPage';
import UserFormPage from './pages/UserFormPage';
import About from './pages/About';
import { AppMessage, AppError, AppWaiting } from './components/AppStatus';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div className='App'>
        <AppWaiting />
        <Menu />
        <AppMessage />
        <AppError />
        <main>
          <Route exact path="/" component={ProductListPage} />
          <Route path="/product/:id" component={ProductDetailPage} />
          <Route path="/new" component={ProductFormPage} />
          <Route path="/edit/:id" component={ProductFormPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={UserFormPage} />
          <Route path="/edit-profile" component={UserFormPage} />
          <Route path="/about" component={About} />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
