import { EXTENDED_PRODUCT_DATA } from "./ProductDetailData";
import { fmtPrice, StarsRow } from "./ProductDetailHelpers";
import type { Product } from "../../services/productService";

/** Related strip: real `Product` fields plus optional merchandising-only fields */
type RelatedProduct = Product & {
  rating: number;
  reviews: number;
  originalPrice: number;
  discount: number;
};

interface RelatedProductsProps {
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, qty: number, price: number) => void;
}

const now = () => new Date().toISOString();

const relatedProducts: RelatedProduct[] = [
  {
    product_id: 2,
    seller_id: 1,
    product_name: "Wireless Bluetooth Headphones",
    category: "electronics",
    price: 2999,
    inStock: 15,
    created_at: now(),
    updated_at: now(),
    rating: 4.3,
    reviews: 1247,
    originalPrice: 3999,
    discount: 25,
  },
  {
    product_id: 3,
    seller_id: 1,
    product_name: "Smart Fitness Watch",
    category: "electronics",
    price: 4999,
    inStock: 8,
    created_at: now(),
    updated_at: now(),
    rating: 4.5,
    reviews: 892,
    originalPrice: 6999,
    discount: 29,
  },
  {
    product_id: 4,
    seller_id: 1,
    product_name: "Portable Power Bank 20000mAh",
    category: "electronics",
    price: 1499,
    inStock: 23,
    created_at: now(),
    updated_at: now(),
    rating: 4.2,
    reviews: 2156,
    originalPrice: 1999,
    discount: 25,
  },
  {
    product_id: 5,
    seller_id: 1,
    product_name: "Gaming Mechanical Keyboard",
    category: "electronics",
    price: 3499,
    inStock: 12,
    created_at: now(),
    updated_at: now(),
    rating: 4.6,
    reviews: 756,
    originalPrice: 4999,
    discount: 30,
  },
];

const RelatedProducts = ({ onViewProduct, onAddToCart }: RelatedProductsProps) => {
  const handleViewProduct = (product: RelatedProduct) => {
    onViewProduct(product);
  };

  const handleAddToCart = (product: RelatedProduct) => {
    onAddToCart(product, 1, product.price);
  };

  return (
    <div className="pdp-related">
      <h2 className="pdp-related__title">You might also like</h2>
      <div className="pdp-related__grid">
        {relatedProducts.map((product) => {
          const ext =
            EXTENDED_PRODUCT_DATA[product.product_id] ||
            EXTENDED_PRODUCT_DATA.default;

          return (
            <div key={product.product_id} className="pdp-related-card">
              <div className="pdp-related-card__img">
                <img src={ext.images[0]} alt={product.product_name} />
                {product.discount ? (
                  <div className="pdp-related-card__badge">
                    {product.discount}% OFF
                  </div>
                ) : null}
              </div>

              <div className="pdp-related-card__content">
                <h3 className="pdp-related-card__title">
                  {product.product_name}
                </h3>

                <div className="pdp-related-card__rating">
                  <StarsRow rating={product.rating} />
                  <span className="pdp-related-card__rating-text">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="pdp-related-card__price">
                  <span className="pdp-related-card__price-current">
                    {fmtPrice(product.price)}
                  </span>
                  {product.originalPrice ? (
                    <span className="pdp-related-card__price-original">
                      {fmtPrice(product.originalPrice)}
                    </span>
                  ) : null}
                </div>

                <div className="pdp-related-card__actions">
                  <button
                    type="button"
                    className="pdp-related-card__btn pdp-related-card__btn--view"
                    onClick={() => handleViewProduct(product)}
                  >
                    View
                  </button>
                  <button
                    type="button"
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
