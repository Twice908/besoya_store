const { Pool } = require('pg');   // ← Pool, not Client
const express = require('express');


const app = express();
app.use(express.json()); // for parsing application/json

const pool = new Pool({
  host:     'localhost',
  user:     'postgres',
  password: 'admin',
  database: 'besoya_store_DB',
  port:     5432,
});

pool.connect()
  .then(() => console.log('✅ Connected to the database'))
  .catch((err) => console.error('❌ DB connection error:', err.message));

module.exports = pool;

app.post('/api/products', async (req, res) => {
  const { seller_id, product_name, product_image, category, in_stock, variations } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (seller_id, product_name, product_image, category, in_stock, variations) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [seller_id, product_name, product_image, category, in_stock, JSON.stringify(variations)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error inserting product:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/users', async (req, res) => {
  const { first_name, last_name, email, mobile, password_hash, address_line, area, landmark, city, postal_code, address_type, delivery_pref } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, mobile, password_hash, address_line, area, landmark, city, postal_code, address_type, delivery_pref) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [first_name, last_name, email, mobile, password_hash, address_line, area, landmark, city, postal_code, address_type, delivery_pref]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error inserting user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/sellers', async (req, res) => {
  const { seller_name, email, mobile, password_hash } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO sellers (seller_name, email, mobile, password_hash) VALUES ($1, $2, $3, $4) RETURNING *',
      [seller_name, email, mobile, password_hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error inserting seller:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { product_id, seller_id, user_id, variation_label, quantity, deliver_to, unit_price, total_price, payment_status, order_status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (product_id, seller_id, user_id, variation_label, quantity, deliver_to, unit_price, total_price, payment_status, order_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [product_id, seller_id, user_id, variation_label, quantity || 1, deliver_to, unit_price, total_price, payment_status || 'Pending', order_status || 'Started']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error inserting order:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});