import ProductCard from "../ProductCard";
import styles from "../../assets/scss/ProductListPage.module.scss"
import { useAppSelector } from "../../hooks/redux-hooks";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { storedProductList } from "../../store/product/productSlice";

const ProductList = () => {
  const products = useAppSelector(storedProductList);
  const hasProducts = () => products && products.length > 0;

  return (
    <Row>
      <h1 className={styles.listTitle}>Product list</h1>
      {hasProducts() ? (
        products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))
      ) : (
        <p className={styles.emptyText}>no products</p>
      )}
    </Row>
  );
};

export default ProductList;
