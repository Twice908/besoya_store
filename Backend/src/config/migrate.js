const pool = require('../db'); // your db file

const getExistingColumns = async (tableName) => {
  const result = await pool.query(
    `SELECT column_name FROM information_schema.columns WHERE table_name = $1`,
    [tableName],
  );
  return new Set(result.rows.map((row) => row.column_name));
};

const ensureColumns = async (tableName, expectedColumns) => {
  const existingColumns = await getExistingColumns(tableName);
  for (const columnDef of expectedColumns) {
    const columnName = columnDef.trim().split(/\s+/)[0];
    if (!existingColumns.has(columnName)) {
      console.log(`🔧 Adding missing column ${columnName} to ${tableName}`);
      await pool.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnDef}`);
    }
  }
};

const createTables = async () => {
  try {
    console.log('🚀 Running migrations...');

    // USERS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        mobile VARCHAR(15) NOT NULL,
        password_hash TEXT NOT NULL,
        address_line TEXT,
        area VARCHAR(100),
        landmark VARCHAR(100),
        city VARCHAR(50),
        postal_code VARCHAR(10),
        address_type VARCHAR(10) DEFAULT 'Home'
          CHECK (address_type IN ('Home', 'Office')),
        delivery_pref VARCHAR(20) DEFAULT 'weekdays'
          CHECK (delivery_pref IN ('weekdays', 'weekend')),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await ensureColumns('users', [
      'user_id SERIAL PRIMARY KEY',
      'first_name VARCHAR(50) NOT NULL',
      'last_name VARCHAR(50) NOT NULL',
      'email VARCHAR(100) NOT NULL UNIQUE',
      'mobile VARCHAR(15) NOT NULL',
      'password_hash TEXT NOT NULL',
      'address_line TEXT',
      'area VARCHAR(100)',
      'landmark VARCHAR(100)',
      'city VARCHAR(50)',
      'postal_code VARCHAR(10)',
      "address_type VARCHAR(10) DEFAULT 'Home' CHECK (address_type IN ('Home', 'Office'))",
      "delivery_pref VARCHAR(20) DEFAULT 'weekdays' CHECK (delivery_pref IN ('weekdays','weekend'))",
      'created_at TIMESTAMP DEFAULT NOW()',
    ]);

    // SELLERS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sellers (
        seller_id SERIAL PRIMARY KEY,
        seller_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        mobile VARCHAR(15) NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await ensureColumns('sellers', [
      'seller_id SERIAL PRIMARY KEY',
      'seller_name VARCHAR(100) NOT NULL',
      'email VARCHAR(100) NOT NULL UNIQUE',
      'mobile VARCHAR(15) NOT NULL',
      'password_hash TEXT NOT NULL',
      'created_at TIMESTAMP DEFAULT NOW()',
    ]);

    // PRODUCTS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        product_id SERIAL PRIMARY KEY,
        seller_id INT NOT NULL
          REFERENCES sellers(seller_id) ON DELETE CASCADE,
        product_name VARCHAR(150) NOT NULL,
        description TEXT,
        product_image TEXT,
        category VARCHAR(80),
        price NUMERIC(10,2) DEFAULT 0,
        in_stock INT NOT NULL DEFAULT 0 CHECK (in_stock >= 0),
        variations JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await ensureColumns('products', [
      'product_id SERIAL PRIMARY KEY',
      'seller_id INT NOT NULL REFERENCES sellers(seller_id) ON DELETE CASCADE',
      'product_name VARCHAR(150) NOT NULL',
      'description TEXT',
      'product_image TEXT',
      'category VARCHAR(80)',
      'price NUMERIC(10,2) DEFAULT 0',
      'in_stock INT NOT NULL DEFAULT 0 CHECK (in_stock >= 0)',
      "variations JSONB DEFAULT '[]'",
      'created_at TIMESTAMP DEFAULT NOW()',
      'updated_at TIMESTAMP DEFAULT NOW()',
    ]);

    // SEQUENCE
    await pool.query(`
      CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;
    `);

    // ORDERS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        order_id SERIAL PRIMARY KEY,
        order_number VARCHAR(20) NOT NULL UNIQUE
          DEFAULT 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' ||
          LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0'),

        product_id INT NOT NULL
          REFERENCES products(product_id) ON DELETE RESTRICT,
        seller_id INT NOT NULL
          REFERENCES sellers(seller_id) ON DELETE RESTRICT,
        user_id INT NOT NULL
          REFERENCES users(user_id) ON DELETE RESTRICT,

        variation_label VARCHAR(100),
        quantity INT NOT NULL DEFAULT 1,
        deliver_to TEXT NOT NULL,

        unit_price NUMERIC(10,2) NOT NULL,
        total_price NUMERIC(10,2) NOT NULL,

        payment_status VARCHAR(20) DEFAULT 'Pending'
          CHECK (payment_status IN ('Pending','Paid','Failed')),

        order_status VARCHAR(20) DEFAULT 'Started'
          CHECK (order_status IN (
            'Started','In Transit','Left Transit',
            'Delivered','Returning','Returned','Cancelled'
          )),

        order_date TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await ensureColumns('orders', [
      'order_id SERIAL PRIMARY KEY',
      'order_number VARCHAR(20) NOT NULL UNIQUE',
      'product_id INT NOT NULL REFERENCES products(product_id) ON DELETE RESTRICT',
      'seller_id INT NOT NULL REFERENCES sellers(seller_id) ON DELETE RESTRICT',
      'user_id INT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT',
      'variation_label VARCHAR(100)',
      'quantity INT NOT NULL DEFAULT 1',
      'deliver_to TEXT NOT NULL',
      'unit_price NUMERIC(10,2) NOT NULL',
      'total_price NUMERIC(10,2) NOT NULL',
      "payment_status VARCHAR(20) DEFAULT 'Pending' CHECK (payment_status IN ('Pending','Paid','Failed'))",
      "order_status VARCHAR(20) DEFAULT 'Started' CHECK (order_status IN ('Started','In Transit','Left Transit','Delivered','Returning','Returned','Cancelled'))",
      'order_date TIMESTAMP DEFAULT NOW()',
      'updated_at TIMESTAMP DEFAULT NOW()',
    ]);

    console.log('🎉 All tables created successfully');
    // process.exit(0);
  } catch (err) {
    console.error('❌ Migration error:', err.message);
    // process.exit(1);
  }
};

// createTables();

module.exports = createTables;