import SingleProduct from "./Product";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { useEffect } from "react";
import { fetchProducts } from "../store/product/productActions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { storedProductList } from "../store/product/productSlice";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(storedProductList);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <Row>
      {products.map((product) => (
        <Col key={product.id}>
          <SingleProduct product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
