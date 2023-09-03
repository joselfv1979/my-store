import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDeleteModalContext } from "../context/deleteModal/DeleteModalContext";
import { useAppDispatch } from "../hooks/redux-hooks";
import { deleteProduct } from "../store/product/productActions";

const DeleteModal = () => {
  const { showDeleteModal, setShowDeleteModal, id } = useDeleteModalContext();
  const handleClose = () => setShowDeleteModal(false);

  const dispatch = useAppDispatch();

  const deleteItem = () => {    
    if(id) dispatch(deleteProduct(id));
    handleClose();
  };

  return (
    <Modal size="sm" show={showDeleteModal} onHide={handleClose}>
      <Modal.Header  closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={deleteItem}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
