import React from 'react';
import Cart from '../components/Cart';

function CartPage({ cartItems, updateQuantity, removeFromCart }) {
  return (
    <div>
      <Cart cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
    </div>
  );
}

export default CartPage;
