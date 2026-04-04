import { AuthService } from './authService';

const API_BASE_URL = 'https://besoya-store-api.onrender.com';

export interface Order {
  order_id: number;
  order_number: string;
  product_id: number;
  seller_id: number;
  user_id: number;
  variation_label?: string;
  quantity: number;
  deliver_to: string;
  unit_price: number;
  total_price: number;
  payment_status: 'Pending' | 'Paid' | 'Failed';
  order_status:
    | 'Started'
    | 'In Transit'
    | 'Left Transit'
    | 'Delivered'
    | 'Returning'
    | 'Returned'
    | 'Cancelled';
  order_date: string;
  updated_at: string;
}

export interface CreateOrderData {
  product_id: number;
  seller_id: number;
  user_id: number;
  variation_label?: string;
  quantity: number;
  deliver_to: string;
  unit_price: number;
  total_price: number;
  payment_status?: 'Pending' | 'Paid' | 'Failed';
  order_status?:
    | 'Started'
    | 'In Transit'
    | 'Left Transit'
    | 'Delivered'
    | 'Returning'
    | 'Returned'
    | 'Cancelled';
}

export interface UpdateOrderData {
  product_id?: number;
  seller_id?: number;
  user_id?: number;
  variation_label?: string;
  quantity?: number;
  deliver_to?: string;
  unit_price?: number;
  total_price?: number;
  payment_status?: 'Pending' | 'Paid' | 'Failed';
  order_status?:
    | 'Started'
    | 'In Transit'
    | 'Left Transit'
    | 'Delivered'
    | 'Returning'
    | 'Returned'
    | 'Cancelled';
}

export class OrderService {
  static async createOrder(data: CreateOrderData): Promise<Order> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      return await response.json();
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  }

  static async getAllOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch all orders error:', error);
      throw error;
    }
  }

  static async getOrdersByUserID(userID: number): Promise<Order[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/user/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user orders');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch user orders error:', error);
      throw error;
    }
  }

  static async getOrdersBySellerID(sellerID: number): Promise<Order[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/seller/${sellerID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...AuthService.getAuthHeaders(),
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch seller orders');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch seller orders error:', error);
      throw error;
    }
  }

  static async updateOrder(
    orderID: number,
    data: UpdateOrderData,
  ): Promise<Order> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update order');
      }

      return await response.json();
    } catch (error) {
      console.error('Update order error:', error);
      throw error;
    }
  }

  static async deleteOrder(orderID: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Delete order error:', error);
      throw error;
    }
  }
}
