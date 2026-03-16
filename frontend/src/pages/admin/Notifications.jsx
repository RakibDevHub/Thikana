import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiBell,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiFilter,
  FiTrash2,
  FiMessageSquare,
  FiStar,
  FiHome,
  FiUser,
  FiMail,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

const AdminNotifications = () => {
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [typeFilter, setTypeFilter] = useState('all'); // all, message, testimonial, property, system
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const itemsPerPage = 10;

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New message from John Smith',
      description: 'Regarding Modern Luxury Villa - Interested in scheduling a viewing this weekend.',
      time: '2024-03-16T10:30:00',
      read: false,
      link: '/admin/messages/1',
      sender: 'John Smith',
      priority: 'high',
    },
    {
      id: 2,
      type: 'testimonial',
      title: 'New testimonial pending approval',
      description: '5-star review from Sarah Johnson about her experience with our team.',
      time: '2024-03-16T09:15:00',
      read: false,
      link: '/admin/testimonials/2',
      sender: 'Sarah Johnson',
      priority: 'medium',
    },
    {
      id: 3,
      type: 'property',
      title: 'New property added',
      description: 'Beachfront Villa in Cox\'s Bazar has been listed by Property Manager.',
      time: '2024-03-16T08:45:00',
      read: true,
      link: '/admin/properties/3',
      sender: 'System',
      priority: 'low',
    },
    {
      id: 4,
      type: 'message',
      title: 'New message from Michael Chen',
      description: 'Regarding Downtown Apartment - Asked about parking availability.',
      time: '2024-03-15T16:20:00',
      read: true,
      link: '/admin/messages/4',
      sender: 'Michael Chen',
      priority: 'medium',
    },
    {
      id: 5,
      type: 'testimonial',
      title: 'Testimonial approved',
      description: 'Emily Rodriguez\'s testimonial has been approved and published.',
      time: '2024-03-15T14:30:00',
      read: true,
      link: '/admin/testimonials/5',
      sender: 'System',
      priority: 'low',
    },
    {
      id: 6,
      type: 'system',
      title: 'System Update',
      description: 'New software update available. New features added to property management.',
      time: '2024-03-15T11:00:00',
      read: false,
      link: '/admin/settings',
      sender: 'System Admin',
      priority: 'high',
    },
    {
      id: 7,
      type: 'message',
      title: 'New message from Lisa Anderson',
      description: 'Regarding Beachfront Condo - Would like to schedule a virtual tour.',
      time: '2024-03-15T09:45:00',
      read: false,
      link: '/admin/messages/7',
      sender: 'Lisa Anderson',
      priority: 'medium',
    },
    {
      id: 8,
      type: 'property',
      title: 'Property sold',
      description: 'Mountain View Retreat has been marked as sold.',
      time: '2024-03-14T15:30:00',
      read: true,
      link: '/admin/properties/8',
      sender: 'System',
      priority: 'low',
    },
    {
      id: 9,
      type: 'testimonial',
      title: 'New testimonial pending approval',
      description: '4-star review from Robert Martinez about his investment property purchase.',
      time: '2024-03-14T13:20:00',
      read: false,
      link: '/admin/testimonials/9',
      sender: 'Robert Martinez',
      priority: 'medium',
    },
    {
      id: 10,
      type: 'message',
      title: 'New message from Jennifer Walsh',
      description: 'Regarding property selling process - Asked about commission rates.',
      time: '2024-03-14T10:15:00',
      read: true,
      link: '/admin/messages/10',
      sender: 'Jennifer Walsh',
      priority: 'medium',
    },
    {
      id: 11,
      type: 'system',
      title: 'Backup completed',
      description: 'Daily database backup completed successfully.',
      time: '2024-03-14T02:00:00',
      read: true,
      link: '#',
      sender: 'System',
      priority: 'low',
    },
    {
      id: 12,
      type: 'testimonial',
      title: 'Testimonial rejected',
      description: 'A testimonial has been rejected by moderator.',
      time: '2024-03-13T16:45:00',
      read: true,
      link: '/admin/testimonials',
      sender: 'System',
      priority: 'medium',
    },
  ]);

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    // Read/Unread filter
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'read' && !notification.read) return false;
    
    // Type filter
    if (typeFilter !== 'all' && notification.type !== typeFilter) return false;
    
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setSelectedNotifications([]);
    setSelectAll(false);
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    setSelectedNotifications(selectedNotifications.filter(sId => sId !== id));
  };

  const handleDeleteSelected = () => {
    setNotifications(notifications.filter(n => !selectedNotifications.includes(n.id)));
    setSelectedNotifications([]);
    setSelectAll(false);
  };

  const handleSelectNotification = (id) => {
    setSelectedNotifications(prev => {
      if (prev.includes(id)) {
        return prev.filter(sId => sId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(paginatedNotifications.map(n => n.id));
    }
    setSelectAll(!selectAll);
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'message': return <FiMessageSquare className="text-blue-600" />;
      case 'testimonial': return <FiStar className="text-yellow-600" />;
      case 'property': return <FiHome className="text-green-600" />;
      case 'system': return <FiBell className="text-purple-600" />;
      default: return <FiBell className="text-gray-600" />;
    }
  };

  const getTypeBadge = (type) => {
    switch(type) {
      case 'message':
        return <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs">Message</span>;
      case 'testimonial':
        return <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs">Testimonial</span>;
      case 'property':
        return <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs">Property</span>;
      case 'system':
        return <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs">System</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high':
        return <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs">High</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs">Medium</span>;
      case 'low':
        return <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs">Low</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {selectedNotifications.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
            >
              <FiTrash2 size={16} />
              Delete Selected ({selectedNotifications.length})
            </button>
          )}
          
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <FiCheckCircle size={16} />
              Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Read/Unread Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <FiBell className="text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="message">Messages</option>
              <option value="testimonial">Testimonials</option>
              <option value="property">Properties</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Results count */}
          <div className="flex-1 text-right text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {/* Select All Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectAll && paginatedNotifications.length > 0}
              onChange={handleSelectAll}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select All
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {paginatedNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <FiBell size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-lg font-medium dark:text-white mb-2">No notifications found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your filters or check back later
              </p>
            </div>
          ) : (
            paginatedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${
                  !notification.read ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => handleSelectNotification(notification.id)}
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    !notification.read ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {getTypeIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`font-medium ${!notification.read ? 'dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                        
                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                            <FiUser size={12} /> {notification.sender}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                            <FiClock size={12} /> {formatDate(notification.time)}
                          </span>
                          {getTypeBadge(notification.type)}
                          {getPriorityBadge(notification.priority)}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition"
                            title="Mark as read"
                          >
                            <FiCheck size={16} className="text-blue-600" />
                          </button>
                        )}
                        <Link
                          to={notification.link}
                          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition"
                          title="Delete"
                        >
                          <FiTrash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {startIndex + 1} to{' '}
              {Math.min(startIndex + itemsPerPage, filteredNotifications.length)} of{' '}
              {filteredNotifications.length} notifications
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50"
              >
                <FiChevronLeft size={18} />
              </button>
              <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
          <FiBell /> Notification Summary
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-blue-700 dark:text-blue-300">
          <div>
            <p className="font-medium">Total</p>
            <p className="text-lg font-bold">{notifications.length}</p>
          </div>
          <div>
            <p className="font-medium">Unread</p>
            <p className="text-lg font-bold text-red-600">{unreadCount}</p>
          </div>
          <div>
            <p className="font-medium">Messages</p>
            <p className="text-lg font-bold">{notifications.filter(n => n.type === 'message').length}</p>
          </div>
          <div>
            <p className="font-medium">Testimonials</p>
            <p className="text-lg font-bold">{notifications.filter(n => n.type === 'testimonial').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;