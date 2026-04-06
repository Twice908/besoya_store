import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const HomeFooter = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userEmail = user?.email?.trim() || "Not available";

  const openWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=9193159 07006&text=${encoded}`;
    window.open(url, "_blank");
  };

  const footerColumns = [
    {
      title: "Shop",
      links: [
        { label: "All Products", action: () => navigate("/home") },
        { label: "New Arrivals", action: () => navigate("/home") },
        { label: "Best Sellers", action: () => navigate("/home") },
        { label: "Deals & Offers", action: () => navigate("/home") },
        { label: "Gift Cards", action: () => navigate("/home") },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "My Profile", action: () => navigate("/profile") },
        { label: "My Orders", action: () => navigate("/orders") },
      ],
    },
    {
      title: "Help",
      links: [
        {
          label: "Help Centre",
          action: () =>
            openWhatsApp(
              `Hello Besoya Store Support Team, I need assistance with my order. Please help.\n\nCustomer Email: ${userEmail}`,
            ),
        },
        { label: "Terms and conditions", action: () => navigate("/terms") },
        { label: "Returns & Refunds", action: () => navigate("/returns") },
        {
          label: "Contact Us",
          action: () =>
            openWhatsApp(
              `Hello Besoya Store Support Team, I would like to get in touch regarding a query. Please assist.\n\nCustomer Email: ${userEmail}`,
            ),
        },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand__logo">
            <div className="footer-brand__icon">🛍</div>
            <span className="footer-brand__name">Besoya Store</span>
          </div>
          <p className="footer-brand__desc">
            Your one-stop destination for premium products across all
            categories. Fast delivery, easy returns, and unbeatable prices.
          </p>
          <div className="footer-social">
            {["📘", "📸", "🐦", "▶️"].map((s, i) => (
              <button key={i} className="footer-social__btn">
                {s}
              </button>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <div className="footer-col__title">{col.title}</div>
            <ul className="footer-col__list">
              {col.links.map((link) => (
                <li key={link.label}>
                  <button className="footer-col__link" onClick={link.action}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div className="footer-bottom">
          <span className="footer-bottom__copy">
            © 2025 Besoya Store. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
