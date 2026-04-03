interface TopbarProps {
  title: string;
  subtitle?: string;
  onSignOut?: () => void;
}

export const Topbar = ({ title, subtitle, onSignOut }: TopbarProps) => {
  return (
    <header className="topbar">
      <div className="topbar__title">
        {title}
        {subtitle && <p style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{subtitle}</p>}
      </div>
      <div className="topbar__right">
        <div className="topbar__badge">Seller ID: BESO-2024</div>
        {onSignOut && (
          <button className="btn btn--dark" onClick={onSignOut}>
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};
