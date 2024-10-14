// src/services/api.js
const API_URL = '/api'; // Proxy is set up in setupProxy.js

const api = {
  // Fetch all products
  async getProducts() {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    const products = data.map(product => ({
      ...product,
      price: parseFloat(product.price) // Convert price to a number
    }));
    return products;
  },

  async getProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    // Ensure price is a number
    const product = {
      ...data,
      price: parseFloat(data.price) // Convert price to a number
    };
    return product;
  },

  // User Registration
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  },

  // User Login
  async login(loginData) {
    try {
      const response = await fetch(`${API_URL}/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  },

  // Checkout
  async checkout(orderData) {
    try {
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout failed');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  },

  async forgotPassword(email) {
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send reset email.');
      }
      return response.json();
    } catch (err) {
      throw err;
    }
  },

  // Reset Password
  async resetPassword({ token, password }) {
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Password reset failed.');
      }
      return response.json();
    } catch (err) {
      throw err;
    }
  },

};

export default api;







