import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/Theme";

import { FaMoon, FaSun } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { FiHome, FiList, FiInfo, FiMail, FiTool, FiX } from "react-icons/fi";

const Header = ({ headerHeight = 80 }) => {
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
      label: "Browse Properties",
      icon: <FiList className="text-xl text-blue-600" />,
    },
    {
      path: "/services",
      label: "Our Services",
      icon: <FiTool className="text-xl text-blue-600" />,
    },
    {
      path: "/contact",
      label: "Contact Us",
      icon: <FiMail className="text-xl text-blue-600" />,
    },
  ];

  return (
    <>
      <header className="w-full fixed top-0 left-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
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
                <span className="text-[10px] tracking-[0.2em] text-gray-500 dark:text-gray-400 mt-1">
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
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${isActive(
                    link.path,
                  )}`}
                >
                  <span className="text-blue-500">{link.icon}</span>
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
                className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative z-50"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FiX className="text-2xl text-gray-800 dark:text-white group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <IoMenu className="text-2xl text-gray-800 dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          ref={menuRef}
          style={{
            top: headerHeight,
            height: `calc(100vh - ${headerHeight}px)`,
          }}
          className={`
          fixed right-0 w-80 bg-white dark:bg-gray-900 shadow-2xl z-40
          transform transition-transform duration-300 ease-out lg:hidden
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="relative h-full flex flex-col">
            {/* Mobile Menu Header with Gradient */}
            <div className="bg-linear-to-r from-blue-600 to-blue-800 p-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-xl font-bold">T</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Menu</h3>
                    <p className="text-blue-100 text-xs">
                      Navigate to sections
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Links - Scrollable */}
            <nav className="flex-1 p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                  ${
                    location.pathname === link.path
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold border-l-4 border-blue-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:pl-6"
                  }
                `}
                  onClick={closeMenu}
                >
                  <span
                    className={`text-xl ${location.pathname === link.path ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    {link.icon}
                  </span>
                  <span className="text-base font-medium flex-1">
                    {link.label}
                  </span>
                  {location.pathname === link.path && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Footer with User Info */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  T
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    Thikana Real Estate
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Find your dream home
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Header;
