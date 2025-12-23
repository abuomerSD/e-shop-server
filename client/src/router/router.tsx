import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import Categories from "../pages/dashboard/Categories";
import Dashboard from "../pages/dashboard/Dashboard";
import SubCategories from "../pages/dashboard/SubCategories";
import Brands from "../pages/dashboard/Brands";
import Products from "../pages/dashboard/Products";
import Orders from "../pages/dashboard/Orders";
import Users from "../pages/dashboard/Users";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/dashboard/categories", element: <Categories /> },
      { path: "/dashboard/subcategories", element: <SubCategories /> },
      { path: "/dashboard/brands", element: <Brands /> },
      { path: "/dashboard/products", element: <Products /> },
      { path: "/dashboard/orders", element: <Orders /> },
      { path: "/dashboard/users", element: <Users /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(routes);

export default router;
