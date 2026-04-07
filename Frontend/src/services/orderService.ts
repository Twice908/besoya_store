import { AuthService } from "./authService";
import { SellerService } from "./sellerService";
import { SESSION_EXPIRED_ERROR } from "./productService";

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

  private static async handleResponse<T>(
    response: Response,
    operationName: string,
  ): Promise<T> {
    // Log response details for debugging
    console.log(
      `[${operationName}] Response status: ${response.status} ${response.statusText}`,
    );
    console.log(
      `[${operationName}] Response headers:`,
      Object.fromEntries(response.headers.entries()),
    );

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(SESSION_EXPIRED_ERROR);
      }

      const contentType = response.headers.get("content-type") || "";

      // Check if response is JSON
      if (contentType.includes("application/json")) {
        try {
          const errorData = await response.json();
          const msg = String(
            errorData.error || errorData.message || "",
          ).toLowerCase();
          if (
            msg.includes("token") ||
            msg.includes("unauthorized") ||
            msg.includes("expired") ||
            msg.includes("invalid token")
          ) {
            throw new Error(SESSION_EXPIRED_ERROR);
          }
          throw new Error(
            errorData.error ||
              `${operationName} failed: ${response.statusText}`,
          );
        } catch (e) {
          if (e instanceof Error && e.message === SESSION_EXPIRED_ERROR) {
            throw e;
          }
          if (e instanceof Error && !e.message.includes("failed")) {
            throw e;
          }
          throw new Error(
            `${operationName} failed: ${response.statusText} (${response.status})`,
          );
        }
      } else {
        // Response is not JSON (likely HTML error page)
        const text = await response.text();
        console.error(
          `[${operationName}] Non-JSON response:`,
          text.substring(0, 200),
        );

        throw new Error(
          `${operationName} failed: ${response.statusText} (${response.status}). Server returned ${contentType || "unknown"} content.`,
        );
      }
    }

    // Successfully got a response
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error(
        `${operationName} returned invalid content type: ${contentType}`,
      );
    }
  }

  static async createOrder(data: CreateOrderData): Promise<Order> {
    try {
      const authHeaders = this.requestAuthHeaders();
      const authValue = authHeaders.Authorization
        ? authHeaders.Authorization.substring(0, 20) + "..."
        : "NO AUTH HEADER";

      console.log("[createOrder] Request headers:", {
        "Content-Type": "application/json",
        Authorization: authValue,
      });

      const headers = {
        "Content-Type": "application/json",
        ...authHeaders,
      };

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      return await this.handleResponse<Order>(response, "createOrder");
    } catch (error) {
      console.error("Create order error:", error);
      throw error;
    }
  }

  static async getAllOrders(): Promise<Order[]> {
    try {
      const authHeaders = this.requestAuthHeaders();
      const authValue = authHeaders.Authorization
        ? authHeaders.Authorization.substring(0, 20) + "..."
        : "NO AUTH HEADER";

      console.log("[getAllOrders] Request headers:", {
        "Content-Type": "application/json",
        Authorization: authValue,
      });

      const headers = {
        "Content-Type": "application/json",
        ...authHeaders,
      };

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "GET",
        headers,
      });

      return await this.handleResponse<Order[]>(response, "getAllOrders");
    } catch (error) {
      console.error("Fetch all orders error:", error);
      throw error;
    }
  }

  static async getOrdersByUserID(userID: number): Promise<Order[]> {
    try {
      const authHeaders = this.requestAuthHeaders();
      const authValue = authHeaders.Authorization
        ? authHeaders.Authorization.substring(0, 20) + "..."
        : "NO AUTH HEADER";

      console.log("[getOrdersByUserID] Request headers:", {
        "Content-Type": "application/json",
        Authorization: authValue,
      });

      const headers = {
        "Content-Type": "application/json",
        ...authHeaders,
      };

      const response = await fetch(
        `${API_BASE_URL}/api/orders/user/${userID}`,
        {
          method: "GET",
          headers,
        },
      );

      return await this.handleResponse<Order[]>(
        response,
        `getOrdersByUserID(${userID})`,
      );
    } catch (error) {
      console.error("Fetch user orders error:", error);
      throw error;
    }
  }

  static async getOrdersBySellerID(sellerID: number): Promise<Order[]> {
    try {
      const authHeaders = this.requestAuthHeaders();
      const authValue = authHeaders.Authorization
        ? authHeaders.Authorization.substring(0, 20) + "..."
        : "NO AUTH HEADER";

      console.log("[getOrdersBySellerID] Request headers:", {
        "Content-Type": "application/json",
        Authorization: authValue,
      });

      const headers = {
        "Content-Type": "application/json",
        ...authHeaders,
      };

      const response = await fetch(
        `${API_BASE_URL}/api/orders/seller/${sellerID}`,
        {
          method: "GET",
          headers,
        },
      );

      return await this.handleResponse<Order[]>(
        response,
        `getOrdersBySellerID(${sellerID})`,
      );
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
      const authHeaders = this.requestAuthHeaders();
      const authValue = authHeaders.Authorization
        ? authHeaders.Authorization.substring(0, 20) + "..."
        : "NO AUTH HEADER";

      console.log("[updateOrder] Request headers:", {
        "Content-Type": "application/json",
        Authorization: authValue,
      });

      const headers = {
        "Content-Type": "application/json",
        ...authHeaders,
      };

      const response = await fetch(`${API_BASE_URL}/api/orders/${orderID}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });

      return await this.handleResponse<Order>(
        response,
        `updateOrder(${orderID})`,
      );
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
      const authHeaders = this.requestAuthHeaders();
      const authValue = authHeaders.Authorization
        ? authHeaders.Authorization.substring(0, 20) + "..."
        : "NO AUTH HEADER";

      // Log the request for debugging
      console.log("[updateOrderStatus] Request headers:", {
        "Content-Type": "application/json",
        Authorization: authValue,
      });
      console.log("[updateOrderStatus] Request body:", {
        payment_status,
        order_status,
      });

      const headers = {
        "Content-Type": "application/json",
        ...authHeaders,
      };

      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderID}/update-status`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({ payment_status, order_status }),
        },
      );

      return await this.handleResponse<Order>(
        response,
        `updateOrderStatus(${orderID})`,
      );
    } catch (error) {
      console.error("Update order status error:", error);
      throw error;
    }
  }
}
