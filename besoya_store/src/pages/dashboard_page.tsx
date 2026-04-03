import { SellerDashboard } from "../components/seller-dashboard";

interface DashboardPageProps {
  user?: { email: string } | null;
  onLogout?: () => void;
}

/**
 * DashboardPage - Main dashboard for sellers after login
 * Displays products and orders management interface
 */
const DashboardPage = ({ onLogout }: DashboardPageProps) => {
  return <SellerDashboard onLogout={onLogout} />;
};

export default DashboardPage;