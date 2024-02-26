import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setClientView } from "../Redux/Slices/restaurantViewSlice";
const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="bg-gray-800 p-4 mt-[10%]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/restaurant/dashboard"
            className="text-white text-xl font-bold"
          >
            Restaurant Logo
          </Link>
        </div>

        <div className="flex items-center space-x-5">
          <Link
            to="/restaurant/UserDetails"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300"
          >
            User Details
          </Link>
          <Link
            to="/"
            onClick={dispatch(setClientView())}
            className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300"
          >
            Go to Client Side
          </Link>

          <Link
            to="/restaurant/current-orders"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300"
          >
            Current Order
          </Link>

          <Link
            to="/restaurant/menu"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300"
          >
            Menu
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
