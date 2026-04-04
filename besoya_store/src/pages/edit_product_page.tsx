import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ProductService,
  type Product,
  type UpdateProductData,
} from "../services/productService";
import { SellerService } from "../services/sellerService";
import "./add_product_page.css";

function isValidHttpUrl(value: string): boolean {
  const t = value.trim();
  if (!t) return true;
  try {
    const u = new URL(t);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function variationsToFormText(raw: unknown): string {
  if (raw == null) return "";
  if (typeof raw === "string") {
    try {
      const p = JSON.parse(raw);
      return JSON.stringify(p, null, 2);
    } catch {
      return raw;
    }
  }
  if (Array.isArray(raw)) return JSON.stringify(raw, null, 2);
  return JSON.stringify(raw, null, 2);
}

function applyProductToForm(p: Product, setters: {
  setProductName: (v: string) => void;
  setProductImageUrl: (v: string) => void;
  setCategory: (v: string) => void;
  setPrice: (v: string) => void;
  setInStock: (v: string) => void;
  setDescription: (v: string) => void;
  setVariationsJson: (v: string) => void;
}) {
  setters.setProductName(p.product_name ?? "");
  setters.setProductImageUrl(p.product_image ?? "");
  setters.setCategory(p.category ?? "");
  setters.setPrice(String(p.price ?? ""));
  setters.setInStock(String(p.in_stock ?? ""));
  setters.setDescription(p.description ?? "");
  setters.setVariationsJson(variationsToFormText(p.variations));
}

const EditProductPage = () => {
  const navigate = useNavigate();
  const { productId: productIdParam } = useParams<{ productId: string }>();
  const productId = useMemo(() => {
    const n = Number(productIdParam);
    return Number.isInteger(n) && n > 0 ? n : null;
  }, [productIdParam]);

  const sellerFromSession = useMemo(
    () => SellerService.getSellerSessionSeller(),
    [],
  );
  const sellerId = sellerFromSession?.seller_id ?? null;

  const [productName, setProductName] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [description, setDescription] = useState("");
  const [variationsJson, setVariationsJson] = useState("");

  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [imageUrlError, setImageUrlError] = useState<string | null>(null);
  const [variationsError, setVariationsError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sellerId == null) {
      navigate("/seller/login", { replace: true });
    }
  }, [sellerId, navigate]);

  useEffect(
    () => () => {
      if (redirectTimerRef.current != null) {
        clearTimeout(redirectTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (sellerId == null || productId == null) {
      setLoadingProduct(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoadingProduct(true);
      setLoadError(null);
      try {
        // Use seller-scoped list so edit works even when deployed API has no GET /api/products/:id yet.
        const rows = await ProductService.getProductsBySellerID(sellerId);
        if (cancelled) return;
        const p = rows.find((row) => row.product_id === productId);
        if (!p) {
          setLoadError(
            "Product not found in your catalog. It may have been deleted or the link is invalid.",
          );
          return;
        }
        applyProductToForm(p, {
          setProductName,
          setProductImageUrl,
          setCategory,
          setPrice,
          setInStock,
          setDescription,
          setVariationsJson,
        });
      } catch (e) {
        if (!cancelled) {
          setLoadError(
            e instanceof Error ? e.message : "Could not load product.",
          );
        }
      } finally {
        if (!cancelled) setLoadingProduct(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [productId, sellerId]);

  const validateImageUrlField = (): boolean => {
    if (!productImageUrl.trim()) {
      setImageUrlError(null);
      return true;
    }
    if (!isValidHttpUrl(productImageUrl)) {
      setImageUrlError("Enter a valid http(s) URL for the image.");
      return false;
    }
    setImageUrlError(null);
    return true;
  };

  const parseVariations = (): unknown[] | null => {
    const raw = variationsJson.trim();
    if (!raw) {
      setVariationsError(null);
      return [];
    }
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) {
        setVariationsError(
          'Variations must be a JSON array, e.g. [{"name":"Size M","price":499}].',
        );
        return null;
      }
      setVariationsError(null);
      return parsed;
    } catch {
      setVariationsError("Invalid JSON. Use a valid array.");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (sellerId == null || productId == null) return;

    if (!validateImageUrlField()) return;

    const priceNum = Number(price);
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      setSubmitError("Price must be a valid non-negative number.");
      return;
    }

    const stockNum = Number(inStock);
    if (!Number.isInteger(stockNum) || stockNum < 0) {
      setSubmitError("Stock must be a whole number ≥ 0.");
      return;
    }

    const vars = parseVariations();
    if (vars === null) return;

    const payload: UpdateProductData = {
      seller_id: sellerId,
      product_name: productName.trim(),
      price: priceNum,
      in_stock: stockNum,
      ...(productImageUrl.trim()
        ? { product_image: productImageUrl.trim() }
        : { product_image: "" }),
      ...(category.trim() ? { category: category.trim() } : { category: "" }),
      ...(description.trim()
        ? { description: description.trim() }
        : { description: "" }),
      variations: vars,
    };

    setSubmitting(true);
    try {
      await ProductService.updateProduct(productId, payload);

      setSuccess(true);
      if (redirectTimerRef.current != null) {
        clearTimeout(redirectTimerRef.current);
      }
      redirectTimerRef.current = setTimeout(() => {
        redirectTimerRef.current = null;
        navigate("/dashboard", {
          replace: true,
          state: { sellerId },
        });
      }, 1800);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not update product.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (sellerId == null) {
    return null;
  }

  if (productId == null) {
    return (
      <div className="add-product-page">
        <div className="add-product-card">
          <h1>Edit product</h1>
          <p className="add-product-error" role="alert">
            Invalid product link.
          </p>
          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: "1rem", display: "inline-block" }}
            onClick={() => navigate("/dashboard", { state: { sellerId } })}
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loadingProduct) {
    return (
      <div className="add-product-page">
        <div className="add-product-card">
          <h1>Edit product</h1>
          <p className="sub">Loading product…</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="add-product-page">
        <div className="add-product-card">
          <h1>Edit product</h1>
          <p className="add-product-error" role="alert">
            {loadError}
          </p>
          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: "1rem", display: "inline-block" }}
            onClick={() => navigate("/dashboard", { state: { sellerId } })}
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h1>Edit product</h1>
        <p className="sub">
          Update your listing. Product ID: {productId}. Image must be a direct
          URL (https://…).
        </p>

        {success ? (
          <div className="add-product-success" role="status">
            Product updated successfully. Returning to your dashboard…
          </div>
        ) : null}

        {submitError ? (
          <div className="add-product-error" role="alert">
            {submitError}
          </div>
        ) : null}

        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="ep-name">Product name</label>
            <input
              id="ep-name"
              name="product_name"
              type="text"
              required
              maxLength={150}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              disabled={success || submitting}
            />
          </div>

          <div className="field">
            <label htmlFor="ep-image">Product image URL</label>
            <input
              id="ep-image"
              name="product_image"
              type="url"
              inputMode="url"
              placeholder="https://example.com/image.jpg"
              value={productImageUrl}
              onChange={(e) => {
                setProductImageUrl(e.target.value);
                if (imageUrlError) setImageUrlError(null);
              }}
              onBlur={validateImageUrlField}
              className={imageUrlError ? "input-error" : ""}
              disabled={success || submitting}
            />
            <p className="hint">Optional. Only full http(s) links are accepted.</p>
            {imageUrlError ? (
              <p className="hint" style={{ color: "#e11d48" }}>
                {imageUrlError}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="ep-category">Category</label>
            <input
              id="ep-category"
              name="category"
              type="text"
              maxLength={80}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={success || submitting}
            />
            <p className="hint">Optional (max 80 characters).</p>
          </div>

          <div className="field">
            <label htmlFor="ep-price">Price</label>
            <input
              id="ep-price"
              name="price"
              type="number"
              required
              min={0}
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={success || submitting}
            />
          </div>

          <div className="field">
            <label htmlFor="ep-stock">In stock</label>
            <input
              id="ep-stock"
              name="in_stock"
              type="number"
              required
              min={0}
              step={1}
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
              disabled={success || submitting}
            />
          </div>

          <div className="field">
            <label htmlFor="ep-desc">Description</label>
            <textarea
              id="ep-desc"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={success || submitting}
            />
            <p className="hint">Optional.</p>
          </div>

          <div className="field">
            <label htmlFor="ep-vars">Variations (JSON array)</label>
            <textarea
              id="ep-vars"
              name="variations"
              value={variationsJson}
              onChange={(e) => {
                setVariationsJson(e.target.value);
                if (variationsError) setVariationsError(null);
              }}
              className={variationsError ? "input-error" : ""}
              disabled={success || submitting}
              placeholder='[{"name":"500g","price":199}]'
            />
            <p className="hint">Optional. Must be valid JSON array.</p>
            {variationsError ? (
              <p className="hint" style={{ color: "#e11d48" }}>
                {variationsError}
              </p>
            ) : null}
          </div>

          <div className="actions">
            <button type="submit" disabled={success || submitting}>
              {submitting ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              disabled={submitting}
              onClick={() =>
                navigate("/dashboard", { state: { sellerId } })
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
