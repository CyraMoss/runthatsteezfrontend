// components/Navbar.tsx
'use client';

import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import Link from 'next/link';
import UserMenu from './UserMenu';

const Navbar: React.FC = () => {
  const cartContext = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!cartContext) {
    return null;
  }

  const { cartItemCount } = cartContext;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            RunThatSteez
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-gray-800">
            Products
          </Link>
          <Link href="/cart" className="relative text-gray-600 hover:text-gray-800">
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
            Search
          </button>
          <UserMenu />
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-10">
          <Link
            href="/"
            onClick={toggleMenu}
            className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={toggleMenu}
            className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
          >
            Products
          </Link>
          <Link
            href="/cart"
            onClick={toggleMenu}
            className="relative block px-4 py-2 text-gray-600 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded-full">
              Search
            </button>
            <UserMenu />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
