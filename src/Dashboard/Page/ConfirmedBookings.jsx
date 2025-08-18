import React, { useEffect, useState, useContext } from "react";
import {
  FaSearch,
  FaTimes,
  FaCheckCircle,
  FaCreditCard,
  FaEye,
  FaDownload,
  FaStar,
  FaCalendarCheck,
} from "react-icons/fa";
import {
  MdVerified,
  MdCalendarToday,
  MdSchedule,
  MdAttachMoney,
  MdSportsBasketball,
  MdRefresh,
  MdFilterList,
  MdCancel,
  MdTrendingUp,
  MdAccessTime,
  MdLocationOn,
  MdInfo,
  MdCheckCircle,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";
import { Themecontext } from "../../Context/ThemeContext";

const ConfirmedBookings = () => {
  const { darkmode } = useContext(Themecontext);
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const fetchConfirmedBookings = async () => {
    setLoading(true);
    try {
      // Fetch both court and coach bookings that are paid/confirmed
      const [courtBookingsRes, coachBookingsRes] = await Promise.all([
        axiosSecure.get(`/bookings?paymentStatus=paid&email=${user?.email}`),
        axiosSecure.get(
          `/coach-bookings?paymentStatus=paid&email=${user?.email}`
        ),
      ]);

      // Add booking type identifier to distinguish between court and coach bookings
      const courtBookings = courtBookingsRes.data.map((booking) => ({
        ...booking,
        bookingType: "court",
      }));

      const coachBookings = coachBookingsRes.data.map((booking) => ({
        ...booking,
        bookingType: "coach",
      }));

      // Combine both types of bookings
      const allBookings = [...courtBookings, ...coachBookings];
      setConfirmedBookings(allBookings);
      setFilteredBookings(allBookings);
    } catch (err) {
      console.error("Error fetching confirmed bookings:", err);
      Swal.fire({
        title: "Error",
        text: "Could not load confirmed bookings",
        icon: "error",
        confirmButtonColor: "#EF4444",
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
        customClass: {
          popup: "rounded-2xl shadow-2xl",
          confirmButton: "rounded-xl px-6 py-3",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchConfirmedBookings();
    }
  }, [user?.email]);

  // Filter bookings based on search
  useEffect(() => {
    if (searchTerm) {
      const filtered = confirmedBookings.filter((booking) => {
        const searchLower = searchTerm.toLowerCase();

        // For court bookings
        if (booking.bookingType === "court") {
          return (
            booking.courtType?.toLowerCase().includes(searchLower) ||
            booking.date?.toLowerCase().includes(searchLower) ||
            booking.userName?.toLowerCase().includes(searchLower) ||
            booking.slots?.some((slot) =>
              slot.toLowerCase().includes(searchLower)
            )
          );
        }

        // For coach bookings
        if (booking.bookingType === "coach") {
          return (
            booking.coachDetails?.name?.toLowerCase().includes(searchLower) ||
            booking.date?.toLowerCase().includes(searchLower) ||
            booking.userName?.toLowerCase().includes(searchLower) ||
            booking.timeSlot?.toLowerCase().includes(searchLower) ||
            booking.sessionType?.toLowerCase().includes(searchLower)
          );
        }

        return false;
      });
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(confirmedBookings);
    }
  }, [searchTerm, confirmedBookings]);

  const handleCancel = async (id, bookingType) => {
    const result = await Swal.fire({
      title: "Cancel Confirmed Booking?",
      text: "This action cannot be undone. The confirmed booking will be permanently cancelled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Cancel Booking",
      cancelButtonText: "Keep Booking",
      background: darkmode ? "#1f2937" : "#ffffff",
      color: darkmode ? "#f9fafb" : "#111827",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    });

    if (result.isConfirmed) {
      try {
        setActionLoading(id);

        // Use different endpoints based on booking type
        const endpoint =
          bookingType === "court" ? `/bookings/${id}` : `/coach-bookings/${id}`;
        const res = await axiosSecure.delete(endpoint);

        if (res.data.deletedCount) {
          await Swal.fire({
            title: "Cancelled!",
            text: "Your confirmed booking has been successfully cancelled.",
            icon: "success",
            confirmButtonColor: "#10B981",
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
            customClass: {
              popup: "rounded-2xl shadow-2xl",
              confirmButton: "rounded-xl px-6 py-3",
            },
          });
          fetchConfirmedBookings();
        } else {
          Swal.fire({
            title: "Failed!",
            text: "Booking not found or already cancelled.",
            icon: "error",
            confirmButtonColor: "#EF4444",
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
            customClass: {
              popup: "rounded-2xl shadow-2xl",
              confirmButton: "rounded-xl px-6 py-3",
            },
          });
        }
      } catch (err) {
        console.error("Cancel booking error:", err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while cancelling the booking.",
          icon: "error",
          confirmButtonColor: "#EF4444",
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
          customClass: {
            popup: "rounded-2xl shadow-2xl",
            confirmButton: "rounded-xl px-6 py-3",
          },
        });
      } finally {
        setActionLoading(null);
      }
    }
  };

  const calculateTotalAmount = () => {
    return confirmedBookings.reduce((total, booking) => {
      if (booking.bookingType === "court") {
        return total + (booking.slots?.length || 0) * (booking.price || 0);
      } else if (booking.bookingType === "coach") {
        return total + (booking.totalPrice || 0);
      }
      return total;
    }, 0);
  };

  const calculateTotalSessions = () => {
    return confirmedBookings.reduce((total, booking) => {
      if (booking.bookingType === "court") {
        return total + (booking.slots?.length || 0);
      } else if (booking.bookingType === "coach") {
        return total + 1; // Coach bookings are single sessions
      }
      return total;
    }, 0);
  };

  const getAverageSessionPrice = () => {
    const totalSessions = calculateTotalSessions();
    const totalAmount = calculateTotalAmount();
    return totalSessions > 0 ? Math.round(totalAmount / totalSessions) : 0;
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
        } flex items-center justify-center`}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      } relative overflow-hidden`}
    >
      {/* Enhanced Background Decorations */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-r from-blue-800/10 to-indigo-800/10"
            : "bg-gradient-to-r from-blue-600/5 to-indigo-600/5"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-br from-blue-600/5 to-transparent"
            : "bg-gradient-to-br from-blue-400/10 to-transparent"
        } rounded-full -translate-x-48 -translate-y-48 animate-pulse`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-tl from-indigo-600/5 to-transparent"
            : "bg-gradient-to-tl from-indigo-400/10 to-transparent"
        } rounded-full translate-x-48 translate-y-48 animate-pulse`}
      ></div>
      <div
        className={`absolute top-1/2 left-1/2 w-64 h-64 ${
          darkmode
            ? "bg-gradient-to-br from-purple-600/5 to-transparent"
            : "bg-gradient-to-br from-purple-300/5 to-transparent"
        } rounded-full -translate-x-32 -translate-y-32`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6 shadow-2xl"
          >
            <FaCalendarCheck className="text-3xl text-white" />
          </motion.div>

          <h1
            className={`text-4xl md:text-6xl font-bold mb-4 ${
              darkmode
                ? "bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
            }`}
          >
            My Confirmed Bookings
          </h1>
          <p
            className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              darkmode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            View and manage your confirmed court bookings with complete payment
          </p>
          <div
            className={`w-32 h-1.5 mx-auto mt-6 rounded-full shadow-lg ${
              darkmode
                ? "bg-gradient-to-r from-blue-400 to-indigo-500"
                : "bg-gradient-to-r from-blue-500 to-indigo-600"
            }`}
          ></div>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          <EnhancedStatsCard
            title="Confirmed Bookings"
            value={confirmedBookings.length}
            icon={<FaCalendarCheck />}
            color="from-blue-500 to-indigo-500"
            bgColor={
              darkmode
                ? "from-blue-900/20 to-indigo-900/20"
                : "from-blue-50 to-indigo-50"
            }
            trend="+15%"
            darkmode={darkmode}
          />
          <EnhancedStatsCard
            title="Total Sessions"
            value={calculateTotalSessions()}
            icon={<MdSchedule />}
            color="from-green-500 to-emerald-500"
            bgColor={
              darkmode
                ? "from-green-900/20 to-emerald-900/20"
                : "from-green-50 to-emerald-50"
            }
            trend="+10%"
            darkmode={darkmode}
          />
          <EnhancedStatsCard
            title="Total Paid"
            value={`৳${calculateTotalAmount()}`}
            icon={<FaCheckCircle />}
            color="from-emerald-500 to-teal-500"
            bgColor={
              darkmode
                ? "from-emerald-900/20 to-teal-900/20"
                : "from-emerald-50 to-teal-50"
            }
            trend="+18%"
            darkmode={darkmode}
          />
          <EnhancedStatsCard
            title="Avg. Session Price"
            value={`৳${getAverageSessionPrice()}`}
            icon={<MdAttachMoney />}
            color="from-purple-500 to-pink-500"
            bgColor={
              darkmode
                ? "from-purple-900/20 to-pink-900/20"
                : "from-purple-50 to-pink-50"
            }
            trend="+5%"
            darkmode={darkmode}
          />
        </motion.div>

        {/* Enhanced Search and Filters */}
        {confirmedBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${
              darkmode
                ? "bg-gray-800/90 border-gray-700/30"
                : "bg-white/90 border-white/30"
            } backdrop-blur-md rounded-3xl p-8 shadow-2xl border mb-10`}
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <MdFilterList className="text-2xl text-white" />
                </div>
                <div>
                  <h3
                    className={`text-xl font-bold ${
                      darkmode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    Search & Filter
                  </h3>
                  <p
                    className={`text-sm ${
                      darkmode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Find your confirmed bookings quickly
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col md:flex-row gap-4 w-full">
                <div className="relative flex-1">
                  <FaSearch
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      darkmode ? "text-gray-400" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Search by court type, date, user name, or time slot..."
                    className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                      darkmode
                        ? "bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-200 text-gray-700 placeholder-gray-400"
                    }`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchConfirmedBookings}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3"
                >
                  <MdRefresh className="text-xl" />
                  <span>Refresh</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Bookings List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`${
                darkmode
                  ? "bg-gray-800/90 border-gray-700/30"
                  : "bg-white/90 border-white/30"
              } backdrop-blur-md rounded-3xl p-16 shadow-2xl border text-center`}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <FaCalendarCheck
                  className={`text-8xl mx-auto mb-6 ${
                    darkmode ? "text-gray-500" : "text-gray-300"
                  }`}
                />
              </motion.div>
              <h3
                className={`text-3xl font-bold mb-4 ${
                  darkmode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {searchTerm ? "No Matching Bookings" : "No Confirmed Bookings"}
              </h3>
              <p
                className={`text-lg mb-8 max-w-md mx-auto ${
                  darkmode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {searchTerm
                  ? "Try adjusting your search terms to find more results."
                  : "You don't have any confirmed bookings at the moment. Complete your payments to see confirmed bookings here!"}
              </p>
              {searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchTerm("")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Clear Search
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Enhanced Responsive Table */}
              <div
                className={`${
                  darkmode
                    ? "bg-gray-800/90 border-gray-700/30"
                    : "bg-white/90 border-white/30"
                } backdrop-blur-md rounded-3xl shadow-2xl border overflow-hidden`}
              >
                {/* Mobile View (Cards) */}
                <div className="md:hidden space-y-4 p-4">
                  <AnimatePresence>
                    {filteredBookings.map((booking, index) => (
                      <motion.div
                        key={booking._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-2xl shadow-lg border ${
                          darkmode
                            ? "bg-gray-700/50 border-gray-600"
                            : "bg-white border-gray-100"
                        }`}
                      >
                        <div className="space-y-4">
                          {/* Court Details */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                                <MdSportsBasketball className="text-white text-xl" />
                              </div>
                              <div>
                                <h3
                                  className={`font-bold text-lg ${
                                    darkmode ? "text-gray-100" : "text-gray-800"
                                  }`}
                                >
                                  {booking.bookingType === "coach"
                                    ? booking.coachDetails?.name ||
                                      "Coach Session"
                                    : booking.courtType}
                                </h3>
                                <p
                                  className={`text-sm flex items-center space-x-1 ${
                                    darkmode ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  <MdLocationOn className="text-xs" />
                                  <span>
                                    {booking.bookingType === "coach"
                                      ? booking.sessionType ||
                                        "Training Session"
                                      : `Court #${
                                          booking.courtNumber || "TBD"
                                        }`}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800">
                              <MdCheckCircle className="mr-1 text-emerald-500" />
                              <span>Confirmed</span>
                            </div>
                          </div>

                          {/* User Info */}
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {booking.userName?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p
                                className={`font-semibold text-sm ${
                                  darkmode ? "text-gray-100" : "text-gray-800"
                                }`}
                              >
                                {booking.userName}
                              </p>
                              <p
                                className={`text-xs truncate max-w-[160px] ${
                                  darkmode ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                {booking.userEmail}
                              </p>
                            </div>
                          </div>

                          {/* Schedule */}
                          <div className="space-y-2">
                            <div
                              className={`flex items-center space-x-2 text-sm ${
                                darkmode ? "text-gray-100" : "text-gray-700"
                              }`}
                            >
                              <MdCalendarToday className="text-blue-500" />
                              <span className="font-semibold">
                                {booking.date}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {booking.bookingType === "coach" ? (
                                <span className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-lg text-xs font-medium shadow-sm">
                                  {booking.timeSlot || "N/A"}
                                </span>
                              ) : (
                                booking.slots?.map((slot, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-lg text-xs font-medium shadow-sm"
                                  >
                                    {slot}
                                  </span>
                                ))
                              )}
                            </div>
                          </div>

                          {/* Bottom Row */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1 text-sm">
                                <MdSchedule className="text-gray-500" />
                                <span
                                  className={`font-medium ${
                                    darkmode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  {booking.bookingType === "coach"
                                    ? "1 session"
                                    : `${booking.slots?.length} sessions`}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MdAttachMoney className="text-green-500" />
                                <span
                                  className={`font-bold ${
                                    darkmode ? "text-gray-100" : "text-gray-800"
                                  }`}
                                >
                                  ৳
                                  {booking.bookingType === "coach"
                                    ? booking.totalPrice || 0
                                    : (booking.slots?.length || 0) *
                                      (booking.price || 0)}
                                </span>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.02, y: -1 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                handleCancel(booking._id, booking.bookingType)
                              }
                              disabled={actionLoading === booking._id}
                              className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg text-xs font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-1 disabled:opacity-50"
                            >
                              {actionLoading === booking._id ? (
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <MdCancel className="text-xs" />
                              )}
                              <span>Cancel</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Enhanced Responsive Table - Desktop & Tablet */}
                <div className="hidden md:block">
                  <div
                    className={`overflow-hidden rounded-3xl shadow-2xl border ${
                      darkmode
                        ? "bg-gray-800/90 border-gray-700/30"
                        : "bg-white/90 border-white/30"
                    } backdrop-blur-md`}
                  >
                    <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
                      <table className="w-full">
                        <thead
                          className={`${
                            darkmode
                              ? "bg-gradient-to-r from-gray-700/50 to-gray-600/50"
                              : "bg-gradient-to-r from-blue-50 to-indigo-50"
                          } sticky top-0 z-10`}
                        >
                          <tr>
                            <th
                              className={`px-3 py-4 text-left text-xs font-bold uppercase tracking-wider w-[200px] ${
                                darkmode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Court Details
                            </th>
                            <th
                              className={`px-3 py-4 text-left text-xs font-bold uppercase tracking-wider w-[180px] ${
                                darkmode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              User
                            </th>
                            <th
                              className={`px-3 py-4 text-left text-xs font-bold uppercase tracking-wider w-[220px] ${
                                darkmode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Schedule
                            </th>
                            <th
                              className={`px-3 py-4 text-left text-xs font-bold uppercase tracking-wider w-[100px] ${
                                darkmode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Sessions
                            </th>
                            <th
                              className={`px-3 py-4 text-left text-xs font-bold uppercase tracking-wider w-[120px] ${
                                darkmode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Amount
                            </th>
                            <th
                              className={`px-3 py-4 text-left text-xs font-bold uppercase tracking-wider w-[120px] ${
                                darkmode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Status
                            </th>
                            <th
                              className={`px-3 py-4 text-left text-xs font-bold uppercase tracking-wider w-[120px] ${
                                darkmode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          className={`divide-y ${
                            darkmode ? "divide-gray-600" : "divide-gray-100"
                          }`}
                        >
                          <AnimatePresence>
                            {filteredBookings.map((booking, index) => (
                              <motion.tr
                                key={booking._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.1 }}
                                className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 group"
                              >
                                <td className="px-3 py-4">
                                  <div className="flex items-center space-x-3">
                                    <motion.div
                                      whileHover={{ rotate: 360, scale: 1.1 }}
                                      transition={{ duration: 0.6 }}
                                      className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex-shrink-0"
                                    >
                                      <MdSportsBasketball className="text-white text-lg" />
                                    </motion.div>
                                    <div className="min-w-0 flex-1">
                                      <div
                                        className={`font-bold text-sm truncate group-hover:text-blue-700 transition-colors duration-300 ${
                                          darkmode
                                            ? "text-gray-100"
                                            : "text-gray-800"
                                        }`}
                                      >
                                        {booking.bookingType === "coach"
                                          ? booking.coachDetails?.name ||
                                            "Coach Session"
                                          : booking.courtType}
                                      </div>
                                      <div
                                        className={`text-xs flex items-center space-x-1 ${
                                          darkmode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        <MdLocationOn className="text-xs flex-shrink-0" />
                                        <span className="truncate">
                                          {booking.bookingType === "coach"
                                            ? booking.sessionType ||
                                              "Training Session"
                                            : `Court #${
                                                booking.courtNumber || "TBD"
                                              }`}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 py-4">
                                  <div className="flex items-center space-x-3">
                                    <motion.div
                                      whileHover={{ scale: 1.1, rotate: 5 }}
                                      className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0"
                                    >
                                      {booking.userName
                                        ?.charAt(0)
                                        .toUpperCase()}
                                    </motion.div>
                                    <div className="min-w-0 flex-1">
                                      <div
                                        className={`font-semibold text-sm truncate ${
                                          darkmode
                                            ? "text-gray-100"
                                            : "text-gray-800"
                                        }`}
                                      >
                                        {booking.userName}
                                      </div>
                                      <div
                                        className={`text-xs truncate ${
                                          darkmode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        {booking.userEmail}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 py-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm">
                                      <MdCalendarToday className="text-blue-500 flex-shrink-0" />
                                      <span
                                        className={`font-semibold truncate ${
                                          darkmode
                                            ? "text-gray-100"
                                            : "text-gray-800"
                                        }`}
                                      >
                                        {booking.date}
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {booking.bookingType === "coach" ? (
                                        <motion.span
                                          whileHover={{ scale: 1.05, y: -2 }}
                                          className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-lg text-xs font-medium shadow-sm border border-blue-200/50 hover:shadow-md transition-all duration-200"
                                        >
                                          {booking.timeSlot || "N/A"}
                                        </motion.span>
                                      ) : (
                                        <>
                                          {booking.slots
                                            ?.slice(0, 2)
                                            .map((slot, idx) => (
                                              <motion.span
                                                key={idx}
                                                whileHover={{
                                                  scale: 1.05,
                                                  y: -2,
                                                }}
                                                className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-lg text-xs font-medium shadow-sm border border-blue-200/50 hover:shadow-md transition-all duration-200"
                                              >
                                                {slot}
                                              </motion.span>
                                            ))}
                                          {booking.slots?.length > 2 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                              +{booking.slots.length - 2} more
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 py-4">
                                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 shadow-sm border border-green-200/50">
                                    <MdSchedule className="mr-1.5 flex-shrink-0" />
                                    <span>
                                      {booking.bookingType === "coach"
                                        ? "1"
                                        : booking.slots?.length}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-3 py-4">
                                  <div className="flex items-center space-x-1">
                                    <MdAttachMoney className="text-green-500 text-lg flex-shrink-0" />
                                    <span
                                      className={`font-bold text-lg ${
                                        darkmode
                                          ? "text-gray-100"
                                          : "text-gray-800"
                                      }`}
                                    >
                                      ৳
                                      {booking.bookingType === "coach"
                                        ? booking.totalPrice || 0
                                        : (booking.slots?.length || 0) *
                                          (booking.price || 0)}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-3 py-4">
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 shadow-sm border border-emerald-200"
                                  >
                                    <MdCheckCircle className="mr-1.5 text-emerald-500 flex-shrink-0" />
                                    <span>Confirmed</span>
                                  </motion.div>
                                </td>
                                <td className="px-3 py-4">
                                  <motion.button
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                      handleCancel(
                                        booking._id,
                                        booking.bookingType
                                      )
                                    }
                                    disabled={actionLoading === booking._id}
                                    className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl text-xs font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {actionLoading === booking._id ? (
                                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <MdCancel className="text-sm flex-shrink-0" />
                                    )}
                                    <span className="whitespace-nowrap">
                                      Cancel
                                    </span>
                                  </motion.button>
                                </td>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Stats Card Component
const EnhancedStatsCard = ({
  title,
  value,
  icon,
  color,
  bgColor,
  trend,
  progress,
  urgent,
  darkmode,
}) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    className={`bg-gradient-to-br ${bgColor} p-8 rounded-3xl shadow-xl border ${
      darkmode ? "border-gray-700/30" : "border-white/30"
    } relative overflow-hidden group`}
  >
    {/* Background Pattern */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${
        darkmode
          ? "from-gray-800/10 to-transparent"
          : "from-white/10 to-transparent"
      }`}
    ></div>
    <div
      className={`absolute top-0 right-0 w-32 h-32 ${
        darkmode ? "bg-gray-800/5" : "bg-white/5"
      } rounded-full -translate-y-16 translate-x-16`}
    ></div>

    {/* Urgent Indicator */}
    {urgent && (
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full shadow-lg"
      />
    )}

    <div className="relative z-10 flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-4 mb-4">
          <div
            className={`p-4 bg-gradient-to-br ${color} text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <div className="text-2xl">{icon}</div>
          </div>
          {trend && (
            <div className="flex items-center space-x-1 text-green-600">
              <MdTrendingUp className="text-sm" />
              <span className="text-xs font-bold">{trend}</span>
            </div>
          )}
        </div>

        <div>
          <h4
            className={`text-sm font-bold mb-2 uppercase tracking-wider ${
              darkmode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {title}
          </h4>
          <p
            className={`text-3xl font-bold mb-2 ${
              darkmode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {value}
          </p>

          {/* Progress Bar */}
          {progress !== undefined && (
            <div
              className={`w-full rounded-full h-2 mb-2 ${
                darkmode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`bg-gradient-to-r ${color} h-2 rounded-full shadow-sm`}
              />
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Hover Effect */}
    <motion.div
      className={`absolute inset-0 bg-gradient-to-r ${
        darkmode ? "from-gray-800/0 to-gray-800/10" : "from-white/0 to-white/10"
      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      initial={false}
    />
  </motion.div>
);

export default ConfirmedBookings;
