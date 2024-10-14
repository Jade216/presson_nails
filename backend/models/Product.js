const db = require('../config/db');

class Product {
  static async getAllProducts() {
    const result = await db.query('SELECT * FROM products');
    return result.rows;
  }

  // Fetch a single product by ID
  static async getProductById(id) {
    const result = await db.query(`
      SELECT p.*, json_agg(json_build_object('size', ps.size, 'stock_quantity', ps.stock_quantity)) AS sizes
      FROM products p
      LEFT JOIN product_sizes ps ON p.id = ps.product_id
      WHERE p.id = $1
      GROUP BY p.id
    `, [id]);

    return result.rows[0];  // Return the product with its sizes
  }
}
module.exports = Product;
