import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CloseIcon, PlusCircleIcon } from "./Icons";
import styles from "../scss/SearchForm.module.scss";

const ProductSearch = ({ filterProducts, user }) => {

  const [name, setName] = useState(null);
  const [category, setCategory] = useState();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const history = useHistory();

  let isAdmin = user.username === "admin" ? true : false;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let parameters = "";
    let count = 0;

    if (name) {
      parameters += `?name=${name}`;
      count++;
    }
    if (category) {
      if (count === 0) parameters += `?category=${category}`;
      else parameters += `&category=${category}`;
      count++;
    }

    filterProducts(parameters);
  };

  return (
    <form className={styles.search} onSubmit={handleFormSubmit}>
      {isAdmin && (
        <button className={styles.new} onClick={() => history.push('/new-product')}>
          <PlusCircleIcon />
          New Product
        </button>
      )}

      <button className={styles.filter} onClick={() => 
        setOpenMobileMenu(true)}>
        FILTER
      </button>
      <div className={styles[`${openMobileMenu ? "open" : "menu"}`]}>
        <div className={styles.searchContainer}>
          <div className={styles.mobileHeader}>
            <span onClick={() => setOpenMobileMenu(false)}>
              <CloseIcon />
            </span>
            <h3>Search product</h3>
          </div>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">All Categories</option>
            <option value="food">Food</option>
            <option value="drink">Drink</option>
            <option value="clothes">Clothes</option>
            <option value="toys">Toys</option>
          </select>
          <input
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          ></input>
          <button
            className={styles.glass}
            onClick={() => setOpenMobileMenu(false)}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className={styles.shadow}></div>
      </div>
    </form>
  );
};

export default ProductSearch;
