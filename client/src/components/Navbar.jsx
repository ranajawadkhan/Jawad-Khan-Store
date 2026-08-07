import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Wrench } from 'lucide-react';

const Navbar = ({ cartCount = 1, user = { name: "baba", role: "admin" } }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Brand Title */}
      <Link to="/" className="text-2xl font-extrabold tracking-wide text-white">
        JAWAD KHAN STORE
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link to="/" className="hover:text-gray-200 transition">
          Home
        </Link>
        <Link to="/products" className="hover:text-gray-200 transition">
          Products
        </Link>
        
        <Link to="/wishlist" className="flex items-center space-x-1 hover:text-gray-200 transition">
          <Heart className="w-4 h-4 fill-current text-red-400" />
          <span>Wishlist</span>
        </Link>

        <Link to="/cart" className="flex items-center space-x-1 hover:text-gray-200 transition">
          <ShoppingCart className="w-4 h-4" />
          <span>Cart ({cartCount})</span>
        </Link>

        {/* Admin Badge */}
        {user?.role === 'admin' && (
          <Link 
            to="/admin" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center space-x-1 transition"
          >
            <Wrench className="w-3 h-3" />
            <span>Admin</span>
          </Link>
        )}

        {/* User Greeting & Logout */}
        {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-yellow-300">
              Hi, am {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-bold transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;