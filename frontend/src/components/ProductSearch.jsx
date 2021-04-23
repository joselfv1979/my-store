import { useState } from 'react';
import { useHistory } from "react-router-dom";


const ProductSearch = ({ filterProducts }) => {

    const history = useHistory();

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

        <form className="search-form" onSubmit={handleFormSubmit}>

            <select className="search-select" value={category}
                onChange={event => setCategory(event.target.value)}>
                <option value="">Categories</option>
                <option value="food">Food</option>
                <option value="drink">Drink</option>
                <option value="clothes">Clothes</option>
                <option value="toys">Toys</option>
            </select>

            <input className="search-input"
                placeholder="Search"
                onChange={event =>
                    setName(event.target.value)
                }></input>

            <button className="search-button">
                <i className="fas fa-search"></i>
            </button>

            <button className="cart-button" onClick={() => history.push('/cart')}>
                <i className="fas fa-shopping-cart"></i>
            </button>

        </form>

    )
}

export default ProductSearch;