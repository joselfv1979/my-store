import React, { useContext } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 
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

        <Header />

        <main className="center">
            <Route exact path="/" component={ProductListPage} />
            <Route path="/new" component={ProductFormPage} message={message} />
            <Route path="/edit/:id" component={ProductFormPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
