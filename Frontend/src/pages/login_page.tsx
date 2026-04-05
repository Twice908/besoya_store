import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Brand from "../components/brand.tsx";
import PasswordField from "../components/password_field.tsx";

/* ============================================================
   PAGE: LoginPage
   ============================================================ */
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Get the redirect path from location state (where user was trying to go)
  const from = (location.state as any)?.from?.pathname || "/home";

  // Auto-dismiss snackbar after 5 seconds
  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => setSnackbar(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSnackbar(null);
    setLoading(true);

    try {
      await login(email, password);
      // Redirect to the page user was trying to access, or home
      navigate(from, { replace: true });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Login failed";

      // If credentials are invalid, force client-side hash redirect to signup
      if (errorMsg.toLowerCase().includes("invalid credentials")) {
        const basePath = `${window.location.origin}${window.location.pathname}`;
        window.location.replace(`${basePath}#/signup`);
        setLoading(false);
        return;
      }

      setError(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <Brand />

        {/* Welcome Message */}
        <div className="welcome">
          <h1 className="welcome__title">Welcome back 👋</h1>
          <p className="welcome__sub">
            Sign in to your Besoya account and continue
            <br />
            your premium shopping experience.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                color: "var(--danger)",
                background: "rgba(204, 51, 51, 0.1)",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="field" style={{ marginBottom: 16 }}>
            <label className="field__label" htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="field__input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <PasswordField
            id="login-password"
            label="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            disabled={loading}
          />

          {/* Forgot Password */}
          <div
            className="forgot-row"
            style={{ marginTop: 10, marginBottom: 22 }}
          >
            <button
              type="button"
              className="link-btn"
              onClick={() => navigate("/forgot-password")}
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? "Signing In..." : "Sign In →"}
          </button>
        </form>

        <div style={{ marginTop: 12 }}>
          <button type="button" onClick={() => navigate("/seller/login")}>
            Login as Seller
          </button>
        </div>

        <div className="form-foot" style={{ marginTop: 24 }}>
          Don't have an account?{" "}
          <button className="link-btn" onClick={() => navigate("/signup")}>
            Create one
          </button>
        </div>
      </div>

      {/* Snackbar */}
      {snackbar && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#0f7938",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 9999,
            maxWidth: "90%",
            animation: "slideUp 0.3s ease-out",
          }}
        >
          {snackbar}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
