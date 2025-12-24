import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

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
        {/* Hamburger */}
        <button
          className="lg:hidden p-2 m-2 text-gray-100 bg-gray-800 rounded"
          onClick={() => setOpen(true)}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>

        <main className="p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
