import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/Images/logo.png";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaHome,
  FaThLarge,
  FaSignInAlt,
} from "react-icons/fa";

const Navber = () => {
  const { user, SignOut } = useAuth();
  const [userData, setuserData] = useState(null);

  const fetchData = async () => {
    const email = user?.email;
    if (email) {
      try {
        const res = await axios.get(
          `http://localhost:5000/Users?email=${email}`
        );
        setuserData(res.data[0]);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleLogout = () => {
    SignOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sign Out Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar bg-white shadow-sm px-4 sticky top-0 z-50"
    >
      {/* Logo */}
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl flex items-center gap-2"
        >
          <img src={logo} alt="logo" className="w-10" />
          <span className="font-bold text-blue-600">SportiVox</span>
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-semibold">
          <li>
            <NavLink to="/" className="hover:text-blue-500">
              <FaHome className="inline mr-1" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Courts" className="hover:text-blue-500">
              <FaThLarge className="inline mr-1" /> Courts
            </NavLink>
          </li>
        </ul>
      </div>

      {/* User Info / Login */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar tooltip"
              data-tip={userData?.name}
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={userData?.photo || "/user.png"} alt="User" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
            >
              <li>
                <span className="font-medium text-sm px-2">
                  {userData?.email}
                </span>
              </li>
              <li>
                <NavLink to="/Dashboard">
                  <FaUserCircle /> Dashboard
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/SignIn"
            className="btn btn-outline btn-sm border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <FaSignInAlt className="mr-1" /> Login
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default Navber;
