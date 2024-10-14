// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { WishlistContext } from '../context/WishlistContext';  // Import UserContext

function NavigationBar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);
  const { wishlist } = useContext(WishlistContext);   // Get user and logout from UserContext
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();  // Call logout from context
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">J Nail Lab</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/nail-care">Nail Care Resources</Nav.Link>
          </Nav>

          <Nav>
            {/* Wishlist icon with a heart symbol and number of wishlist items */}
            <Nav.Link as={Link} to="/wishlist">
              ❤️ Wishlist ({wishlist.length})  {/* Display number of wishlist items */}
            </Nav.Link>
            
            <Nav.Link as={Link} to="/cart">
              Cart ({cartItemCount})
            </Nav.Link>

            {user ? (
              <>
                {/* Show first name and logout button if user is logged in */}
                <Nav.Link as="span">Hello, {user.firstName}</Nav.Link>  {/* Display firstName */}
                <Nav.Link as={Link} onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                {/* Show Register and Login if no user is logged in */}
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

