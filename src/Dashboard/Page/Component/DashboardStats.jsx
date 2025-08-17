import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaUsers, FaUserShield, FaTableTennis } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import { Themecontext } from "../../../Context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardStats = () => {
  const { darkmode } = useContext(Themecontext);
  const [usersCount, setUsersCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [courtsCount, setCourtsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const usersRes = await axios.get("http://localhost:5000/users"); // All users
      const membersRes = await axios.get("http://localhost:5000/members"); // All members
      const courtsRes = await axios.get("http://localhost:5000/courts"); // All courts

      setUsersCount(usersRes.data.length);
      setMembersCount(membersRes.data.length);
      setCourtsCount(courtsRes.data.length);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setUsersCount(0);
      setMembersCount(0);
      setCourtsCount(0);
    } finally {
      setLoading(false);
    }
  };

  const pieData = {
    labels: ["Members", "Other Users"],
    datasets: [
      {
        data: [membersCount, usersCount - membersCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#2563EB", "#DC2626"],
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

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2
          className={`text-4xl font-bold mb-4 ${
            darkmode
              ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          }`}
        >
          📊 Dashboard Summary
        </h2>
        <p
          className={`text-lg ${darkmode ? "text-gray-300" : "text-gray-600"}`}
        >
          Overview of your sports facility statistics
        </p>
        <div
          className={`w-24 h-1 mx-auto mt-4 rounded-full ${
            darkmode
              ? "bg-gradient-to-r from-blue-400 to-purple-500"
              : "bg-gradient-to-r from-blue-500 to-purple-600"
          }`}
        ></div>
      </motion.div>

      {/* Stats Boxes */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-12"
      >
        <StatCard
          icon={
            <FaTableTennis
              className={`text-4xl mx-auto mb-3 ${
                darkmode ? "text-blue-400" : "text-blue-600"
              }`}
            />
          }
          title="Total Courts"
          count={courtsCount}
          gradient="from-blue-500 to-cyan-500"
          bgGradient={
            darkmode
              ? "from-blue-900/50 to-cyan-900/50"
              : "from-blue-100 to-blue-200"
          }
          textColor={darkmode ? "text-blue-300" : "text-blue-700"}
          delay={0.1}
        />
        <StatCard
          icon={
            <FaUsers
              className={`text-4xl mx-auto mb-3 ${
                darkmode ? "text-green-400" : "text-green-600"
              }`}
            />
          }
          title="Total Users"
          count={usersCount}
          gradient="from-green-500 to-emerald-500"
          bgGradient={
            darkmode
              ? "from-green-900/50 to-emerald-900/50"
              : "from-green-100 to-green-200"
          }
          textColor={darkmode ? "text-green-300" : "text-green-700"}
          delay={0.2}
        />
        <StatCard
          icon={
            <FaUserShield
              className={`text-4xl mx-auto mb-3 ${
                darkmode ? "text-pink-400" : "text-pink-600"
              }`}
            />
          }
          title="Total Members"
          count={membersCount}
          gradient="from-pink-500 to-rose-500"
          bgGradient={
            darkmode
              ? "from-pink-900/50 to-rose-900/50"
              : "from-pink-100 to-pink-200"
          }
          textColor={darkmode ? "text-pink-300" : "text-pink-700"}
          delay={0.3}
        />
      </motion.div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full md:w-2/3 lg:w-1/2 mx-auto"
      >
        <div
          className={`${
            darkmode
              ? "bg-gray-800/90 border-gray-700/50"
              : "bg-white/90 border-white/20"
          } backdrop-blur-sm p-8 rounded-3xl shadow-2xl border`}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div
              className={`p-3 ${
                darkmode
                  ? "bg-gradient-to-br from-blue-600 to-purple-700"
                  : "bg-gradient-to-br from-blue-500 to-purple-600"
              } text-white rounded-xl`}
            >
              <FaUsers className="text-xl" />
            </div>
            <h4
              className={`text-2xl font-bold ${
                darkmode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              User vs Member Ratio
            </h4>
          </div>

          <div className="h-80">
            <Pie data={pieData} options={chartOptions} />
          </div>

          {/* Additional Info */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div
              className={`text-center p-4 rounded-2xl ${
                darkmode ? "bg-blue-900/30" : "bg-blue-50"
              }`}
            >
              <div
                className={`text-xl font-bold ${
                  darkmode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {usersCount > 0
                  ? Math.round((membersCount / usersCount) * 100)
                  : 0}
                %
              </div>
              <div
                className={`text-sm ${
                  darkmode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Membership Rate
              </div>
            </div>
            <div
              className={`text-center p-4 rounded-2xl ${
                darkmode ? "bg-pink-900/30" : "bg-pink-50"
              }`}
            >
              <div
                className={`text-xl font-bold ${
                  darkmode ? "text-pink-400" : "text-pink-600"
                }`}
              >
                {usersCount - membersCount}
              </div>
              <div
                className={`text-sm ${
                  darkmode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Regular Users
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const StatCard = ({
  icon,
  title,
  count,
  gradient,
  bgGradient,
  textColor,
  delay,
}) => {
  const { darkmode } = useContext(Themecontext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.05 }}
      className={`relative bg-gradient-to-br ${bgGradient} p-8 rounded-3xl shadow-xl ${
        darkmode ? "border-gray-700/50" : "border-white/20"
      } border overflow-hidden group cursor-pointer`}
    >
      {/* Background Decoration */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 ${
          darkmode ? "bg-white/5" : "bg-white/20"
        } rounded-full -translate-y-12 translate-x-12`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-20 h-20 ${
          darkmode ? "bg-white/3" : "bg-white/10"
        } rounded-full translate-y-10 -translate-x-10`}
      ></div>

      <div className="relative z-10">
        <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3
          className={`text-xl font-bold mb-2 ${
            darkmode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-3xl font-bold ${textColor} group-hover:scale-110 transition-transform duration-300`}
        >
          {count}
        </p>
      </div>

      {/* Hover Effect */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
            : "bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
      ></div>
    </motion.div>
  );
};

export default DashboardStats;
