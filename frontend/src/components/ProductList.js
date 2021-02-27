import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import Product from './Product';
import AdminButtons from './AdminButtons';
import UserButtons from './UserButtons';

const ProductList = ({
    products, deleteProduct, addToList, substractToList
}) => {

    const { isAdmin, setIsAdmin } = useContext(UserContext);

    const history = useHistory();

    useEffect(() => {
        localStorage.getItem('role') === 'admin' ?
            setIsAdmin(true) : setIsAdmin(false);
    }, []);

    const editProduct = (id) => {
        history.push(`/edit/${id}`)
    }

    const list = () => {

        return products.map(product => (

            <li key={product.id}>
                <Product
                    product={product}
                    deleteProduct={deleteProduct}
                />
                {isAdmin ?
                    <AdminButtons
                        deleteProduct={deleteProduct}
                        editProduct={editProduct}
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
        <div>
            <ul>{list()}</ul>
        </div>
    )
}

export default ProductList;