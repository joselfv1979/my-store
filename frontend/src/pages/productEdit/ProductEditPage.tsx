import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/productForm/ProductForm";
import { AppMessage, AppWaiting } from "../../components/appStatus/AppStatus";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  cancelProductMessage,
  editProduct,
  fetchProduct,
} from "../../store/product/productActions";
import { getMessage } from "utils/handleMessage";

// Displays the form to edit an existing product
const ProductEditPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { loading, product, message, error } = useAppSelector(
    (state) => state.product
  );

  const note = getMessage(error, message);

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
