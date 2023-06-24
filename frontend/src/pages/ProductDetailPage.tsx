import { useEffect } from "react";
import { Card, Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AppMessage, AppWaiting } from "../components/AppStatus";
import StarRating from "../components/StarRating";
import UserButtons from "../components/UserButtons";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import styles from "../scss/ProductDetailPage.module.scss";
import {
  cancelProductMessage,
  fetchProduct,
} from "../store/product/productActions";
import { Message, Status } from "../types/Message";

const ProductDetailPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { status, product, message, error } = useAppSelector(
    (state) => state.product
  );

  const note: Message = error
    ? {
        type: Status.DANGER,
        text: error,
      }
    : {
        type: Status.SUCCESS,
        text: message,
      };

  const image = `${process.env.REACT_APP_API_IMAGES}/${product?.imagePath}`;

  useEffect(() => {
    if (id) dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const cancelMessage = () => {
    dispatch(cancelProductMessage());
  };

  return (
    <>
      {status === 'loading' && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {product && (
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Products</Breadcrumb.Item>
            <Breadcrumb.Item active>{product.category}</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col>
              <Card className={styles.cardImg}>
                <Card.Img variant="top" src={image} alt={product.name} />
              </Card>
            </Col>
            <Col>
              <Card className={styles.cardDetails}>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Title>Price: {product.price} €</Card.Title>
                  <StarRating stars={product.rating} />
                  <Card.Text>
                    {product.description}. Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Officiis praesentium eveniet
                    consequatur provident aut dolorem? Asperiores corrupti
                    libero aliquid laudantium blanditiis numquam magnam earum
                    nisi, mollitia, nulla totam. Quas, cupiditate!
                  </Card.Text>
                  <UserButtons product={product} style={styles.userButton} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductDetailPage;
