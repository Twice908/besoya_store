import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SellerDashboard } from "../components/seller-dashboard";
import { SellerService } from "../services/sellerService";

type DashboardState = { sellerId?: number } | null;

/**
 * DashboardPage - Main dashboard for sellers after login
 * Displays products and orders management interface
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const state = (location.state as DashboardState) ?? null;
  const sessionSeller = SellerService.getSellerSessionSeller();
  const sellerId = state?.sellerId ?? sessionSeller?.seller_id ?? null;

  const handleLogout = () => {
    SellerService.clearSellerAuth();
    logout();
    navigate("/seller/login", { replace: true });
  };

  return (
    <SellerDashboard
      sellerId={sellerId}
      onLogout={handleLogout}
      onAddProduct={() => navigate("/dashboard/add-product")}
    />
  );
};

export default DashboardPage;