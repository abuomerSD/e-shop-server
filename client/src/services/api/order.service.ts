import { http } from "../http";
import type { IOrder, IApiResponse } from "../../types/types";

export const orderService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.search) searchParams.append("keyword", params.search);
    if (params?.status) searchParams.append("status", params.status);

    const queryString = searchParams.toString();
    const url = `/orders${queryString ? `?${queryString}` : ""}`;

    return await http.get<IOrder[]>(url);
  },

  getById: async (id: string): Promise<IApiResponse<IOrder>> => {
    return await http.get<IOrder>(`/orders/${id}`);
  },

  createCashOrder: async (
    shippingAddress: object
  ): Promise<IApiResponse<IOrder>> => {
    return await http.post<IOrder>("/orders/createCashOrder", {
      shippingAddress,
    });
  },

  createOnlineOrder: async (
    shippingAddress: object
  ): Promise<IApiResponse<{ session: any }>> => {
    return await http.post<{ session: any }>("/orders/createOnlineOrder", {
      shippingAddress,
    });
  },

  updateOrderStatus: async (
    id: string,
    status: { isPaid?: boolean; isDelivered?: boolean }
  ): Promise<IApiResponse<IOrder>> => {
    return await http.put<IOrder>(`/orders/${id}`, status);
  },
};
