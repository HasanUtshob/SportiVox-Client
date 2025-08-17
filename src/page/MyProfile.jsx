import React, { use, useEffect, useState, useContext } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaIdCard,
  FaCrown,
  FaTrophy,
  FaChartLine,
  FaBookmark,
  FaClock,
  FaCheckCircle,
  FaDollarSign,
  FaSave,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import Loading from "../Component/Loading";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import { Themecontext } from "../Context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const MyProfile = () => {
  const { darkmode } = useContext(Themecontext);
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();
  const [data, setData] = useState(null);
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    paid: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    phone: "",
    address: "",
    photo: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const [userRes, bookingsRes] = await Promise.all([
            axiosSecure.get(`/Users?email=${user.email}`),
            axiosSecure.get(`/bookings?email=${user.email}`),
          ]);

          const userData = userRes.data[0];
          setData(userData);

          // Set edit form data
          setEditFormData({
            name: userData?.name || "",
            phone: userData?.phone || "",
            address: userData?.address || "",
            photo: userData?.photo || "",
          });

          const bookings = bookingsRes.data;
          setBookingStats({
            total: bookings.length,
            approved: bookings.filter((b) => b.status === "approved").length,
            pending: bookings.filter((b) => b.status === "pending").length,
            paid: bookings.filter((b) => b.paymentStatus === "paid").length,
          });

          // Get recent 3 bookings
          setRecentBookings(bookings.slice(0, 3));
        } catch (error) {
          console.error("Data fetch error:", error);
        }
      }
    };
    fetchData();
  }, [user, axiosSecure]);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const id = data?._id;

    try {
      const response = await axiosSecure.patch(`/Users/${id}`, editFormData);

      if (response.data.modifiedCount > 0) {
        // Update local data
        setData((prev) => ({
          ...prev,
          ...editFormData,
        }));

        setShowEditModal(false);

        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been successfully updated.",
          confirmButtonColor: "#3b82f6",
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes Made",
          text: "No changes were detected in your profile.",
          confirmButtonColor: "#3b82f6",
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile. Please try again.",
        confirmButtonColor: "#ef4444",
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading || !user || data === null) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div
        className={`min-h-screen ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
        } flex items-center justify-center`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-center py-12 px-8 ${
            darkmode
              ? "bg-gray-800/90 border-gray-700/50"
              : "bg-white/80 border-white/20"
          } backdrop-blur-sm rounded-3xl shadow-2xl border`}
        >
          <div className="text-6xl mb-4">👤</div>
          <h3
            className={`text-2xl font-bold mb-2 ${
              darkmode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            No Profile Found
          </h3>
          <p className={`${darkmode ? "text-gray-400" : "text-gray-600"}`}>
            Please contact support for assistance
          </p>
        </motion.div>
      </div>
    );
  }

  const formattedDate = new Date(
    user?.metadata?.creationTime
  ).toLocaleDateString("en-GB");

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaCrown className="text-yellow-500" />;
      case "member":
        return <FaTrophy className="text-blue-500" />;
      default:
        return <FaUser className="text-gray-500" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "from-yellow-500 to-orange-500";
      case "member":
        return "from-blue-500 to-indigo-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      } relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-r from-blue-800/10 to-purple-800/10"
            : "bg-gradient-to-r from-blue-600/5 to-purple-600/5"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-br from-blue-600/5 to-transparent"
            : "bg-gradient-to-br from-blue-400/10 to-transparent"
        } rounded-full -translate-x-48 -translate-y-48`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-tl from-purple-600/5 to-transparent"
            : "bg-gradient-to-tl from-purple-400/10 to-transparent"
        } rounded-full translate-x-48 translate-y-48`}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkmode
                ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            }`}
          >
            👤 My Profile
          </h1>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              darkmode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Manage your account information and track your sports activities
          </p>
          <div
            className={`w-24 h-1 mx-auto mt-4 rounded-full ${
              darkmode
                ? "bg-gradient-to-r from-blue-400 to-purple-500"
                : "bg-gradient-to-r from-blue-500 to-purple-600"
            }`}
          ></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div
              className={`${
                darkmode
                  ? "bg-gray-800/90 border-gray-700/50"
                  : "bg-white/80 border-white/20"
              } backdrop-blur-sm rounded-3xl p-8 shadow-2xl border relative overflow-hidden`}
            >
              {/* Background Pattern */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 ${
                  darkmode
                    ? "bg-gradient-to-br from-blue-600/10 to-transparent"
                    : "bg-gradient-to-br from-blue-500/10 to-transparent"
                } rounded-full -translate-y-16 translate-x-16`}
              ></div>

              <div className="relative z-10">
                {/* Profile Image */}
                <div className="text-center mb-6">
                  {data?.photo ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="relative inline-block"
                    >
                      <img
                        src={data.photo}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover mx-auto"
                      />
                      <div className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
                        {getRoleIcon(data.role)}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="relative inline-block">
                      <FaUserCircle
                        className={`text-8xl mx-auto ${
                          darkmode ? "text-gray-600" : "text-gray-300"
                        }`}
                      />
                      <div className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
                        {getRoleIcon(data.role)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Basic Info */}
                <div className="text-center space-y-3 mb-6">
                  <h2
                    className={`text-2xl font-bold ${
                      darkmode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {data?.name}
                  </h2>
                  <div
                    className={`inline-flex items-center space-x-2 bg-gradient-to-r ${getRoleColor(
                      data.role
                    )} text-white px-4 py-2 rounded-full shadow-lg`}
                  >
                    {getRoleIcon(data.role)}
                    <span className="font-semibold capitalize">
                      {data?.role}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div
                    className={`flex items-center space-x-3 p-3 rounded-xl ${
                      darkmode ? "bg-gray-700/50" : "bg-gray-50"
                    }`}
                  >
                    <FaEnvelope className="text-blue-500" />
                    <span
                      className={`text-sm ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {data?.email}
                    </span>
                  </div>

                  {data?.phone && (
                    <div
                      className={`flex items-center space-x-3 p-3 rounded-xl ${
                        darkmode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <FaPhone className="text-green-500" />
                      <span
                        className={`text-sm ${
                          darkmode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {data.phone}
                      </span>
                    </div>
                  )}

                  {data?.address && (
                    <div
                      className={`flex items-center space-x-3 p-3 rounded-xl ${
                        darkmode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <FaMapMarkerAlt className="text-red-500" />
                      <span
                        className={`text-sm ${
                          darkmode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {data.address}
                      </span>
                    </div>
                  )}

                  <div
                    className={`flex items-center space-x-3 p-3 rounded-xl ${
                      darkmode ? "bg-gray-700/50" : "bg-gray-50"
                    }`}
                  >
                    <FaCalendarAlt className="text-purple-500" />
                    <span
                      className={`text-sm ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {data.role === "member"
                        ? `Member since ${moment(data?.memberDate).format(
                            "DD MMM YYYY"
                          )}`
                        : `Joined ${formattedDate}`}
                    </span>
                  </div>
                </div>

                {/* Edit Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEditModal(true)}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <FaEdit />
                  <span>Edit Profile</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats and Activity */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Activity Stats */}
            <div
              className={`${
                darkmode
                  ? "bg-gray-800/90 border-gray-700/50"
                  : "bg-white/80 border-white/20"
              } backdrop-blur-sm rounded-3xl p-8 shadow-2xl border`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className={`p-3 text-white rounded-xl ${
                    darkmode
                      ? "bg-gradient-to-br from-blue-600 to-purple-700"
                      : "bg-gradient-to-br from-blue-500 to-purple-600"
                  }`}
                >
                  <FaChartLine />
                </div>
                <h3
                  className={`text-2xl font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Activity Overview
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon={<FaBookmark />}
                  title="Total Bookings"
                  value={bookingStats.total}
                  color="from-blue-500 to-cyan-500"
                  bgColor={
                    darkmode
                      ? "from-blue-900/30 to-cyan-900/30"
                      : "from-blue-50 to-cyan-50"
                  }
                />
                <StatCard
                  icon={<FaCheckCircle />}
                  title="Approved"
                  value={bookingStats.approved}
                  color="from-green-500 to-emerald-500"
                  bgColor={
                    darkmode
                      ? "from-green-900/30 to-emerald-900/30"
                      : "from-green-50 to-emerald-50"
                  }
                />
                <StatCard
                  icon={<FaClock />}
                  title="Pending"
                  value={bookingStats.pending}
                  color="from-yellow-500 to-orange-500"
                  bgColor={
                    darkmode
                      ? "from-yellow-900/30 to-orange-900/30"
                      : "from-yellow-50 to-orange-50"
                  }
                />
                <StatCard
                  icon={<FaDollarSign />}
                  title="Paid"
                  value={bookingStats.paid}
                  color="from-purple-500 to-indigo-500"
                  bgColor={
                    darkmode
                      ? "from-purple-900/30 to-indigo-900/30"
                      : "from-purple-50 to-indigo-50"
                  }
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div
              className={`${
                darkmode
                  ? "bg-gray-800/90 border-gray-700/50"
                  : "bg-white/80 border-white/20"
              } backdrop-blur-sm rounded-3xl p-8 shadow-2xl border`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className={`p-3 text-white rounded-xl ${
                    darkmode
                      ? "bg-gradient-to-br from-green-600 to-teal-700"
                      : "bg-gradient-to-br from-green-500 to-teal-600"
                  }`}
                >
                  <FaClock />
                </div>
                <h3
                  className={`text-2xl font-bold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Recent Bookings
                </h3>
              </div>

              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking, index) => (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                        darkmode
                          ? "bg-gray-700/50 hover:bg-gray-700/70"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-lg ${
                            darkmode ? "bg-blue-900/50" : "bg-blue-100"
                          }`}
                        >
                          <FaBookmark className="text-blue-600" />
                        </div>
                        <div>
                          <h4
                            className={`font-semibold ${
                              darkmode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {booking.courtType} Court
                          </h4>
                          <p
                            className={`text-sm ${
                              darkmode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {moment(booking.date).format("DD MMM YYYY")} •{" "}
                            {booking.slot}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {booking.status}
                        </div>
                        <p
                          className={`text-sm mt-1 ${
                            darkmode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          ৳{booking.price}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div
                  className={`text-center py-8 ${
                    darkmode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <FaBookmark className="text-4xl mx-auto mb-4 opacity-50" />
                  <p>No recent bookings found</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${
              darkmode ? "bg-gray-800" : "bg-white"
            } rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-2xl font-bold ${
                  darkmode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Edit Profile
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className={`p-2 ${
                  darkmode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Profile Photo */}
              <div className="text-center">
                <div className="relative inline-block">
                  {editFormData.photo ? (
                    <img
                      src={editFormData.photo}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
                    />
                  ) : (
                    <FaUserCircle
                      className={`text-6xl ${
                        darkmode ? "text-gray-600" : "text-gray-300"
                      }`}
                    />
                  )}
                  <div className="absolute -bottom-2 -right-2 p-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                    <FaCamera className="text-sm" />
                  </div>
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkmode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  name="photo"
                  value={editFormData.photo}
                  onChange={handleEditFormChange}
                  className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    darkmode
                      ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } border`}
                  placeholder="Enter photo URL"
                />
              </div>

              {/* Name */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkmode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Full Name *
                </label>
                <div className="relative">
                  <FaUser
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      darkmode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                      darkmode
                        ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    } border`}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkmode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      darkmode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleEditFormChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                      darkmode
                        ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    } border`}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkmode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Address
                </label>
                <div className="relative">
                  <FaMapMarkerAlt
                    className={`absolute left-3 top-4 ${
                      darkmode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <textarea
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditFormChange}
                    rows={3}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none ${
                      darkmode
                        ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    } border`}
                    placeholder="Enter your address"
                  ></textarea>
                </div>
              </div>

              {/* Email (Read-only) */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkmode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address (Cannot be changed)
                </label>
                <div className="relative">
                  <FaEnvelope
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      darkmode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="email"
                    value={data.email}
                    disabled
                    className={`w-full pl-10 pr-4 py-3 rounded-xl cursor-not-allowed ${
                      darkmode
                        ? "bg-gray-700/50 border-gray-600 text-gray-400"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                    } border`}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors ${
                    darkmode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  } border`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isUpdating ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FaSave />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, title, value, color, bgColor }) => {
  const { darkmode } = useContext(Themecontext);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-gradient-to-br ${bgColor} p-4 rounded-2xl ${
        darkmode ? "border-gray-700/50" : "border-white/20"
      } border relative overflow-hidden`}
    >
      <div
        className={`absolute top-0 right-0 w-16 h-16 ${
          darkmode ? "bg-white/5" : "bg-white/10"
        } rounded-full -translate-y-8 translate-x-8`}
      ></div>
      <div className="relative z-10">
        <div
          className={`inline-flex p-2 bg-gradient-to-br ${color} text-white rounded-lg mb-2`}
        >
          {icon}
        </div>
        <p
          className={`text-xs mb-1 ${
            darkmode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-2xl font-bold ${
            darkmode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default MyProfile;
