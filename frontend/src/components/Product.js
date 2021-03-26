import React from 'react';
import { useHistory } from "react-router-dom";

const Product = ({ product, quantity, id, substractToList, addToList }) => {

    const history = useHistory();

    const showProductDetail = () => {
        history.push(`/product/${product.id}`)
    }

    return (
        <article className="product-content">

            <div className="product-image">
                <img src={`/files/${product.image}`} alt={product.name} />
            </div>

            <div className="product-data">
                <h3>{product.name}</h3>
                <p>Price: {product.price} €</p>
                <p>Stock: {product.stock}</p>
            </div>

        </article>
    )
}

export default Product;