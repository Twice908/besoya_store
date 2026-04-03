import { IconChevron } from "./HomeIcons";

const HeroBanner = () => (
  <div className="hero">
    <div className="hero__left">
      <div className="hero__eyebrow">This Week's Deals</div>
      <h1 className="hero__title">Up to 50% Off<br />Top Brands</h1>
      <p className="hero__sub">
        Grab the best deals on electronics, fashion,
        appliances and more — delivered to your door.
      </p>
      <button className="hero__cta">
        Shop Now <IconChevron />
      </button>
    </div>
    <div className="hero__right">🛒</div>
  </div>
);

export default HeroBanner;
