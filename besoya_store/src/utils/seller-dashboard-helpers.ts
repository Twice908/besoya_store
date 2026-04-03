/* Helper functions for seller dashboard */

export const orderStatusTag = (status: string): { color: string; text: string } => {
  const map: Record<string, { color: string; text: string }> = {
    Pending: { color: "tag--amber", text: "Pending" },
    Processing: { color: "tag--blue", text: "Processing" },
    Shipped: { color: "tag--blue", text: "Shipped" },
    Delivered: { color: "tag--green", text: "Delivered" },
    Cancelled: { color: "tag--red", text: "Cancelled" },
    Return: { color: "tag--red", text: "Return" },
  };
  return map[status] || { color: "tag--gray", text: status };
};

export const payStatusTag = (status: string): { color: string; text: string } => {
  const map: Record<string, { color: string; text: string }> = {
    Paid: { color: "tag--green", text: "Paid" },
    Pending: { color: "tag--amber", text: "Pending" },
    Cancelled: { color: "tag--red", text: "Cancelled" },
  };
  return map[status] || { color: "tag--gray", text: status };
};

export const stockStatus = (stock: number): {
  color: string;
  text: string;
  dotClass: string;
} => {
  if (stock === 0) {
    return { color: "tag--red", text: "Out of Stock", dotClass: "stock-dot--out" };
  }
  if (stock < 10) {
    return { color: "tag--amber", text: "Low Stock", dotClass: "stock-dot--low" };
  }
  return { color: "tag--green", text: "In Stock", dotClass: "stock-dot--good" };
};
