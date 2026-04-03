import { useState } from "react";
import { CATEGORIES } from "./HomeData";
import type { Product } from "./HomeData";
import { IconCartSmall } from "./HomeIcons";
import { Stars, fmt, stockLabel } from "./HomeHelpers";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onView: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onView }: ProductCardProps) => {
  const [wished, setWished] = useState(false);
  const { text: stockText, cls: stockCls } = stockLabel(product.inStock);
  const outOfStock = product.inStock === 0;

  return (
    <div className="p-card">
      <div className="p-card__img-wrap">
        {product.badge && (
          <span className={`p-card__badge p-card__badge--${product.badgeType}`}>
            {product.badge}
          </span>
        )}
        {product.emoji}
        <button
          className={`p-card__wishlist ${wished ? "p-card__wishlist--active" : ""}`}
          onClick={() => setWished(w => !w)}
          title={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wished ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="p-card__body">
        <span className="p-card__category">
          {CATEGORIES.find(c => c.id === product.category)?.label || product.category}
        </span>
        <div className="p-card__name">{product.name}</div>

        <div className="p-card__rating">
          <Stars rating={product.rating} />
          <span className="p-card__rating-count">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="p-card__price-row">
          <span className="p-card__price">{fmt(product.price)}</span>
          {product.originalPrice && (
            <span className="p-card__price-orig">{fmt(product.originalPrice)}</span>
          )}
          {product.discount && (
            <span className="p-card__discount">{product.discount}% off</span>
          )}
        </div>

        <div className={`p-card__stock ${stockCls}`}>{stockText}</div>
      </div>

      <div className="p-card__footer">
        {outOfStock ? (
          <button className="p-card__btn p-card__btn--disabled" disabled>
            Out of Stock
          </button>
        ) : (
          <>
            <button
              className="p-card__btn p-card__btn--cart"
              onClick={() => onAddToCart(product)}
            >
              <IconCartSmall /> Add to Cart
            </button>
            <button className="p-card__btn p-card__btn--view" onClick={() => onView(product)}>
              View
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
