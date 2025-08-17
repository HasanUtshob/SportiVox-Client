import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { Themecontext } from "../../Context/ThemeContext";
import {
  MdManageSearch,
  MdFilterList,
  MdRefresh,
  MdCheckCircle,
  MdCancel,
  MdPending,
  MdCalendarToday,
  MdPerson,
  MdSportsBasketball,
  MdAttachMoney,
  MdSchedule,
} from "react-icons/md";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";

const ManageBookingsApproval = () => {
  const { darkmode } = useContext(Themecontext);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const axiosSecure = useAxios();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/bookings");
        const sorted = res.data.sort((a, b) => {
          if (a.status === "pending" && b.status !== "pending") return -1;
          if (a.status !== "pending" && b.status === "pending") return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setBookings(sorted);
        setFilteredBookings(sorted);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [axiosSecure]);

  // Filter bookings based on search and status
  useEffect(() => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.courtType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter]);

  const removeBookingFromUI = (id) => {
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  const handleApprove = async (bookingId) => {
    const result = await Swal.fire({
      title: "Approve Booking?",
      text: "This will approve the booking and promote the user to member status.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#6B7280",
      background: darkmode ? "#1f2937" : "#ffffff",
      color: darkmode ? "#f9fafb" : "#111827",
      customClass: {
        popup: darkmode ? "dark-popup" : "rounded-2xl shadow-2xl",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await axiosSecure.put(`/bookings/approve/${bookingId}`);
        if (res.data.bookingModified > 0 || res.data.userModified > 0) {
          await Swal.fire({
            title: "Approved!",
            text: "Booking approved and user promoted to member.",
            icon: "success",
            confirmButtonColor: "#10B981",
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
            customClass: {
              popup: darkmode ? "dark-popup" : "rounded-2xl shadow-2xl",
              confirmButton: "rounded-xl px-6 py-3",
            },
          });
          removeBookingFromUI(bookingId);
        } else {
          await Swal.fire({
            title: "Notice!",
            text: res.data.message || "Already approved.",
            icon: "info",
            confirmButtonColor: "#3B82F6",
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
            customClass: {
              popup: darkmode ? "dark-popup" : "rounded-2xl shadow-2xl",
              confirmButton: "rounded-xl px-6 py-3",
            },
          });
        }
      } catch (err) {
        console.error("Approval error:", err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while approving.",
          icon: "error",
          confirmButtonColor: "#EF4444",
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
          customClass: {
            popup: darkmode ? "dark-popup" : "rounded-2xl shadow-2xl",
            confirmButton: "rounded-xl px-6 py-3",
          },
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Booking?",
      text: "This will permanently delete the booking request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
      background: darkmode ? "#1f2937" : "#ffffff",
      color: darkmode ? "#f9fafb" : "#111827",
      customClass: {
        popup: darkmode ? "dark-popup" : "rounded-2xl shadow-2xl",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await axiosSecure.delete(`/bookings/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Rejected!",
            text: "Booking has been deleted successfully.",
            icon: "success",
            confirmButtonColor: "#10B981",
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
            customClass: {
              popup: darkmode ? "dark-popup" : "rounded-2xl shadow-2xl",
              confirmButton: "rounded-xl px-6 py-3",
            },
          });
          removeBookingFromUI(id);
        }
      } catch (err) {
        console.error("Rejection error:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete booking.",
          icon: "error",
          confirmButtonColor: "#EF4444",
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
          customClass: {
            popup: darkmode ? "dark-popup" : "rounded-2xl shadow-2xl",
            confirmButton: "rounded-xl px-6 py-3",
          },
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <MdPending className="text-yellow-500" />;
      case "approved":
        return <MdCheckCircle className="text-green-500" />;
      default:
        return <MdCancel className="text-red-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1";
    switch (status) {
      case "pending":
        return `${baseClasses} ${
          darkmode
            ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700/50"
            : "bg-yellow-100 text-yellow-800"
        }`;
      case "approved":
        return `${baseClasses} ${
          darkmode
            ? "bg-green-900/30 text-green-300 border border-green-700/50"
            : "bg-green-100 text-green-800"
        }`;
      default:
        return `${baseClasses} ${
          darkmode
            ? "bg-red-900/30 text-red-300 border border-red-700/50"
            : "bg-red-100 text-red-800"
        }`;
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
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
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      } relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-r from-gray-700/10 to-gray-600/10"
            : "bg-gradient-to-r from-blue-600/5 to-purple-600/5"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-br from-gray-600/20 to-transparent"
            : "bg-gradient-to-br from-blue-400/10 to-transparent"
        } rounded-full -translate-x-48 -translate-y-48`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-tl from-gray-600/20 to-transparent"
            : "bg-gradient-to-tl from-purple-400/10 to-transparent"
        } rounded-full translate-x-48 translate-y-48`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center justify-center space-x-3">
            <MdManageSearch
              className={`${darkmode ? "text-blue-400" : "text-blue-600"}`}
            />
            <span>Booking Approvals</span>
          </h1>
          <p
            className={`text-xl ${
              darkmode ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Review and manage booking requests with comprehensive approval
            workflow
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatsCard
            title="Total Bookings"
            value={bookings.length}
            icon={<MdSportsBasketball />}
            color="from-blue-500 to-cyan-500"
            bgColor="from-blue-50 to-cyan-50"
            darkmode={darkmode}
          />
          <StatsCard
            title="Pending Approval"
            value={bookings.filter((b) => b.status === "pending").length}
            icon={<MdPending />}
            color="from-yellow-500 to-orange-500"
            bgColor="from-yellow-50 to-orange-50"
            darkmode={darkmode}
          />
          <StatsCard
            title="Approved"
            value={bookings.filter((b) => b.status === "approved").length}
            icon={<MdCheckCircle />}
            color="from-green-500 to-emerald-500"
            bgColor="from-green-50 to-emerald-50"
            darkmode={darkmode}
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`${
            darkmode
              ? "bg-gray-800/80 backdrop-blur-sm border-gray-700/50"
              : "bg-white/80 backdrop-blur-sm border-white/20"
          } rounded-3xl p-6 shadow-2xl border mb-8`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center space-x-3">
              <MdFilterList
                className={`text-2xl ${
                  darkmode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h3
                className={`text-lg font-semibold ${
                  darkmode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Filters
              </h3>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <FaSearch
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    darkmode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search by user, court, or email..."
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    darkmode
                      ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                      : "border-gray-200 bg-white text-gray-900 placeholder-gray-500"
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className={`px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  darkmode
                    ? "border-gray-600 bg-gray-700 text-gray-200"
                    : "border-gray-200 bg-white text-gray-900"
                }`}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <MdRefresh />
                <span className="hidden sm:inline">Refresh</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bookings List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {filteredBookings.length === 0 ? (
            <div
              className={`${
                darkmode
                  ? "bg-gray-800/80 backdrop-blur-sm border-gray-700/50"
                  : "bg-white/80 backdrop-blur-sm border-white/20"
              } rounded-3xl p-12 shadow-2xl border text-center`}
            >
              <MdManageSearch
                className={`text-6xl ${
                  darkmode ? "text-gray-500" : "text-gray-300"
                } mx-auto mb-4`}
              />
              <h3
                className={`text-2xl font-bold ${
                  darkmode ? "text-gray-300" : "text-gray-600"
                } mb-2`}
              >
                No Bookings Found
              </h3>
              <p className={`${darkmode ? "text-gray-400" : "text-gray-500"}`}>
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "No booking requests available at the moment."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div
                className={`hidden lg:block ${
                  darkmode
                    ? "bg-gray-800/80 backdrop-blur-sm border-gray-700/50"
                    : "bg-white/80 backdrop-blur-sm border-white/20"
                } rounded-3xl shadow-2xl border overflow-hidden`}
              >
                <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
                  <table className="w-full min-w-[800px]">
                    <thead
                      className={`${
                        darkmode
                          ? "bg-gradient-to-r from-gray-700 to-gray-600"
                          : "bg-gradient-to-r from-blue-50 to-purple-50"
                      } sticky top-0 z-10`}
                    >
                      <tr>
                        <th
                          className={`px-4 py-3 text-left text-sm font-semibold ${
                            darkmode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Court
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-sm font-semibold ${
                            darkmode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          User
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-sm font-semibold ${
                            darkmode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Date
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-sm font-semibold ${
                            darkmode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Slots
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-sm font-semibold ${
                            darkmode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Price
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-sm font-semibold ${
                            darkmode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Status
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-sm font-semibold ${
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
                            className={`${
                              darkmode
                                ? "hover:bg-gray-700/50"
                                : "hover:bg-blue-50/50"
                            } transition-colors`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <MdSportsBasketball className="text-blue-500 text-sm" />
                                <span
                                  className={`font-medium text-sm ${
                                    darkmode ? "text-gray-200" : "text-gray-900"
                                  }`}
                                >
                                  {booking.courtType}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                <div
                                  className={`font-medium text-sm ${
                                    darkmode ? "text-gray-200" : "text-gray-900"
                                  }`}
                                >
                                  {booking.userName}
                                </div>
                                <div
                                  className={`text-xs ${
                                    darkmode ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  {booking.userEmail}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <MdCalendarToday className="text-purple-500 text-sm" />
                                <span
                                  className={`text-sm ${
                                    darkmode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  {booking.date}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <MdSchedule className="text-green-500 text-sm" />
                                <span
                                  className={`text-sm ${
                                    darkmode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  {booking.slots?.join(", ")}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <MdAttachMoney className="text-yellow-500 text-sm" />
                                <span
                                  className={`font-semibold text-sm ${
                                    darkmode ? "text-gray-200" : "text-gray-900"
                                  }`}
                                >
                                  ৳{booking.slots?.length * booking.price}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className={getStatusBadge(booking.status)}>
                                {getStatusIcon(booking.status)}
                                <span className="capitalize">
                                  {booking.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex space-x-1">
                                {booking.status === "pending" ? (
                                  <>
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => handleApprove(booking._id)}
                                      className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1 text-xs"
                                    >
                                      <FaCheck className="text-xs" />
                                      <span className="hidden xl:inline">
                                        Approve
                                      </span>
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => handleReject(booking._id)}
                                      className="px-2 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1 text-xs"
                                    >
                                      <FaTimes className="text-xs" />
                                      <span className="hidden xl:inline">
                                        Reject
                                      </span>
                                    </motion.button>
                                  </>
                                ) : (
                                  <span
                                    className={`px-2 py-1 rounded-lg font-semibold flex items-center space-x-1 text-xs ${
                                      darkmode
                                        ? "bg-green-900/30 text-green-300"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    <FaCheck className="text-xs" />
                                    <span className="hidden xl:inline">
                                      Confirmed
                                    </span>
                                  </span>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-6">
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
                          ? "bg-gray-800/80 backdrop-blur-sm border-gray-700/50"
                          : "bg-white/80 backdrop-blur-sm border-white/20"
                      } rounded-3xl p-6 shadow-2xl border`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3
                            className={`text-lg font-bold ${
                              darkmode ? "text-gray-200" : "text-gray-800"
                            } flex items-center space-x-2`}
                          >
                            <MdSportsBasketball className="text-blue-500" />
                            <span>{booking.courtType}</span>
                          </h3>
                          <p
                            className={`text-sm ${
                              darkmode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {booking.userName}
                          </p>
                        </div>
                        <div className={getStatusBadge(booking.status)}>
                          {getStatusIcon(booking.status)}
                          <span className="capitalize">{booking.status}</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div
                          className={`flex items-center space-x-2 text-sm ${
                            darkmode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <MdPerson className="text-purple-500" />
                          <span>{booking.userEmail}</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 text-sm ${
                            darkmode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <MdCalendarToday className="text-blue-500" />
                          <span>{booking.date}</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 text-sm ${
                            darkmode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <MdSchedule className="text-green-500" />
                          <span>{booking.slots?.join(", ")}</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 text-sm font-semibold ${
                            darkmode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          <MdAttachMoney className="text-yellow-500" />
                          <span>৳{booking.slots?.length * booking.price}</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        {booking.status === "pending" ? (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleApprove(booking._id)}
                              className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                              <FaCheck />
                              <span>Approve</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleReject(booking._id)}
                              className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                              <FaTimes />
                              <span>Reject</span>
                            </motion.button>
                          </>
                        ) : (
                          <div
                            className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 ${
                              darkmode
                                ? "bg-green-900/30 text-green-300"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            <FaCheck />
                            <span>Confirmed</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, color, bgColor, darkmode }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className={`${
      darkmode
        ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600/50"
        : `bg-gradient-to-br ${bgColor} border-white/20`
    } p-6 rounded-3xl shadow-xl border relative overflow-hidden`}
  >
    <div
      className={`absolute top-0 right-0 w-20 h-20 ${
        darkmode ? "bg-gray-600/20" : "bg-white/10"
      } rounded-full -translate-y-10 translate-x-10`}
    ></div>
    <div className="relative z-10 flex items-center space-x-4">
      <div
        className={`p-4 bg-gradient-to-br ${color} text-white rounded-2xl shadow-lg`}
      >
        <div className="text-2xl">{icon}</div>
      </div>
      <div>
        <h4
          className={`text-sm font-semibold ${
            darkmode ? "text-gray-400" : "text-gray-600"
          } mb-1`}
        >
          {title}
        </h4>
        <p
          className={`text-3xl font-bold ${
            darkmode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

export default ManageBookingsApproval;
