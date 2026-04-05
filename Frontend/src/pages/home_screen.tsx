import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeNavbar,
  CategoryBar,
  HeroBanner,
  ProductCard,
  HomeFooter,
  CartSidebar,
  CartToast,
  CATEGORIES,
  SORT_OPTIONS,
  FILTER_CHIPS,
} from "../components/home";
import type { Product } from "../components/home";
import { ProductService } from "../services/productService";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sort, setSort] = useState("popular");
  const [toast, setToast] = useState({ visible: false, name: "" });
  const [cartOpen, setCartOpen] = useState(false);
  const [localCartItems, setLocalCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await ProductService.getAllProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load products",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const visible = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) => {
      if (activeFilters.includes("Under ₹1,000") && p.price >= 1000)
        return false;
      if (activeFilters.includes("Under ₹5,000") && p.price >= 5000)
        return false;
      if (activeFilters.includes("In Stock Only") && p.inStock === 0)
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      // For "popular", we'll sort by newest first (created_at)
      if (sort === "popular")
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      return 0;
    });

  const handleAddToCart = (product: Product) => {
    setLocalCartItems((c) => [...c, product]);
    setToast({ visible: true, name: product.product_name });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2800);
  };

  const handleViewProduct = (product: Product) => {
    navigate(`/product/${product.product_id}`, { state: { product } });
  };

  const handleCartClick = () => {
    if (localCartItems.length > 0) setCartOpen(true);
  };

  const handleUpdateQty = (productId: number, delta: -1 | 1) => {
    if (delta === -1) {
      const idx = localCartItems.findIndex((p) => p.product_id === productId);
      if (idx !== -1)
        setLocalCartItems((c) => [...c.slice(0, idx), ...c.slice(idx + 1)]);
    } else {
      const product = products.find((p) => p.product_id === productId);
      if (product) setLocalCartItems((c) => [...c, product]);
    }
  };

  const handleRemove = (productId: number) => {
    setLocalCartItems((c) => c.filter((p) => p.product_id !== productId));
  };

  const handleClear = () => {
    setLocalCartItems([]);
    setCartOpen(false);
  };

  const toggleFilter = (f: string) =>
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );

  return (
    <>
      <HomeNavbar
        cartCount={localCartItems.length}
        onCartClick={handleCartClick}
        onOrdersClick={() => navigate("/orders")}
      />
      <CategoryBar active={activeCategory} setActive={setActiveCategory} />
      <div className="home-shell">
        {activeCategory === "all" && <HeroBanner />}

        <div
          className="section-head"
          style={{ marginTop: activeCategory !== "all" ? 28 : 0 }}
        >
          <h2 className="section-head__title">
            {activeCategory === "all"
              ? "Featured Products"
              : CATEGORIES.find((c) => c.id === activeCategory)?.label}
          </h2>
          <button className="section-head__link">
            View all{" "}
            <span style={{ display: "inline-flex", verticalAlign: "middle" }}>
              ›
            </span>
          </button>
        </div>

        <div className="filter-bar">
          {FILTER_CHIPS.map((f) => (
            <button
              key={f}
              className={`filter-chip ${activeFilters.includes(f) ? "filter-chip--active" : ""}`}
              onClick={() => toggleFilter(f)}
            >
              {f}
            </button>
          ))}
          <div className="filter-spacer" />
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "var(--muted)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
            <div style={{ fontSize: 15 }}>Loading products...</div>
          </div>
        ) : error ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "var(--danger)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>❌</div>
            <div style={{ fontSize: 15, marginBottom: 12 }}>{error}</div>
            <button
              style={{
                background: "var(--accent)",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : visible.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "var(--muted)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15 }}>No products match your filters.</div>
            <button
              style={{
                marginTop: 16,
                background: "none",
                border: "none",
                color: "var(--accent)",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 14,
              }}
              onClick={() => {
                setActiveFilters([]);
                setActiveCategory("all");
              }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {visible.map((p) => (
              <ProductCard
                key={p.product_id}
                product={p}
                onAddToCart={handleAddToCart}
                onView={handleViewProduct}
              />
            ))}
          </div>
        )}
      </div>

      <HomeFooter />

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={localCartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onClear={handleClear}
      />

      <CartToast visible={toast.visible} name={toast.name} />
    </>
  );
};

export default HomeScreen;
