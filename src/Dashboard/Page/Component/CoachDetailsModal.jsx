import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTrophy,
  FaGraduationCap,
  FaDollarSign,
  FaMapMarkerAlt,
  FaClock,
  FaLanguage,
  FaStar,
  FaCalendarAlt,
  FaUsers,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Themecontext } from "../../../Context/ThemeContext";

const CoachDetailsModal = ({ coach, onClose }) => {
  const { darkmode } = useContext(Themecontext);

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
            } rounded-3xl shadow-3xl border-2 w-full max-w-5xl max-h-[95vh] overflow-y-auto relative`}
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
                  <FaTimes className="text-xl" />
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
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          coach.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {coach.status === "active" ? (
                          <div className="flex items-center gap-1">
                            <FaCheckCircle className="text-xs" />
                            Active
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <FaTimesCircle className="text-xs" />
                            Inactive
                          </div>
                        )}
                      </span>
                    </div>
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
                          <span className="text-sm">{coach.email}</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${
                            darkmode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <FaPhone className="text-green-500" />
                          <span className="text-sm">{coach.phone}</span>
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
                      <div className="p-2 bg-yellow-100 rounded-xl">
                        <FaCalendarAlt className="text-yellow-600" />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            darkmode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Join Date
                        </p>
                        <p
                          className={`font-semibold ${
                            darkmode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {formatDate(coach.joinDate)}
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

              {/* Statistics */}
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
                  <FaChartLine className="text-green-500" />
                  Performance Statistics
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`${
                      darkmode
                        ? "bg-gray-800/50 border-gray-600"
                        : "bg-white border-gray-200"
                    } border rounded-xl p-4 text-center`}
                  >
                    <div className="p-3 bg-blue-100 rounded-2xl w-fit mx-auto mb-3">
                      <FaUsers className="text-blue-600 text-xl" />
                    </div>
                    <p
                      className={`text-2xl font-bold ${
                        darkmode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {coach.totalStudents}
                    </p>
                    <p
                      className={`text-sm ${
                        darkmode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Total Students
                    </p>
                  </div>

                  <div
                    className={`${
                      darkmode
                        ? "bg-gray-800/50 border-gray-600"
                        : "bg-white border-gray-200"
                    } border rounded-xl p-4 text-center`}
                  >
                    <div className="p-3 bg-green-100 rounded-2xl w-fit mx-auto mb-3">
                      <FaClock className="text-green-600 text-xl" />
                    </div>
                    <p
                      className={`text-2xl font-bold ${
                        darkmode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {coach.totalSessions}
                    </p>
                    <p
                      className={`text-sm ${
                        darkmode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Total Sessions
                    </p>
                  </div>

                  <div
                    className={`${
                      darkmode
                        ? "bg-gray-800/50 border-gray-600"
                        : "bg-white border-gray-200"
                    } border rounded-xl p-4 text-center`}
                  >
                    <div className="p-3 bg-yellow-100 rounded-2xl w-fit mx-auto mb-3">
                      <FaStar className="text-yellow-600 text-xl" />
                    </div>
                    <p
                      className={`text-2xl font-bold ${
                        darkmode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {coach.rating}
                    </p>
                    <p
                      className={`text-sm ${
                        darkmode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Average Rating
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Availability */}
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
                  <FaClock className="text-blue-500" />
                  Availability
                </h3>

                <div className="flex flex-wrap gap-3">
                  {coach.availability?.map((time, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl text-sm font-medium"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
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
                  <FaGraduationCap className="text-purple-500" />
                  Certifications
                </h3>

                <div className="space-y-2">
                  {coach.certifications?.map((cert, index) => (
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

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
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
                  {coach.languages?.map((lang, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-orange-100 text-orange-800 rounded-xl text-sm font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Close Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
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

export default CoachDetailsModal;
