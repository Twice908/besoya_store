import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AuthService } from "../../services/authService";
import { IconSearch, IconWishlist, IconCart, IconOrders } from "./HomeIcons";

interface HomeNavbarProps {
  cartCount: number;
  wishCount: number;
  onCartClick: () => void;
  onOrdersClick: () => void;
}

const HomeNavbar = ({
  cartCount,
  wishCount,
  onCartClick,
  onOrdersClick,
}: HomeNavbarProps) => {
  const [query, setQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleProfileClick = () => {
    navigate("/profile");
    setShowProfileMenu(false);
  };

  const handleLogout = async () => {
    // Call logout API
    await AuthService.logoutAPI();

    // Clear local auth state
    logout();

    // Redirect to login
    navigate("/login", { replace: true });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="navbar">
      <a className="nav-logo" href="#">
        <div className="nav-logo__icon">🛍</div>
        <span className="nav-logo__name">
          Beso<span>ya</span>
        </span>
      </a>

      <div className="nav-search">
        <span className="nav-search__icon">
          <IconSearch />
        </span>
        <input
          className="nav-search__input"
          type="text"
          placeholder="Search for products, brands and more…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

        <div style={{ position: "relative" }}>
          <button
            className="nav-profile"
            title="Profile"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              background: showProfileMenu ? "rgba(0,0,0,0.05)" : "transparent",
            }}
          >
            <div className="nav-profile__avatar">
              {user ? getInitials(user.first_name, user.last_name) : "U"}
            </div>
            <span className="nav-profile__name">
              {user ? `${user.first_name} ${user.last_name}` : "User"}
            </span>
          </button>

          {showProfileMenu && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "8px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 1000,
                minWidth: "180px",
              }}
            >
              <button
                onClick={handleProfileClick}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 16px",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "var(--text)",
                  borderBottom: "1px solid var(--border)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                }}
              >
                View Profile
              </button>
              <button
                onClick={handleLogout}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 16px",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "var(--danger)",
                  fontWeight: "500",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(220, 38, 38, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
