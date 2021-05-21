import { useState } from 'react';
import styles from "../scss/ProductListPage.module.scss";

const ProductSearch = ({ filterProducts }) => {

    const [name, setName] = useState(null);
    const [category, setCategory] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        let parameters = ""; let count = 0;

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
    }

    return (

        <form className={styles.search} onSubmit={handleFormSubmit}>

            <select value={category}
                onChange={event => setCategory(event.target.value)}>
                <option value="">Categories</option>
                <option value="food">Food</option>
                <option value="drink">Drink</option>
                <option value="clothes">Clothes</option>
                <option value="toys">Toys</option>
            </select>

            <input
                placeholder="Search"
                onChange={event =>
                    setName(event.target.value)
                }></input>

            <button>
                <i className="fas fa-search"></i>
            </button>

            {/* <button className="cart-button" onClick={() => history.push('/cart')}>
                <i className="fas fa-shopping-cart"></i>
            </button> */}

        </form>

    )
}

export default ProductSearch;