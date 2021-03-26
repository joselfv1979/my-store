import React , { useContext } from 'react';
import { useHistory } from "react-router-dom"
import { ProductContext } from '../context/ProductContext';
import '../css/AdminButtons.css'

const AdminButtons = ({ id }) => {

    const { deleteProduct } = useContext(ProductContext);

    const history = useHistory();

    return (
        <div className="admin-buttons">

            <button className="edit-product-button"
                onClick={() => history.push(`/edit/${id}`) }>
                    <i class="fas fa-pencil-alt"></i>
            </button>

            <button className="remove-product-button"
                onClick={() => {
                    if (window.confirm('Are you sure to delete?')) {
                        deleteProduct(id, history);
                    }
                }}>
                    <i class="fas fa-trash-alt"></i>
            </button>

        </div>
    )
}

export default AdminButtons; 