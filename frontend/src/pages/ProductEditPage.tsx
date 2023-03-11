import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { AppMessage, AppWaiting } from "../components/AppStatus";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import {
  cancelProductMessage,
  editProduct,
  fetchProduct,
} from "../store/product/productActions";
import { Message } from "../types/Message";

const ProductEditPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { loading, product, message, error } = useAppSelector(
    (state) => state.product
  );

  const note: Message = {
    type: error ? 'danger' : 'success',
    text: error || message
  }

  useEffect(() => {
    if (id) dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const saveProduct = async (data: FormData) => {
    dispatch(editProduct(data));
  };

  const cancelMessage = () => {
    dispatch(cancelProductMessage());
  };

  return (
    <>
      {loading && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {product && <ProductForm saveProduct={saveProduct} />}
    </>
  );
};

export default ProductEditPage;
