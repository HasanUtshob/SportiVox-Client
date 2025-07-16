import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaUsers,
  FaUserShield,
  FaTableTennis,
  FaMoneyCheckAlt,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import useAuth from "../hooks/useAuth";
import moment from "moment";

const MyProfile = () => {
  const { user, userData } = useAuth();
  const formattedDate = new Date(
    user?.metadata?.creationTime
  ).toLocaleDateString("en-GB");

  const [usersCount, setUsersCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [courtsCount, setCourtsCount] = useState(0);
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    accepted: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [usersRes, membersRes, courtsRes, bookingsRes] = await Promise.all([
        axios.get("http://localhost:5000/users"),
        axios.get("http://localhost:5000/members"),
        axios.get("http://localhost:5000/courts"),
        axios.get("http://localhost:5000/bookings"),
      ]);

      setUsersCount(usersRes.data.length);
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
      console.error("Error fetching stats:", error);
    }
  };

  const pieData = {
    labels: ["Paid", "Pending", "approved"],
    datasets: [
      {
        data: [bookingStats.paid, bookingStats.pending, bookingStats.approved],
        backgroundColor: ["#36A2EB", "#FFCD56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="max-w-3xl mx-auto px-4 py-6 rounded-3xl shadow-lg bg-white/90 border border-gray-200"
    >
      {/* <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
        👤 Admin Profile
      </h1> */}

      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-3">
        {userData?.photo ? (
          <motion.img
            src={userData.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-primary object-cover"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
        ) : (
          <FaUserCircle className="text-6xl text-gray-400" />
        )}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold">{userData?.name}</h2>
          <p className="text-sm text-gray-600">📧 {userData?.email}</p>

          {userData.role === "member" ? (
            <p className="text-xs text-gray-500">
              🗓️ Date of becoming an Member:{" "}
              {moment(userData?.memberDate).format("DD MMM YYYY")}{" "}
            </p>
          ) : (
            <p className="text-xs text-gray-500">🗓️ Joined: {formattedDate}</p>
          )}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-0.5 text-xs rounded-full">
            {userData?.role}
          </span>
        </div>
      </div>

      {userData?.role === "admin" && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 my-8">
            <StatCard
              icon={<FaTableTennis />}
              title="Courts"
              count={courtsCount}
              color="from-blue-100 to-blue-200"
            />
            <StatCard
              icon={<FaUsers />}
              title="Users"
              count={usersCount}
              color="from-green-100 to-green-200"
            />
            <StatCard
              icon={<FaUserShield />}
              title="Members"
              count={membersCount}
              color="from-pink-100 to-pink-200"
            />
            <StatCard
              icon={<FaMoneyCheckAlt />}
              title="Paid"
              count={bookingStats.paid}
              color="from-emerald-100 to-emerald-200"
            />
            <StatCard
              icon={<FaHourglassHalf />}
              title="Pending"
              count={bookingStats.pending}
              color="from-yellow-100 to-yellow-200"
            />
            <StatCard
              icon={<FaCheckCircle />}
              title="Accepted"
              count={bookingStats.approved}
              color="from-indigo-100 to-indigo-200"
            />
          </div>

          {/* Pie Chart */}
          <div className="w-48 mx-auto bg-white p-4 rounded-xl shadow">
            <h4 className="text-center font-medium text-sm text-primary mb-2">
              Booking Status Overview
            </h4>
            <Pie data={pieData} />
          </div>
        </>
      )}
    </motion.div>
  );
};

const StatCard = ({ icon, title, count, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`bg-gradient-to-r ${color} p-2 rounded-md text-center shadow-sm`}
  >
    <div className="text-lg text-primary mb-0.5">{icon}</div>
    <h3 className="text-xs font-semibold">{title}</h3>
    <p className="text-base font-bold text-gray-800">{count}</p>
  </motion.div>
);

export default MyProfile;
