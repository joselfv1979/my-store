import { AppWaiting, AppMessage } from "../../components/appStatus/AppStatus";
import ProductForm from "../../components/productForm/ProductForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  addProduct,
  cancelProductMessage,
} from "../../store/product/productActions";
import { Message, Status } from "../../types/Message";

const ProductFormPage = () => {
  const dispatch = useAppDispatch();

  const { status, message, error } = useAppSelector((state) => state.product);

  const note: Message = {
    type: error ? Status.DANGER : Status.SUCCESS,
    text: error ?? message,
  };  

  const saveProduct = async (data: FormData) => {
    dispatch(addProduct(data));
  };

  const cancelMessage = () => {
    dispatch(cancelProductMessage());
  };

  return (
    <>
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} /> }
      {status === 'loading' ? <AppWaiting /> : <ProductForm saveProduct={saveProduct} />}
    </>
  );
};

export default ProductFormPage;
