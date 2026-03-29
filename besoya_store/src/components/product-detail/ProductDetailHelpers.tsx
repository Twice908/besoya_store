export const fmtPrice = (n: number) => "₹" + n.toLocaleString("en-IN");

export const StarsRow = ({ rating, size = 16 }: { rating: number; size?: number }) => {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <span className="pdp-stars" style={{ fontSize: size }}>
      {"★".repeat(full)}{"½".repeat(half)}{"☆".repeat(empty)}
    </span>
  );
};

export const getStockState = (n: number) => {
  if (n === 0) return { cls: "pdp-stock--out", text: "Out of Stock" };
  if (n <= 5)  return { cls: "pdp-stock--low", text: `Only ${n} units left — order soon!` };
  return              { cls: "pdp-stock--good", text: `In Stock (${n} units available)` };
};