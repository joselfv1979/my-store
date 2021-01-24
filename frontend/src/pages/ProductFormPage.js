import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProductForm from '../components/ProductForm';

const ProductFormPage = ({ match }) => {

    const { id } = match.params;

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [name, setName] = useState();
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [stock, setStock] = useState(null);

    useEffect(() => {

        if (id) {
            const getProduct = async (id) => {
                try {
                    const response = await axios.get(`/products/${id}`);
                    setName(response.data.product.name);
                    setDescription(response.data.product.description);
                    setPrice(response.data.product.price);
                    setStock(response.data.product.stock);
                } catch (error) {
                    setError(error.message)
                }
            };
            getProduct(id);
        }
    }, [id]);

    const addProduct = async ({ name, description, price, stock }) => {
        const newProduct = {
            name,
            description,
            price,
            stock
        };
        try {
            // TODO: validate product
            const response = await axios.post('/products/product-add', newProduct);
            if (response.data.success) {
                setMessage(response.data.message)
            }
            clearMessage();

        } catch (error) {
            error.response.status === 500 ?
                setError(error.response.data.message) :
                setError("Couldn't create this product");
        }
    }

    const editProduct = async ({ name, description, price, stock }) => {
        const updatedProduct = {
            id,
            name,
            description,
            price,
            stock
        };
        try {
            // TODO: validate product
            const response = await axios.put(`/products/product-edit/${id}`, updatedProduct);
            if (response.data.success) {
                setMessage(response.data.message)
            }
            clearMessage();
        } catch (error) {
            error.response.status === 500 ?
                setError(error.response.data.message) :
                setError("Couldn't update this product");
        }
    }

    const clearMessage = () => {
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    return (
        <>
            {error ? (
                <div className="error">
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>x</button>
                </div>
            ) : null}
            {message ? (
                <div className="success">
                    <p>{message}</p>
                    <button onClick={() => setMessage(null)}>x</button>
                </div>
            ) : null}
            {id ? (<h2>Edit Product</h2>) : (<h2>New Product</h2>)}
            <ProductForm
                addProduct={addProduct}
                editProduct={editProduct}
                id={id}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                price={price}
                setPrice={setPrice}
                stock={stock}
                setStock={setStock}
            />
        </>
    )
}

export default ProductFormPage;