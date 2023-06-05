import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-hooks";
import styles from "../scss/ProductFormPage.module.scss";
import { initialProduct, Product } from "../types/Product";
import { castProductToFormData } from "../utils/castFormData";
import { categories } from "../utils/ConstantUtils";

type Props = {
  saveProduct: (data: FormData) => Promise<void>;
  editing?: boolean; // if true, show the edit form, else show the create form.
};
const ProductForm = ({ saveProduct, editing = false }: Props) => {
  const stateProduct = useAppSelector((state) => state.product.product);

  const currentProduct = editing && stateProduct ? stateProduct : initialProduct;

  const [product, setProduct] = useState<Product>(currentProduct);

  const handleInputEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSelectEvent = (event: ChangeEvent<HTMLSelectElement>) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleTextAreaEvent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target as HTMLInputElement;

    if (files) {
      setProduct({ ...product, image: files[0] });
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //     setPreview(reader.result as string);
      // };
      // reader.readAsDataURL(target.files[0]);
    }
  };

  const handleClick = () => {
    fileInput.current?.click();
  };

  const sendDataProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productData = castProductToFormData(product);

    await saveProduct(productData);
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
          autoComplete="off"
          required
          onChange={handleInputEvent}
          value={product.name}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="list"
          required
          onChange={handleSelectEvent}
          value={product.category}
        >
          {categories.map((category) => (
            <option key={category.catId} value={category.value}>
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
          step="0.01"
          required
          onChange={handleInputEvent}
          value={product.price}
        />
      </fieldset>

      <fieldset className={styles.fullColumn}>
        <label htmlFor="description">Description</label>
        <textarea
          // type="text"
          name="description"
          required
          onChange={handleTextAreaEvent}
          value={product.description}
        />
      </fieldset>

      <fieldset className={styles.imageField}>
        <div className={styles.loadContainer}>
          <label htmlFor="image">Image</label>
          <input
            className={styles.inputFile}
            type="file"
            ref={fileInput}
            id="image"
            name="image"
            accept=".jpg,.jpeg,.png"
            onChange={handleImage}
          />
          <button className={styles.editImage} onClick={handleClick}>
            Edit image
          </button>
        </div>
        {/* <div className={styles.imageContainer}>
              {image ? (
                <img
                  src={window.URL.createObjectURL(image)}
                  alt="File Preview"
                />
              ) : (
                <p>no image selected</p>
              )}
            </div> */}
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
