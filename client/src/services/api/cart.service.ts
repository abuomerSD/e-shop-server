import { http } from "../http";
import type { ICart, IApiResponse } from "../../types/types";

export const cartService = {
  getCart: async (): Promise<IApiResponse<ICart>> => {
    return await http.get<ICart>("/cart");
  },

  addToCart: async (
    productId: string,
    color?: string
  ): Promise<IApiResponse<ICart>> => {
    return await http.post<ICart>("/cart", { productId, color });
  },

  updateQuantity: async (
    productId: string,
    quantity: number
  ): Promise<IApiResponse<ICart>> => {
    return await http.put<ICart>(`/cart/${productId}`, { quantity });
  },

  removeItem: async (productId: string): Promise<IApiResponse<void>> => {
    return await http.delete<void>(`/cart/${productId}`);
  },

  clearCart: async (): Promise<IApiResponse<void>> => {
    return await http.delete<void>("/cart");
  },

  applyCoupon: async (couponName: string): Promise<IApiResponse<ICart>> => {
    return await http.post<ICart>("/cart/apply-coupon", { coupon: couponName });
  },
};
