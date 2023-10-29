import { Card, Col, Row } from "react-bootstrap";
import { categories } from "data/ConstantUtils";
import styles from "../../assets/scss/HomePage.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/redux-hooks";
import { fetchProducts } from "store/product/productActions";

const ProductCategories = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (category: string) => {
    dispatch(fetchProducts(category));
    navigate("/products");
  };

  return (
    <>
      <h1 className="mb-5 text-center">Product categories</h1>
      <Row className="g-5">
        {categories
          .filter((item) => item.id !== 1)
          .map((product) => (
            <Col key={product.id}>
              <Card
                className={styles.productCard}
                onClick={() => handleClick(product.value)}
              >
                <Card.Img
                  variant="top"
                  className={styles.cardImg}
                  src={product.image}
                  alt={product.value}
                />
                <h4 className="text-center text-dark">{product.value}</h4>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default ProductCategories;
