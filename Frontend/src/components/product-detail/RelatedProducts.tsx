import ProductCard from "../home/ProductCard";
import type { Product } from "../../services/productService";

interface RelatedProductsProps {
  products: Product[];
  currentProductId?: number;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, qty: number, price: number) => void;
}

const RelatedProducts = ({
  products,
  currentProductId,
  onViewProduct,
  onAddToCart,
}: RelatedProductsProps) => {
  // Filter out the current product and get up to 4 related products
  const relatedProducts = products
    .filter((p) => p.product_id !== currentProductId)
    .slice(0, 4);

  const handleViewProduct = (product: Product) => {
    onViewProduct(product);
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product, 1, product.price);
  };

  return (
    <div className="pdp-related">
      <h2 className="pdp-related__title">You might also like</h2>
      <div className="product-grid">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            onView={handleViewProduct}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
