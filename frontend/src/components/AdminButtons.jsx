import React from 'react';
import { useHistory } from "react-router-dom"
import '../css/AdminButtons.css'

const AdminButtons = ({ id, deleteProduct }) => {

    const history = useHistory();

    return (
        <div className="admin-buttons">

            <button className="edit-product-button"
                onClick={() => history.push(`/edit/${id}`) }>
                    <i className="fas fa-pencil-alt"></i>
            </button>

            <button className="remove-product-button"
                onClick={() => {
                    if (window.confirm('Are you sure to delete?')) {
                        deleteProduct(id);
                    }
                }}>
                    <i className="fas fa-trash-alt"></i>
            </button>

        </div>
    )
}

export default AdminButtons; 