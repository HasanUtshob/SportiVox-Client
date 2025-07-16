import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdManageSearch } from "react-icons/md";

const ManageBookingsApproval = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true); // Add this
        const res = await axios.get("http://localhost:5000/bookings");

        const sorted = res.data.sort((a, b) => {
          if (a.status === "pending" && b.status !== "pending") return -1;
          if (a.status !== "pending" && b.status === "pending") return 1;
          return new Date(b.createdAt) - new Date(a.createdAt); // latest first
        });

        setBookings(sorted);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false); // And this
      }
    };

    fetchBookings();
  }, []);

  //   // Remove booking from UI after approve/reject
  const removeBookingFromUI = (id) => {
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  const handleApprove = async (bookingId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.put(
          `http://localhost:5000/bookings/approve/${bookingId}`
        );
        if (res.data.bookingModified > 0 || res.data.userModified > 0) {
          await Swal.fire(
            "Approved!",
            "Booking approved and user promoted.",
            "success"
          );
          removeBookingFromUI(bookingId);
          //   setBookings([]);
        } else {
          await Swal.fire(
            "Notice!",
            res.data.message || "Already approved.",
            "info"
          );
        }
      } catch (err) {
        console.error("Approval error:", err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the booking request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:5000/bookings/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Rejected!", "Booking has been deleted.", "success");
          removeBookingFromUI(id);
        }
      } catch (err) {
        console.error("Rejection error:", err);
        Swal.fire("Error", "Failed to delete booking", "error");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="flex justify-center items-center gap-3 text-indigo-600 text-4xl font-extrabold mb-10">
        <MdManageSearch />
        Manage Bookings Approval
      </h2>

      {loading ? (
        <p className="text-center text-lg font-semibold text-gray-500">
          Loading bookings...
        </p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookings found.</p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block border rounded-lg shadow-md border-gray-200">
            <div className="max-h-[500px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-indigo-50 sticky top-0 z-10 text-indigo-700">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">Court</th>
                    <th className="px-5 py-3 text-left font-semibold">User</th>
                    <th className="px-5 py-3 text-left font-semibold">Date</th>
                    <th className="px-5 py-3 text-left font-semibold">Slots</th>
                    <th className="px-5 py-3 text-left font-semibold">Price</th>
                    <th className="px-5 py-3 text-left font-semibold">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {bookings.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-50">
                      <td className="px-5 py-3">{b.courtType}</td>
                      <td className="px-5 py-3">{b.userName}</td>
                      <td className="px-5 py-3">{b.date}</td>
                      <td className="px-5 py-3">{b.slots?.join(", ")}</td>
                      <td className="px-5 py-3 font-medium">
                        ৳{b.slots?.length * b.price}
                      </td>
                      <td className="px-5 py-3 font-bold">
                        {b.status === "pending" && (
                          <span className="text-yellow-500">Pending</span>
                        )}
                        {b.status === "approved" && (
                          <span className="text-green-600">✔ Approved</span>
                        )}
                      </td>
                      <td className="px-5 py-3 space-x-3 flex">
                        {b.status === "pending" ? (
                          <>
                            <button
                              onClick={() => handleApprove(b._id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(b._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-green-600 font-semibold">
                            Confirmed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile card view */}
          <div className="md:hidden space-y-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="border border-gray-300 rounded-lg shadow-sm p-4 bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {b.courtType}
                  </h3>
                  <span
                    className={`font-bold ${
                      b.status === "pending"
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {b.status === "pending" ? "Pending" : "Approved"}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>User:</strong> {b.userName}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Date:</strong> {b.date}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Slots:</strong> {b.slots?.join(", ")}
                </p>
                <p className="text-sm text-gray-700 mb-4 font-medium">
                  <strong>Price:</strong> ৳{b.slots?.length * b.price}
                </p>
                <div className="flex gap-3">
                  {b.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleApprove(b._id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(b._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="flex-1 text-green-600 font-semibold text-center">
                      ✔ Confirmed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageBookingsApproval;
