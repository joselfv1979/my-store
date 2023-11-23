import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-hooks";
import { initialProduct, Product } from "../types/Product";
import { castProductToFormData } from "../utils/castFormData";
import { categories } from "../data/ConstantUtils";
import Form from "react-bootstrap/Form";
import { Button, Card, Col, Row } from "react-bootstrap";
import ImageUpload from "./imageUpload/ImageUpload";

type Props = {
  saveProduct: (data: FormData) => Promise<void>;
  editing?: boolean; // if true, show the edit form, otherwise show the create form.
};

type InputType = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const ProductForm = ({ saveProduct, editing = false }: Props) => {
  const { product } = useAppSelector((state) => state.product);

  const currentProduct = editing ? product!! : initialProduct;

  const [productData, setProductData] = useState<Product>(currentProduct);

  const formTitle = editing ? "Edit Product" : "New Product";

  const navigate = useNavigate();

  const handleInputEvent = (event: ChangeEvent<InputType>) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  const sendDataProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productform = castProductToFormData(productData);
    await saveProduct(productform);
  };

  return (
      <Card className="d-flex w-50 mt-4">
        <Card.Header as="h4" className="text-center">{formTitle}</Card.Header>

        <Card.Body className="mt-2">
          <Form className="p-1" onSubmit={sendDataProduct}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Product name"
                  required
                  size="sm"
                  onChange={handleInputEvent}
                  defaultValue={productData.name}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Category
              </Form.Label>
              <Col sm="8">
              <Form.Select
                aria-label="Default select example"
                onChange={handleInputEvent}
                name="category"
                defaultValue={productData.category}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Price
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="name_example"
                  required
                  size="sm"
                  onChange={handleInputEvent}
                  defaultValue={productData.price}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Description
              </Form.Label>
              <Col sm="8">
                <Form.Control
                as="textarea" rows={3}
                  type="textarea"
                  name="description"
                  placeholder="Leave a comment here"
                  required
                  size="sm"
                  onChange={handleInputEvent}
                  defaultValue={productData.description}
                />
              </Col>
            </Form.Group>

            <ImageUpload
              productData={productData}
              setProductData={setProductData}
            />

            <div className="d-flex justify-content-center">
              <Button variant="success" size="lg" className="mx-5" type="submit">
                Submit
              </Button>
              <Button variant="secondary" size="lg" className="mx-5" onClick={() => navigate("/")}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
  );
};

export default ProductForm;







