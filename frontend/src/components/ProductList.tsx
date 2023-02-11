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
  console.log("products: ", products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Row xs={1} md={2} className="g-4">
      {products.map((product) => (
        <Col md="auto" key={product.id}>
          <SingleProduct product={product} />
          {/* {"admin" ? <AdminButtons id={"1"} /> : <UserButtons />} */}
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
