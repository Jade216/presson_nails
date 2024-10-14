// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { Container, Carousel } from 'react-bootstrap';
import api from '../services/api';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    async function fetchFeatured() {
      const products = await api.getProducts();
      // For simplicity, let's assume first 4 products are featured
      setFeaturedProducts(products.slice(0, 4));
    }
    fetchFeatured();
  }, []);

  return (
    <Container className="mt-4">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x300.png?text=Welcome+to+Press-On+Nails"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to Press-On Nails</h3>
            <p>Your destination for high-quality press-on nails.</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* Add more Carousel.Items as needed */}
      </Carousel>

      <h2 className="mt-5">Featured Products</h2>
      <ProductList products={featuredProducts} />
    </Container>
  );
}

export default Home;
