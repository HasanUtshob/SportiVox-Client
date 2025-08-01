import React, { useEffect, useState } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaDollarSign,
  FaTimesCircle,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import StateCard from "./StateCard";
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

const MyBookingStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    paid: 0,
    unpaid: 0,
  });
  const [loading, setLoading] = useState(true); // ⬅️ লোডিং স্টেট

  useEffect(() => {
    if (user?.email) {
      setLoading(true); // লোডিং শুরু
      axiosSecure
        .get(`/bookings?email=${user.email}`)
        .then((res) => {
          const data = res.data;
          setBookings(data);
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
        .finally(() => setLoading(false)); // লোডিং শেষ
    } else {
      setLoading(false); // ইউজার না থাকলেও লোডিং false
    }
  }, [user?.email, axiosSecure]);

  const chartData = [
    { name: "Total", count: stats.total },
    { name: "Pending", count: stats.pending },
    { name: "Approved", count: stats.approved },
    { name: "Paid", count: stats.paid },
    { name: "Unpaid", count: stats.unpaid },
  ];

  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <CardTemp
          title="Total Bookings"
          value={stats.total}
          icon={<FaClock className="text-blue-500 text-3xl" />}
          color="bg-blue-100"
        />
        <CardTemp
          title="Pending"
          value={stats.pending}
          icon={<MdOutlinePendingActions className="text-amber-700 text-3xl" />}
          color="bg-amber-100"
        />
        <CardTemp
          title="Approved"
          value={stats.approved}
          icon={<FaCheckCircle className="text-green-500 text-3xl" />}
          color="bg-green-100"
        />
        <CardTemp
          title="Paid"
          value={stats.paid}
          icon={<FaDollarSign className="text-yellow-500 text-3xl" />}
          color="bg-yellow-100"
        />
        <CardTemp
          title="Unpaid"
          value={stats.unpaid}
          icon={<FaTimesCircle className="text-red-500 text-3xl" />}
          color="bg-red-100"
        />
      </div>

      {/* Chart */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Booking Summary (Bar Chart)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4F46E5" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MyBookingStats;
