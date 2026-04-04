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
  return (
    <header className="topbar">
      <div className="topbar__title">
        {title}
        {subtitle && <p style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{subtitle}</p>}
      </div>
      <div className="topbar__right">
        {sellerId != null ? (
          <div className="topbar__badge">Seller ID: {sellerId}</div>
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
