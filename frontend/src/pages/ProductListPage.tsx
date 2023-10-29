import ProductList from "../components/productList/ProductList";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { AppMessage, AppWaiting } from "../components/appStatus/AppStatus";
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
  const { status, message, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  const { showDeleteModal } = useDeleteModalContext();

  const note: Message = {
    type: error ? Status.DANGER : Status.SUCCESS,
    text: error ?? message,
  };

  const cancelMessage = () => {
    dispatch(cancelProductMessage());
  };

  return (
    <>
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {status === "loading" ? (
        <AppWaiting />
      ) : (
        <>
          <SearchForm />
          <ProductList />
        </>
      )}
      {showDeleteModal && <DeleteModal />}
    </>
  );
};

export default ProductListPage;
