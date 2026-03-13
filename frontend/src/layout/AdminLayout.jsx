import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/context/Theme';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/properties', label: 'Properties', icon: '🏠' },
    { path: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
    { path: '/admin/messages', label: 'Messages', icon: '✉️' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-800 shadow-lg transition-all duration-300`}>
        <div className="p-4 flex justify-between items-center">
          <h2 className={`font-bold text-primary-600 ${!sidebarOpen && 'hidden'}`}>Admin</h2>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900 hover:text-primary-600 transition"
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold dark:text-white">Admin Dashboard</h1>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon />}
              </button>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;