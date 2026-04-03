import { useState } from "react";
import EyeIcon from "./eye_icon";

/* ============================================================
   COMPONENT: PasswordField  — input + show/hide toggle
   ============================================================ */
const PasswordField = ({ id, label, value, onChange, placeholder = "••••••••", className = "" }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>{label}</label>
      <div className="field__wrap">
        <input
          id={id}
          type={show ? "text" : "password"}
          className="field__input field__input--icon"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
        <button
          type="button"
          className="field__icon-btn"
          onClick={() => setShow(s => !s)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );
};

export default PasswordField;