import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const AdminButtons = ({ deleteProduct, editProduct, id }) => {
    return (
        <div className="admin-buttons">

            <Button variant="contained" color="primary" size="medium"
                onClick={() => editProduct(id)}>
                <EditIcon fontSize="small" />
            </Button>

            <Button variant="contained" color="secondary" size="medium"
                onClick={() => {
                    if (window.confirm('Are you sure to delete?')) {
                        deleteProduct(id);
                    }
                }}>
                <DeleteIcon fontSize="small" />
            </Button>

        </div>
    )
}

export default AdminButtons; 