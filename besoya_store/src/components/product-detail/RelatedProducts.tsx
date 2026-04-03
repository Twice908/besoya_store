import { EXTENDED_PRODUCT_DATA } from "./ProductDetailData";
import { fmtPrice, StarsRow } from "./ProductDetailHelpers";
import type { Product } from "../home";

interface RelatedProductsProps {
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, qty: number, price: number) => void;
}

const RelatedProducts = ({ onViewProduct, onAddToCart }: RelatedProductsProps) => {
  // Mock related products - in real app, this would come from API
  const relatedProducts: Product[] = [
    {
      id: 2,
      name: "Wireless Bluetooth Headphones",
      category: "electronics",
      emoji: "🎧",
      price: 2999,
      originalPrice: 3999,
      discount: 25,
      rating: 4.3,
      reviews: 1247,
      inStock: 15
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      category: "electronics",
      emoji: "⌚",
      price: 4999,
      originalPrice: 6999,
      discount: 29,
      rating: 4.5,
      reviews: 892,
      inStock: 8
    },
    {
      id: 4,
      name: "Portable Power Bank 20000mAh",
      category: "electronics",
      emoji: "🔋",
      price: 1499,
      originalPrice: 1999,
      discount: 25,
      rating: 4.2,
      reviews: 2156,
      inStock: 23
    },
    {
      id: 5,
      name: "Gaming Mechanical Keyboard",
      category: "electronics",
      emoji: "⌨️",
      price: 3499,
      originalPrice: 4999,
      discount: 30,
      rating: 4.6,
      reviews: 756,
      inStock: 12
    }
  ];

  const handleViewProduct = (product: Product) => {
    onViewProduct(product);
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product, 1, product.price);
  };

  return (
    <div className="pdp-related">
      <h2 className="pdp-related__title">You might also like</h2>
      <div className="pdp-related__grid">
        {relatedProducts.map(product => {
          const ext = EXTENDED_PRODUCT_DATA[product.id] || EXTENDED_PRODUCT_DATA.default;

          return (
            <div key={product.id} className="pdp-related-card">
              <div className="pdp-related-card__img">
                <img src={ext.images[0]} alt={product.name} />
                {product.discount && (
                  <div className="pdp-related-card__badge">{product.discount}% OFF</div>
                )}
              </div>

              <div className="pdp-related-card__content">
                <h3 className="pdp-related-card__title">{product.name}</h3>

                <div className="pdp-related-card__rating">
                  <StarsRow rating={product.rating} />
                  <span className="pdp-related-card__rating-text">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="pdp-related-card__price">
                  <span className="pdp-related-card__price-current">{fmtPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="pdp-related-card__price-original">{fmtPrice(product.originalPrice)}</span>
                  )}
                </div>

                <div className="pdp-related-card__actions">
                  <button
                    className="pdp-related-card__btn pdp-related-card__btn--view"
                    onClick={() => handleViewProduct(product)}
                  >
                    View
                  </button>
                  <button
                    className="pdp-related-card__btn pdp-related-card__btn--cart"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.inStock === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;