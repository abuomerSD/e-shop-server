import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/eshop-logo.svg";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { authService } from "../../services/api";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount] = useState(0); // This would come from cart context
  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Handle search - you could navigate to a search page or filter products
      console.log("Searching for:", searchTerm);
    }
  };

  return (
    <div className="bg-gray-900 h-16 flex items-center shadow-lg">
      <div className="flex justify-between gap-2 items-center w-[97%] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img className="w-24 md:w-28" src={logo} alt="E-Shop Logo" />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="flex">
            <input
              className="h-10 w-full px-4 text-sm border-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 px-4 cursor-pointer transition-colors duration-200 rounded-r-md flex items-center justify-center"
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-900" />
            </button>
          </form>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {/* User Account */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to={user?.role === "user" ? "/profile" : "/dashboard"}
                className="text-gray-200 hover:text-white flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
              >
                <UserIcon className="w-5 h-5" />
                <span className="hidden md:block text-sm">{user?.name}</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-gray-200 hover:text-white px-4 py-2 text-sm font-medium border border-gray-600 hover:border-gray-500 rounded-md transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Shopping Cart */}
          <div className="relative">
            <button className="text-gray-200 hover:text-white p-2 hover:bg-gray-800 rounded-md transition-colors duration-200">
              <div className="relative">
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
                <ShoppingCartIcon className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
