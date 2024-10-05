
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuth:false,

  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser doit etre utiliser au sein de userprovider');
    }
    return context;
  };
  
