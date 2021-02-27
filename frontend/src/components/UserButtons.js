import React from 'react';

const UserButtons = ({ id, quantity, substractToList, addToList }) => {

    return (
        <div className="add-list">
                        {quantity ?
                            <div className="minus-plus">
                                <div className="minus-content"
                                    onClick={() => substractToList(id)}>
                                    <p className="minus">-</p>
                                </div>
                                <div className="plus-content"
                                    onClick={() => addToList(id)}
                                >
                                    <p className="text-content">{quantity} ADDED</p>
                                    <p className="plus">+</p>
                                </div>
                            </div>
                            : <div className="add-to-list"
                                onClick={() => addToList(id)}
                            >
                                <div className="void"></div>
                                <div className="plus-content">
                                    <p className="text-content">ADD TO LIST</p>
                                    <p className="plus">+</p>
                                </div>
                            </div>}
                    </div>
    )
}

export default UserButtons;