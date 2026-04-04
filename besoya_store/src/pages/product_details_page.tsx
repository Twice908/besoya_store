import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  ProductDetailNavbar,
  ProductGallery,
  ProductInfo,
  ProductTabs,
  RelatedProducts
} from "../components/product-detail";
import { ProductService } from "../services/productService";
import type { Product } from "../services/productService";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // First check if product was passed via location.state
        let productData = (location.state as { product: Product } | null)?.product;

        if (!productData && id) {
          // Fetch product from API if not passed via state
          productData = await ProductService.getProduct(parseInt(id));
        }

        if (productData) {
          setProduct(productData);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, location.state]);

  const handleAddToCart = (product: Product, qty: number, price: number) => {
    // Cart handling can be done here or through a context/state management
    console.log("Added to cart:", { product, qty, price });
  };

  const handleViewProduct = (product: Product) => {
    navigate(`/product/${product.product_id}`, { state: { product } });
  };

  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
        <div style={{ fontSize: 15 }}>Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>❌</div>
        <div style={{ fontSize: 15, marginBottom: 12 }}>{error || "Product not found"}</div>
        <button
          style={{ background: "var(--accent)", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pdp">
      <ProductDetailNavbar
        onBack={() => navigate("/home")}
        productName={product.product_name}
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