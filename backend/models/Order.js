const db = require('../config/db');

class Order {
  static async createOrder(userId, totalPrice, shippingAddress) {
    const result = await db.query(
      `INSERT INTO orders (user_id, total_price, shipping_address) VALUES ($1, $2, $3) RETURNING *`,
      [userId, totalPrice, shippingAddress]
    );
    return result.rows[0];
  }
}
module.exports = Order;
