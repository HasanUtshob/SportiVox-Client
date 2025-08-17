// components/DashboardSidebar.jsx
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import { ImProfile } from "react-icons/im";
import { HiUsers } from "react-icons/hi";
import {
  MdManageAccounts,
  MdOutlineHistory,
  MdPendingActions,
  MdVerified,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { GrAnnounce } from "react-icons/gr";
import {
  FaSignOutAlt,
  FaCheckCircle,
  FaUsersCog,
  FaRegBuilding,
  FaRegCalendarCheck,
  FaTags,
  FaCrown,
  FaUser,
} from "react-icons/fa";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Component/Loading";
import { Themecontext } from "../../Context/ThemeContext";

const DashboardSidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { darkmode } = useContext(Themecontext);
  const { SignOut, userData, userDataLoading, user } = useAuth();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    notifications: false,
    bookings: false,
    management: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => {
      // Create a new state where all sections are closed
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // Only open the clicked section if it was previously closed
      newState[section] = !prev[section];

      return newState;
    });
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

  const MenuItem = ({ icon, label, to, badge }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
              : `${
                  darkmode
                    ? "hover:bg-gray-700/50 text-gray-300 hover:text-gray-100"
                    : "hover:bg-white/10 text-gray-300 hover:text-white"
                } hover:transform hover:scale-105`
          }`
        }
        onClick={() => {
          if (window.innerWidth < 768) toggleSidebar();
        }}
      >
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{label}</span>
        {badge && (
          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
            darkmode
              ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20"
              : "bg-gradient-to-r from-blue-400/20 to-purple-400/20"
          }`}
        ></div>
      </NavLink>
    </li>
  );

  const SectionHeader = ({ title, isExpanded, onToggle, icon }) => (
    <div
      className={`flex items-center justify-between px-4 py-2 text-sm font-semibold uppercase tracking-wider cursor-pointer transition-colors duration-200 ${
        darkmode
          ? "text-gray-500 hover:text-gray-300"
          : "text-gray-400 hover:text-white"
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
      {isExpanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
    </div>
  );

  if (userDataLoading) {
    return (
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        } flex items-center justify-center`}
      >
        <Loading message="Loading Dashboard..." variant="minimal" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        } flex items-center justify-center`}
      >
        <div className="text-center py-10 text-red-400 font-semibold">
          User data not found
        </div>
      </div>
    );
  }

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full w-64 ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      } shadow-2xl transform transition-all duration-300 ease-in-out md:static md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div
        className={`p-6 ${
          darkmode ? "border-gray-700/50" : "border-white/10"
        } border-b`}
      >
        <Link
          to="/"
          className={`flex items-center gap-3 text-white transition-colors duration-200 ${
            darkmode ? "hover:text-blue-300" : "hover:text-blue-300"
          }`}
        >
          <div
            className={`w-10 h-10 ${
              darkmode
                ? "bg-gradient-to-r from-blue-600 to-purple-700"
                : "bg-gradient-to-r from-blue-500 to-purple-600"
            } rounded-xl flex items-center justify-center text-xl`}
          >
            🏟️
          </div>
          <span
            className={`text-xl font-bold ${
              darkmode
                ? "bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            }`}
          >
            SportiVox
          </span>
        </Link>
      </div>

      {/* User Profile Section */}
      <div
        className={`p-6 ${
          darkmode ? "border-gray-700/50" : "border-white/10"
        } border-b`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user?.photoURL || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-blue-400 object-cover"
            />
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 ${
                darkmode ? "border-gray-900" : "border-slate-900"
              }`}
            ></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold truncate">
              {user?.displayName || "User"}
            </p>
            <div className="flex items-center gap-1">
              {userData?.role === "admin" ? (
                <FaCrown className="text-yellow-400 text-xs" />
              ) : (
                <FaUser className="text-blue-400 text-xs" />
              )}
              <span
                className={`text-xs capitalize ${
                  darkmode ? "text-gray-400" : "text-gray-300"
                }`}
              >
                {userData?.role || "Member"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          <MenuItem icon={<ImProfile />} label="My Profile" to="/My_Profile" />

          {userData?.role !== "admin" && (
            <>
              <div className="pt-4">
                <SectionHeader
                  title="Notifications"
                  isExpanded={expandedSections.notifications}
                  onToggle={() => toggleSection("notifications")}
                  icon={<IoMdNotifications />}
                />
                {expandedSections.notifications && (
                  <div className="space-y-1 mt-2">
                    <MenuItem
                      icon={<IoMdNotifications />}
                      label="Announcements"
                      to="/Announcements"
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {userData?.role === "member" && (
            <div className="pt-4">
              <SectionHeader
                title="My Bookings"
                isExpanded={expandedSections.bookings}
                onToggle={() => toggleSection("bookings")}
                icon={<FaRegCalendarCheck />}
              />
              {expandedSections.bookings && (
                <div className="space-y-1 mt-2">
                  <MenuItem
                    icon={<MdPendingActions />}
                    label="Pending Bookings"
                    to="/Pending_Bookings"
                  />
                  <MenuItem
                    icon={<MdVerified />}
                    label="Approved Bookings"
                    to="/Approved_Bookings"
                  />
                  <MenuItem
                    icon={<FaCheckCircle />}
                    label="Confirmed Bookings"
                    to="/Confirmed_Bookings"
                  />
                  <MenuItem
                    icon={<MdOutlineHistory />}
                    label="Payment History"
                    to="/Payment_History"
                  />
                </div>
              )}
            </div>
          )}

          {userData?.role === "admin" && (
            <div className="pt-4">
              <SectionHeader
                title="Management"
                isExpanded={expandedSections.management}
                onToggle={() => toggleSection("management")}
                icon={<MdManageAccounts />}
              />
              {expandedSections.management && (
                <div className="space-y-1 mt-2">
                  <MenuItem
                    icon={<MdManageAccounts />}
                    label="Manage Bookings Approval"
                    to="/Manage_bookings_approval"
                  />
                  <MenuItem
                    icon={<FaUsersCog />}
                    label="Manage Members"
                    to="/Manage_Members"
                  />
                  <MenuItem
                    icon={<HiUsers />}
                    label="All Users"
                    to="/All_Users"
                  />
                  <MenuItem
                    icon={<FaRegBuilding />}
                    label="Manage Courts"
                    to="/Manage_Courts"
                  />
                  <MenuItem
                    icon={<FaRegCalendarCheck />}
                    label="Manage Bookings"
                    to="/Manage_Bookings"
                  />
                  <MenuItem
                    icon={<FaTags />}
                    label="Manage Coupons"
                    to="/Manage_Coupons"
                  />
                  <MenuItem
                    icon={<GrAnnounce />}
                    label="Make Announcement"
                    to="/Make_Announcement"
                  />
                </div>
              )}
            </div>
          )}
        </ul>
      </nav>

      {/* Logout Button */}
      <div
        className={`p-4 ${
          darkmode ? "border-gray-700/50" : "border-white/10"
        } border-t`}
      >
        <button
          onClick={handleLogout}
          className={`w-full flex items-center justify-center gap-3 px-4 py-3 ${
            darkmode
              ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          } text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
