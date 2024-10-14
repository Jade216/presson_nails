// src/components/ProductCard.js
import React, { useContext, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import PropTypes from 'prop-types';
import './ProductCard.css';
import { WishlistContext } from '../context/WishlistContext'; 


function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const [hover, setHover] = useState(false);

  if (!product) return null;

  // Construct the full URL for the image by prepending the backend base URL
  const imageUrl = hover && product.image_url[1] ? 
                   `http://localhost:5000${product.image_url[1]}` : 
                   `http://localhost:5000${product.image_url[0]}`;

  const imageClass = hover && product.image_url[1] ? 'product-image second-image' : 'product-image';
  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <Card 
      className="product-card my-3 p-3" //rounded
      onMouseEnter={() => setHover(true)}  // Switch to 2nd image on hover
      onMouseLeave={() => setHover(false)} // Switch back to 1st image when not hovering
    >
      {/* Make the product image clickable and link to the product detail page */}
      <Link to={`/products/${product.id}`}>
        <Card.Img
          variant="top"
          src={imageUrl}  // Use the 1st or 2nd image depending on hover state
          alt={product.name}
          // style={{ width: '100%', height: '200px', objectFit: 'contain' }}
          className={imageClass}
        />
      </Link>
      <Card.Body className='product-info'>
      <div className="product-header">
        <Card.Title as="div">
          <strong>{product.name}</strong>
        </Card.Title>
        <span
            className="heart-icon"
            onClick={() => toggleWishlist(product)}
            style={{ cursor: 'pointer', color: isInWishlist ? 'red' : 'gray' }}
          >
            {isInWishlist ? '❤️' : '🤍'}  {/* Filled heart if in wishlist, empty otherwise */}
          </span>
        </div>
        <Card.Text as="h4">${product.price}</Card.Text>
        <Button onClick={() => addToCart(product)} variant="outline-primary" className='quick-add-btn'>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image_url: PropTypes.arrayOf(PropTypes.string),  
  }).isRequired,
};

export default ProductCard;
