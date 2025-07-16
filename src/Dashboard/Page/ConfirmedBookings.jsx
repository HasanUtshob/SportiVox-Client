import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdVerified } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const ConfirmedBookings = () => {
  const { user } = useAuth();
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConfirmedBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/bookings?paymentStatus=paid&email=${user?.email}`
      );

      setConfirmedBookings(res.data);
    } catch (err) {
      console.error("Error fetching confirmed bookings:", err);
      Swal.fire("Error", "Could not load bookings.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchConfirmedBookings();
    }
  }, [user?.email]);

  const handleDelete = async (email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove the user from the system.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(
          `http://localhost:5000/members/${email}`
        );
        if (res.data.message) {
          Swal.fire("Deleted!", "Member successfully deleted.", "success");
          fetchConfirmedBookings(); // অথবা local state থেকে filter করে remove করতে পারেন
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete user.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        Loading confirmed bookings...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-600 flex items-center justify-center gap-2">
        <MdVerified className="text-3xl text-green-600" />
        Confirmed Bookings
      </h2>

      {confirmedBookings.length === 0 ? (
        <div className="text-center text-gray-500">
          No confirmed bookings found.
        </div>
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
              {confirmedBookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.courtType}</td>
                  <td>{b.userName}</td>
                  <td>{b.date}</td>
                  <td>{b.slots?.join(", ")}</td>
                  <td>৳{b.slots.length * b.price}</td>
                  <td>
                    <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                      <MdVerified className="text-lg" /> Confirmed
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(b._id)}
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
    </div>
  );
};

export default ConfirmedBookings;
