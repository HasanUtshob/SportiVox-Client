import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdVerified } from "react-icons/md";
import PaymentModal from "../../Payment/PaymentModal";
import useAuth from "../../hooks/useAuth";

const ApprovedBookings = () => {
  const { user } = useAuth();
  const [approvedBookings, setApprovedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchApprovedBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/bookings?status=approved&email=${user?.email}`
      );
      setApprovedBookings(res.data);
    } catch (err) {
      console.error("Error fetching approved bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchApprovedBookings();
    }
  }, [user?.email]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "This will remove the booking permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/bookings/${id}`);
        Swal.fire("Cancelled!", "The booking has been removed.", "success");
        setApprovedBookings((prev) => prev.filter((b) => b._id !== id));
      } catch (err) {
        console.error("Cancel error:", err);
        Swal.fire("Error", "Could not cancel booking", "error");
      }
    }
  };

  const handlePaymentSuccess = (id) => {
    setApprovedBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, paymentStatus: "paid" } : b))
    );

    setSelectedBooking(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-600">
        <MdVerified className="inline mr-2 text-2xl" />
        Approved Bookings
      </h2>

      {loading ? (
        <div className="text-center mt-10 text-lg">
          Loading approved bookings...
        </div>
      ) : approvedBookings.length === 0 ? (
        <div className="text-center text-gray-500">No approved bookings.</div>
      ) : (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="table w-full text-sm md:text-base">
            <thead className="bg-indigo-50 sticky top-0 z-10 text-green-600">
              <tr>
                <th>Court</th>
                <th>User</th>
                <th>Date</th>
                <th>Slots</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedBookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.courtType}</td>
                  <td>{b.userName}</td>
                  <td>{b.date}</td>
                  <td>{b.slots?.join(", ")}</td>
                  <td>৳{b.slots?.length * b.price}</td>
                  <td>
                    {b.paymentStatus === "paid" ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <span className="text-yellow-500 font-medium">
                        Unpaid
                      </span>
                    )}
                  </td>
                  <td className="flex flex-col md:flex-row gap-2">
                    {b.paymentStatus !== "paid" ? (
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="btn btn-info btn-xs"
                      >
                        Pay Now
                      </button>
                    ) : null}
                    <button
                      onClick={() => handleCancel(b._id)}
                      className="btn btn-error btn-xs"
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

      {selectedBooking && (
        <PaymentModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default ApprovedBookings;
