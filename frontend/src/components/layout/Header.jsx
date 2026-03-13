import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/Theme";

import { FaMoon, FaSun } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-primary-600 font-semibold"
      : "text-gray-700 hover:text-primary-600";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            🏠 Thikana
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`${isActive("/")} transition`}>
              Home
            </Link>
            <Link
              to="/properties"
              className={`${isActive("/properties")} transition`}
            >
              Properties
            </Link>
            <Link to="/about" className={`${isActive("/about")} transition`}>
              About
            </Link>
            <Link
              to="/contact"
              className={`${isActive("/contact")} transition`}
            >
              Contact
            </Link>
            <Link
              to="/testimonials"
              className={`${isActive("/testimonials")} transition`}
            >
              Testimonials
            </Link>
          </nav>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 bg-gray-200 dark:bg-gray-600 transition"
          >
            {theme === "dark" ? (
              <FaSun className="text-white text-sm" />
            ) : (
              <FaMoon className="text-black text-sm" />
            )}
          </button>

          <button className="md:hidden text-2xl">☰</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
