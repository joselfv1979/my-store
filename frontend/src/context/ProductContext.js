import React, { useState, createContext } from 'react';

const ProductContext = createContext();

function ProductContextProvider({ children }){

    const [message, setMessage] = useState(null);

    // let item = {
    //     name: 'Lego',
    //     description: 'Contrucción',
    //     price: 15,
    //     stock: 50
    // }

    // setProduct(item);

    return (
        <ProductContext.Provider value={{ message, setMessage }}>
            {children}
        </ProductContext.Provider>
    )

}

export { ProductContext, ProductContextProvider };