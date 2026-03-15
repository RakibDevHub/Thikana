import React, { useState, useEffect } from "react";
import {
  FiUserPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiX,
  FiSave,
} from "react-icons/fi";
import { FaCrown, FaUserTie, FaUserShield } from "react-icons/fa";

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "property_manager",
    status: "active",
    permissions: [],
  });

  const itemsPerPage = 10;

  // Mock data fetch
  useEffect(() => {
    setTimeout(() => {
      const mockAdmins = [
        {
          id: 1,
          name: "John Administrator",
          email: "john@thikana.com",
          phone: "(212) 555-1234",
          role: "super_admin",
          status: "active",
          lastLogin: "2024-03-15T10:30:00",
          createdAt: "2024-01-01",
          permissions: ["all"],
          avatar: null,
        },
        {
          id: 2,
          name: "Sarah Manager",
          email: "sarah@thikana.com",
          phone: "(212) 555-5678",
          role: "property_manager",
          status: "active",
          lastLogin: "2024-03-15T09:15:00",
          createdAt: "2024-01-15",
          permissions: ["properties.create", "properties.edit", "properties.delete", "properties.view"],
          avatar: null,
        },
        {
          id: 3,
          name: "Michael Moderator",
          email: "michael@thikana.com",
          phone: "(212) 555-9012",
          role: "moderator",
          status: "active",
          lastLogin: "2024-03-14T16:45:00",
          createdAt: "2024-02-01",
          permissions: ["testimonials.approve", "testimonials.reject", "messages.view", "messages.reply"],
          avatar: null,
        },
        {
          id: 4,
          name: "Emily Support",
          email: "emily@thikana.com",
          phone: "(212) 555-3456",
          role: "support",
          status: "inactive",
          lastLogin: "2024-03-10T14:20:00",
          createdAt: "2024-02-15",
          permissions: ["messages.view", "messages.reply"],
          avatar: null,
        },
        {
          id: 5,
          name: "David Agent",
          email: "david@thikana.com",
          phone: "(212) 555-7890",
          role: "property_manager",
          status: "active",
          lastLogin: "2024-03-13T11:30:00",
          createdAt: "2024-02-20",
          permissions: ["properties.create", "properties.edit", "properties.view"],
          avatar: null,
        },
        {
          id: 6,
          name: "Lisa Reviewer",
          email: "lisa@thikana.com",
          phone: "(212) 555-2345",
          role: "moderator",
          status: "suspended",
          lastLogin: "2024-03-09T09:45:00",
          createdAt: "2024-03-01",
          permissions: ["testimonials.approve", "testimonials.reject"],
          avatar: null,
        },
      ];

      setAdmins(mockAdmins);
      setFilteredAdmins(mockAdmins);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = [...admins];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.role.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by role
    if (filterRole !== "all") {
      filtered = filtered.filter((a) => a.role === filterRole);
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((a) => a.status === filterStatus);
    }

    setFilteredAdmins(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterRole, filterStatus, admins]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePermissionToggle = (permission) => {
    const currentPermissions = [...formData.permissions];
    const index = currentPermissions.indexOf(permission);
    
    if (index === -1) {
      currentPermissions.push(permission);
    } else {
      currentPermissions.splice(index, 1);
    }
    
    setFormData({
      ...formData,
      permissions: currentPermissions,
    });
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      const newAdmin = {
        id: admins.length + 1,
        ...formData,
        lastLogin: null,
        createdAt: new Date().toISOString().split("T")[0],
        avatar: null,
      };
      setAdmins([newAdmin, ...admins]);
      setShowAddModal(false);
      resetForm();
    }, 1000);
  };

  const handleEditAdmin = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      const updatedAdmins = admins.map((a) =>
        a.id === selectedAdmin.id ? { ...a, ...formData } : a,
      );
      setAdmins(updatedAdmins);
      setShowEditModal(false);
      setSelectedAdmin(null);
      resetForm();
    }, 1000);
  };

  const handleDeleteAdmin = () => {
    // Simulate API call
    setTimeout(() => {
      const updatedAdmins = admins.filter((a) => a.id !== selectedAdmin.id);
      setAdmins(updatedAdmins);
      setShowDeleteModal(false);
      setSelectedAdmin(null);
    }, 1000);
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    // Simulate API call
    setTimeout(() => {
      const updatedAdmins = admins.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a,
      );
      setAdmins(updatedAdmins);
    }, 500);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "property_manager",
      status: "active",
      permissions: [],
    });
  };

  const openEditModal = (admin) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone || "",
      role: admin.role,
      status: admin.status,
      permissions: admin.permissions,
    });
    setShowEditModal(true);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "super_admin":
        return <FaCrown className="text-yellow-500" />;
      case "property_manager":
        return <FaUserTie className="text-blue-500" />;
      case "moderator":
        return <FaUserShield className="text-green-500" />;
      default:
        return <FiUser className="text-gray-500" />;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "super_admin":
        return (
          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FaCrown className="text-xs" /> Super Admin
          </span>
        );
      case "property_manager":
        return (
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FaUserTie className="text-xs" /> Property Manager
          </span>
        );
      case "moderator":
        return (
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FaUserShield className="text-xs" /> Moderator
          </span>
        );
      case "support":
        return (
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FiUser className="text-xs" /> Support
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
            {role}
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FiCheckCircle className="text-xs" /> Active
          </span>
        );
      case "inactive":
        return (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FiClock className="text-xs" /> Inactive
          </span>
        );
      case "suspended":
        return (
          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <FiXCircle className="text-xs" /> Suspended
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
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      if (diffHours < 1) {
        const minutes = Math.floor((now - date) / (1000 * 60));
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const rolePermissions = {
    super_admin: [
      { id: "all", label: "Full Access (All Permissions)" },
    ],
    property_manager: [
      { id: "properties.create", label: "Create Properties" },
      { id: "properties.edit", label: "Edit Properties" },
      { id: "properties.delete", label: "Delete Properties" },
      { id: "properties.view", label: "View Properties" },
    ],
    moderator: [
      { id: "testimonials.approve", label: "Approve Testimonials" },
      { id: "testimonials.reject", label: "Reject Testimonials" },
      { id: "messages.view", label: "View Messages" },
      { id: "messages.reply", label: "Reply to Messages" },
    ],
    support: [
      { id: "messages.view", label: "View Messages" },
      { id: "messages.reply", label: "Reply to Messages" },
    ],
  };

  // Pagination
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAdmins = filteredAdmins.slice(
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Admin Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage administrator accounts and permissions
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FiUserPlus /> Add New Admin
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="property_manager">Property Manager</option>
              <option value="moderator">Moderator</option>
              <option value="support">Support</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FiShield className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedAdmins.map((admin) => (
                <tr
                  key={admin.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                        {admin.avatar ? (
                          <img
                            src={admin.avatar}
                            alt={admin.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          admin.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {admin.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {admin.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(admin.role)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(admin.status)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(admin.lastLogin)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setShowViewModal(true);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                        title="View Details"
                      >
                        <FiEye className="text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => openEditModal(admin)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                        title="Edit"
                      >
                        <FiEdit2 className="text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(admin.id, admin.status)}
                        className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition ${
                          admin.status === "active" ? "text-yellow-600" : "text-green-600"
                        }`}
                        title={admin.status === "active" ? "Deactivate" : "Activate"}
                      >
                        {admin.status === "active" ? <FiClock /> : <FiCheckCircle />}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAdmin(admin);
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
              {Math.min(startIndex + itemsPerPage, filteredAdmins.length)} of{" "}
              {filteredAdmins.length} admins
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

      {/* View Admin Modal */}
      {showViewModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FiUser className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">Admin Details</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      View administrator information and permissions
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                  {selectedAdmin.avatar ? (
                    <img
                      src={selectedAdmin.avatar}
                      alt={selectedAdmin.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    selectedAdmin.name.charAt(0)
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold dark:text-white">{selectedAdmin.name}</h3>
                    {getRoleBadge(selectedAdmin.role)}
                    {getStatusBadge(selectedAdmin.status)}
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                    <a href={`mailto:${selectedAdmin.email}`} className="hover:text-blue-600 flex items-center gap-1">
                      <FiMail className="text-sm" /> {selectedAdmin.email}
                    </a>
                    {selectedAdmin.phone && (
                      <a href={`tel:${selectedAdmin.phone}`} className="hover:text-blue-600 flex items-center gap-1">
                        <FiPhone className="text-sm" /> {selectedAdmin.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Activity Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Login</p>
                  <p className="text-lg font-semibold dark:text-white">
                    {selectedAdmin.lastLogin ? new Date(selectedAdmin.lastLogin).toLocaleString() : "Never"}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Member Since</p>
                  <p className="text-lg font-semibold dark:text-white">
                    {new Date(selectedAdmin.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Permissions</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                  {selectedAdmin.permissions.includes("all") ? (
                    <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                      <FaCrown />
                      <span className="font-medium">Full Access (Super Admin)</span>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {selectedAdmin.permissions.map((perm, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <FiCheckCircle className="text-green-500 text-sm" />
                          {perm.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    openEditModal(selectedAdmin);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <FiEdit2 /> Edit Admin
                </button>
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

      {/* Add/Edit Admin Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    {showAddModal ? <FiUserPlus className="text-blue-600 text-xl" /> : <FiEdit2 className="text-blue-600 text-xl" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">
                      {showAddModal ? "Add New Admin" : "Edit Admin"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {showAddModal ? "Create a new administrator account" : "Update administrator information"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={showAddModal ? handleAddAdmin : handleEditAdmin} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  {showAddModal && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Temporary Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        required
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Role & Status */}
              <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Role & Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="property_manager">Property Manager</option>
                      <option value="moderator">Moderator</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              {formData.role !== "super_admin" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Permissions</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                    <div className="space-y-2">
                      {rolePermissions[formData.role]?.map((perm) => (
                        <label key={perm.id} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(perm.id)}
                            onChange={() => handlePermissionToggle(perm.id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{perm.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <FiSave />
                  {showAddModal ? "Create Admin" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-red-600 text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-center mb-2 dark:text-white">
                Delete Admin
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Are you sure you want to delete <span className="font-semibold">{selectedAdmin.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAdmin}
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

export default AdminManagement;