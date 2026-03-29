import { useState } from 'react'
import GlobalStyles from './index.tsx'
import LoginPage from './pages/login_page'
import SignUpPage from './pages/sign_up_page'
import ForgotPasswordPage from './pages/forgot_password_page'
import DashboardPage from './pages/dashboard_page'
import HomeScreenPage from './pages/home_screen'
import ProductDetailsPage from './pages/product_details_page'
import type { Product } from './components/home'

interface UserData {
  email: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

export default function App() {
  // view: "login" | "signup" | "forgot" | "home" | "dashboard" | "product-detail"
  const [view, setView] = useState("login");
  const [loggedUser, setLoggedUser] = useState<UserData | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [_cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleLogin = (userData: UserData) => {
    setLoggedUser(userData);
    setView("home");
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setView("product-detail");
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleBackToHome = () => {
    setView("home");
  };

  return (
    <>
      <GlobalStyles />

      {view === "login"    && (
        <LoginPage
          onLogin={handleLogin}
          onGoSignUp={() => setView("signup")}
          onGoForgot={() => setView("forgot")}
        />
      )}

      {view === "signup"   && (
        <SignUpPage onGoLogin={() => setView("login")} />
      )}

      {view === "forgot"   && (
        <ForgotPasswordPage onGoLogin={() => setView("login")} />
      )}

      {view === "home" && (
        <HomeScreenPage
          onViewProduct={handleViewProduct}
          onAddToCart={handleAddToCart}
        />
      )}

      {view === "product-detail" && selectedProduct && (
        <ProductDetailsPage
          product={selectedProduct}
          onBack={handleBackToHome}
          onAddToCart={handleAddToCart}
        />
      )}

      {view === "dashboard" && (
        <DashboardPage
          user={loggedUser}
          onLogout={() => { setLoggedUser(null); setView("login"); }}
        />
      )}
    </>
  );
}