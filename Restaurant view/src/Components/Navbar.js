import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-bold">Restaurant Logo</Link>
        </div>
        

        <div className="flex items-center space-x-4">
          <Link to="/UserDetails" className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300">User Details</Link>
          <Link to="/current-orders" className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300">Current Orders</Link>
          <Link to="/order-accepted" className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300">Order Accepted</Link>
          <Link to="/order-completed" className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300">Order Completed</Link>
          <Link to="/menu" className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300">Menu</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
