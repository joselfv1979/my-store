import ProductList from "../components/ProductList";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { AppMessage, AppWaiting } from "../components/AppStatus";
import {
  cancelProductMessage,
  fetchProducts,
} from "../store/product/productActions";
import { Message, Status } from "../types/Message";
import { useDeleteModalContext } from "../context/deleteModal/DeleteModalContext";
import DeleteModal from "../components/DeleteModal";
import { useEffect } from "react";
import SearchForm from "../components/SearchForm";

const ProductListPage = () => {

  const dispatch = useAppDispatch();
  const { status, message, error } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {    
    if(status === 'idle') dispatch(fetchProducts());
  }, [dispatch, status])

  const { showDeleteModal } = useDeleteModalContext();

  const note: Message = error
  ? {
      type: Status.DANGER,
      text: error,
    }
  : {
      type: Status.SUCCESS,
      text: message,
    };

  const cancelMessage = () => {
    dispatch(cancelProductMessage());
  };

  return (
    <>
      {status === 'loading' && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {status === 'success' && <SearchForm />}
      {status === 'success' && <ProductList />}
      {showDeleteModal && <DeleteModal />}
    </>
  );
};

export default ProductListPage;
