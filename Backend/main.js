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

// ------ Add all users
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
// ------ Add all sellers
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
// ------ Add all products
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
// ------ Add all orders
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
// ── GET all users ──────────────────────────────────────────
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching users:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ── GET all sellers ──────────────────────────────────────────
app.get('/api/sellers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sellers ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching sellers:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ── GET all products ──────────────────────────────────────────
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching products:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ── GET all orders ──────────────────────────────────────────
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY order_id DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching orders:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ── UPDATE user details ──────────────────────────────────────
app.put('/api/users/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { first_name, last_name, email, mobile, password_hash, address_line, area, landmark, city, postal_code, address_type, delivery_pref } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET 
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        email = COALESCE($3, email),
        mobile = COALESCE($4, mobile),
        password_hash = COALESCE($5, password_hash),
        address_line = COALESCE($6, address_line),
        area = COALESCE($7, area),
        landmark = COALESCE($8, landmark),
        city = COALESCE($9, city),
        postal_code = COALESCE($10, postal_code),
        address_type = COALESCE($11, address_type),
        delivery_pref = COALESCE($12, delivery_pref)
      WHERE user_id = $13 RETURNING *`,
      [first_name, last_name, email, mobile, password_hash, address_line, area, landmark, city, postal_code, address_type, delivery_pref, user_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error updating user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ── UPDATE seller details ────────────────────────────────────
app.put('/api/sellers/:seller_id', async (req, res) => {
  const { seller_id } = req.params;
  const { seller_name, email, mobile, password_hash } = req.body;
  try {
    const result = await pool.query(
      `UPDATE sellers SET 
        seller_name = COALESCE($1, seller_name),
        email = COALESCE($2, email),
        mobile = COALESCE($3, mobile),
        password_hash = COALESCE($4, password_hash)
      WHERE seller_id = $5 RETURNING *`,
      [seller_name, email, mobile, password_hash, seller_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error updating seller:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ── UPDATE product details ───────────────────────────────────
app.put('/api/products/:product_id', async (req, res) => {
  const { product_id } = req.params;
  const { seller_id, product_name, product_image, category, in_stock, variations } = req.body;
  try {
    const variationsJson = variations ? JSON.stringify(variations) : undefined;
    const result = await pool.query(
      `UPDATE products SET 
        seller_id = COALESCE($1, seller_id),
        product_name = COALESCE($2, product_name),
        product_image = COALESCE($3, product_image),
        category = COALESCE($4, category),
        in_stock = COALESCE($5, in_stock),
        variations = COALESCE($6, variations),
        updated_at = NOW()
      WHERE product_id = $7 RETURNING *`,
      [seller_id, product_name, product_image, category, in_stock, variationsJson, product_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error updating product:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ── GET products by seller_id ────────────────────────────────
app.get('/api/products/seller/:seller_id', async (req, res) => {
  const { seller_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE seller_id = $1 ORDER BY created_at DESC',
      [seller_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching products by seller:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ── GET orders by user_id ────────────────────────────────────
app.get('/api/orders/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY order_id DESC',
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching orders by user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ── GET orders by seller_id ──────────────────────────────────
app.get('/api/orders/seller/:seller_id', async (req, res) => {
  const { seller_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE seller_id = $1 ORDER BY order_id DESC',
      [seller_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching orders by seller:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});