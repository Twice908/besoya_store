import { useCallback, useEffect, useMemo, useState } from "react";
import { OrderService, type Order } from "../../services/orderService";
import {
  orderStatusTag,
  payStatusTag,
} from "../../utils/seller-dashboard-helpers";

export interface OrdersTableProps {
  sellerId: number | null;
}

const ORDER_STATUS_FILTERS: Order["order_status"][] = [
  "Started",
  "In Transit",
  "Left Transit",
  "Delivered",
  "Returning",
  "Returned",
  "Cancelled",
];

const PAYMENT_STATUSES: Order["payment_status"][] = [
  "Pending",
  "Paid",
  "Failed",
];

const ORDER_STATUSES: Order["order_status"][] = [
  "Started",
  "In Transit",
  "Left Transit",
  "Delivered",
  "Returning",
  "Returned",
  "Cancelled",
];

function formatMoney(value: number | string | undefined): string {
  const n = Number(value);
  if (Number.isNaN(n)) return "—";
  return `₹${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export const OrdersTable = ({ sellerId }: OrdersTableProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchOrder, setSearchOrder] = useState("");
  const [filterOrderStatus, setFilterOrderStatus] = useState<string>("all");

  const loadOrders = useCallback(async () => {
    if (sellerId == null) return;
    setLoading(true);
    setFetchError(null);
    try {
      const rows = await OrderService.getOrdersBySellerID(sellerId);
      setOrders(rows);
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [sellerId]);

  const handleStatusUpdate = useCallback(
    async (
      orderId: number,
      newPaymentStatus: Order["payment_status"],
      newOrderStatus: Order["order_status"],
    ) => {
      const order = orders.find((o) => o.order_id === orderId);
      if (!order) return;

      const changes = [];
      if (order.payment_status !== newPaymentStatus) {
        changes.push(
          `Payment Status: ${order.payment_status} → ${newPaymentStatus}`,
        );
      }
      if (order.order_status !== newOrderStatus) {
        changes.push(`Order Status: ${order.order_status} → ${newOrderStatus}`);
      }

      if (changes.length === 0) return; // No changes

      const confirmed = window.confirm(
        `Confirm status update for Order ${order.order_number}?\n\n${changes.join("\n")}`,
      );

      if (!confirmed) return;

      try {
        const updatedOrder = await OrderService.updateOrderStatus(
          orderId,
          newPaymentStatus,
          newOrderStatus,
        );
        setOrders((prev) =>
          prev.map((o) => (o.order_id === orderId ? updatedOrder : o)),
        );
      } catch (e) {
        alert(e instanceof Error ? e.message : "Failed to update order status");
      }
    },
    [orders],
  );

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  const filteredOrders = useMemo(() => {
    let result = orders;
    if (filterOrderStatus !== "all") {
      result = result.filter((o) => o.order_status === filterOrderStatus);
    }
    if (searchOrder.trim()) {
      const q = searchOrder.toLowerCase();
      result = result.filter(
        (o) =>
          o.order_number.toLowerCase().includes(q) ||
          String(o.order_id).includes(q) ||
          String(o.product_id).includes(q) ||
          String(o.user_id).includes(q) ||
          o.deliver_to.toLowerCase().includes(q),
      );
    }
    return result;
  }, [orders, searchOrder, filterOrderStatus]);

  if (sellerId == null) {
    return (
      <div className="empty-state">
        <div className="empty-state__text">
          Seller ID is missing. Sign in again.
        </div>
      </div>
    );
  }

  return (
    <>
      {fetchError ? <p role="alert">{fetchError}</p> : null}

      <div className="toolbar">
        <div className="search-box">
          <span className="search-box__icon">🔍</span>
          <input
            type="text"
            placeholder="Search order_number, order_id, product_id, user_id, deliver_to…"
            value={searchOrder}
            onChange={(e) => setSearchOrder(e.target.value)}
            disabled={loading}
          />
        </div>
        <select
          className="filter-select"
          value={filterOrderStatus}
          onChange={(e) => setFilterOrderStatus(e.target.value)}
          disabled={loading}
        >
          <option value="all">All Statuses</option>
          {ORDER_STATUS_FILTERS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        {!loading && filteredOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">📋</div>
            <div className="empty-state__text">No orders found</div>
          </div>
        ) : null}

        {loading ? <p>Loading orders…</p> : null}

        {filteredOrders.length > 0 ? (
          <table className="tbl">
            <thead>
              <tr>
                <th>order_number</th>
                <th>order_id</th>
                <th>product_id</th>
                <th>user_id</th>
                <th>variation_label</th>
                <th>quantity</th>
                <th>deliver_to</th>
                <th>unit_price</th>
                <th>total_price</th>
                <th>payment_status</th>
                <th>order_status</th>
                <th>order_date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const orderStatusInfo = orderStatusTag(order.order_status);
                const payStatusInfo = payStatusTag(order.payment_status);
                return (
                  <tr key={order.order_id}>
                    <td>
                      <span className="order-id">{order.order_number}</span>
                    </td>
                    <td>{order.order_id}</td>
                    <td>{order.product_id}</td>
                    <td>{order.user_id}</td>
                    <td>{order.variation_label ?? "—"}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <div className="addr-cell">{order.deliver_to}</div>
                    </td>
                    <td>{formatMoney(order.unit_price)}</td>
                    <td>{formatMoney(order.total_price)}</td>
                    <td>
                      <select
                        value={order.payment_status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            order.order_id,
                            e.target.value as Order["payment_status"],
                            order.order_status,
                          )
                        }
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          fontSize: "12px",
                          color: "var(--text)",
                          cursor: "pointer",
                        }}
                      >
                        {PAYMENT_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={order.order_status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            order.order_id,
                            order.payment_status,
                            e.target.value as Order["order_status"],
                          )
                        }
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          fontSize: "12px",
                          color: "var(--text)",
                          cursor: "pointer",
                        }}
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ fontSize: 12 }}>
                      {order.order_date
                        ? new Date(order.order_date).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}

        {filteredOrders.length > 0 && (
          <div className="pagination">
            <span>{filteredOrders.length} orders</span>
            <div className="pagination__pages">
              <button type="button" className="page-btn page-btn--active">
                1
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
