// src/context/WishlistContext.js
import React, { createContext, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Toggle item in wishlist (add if not present, remove if already in wishlist)
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some(item => item.id === product.id)) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
