import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { FaMoneyCheckAlt, FaUser, FaHashtag } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { BsCurrencyDollar, BsReceipt } from "react-icons/bs";
import useAxios from "../hooks/useAxios";
import Loading from "../Component/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(true); // toggle layout
  const axiosSecure = useAxios();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments?email=${user.email}`)
        .then((res) => setPayments(res.data))
        .catch((err) => console.error("Payment fetch error", err))
        .finally(() => setLoading(false));
    }
  }, [user?.email, axiosSecure]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-primary">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Payment History
      </h2>

      {/* Layout Toggle Button */}
      <div className="text-right mb-4">
        <button
          onClick={() => setShowTable(!showTable)}
          className="btn btn-sm btn-primary"
        >
          {showTable ? "Switch to Card View" : "Switch to Table View"}
        </button>
      </div>

      {/* If no payment found */}
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payments found.</p>
      ) : showTable ? (
        // ✅ Table Layout
        <div className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="w-12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Booking
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User Email
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Txn ID
                </th>
                <th
                  scope="col"
                  className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((p, idx) => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                    <span className="line-clamp-1">{p.bookingId}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    <span className="line-clamp-1">{p.userEmail}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(p.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ৳{p.amount}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 font-mono">
                    <span className="line-clamp-1">{p.transactionId}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : p.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // ✅ Card Layout
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {payments.map((p, idx) => (
            <div
              key={p._id}
              className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              {/* Header with index and status */}
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                  <FaHashtag className="text-blue-400" /> #{idx + 1}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                    p.status === "paid"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : p.status === "pending"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-gray-50 text-gray-700 border border-gray-200"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              {/* Payment details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaUser className="mt-1 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">User</p>
                    <p className="text-gray-800 font-medium truncate">
                      {p.userEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdDateRange className="mt-1 text-purple-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="text-gray-800 font-medium">
                      {new Date(p.date).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaMoneyCheckAlt className="mt-1 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Booking ID
                    </p>
                    <p className="text-gray-800 font-medium">{p.bookingId}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BsCurrencyDollar className="mt-1 text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Amount</p>
                    <p className="text-gray-800 font-medium">৳{p.amount}</p>
                  </div>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <BsReceipt className="mt-0.5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">
                      Transaction ID
                    </p>
                    <p className="text-xs font-mono text-gray-600 break-all">
                      {p.transactionId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
