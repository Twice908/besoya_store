import { AuthService } from './authService';

const API_BASE_URL = 'https://besoya-store-api.onrender.com';

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

export interface UpdateSellerData {
  seller_name?: string;
  email?: string;
  mobile?: string;
  password_hash?: string;
}

export class SellerService {
  static async signup(data: SellerSignupData): Promise<SellerAuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sellers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Seller signup failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Seller signup error:', error);
      throw error;
    }
  }

  static async login(data: SellerLoginData): Promise<SellerAuthResponse> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      const existingToken = AuthService.getToken();
      if (existingToken) {
        headers.Authorization = `Bearer ${existingToken}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/sellers/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Seller login failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Seller login error:', error);
      throw error;
    }
  }

  static async getAllSellers(): Promise<Seller[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sellers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sellers');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch sellers error:', error);
      throw error;
    }
  }

  static async updateSeller(
    sellerID: number,
    data: UpdateSellerData,
  ): Promise<Seller> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sellers/${sellerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update seller');
      }

      return await response.json();
    } catch (error) {
      console.error('Update seller error:', error);
      throw error;
    }
  }

  static async deleteSeller(sellerID: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sellers/${sellerID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete seller');
      }
    } catch (error) {
      console.error('Delete seller error:', error);
      throw error;
    }
  }
}
