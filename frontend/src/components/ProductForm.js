import React from 'react';
import { useHistory } from "react-router-dom";

const ProductForm = ({ addProduct, editProduct, id, name, setName, category, setCategory, description, setDescription, price, setPrice, stock, setStock, image, setImage }) => {

    const history = useHistory();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        id ? editProduct({
            name,
            category,
            description,
            price,
            stock,
        }) : addProduct({
            name,
            category,
            description,
            price,
            stock,
            image
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
                        onChange={event =>
                            setName(event.target.value)
                        }
                        defaultValue={name}
                    />
                </fieldset>

                <fieldset>
                <label htmlFor="category">Category</label>
                    <select name="category" id="list" onChange={event => setCategory(event.target.value)}>
                        <option value="">Choose</option>
                        <option value="food">Food</option>
                        <option value="drink">Drink</option>
                        <option value="clothes">Clothes</option>
                        <option value="toys">Toys</option>
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        required
                        onChange={event =>
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
                        onChange={event =>
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
                        onChange={event =>
                            setStock(event.target.value)
                        }
                        defaultValue={stock}
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
                        onChange={(event) => {
                            setImage(event.target.files[0]);
                        }}
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
