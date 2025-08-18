import React, { useEffect, useState, useContext } from "react";
import InactiveCoachesModal from "./Component/InactiveCoachesModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaStar,
  FaTrophy,
  FaGraduationCap,
  FaDollarSign,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { Themecontext } from "../../Context/ThemeContext";
import AddCoachForm from "./Component/AddCoachForm";
import UpdateCoachForm from "./Component/UpdateCoachForm";
import CoachDetailsModal from "./Component/CoachDetailsModal";
import Loading from "../../Component/Loading";

const ManageCoaches = () => {
  const { darkmode } = useContext(Themecontext);
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    avgRating: 0,
  });
  const axiosSecure = useAxios();

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    fetchCoaches();
  }, []);

  useEffect(() => {
    if (coaches.length > 0) {
      fetchCoachStats();
    }
  }, [coaches]);

  useEffect(() => {
    filterCoaches();
  }, [coaches, searchTerm, specializationFilter, ratingFilter]);

  // Fetch coach statistics from API
  const fetchCoachStats = async () => {
    try {
      console.log("🔍 STATS DEBUG: Calculating stats for coaches:", coaches);
      console.log("🔍 STATS DEBUG: Coaches length:", coaches.length);

      // Debug each coach's status
      coaches.forEach((coach, index) => {
        console.log(
          `🔍 STATS DEBUG: Coach ${index + 1} - Name: ${coach.name}, Status: "${
            coach.status
          }", Type: ${typeof coach.status}`
        );
      });

      const response = await axiosSecure.get("/coaches/stats/overview");
      console.log("🔍 STATS DEBUG: API response:", response);

      // Always calculate local stats for accuracy with better debugging
      const activeCoaches = coaches.filter((c) => {
        const isActive = c.status && c.status.toLowerCase() === "active";
        console.log(
          `🔍 STATS DEBUG: ${c.name} - Status: "${c.status}" - Is Active: ${isActive}`
        );
        return isActive;
      });

      const inactiveCoaches = coaches.filter((c) => {
        const isInactive = c.status && c.status.toLowerCase() === "inactive";
        console.log(
          `🔍 STATS DEBUG: ${c.name} - Status: "${c.status}" - Is Inactive: ${isInactive}`
        );
        return isInactive;
      });

      console.log("🔍 STATS DEBUG: Active coaches:", activeCoaches);
      console.log("🔍 STATS DEBUG: Inactive coaches:", inactiveCoaches);

      const localStats = {
        total: coaches.length,
        active: activeCoaches.length,
        inactive: inactiveCoaches.length,
        avgRating:
          coaches.length > 0
            ? (
                coaches.reduce((sum, c) => sum + (c.rating || 0), 0) /
                coaches.length
              ).toFixed(1)
            : 0,
      };

      console.log("🔍 STATS DEBUG: Final calculated stats:", localStats);

      // Use local stats to ensure accuracy
      setStats(localStats);
    } catch (error) {
      console.error("Error fetching coach stats:", error);
      // Fallback to local calculation if API fails
      const activeCoaches = coaches.filter(
        (c) => c.status && c.status.toLowerCase() === "active"
      );
      const inactiveCoaches = coaches.filter(
        (c) => c.status && c.status.toLowerCase() === "inactive"
      );

      const localStats = {
        total: coaches.length,
        active: activeCoaches.length,
        inactive: inactiveCoaches.length,
        avgRating:
          coaches.length > 0
            ? (
                coaches.reduce((sum, c) => sum + (c.rating || 0), 0) /
                coaches.length
              ).toFixed(1)
            : 0,
      };

      console.log("🔍 STATS DEBUG: Fallback stats:", localStats);
      setStats(localStats);
    }
  };

  const fetchCoaches = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: 1,
        limit: 100, // Get all coaches for admin management
        status: "", // ← Remove status filter to get ALL coaches (active + inactive)
      });

      const response = await axiosSecure.get(`/coaches?${params}`);

      if (response.data.coaches) {
        console.log("🔍 DEBUG: Raw coaches data:", response.data.coaches);
        console.log(
          "🔍 DEBUG: First coach structure:",
          response.data.coaches[0]
        );

        setCoaches(response.data.coaches);
      } else {
        setCoaches([]);
      }
    } catch (error) {
      console.error("Error fetching coaches:", error);
      // Set empty array if API fails
      setCoaches([]);
    } finally {
      setLoading(false);
    }
  };

  const filterCoaches = () => {
    let filtered = coaches.filter((coach) => {
      // Only show active coaches in the main grid
      const isActive = coach.status && coach.status.toLowerCase() === "active";

      const matchesSearch =
        coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialization =
        specializationFilter === "" ||
        coach.specialization === specializationFilter;

      const matchesRating =
        ratingFilter === "" || coach.rating >= parseFloat(ratingFilter);

      return (
        isActive && matchesSearch && matchesSpecialization && matchesRating
      );
    });

    setFilteredCoaches(filtered);
    setCurrentPage(1);
  };

  const handleAddCoach = async (newCoach) => {
    try {
      const response = await axiosSecure.post("/coaches", newCoach);

      if (response.data.insertedId) {
        // Refresh coaches list
        await fetchCoaches();
        await fetchCoachStats();
        setShowAddForm(false);

        Swal.fire({
          icon: "success",
          title: "Coach Added Successfully!",
          text: "The new coach has been added to the system.",
          confirmButtonColor: "#10b981",
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
        });
      }
    } catch (error) {
      console.error("Error adding coach:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add coach. Please try again.",
        confirmButtonColor: "#ef4444",
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
      });
    }
  };

  const handleUpdateCoach = async (updatedCoach) => {
    try {
      const response = await axiosSecure.put(
        `/coaches/${updatedCoach._id}`,
        updatedCoach
      );

      if (response.data.modifiedCount > 0) {
        // Refresh coaches list
        await fetchCoaches();
        await fetchCoachStats();
        setShowUpdateForm(false);
        setSelectedCoach(null);

        Swal.fire({
          icon: "success",
          title: "Coach Updated Successfully!",
          text: "The coach information has been updated.",
          confirmButtonColor: "#10b981",
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
        });
      }
    } catch (error) {
      console.error("Error updating coach:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update coach. Please try again.",
        confirmButtonColor: "#ef4444",
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
      });
    }
  };

  const handleDeleteCoach = async (coachId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! This will also delete all related bookings.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: darkmode ? "#1f2937" : "#ffffff",
      color: darkmode ? "#f9fafb" : "#111827",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/coaches/${coachId}`);

          if (response.data.deletedCount > 0) {
            // Refresh coaches list
            await fetchCoaches();
            await fetchCoachStats();

            Swal.fire({
              title: "Deleted!",
              text: "The coach has been deleted successfully.",
              icon: "success",
              confirmButtonColor: "#10b981",
              background: darkmode ? "#1f2937" : "#ffffff",
              color: darkmode ? "#f9fafb" : "#111827",
            });
          }
        } catch (error) {
          console.error("Error deleting coach:", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete coach. Please try again.",
            confirmButtonColor: "#ef4444",
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
          });
        }
      }
    });
  };

  const handleToggleStatus = async (coachId) => {
    try {
      const coach = coaches.find((c) => c._id === coachId);
      const newStatus = coach.status === "active" ? "inactive" : "active";

      const response = await axiosSecure.patch(`/coaches/${coachId}/status`, {
        status: newStatus,
      });
      console.log(status);
      console.log(newStatus);
      if (response.data.modifiedCount > 0) {
        // Refresh coaches list and recalculate stats
        await fetchCoaches();

        Swal.fire({
          icon: "success",
          title: "Status Updated!",
          text: `Coach status changed to ${newStatus}.`,
          confirmButtonColor: "#10b981",
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error updating coach status:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update coach status. Please try again.",
        confirmButtonColor: "#ef4444",
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
      });
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredCoaches.length / ITEMS_PER_PAGE);
  const paginatedCoaches = filteredCoaches.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPage = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  if (loading) {
    return <Loading message="Loading Coaches..." variant="sports" />;
  }

  return (
    <div
      className={`min-h-screen p-6 ${darkmode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div
          className={`${
            darkmode
              ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-gray-600"
              : "bg-gradient-to-r from-white via-blue-50 to-white border-gray-200"
          } rounded-3xl border p-8 shadow-2xl`}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div
                className={`p-4 rounded-2xl ${
                  darkmode ? "bg-blue-600" : "bg-blue-500"
                } shadow-lg`}
              >
                <FaUsers className="text-white text-2xl" />
              </div>
              <div>
                <h1
                  className={`text-4xl font-bold bg-gradient-to-r ${
                    darkmode
                      ? "from-blue-400 to-purple-400"
                      : "from-blue-600 to-purple-600"
                  } bg-clip-text text-transparent mb-2`}
                >
                  Manage Coaches
                </h1>
                <p
                  className={`text-lg ${
                    darkmode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Add, edit, and manage your coaching staff with ease
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
              >
                <FaPlus className="text-lg" />
                Add New Coach
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {/* Total Coaches Card */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className={`${
            darkmode
              ? "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 border-blue-600"
              : "bg-gradient-to-br from-blue-50 via-white to-blue-100 border-blue-200"
          } rounded-3xl border p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-semibold ${
                  darkmode ? "text-blue-300" : "text-blue-600"
                } mb-2`}
              >
                Total Coaches
              </p>
              <p
                className={`text-3xl font-bold ${
                  darkmode ? "text-white" : "text-gray-900"
                } mb-1`}
              >
                {stats.total}
              </p>
              <p
                className={`text-xs ${
                  darkmode ? "text-blue-400" : "text-blue-500"
                }`}
              >
                All registered coaches
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <FaUsers className="text-white text-2xl" />
            </div>
          </div>
        </motion.div>

        {/* Active Coaches Card */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className={`${
            darkmode
              ? "bg-gradient-to-br from-green-900 via-green-800 to-green-700 border-green-600"
              : "bg-gradient-to-br from-green-50 via-white to-green-100 border-green-200"
          } rounded-3xl border p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-semibold ${
                  darkmode ? "text-green-300" : "text-green-600"
                } mb-2`}
              >
                Active Coaches
              </p>
              <p
                className={`text-3xl font-bold ${
                  darkmode ? "text-white" : "text-gray-900"
                } mb-1`}
              >
                {stats.active}
              </p>
              <p
                className={`text-xs ${
                  darkmode ? "text-green-400" : "text-green-500"
                }`}
              >
                Currently available
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
              <FaChartLine className="text-white text-2xl" />
            </div>
          </div>
        </motion.div>

        {/* Inactive Coaches Card */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => {
            if (stats.inactive > 0) {
              setShowInactiveModal(true);
            } else {
              Swal.fire({
                icon: "info",
                title: "No Inactive Coaches",
                text: "All coaches are currently active. Great job managing your team!",
                confirmButtonColor: "#10b981",
                background: darkmode ? "#1f2937" : "#ffffff",
                color: darkmode ? "#f9fafb" : "#111827",
              });
            }
          }}
          className={`${
            darkmode
              ? "bg-gradient-to-br from-red-900 via-red-800 to-red-700 border-red-600"
              : "bg-gradient-to-br from-red-50 via-white to-red-100 border-red-200"
          } rounded-3xl border p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-semibold ${
                  darkmode ? "text-red-300" : "text-red-600"
                } mb-2`}
              >
                Inactive Coaches
              </p>
              <p
                className={`text-3xl font-bold ${
                  darkmode ? "text-white" : "text-gray-900"
                } mb-1`}
              >
                {stats.inactive}
              </p>
              <p
                className={`text-xs ${
                  darkmode ? "text-red-400" : "text-red-500"
                }`}
              >
                {stats.inactive > 0 ? "Click to manage" : "None inactive"}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg">
              <FaUsers className="text-white text-2xl" />
            </div>
          </div>
        </motion.div>

        {/* Average Rating Card */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className={`${
            darkmode
              ? "bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 border-yellow-600"
              : "bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-yellow-200"
          } rounded-3xl border p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-semibold ${
                  darkmode ? "text-yellow-300" : "text-yellow-600"
                } mb-2`}
              >
                Average Rating
              </p>
              <p
                className={`text-3xl font-bold ${
                  darkmode ? "text-white" : "text-gray-900"
                } mb-1`}
              >
                {stats.avgRating}
              </p>
              <p
                className={`text-xs ${
                  darkmode ? "text-yellow-400" : "text-yellow-500"
                }`}
              >
                Out of 5.0 stars
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg">
              <FaStar className="text-white text-2xl" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`${
          darkmode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } rounded-2xl border p-6 mb-8 shadow-lg`}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                darkmode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search coaches..."
              className={`w-full pl-12 pr-4 py-3 ${
                darkmode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className={`px-4 py-3 ${
              darkmode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-900"
            } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          >
            <option value="">All Specializations</option>
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
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-900"
            } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
          </select>
        </div>
      </motion.div>

      {/* Enhanced Coaches Grid - Optimized for 6 coaches per page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
      >
        <AnimatePresence>
          {paginatedCoaches.map((coach, index) => (
            <motion.div
              key={coach._id}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`${
                darkmode
                  ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 border-gray-600"
                  : "bg-gradient-to-br from-white via-gray-50 to-white border-gray-200"
              } rounded-3xl border shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-56 object-contain bg-gray-100 dark:bg-gray-700 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                      coach.status === "active"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {coach.status.toUpperCase()}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl text-sm font-bold flex items-center gap-1 shadow-lg">
                  <FaStar className="text-xs" />
                  {coach.rating}
                </div>

                {/* Hover Actions */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <button
                    onClick={() => {
                      setSelectedCoach(coach);
                      setShowDetailsModal(true);
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1"
                    title="View Details"
                  >
                    <FaEye className="text-xs" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCoach(coach);
                      setShowUpdateForm(true);
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1"
                    title="Edit Coach"
                  >
                    <FaEdit className="text-xs" />
                    Edit
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="text-center mb-4">
                  <h3
                    className={`text-xl font-bold ${
                      darkmode ? "text-white" : "text-gray-900"
                    } mb-2`}
                  >
                    {coach.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      darkmode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {coach.email}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div
                    className={`flex items-center gap-3 p-2 rounded-xl ${
                      darkmode ? "bg-gray-700/50" : "bg-blue-50"
                    }`}
                  >
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <FaTrophy className="text-white text-sm" />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {coach.specialization}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-3 p-2 rounded-xl ${
                      darkmode ? "bg-gray-700/50" : "bg-purple-50"
                    }`}
                  >
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <FaGraduationCap className="text-white text-sm" />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {coach.experience}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-3 p-2 rounded-xl ${
                      darkmode ? "bg-gray-700/50" : "bg-green-50"
                    }`}
                  >
                    <div className="p-2 bg-green-500 rounded-lg">
                      <FaDollarSign className="text-white text-sm" />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      ৳{coach.hourlyRate}/hr
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleStatus(coach._id)}
                    className={`flex-1 py-3 px-4 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                      coach.status === "active"
                        ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
                        : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
                    }`}
                  >
                    {coach.status === "active" ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    onClick={() => handleDeleteCoach(coach._id)}
                    className="p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    title="Delete Coach"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${
            darkmode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-2xl border p-6 shadow-lg`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div
              className={`text-sm ${
                darkmode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredCoaches.length)}{" "}
              of {filteredCoaches.length} coaches
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentPage === 1
                    ? `${
                        darkmode
                          ? "text-gray-600 bg-gray-800"
                          : "text-gray-400 bg-gray-100"
                      } cursor-not-allowed`
                    : `${
                        darkmode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                }`}
              >
                <FiChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : `${
                            darkmode
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-700 hover:bg-gray-100"
                          }`
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentPage === totalPages
                    ? `${
                        darkmode
                          ? "text-gray-600 bg-gray-800"
                          : "text-gray-400 bg-gray-100"
                      } cursor-not-allowed`
                    : `${
                        darkmode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                }`}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showAddForm && (
          <AddCoachForm
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddCoach}
          />
        )}

        {showUpdateForm && selectedCoach && (
          <UpdateCoachForm
            coach={selectedCoach}
            onClose={() => {
              setShowUpdateForm(false);
              setSelectedCoach(null);
            }}
            onSubmit={handleUpdateCoach}
          />
        )}

        {showDetailsModal && selectedCoach && (
          <CoachDetailsModal
            coach={selectedCoach}
            onClose={() => {
              setShowDetailsModal(false);
              setSelectedCoach(null);
            }}
          />
        )}

        {showInactiveModal && (
          <InactiveCoachesModal
            isOpen={showInactiveModal}
            onClose={() => {
              setShowInactiveModal(false);
              // Refresh coaches list after modal closes to update stats
              fetchCoaches();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageCoaches;
