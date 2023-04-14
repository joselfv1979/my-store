import { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AppMessage, AppWaiting } from "../components/AppStatus";
import StarRating from "../components/StarRating";
import UserButtons from "../components/UserButtons";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import styles from "../scss/ProductDetailPage.module.scss";
import {
  cancelProductMessage,
  fetchProduct,
} from "../store/product/productActions";
import { Message } from "../types/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";

const ProductDetailPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { loading, product, message, error } = useAppSelector(
    (state) => state.product
  );

  const note: Message = {
    type: error ? "danger" : "success",
    text: error || message,
  };

  const image = `${process.env.REACT_APP_API_IMAGES}/${product?.imagePath}`;

  useEffect(() => {
    if (id) dispatch(fetchProduct(id));
    console.log("id", id);
  }, [dispatch, id]);

  const cancelMessage = () => {
    dispatch(cancelProductMessage());
  };

  const navigate = useNavigate();

  return (
    <>
      {loading && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {product && (
        <div style={{ display: "flex", width: "90%", height: "100%" }}>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              marginRight: "1rem",
              color: "#fff",
            }}
          >
            Back
            <Button onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faBackwardStep} />
            </Button>
          </span>
          <Card style={{ width: "50%", height: "100%" }}>
            <Card.Img
              variant="top"
              className={styles.cardImg}
              src={image}
              alt={product.name}
            />
          </Card>
          <Card
            style={{ padding: '2rem',marginLeft: "1.5rem", width: "50%", height: "100%" }}
          >
            <Card.Body >
              <Card.Title>{product.name}</Card.Title>
              <Card.Title>Price: {product.price} €</Card.Title>
              <StarRating stars={product.rating} />
              <Card.Text>{product.description}</Card.Text>
              <UserButtons />
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
