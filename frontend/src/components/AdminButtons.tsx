import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import styles from "../scss/AdminButtons.module.scss";
import { deleteProduct } from "../store/product/productActions";

type Props = {
  id: string | undefined;
};

const AdminButtons = ({ id }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removeProduct = () => {
    if (window.confirm("Are you sure to delete?") && id) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <Button variant="success" onClick={() => navigate(`/edit-product/${id}`)}>
        <i className="fas fa-pencil-alt"></i>
      </Button>
      <Button
        className={styles.danger}
        variant="danger"
        onClick={removeProduct}
      >
        <i className="fas fa-trash-alt"></i>
      </Button>
    </>
  );
};

export default AdminButtons;
