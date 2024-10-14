const fs = require('fs');
const path = require('path');
const db = require('./config/db'); 

const insertProducts = async () => {
  try {
    const productsFile = path.join(__dirname, 'nail_products.json');
    const data = fs.readFileSync(productsFile, 'utf8');
    const products = JSON.parse(data);

    for (const product of products) {
      // Insert the product into the products table, excluding size and stock_quantity
      const productQuery = `
        INSERT INTO products (name, description, color, length, price, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;
      const productResult = await db.query(productQuery, [
        product.name,
        product.description,
        product.color,         // Assuming this is stored as an array of colors
        product.length,
        product.price,
        product.image_url
      ]);

      const productId = productResult.rows[0].id; // Get the inserted product ID

      // Insert sizes and stock quantities into the product_sizes table
      for (const sizeData of product.sizes) {
        const sizeQuery = `
          INSERT INTO product_sizes (product_id, size, stock_quantity)
          VALUES ($1, $2, $3)
        `;
        await db.query(sizeQuery, [
          productId,
          sizeData.size,          // 'S', 'M', 'L', etc.
          sizeData.stock_quantity // Corresponding stock quantity
        ]);
      }
    }

    console.log('Products and sizes inserted successfully.');
  } catch (error) {
    console.error('Error inserting products and sizes:', error);
  }
};

insertProducts();
