// components/DashboardNavbar.jsx
import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const DashboardNavbar = ({ sidebarOpen, toggleSidebar }) => {
  const { user } = useAuth();

  return (
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
  );
};

export default DashboardNavbar;
