import React, { useEffect, useState } from "react";

import { FaClock, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";

const PendingBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingBookings = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(
        `/bookings?status=pending&email=${user?.email}`
      );
      setPendingBookings(res.data);
    } catch (err) {
      console.error("Error fetching pending bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchPendingBookings();
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        <Loading></Loading>
      </div>
    );
  }
  const handleCancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/bookings/${id}`);
        if (res.data.deletedCount) {
          Swal.fire("Cancelled!", "The booking has been cancelled.", "success");
          fetchPendingBookings(); // এখানে ডাটা রিফ্রেশ হবে
        } else {
          Swal.fire(
            "Failed!",
            "Booking not found or already cancelled.",
            "error"
          );
        }
      } catch (err) {
        console.error("Cancel booking error:", err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        <MdPendingActions className="inline mr-2 text-2xl" /> Pending Bookings
      </h2>

      {pendingBookings.length === 0 ? (
        <div className="text-center text-gray-500">
          No pending bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Court Type</th>
                <th>Date</th>
                <th>Slot(s)</th>
                <th>Sessions</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingBookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.courtType}</td>
                  <td>{b.date}</td>
                  <td>{b.slots?.join(", ")}</td>
                  <td>{b.slots?.length}</td>
                  <td>৳{b.slots?.length * b.price}</td>
                  <td className="text-warning font-semibold">{b.status}</td>
                  <td>
                    <button
                      onClick={() => handleCancelBooking(b._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingBookings;
