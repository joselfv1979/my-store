import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProductForm from '../components/ProductForm';
import '../css/ProductFormPage.css'

const ProductFormPage = ({ match }) => {

    const { id } = match.params;

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [name, setName] = useState();
    const [category, setCategory] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [stock, setStock] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {

        if (id) {
            const getProduct = async (id) => {
                try {
                    const response = await axios.get(`/products/${id}`);
                    console.log(response);
                    setName(response.data.product.name);
                    setCategory(response.data.product.category);
                    setDescription(response.data.product.description);
                    setPrice(response.data.product.price);
                    setStock(response.data.product.stock);
                } catch (error) {
                    console.log(error.response);
                    setError(error.response.data.message)
                }
            };
            getProduct(id);
        }
    }, [id]);

    const addProduct = async ({ name, description, category, price, stock, image }) => {

        try {
            const data = new FormData();
            data.append('name', name);
            data.append('description', description);
            data.append('category', category);
            data.append('price', price);
            data.append('stock', stock);
            data.append('image', image);

            // TODO: validate product
            const response = await axios.post('/products/product-add', data);
            setMessage(response.data.message);
            clearMessage();

        } catch (error) {
            error.response.status !== 500 ?
                setError(error.response.data.message) :
                setError("Couldn't create this product");
        }
    }

    const editProduct = async ({ name, category, description, price, stock }) => {
        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('category', category);
        data.append('price', price);
        data.append('stock', stock);
        data.append('image', image);
        try {
            // TODO: validate product
            const response = await axios.put(`/products/product-edit/${id}`, data);
            setMessage(response.data.message)
            clearMessage();
        } catch (error) {
            error.response.status !== 500 ?
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
            {error && (<div className="error">{error}
                <button onClick={() => setError(false)}>x</button>
            </div>)}

            {message && (<div className="success"> {message}
                <button onClick={() => setMessage(null)}>x</button>
            </div>)}

            {id ? (<h2>Edit Product</h2>) : (<h2>New Product</h2>)}

            <ProductForm
                addProduct={addProduct}
                editProduct={editProduct}
                id={id}
                name={name}
                setName={setName}
                category={category}
                setCategory={setCategory}
                description={description}
                setDescription={setDescription}
                price={price}
                setPrice={setPrice}
                stock={stock}
                setStock={setStock}
                image={image}
                setImage={setImage}
            />
        </>
    )
}

export default ProductFormPage;