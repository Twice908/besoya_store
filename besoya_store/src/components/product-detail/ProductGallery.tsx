import { useState } from "react";

interface Product {
  badge?: string | null;
  badgeType?: string | null;
  emoji: string;
}

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const thumbEmojis = [product.emoji, product.emoji, product.emoji, product.emoji];
  const [activeThumb, setActiveThumb] = useState(0);
  const [wished, setWished] = useState(false);

  return (
    <div className="pdp-gallery">
      <div className="pdp-main-img">
        {product.badge && (
          <div className={`pdp-img-badge pdp-img-badge--${product.badgeType}`}>
            {product.badge}
          </div>
        )}
        {thumbEmojis[activeThumb]}
        <button
          className={`pdp-wish-btn ${wished ? "pdp-wish-btn--active" : ""}`}
          onClick={() => setWished(w => !w)}
        >
          {wished ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="pdp-thumbs">
        {thumbEmojis.map((e, i) => (
          <div
            key={i}
            className={`pdp-thumb ${activeThumb === i ? "pdp-thumb--active" : ""}`}
            onClick={() => setActiveThumb(i)}
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;