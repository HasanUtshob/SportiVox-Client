import React, { useContext } from "react";
import StateCard from "../Dashboard/Page/Component/StateCard";
import MyBookingStats from "../Dashboard/Page/Component/MyBookingStats";
import useUserData from "../hooks/useUserData";
import Loading from "../Component/Loading";
import { motion } from "framer-motion";
import { Themecontext } from "../Context/ThemeContext";

const Dashboard = () => {
  const { darkmode } = useContext(Themecontext);
  const { userData, userDataLoading, isAdmin } = useUserData();

  if (userDataLoading) {
    return <Loading message="ড্যাশবোর্ড লোড হচ্ছে..." />;
  }

  if (!userData) {
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
          <div className="text-6xl mb-4">⚠️</div>
          <h3
            className={`text-2xl font-bold mb-2 ${
              darkmode ? "text-red-400" : "text-red-600"
            }`}
          >
            ব্যবহারকারীর তথ্য পাওয়া যায়নি
          </h3>
          <p className={`${darkmode ? "text-gray-400" : "text-gray-600"}`}>
            দয়া করে আবার লগইন করার চেষ্টা করুন
          </p>
        </motion.div>
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
      <div
        className={`absolute top-1/3 right-1/4 w-32 h-32 ${
          darkmode
            ? "bg-gradient-to-br from-pink-600/3 to-transparent"
            : "bg-gradient-to-br from-pink-400/5 to-transparent"
        } rounded-full animate-pulse`}
      ></div>

      <div className="relative z-10 py-8">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-5xl md:text-6xl font-bold mb-4 ${
              darkmode
                ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            }`}
          >
            {isAdmin() ? "🏆 Admin Dashboard" : "📊 My Dashboard"}
          </h1>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              darkmode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {isAdmin()
              ? "Manage your sports facility with comprehensive analytics and insights"
              : "Track your bookings and sports activities in one place"}
          </p>
          <div
            className={`w-24 h-1 mx-auto mt-4 rounded-full ${
              darkmode
                ? "bg-gradient-to-r from-blue-400 to-purple-500"
                : "bg-gradient-to-r from-blue-500 to-purple-600"
            }`}
          ></div>
        </motion.div>

        {/* Dashboard Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isAdmin() ? (
            <section>
              <StateCard />
            </section>
          ) : (
            <section>
              <MyBookingStats />
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
