import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import { UserContext } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Product from '../components/Product';
import AdminButtons from '../components/AdminButtons';

const ProductDetailPage = ({ match }) => {

    const { id } = match.params;

    const { setMessage, setError, setWaiting } = useContext(AppContext);
    const { isAdmin, setIsAdmin } = useContext(UserContext);

    const [product, setProduct] = useState(null);

    const history = useHistory();

    useEffect(() => {

        localStorage.getItem('role') === 'admin' ?
            setIsAdmin(true) : setIsAdmin(false);

        const getProduct = async () => {
            try {
                const response = await axios.get(`/products/${id}`);
                setProduct(response.data.product);
            } catch (error) {
                // setError(error.message)
                console.log(error);
            }
        }
        getProduct()
    }, [id]);

    // const deleteProduct = async (id) => {
    //     try {
    //         const { data } = await axios.delete(`/products/${id}`);
    //         setMessage(data.message)
    //         clearMessage();
    //     } catch (error) {
    //         error.response.status === 500 || error.response.status === 404 ?
    //             setError("Couldn't delete this product") :
    //             setError(error.response.data.message)
    //     }
    // }

    const editProduct = (id) => {
        history.push(`/edit/${id}`)
    }

    const clearMessage = () => {
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    return (

        <div className="modal">
            Product Detail
            <div className="modalBox">
                <button className="close-button" onClick={() => history.push('/')}>x</button>
                {product ? <Product product={product} />
                    : <h2>Cargando ...</h2>}
                {isAdmin ?
                    <AdminButtons
                        editProduct={editProduct}
                        id={id}
                    /> :
                    <button className="add-button">Add to list +</button>}
            </div>
        </div>
    )
}

export default ProductDetailPage;