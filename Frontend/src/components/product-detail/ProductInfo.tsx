import { useState } from "react";
import { EXTENDED_PRODUCT_DATA } from "./ProductDetailData";
import { fmtPrice, StarsRow, getStockState } from "./ProductDetailHelpers";
import type { Product as APIProduct } from "../../services/productService";

type ProductInfoProduct = APIProduct &
  Partial<{
    originalPrice: number;
    discount: number;
    rating: number;
    reviews: number;
  }>;

type ProductVariant = {
  label: string;
  price: number;
};

interface ProductInfoProps {
  product: ProductInfoProduct;
  onAddToCart: (
    product: ProductInfoProduct,
    qty: number,
    price: number,
  ) => void;
}

const ProductInfo = ({ product, onAddToCart }: ProductInfoProps) => {
  const productId = product.product_id;
  const productName = product.product_name;
  const inStock = product.inStock;
  const productRating = product.rating ?? 0;
  const reviewCount =
    product.reviews ?? EXTENDED_PRODUCT_DATA[productId]?.reviews?.length ?? 0;

  const ext = EXTENDED_PRODUCT_DATA[productId] || EXTENDED_PRODUCT_DATA.default;
  const outOfStock = inStock === 0;
  const variants: ProductVariant[] = Array.isArray(product.variations)
    ? product.variations.filter(
        (variant): variant is ProductVariant =>
          typeof variant === "object" &&
          variant !== null &&
          typeof (variant as { label?: unknown }).label === "string" &&
          typeof (variant as { price?: unknown }).price === "number",
      )
    : [];

  const [qty, setQty] = useState(1);
  const [activeVar, setActiveVar] = useState(
    variants.length > 0
      ? Math.max(
          0,
          variants.findIndex((v) => v.price === product.price),
        )
      : 0,
  );
  const [showFullDescription, setShowFullDescription] = useState(false);

  const currentPrice = variants.length > 0
    ? (variants[activeVar]?.price ?? product.price)
    : product.price;
  const productDescription = product.description?.trim() || "No description available.";
  const hasLongDescription = productDescription.length > 140;

  const { cls: stockCls, text: stockText } = getStockState(inStock);

  const handleAddToCart = () => {
    onAddToCart(product, qty, currentPrice);
  };

  return (
    <div className="pdp-info">
      <div className="pdp-seller">
        <div className="pdp-seller__dot" />
        {ext.seller}
      </div>

      <h1 className="pdp-title">{productName}</h1>

      <div className="pdp-rating">
        <StarsRow rating={productRating} />
        <span className="pdp-rating__score">{productRating}</span>
        <span className="pdp-rating__count">
          ({reviewCount.toLocaleString()} reviews)
        </span>
        <span className="pdp-rating__divider">|</span>
        <span className="pdp-rating__sold">{ext.soldCount} sold</span>
      </div>

      <div style={{ marginTop: 14 }}>
        <div className="pdp-section-label" style={{ marginBottom: 8 }}>
          Description
        </div>
        <p
          style={{
            margin: 0,
            color: "var(--muted)",
            lineHeight: 1.6,
            display: showFullDescription ? "block" : "-webkit-box",
            WebkitLineClamp: showFullDescription ? "unset" : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {productDescription}
        </p>
        {hasLongDescription && (
          <button
            type="button"
            onClick={() => setShowFullDescription((v) => !v)}
            style={{
              marginTop: 8,
              border: "none",
              background: "transparent",
              color: "var(--accent)",
              padding: 0,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      <div className="pdp-divider" />

      <div className="pdp-price-block">
        <div className="pdp-price-row">
          <span className="pdp-price">{fmtPrice(currentPrice)}</span>
          {product.originalPrice && (
            <span className="pdp-price-orig">
              {fmtPrice(product.originalPrice)}
            </span>
          )}
          {product.discount && (
            <span className="pdp-discount-pill">{product.discount}% off</span>
          )}
        </div>
        <div className="pdp-price-note">
          <strong>Free delivery</strong> on all orders · Inclusive of all taxes
        </div>
      </div>

      {/* <div className="pdp-offers">
        <div className="pdp-offers__title">Available Offers</div>
        <div className="pdp-offer-row">
          <span className="pdp-offer-row__icon">🏦</span>
          <span>
            <strong>Bank Offer:</strong> 10% instant discount on SBI Credit
            Cards. Min ₹1,500 txn.
          </span>
        </div>
        <div className="pdp-offer-row">
          <span className="pdp-offer-row__icon">🔁</span>
          <span>
            <strong>No Cost EMI</strong> available from ₹
            {Math.round(currentPrice / 12).toLocaleString("en-IN")}/month on
            12-month plans.
          </span>
        </div>
        <div className="pdp-offer-row">
          <span className="pdp-offer-row__icon">🛡️</span>
          <span>
            <strong>Protection Plan:</strong> Add 2-year extended warranty for
            ₹499.
          </span>
        </div>
      </div> */}

      {variants.length > 0 ? (
        <div style={{ marginBottom: 20 }}>
          <div className="pdp-section-label">Select Variant</div>
          <div className="pdp-variations">
            {variants.map((v, i) => (
              <button
                key={i}
                className={`pdp-var-btn ${activeVar === i ? "pdp-var-btn--active" : ""}`}
                onClick={() => setActiveVar(i)}
              >
                {v.label}
                <span className="pdp-var-btn__price">{fmtPrice(v.price)}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: 20 }}>
          <div className="pdp-section-label">No Variants Available</div>
        </div>
      )}

      {/* <div className={`pdp-stock ${stockCls}`}>
        <div className="pdp-stock__dot" />
        {stockText}
      </div> */}

      {!outOfStock && (
        <div className="pdp-qty-row">
          <div className="pdp-section-label" style={{ margin: 0 }}>
            Qty:
          </div>
          <div className="pdp-qty-stepper">
            <button
              className="pdp-qty-btn"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
            >
              −
            </button>
            <div className="pdp-qty-val">{qty}</div>
            <button
              className="pdp-qty-btn"
              onClick={() => setQty((q) => Math.min(inStock, q + 1))}
              disabled={qty >= inStock}
            >
              +
            </button>
          </div>
          {/* <span className="pdp-qty-label">Max {inStock} units per order</span> */}
        </div>
      )}

      <div className="pdp-cta-row">
        {outOfStock ? (
          <button className="pdp-btn pdp-btn--disabled" disabled>
            Out of Stock
          </button>
        ) : (
          <>
            <button className="pdp-btn pdp-btn--cart" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            <button className="pdp-btn pdp-btn--buy" onClick={handleAddToCart}>
              ⚡ Buy Now
            </button>
          </>
        )}
      </div>

      {/* <div className="pdp-delivery">
        <div className="pdp-delivery__row">
          <span className="pdp-delivery__icon">📦</span>
          <div>
            <span className="pdp-delivery__label">Standard Delivery</span>
            <span className="pdp-delivery__sub">
              Estimated 5-8 business days · Free on all orders
            </span>
          </div>
        </div>
        <div className="pdp-delivery__row">
          <span className="pdp-delivery__icon">⚡</span>
          <div>
            <span className="pdp-delivery__label">Express Delivery</span>
            <span className="pdp-delivery__sub">
              Next-day delivery available in select cities — ₹99 extra
            </span>
          </div>
        </div>
        <div className="pdp-delivery__row">
          <span className="pdp-delivery__icon">🔄</span>
          <div>
            <span className="pdp-delivery__label">30-Day Easy Returns</span>
            <span className="pdp-delivery__sub">
              No questions asked returns within 30 days of delivery
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProductInfo;
