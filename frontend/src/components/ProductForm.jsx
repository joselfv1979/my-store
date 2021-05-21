import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from '../scss/ProductFormPage.module.scss';

const ProductForm = ({
  handleFormSubmit,
  product,
  setProduct,
  editingImage,
  setEditingImage,
}) => {
  const history = useHistory();

  const categories = [
    {
      catId: 1,
      label: "Choose",
      value: "",
    },
    {
      catId: 2,
      label: "Food",
      value: "food",
    },
    {
      catId: 3,
      label: "Drink",
      value: "drink",
    },
    {
      catId: 4,
      label: "Clothes",
      value: "clothes",
    },
    {
      catId: 5,
      label: "Toys",
      value: "toys",
    },
  ];

  const [image, setImage] = useState(null);

  const handleInputChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleImage = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.files[0],
    });

    setImage(event.target.files[0]);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    handleFormSubmit(product);
  };

  return (
    <form className={styles.productForm} onSubmit={handleOnSubmit}>
      {product.id ? <h2>Edit Product</h2> : <h2>New Product</h2>}

      <fieldset>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          required
          onChange={handleInputChange}
          defaultValue={product.name}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="list"
          required
          value={product.category}
          onChange={handleInputChange}
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
          required
          onChange={handleInputChange}
          defaultValue={product.price}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          name="stock"
          required
          onChange={handleInputChange}
          defaultValue={product.stock}
        />
      </fieldset>

      <fieldset className={styles.fullColumn}>
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          name="description"
          required
          onChange={handleInputChange}
          defaultValue={product.description}
        />
      </fieldset>

      {editingImage ? (
        <>
          <fieldset>
            <label htmlFor="image">Image</label>
            <input
              className={styles.inputFile}
              type="file"
              id="image"
              name="image"
              accept=".jpg,.jpeg,.png"
              required
              onChange={handleImage}
            />
          </fieldset>
          <div className={styles.image}>
            {image ? (
              <img src={window.URL.createObjectURL(image)} alt="File Preview" />
            ) : (
              <p>no image selected</p>
            )}
          </div>
        </>
      ) : (
        <>
          <fieldset>
            <label htmlFor="image">Image</label>
            <button
              className={styles.changeImage}
              onClick={() => setEditingImage(true)}
            >
              Change image
            </button>
          </fieldset>
          <div className={styles.image}>
            <img src={`/files/${product.image}`} alt={product.name} />
          </div>
        </>
      )}

      <button>Submit</button>

      <button onClick={() => history.push("/")}>Cancel</button>
    </form>
  );
};

export default ProductForm;
