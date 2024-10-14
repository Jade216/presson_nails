// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create UserContext
export const UserContext = createContext();

// UserProvider to wrap around the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Initial user state as null

  useEffect(() => {
    // Check localStorage when the app loads to set the user if logged in
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);  // Set user from localStorage if found
    }
  }, []);  // This will run once when the component is mounted

  // Login function to set user and store in localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));  // Store in localStorage
  };

  // Logout function to clear user and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
