// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/HomePage';
import Products from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import NailCarePage from './pages/NailCarePage';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; 
import { WishlistProvider } from './context/WishlistContext';
import WishlistPage from './pages/WishlistPage';


function App() {

  return (
    <WishlistProvider>
    <UserProvider>
    <CartProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/nail-care" element={<NailCarePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </Router>
    </CartProvider>
    </UserProvider>
    </WishlistProvider>
  );
}

export default App;

