// src/components/ProductList.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types'; 

function ProductList({ products }) {
  return (
    <Row className="product-grid mt-4">
      {products.map(product => (
        <Col key={product.id} sm={12} md={6} lg={4} xl={3} className='product-col'>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,  // Ensure products is an array
};

export default ProductList;
