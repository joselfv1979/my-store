import React from 'react';
import { Button, Input, Select } from '@material-ui/core';

const ProductSearch = ({ name, setName, category, setCategory, getProducts }) => {

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
                    <Select native value={category}
                        onChange={event => setCategory(event.target.value)}>
                        <option value="">Choose category</option>
                        <option value="food">Food</option>
                        <option value="drink">Drink</option>
                        <option value="clothes">Clothes</option>
                        <option value="toys">Toys</option>
                    </Select>

                </fieldset>

                <fieldset>
                    <Input color="primary"
                        className="search-control"
                        placeholder="Type your product"
                        onChange={event =>
                            setName(event.target.value)
                        }></Input>
                </fieldset>
                
                <Button variant="contained" onClick={handleFormSubmit}>
                    Search
                </Button>

            </form>
        </div>
    )
}

export default ProductSearch;