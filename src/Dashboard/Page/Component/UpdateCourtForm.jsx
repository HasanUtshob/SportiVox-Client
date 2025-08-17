import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaImage,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaEdit,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import { MdSportsBasketball } from "react-icons/md";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import { Themecontext } from "../../../Context/ThemeContext";

const UpdateCourtForm = ({ court, onClose }) => {
  const { darkmode } = useContext(Themecontext);
  const axiosSecure = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: court.image,
      type: court.type,
      slot: court.slot,
      price: court.price,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.put(`/courts/${court._id}`, data);
      if (response.data.modifiedCount > 0) {
        await Swal.fire({
          title: "Success!",
          text: "Court updated successfully",
          icon: "success",
          confirmButtonColor: "#10B981",
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
          customClass: {
            popup: darkmode ? "dark-popup" : "",
            title: darkmode ? "dark-title" : "",
            content: darkmode ? "dark-content" : "",
          },
        });
        onClose();
      } else {
        await Swal.fire({
          title: "No Changes Made",
          text: "Try modifying some fields",
          icon: "info",
          confirmButtonColor: "#3B82F6",
          background: darkmode ? "#1f2937" : "#ffffff",
          color: darkmode ? "#f9fafb" : "#111827",
          customClass: {
            popup: darkmode ? "dark-popup" : "",
            title: darkmode ? "dark-title" : "",
            content: darkmode ? "dark-content" : "",
          },
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonColor: "#EF4444",
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
        customClass: {
          popup: darkmode ? "dark-popup" : "",
          title: darkmode ? "dark-title" : "",
          content: darkmode ? "dark-content" : "",
        },
      });
      console.error("Update Error:", err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${
          darkmode
            ? "bg-gradient-to-r from-emerald-600 to-teal-600"
            : "bg-gradient-to-r from-emerald-500 to-teal-600"
        } p-6 rounded-t-3xl text-white relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <FaEdit className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Update Court</h2>
              <p className="text-emerald-100 text-sm md:text-base">
                Modify court details and settings
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <FaTimes className="text-xl" />
          </motion.button>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`${
          darkmode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } p-6 md:p-8 rounded-b-3xl border-t-0 shadow-2xl space-y-6`}
      >
        {/* Current Court Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${
            darkmode
              ? "bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-700/50"
              : "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200"
          } p-4 rounded-2xl border`}
        >
          <div className="flex items-center space-x-3 mb-3">
            <MdSportsBasketball className="text-emerald-500 text-xl" />
            <h3
              className={`font-semibold ${
                darkmode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Current Court: {court.type}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className={`${darkmode ? "text-gray-300" : "text-gray-600"}`}>
              <span className="font-medium">Slot:</span> {court.slot}
            </div>
            <div className={`${darkmode ? "text-gray-300" : "text-gray-600"}`}>
              <span className="font-medium">Price:</span> ৳{court.price}
            </div>
            <div className={`${darkmode ? "text-gray-300" : "text-gray-600"}`}>
              <span className="font-medium">Type:</span> {court.type}
            </div>
          </div>
        </motion.div>

        {/* Image URL */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-2"
        >
          <label
            className={`flex items-center space-x-2 text-sm font-semibold ${
              darkmode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <FaImage className="text-blue-500" />
            <span>Court Image URL</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="https://example.com/court-image.jpg"
              {...register("image", {
                required: "Image URL is required",
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                  message: "Please enter a valid image URL",
                },
              })}
              className={`w-full px-4 py-3 pl-12 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                darkmode
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              } ${errors.image ? "border-red-500" : ""}`}
            />
            <FaImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.image && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm flex items-center space-x-1"
            >
              <span>⚠️</span>
              <span>{errors.image.message}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Court Type */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-2"
        >
          <label
            className={`flex items-center space-x-2 text-sm font-semibold ${
              darkmode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <MdSportsBasketball className="text-green-500" />
            <span>Court Type</span>
          </label>
          <div className="relative">
            <select
              {...register("type", { required: "Please select a court type" })}
              className={`w-full px-4 py-3 pl-12 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none ${
                darkmode
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              } ${errors.type ? "border-red-500" : ""}`}
            >
              <option value="">Select Court Type</option>
              <option value="Tennis">🎾 Tennis Court</option>
              <option value="Badminton">🏸 Badminton Court</option>
              <option value="Squash">🥎 Squash Court</option>
              <option value="Basketball">🏀 Basketball Court</option>
              <option value="Football">⚽ Football Field</option>
            </select>
            <MdSportsBasketball className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.type && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm flex items-center space-x-1"
            >
              <span>⚠️</span>
              <span>{errors.type.message}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Slot Time */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-2"
        >
          <label
            className={`flex items-center space-x-2 text-sm font-semibold ${
              darkmode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <FaClock className="text-purple-500" />
            <span>Available Time Slot</span>
          </label>
          <div className="relative">
            <select
              {...register("slot", { required: "Please select a time slot" })}
              className={`w-full px-4 py-3 pl-12 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none ${
                darkmode
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              } ${errors.slot ? "border-red-500" : ""}`}
            >
              <option value="">Select Time Slot</option>
              <option value="6:00 AM - 7:00 AM">
                🌅 6:00 AM - 7:00 AM (Early Morning)
              </option>
              <option value="8:00 AM - 9:00 AM">
                🌄 8:00 AM - 9:00 AM (Morning)
              </option>
              <option value="10:00 AM - 11:00 AM">
                ☀️ 10:00 AM - 11:00 AM (Late Morning)
              </option>
              <option value="2:00 PM - 3:00 PM">
                🌞 2:00 PM - 3:00 PM (Afternoon)
              </option>
              <option value="4:00 PM - 5:00 PM">
                🌅 4:00 PM - 5:00 PM (Late Afternoon)
              </option>
              <option value="6:00 PM - 7:00 PM">
                🌆 6:00 PM - 7:00 PM (Evening)
              </option>
              <option value="7:00 PM - 8:00 PM">
                🌃 7:00 PM - 8:00 PM (Night)
              </option>
            </select>
            <FaClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.slot && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm flex items-center space-x-1"
            >
              <span>⚠️</span>
              <span>{errors.slot.message}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-2"
        >
          <label
            className={`flex items-center space-x-2 text-sm font-semibold ${
              darkmode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <FaMoneyBillWave className="text-yellow-500" />
            <span>Price per Session (৳)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="50"
              placeholder="Enter price (e.g., 500)"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 1,
                  message: "Price must be greater than 0",
                },
                max: {
                  value: 10000,
                  message: "Price cannot exceed ৳10,000",
                },
              })}
              className={`w-full px-4 py-3 pl-12 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                darkmode
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              } ${errors.price ? "border-red-500" : ""}`}
            />
            <FaMoneyBillWave className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
              ৳
            </span>
          </div>
          {errors.price && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm flex items-center space-x-1"
            >
              <span>⚠️</span>
              <span>{errors.price.message}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 pt-4"
        >
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              darkmode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
            }`}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <FaSave />
            <span>Update Court</span>
          </motion.button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default UpdateCourtForm;
