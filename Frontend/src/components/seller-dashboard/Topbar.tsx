import { useNavigate } from "react-router-dom";

interface TopbarProps {
  title: string;
  subtitle?: string;
  sellerId?: number | null;
  onSignOut?: () => void;
}

export const Topbar = ({
  title,
  subtitle,
  sellerId,
  onSignOut,
}: TopbarProps) => {
  const navigate = useNavigate();

  const handleSellerIdClick = () => {
    if (sellerId) {
      navigate(`/seller/profile/${sellerId}`);
    }
  };

  return (
    <header className="topbar">
      <div className="topbar__title">
        {title}
        {subtitle && (
          <p style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="topbar__right">
        {sellerId != null ? (
          <button
            type="button"
            onClick={handleSellerIdClick}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "8px 12px",
              fontSize: "14px",
              cursor: "pointer",
              color: "var(--text)",
              fontWeight: "500",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--surface-secondary)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            Seller ID: {sellerId}
          </button>
        ) : null}
        {onSignOut && (
          <button type="button" className="btn btn--dark" onClick={onSignOut}>
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};
