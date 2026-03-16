import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/Theme";
import Notification from "../components/admin/Notification";
import {
  FiHome,
  FiGrid,
  FiMessageSquare,
  FiStar,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronRight,
} from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [admin, setAdmin] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setAdmin(JSON.parse(adminToken));
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: <FiHome className="text-xl" />,
      roles: ["super_admin", "property_manager", "moderator"],
    },
    {
      path: "/admin/properties",
      label: "Properties",
      icon: <FiGrid className="text-xl" />,
      roles: ["super_admin", "property_manager"],
    },
    {
      path: "/admin/testimonials",
      label: "Testimonials",
      icon: <FiStar className="text-xl" />,
      roles: ["super_admin", "moderator"],
    },
    {
      path: "/admin/messages",
      label: "Messages",
      icon: <FiMessageSquare className="text-xl" />,
      roles: ["super_admin", "moderator"],
    },
    {
      path: "/admin/admins",
      label: "Manage Admins",
      icon: <FiUsers className="text-xl" />,
      roles: ["super_admin"],
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: <FiSettings className="text-xl" />,
      roles: ["super_admin"],
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => admin && item.roles.includes(admin.role),
  );

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-2xl z-50
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-64" : "w-20"} 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Area */}
        <div className="h-17.5 flex items-center justify-between lg:justify-center px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/admin" className="flex items-center gap-0 group">
            <span className="text-2xl font-black bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              {sidebarOpen ? "Thikana" : "T"}
            </span>
            <span className="text-blue-500 text-3xl -mt-1.5 font-black group-hover:rotate-12 transition-transform duration-300">
              .
            </span>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                ${!sidebarOpen && "justify-center"}
              `}
            >
              <span className={isActive(item.path) ? "text-white" : ""}>
                {item.icon}
              </span>
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  <FiChevronRight
                    className={`text-sm transition-transform ${
                      isActive(item.path) ? "text-white" : "text-gray-400"
                    }`}
                  />
                </>
              )}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shrink-0">
              {admin.name.charAt(0)}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {admin.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {admin.role.replace("_", " ")}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 w-full px-4 py-3 rounded-xl
              text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20
              hover:text-red-600 dark:hover:text-red-400 transition-all
              ${!sidebarOpen && "justify-center"}
            `}
          >
            <FiLogOut />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300 min-h-screen
          ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}
        `}
      >
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Desktop menu toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                aria-label="Toggle sidebar"
              >
                <FiMenu size={20} />
              </button>

              {/* Welcome text */}
              <h1 className="hidden sm:block text-lg sm:text-xl font-semibold dark:text-white">
                Welcome back, {admin.name}!
              </h1>
              <h1 className="block sm:hidden text-lg font-semibold dark:text-white">
                Hi, {admin.name.split(" ")[0]}!
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 bg-gray-100 dark:bg-gray-800 transition-all duration-300 group relative"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FaSun className="text-yellow-500 text-lg group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <FaMoon className="text-gray-700 text-lg group-hover:scale-110 transition-transform duration-300" />
                )}
              </button>

              {/* Notifications - Single component */}
              <Notification />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;