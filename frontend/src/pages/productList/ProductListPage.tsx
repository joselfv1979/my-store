import ProductList from "../../components/productList/ProductList";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { AppMessage, AppWaiting } from "../../components/appStatus/AppStatus";
import {
  cancelProductMessage,
  fetchProducts,
} from "../../store/product/productActions";
import { useDeleteModalContext } from "../../context/deleteModal/DeleteModalContext";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { useEffect } from "react";
import SearchForm from "../../components/searchForm/SearchForm";
import { getMessage } from "utils/handleMessage";

// Displays a list of products
const ProductListPage = () => {
  const dispatch = useAppDispatch();
  const { status, message, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  const { showDeleteModal } = useDeleteModalContext();

  const note = getMessage(error, message);

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
