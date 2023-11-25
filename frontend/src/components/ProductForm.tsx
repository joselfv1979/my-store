import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-hooks";
import { initialProduct, Product } from "../types/Product";
import { castProductToFormData } from "../utils/castFormData";
import { categories } from "../data/ConstantUtils";
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
    <div className="container mt-5 d-flex justify-content-center">
      <form
        className="w-50 border border-light rounded p-4"
        onSubmit={sendDataProduct}
      >
        <h4 className="text-center text-light">{formTitle}</h4>
        <div className="mb-3">
          <label className="form-label text-light">Product Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="name"
            value={productData.name}
            onChange={handleInputEvent}
          />
        </div>
        <div className="row g-2 mb-3">
          <div className="col me-4">
            <label className="form-label text-light">Category:</label>
            <select
              className="form-select"
              onChange={handleInputEvent}
              name="category"
              defaultValue={productData.category}
              aria-label="Default select example"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col ms-4">
            <label className="form-label text-light">Price:</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={productData.price}
              onChange={handleInputEvent}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label text-light">Description:</label>
          <textarea
            className="form-control"
            placeholder="add some comment"
            name="description"
            value={productData.description}
            onChange={handleInputEvent}
          />
        </div>
        <ImageUpload
          productData={productData}
          setProductData={setProductData}
        />
        <div className="m-2">
          <button type="submit" className="btn btn-primary me-3">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-3"
            onClick={() => navigate("/")}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
