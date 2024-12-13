import React, { createContext, useState } from 'react';

// this file is for store the user context. with this is not necessary to pass the username as a prop to all the components

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
