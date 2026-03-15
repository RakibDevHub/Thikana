import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiMessageSquare,
  FiStar,
  FiUsers,
  FiEye,
  FiTrendingUp,
  FiCalendar,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalMessages: 0,
    pendingTestimonials: 0,
    totalViews: 0,
    recentProperties: [],
    recentMessages: [],
    recentTestimonials: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setStats({
        totalProperties: 24,
        totalMessages: 156,
        pendingTestimonials: 5,
        totalViews: 1234,
        recentProperties: [
          {
            id: 1,
            title: "Modern Luxury Villa",
            price: 850000,
            status: "active",
            views: 234,
            createdAt: "2024-03-15",
          },
          {
            id: 2,
            title: "Downtown Apartment",
            price: 350000,
            status: "active",
            views: 156,
            createdAt: "2024-03-14",
          },
          {
            id: 3,
            title: "Suburban Family Home",
            price: 450000,
            status: "pending",
            views: 89,
            createdAt: "2024-03-13",
          },
          {
            id: 4,
            title: "Beachfront Condo",
            price: 650000,
            status: "active",
            views: 312,
            createdAt: "2024-03-12",
          },
        ],
        recentMessages: [
          {
            id: 1,
            name: "John Smith",
            email: "john@example.com",
            message: "Interested in the Modern Luxury Villa...",
            status: "unread",
            createdAt: "2024-03-15T10:30:00",
          },
          {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah@example.com",
            message: "I'd like to schedule a viewing for...",
            status: "read",
            createdAt: "2024-03-15T09:15:00",
          },
          {
            id: 3,
            name: "Michael Chen",
            email: "michael@example.com",
            message: "What's the HOA fee for the Downtown...",
            status: "unread",
            createdAt: "2024-03-14T16:45:00",
          },
          {
            id: 4,
            name: "Emily Rodriguez",
            email: "emily@example.com",
            message: "Is the Suburban Family Home still...",
            status: "replied",
            createdAt: "2024-03-14T14:20:00",
          },
        ],
        recentTestimonials: [
          {
            id: 1,
            name: "David Thompson",
            rating: 5,
            content: "Excellent service! Found my dream home quickly.",
            status: "pending",
            createdAt: "2024-03-15",
          },
          {
            id: 2,
            name: "Lisa Anderson",
            rating: 5,
            content: "Very professional team. Highly recommended!",
            status: "approved",
            createdAt: "2024-03-14",
          },
          {
            id: 3,
            name: "Robert Martinez",
            rating: 4,
            content: "Great experience overall. Would use again.",
            status: "pending",
            createdAt: "2024-03-13",
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
      case "approved":
      case "read":
      case "replied":
        return (
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
            <FiCheckCircle className="text-xs" /> {status}
          </span>
        );
      case "pending":
      case "unread":
        return (
          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-medium flex items-center gap-1">
            <FiClock className="text-xs" /> {status}
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statCards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: <FiHome className="text-2xl" />,
      color: "from-blue-500 to-blue-600",
      link: "/admin/properties",
    },
    {
      title: "Messages",
      value: stats.totalMessages,
      icon: <FiMessageSquare className="text-2xl" />,
      color: "from-green-500 to-green-600",
      link: "/admin/messages",
    },
    {
      title: "Pending Testimonials",
      value: stats.pendingTestimonials,
      icon: <FiStar className="text-2xl" />,
      color: "from-yellow-500 to-yellow-600",
      link: "/admin/testimonials",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: <FiEye className="text-2xl" />,
      color: "from-purple-500 to-purple-600",
      link: "/admin/properties",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-blue-100">
          Here's what's happening with your real estate platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all p-6 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${stat.color} flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <FiArrowRight className="text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Recent Properties</h3>
            <Link
              to="/admin/properties"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentProperties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {property.title}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>${property.price.toLocaleString()}</span>
                    <span>•</span>
                    <span>{property.views} views</span>
                    <span>•</span>
                    <span>{formatDate(property.createdAt)}</span>
                  </div>
                </div>
                {getStatusBadge(property.status)}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Recent Messages</h3>
            <Link
              to="/admin/messages"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentMessages.map((message) => (
              <div
                key={message.id}
                className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {message.name}
                  </p>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(message.status)}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDateTime(message.createdAt)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {message.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {message.email}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Testimonials */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Recent Testimonials</h3>
            <Link
              to="/admin/testimonials"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {stats.recentTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  {getStatusBadge(testimonial.status)}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`text-sm ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  "{testimonial.content}"
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {formatDate(testimonial.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;