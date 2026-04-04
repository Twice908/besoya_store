import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "./HomeData";
import type { Product } from "./HomeData";
import { fmt } from "./HomeHelpers";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
  items: Product[];
  onUpdateQty: (productId: number, delta: -1 | 1) => void;
  onRemove: (productId: number) => void;
  onClear: () => void;
}

const CartSidebar = ({ open, onClose, items, onUpdateQty, onRemove, onClear }: CartSidebarProps) => {
  const navigate = useNavigate();
  const grouped = items.reduce<{ product: Product; qty: number }[]>((acc, item) => {
    const found = acc.find(r => r.product.product_id === item.product_id);
    if (found) found.qty += 1;
    else acc.push({ product: item, qty: 1 });
    return acc;
  }, []);

  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const delivery = subtotal > 0 ? (subtotal >= 5000 ? 0 : 99) : 0;
  const total = subtotal + delivery;
  const totalQty = items.length;

  return (
    <>
      <div className={`cart-overlay ${open ? "cart-overlay--open" : ""}`} onClick={onClose} />
      <div className={`cart-drawer ${open ? "cart-drawer--open" : ""}`}>
        <div className="cart-drawer__head">
          <div className="cart-drawer__title">
            🛒 Your Cart
            {totalQty > 0 && <span className="cart-drawer__count">{totalQty}</span>}
          </div>
          <button className="cart-drawer__close" onClick={onClose}>✕</button>
        </div>

        {grouped.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty__icon">🛒</div>
            <div className="cart-empty__title">Your cart is empty</div>
            <p className="cart-empty__sub">
              Looks like you haven't added anything yet.<br />
              Browse products and hit "Add to Cart".
            </p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {grouped.map(({ product: p, qty }) => (
                <div className="cart-item" key={p.product_id}>
                  <div className="cart-item__img">{p.category}</div>
                  <div className="cart-item__info">
                    <div className="cart-item__name">{p.product_name}</div>
                    <div className="cart-item__cat">{CATEGORIES.find(c => c.id === p.category)?.label}</div>
                    <div className="cart-item__bottom">
                      <span className="cart-item__price">{fmt(p.price * qty)}</span>
                      <div className="qty-stepper">
                        <button className="qty-btn" onClick={() => onUpdateQty(p.product_id, -1)} disabled={qty <= 1}>−</button>
                        <span className="qty-val">{qty}</span>
                        <button className="qty-btn" onClick={() => onUpdateQty(p.product_id, 1)}>+</button>
                      </div>
                      <button className="cart-item__remove" onClick={() => onRemove(p.product_id)} title="Remove item">🗑</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary__row"><span>Subtotal ({totalQty} item{totalQty > 1 ? "s" : ""})</span><span>{fmt(subtotal)}</span></div>
              <div className="cart-summary__row"><span>Delivery</span><span>{delivery === 0 ? "FREE 🎉" : fmt(delivery)}</span></div>
              {delivery === 0 && subtotal > 0 && <div style={{ fontSize: 11.5, color: "var(--success)", marginBottom: 6 }}>✓ Free delivery on orders above ₹5,000</div>}
              {delivery > 0 && <div style={{ fontSize: 11.5, color: "var(--muted)", marginBottom: 6 }}>Add {fmt(5000 - subtotal)} more for free delivery</div>}
              <div className="cart-summary__row cart-summary__row--total"><span>Total</span><span>{fmt(total)}</span></div>
              <button
                className="cart-checkout-btn"
                onClick={() => {
                  const cartItems = grouped.map(({ product, qty }) => ({ product, qty }));
                  navigate("/checkout", { state: { cartItems } });
                  onClose();
                }}
              >
                Proceed to Checkout →
              </button>
              <button className="cart-clear-btn" onClick={onClear}>Clear Cart</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
