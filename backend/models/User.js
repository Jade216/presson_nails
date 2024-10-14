const db = require('../config/db');

class User {
  static async createUser(firstName, lastName, email, password) {
    const result = await db.query(
      `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email`,
      [firstName, lastName, email, password]
    );
    return result.rows[0];
  }

  static async findUserByEmail(email) {
    const result = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  }

  static async updateResetToken(userId, token, expirationTime) {
    await db.query(
      `UPDATE users SET reset_token = $1, reset_token_expiration = $2 WHERE id = $3`,
      [token, expirationTime, userId]
    );
  }

  static async findUserByResetToken(token) {
    const result = await db.query(`SELECT * FROM users WHERE reset_token = $1`, [token]);
    return result.rows[0];
  }

  static async updatePassword(userId, hashedPassword) {
    await db.query(
      `UPDATE users SET password = $1, reset_token = NULL, reset_token_expiration = NULL WHERE id = $2`,
      [hashedPassword, userId]
    );
  }
}

module.exports = User;
