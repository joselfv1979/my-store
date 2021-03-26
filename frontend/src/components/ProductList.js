import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';
import Product from './Product';
import AdminButtons from './AdminButtons';
import UserButtons from './UserButtons';

const ProductList = ({
    addToList, substractToList
}) => {

    const { isAdmin, setIsAdmin } = useContext(UserContext);
    const { products } = useContext(ProductContext);

    useEffect(() => {
        localStorage.getItem('role') === 'admin' ?
            setIsAdmin(true) : setIsAdmin(false);
    }, [setIsAdmin]);

    const list = () => {

        return products.map(product => (

            <li className="info" key={product.id}>
                <Product
                    product={product}
                />
                {isAdmin ?
                    <AdminButtons
                        id={product.id}
                    /> :
                    <UserButtons
                        addToList={addToList}
                        substractToList={substractToList}
                        id={product.id}
                        quantity={product.quantity}
                    />}
            </li>
        ))
    }

    return (
        <div className="product-list">
            <ul>{list()}</ul>
        </div>
    )
}

export default ProductList;