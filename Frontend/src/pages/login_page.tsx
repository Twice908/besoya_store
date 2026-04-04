import { useState } from "react";
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
  const [loading, setLoading] = useState(false);

  // Get the redirect path from location state (where user was trying to go)
  const from = (location.state as any)?.from?.pathname || "/home";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      // Redirect to the page user was trying to access, or home
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
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
            Sign in to your Besoya account and continue<br />
            your premium shopping experience.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              color: 'var(--danger)',
              background: 'rgba(204, 51, 51, 0.1)',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="field" style={{ marginBottom: 16 }}>
            <label className="field__label" htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              className="field__input"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <PasswordField
            id="login-password"
            label="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            disabled={loading}
          />

          {/* Forgot Password */}
          <div className="forgot-row" style={{ marginTop: 10, marginBottom: 22 }}>
            <button type="button" className="link-btn" onClick={() => navigate("/forgot-password")} disabled={loading}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>
        </form>

        <div className="form-foot" style={{ marginTop: 24 }}>
          Don't have an account?{" "}
          <button className="link-btn" onClick={() => navigate("/signup")}>Create one</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;