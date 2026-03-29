import {
  ProductDetailNavbar,
  ProductGallery,
  ProductInfo,
  ProductTabs,
  RelatedProducts
} from "../components/product-detail";
import type { Product } from "../components/home";

interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
}

const ProductDetailsPage = ({ product, onBack, onAddToCart }: ProductDetailsPageProps) => {

  const handleAddToCart = (product: Product, qty: number, price: number) => {
    onAddToCart({ product, quantity: qty, price });
  };

  const handleViewProduct = (product: Product) => {
    // In a real app, this would navigate to the product detail page
    // For now, we'll just log it
    console.log("View product:", product);
  };

  return (
    <div className="pdp">
      <ProductDetailNavbar
        onBack={onBack}
        productName={product.name}
        category={product.category}
      />

      <div className="pdp-body">
        <ProductGallery product={product} />
        <ProductInfo product={product} onAddToCart={handleAddToCart} />
      </div>

      <div className="pdp-tabs-section">
        <ProductTabs product={product} />
      </div>

      <RelatedProducts
        onViewProduct={handleViewProduct}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductDetailsPage;