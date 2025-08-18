import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaImage,
  FaTrophy,
  FaGraduationCap,
  FaDollarSign,
  FaMapMarkerAlt,
  FaClock,
  FaLanguage,
  FaFileAlt,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { Themecontext } from "../../../Context/ThemeContext";

const AddCoachForm = ({ onClose, onSubmit }) => {
  const { darkmode } = useContext(Themecontext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [certifications, setCertifications] = useState([""]);
  const [languages, setLanguages] = useState([""]);
  const [availability, setAvailability] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availabilityOptions = ["Morning", "Afternoon", "Evening", "Night"];
  const specializationOptions = [
    "Tennis",
    "Basketball",
    "Badminton",
    "Swimming",
    "Football",
    "Yoga",
    "Cricket",
    "Volleyball",
    "Table Tennis",
    "Boxing",
  ];

  const handleAvailabilityChange = (option) => {
    setAvailability((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const addCertification = () => {
    setCertifications([...certifications, ""]);
  };

  const removeCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const updateCertification = (index, value) => {
    const updated = [...certifications];
    updated[index] = value;
    setCertifications(updated);
  };

  const addLanguage = () => {
    setLanguages([...languages, ""]);
  };

  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index, value) => {
    const updated = [...languages];
    updated[index] = value;
    setLanguages(updated);
  };

  const onFormSubmit = async (data) => {
    setIsSubmitting(true);

    const coachData = {
      ...data,
      hourlyRate: parseFloat(data.hourlyRate),
      rating: 0, // New coaches start with 0 rating
      certifications: certifications.filter((cert) => cert.trim() !== ""),
      languages: languages.filter((lang) => lang.trim() !== ""),
      availability,
    };

    try {
      await onSubmit(coachData);
      reset();
      setCertifications([""]);
      setLanguages([""]);
      setAvailability([]);
    } catch (error) {
      console.error("Error adding coach:", error);
    } finally {
      setIsSubmitting(false);
    }
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
                      Add New Coach
                    </h2>
                    <p
                      className={`text-sm ${
                        darkmode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Fill in the coach information
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

            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="p-6 space-y-6"
            >
              {/* Basic Information */}
              <div
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
                  <FaUser className="text-blue-500" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className={`w-full px-4 py-3 ${
                        darkmode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                      placeholder="Enter full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full px-4 py-3 ${
                        darkmode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                      className={`w-full px-4 py-3 ${
                        darkmode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Profile Image URL *
                    </label>
                    <input
                      type="url"
                      {...register("image", {
                        required: "Image URL is required",
                      })}
                      className={`w-full px-4 py-3 ${
                        darkmode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                      placeholder="Enter image URL"
                    />
                    {errors.image && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.image.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Specialization *
                    </label>
                    <select
                      {...register("specialization", {
                        required: "Specialization is required",
                      })}
                      className={`w-full px-4 py-3 ${
                        darkmode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    >
                      <option value="">Select specialization</option>
                      {specializationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.specialization && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.specialization.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Experience *
                    </label>
                    <input
                      type="text"
                      {...register("experience", {
                        required: "Experience is required",
                      })}
                      className={`w-full px-4 py-3 ${
                        darkmode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                      placeholder="e.g., 5 years"
                    />
                    {errors.experience && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Hourly Rate (৳) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      {...register("hourlyRate", {
                        required: "Hourly rate is required",
                        min: { value: 0, message: "Rate must be positive" },
                      })}
                      className={`w-full px-4 py-3 ${
                        darkmode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                      placeholder="Enter hourly rate"
                    />
                    {errors.hourlyRate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.hourlyRate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkmode ? "text-gray-300" : "text-gray-700"
                      } mb-2`}
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className={`w-full px-4 py-3 ${
                        darkmode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                      placeholder="e.g., Court A, Pool Area"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    className={`block text-sm font-medium ${
                      darkmode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Bio *
                  </label>
                  <textarea
                    {...register("bio", { required: "Bio is required" })}
                    rows={3}
                    className={`w-full px-4 py-3 ${
                      darkmode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    placeholder="Brief description about the coach"
                  />
                  {errors.bio && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bio.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div
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
                  <FaClock className="text-green-500" />
                  Availability
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availabilityOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        availability.includes(option)
                          ? "bg-blue-500 border-blue-500 text-white"
                          : `${
                              darkmode
                                ? "bg-gray-700 border-gray-600 text-gray-300 hover:border-blue-500"
                                : "bg-white border-gray-300 text-gray-700 hover:border-blue-500"
                            }`
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={availability.includes(option)}
                        onChange={() => handleAvailabilityChange(option)}
                        className="hidden"
                      />
                      <span className="text-sm font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div
                className={`${
                  darkmode
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } rounded-2xl border p-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-semibold ${
                      darkmode ? "text-gray-100" : "text-gray-800"
                    } flex items-center gap-2`}
                  >
                    <FaGraduationCap className="text-yellow-500" />
                    Certifications
                  </h3>
                  <button
                    type="button"
                    onClick={addCertification}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                  >
                    <FaPlus className="text-sm" />
                    Add
                  </button>
                </div>

                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={cert}
                        onChange={(e) =>
                          updateCertification(index, e.target.value)
                        }
                        className={`flex-1 px-4 py-3 ${
                          darkmode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                        placeholder="Enter certification"
                      />
                      {certifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCertification(index)}
                          className="p-3 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all duration-300"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div
                className={`${
                  darkmode
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } rounded-2xl border p-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-semibold ${
                      darkmode ? "text-gray-100" : "text-gray-800"
                    } flex items-center gap-2`}
                  >
                    <FaLanguage className="text-orange-500" />
                    Languages
                  </h3>
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                  >
                    <FaPlus className="text-sm" />
                    Add
                  </button>
                </div>

                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={lang}
                        onChange={(e) => updateLanguage(index, e.target.value)}
                        className={`flex-1 px-4 py-3 ${
                          darkmode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        } border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                        placeholder="Enter language"
                      />
                      {languages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLanguage(index)}
                          className="p-3 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all duration-300"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex-1 px-6 py-4 ${
                    darkmode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                  } border-2 rounded-2xl font-semibold transition-all duration-300 hover:scale-105`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? `${
                          darkmode
                            ? "bg-gray-700 text-gray-500"
                            : "bg-gray-200 text-gray-400"
                        } cursor-not-allowed`
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Adding Coach...</span>
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      <span>Add Coach</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default AddCoachForm;
