import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDeleteModalContext } from "../../context/deleteModal/DeleteModalContext";

type Props = {
  id: string | undefined;
};

const AdminButtons = ({ id }: Props) => {
  const navigate = useNavigate();

  const { setShowDeleteModal, setId } = useDeleteModalContext();

  const removeProduct = () => {
    setShowDeleteModal(true);
    if (id) {
      setId(id);
    }
  };

  return (
    <>
      <Button
        data-testid="edit-button"
        variant="success"
        onClick={() => navigate(`/edit-product/${id}`)}
      >
        <i className="fas fa-pencil-alt"></i>
      </Button>
      <Button
        data-testid="trash-button"
        variant="danger"
        onClick={removeProduct}
      >
        <i className="fas fa-trash-alt"></i>
      </Button>
    </>
  );
};

export default AdminButtons;
