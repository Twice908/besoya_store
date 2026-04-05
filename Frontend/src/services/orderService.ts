import { AuthService } from "./authService";
import { SellerService } from "./sellerService";

const API_BASE_URL = "https://besoya-store-api.onrender.com";

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
  payment_status: "Pending" | "Paid" | "Failed";
  order_status:
    | "Started"
    | "In Transit"
    | "Left Transit"
    | "Delivered"
    | "Returning"
    | "Returned"
    | "Cancelled";
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
  payment_status?: "Pending" | "Paid" | "Failed";
  order_status?:
    | "Started"
    | "In Transit"
    | "Left Transit"
    | "Delivered"
    | "Returning"
    | "Returned"
    | "Cancelled";
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
  payment_status?: "Pending" | "Paid" | "Failed";
  order_status?:
    | "Started"
    | "In Transit"
    | "Left Transit"
    | "Delivered"
    | "Returning"
    | "Returned"
    | "Cancelled";
}

export class OrderService {
  private static requestAuthHeaders(): Record<string, string> {
    const seller = SellerService.getSellerAuthHeaders();
    return Object.keys(seller).length > 0
      ? seller
      : AuthService.getAuthHeaders();
  }

  static async createOrder(data: CreateOrderData): Promise<Order> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.requestAuthHeaders(),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      return await response.json();
    } catch (error) {
      console.error("Create order error:", error);
      throw error;
    }
  }

  static async getAllOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.requestAuthHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch all orders error:", error);
      throw error;
    }
  }

  static async getOrdersByUserID(userID: number): Promise<Order[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/user/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...this.requestAuthHeaders(),
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user orders");
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch user orders error:", error);
      throw error;
    }
  }

  static async getOrdersBySellerID(sellerID: number): Promise<Order[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/seller/${sellerID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...this.requestAuthHeaders(),
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch seller orders");
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch seller orders error:", error);
      throw error;
    }
  }

  static async updateOrder(
    orderID: number,
    data: UpdateOrderData,
  ): Promise<Order> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...this.requestAuthHeaders(),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update order");
      }

      return await response.json();
    } catch (error) {
      console.error("Update order error:", error);
      throw error;
    }
  }

  static async updateOrderStatus(
    orderID: number,
    payment_status: "Pending" | "Paid" | "Failed",
    order_status:
      | "Started"
      | "In Transit"
      | "Left Transit"
      | "Delivered"
      | "Returning"
      | "Returned"
      | "Cancelled",
  ): Promise<Order> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderID}/update-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...this.requestAuthHeaders(),
          },
          body: JSON.stringify({ payment_status, order_status }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update order status");
      }

      return await response.json();
    } catch (error) {
      console.error("Update order status error:", error);
      throw error;
    }
  }
}
