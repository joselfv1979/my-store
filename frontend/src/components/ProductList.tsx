import ProductCard from "./ProductCard";
import { useAppSelector } from "../hooks/redux-hooks";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { storedProductList } from "../store/product/productSlice";

const ProductList = () => {

  const products = useAppSelector(storedProductList);
  
  return (
    <Row>
      {products.map((product) => (
        <Col key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
