import React from 'react';
import '../css/UserButtons.css'

const UserButtons = ({ id, quantity, substractToList, addToList }) => {

    return (
        <div className="user-buttons">
            {quantity ?
                <div className="add-remove">
                    <div className="remove-content"
                        onClick={() => substractToList(id)}>
                        <p className="minus">-</p>
                    </div>
                    <div className="add-content"
                        onClick={() => addToList(id)}
                    >
                        <p className="add-text">{quantity} ADDED</p>
                        <p className="plus">+</p>
                    </div>
                </div>
                : <div className="add"
                    onClick={() => addToList(id)}
                >
                    <p className="add-text">ADD TO LIST</p>
                    <p className="plus">+</p>
                </div>}
        </div>
    )
}

export default UserButtons;