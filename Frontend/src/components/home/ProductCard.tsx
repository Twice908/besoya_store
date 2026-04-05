import { useState } from "react";
import { CATEGORIES } from "./HomeData";
import type { Product } from "./HomeData";
import { IconCartSmall } from "./HomeIcons";
import { fmt, stockLabel } from "./HomeHelpers";

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
    <div
      className="p-card"
      role="button"
      tabIndex={0}
      onClick={() => onView(product)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView(product);
        }
      }}
    >
      <div className="p-card__img-wrap">
        {product.product_image ? (
          <img
            src={product.product_image}
            alt={product.product_name}
            className="p-card__img"
          />
        ) : (
          <div className="p-card__img-placeholder">📦</div>
        )}
        <button
          className={`p-card__wishlist ${wished ? "p-card__wishlist--active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setWished((w) => !w);
          }}
          title={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wished ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="p-card__body">
        <span className="p-card__category">
          {CATEGORIES.find((c) => c.id === product.category)?.label ||
            product.category ||
            "General"}
        </span>
        <div className="p-card__name">{product.product_name}</div>

        <div className="p-card__price-row">
          <span className="p-card__price">{fmt(product.price)}</span>
        </div>

        <div className={`p-card__stock p-card__stock--${stockCls}`}>
          {stockText}
        </div>

        <div className="p-card__footer">
          <button
            className="p-card__btn p-card__btn--view"
            onClick={(e) => {
              e.stopPropagation();
              onView(product);
            }}
          >
            View Details
          </button>
          <button
            className={`p-card__btn p-card__btn--cart ${outOfStock ? "p-card__btn--disabled" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              if (!outOfStock) onAddToCart(product);
            }}
            disabled={outOfStock}
          >
            <IconCartSmall />
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
