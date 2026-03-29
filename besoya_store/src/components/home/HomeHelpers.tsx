export const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

export const stockLabel = (n: number) => {
  if (n === 0) return { text: "Out of Stock", cls: "p-card__stock--out" };
  if (n <= 5) return { text: `Only ${n} left`, cls: "" };
  return { text: "In Stock", cls: "p-card__stock--good" };
};

export const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <span className="p-card__stars">
      {"★".repeat(full)}{"½".repeat(half)}{"☆".repeat(empty)}
    </span>
  );
};
