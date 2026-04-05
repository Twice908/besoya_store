import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Seller } from "../services/sellerService";
import { SellerService } from "../services/sellerService";

const SellerProfilePage = () => {
  const navigate = useNavigate();
  const { sellerId } = useParams<{ sellerId: string }>();

  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    seller_name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const fetchSeller = async () => {
      if (!sellerId) {
        setError("Seller ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await SellerService.getSeller(parseInt(sellerId));
        setSeller(data);
        setFormData({
          seller_name: data.seller_name,
          email: data.email,
          mobile: data.mobile,
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch seller");
        setSeller(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [sellerId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSeller = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!seller) return;

    try {
      setUpdating(true);
      setError(null);

      const updated = await SellerService.updateSeller(seller.seller_id, {
        seller_name: formData.seller_name,
        email: formData.email,
        mobile: formData.mobile,
      });

      setSeller(updated);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update seller");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    if (seller) {
      setFormData({
        seller_name: seller.seller_name,
        email: seller.email,
        mobile: seller.mobile,
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "16px",
          color: "var(--muted)",
        }}
      >
        Loading seller profile...
      </div>
    );
  }

  if (error && !seller) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: "16px",
          padding: "16px",
        }}
      >
        <p style={{ color: "var(--danger)" }}>{error}</p>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "16px",
        background: "var(--bg)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          paddingBottom: "16px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            color: "var(--text)",
          }}
        >
          ← Back
        </button>
        <h1
          style={{
            fontSize: "18px",
            fontWeight: "600",
            margin: 0,
            textAlign: "center",
            flex: 1,
          }}
        >
          {isEditing ? "Edit Profile" : "Seller Profile"}
        </h1>
        <div style={{ width: "24px" }} />
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            background: "rgba(204, 51, 51, 0.1)",
            color: "var(--danger)",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {/* View Mode */}
      {!isEditing && seller && (
        <div
          style={{
            background: "var(--surface)",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          {/* Seller ID */}
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Seller ID
            </label>
            <p
              style={{
                fontSize: "16px",
                margin: 0,
                color: "var(--text)",
                fontWeight: "500",
              }}
            >
              {seller.seller_id}
            </p>
          </div>

          {/* Seller Name */}
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Seller Name
            </label>
            <p
              style={{
                fontSize: "16px",
                margin: 0,
                color: "var(--text)",
                fontWeight: "500",
              }}
            >
              {seller.seller_name}
            </p>
          </div>

          {/* Email */}
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Email
            </label>
            <p
              style={{
                fontSize: "16px",
                margin: 0,
                color: "var(--text)",
                wordBreak: "break-all",
              }}
            >
              {seller.email}
            </p>
          </div>

          {/* Mobile */}
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Mobile
            </label>
            <p
              style={{
                fontSize: "16px",
                margin: 0,
                color: "var(--text)",
              }}
            >
              {seller.mobile}
            </p>
          </div>

          {/* Created Date */}
          <div
            style={{
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Member Since
            </label>
            <p
              style={{
                fontSize: "14px",
                margin: 0,
                color: "var(--muted)",
              }}
            >
              {new Date(seller.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            style={{
              width: "100%",
              padding: "12px",
              background: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Edit Mode */}
      {isEditing && seller && (
        <form
          onSubmit={handleUpdateSeller}
          style={{
            background: "var(--surface)",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          {/* Seller Name Field */}
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Seller Name
            </label>
            <input
              type="text"
              name="seller_name"
              value={formData.seller_name}
              onChange={handleInputChange}
              required
              maxLength={100}
              style={{
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Email Field */}
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              maxLength={100}
              style={{
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Mobile Field */}
          <div
            style={{
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Mobile
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              maxLength={15}
              style={{
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexDirection: "column",
            }}
          >
            <button
              type="submit"
              disabled={updating}
              style={{
                padding: "12px",
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: updating ? "not-allowed" : "pointer",
                opacity: updating ? 0.6 : 1,
              }}
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={updating}
              style={{
                padding: "12px",
                background: "var(--surface-secondary)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: updating ? "not-allowed" : "pointer",
                opacity: updating ? 0.6 : 1,
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SellerProfilePage;
