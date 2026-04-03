import { useState } from "react";
import { IconSearch, IconWishlist, IconCart } from "./HomeIcons";

interface HomeNavbarProps {
  cartCount: number;
  wishCount: number;
  onCartClick: () => void;
}

const HomeNavbar = ({ cartCount, wishCount, onCartClick }: HomeNavbarProps) => {
  const [query, setQuery] = useState("");

  return (
    <nav className="navbar">
      <a className="nav-logo" href="#">
        <div className="nav-logo__icon">🛍</div>
        <span className="nav-logo__name">Beso<span>ya</span></span>
      </a>

      <div className="nav-search">
        <span className="nav-search__icon"><IconSearch /></span>
        <input
          className="nav-search__input"
          type="text"
          placeholder="Search for products, brands and more…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="nav-search__btn">Search</button>
      </div>

      <div className="nav-actions">
        <button className="nav-btn" title="Wishlist">
          <span className="nav-btn__icon">
            <IconWishlist />
            {wishCount > 0 && <span className="nav-badge">{wishCount}</span>}
          </span>
          <span className="nav-btn__label">Wishlist</span>
        </button>

        <button className="nav-btn" onClick={onCartClick} title="Cart">
          <span className="nav-btn__icon">
            <IconCart />
            {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </span>
          <span className="nav-btn__label">Cart</span>
        </button>

        <button className="nav-profile" title="Profile">
          <div className="nav-profile__avatar">RS</div>
          <span className="nav-profile__name">Rohan</span>
        </button>
      </div>
    </nav>
  );
};

export default HomeNavbar;
