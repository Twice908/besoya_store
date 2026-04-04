const pool = require('../db');

const createTables = async () => {

  // ── 1. USERS (Buyers) ──────────────────────────────────────
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id         SERIAL PRIMARY KEY,
      first_name      VARCHAR(50)  NOT NULL,
      last_name       VARCHAR(50)  NOT NULL,
      email           VARCHAR(100) NOT NULL UNIQUE,
      mobile          VARCHAR(15)  NOT NULL,
      password_hash   TEXT         NOT NULL,

      -- Address fields
      address_line    TEXT,
      area            VARCHAR(100),
      landmark        VARCHAR(100),
      city            VARCHAR(50),
      postal_code     VARCHAR(10),
      address_type    VARCHAR(10)  DEFAULT 'Home'
                      CHECK (address_type IN ('Home', 'Office')),

      -- Delivery preference
      delivery_pref   VARCHAR(20)  DEFAULT 'weekdays'
                      CHECK (delivery_pref IN ('weekdays', 'weekend')),

      created_at      TIMESTAMP    DEFAULT NOW()
    );
  `);
  console.log('✅ users table ready');

  // ── 2. SELLERS ─────────────────────────────────────────────
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sellers (
      seller_id       SERIAL PRIMARY KEY,
      seller_name     VARCHAR(100) NOT NULL,
      email           VARCHAR(100) NOT NULL UNIQUE,
      mobile          VARCHAR(15)  NOT NULL,
      password_hash   TEXT         NOT NULL,
      created_at      TIMESTAMP    DEFAULT NOW()
    );
  `);
  console.log('✅ sellers table ready');

  // ── 3. PRODUCTS ────────────────────────────────────────────
  // Variations stored as JSONB — flexible for any product type
  // e.g. [{ "label": "1 Ton", "price": 32000 }, ...]
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      product_id      SERIAL PRIMARY KEY,
      seller_id       INT          NOT NULL
                      REFERENCES sellers(seller_id) ON DELETE CASCADE,
      product_name    VARCHAR(150) NOT NULL,
      product_image   TEXT,                        -- URL or file path
      category        VARCHAR(80),
      price           NUMERIC(10,2) DEFAULT 0,
      in_stock        INT          NOT NULL DEFAULT 0
                      CHECK (in_stock >= 0),
      variations      JSONB        DEFAULT '[]',   -- array of { label, price }
      created_at      TIMESTAMP    DEFAULT NOW(),
      updated_at      TIMESTAMP    DEFAULT NOW()
    );
  `);
  console.log('✅ products table ready');


  // Must exist before the orders table is created
await pool.query(`
  CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;
`);
console.log('✅ order_number_seq ready');

  // ── 4. ORDERS ──────────────────────────────────────────────
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      order_id        SERIAL PRIMARY KEY,
      order_number    VARCHAR(20)  NOT NULL UNIQUE
                      DEFAULT 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0'),

      product_id      INT          NOT NULL
                      REFERENCES products(product_id) ON DELETE RESTRICT,
      seller_id       INT          NOT NULL
                      REFERENCES sellers(seller_id)  ON DELETE RESTRICT,
      user_id         INT          NOT NULL
                      REFERENCES users(user_id)      ON DELETE RESTRICT,

      -- What was ordered
      variation_label VARCHAR(100),               -- e.g. "1.5 Ton"
      quantity        INT          NOT NULL DEFAULT 1,

      -- Delivery snapshot (copied from user at order time)
      deliver_to      TEXT         NOT NULL,       -- full address string

      -- Financials
      unit_price      NUMERIC(10,2) NOT NULL,
      total_price     NUMERIC(10,2) NOT NULL,

      -- Statuses
      payment_status  VARCHAR(20)  DEFAULT 'Pending'
                      CHECK (payment_status IN ('Pending','Paid','Failed')),
      order_status    VARCHAR(20)  DEFAULT 'Started'
                      CHECK (order_status IN (
                        'Started','In Transit','Left Transit',
                        'Delivered','Returning','Returned','Cancelled'
                      )),

      order_date      TIMESTAMP    DEFAULT NOW(),
      updated_at      TIMESTAMP    DEFAULT NOW()
    );
  `);
  console.log('✅ orders table ready');

};

// ── Run & exit ──────────────────────────────────────────────
createTables()
  .then(() => {
    console.log('\n🎉 All tables created successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Error creating tables:', err.message);
    process.exit(1);
  });