import React, { useEffect, useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import Loading from "../Component/Loading";
import useAxios from "../hooks/useAxios";
ChartJS.register(ArcElement, Tooltip, Legend);

const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();
  const [data, setData] = useState(null);

  useEffect(() => {
    // ভিতরে async ফাংশন ডিক্লেয়ার করুন
    const fetchData = async () => {
      if (user) {
        try {
          const res = await axiosSecure.get(`/Users?email=${user.email}`);
          setData(res.data[0]);
        } catch (error) {
          console.error("Data fetch error:", error);
        }
      }
    };
    fetchData();
  }, [user, axiosSecure]);

  if (loading || !user || data === null) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div className="text-center py-8 text-gray-500">No Profile Found</div>
    );
  }

  const formattedDate = new Date(
    user?.metadata?.creationTime
  ).toLocaleDateString("en-GB");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="max-w-3xl mx-auto px-4 py-6 rounded-3xl shadow-lg bg-white/90 border border-gray-200"
    >
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-3">
        {data?.photo ? (
          <motion.img
            src={data.photo}
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
          <h2 className="text-lg font-semibold">{data?.name}</h2>
          <p className="text-sm text-gray-600">📧 {data?.email}</p>

          {data.role === "member" ? (
            <p className="text-xs text-gray-500">
              🗓️ Member since: {moment(data?.memberDate).format("DD MMM YYYY")}
            </p>
          ) : (
            <p className="text-xs text-gray-500">🗓️ Joined: {formattedDate}</p>
          )}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-0.5 text-xs rounded-full">
            {data?.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfile;
