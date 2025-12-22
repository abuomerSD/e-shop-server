import logo from "../../assets/images/eshop-logo.svg";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/16/solid";

const Navbar = () => {
  return (
    <div className="bg-gray-900 h-14 flex items-center">
      <div className="flex justify-between items-center  w-[97%] mx-auto">
        <img className="w-25" src={logo} alt="logo" />
        <div className="w-175 bg-gray-200 h-9 rounded-md flex flex-row">
          <input
            className="h-full w-11/12 p-2 focus:border-0 focus:outline-0"
            type="text"
          />
          <button className="bg-yellow-500 w-1/12 cursor-pointer hover:bg-yellow-600 rounded-r-md">
            <MagnifyingGlassIcon className="w-7 mx-auto text-gray-900" />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <button className="text-gray-200 w-25 h-5/6 p-3 cursor-pointer border-2 border-transparent hover:border-gray-200 hover:rounded-sm">
            Sign in
          </button>
          <div className="text-gray-200 cursor-pointer h-5/6 w-12 p-1 border-2 border-transparent hover:border-gray-200 hover:rounded-sm relative">
            <span className="absolute top-0 right-0 bg-red-600 rounded-full  w-5 h-5 text-center font-extrabold text-sm">
              0
            </span>
            <ShoppingCartIcon className=" w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
