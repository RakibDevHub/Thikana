import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiStar,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiMessageSquare,
  FiHome,
  FiCalendar,
  FiDownload,
  FiCheck,
  FiX,
  FiExternalLink,
  FiCornerUpRight,
} from "react-icons/fi";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProperty, setFilterProperty] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showReplyHistory, setShowReplyHistory] = useState(false);

  const itemsPerPage = 10;

  // Mock data fetch with reply history
  useEffect(() => {
    setTimeout(() => {
      const mockMessages = [
        {
          id: 1,
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "(305) 555-1234",
          propertyId: 1,
          propertyTitle: "Modern Luxury Villa",
          message:
            "I'm very interested in this property. Could you provide more details about the pool and garden? Also, is the price negotiable? I'd like to schedule a viewing this weekend if possible.",
          status: "replied",
          createdAt: "2024-03-15T10:30:00",
          preferredContact: "email",
          replies: [
            {
              id: 101,
              from: "admin",
              message:
                "Thank you for your interest! The pool is 20x40 ft with a spa, and the garden is professionally landscaped. Yes, the price is negotiable. We have availability this Saturday at 2 PM. Would that work for you?",
              createdAt: "2024-03-15T11:45:00",
            },
            {
              id: 102,
              from: "client",
              message:
                "Saturday at 2 PM works perfectly. Please send me the address. Also, could you provide information about the HOA fees?",
              createdAt: "2024-03-15T13:20:00",
            },
          ],
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          phone: "(512) 555-5678",
          propertyId: 2,
          propertyTitle: "Downtown Apartment",
          message:
            "I'd like to schedule a viewing for the Downtown Apartment. I'm available on weekdays after 5pm. Please let me know what times work best.",
          status: "read",
          createdAt: "2024-03-15T09:15:00",
          preferredContact: "phone",
          replies: [],
        },
        {
          id: 3,
          name: "Michael Chen",
          email: "michael.c@example.com",
          phone: "(720) 555-9012",
          propertyId: 3,
          propertyTitle: "Suburban Family Home",
          message:
            "What's the HOA fee for this property? Also, are there any upcoming assessments? We're a family of 4 and love the location.",
          status: "replied",
          createdAt: "2024-03-14T16:45:00",
          preferredContact: "email",
          replies: [
            {
              id: 301,
              from: "admin",
              message:
                "The HOA fee is $150/month which covers community pool, playground, and landscaping. No upcoming assessments are planned. Would you like to schedule a viewing?",
              createdAt: "2024-03-14T17:30:00",
            },
          ],
        },
        {
          id: 4,
          name: "Emily Rodriguez",
          email: "emily.r@example.com",
          phone: "(206) 555-3456",
          propertyId: 4,
          propertyTitle: "Beachfront Condo",
          message:
            "Is this property still available? We're relocating from out of state and would love to do a virtual tour if possible.",
          status: "unread",
          createdAt: "2024-03-14T14:20:00",
          preferredContact: "video",
          replies: [],
        },
        {
          id: 5,
          name: "David Thompson",
          email: "david.t@example.com",
          phone: "(312) 555-7890",
          propertyId: null,
          propertyTitle: "General Inquiry",
          message:
            "I'm looking to sell my property and would like to get a valuation. Can your team help with this? Please provide information about your services.",
          status: "replied",
          createdAt: "2024-03-13T11:30:00",
          preferredContact: "email",
          replies: [
            {
              id: 501,
              from: "admin",
              message:
                "Absolutely! We offer free property valuations. Could you share the address and some details about your property? We'll get back to you within 24 hours with a comprehensive market analysis.",
              createdAt: "2024-03-13T14:15:00",
            },
          ],
        },
      ];

      setMessages(mockMessages);
      setFilteredMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = [...messages];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (m.propertyTitle &&
            m.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((m) => m.status === filterStatus);
    }

    // Filter by property
    if (filterProperty !== "all") {
      if (filterProperty === "general") {
        filtered = filtered.filter((m) => m.propertyId === null);
      } else {
        filtered = filtered.filter(
          (m) => m.propertyId === parseInt(filterProperty),
        );
      }
    }

    setFilteredMessages(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterProperty, messages]);

  const handleMarkAsRead = (id) => {
    setTimeout(() => {
      const updatedMessages = messages.map((m) =>
        m.id === id ? { ...m, status: "read" } : m,
      );
      setMessages(updatedMessages);
    }, 500);
  };

  const handleMarkAsUnread = (id) => {
    setTimeout(() => {
      const updatedMessages = messages.map((m) =>
        m.id === id ? { ...m, status: "unread" } : m,
      );
      setMessages(updatedMessages);
    }, 500);
  };

  const handleReply = () => {
    setTimeout(() => {
      const newReply = {
        id: Date.now(),
        from: "admin",
        message: replyText,
        createdAt: new Date().toISOString(),
      };

      const updatedMessages = messages.map((m) =>
        m.id === selectedMessage.id
          ? {
              ...m,
              status: "replied",
              replies: [...(m.replies || []), newReply],
            }
          : m,
      );

      setMessages(updatedMessages);
      setShowReplyModal(false);
      setReplyText("");
      setSelectedMessage(null);
    }, 500);
  };

  const handleDelete = () => {
    setTimeout(() => {
      const updatedMessages = messages.filter(
        (m) => m.id !== selectedMessage.id,
      );
      setMessages(updatedMessages);
      setShowDeleteModal(false);
      setSelectedMessage(null);
    }, 500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "unread":
        return (
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FiMail className="text-xs" /> Unread
          </span>
        );
      case "read":
        return (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FiCheck className="text-xs" /> Read
          </span>
        );
      case "replied":
        return (
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FiCheckCircle className="text-xs" /> Replied
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

  const getContactPreferenceIcon = (pref) => {
    switch (pref) {
      case "email":
        return <FiMail className="text-blue-600" />;
      case "phone":
        return <FiPhone className="text-green-600" />;
      case "video":
        return <FiVideo className="text-purple-600" />;
      default:
        return <FiMessageSquare className="text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffHours < 24) {
      if (diffHours < 1) {
        const minutes = Math.floor((now - date) / (1000 * 60));
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get unique properties for filter
  const properties = [
    ...new Map(
      messages
        .filter((m) => m.propertyId !== null)
        .map((m) => [
          m.propertyId,
          { id: m.propertyId, title: m.propertyTitle },
        ]),
    ).values(),
  ];

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMessages = filteredMessages.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Stats
  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;
  const totalCount = messages.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Messages</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and respond to contact form submissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Messages
              </p>
              <p className="text-3xl font-bold dark:text-white">{totalCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FiMail className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
              <p className="text-3xl font-bold text-blue-600">{unreadCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FiMail className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Replied
              </p>
              <p className="text-3xl font-bold text-green-600">
                {repliedCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <FiCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>

          {/* Property Filter */}
          <div className="flex items-center gap-2">
            <FiHome className="text-gray-400" />
            <select
              value={filterProperty}
              onChange={(e) => setFilterProperty(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Properties</option>
              <option value="general">General Inquiries</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedMessages.map((message) => (
                <tr
                  key={message.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${
                    message.status === "unread"
                      ? "bg-blue-50/50 dark:bg-blue-900/10"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                        {message.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {message.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {message.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {message.propertyTitle ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {message.propertyTitle}
                        </span>
                        <Link
                          to={`/property/${message.propertyId}`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-700"
                          title="View Property"
                        >
                          <FiExternalLink size={14} />
                        </Link>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        General Inquiry
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 max-w-xs">
                        {message.message}
                      </p>
                      {message.replies?.length > 0 && (
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full whitespace-nowrap">
                          <FiCornerUpRight size={10} />
                          {message.replies.length}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <FiClock className="text-xs" />
                      {formatDate(message.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(message.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedMessage(message);
                          setShowViewModal(true);
                          if (message.status === "unread") {
                            handleMarkAsRead(message.id);
                          }
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                        title="View Details"
                      >
                        <FiMessageSquare className="text-gray-600 dark:text-gray-400" />
                      </button>
                      {message.status === "unread" ? (
                        <button
                          onClick={() => handleMarkAsRead(message.id)}
                          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition"
                          title="Mark as Read"
                        >
                          <FiCheck className="text-blue-600" />
                        </button>
                      ) : message.status === "read" ? (
                        <button
                          onClick={() => handleMarkAsUnread(message.id)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                          title="Mark as Unread"
                        >
                          <FiMail className="text-gray-600 dark:text-gray-400" />
                        </button>
                      ) : null}
                      {message.status !== "replied" && (
                        <button
                          onClick={() => {
                            setSelectedMessage(message);
                            setShowReplyModal(true);
                          }}
                          className="p-2 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition"
                          title="Reply"
                        >
                          <FiCheckCircle className="text-green-600" />
                        </button>
                      )}
                      {message.replies?.length > 0 && (
                        <button
                          onClick={() => {
                            setSelectedMessage(message);
                            setShowReplyHistory(true);
                          }}
                          className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition"
                          title="View Reply History"
                        >
                          <FiCornerUpRight className="text-purple-600" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedMessage(message);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition"
                        title="Delete"
                      >
                        <FiTrash2 className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredMessages.length)} of{" "}
              {filteredMessages.length} messages
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronLeft />
              </button>
              <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                {currentPage}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Message Modal */}
      {showViewModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header  */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold dark:text-white">
                  Message Details
                </h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
              {/* Contact Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedMessage.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold dark:text-white">
                    {selectedMessage.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600"
                    >
                      <FiMail /> {selectedMessage.email}
                    </a>
                    {selectedMessage.phone && (
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600"
                      >
                        <FiPhone /> {selectedMessage.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Property Info with Link */}
              {selectedMessage.propertyTitle && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Regarding Property
                      </p>
                      <p className="text-lg font-semibold dark:text-white">
                        {selectedMessage.propertyTitle}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Property ID: #{selectedMessage.propertyId}
                      </p>
                    </div>
                    <Link
                      to={`/property/${selectedMessage.propertyId}`}
                      target="_blank"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <FiExternalLink /> View Property
                    </Link>
                  </div>
                </div>
              )}

              {/* Original Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Original Message
                </label>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Reply History */}
              {selectedMessage.replies?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Conversation History
                  </label>
                  <div className="space-y-3">
                    {selectedMessage.replies.map((reply, index) => (
                      <div
                        key={reply.id}
                        className={`flex gap-3 ${
                          reply.from === "admin"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            reply.from === "admin"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          <p className="text-sm">{reply.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              reply.from === "admin"
                                ? "text-blue-100"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {reply.from === "admin"
                              ? "You"
                              : selectedMessage.name}{" "}
                            • {formatDate(reply.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Preferred Contact
                  </p>
                  <p className="font-medium dark:text-white capitalize">
                    {selectedMessage.preferredContact}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <div className="mt-1">
                    {getStatusBadge(selectedMessage.status)}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 shrink-0">
              <div className="flex justify-end gap-3">
                {selectedMessage.status !== "replied" && (
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setShowReplyModal(true);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <FiCheckCircle /> Reply
                  </button>
                )}
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply History Modal */}
      {showReplyHistory && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold dark:text-white">
                  Conversation with {selectedMessage.name}
                </h2>
                <button
                  onClick={() => setShowReplyHistory(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {/* Original Message */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                  Original Message • {formatDate(selectedMessage.createdAt)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Replies */}
              {selectedMessage.replies?.map((reply) => (
                <div
                  key={reply.id}
                  className={`flex gap-3 ${
                    reply.from === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      reply.from === "admin"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    <p className="text-sm">{reply.message}</p>
                    <p
                      className={`text-xs mt-2 ${
                        reply.from === "admin"
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {reply.from === "admin" ? "You" : selectedMessage.name} •{" "}
                      {formatDate(reply.createdAt)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Reply Button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setShowReplyHistory(false);
                    setShowReplyModal(true);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                  <FiCheckCircle /> Reply to Thread
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold dark:text-white">
                  Reply to {selectedMessage.name}
                </h2>
                <button
                  onClick={() => {
                    setShowReplyModal(false);
                    setReplyText("");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Original message:
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Previous replies preview */}
              {selectedMessage.replies?.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Previous replies ({selectedMessage.replies.length}):
                  </p>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {selectedMessage.replies.slice(-2).map((reply) => (
                      <p
                        key={reply.id}
                        className="text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 p-2 rounded"
                      >
                        <span className="font-medium">
                          {reply.from === "admin"
                            ? "You"
                            : selectedMessage.name}
                          :
                        </span>{" "}
                        {reply.message}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Reply
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Type your reply here..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowReplyModal(false);
                    setReplyText("");
                  }}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FiCheckCircle /> Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-red-600 text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-center mb-2 dark:text-white">
                Delete Message
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Are you sure you want to delete this message from{" "}
                {selectedMessage.name}? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
