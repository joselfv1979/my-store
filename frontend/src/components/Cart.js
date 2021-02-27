import React from 'react';

const Cart = ({ cart }) => {
    
    return cart.map(product => (
        <li className="info-cart" key={product.id}>
            <p>{product.name}</p>
            <img src={`/files/${product.image}`}
             alt={product.description}
             className="cart-image" />
             <p>{product.price} x {product.quantity}</p>
             <p>{(product.price*product.quantity).toFixed(2)} €</p>
        </li>
    ))
}

export default Cart;