import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { editProduct, fetchProduct } from "../store/product/productActions";
import { storedProduct } from "../store/product/productSlice";

const ProductEditPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const product = useAppSelector(storedProduct);

  useEffect(() => {
    if (id) dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const saveProduct = async (data: FormData) => {
    dispatch(editProduct(data));
  };
  return <>{product && <ProductForm saveProduct={saveProduct} />}</>;
};

export default ProductEditPage;
