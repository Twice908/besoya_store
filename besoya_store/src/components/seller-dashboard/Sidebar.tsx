interface SidebarProps {
  active: "products" | "orders";
  setActive: (view: "products" | "orders") => void;
}

const IconBox = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const IconOrders = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 11H3v2h6v-2zm0-4H3v2h6V7zm6 0v2h6V7h-6zm0 4v2h6v-2h-6zM9 3H3v2h6V3zm6 0v2h6V3h-6z"></path>
    <path d="M20 19H4c-1.1 0-2 .9-2 2v0h20v0c0-1.1-.9-2-2-2z"></path>
  </svg>
);

export const Sidebar = ({ active, setActive }: SidebarProps) => {
  const navItems = [
    { id: "products", label: "Products", icon: IconBox },
    { id: "orders" as const, label: "Orders", icon: IconOrders },
  ];

  return (
    <aside className="sidebar">
      {/* Brand Section */}
      <div className="sidebar__brand">
        <div className="sidebar__brand-name">Besoya</div>
        <div className="sidebar__brand-sub">Store</div>
      </div>

      {/* Navigation Section */}
      <div className="sidebar__section">
        <div className="sidebar__section-label">Menu</div>
        {navItems.map((item) => {
          const Icon = item.icon as React.ComponentType<{ className?: string }>;
          return (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? "nav-item--active" : ""}`}
              onClick={() => setActive(item.id as "products" | "orders")}
            >
              <Icon className="nav-item__icon" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Footer Section */}
      <div className="sidebar__footer">
        <div className="seller-chip">
          <div className="seller-chip__avatar">📦</div>
          <div>
            <div className="seller-chip__name">Besoya Store</div>
            <div className="seller-chip__role">Seller</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
