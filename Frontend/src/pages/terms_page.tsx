import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px" }}>
      <button
        style={{
          marginBottom: 24,
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: "10px 16px",
          background: "white",
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <h1 style={{ fontSize: 32, marginBottom: 18 }}>Terms and Conditions</h1>
      <p style={{ color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
        Welcome to Besoya Store. These terms and conditions outline the rules
        and regulations for the use of our website.
      </p>
      <p style={{ color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
        By accessing this website, we assume you accept these terms and
        conditions in full. Do not continue to use Besoya Store if you do not
        accept all of the terms and conditions stated on this page.
      </p>
      <p style={{ color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
        All products available on this site are subject to availability and we
        reserve the right to modify or discontinue any product at any time
        without prior notice.
      </p>
      <p style={{ color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
        We are committed to protecting your privacy. Personal information
        collected during checkout or account registration will be used only to
        fulfil orders and improve your shopping experience.
      </p>
      <p style={{ color: "#444", lineHeight: 1.8 }}>
        If you have any questions about these terms, please contact us through
        our support channels.
      </p>
    </div>
  );
};

export default TermsPage;
