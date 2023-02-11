import ProductForm from "../components/ProductForm";
import { useAppDispatch } from "../hooks/redux-hooks";
import { addProduct } from "../store/product/productActions";

const ProductFormPage = () => {

const dispatch = useAppDispatch();


  const saveProduct = async (data: FormData) => {
     dispatch(addProduct(data));
    console.log(data);
    
  };

  return <ProductForm saveProduct={saveProduct} />

};

export default ProductFormPage;
