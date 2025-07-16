import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaClock, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import BookingModal from "./BookingModal";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Courts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'

  // Pagination constants
  const CARDS_PER_PAGE = 6;
  const MIN_CARDS_DATA = 10;
  const TABLE_ROWS_PER_PAGE = 10;
  const MIN_TABLE_DATA = 15;

  const fetchCourts = async () => {
    const res = await axios.get("http://localhost:5000/courts");
    setCourts(res.data);
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  // Calculate pagination values
  const itemsPerPage =
    viewMode === "cards" ? CARDS_PER_PAGE : TABLE_ROWS_PER_PAGE;
  const totalPages = Math.ceil(courts.length / itemsPerPage);
  const paginatedCourts = courts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (location.state?.reopenCourt) {
      setSelectedCourt(location.state.reopenCourt);
      // Clean up location state so it doesn't reopen again on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        🏸 Available Courts
      </h2>

      {/* View mode toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="btn-group">
          <button
            className={`btn ${viewMode === "cards" ? "btn-active" : ""}`}
            onClick={() => setViewMode("cards")}
          >
            Card View
          </button>
          <button
            className={`btn ${viewMode === "table" ? "btn-active" : ""}`}
            onClick={() => setViewMode("table")}
          >
            Table View
          </button>
        </div>

        {/* Data count validation */}
        {viewMode === "cards" && courts.length < MIN_CARDS_DATA && (
          <div className="badge badge-warning gap-2">
            Minimum {MIN_CARDS_DATA} courts recommended for cards view
          </div>
        )}
        {viewMode === "table" && courts.length < MIN_TABLE_DATA && (
          <div className="badge badge-warning gap-2">
            Minimum {MIN_TABLE_DATA} courts recommended for table view
          </div>
        )}
      </div>

      {/* Card View */}
      {viewMode === "cards" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCourts?.map((court) => (
              <motion.div
                key={court._id}
                className="card bg-base-100 shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <figure>
                  <img
                    src={court.image}
                    alt={court.type}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body space-y-3">
                  <h3 className="card-title text-xl font-semibold text-primary">
                    {court.type} Court
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaClock className="text-primary" />
                    <select className="select select-bordered select-sm w-full max-w-xs">
                      <option>{court.slot}</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaDollarSign className="text-green-600" />
                    <p className="text-lg font-bold text-gray-700">
                      ৳{court.price}
                    </p>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (user) {
                        setSelectedCourt(court);
                      } else {
                        Swal.fire({
                          icon: "warning",
                          title: "Please Sign In First",
                          showConfirmButton: true,
                        }).then(() => {
                          navigate("/SignIn", {
                            state: { from: "/Courts", court },
                          });
                        });
                      }
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Court
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCourts.map((court) => (
                <tr key={court._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {court.type} Court
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={court.image}
                      alt={court.type}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {court.slot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                    ৳{court.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        if (user) {
                          setSelectedCourt(court);
                        } else {
                          Swal.fire({
                            icon: "warning",
                            title: "Please Sign In First",
                            showConfirmButton: true,
                          }).then(() => {});
                        }
                      }}
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <div className="btn-group">
          <button
            className="btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="btn">
            Page {currentPage} of {totalPages}
          </button>
          <button
            className="btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>

      {/* Modal needs to be rendered here inside return */}
      {selectedCourt && (
        <BookingModal
          court={selectedCourt}
          user={user}
          onClose={() => setSelectedCourt(null)}
        />
      )}
    </div>
  );
};

export default Courts;
