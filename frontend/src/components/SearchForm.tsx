import { useState } from "react";
import { CloseIcon, PlusCircleIcon } from "./Icons";
import { useNavigate } from 'react-router-dom';
import styles from "../scss/SearchForm.module.scss";

//{ filterProducts, user }
const ProductSearch = () => {

  const [name, setName] = useState(null);
  const [category, setCategory] = useState();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const navigate = useNavigate();

  // let isAdmin = user.username === "admin" ? true : false;

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();

  //   let parameters = "";
  //   let count = 0;

  //   if (name) {
  //     parameters += `?name=${name}`;
  //     count++;
  //   }
  //   if (category) {
  //     if (count === 0) parameters += `?category=${category}`;
  //     else parameters += `&category=${category}`;
  //     count++;
  //   }

  //   filterProducts(parameters);
  // };

  return (
    <form className={styles.search} onSubmit={() => console.log('submit')
    }>
      {1 && (
        <button className={styles.new} onClick={() => navigate('/new-product')}>
          <PlusCircleIcon width="1rem" />
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
            onChange={() => console.log('submit')}
          >
            <option value="">All Categories</option>
            <option value="food">Food</option>
            <option value="drink">Drink</option>
            <option value="clothes">Clothes</option>
            <option value="toys">Toys</option>
          </select>
          <input
            placeholder="Name"
            onChange={() => console.log('submit')}
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
