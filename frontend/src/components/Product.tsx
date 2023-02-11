import styles from "../scss/ProductListPage.module.scss";
import { Product } from "../types/Product";
import { deleteProduct } from "../store/product/productActions";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";

type Props = {
  product: Product;
};

const SingleProduct = ({ product }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    //showProductDetail(product);
    console.log("product");
  };

  const checkRate = () => {
    // let star =
    //   index < product.rating
    //     ? "checked"
    //     : index === product.rating
    //     ? "checked"
    //     : "";
    // return star;
  };

  const stars = [1, 2, 3, 4, 5];

  // const StarRating = () => {
  //   return stars.map((index) => (
  //     <i
  //       key={index}
  //       className={`fas fa-star ` + styles[`${checkRate(index)}`]}
  //     ></i>
  //   ));
  // };

  return (
    <Card className={styles.info} border="success">
      <Card.Img variant="top">
        {/* <img src={`/files/${product.image}`} alt={product.name} /> */}
      </Card.Img>
      <Card.Body className={styles.data}>
        <Card.Title>{product.name}</Card.Title>
        <Card.Title>Price: {product.price} €</Card.Title>
        {/* <div>
          <StarRating />
        </div> */}
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <Card.Footer className={styles.buttonGroup}>
        <Button
          variant="success"
          onClick={() => navigate(`/edit-product/${product.id}`)}
        >
          <i className="fas fa-pencil-alt"></i>
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            if (window.confirm("Are you sure to delete?")) {
              if (product.id) {
                dispatch(deleteProduct(product.id));
              }
            }
          }}
        >
          <i className="fas fa-trash-alt"></i>
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default SingleProduct;
