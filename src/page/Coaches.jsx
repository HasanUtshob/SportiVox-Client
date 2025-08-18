import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaList,
  FaTh,
  FaStar,
  FaUser,
  FaTrophy,
  FaGraduationCap,
  FaEye,
  FaCalendarAlt,
  FaLanguage,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import CoachBookingModal from "./CoachBookingModal";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import Loading from "../Component/Loading";
import { Themecontext } from "../Context/ThemeContext";

// Coach Details Modal Component
const CoachDetailsModal = ({ coach, onClose, darkmode }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-center items-center p-2 sm:p-4 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
            }}
            className={`${
              darkmode
                ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 border-gray-600"
                : "bg-gradient-to-br from-white via-gray-50 to-white border-gray-200"
            } rounded-3xl shadow-3xl border-2 w-full max-w-4xl max-h-[95vh] overflow-y-auto relative`}
          >
            {/* Header */}
            <div
              className={`sticky top-0 ${
                darkmode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border-b rounded-t-3xl p-6 z-10`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <FaUser className="text-white text-xl" />
                  </div>
                  <div>
                    <h2
                      className={`text-2xl font-bold ${
                        darkmode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      Coach Details
                    </h2>
                    <p
                      className={`text-sm ${
                        darkmode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Complete information about {coach.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-2xl transition-all duration-300 ${
                    darkmode
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Coach Profile Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`${
                  darkmode
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } rounded-2xl border p-6`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <img
                      src={coach.image}
                      alt={coach.name}
                      className="w-full md:w-48 h-48 md:h-48 object-contain bg-gray-100 dark:bg-gray-600 rounded-2xl shadow-lg"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl text-sm font-bold flex items-center gap-1">
                      <FaStar className="text-xs" />
                      {coach.rating}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3
                        className={`text-2xl font-bold ${
                          darkmode ? "text-gray-100" : "text-gray-800"
                        } mb-2`}
                      >
                        {coach.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div
                          className={`flex items-center space-x-2 ${
                            darkmode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <FaEnvelope className="text-blue-500" />
                          <span className="text-sm">
                            {coach.email || "coach@example.com"}
                          </span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${
                            darkmode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <FaPhone className="text-green-500" />
                          <span className="text-sm">
                            {coach.phone || "+880 123 456 789"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${
                        darkmode
                          ? "bg-blue-900/30 border-blue-700/50"
                          : "bg-blue-50 border-blue-200"
                      } border rounded-xl p-4`}
                    >
                      <p
                        className={`text-sm ${
                          darkmode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {coach.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Professional Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`${
                  darkmode
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } rounded-2xl border p-6`}
              >
                <h3
                  className={`text-lg font-semibold ${
                    darkmode ? "text-gray-100" : "text-gray-800"
                  } mb-4 flex items-center gap-2`}
                >
                  <FaTrophy className="text-purple-500" />
                  Professional Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div
                    className={`${
                      darkmode
                        ? "bg-gray-800/50 border-gray-600"
                        : "bg-white border-gray-200"
                    } border rounded-xl p-4`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <FaTrophy className="text-blue-600" />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            darkmode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Specialization
                        </p>
                        <p
                          className={`font-semibold ${
                            darkmode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {coach.specialization}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${
                      darkmode
                        ? "bg-gray-800/50 border-gray-600"
                        : "bg-white border-gray-200"
                    } border rounded-xl p-4`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-xl">
                        <FaGraduationCap className="text-purple-600" />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            darkmode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Experience
                        </p>
                        <p
                          className={`font-semibold ${
                            darkmode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {coach.experience}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${
                      darkmode
                        ? "bg-gray-800/50 border-gray-600"
                        : "bg-white border-gray-200"
                    } border rounded-xl p-4`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-xl">
                        <FaDollarSign className="text-green-600" />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            darkmode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Hourly Rate
                        </p>
                        <p
                          className={`font-semibold ${
                            darkmode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          ৳{coach.hourlyRate}/hr
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${
                      darkmode
                        ? "bg-gray-800/50 border-gray-600"
                        : "bg-white border-gray-200"
                    } border rounded-xl p-4`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-xl">
                        <FaMapMarkerAlt className="text-orange-600" />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            darkmode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Location
                        </p>
                        <p
                          className={`font-semibold ${
                            darkmode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {coach.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${
                      darkmode
                        ? "bg-gray-800/50 border-gray-600"
                        : "bg-white border-gray-200"
                    } border rounded-xl p-4`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-xl">
                        <FaStar className="text-red-600" />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            darkmode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Rating
                        </p>
                        <p
                          className={`font-semibold ${
                            darkmode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {coach.rating}/5.0
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Availability */}
              {coach.availability && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`${
                    darkmode
                      ? "bg-gray-700/50 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  } rounded-2xl border p-6`}
                >
                  <h3
                    className={`text-lg font-semibold ${
                      darkmode ? "text-gray-100" : "text-gray-800"
                    } mb-4 flex items-center gap-2`}
                  >
                    <FaClock className="text-blue-500" />
                    Availability
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {coach.availability.map((time, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl text-sm font-medium"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Certifications */}
              {coach.certifications && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`${
                    darkmode
                      ? "bg-gray-700/50 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  } rounded-2xl border p-6`}
                >
                  <h3
                    className={`text-lg font-semibold ${
                      darkmode ? "text-gray-100" : "text-gray-800"
                    } mb-4 flex items-center gap-2`}
                  >
                    <FaGraduationCap className="text-purple-500" />
                    Certifications
                  </h3>

                  <div className="space-y-2">
                    {coach.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 ${
                          darkmode
                            ? "bg-gray-800/50 border-gray-600"
                            : "bg-white border-gray-200"
                        } border rounded-xl`}
                      >
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FaCheckCircle className="text-purple-600 text-sm" />
                        </div>
                        <span
                          className={`${
                            darkmode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Languages */}
              {coach.languages && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`${
                    darkmode
                      ? "bg-gray-700/50 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  } rounded-2xl border p-6`}
                >
                  <h3
                    className={`text-lg font-semibold ${
                      darkmode ? "text-gray-100" : "text-gray-800"
                    } mb-4 flex items-center gap-2`}
                  >
                    <FaLanguage className="text-orange-500" />
                    Languages
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {coach.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-orange-100 text-orange-800 rounded-xl text-sm font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Close Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center pt-4"
              >
                <button
                  onClick={onClose}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Close Details
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

const Coaches = () => {
  const { darkmode } = useContext(Themecontext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [detailsCoach, setDetailsCoach] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("cards");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const axiosSecure = useAxios();

  // Constants
  const CARDS_PER_PAGE = 6;
  const TABLE_ROWS_PER_PAGE = 10;

  useEffect(() => {
    const fetchCoaches = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: viewMode === "cards" ? CARDS_PER_PAGE : TABLE_ROWS_PER_PAGE,
          status: "active",
        });

        if (searchTerm) params.append("search", searchTerm);
        if (specializationFilter)
          params.append("specialization", specializationFilter);
        if (priceFilter) params.append("maxPrice", priceFilter);

        const response = await axiosSecure.get(`/coaches?${params}`);

        if (response.data && response.data.coaches) {
          setCoaches(response.data.coaches);
          // Update pagination info if available
          if (response.data.pagination) {
            setTotalPages(response.data.pagination.totalPages);
          }
        } else {
          setCoaches([]);
        }
      } catch (error) {
        console.error("Error fetching coaches:", error);
        setCoaches([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, [
    currentPage,
    searchTerm,
    specializationFilter,
    priceFilter,
    viewMode,
    axiosSecure,
  ]);

  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPage = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  useEffect(() => {
    if (location.state?.reopenCoach) {
      setSelectedCoach(location.state.reopenCoach);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  if (loading) {
    return <Loading message="Loading Coaches..." variant="sports" />;
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              🏆 Expert Coaches
            </h1>
            <p
              className={`text-xl md:text-2xl ${
                darkmode ? "text-gray-300" : "text-blue-100"
              } mb-8 max-w-3xl mx-auto leading-relaxed`}
            >
              Train with certified professional coaches and take your skills to
              the next level. Book personalized coaching sessions today.
            </p>
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
                  placeholder="Search coaches..."
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
                value={specializationFilter}
                onChange={(e) => {
                  setSpecializationFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Sports</option>
                <option value="Tennis">Tennis</option>
                <option value="Basketball">Basketball</option>
                <option value="Badminton">Badminton</option>
                <option value="Swimming">Swimming</option>
                <option value="Football">Football</option>
                <option value="Yoga">Yoga</option>
              </select>

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
                <option value="1000">Under ৳1000</option>
                <option value="1500">Under ৳1500</option>
                <option value="2000">Under ৳2000</option>
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
              {/* Hide table view on mobile devices */}
              <button
                className={`hidden md:flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
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

        {/* Card View */}
        {viewMode === "cards" && coaches.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {coaches.map((coach, index) => (
                <motion.div
                  key={coach._id}
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
                  <figure className="relative h-56 overflow-hidden">
                    <img
                      src={coach.image}
                      alt={coach.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-sm shadow-lg">
                      ৳{coach.hourlyRate}/hr
                    </div>
                    <div className="absolute top-4 left-4 px-3 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl font-bold text-sm shadow-lg flex items-center gap-1">
                      <FaStar className="text-xs" />
                      {coach.rating}
                    </div>
                  </figure>

                  <div className="relative p-6">
                    <h3
                      className={`text-xl font-bold ${
                        darkmode
                          ? "text-gray-100 group-hover:text-blue-400"
                          : "text-gray-800 group-hover:text-blue-600"
                      } mb-2 transition-colors duration-300`}
                    >
                      {coach.name}
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
                          <FaTrophy className="text-blue-600 text-sm" />
                        </div>
                        <span className="text-sm font-medium">
                          {coach.specialization}
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
                          <FaGraduationCap className="text-purple-600 text-sm" />
                        </div>
                        <span className="text-sm font-medium">
                          {coach.experience} experience
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
                              ? "bg-green-900/50 group-hover:bg-green-800/50"
                              : "bg-green-100 group-hover:bg-green-200"
                          } rounded-xl transition-colors duration-300`}
                        >
                          <FaMapMarkerAlt className="text-green-600 text-sm" />
                        </div>
                        <span className="text-sm font-medium">
                          {coach.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        className={`flex-1 py-3 px-4 ${
                          darkmode
                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border-gray-600"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border-gray-300"
                        } border-2 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105`}
                        onClick={() => setDetailsCoach(coach)}
                      >
                        <FaEye className="text-sm" />
                        <span>View Details</span>
                      </button>
                      <button
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        onClick={() => {
                          if (user) {
                            setSelectedCoach(coach);
                          } else {
                            Swal.fire({
                              icon: "warning",
                              title: "Sign In Required",
                              text: "You need to sign in to book a coach",
                              showConfirmButton: true,
                              confirmButtonText: "Sign In",
                              showCancelButton: true,
                              cancelButtonText: "Cancel",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                navigate("/SignIn", {
                                  state: { from: location.pathname, coach },
                                });
                              }
                            });
                          }
                        }}
                      >
                        <FaCalendarAlt className="text-sm" />
                        <span>Book Coach</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Booking Modal */}
        <AnimatePresence>
          {selectedCoach && (
            <CoachBookingModal
              coach={selectedCoach}
              user={user}
              onClose={() => setSelectedCoach(null)}
            />
          )}
        </AnimatePresence>

        {/* Coach Details Modal */}
        <AnimatePresence>
          {detailsCoach && (
            <CoachDetailsModal
              coach={detailsCoach}
              onClose={() => setDetailsCoach(null)}
              darkmode={darkmode}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Coaches;
