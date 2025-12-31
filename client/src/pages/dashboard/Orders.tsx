import { EyeIcon, CheckIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { orderService } from "../../services/api";
import type { IOrder } from "../../types/types";
import ReactPaginate from "react-paginate";
import { PAGE_LIMIT } from "../../utils/constants";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [error, setError] = useState("");
  const limit = PAGE_LIMIT;

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await orderService.getAll({
        page: page + 1,
        limit,
        search: searchTerm || undefined,
        status: selectedStatus || undefined,
      });

      setOrders(response.data);
      setTotalPages(Math.ceil((response.results || 0) / limit));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, searchTerm, selectedStatus]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchOrders();
  };

  const formatPrice = (price?: number) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getStatusBadge = (isPaid: boolean, isDelivered: boolean) => {
    if (isDelivered) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
          Delivered
        </span>
      );
    }
    if (isPaid) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          Paid
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
        Pending
      </span>
    );
  };

  const handleUpdateStatus = async (
    orderId: string,
    status: { isPaid?: boolean; isDelivered?: boolean }
  ) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      await fetchOrders();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update order status");
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-5">
      <h1 className="font-bold text-2xl">Orders</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white p-5 rounded-lg flex justify-between gap-2">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            className="p-2 rounded-md border-2 border-gray-300 focus:outline-0 focus:border-yellow-500"
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 rounded-md border-2 border-gray-300 focus:outline-0 focus:border-yellow-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="delivered">Delivered</option>
          </select>
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Order ID</th>
                    <th className="px-4 py-3 text-left">User</th>
                    <th className="px-4 py-3 text-left">Total Price</th>
                    <th className="px-4 py-3 text-left">Payment Method</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Created At</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <tr
                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                        key={order.id}
                      >
                        <td className="px-4 py-3">
                          {page * limit + index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm">
                            {order.id.slice(0, 8)}...
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">
                            {order.user?.name || "N/A"}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {order.user?.email}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {formatPrice(order.totalOrderPrice)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              order.paymentMethodType === "card"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.paymentMethodType}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(order.isPaid, order.isDelivered)}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 justify-center">
                            <button
                              className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                              title="View Details"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            {!order.isPaid && (
                              <button
                                className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded transition-colors"
                                onClick={() =>
                                  handleUpdateStatus(order.id, { isPaid: true })
                                }
                                title="Mark as Paid"
                              >
                                <CheckIcon className="w-4 h-4" />
                              </button>
                            )}
                            {order.isPaid && !order.isDelivered && (
                              <button
                                className="text-purple-600 hover:text-purple-800 p-1 hover:bg-purple-50 rounded transition-colors"
                                onClick={() =>
                                  handleUpdateStatus(order.id, {
                                    isDelivered: true,
                                  })
                                }
                                title="Mark as Delivered"
                              >
                                <CheckIcon className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        {searchTerm
                          ? "No orders found matching your search."
                          : "No orders found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="p-4 border-t">
                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={totalPages}
                  onPageChange={(selected) => setPage(selected.selected)}
                  containerClassName="flex justify-center items-center gap-2"
                  pageClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer transition-colors"
                  previousClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer transition-colors"
                  nextClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer transition-colors"
                  activeClassName="bg-yellow-600 text-white border-yellow-600 hover:bg-yellow-600"
                  disabledClassName="opacity-50 cursor-not-allowed"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
