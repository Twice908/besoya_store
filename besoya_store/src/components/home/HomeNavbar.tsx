import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { IconSearch, IconWishlist, IconCart, IconOrders } from "./HomeIcons";

interface HomeNavbarProps {
  cartCount: number;
  wishCount: number;
  onCartClick: () => void;
  onOrdersClick: () => void;
}

const HomeNavbar = ({ cartCount, wishCount, onCartClick, onOrdersClick }: HomeNavbarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

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
        <button className="nav-btn" onClick={onOrdersClick} title="Orders">
          <span className="nav-btn__icon">
            <IconOrders />
          </span>
          <span className="nav-btn__label">Orders</span>
        </button>

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

        <button className="nav-profile" title="Profile" onClick={handleProfileClick}>
          <div className="nav-profile__avatar">
            {user ? getInitials(user.first_name, user.last_name) : 'U'}
          </div>
          <span className="nav-profile__name">
            {user ? `${user.first_name} ${user.last_name}` : 'User'}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default HomeNavbar;
