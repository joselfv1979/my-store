import React, { useState, createContext } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState('guest');
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <UserContext.Provider value={{ username, setUsername, role, setRole, isAdmin, setIsAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };