import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // When the component mounts, check if there is a token in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // If a token exists, update the state to reflect that the user is authenticated
      setIsAuthenticated(true);
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    // Store the token in localStorage and update the state
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
    setToken(newToken);
  };

  const logout = () => {
    // Remove token from localStorage and update the state
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
