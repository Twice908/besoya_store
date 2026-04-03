import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ProductsTable } from "./ProductsTable";
import { OrdersTable } from "./OrdersTable";

interface SellerDashboardProps {
  onLogout?: () => void;
}

export const SellerDashboard = ({ onLogout }: SellerDashboardProps) => {
  const [active, setActive] = useState<"products" | "orders">("products");

  const sectionTitles = {
    products: "Products Management",
    orders: "Orders",
  };

  const sectionSubtitles = {
    products: "Manage your product inventory",
    orders: "Track and manage orders",
  };

  return (
    <div className="shell">
      <Sidebar active={active} setActive={setActive} />
      <div className="main">
        <Topbar
          title={sectionTitles[active]}
          subtitle={sectionSubtitles[active]}
          onSignOut={onLogout}
        />
        <div className="content">
          {active === "products" ? <ProductsTable /> : <OrdersTable />}
        </div>
      </div>
    </div>
  );
};
