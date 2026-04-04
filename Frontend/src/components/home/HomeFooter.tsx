const HomeFooter = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <div className="footer-brand__logo">
          <div className="footer-brand__icon">🛍</div>
          <span className="footer-brand__name">Besoya Store</span>
        </div>
        <p className="footer-brand__desc">
          Your one-stop destination for premium products across all categories.
          Fast delivery, easy returns, and unbeatable prices.
        </p>
        <div className="footer-social">
          {["📘","📸","🐦","▶️"].map((s, i) => (
            <button key={i} className="footer-social__btn">{s}</button>
          ))}
        </div>
      </div>

      {[
        { title: "Shop", links: ["All Products","New Arrivals","Best Sellers","Deals & Offers","Gift Cards"] },
        { title: "Account", links: ["My Profile","My Orders","Wishlist","Addresses","Wallet"] },
        { title: "Help", links: ["Help Centre","Track Order","Returns & Refunds","Cancellation","Contact Us"] },
        { title: "Company", links: ["About Besoya","Careers","Press","Blog","Seller Centre"] },
      ].map(col => (
        <div key={col.title}>
          <div className="footer-col__title">{col.title}</div>
          <ul className="footer-col__list">
            {col.links.map(link => (
              <li key={link}><button className="footer-col__link">{link}</button></li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div style={{ maxWidth: 1320, margin: "0 auto" }}>
      <div className="footer-bottom">
        <span className="footer-bottom__copy">© 2025 Besoya Store. All rights reserved.</span>
        <div className="footer-bottom__payments">
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginRight: 6 }}>We accept</span>
          {["Visa","Mastercard","UPI","NetBanking","COD"].map(p => (
            <span key={p} className="pay-chip">{p}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default HomeFooter;
