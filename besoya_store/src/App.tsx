import { useState } from 'react'
import GlobalStyles from './index.tsx'
import LoginPage from './pages/login_page'
import SignUpPage from './pages/sign_up_page'
import ForgotPasswordPage from './pages/forgot_password_page'
import DashboardPage from './pages/dashboard_page'

interface UserData {
  email: string;
}

export default function App() {
  // view: "login" | "signup" | "forgot" | "dashboard"
  const [view, setView] = useState("login");
  const [loggedUser, setLoggedUser] = useState<UserData | null>(null);

  const handleLogin = (userData: UserData) => {
    setLoggedUser(userData);
    setView("dashboard");
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

      {view === "dashboard" && (
        <DashboardPage
          user={loggedUser}
          onLogout={() => { setLoggedUser(null); setView("login"); }}
        />
      )}
    </>
  );
}