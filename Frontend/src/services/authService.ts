const API_BASE_URL = "https://besoya-store-api.onrender.com"; // Adjust if deployed

export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  address_line?: string;
  area?: string;
  landmark?: string;
  city?: string;
  postal_code?: string;
  address_type?: string;
  delivery_pref?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
  };
  expires_in?: number; // Token expiration time in seconds
}

export interface TokenData {
  token: string;
  expiresAt: number; // Timestamp when token expires
  user: AuthResponse["user"];
}

export class AuthService {
  private static readonly TOKEN_KEY = "authToken";
  private static readonly TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes buffer

  static async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const authData = await response.json();
      this.saveAuthData(authData);
      return authData;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  static async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || "Login failed");
      }

      const authData = await response.json();
      this.saveAuthData(authData);
      return authData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  static async checkUserExists(email: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/check?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to verify user");
      }

      const data = await response.json();
      return data.exists === true;
    } catch (error) {
      console.error("Check user exists error:", error);
      throw error;
    }
  }

  // Save authentication data with expiration
  static saveAuthData(authData: AuthResponse) {
    const expiresIn = authData.expires_in || 4 * 60 * 60; // Default 4 hours
    const expiresAt = Date.now() + expiresIn * 1000;

    const tokenData: TokenData = {
      token: authData.token,
      expiresAt,
      user: authData.user,
    };

    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));
  }

  // Get valid token (checks expiration)
  static getToken(): string | null {
    const tokenDataStr = localStorage.getItem(this.TOKEN_KEY);
    if (!tokenDataStr) return null;

    try {
      const tokenData: TokenData = JSON.parse(tokenDataStr);

      // Check if token is expired (with buffer time)
      if (Date.now() >= tokenData.expiresAt - this.TOKEN_EXPIRY_BUFFER) {
        this.removeToken(); // Clean up expired token
        return null;
      }

      return tokenData.token;
    } catch (error) {
      console.error("Error parsing token data:", error);
      this.removeToken();
      return null;
    }
  }

  // Get current user data
  static getCurrentUser(): AuthResponse["user"] | null {
    const tokenDataStr = localStorage.getItem(this.TOKEN_KEY);
    if (!tokenDataStr) return null;

    try {
      const tokenData: TokenData = JSON.parse(tokenDataStr);
      return tokenData.user;
    } catch (error) {
      return null;
    }
  }

  // Check if user is authenticated (token exists and not expired)
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Check if token is close to expiring
  static isTokenExpiringSoon(): boolean {
    const tokenDataStr = localStorage.getItem(this.TOKEN_KEY);
    if (!tokenDataStr) return false;

    try {
      const tokenData: TokenData = JSON.parse(tokenDataStr);
      const timeUntilExpiry = tokenData.expiresAt - Date.now();
      return timeUntilExpiry < 10 * 60 * 1000; // Less than 10 minutes
    } catch (error) {
      return false;
    }
  }

  // Get auth headers for API calls
  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Remove all authentication data
  static removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Logout user
  static logout() {
    this.removeToken();
  }

  // Logout user via API
  static async logoutAPI(): Promise<void> {
    try {
      const token = this.getToken();
      if (!token) {
        this.removeToken();
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear token regardless of API response
      this.removeToken();

      if (!response.ok) {
        console.error("Logout API error:", response.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear token on error
      this.removeToken();
    }
  }

  // Check if we need to refresh token (for future implementation)
  static async refreshToken(): Promise<boolean> {
    // This would be implemented if your API supports token refresh
    // For now, we'll just return false to force re-login
    console.log("Token refresh not implemented - user needs to login again");
    return false;
  }
}
