import ProductList from "../components/ProductList";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { AppMessage, AppWaiting } from "../components/AppStatus";
import { cancelProductMessage } from "../store/product/productActions";
import { Message } from "../types/Message";

const ProductListPage = () => {
  const dispatch = useAppDispatch();

  const { loading, products, message, error } = useAppSelector(
    (state) => state.product
  );

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
    </>
  );
};

export default ProductListPage;
