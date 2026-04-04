import { AuthService } from './authService';
import { SellerService } from './sellerService';

const API_BASE_URL = 'https://besoya-store-api.onrender.com';

/** Normalized product for the app (camelCase). API uses `in_stock`. */
export interface Product {
  product_id: number;
  seller_id: number;
  product_name: string;
  description?: string;
  product_image?: string;
  category?: string;
  price: number;
  inStock: number;
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
  inStock: number;
  description?: string;
  variations?: any[];
}

export interface UpdateProductData {
  seller_id?: number;
  product_name?: string;
  product_image?: string;
  category?: string;
  price?: number;
  inStock?: number;
  description?: string;
  variations?: any[];
}

export interface DeleteProductsBySellerResponse {
  message: string;
  deletedCount: number;
  deletedProducts: Product[];
}

type ApiProductRow = Record<string, unknown>;

export function normalizeProduct(row: ApiProductRow): Product {
  const inRaw = row.in_stock ?? row.inStock;
  return {
    product_id: Number(row.product_id),
    seller_id: Number(row.seller_id),
    product_name: String(row.product_name ?? ''),
    description: (row.description as string) ?? undefined,
    product_image: (row.product_image as string) ?? undefined,
    category: (row.category as string) ?? undefined,
    price: Number(row.price ?? 0),
    inStock: Number(inRaw ?? 0),
    variations: row.variations as any[] | undefined,
    created_at: String(row.created_at ?? ''),
    updated_at: String(row.updated_at ?? ''),
  };
}

function toCreateApiBody(data: CreateProductData): Record<string, unknown> {
  return {
    seller_id: data.seller_id,
    product_name: data.product_name,
    price: data.price,
    in_stock: data.inStock,
    ...(data.product_image !== undefined && data.product_image !== ''
      ? { product_image: data.product_image }
      : {}),
    ...(data.category !== undefined && data.category !== ''
      ? { category: data.category }
      : {}),
    ...(data.description !== undefined && data.description !== ''
      ? { description: data.description }
      : {}),
    ...(data.variations !== undefined && data.variations.length > 0
      ? { variations: data.variations }
      : {}),
  };
}

function toUpdateApiBody(data: UpdateProductData): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  if (data.seller_id !== undefined) body.seller_id = data.seller_id;
  if (data.product_name !== undefined) body.product_name = data.product_name;
  if (data.product_image !== undefined) body.product_image = data.product_image;
  if (data.category !== undefined) body.category = data.category;
  if (data.price !== undefined) body.price = data.price;
  if (data.inStock !== undefined) body.in_stock = data.inStock;
  if (data.description !== undefined) body.description = data.description;
  if (data.variations !== undefined) body.variations = data.variations;
  return body;
}

export class ProductService {
  private static requestAuthHeaders(): Record<string, string> {
    const seller = SellerService.getSellerAuthHeaders();
    return Object.keys(seller).length > 0 ? seller : AuthService.getAuthHeaders();
  }

  static async createProduct(data: CreateProductData): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.requestAuthHeaders(),
        },
        body: JSON.stringify(toCreateApiBody(data)),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      const json = (await response.json()) as ApiProductRow;
      return normalizeProduct(json);
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
          ...this.requestAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const rows = (await response.json()) as ApiProductRow[];
      return rows.map(normalizeProduct);
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
          ...this.requestAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const json = (await response.json()) as ApiProductRow;
      return normalizeProduct(json);
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
            ...this.requestAuthHeaders(),
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch seller products');
      }

      const rows = (await response.json()) as ApiProductRow[];
      return rows.map(normalizeProduct);
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
            ...this.requestAuthHeaders(),
          },
          body: JSON.stringify(toUpdateApiBody(data)),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product');
      }

      const json = (await response.json()) as ApiProductRow;
      return normalizeProduct(json);
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
            ...this.requestAuthHeaders(),
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

  static async deleteProductsBySellerID(
    sellerID: number,
  ): Promise<DeleteProductsBySellerResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products/seller/${sellerID}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...this.requestAuthHeaders(),
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Failed to delete seller products',
        );
      }

      const json = (await response.json()) as {
        message: string;
        deletedCount: number;
        deletedProducts?: ApiProductRow[];
      };
      return {
        message: json.message,
        deletedCount: json.deletedCount,
        deletedProducts: (json.deletedProducts ?? []).map(normalizeProduct),
      };
    } catch (error) {
      console.error('Delete seller products error:', error);
      throw error;
    }
  }
}
