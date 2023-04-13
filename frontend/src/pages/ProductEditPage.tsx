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
import { type Message, Status } from "../types/Message.d";

const ProductEditPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { loading, product, message, error } = useAppSelector(
    (state) => state.product
  );

  const note: Message = error
    ? {
        type: Status.danger,
        text: error,
      }
    : {
        type: Status.success,
        text: message,
      };

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
      {product && <ProductForm saveProduct={saveProduct} editing={true} />}
    </>
  );
};

export default ProductEditPage;
