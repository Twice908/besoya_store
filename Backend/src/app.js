const pool = require("./db"); // ← Pool, not Client
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json()); // for parsing application/json

const JWT_SECRET = process.env.JWT_SECRET;

const createTables = require("./config/migrate");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access token required" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:5173",
      "https://twice908.github.io",
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// pool
//   .connect()
//   .then(() => console.log("✅ Connected to Render PostgreSQL"))
//   .catch((err) => console.error("❌ DB connection error:", err.message));

// module.exports = pool;

// ------ Add all products
app.post("/api/products", authenticateToken, async (req, res) => {
  const {
    seller_id,
    product_name,
    product_image,
    category,
    price,
    in_stock,
    variations,
    description,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO products (seller_id, product_name, product_image, category, price, in_stock, variations, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        seller_id,
        product_name,
        product_image,
        category,
        price,
        in_stock,
        JSON.stringify(variations ?? []),
        description ?? null,
      ],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error inserting product:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ------ Add all users
// Signup API for users
app.post("/api/users", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    mobile,
    password,
    address_line,
    area,
    landmark,
    city,
    postal_code,
    address_type,
    delivery_pref,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, mobile, password_hash, address_line, area, landmark, city, postal_code, address_type, delivery_pref) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING user_id, first_name, last_name, email, mobile, address_line, area, landmark, city, postal_code, address_type, delivery_pref, created_at",
      [
        first_name,
        last_name,
        email,
        mobile,
        hashedPassword,
        address_line,
        area,
        landmark,
        city,
        postal_code,
        address_type,
        delivery_pref,
      ],
    );
    const user = result.rows[0];
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(201).json({ token, user });
  } catch (err) {
    console.error("❌ Error inserting user:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Check if a user exists by email
app.get("/api/users/check", async (req, res) => {
  const email = String(req.query.email || "").trim();
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const result = await pool.query(
      "SELECT 1 FROM users WHERE email = $1 LIMIT 1",
      [email],
    );
    res.json({ exists: result.rows.length > 0 });
  } catch (err) {
    console.error("❌ Error checking user email:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ------ Add all sellers
// Signup API for sellers
app.post("/api/sellers", async (req, res) => {
  const { seller_name, email, mobile, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO sellers (seller_name, email, mobile, password_hash) VALUES ($1, $2, $3, $4) RETURNING seller_id, seller_name, email, mobile, created_at",
      [seller_name, email, mobile, hashedPassword],
    );
    const seller = result.rows[0];
    const token = jwt.sign(
      { seller_id: seller.seller_id, email: seller.email },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(201).json({ token, seller });
  } catch (err) {
    console.error("❌ Error inserting seller:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Check if a seller exists by email
app.get("/api/sellers/check", async (req, res) => {
  const email = String(req.query.email || "").trim();
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const result = await pool.query(
      "SELECT 1 FROM sellers WHERE email = $1 LIMIT 1",
      [email],
    );
    res.json({ exists: result.rows.length > 0 });
  } catch (err) {
    console.error("❌ Error checking seller email:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ------ Auth APIs
// ------ User Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;


  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.json({
      token,
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Error logging in:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ------ Seller Login
app.post("/api/sellers/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM sellers WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const seller = result.rows[0];
    const isValid = await bcrypt.compare(password, seller.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { seller_id: seller.seller_id, email: seller.email },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.json({
      token,
      seller: {
        seller_id: seller.seller_id,
        seller_name: seller.seller_name,
        email: seller.email,
      },
    });
  } catch (err) {
    console.error("❌ Error logging in seller:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ------ User Logout
app.post("/api/logout", authenticateToken, async (req, res) => {
  try {
    // Token is already verified by authenticateToken middleware
    // Logout is successful if we reach here
    res.json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (err) {
    console.error("❌ Error logging out user:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ------ Seller Logout
app.post("/api/sellers/logout", authenticateToken, async (req, res) => {
  try {
    // Token is already verified by authenticateToken middleware
    // Logout is successful if we reach here
    res.json({
      message: "Seller logged out successfully",
      success: true,
    });
  } catch (err) {
    console.error("❌ Error logging out seller:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ------ Add all orders
app.post("/api/orders", authenticateToken, async (req, res) => {
  const {
    product_id,
    seller_id,
    user_id,
    variation_label,
    quantity,
    deliver_to,
    unit_price,
    total_price,
    payment_status,
    order_status,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO orders (product_id, seller_id, user_id, variation_label, quantity, deliver_to, unit_price, total_price, payment_status, order_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        product_id,
        seller_id,
        user_id,
        variation_label,
        quantity || 1,
        deliver_to,
        unit_price,
        total_price,
        payment_status || "Pending",
        order_status || "Started",
      ],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error inserting order:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── GET all users ──────────────────────────────────────────
app.get("/api/users", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY created_at DESC",
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching users:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── GET single user ──────────────────────────────────────────
app.get("/api/users/:user_id", authenticateToken, async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT user_id, first_name, last_name, email, mobile, address_line, area, landmark, city, postal_code, address_type, delivery_pref, created_at FROM users WHERE user_id = $1",
      [user_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error fetching user:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── GET all sellers ──────────────────────────────────────────
app.get("/api/sellers", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM sellers ORDER BY created_at DESC",
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching sellers:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── GET single seller ─────────────────────────────────────────
app.get("/api/sellers/:seller_id", authenticateToken, async (req, res) => {
  const { seller_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT seller_id, seller_name, email, mobile, created_at FROM sellers WHERE seller_id = $1",
      [seller_id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error fetching seller:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── GET all products ──────────────────────────────────────────
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC",
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── GET all orders ──────────────────────────────────────────
app.get("/api/orders", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY order_id DESC",
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching orders:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── UPDATE user details ──────────────────────────────────────
app.put("/api/users/:user_id", authenticateToken, async (req, res) => {
  const { user_id } = req.params;
  const {
    first_name,
    last_name,
    email,
    mobile,
    password_hash,
    address_line,
    area,
    landmark,
    city,
    postal_code,
    address_type,
    delivery_pref,
  } = req.body;
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
      [
        first_name,
        last_name,
        email,
        mobile,
        password_hash,
        address_line,
        area,
        landmark,
        city,
        postal_code,
        address_type,
        delivery_pref,
        user_id,
      ],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error updating user:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── UPDATE seller details ────────────────────────────────────
app.put("/api/sellers/:seller_id", authenticateToken, async (req, res) => {
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
      [seller_name, email, mobile, password_hash, seller_id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error updating seller:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── UPDATE product details ───────────────────────────────────
app.put("/api/products/:product_id", authenticateToken, async (req, res) => {
  const { product_id } = req.params;
  const {
    seller_id,
    product_name,
    product_image,
    category,
    price,
    in_stock,
    variations,
    description,
  } = req.body;
  try {
    const variationsJson = variations ? JSON.stringify(variations) : undefined;
    const result = await pool.query(
      `UPDATE products SET 
        seller_id = COALESCE($1, seller_id),
        product_name = COALESCE($2, product_name),
        product_image = COALESCE($3, product_image),
        category = COALESCE($4, category),
        price = COALESCE($5, price),
        in_stock = COALESCE($6, in_stock),
        variations = COALESCE($7, variations),
        description = COALESCE($8, description),
        updated_at = NOW()
      WHERE product_id = $9 RETURNING *`,
      [
        seller_id,
        product_name,
        product_image,
        category,
        price,
        in_stock,
        variationsJson,
        description ?? null,
        product_id,
      ],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error updating product:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── GET products by seller_id ────────────────────────────────
app.get(
  "/api/products/seller/:seller_id",
  authenticateToken,
  async (req, res) => {
    const { seller_id } = req.params;
    try {
      const result = await pool.query(
        "SELECT * FROM products WHERE seller_id = $1 ORDER BY created_at DESC",
        [seller_id],
      );
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("❌ Error fetching products by seller:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);
// ── GET single product (after /seller/:id so "seller" is not captured as id) ──
app.get("/api/products/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [product_id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error fetching product:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── GET orders by user_id ────────────────────────────────────
app.get("/api/orders/user/:user_id", authenticateToken, async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY order_id DESC",
      [user_id],
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching orders by user:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── GET orders by seller_id ──────────────────────────────────
app.get(
  "/api/orders/seller/:seller_id",
  authenticateToken,
  async (req, res) => {
    const { seller_id } = req.params;
    try {
      const result = await pool.query(
        "SELECT * FROM orders WHERE seller_id = $1 ORDER BY order_id DESC",
        [seller_id],
      );
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("❌ Error fetching orders by seller:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);
// ── UPDATE order status by seller ────────────────────────────
app.put(
  "/api/orders/:order_id/update-status",
  authenticateToken,
  async (req, res) => {
    const { order_id } = req.params;
    const { payment_status, order_status } = req.body;

    // Check if seller is authenticated
    if (!req.user.seller_id) {
      return res.status(403).json({ error: "Only sellers can update order status" });
    }

    // Validate payment_status
    const validPaymentStatuses = ['Pending', 'Paid', 'Failed'];
    if (!validPaymentStatuses.includes(payment_status)) {
      return res.status(400).json({ error: "Invalid payment_status" });
    }

    // Validate order_status
    const validOrderStatuses = ['Started', 'In Transit', 'Left Transit', 'Delivered', 'Returning', 'Returned', 'Cancelled'];
    if (!validOrderStatuses.includes(order_status)) {
      return res.status(400).json({ error: "Invalid order_status" });
    }

    try {
      // Check if order exists and belongs to the seller
      const orderCheck = await pool.query(
        "SELECT * FROM orders WHERE order_id = $1 AND seller_id = $2",
        [order_id, req.user.seller_id],
      );
      if (orderCheck.rows.length === 0) {
        return res.status(404).json({ error: "Order not found or not owned by seller" });
      }

      // Update the order
      const result = await pool.query(
        "UPDATE orders SET payment_status = $1, order_status = $2, updated_at = NOW() WHERE order_id = $3 RETURNING *",
        [payment_status, order_status, order_id],
      );

      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error("❌ Error updating order status:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);
// ── DELETE user ─────────────────────────────────────────────
app.delete("/api/users/:user_id", authenticateToken, async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [user_id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23503") {
      // Foreign key constraint violation
      return res
        .status(400)
        .json({ error: "Cannot delete user with existing orders" });
    }
    console.error("❌ Error deleting user:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── DELETE seller ───────────────────────────────────────────
app.delete("/api/sellers/:seller_id", authenticateToken, async (req, res) => {
  const { seller_id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM sellers WHERE seller_id = $1 RETURNING *",
      [seller_id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.status(200).json({
      message: "Seller deleted successfully",
      deletedSeller: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23503") {
      // Foreign key constraint violation
      return res
        .status(400)
        .json({ error: "Cannot delete seller with existing orders" });
    }
    console.error("❌ Error deleting seller:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ── DELETE all products for a seller ─────────────────────────
app.delete(
  "/api/products/seller/:seller_id",
  authenticateToken,
  async (req, res) => {
    const { seller_id } = req.params;
    try {
      const sellerCheck = await pool.query(
        "SELECT 1 FROM sellers WHERE seller_id = $1",
        [seller_id],
      );
      if (sellerCheck.rows.length === 0) {
        return res.status(404).json({ error: "Seller not found" });
      }
      const result = await pool.query(
        "DELETE FROM products WHERE seller_id = $1 RETURNING *",
        [seller_id],
      );
      res.status(200).json({
        message: `${result.rowCount} product(s) deleted successfully`,
        deletedCount: result.rowCount,
        deletedProducts: result.rows,
      });
    } catch (err) {
      if (err.code === "23503") {
        return res.status(400).json({
          error:
            "Cannot delete one or more products that are referenced by existing orders",
        });
      }
      console.error("❌ Error deleting products by seller:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);
// ── DELETE product ──────────────────────────────────────────
app.delete("/api/products/:product_id", authenticateToken, async (req, res) => {
  const { product_id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE product_id = $1 RETURNING *",
      [product_id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23503") {
      // Foreign key constraint violation
      return res
        .status(400)
        .json({ error: "Cannot delete product with existing orders" });
    }
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

(async () => {
  try {
    await createTables(); // 🔥 THIS CREATES TABLES

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
})();
