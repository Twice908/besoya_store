import { useNavigate } from "react-router-dom";

const ReturnsPage = () => {
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
      <h1 style={{ fontSize: 32, marginBottom: 18 }}>Returns and Refunds</h1>
      <p style={{ color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
        We are committed to your satisfaction. If you are not happy with your
        purchase, you may request a return within 5 days of delivery.
      </p>
      <p style={{ color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
        To be eligible for a return, the item must be unused, in the same
        condition that you received it, and in its original packaging.
      </p>
      <p style={{ color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
        Once your return is received and inspected, we will notify you of the
        approval or rejection of your refund.
      </p>
      <p style={{ color: "#444", lineHeight: 1.8 }}>
        Refunds will be issued to the original payment method within 7-10
        business days after approval.
      </p>
    </div>
  );
};

export default ReturnsPage;
