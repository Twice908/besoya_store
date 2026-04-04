import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Brand from "../components/brand.tsx";

/* ============================================================
   PAGE: ForgotPasswordPage
   ============================================================ */
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    // TESTING: Temporarily marking as sent for display
    // In production, this would send reset email via backend
    console.log("Testing password reset email to:", email);
  };

  return (
    <div className="page">
      <div className="card">
        <Brand />

        <div className="welcome">
          <h1 className="welcome__title">Reset Password 🔑</h1>
          <p className="welcome__sub">
            {sent
              ? "Check your inbox — a reset link is on its way."
              : "Enter the email linked to your account and we'll send a reset link."}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <div className="field" style={{ marginBottom: 22 }}>
              <label className="field__label" htmlFor="fp-email">Email Address</label>
              <input
                id="fp-email"
                type="email"
                className="field__input"
                placeholder="you@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn--primary">
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="success-box" style={{ marginBottom: 24 }}>
            <div className="success-box__icon">📬</div>
            <div className="success-box__title">Email Sent!</div>
            <p className="success-box__text">
              We've sent a password reset link to<br />
              <strong style={{ color: "var(--accent)" }}>{email}</strong>.<br />
              Please check your inbox (and spam folder).
            </p>
          </div>
        )}

        <button
          className="btn btn--outline"
          style={{ marginTop: sent ? 0 : 14 }}
          onClick={() => navigate("/login")}
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;