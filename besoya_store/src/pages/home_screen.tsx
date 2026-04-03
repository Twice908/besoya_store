import { useState } from "react";
import {
  HomeNavbar,
  CategoryBar,
  HeroBanner,
  ProductCard,
  HomeFooter,
  CartSidebar,
  CartToast,
  CATEGORIES,
  PRODUCTS,
  SORT_OPTIONS,
  FILTER_CHIPS,
} from "../components/home";
import type { Product } from "../components/home";

interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

interface HomeScreenPageProps {
  onViewProduct: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
}

const HomeScreen = ({ onViewProduct, onAddToCart }: HomeScreenPageProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sort, setSort] = useState("popular");
  const [wishItems] = useState<any[]>([]);
  const [toast, setToast] = useState({ visible: false, name: "" });
  const [cartOpen, setCartOpen] = useState(false);
  const [localCartItems, setLocalCartItems] = useState<Product[]>([]);

  const visible = PRODUCTS
    .filter(p => activeCategory === "all" || p.category === activeCategory)
    .filter(p => {
      if (activeFilters.includes("Under ₹1,000") && p.price >= 1000) return false;
      if (activeFilters.includes("Under ₹5,000") && p.price >= 5000) return false;
      if (activeFilters.includes("4★ & Above") && p.rating < 4) return false;
      if (activeFilters.includes("In Stock Only") && p.inStock === 0) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const handleAddToCart = (product: typeof PRODUCTS[number]) => {
    setLocalCartItems(c => [...c, product]);
    onAddToCart({ product, quantity: 1, price: product.price });
    setToast({ visible: true, name: product.name });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2800);
  };

  const handleCartClick = () => {
    if (localCartItems.length > 0) setCartOpen(true);
  };

  const handleUpdateQty = (productId: number, delta: -1 | 1) => {
    if (delta === -1) {
      const idx = localCartItems.findIndex(p => p.id === productId);
      if (idx !== -1) setLocalCartItems(c => [...c.slice(0, idx), ...c.slice(idx + 1)]);
    } else {
      const product = PRODUCTS.find(p => p.id === productId);
      if (product) setLocalCartItems(c => [...c, product]);
    }
  };

  const handleRemove = (productId: number) => {
    setLocalCartItems(c => c.filter(p => p.id !== productId));
  };

  const handleClear = () => {
    setLocalCartItems([]);
    setCartOpen(false);
  };

  const toggleFilter = (f: string) =>
    setActiveFilters(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );

  return (
    <>
      <HomeNavbar cartCount={localCartItems.length} wishCount={wishItems.length} onCartClick={handleCartClick} />
      <CategoryBar active={activeCategory} setActive={setActiveCategory} />
      <div className="home-shell">
        {activeCategory === "all" && <HeroBanner />}

        <div className="section-head" style={{ marginTop: activeCategory !== "all" ? 28 : 0 }}>
          <h2 className="section-head__title">
            {activeCategory === "all"
              ? "Featured Products"
              : CATEGORIES.find(c => c.id === activeCategory)?.label}
          </h2>
          <button className="section-head__link">
            View all <span style={{ display: 'inline-flex', verticalAlign: 'middle' }}>›</span>
          </button>
        </div>

        <div className="filter-bar">
          {FILTER_CHIPS.map(f => (
            <button
              key={f}
              className={`filter-chip ${activeFilters.includes(f) ? "filter-chip--active" : ""}`}
              onClick={() => toggleFilter(f)}
            >
              {f}
            </button>
          ))}
          <div className="filter-spacer" />
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => (<option key={o.value} value={o.value}>{o.label}</option>))}
          </select>
        </div>

        {visible.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15 }}>No products match your filters.</div>
            <button
              style={{ marginTop: 16, background: "none", border: "none", color: "var(--accent)", fontWeight: 600, cursor: "pointer", fontSize: 14 }}
              onClick={() => { setActiveFilters([]); setActiveCategory("all"); }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {visible.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} onView={onViewProduct} />
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
