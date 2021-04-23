import React from 'react';
import '../css/UserButtons.css'

const UserButtons = ({ product, subtractQuantity, addToList, addQuantity }) => {

    return (
        <div className="user-buttons">
            {product.quantity ?
                <div className="add-remove">
                    <div className="remove-content"
                        onClick={() => subtractQuantity(product)}>
                        <p className="minus">-</p>
                    </div>
                    <div className="add-content"
                        onClick={() => addQuantity(product)}
                    >
                        <p className="add-text">{product.quantity} ADDED</p>
                        <p className="plus">+</p>
                    </div>
                </div>
                : <div className="add"
                    onClick={() => addToList(product)}
                >
                    <p className="add-text">ADD TO LIST</p>
                    <p className="plus">+</p>
                </div>}
        </div>
    )
}

export default UserButtons;