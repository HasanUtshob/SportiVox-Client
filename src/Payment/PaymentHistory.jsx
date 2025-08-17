import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { Themecontext } from "../Context/ThemeContext";
import {
  FaMoneyCheckAlt,
  FaUser,
  FaHashtag,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaCalendarAlt,
  FaCreditCard,
  FaReceipt,
  FaChartLine,
  FaWallet,
  FaTimes,
  FaCheck,
  FaClock,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import {
  MdDateRange,
  MdPayment,
  MdTrendingUp,
  MdAccountBalanceWallet,
  MdHistory,
  MdFilterList,
  MdViewModule,
  MdViewList,
  MdRefresh,
} from "react-icons/md";
import { BsCurrencyDollar, BsReceipt, BsGraphUp } from "react-icons/bs";
import useAxios from "../hooks/useAxios";
import Loading from "../Component/Loading";
import Swal from "sweetalert2";

const PaymentHistory = () => {
  const { user } = useAuth();
  const { darkmode } = useContext(Themecontext);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const axiosSecure = useAxios();

  useEffect(() => {
    if (user?.email) {
      fetchPayments();
    }
  }, [user?.email, axiosSecure]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      setPayments(res.data);
      setFilteredPayments(res.data);
    } catch (err) {
      console.error("Payment fetch error", err);
      Swal.fire({
        title: "Error",
        text: "Failed to load payment history",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...payments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.transactionId
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(
            (payment) => new Date(payment.date) >= filterDate
          );
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(
            (payment) => new Date(payment.date) >= filterDate
          );
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(
            (payment) => new Date(payment.date) >= filterDate
          );
          break;
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1);
          filtered = filtered.filter(
            (payment) => new Date(payment.date) >= filterDate
          );
          break;
      }
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredPayments(filtered);
  }, [payments, searchTerm, statusFilter, dateFilter, sortBy, sortOrder]);

  // Calculate statistics
  const totalAmount = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const paidAmount = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const totalTransactions = payments.length;

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
  };

  const handleExport = () => {
    Swal.fire({
      title: "Export Payment History",
      text: "This feature will be available soon!",
      icon: "info",
      confirmButtonColor: "#3B82F6",
    });
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
            <MdHistory
              className={`${darkmode ? "text-blue-400" : "text-blue-600"}`}
            />
            <span>Payment History</span>
          </h1>
          <p
            className={`text-xl ${
              darkmode ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Track and manage all your payment transactions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatsCard
            title="Total Transactions"
            value={totalTransactions}
            icon={<MdPayment />}
            color="from-blue-500 to-cyan-500"
            bgColor="from-blue-50 to-cyan-50"
            trend="+12%"
            darkmode={darkmode}
          />
          <StatsCard
            title="Total Amount"
            value={`৳${totalAmount}`}
            icon={<MdAccountBalanceWallet />}
            color="from-green-500 to-emerald-500"
            bgColor="from-green-50 to-emerald-50"
            trend="+8%"
            darkmode={darkmode}
          />
          <StatsCard
            title="Paid Amount"
            value={`৳${paidAmount}`}
            icon={<FaCheck />}
            color="from-emerald-500 to-green-500"
            bgColor="from-emerald-50 to-green-50"
            trend="+15%"
            darkmode={darkmode}
          />
          <StatsCard
            title="Pending Amount"
            value={`৳${pendingAmount}`}
            icon={<FaClock />}
            color="from-yellow-500 to-orange-500"
            bgColor="from-yellow-50 to-orange-50"
            trend="-5%"
            darkmode={darkmode}
          />
        </motion.div>

        {/* Controls */}
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
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FaSearch
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    darkmode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search transactions, booking ID..."
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    darkmode
                      ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                      : "border-gray-200 bg-white text-gray-900 placeholder-gray-500"
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkmode
                    ? "border-gray-600 bg-gray-700 text-gray-200"
                    : "border-gray-200 bg-white text-gray-900"
                }`}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={`px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkmode
                    ? "border-gray-600 bg-gray-700 text-gray-200"
                    : "border-gray-200 bg-white text-gray-900"
                }`}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className={`px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkmode
                    ? "border-gray-600 bg-gray-700 text-gray-200"
                    : "border-gray-200 bg-white text-gray-900"
                }`}
              >
                <option value="date-desc">Latest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
                <option value="status-asc">Status A-Z</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTable(!showTable)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                {showTable ? <MdViewModule /> : <MdViewList />}
                <span className="hidden sm:inline">
                  {showTable ? "Card View" : "Table View"}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchPayments}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <MdRefresh />
                <span className="hidden sm:inline">Refresh</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <FaDownload />
                <span className="hidden sm:inline">Export</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {filteredPayments.length === 0 ? (
            <div
              className={`${
                darkmode
                  ? "bg-gray-800/80 backdrop-blur-sm border-gray-700/50"
                  : "bg-white/80 backdrop-blur-sm border-white/20"
              } rounded-3xl p-12 shadow-2xl border text-center`}
            >
              <FaWallet
                className={`text-6xl ${
                  darkmode ? "text-gray-500" : "text-gray-300"
                } mx-auto mb-4`}
              />
              <h3
                className={`text-2xl font-bold ${
                  darkmode ? "text-gray-300" : "text-gray-600"
                } mb-2`}
              >
                {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                  ? "No Matching Payments"
                  : "No Payment History"}
              </h3>
              <p className={`${darkmode ? "text-gray-400" : "text-gray-500"}`}>
                {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                  ? "Try adjusting your search or filters to find more results."
                  : "You haven't made any payments yet."}
              </p>
              {(searchTerm ||
                statusFilter !== "all" ||
                dateFilter !== "all") && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setDateFilter("all");
                  }}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Clear Filters
                </motion.button>
              )}
            </div>
          ) : showTable ? (
            // Table View
            <div
              className={`${
                darkmode
                  ? "bg-gray-800/80 backdrop-blur-sm border-gray-700/50"
                  : "bg-white/80 backdrop-blur-sm border-white/20"
              } rounded-3xl shadow-2xl border overflow-hidden`}
            >
              <div className="max-h-[600px] overflow-y-auto">
                <table className="w-full">
                  <thead
                    className={`${
                      darkmode
                        ? "bg-gradient-to-r from-gray-700 to-gray-600"
                        : "bg-gradient-to-r from-blue-50 to-purple-50"
                    } sticky top-0 z-10`}
                  >
                    <tr>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkmode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        #
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
                        Amount
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
                        Transaction ID
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
                    className={`divide-y ${
                      darkmode ? "divide-gray-600" : "divide-gray-100"
                    }`}
                  >
                    <AnimatePresence>
                      {filteredPayments.map((payment, index) => (
                        <motion.tr
                          key={payment._id}
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
                          <td
                            className={`px-6 py-4 text-sm font-medium ${
                              darkmode ? "text-gray-200" : "text-gray-900"
                            }`}
                          >
                            #{index + 1}
                          </td>
                          <td
                            className={`px-6 py-4 text-sm ${
                              darkmode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                          <td
                            className={`px-6 py-4 text-sm font-semibold ${
                              darkmode ? "text-gray-200" : "text-gray-900"
                            }`}
                          >
                            ৳{payment.amount}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge
                              status={payment.status}
                              darkmode={darkmode}
                            />
                          </td>
                          <td
                            className={`px-6 py-4 text-sm font-mono ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {payment.transactionId.substring(0, 20)}...
                          </td>
                          <td className="px-6 py-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleViewDetails(payment)}
                              className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1"
                            >
                              <FaEye />
                              <span>View</span>
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // Card View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredPayments.map((payment, index) => (
                  <motion.div
                    key={payment._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${
                      darkmode
                        ? "bg-gray-800/80 backdrop-blur-sm border-gray-700/50"
                        : "bg-white/80 backdrop-blur-sm border-white/20"
                    } rounded-3xl p-6 shadow-2xl border hover:shadow-3xl hover:-translate-y-2 transition-all duration-300`}
                  >
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 ${
                            darkmode
                              ? "bg-gradient-to-br from-gray-600/30 to-gray-500/30"
                              : "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                          } rounded-2xl`}
                        >
                          <FaReceipt
                            className={`${
                              darkmode ? "text-blue-400" : "text-blue-600"
                            } text-xl`}
                          />
                        </div>
                        <div>
                          <h3
                            className={`text-lg font-bold ${
                              darkmode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            Payment #{index + 1}
                          </h3>
                          <p
                            className={`text-sm ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {new Date(payment.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <StatusBadge
                        status={payment.status}
                        darkmode={darkmode}
                      />
                    </div>

                    {/* Payment Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span
                          className={`${
                            darkmode ? "text-gray-400" : "text-gray-600"
                          } flex items-center space-x-2`}
                        >
                          <BsCurrencyDollar className="text-green-500" />
                          <span>Amount:</span>
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            darkmode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          ৳{payment.amount}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`${
                            darkmode ? "text-gray-400" : "text-gray-600"
                          } flex items-center space-x-2`}
                        >
                          <FaUser className="text-blue-500" />
                          <span>Email:</span>
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            darkmode ? "text-gray-300" : "text-gray-800"
                          } truncate max-w-32`}
                        >
                          {payment.userEmail}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`${
                            darkmode ? "text-gray-400" : "text-gray-600"
                          } flex items-center space-x-2`}
                        >
                          <FaHashtag className="text-purple-500" />
                          <span>Booking:</span>
                        </span>
                        <span
                          className={`text-sm font-mono ${
                            darkmode ? "text-gray-300" : "text-gray-800"
                          } truncate max-w-32`}
                        >
                          {payment.bookingId}
                        </span>
                      </div>
                    </div>

                    {/* Transaction ID */}
                    <div
                      className={`border-t ${
                        darkmode ? "border-gray-600" : "border-gray-200"
                      } pt-4 mb-6`}
                    >
                      <div className="flex items-start space-x-2">
                        <BsReceipt
                          className={`${
                            darkmode ? "text-gray-500" : "text-gray-400"
                          } mt-1 flex-shrink-0`}
                        />
                        <div className="flex-1">
                          <p
                            className={`text-xs font-medium ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            } mb-1`}
                          >
                            Transaction ID
                          </p>
                          <p
                            className={`text-xs font-mono ${
                              darkmode ? "text-gray-300" : "text-gray-600"
                            } break-all`}
                          >
                            {payment.transactionId}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleViewDetails(payment)}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <FaEye />
                      <span>View Details</span>
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      {/* Payment Details Modal */}
      <AnimatePresence>
        {selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPayment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`${
                darkmode ? "bg-gray-800" : "bg-white"
              } rounded-3xl shadow-2xl overflow-hidden w-full max-w-md relative`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Payment Details</h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedPayment(null)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <FaTimes />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className={`${
                      darkmode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Amount:
                  </span>
                  <span
                    className={`text-2xl font-bold ${
                      darkmode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    ৳{selectedPayment.amount}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`${
                      darkmode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Status:
                  </span>
                  <StatusBadge
                    status={selectedPayment.status}
                    darkmode={darkmode}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`${
                      darkmode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Date:
                  </span>
                  <span
                    className={`font-medium ${
                      darkmode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {new Date(selectedPayment.date).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`${
                      darkmode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Email:
                  </span>
                  <span
                    className={`font-medium text-sm ${
                      darkmode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {selectedPayment.userEmail}
                  </span>
                </div>

                <div
                  className={`border-t ${
                    darkmode ? "border-gray-600" : "border-gray-200"
                  } pt-4`}
                >
                  <p
                    className={`text-sm font-medium ${
                      darkmode ? "text-gray-400" : "text-gray-600"
                    } mb-2`}
                  >
                    Booking ID:
                  </p>
                  <p
                    className={`font-mono text-sm ${
                      darkmode
                        ? "text-gray-300 bg-gray-700"
                        : "text-gray-800 bg-gray-50"
                    } p-2 rounded`}
                  >
                    {selectedPayment.bookingId}
                  </p>
                </div>

                <div
                  className={`border-t ${
                    darkmode ? "border-gray-600" : "border-gray-200"
                  } pt-4`}
                >
                  <p
                    className={`text-sm font-medium ${
                      darkmode ? "text-gray-400" : "text-gray-600"
                    } mb-2`}
                  >
                    Transaction ID:
                  </p>
                  <p
                    className={`font-mono text-sm ${
                      darkmode
                        ? "text-gray-300 bg-gray-700"
                        : "text-gray-800 bg-gray-50"
                    } p-2 rounded break-all`}
                  >
                    {selectedPayment.transactionId}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon, color, bgColor, trend, darkmode }) => (
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
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <h4
          className={`text-sm font-semibold ${
            darkmode ? "text-gray-400" : "text-gray-600"
          } mb-1`}
        >
          {title}
        </h4>
        <p
          className={`text-2xl font-bold ${
            darkmode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {value}
        </p>
        {trend && (
          <div className="flex items-center mt-2 text-sm">
            {trend.startsWith("+") ? (
              <FaArrowUp className="text-green-500 mr-1" />
            ) : (
              <FaArrowDown className="text-red-500 mr-1" />
            )}
            <span
              className={
                trend.startsWith("+") ? "text-green-600" : "text-red-600"
              }
            >
              {trend}
            </span>
            <span
              className={`${darkmode ? "text-gray-400" : "text-gray-500"} ml-1`}
            >
              vs last month
            </span>
          </div>
        )}
      </div>
      <div
        className={`p-4 bg-gradient-to-br ${color} text-white rounded-2xl shadow-lg`}
      >
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  </motion.div>
);

// Status Badge Component
const StatusBadge = ({ status, darkmode }) => {
  const getStatusConfig = (status, darkmode) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return {
          bg: darkmode ? "bg-green-900/30" : "bg-green-100",
          text: darkmode ? "text-green-300" : "text-green-800",
          icon: <FaCheck className="text-xs" />,
          border: darkmode ? "border-green-700/50" : "border-green-200",
        };
      case "pending":
        return {
          bg: darkmode ? "bg-yellow-900/30" : "bg-yellow-100",
          text: darkmode ? "text-yellow-300" : "text-yellow-800",
          icon: <FaClock className="text-xs" />,
          border: darkmode ? "border-yellow-700/50" : "border-yellow-200",
        };
      case "failed":
        return {
          bg: darkmode ? "bg-red-900/30" : "bg-red-100",
          text: darkmode ? "text-red-300" : "text-red-800",
          icon: <FaTimes className="text-xs" />,
          border: darkmode ? "border-red-700/50" : "border-red-200",
        };
      default:
        return {
          bg: darkmode ? "bg-gray-700/30" : "bg-gray-100",
          text: darkmode ? "text-gray-300" : "text-gray-800",
          icon: <FaClock className="text-xs" />,
          border: darkmode ? "border-gray-600/50" : "border-gray-200",
        };
    }
  };

  const config = getStatusConfig(status, darkmode);

  return (
    <span
      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} ${config.border} border`}
    >
      {config.icon}
      <span className="capitalize">{status}</span>
    </span>
  );
};

export default PaymentHistory;
