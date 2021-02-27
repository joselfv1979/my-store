import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProductList from '../components/ProductList';
import ProductSearch from '../components/ProductSearch';
import Cart from '../components/Cart'
import '../css/ProductListPage.css'

const ProductListPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState(null);
    const [category, setCategory] = useState();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getProducts('');
    }, []);

    const getProducts = async (parameters) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`/products${parameters}`);
            setProducts(data.result);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message)
        }
    };

    const deleteProduct = async (id) => {
        try {
            const { data } = await axios.delete(`/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
            setMessage(data.message)
            clearMessage();
        } catch (error) {
            error.response.status === 500 || error.response.status === 404 ?
                setError("Couldn't delete this product") :
                setError(error.response.data.message)
        }
    }

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
            {isLoading && (<div> ...Loading </div>)}

            {error && (<div className="error">{error}
                <button onClick={() => setError(false)}>x</button>
            </div>)}

            {message && (<div className="success"> {message}
                <button onClick={() => setMessage(null)}>x</button>
            </div>)}

            <ProductSearch
                name={name}
                setName={setName}
                category={category}
                setCategory={setCategory}
                getProducts={getProducts}
            />

            <div className="product-list">

                <aside></aside>

                <section>

                    <h2>Products</h2>

                    <ProductList
                        products={products}
                        deleteProduct={deleteProduct}
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