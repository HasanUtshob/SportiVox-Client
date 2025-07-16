import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaUserShield, FaTableTennis } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardStats = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [courtsCount, setCourtsCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const usersRes = await axios.get("http://localhost:5000/users"); // All users
      const membersRes = await axios.get("http://localhost:5000/members"); // All members
      const courtsRes = await axios.get("http://localhost:5000/courts"); // All courts

      setUsersCount(usersRes.data.length);
      setMembersCount(membersRes.data.length);
      setCourtsCount(courtsRes.data.length);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const pieData = {
    labels: ["Members", "Other Users"],
    datasets: [
      {
        data: [membersCount, usersCount - membersCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">
        📊 Dashboard Summary
      </h2>

      {/* Stats Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-12">
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
          <FaTableTennis className="text-4xl text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold">Total Courts</h3>
          <p className="text-2xl font-semibold text-blue-700">{courtsCount}</p>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-lg shadow-md">
          <FaUsers className="text-4xl text-green-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold">Total Users</h3>
          <p className="text-2xl font-semibold text-green-700">{usersCount}</p>
        </div>
        <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-6 rounded-lg shadow-md">
          <FaUserShield className="text-4xl text-pink-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold">Total Members</h3>
          <p className="text-2xl font-semibold text-pink-700">{membersCount}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="w-full md:w-1/2 mx-auto bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-bold text-center mb-4 text-primary">
          User vs Member Ratio
        </h4>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default DashboardStats;
