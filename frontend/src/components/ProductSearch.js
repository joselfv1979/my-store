import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Button, Input, Select } from '@material-ui/core';

const ProductSearch = () => {

    const { getProducts } = useContext(ProductContext);

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

        getProducts(parameters);
    }

    return (
        <div>
            <form className="search-form">

                <fieldset>
                    <select className="custom-select" value={category}
                        onChange={event => setCategory(event.target.value)}>
                        <option value="">Choose category</option>
                        <option value="food">Food</option>
                        <option value="drink">Drink</option>
                        <option value="clothes">Clothes</option>
                        <option value="toys">Toys</option>
                    </select>

                </fieldset>

                <fieldset>
                    <input className="search-input"
                        placeholder="Type your product"
                        onChange={event =>
                            setName(event.target.value)
                        }></input>
                </fieldset>

                <button className="search-button" onClick={handleFormSubmit}>
                    Search
                </button>

            </form>
        </div>
    )
}

export default ProductSearch;