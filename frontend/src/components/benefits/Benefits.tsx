import { Row, Col, Card } from "react-bootstrap";
import delivery from "../../assets/img/delivery.svg";
import card from "../../assets/img/card.svg";
import styles from "../../assets/scss/HomePage.module.scss";

const Benefits = () => {
  return (
    <div className="mt-5 py-5">
      <h1 className="my-5 text-center">Services</h1>
      <Row className="my-5 pb-4">
        <Col className="d-flex align-items-center">
          <h1>Home delivery</h1>
        </Col>
        <Col>
          <Card>
            <Card.Img
              variant="top"
              className={styles.serviceImg}
              src={delivery}
              alt="delivery"
            />
          </Card>
        </Col>
      </Row>
      <Row className="my-5 pb-4">
        <Col className="d-flex align-items-center">
          <h1>
            <p>MyStore card:</p>
            <p>discounts and offers</p>
          </h1>
        </Col>
        <Col>
          <Card>
            <Card.Img
              variant="top"
              className={styles.serviceImg}
              src={card}
              alt="card"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Benefits;
