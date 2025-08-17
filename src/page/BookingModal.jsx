import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaTimes,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUser,
  FaEnvelope,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCreditCard,
  FaInfoCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import { Themecontext } from "../Context/ThemeContext";

const BookingModal = ({ court, onClose, user }) => {
  const { darkmode } = useContext(Themecontext);
  const { handleSubmit } = useForm();
  const [slotsSelected, setSlotsSelected] = useState([]);
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxios();

  const slotOptions = [
    { time: "8:00 AM - 9:00 AM", available: true },
    { time: "9:00 AM - 10:00 AM", available: true },
    { time: "10:00 AM - 11:00 AM", available: false },
    { time: "11:00 AM - 12:00 PM", available: true },
    { time: "2:00 PM - 3:00 PM", available: true },
    { time: "3:00 PM - 4:00 PM", available: false },
    { time: "4:00 PM - 5:00 PM", available: true },
    { time: "5:00 PM - 6:00 PM", available: true },
  ];

  const handleSlotChange = (slotTime) => {
    setSlotsSelected((prev) =>
      prev.includes(slotTime)
        ? prev.filter((slot) => slot !== slotTime)
        : [...prev, slotTime]
    );
  };

  const totalPrice = slotsSelected.length * court.price;

  const onSubmit = async () => {
    if (slotsSelected.length === 0 || !date) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please select a date and at least one time slot.",
        confirmButtonColor: "#3b82f6",
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
        customClass: {
          popup: darkmode ? "dark-popup" : "",
          title: darkmode ? "dark-title" : "",
          content: darkmode ? "dark-content" : "",
        },
      });
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      userEmail: user?.email,
      userName: user?.displayName,
      courtId: court._id,
      courtType: court.type,
      courtImage: court.image,
      date,
      slots: slotsSelected,
      price: totalPrice,
      status: "pending",
      paymentStatus: "unpaid",
    };

    try {
      await axiosSecure.post("/bookings", bookingData);

      Swal.fire({
        icon: "success",
        title: "Booking Confirmed!",
        text: "Your booking request has been sent successfully!",
        confirmButtonColor: "#10b981",
        timer: 3000,
        timerProgressBar: true,
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
        customClass: {
          popup: darkmode ? "dark-popup" : "",
          title: darkmode ? "dark-title" : "",
          content: darkmode ? "dark-content" : "",
        },
      });

      onClose();
    } catch (err) {
      console.error("Booking error:", err);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Failed to book court. Please try again.",
        confirmButtonColor: "#ef4444",
        background: darkmode ? "#1f2937" : "#ffffff",
        color: darkmode ? "#f9fafb" : "#111827",
        customClass: {
          popup: darkmode ? "dark-popup" : "",
          title: darkmode ? "dark-title" : "",
          content: darkmode ? "dark-content" : "",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`${
            darkmode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-3xl shadow-2xl border w-full max-w-2xl max-h-[90vh] overflow-y-auto relative`}
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
                  <FaCalendarAlt className="text-white text-xl" />
                </div>
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      darkmode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    Book Your Court
                  </h2>
                  <p
                    className={`text-sm ${
                      darkmode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Complete your reservation details
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

          <div className="p-6 space-y-8">
            {/* Court Information Card */}
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
                    src={court.image}
                    alt={court.type}
                    className="w-full md:w-48 h-32 md:h-36 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg">
                    ৳{court.price}/slot
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        darkmode ? "text-gray-100" : "text-gray-800"
                      } mb-2`}
                    >
                      {court.type} Court
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <div
                        className={`flex items-center space-x-2 ${
                          darkmode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <FaMapMarkerAlt className="text-purple-500" />
                        <span className="text-sm">
                          {court.location || "Premium Location"}
                        </span>
                      </div>
                      <div
                        className={`flex items-center space-x-2 ${
                          darkmode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <FaDollarSign className="text-green-500" />
                        <span className="text-sm">৳{court.price} per hour</span>
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
                    <div className="flex items-center space-x-2 mb-2">
                      <FaInfoCircle className="text-blue-500" />
                      <span
                        className={`font-semibold ${
                          darkmode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        Booking Information
                      </span>
                    </div>
                    <ul
                      className={`text-sm space-y-1 ${
                        darkmode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <li>• Free cancellation up to 24 hours before</li>
                      <li>• Equipment rental available on-site</li>
                      <li>• Professional lighting and climate control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* User Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h4
                className={`text-lg font-semibold ${
                  darkmode ? "text-gray-100" : "text-gray-800"
                } flex items-center space-x-2`}
              >
                <FaUser className="text-blue-500" />
                <span>Booking Details</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`${
                    darkmode
                      ? "bg-gray-700/30 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  } border rounded-xl p-4`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          darkmode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Name
                      </p>
                      <p
                        className={`font-semibold ${
                          darkmode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {user?.displayName || "Guest User"}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    darkmode
                      ? "bg-gray-700/30 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  } border rounded-xl p-4`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <FaEnvelope className="text-white text-sm" />
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          darkmode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Email
                      </p>
                      <p
                        className={`font-semibold ${
                          darkmode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {user?.email || "guest@example.com"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <label
                className={`text-lg font-semibold ${
                  darkmode ? "text-gray-100" : "text-gray-800"
                } flex items-center space-x-2`}
              >
                <FaCalendarAlt className="text-purple-500" />
                <span>Select Date</span>
              </label>

              <input
                type="date"
                min={getTodayDate()}
                className={`w-full px-4 py-4 ${
                  darkmode
                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-purple-500"
                    : "bg-white border-gray-300 text-gray-800 focus:border-purple-500"
                } border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg`}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </motion.div>

            {/* Time Slot Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <label
                className={`text-lg font-semibold ${
                  darkmode ? "text-gray-100" : "text-gray-800"
                } flex items-center space-x-2`}
              >
                <FaClock className="text-orange-500" />
                <span>Select Time Slots</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slotOptions.map((slot) => (
                  <motion.div
                    key={slot.time}
                    whileHover={{ scale: slot.available ? 1.02 : 1 }}
                    whileTap={{ scale: slot.available ? 0.98 : 1 }}
                  >
                    <label
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        !slot.available
                          ? `${
                              darkmode
                                ? "bg-gray-800 border-gray-700 text-gray-500"
                                : "bg-gray-100 border-gray-200 text-gray-400"
                            } cursor-not-allowed opacity-50`
                          : slotsSelected.includes(slot.time)
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg"
                          : `${
                              darkmode
                                ? "bg-gray-700/30 border-gray-600 text-gray-300 hover:border-blue-500 hover:bg-gray-700/50"
                                : "bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50"
                            }`
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={slotsSelected.includes(slot.time)}
                          onChange={() =>
                            slot.available && handleSlotChange(slot.time)
                          }
                          disabled={!slot.available}
                          className="hidden"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            slotsSelected.includes(slot.time)
                              ? "border-white bg-white"
                              : slot.available
                              ? `${
                                  darkmode
                                    ? "border-gray-400"
                                    : "border-gray-400"
                                }`
                              : `${
                                  darkmode
                                    ? "border-gray-600"
                                    : "border-gray-300"
                                }`
                          }`}
                        >
                          {slotsSelected.includes(slot.time) && (
                            <FaCheckCircle className="text-blue-600 text-xs" />
                          )}
                        </div>
                        <span className="font-medium">{slot.time}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {!slot.available && (
                          <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                            Booked
                          </span>
                        )}
                        <span className="text-sm font-semibold">
                          ৳{court.price}
                        </span>
                      </div>
                    </label>
                  </motion.div>
                ))}
              </div>

              {slotsSelected.length === 0 && (
                <div
                  className={`flex items-center space-x-2 ${
                    darkmode ? "text-yellow-400" : "text-yellow-600"
                  } text-sm`}
                >
                  <FaExclamationTriangle />
                  <span>Please select at least one time slot</span>
                </div>
              )}
            </motion.div>

            {/* Price Summary */}
            {slotsSelected.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`${
                  darkmode
                    ? "bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-700/50"
                    : "bg-gradient-to-r from-green-50 to-teal-50 border-green-200"
                } border rounded-2xl p-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FaCreditCard className="text-green-500 text-xl" />
                    <span
                      className={`text-lg font-semibold ${
                        darkmode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      Booking Summary
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span
                      className={`${
                        darkmode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Selected Slots ({slotsSelected.length})
                    </span>
                    <span
                      className={`font-semibold ${
                        darkmode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      ৳{court.price} × {slotsSelected.length}
                    </span>
                  </div>

                  <div
                    className={`border-t ${
                      darkmode ? "border-gray-600" : "border-gray-200"
                    } pt-3`}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xl font-bold ${
                          darkmode ? "text-gray-100" : "text-gray-800"
                        }`}
                      >
                        Total Amount
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ৳{totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
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
                onClick={handleSubmit(onSubmit)}
                disabled={slotsSelected.length === 0 || !date || isSubmitting}
                className={`flex-1 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  slotsSelected.length === 0 || !date || isSubmitting
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
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    <span>Confirm Booking</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
