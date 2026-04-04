export const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

export const stockLabel = (n: number) => {
  if (n === 0) return { text: "Out of Stock", cls: "p-card__stock--out" };
  if (n <= 5) return { text: `Only ${n} left`, cls: "" };
  return { text: "In Stock", cls: "p-card__stock--good" };
};
