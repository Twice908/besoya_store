import { useState } from "react";
import { EXTENDED_PRODUCT_DATA } from "./ProductDetailData";
import { StarsRow } from "./ProductDetailHelpers";
import type { Product as APIProduct } from "../../services/productService";

type ProductTabsProduct = APIProduct & Partial<{
  id: number;
  name: string;
  inStock: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
}>;

interface ProductTabsProps {
  product: ProductTabsProduct;
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const productId = product.product_id ?? product.id ?? 0;
  const productRating = product.rating ?? 0;
  const reviewCount = product.reviews ?? EXTENDED_PRODUCT_DATA[productId]?.reviews?.length ?? 0;
  const ext = EXTENDED_PRODUCT_DATA[productId] || EXTENDED_PRODUCT_DATA.default;
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Description", content: ext.description },
    { label: "Specifications", content: ext.specs },
    { label: "Reviews", content: null }
  ];

  return (
    <div className="pdp-tabs">
      <div className="pdp-tabs__header">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`pdp-tab-btn ${activeTab === i ? "pdp-tab-btn--active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pdp-tabs__content">
        {activeTab === 0 && (
          <div className="pdp-description">
            <div dangerouslySetInnerHTML={{ __html: tabs[0].content || "" }} />
          </div>
        )}

        {activeTab === 1 && (
          <div className="pdp-specs">
            <table className="pdp-specs-table">
              <tbody>
                {ext.specs.map((spec: string[], i: number) => (
                  <tr key={i}>
                    <td className="pdp-specs-table__key">{spec[0]}</td>
                    <td className="pdp-specs-table__val">{spec[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 2 && (
          <div className="pdp-reviews">
            <div className="pdp-reviews-summary">
              <div className="pdp-reviews-summary__rating">
                <div className="pdp-reviews-summary__score">{productRating}</div>
                <StarsRow rating={productRating} />
                <div className="pdp-reviews-summary__count">{reviewCount.toLocaleString()} reviews</div>
              </div>
              <div className="pdp-reviews-summary__breakdown">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="pdp-reviews-bar">
                    <span className="pdp-reviews-bar__label">{star} ★</span>
                    <div className="pdp-reviews-bar__track">
                      <div
                        className="pdp-reviews-bar__fill"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <span className="pdp-reviews-bar__count">{Math.floor(Math.random() * 100)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pdp-reviews-list">
              {ext.reviews.map((review, i) => (
                <div key={i} className="pdp-review">
                  <div className="pdp-review__header">
                    <div className="pdp-review__avatar">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="pdp-review__meta">
                      <div className="pdp-review__user">{review.name}</div>
                      <div className="pdp-review__date">{review.date}</div>
                    </div>
                    <div className="pdp-review__rating">
                      <StarsRow rating={review.rating} />
                    </div>
                  </div>
                  <div className="pdp-review__text">{review.body}</div>
                  {review.images && (
                    <div className="pdp-review__images">
                      {review.images.map((img: string, j: number) => (
                        <img key={j} src={img} alt={`Review ${j + 1}`} className="pdp-review__img" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;