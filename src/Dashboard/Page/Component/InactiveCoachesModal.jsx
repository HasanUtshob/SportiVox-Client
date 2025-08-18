import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaTimes,
  FaTrash,
  FaCheck,
  FaStar,
  FaEnvelope,
  FaGraduationCap,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import { Themecontext } from "../../../Context/ThemeContext";

const InactiveCoachesModal = ({ isOpen, onClose }) => {
  const { darkmode } = useContext(Themecontext);
  const [inactiveCoaches, setInactiveCoaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();

  useEffect(() => {
    if (isOpen) {
      fetchInactiveCoaches();
    }
  }, [isOpen]);

  const fetchInactiveCoaches = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.get(
        "/coaches?status=inactive&limit=100"
      );
      console.log("🔍 MODAL DEBUG: Inactive coaches response:", response.data);
      setInactiveCoaches(response.data.coaches || []);
    } catch (error) {
      console.error("Error fetching inactive coaches:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch inactive coaches. Please try again.",
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleActivateCoach = async (coachId, coachName) => {
    try {
      const response = await axiosSecure.patch(`/coaches/${coachId}/status`, {
        status: "active",
      });

      if (response.data.modifiedCount > 0) {
        // Refresh inactive coaches list
        await fetchInactiveCoaches();

        Swal.fire({
          icon: "success",
          title: "Coach Activated!",
          text: `${coachName} has been activated successfully.`,
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error activating coach:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to activate coach. Please try again.",
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
      });
    }
  };

  const handleRemoveCoach = async (coachId, coachName) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete ${coachName} from the database. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete permanently!",
      cancelButtonText: "Cancel",
      background: darkmode ? "#1f2937" : "#ffffff",
      color: darkmode ? "#f9fafb" : "#111827",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.delete(`/coaches/${coachId}`);

        if (response.data.deletedCount > 0) {
          // Refresh inactive coaches list
          await fetchInactiveCoaches();

          Swal.fire({
            icon: "success",
            title: "Coach Deleted!",
            text: `${coachName} has been permanently removed from the database.`,
            background: darkmode ? "#1f2937" : "#ffffff",
            color: darkmode ? "#f9fafb" : "#111827",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error deleting coach:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete coach. Please try again.",
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`${
            darkmode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-2xl border shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className={`${
              darkmode ? "border-gray-700" : "border-gray-200"
            } border-b p-6`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-xl">
                  <FaUsers className="text-red-600 text-xl" />
                </div>
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      darkmode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Inactive Coaches
                  </h2>
                  <p
                    className={`text-sm ${
                      darkmode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {inactiveCoaches.length} inactive coach
                    {inactiveCoaches.length !== 1 ? "es" : ""} found
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  darkmode
                    ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span
                  className={`ml-3 ${
                    darkmode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Loading inactive coaches...
                </span>
              </div>
            ) : inactiveCoaches.length === 0 ? (
              <div className="text-center py-8">
                <FaUsers
                  className={`mx-auto text-4xl mb-4 ${
                    darkmode ? "text-gray-600" : "text-gray-400"
                  }`}
                />
                <p
                  className={`text-lg font-medium ${
                    darkmode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  No inactive coaches found
                </p>
                <p
                  className={`text-sm ${
                    darkmode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  All coaches are currently active!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inactiveCoaches.map((coach, index) => (
                  <motion.div
                    key={coach._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${
                      darkmode
                        ? "bg-gradient-to-r from-gray-700 to-gray-600 border-gray-500"
                        : "bg-gradient-to-r from-white to-gray-50 border-gray-200"
                    } border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
                  >
                    <div className="flex items-center justify-between">
                      {/* Coach Info */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={coach.image}
                            alt={coach.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-red-200 shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            INACTIVE
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`text-lg font-bold ${
                              darkmode ? "text-white" : "text-gray-900"
                            } mb-1`}
                          >
                            {coach.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <FaGraduationCap className="text-purple-500 text-sm" />
                            <span
                              className={`text-sm font-medium ${
                                darkmode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {coach.specialization}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <FaEnvelope className="text-blue-500 text-xs" />
                              <span
                                className={`text-xs ${
                                  darkmode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {coach.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-500 text-xs" />
                              <span
                                className={`text-xs font-medium ${
                                  darkmode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {coach.rating || 0} Rating
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleActivateCoach(coach._id, coach.name)
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                          title="Activate Coach"
                        >
                          <FaCheck className="text-sm" />
                          Activate
                        </button>
                        <button
                          onClick={() =>
                            handleRemoveCoach(coach._id, coach.name)
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                          title="Delete Coach Permanently"
                        >
                          <FaTrash className="text-sm" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className={`${
              darkmode ? "border-gray-700" : "border-gray-200"
            } border-t p-6`}
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                  darkmode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InactiveCoachesModal;
