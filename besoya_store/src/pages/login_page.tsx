import { useState } from "react";
import Brand from "../components/brand.tsx";
import PasswordField from "../components/password_field.tsx";
import { AuthService } from "../services/authService.ts";
// import type { SignupData } from "../services/authService";

interface LoginPageProps {
  onLogin: (userData: { email: string }) => void;
  onGoSignUp: () => void;
  onGoForgot: () => void;
}

/* ============================================================
   PAGE: LoginPage
   ============================================================ */
const LoginPage = ({ onLogin, onGoSignUp, onGoForgot }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await AuthService.login({ email, password });
      AuthService.saveToken(response.token);
      onLogin(response.user);
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
            />
          </div>

          {/* Password Field */}
          <PasswordField
            id="login-password"
            label="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          {/* Forgot Password */}
          <div className="forgot-row" style={{ marginTop: 10, marginBottom: 22 }}>
            <button type="button" className="link-btn" onClick={onGoForgot}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn--primary">
            Sign In →
          </button>
        </form>

        <div className="form-foot" style={{ marginTop: 24 }}>
          Don't have an account?{" "}
          <button className="link-btn" onClick={onGoSignUp}>Create one</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;