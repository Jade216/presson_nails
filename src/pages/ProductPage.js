// src/pages/ProductPage.js

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form, Modal } from 'react-bootstrap';
import api from '../services/api';
import { CartContext } from '../context/CartContext';


function ProductPage() {

  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {

    async function fetchProduct() {
      try {
        const product = await api.getProduct(id);  // Use the new api.getProduct
        setProduct(product);

        if (product.image_url && product.image_url.length > 0) {
          setSelectedImage(product.image_url[0]); // Set the first image as the default selected image
          
        }
        if (product.sizes && product.sizes.length > 0) {
          setSelectedSize(product.sizes[0].size);  // Set default to first available size
        }
        setLoading(false);
      } catch (error) {
        
        setError('Failed to load product');
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleImageClick = (image) => {

    setSelectedImage(image);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;


  return (
    <Container className="mt-4">
      <Row>
        <Col md={2}>
        {product.image_url && product.image_url.length > 0 ? (
            product.image_url.map((image, index) => (
              <Image
                key={index}
                src={`${BASE_URL}${image}`}
                thumbnail
                onClick={() => handleImageClick(image)} // Change the big image on click
                className="mb-2"
                style={{ cursor: 'pointer' }}
              />
            ))
        ) : (
          <p>No images available</p>
        )} 
        </Col>
        <Col md={6}>
        <div style={{ position: 'relative' }}>
            {/* Main large image */}
            <Image src={`${BASE_URL}${selectedImage}`} fluid
            style={{ width: '100%', maxWidth: '550px', maxHeight: '680px', objectFit: 'contain' }} />

            {/* Magnifying glass icon */}
            {selectedImage && (
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                cursor: 'pointer',
                background: '#fff',
                padding: '5px',
                borderRadius: '50%',
              }}
              onClick={handleShowModal}
            >
              🔍 {/* A magnifying glass icon */}
            </div>
            )}
          </div>

          {/* Modal for larger image view */}
          <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
            <Modal.Header>
              <Button
                variant="light"
                onClick={handleCloseModal}
                style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1.5rem' }}
              >
                ✕
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Image src={`${BASE_URL}${selectedImage}`} fluid />
            </Modal.Body>
          </Modal>
        </Col>

        {/* Product information */}
        <Col md={4}>
          <h2>{product.name}</h2>
          <h4>${product.price}</h4>
          <p>{product.description}</p>

          {/* Size selection */}
          <Form.Group controlId="sizeSelect">
            <Form.Label>Size</Form.Label>
            <Form.Control as="select" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              {product.sizes && product.sizes.length > 0 ? (
                product.sizes.map((sizeObj) => (
                <option key={sizeObj.size} value={sizeObj.size}>
                  {sizeObj.size}
                </option>
              ))
            ) : (
              <option disabled>No sizes available</option>
            )}
            </Form.Control>
          </Form.Group>

          <Button
            variant="primary"
            className="mt-3"
            onClick={() => addToCart({ ...product, size: selectedSize })}
            disabled={!selectedSize}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;
