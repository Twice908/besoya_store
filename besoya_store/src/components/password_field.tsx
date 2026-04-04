import { useState } from "react";
import EyeIcon from "./eye_icon.tsx";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

/* ============================================================
   COMPONENT: PasswordField  — input + show/hide toggle
   ============================================================ */
const PasswordField = ({ id, label, value, onChange, placeholder = "••••••••", className = "", disabled = false }: PasswordFieldProps) => {
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
          disabled={disabled}
        />
        <button
          type="button"
          className="field__icon-btn"
          onClick={() => setShow(s => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          disabled={disabled}
        >
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
