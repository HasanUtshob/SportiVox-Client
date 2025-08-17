import React, { useState, useEffect, useContext } from "react";
import {
  FaBars,
  FaTimes,
  FaBell,
  FaSearch,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaBullhorn,
  FaEye,
  FaCalendarAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { MdDashboard, MdHome, MdNotifications } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import moment from "moment";
import { Themecontext } from "../../Context/ThemeContext";

const DashboardNavbar = ({ sidebarOpen, toggleSidebar }) => {
  const { darkmode, setDarkmode } = useContext(Themecontext);
  const { user, SignOut, userData } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  // Function to mark notifications as read
  const markNotificationsAsRead = () => {
    setUnreadCount(0);
    // Store in localStorage that user has viewed notifications
    localStorage.setItem("lastNotificationView", new Date().toISOString());
  };

  // Function to handle notification dropdown toggle
  const handleNotificationToggle = () => {
    const newState = !notificationOpen;
    setNotificationOpen(newState);

    // If opening the dropdown and there are unread notifications, mark them as read
    if (newState && unreadCount > 0) {
      markNotificationsAsRead();
    }
  };

  // Function to handle notification click
  const handleNotificationClick = () => {
    // Mark notifications as read when clicking on any notification
    if (unreadCount > 0) {
      markNotificationsAsRead();
    }
    navigate("/announcements");
    setNotificationOpen(false);
  };

  // Function to handle "View All Announcements" click
  const handleViewAllClick = () => {
    // Mark notifications as read when viewing all announcements
    if (unreadCount > 0) {
      markNotificationsAsRead();
    }
    navigate("/announcements");
    setNotificationOpen(false);
  };

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/announcements");
        const recentNotifications = res.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5); // Get latest 5 notifications

        setNotifications(recentNotifications);

        // Get last notification view time from localStorage
        const lastViewTime = localStorage.getItem("lastNotificationView");
        const lastViewDate = lastViewTime ? new Date(lastViewTime) : null;

        // Calculate unread notifications based on last view time or 24 hours
        let unread = 0;
        if (lastViewDate) {
          // Count notifications newer than last view time
          unread = recentNotifications.filter(
            (notification) => new Date(notification.date) > lastViewDate
          ).length;
        } else {
          // Fallback: notifications from last 24 hours
          const oneDayAgo = moment().subtract(1, "day");
          unread = recentNotifications.filter((notification) =>
            moment(notification.date).isAfter(oneDayAgo)
          ).length;
        }

        setUnreadCount(unread);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Refresh notifications every 2 minutes for better real-time experience
    const interval = setInterval(fetchNotifications, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [axiosSecure]);

  // Check for unread notifications on component mount
  useEffect(() => {
    const checkUnreadNotifications = () => {
      const lastViewTime = localStorage.getItem("lastNotificationView");
      if (!lastViewTime && notifications.length > 0) {
        // First time user - show notifications from last 24 hours
        const oneDayAgo = moment().subtract(1, "day");
        const unread = notifications.filter((notification) =>
          moment(notification.date).isAfter(oneDayAgo)
        ).length;
        setUnreadCount(unread);
      }
    };

    checkUnreadNotifications();
  }, [notifications]);

  // Generate breadcrumb from current path
  const generateBreadcrumb = () => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment);
    const breadcrumbs = [{ name: "Dashboard", path: "/dashboard" }];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const formattedName = segment
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      breadcrumbs.push({ name: formattedName, path: currentPath });
    });

    return breadcrumbs;
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      background: darkmode ? "#1f2937" : "#ffffff",
      color: darkmode ? "#f9fafb" : "#111827",
      customClass: {
        popup: darkmode ? "dark-popup" : "",
        title: darkmode ? "dark-title" : "",
        content: darkmode ? "dark-content" : "",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        SignOut().then(() => {
          Swal.fire({
            icon: "success",
            title: "Successfully logged out",
            timer: 1500,
            showConfirmButton: false,
            position: "top-end",
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
            customClass: {
              popup: darkmode ? "dark-popup" : "",
              title: darkmode ? "dark-title" : "",
              content: darkmode ? "dark-content" : "",
            },
          });
          navigate("/");
        });
      }
    });
  };

  const breadcrumbs = generateBreadcrumb();

  return (
    <header
      className={`${
        darkmode
          ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-gray-600/30"
          : "bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 border-white/10"
      } shadow-lg sticky top-0 z-30 border-b`}
    >
      <div className="flex justify-between items-center px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className={`block md:hidden text-white p-2 rounded-lg ${
              darkmode ? "hover:bg-gray-600/50" : "hover:bg-white/10"
            } transition-all duration-200 transform hover:scale-105`}
          >
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Breadcrumb Navigation */}
          <nav className="hidden sm:flex items-center space-x-2 text-sm">
            <MdHome className="text-blue-400" />
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.path}>
                {index > 0 && (
                  <span
                    className={`${
                      darkmode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    /
                  </span>
                )}
                <button
                  onClick={() => navigate(crumb.path)}
                  className={`px-2 py-1 rounded transition-colors duration-200 ${
                    index === breadcrumbs.length - 1
                      ? "text-white font-semibold"
                      : `${
                          darkmode
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-gray-300 hover:text-white"
                        }`
                  }`}
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Center Section - Search */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <FaSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkmode ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 ${
                darkmode
                  ? "bg-gray-700/50 border-gray-600/50 text-gray-200 placeholder-gray-500 focus:ring-blue-400"
                  : "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-blue-500"
              } border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Time Display */}
          <div
            className={`md:block text-sm ${
              darkmode ? "text-gray-400" : "text-gray-300"
            }`}
          >
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={handleNotificationToggle}
              className={`relative p-2 ${
                darkmode
                  ? "text-gray-400 hover:text-gray-200 hover:bg-gray-600/50"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              } rounded-lg transition-all duration-200 transform hover:scale-105`}
            >
              <FaBell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div
                className={`absolute right-0 mt-2 w-80 ${
                  darkmode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } rounded-lg shadow-xl border py-2 z-50 max-h-96 overflow-y-auto`}
              >
                <div
                  className={`px-4 py-3 ${
                    darkmode ? "border-gray-700" : "border-gray-100"
                  } border-b`}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-sm font-semibold ${
                        darkmode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Notifications
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs ${
                          darkmode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {unreadCount} new
                      </span>
                      {unreadCount > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markNotificationsAsRead();
                          }}
                          className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                            darkmode
                              ? "text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                              : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          }`}
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="px-4 py-6 text-center">
                    <div
                      className={`animate-spin rounded-full h-6 w-6 border-b-2 mx-auto ${
                        darkmode ? "border-blue-400" : "border-blue-600"
                      }`}
                    ></div>
                    <p
                      className={`text-sm mt-2 ${
                        darkmode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Loading...
                    </p>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center">
                    <FaBell
                      className={`text-2xl mx-auto mb-2 ${
                        darkmode ? "text-gray-600" : "text-gray-300"
                      }`}
                    />
                    <p
                      className={`text-sm ${
                        darkmode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      No notifications
                    </p>
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification._id}
                        className={`px-4 py-3 cursor-pointer transition-colors ${
                          darkmode
                            ? "hover:bg-gray-700/50 border-gray-700"
                            : "hover:bg-gray-50 border-gray-100"
                        } border-b last:border-b-0 ${
                          moment(notification.date).isAfter(
                            moment().subtract(1, "day")
                          )
                            ? darkmode
                              ? "bg-blue-900/20"
                              : "bg-blue-50"
                            : ""
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <FaBullhorn className="text-blue-500 text-sm mt-1" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium truncate ${
                                darkmode ? "text-gray-100" : "text-gray-900"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p
                              className={`text-xs mt-1 line-clamp-2 ${
                                darkmode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {notification.message ||
                                notification.description ||
                                (notification.content
                                  ? notification.content.substring(0, 100) +
                                    "..."
                                  : "Click to view announcement details")}
                            </p>
                            <div
                              className={`flex items-center mt-2 text-xs ${
                                darkmode ? "text-gray-500" : "text-gray-400"
                              }`}
                            >
                              <FaCalendarAlt className="mr-1" />
                              {moment(notification.date).fromNow()}
                            </div>
                          </div>
                          {moment(notification.date).isAfter(
                            moment().subtract(1, "day")
                          ) && (
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`px-4 py-3 ${
                    darkmode ? "border-gray-700" : "border-gray-100"
                  } border-t`}
                >
                  <button
                    onClick={handleViewAllClick}
                    className={`w-full text-center text-sm font-medium ${
                      darkmode
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-800"
                    }`}
                  >
                    View All Announcements
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                darkmode ? "hover:bg-gray-600/50" : "hover:bg-white/10"
              } transition-all duration-200 transform hover:scale-105`}
            >
              <img
                src={user?.photoURL || "https://via.placeholder.com/32"}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-blue-400 object-cover"
              />
              <div className="hidden sm:block text-left">
                <p className="text-white font-medium text-sm truncate max-w-32">
                  {user?.displayName || "User"}
                </p>
                <p
                  className={`text-xs capitalize ${
                    darkmode ? "text-gray-400" : "text-gray-400"
                  }`}
                >
                  {userData?.role || "Member"}
                </p>
              </div>
              <FaChevronDown
                className={`transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                } ${darkmode ? "text-gray-500" : "text-gray-400"}`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-56 ${
                  darkmode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } rounded-lg shadow-xl border py-2 z-50`}
              >
                <div
                  className={`px-4 py-3 ${
                    darkmode ? "border-gray-700" : "border-gray-100"
                  } border-b`}
                >
                  <p
                    className={`text-sm font-medium truncate ${
                      darkmode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {user?.displayName || "User"}
                  </p>
                  <p
                    className={`text-sm truncate ${
                      darkmode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {user?.email}
                  </p>
                </div>

                <button
                  onClick={() => {
                    navigate("/My_Profile");
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200 ${
                    darkmode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-gray-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FaUser
                    className={`${
                      darkmode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    setDarkmode(!darkmode);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200 ${
                    darkmode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-gray-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {darkmode ? (
                    <FaSun
                      className={`${
                        darkmode ? "text-yellow-400" : "text-gray-400"
                      }`}
                    />
                  ) : (
                    <FaMoon
                      className={`${
                        darkmode ? "text-gray-500" : "text-gray-600"
                      }`}
                    />
                  )}
                  {darkmode ? "Light Mode" : "Dark Mode"}
                </button>
                <hr
                  className={`my-2 ${
                    darkmode ? "border-gray-700" : "border-gray-200"
                  }`}
                />

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200 ${
                    darkmode
                      ? "text-red-400 hover:bg-red-900/30 hover:text-red-300"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                >
                  <FaSignOutAlt className="text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative">
          <FaSearch
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              darkmode ? "text-gray-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 ${
              darkmode
                ? "bg-gray-700/50 border-gray-600/50 text-gray-200 placeholder-gray-500 focus:ring-blue-400"
                : "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-blue-500"
            } border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
          />
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
      {notificationOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setNotificationOpen(false)}
        />
      )}
    </header>
  );
};

export default DashboardNavbar;
