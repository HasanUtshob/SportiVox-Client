// components/DashboardSidebar.jsx
import React from "react";
import { Link, NavLink } from "react-router";
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
  FaCheckCircle,
  FaUsersCog,
  FaRegBuilding,
  FaRegCalendarCheck,
  FaTags,
} from "react-icons/fa";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Component/Loading";

const DashboardSidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { SignOut, userData, userDataLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    SignOut().then(() => {
      Swal.fire({
        icon: "success",
        title: "সফলভাবে সাইন আউট হয়েছে",
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
        onClick={() => {
          if (window.innerWidth < 768) toggleSidebar(); // Auto-collapse on mobile
        }}
      >
        {icon} {label}
      </NavLink>
    </li>
  );

  if (userDataLoading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        <Loading message="ড্যাশবোর্ড লোড হচ্ছে..." />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        ব্যবহারকারীর তথ্য পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-md p-5 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Link to="/" className="block mb-8 text-2xl font-bold text-primary">
        🏟️ SportiVox
      </Link>
      <ul className="space-y-2">
        <MenuItem icon={<ImProfile />} label="My Profile" to="/My_Profile" />
        {userData?.role !== "admin" && (
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
        {userData?.role === "member" && (
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
        {userData?.role === "admin" && (
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

      <button
        onClick={handleLogout}
        className="flex items-center text-center gap-3 mt-10 text-red-600 hover:text-white hover:bg-gray-700 transition btn btn-block cursor-pointer"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;
