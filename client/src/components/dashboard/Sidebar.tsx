import { NavLink } from "react-router-dom";
import logo from "../../assets/images/eshop-logo.svg";
import {
  //   ChartBarIcon,
  DocumentDuplicateIcon,
  FolderOpenIcon,
  PresentationChartLineIcon,
  QueueListIcon,
  RocketLaunchIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";

const Sidebar = () => {
  const navClass = ({ isActive }: { isActive: boolean }) => {
    return `text-gray-100 flex items-center gap-1 p-3 rounded-full hover:bg-yellow-600 w-4/5  transition-colors duration-200 ${
      isActive ? "bg-yellow-600" : ""
    }`;
  };

  return (
    <aside className="flex flex-col gap-10 bg-gray-900 min-h-screen p-5">
      <img className="w-2/5 mt-3 ms-5" src={logo} alt="logo" />
      <div className="flex flex-col gap-2">
        <NavLink className={navClass} to="/dashboard" end>
          <PresentationChartLineIcon className="w-1/10" />
          Dashboard
        </NavLink>
        <NavLink className={navClass} to="/dashboard/categories">
          <FolderOpenIcon className="w-1/10" />
          Categories
        </NavLink>
        <NavLink className={navClass} to="/dashboard/subcategories">
          <DocumentDuplicateIcon className="w-1/10" />
          SubCategories
        </NavLink>
        <NavLink className={navClass} to="/dashboard/brands">
          <RocketLaunchIcon className="w-1/10" />
          Brands
        </NavLink>
        <NavLink className={navClass} to="/dashboard/products">
          <ShoppingBagIcon className="w-1/10" />
          Products
        </NavLink>
        <NavLink className={navClass} to="/dashboard/orders">
          <QueueListIcon className="w-1/10" />
          Orders
        </NavLink>
        <NavLink className={navClass} to="/dashboard/users">
          <UsersIcon className="w-1/10" />
          Users
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
