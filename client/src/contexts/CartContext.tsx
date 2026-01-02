import React, { createContext, useEffect, useState, useCallback } from "react";
import { cartService } from "../services/api";
import type { ICart, ICartItem } from "../types/types";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cart: ICart | null;
  cartItems: ICartItem[];
  cartItemsCount: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, color?: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (couponName: string) => Promise<void>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export { CartContext };

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<ICart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Derived state
  const cartItems = cart?.cartItems || [];
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cart?.totalPriceAfterDiscount || cart?.totalCartPrice || 0;

  // Fetch cart data
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await cartService.getCart();
      setCart(response.data);
    } catch (err: any) {
      console.error("Failed to fetch cart:", err);
      setError(err.response?.data?.message || "Failed to fetch cart");
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Add product to cart
  const addToCart = async (productId: string, color?: string) => {
    if (!isAuthenticated) {
      throw new Error("Please login to add items to cart");
    }

    setError(null);

    try {
      const response = await cartService.addToCart(productId, color);
      setCart(response.data);
    } catch (err: any) {
      console.error("Failed to add to cart:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to add item to cart";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      throw new Error("Please login to update cart");
    }

    if (quantity <= 0) {
      await removeItem(productId);
      return;
    }

    setError(null);

    try {
      const response = await cartService.updateQuantity(productId, quantity);
      setCart(response.data);
    } catch (err: any) {
      console.error("Failed to update quantity:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to update quantity";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Remove item from cart
  const removeItem = async (productId: string) => {
    if (!isAuthenticated) {
      throw new Error("Please login to remove items from cart");
    }

    setError(null);

    try {
      await cartService.removeItem(productId);
      // Refresh cart after removal
      await fetchCart();
    } catch (err: any) {
      console.error("Failed to remove item:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to remove item";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!isAuthenticated) {
      throw new Error("Please login to clear cart");
    }

    setError(null);

    try {
      await cartService.clearCart();
      setCart(null);
    } catch (err: any) {
      console.error("Failed to clear cart:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to clear cart";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Apply coupon
  const applyCoupon = async (couponName: string) => {
    if (!isAuthenticated) {
      throw new Error("Please login to apply coupon");
    }

    setError(null);

    try {
      const response = await cartService.applyCoupon(couponName);
      setCart(response.data);
    } catch (err: any) {
      console.error("Failed to apply coupon:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to apply coupon";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Fetch cart when user authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
      setError(null);
    }
  }, [isAuthenticated, fetchCart]);

  const value = {
    cart,
    cartItems,
    cartItemsCount,
    totalPrice,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
