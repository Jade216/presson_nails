import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext'; 
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);  

  return (
    <div className="wishlist-container container">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <Row>
          {wishlist.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="my-3">
              <Card 
                className="wishlist-card"
                style={{ position: 'relative', maxWidth: '280px', margin: 'auto' }}  
              >
                
                {/* "X" button for removing from wishlist */}
                <Button
                  onClick={() => toggleWishlist(product)}
                  variant="light"
                  className="wishlist-remove-btn" 
                >
                  ✕
                </Button>

                <Link to={`/products/${product.id}`}>
                  <Card.Img 
                    variant="top" 
                    src={`http://localhost:5000${product.image_url[0]}`} 
                    className="img-fluid"
                    style={{ maxHeight: '150px', objectFit: 'contain' }}
                  />
                </Link>
                
                <Card.Body className="text-center p-2">  
                  <Card.Title className="mb-1" style={{ fontSize: '1rem' }}>{product.name}</Card.Title>
                  <Card.Text className="mb-2" style={{ fontSize: '0.9rem' }}>
                    ${Number(product.price).toFixed(2)}
                  </Card.Text>
                  
                  {/* Custom lighter gray "Add to Cart" button with hover effect */}
                  <Button 
                    className="w-100 wishlist-add-to-cart-btn"
                    style={{ 
                      fontSize: '0.85rem',
                      backgroundColor: '#40454a',  // Darker color (default)
                      borderColor: '#40454a' 
                    }}
                    onClick={() => addToCart(product)}
                  >
                    ADD TO CART
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default WishlistPage;
