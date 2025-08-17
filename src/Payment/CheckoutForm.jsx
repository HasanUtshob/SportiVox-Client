import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCreditCard,
  FaTimes,
  FaTag,
  FaCheck,
  FaSpinner,
  FaLock,
  FaShieldAlt,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaPercent,
  FaDollarSign,
} from "react-icons/fa";
import {
  MdPayment,
  MdSecurity,
  MdVerifiedUser,
  MdDiscount,
  MdSavings,
} from "react-icons/md";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

const CheckoutForm = ({ booking, onClose, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState("");
  const [showCouponSuggestions, setShowCouponSuggestions] = useState(false);
  const axiosSecure = useAxios();

  const totalPrice = booking.slots.length * booking.price;
  const finalPrice = Math.max(0, totalPrice - discount);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axiosSecure.get("/coupons");
        setAvailableCoupons(res.data);
      } catch (err) {
        console.error("Failed to load coupons", err);
      }
    };
    fetchCoupons();
  }, [axiosSecure]);

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : "");
  };

  const handleApplyCoupon = async () => {
    if (appliedCoupon) {
      return Swal.fire({
        title: "Already Applied",
        text: "You've already used a coupon for this payment.",
        icon: "info",
        confirmButtonColor: "#3B82F6",
      });
    }

    if (!couponCode) {
      return Swal.fire({
        title: "Empty Code",
        text: "Please enter a coupon code to apply discount.",
        icon: "warning",
        confirmButtonColor: "#F59E0B",
      });
    }

    try {
      const res = await axiosSecure.get(
        `/coupons?code=${couponCode.trim().toUpperCase()}`
      );
      const coupon = res.data;

      if (!coupon) {
        return Swal.fire({
          title: "Invalid Code",
          text: "The coupon code you entered is not valid or has expired.",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      }

      let calculatedDiscount = 0;
      if (coupon.type === "percent") {
        calculatedDiscount = (totalPrice * coupon.value) / 100;
      } else if (coupon.type === "amount") {
        calculatedDiscount = coupon.value;
      }

      setDiscount(calculatedDiscount);
      setAppliedCoupon(true);
      setShowCouponSuggestions(false);

      Swal.fire({
        title: "Coupon Applied!",
        text: `Great! You saved ৳${Math.round(
          calculatedDiscount
        )} on this booking.`,
        icon: "success",
        confirmButtonColor: "#10B981",
      });
    } catch (err) {
      console.error("Error applying coupon:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to apply coupon. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: finalPrice,
      });

      const { clientSecret } = res.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.paymentIntent?.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        const paymentInfo = {
          bookingId: booking._id,
          userEmail: booking.userEmail,
          amount: finalPrice,
          transactionId,
          discount,
          couponUsed: appliedCoupon ? couponCode : null,
          date: new Date(),
          status: "Paid",
        };

        await axiosSecure.post("/payments", paymentInfo);
        await axiosSecure.patch(`/bookings/payment/${booking._id}`, {
          paymentStatus: "paid",
        });

        Swal.fire({
          title: "Payment Successful!",
          text: "Your booking has been confirmed and payment processed successfully.",
          icon: "success",
          confirmButtonColor: "#10B981",
        });

        setTimeout(() => {
          if (onClose) onClose();
          if (onPaymentSuccess) onPaymentSuccess(booking._id);
          else window.location.reload();
        }, 1600);
      } else {
        Swal.fire({
          title: "Payment Failed",
          text: "Your payment could not be processed. Please try again.",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      }
    } catch (err) {
      console.error("Payment error:", err);
      Swal.fire({
        title: "Payment Error",
        text: "Something went wrong during payment processing. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl relative border border-white/20 my-8 max-h-[95vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaTimes />
          </motion.button>

          {/* Enhanced Header with Animated Card */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-6 lg:p-8 text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full"
              />
              <motion.div
                animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full"
              />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Side - Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center lg:justify-start space-x-3 mb-4"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/10">
                    <FaShieldAlt className="text-2xl text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Secure Payment
                    </h3>
                    <p className="text-blue-200 text-sm">
                      256-bit SSL Encrypted
                    </p>
                  </div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-blue-100 text-lg"
                >
                  Complete your booking payment securely
                </motion.p>
              </div>

              {/* Right Side - Animated Credit Card */}
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-72 lg:w-80 h-44 lg:h-48 bg-gradient-to-br from-slate-800 via-blue-800 to-purple-800 rounded-2xl shadow-2xl relative overflow-hidden cursor-pointer"
                  >
                    {/* Card Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white/20 rounded-full"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 p-4 lg:p-6 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(59, 130, 246, 0.5)",
                              "0 0 30px rgba(147, 51, 234, 0.5)",
                              "0 0 20px rgba(59, 130, 246, 0.5)",
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="w-10 lg:w-12 h-6 lg:h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-md flex items-center justify-center"
                        >
                          <div className="w-5 lg:w-6 h-3 lg:h-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-sm" />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="text-white/80"
                        >
                          <FaCreditCard className="text-xl lg:text-2xl" />
                        </motion.div>
                      </div>

                      <div className="space-y-3 lg:space-y-4">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1, duration: 0.5 }}
                          className="font-mono text-white text-lg lg:text-xl tracking-wider"
                        >
                          <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            •••• •••• •••• ••••
                          </motion.span>
                        </motion.div>

                        <div className="flex justify-between items-end">
                          <div>
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.2 }}
                              className="text-white/60 text-xs uppercase tracking-wide"
                            >
                              Card Holder
                            </motion.p>
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.4 }}
                              className="text-white font-semibold text-sm lg:text-base"
                            >
                              {booking.userEmail.split("@")[0].toUpperCase()}
                            </motion.p>
                          </div>
                          <div className="text-right">
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.6 }}
                              className="text-white/60 text-xs uppercase tracking-wide"
                            >
                              Amount
                            </motion.p>
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.8 }}
                              className="text-white font-bold text-base lg:text-lg"
                            >
                              ৳{finalPrice}
                            </motion.p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Holographic Effect */}
                    <motion.div
                      animate={{
                        background: [
                          "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                          "linear-gradient(45deg, transparent 60%, rgba(255,255,255,0.1) 80%, transparent 100%)",
                          "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 pointer-events-none"
                    />
                  </motion.div>

                  {/* Card Shadow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1 }}
                    className="absolute -bottom-2 left-2 right-2 h-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl blur-lg"
                  />
                </motion.div>
              </div>
            </div>

            {/* Floating Payment Icons */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                className="absolute top-8 left-8 text-white/20"
              >
                <FaLock className="text-2xl" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute top-16 right-16 text-white/20"
              >
                <MdSecurity className="text-2xl" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
                className="absolute bottom-8 left-16 text-white/20"
              >
                <MdVerifiedUser className="text-xl" />
              </motion.div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 lg:p-8 xl:p-10 relative z-10"
          >
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Coupon Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <MdDiscount className="text-green-600 text-xl" />
                    <h4 className="font-semibold text-gray-800">
                      Apply Coupon Code
                    </h4>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 ${
                          appliedCoupon
                            ? "bg-green-50 border-green-300 text-green-800"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={appliedCoupon}
                        onFocus={() => setShowCouponSuggestions(true)}
                      />
                      {appliedCoupon && (
                        <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600" />
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        appliedCoupon
                          ? "bg-green-100 text-green-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                      }`}
                      onClick={handleApplyCoupon}
                      disabled={appliedCoupon}
                    >
                      {appliedCoupon ? <FaCheck /> : "Apply"}
                    </motion.button>
                  </div>

                  {/* Coupon Suggestions */}
                  {showCouponSuggestions &&
                    availableCoupons.length > 0 &&
                    !appliedCoupon && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200"
                      >
                        <p className="text-sm text-gray-600 mb-2 flex items-center space-x-1">
                          <MdSavings className="text-blue-600" />
                          <span>Available coupons:</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {availableCoupons.slice(0, 3).map((coupon) => (
                            <motion.button
                              key={coupon._id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={() => setCouponCode(coupon.code)}
                              className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors flex items-center space-x-1"
                            >
                              {coupon.type === "percent" ? (
                                <FaPercent />
                              ) : (
                                <FaDollarSign />
                              )}
                              <span>{coupon.code}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                </motion.div>

                {/* Card Input Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <FaCreditCard className="text-blue-600 text-xl" />
                    <h4 className="font-semibold text-gray-800">
                      Payment Information
                    </h4>
                    <div className="flex items-center space-x-1 ml-auto">
                      <FaLock className="text-green-600 text-sm" />
                      <span className="text-xs text-green-600 font-medium">
                        Secure
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                      cardError
                        ? "border-red-300 bg-red-50"
                        : cardComplete
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 hover:border-blue-300 bg-white"
                    }`}
                  >
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#374151",
                            fontFamily: '"Inter", sans-serif',
                            "::placeholder": { color: "#9CA3AF" },
                          },
                          invalid: { color: "#EF4444" },
                        },
                      }}
                      onChange={handleCardChange}
                    />
                  </div>

                  {cardError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm flex items-center space-x-1"
                    >
                      <FaTimes className="text-xs" />
                      <span>{cardError}</span>
                    </motion.p>
                  )}

                  {cardComplete && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 text-sm flex items-center space-x-1"
                    >
                      <FaCheck className="text-xs" />
                      <span>Card information is complete</span>
                    </motion.p>
                  )}
                </motion.div>

                {/* Security Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200"
                >
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MdSecurity className="text-green-600" />
                    <span>
                      Your payment is secured with 256-bit SSL encryption
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Booking Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100"
                >
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <FaCalendarAlt className="text-blue-600" />
                    <span>Booking Summary</span>
                  </h4>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center space-x-2">
                        <FaUser className="text-sm" />
                        <span>Customer:</span>
                      </span>
                      <span className="font-medium text-gray-800 text-sm lg:text-base">
                        {booking.userEmail}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-sm" />
                        <span>Court:</span>
                      </span>
                      <span className="font-medium text-gray-800">
                        {booking.courtType}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center space-x-2">
                        <FaClock className="text-sm" />
                        <span>Time Slots:</span>
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {booking.slots.map((slot, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium"
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center space-x-2">
                        <FaCalendarAlt className="text-sm" />
                        <span>Date:</span>
                      </span>
                      <span className="font-medium text-gray-800">
                        {booking.date}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">৳{totalPrice}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-green-600 flex items-center space-x-1">
                            <MdDiscount />
                            <span>Discount:</span>
                          </span>
                          <span className="font-medium text-green-600">
                            -৳{discount}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="text-lg font-semibold text-gray-800">
                          Total Amount:
                        </span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            ৳{finalPrice}
                          </div>
                          {discount > 0 && (
                            <div className="text-sm text-green-600 flex items-center space-x-1">
                              <MdSavings />
                              <span>You saved ৳{discount}!</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!stripe || processing || !cardComplete}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 ${
                      processing || !stripe || !cardComplete
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {processing ? (
                      <div className="flex items-center justify-center space-x-3">
                        <FaSpinner className="animate-spin text-lg" />
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <FaLock />
                        <span>Pay ৳{finalPrice} Securely</span>
                      </div>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300 border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    Cancel Payment
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutForm;
