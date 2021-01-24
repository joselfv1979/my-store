import React from 'react';
import { useHistory } from "react-router-dom";

const ProductList = ({
    products, deleteProduct
}) => {

    const history = useHistory();

    return (
        <div>
            <ul>
                {
                    products.map(product => (
                        <li className="info" key={product.id}>
                            <article>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>Price: {product.price} €</p>
                                <p>Stock: {product.stock}</p>
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure to delete?')) {
                                            deleteProduct(product.id);
                                        }
                                    }}
                                >Delete
                                </button>
                                <button
                                    onClick={() => history.push(`/edit/${product.id}`)}
                                >Edit
                                </button>
                            </article>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ProductList;