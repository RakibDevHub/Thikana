import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiCheck, FiCheckCircle } from 'react-icons/fi';

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New message from John Smith',
      description: 'Regarding Modern Luxury Villa',
      time: '5 minutes ago',
      read: false,
      link: '/admin/messages',
    },
    {
      id: 2,
      type: 'testimonial',
      title: 'New testimonial pending approval',
      description: 'From Sarah Johnson - 5 stars',
      time: '1 hour ago',
      read: false,
      link: '/admin/testimonials',
    },
    {
      id: 3,
      type: 'property',
      title: 'New property added',
      description: 'Beachfront Villa in Cox\'s Bazar',
      time: '3 hours ago',
      read: true,
      link: '/admin/properties',
    },
    {
      id: 4,
      type: 'message',
      title: 'New message from Michael Chen',
      description: 'Regarding Downtown Apartment',
      time: '1 day ago',
      read: true,
      link: '/admin/messages',
    },
    {
      id: 5,
      type: 'testimonial',
      title: 'Testimonial approved',
      description: 'From Emily Rodriguez',
      time: '2 days ago',
      read: true,
      link: '/admin/testimonials',
    },
  ]);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'message': return '💬';
      case 'testimonial': return '⭐';
      case 'property': return '🏠';
      default: return '📌';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'message': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'testimonial': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'property': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        ref={buttonRef}
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition relative"
        aria-label="Notifications"
      >
        <FiBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <FiCheck size={14} /> Mark all as read
                </button>
              )}
            </div>
            {unreadCount > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FiBell size={32} className="mx-auto mb-2 opacity-30" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Link
                  key={notification.id}
                  to={notification.link}
                  onClick={() => {
                    markAsRead(notification.id);
                    setShowNotifications(false);
                  }}
                  className={`block p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                    !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon with type color */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getTypeColor(notification.type)}`}>
                      <span className="text-sm">{getIcon(notification.type)}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>

                    {/* Unread Dot */}
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
          
          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
            <Link 
              to="/admin/notifications" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => setShowNotifications(false)}
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;