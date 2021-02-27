import React, { useContext } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductFormPage from './pages/ProductFormPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 
import AccountPage from './pages/AccountPage';
import About from './pages/About';
import { ProductContext } from './context/ProductContext';
import './App.css';

function App() {

  const {message, setMessage} = useContext(ProductContext);

  return (
    <BrowserRouter>
      <div className='App'>
        {message ? (
          <div className="success">
            <p>{message}</p>
            <button onClick={() => setMessage(null)}>x</button>
          </div>
        ) : null}

        <Menu />

        <main>
            <Route exact path="/" component={ProductListPage} />
            <Route path="/product/:id" component={ProductDetailPage} />
            <Route path="/new" component={ProductFormPage} message={message} />
            <Route path="/edit/:id" component={ProductFormPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/my-account" component={AccountPage} />
            <Route path="/about" component={About} />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
