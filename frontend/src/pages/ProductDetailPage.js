import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Product from '../components/Product';

const ProductDetailPage = ({ match }) => {

    const { id } = match.params;

    // const [error, setError] = useState(null);
    // const [message, setMessage] = useState(null);
    const [product, setProduct] = useState(null);

    const history = useHistory();

    useEffect(() => {

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

    return (
        
        <div className="modal">
            Product Detail
            <div className="modalBox">
            <button className="close-button" onClick={() => history.push('/')}>x</button>
              {product ? <Product product={product} /> 
              : <h2>Cargando ...</h2>}
              <button className="add-button">Add to list +</button>
            </div>
        </div>
    )
}

export default ProductDetailPage;