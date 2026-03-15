import React, { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiStar,
  FiEye,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiMessageSquare,
  FiX,
  FiCheck,
  FiAward,
} from "react-icons/fi";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalImageError, setModalImageError] = useState(false);

  const itemsPerPage = 10;

  // Mock data fetch
  useEffect(() => {
    setTimeout(() => {
      const mockTestimonials = [
        {
          id: 1,
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          phone: "(305) 555-1234",
          location: "Miami, FL",
          rating: 5,
          content: "Thikana made my dream of owning a home come true! Their team guided me through every step, and I couldn't be happier with my new condo. The process was smooth, transparent, and stress-free.",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          status: "approved",
          featured: true,
          createdAt: "2024-03-15",
          propertyType: "Condo",
        },
        {
          id: 2,
          name: "Michael Chen",
          email: "michael.c@example.com",
          phone: "(512) 555-5678",
          location: "Austin, TX",
          rating: 5,
          content: "As an investor, I need a team that understands the market. Thikana exceeded my expectations and helped me find amazing investment properties. Their market analysis is spot-on.",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          status: "approved",
          featured: true,
          createdAt: "2024-03-10",
          propertyType: "Investment Property",
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          email: "emily.r@example.com",
          phone: "(720) 555-9012",
          location: "Denver, CO",
          rating: 4,
          content: "We found our perfect family home through Thikana. The process was smooth, and their agents were incredibly patient with all our questions. Highly recommended!",
          image: "https://randomuser.me/api/portraits/women/63.jpg",
          status: "pending",
          featured: false,
          createdAt: "2024-03-05",
          propertyType: "Family Home",
        },
        {
          id: 4,
          name: "David Thompson",
          email: "david.t@example.com",
          phone: "(206) 555-3456",
          location: "Seattle, WA",
          rating: 5,
          content: "Sold my property in record time! Thikana's marketing strategy and negotiation skills got me an excellent deal. I couldn't have asked for a better experience.",
          image: "https://randomuser.me/api/portraits/men/75.jpg",
          status: "approved",
          featured: true,
          createdAt: "2024-01-28",
          propertyType: "Single Family",
        },
        {
          id: 5,
          name: "Lisa Anderson",
          email: "lisa.a@example.com",
          phone: "(312) 555-7890",
          location: "Chicago, IL",
          rating: 5,
          content: "When looking for a luxury property, you need an agency that understands quality. Thikana delivered beyond expectations. Their attention to detail is impressive.",
          image: "https://randomuser.me/api/portraits/women/90.jpg",
          status: "approved",
          featured: false,
          createdAt: "2024-01-20",
          propertyType: "Luxury Home",
        },
        {
          id: 6,
          name: "Robert Martinez",
          email: "robert.m@example.com",
          phone: "(602) 555-2345",
          location: "Phoenix, AZ",
          rating: 4,
          content: "As a new investor, I was nervous. The team at Thikana guided me through my first purchase and helped me understand the market. Great experience!",
          image: "https://randomuser.me/api/portraits/men/52.jpg",
          status: "pending",
          featured: false,
          createdAt: "2024-01-15",
          propertyType: "Investment Property",
        },
        {
          id: 7,
          name: "Jennifer Walsh",
          email: "jennifer.w@example.com",
          phone: "(617) 555-6789",
          location: "Boston, MA",
          rating: 5,
          content: "Thikana made selling my home easy. From staging to closing, everything was handled professionally. Got above asking price!",
          image: "https://randomuser.me/api/portraits/women/17.jpg",
          status: "rejected",
          featured: false,
          createdAt: "2024-01-08",
          propertyType: "Condo",
        },
        {
          id: 8,
          name: "William Taylor",
          email: "william.t@example.com",
          phone: "(503) 555-4567",
          location: "Portland, OR",
          rating: 5,
          content: "Working with Thikana's property management team has been fantastic. They're responsive, professional, and really care about their clients.",
          image: "https://randomuser.me/api/portraits/men/22.jpg",
          status: "approved",
          featured: true,
          createdAt: "2024-01-02",
          propertyType: "Property Management",
        },
        {
          id: 9,
          name: "Amanda Foster",
          email: "amanda.f@example.com",
          phone: "(615) 555-8901",
          location: "Nashville, TN",
          rating: 4,
          content: "Moved from out of state and Thikana helped me find the perfect home remotely. The virtual tours and detailed information made all the difference.",
          image: "https://randomuser.me/api/portraits/women/55.jpg",
          status: "pending",
          featured: false,
          createdAt: "2023-12-20",
          propertyType: "Relocation",
        },
        {
          id: 10,
          name: "Kevin Park",
          email: "kevin.p@example.com",
          phone: "(415) 555-1234",
          location: "San Francisco, CA",
          rating: 5,
          content: "Exceptional service from start to finish. The team went above and beyond to help us find our dream home in a competitive market.",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
          status: "pending",
          featured: false,
          createdAt: "2023-12-15",
          propertyType: "Single Family",
        },
      ];

      setTestimonials(mockTestimonials);
      setFilteredTestimonials(mockTestimonials);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = [...testimonials];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((t) => t.status === filterStatus);
    }

    // Filter by rating
    if (filterRating !== "all") {
      filtered = filtered.filter((t) => t.rating === parseInt(filterRating));
    }

    setFilteredTestimonials(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterRating, testimonials]);

  const handleApprove = (id) => {
    setTimeout(() => {
      const updatedTestimonials = testimonials.map((t) =>
        t.id === id ? { ...t, status: "approved" } : t,
      );
      setTestimonials(updatedTestimonials);
    }, 500);
  };

  const handleReject = (id) => {
    setTimeout(() => {
      const updatedTestimonials = testimonials.map((t) =>
        t.id === id ? { ...t, status: "rejected" } : t,
      );
      setTestimonials(updatedTestimonials);
    }, 500);
  };

  const handleFeature = (id) => {
    setTimeout(() => {
      const updatedTestimonials = testimonials.map((t) =>
        t.id === id ? { ...t, featured: !t.featured } : t,
      );
      setTestimonials(updatedTestimonials);
    }, 500);
  };

  const handleDelete = () => {
    setTimeout(() => {
      const updatedTestimonials = testimonials.filter(
        (t) => t.id !== selectedTestimonial.id,
      );
      setTestimonials(updatedTestimonials);
      setShowDeleteModal(false);
      setSelectedTestimonial(null);
    }, 500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FiCheckCircle className="text-xs" /> Approved
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FiClock className="text-xs" /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FiXCircle className="text-xs" /> Rejected
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

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`text-sm ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  // Pagination
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTestimonials = filteredTestimonials.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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
        <h1 className="text-2xl font-bold dark:text-white">Testimonials</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Moderate and manage client testimonials
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search testimonials..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <FiStar className="text-gray-400" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Testimonials Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Testimonial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedTestimonials.map((testimonial) => (
                <tr
                  key={testimonial.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                        {testimonial.image ? (
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          testimonial.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRatingStars(testimonial.rating)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 max-w-xs">
                      "{testimonial.content}"
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(testimonial.status)}
                  </td>
                  <td className="px-6 py-4">
                    {testimonial.featured ? (
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-600 text-xs">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedTestimonial(testimonial);
                          setShowViewModal(true);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                        title="View Details"
                      >
                        <FiEye className="text-gray-600 dark:text-gray-400" />
                      </button>
                      {testimonial.status !== "approved" && (
                        <button
                          onClick={() => handleApprove(testimonial.id)}
                          className="p-2 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition"
                          title="Approve"
                        >
                          <FiCheckCircle className="text-green-600" />
                        </button>
                      )}
                      {testimonial.status !== "rejected" && (
                        <button
                          onClick={() => handleReject(testimonial.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition"
                          title="Reject"
                        >
                          <FiXCircle className="text-red-600" />
                        </button>
                      )}
                      <button
                        onClick={() => handleFeature(testimonial.id)}
                        className={`p-2 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition ${
                          testimonial.featured ? "text-purple-600" : "text-gray-600 dark:text-gray-400"
                        }`}
                        title={testimonial.featured ? "Remove Featured" : "Mark as Featured"}
                      >
                        <FiStar className={testimonial.featured ? "fill-purple-600" : ""} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTestimonial(testimonial);
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
              {Math.min(startIndex + itemsPerPage, filteredTestimonials.length)} of{" "}
              {filteredTestimonials.length} testimonials
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
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Testimonial Modal */}
      {showViewModal && selectedTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FiMessageSquare className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">Testimonial Details</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Review and manage client feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
              {/* Client Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                    {selectedTestimonial.image && !modalImageError ? (
                      <img
                        src={selectedTestimonial.image}
                        alt={selectedTestimonial.name}
                        className="w-full h-full object-cover"
                        onError={() => setModalImageError(true)}
                      />
                    ) : (
                      selectedTestimonial.name.charAt(0)
                    )}
                  </div>
                  {selectedTestimonial.featured && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white border-4 border-white dark:border-gray-800">
                      <FiAward size={14} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold dark:text-white">{selectedTestimonial.name}</h3>
                    {getStatusBadge(selectedTestimonial.status)}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <FiMapPin className="text-sm" /> {selectedTestimonial.location}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {getRatingStars(selectedTestimonial.rating)}
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        ({selectedTestimonial.rating}/5)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <FiCalendar className="text-xs" />
                      {new Date(selectedTestimonial.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <FiMail className="text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</span>
                  </div>
                  <a
                    href={`mailto:${selectedTestimonial.email}`}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 break-all ml-11"
                  >
                    {selectedTestimonial.email}
                  </a>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <FiPhone className="text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</span>
                  </div>
                  <a
                    href={`tel:${selectedTestimonial.phone}`}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 ml-11"
                  >
                    {selectedTestimonial.phone}
                  </a>
                </div>
              </div>

              {/* Property Type Card */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <FiAward className="text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Property Type</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 font-medium ml-11">
                  {selectedTestimonial.propertyType}
                </p>
              </div>

              {/* Testimonial Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Testimonial Content
                </label>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    "{selectedTestimonial.content}"
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</p>
                <div className="flex flex-wrap gap-3">
                  {selectedTestimonial.status !== "approved" && (
                    <button
                      onClick={() => {
                        handleApprove(selectedTestimonial.id);
                        setShowViewModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    >
                      <FiCheckCircle /> Approve Testimonial
                    </button>
                  )}
                  {selectedTestimonial.status !== "rejected" && (
                    <button
                      onClick={() => {
                        handleReject(selectedTestimonial.id);
                        setShowViewModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                    >
                      <FiXCircle /> Reject Testimonial
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleFeature(selectedTestimonial.id);
                    }}
                    className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                      selectedTestimonial.featured
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <FiStar className={selectedTestimonial.featured ? 'fill-purple-600' : ''} />
                    {selectedTestimonial.featured ? 'Remove Featured' : 'Mark as Featured'}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 shrink-0">
              <div className="flex justify-end gap-3">
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-red-600 text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-center mb-2 dark:text-white">
                Delete Testimonial
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Are you sure you want to delete <span className="font-semibold">{selectedTestimonial.name}</span>'s testimonial? This action cannot be undone.
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

export default AdminTestimonials;