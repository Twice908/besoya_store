import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SellerService } from "../services/sellerService";

type SellerAuthView = "login" | "signup" | "forgot";

const SellerAuthPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<SellerAuthView>("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupMobile, setSignupMobile] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [forgotEmail, setForgotEmail] = useState("");

  const setViewClearing = useCallback((next: SellerAuthView) => {
    setError(null);
    setForgotMessage(null);
    setView(next);
  }, []);

  useEffect(() => {
    if (SellerService.isSellerLoggedIn()) {
      const seller = SellerService.getSellerSessionSeller();
      const token = SellerService.getSellerToken();
      navigate("/dashboard", {
        replace: true,
        state: {
          sellerId: seller?.seller_id,
          token: token ?? undefined,
        },
      });
    }
  }, [navigate]);

  const goDashboard = (sellerId: number, token: string) => {
    navigate("/dashboard", {
      replace: true,
      state: { sellerId, token },
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const emailExists = await SellerService.checkSellerExists(loginEmail);
      if (!emailExists) {
        setView("signup");
        setSignupEmail(loginEmail);
        setLoading(false);
        return;
      }

      const res = await SellerService.login({
        email: loginEmail,
        password: loginPassword,
      });
      SellerService.saveSellerAuth(res);
      goDashboard(res.seller.seller_id, res.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await SellerService.signup({
        seller_name: signupName,
        email: signupEmail,
        mobile: signupMobile,
        password: signupPassword,
      });
      SellerService.saveSellerAuth(res);
      goDashboard(res.seller.seller_id, res.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMessage(
      "Password reset is not available yet. Please contact support if you need help.",
    );
  };

  return (
    <div>
      <h1>Seller account</h1>

      {error ? <p role="alert">{error}</p> : null}

      {view === "login" && (
        <section aria-labelledby="seller-login-heading">
          <h2 id="seller-login-heading">Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="seller-login-email">Email</label>
              <input
                id="seller-login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="seller-login-password">Password</label>
              <input
                id="seller-login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p>
            <button type="button" onClick={() => setViewClearing("signup")}>
              Create seller account
            </button>
          </p>
          <p>
            <button type="button" onClick={() => setViewClearing("forgot")}>
              Forgot password
            </button>
          </p>
        </section>
      )}

      {view === "signup" && (
        <section aria-labelledby="seller-signup-heading">
          <h2 id="seller-signup-heading">Sign up</h2>
          <form onSubmit={handleSignup}>
            <div>
              <label htmlFor="seller-signup-name">Seller name</label>
              <input
                id="seller-signup-name"
                name="seller_name"
                type="text"
                required
                maxLength={100}
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="seller-signup-email">Email</label>
              <input
                id="seller-signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={100}
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="seller-signup-mobile">Mobile</label>
              <input
                id="seller-signup-mobile"
                name="mobile"
                type="tel"
                required
                maxLength={15}
                value={signupMobile}
                onChange={(e) => setSignupMobile(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="seller-signup-password">Password</label>
              <input
                id="seller-signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Sign up"}
            </button>
          </form>
          <p>
            <button type="button" onClick={() => setViewClearing("login")}>
              Back to login
            </button>
          </p>
        </section>
      )}

      {view === "forgot" && (
        <section aria-labelledby="seller-forgot-heading">
          <h2 id="seller-forgot-heading">Forgot password</h2>
          {forgotMessage ? <p>{forgotMessage}</p> : null}
          <form onSubmit={handleForgot}>
            <div>
              <label htmlFor="seller-forgot-email">Email</label>
              <input
                id="seller-forgot-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>
            <button type="submit">Request reset</button>
          </form>
          <p>
            <button type="button" onClick={() => setViewClearing("login")}>
              Back to login
            </button>
          </p>
        </section>
      )}
    </div>
  );
};

export default SellerAuthPage;
