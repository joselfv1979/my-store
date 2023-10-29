import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-hooks";
import styles from "../assets/scss/ProductFormPage.module.scss";
import { initialProduct, Product } from "../types/Product";
import { castProductToFormData } from "../utils/castFormData";
import { categories } from "../data/ConstantUtils";

type Props = {
  saveProduct: (data: FormData) => Promise<void>;
  editing?: boolean; // if true, show the edit form, else show the create form.
};

type InputType = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const ProductForm = ({ saveProduct, editing = false }: Props) => {
  const { product } = useAppSelector((state) => state.product);

  const currentProduct = editing ? product!! : initialProduct;

  const [productData, setProductData] = useState<Product>(currentProduct);

  const handleInputEvent = (event: ChangeEvent<InputType>) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.files &&
    setProductData({ ...productData, image: event.target.files[0] });
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const imagePath =
  productData.imagePath.length > 0
      ? `${process.env.REACT_APP_API_IMAGES}/${productData.imagePath}`
      : null;
      
  const url = productData.image ? URL.createObjectURL(productData.image) : imagePath;

  const sendDataProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productform = castProductToFormData(productData);    
    await saveProduct(productform);
  };

  const navigate = useNavigate();

  return (
    <form className={styles.form} onSubmit={sendDataProduct}>
      {editing ? <h2>Edit Product</h2> : <h2>New Product</h2>}

      <fieldset>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          required
          onChange={handleInputEvent}
          value={productData.name}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          required
          onChange={handleInputEvent}
          value={productData.category}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          step="0.01"
          required
          onChange={handleInputEvent}
          value={productData.price}
        />
      </fieldset>

      <fieldset className={styles.fullColumn}>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          required
          onChange={handleInputEvent}
          value={productData.description}
        />
      </fieldset>

      <fieldset className={styles.imageField}>
        <div className={styles.loadContainer}>
          <label htmlFor="image">Image</label>
          <input
            className={styles.inputFile}
            type="file"
            ref={fileInput}
            name="image"
            id="image"
            accept=".jpg,.jpeg,.png"
            onChange={handleImage}
          />
        </div>
        <div className={styles.imageContainer}>
          {url ? (
            <img src={url} alt="File Preview" />
          ) : (
            <p>no image selected</p>
          )}
        </div>
      </fieldset>

      <div className={styles.buttonsContainer}>
        <button>Submit</button>

        <button onClick={() => navigate("/")} className={styles.cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
