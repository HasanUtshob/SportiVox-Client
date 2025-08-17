import React, { useEffect, useState, useContext } from "react";
import {
  FaUsers,
  FaUserShield,
  FaTableTennis,
  FaMoneyCheckAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaChartPie,
  FaTrophy,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Component/Loading";
import { Themecontext } from "../../../Context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const StateCard = () => {
  const { darkmode } = useContext(Themecontext);
  const { user, loading: userLoading } = useAuth();
  const axiosSecure = useAxios();

  const [users, setUsers] = useState([]);
  const [membersCount, setMembersCount] = useState(0);
  const [courtsCount, setCourtsCount] = useState(0);
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    approved: 0,
  });

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // User data fetch
  const fetchUserData = async () => {
    const email = user?.email;
    if (email) {
      try {
        const res = await axiosSecure.get(`/Users?email=${email}`);
        setUserData(res.data[0]);
      } catch (error) {
        setUserData(null);
        console.error("Error fetching user data:", error);
      }
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchUserData().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [user]);

  // All stats (admin summary)
  const fetchStats = async () => {
    try {
      setLoading(true);
      const [usersRes, membersRes, courtsRes, bookingsRes] = await Promise.all([
        axiosSecure.get("/users"),
        axiosSecure.get("/members"),
        axiosSecure.get("/courts"),
        axiosSecure.get("/bookings"),
      ]);

      setUsers(usersRes.data);
      setMembersCount(membersRes.data.length);
      setCourtsCount(courtsRes.data.length);

      const bookings = bookingsRes.data;
      setBookingStats({
        total: bookings.length,
        paid: bookings.filter((b) => b.paymentStatus === "paid").length,
        pending: bookings.filter((b) => b.paymentStatus === "unpaid").length,
        approved: bookings.filter((b) => b.status === "approved").length,
      });
    } catch (error) {
      setUsers([]);
      setMembersCount(0);
      setCourtsCount(0);
      setBookingStats({ total: 0, paid: 0, pending: 0, approved: 0 });
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && userData?.role === "admin") {
      fetchStats();
    }
    // eslint-disable-next-line
  }, [user, userData?.role]);

  if (userLoading || loading || !user || !userData) return <Loading />;

  // Pie chart for user roles
  const roleCounts = {
    admin: users.filter((u) => u.role === "admin").length,
    member: users.filter((u) => u.role === "member").length,
    user: users.filter((u) => !["admin", "member"].includes(u.role)).length,
  };

  const userRolePieData = {
    labels: ["Admin", "Member", "User"],
    datasets: [
      {
        data: [roleCounts.admin, roleCounts.member, roleCounts.user],
        backgroundColor: [
          "rgba(139, 69, 19, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
        ],
        borderColor: [
          "rgba(139, 69, 19, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(59, 130, 246, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const bookingStatusPieData = {
    labels: ["Paid", "Pending", "Approved"],
    datasets: [
      {
        data: [bookingStats.paid, bookingStats.pending, bookingStats.approved],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(168, 85, 247, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: "bold",
          },
          color: darkmode ? "#D1D5DB" : "#374151",
        },
      },
      tooltip: {
        backgroundColor: darkmode
          ? "rgba(31, 41, 55, 0.95)"
          : "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: darkmode
          ? "rgba(75, 85, 99, 0.5)"
          : "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {userData?.role === "admin" && (
        <>
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
              <FaTrophy className="text-yellow-500 text-2xl" />
              <span
                className={`text-lg font-semibold ${
                  darkmode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Welcome back, Admin! 👋
              </span>
            </div>
          </motion.div>

          {/* Stats Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            <StatCard
              icon={<FaTableTennis />}
              title="Total Courts"
              count={courtsCount}
              gradient="from-blue-500 to-cyan-500"
              bgGradient={
                darkmode
                  ? "from-blue-900/30 to-cyan-900/30"
                  : "from-blue-50 to-cyan-50"
              }
              delay={0.1}
            />
            <StatCard
              icon={<FaUsers />}
              title="Total Users"
              count={users.length}
              gradient="from-emerald-500 to-teal-500"
              bgGradient={
                darkmode
                  ? "from-emerald-900/30 to-teal-900/30"
                  : "from-emerald-50 to-teal-50"
              }
              delay={0.2}
            />
            <StatCard
              icon={<FaUserShield />}
              title="Members"
              count={membersCount}
              gradient="from-pink-500 to-rose-500"
              bgGradient={
                darkmode
                  ? "from-pink-900/30 to-rose-900/30"
                  : "from-pink-50 to-rose-50"
              }
              delay={0.3}
            />
            <StatCard
              icon={<FaMoneyCheckAlt />}
              title="Paid Bookings"
              count={bookingStats.paid}
              gradient="from-green-500 to-emerald-500"
              bgGradient={
                darkmode
                  ? "from-green-900/30 to-emerald-900/30"
                  : "from-green-50 to-emerald-50"
              }
              delay={0.4}
            />
            <StatCard
              icon={<FaHourglassHalf />}
              title="Pending"
              count={bookingStats.pending}
              gradient="from-yellow-500 to-orange-500"
              bgGradient={
                darkmode
                  ? "from-yellow-900/30 to-orange-900/30"
                  : "from-yellow-50 to-orange-50"
              }
              delay={0.5}
            />
            <StatCard
              icon={<FaCheckCircle />}
              title="Approved"
              count={bookingStats.approved}
              gradient="from-purple-500 to-indigo-500"
              bgGradient={
                darkmode
                  ? "from-purple-900/30 to-indigo-900/30"
                  : "from-purple-50 to-indigo-50"
              }
              delay={0.6}
            />
          </motion.div>

          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <ChartCard
              title="User Roles Distribution"
              data={userRolePieData}
              options={chartOptions}
              icon={<FaUsers />}
              delay={0.1}
            />
            <ChartCard
              title="Booking Status Overview"
              data={bookingStatusPieData}
              options={chartOptions}
              icon={<FaChartPie />}
              delay={0.2}
            />
          </motion.div>
        </>
      )}
    </div>
  );
};

const StatCard = ({ icon, title, count, gradient, bgGradient, delay }) => {
  const { darkmode } = useContext(Themecontext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative bg-gradient-to-br ${bgGradient} p-6 rounded-3xl shadow-xl ${
        darkmode ? "border-gray-700/50" : "border-white/20"
      } border overflow-hidden group`}
    >
      {/* Background Decoration */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 ${
          darkmode ? "bg-white/5" : "bg-white/10"
        } rounded-full -translate-y-10 translate-x-10`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-16 h-16 ${
          darkmode ? "bg-white/3" : "bg-white/5"
        } rounded-full translate-y-8 -translate-x-8`}
      ></div>

      <div className="relative z-10 flex items-center space-x-4">
        <div
          className={`p-4 bg-gradient-to-br ${gradient} text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
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
            {count}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ChartCard = ({ title, data, options, icon, delay }) => {
  const { darkmode } = useContext(Themecontext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`${
        darkmode
          ? "bg-gray-800/90 border-gray-700/50"
          : "bg-white/80 border-white/20"
      } backdrop-blur-sm rounded-3xl p-6 shadow-2xl border hover:shadow-3xl transition-all duration-300`}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div
          className={`p-3 ${
            darkmode
              ? "bg-gradient-to-br from-blue-600 to-purple-700"
              : "bg-gradient-to-br from-blue-500 to-purple-600"
          } text-white rounded-xl`}
        >
          {icon}
        </div>
        <h4
          className={`text-xl font-bold ${
            darkmode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {title}
        </h4>
      </div>
      <div className="h-80">
        <Pie data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default StateCard;
