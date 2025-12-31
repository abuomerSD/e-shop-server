import { useEffect, useState } from "react";
import {
  UsersIcon,
  ShoppingBagIcon,
  FolderOpenIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import {
  userService,
  productService,
  categoryService,
  orderService,
} from "../../services/api";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch basic counts
      const [usersRes, productsRes, categoriesRes, ordersRes] =
        await Promise.all([
          userService.getAll({ limit: 1 }),
          productService.getAll({ limit: 1 }),
          categoryService.getAll({ limit: 1 }),
          orderService.getAll({ limit: 1 }),
        ]);

      setStats({
        totalUsers: usersRes.results || 0,
        totalProducts: productsRes.results || 0,
        totalCategories: categoriesRes.results || 0,
        totalOrders: ordersRes.results || 0,
        totalRevenue: 0, // This would need to be calculated from orders
        pendingOrders: 0, // This would need filtering
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: UsersIcon,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: ShoppingBagIcon,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: FolderOpenIcon,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ChartBarIcon,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-yellow-100">
          Here's what's happening with your e-commerce platform today.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-lg p-6 shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {card.value.toLocaleString()}
                  </p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`w-6 h-6 ${card.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <a
              href="/dashboard/products"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border"
            >
              <ShoppingBagIcon className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium">Add New Product</span>
            </a>
            <a
              href="/dashboard/categories"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border"
            >
              <FolderOpenIcon className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium">Manage Categories</span>
            </a>
            <a
              href="/dashboard/orders"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border"
            >
              <TruckIcon className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium">View Orders</span>
            </a>
            {user?.role === "admin" && (
              <a
                href="/dashboard/users"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border"
              >
                <UsersIcon className="w-5 h-5 text-gray-600 mr-3" />
                <span className="font-medium">Manage Users</span>
              </a>
            )}
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Your Role:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user?.role === "admin"
                    ? "bg-red-100 text-red-800"
                    : user?.role === "manager"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user?.role}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Account Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user?.active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user?.active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Member Since:</span>
              <span className="text-gray-900">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
