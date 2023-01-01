import React, { useState } from "react";
import styles from "../scss/ProductFormPage.module.scss";

// {
//   handleFormSubmit,
//   product,
//   setProduct,
//   editingImage,
//   setEditingImage,
// }
const ProductForm = () => {
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

  // const handleInputChange = (event) => {
  //   setProduct({
  //     ...product,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // const handleImage = (event) => {
  //   setProduct({
  //     ...product,
  //     [event.target.name]: event.target.files[0],
  //   });

  //   setImage(event.target.files[0]);
  // };

  // const handleOnSubmit = (event) => {
  //   event.preventDefault();

  //   handleFormSubmit(product);
  // };

  return (
    <form className={styles.form} onSubmit={() => console.log('submit')
    }>
      {0 ? <h2>Edit Product</h2> : <h2>New Product</h2>}

      <fieldset>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          required
          onChange={() => console.log('submit')}
          defaultValue={'name'}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="list"
          required
          value={'category'}
          onChange={() => console.log('submit')}
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
          onChange={() => console.log('submit')}
          defaultValue={'price'}
        />
      </fieldset>

      <fieldset className={styles.fullColumn}>
        <label htmlFor="description">Description</label>
        <textarea
          // type="text"
          name="description"
          required
          onChange={() => console.log('submit')}
          defaultValue={'description'}
        />
      </fieldset>

      {0 ? (
        <>
          <fieldset className={styles.imageField}>
            <div className={styles.loadContainer}>
              <label htmlFor="image">Image</label>
              <input
                className={styles.inputFile}
                type="file"
                id="image"
                name="image"
                accept=".jpg,.jpeg,.png"
                required
                onChange={() => console.log('submit')}
              />
            </div>
            <div className={styles.imageContainer}>
              {image ? (
                <img
                  src={window.URL.createObjectURL(image)}
                  alt="File Preview"
                />
              ) : (
                <p>no image selected</p>
              )}
            </div>
          </fieldset>
        </>
      ) : (
        <>
          <fieldset className={styles.imageField}>
            <div className={styles.loadContainer}>
              <label htmlFor="image">Image</label>
              <button
                className={styles.editImage}
                onClick={() => console.log('submit')}
              >
                Edit image
              </button>
            </div>
            {/* <div className={styles.imageContainer}>
              <img src={`/files/${product.image}`} alt={product.name} />
            </div> */}
          </fieldset>
        </>
      )}

      <div className={styles.buttonsContainer}>
        <button>Submit</button>

        <button onClick={() => console.log("lll")} className={styles.cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

//() => history.push("/")
export default ProductForm;
