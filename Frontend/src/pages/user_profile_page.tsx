import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserService, type User, type UpdateUserData } from '../services/userService';

const UserProfilePage = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserData>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authUser) {
      fetchUserDetails();
    }
  }, [authUser]);

  const fetchUserDetails = async () => {
    if (!authUser) return;
    try {
      const userData = await UserService.getUser(authUser.user_id);
      setUser(userData);
      setFormData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        mobile: userData.mobile,
        address_line: userData.address_line || '',
        area: userData.area || '',
        landmark: userData.landmark || '',
        city: userData.city || '',
        postal_code: userData.postal_code || '',
        address_type: userData.address_type || '',
        delivery_pref: userData.delivery_pref || '',
      });
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    } finally {
      setLoading(false);
    }
  };

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
        address_line: user.address_line || '',
        area: user.area || '',
        landmark: user.landmark || '',
        city: user.city || '',
        postal_code: user.postal_code || '',
        address_type: user.address_type || '',
        delivery_pref: user.delivery_pref || '',
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
      console.error('Failed to update user:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    return parts.join(', ') || 'Not provided';
  };

  if (loading) {
    return <div className="user-profile-page">Loading...</div>;
  }

  if (!user) {
    return <div className="user-profile-page">User not found</div>;
  }

  return (
    <div className="user-profile-page">
      <h1>User Profile</h1>
      {!editing ? (
        <div className="profile-details">
          <div className="detail-item">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="detail-item">
            <label>Mobile Number:</label>
            <span>{user.mobile}</span>
          </div>
          <div className="detail-item">
            <label>Address:</label>
            <span>{formatAddress(user)}</span>
          </div>
          <div className="detail-item">
            <label>Delivery Preference:</label>
            <span>{user.delivery_pref || 'Not specified'}</span>
          </div>
          <button onClick={handleEdit} className="edit-btn">Edit</button>
        </div>
      ) : (
        <div className="profile-edit">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address Line:</label>
            <input
              type="text"
              name="address_line"
              value={formData.address_line || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Area:</label>
            <input
              type="text"
              name="area"
              value={formData.area || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Landmark:</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Postal Code:</label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address Type:</label>
            <select
              name="address_type"
              value={formData.address_type || ''}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Delivery Preference:</label>
            <select
              name="delivery_pref"
              value={formData.delivery_pref || ''}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="standard">Standard</option>
              <option value="express">Express</option>
              <option value="pickup">Pickup</option>
            </select>
          </div>
          <div className="form-actions">
            <button onClick={handleSave} disabled={saving} className="save-btn">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;