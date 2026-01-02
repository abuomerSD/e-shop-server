import { useState, useEffect } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import MainLayout from "../layouts/MainLayout";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../contexts/AuthContext";
import { API_FILE_URL } from "../config/env";

const Cart = () => {
  const {
    cartItems,
    cartItemsCount,
    totalPrice,
    loading,
    error,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    fetchCart,
  } = useCart();
  const { isAuthenticated } = useAuth();

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const formatPrice = (price?: number) => {
    if (!price) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    try {
      await updateQuantity(productId, newQuantity);
    } catch (err: any) {
      console.error("Failed to update quantity:", err);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeItem(productId);
    } catch (err: any) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      try {
        await clearCart();
      } catch (err: any) {
        console.error("Failed to clear cart:", err);
      }
    }
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError("");
    setCouponSuccess("");

    try {
      await applyCoupon(couponCode.trim());
      setCouponSuccess("Coupon applied successfully!");
      setCouponCode("");
    } catch (err: any) {
      setCouponError(err.message);
    } finally {
      setCouponLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Please Login to View Your Cart
            </h2>
            <p className="text-gray-500 mb-8">
              You need to be logged in to access your shopping cart.
            </p>
            <a
              href="/login"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md transition-colors duration-200"
            >
              Login Now
            </a>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart ({cartItemsCount} items)
          </h1>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
            >
              Clear Cart
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Start shopping to add items to your cart.
            </p>
            <a
              href="/"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md transition-colors duration-200 inline-block"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-sm border"
                >
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      {item.product?.imageCover ? (
                        <img
                          src={`${API_FILE_URL}/${item.product.imageCover}`}
                          alt={item.product.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">
                            No image
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {item.product?.title || "Unknown Product"}
                      </h3>
                      {item.product?.brand && (
                        <p className="text-sm text-gray-500">
                          {item.product.brand.name}
                        </p>
                      )}
                      {item.color && (
                        <p className="text-sm text-gray-500">
                          Color: {item.color}
                        </p>
                      )}
                      <p className="text-lg font-bold text-gray-900 mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                        className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                        disabled={loading}
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                        className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                        disabled={loading}
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                      disabled={loading}
                      title="Remove item"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                {/* Coupon Code */}
                <form onSubmit={handleApplyCoupon} className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={couponLoading || !couponCode.trim()}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-600 text-sm mt-1">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="text-green-600 text-sm mt-1">
                      {couponSuccess}
                    </p>
                  )}
                </form>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-base">
                    <span>Items ({cartItemsCount})</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-md transition-colors duration-200 font-semibold"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-center">
                  <a
                    href="/"
                    className="text-yellow-600 hover:text-yellow-700 text-sm font-medium transition-colors duration-200"
                  >
                    ← Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
