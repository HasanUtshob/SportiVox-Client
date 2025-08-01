import React, { useState, useEffect } from "react";
import { ImProfile } from "react-icons/im";
import { HiUsers } from "react-icons/hi";
import {
  MdManageAccounts,
  MdOutlineHistory,
  MdPendingActions,
  MdVerified,
} from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { GrAnnounce } from "react-icons/gr";
import {
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaCheckCircle,
  FaUsersCog,
  FaRegBuilding,
  FaRegCalendarCheck,
  FaTags,
} from "react-icons/fa";

import { Link, NavLink, Outlet, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Loading from "../Component/loading";

const Header = () => {
  const { user, userData, SignOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  if (!user || !userData) {
    return <Loading />;
  }

  const handleLogout = () => {
    SignOut().then(() => {
      Swal.fire({
        icon: "success",
        title: "Signed Out Successfully",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
      });
      navigate("/");
    });
  };

  const MenuItem = ({ icon, label, to }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
            isActive
              ? "bg-primary text-white font-semibold"
              : "hover:bg-gray-100 text-gray-700"
          }`
        }
      >
        {icon} {label}
      </NavLink>
    </li>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-md p-5 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link to="/" className="block mb-8 text-2xl font-bold text-primary">
          🏟️ SportiVox
        </Link>
        <ul className="space-y-2">
          <MenuItem icon={<ImProfile />} label="My Profile" to="/MyProfile" />
          {userData.role !== "admin" && (
            <>
              <MenuItem
                icon={<IoMdNotifications />}
                label="Announcements"
                to="/Announcements"
              />
              <MenuItem
                icon={<MdPendingActions />}
                label="Pending Bookings"
                to="/Pending_Bookings"
              />
            </>
          )}
          {userData.role === "member" && (
            <>
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
            </>
          )}
          {userData.role === "admin" && (
            <>
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
              <MenuItem icon={<HiUsers />} label="All Users" to="/All_Users" />
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
            </>
          )}
        </ul>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-10 text-red-600 hover:text-red-500 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="flex justify-between items-center px-4 py-3 bg-white shadow sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="block md:hidden text-primary p-2 rounded hover:bg-gray-200 bg-gray-100"
            >
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <h2 className="text-xl font-bold text-primary">Dashboard</h2>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL}
              alt="user"
              className="w-10 h-10 rounded-full border object-cover"
            />
            <span className="font-medium text-gray-600 hidden sm:block">
              Hello, {user?.displayName}
            </span>
          </div>
        </header>

        {/* Page content */}
        <section className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </section>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default Header;
