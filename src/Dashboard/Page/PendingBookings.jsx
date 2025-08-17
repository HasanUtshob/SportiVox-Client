import React, { useEffect, useState, useContext } from "react";
import { FaSearch, FaTimes, FaHourglassHalf } from "react-icons/fa";
import {
  MdPendingActions,
  MdCalendarToday,
  MdSchedule,
  MdAttachMoney,
  MdSportsBasketball,
  MdRefresh,
  MdFilterList,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";
import { Themecontext } from "../../Context/ThemeContext";

const PendingBookings = () => {
  const { darkmode } = useContext(Themecontext);
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [pendingBookings, setPendingBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPendingBookings = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(
        `/bookings?status=pending&email=${user?.email}`
      );
      setPendingBookings(res.data);
      setFilteredBookings(res.data);
    } catch (err) {
      console.error("Error fetching pending bookings:", err);
      Swal.fire({
        title: "Error",
        text: "Could not load pending bookings",
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
      fetchPendingBookings();
    }
  }, [user?.email]);

  // Filter bookings based on search
  useEffect(() => {
    if (searchTerm) {
      const filtered = pendingBookings.filter(
        (booking) =>
          booking.courtType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.slots?.some((slot) =>
            slot.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(pendingBookings);
    }
  }, [searchTerm, pendingBookings]);

  const handleCancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "This action cannot be undone. Your booking will be permanently cancelled.",
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
        setLoading(true);
        const res = await axiosSecure.delete(`/bookings/${id}`);
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
          fetchPendingBookings();
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
        setLoading(false);
      }
    }
  };

  const calculateTotalAmount = () => {
    return pendingBookings.reduce(
      (total, booking) => total + booking.slots?.length * booking.price,
      0
    );
  };

  const calculateTotalSessions = () => {
    return pendingBookings.reduce(
      (total, booking) => total + booking.slots?.length,
      0
    );
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center space-x-3 ${
              darkmode
                ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            }`}
          >
            <MdPendingActions
              className={`${darkmode ? "text-blue-400" : "text-blue-600"}`}
            />
            <span>My Pending Bookings</span>
          </h1>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              darkmode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Track and manage your pending court booking requests
          </p>
          <div
            className={`w-24 h-1 mx-auto mt-4 rounded-full ${
              darkmode
                ? "bg-gradient-to-r from-blue-400 to-purple-500"
                : "bg-gradient-to-r from-blue-500 to-purple-600"
            }`}
          ></div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatsCard
            title="Pending Bookings"
            value={pendingBookings.length}
            icon={<MdPendingActions />}
            color="from-yellow-500 to-orange-500"
            bgColor={
              darkmode
                ? "from-yellow-900/30 to-orange-900/30"
                : "from-yellow-50 to-orange-50"
            }
          />
          <StatsCard
            title="Total Sessions"
            value={calculateTotalSessions()}
            icon={<MdSchedule />}
            color="from-blue-500 to-cyan-500"
            bgColor={
              darkmode
                ? "from-blue-900/30 to-cyan-900/30"
                : "from-blue-50 to-cyan-50"
            }
          />
          <StatsCard
            title="Total Amount"
            value={`৳${calculateTotalAmount()}`}
            icon={<MdAttachMoney />}
            color="from-green-500 to-emerald-500"
            bgColor={
              darkmode
                ? "from-green-900/30 to-emerald-900/30"
                : "from-green-50 to-emerald-50"
            }
          />
        </motion.div>

        {/* Search and Filters */}
        {pendingBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${
              darkmode
                ? "bg-gray-800/90 border-gray-700/50"
                : "bg-white/80 border-white/20"
            } backdrop-blur-sm rounded-3xl p-6 shadow-2xl border mb-8`}
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
                  Search & Filter
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
                    placeholder="Search by court type, date, or time slot..."
                    className={`w-full pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      darkmode
                        ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                        : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                    } border`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchPendingBookings}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <MdRefresh />
                  <span>Refresh</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

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
                  ? "bg-gray-800/90 border-gray-700/50"
                  : "bg-white/80 border-white/20"
              } backdrop-blur-sm rounded-3xl p-12 shadow-2xl border text-center`}
            >
              <FaHourglassHalf
                className={`text-6xl mx-auto mb-4 ${
                  darkmode ? "text-gray-600" : "text-gray-300"
                }`}
              />
              <h3
                className={`text-2xl font-bold mb-2 ${
                  darkmode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {searchTerm ? "No Matching Bookings" : "No Pending Bookings"}
              </h3>
              <p className={`${darkmode ? "text-gray-400" : "text-gray-500"}`}>
                {searchTerm
                  ? "Try adjusting your search terms to find more results."
                  : "You don't have any pending booking requests at the moment."}
              </p>
              {searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Clear Search
                </motion.button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div
                className={`hidden lg:block ${
                  darkmode
                    ? "bg-gray-800/90 border-gray-700/50"
                    : "bg-white/80 border-white/20"
                } backdrop-blur-sm rounded-3xl shadow-2xl border overflow-hidden`}
              >
                <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
                  <table className="w-full">
                    <thead
                      className={`${
                        darkmode
                          ? "bg-gradient-to-r from-blue-900/30 to-purple-900/30"
                          : "bg-gradient-to-r from-blue-50 to-purple-50"
                      } sticky top-0 z-10`}
                    >
                      <tr>
                        <th
                          className={`px-6 py-4 text-left text-sm font-semibold ${
                            darkmode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Court
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
                          Status
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
                                ? "hover:bg-blue-900/20"
                                : "hover:bg-blue-50/50"
                            }`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <MdSportsBasketball className="text-blue-500" />
                                <span
                                  className={`font-medium ${
                                    darkmode ? "text-gray-200" : "text-gray-800"
                                  }`}
                                >
                                  {booking.courtType}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <MdCalendarToday className="text-purple-500" />
                                <span
                                  className={`${
                                    darkmode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  {booking.date}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {booking.slots?.map((slot, idx) => (
                                  <span
                                    key={idx}
                                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                      darkmode
                                        ? "bg-blue-900/50 text-blue-300"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    {slot}
                                  </span>
                                ))}
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
                                {booking.slots?.length} sessions
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <MdAttachMoney className="text-green-500" />
                                <span
                                  className={`font-semibold text-lg ${
                                    darkmode ? "text-gray-200" : "text-gray-800"
                                  }`}
                                >
                                  ৳{booking.slots?.length * booking.price}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div
                                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
                                  darkmode
                                    ? "bg-yellow-900/50 text-yellow-300"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                <MdPendingActions className="text-yellow-500" />
                                <span className="capitalize">
                                  {booking.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCancelBooking(booking._id)}
                                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1"
                              >
                                <FaTimes />
                                <span>Cancel</span>
                              </motion.button>
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
                          ? "bg-gray-800/90 border-gray-700/50"
                          : "bg-white/80 border-white/20"
                      } backdrop-blur-sm rounded-3xl p-6 shadow-2xl border`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3
                            className={`text-lg font-bold flex items-center space-x-2 ${
                              darkmode ? "text-gray-100" : "text-gray-800"
                            }`}
                          >
                            <MdSportsBasketball className="text-blue-500" />
                            <span>{booking.courtType}</span>
                          </h3>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 w-fit mt-2 ${
                              darkmode
                                ? "bg-yellow-900/50 text-yellow-300"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            <MdPendingActions className="text-yellow-500" />
                            <span className="capitalize">{booking.status}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`flex items-center space-x-1 text-lg font-bold ${
                              darkmode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            <MdAttachMoney className="text-green-500" />
                            <span>
                              ৳{booking.slots?.length * booking.price}
                            </span>
                          </div>
                          <span
                            className={`text-sm ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {booking.slots?.length} sessions
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div
                          className={`flex items-center space-x-2 text-sm ${
                            darkmode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <MdCalendarToday className="text-purple-500" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="space-y-2">
                          <div
                            className={`flex items-center space-x-2 text-sm ${
                              darkmode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            <MdSchedule className="text-green-500" />
                            <span>Time Slots:</span>
                          </div>
                          <div className="flex flex-wrap gap-2 ml-6">
                            {booking.slots?.map((slot, idx) => (
                              <span
                                key={idx}
                                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                                  darkmode
                                    ? "bg-blue-900/50 text-blue-300"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCancelBooking(booking._id)}
                        className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <FaTimes />
                        <span>Cancel Booking</span>
                      </motion.button>
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

const StatsCard = ({ title, value, icon, color, bgColor }) => {
  const { darkmode } = useContext(Themecontext);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-gradient-to-br ${bgColor} p-6 rounded-3xl shadow-xl ${
        darkmode ? "border-gray-700/50" : "border-white/20"
      } border relative overflow-hidden`}
    >
      <div
        className={`absolute top-0 right-0 w-20 h-20 ${
          darkmode ? "bg-white/5" : "bg-white/10"
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
            className={`text-sm font-semibold mb-1 ${
              darkmode ? "text-gray-400" : "text-gray-600"
            }`}
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
};

export default PendingBookings;
