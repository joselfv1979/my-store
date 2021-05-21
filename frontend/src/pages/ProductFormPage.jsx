import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addProductAction, editProductAction } from '../actions/productsActions';
import { setError } from '../actions/messageActions'
import axios from "axios";
import ProductForm from '../components/ProductForm';

const ProductFormPage = ({ match, dispatch }) => {

    const { id } = match.params;

    const [product, setProduct] = useState({});

    const [editingImage, setEditingImage] = useState(true);

    useEffect(() => {

        if (id) {
            const getProduct = async (id) => {
                try {
                    const { data } = await axios.get(`/products/${id}`);
                    setProduct(data.product);
                    setEditingImage(false);
                } catch (error) {
                    dispatch(setError(error.response.data.message));
                }
            };
            getProduct(id);
        }
    }, [dispatch, id]);

    const addProduct = (data) => {
        dispatch(addProductAction(data))
    }

    const editProduct = (data, id) => {
        dispatch(editProductAction(data, id));
    }

    const handleFormSubmit = (data) => {
    
        console.log('data',data);
    
        sendDataProduct(data);
      };

    const sendDataProduct = (product) => {

        const { name, description, category, price, stock, image } = product;

        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('category', category);
        data.append('price', price);
        data.append('stock', stock);
        data.append('image', image);

        id ? editProduct(data, id) : addProduct(data);
    }

    return (
        <>
            <ProductForm
                handleFormSubmit={handleFormSubmit}
                product={product}
                setProduct={setProduct}
                editingImage={editingImage}
                setEditingImage={setEditingImage}
            />
        </>
    )
}

const mapStateToProps = state => ({
    loading: state.products.loading,
    products: state.products.products,
    product: state.products.product,
    error: state.products.error,
})

export default connect(mapStateToProps)(ProductFormPage);