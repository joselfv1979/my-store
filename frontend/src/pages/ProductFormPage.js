import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ProductContext } from '../context/ProductContext';
import axios from "axios";
import ProductForm from '../components/ProductForm';
import '../css/ProductFormPage.css'

const ProductFormPage = ({ match }) => {

    const { setMessage, setError, setWaiting } = useContext(AppContext);
    const { addProduct, editProduct } = useContext(ProductContext);

    const { id } = match.params;

    const history = useHistory();

    const [product, setProduct] = useState({});

    useEffect(() => {

        if (id) {
            const getProduct = async (id) => {
                try {
                    const { data } = await axios.get(`/products/${id}`);
                    console.log('product', data.product);
                    setProduct(data.product);
                } catch (error) {
                    console.log(error.response);
                    setError(error.response.data.message);
                }
            };
            getProduct(id);
        }
    }, [id, setError]);

    const sendDataProduct = (product) => {

        const { name, description, category, price, stock, image } = product;

        console.log('product-send', product);

        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('category', category);
        data.append('price', price);
        data.append('stock', stock);
        data.append('image', image);

        id ? editProduct(data, id) : addProduct(data);
        history.push(`/`)
    }

    // const addProduct = async (product) => {

    //     try {
    //         // TODO: validate product
    //         const { data } = await axios.post('/products/product-add', product);
    //         console.log(data.message);
    //         setMessage(data.message);
    //         clearMessage();

    //     } catch (error) {
    //         error.response.status !== 500 ?
    //             setError(error.response.data.message) :
    //             setError("Couldn't create this product");
    //     }
    // }

    // const editProduct = async (product) => {

    //     try {
    //         // TODO: validate product
    //         const { data } = await axios.put(`/products/product-edit/${id}`, product);
    //         console.log(data);
    //         setMessage(data.message)
    //         clearMessage();
    //     } catch ({ response }) {
    //         console.log(response.data.message);
    //         response.data.message ?
    //             setError(response.data.message) :
    //             setError("Couldn't update this product");
    //     }
    // }

    // const clearMessage = () => {
    //     setTimeout(() => {
    //         setMessage(null)
    //     }, 3000)
    // }

    return (
        <>
            {id ? (<h2>Edit Product</h2>) : (<h2>New Product</h2>)}

            <ProductForm
                sendDataProduct={sendDataProduct}
                product={product}
                setProduct={setProduct}
            />
        </>
    )
}

export default ProductFormPage;