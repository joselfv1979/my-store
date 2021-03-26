import React, { useState, createContext } from 'react';

const AppContext = createContext();

function AppContextProvider({ children }) {

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [waiting, setWaiting] = useState(false);

    return (
        <AppContext.Provider value={{ message, setMessage, error, setError, waiting, setWaiting }}>
            {children}
        </AppContext.Provider>
    )

}

export { AppContext, AppContextProvider };