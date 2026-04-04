import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SellerDashboard } from "../components/seller-dashboard";

/**
 * DashboardPage - Main dashboard for sellers after login
 * Displays products and orders management interface
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return <SellerDashboard onLogout={handleLogout} />;
};

export default DashboardPage;