import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { AppMessage, AppWaiting } from "../components/appStatus/AppStatus";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import {
  cancelProductMessage,
  editProduct,
  fetchProduct,
} from "../store/product/productActions";
import { type Message, Status } from "../types/Message";

const ProductEditPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { status, product, message, error } = useAppSelector(
    (state) => state.product
  );

  const note: Message = error
    ? {
        type: Status.DANGER,
        text: error,
      }
    : {
        type: Status.SUCCESS,
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
      {status === "loading" && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {product && <ProductForm saveProduct={saveProduct} editing={true} />}
    </>
  );
};

export default ProductEditPage;
