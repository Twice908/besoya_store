import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  UserService,
  type User,
  type UpdateUserData,
} from "../services/userService";
import { SESSION_EXPIRED_ERROR } from "../services/productService";
import "./user_profile_page.css";

/** Same UX as expired session when auth context has no user. */
const AUTH_REQUIRED = "AUTH_REQUIRED";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { user: authUser, isLoading: authLoading, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserData>({});
  const [saving, setSaving] = useState(false);

  const fetchUserDetails = useCallback(async () => {
    if (!authUser) return;
    setFetchError(null);
    setLoading(true);
    try {
      const userData = await UserService.getUser(authUser.user_id);
      setUser(userData);
      setFormData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        mobile: userData.mobile,
        address_line: userData.address_line || "",
        area: userData.area || "",
        landmark: userData.landmark || "",
        city: userData.city || "",
        postal_code: userData.postal_code || "",
        address_type: userData.address_type || "",
        delivery_pref: userData.delivery_pref || "",
      });
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      const msg =
        error instanceof Error ? error.message : "Failed to load profile";
      setFetchError(
        msg === SESSION_EXPIRED_ERROR ? SESSION_EXPIRED_ERROR : msg,
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  useEffect(() => {
    if (!authLoading && !authUser) {
      setLoading(false);
      setFetchError(AUTH_REQUIRED);
    }
  }, [authLoading, authUser]);

  useEffect(() => {
    if (authUser) {
      fetchUserDetails();
    }
  }, [authUser, fetchUserDetails]);

  const handleSessionExpiredSignIn = () => {
    logout();
    navigate("/login", {
      replace: true,
      state: { from: { pathname: "/profile" } },
    });
  };

  const isSessionExpired =
    fetchError === SESSION_EXPIRED_ERROR || fetchError === AUTH_REQUIRED;

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        mobile: user.mobile,
        address_line: user.address_line || "",
        area: user.area || "",
        landmark: user.landmark || "",
        city: user.city || "",
        postal_code: user.postal_code || "",
        address_type: user.address_type || "",
        delivery_pref: user.delivery_pref || "",
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const updatedUser = await UserService.updateUser(user.user_id, formData);
      setUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      const msg =
        error instanceof Error ? error.message : "Failed to update profile";
      if (msg === SESSION_EXPIRED_ERROR) {
        setFetchError(SESSION_EXPIRED_ERROR);
        setUser(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatAddress = (user: User) => {
    const parts = [
      user.address_line,
      user.area,
      user.landmark,
      user.city,
      user.postal_code,
      user.address_type,
    ].filter(Boolean);
    return parts.join(", ") || "Not provided";
  };

  if (loading && !fetchError) {
    return (
      <div className="user-profile-page">
        <div className="profile-header">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '18px', color: '#718096' }}>Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  if (isSessionExpired) {
    return (
      <div className="user-profile-page">
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--text)",
            maxWidth: 420,
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
            Session expired
          </div>
          <div
            style={{
              fontSize: 15,
              color: "var(--muted)",
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            Please sign in again to continue shopping with a fresh session.
          </div>
          <button
            type="button"
            style={{
              background: "var(--accent)",
              color: "white",
              border: "none",
              padding: "10px 22px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
            }}
            onClick={handleSessionExpiredSignIn}
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="user-profile-page">
        <div className="profile-header">
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "18px", color: "#e53e3e", marginBottom: 16 }}>
              {fetchError}
            </div>
            <button
              type="button"
              className="edit-btn"
              onClick={() => void fetchUserDetails()}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile-page">
        <div className="profile-header">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '18px', color: '#e53e3e' }}>User not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <div className="profile-header">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>User Profile</h1>
        <p className="profile-subtitle">Manage your personal information and preferences</p>
      </div>
      
      {!editing ? (
        <div className="profile-details">
          <div className="detail-item">
            <label>Email</label>
            <span>{user.email}</span>
          </div>
          <div className="detail-item">
            <label>Mobile Number</label>
            <span>{user.mobile}</span>
          </div>
          <div className="detail-item">
            <label>Address</label>
            <span>{formatAddress(user)}</span>
          </div>
          <div className="detail-item">
            <label>Delivery Preference</label>
            <span>{user.delivery_pref || "Not specified"}</span>
          </div>
          <button onClick={handleEdit} className="edit-btn">
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="profile-edit">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              placeholder="Enter your email address"
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile || ""}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
            />
          </div>
          <div className="form-group">
            <label>Address Line</label>
            <input
              type="text"
              name="address_line"
              value={formData.address_line || ""}
              onChange={handleInputChange}
              placeholder="Enter your street address"
            />
          </div>
          <div className="form-group">
            <label>Area</label>
            <input
              type="text"
              name="area"
              value={formData.area || ""}
              onChange={handleInputChange}
              placeholder="Enter your area/neighborhood"
            />
          </div>
          <div className="form-group">
            <label>Landmark</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark || ""}
              onChange={handleInputChange}
              placeholder="Enter a nearby landmark"
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={handleInputChange}
              placeholder="Enter your city"
            />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code || ""}
              onChange={handleInputChange}
              placeholder="Enter your postal code"
            />
          </div>
          <div className="form-actions">
            <button onClick={handleSave} disabled={saving} className="save-btn">
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
