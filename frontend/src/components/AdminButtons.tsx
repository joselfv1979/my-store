import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../actions/productActions";
import styles from "../scss/AdminButtons.module.scss";

type Props = {
  id: string,
}

const AdminButtons = ({ id }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.admin}>
      <button className={styles.edit} onClick={() => navigate(`/edit/${id}`)}>
        <i className="fas fa-pencil-alt"></i>
      </button>

      <button
        className={styles.remove}
        onClick={() => {
          if (window.confirm("Are you sure to delete?")) {
            deleteProduct();
          }
        }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default AdminButtons;
