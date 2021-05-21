import React from 'react';
import { useHistory } from "react-router-dom"
import styles from '../scss/AdminButtons.module.scss'

const AdminButtons = ({ id, deleteProduct }) => {

    const history = useHistory();

    return (
        <div className={styles.admin}>

            <button className={styles.edit}
                onClick={() => history.push(`/edit/${id}`) }>
                    <i className="fas fa-pencil-alt"></i>
            </button>

            <button className={styles.remove}
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