import { connect } from 'react-redux';
import Cart from './../components/Cart';
import './../css/Cart.css';

const CartPage = ({ cart, total }) => {

    return (
        <div className="cart-container">
            <h2>My Cart</h2>
            <Cart cart={cart}/>
            <p>Total: {total} €</p>
        </div>
    )
}

const totalPrice = state => {
    return state.cart.cartList
        .reduce((sum, curr) => sum + (curr.price * curr.quantity), 0)
        .toFixed(2)
}

const mapStateToProps = state => ({
    loading: state.products.loading,
    error: state.products.error,
    cart: state.cart.cartList,
    total: totalPrice(state)
})

export default connect(mapStateToProps)(CartPage);