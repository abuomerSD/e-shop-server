import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import DashboardLayout from "../layouts/DashboardLayout";
import Categories from "../pages/dashboard/Categories";
import Dashboard from "../pages/dashboard/Dashboard";
import SubCategories from "../pages/dashboard/SubCategories";
import Brands from "../pages/dashboard/Brands";
import Products from "../pages/dashboard/Products";
import Orders from "../pages/dashboard/Orders";
import Users from "../pages/dashboard/Users";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/cart", element: <Cart /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/unauthorized", element: <Unauthorized /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute requiredRole="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/dashboard/categories", element: <Categories /> },
      { path: "/dashboard/subcategories", element: <SubCategories /> },
      { path: "/dashboard/brands", element: <Brands /> },
      { path: "/dashboard/products", element: <Products /> },
      { path: "/dashboard/orders", element: <Orders /> },
      {
        path: "/dashboard/users",
        element: (
          <ProtectedRoute requiredRole="admin">
            <Users />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(routes);

export default router;
