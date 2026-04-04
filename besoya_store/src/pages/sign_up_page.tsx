import { useState } from "react";
import Brand from "../components/brand.tsx";
import PasswordField from "../components/password_field.tsx";
import { AuthService } from "../services/authService";
import type { SignupData } from "../services/authService";

interface SignUpPageProps {
  onGoLogin: () => void;
}

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  addressLine: string;
  area: string;
  landmark: string;
  city: string;
  postalCode: string;
  addressType: string;
  deliveryTime: string;
  agree: boolean;
}

interface FormErrors {
  [key: string]: string;
}

/* ============================================================
   PAGE: SignUpPage
   ============================================================ */
const SignUpPage = ({ onGoLogin }: SignUpPageProps) => {
  const [form, setForm] = useState<SignUpForm>({
    firstName: "", lastName: "", email: "", mobile: "",
    password: "", confirmPassword: "",
    addressLine: "", area: "", landmark: "",
    city: "", postalCode: "",
    addressType: "Home",
    deliveryTime: "weekdays",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const set = (key: keyof SignUpForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim())  errs.lastName  = "Required";
    if (!form.email.trim())     errs.email     = "Required";
    if (!form.mobile.trim())    errs.mobile    = "Required";
    if (form.password.length < 8) errs.password = "Min 8 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords don't match";
    if (!form.agree) errs.agree = "Please agree to terms";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setApiError(null);
    setLoading(true);

    try {
      const signupData: SignupData = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
        address_line: form.addressLine || undefined,
        area: form.area || undefined,
        landmark: form.landmark || undefined,
        city: form.city || undefined,
        postal_code: form.postalCode || undefined,
        address_type: form.addressType,
        delivery_pref: form.deliveryTime,
      };

      const response = await AuthService.signup(signupData);
      AuthService.saveToken(response.token);
      setSubmitted(true);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="card">
          <Brand />
          <div className="success-box">
            <div className="success-box__icon">🎉</div>
            <div className="success-box__title">Account Created!</div>
            <p className="success-box__text">
              Welcome to Besoya Store, {form.firstName}!<br />
              Your account is ready. Start shopping now.
            </p>
          </div>
          <button
            className="btn btn--primary"
            style={{ marginTop: 28 }}
            onClick={onGoLogin}
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card card--wide">
        <Brand />

        <div className="welcome">
          <h1 className="welcome__title">Create your account ✨</h1>
          <p className="welcome__sub">
            Join thousands of happy shoppers on Besoya Store.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {apiError && (
            <div className="full">
              <div className="error-message" style={{ color: 'red', marginBottom: 16 }}>
                {apiError}
              </div>
            </div>
          )}
          <div className="form-grid">

            {/* ── Personal Info ── */}
            <div className="field">
              <label className="field__label" htmlFor="su-fn">First Name</label>
              <input id="su-fn" type="text" className="field__input" placeholder="Rohan"
                value={form.firstName} onChange={set("firstName")} />
              {errors.firstName && <span className="field-error">{errors.firstName}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="su-ln">Last Name</label>
              <input id="su-ln" type="text" className="field__input" placeholder="Sharma"
                value={form.lastName} onChange={set("lastName")} />
              {errors.lastName && <span className="field-error">{errors.lastName}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="su-email">Email Address</label>
              <input id="su-email" type="email" className="field__input" placeholder="you@example.com"
                value={form.email} onChange={set("email")} />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="su-mob">Mobile Number</label>
              <input id="su-mob" type="tel" className="field__input" placeholder="+91 98765 43210"
                value={form.mobile} onChange={set("mobile")} />
              {errors.mobile && <span className="field-error">{errors.mobile}</span>}
            </div>

            <PasswordField
              id="su-pass" label="Password"
              value={form.password} onChange={set("password")}
              placeholder="Min 8 characters"
            />

            <div>
              <PasswordField
                id="su-cpass" label="Confirm Password"
                value={form.confirmPassword} onChange={set("confirmPassword")}
                placeholder="Re-enter password"
              />
              {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </div>

            {/* ── Address Block ── */}
            <div className="full">
              <div className="addr-section">
                <div className="addr-section__title">📍 Delivery Address</div>
                <div className="form-grid" style={{ marginBottom: 0 }}>

                  <div className="field full">
                    <label className="field__label" htmlFor="su-addr">House / Flat / Building</label>
                    <input id="su-addr" type="text" className="field__input"
                      placeholder="Flat 4B, Sunrise Apartments"
                      value={form.addressLine} onChange={set("addressLine")} />
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="su-area">Area / Street</label>
                    <input id="su-area" type="text" className="field__input"
                      placeholder="MG Road"
                      value={form.area} onChange={set("area")} />
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="su-lm">Landmark</label>
                    <input id="su-lm" type="text" className="field__input"
                      placeholder="Near City Mall"
                      value={form.landmark} onChange={set("landmark")} />
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="su-city">City</label>
                    <input id="su-city" type="text" className="field__input"
                      placeholder="Pune"
                      value={form.city} onChange={set("city")} />
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="su-pin">Postal Code</label>
                    <input id="su-pin" type="text" className="field__input"
                      placeholder="411001"
                      maxLength={6}
                      value={form.postalCode} onChange={set("postalCode")} />
                  </div>

                  {/* Address Type */}
                  <div className="field full">
                    <label className="field__label">Address Type</label>
                    <div className="pill-group">
                      {["Home", "Office"].map(t => (
                        <label className="pill" key={t}>
                          <input type="radio" name="addrType" value={t}
                            checked={form.addressType === t}
                            onChange={set("addressType")} />
                          <span className="pill__label">
                            {t === "Home" ? "🏠" : "🏢"} {t}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Time Preference */}
                  <div className="field full">
                    <label className="field__label">Delivery Time Preference</label>
                    <div className="pill-group">
                      <label className="pill">
                        <input type="radio" name="delivTime" value="weekdays"
                          checked={form.deliveryTime === "weekdays"}
                          onChange={set("deliveryTime")} />
                        <span className="pill__label">⏰ Weekdays 10 AM – 8 PM</span>
                      </label>
                      <label className="pill">
                        <input type="radio" name="delivTime" value="weekend"
                          checked={form.deliveryTime === "weekend"}
                          onChange={set("deliveryTime")} />
                        <span className="pill__label">📅 Weekend Delivery Only</span>
                      </label>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ── Notice ── */}
            <div className="full">
              <div className="notice">
                <span className="notice__icon">ℹ️</span>
                Weekday deliveries are available Mon–Fri, 10:00 AM to 8:00 PM.
                Weekend deliveries cover Saturday & Sunday.
              </div>
            </div>

            {/* ── Terms ── */}
            <div className="full">
              <div className="checkbox-row">
                <input type="checkbox" id="su-agree"
                  checked={form.agree} onChange={set("agree")} />
                <label htmlFor="su-agree">
                  I agree to Besoya's{" "}
                  <a href="#terms" onClick={e => e.preventDefault()}>Terms & Conditions</a>{" "}
                  and{" "}
                  <a href="#privacy" onClick={e => e.preventDefault()}>Privacy Policy</a>.
                </label>
              </div>
              {errors.agree && <span className="field-error" style={{ marginTop: 4, display: "block" }}>{errors.agree}</span>}
            </div>

            {/* ── Submit ── */}
            <div className="full">
              <button type="submit" className="btn btn--primary" style={{ marginTop: 6 }} disabled={loading}>
                {loading ? 'Creating Account...' : 'Create My Account 🚀'}
              </button>
            </div>

          </div>
        </form>

        <div className="form-foot">
          Already have an account?{" "}
          <button className="link-btn" onClick={onGoLogin}>Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;