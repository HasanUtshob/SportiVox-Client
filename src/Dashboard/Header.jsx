import React, { useState, useEffect } from "react";
import { ImProfile } from "react-icons/im";
import { HiUsers } from "react-icons/hi";
import { motion } from "framer-motion";
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
import useAuth from "../hooks/useAuth";
import Loading from "../Component/loading";
import Swal from "sweetalert2";

const Header = () => {
  const { user, userData, SignOut } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Optional: Prevent background scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);

  if (!user || !userData) {
    return <Loading></Loading>;
  }
  const navigate = useNavigate();
  const handleLogOut = () => {
    SignOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sign Out Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 relative overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-5 transform transition-transform duration-300 ease-in-out z-50
        md:static md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <Link to="/">
          <h2 className="text-2xl font-bold text-primary mb-8">🏟️ SportiVox</h2>
        </Link>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
            <ImProfile /> <NavLink to="/MyProfile">My Profile</NavLink>
          </li>
          {user && userData.role !== "admin" && (
            <>
              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <IoMdNotifications />
                <NavLink to="/Announcements">Announcements </NavLink>
              </li>
              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <MdPendingActions />
                <NavLink to="/Pending_Bookings">Pending Bookings</NavLink>
              </li>
            </>
          )}
          {/* {user ||
            (userData.role === "member" && (
           
            ))} */}
          {user && userData.role === "member" && (
            <>
              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <MdVerified />
                <NavLink to="/Approved_Bookings">Approved Bookings</NavLink>
              </li>
              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <FaCheckCircle />
                <NavLink to="/Confirmed_Bookings">Confirmed Bookings</NavLink>
              </li>
              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <MdOutlineHistory />
                <NavLink to="/Payment_History">Payment History</NavLink>
              </li>
            </>
          )}

          {user && userData.role === "admin" && (
            <>
              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <MdManageAccounts />
                <NavLink to="/Manage_bookings_approval">
                  Manage Bookings Approval
                </NavLink>
              </li>
              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <FaUsersCog />
                <NavLink to="/Manage_Members">Manage Members</NavLink>
              </li>
              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <HiUsers />
                <NavLink to="/All_Users">All Users</NavLink>
              </li>
              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <FaRegBuilding />
                <NavLink to="/Manage_Courts">Manage Courts</NavLink>
              </li>
              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <FaRegCalendarCheck />
                <NavLink to="/Manage_Bookings">Manage Bookings</NavLink>
              </li>
              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <FaTags />
                <NavLink to="/Manage_Coupons">Manage Coupons</NavLink>
              </li>

              <li className="flex items-center gap-3 hover:text-primary cursor-pointer">
                <GrAnnounce />
                <NavLink to="/Make_Announcement">Make Announcement</NavLink>
              </li>
            </>
          )}

          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 text-red-600 mt-10 cursor-pointer hover:text-red-500"
          >
            <FaSignOutAlt /> Logout
          </button>
        </ul>
      </aside>

      {/* Main Content */}

      <main className="flex-1  h-screen flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow px-4 py-3 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="block md:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-primary"
            >
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <h2 className="text-xl font-bold text-primary">Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL}
              alt="user"
              className="w-10 h-10 rounded-full border"
            />
            <span className="font-medium text-gray-600 hidden sm:inline">
              Hello, {user?.displayName}
            </span>
          </div>
        </header>

        {/* Page Content - CENTERED */}
        <section className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50 flex justify-center">
          <div className="w-full max-w-5xl">
            <Outlet />
          </div>
        </section>
      </main>

      {/* Overlay when sidebar open on mobile */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0  bg-opacity-30 backdrop-blur-sm z-40 md:hidden"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Header;
