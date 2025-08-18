import React, { useEffect, useState, useContext } from "react";
import {
  FaSearch,
  FaTimes,
  FaCheckCircle,
  FaCreditCard,
  FaEye,
  FaDownload,
  FaStar,
} from "react-icons/fa";
import {
  MdVerified,
  MdCalendarToday,
  MdSchedule,
  MdAttachMoney,
  MdSportsBasketball,
  MdRefresh,
  MdFilterList,
  MdPayment,
  MdCancel,
  MdTrendingUp,
  MdAccessTime,
  MdLocationOn,
  MdInfo,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import PaymentModal from "../../Payment/PaymentModal";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";
import { Themecontext } from "../../Context/ThemeContext";

const ApprovedBookings = () => {
  const { darkmode } = useContext(Themecontext);
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [approvedBookings, setApprovedBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const fetchApprovedBookings = async () => {
    setLoading(true);
    try {
      // Fetch both court and coach bookings
      const [courtBookingsRes, coachBookingsRes] = await Promise.all([
        axiosSecure.get(`/bookings?status=approved&email=${user?.email}`),
        axiosSecure.get(
          `/coach-bookings?status=confirmed&email=${user?.email}`
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
      setApprovedBookings(allBookings);
      setFilteredBookings(allBookings);
    } catch (err) {
      console.error("Error fetching approved bookings:", err);
      Swal.fire({
        title: "Error",
        text: "Could not load approved bookings",
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
      fetchApprovedBookings();
    }
  }, [user?.email]);

  // Filter bookings based on search
  useEffect(() => {
    if (searchTerm) {
      const filtered = approvedBookings.filter((booking) => {
        const searchLower = searchTerm.toLowerCase();

        if (booking.bookingType === "court") {
          return (
            booking.courtType?.toLowerCase().includes(searchLower) ||
            booking.date?.toLowerCase().includes(searchLower) ||
            booking.slots?.some((slot) =>
              slot.toLowerCase().includes(searchLower)
            ) ||
            booking.paymentStatus?.toLowerCase().includes(searchLower)
          );
        } else if (booking.bookingType === "coach") {
          return (
            booking.coachDetails?.name?.toLowerCase().includes(searchLower) ||
            booking.date?.toLowerCase().includes(searchLower) ||
            booking.timeSlot?.toLowerCase().includes(searchLower) ||
            booking.sessionType?.toLowerCase().includes(searchLower) ||
            booking.paymentStatus?.toLowerCase().includes(searchLower)
          );
        }
        return false;
      });
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(approvedBookings);
    }
  }, [searchTerm, approvedBookings]);

  const handleCancel = async (id, bookingType) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "This action cannot be undone. Your approved booking will be permanently cancelled.",
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
            text: "Your booking has been successfully cancelled.",
            icon: "success",
            confirmButtonColor: "#10B981",
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
            customClass: {
              popup: "rounded-2xl shadow-2xl",
              confirmButton: "rounded-xl px-6 py-3",
            },
          });
          fetchApprovedBookings();
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

  const handlePaymentSuccess = (id) => {
    setApprovedBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, paymentStatus: "paid" } : b))
    );
    setSelectedBooking(null);

    // Show success message with confetti effect
    Swal.fire({
      title: "🎉 Payment Successful!",
      text: "Your booking payment has been processed successfully.",
      icon: "success",
      confirmButtonColor: "#10B981",
      background: darkmode ? "#1f2937" : "#ffffff",
      color: darkmode ? "#f9fafb" : "#111827",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        confirmButton: "rounded-xl px-6 py-3",
      },
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    });
  };

  const calculateTotalAmount = () => {
    return approvedBookings.reduce((total, booking) => {
      if (booking.bookingType === "court") {
        return total + (booking.slots?.length || 0) * (booking.price || 0);
      } else if (booking.bookingType === "coach") {
        return total + (booking.totalPrice || 0);
      }
      return total;
    }, 0);
  };

  const calculatePaidAmount = () => {
    return approvedBookings
      .filter((booking) => booking.paymentStatus === "paid")
      .reduce((total, booking) => {
        if (booking.bookingType === "court") {
          return total + (booking.slots?.length || 0) * (booking.price || 0);
        } else if (booking.bookingType === "coach") {
          return total + (booking.totalPrice || 0);
        }
        return total;
      }, 0);
  };

  const calculateUnpaidAmount = () => {
    return approvedBookings
      .filter((booking) => booking.paymentStatus !== "paid")
      .reduce((total, booking) => {
        if (booking.bookingType === "court") {
          return total + (booking.slots?.length || 0) * (booking.price || 0);
        } else if (booking.bookingType === "coach") {
          return total + (booking.totalPrice || 0);
        }
        return total;
      }, 0);
  };

  const calculateTotalSessions = () => {
    return approvedBookings.reduce((total, booking) => {
      if (booking.bookingType === "court") {
        return total + (booking.slots?.length || 0);
      } else if (booking.bookingType === "coach") {
        return total + 1; // Coach bookings are single sessions
      }
      return total;
    }, 0);
  };

  const getPaymentProgress = () => {
    const total = calculateTotalAmount();
    const paid = calculatePaidAmount();
    return total > 0 ? (paid / total) * 100 : 0;
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900"
            : "bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50"
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
          ? "bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900"
          : "bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50"
      } relative overflow-hidden`}
    >
      {/* Enhanced Background Decorations */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-r from-green-800/10 to-emerald-800/10"
            : "bg-gradient-to-r from-green-600/5 to-emerald-600/5"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-br from-green-600/5 to-transparent"
            : "bg-gradient-to-br from-green-400/10 to-transparent"
        } rounded-full -translate-x-48 -translate-y-48 animate-pulse`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-tl from-emerald-600/5 to-transparent"
            : "bg-gradient-to-tl from-emerald-400/10 to-transparent"
        } rounded-full translate-x-48 translate-y-48 animate-pulse`}
      ></div>
      <div
        className={`absolute top-1/2 left-1/2 w-64 h-64 ${
          darkmode
            ? "bg-gradient-to-br from-teal-600/5 to-transparent"
            : "bg-gradient-to-br from-teal-300/5 to-transparent"
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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-2xl"
          >
            <MdVerified className="text-3xl text-white" />
          </motion.div>

          <h1
            className={`text-4xl md:text-6xl font-bold mb-4 ${
              darkmode
                ? "bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent"
            }`}
          >
            My Approved Bookings
          </h1>
          <p
            className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              darkmode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Manage your approved court bookings and complete payments with ease
          </p>
          <div
            className={`w-32 h-1.5 mx-auto mt-6 rounded-full shadow-lg ${
              darkmode
                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                : "bg-gradient-to-r from-green-500 to-emerald-600"
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
            title="Approved Bookings"
            value={approvedBookings.length}
            icon={<MdVerified />}
            color="from-green-500 to-emerald-500"
            bgColor={
              darkmode
                ? "from-green-900/30 to-emerald-900/30"
                : "from-green-50 to-emerald-50"
            }
            trend="+12%"
          />
          <EnhancedStatsCard
            title="Total Sessions"
            value={calculateTotalSessions()}
            icon={<MdSchedule />}
            color="from-blue-500 to-cyan-500"
            bgColor={
              darkmode
                ? "from-blue-900/30 to-cyan-900/30"
                : "from-blue-50 to-cyan-50"
            }
            trend="+8%"
          />
          <EnhancedStatsCard
            title="Paid Amount"
            value={`৳${calculatePaidAmount()}`}
            icon={<FaCheckCircle />}
            color="from-green-500 to-emerald-500"
            bgColor={
              darkmode
                ? "from-green-900/30 to-emerald-900/30"
                : "from-green-50 to-emerald-50"
            }
            progress={getPaymentProgress()}
          />
          <EnhancedStatsCard
            title="Pending Payment"
            value={`৳${calculateUnpaidAmount()}`}
            icon={<FaCreditCard />}
            color="from-yellow-500 to-orange-500"
            bgColor={
              darkmode
                ? "from-yellow-900/30 to-orange-900/30"
                : "from-yellow-50 to-orange-50"
            }
            urgent={calculateUnpaidAmount() > 0}
          />
        </motion.div>

        {/* Enhanced Search and Filters */}
        {approvedBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${
              darkmode
                ? "bg-gray-800/90 border-gray-700/50"
                : "bg-white/90 border-white/30"
            } backdrop-blur-md rounded-3xl p-8 shadow-2xl border mb-10`}
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
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
                      darkmode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Find your bookings quickly
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col md:flex-row gap-4 w-full">
                <div className="relative flex-1">
                  <FaSearch
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      darkmode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Search by court type, date, time slot, or payment status..."
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 ${
                      darkmode
                        ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                        : "bg-white border-gray-200 text-gray-700 placeholder-gray-400"
                    } border`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchApprovedBookings}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3"
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
                  ? "bg-gray-800/90 border-gray-700/50"
                  : "bg-white/90 border-white/30"
              } backdrop-blur-md rounded-3xl p-16 shadow-2xl border text-center`}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <MdVerified
                  className={`text-8xl mx-auto mb-6 ${
                    darkmode ? "text-gray-600" : "text-gray-300"
                  }`}
                />
              </motion.div>
              <h3
                className={`text-3xl font-bold mb-4 ${
                  darkmode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {searchTerm ? "No Matching Bookings" : "No Approved Bookings"}
              </h3>
              <p
                className={`text-lg mb-8 max-w-md mx-auto ${
                  darkmode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {searchTerm
                  ? "Try adjusting your search terms to find more results."
                  : "You don't have any approved bookings at the moment. Start booking your favorite courts!"}
              </p>
              {searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchTerm("")}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Clear Search
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Enhanced Responsive Table - Desktop & Tablet */}
              <div className="hidden md:block">
                <div
                  className={`overflow-hidden rounded-3xl ${
                    darkmode
                      ? "bg-gray-800/90 border-gray-700/50"
                      : "bg-white/90 border-white/30"
                  } backdrop-blur-md shadow-2xl border`}
                >
                  <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
                    <table className="w-full">
                      <thead
                        className={`${
                          darkmode
                            ? "bg-gradient-to-r from-green-900/30 to-emerald-900/30"
                            : "bg-gradient-to-r from-green-50 to-emerald-50"
                        } sticky top-0 z-10`}
                      >
                        <tr>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Court Details
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Date
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Time Slots
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Sessions
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Total Price
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Payment Status
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={`${
                          darkmode ? "divide-gray-700" : "divide-gray-100"
                        } divide-y`}
                      >
                        <AnimatePresence>
                          {filteredBookings.map((booking, index) => (
                            <motion.tr
                              key={booking._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ delay: index * 0.1 }}
                              className={`transition-colors ${
                                darkmode
                                  ? "hover:bg-green-900/20"
                                  : "hover:bg-green-50/50"
                              }`}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <MdSportsBasketball className="text-green-500" />
                                  <span
                                    className={`font-medium ${
                                      darkmode
                                        ? "text-gray-200"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    {booking.bookingType === "court"
                                      ? booking.courtType
                                      : booking.coachDetails?.name ||
                                        "Coach Session"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <MdCalendarToday className="text-blue-500" />
                                  <span
                                    className={`${
                                      darkmode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {booking.date}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                  {booking.bookingType === "court" ? (
                                    booking.slots?.map((slot, idx) => (
                                      <span
                                        key={idx}
                                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                          darkmode
                                            ? "bg-green-900/50 text-green-300"
                                            : "bg-green-100 text-green-800"
                                        }`}
                                      >
                                        {slot}
                                      </span>
                                    ))
                                  ) : (
                                    <span
                                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                        darkmode
                                          ? "bg-blue-900/50 text-blue-300"
                                          : "bg-blue-100 text-blue-800"
                                      }`}
                                    >
                                      {booking.timeSlot || "N/A"}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    darkmode
                                      ? "bg-cyan-900/50 text-cyan-300"
                                      : "bg-cyan-100 text-cyan-800"
                                  }`}
                                >
                                  {booking.bookingType === "court"
                                    ? `${booking.slots?.length || 0} sessions`
                                    : "1 session"}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <MdAttachMoney className="text-green-500" />
                                  <span
                                    className={`font-semibold text-lg ${
                                      darkmode
                                        ? "text-gray-200"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    ৳
                                    {booking.bookingType === "court"
                                      ? (booking.slots?.length || 0) *
                                        (booking.price || 0)
                                      : booking.totalPrice || 0}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                {booking.paymentStatus === "paid" ? (
                                  <div
                                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
                                      darkmode
                                        ? "bg-green-900/50 text-green-300"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    <FaCheckCircle className="text-green-500" />
                                    <span>Paid</span>
                                  </div>
                                ) : (
                                  <div
                                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
                                      darkmode
                                        ? "bg-yellow-900/50 text-yellow-300"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    <FaCreditCard className="text-yellow-500" />
                                    <span>Unpaid</span>
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                  {booking.paymentStatus !== "paid" && (
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        setSelectedBooking(booking)
                                      }
                                      disabled={actionLoading === booking._id}
                                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1 disabled:opacity-50"
                                    >
                                      <MdPayment className="text-sm" />
                                      <span>Pay Now</span>
                                    </motion.button>
                                  )}
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      handleCancel(
                                        booking._id,
                                        booking.bookingType
                                      )
                                    }
                                    disabled={actionLoading === booking._id}
                                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1 disabled:opacity-50"
                                  >
                                    {actionLoading === booking._id ? (
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <MdCancel className="text-sm" />
                                    )}
                                    <span>Cancel</span>
                                  </motion.button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Enhanced Mobile Cards */}
              <div className="md:hidden space-y-8">
                <AnimatePresence>
                  {filteredBookings.map((booking, index) => (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${
                        darkmode
                          ? "bg-gray-800/90 border-gray-700/50"
                          : "bg-white/90 border-white/30"
                      } backdrop-blur-md rounded-3xl p-8 shadow-2xl border relative overflow-hidden`}
                    >
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                            <MdSportsBasketball className="text-white text-2xl" />
                          </div>
                          <div>
                            <h3
                              className={`text-xl font-bold ${
                                darkmode ? "text-gray-100" : "text-gray-800"
                              }`}
                            >
                              {booking.bookingType === "court"
                                ? booking.courtType
                                : booking.coachDetails?.name || "Coach Session"}
                            </h3>
                            {booking.paymentStatus === "paid" ? (
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mt-2 ${
                                  darkmode
                                    ? "bg-gradient-to-r from-green-900/50 to-emerald-900/50 text-green-300"
                                    : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800"
                                }`}
                              >
                                <FaCheckCircle className="mr-1 text-green-500" />
                                <span>Paid</span>
                              </div>
                            ) : (
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mt-2 animate-pulse ${
                                  darkmode
                                    ? "bg-gradient-to-r from-yellow-900/50 to-orange-900/50 text-yellow-300"
                                    : "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800"
                                }`}
                              >
                                <FaCreditCard className="mr-1 text-yellow-500" />
                                <span>Payment Pending</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`flex items-center space-x-1 text-2xl font-bold ${
                              darkmode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            <MdAttachMoney className="text-green-500" />
                            <span>
                              ৳
                              {booking.bookingType === "court"
                                ? (booking.slots?.length || 0) *
                                  (booking.price || 0)
                                : booking.totalPrice || 0}
                            </span>
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {booking.bookingType === "court"
                              ? `${booking.slots?.length || 0} sessions`
                              : "1 session"}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="space-y-4 mb-8">
                        <div
                          className={`flex items-center space-x-3 ${
                            darkmode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <MdCalendarToday className="text-blue-500 text-xl" />
                          <span className="font-semibold text-lg">
                            {booking.date}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div
                            className={`flex items-center space-x-3 ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            <MdAccessTime className="text-green-500 text-xl" />
                            <span className="font-semibold">Time Slots:</span>
                          </div>
                          <div className="flex flex-wrap gap-3 ml-8">
                            {booking.bookingType === "court" ? (
                              booking.slots?.map((slot, idx) => (
                                <span
                                  key={idx}
                                  className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
                                    darkmode
                                      ? "bg-gradient-to-r from-green-900/50 to-emerald-900/50 text-green-300"
                                      : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800"
                                  }`}
                                >
                                  {slot}
                                </span>
                              ))
                            ) : (
                              <span
                                className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
                                  darkmode
                                    ? "bg-gradient-to-r from-blue-900/50 to-cyan-900/50 text-blue-300"
                                    : "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800"
                                }`}
                              >
                                {booking.timeSlot || "N/A"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="flex space-x-4">
                        {booking.paymentStatus !== "paid" && (
                          <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedBooking(booking)}
                            disabled={actionLoading === booking._id}
                            className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
                          >
                            <MdPayment className="text-xl" />
                            <span>Pay Now</span>
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            handleCancel(booking._id, booking.bookingType)
                          }
                          disabled={actionLoading === booking._id}
                          className={`${
                            booking.paymentStatus !== "paid"
                              ? "flex-1"
                              : "w-full"
                          } py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50`}
                        >
                          {actionLoading === booking._id ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <MdCancel className="text-xl" />
                          )}
                          <span>Cancel Booking</span>
                        </motion.button>
                      </div>

                      {/* Decorative Elements */}
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 ${
                          darkmode
                            ? "bg-gradient-to-br from-green-600/10 to-transparent"
                            : "bg-gradient-to-br from-green-400/10 to-transparent"
                        } rounded-full -translate-y-16 translate-x-16`}
                      ></div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Enhanced Payment Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden"
            >
              <PaymentModal
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
}) => {
  const { darkmode } = useContext(Themecontext);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`bg-gradient-to-br ${bgColor} p-8 rounded-3xl shadow-xl ${
        darkmode ? "border-gray-700/50" : "border-white/30"
      } border relative overflow-hidden group`}
    >
      {/* Background Pattern */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-br from-white/5 to-transparent"
            : "bg-gradient-to-br from-white/10 to-transparent"
        }`}
      ></div>
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${
          darkmode ? "bg-white/5" : "bg-white/5"
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
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          darkmode
            ? "bg-gradient-to-r from-white/0 to-white/5"
            : "bg-gradient-to-r from-white/0 to-white/10"
        }`}
        initial={false}
      />
    </motion.div>
  );
};

export default ApprovedBookings;
