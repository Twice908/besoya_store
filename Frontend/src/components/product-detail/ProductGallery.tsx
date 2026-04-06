import { useState } from "react";
import type { Product } from "../../services/productService";

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  // Provide fallback emoji based on category or use a default
  const getEmoji = () => {
    if (product.category) {
      const categoryEmojis: Record<string, string> = {
        electronics: "📱",
        clothing: "👕",
        books: "📚",
        home: "🏠",
        sports: "⚽",
        beauty: "💄",
        toys: "🧸",
        food: "🍎",
      };
      return categoryEmojis[product.category.toLowerCase()] || "📦";
    }
    return "📦"; // Default emoji
  };

  const emoji = getEmoji();
  // const thumbEmojis = [emoji, emoji, emoji, emoji];
  // const [activeThumb, setActiveThumb] = useState(0);
  const [wished, setWished] = useState(false);

  return (
    <div className="pdp-gallery">
      <div className="pdp-main-img">
        {product.product_image ? (
          <img
            src={product.product_image}
            alt={product.product_name}
            className="pdp-main-img__content"
          />
        ) : null}
        <button
          className={`pdp-wish-btn ${wished ? "pdp-wish-btn--active" : ""}`}
          onClick={() => setWished((w) => !w)}
        >
          {wished ? "❤️" : "🤍"}
        </button>
      </div>

      {/* <div className="pdp-thumbs">
        {thumbEmojis.map((e, i) => (
          <div
            key={i}
            className={`pdp-thumb ${activeThumb === i ? "pdp-thumb--active" : ""}`}
            onClick={() => setActiveThumb(i)}
          >
            {e}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ProductGallery;
