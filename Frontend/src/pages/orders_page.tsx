import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { OrderService } from "../services/orderService";
import type { Order } from "../services/orderService";
import { AuthService } from "../services/authService";
import { SESSION_EXPIRED_ERROR } from "../services/productService";

/** Local session missing (e.g. cleared token); same UX as expired session. */
const AUTH_REQUIRED = "AUTH_REQUIRED";

const OrdersPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = AuthService.getCurrentUser();

      if (!user) {
        setError(AUTH_REQUIRED);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedOrders = await OrderService.getOrdersByUserID(
          user.user_id,
        );
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSessionExpiredSignIn = () => {
    logout();
    navigate("/login", {
      replace: true,
      state: { from: { pathname: "/orders" } },
    });
  };

  const isSessionExpired =
    error === SESSION_EXPIRED_ERROR || error === AUTH_REQUIRED;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString
      : date.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  return (
    <div
      style={{ padding: "36px 24px 48px", maxWidth: 1200, margin: "0 auto" }}
    >
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "transparent",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "10px 14px",
          color: "var(--text)",
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
        ← Back
      </button>
      <div className="section-head" style={{ marginBottom: 28 }}>
        <div>
          <h2 className="section-head__title">My Orders</h2>
          <div style={{ marginTop: 8, color: "var(--muted)", fontSize: 14 }}>
            View your recent orders and track their current status.
          </div>
        </div>
      </div>

      {loading ? (
        <div className="empty-state" style={{ padding: "60px 20px" }}>
          <div className="empty-state__icon">⏳</div>
          <div className="empty-state__text">Loading your orders…</div>
        </div>
      ) : isSessionExpired ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--text)",
            maxWidth: 420,
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
            Session expired
          </div>
          <div
            style={{
              fontSize: 15,
              color: "var(--muted)",
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            Please sign in again to continue shopping with a fresh session.
          </div>
          <button
            type="button"
            style={{
              background: "var(--accent)",
              color: "white",
              border: "none",
              padding: "10px 22px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
            }}
            onClick={handleSessionExpiredSignIn}
          >
            Sign in
          </button>
        </div>
      ) : error ? (
        <div className="empty-state" style={{ padding: "60px 20px" }}>
          <div className="empty-state__icon">❌</div>
          <div className="empty-state__text">{error}</div>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-state" style={{ padding: "60px 20px" }}>
          <div className="empty-state__icon">📭</div>
          <div className="empty-state__text">No orders yet.</div>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>
                    <div className="order-num">{order.order_number}</div>
                    <div className="order-id">#{order.order_id}</div>
                  </td>
                  <td>{formatDate(order.order_date)}</td>
                  <td>{order.payment_status}</td>
                  <td>
                    <span
                      className={`tag ${
                        order.order_status === "Delivered"
                          ? "tag--green"
                          : order.order_status === "Cancelled"
                            ? "tag--red"
                            : "tag--blue"
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </td>
                  <td>₹{order.total_price.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
