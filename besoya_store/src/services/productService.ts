import { AuthService } from './authService';

const API_BASE_URL = 'https://besoya-store-api.onrender.com';

export interface Product {
  product_id: number;
  seller_id: number;
  product_name: string;
  description?: string;
  product_image?: string;
  category?: string;
  price: number;
  in_stock: number;
  variations?: any[];
  created_at: string;
  updated_at: string;
}

export interface CreateProductData {
  seller_id: number;
  product_name: string;
  product_image?: string;
  category?: string;
  price: number;
  in_stock: number;
  description?: string;
  variations?: any[];
}

export interface UpdateProductData {
  seller_id?: number;
  product_name?: string;
  product_image?: string;
  category?: string;
  price?: number;
  in_stock?: number;
  description?: string;
  variations?: any[];
}

export class ProductService {
  static async createProduct(data: CreateProductData): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      return await response.json();
    } catch (error) {
      console.error('Create product error:', error);
      throw error;
    }
  }

  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch products error:', error);
      throw error;
    }
  }

  static async getProduct(productID: number): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch product error:', error);
      throw error;
    }
  }

  static async getProductsBySellerID(sellerID: number): Promise<Product[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products/seller/${sellerID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...AuthService.getAuthHeaders(),
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch seller products');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch seller products error:', error);
      throw error;
    }
  }

  static async updateProduct(
    productID: number,
    data: UpdateProductData,
  ): Promise<Product> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products/${productID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...AuthService.getAuthHeaders(),
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product');
      }

      return await response.json();
    } catch (error) {
      console.error('Update product error:', error);
      throw error;
    }
  }

  static async deleteProduct(productID: number): Promise<void> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products/${productID}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...AuthService.getAuthHeaders(),
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Delete product error:', error);
      throw error;
    }
  }
}
