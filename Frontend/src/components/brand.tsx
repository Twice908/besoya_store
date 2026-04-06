/* ============================================================
   COMPONENT: Brand  — logo + name
   ============================================================ */
const Brand = () => (
  <div className="brand">
    <div className="brand__logo">
      <img 
        src="/logoBesoya_store.jpeg" 
        alt="Besoya Store" 
        className="brand__image"
      />
      <span className="brand__name">Beso<span>ya</span></span>
    </div>
    <div className="brand__tagline">Premium Store</div>
  </div>
);

export default Brand;
