import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/login_page";
import SignUpPage from "./pages/sign_up_page";
import ForgotPasswordPage from "./pages/forgot_password_page";
import HomeScreenPage from "./pages/home_screen";
import ProductDetailsPage from "./pages/product_details_page";
import OrdersPage from "./pages/orders_page";
import CheckoutPage from "./pages/checkout_page";
import DashboardPage from "./pages/dashboard_page";
import AddProductPage from "./pages/add_product_page";
import EditProductPage from "./pages/edit_product_page";
import UserProfilePage from "./pages/user_profile_page";
import SellerAuthPage from "./pages/seller_auth_page";
import SellerProfilePage from "./pages/seller_profile_page";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Public routes - redirect to home if already authenticated */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        }
      />
      <Route path="/seller/login" element={<SellerAuthPage />} />

      {/* Protected routes - require authentication */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomeScreenPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/add-product"
        element={
          <ProtectedRoute>
            <AddProductPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/edit-product/:productId"
        element={
          <ProtectedRoute>
            <EditProductPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/profile/:sellerId"
        element={
          <ProtectedRoute>
            <SellerProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to login for unauthenticated, home for authenticated */}
      <Route
        path="*"
        element={
          <ProtectedRoute redirectTo="/login">
            <Navigate to="/home" replace />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
