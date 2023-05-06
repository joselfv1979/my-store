import styles from "../scss/ProductListPage.module.scss";
import { Product } from "../types/Product";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-hooks";
import AdminButtons from "./AdminButtons";
import { isAdmin } from "../store/user/userSlice";
import UserButtons from "./UserButtons";
import StarRating from "./StarRating";
import { Stack } from "react-bootstrap";

type Props = {
  product: Product;
};

const SingleProduct = ({ product }: Props) => {
  const admin = useAppSelector(isAdmin);

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/product-detail/${product.id}`);
  };

  const image = `${process.env.REACT_APP_API_IMAGES}/${product.imagePath}`;

  return (
    <Card className={styles.card}>
      <Stack onClick={handleOnClick} className={styles.productData}>
        <Card.Img
          variant="top"
          className={styles.cardImg}
          src={image}
          alt={product.name}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Title>Price: {product.price} €</Card.Title>
          <StarRating stars={product.rating} />
        </Card.Body>
      </Stack>
      <Card.Footer className={styles.buttonGroup}>
        {admin ? (
          <AdminButtons id={product.id} />
        ) : (
          <UserButtons product={product} style={styles.userButton} />
        )}
      </Card.Footer>
    </Card>
  );
};

export default SingleProduct;
