import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Product } from "types/Product";

type Props = {
  productData: Product;
  setProductData: Dispatch<SetStateAction<Product>>;
};

const ImageUpload = ({ productData, setProductData }: Props) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const [uploadedFileName, setUploadedFileName] = useState<string>('Upload');

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.files &&
      setProductData({ ...productData, image: event.target.files[0] });
  };

  const handleDisplayFileDetails = (event: ChangeEvent<HTMLInputElement>) => {
    const buttonFile = fileInput?.current?.files?.[0];
    const buttonFileText = buttonFile?.name ?? 'Upload';
    setUploadedFileName(buttonFileText);
    handleImage(event);
  };

  const handleUpload = () => {
    fileInput.current?.click();
  };

  const imagePath =
    productData.imagePath.length > 0
      ? `${process.env.REACT_APP_API_IMAGES}/${productData.imagePath}`
      : null;

  const url = productData.image
    ? URL.createObjectURL(productData.image)
    : imagePath;

  const nameFileButtonStyle = {
    display: "block",
    width: "5rem",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <Form.Group as={Row} className="mb-3" controlId="Image">
        <Form.Label column sm="3">
          Image
        </Form.Label>
        <Col sm="6" className="d-flex align-items-center border rounded p-2 mx-3">
          <Col className="d-flex justify-content-center">
            {url ? (
              <Image
                src={url}
                width={80}
                height={4}
                alt="File Preview"
                fluid
              />
            ) : (
              <span className="m-4">select image</span>
            )}
          </Col>
          <Col>
            <input
              ref={fileInput}
              onChange={handleDisplayFileDetails}
              className="d-none"
              type="file"
              name="image"
              accept=".jpg,.jpeg,.png"
            />
            <button
              type="button"
              onClick={handleUpload}
              className={`m-4 btn btn-outline-${
                uploadedFileName ? "success" : "primary"
              }`}
            >
              <span style={nameFileButtonStyle as React.CSSProperties}>
                {uploadedFileName ?? "Upload"}
              </span>
            </button>
          </Col>
        </Col>
      </Form.Group>
    </div>
  );
};

export default ImageUpload;
