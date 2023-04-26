import { PlusCircleIcon, MinusCircleIcon } from "./Icons";
import styles from "./../scss/CartPage.module.scss";
import { useAppSelector } from "../hooks/redux-hooks";
import { stateCart } from "../store/cart/cartSlice";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Row,
} from "react-bootstrap";

// cart, subtractQuantity, addQuantity
const Cart = () => {
  const cart = useAppSelector(stateCart);

  return (
    <>
      {cart.map((item) => (
        <Row key={item?.id} style={{ width: " 100%", display: "flex" }}>
          <Col style={{ margin: "1rem" }}>
            <Card style={{ flexDirection: "row" }}>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle>Price: {item.price} €</Card.Subtitle>
                <Card.Subtitle>Quantity: {item.quantity}</Card.Subtitle>
              </Card.Body>
              <Card.Footer>
                <ButtonGroup vertical>
                  <Button>
                    <PlusCircleIcon width="1rem" />
                  </Button>
                  <Button>
                    <MinusCircleIcon />
                  </Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default Cart;
