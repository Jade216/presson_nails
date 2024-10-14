import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Product({ products, addToCart }) {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) return <div>Product not found!</div>;

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <img src={product.image_url && product.image_url[0]} alt={product.name} style={{ width: '100px', height: 'auto' }} />
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>

      {/* New size selection section */}
      <label htmlFor="sizeSelect">Size:</label>
      <select id="sizeSelect" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
        <option value="">--Select a size--</option>
        {product.sizes.map((sizeObj) => (
          <option key={sizeObj.size} value={sizeObj.size}>{sizeObj.size} ({sizeObj.stock_quatity} left)</option>
        ))}
      </select>

      <button
        onClick={() => addToCart({ ...product, size: selectedSize })}
        className="btn btn-primary"
        disabled={!selectedSize}  // Disable button if no size is selected
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
