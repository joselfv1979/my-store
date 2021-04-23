import React from 'react';
import { useHistory } from "react-router-dom";

const ProductForm = ({ sendDataProduct, product }) => {

    const history = useHistory();

    const categories = [
        {
            catId: 1,
            label: 'Choose',
            value: ''
        },
        {
            catId: 2,
            label: 'Food',
            value: 'food'
        },
        {
            catId: 3,
            label: 'Drink',
            value: 'drink'
        },
        {
            catId: 4,
            label: 'Clothes',
            value: 'clothes'
        },
        {
            catId: 5,
            label: 'Toys',
            value: 'toys'
        },
    ];


    const handleInputChange = (event) => {

        product = {
            ...product,
            [event.target.name]: event.target.value
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        sendDataProduct(product);
    }
    return (
        <div className="form-container">
        
            <form onSubmit={handleFormSubmit}>
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
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        required
                        onChange={handleInputChange}
                        defaultValue={product.description}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="list" 
                        value={product.category}
                        onChange={handleInputChange}>
                        {categories.map(category =>
                            <option key={category.catId} value={category.value}>{category.label}</option>)}
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

                <fieldset>
                    <label htmlFor="image">Foto</label>

                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept=".jpg,.jpeg,.png"
                        required
                        onChange={event =>
                            product = {
                                ...product,
                                [event.target.name]: event.target.files[0]
                            }
                        }
                        // defaultValue={product.image}
                    />
                    {/* <p className="help">{`Tamaño máximo ${REACT_APP_MAX_FILE_SIZE / 1024
                        }Kb`}</p>

                    {image ? (
                        <img
                            src={window.URL.createObjectURL(image)}
                            width="100"
                            alt="File Preview"
                        />
                    ) : null} */}
                </fieldset>

                <button>Submit</button>

                <button onClick={() => history.push('/')}>Cancel</button>
            </form>

        </div>
    )
}

export default ProductForm;
