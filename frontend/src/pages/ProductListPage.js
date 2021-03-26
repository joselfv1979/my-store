import React, { useState, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import { ProductContext } from '../context/ProductContext';
import ProductList from '../components/ProductList';
import ProductSearch from '../components/ProductSearch';
import Cart from '../components/Cart'
import '../css/ProductListPage.css'

const ProductListPage = () => {

    const { setMessage, setError } = useContext(AppContext);

    const { products, setProducts } = useContext(ProductContext);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const addToList = (id) => {

        setProducts(
            products.map(product => {
                if (product.id === id) {
                    product.quantity ? ++product.quantity
                        : product.quantity = 1
                }
                return product;
            })
        )

        setCart(products.filter(product => product.quantity > 0));

        setTotal(calculateTotal());
    }

    const substractToList = (id) => {

        setProducts(
            products.map(product => {
                if (product.id === id) {
                    product.quantity--;
                }
                return product;
            })
        )

        setCart(
            cart.filter(product => product.quantity > 0)
        )

        setTotal(calculateTotal());
    }

    const calculateTotal = () => {

        let total = products.filter(p => p.quantity > 0)
            .map(el => el.quantity * el.price)
            .reduce((a, b) => (a + b), 0)
        return total.toFixed(2)
    }

    const clearMessage = () => {
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    return (
        <>
            <div className="product-container">

                <aside></aside>

                <section>
                    <ProductSearch
                    />
                    <ProductList
                        addToList={addToList}
                        substractToList={substractToList}
                    />
                </section>

                <aside>
                    {cart.length > 0 ? (
                        <>
                            <h3>Your Cart:</h3>
                            <ul>
                                <Cart
                                    cart={cart}
                                />
                            </ul>
                            <p>Total: {total} €</p>
                        </>
                    ) : null}
                </aside>

            </div>
        </>
    )
}

export default ProductListPage;