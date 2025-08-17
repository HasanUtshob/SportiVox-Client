import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { Themecontext } from "../../Context/ThemeContext";
import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaSearch,
  FaEye,
  FaFilter,
} from "react-icons/fa";
import {
  MdSportsBasketball,
  MdRefresh,
  MdFilterList,
  MdViewList,
  MdViewModule,
  MdAttachMoney,
  MdSchedule,
  MdImage,
} from "react-icons/md";
import AddCourtForm from "./Component/AddCourtForm";
import UpdateCourtForm from "./Component/UpdateCourtForm";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";

const ManageCourts = () => {
  const { darkmode } = useContext(Themecontext);
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [sortBy, setSortBy] = useState("type");
  const axiosSecure = useAxios();

  const fetchCourts = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/courts");
      const sortedCourts = res.data.sort((a, b) =>
        a.type.localeCompare(b.type)
      );
      setCourts(sortedCourts);
      setFilteredCourts(sortedCourts);
    } catch (error) {
      console.error("Error fetching courts:", error);
      setCourts([]);
      setFilteredCourts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, [axiosSecure]);

  // Filter and search courts
  useEffect(() => {
    let filtered = courts;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (court) =>
          court.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          court.slot.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price filter
    if (priceFilter) {
      filtered = filtered.filter((court) => court.price <= Number(priceFilter));
    }

    // Apply sorting
    switch (sortBy) {
      case "type":
        filtered.sort((a, b) => a.type.localeCompare(b.type));
        break;
      case "price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "slot":
        filtered.sort((a, b) => a.slot.localeCompare(b.slot));
        break;
      default:
        break;
    }

    setFilteredCourts(filtered);
  }, [courts, searchTerm, priceFilter, sortBy]);

  const handleDelete = async (id, courtType) => {
    const result = await Swal.fire({
      title: "Delete Court?",
      text: `This will permanently remove the ${courtType} court.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await axiosSecure.delete(`/courts/${id}`);
        await Swal.fire({
          title: "Deleted!",
          text: "Court has been successfully deleted.",
          icon: "success",
          confirmButtonColor: "#10B981",
          customClass: {
            popup: "rounded-2xl shadow-2xl",
            confirmButton: "rounded-xl px-6 py-3",
          },
        });
        fetchCourts();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete court.",
          icon: "error",
          confirmButtonColor: "#EF4444",
          customClass: {
            popup: "rounded-2xl shadow-2xl",
            confirmButton: "rounded-xl px-6 py-3",
          },
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (court) => {
    setSelectedCourt(court);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setSelectedCourt(null);
    fetchCourts();
  };

  const getCourtStats = () => {
    const totalCourts = courts.length;
    const avgPrice =
      courts.length > 0
        ? (
            courts.reduce((sum, court) => sum + Number(court.price), 0) /
            courts.length
          ).toFixed(2)
        : "0.00";
    const uniqueTypes = new Set(courts.map((court) => court.type)).size;

    return { totalCourts, avgPrice, uniqueTypes };
  };

  const { totalCourts, avgPrice, uniqueTypes } = getCourtStats();

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
        } flex items-center justify-center`}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      } relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-r from-gray-700/10 to-gray-600/10"
            : "bg-gradient-to-r from-blue-600/5 to-purple-600/5"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-br from-gray-600/20 to-transparent"
            : "bg-gradient-to-br from-blue-400/10 to-transparent"
        } rounded-full -translate-x-48 -translate-y-48`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-tl from-gray-600/20 to-transparent"
            : "bg-gradient-to-tl from-purple-400/10 to-transparent"
        } rounded-full translate-x-48 translate-y-48`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center justify-center space-x-3">
            <MdSportsBasketball className="text-blue-600" />
            <span>Manage Courts</span>
          </h1>
          <p
            className={`text-xl ${
              darkmode ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Comprehensive court management with advanced filtering and
            organization tools
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatsCard
            title="Total Courts"
            value={totalCourts}
            icon={<MdSportsBasketball />}
            color="from-blue-500 to-cyan-500"
            bgColor={
              darkmode ? "from-gray-800 to-gray-700" : "from-blue-50 to-cyan-50"
            }
            darkmode={darkmode}
          />
          <StatsCard
            title="Court Types"
            value={uniqueTypes}
            icon={<MdSportsBasketball />}
            color="from-green-500 to-emerald-500"
            bgColor={
              darkmode
                ? "from-gray-800 to-gray-700"
                : "from-green-50 to-emerald-50"
            }
            darkmode={darkmode}
          />
          <StatsCard
            title="Average Price"
            value={`৳${avgPrice}`}
            icon={<MdAttachMoney />}
            color="from-purple-500 to-indigo-500"
            bgColor={
              darkmode
                ? "from-gray-800 to-gray-700"
                : "from-purple-50 to-indigo-50"
            }
            darkmode={darkmode}
          />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`${
            darkmode
              ? "bg-gray-800/80 border-gray-700/50"
              : "bg-white/80 border-white/20"
          } backdrop-blur-sm rounded-3xl p-6 shadow-2xl border mb-8`}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center space-x-3">
              <MdFilterList className="text-2xl text-blue-600" />
              <h3
                className={`text-lg font-semibold ${
                  darkmode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Controls
              </h3>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <FaSearch
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    darkmode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search courts by type or slot..."
                  className={`w-full pl-10 pr-4 py-3 border ${
                    darkmode
                      ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-blue-500"
                      : "border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500"
                  } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className={`px-4 py-3 border ${
                  darkmode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-blue-500"
                    : "border-gray-200 bg-white text-gray-900 focus:border-blue-500"
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="">All Prices</option>
                <option value="500">Under ৳500</option>
                <option value="1000">Under ৳1000</option>
                <option value="1500">Under ৳1500</option>
                <option value="2000">Under ৳2000</option>
              </select>

              <select
                className={`px-4 py-3 border ${
                  darkmode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-blue-500"
                    : "border-gray-200 bg-white text-gray-900 focus:border-blue-500"
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="type">Sort by Type</option>
                <option value="price">Sort by Price</option>
                <option value="slot">Sort by Slot</option>
              </select>

              <div className="hidden md:flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("table")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "table"
                      ? "bg-blue-500 text-white shadow-lg"
                      : darkmode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <MdViewList />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("cards")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "cards"
                      ? "bg-blue-500 text-white shadow-lg"
                      : darkmode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <MdViewModule />
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchCourts}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <MdRefresh />
                <span>Refresh</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Court</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Courts List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {filteredCourts.length === 0 ? (
            <div
              className={`${
                darkmode
                  ? "bg-gray-800/80 border-gray-700/50"
                  : "bg-white/80 border-white/20"
              } backdrop-blur-sm rounded-3xl p-12 shadow-2xl border text-center`}
            >
              <MdSportsBasketball
                className={`text-6xl ${
                  darkmode ? "text-gray-600" : "text-gray-300"
                } mx-auto mb-4`}
              />
              <h3
                className={`text-2xl font-bold ${
                  darkmode ? "text-gray-300" : "text-gray-600"
                } mb-2`}
              >
                No Courts Found
              </h3>
              <p className={`${darkmode ? "text-gray-400" : "text-gray-500"}`}>
                {searchTerm || priceFilter
                  ? "Try adjusting your filters to see more results."
                  : "No courts have been added yet. Click 'Add Court' to get started."}
              </p>
            </div>
          ) : (
            <>
              {/* Table View - Hidden on mobile */}
              {viewMode === "table" && (
                <div
                  className={`hidden md:block ${
                    darkmode
                      ? "bg-gray-800/80 border-gray-700/50"
                      : "bg-white/80 border-white/20"
                  } backdrop-blur-sm rounded-3xl shadow-2xl border overflow-hidden`}
                >
                  <div className="max-h-[600px] overflow-y-auto">
                    <table className="w-full">
                      <thead
                        className={`${
                          darkmode
                            ? "bg-gradient-to-r from-gray-700 to-gray-600"
                            : "bg-gradient-to-r from-blue-50 to-purple-50"
                        } sticky top-0 z-10`}
                      >
                        <tr>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Image
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Type
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Slot
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Price
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={`divide-y ${
                          darkmode ? "divide-gray-700" : "divide-gray-100"
                        }`}
                      >
                        <AnimatePresence>
                          {filteredCourts.map((court, index) => (
                            <motion.tr
                              key={court._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ delay: index * 0.1 }}
                              className={`${
                                darkmode
                                  ? "hover:bg-gray-700/50"
                                  : "hover:bg-blue-50/50"
                              } transition-colors`}
                            >
                              <td className="px-6 py-4">
                                <div className="w-16 h-12 rounded-xl overflow-hidden shadow-lg">
                                  <img
                                    src={court.image}
                                    alt={court.type}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <MdSportsBasketball className="text-blue-500" />
                                  <span
                                    className={`font-medium ${
                                      darkmode
                                        ? "text-gray-200"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {court.type}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <MdSchedule className="text-green-500" />
                                  <span
                                    className={`${
                                      darkmode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {court.slot}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <MdAttachMoney className="text-yellow-500" />
                                  <span
                                    className={`font-semibold ${
                                      darkmode
                                        ? "text-gray-200"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    ৳{court.price}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleEdit(court)}
                                    className="px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1"
                                  >
                                    <FaEdit />
                                    <span>Edit</span>
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      handleDelete(court._id, court.type)
                                    }
                                    className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1"
                                  >
                                    <FaTrash />
                                    <span>Delete</span>
                                  </motion.button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Card View - Always visible on mobile, conditional on desktop */}
              <div
                className={`${
                  viewMode === "table" ? "block md:hidden" : "block"
                } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
              >
                <AnimatePresence>
                  {filteredCourts.map((court, index) => (
                    <motion.div
                      key={court._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${
                        darkmode
                          ? "bg-gray-800/80 border-gray-700/50 hover:shadow-gray-900/50"
                          : "bg-white/80 border-white/20 hover:shadow-3xl"
                      } backdrop-blur-sm rounded-3xl shadow-2xl border overflow-hidden transition-all duration-300`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={court.image}
                          alt={court.type}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div
                          className={`absolute top-4 right-4 ${
                            darkmode
                              ? "bg-gray-700/90 text-gray-200"
                              : "bg-white/90 text-gray-800"
                          } backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold`}
                        >
                          ৳{court.price}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3
                          className={`text-xl font-bold ${
                            darkmode ? "text-gray-100" : "text-gray-800"
                          } mb-3 flex items-center space-x-2`}
                        >
                          <MdSportsBasketball className="text-blue-500" />
                          <span>{court.type}</span>
                        </h3>

                        <div className="space-y-2 mb-6">
                          <div
                            className={`flex items-center space-x-2 ${
                              darkmode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            <MdSchedule className="text-green-500" />
                            <span className="text-sm">{court.slot}</span>
                          </div>
                          <div
                            className={`flex items-center space-x-2 ${
                              darkmode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            <MdAttachMoney className="text-yellow-500" />
                            <span className="text-sm font-semibold">
                              ৳{court.price} per session
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleEdit(court)}
                            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleDelete(court._id, court.type)}
                            className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <FaTrash />
                            <span>Delete</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Add Court Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            className={`fixed inset-0 ${
              darkmode ? "bg-black/70" : "bg-black/50"
            } backdrop-blur-sm z-50 flex items-center justify-center p-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModals}
          >
            <motion.div
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AddCourtForm onClose={closeModals} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Court Modal */}
      <AnimatePresence>
        {selectedCourt && (
          <motion.div
            className={`fixed inset-0 ${
              darkmode ? "bg-black/70" : "bg-black/50"
            } backdrop-blur-sm z-50 flex items-center justify-center p-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModals}
          >
            <motion.div
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <UpdateCourtForm court={selectedCourt} onClose={closeModals} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatsCard = ({ title, value, icon, color, bgColor, darkmode }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className={`bg-gradient-to-br ${bgColor} p-6 rounded-3xl shadow-xl border ${
      darkmode ? "border-gray-700/50" : "border-white/20"
    } relative overflow-hidden`}
  >
    <div
      className={`absolute top-0 right-0 w-20 h-20 ${
        darkmode ? "bg-gray-600/10" : "bg-white/10"
      } rounded-full -translate-y-10 translate-x-10`}
    ></div>
    <div className="relative z-10 flex items-center space-x-4">
      <div
        className={`p-4 bg-gradient-to-br ${color} text-white rounded-2xl shadow-lg`}
      >
        <div className="text-2xl">{icon}</div>
      </div>
      <div>
        <h4
          className={`text-sm font-semibold ${
            darkmode ? "text-gray-400" : "text-gray-600"
          } mb-1`}
        >
          {title}
        </h4>
        <p
          className={`text-3xl font-bold ${
            darkmode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

export default ManageCourts;
