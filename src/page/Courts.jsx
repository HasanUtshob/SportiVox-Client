import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaList,
  FaTh,
} from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import BookingModal from "./BookingModal";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import Loading from "../Component/Loading";
import { Themecontext } from "../Context/ThemeContext";

const Courts = () => {
  const { darkmode } = useContext(Themecontext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("cards");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const axiosSecure = useAxios();

  // Constants
  const CARDS_PER_PAGE = 6;
  const TABLE_ROWS_PER_PAGE = 10;

  useEffect(() => {
    const fetchCourts = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/courts");
        setCourts(res.data);
      } catch {
        setCourts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourts();
  }, [axiosSecure]);

  // Filter courts based on search and filters
  const filteredCourts = courts.filter((court) => {
    return (
      court.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (priceFilter === "" || court.price <= Number(priceFilter))
    );
  });

  // Calculate pagination values
  const itemsPerPage =
    viewMode === "cards" ? CARDS_PER_PAGE : TABLE_ROWS_PER_PAGE;
  const totalPages = Math.ceil(filteredCourts.length / itemsPerPage);
  const paginatedCourts = filteredCourts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPage = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  useEffect(() => {
    if (location.state?.reopenCourt) {
      setSelectedCourt(location.state.reopenCourt);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  if (loading) {
    return <Loading message="Loading Courts..." variant="sports" />;
  }

  return (
    <div
      className={`min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      }`}
    >
      {/* Hero Section */}
      <div
        className={`relative ${
          darkmode
            ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900"
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        } overflow-hidden`}
      >
        <div
          className={`absolute inset-0 ${
            darkmode ? "bg-black/40" : "bg-black/20"
          }`}
        ></div>
        <div
          className={`absolute inset-0 ${
            darkmode
              ? "bg-gradient-to-r from-gray-800/50 to-gray-700/50"
              : "bg-gradient-to-r from-blue-600/30 to-purple-600/30"
          }`}
        ></div>

        {/* Animated Background Elements */}
        <div
          className={`absolute top-10 left-10 w-20 h-20 ${
            darkmode ? "bg-gray-600/20" : "bg-white/10"
          } rounded-full animate-pulse`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 w-32 h-32 ${
            darkmode ? "bg-gray-500/20" : "bg-yellow-300/20"
          } rounded-full animate-bounce`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-16 h-16 ${
            darkmode ? "bg-gray-600/20" : "bg-pink-300/20"
          } rounded-full animate-ping`}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              🏸 Available Courts
            </h1>
            <p
              className={`text-xl md:text-2xl ${
                darkmode ? "text-gray-300" : "text-blue-100"
              } mb-8 max-w-3xl mx-auto leading-relaxed`}
            >
              Discover premium sports facilities designed for champions. Book
              your perfect court and elevate your game today.
            </p>
            <div
              className={`w-24 h-1 ${
                darkmode
                  ? "bg-gradient-to-r from-gray-400 to-gray-500"
                  : "bg-gradient-to-r from-yellow-400 to-orange-500"
              } mx-auto rounded-full`}
            ></div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and View Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`${
            darkmode
              ? "bg-gray-800/80 border-gray-700/30"
              : "bg-white/80 border-white/20"
          } backdrop-blur-sm rounded-3xl shadow-xl border p-6 mb-12`}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="Search courts..."
                  className={`w-full pl-12 pr-4 py-3 ${
                    darkmode
                      ? "bg-gray-700/70 border-gray-600 text-gray-200 placeholder-gray-400 focus:bg-gray-700"
                      : "bg-white/70 border-blue-200 text-gray-700 placeholder-gray-500 focus:bg-white"
                  } border-2 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-300 shadow-sm`}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <select
                className={`px-4 py-3 ${
                  darkmode
                    ? "bg-gray-700/70 border-gray-600 text-gray-200 focus:bg-gray-700"
                    : "bg-white/70 border-purple-200 text-gray-700 focus:bg-white"
                } border-2 rounded-2xl focus:outline-none focus:border-purple-500 transition-all duration-300 shadow-sm min-w-48`}
                value={priceFilter}
                onChange={(e) => {
                  setPriceFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Prices</option>
                <option value="500">Under ৳500</option>
                <option value="1000">Under ৳1000</option>
                <option value="1500">Under ৳1500</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  viewMode === "cards"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : `${
                        darkmode
                          ? "bg-gray-700/70 text-gray-300 hover:bg-gray-600 hover:text-blue-400 border-gray-600"
                          : "bg-white/70 text-gray-700 hover:bg-white hover:text-blue-600 border-gray-200"
                      } border-2`
                }`}
                onClick={() => setViewMode("cards")}
                aria-label="Card view"
              >
                <FaTh className="text-sm" />
                <span>Cards</span>
              </button>
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  viewMode === "table"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : `${
                        darkmode
                          ? "bg-gray-700/70 text-gray-300 hover:bg-gray-600 hover:text-blue-400 border-gray-600"
                          : "bg-white/70 text-gray-700 hover:bg-white hover:text-blue-600 border-gray-200"
                      } border-2`
                }`}
                onClick={() => setViewMode("table")}
                aria-label="Table view"
              >
                <FaList className="text-sm" />
                <span>Table</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* No Results */}
        {filteredCourts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-16 ${
              darkmode
                ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
                : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300"
            } rounded-3xl border-2 border-dashed`}
          >
            <div className="text-6xl mb-4">🏟️</div>
            <h3
              className={`text-2xl font-bold ${
                darkmode ? "text-gray-300" : "text-gray-600"
              } mb-2`}
            >
              No courts found matching your criteria
            </h3>
            <p
              className={`${darkmode ? "text-gray-400" : "text-gray-500"} mb-6`}
            >
              Try adjusting your search or filters
            </p>
            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("");
              }}
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Card View */}
        {viewMode === "cards" && filteredCourts.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {paginatedCourts.map((court, index) => (
                <motion.div
                  key={court._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative ${
                    darkmode
                      ? "bg-gray-800 border-gray-700 hover:shadow-gray-900/50"
                      : "bg-white border-gray-100 hover:shadow-2xl"
                  } rounded-3xl shadow-xl transition-all duration-500 overflow-hidden border`}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 ${
                      darkmode
                        ? "bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
                        : "bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <figure className="relative h-56 overflow-hidden">
                    <img
                      src={court.image}
                      alt={court.type}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-sm shadow-lg">
                      ৳{court.price}
                    </div>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </figure>

                  <div className="relative p-6">
                    <h3
                      className={`text-xl font-bold ${
                        darkmode
                          ? "text-gray-100 group-hover:text-blue-400"
                          : "text-gray-800 group-hover:text-blue-600"
                      } mb-4 transition-colors duration-300`}
                    >
                      {court.type} Court
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div
                        className={`flex items-center gap-3 ${
                          darkmode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <div
                          className={`p-2 ${
                            darkmode
                              ? "bg-blue-900/50 group-hover:bg-blue-800/50"
                              : "bg-blue-100 group-hover:bg-blue-200"
                          } rounded-xl transition-colors duration-300`}
                        >
                          <FaClock className="text-blue-600 text-sm" />
                        </div>
                        <span className="text-sm font-medium">
                          {court.slot}
                        </span>
                      </div>

                      <div
                        className={`flex items-center gap-3 ${
                          darkmode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <div
                          className={`p-2 ${
                            darkmode
                              ? "bg-purple-900/50 group-hover:bg-purple-800/50"
                              : "bg-purple-100 group-hover:bg-purple-200"
                          } rounded-xl transition-colors duration-300`}
                        >
                          <FaMapMarkerAlt className="text-purple-600 text-sm" />
                        </div>
                        <span className="text-sm font-medium">
                          {court.location || "Location TBA"}
                        </span>
                      </div>
                    </div>

                    <button
                      className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => {
                        if (user) {
                          setSelectedCourt(court);
                        } else {
                          Swal.fire({
                            icon: "warning",
                            title: "Sign In Required",
                            text: "You need to sign in to book a court",
                            showConfirmButton: true,
                            confirmButtonText: "Sign In",
                            showCancelButton: true,
                            cancelButtonText: "Cancel",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              navigate("/SignIn", {
                                state: { from: location.pathname, court },
                              });
                            }
                          });
                        }
                      }}
                    >
                      Book Now
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -translate-x-10 -translate-y-10"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full translate-x-8 translate-y-8"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Table View */}
        {viewMode === "table" && filteredCourts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${
              darkmode
                ? "bg-gray-800/90 border-gray-700/30"
                : "bg-white/90 border-white/20"
            } backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={`${
                      darkmode
                        ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border-gray-700"
                        : "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-gray-200"
                    } border-b`}
                  >
                    <th
                      className={`text-left pl-8 py-6 font-bold ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } text-sm uppercase tracking-wider`}
                    >
                      Court Details
                    </th>
                    <th
                      className={`py-6 font-bold ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } text-sm uppercase tracking-wider text-center`}
                    >
                      Preview
                    </th>
                    <th
                      className={`py-6 font-bold ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } text-sm uppercase tracking-wider text-center`}
                    >
                      Time Slot
                    </th>
                    <th
                      className={`py-6 font-bold ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } text-sm uppercase tracking-wider text-center`}
                    >
                      Price
                    </th>
                    <th
                      className={`py-6 font-bold ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } text-sm uppercase tracking-wider text-center`}
                    >
                      Location
                    </th>
                    <th
                      className={`text-right pr-8 py-6 font-bold ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } text-sm uppercase tracking-wider`}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    darkmode ? "divide-gray-700" : "divide-gray-100"
                  }`}
                >
                  {paginatedCourts.map((court, index) => (
                    <motion.tr
                      key={court._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`group ${
                        darkmode
                          ? "hover:bg-gradient-to-r hover:from-blue-900/20 hover:via-purple-900/20 hover:to-pink-900/20"
                          : "hover:bg-gradient-to-r hover:from-blue-50/50 hover:via-purple-50/50 hover:to-pink-50/50"
                      } transition-all duration-300`}
                    >
                      <td className="pl-8 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          </div>
                          <div>
                            <div
                              className={`font-bold ${
                                darkmode
                                  ? "text-gray-100 group-hover:text-blue-400"
                                  : "text-gray-900 group-hover:text-blue-600"
                              } text-lg transition-colors duration-300`}
                            >
                              {court.type} Court
                            </div>
                            <div
                              className={`text-sm ${
                                darkmode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Premium Sports Facility
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 text-center">
                        <div className="flex justify-center">
                          <div className="relative group/image">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                              <img
                                src={court.image}
                                alt={court.type}
                                className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div
                            className={`p-2 ${
                              darkmode
                                ? "bg-blue-900/50 group-hover:bg-blue-800/50"
                                : "bg-blue-100 group-hover:bg-blue-200"
                            } rounded-xl transition-colors duration-300`}
                          >
                            <FaClock className="text-blue-600 text-sm" />
                          </div>
                          <span
                            className={`font-medium ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {court.slot}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-sm shadow-lg">
                          ৳{court.price}
                        </div>
                      </td>
                      <td className="py-6 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div
                            className={`p-2 ${
                              darkmode
                                ? "bg-purple-900/50 group-hover:bg-purple-800/50"
                                : "bg-purple-100 group-hover:bg-purple-200"
                            } rounded-xl transition-colors duration-300`}
                          >
                            <FaMapMarkerAlt className="text-purple-600 text-sm" />
                          </div>
                          <span
                            className={`font-medium ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {court.location || "Location TBA"}
                          </span>
                        </div>
                      </td>
                      <td className="pr-8 py-6 text-right">
                        <button
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                          onClick={() => {
                            if (user) {
                              setSelectedCourt(court);
                            } else {
                              Swal.fire({
                                icon: "warning",
                                title: "Sign In Required",
                                text: "You need to sign in to book a court",
                                showConfirmButton: true,
                                confirmButtonText: "Sign In",
                                showCancelButton: true,
                                cancelButtonText: "Cancel",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  navigate("/SignIn", {
                                    state: { from: location.pathname, court },
                                  });
                                }
                              });
                            }
                          }}
                        >
                          Book Now
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Enhanced Modern Pagination */}
        {filteredCourts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`mt-12 ${
              darkmode
                ? "bg-gradient-to-r from-gray-800/90 via-gray-700/90 to-gray-800/90 border-gray-600/30"
                : "bg-gradient-to-r from-white/90 via-blue-50/90 to-white/90 border-white/30"
            } backdrop-blur-lg rounded-3xl shadow-2xl border p-8 relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: darkmode
                    ? `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                       radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`
                    : `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                       radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)`,
                }}
              />
            </div>

            <div className="relative flex flex-col lg:flex-row justify-between items-center gap-8">
              {/* Enhanced Stats Display */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div
                  className={`${
                    darkmode
                      ? "bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-700/30"
                      : "bg-gradient-to-r from-blue-100/80 to-purple-100/80 border-blue-300/30"
                  } px-6 py-4 rounded-2xl border backdrop-blur-sm`}
                >
                  <div className="text-center">
                    <div
                      className={`text-2xl font-black ${
                        darkmode
                          ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      }`}
                    >
                      {(currentPage - 1) * itemsPerPage + 1}-
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredCourts.length
                      )}
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        darkmode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      of {filteredCourts.length} courts
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-32 h-2 ${
                      darkmode ? "bg-gray-700" : "bg-gray-200"
                    } rounded-full overflow-hidden`}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(currentPage / totalPages) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      darkmode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>

              {/* Enhanced Navigation Controls */}
              <div className="flex items-center gap-3">
                {/* Previous Button */}
                <motion.button
                  whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                  className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    currentPage === 1
                      ? `${
                          darkmode
                            ? "bg-gray-800 text-gray-600 border-gray-700"
                            : "bg-gray-100 text-gray-400 border-gray-200"
                        } cursor-not-allowed border`
                      : `${
                          darkmode
                            ? "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-blue-600 hover:to-purple-600 text-gray-200 hover:text-white border-gray-600 hover:border-transparent"
                            : "bg-gradient-to-r from-white to-gray-50 hover:from-blue-500 hover:to-purple-600 text-gray-700 hover:text-white border-gray-200 hover:border-transparent"
                        } border shadow-lg hover:shadow-xl`
                  }`}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <FiChevronLeft
                    className={`text-lg transition-transform duration-300 ${
                      currentPage === 1 ? "" : "group-hover:-translate-x-1"
                    }`}
                  />
                  <span className="hidden sm:block">Previous</span>
                </motion.button>

                {/* Page Numbers with Enhanced Design */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    const isActive = currentPage === pageNum;

                    return (
                      <motion.button
                        key={pageNum}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-12 h-12 rounded-2xl font-bold transition-all duration-300 overflow-hidden ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl transform scale-110"
                            : `${
                                darkmode
                                  ? "bg-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-blue-900/60 hover:to-purple-900/60 hover:text-blue-300 border-gray-600"
                                  : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-600 border-gray-200"
                              } border shadow-md hover:shadow-lg`
                        }`}
                        onClick={() => goToPage(pageNum)}
                      >
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                        <span className="relative z-10">{pageNum}</span>
                      </motion.button>
                    );
                  })}

                  {/* Show ellipsis and last page if needed */}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span
                        className={`px-2 ${
                          darkmode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        ...
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 rounded-2xl font-bold transition-all duration-300 ${
                          darkmode
                            ? "bg-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-blue-900/60 hover:to-purple-900/60 hover:text-blue-300 border-gray-600"
                            : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-600 border-gray-200"
                        } border shadow-md hover:shadow-lg`}
                        onClick={() => goToPage(totalPages)}
                      >
                        {totalPages}
                      </motion.button>
                    </>
                  )}
                </div>

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                  className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    currentPage === totalPages
                      ? `${
                          darkmode
                            ? "bg-gray-800 text-gray-600 border-gray-700"
                            : "bg-gray-100 text-gray-400 border-gray-200"
                        } cursor-not-allowed border`
                      : `${
                          darkmode
                            ? "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-blue-600 hover:to-purple-600 text-gray-200 hover:text-white border-gray-600 hover:border-transparent"
                            : "bg-gradient-to-r from-white to-gray-50 hover:from-blue-500 hover:to-purple-600 text-gray-700 hover:text-white border-gray-200 hover:border-transparent"
                        } border shadow-lg hover:shadow-xl`
                  }`}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <span className="hidden sm:block">Next</span>
                  <FiChevronRight
                    className={`text-lg transition-transform duration-300 ${
                      currentPage === totalPages
                        ? ""
                        : "group-hover:translate-x-1"
                    }`}
                  />
                </motion.button>
              </div>
            </div>

            {/* Quick Jump Input */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 pt-6 border-t border-gray-200/20 flex items-center justify-center gap-4"
            >
              <span
                className={`text-sm font-medium ${
                  darkmode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Jump to page:
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  className={`w-20 px-3 py-2 text-center rounded-xl border ${
                    darkmode
                      ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-400"
                      : "bg-white border-gray-300 text-gray-700 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        goToPage(page);
                        e.target.value = "";
                      }
                    }
                  }}
                />
                <span
                  className={`text-sm ${
                    darkmode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  of {totalPages}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Booking Modal */}
        <AnimatePresence>
          {selectedCourt && (
            <BookingModal
              court={selectedCourt}
              user={user}
              onClose={() => setSelectedCourt(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Courts;
