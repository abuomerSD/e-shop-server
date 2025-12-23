import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className={`hidden lg:w-1/6 lg:block ${open ? "block" : ""}`}>
        <Sidebar />
      </aside>

      {/* Hamburger */}

      <div
        className={`min-h-screen bg-gray-800 lg:hidden w-1/10 ${
          open ? "" : ""
        }`}
      >
        <Bars3Icon
          className="w-4/6 mx-auto mt-2 text-gray-100 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Outlet */}

      <main className="w-5/6 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
