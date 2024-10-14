import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import api from '../services/api';

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.getProducts();
      setProducts(response);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
}

export default Products;
