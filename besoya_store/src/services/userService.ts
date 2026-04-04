import { AuthService } from './authService';

const API_BASE_URL = 'https://besoya-store-api.onrender.com';

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  address_line?: string;
  area?: string;
  landmark?: string;
  city?: string;
  postal_code?: string;
  address_type?: string;
  delivery_pref?: string;
  created_at: string;
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile?: string;
  password_hash?: string;
  address_line?: string;
  area?: string;
  landmark?: string;
  city?: string;
  postal_code?: string;
  address_type?: string;
  delivery_pref?: string;
}

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch users error:', error);
      throw error;
    }
  }

  static async getUser(userId: number): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch user error:', error);
      throw error;
    }
  }

  static async updateUser(userID: number, data: UpdateUserData): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      return await response.json();
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  static async deleteUser(userID: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  }
}
