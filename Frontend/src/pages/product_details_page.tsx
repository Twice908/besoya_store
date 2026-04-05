import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  ProductDetailNavbar,
  ProductGallery,
  ProductInfo,
  RelatedProducts,
} from "../components/product-detail";
import { CartSidebar, CartToast } from "../components/home";
import { ProductService } from "../services/productService";
import type { Product } from "../services/productService";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailCartItems, setDetailCartItems] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, name: "" });
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // First check if product was passed via location.state
        let productData = (location.state as { product: Product } | null)
          ?.product;

        if (!productData && id) {
          // Fetch product from API if not passed via state
          productData = await ProductService.getProduct(parseInt(id));
        }

        if (productData) {
          setProduct(productData);
        } else {
          setError("Product not found");
        }

        // Fetch all products for related products section
        const allProductsData = await ProductService.getAllProducts();
        setAllProducts(allProductsData);
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
    const item = { ...product, price };
    setDetailCartItems((current) => [...current, ...Array(qty).fill(item)]);
    setToast({ visible: true, name: product.product_name });
    setCartOpen(true);
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2800);
  };

  const handleViewProduct = (product: Product) => {
    navigate(`/product/${product.product_id}`, { state: { product } });
  };

  const handleUpdateQty = (productId: number, delta: -1 | 1) => {
    if (delta === -1) {
      const idx = detailCartItems.findIndex((p) => p.product_id === productId);
      if (idx !== -1)
        setDetailCartItems((c) => [...c.slice(0, idx), ...c.slice(idx + 1)]);
    } else {
      if (product && product.product_id === productId) {
        setDetailCartItems((c) => [...c, { ...product, price: product.price }]);
      }
    }
  };

  const handleRemove = (productId: number) => {
    setDetailCartItems((c) => c.filter((p) => p.product_id !== productId));
  };

  const handleClear = () => {
    setDetailCartItems([]);
    setCartOpen(false);
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
        <div style={{ fontSize: 15, marginBottom: 12 }}>
          {error || "Product not found"}
        </div>
        <button
          style={{
            background: "var(--accent)",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pdp">
      <ProductDetailNavbar onBack={() => navigate("/home")} />

      <div className="pdp-body">
        <ProductGallery product={product} />
        <ProductInfo product={product} onAddToCart={handleAddToCart} />
      </div>

      {/* <div className="pdp-tabs-section">
        <ProductTabs product={product} />
      </div> */}

      <RelatedProducts
        products={allProducts}
        currentProductId={product?.product_id}
        onViewProduct={handleViewProduct}
        onAddToCart={handleAddToCart}
      />

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={detailCartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onClear={handleClear}
      />

      <CartToast visible={toast.visible} name={toast.name} />
    </div>
  );
};

export default ProductDetailsPage;
