import React from 'react';
import { useHistory } from "react-router-dom";

const ProductForm = ({ addProduct, editProduct, id, name, setName, description, setDescription, price, setPrice, stock, setStock }) => {

    const history = useHistory();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        id ? editProduct({
            name,
            description,
            price,
            stock,
        }) : addProduct({
            name,
            description,
            price,
            stock,
        });
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
                        onChange={ event =>
                            setName(event.target.value)
                        }
                        defaultValue={name}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        required
                        onChange={ event =>
                            setDescription(event.target.value)
                        }
                        defaultValue={description}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        required
                        onChange={ event =>
                            setPrice(event.target.value)
                        }
                        defaultValue={price}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        required
                        onChange={ event =>
                            setStock(event.target.value)
                        }
                        defaultValue={stock}
                    />
                </fieldset>

                <button>Submit</button>

                <button onClick={() => history.push('/')}>Cancel</button>
            </form>

        </div>
    )
}

export default ProductForm;
