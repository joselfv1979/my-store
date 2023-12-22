import { useEffect } from "react";
import { Card, Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AppMessage, AppWaiting } from "../../components/appStatus/AppStatus";
import Rating from "../../components/rating/Rating";
import UserButtons from "../../components/userButtons/UserButtons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  cancelProductMessage,
  fetchProduct,
} from "../../store/product/productActions";
import { Message, Status } from "../../types/Message";

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
      {status === "loading" && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {product && (
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item className="fs-5" href="/">Products</Breadcrumb.Item>
            <Breadcrumb.Item active className="fs-5 text-white text-capitalize">{product.category}</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col>
              <div className="card rounded-1">
                <Card.Img variant="top" src={image} alt={product.name} />
              </div>
            </Col>
            <Col>
              <div className="card rounded-1">
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="fs-5 mt-2">Price: {product.price} €</Card.Text>
                  <Rating stars={product.rating} />
                  <Card.Text className="mt-2">
                    {product.description}. Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Officiis praesentium eveniet
                    consequatur provident aut dolorem? Asperiores corrupti
                    libero aliquid laudantium blanditiis numquam magnam earum
                    nisi, mollitia, nulla totam. Quas, cupiditate!
                  </Card.Text>
                  <div className="d-flex justify-content-around mt-4">
                    <UserButtons product={product} />
                  </div>
                </Card.Body>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductDetailPage;
