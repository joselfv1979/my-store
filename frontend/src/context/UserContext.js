import React, { useState, createContext } from 'react';

const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [username, setUsername] = useState(null);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };