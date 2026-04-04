import { useEffect, useState } from "react";
import { OrderService } from "../services/orderService";
import type { Order } from "../services/orderService";
import { AuthService } from "../services/authService";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = AuthService.getCurrentUser();

      if (!user) {
        setError("Unable to load your orders. Please sign in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedOrders = await OrderService.getOrdersByUserID(user.user_id);
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
    <div style={{ padding: "36px 24px 48px", maxWidth: 1200, margin: "0 auto" }}>
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
