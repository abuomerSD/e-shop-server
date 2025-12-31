import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen">
      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-50
          bg-gray-900
          w-64 min-h-screen
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar closeSidebar={() => setOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            {/* Hamburger */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              onClick={() => setOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>

            {/* User info and logout */}
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm text-gray-600">
                Welcome,{" "}
                <span className="font-medium text-gray-900">{user?.name}</span>
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                {user?.role}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
