import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition duration-300 ease-in-out">Online Food Ordering</Link>
        <ul className="flex space-x-4">
       
        
          <li>
            <Link to="/#" className="hover:text-gray-300 transition duration-300 ease-in-out">Contact Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
