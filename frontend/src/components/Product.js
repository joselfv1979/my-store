import React from 'react';
import { useHistory } from "react-router-dom";

const Product = ({ product }) => {

    const history = useHistory();

    const showProductDetail = () => {
        history.push(`/product/${product.id}`)
    }

    return (
        <article className="product-content">
            <div className="product-detail-link"
                onClick={() => showProductDetail()} >
                <h2>{product.name}</h2>
                <img src={`/files/${product.image}`} alt={product.description} />
                <p>{product.description}</p>
            </div>
            <p>Price: {product.price} €</p>
            <p>Stock: {product.stock}</p>
        </article>
    )
}

export default Product;