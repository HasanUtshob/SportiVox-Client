import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaSearch,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTableTennis,
  FaClock,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";
import {
  MdViewList,
  MdViewModule,
  MdRefresh,
  MdFilterList,
} from "react-icons/md";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";
import { Themecontext } from "../../Context/ThemeContext";

const ManageBookings = () => {
  const { darkmode } = useContext(Themecontext);
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("table");
  const axiosSecure = useAxios();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/bookings?paymentStatus=paid");
        setBookings(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not load bookings",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
          customClass: {
            popup: darkmode ? "dark-popup" : "",
          },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [axiosSecure, darkmode]);

  // Handle search
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const results = bookings.filter(
      (b) =>
        b.courtType?.toLowerCase().includes(lowerSearch) ||
        b.userEmail?.toLowerCase().includes(lowerSearch)
    );
    setFiltered(results);
  }, [search, bookings]);

  // Handle sorting
  useEffect(() => {
    let sorted = [...filtered];
    if (sortBy === "date") {
      sorted.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy === "price") {
      sorted.sort((a, b) => {
        const priceA = a.slots?.length * a.price;
        const priceB = b.slots?.length * b.price;
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      });
    }
    setFiltered(sorted);
  }, [sortBy, sortOrder]);

  // Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("BDT", "৳");
  };

  const refreshBookings = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/bookings?paymentStatus=paid");
      setBookings(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error refreshing bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
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
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
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

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative overflow-hidden ${
          darkmode
            ? "bg-gradient-to-r from-blue-700 via-purple-700 to-blue-900"
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"
        } text-white`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 mb-6">
              <FaCheckCircle className="text-green-400 text-2xl" />
              <span className="text-lg font-semibold">
                Confirmed Bookings Management
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Manage <span className="text-yellow-300">Confirmed</span> Bookings
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Monitor and manage all confirmed court bookings with advanced
              filtering and sorting options
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatsCard
            title="Total Bookings"
            value={filtered.length}
            icon={<FaCheckCircle />}
            color="from-green-500 to-emerald-600"
            bgColor={
              darkmode
                ? "from-gray-800 to-gray-700"
                : "from-green-50 to-emerald-50"
            }
            darkmode={darkmode}
          />
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(
              filtered.reduce(
                (sum, b) => sum + (b.slots?.length * b.price || 0),
                0
              )
            )}
            icon={<FaMoneyBillWave />}
            color="from-blue-500 to-cyan-600"
            bgColor={
              darkmode ? "from-gray-800 to-gray-700" : "from-blue-50 to-cyan-50"
            }
            darkmode={darkmode}
          />
          <StatsCard
            title="Total Sessions"
            value={filtered.reduce((sum, b) => sum + (b.slots?.length || 0), 0)}
            icon={<FaClock />}
            color="from-purple-500 to-pink-600"
            bgColor={
              darkmode
                ? "from-gray-800 to-gray-700"
                : "from-purple-50 to-pink-50"
            }
            darkmode={darkmode}
          />
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`${
            darkmode
              ? "bg-gray-800/80 border-gray-700/50"
              : "bg-white/80 border-white/20"
          } backdrop-blur-sm rounded-3xl p-6 shadow-xl border mb-8`}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center space-x-3">
              <MdFilterList className="text-2xl text-blue-600" />
              <h3
                className={`text-lg font-semibold ${
                  darkmode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Controls
              </h3>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <FaSearch
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    darkmode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by court type or user email..."
                  className={`w-full pl-12 pr-4 py-3 border ${
                    darkmode
                      ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-blue-500"
                      : "border-gray-200 bg-white/70 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                  } rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                />
              </div>

              {/* Sort Buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSort("date")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    sortBy === "date"
                      ? "bg-blue-500 text-white shadow-lg"
                      : darkmode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-white/70 text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  <FaCalendarAlt />
                  Date
                  {sortBy === "date" &&
                    (sortOrder === "asc" ? (
                      <FaSortAmountUp />
                    ) : (
                      <FaSortAmountDown />
                    ))}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSort("price")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    sortBy === "price"
                      ? "bg-green-500 text-white shadow-lg"
                      : darkmode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-white/70 text-gray-700 hover:bg-green-50"
                  }`}
                >
                  <FaMoneyBillWave />
                  Price
                  {sortBy === "price" &&
                    (sortOrder === "asc" ? (
                      <FaSortAmountUp />
                    ) : (
                      <FaSortAmountDown />
                    ))}
                </motion.button>
              </div>

              {/* View Toggle Buttons - Hidden on mobile */}
              <div className="hidden md:flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("table")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "table"
                      ? "bg-blue-500 text-white shadow-lg"
                      : darkmode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <MdViewList />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("cards")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "cards"
                      ? "bg-blue-500 text-white shadow-lg"
                      : darkmode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <MdViewModule />
                </motion.button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={refreshBookings}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <MdRefresh />
                  <span className="hidden sm:inline">Refresh</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bookings Display */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div
                className={`${
                  darkmode
                    ? "bg-gray-800/80 border-gray-700/50"
                    : "bg-white/80 border-white/20"
                } backdrop-blur-sm rounded-3xl p-12 shadow-xl border max-w-md mx-auto`}
              >
                <FaTableTennis
                  className={`text-6xl ${
                    darkmode ? "text-gray-600" : "text-gray-300"
                  } mx-auto mb-6`}
                />
                <h3
                  className={`text-2xl font-bold ${
                    darkmode ? "text-gray-300" : "text-gray-700"
                  } mb-4`}
                >
                  No Bookings Found
                </h3>
                <p
                  className={`${darkmode ? "text-gray-400" : "text-gray-500"}`}
                >
                  {search
                    ? "No bookings match your search criteria."
                    : "No confirmed bookings available at the moment."}
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Desktop Table View - Hidden on mobile */}
              {viewMode === "table" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className={`hidden md:block ${
                    darkmode
                      ? "bg-gray-800/80 border-gray-700/50"
                      : "bg-white/80 border-white/20"
                  } backdrop-blur-sm rounded-3xl shadow-xl border overflow-hidden`}
                >
                  <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                    <table className="w-full">
                      <thead
                        className={`${
                          darkmode
                            ? "bg-gradient-to-r from-gray-700 to-gray-600"
                            : "bg-gradient-to-r from-gray-50 to-gray-100"
                        } sticky top-0 z-10`}
                      >
                        <tr>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            } uppercase tracking-wider`}
                          >
                            <div className="flex items-center gap-2">
                              <FaTableTennis className="text-blue-500" />
                              Court
                            </div>
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            } uppercase tracking-wider`}
                          >
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-green-500" />
                              Date
                            </div>
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            } uppercase tracking-wider`}
                          >
                            <div className="flex items-center gap-2">
                              <FaClock className="text-purple-500" />
                              Time Slots
                            </div>
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            } uppercase tracking-wider`}
                          >
                            Sessions
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            } uppercase tracking-wider`}
                          >
                            <div className="flex items-center gap-2">
                              <FaMoneyBillWave className="text-yellow-500" />
                              Total Price
                            </div>
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            } uppercase tracking-wider`}
                          >
                            <div className="flex items-center gap-2">
                              <FaUser className="text-pink-500" />
                              User
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={`divide-y ${
                          darkmode ? "divide-gray-700" : "divide-gray-100"
                        }`}
                      >
                        {filtered.map((booking, index) => (
                          <motion.tr
                            key={booking._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`${
                              darkmode
                                ? "hover:bg-gray-700/50"
                                : "hover:bg-blue-50/50"
                            } transition-colors duration-200`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                                  <FaTableTennis className="text-white text-sm" />
                                </div>
                                <div
                                  className={`font-medium ${
                                    darkmode ? "text-gray-200" : "text-gray-900"
                                  }`}
                                >
                                  {booking.courtType}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className={`text-sm font-medium ${
                                  darkmode ? "text-gray-300" : "text-gray-900"
                                }`}
                              >
                                {formatDate(booking.date)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {booking.slots?.map((slot, idx) => (
                                  <span
                                    key={idx}
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      darkmode
                                        ? "bg-purple-900/50 text-purple-300"
                                        : "bg-purple-100 text-purple-800"
                                    }`}
                                  >
                                    {slot}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  darkmode
                                    ? "bg-green-900/50 text-green-300"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {booking.slots?.length} sessions
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-lg font-bold text-green-600">
                                {formatCurrency(
                                  booking.slots?.length * booking.price
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mr-3">
                                  <FaUser className="text-white text-xs" />
                                </div>
                                <div
                                  className={`text-sm ${
                                    darkmode ? "text-gray-300" : "text-gray-900"
                                  }`}
                                >
                                  {booking.userEmail}
                                </div>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Card View - Always visible on mobile, conditional on desktop */}
              <div
                className={`${
                  viewMode === "table" ? "block md:hidden" : "block"
                } space-y-4`}
              >
                {filtered.map((booking, index) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`${
                      darkmode
                        ? "bg-gray-800/80 border-gray-700/50 hover:shadow-gray-900/50"
                        : "bg-white/80 border-white/20 hover:shadow-xl"
                    } backdrop-blur-sm rounded-2xl p-6 shadow-lg border transition-all duration-300`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                          <FaTableTennis className="text-white text-lg" />
                        </div>
                        <div>
                          <h3
                            className={`text-lg font-bold ${
                              darkmode ? "text-gray-100" : "text-gray-900"
                            }`}
                          >
                            {booking.courtType}
                          </h3>
                          <p
                            className={`text-sm ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {formatDate(booking.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(
                            booking.slots?.length * booking.price
                          )}
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            darkmode
                              ? "bg-green-900/50 text-green-300"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {booking.slots?.length} sessions
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            darkmode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Time Slots:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {booking.slots?.map((slot, idx) => (
                            <span
                              key={idx}
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                darkmode
                                  ? "bg-purple-900/50 text-purple-300"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {slot}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`flex items-center pt-3 border-t ${
                          darkmode ? "border-gray-700" : "border-gray-100"
                        }`}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mr-3">
                          <FaUser className="text-white text-xs" />
                        </div>
                        <span
                          className={`text-sm ${
                            darkmode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {booking.userEmail}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon, color, bgColor, darkmode }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className={`bg-gradient-to-br ${bgColor} p-6 rounded-3xl shadow-xl border ${
      darkmode ? "border-gray-700/50" : "border-white/20"
    } relative overflow-hidden`}
  >
    <div
      className={`absolute top-0 right-0 w-20 h-20 ${
        darkmode ? "bg-gray-600/10" : "bg-white/10"
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

export default ManageBookings;
