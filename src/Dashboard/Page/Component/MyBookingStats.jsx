import React, { useEffect, useState, useContext } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaDollarSign,
  FaTimesCircle,
  FaChartBar,
  FaUser,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import CardTemp from "./CardTemp";
import { MdOutlinePendingActions } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Component/Loading";
import { motion } from "framer-motion";
import { Themecontext } from "../../../Context/ThemeContext";

const MyBookingStats = () => {
  const { darkmode } = useContext(Themecontext);
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    paid: 0,
    unpaid: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/bookings?email=${user.email}`)
        .then((res) => {
          const data = res.data;
          const pending = data.filter((b) => b.status === "pending").length;
          const approved = data.filter((b) => b.status === "approved").length;
          const paid = data.filter((b) => b.paymentStatus === "paid").length;
          const unpaid = data.filter(
            (b) => b.paymentStatus === "unpaid"
          ).length;

          setStats({
            total: data.length,
            pending,
            approved,
            paid,
            unpaid,
          });
        })
        .catch((error) => console.error("Error fetching bookings:", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user?.email, axiosSecure]);

  const chartData = [
    { name: "Total", count: stats.total, fill: "#3B82F6" },
    { name: "Pending", count: stats.pending, fill: "#F59E0B" },
    { name: "Approved", count: stats.approved, fill: "#10B981" },
    { name: "Paid", count: stats.paid, fill: "#8B5CF6" },
    { name: "Unpaid", count: stats.unpaid, fill: "#EF4444" },
  ];

  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        darkmode ? "dark" : ""
      }`}
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div
          className={`inline-flex items-center space-x-3 ${
            darkmode
              ? "bg-gray-800/90 border-gray-700/50"
              : "bg-white/80 border-white/20"
          } backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border`}
        >
          <FaUser className="text-blue-500 text-2xl" />
          <span
            className={`text-lg font-semibold ${
              darkmode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Welcome back, {user?.displayName || "User"}! 🎾
          </span>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
      >
        <CardTemp
          title="Total Bookings"
          value={stats.total}
          icon={<FaClock className="text-blue-500 text-2xl" />}
          gradient="from-blue-500 to-cyan-500"
          bgGradient={
            darkmode
              ? "from-blue-900/30 to-cyan-900/30"
              : "from-blue-50 to-cyan-50"
          }
          delay={0.1}
        />
        <CardTemp
          title="Pending"
          value={stats.pending}
          icon={<MdOutlinePendingActions className="text-amber-600 text-2xl" />}
          gradient="from-amber-500 to-orange-500"
          bgGradient={
            darkmode
              ? "from-amber-900/30 to-orange-900/30"
              : "from-amber-50 to-orange-50"
          }
          delay={0.2}
        />
        <CardTemp
          title="Approved"
          value={stats.approved}
          icon={<FaCheckCircle className="text-green-500 text-2xl" />}
          gradient="from-green-500 to-emerald-500"
          bgGradient={
            darkmode
              ? "from-green-900/30 to-emerald-900/30"
              : "from-green-50 to-emerald-50"
          }
          delay={0.3}
        />
        <CardTemp
          title="Paid"
          value={stats.paid}
          icon={<FaDollarSign className="text-purple-500 text-2xl" />}
          gradient="from-purple-500 to-indigo-500"
          bgGradient={
            darkmode
              ? "from-purple-900/30 to-indigo-900/30"
              : "from-purple-50 to-indigo-50"
          }
          delay={0.4}
        />
        <CardTemp
          title="Unpaid"
          value={stats.unpaid}
          icon={<FaTimesCircle className="text-red-500 text-2xl" />}
          gradient="from-red-500 to-pink-500"
          bgGradient={
            darkmode
              ? "from-red-900/30 to-pink-900/30"
              : "from-red-50 to-pink-50"
          }
          delay={0.5}
        />
      </motion.div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`${
          darkmode
            ? "bg-gray-800/90 border-gray-700/50 dark:bg-gray-800/90 dark:border-gray-700/50"
            : "bg-white/80 border-white/20"
        } backdrop-blur-sm rounded-3xl p-8 shadow-2xl border`}
      >
        <div className="flex items-center space-x-3 mb-8">
          <div
            className={`p-3 ${
              darkmode
                ? "bg-gradient-to-br from-blue-600 to-purple-700"
                : "bg-gradient-to-br from-blue-500 to-purple-600"
            } text-white rounded-xl`}
          >
            <FaChartBar className="text-xl" />
          </div>
          <h2
            className={`text-2xl font-bold ${
              darkmode ? "text-gray-100 dark:text-gray-100" : "text-gray-800"
            }`}
          >
            Booking Summary Overview
          </h2>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkmode ? "#374151" : "#E5E7EB"}
              />
              <XAxis
                dataKey="name"
                tick={{
                  fill: darkmode ? "#D1D5DB" : "#6B7280",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
                axisLine={{ stroke: darkmode ? "#4B5563" : "#D1D5DB" }}
              />
              <YAxis
                allowDecimals={false}
                tick={{
                  fill: darkmode ? "#D1D5DB" : "#6B7280",
                  fontSize: 12,
                }}
                axisLine={{ stroke: darkmode ? "#4B5563" : "#D1D5DB" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkmode
                    ? "rgba(31, 41, 55, 0.95)"
                    : "rgba(0, 0, 0, 0.8)",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                }}
                cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
              <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
                stroke="#ffffff"
                strokeWidth={2}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Additional Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`text-center p-4 rounded-2xl ${
              darkmode
                ? "bg-gradient-to-br from-blue-900/30 to-cyan-900/30"
                : "bg-gradient-to-br from-blue-50 to-cyan-50"
            }`}
          >
            <div
              className={`text-2xl font-bold ${
                darkmode ? "text-blue-400 dark:text-blue-400" : "text-blue-600"
              }`}
            >
              {stats.total}
            </div>
            <div
              className={`text-sm ${
                darkmode ? "text-gray-400 dark:text-gray-400" : "text-gray-600"
              }`}
            >
              Total Activities
            </div>
          </div>
          <div
            className={`text-center p-4 rounded-2xl ${
              darkmode
                ? "bg-gradient-to-br from-green-900/30 to-emerald-900/30"
                : "bg-gradient-to-br from-green-50 to-emerald-50"
            }`}
          >
            <div
              className={`text-2xl font-bold ${
                darkmode
                  ? "text-green-400 dark:text-green-400"
                  : "text-green-600"
              }`}
            >
              {stats.total > 0
                ? Math.round((stats.approved / stats.total) * 100)
                : 0}
              %
            </div>
            <div
              className={`text-sm ${
                darkmode ? "text-gray-400 dark:text-gray-400" : "text-gray-600"
              }`}
            >
              Success Rate
            </div>
          </div>
          <div
            className={`text-center p-4 rounded-2xl ${
              darkmode
                ? "bg-gradient-to-br from-purple-900/30 to-indigo-900/30"
                : "bg-gradient-to-br from-purple-50 to-indigo-50"
            }`}
          >
            <div
              className={`text-2xl font-bold ${
                darkmode
                  ? "text-purple-400 dark:text-purple-400"
                  : "text-purple-600"
              }`}
            >
              {stats.total > 0
                ? Math.round((stats.paid / stats.total) * 100)
                : 0}
              %
            </div>
            <div
              className={`text-sm ${
                darkmode ? "text-gray-400 dark:text-gray-400" : "text-gray-600"
              }`}
            >
              Payment Rate
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyBookingStats;
