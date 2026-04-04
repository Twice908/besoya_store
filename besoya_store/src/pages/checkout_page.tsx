import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";
import { OrderService } from "../services/orderService";

interface CartItem {
  product: any; // Product structure from cart can vary
  qty: number;
}

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const cartItems: CartItem[] = location.state?.cartItems || [];
  const user = AuthService.getCurrentUser();

  // Helper to get product ID
  const getProductId = (product: any): number => {
    return product.product_id ?? 0;
  };

  // Helper to get seller ID
  const getSellerId = (product: any): number => {
    return product.seller_id || 1; // Default to 1 if not available
  };

  // Helper to get product price
  const getPrice = (product: any): number => {
    return product.price || 0;
  };

  // Helper to get product emoji
  const getEmoji = (product: any): string => {
    return product.emoji || "📦";
  };

  // Helper to get product name
  const getProductName = (product: any): string => {
    return product.product_name || product.name || "Product";
  };

  // Redirect if no cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/home");
    }
  }, [cartItems, navigate]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getPrice(item.product) * item.qty,
    0
  );
  const delivery = subtotal >= 5000 ? 0 : 99;
  const total = subtotal + delivery;

  const handleConfirmOrder = async () => {
    if (!user) {
      alert("Please sign in to place an order");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create order for each product in cart
      for (const item of cartItems) {
        const productId = getProductId(item.product);
        const sellerId = getSellerId(item.product);
        const price = getPrice(item.product);

        if (productId === 0) {
          console.warn("Skipping product with no ID");
          continue;
        }

        await OrderService.createOrder({
          product_id: productId,
          seller_id: sellerId,
          user_id: user.user_id,
          quantity: item.qty,
          deliver_to: "Default Address",
          unit_price: price,
          total_price: price * item.qty,
          payment_status: "Pending",
          order_status: "Started",
        });
      }

      // Show success message
      setShowSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (error) {
      console.error("Failed to create order:", error);
      alert(error instanceof Error ? error.message : "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div style={{ padding: "36px 24px 48px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Success Modal */}
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "48px 32px",
              textAlign: "center",
              maxWidth: 400,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Order Confirmed!</h3>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>
              Your order has been placed successfully. You'll be redirected to your orders shortly.
            </p>
          </div>
        </div>
      )}

      <div className="section-head" style={{ marginBottom: 28 }}>
        <h2 className="section-head__title">Checkout</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 28 }}>
        {/* Left side - Order Details */}
        <div>
          {/* Products */}
          <div
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: 24,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Order Items</h3>
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: 12,
                  paddingBottom: 16,
                  borderBottom: idx < cartItems.length - 1 ? "1px solid var(--border)" : "none",
                  marginBottom: idx < cartItems.length - 1 ? 16 : 0,
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    background: "var(--surface)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  {getEmoji(item.product)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    {getProductName(item.product)}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6 }}>
                    Qty: {item.qty}
                  </div>
                  <div style={{ fontWeight: 600 }}>
                    ₹{(getPrice(item.product) * item.qty).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address */}
          <div
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: 24,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Delivery Address</h3>
            {user ? (
              <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text)" }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  {user.first_name} {user.last_name}
                </div>
                <div style={{ color: "var(--muted)" }}>{user.email}</div>
                <div style={{ color: "var(--muted)" }}>{user.mobile}</div>
                <div style={{ marginTop: 8, color: "var(--muted)", fontSize: 12 }}>
                  ⓘ Address details will be confirmed during delivery
                </div>
              </div>
            ) : (
              <div style={{ color: "var(--muted)" }}>No address information available</div>
            )}
          </div>

          {/* Payment Method */}
          <div
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Payment Method</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px",
                background: "var(--surface)",
                borderRadius: "8px",
                border: "2px solid var(--accent)",
              }}
            >
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                defaultChecked
                style={{ cursor: "pointer" }}
              />
              <label htmlFor="cod" style={{ flex: 1, cursor: "pointer" }}>
                <div style={{ fontWeight: 600 }}>Cash on Delivery (COD)</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                  Pay when you receive your order
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right side - Summary */}
        <div>
          <div
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "20px",
              position: "sticky",
              top: 100,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Order Summary</h3>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ color: "var(--muted)" }}>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ color: "var(--muted)" }}>Delivery</span>
              <span>
                {delivery === 0 ? (
                  <span style={{ color: "var(--success)" }}>FREE 🎉</span>
                ) : (
                  `₹${delivery.toLocaleString("en-IN")}`
                )}
              </span>
            </div>

            {delivery === 0 && subtotal > 0 && (
              <div style={{ fontSize: 11.5, color: "var(--success)", marginBottom: 12 }}>
                ✓ Free delivery on orders above ₹5,000
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 12,
                borderTop: "1px solid var(--border)",
                marginBottom: 20,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <button
              className="cart-checkout-btn"
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              style={{
                width: "100%",
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Processing..." : "Confirm Order"}
            </button>

            <button
              className="cart-clear-btn"
              onClick={() => navigate("/home")}
              disabled={isSubmitting}
              style={{
                width: "100%",
                marginTop: 8,
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
