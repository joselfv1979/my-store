import { PlusCircleIcon, MinusCircleIcon } from "./Icons";
import styles from "./../scss/CartPage.module.scss";
import { useAppSelector } from "../hooks/redux-hooks";
import { stateCart } from "../store/cart/cartSlice";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";

// cart, subtractQuantity, addQuantity
const Cart = () => {
  const cart = useAppSelector(stateCart);

  const photoPath = process.env.REACT_APP_API_IMAGES;

  return (
    <>
      {cart.map((item) => (
        <Row key={item?.id}>
          <Col>
            <Card className={styles.itemCard}>
              <Card.Img
                src={`${photoPath}/${item.imagePath}`}
                className={styles.itemPhoto}
                alt="Card image cap"
              />
              <Card.Body className={styles.itemBody}>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle>Price: {item.price} €</Card.Subtitle>
              </Card.Body>
              <Card.Body>
                <Card.Subtitle>Quantity: {item.quantity}</Card.Subtitle>
              </Card.Body>
              <Card.Footer className={styles.itemFooter}>
                <Stack
                  direction="vertical"
                  gap={2}
                  className={styles.itemButtonStack}
                >
                  <Button variant="dark">
                    <PlusCircleIcon width="1rem" />
                  </Button>
                  <Button variant="dark">
                    <MinusCircleIcon />
                  </Button>
                </Stack>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default Cart;
