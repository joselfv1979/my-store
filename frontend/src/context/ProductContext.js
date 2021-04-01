import React, { useState, useEffect, useContext, createContext } from 'react';
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {

    const { setMessage, setError, setWaiting } = useContext(AppContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {

        getProducts('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getProducts = async (parameters) => {
        try {
            setWaiting(true);
            const { data } = await axios.get(`/products${parameters}`);
            console.log(data.result);
            setProducts(data.result);
        } catch ({ response }) {
            response.data.message ?
                setError(response.data.message) :
                setError("Couldn't get products, try it later");
        } finally {
            // setTimeout(() => {
            //     setWaiting(false)
            // }, 3000)
            setWaiting(false);
        }
    };

    const deleteProduct = async (id, history) => {
        try {
            const { data } = await axios.delete(`/products/${id}`);
            setProducts(products.filter(product => product.id !== Number(id)));
            if (history) history.push("/");
            setMessage(data.message)
            clearMessage();
        } catch ({ response }) {
            response ?
                setError(response.data.message) :
                setError("Couldn't delete this product");
        }
    }

    // const sendDataProduct = (product) => {

    //     const { name, description, category, price, stock, image } = product;

    //     console.log('product-send', product);

    //     const data = new FormData();
    //     data.append('name', name);
    //     data.append('description', description);
    //     data.append('category', category);
    //     data.append('price', price);
    //     data.append('stock', stock);
    //     data.append('image', image);

    //     id ? editProduct(data) : addProduct(data);
    //     history.push(`/`)
    // }

    const addProduct = async (product) => {

        try {
            // TODO: validate product
            const { data } = await axios.post('/products/product-add', product);
            setProducts([...products, data.body]);
            setMessage(data.message);
            clearMessage();

        } catch ({ response }) {
            response ?
                setError(response.data.message) :
                setError("Couldn't create this product");
        }
    }

    const editProduct = async (productData, id) => {

        try {
            // TODO: validate product
            const { data } = await axios.put(`/products/product-edit/${id}`, productData);
            setProducts(
                products.map(product => {
                    if (product.id === Number(id)) {
                        return data.body
                    }
                    return product;
                })
            )
            setMessage(data.message)
            clearMessage();
        } catch ({ response }) {
            response ?
                setError(response.data.message) :
                setError("Couldn't update this product");
        }
    }

    const clearMessage = () => {
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    return (
        <ProductContext.Provider value={{ products, addProduct, getProducts, editProduct, deleteProduct, setProducts }}>
            {children}
        </ProductContext.Provider>
    )
}

export { ProductContext, ProductContextProvider };