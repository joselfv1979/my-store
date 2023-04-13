import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AppMessage, AppWaiting } from "../components/AppStatus";
import StarRating from "../components/StarRating";
import UserButtons from "../components/UserButtons";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import styles from "../scss/ProductDetailPage.module.scss";
import { cancelProductMessage, fetchProduct } from "../store/product/productActions";
import { Message } from "../types/Message";

const ProductDetailPage = () => {

//  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { loading, product, message, error } = useAppSelector(
    (state) => state.product
  );

  const note: Message = {
    type: error ? "danger" : "success",
    text: error || message,
  };
  
  const image = product?.imagePath ? `${process.env.REACT_APP_API_IMAGES}/${product.imagePath}` : 'jj';
  
  useEffect(() => {
    if (id) dispatch(fetchProduct(id));
    console.log('id', id);
    
  }, [dispatch, id]);

  const cancelMessage = () => {
    dispatch(cancelProductMessage());
  };

  return (
    <>
      {loading && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {product && (
        <Card className={styles.detail}>
        <Card.Img
          variant="top"
          className={styles.cardImg}
          src={image}
          alt={product.name}
        />
        <Card.Body className={styles.data}>
          <Card.Title>{product.name}</Card.Title>
          <Card.Title>Price: {product.price} €</Card.Title>
          <StarRating stars={product.rating} />
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
        <Card.Footer className={styles.buttonGroup}>
          <UserButtons />
        </Card.Footer>
      </Card>
      )}
    </>
  );
};

export default ProductDetailPage;
