interface ProductDetailNavbarProps {
  onBack: () => void;
  productName: string;
  category?: string;
}

const ProductDetailNavbar = ({ onBack, productName, category }: ProductDetailNavbarProps) => (
  <nav className="pdp-nav">
    <button className="pdp-nav__back" onClick={onBack}>
      ← Back
    </button>
    <div className="pdp-nav__crumb">
      <span style={{ color: "var(--muted)" }}>Home</span>
      <span className="pdp-nav__crumb-sep">/</span>
      <span style={{ color: "var(--muted)" }}>
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'General'}
      </span>
      <span className="pdp-nav__crumb-sep">/</span>
      <span>{productName.length > 32 ? productName.slice(0, 32) + "…" : productName}</span>
    </div>
    <div className="pdp-nav__logo">
      <div className="pdp-nav__logo-icon">🛍</div>
      Besoya
    </div>
  </nav>
);

export default ProductDetailNavbar;