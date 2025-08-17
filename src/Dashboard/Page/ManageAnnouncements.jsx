import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { IoMdMegaphone } from "react-icons/io";
import { HiSparkles, HiOutlineEmojiSad } from "react-icons/hi";
import useAxios from "../../hooks/useAxios";
import useTheme from "../../hooks/useTheme";
import Loading from "../../Component/Loading";

const ManageAnnouncements = () => {
  const { darkmode } = useTheme();
  const [announcements, setAnnouncements] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/announcements");
      const sortedData = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setAnnouncements(sortedData);
      setFiltered(sortedData);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load announcements",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const result = announcements.filter(
      (a) =>
        a.title.toLowerCase().includes(value) ||
        a.description.toLowerCase().includes(value)
    );
    setFiltered(result);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Announcement?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      backdrop: true,
      background: darkmode ? "#1f2937" : "#ffffff",
      color: darkmode ? "#f9fafb" : "#111827",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/announcements/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Announcement has been removed",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
          });
          fetchAnnouncements();
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete announcement",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
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
      });
    }

    const payload = {
      ...formData,
      date: new Date(),
    };

    try {
      if (editingId) {
        await axiosSecure.patch(`/announcements/${editingId}`, payload);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Announcement updated successfully",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
        });
      } else {
        await axiosSecure.post("/announcements", payload);
        Swal.fire({
          icon: "success",
          title: "Posted!",
          text: "New announcement created",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
        });
      }

      setFormData({ title: "", description: "" });
      setEditingId(null);
      setModalOpen(false);
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save announcement",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
      });
    }
  };

  const openModal = (announcement = null) => {
    if (announcement) {
      setFormData({
        title: announcement.title,
        description: announcement.description,
      });
      setEditingId(announcement._id);
    } else {
      setFormData({ title: "", description: "" });
      setEditingId(null);
    }
    setModalOpen(true);
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) {
    return <Loading message="Loading announcements..." />;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkmode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      {/* Enhanced Header with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative overflow-hidden ${
          darkmode
            ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
            : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700"
        } text-white py-16 px-4 shadow-2xl`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-6"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div
              className={`p-4 rounded-full ${
                darkmode ? "bg-gray-600/30" : "bg-white/20"
              } backdrop-blur-sm`}
            >
              <IoMdMegaphone className="text-4xl md:text-5xl" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Announcement Center
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <HiSparkles className="text-yellow-300" />
                <span
                  className={`text-sm font-medium ${
                    darkmode ? "text-gray-300" : "text-blue-100"
                  }`}
                >
                  Powered by Innovation
                </span>
              </div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              darkmode ? "text-gray-300" : "text-blue-100"
            }`}
          >
            Create, manage, and publish important announcements with style and
            efficiency
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Enhanced Search and Add Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 p-6 rounded-2xl shadow-xl backdrop-blur-sm border transition-all duration-300 ${
            darkmode
              ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
              : "bg-white/70 border-white/50 hover:bg-white/90"
          }`}
        >
          <div className="relative w-full lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch
                className={`text-xl ${
                  darkmode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            <input
              type="text"
              className={`block w-full pl-12 pr-4 py-4 text-lg rounded-xl transition-all duration-300 focus:ring-4 focus:ring-opacity-50 ${
                darkmode
                  ? "bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400"
                  : "bg-gray-50/80 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              } border backdrop-blur-sm`}
              placeholder="Search announcements by title or content..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className={`flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 w-full lg:w-auto justify-center ${
              darkmode
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white"
            } hover:shadow-xl transform hover:-translate-y-1`}
          >
            <FiPlus className="text-xl" />
            Create New Announcement
          </motion.button>
        </motion.div>

        {/* Enhanced Announcements Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className={`text-center py-20 rounded-2xl shadow-xl backdrop-blur-sm border transition-all duration-300 ${
                darkmode
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/70 border-white/50"
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <HiOutlineEmojiSad
                  className={`text-6xl mx-auto mb-4 ${
                    darkmode ? "text-gray-600" : "text-gray-400"
                  }`}
                />
              </motion.div>
              <h3
                className={`text-2xl font-bold mb-3 ${
                  darkmode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                No Announcements Found
              </h3>
              <p
                className={`text-lg mb-6 ${
                  darkmode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {search
                  ? "No announcements match your search criteria."
                  : "No announcements available yet. Create your first one!"}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal()}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  darkmode
                    ? "text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                    : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                }`}
              >
                Create your first announcement
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentItems.map((announcement, index) => (
                <motion.div
                  key={announcement._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border backdrop-blur-sm overflow-hidden ${
                    darkmode
                      ? "bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80"
                      : "bg-white/80 border-white/50 hover:bg-white/95"
                  }`}
                >
                  {/* Card Header */}
                  <div
                    className={`p-6 border-b ${
                      darkmode ? "border-gray-700/50" : "border-gray-100/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3
                        className={`text-xl font-bold line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 ${
                          darkmode ? "text-gray-100" : "text-gray-800"
                        }`}
                      >
                        {announcement.title}
                      </h3>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          darkmode
                            ? "bg-gray-700/50 text-gray-300"
                            : "bg-gray-100/80 text-gray-600"
                        }`}
                      >
                        {moment(announcement.date).fromNow()}
                      </motion.span>
                    </div>

                    <p
                      className={`text-base leading-relaxed line-clamp-3 ${
                        darkmode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {announcement.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <FiCalendar
                            className={`text-sm ${
                              darkmode ? "text-gray-500" : "text-gray-400"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {moment(announcement.date).format("MMM D, YYYY")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiClock
                            className={`text-sm ${
                              darkmode ? "text-gray-500" : "text-gray-400"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              darkmode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {moment(announcement.date).format("h:mm A")}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal(announcement)}
                          className={`p-3 rounded-full transition-all duration-300 ${
                            darkmode
                              ? "text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                              : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          }`}
                          aria-label="Edit announcement"
                        >
                          <FiEdit2 className="text-lg" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(announcement._id)}
                          className={`p-3 rounded-full transition-all duration-300 ${
                            darkmode
                              ? "text-red-400 hover:text-red-300 hover:bg-red-900/30"
                              : "text-red-600 hover:text-red-800 hover:bg-red-50"
                          }`}
                          aria-label="Delete announcement"
                        >
                          <FiTrash2 className="text-lg" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <nav
              className={`inline-flex rounded-xl shadow-lg overflow-hidden ${
                darkmode ? "bg-gray-800/50" : "bg-white/80"
              } backdrop-blur-sm`}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-6 py-3 font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? darkmode
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-gray-400 cursor-not-allowed"
                    : darkmode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                Previous
              </motion.button>

              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-3 font-medium transition-all duration-300 ${
                    currentPage === i + 1
                      ? darkmode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-600 text-white"
                      : darkmode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                  }`}
                >
                  {i + 1}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-6 py-3 font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? darkmode
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-gray-400 cursor-not-allowed"
                    : darkmode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                Next
              </motion.button>
            </nav>
          </motion.div>
        )}
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`w-full max-w-2xl rounded-2xl shadow-2xl backdrop-blur-sm border transition-all duration-300 ${
                darkmode
                  ? "bg-gray-800/95 border-gray-700/50"
                  : "bg-white/95 border-white/50"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`p-3 rounded-full ${
                      darkmode ? "bg-blue-900/30" : "bg-blue-100"
                    }`}
                  >
                    <IoMdMegaphone
                      className={`text-2xl ${
                        darkmode ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <h2
                    className={`text-3xl font-bold ${
                      darkmode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {editingId
                      ? "Edit Announcement"
                      : "Create New Announcement"}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      className={`block text-lg font-semibold mb-3 ${
                        darkmode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Title *
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-4 text-lg rounded-xl transition-all duration-300 focus:ring-4 focus:ring-opacity-50 ${
                        darkmode
                          ? "bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400"
                          : "bg-gray-50/80 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      } border backdrop-blur-sm`}
                      placeholder="Enter announcement title..."
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-lg font-semibold mb-3 ${
                        darkmode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Description *
                    </label>
                    <textarea
                      className={`w-full px-4 py-4 text-lg rounded-xl transition-all duration-300 focus:ring-4 focus:ring-opacity-50 min-h-[150px] resize-none ${
                        darkmode
                          ? "bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400"
                          : "bg-gray-50/80 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      } border backdrop-blur-sm`}
                      placeholder="Enter announcement details..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className={`px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
                        darkmode
                          ? "text-gray-300 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50"
                          : "text-gray-700 bg-gray-100/80 hover:bg-gray-200 border border-gray-200/50"
                      }`}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className={`px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                        darkmode
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white"
                      } hover:shadow-xl`}
                    >
                      {editingId
                        ? "Update Announcement"
                        : "Publish Announcement"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageAnnouncements;
