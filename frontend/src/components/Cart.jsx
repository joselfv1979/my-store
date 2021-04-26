import Product from './Product';

const Cart = ({ cart }) => {

    return cart.map(product => (
        <li className="cart-product-card" key={product.id}>
            {/* <img src={`/files/${product.image}`}
                alt={product.description}
                className="cart-product-image" />
            <div className="cart-product-text">
                <p>{product.name}</p>
                <p>{product.price} x {product.quantity}</p>
                <p>{(product.price * product.quantity).toFixed(2)} €</p>
            </div> */}
            <Product product={product}/>
            <p>{product.quantity} x {product.price} {(product.price * product.quantity).toFixed(2)} €</p>
        </li>
    ))
}

export default Cart;