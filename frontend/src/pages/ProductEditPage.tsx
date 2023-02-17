import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { AppWaiting } from "../components/AppStatus";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { cancelProductMessage, editProduct, fetchProduct } from "../store/product/productActions";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
//import { storedProduct } from "../store/product/productSlice";

const ProductEditPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  // const product = useAppSelector(storedProduct);
  const { loading, product, message } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (id) dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const saveProduct = async (data: FormData) => {
    dispatch(editProduct(data));
  };

  const cancelMessage = () => {
    dispatch(cancelProductMessage())
  }
  return (
    <Container>
      {loading && <AppWaiting />}
      {message && (
        <Alert variant="danger" onClose={() => cancelMessage()} dismissible>
          {message}
        </Alert>
      )}
      {product && <ProductForm saveProduct={saveProduct} />}
    </Container>
  );
};

export default ProductEditPage;
