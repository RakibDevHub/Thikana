import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/Theme";

import { FaMoon, FaSun } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { FiHome, FiList, FiInfo, FiMail, FiTool } from "react-icons/fi";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-primary-600 dark:text-primary-400 font-semibold bg-primary-50 dark:bg-primary-900/30"
      : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50";
  };

  const navLinks = [
    {
      path: "/",
      label: "Home",
      icon: <FiHome className="text-xl text-blue-600" />,
    },
    {
      path: "/about",
      label: "About Us",
      icon: <FiInfo className="text-xl text-blue-600" />,
    },
    {
      path: "/properties",
      label: "Properties",
      icon: <FiList className="text-xl text-blue-600" />,
    },
    {
      path: "/services",
      label: "Services",
      icon: <FiTool className="text-xl text-blue-600" />,
    },
    {
      path: "/contact",
      label: "Contact",
      icon: <FiMail className="text-xl text-blue-600" />,
    },
  ];

  return (
    <header className="w-full fixed top-0 left-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg z-50">
      <div className="px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="inline-block group">
            <div className="flex flex-col">
              <div className="flex items-center gap-0">
                <span className="text-2xl font-black bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  Thikana
                </span>
                <span className="text-blue-500 text-3xl font-black -mt-1.5 group-hover:rotate-12 transition-transform duration-300">
                  .
                </span>
              </div>
              <span className="text-[10px] tracking-[0.2em] text-gray-500 mt-1">
                REAL ESTATE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${isActive(link.path)}`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 bg-gray-100 dark:bg-gray-800 transition-all duration-300 group relative"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-500 text-lg group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <FaMoon className="text-gray-700 text-lg group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <IoClose className="text-2xl text-gray-800 dark:text-white" />
              ) : (
                <IoMenu className="text-2xl text-gray-800 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`
          fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 
          transform transition-transform duration-300 ease-out lg:hidden
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Mobile Menu Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary-600">Menu</span>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <IoClose className="text-2xl text-gray-800 dark:text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="p-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                ${
                  location.pathname === link.path
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
              onClick={closeMenu}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-base font-medium">{link.label}</span>
              {location.pathname === link.path && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                T
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">
                Thikana Real Estate
              </p>
              <p>Find your dream home</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
