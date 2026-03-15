import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { useTheme } from "../../context/Theme";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Mock admin users - In real app, this would be from backend
  const mockAdmins = [
    {
      id: 1,
      name: "Super Admin",
      email: "super@thikana.com",
      password: "super123",
      role: "super_admin",
    },
    {
      id: 2,
      name: "Property Manager",
      email: "manager@thikana.com",
      password: "manager123",
      role: "property_manager",
    },
    {
      id: 3,
      name: "Moderator",
      email: "mod@thikana.com",
      password: "mod123",
      role: "moderator",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      const admin = mockAdmins.find(
        (a) =>
          a.email === credentials.email && a.password === credentials.password,
      );

      if (admin) {
        // Store admin info in localStorage (in real app, use JWT token)
        localStorage.setItem(
          "adminToken",
          JSON.stringify({
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
          }),
        );
        navigate("/admin");
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <span className="text-3xl font-black bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Thikana
            </span>
            <span className="text-blue-500 text-4xl font-black">.</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Admin Dashboard Login
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="admin@thikana.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  <FiLogIn /> Login to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Demo Credentials:
            </p>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <span className="font-mono">super@thikana.com</span> / super123
                <span className="ml-2 text-xs text-blue-600">
                  (Super Admin)
                </span>
              </p>
              <p>
                <span className="font-mono">manager@thikana.com</span> /
                manager123
                <span className="ml-2 text-xs text-blue-600">
                  (Property Manager)
                </span>
              </p>
              <p>
                <span className="font-mono">mod@thikana.com</span> / mod123
                <span className="ml-2 text-xs text-blue-600">(Moderator)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
