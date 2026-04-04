import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductService } from "../services/productService";
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

const AddProductPage = () => {
  const navigate = useNavigate();
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
        setVariationsError("Variations must be a JSON array, e.g. [{\"name\":\"Size M\",\"price\":499}].");
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
    if (sellerId == null) return;

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

    setSubmitting(true);
    try {
      await ProductService.createProduct({
        seller_id: sellerId,
        product_name: productName.trim(),
        price: priceNum,
        inStock: stockNum,
        ...(productImageUrl.trim()
          ? { product_image: productImageUrl.trim() }
          : {}),
        ...(category.trim() ? { category: category.trim() } : {}),
        ...(description.trim() ? { description: description.trim() } : {}),
        ...(vars.length > 0 ? { variations: vars } : {}),
      });

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
        err instanceof Error ? err.message : "Could not add product.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (sellerId == null) {
    return null;
  }

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h1>Add product</h1>
        <p className="sub">
          Required: product name, price, and stock. Image must be a direct URL
          (https://…).
        </p>

        {success ? (
          <div className="add-product-success" role="status">
            Product added successfully. Returning to your dashboard…
          </div>
        ) : null}

        {submitError ? (
          <div className="add-product-error" role="alert">
            {submitError}
          </div>
        ) : null}

        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="ap-name">Product name</label>
            <input
              id="ap-name"
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
            <label htmlFor="ap-image">Product image URL</label>
            <input
              id="ap-image"
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
            <label htmlFor="ap-category">Category</label>
            <input
              id="ap-category"
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
            <label htmlFor="ap-price">Price</label>
            <input
              id="ap-price"
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
            <label htmlFor="ap-stock">In stock</label>
            <input
              id="ap-stock"
              name="inStock"
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
            <label htmlFor="ap-desc">Description</label>
            <textarea
              id="ap-desc"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={success || submitting}
            />
            <p className="hint">Optional.</p>
          </div>

          <div className="field">
            <label htmlFor="ap-vars">Variations (JSON array)</label>
            <textarea
              id="ap-vars"
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
              {submitting ? "Submitting…" : "Submit product"}
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

export default AddProductPage;
