import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null); // 'date' or 'price'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/bookings?paymentStatus=paid"
      );
      setBookings(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      Swal.fire("Error", "Could not load bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle search
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const results = bookings.filter((b) =>
      b.courtType?.toLowerCase().includes(lowerSearch)
    );
    setFiltered(results);
  }, [search, bookings]);

  // Handle sorting
  useEffect(() => {
    let sorted = [...filtered];
    if (sortBy === "date") {
      sorted.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy === "price") {
      sorted.sort((a, b) => {
        const priceA = a.slots?.length * a.price;
        const priceB = b.slots?.length * b.price;
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      });
    }
    setFiltered(sorted);
  }, [sortBy, sortOrder]);

  // Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Manage Confirmed Bookings
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by court title..."
          className="input input-bordered w-full md:max-w-sm"
        />

        <div className="flex gap-2">
          <button
            onClick={() => toggleSort("date")}
            className="btn btn-sm btn-outline"
          >
            Sort by Date{" "}
            {sortBy === "date" &&
              (sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />)}
          </button>
          <button
            onClick={() => toggleSort("price")}
            className="btn btn-sm btn-outline"
          >
            Sort by Price{" "}
            {sortBy === "price" &&
              (sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />)}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          No confirmed bookings found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-gray-100 uppercase text-sm">Court</th>
                <th className="bg-gray-100 uppercase text-sm">Date</th>
                <th className="bg-gray-100 uppercase text-sm">Slots</th>
                <th className="bg-gray-100 uppercase text-sm">Sessions</th>
                <th className="bg-gray-100 uppercase text-sm">Price</th>
                <th className="bg-gray-100 uppercase text-sm">User</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b._id}>
                  <td>{b.courtType}</td>
                  <td>{b.date}</td>
                  <td>{b.slots?.join(", ")}</td>
                  <td>{b.slots?.length}</td>
                  <td>৳{b.slots?.length * b.price}</td>
                  <td>{b.userEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
