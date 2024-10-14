const db = require('../config/db');

class OrderItem {
  static async createOrderItem(orderId, productId, quantity, price) {
    const result = await db.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *`,
      [orderId, productId, quantity, price]
    );
    return result.rows[0];
  }
}

module.exports = OrderItem;
