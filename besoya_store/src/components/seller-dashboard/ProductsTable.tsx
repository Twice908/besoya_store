import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ProductService,
  type Product,
} from "../../services/productService";
import { stockStatus } from "../../utils/seller-dashboard-helpers";

export interface ProductsTableProps {
  sellerId: number | null;
  onAddProduct?: () => void;
}

function parseVariations(raw: unknown): unknown[] {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function variationDisplayName(entry: unknown): string {
  if (entry != null && typeof entry === "object") {
    const o = entry as Record<string, unknown>;
    if (typeof o.name === "string") return o.name;
    if (typeof o.label === "string") return o.label;
  }
  return String(entry);
}

function variationPrice(entry: unknown): string | null {
  if (entry != null && typeof entry === "object") {
    const o = entry as Record<string, unknown>;
    if (o.price != null && o.price !== "") return String(o.price);
  }
  return null;
}

function formatPrice(value: number | string | undefined): string {
  const n = Number(value);
  if (Number.isNaN(n)) return "—";
  return `₹${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

const deleteModalBackdrop: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(15, 23, 42, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10000,
  padding: "1rem",
};

const deleteModalPanel: CSSProperties = {
  width: "100%",
  maxWidth: 400,
  padding: "1.5rem 1.5rem 1.25rem",
  background: "#fff",
  borderRadius: 12,
  boxShadow:
    "0 20px 40px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.06)",
};

export const ProductsTable = ({ sellerId, onAddProduct }: ProductsTableProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchProd, setSearchProd] = useState("");
  const [filterProdCat, setFilterProdCat] = useState("all");
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    if (sellerId == null) return;
    setLoading(true);
    setFetchError(null);
    try {
      const rows = await ProductService.getProductsBySellerID(sellerId);
      setProducts(rows);
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [sellerId]);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (filterProdCat !== "all") {
      result = result.filter((p) => (p.category ?? "") === filterProdCat);
    }
    if (searchProd.trim()) {
      const q = searchProd.toLowerCase();
      result = result.filter(
        (p) =>
          p.product_name.toLowerCase().includes(q) ||
          String(p.product_id).includes(q),
      );
    }
    return result;
  }, [products, searchProd, filterProdCat]);

  const confirmDeleteProduct = useCallback(async () => {
    if (pendingDelete == null) return;
    setDeleteError(null);
    setDeleteSubmitting(true);
    try {
      await ProductService.deleteProduct(pendingDelete.product_id);
      setPendingDelete(null);
      await loadProducts();
    } catch (e) {
      setDeleteError(
        e instanceof Error ? e.message : "Could not delete product.",
      );
    } finally {
      setDeleteSubmitting(false);
    }
  }, [pendingDelete, loadProducts]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return [...set];
  }, [products]);

  if (sellerId == null) {
    return (
      <div className="empty-state">
        <div className="empty-state__text">Seller ID is missing. Sign in again.</div>
      </div>
    );
  }

  return (
    <>
      {pendingDelete ? (
        <div
          style={deleteModalBackdrop}
          role="presentation"
          onClick={() => {
            if (!deleteSubmitting) {
              setPendingDelete(null);
              setDeleteError(null);
            }
          }}
        >
          <div
            style={deleteModalPanel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-product-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="delete-product-title"
              style={{
                margin: "0 0 0.75rem",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Delete product?
            </h3>
            <p style={{ margin: "0 0 1rem", fontSize: "0.9rem", color: "#475569", lineHeight: 1.5 }}>
              Do you want to delete this product?
            </p>
            <p
              style={{
                margin: "0 0 1.25rem",
                padding: "0.5rem 0.65rem",
                fontSize: "0.85rem",
                background: "#f8fafc",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                color: "#334155",
              }}
            >
              <strong>{pendingDelete.product_name}</strong>
              <span style={{ color: "#94a3b8" }}>
                {" "}
                (ID {pendingDelete.product_id})
              </span>
            </p>
            {deleteError ? (
              <p
                role="alert"
                style={{
                  margin: "0 0 1rem",
                  fontSize: "0.85rem",
                  color: "#b91c1c",
                }}
              >
                {deleteError}
              </p>
            ) : null}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                type="button"
                disabled={deleteSubmitting}
                onClick={() => {
                  setPendingDelete(null);
                  setDeleteError(null);
                }}
                style={{
                  padding: "0.55rem 1rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#475569",
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  cursor: deleteSubmitting ? "not-allowed" : "pointer",
                }}
              >
                No
              </button>
              <button
                type="button"
                disabled={deleteSubmitting}
                onClick={() => void confirmDeleteProduct()}
                style={{
                  padding: "0.55rem 1rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#fff",
                  background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
                  border: "none",
                  borderRadius: 8,
                  cursor: deleteSubmitting ? "not-allowed" : "pointer",
                  boxShadow: "0 2px 8px rgba(220, 38, 38, 0.35)",
                }}
              >
                {deleteSubmitting ? "Deleting…" : "Yes"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="section-head">
        <div className="section-head__left">
          <h2>Products</h2>
          <p>
            {loading
              ? "Loading…"
              : `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <button
          type="button"
          className="btn-add-prod"
          onClick={() => onAddProduct?.()}
        >
          + Add Product
        </button>
      </div>

      {fetchError ? (
        <p role="alert">{fetchError}</p>
      ) : null}

      <div className="toolbar">
        <div className="search-box">
          <span className="search-box__icon">🔍</span>
          <input
            type="text"
            placeholder="Search by product_name or product_id…"
            value={searchProd}
            onChange={(e) => setSearchProd(e.target.value)}
            disabled={loading}
          />
        </div>
        <select
          className="filter-select"
          value={filterProdCat}
          onChange={(e) => setFilterProdCat(e.target.value)}
          disabled={loading}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        {!loading && filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">📦</div>
            <div className="empty-state__text">No products found</div>
          </div>
        ) : null}

        {filteredProducts.length > 0 ? (
          <table className="tbl">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Variations</th>
                <th>Stock (in_stock)</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => {
                const vars = parseVariations(prod.variations);
                const { color, dotClass } = stockStatus(prod.in_stock);
                return (
                  <tr key={prod.product_id}>
                    <td>
                      <div className="prod-cell">
                        {prod.product_image ? (
                          <img
                            className="prod-img"
                            src={prod.product_image}
                            alt=""
                            width={40}
                            height={40}
                            style={{ objectFit: "cover", borderRadius: 4 }}
                          />
                        ) : (
                          <div className="prod-img">📦</div>
                        )}
                        <div>
                          <div className="prod-cell__name">{prod.product_name}</div>
                          <div className="prod-cell__id">product_id: {prod.product_id}</div>
                          <div className="prod-cell__id">seller_id: {prod.seller_id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{prod.category ?? "—"}</td>
                    <td>{formatPrice(prod.price)}</td>
                    <td style={{ maxWidth: 200, fontSize: 12 }}>
                      {prod.description?.trim() ? prod.description : "—"}
                    </td>
                    <td>
                      <div className="var-list">
                        {vars.length === 0 ? (
                          <span style={{ color: "#aaa", fontSize: 12 }}>—</span>
                        ) : (
                          <>
                            {vars.slice(0, 2).map((v, i) => {
                              const vp = variationPrice(v);
                              return (
                                <div key={i} className="var-chip">
                                  <span className="var-chip__name">
                                    {variationDisplayName(v)}
                                  </span>
                                  {vp != null ? (
                                    <span className="var-chip__price">
                                      {formatPrice(vp)}
                                    </span>
                                  ) : null}
                                </div>
                              );
                            })}
                            {vars.length > 2 ? (
                              <div style={{ fontSize: 11, color: "#aaa" }}>
                                +{vars.length - 2} more
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="stock-cell">
                        <div className={`stock-dot ${dotClass}`} />
                        <span className={color}>
                          {prod.in_stock}{" "}
                          {prod.in_stock === 0 ? "Out" : "units"}
                        </span>
                      </div>
                    </td>
                    <td style={{ fontSize: 12 }}>
                      {prod.updated_at
                        ? new Date(prod.updated_at).toLocaleString()
                        : "—"}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          type="button"
                          className="btn btn--ghost"
                          style={{ padding: "5px 12px", fontSize: 12 }}
                          disabled={loading || pendingDelete != null}
                          onClick={() =>
                            navigate(
                              `/dashboard/edit-product/${prod.product_id}`,
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn--ghost"
                          style={{
                            padding: "5px 12px",
                            fontSize: 12,
                            color: "#cc3333",
                            borderColor: "#f0c0c0",
                          }}
                          disabled={loading || pendingDelete != null}
                          onClick={() => {
                            setDeleteError(null);
                            setPendingDelete(prod);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}

        {filteredProducts.length > 0 && (
          <div className="pagination">
            <span>{filteredProducts.length} items</span>
            <div className="pagination__pages">
              <button type="button" className="page-btn page-btn--active">
                1
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
