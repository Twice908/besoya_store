import { useState, useMemo } from "react";
import { ORDERS, ORDER_STATUSES } from "../../data/mock-data";
import { orderStatusTag, payStatusTag } from "../../utils/seller-dashboard-helpers";

export const OrdersTable = () => {
  const [searchOrder, setSearchOrder] = useState<string>("");
  const [filterOrderStatus, setFilterOrderStatus] = useState<string>("all");

  const filteredOrders = useMemo(() => {
    let result = ORDERS;

    if (filterOrderStatus !== "all") {
      result = result.filter((o: any) => o.status === filterOrderStatus);
    }

    if (searchOrder.trim()) {
      const q = searchOrder.toLowerCase();
      result = result.filter(
        (o: any) =>
          o.id.toLowerCase().includes(q) ||
          o.product.toLowerCase().includes(q) ||
          o.buyer.toLowerCase().includes(q)
      );
    }

    return result;
  }, [searchOrder, filterOrderStatus]);

  return (
    <>
      <div className="toolbar">
        <div className="search-box">
          <span className="search-box__icon">🔍</span>
          <input
            type="text"
            placeholder="Search by order ID, product, or buyer..."
            value={searchOrder}
            onChange={(e) => setSearchOrder(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filterOrderStatus}
          onChange={(e) => setFilterOrderStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          {ORDER_STATUSES.map((status: string) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">📋</div>
            <div className="empty-state__text">No orders found</div>
          </div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Order</th>
                <th>Product</th>
                <th>Date / Time</th>
                <th>Buyer</th>
                <th>Address</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order: any) => {
                const orderStatusInfo = orderStatusTag(order.status);
                const payStatusInfo = payStatusTag(order.payment);
                return (
                  <tr key={order.id}>
                    <td>
                      <span className="order-id">
                        {order.id.split("-").slice(0, 2).join("-")}
                        <br />
                        <span className="order-num">
                          {order.id.split("-")[2]}
                        </span>
                      </span>
                    </td>
                    <td>{order.product}</td>
                    <td>{order.datetime}</td>
                    <td>{order.buyer}</td>
                    <td>
                      <div className="addr-cell">{order.address}</div>
                    </td>
                    <td>
                      <div>
                        <div className={`tag ${payStatusInfo.color}`}>
                          {payStatusInfo.text}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#999",
                            marginTop: "3px",
                          }}
                        >
                          {order.paymentMethod}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`tag ${orderStatusInfo.color}`}>
                        {orderStatusInfo.text}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn--ghost">View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {filteredOrders.length > 0 && (
          <div className="pagination">
            <span>{filteredOrders.length} orders</span>
            <div className="pagination__pages">
              <button className="page-btn page-btn--active">1</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
