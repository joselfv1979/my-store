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
      <button
        className="btn btn-success py-2 px-5"
        data-testid="edit-button"
        onClick={() => navigate(`/edit-product/${id}`)}
      >
        <i className="fas fa-pencil-alt" />
      </button>
      <button
        className="btn btn-danger py-2 px-5"
        data-testid="trash-button"
        onClick={removeProduct}
      >
        <i className="fas fa-trash-alt" />
      </button>
    </>
  );
};

export default AdminButtons;
