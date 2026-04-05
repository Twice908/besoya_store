interface ProductDetailNavbarProps {
  onBack: () => void;
}

const ProductDetailNavbar = ({ onBack }: ProductDetailNavbarProps) => (
  <nav className="pdp-nav">
    <button className="pdp-nav__back" onClick={onBack}>
      ← Back
    </button>
  </nav>
);

export default ProductDetailNavbar;
