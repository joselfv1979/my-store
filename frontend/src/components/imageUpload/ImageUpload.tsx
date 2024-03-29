import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import noImage from "./../../assets/img/no_image.jpg";
import { Product } from "types/Product";

type Props = {
  productData: Product;
  setProductData: Dispatch<SetStateAction<Product>>;
};

const ImageUpload = ({ productData, setProductData }: Props) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.files &&
      setProductData({ ...productData, image: event.target.files[0] });
  };

  // If there is no image stored no_image file is used
  const imagePath =
    productData.imagePath.length > 0
      ? `${process.env.REACT_APP_API_IMAGES}/${productData.imagePath}`
      : noImage;

  // Image preview path
  const url = productData.image
    ? URL.createObjectURL(productData.image)
    : imagePath;

  return (
    <div className="row g-2 my-5">
      <div className="col me-4">
        <label htmlFor="image" className="form-label text-light">Product image</label>
        <input
          type="file"
          className="form-control"
          id="inputGroupFile01"
          accept=".jpg, .jpeg, .png"
          ref={fileInput}
          onChange={handleImage}
        />
      </div>
      <div
        className="col ms-5 d-flex align-items-center"
        style={{ height: "7rem" }}
      >
        <img
          src={url}
          className="img-fluid rounded-1"
          alt="File Preview"
          width={100}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
