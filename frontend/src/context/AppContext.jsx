import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Token state management
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Update localStorage whenever the token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Value object to be passed to the context provider
  const value = {
    backendUrl,
    token,
    setToken,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;