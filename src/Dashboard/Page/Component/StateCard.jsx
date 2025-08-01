import React, { useEffect, useState } from "react";
import {
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
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Component/Loading"; // লোডিং কম্পোনেন্ট ইম্পোর্ট

ChartJS.register(ArcElement, Tooltip, Legend);

const StateCard = () => {
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
  const [loading, setLoading] = useState(true); // ✅ লোডিং স্টেট

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

  // userData লোড
  useEffect(() => {
    if (user) {
      setLoading(true); // যেই user এলো, তখন loading true
      fetchUserData().finally(() => setLoading(false)); // data এলে false
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [user]);

  // All stats (admin summary)
  const fetchStats = async () => {
    try {
      setLoading(true); // আবার loading
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

  // userData এলো, তখনই stats লোড
  useEffect(() => {
    if (user && userData?.role === "admin") {
      fetchStats();
    }
    // eslint-disable-next-line
  }, [user, userData?.role]);

  // loading বা ডাটা না এলে কিছুই দেখাবেন না (সরাসরি Loader)
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
        backgroundColor: ["#8e44ad", "#27ae60", "#3498db"],
        borderWidth: 1,
      },
    ],
  };

  const bookingStatusPieData = {
    labels: ["Paid", "Pending", "Approved"],
    datasets: [
      {
        data: [bookingStats.paid, bookingStats.pending, bookingStats.approved],
        backgroundColor: ["#2ecc71", "#f1c40f", "#9b59b6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto p-6 bg-white border rounded-xl shadow-xl"
    >
      {userData?.role === "admin" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
            <StatCard
              icon={<FaTableTennis />}
              title="Courts"
              count={courtsCount}
              color="from-blue-200 to-blue-300"
            />
            <StatCard
              icon={<FaUsers />}
              title="Users"
              count={users.length}
              color="from-green-200 to-green-300"
            />
            <StatCard
              icon={<FaUserShield />}
              title="Members"
              count={membersCount}
              color="from-pink-200 to-pink-300"
            />
            <StatCard
              icon={<FaMoneyCheckAlt />}
              title="Paid"
              count={bookingStats.paid}
              color="from-emerald-200 to-emerald-300"
            />
            <StatCard
              icon={<FaHourglassHalf />}
              title="Pending"
              count={bookingStats.pending}
              color="from-yellow-200 to-yellow-300"
            />
            <StatCard
              icon={<FaCheckCircle />}
              title="Approved"
              count={bookingStats.approved}
              color="from-indigo-200 to-indigo-300"
            />
          </div>
          <div className="md:w-[700px] mx-auto grid md:grid-cols-2 gap-6">
            <ChartCard title="User Roles Distribution" data={userRolePieData} />
            <ChartCard
              title="Booking Status Distribution"
              data={bookingStatusPieData}
            />
          </div>
        </>
      )}
    </motion.div>
  );
};

const StatCard = ({ icon, title, count, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-gradient-to-br ${color} p-4 rounded-lg shadow text-center transition-all duration-300`}
  >
    <div className="text-3xl text-gray-700 mb-2">{icon}</div>
    <h4 className="text-sm font-medium">{title}</h4>
    <p className="text-xl font-bold text-gray-900">{count}</p>
  </motion.div>
);

const ChartCard = ({ title, data }) => (
  <div className="bg-white rounded-xl p-4 shadow border">
    <h4 className="text-center text-base font-semibold text-gray-700 mb-3">
      {title}
    </h4>
    <Pie data={data} />
  </div>
);

export default StateCard;
