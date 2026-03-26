import { useState, useMemo } from "react";
import { PRODUCTS } from "../../data/mock-data";
import { stockStatus } from "../../utils/seller-dashboard-helpers";

export const ProductsTable = () => {
  const [searchProd, setSearchProd] = useState<string>("");
  const [filterProdCat, setFilterProdCat] = useState<string>("all");

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    if (filterProdCat !== "all") {
      result = result.filter((p: any) => p.category === filterProdCat);
    }

    if (searchProd.trim()) {
      const q = searchProd.toLowerCase();
      result = result.filter(
        (p: any) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
      );
    }

    return result;
  }, [searchProd, filterProdCat]);

  const categories = [...new Set(PRODUCTS.map((p: any) => p.category))];

  return (
    <>
      {/* Section Header */}
      <div className="section-head">
        <div className="section-head__left">
          <h2>Products</h2>
          <p>{filteredProducts.length} total products</p>
        </div>
        <button className="btn-add-prod">+ Add Product</button>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-box">
          <span className="search-box__icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchProd}
            onChange={(e) => setSearchProd(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filterProdCat}
          onChange={(e) => setFilterProdCat(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">📦</div>
            <div className="empty-state__text">No products found</div>
          </div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price Range</th>
                <th>Variations</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod: any) => {
                const { color, dotClass } = stockStatus(prod.stock);
                return (
                  <tr key={prod.id}>
                    <td>
                      <div className="prod-cell">
                        <div className="prod-img">📦</div>
                        <div>
                          <div className="prod-cell__name">{prod.name}</div>
                          <div className="prod-cell__id">{prod.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{prod.category}</td>
                    <td>
                      ₹{prod.priceRange[0].toLocaleString()} - ₹
                      {prod.priceRange[1].toLocaleString()}
                    </td>
                    <td>
                      <div className="var-list">
                        {prod.variations.slice(0, 2).map((v: any, i: number) => (
                          <div key={i} className="var-chip">
                            <span className="var-chip__name">{v.name}</span>
                            <span className="var-chip__price">₹{v.price}</span>
                          </div>
                        ))}
                        {prod.variations.length > 2 && (
                          <div style={{ fontSize: "11px", color: "#aaa" }}>
                            +{prod.variations.length - 2} more
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="stock-cell">
                        <div className={`stock-dot ${dotClass}`} />
                        <span className={color}>
                          {prod.stock} {prod.stock === 0 ? "Out" : "Available"}
                        </span>
                      </div>
                    </td>
                    <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn--ghost" style={{ padding: "5px 12px", fontSize: 12 }}>Edit</button>
                      <button className="btn btn--ghost" style={{ padding: "5px 12px", fontSize: 12, color: "#cc3333", borderColor: "#f0c0c0" }}>Delete</button>
                    </div>
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {filteredProducts.length > 0 && (
          <div className="pagination">
            <span>{filteredProducts.length} items</span>
            <div className="pagination__pages">
              <button className="page-btn page-btn--active">1</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
