import ProductList from "../components/ProductList";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { AppMessage, AppWaiting } from "../components/AppStatus";
import {
  cancelProductMessage,
  fetchProducts,
} from "../store/product/productActions";
import { Message } from "../types/Message";
import { useDeleteModalContext } from "../context/deleteModal/DeleteModalContext";
import DeleteModal from "../components/DeleteModal";
import { useEffect } from "react";

const ProductListPage = () => {
  const dispatch = useAppDispatch();
  const { showDeleteModal } = useDeleteModalContext();

  const { loading, products, message, error } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
      if(loading)dispatch(fetchProducts());
  }, [dispatch, loading]);

  const note: Message = {
    type: error ? "danger" : "success",
    text: error || message,
  };

  const cancelMessage = () => {
    dispatch(cancelProductMessage());
  };

  return (
    <>
      {loading && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {products && <ProductList />}
      {showDeleteModal && <DeleteModal />}
    </>
  );
};

export default ProductListPage;
