import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProductList from '../components/ProductList';

const ProductListPage = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('/products');
                setProducts(response.data);
            } catch (error) {
                setError(error.message)
            }
        };
        getProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
            if (response.data.success) {
                setMessage(response.data.message)
            }
            clearMessage();
        } catch (error) {
            // const {response} = error;
            // response.status === 404 ?
            // setError(response.data.message) :
            // setError("Couldn't delete this product");
            setError("Couldn't delete this product");
        }
    }

    const clearMessage = () => {
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    return (
        <>
            {message ? (
                <div className="success">
                    <p>{message}</p>
                    <button onClick={() => setMessage(null)}>x</button>
                </div>
            ) : null}
            {error ? (
                <div className="error">
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>x</button>
                </div>
            ) : null}
            <div>
                <h2>Products</h2>
                <ProductList
                    products={products}
                    deleteProduct={deleteProduct}
                />
            </div>
        </>

    )
}


export default ProductListPage;