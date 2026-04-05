import { AuthService } from "./authService";

const API_BASE_URL = "https://besoya-store-api.onrender.com";

export interface Seller {
  seller_id: number;
  seller_name: string;
  email: string;
  mobile: string;
  created_at: string;
}

export interface SellerSignupData {
  seller_name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface SellerLoginData {
  email: string;
  password: string;
}

export interface SellerAuthResponse {
  token: string;
  seller: {
    seller_id: number;
    seller_name: string;
    email: string;
  };
}

export interface SellerSessionData {
  token: string;
  expiresAt: number;
  seller: SellerAuthResponse["seller"];
}

export interface UpdateSellerData {
  seller_name?: string;
  email?: string;
  mobile?: string;
  password_hash?: string;
}

export class SellerService {
  private static readonly SELLER_AUTH_KEY = "sellerAuth";
  /** Matches backend JWT expiry (1h) */
  private static readonly SELLER_SESSION_MS = 60 * 60 * 1000;

  static saveSellerAuth(auth: SellerAuthResponse): void {
    const data: SellerSessionData = {
      token: auth.token,
      expiresAt: Date.now() + this.SELLER_SESSION_MS,
      seller: auth.seller,
    };
    localStorage.setItem(this.SELLER_AUTH_KEY, JSON.stringify(data));
  }

  static getSellerToken(): string | null {
    const raw = localStorage.getItem(this.SELLER_AUTH_KEY);
    if (!raw) return null;
    try {
      const data: SellerSessionData = JSON.parse(raw);
      if (Date.now() >= data.expiresAt) {
        this.clearSellerAuth();
        return null;
      }
      return data.token;
    } catch {
      this.clearSellerAuth();
      return null;
    }
  }

  static getSellerSessionSeller(): SellerAuthResponse["seller"] | null {
    const raw = localStorage.getItem(this.SELLER_AUTH_KEY);
    if (!raw) return null;
    try {
      const data: SellerSessionData = JSON.parse(raw);
      if (Date.now() >= data.expiresAt) {
        this.clearSellerAuth();
        return null;
      }
      return data.seller;
    } catch {
      return null;
    }
  }

  static isSellerLoggedIn(): boolean {
    return this.getSellerToken() !== null;
  }

  static clearSellerAuth(): void {
    localStorage.removeItem(this.SELLER_AUTH_KEY);
  }

  /** Logout seller via API */
  static async logoutAPI(): Promise<void> {
    try {
      const token = this.getSellerToken();
      if (!token) {
        this.clearSellerAuth();
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/sellers/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear token regardless of API response
      this.clearSellerAuth();

      if (!response.ok) {
        console.error("Seller logout API error:", response.status);
      }
    } catch (error) {
      console.error("Seller logout error:", error);
      // Still clear token on error
      this.clearSellerAuth();
    }
  }

  /** Prefer seller JWT for seller API calls */
  static getSellerAuthHeaders(): Record<string, string> {
    const token = this.getSellerToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private static requestAuthHeaders(): Record<string, string> {
    const sellerHeaders = this.getSellerAuthHeaders();
    if (Object.keys(sellerHeaders).length > 0) return sellerHeaders;
    return AuthService.getAuthHeaders();
  }

  static async signup(data: SellerSignupData): Promise<SellerAuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sellers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Seller signup failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Seller signup error:", error);
      throw error;
    }
  }

  static async login(data: SellerLoginData): Promise<SellerAuthResponse> {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const existingToken = AuthService.getToken();
      if (existingToken) {
        headers.Authorization = `Bearer ${existingToken}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/sellers/login`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Seller login failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Seller login error:", error);
      throw error;
    }
  }

  static async checkSellerExists(email: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/sellers/check?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to verify seller");
      }

      const data = await response.json();
      return data.exists === true;
    } catch (error) {
      console.error("Check seller exists error:", error);
      throw error;
    }
  }

  static async getAllSellers(): Promise<Seller[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sellers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.requestAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sellers");
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch sellers error:", error);
      throw error;
    }
  }

  static async getSeller(sellerID: number): Promise<Seller> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sellers/${sellerID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.requestAuthHeaders(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          (errorData as { error?: string }).error || "Failed to fetch seller",
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch seller error:", error);
      throw error;
    }
  }

  static async updateSeller(
    sellerID: number,
    data: UpdateSellerData,
  ): Promise<Seller> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sellers/${sellerID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...this.requestAuthHeaders(),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update seller");
      }

      return await response.json();
    } catch (error) {
      console.error("Update seller error:", error);
      throw error;
    }
  }

  static async deleteSeller(sellerID: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sellers/${sellerID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...this.requestAuthHeaders(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete seller");
      }
    } catch (error) {
      console.error("Delete seller error:", error);
      throw error;
    }
  }
}
