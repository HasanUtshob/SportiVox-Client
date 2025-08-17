import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaTags,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPercent,
  FaGift,
  FaTimes,
  FaTicketAlt,
} from "react-icons/fa";
import {
  MdDiscount,
  MdRefresh,
  MdFilterList,
  MdViewList,
  MdViewModule,
} from "react-icons/md";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Component/Loading";
import { Themecontext } from "../../Context/ThemeContext";

const ManageCoupons = () => {
  const { darkmode } = useContext(Themecontext);
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("cards");
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const axiosSecure = useAxios();

  // Fetch coupons function
  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/all_coupons");
      setCoupons(res.data);
      setFilteredCoupons(res.data);
    } catch (err) {
      console.error("Failed to fetch coupons", err);
      setCoupons([]);
      setFilteredCoupons([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load coupons",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
        customClass: {
          popup: darkmode ? "dark-popup" : "",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [axiosSecure]);

  // Handle search
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const results = coupons.filter(
      (coupon) =>
        coupon.code?.toLowerCase().includes(lowerSearch) ||
        coupon.description?.toLowerCase().includes(lowerSearch)
    );
    setFilteredCoupons(results);
  }, [search, coupons]);

  const openModal = (coupon = null) => {
    if (coupon) {
      setNewCoupon({
        code: coupon.code,
        discount: coupon.value?.toString() || "",
        description: coupon.description || "",
      });
      setEditingId(coupon._id);
    } else {
      setNewCoupon({ code: "", discount: "", description: "" });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewCoupon({ code: "", discount: "", description: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { code, discount, description } = newCoupon;

    if (!code || !discount) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill all required fields",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
        customClass: {
          popup: darkmode ? "dark-popup" : "",
        },
      });
    }

    const percent = parseFloat(discount);
    if (isNaN(percent) || percent <= 0 || percent > 100) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Discount",
        text: "Discount must be between 1-100%",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
        customClass: {
          popup: darkmode ? "dark-popup" : "",
        },
      });
    }

    const payload = {
      code: code.trim().toUpperCase(),
      type: "percent",
      value: percent,
      description: description?.trim() || "",
    };

    try {
      if (editingId) {
        const res = await axiosSecure.patch(`/coupons/${editingId}`, payload);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Coupon updated successfully",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
            customClass: {
              popup: darkmode ? "dark-popup" : "",
            },
          });
          await fetchCoupons();
          closeModal();
        }
      } else {
        const res = await axiosSecure.post("/coupons", payload);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Added!",
            text: "Coupon added successfully",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
            customClass: {
              popup: darkmode ? "dark-popup" : "",
            },
          });
          await fetchCoupons();
          closeModal();
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
        customClass: {
          popup: darkmode ? "dark-popup" : "",
        },
      });
    }
  };

  const handleDelete = async (id, code) => {
    const result = await Swal.fire({
      title: "Delete Coupon?",
      text: `This will permanently delete the coupon "${code}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: darkmode ? "#1f2937" : "#ffffff",
      color: darkmode ? "#f9fafb" : "#111827",
      customClass: {
        popup: darkmode ? "dark-popup" : "",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/coupons/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Coupon has been removed",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
            customClass: {
              popup: darkmode ? "dark-popup" : "",
            },
          });
          await fetchCoupons();
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete coupon",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
          customClass: {
            popup: darkmode ? "dark-popup" : "",
          },
        });
      }
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkmode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
            : "bg-gradient-to-br from-purple-50 via-white to-pink-50"
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
          : "bg-gradient-to-br from-purple-50 via-white to-pink-50"
      } relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div
        className={`absolute inset-0 ${
          darkmode
            ? "bg-gradient-to-r from-gray-700/10 to-gray-600/10"
            : "bg-gradient-to-r from-purple-600/5 to-pink-600/5"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-br from-gray-600/20 to-transparent"
            : "bg-gradient-to-br from-purple-400/10 to-transparent"
        } rounded-full -translate-x-48 -translate-y-48`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-96 h-96 ${
          darkmode
            ? "bg-gradient-to-tl from-gray-600/20 to-transparent"
            : "bg-gradient-to-tl from-pink-400/10 to-transparent"
        } rounded-full translate-x-48 translate-y-48`}
      ></div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative overflow-hidden ${
          darkmode
            ? "bg-gradient-to-r from-purple-700 via-pink-700 to-purple-900"
            : "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800"
        } text-white`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 mb-6">
              <FaTags className="text-yellow-400 text-2xl" />
              <span className="text-lg font-semibold">
                Coupon Management System
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Manage <span className="text-yellow-300">Discount</span> Coupons
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Create, edit, and manage discount coupons to boost customer
              engagement and sales
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatsCard
            title="Total Coupons"
            value={coupons.length}
            icon={<FaTicketAlt />}
            color="from-purple-500 to-indigo-600"
            bgColor={
              darkmode
                ? "from-gray-800 to-gray-700"
                : "from-purple-50 to-indigo-50"
            }
            darkmode={darkmode}
          />
          <StatsCard
            title="Active Coupons"
            value={filteredCoupons.length}
            icon={<FaGift />}
            color="from-pink-500 to-rose-600"
            bgColor={
              darkmode ? "from-gray-800 to-gray-700" : "from-pink-50 to-rose-50"
            }
            darkmode={darkmode}
          />
          <StatsCard
            title="Avg. Discount"
            value={
              coupons.length > 0
                ? `${Math.round(
                    coupons.reduce((sum, c) => sum + c.value, 0) /
                      coupons.length
                  )}%`
                : "0%"
            }
            icon={<FaPercent />}
            color="from-emerald-500 to-teal-600"
            bgColor={
              darkmode
                ? "from-gray-800 to-gray-700"
                : "from-emerald-50 to-teal-50"
            }
            darkmode={darkmode}
          />
        </motion.div>

        {/* Search and Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`${
            darkmode
              ? "bg-gray-800/80 border-gray-700/50"
              : "bg-white/80 border-white/20"
          } backdrop-blur-sm rounded-3xl p-6 shadow-xl border mb-8`}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center space-x-3">
              <MdFilterList className="text-2xl text-purple-600" />
              <h3
                className={`text-lg font-semibold ${
                  darkmode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Controls
              </h3>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <FaSearch
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    darkmode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search coupons by code or description..."
                  className={`w-full pl-12 pr-4 py-3 border ${
                    darkmode
                      ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-purple-500"
                      : "border-gray-200 bg-white/70 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                  } rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                />
              </div>

              {/* View Toggle Buttons - Hidden on mobile */}
              <div className="hidden md:flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "list"
                      ? "bg-purple-500 text-white shadow-lg"
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
                      ? "bg-purple-500 text-white shadow-lg"
                      : darkmode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <MdViewModule />
                </motion.button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchCoupons}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <MdRefresh />
                  <span className="hidden sm:inline">Refresh</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <FaPlus />
                  <span>Add Coupon</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coupons Display */}
        <AnimatePresence mode="wait">
          {filteredCoupons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div
                className={`${
                  darkmode
                    ? "bg-gray-800/80 border-gray-700/50"
                    : "bg-white/80 border-white/20"
                } backdrop-blur-sm rounded-3xl p-12 shadow-xl border max-w-md mx-auto`}
              >
                <FaTags
                  className={`text-6xl ${
                    darkmode ? "text-gray-600" : "text-gray-300"
                  } mx-auto mb-6`}
                />
                <h3
                  className={`text-2xl font-bold ${
                    darkmode ? "text-gray-300" : "text-gray-700"
                  } mb-4`}
                >
                  No Coupons Found
                </h3>
                <p
                  className={`${darkmode ? "text-gray-400" : "text-gray-500"}`}
                >
                  {search
                    ? "No coupons match your search criteria."
                    : "No coupons available. Create your first coupon!"}
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              {/* List View - Hidden on mobile */}
              {viewMode === "list" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className={`hidden md:block ${
                    darkmode
                      ? "bg-gray-800/80 border-gray-700/50"
                      : "bg-white/80 border-white/20"
                  } backdrop-blur-sm rounded-3xl shadow-xl border overflow-hidden`}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead
                        className={`${
                          darkmode
                            ? "bg-gradient-to-r from-gray-700 to-gray-600"
                            : "bg-gradient-to-r from-purple-50 to-pink-50"
                        } sticky top-0 z-10`}
                      >
                        <tr>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            } uppercase tracking-wider`}
                          >
                            <div className="flex items-center gap-2">
                              <FaTicketAlt className="text-purple-500" />
                              Code
                            </div>
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            } uppercase tracking-wider`}
                          >
                            <div className="flex items-center gap-2">
                              <FaPercent className="text-green-500" />
                              Discount
                            </div>
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            } uppercase tracking-wider`}
                          >
                            Description
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-sm font-semibold ${
                              darkmode ? "text-gray-300" : "text-gray-700"
                            } uppercase tracking-wider`}
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
                        {filteredCoupons.map((coupon, index) => (
                          <motion.tr
                            key={coupon._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`${
                              darkmode
                                ? "hover:bg-gray-700/50"
                                : "hover:bg-purple-50/50"
                            } transition-colors duration-200`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3">
                                  <FaTicketAlt className="text-white text-sm" />
                                </div>
                                <div
                                  className={`font-bold text-lg ${
                                    darkmode ? "text-gray-200" : "text-gray-900"
                                  }`}
                                >
                                  {coupon.code}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                                  darkmode
                                    ? "bg-green-900/50 text-green-300"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {coupon.value}% OFF
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div
                                className={`text-sm ${
                                  darkmode ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {coupon.description || "No description"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => openModal(coupon)}
                                  className="px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1"
                                >
                                  <FaEdit />
                                  <span>Edit</span>
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    handleDelete(coupon._id, coupon.code)
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
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Card View - Always visible on mobile, conditional on desktop */}
              <div
                className={`${
                  viewMode === "list" ? "block md:hidden" : "block"
                } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
              >
                {filteredCoupons.map((coupon, index) => (
                  <motion.div
                    key={coupon._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`${
                      darkmode
                        ? "bg-gray-800/80 border-gray-700/50 hover:shadow-gray-900/50"
                        : "bg-white/80 border-white/20 hover:shadow-2xl"
                    } backdrop-blur-sm rounded-3xl p-6 shadow-xl border transition-all duration-300 hover:-translate-y-2`}
                  >
                    {/* Coupon Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
                          <FaTicketAlt className="text-white text-xl" />
                        </div>
                        <div>
                          <h3
                            className={`text-xl font-bold ${
                              darkmode ? "text-gray-100" : "text-gray-800"
                            }`}
                          >
                            {coupon.code}
                          </h3>
                          <p
                            className={`text-sm ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Discount Coupon
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-3xl font-bold ${
                            darkmode ? "text-green-400" : "text-green-600"
                          }`}
                        >
                          {coupon.value}%
                        </div>
                        <p
                          className={`text-xs ${
                            darkmode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          OFF
                        </p>
                      </div>
                    </div>

                    {/* Coupon Description */}
                    <div className="mb-6">
                      <p
                        className={`text-sm ${
                          darkmode ? "text-gray-300" : "text-gray-600"
                        } leading-relaxed`}
                      >
                        {coupon.description || "No description provided"}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openModal(coupon)}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDelete(coupon._id, coupon.code)}
                        className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Add/Edit Coupon Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 ${
                darkmode ? "bg-black/70" : "bg-black/50"
              } backdrop-blur-sm flex items-center justify-center z-50 p-4`}
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className={`${
                  darkmode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-white"
                } rounded-3xl p-8 w-full max-w-md shadow-2xl border relative`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
                      <FaTags className="text-white text-xl" />
                    </div>
                    <div>
                      <h2
                        className={`text-2xl font-bold ${
                          darkmode ? "text-gray-100" : "text-gray-800"
                        }`}
                      >
                        {editingId ? "Edit Coupon" : "Add New Coupon"}
                      </h2>
                      <p
                        className={`text-sm ${
                          darkmode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {editingId
                          ? "Update coupon details"
                          : "Create a new discount coupon"}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className={`w-10 h-10 ${
                      darkmode
                        ? "bg-gray-700 hover:bg-red-600 text-gray-300"
                        : "bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500"
                    } rounded-full flex items-center justify-center transition-all duration-300`}
                  >
                    <FaTimes />
                  </motion.button>
                </div>

                {/* Modal Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      className={`block text-sm font-semibold ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Coupon Code *
                    </label>
                    <input
                      type="text"
                      value={newCoupon.code}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, code: e.target.value })
                      }
                      className={`w-full px-4 py-3 border ${
                        darkmode
                          ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-purple-500"
                          : "border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-purple-500"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                      placeholder="e.g., SAVE20"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-semibold ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Discount Percentage *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={newCoupon.discount}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, discount: e.target.value })
                      }
                      className={`w-full px-4 py-3 border ${
                        darkmode
                          ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-purple-500"
                          : "border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-purple-500"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                      placeholder="e.g., 20"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-semibold ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Description (Optional)
                    </label>
                    <textarea
                      value={newCoupon.description}
                      onChange={(e) =>
                        setNewCoupon({
                          ...newCoupon,
                          description: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border ${
                        darkmode
                          ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-purple-500"
                          : "border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-purple-500"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none`}
                      rows="3"
                      placeholder="Brief description of the coupon..."
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={closeModal}
                      className={`flex-1 py-3 px-6 ${
                        darkmode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
                      } border rounded-xl font-semibold transition-all duration-300`}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {editingId ? "Update Coupon" : "Create Coupon"}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Stats Card Component
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

export default ManageCoupons;
