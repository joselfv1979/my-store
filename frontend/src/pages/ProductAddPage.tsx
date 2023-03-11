import { AppWaiting, AppMessage } from "../components/AppStatus";
import ProductForm from "../components/ProductForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import {
  addProduct,
  cancelProductMessage,
} from "../store/product/productActions";
import { Message } from "../types/Message";

const ProductFormPage = () => {
  const dispatch = useAppDispatch();

  const { loading, message, error } = useAppSelector((state) => state.product);

  const note: Message = {
    type: error ? "danger" : "success",
    text: error || message,
  };

  const saveProduct = async (data: FormData) => {
    dispatch(addProduct(data));
  };

  const cancelMessage = () => {
    dispatch(cancelProductMessage());
  };

  return (
    <>
      {loading && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} /> }
      {!loading && <ProductForm saveProduct={saveProduct} />}
    </>
  );
};

export default ProductFormPage;
